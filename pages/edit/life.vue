<template>
	<view class="width-full lh1 height100vh bg-itsme-1">
		<!-- top -->
		<u-sticky h5-nav-height="0">
			<view class="width-full bg-itsme-1">
				<view class="width-full" :style="'height: ' + StatusBar + 'px;'"></view>
				<view class="width-full top-box flex align-items-center">
					<view class="top-box-left pl20 border-box" @click="goBack">
						<view class="icon_font fs18 color-white">
							&#xe60e;
						</view>
					</view>
					<view class="flex-1 fs18 color-itsme-2 fw400 text-center">
						发布动态
					</view>
					<view class="top-box-left pl35">
						<view class="edit-btn bg-itsme-2 pt3 pb5 br10 text-center fs10"
							:class="canEdit ? '' : 'opacity60'" @click="toEditPhoto">
							发布
						</view>
					</view>
				</view>
			</view>
		</u-sticky>
		<!-- top -->
		<view class="width-full ">
			<view class="mt20 ml20 mr20">
				<view class="width-full textarea-box">
					<u-input v-model="content" class="fs14 color-itsme-10" :clearable="false" type="textarea"
						:custom-style="{'color': '#fff'}" placeholder="想说点什么呢...  (可输入100个字符)" maxlength="100"
						placeholderStyle="color: #898585" :border="false" />
				</view>
				<!-- 初始阶段 -->
				<view class="add-photo-box flex align-items-center flex-center br5 bg-itsme-12"
					v-if="photolist && photolist.length === 0 && !videoData" @click="showSheet = true">
					<view class="icon_font fs36 color-itsme-1">
						&#xe60d;
					</view>
				</view>
				<!-- 初始阶段 -->

				<!-- 照片 -->
				<view class="width-full flex flex-wrap" v-if="photolist && photolist.length > 0">
					<view v-for="(item,index) in photolist" :key="index">
						<view class="mb10" :class="(index + 1) % 3 === 0 ? '' : 'mr10'">
							<view class="photo-box br5">
								<image :src="item | imageFilter('m11')" class="photo-box br5" mode="aspectFill"></image>
							</view>
						</view>
					</view>
					<view v-if="!photolist || (photolist && photolist.length < 9)">
						<view class="add-photo-box flex align-items-center flex-center br5 bg-itsme-12"
							@click="showOtherSheet = true">
							<view class="icon_font fs30 color-itsme-1">
								&#xe60d;
							</view>
						</view>
					</view>
				</view>
				<!-- 照片 -->
				<!-- 视频 -->
				<view class="width-full" v-if="videoData">
					<view class="video-box float-hidden br5">
						<video-item :url="videoData.url" :isPlay="isPlay" @toPlayVideo="isPlay = true"
							@videoEnded="isPlay = false"></video-item>
					</view>
				</view>
				<!-- 定位 -->
				<view class="flex mt30">
					<view class="flex pt10 pb10 pl15 pr15 bg-itsme-12 br20" @click="selectAddr">
						<view class="icon_font fs15 color-6969B8 mr8">
							&#xe643;
						</view>
						<view class="" v-if="addr===''">
							你在哪里 ？
						</view>
						<view class="" v-else>
							{{addr}}
						</view>
					</view>
					<view class="flex-1"></view>
				</view>
				<!-- 视频 -->
				<!-- <view class="mt30 width-full">
					<view class="ml20 mr20 flex align-items-center flex-right">
						<view class="fs14 color-shallow mr12">
							对同性隐藏
						</view>
						<u-switch v-model="sexHidden" size="30" active-color="#F2B27F" inactive-color="#ffffff" @change="changeSexHidden"></u-switch>
					</view>
				</view> -->
			</view>
		</view>
		<!-- bottom -->
		<view class="fixed bottom left right bg-itsme-1 pb_iphoneX_safe">
			<view class="width-full fs10 color-itsme-10 text-center lh15 mb25">
				请勿上传裸露低俗的照片，严重者将封号处理<br />请勿发布低俗、色情交易或反动言论等内容
			</view>
		</view>
		<!-- bottom -->
		<view class="itsme-action-sheet-box">
			<u-action-sheet :list="sheetlist" v-model="showSheet" @click="clickSheet"></u-action-sheet>
		</view>
		<view class="itsme-action-sheet-box">
			<u-action-sheet :list="sheetotherlist" v-model="showOtherSheet" @click="clickOtherSheet"
				:tips="{ color: '#000', fontSize: 24 }"></u-action-sheet>
		</view>
		<custom-toast :show="showToast" :type="toastType" :title="toastTitle"></custom-toast>
		<view v-if="showRedPacket">
			<red-packet></red-packet>
		</view>
	</view>
