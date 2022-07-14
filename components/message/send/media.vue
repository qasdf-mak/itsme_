<template>
	<view class="width-full lh1">
		<view class="fixed top left right bottom bg-white flex flex-col" v-if="photoData || videoData"
			style="z-index: 10089;">
			<view :style="'height:' + StatusBar + 'px;'"></view>
			<view class="width-full flex-1 flex flex-col">
				<view class="pt15 pl15 pb15 pr15 flex align-items-center">
					<view class="flex-1 flex align-items-center" @click="closeMediaSheet">
						<view class="icon_font fs20 color-middle">
							&#xe638;
						</view>
					</view>
					<view class="icon_font fs20 color-middle mr18" @click="closeMediaSheet">
						&#xe686;
					</view>
					<view class="fs15 color-white pt5 pb8 pl15 pr15 bg-2 br20 btn-box" @click="sendMessage">
						发送
					</view>
				</view>
				<view class="flex-1" v-if="photoData">
					<image :src="photoData.url" class="width-full height" mode="aspectFit"></image>
				</view>
				<view class="flex-1" v-if="videoData">
					<view class="width-full height">
						<video id="myVideo" class="width-full height" autoplay :src="videoData.url | imageFilter"
							:show-fullscreen-btn="false" object-fit="cover" :controls="false" :show-play-btn="false"
							:enable-progress-gesture="false" :poster="videoData.url | imageFilter('poster')"></video>
					</view>
				</view>
				<view class="pl25 pr25 pt20" v-if="photoData && user.gender === 0">
					<u-radio-group v-model="photoData.rule_type" @change="changeRule">
						<view class="width-full mb20 flex align-items-center" @click="isRealPop">
							<u-radio name="3" icon-size="30" label-size="30" :disabled="!isReal"
								active-color="#F2B27F">阅后即焚照片，查看3秒后焚毁
							</u-radio>
						</view>
						<view class="width-full mb20 flex align-items-center">
							<u-radio name="2" icon-size="30" label-size="30" active-color="#F2B27F">普通照片</u-radio>
						</view>
					</u-radio-group>
				</view>
				<view class="pl25 pr25 pt20" v-if="videoData">
					<u-radio-group v-model="videoData.rule_type" @change="changeRule">
						<view class="width-full mb20 flex align-items-center" @click="isRealPop">
							<u-radio name="3" icon-size="30" label-size="30" active-color="#F2B27F" :disabled="!isReal">阅后即焚视频，查看后焚毁
							</u-radio>
						</view>
						<view class="width-full mb20 flex align-items-center">
							<u-radio name="2" icon-size="30" label-size="30" active-color="#F2B27F">普通视频</u-radio>
						</view>
					</u-radio-group>
				</view>
			</view>
		</view>
		<view class="itsme-action-sheet-box">
			<u-action-sheet :list="sheetMediaList" v-model="showMediaSheet" :mask-close-able="false"
				@click="clickMediaSheet" @close="closeMediaSheet"></u-action-sheet>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import uploadImg from '../../../common/utils/upload-img.js'
	import uploadVideo from '../../../common/utils/upload-video.js'
	import {
		formatImage
	} from '../../../common/utils/common-methods'
	import {
		changeVideo,
		changePhoto
	} from '../../../common/appjs/media.js'
	export default {
		name: 'send-text',
		data() {
			return {
				photoData: null,
				videoData: null,
				content: '',
				showMediaSheet: true, // 选择媒体
				sendFlag:true,
				sheetMediaList: [{
						text: '拍摄'
					},
					{
						text: '从相册选择'
					}
				]
			}
		},
		props: {
			friend: Object,
			type: String
		},
		computed: {
			isReal() {
				 if(this.user.is_real === 1){
					 return true 
				 }else{
					 return false 
				 }
			},
		},
		methods: {
			// 关闭弹窗
			closeMediaSheet() {
				this.$emit('closeMediaSheet')
			},
			changeRule(value) {
				if (this.photoData) {
					this.photoData.rule_type = value
				}
				if (this.videoData) {
					this.videoData.rule_type = value
				}
			},
			// 媒体选择
			clickMediaSheet(index) {
				if (this.type === 'photo') {
					this.changePhoto(index)
				}
				if (this.type === 'video') {
					this.changeVideo(index)
				}
			},
			// 选择照片
			changePhoto(index) {
				let that = this
				let sourceType = []
				if (index === 0) {
					sourceType = ['camera']
				} else {
					sourceType = ['album']
				}
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'],
					sourceType: sourceType,
					success: (res) => {
						if (res.errMsg === 'chooseImage:ok' && res.tempFilePaths && res.tempFilePaths.length >
							0) {
							this.photoData = {
								url: res.tempFilePaths[0],
								rule_type: 2,
								is_read: 0
							}
							if(that.user.gender === 1){
								this.sendMessage()
							}
						} else {
							this.closeMediaSheet()
						}
					},
					error: (err) => {
						console.log(err)
						this.closeMediaSheet()
					}
				})
			},
			// 选择视频
			changeVideo(index) {
				changeVideo(index).then(res => {
					console.log(res)
					this.videoData = {
						url: res,
						rule_type: 2,
						is_read: 0
					}
					if(this.user.gender === 1){
						this.sendMessage()
					}
				})
			},

			isRealPop() {
				if (!this.isReal) {
					console.log(123)
					this.$refs.uToast.show({
						title: '非真人认证用户不可操作阅后即焚',
					})
				}
			},
			sendMessage() {
				uni.showLoading({
					title: '处理中'
				})
				if(this.sendFlag){
					if (this.photoData) {
						let images = []
						images.push(this.photoData.url)
						uploadImg(images).then(img => {
							this.photoData.url = '/' + img[0]
							uni.getImageInfo({
								src: formatImage(this.photoData.url),
								success: (image) => {
									if (image.orientation === 'left' || image.orientation === 'right' ||
										image.orientation === 'left-mirrored	' || image.orientation ===
										'right-mirrored') {
										this.photoData.width = image.height
										this.photoData.height = image.width
									} else {
										this.photoData.width = image.width
										this.photoData.height = image.height
									}
									this.sendImMessage('image', this.friend, this.photoData).then(
										(res) => {
											console.log('发送成功')
											this.closeMediaSheet()
											uni.hideLoading()
											this.$emit('sendSuccess', res)
										},
										(err) => {
											console.log('发送失败')
											uni.hideLoading()
											console.log(err)
										}
									)
								}
							})
						})
					}
					if (this.videoData) {
						console.log(this.videoData)
						uploadVideo(this.videoData.url).then(video => {
							console.log(video)
							let imageurl = formatImage(video, 'poster')
							uni.getImageInfo({
								src: imageurl,
								success: (image) => {
									if (image.orientation === 'left' || image.orientation === 'right' ||
										image.orientation === 'left-mirrored	' || image.orientation ===
										'right-mirrored') {
										this.videoData.width = image.height * 2
										this.videoData.height = image.width * 2
									} else {
										this.videoData.width = image.width * 2
										this.videoData.height = image.height * 2
									}
									this.videoData.url = video
									this.sendImMessage('video', this.friend, this.videoData).then(
										(res) => {
											console.log('发送成功')
											this.closeMediaSheet()
											uni.hideLoading()
											console.log(res)
											this.$emit('sendSuccess', res)
										},
										(err) => {
											console.log('发送失败')
											console.log(err)
											uni.hideLoading()
										}
									)
								}
							})
						})
					}
				this.sendFlag = false
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.message-bot-input {
		height: 90rpx;
		line-height: 90rpx;
		border-radius: 90rpx;
		background: #FAFAFA;
		box-shadow: inset 0px 0px 8rpx 0px rgba(195, 195, 195, 0.38);
	}

	.message-bot-btn {
		height: 60rpx;
		line-height: 56rpx;
		border-radius: 60rpx;
	}
</style>