</template>

<script>
	import {
		mapActions,
		mapGetters
	} from 'vuex'
	import videoItem from '../../components/video/item.vue'
	import uploadImg from '../../common/utils/upload-img.js'
	import uploadVideo from '../../common/utils/upload-video.js'
	import CommonService from '../../common/service/common-service.js'
	export default {
		data() {
			return {
				content: '',
				photolist: [],
				sexHidden: false,
				videoData: null,
				isPass: false,
				newTime: null,
				// videoData: {
				// 	url: 'uploads/20201223/FEE14ADA4A7CF3A480D2E60AED9E045E.mp4'
				// },
				isPlay: false,
				showSheet: false,
				showOtherSheet: false,
				showToast: false,
				addr: '',
				toastTitle: '',
				toastType: '',
				sheetlist: [{
						text: '视频'
					},
					{
						text: '照片'
					}
				],
				sheetotherlist: [{
						text: '拍摄'
					},
					{
						text: '从相册选择'
					}
				]
			}
		},
		computed: {
			canEdit() {
				if (this.content || ((this.photolist && this.photolist.length > 0) || this.videoData)) {
					return true
				} else {
					return false
				}
			}
		},
		onLoad() {
			this.init()
		},
		components: {
			videoItem
		},
		onHide() {
			uni.hideLoading()
		},
		methods: {
			...mapActions(['USER', 'SHOW_PROFILE', 'IFTHE_REFRESH', 'IS_SHARE']),
			init() {
				Object.assign(this.$data, this.$options.data())
			},
			selectAddr() {
				let that = this
				uni.chooseLocation({
					success: function(res) {
						let addres = res.address
						let regex = /.+?(省|市|自治区|自治州|县|区)/g;
						console.log(addres.match(regex))
						let city = addres.match(regex)[0].substring(2) === '市' ? addres.match(regex)[0] :
							addres.match(regex)[1];
						that.addr = city + ' · ' + res.name
					}
				})
			},
			// 判断视频/图片
			clickSheet(index) {
				if (index === 0) {
					this.sheetType = 'video'
				} else {
					this.sheetType = 'photo'
				}
				this.showSheet = false
				this.showOtherSheet = true
			},
			//判断拍摄/相册
			clickOtherSheet(index) {
				if (this.sheetType === 'photo') {
					if (index === 0) {
						this.addPhoto('camera')
					} else {
						this.addPhoto('album')
					}
				}
				if (this.sheetType === 'video') {
					if (index === 0) {
						this.addVideo('camera')
					} else {
						this.addVideo('album')
					}
				}
			},
			// toShowToast
			toShowToast(type, title) {
				this.toastType = type
				this.toastTitle = title
				this.showToast = true
			},
			// toHideToast
			toHideToast() {
				this.toastType = ''
				this.toastTitle = ''
				this.showToast = false
			},
			// 添加视频
			addVideo(type) {
				let sourceType = []
				if (type === 'camera') {
					sourceType = ['camera']
				} else {
					sourceType = ['album']
				}
				let that = this
				uni.chooseVideo({
					count: 1,
					sourceType: sourceType,
					maxDuration: 10,
					success: function(res) {
						if (res.errMsg === 'chooseVideo:ok') {
							that.toShowToast('load', '上传中')
							console.log(res)
							that.uploadFile(res.tempFilePath).then(
								(res) => {
									that.videoData = {
										url: res
									}
									that.toHideToast()
								}
							)
						}
					}
				})
			},
			// 添加照片
			addPhoto(type) {
				let sourceType = []
				if (type === 'camera') {
					sourceType = ['camera']
				} else {
					sourceType = ['album']
				}
				let count = 9
				let that = this
				if (this.photolist && this.photolist.length > 0) {
					count = 9 - this.photolist.length
				}
				uni.chooseImage({
					count: count, //可以选择多少张图片
					sizeType:'compressed', //可以指定是原图还是压缩图，默认二者都有
					sourceType: sourceType, //相册或者相机拍摄
					success: (res) => {
						if (res.errMsg === 'chooseImage:ok' && res.tempFilePaths && res.tempFilePaths.length >
							0) {
							that.toShowToast('load', '上传中')
							for (let i = 0; i < res.tempFilePaths.length; i++) {
								that.uploadFile(res.tempFilePaths[i]).then(
									(res) => {
										this.photolist = that.photolist.concat(res)
										that.toHideToast()
									}
								)
							}
						}
					},
					error: (err) => {
						console.log(err)
					}
				})
			},
			changeSexHidden(value) {
				this.sexHidden = value
			},
			// 发布动态
			toEditPhoto() {
				let that = this
				if (!this.canEdit) {
					return false
				}
				this.toShowToast('load', '发布中')
				if (this.content && this.photolist && this.photolist.length === 0 && !this.videoData) {
					// 纯文本动态
					CommonService.publishlife({
						content: this.content,
						attachment_json: '',
						sex_hidden: this.sexHidden ? '1' : '0',
						attachment_type: 1,
						addr: this.addr
					}).then(res => {
						this.toHideToast()
						if (res.code === 1) {
							this.toShowToast('success', '发布成功')
							setTimeout(function() {
								that.toHideToast()
								uni.navigateBack({
									delta: 1
								})
							}, 1500)
						}
					})
				}
				if (this.videoData) {
					// 视频动态
					this.isPlay = false
					let attachmentJson = []
					attachmentJson.push(this.videoData.url)
					attachmentJson = JSON.stringify(attachmentJson)
					CommonService.publishlife({
						content: that.content,
						attachment_json: attachmentJson,
						sex_hidden: that.sexHidden ? '1' : '0',
						attachment_type: 2,
						addr: this.addr
					}).then(res => {
						this.toHideToast()
						if (res.code === 1) {
							this.toShowToast('success', '发布成功')
							setTimeout(function() {
								that.toHideToast()
								uni.navigateBack({
									delta: 1
								})
							}, 1500)
						}
					})
				}
				if (this.photolist && this.photolist.length > 0) {
					// 图片动态
					CommonService.publishlife({
						content: that.content,
						attachment_json: JSON.stringify(this.photolist),
						sex_hidden: that.sexHidden ? '1' : '0',
						attachment_type: 1,
						addr: this.addr
					}).then(res => {
						that.toHideToast()
						if (res.code === 1) {
							this.toShowToast('success', '发布成功')
							setTimeout(function() {
								that.toHideToast()
								uni.navigateBack({
									delta: 1
								})
							}, 1500)
						}
					})
				}
				this.IFTHE_REFRESH(true)
				this.IS_SHARE(true)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.add-photo-box {
		width: calc((100vw - 120rpx) / 3);
		height: calc((100vw - 120rpx) / 3);
	}

	.photo-box {
		width: calc((100vw - 120rpx) / 3);
		height: calc((100vw - 120rpx) / 3);
	}

	.photo-bot-box {
		height: 80rpx;
		line-height: 80rpx;
		border-radius: 80rpx;
		box-shadow: 0 0 12rpx rgba(0, 0, 0, 0.22)
	}

	.video-box {
		width: calc(100vw - 80rpx);
		height: calc((100vw - 80rpx) * 3 / 4);
	}

	.edit-btn {
		width: 90rpx;
	}

	.color-6969B8 {
		color: #6969B8;
	}

	.top-box {
		height: 100rpx;

		&-left {
			width: 200rpx;
		}
	}
</style>
