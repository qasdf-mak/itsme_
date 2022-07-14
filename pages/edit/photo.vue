<template>
	<view class="width-full lh1 height100vh bg-itsme-1 flex flex-col">
		<custom-nav title="发布相册" showTextBack></custom-nav>
		<view class="pt20 pb20 pl20 pr20 flex-1 border-box">
			<!-- 初始阶段 -->
			<view class="add-photo-box flex align-items-center flex-center br5 bg-itsme-4 mt10"
				v-if="photoList && photoList.length === 0 && !videoData" @click="showSheet = true">
				<view class="icon_font fs30 color-itsme-1">
					&#xe60d;
				</view>
			</view>
			<!-- 上传按钮 -->
			<!-- 相册列表 -->
			<view class="width-full flex align-items-center flex-wrap mt10" v-if="photoList && photoList.length > 0">
				<view v-for="(item,index) in photoList" :key="index">
					<view class="mt10" :class="(index + 1) % 3 === 0 ? '' : 'mr10'">
						<edit-photo :item="item" @delPhoto="delPhoto(index)" @setPhoto="setPhoto($event, index)">
						</edit-photo>
					</view>
				</view>
				<view v-if="!photoList || (photoList && photoList.length < 9)">
					<view class="add-photo-box flex align-items-center flex-center br5 bg-itsme-4 mt10"
						@click="toAddPhoto">
						<view class="icon_font fs30 color-shallow">
							&#xe60d;
						</view>
					</view>
				</view>
			</view>
			<!-- 相册列表 -->
			<!-- 视频 -->
			<view class="width-full" v-if="videoData">
				<view class="video-box float-hidden">
					<video-item :url="videoData.url" :isPlay="isPlay" @toPlayVideo="isPlay = true"
						@videoEnded="isPlay = false"></video-item>
				</view>
				<view class="width-full pt20">
					<view class="width-full">
						<view class="width-full flex align-items-center mb20" @click="changeRule(3)">
							<view class="icon_font color-main6 fs16" v-if="videoData.rule_type === 3">
								&#xe64d;
							</view>
							<view class="icon_font color-aaaaaa fs16" v-else>
								&#xe63f;
							</view>
							<view class="flex-1 fs15 color-deep ml12">
								阅后即焚照片，查看{{(isVip || isNvShen) ? 8 : 3}}秒后焚毁
							</view>
						</view>
						<view class="width-full flex align-items-center mb20" @click="changeRule(4)"
							v-if="!user.gender || user.gender === 0">
							<view class="icon_font color-main6 fs16" v-if="videoData.rule_type === 4">
								&#xe64d;
							</view>
							<view class="icon_font color-aaaaaa fs16" v-else>
								&#xe63f;
							</view>
							<view class="flex-1 ml12 flex align-items-center">
								<view class="fs15 color-deep">
									会员照片
								</view>
								<!-- <view class="fs15 color-deep edit-input-box ml5 mr5">
									消耗<input type="text" v-model="videoData.price" />
								</view>
								<view class="fs15 color-deep">
									M豆可查看
								</view> -->
							</view>
						</view>
						<view class="width-full flex align-items-center mb20" @click="changeRule(2)">
							<view class="icon_font color-main6 fs16" v-if="videoData.rule_type === 2">
								&#xe64d;
							</view>
							<view class="icon_font color-aaaaaa fs16" v-else>
								&#xe63f;
							</view>
							<view class="flex-1 fs15 color-deep ml12">
								普通照片
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 视频 -->
		</view>
		<view class="width-full pb_iphoneX_safe">
			<view class="photo-bot-box bg-2 color-white fs18 text-center fw600 btn-box"
				:class="(photoList.length === 0 && (!videoData || (videoData && videoData.rule_type === 4 && videoData.price === 0))) ? 'opacity60' : ''"
				@click="toEditPhoto">
				发布
			</view>
			<view class="width-full fs13 color-middle text-center mt25 mb35">
				请勿上传裸露低俗的照片，严重者将封号处理
			</view>
			<view class="pb35"></view>
		</view>
		<view class="itsme-action-sheet-box">
			<u-action-sheet :list="sheetlist" v-model="showSheet" @click="clickSheet"></u-action-sheet>
		</view>
		<view class="itsme-action-sheet-box">
			<u-action-sheet :list="sheetotherlist" v-model="showOtherSheet" @click="clickOtherSheet"></u-action-sheet>
		</view>
		<custom-toast :show="showToast" :type="toastType" :title="toastTitle"></custom-toast>
		<!-- <custom-pop
			:showPop="showPop"
			:confirmText="confirmText"
			cancelText="取消"
			:contentText="contentText"
			isText
			:meiNv="2"
			@confirm="popConfirm"
			@cancel="popCancel"
		></custom-pop> -->\
		<!-- 权限弹窗 -->
		<unify-pop :showUnify="showUnifyPop" :type="unifyType" @closePop="showUnifyPop = false"
			@popConfirmFace="popConfirmFace">
		</unify-pop>
		<!-- 权限弹窗 -->
		<u-toast ref="uToast" z-index="999999" />
		<view v-if="showRedPacket">
			<red-packet></red-packet>
		</view>
		<!-- 完善资料 -->
		<view class="width-full" v-if="showPerfectPop">
			<perfect-pop @refreshTheList="refreshTheList" @closePerfectPop="toHidePerfectPop" :perfectNum="1">
			</perfect-pop>
		</view>
		<!-- 完善资料 -->
	</view>
</template>

<script>
	import {
		mapGetters
	} from 'vuex'
	import editPhoto from '../../components/photo/edit.vue'
	import videoItem from '../../components/video/item.vue'
	import uploadImg from '../../common/utils/upload-img.js'
	import uploadVideo from '../../common/utils/upload-video.js'
	import CommonService from '../../common/service/common-service.js'
	export default {
		data() {
			return {
				showPop: false,
				confirmText: '',
				contentText: '',
				sheetType: '',
				isFlag: false,
				photoList: [],
				videoData: null,
				isPlay: false,
				showToast: false,
				toastTitle: '',
				toastType: '',
				showSheet: false,
				showOtherSheet: false,
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
			...mapGetters(['user']),
			isVip() {
				if (this.user && this.user.is_vip && this.user.is_vip === 1) {
					return true
				} else {
					return false
				}
			},
			isReal() {
				if (this.user && this.user.is_real === 1) {
					return true
				} else {
					return false
				}
			},
			isNvShen() {
				if (this.user && this.user.certify) {
					let certify = JSON.parse(this.user.certify)
					if (certify.goddess && certify.goddess.verified) {
						return true
					} else {
						return false
					}
				} else {
					return false
				}
			}
		},
		components: {
			editPhoto,
			videoItem
		},
		onLoad() {
			this.init()
		},
		methods: {
			init() {
				Object.assign(this.$data, this.$options.data())
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
			toAddPhoto() {
				this.sheetType = 'photo'
				this.showOtherSheet = true
			},
			// 添加视频
			addVideo(type) {
				let sourceType = []
				if (type === 'camera') {
					sourceType = ['camera']
				} else {
					sourceType = ['album']
				}
				uni.chooseVideo({
					count: 1,
					sourceType: sourceType,
					success: (res) => {
						if (res.errMsg === 'chooseVideo:ok') {
							this.toShowToast('load', '上传中')
							this.uploadFile(res.tempFilePath).then(
								(res) => {
									this.videoData = {
										url: res,
										type: 'itsme_video',
										rule_type: 2,
										price: 0
									}
									this.toHideToast()
								}
							)
						}
					}
				})
			},
			popConfirmFace() {
				this.showPerfectPop = true
				this.showUnifyPop = false
			},
			changeRule(value) {
				if (value === 2) {
					this.videoData.rule_type = 2
				}
				if (value === 3) {
					if (this.isReal) {
						this.videoData.rule_type = 3
					} else {
						this.showUnifyPop = true
						this.unifyType = 23
					}
				}
				if (value === 4) {
					// if (this.isNvShen) {
					this.videoData.rule_type = 4
					// } else {
					// 	this.confirmText = "女神认证"
					// 	this.contentText = '设置会员照片必须先通过女神认证，请先去认证吧！！！'
					// 	this.showPop = true
					// }
				}
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
				if (this.photoList && this.photoList.length > 0) {
					count = 9 - this.photoList.length
				}
				uni.chooseImage({
					count: count, //可以选择多少张图片
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: sourceType, //相册或者相机拍摄
					success: (res) => {
						console.log(res)
						if (res.errMsg === 'chooseImage:ok' && res.tempFilePaths && res.tempFilePaths.length >
							0) {
							this.photoList = this.photoList.concat(res.tempFilePaths.map(img => {
								let item = {}
								item.url = img
								console.log(img)
								item.type = 'itsme_image'
								item.rule_type = 2
								item.price = 0
								return item
							}))
						}
					},
					error: (err) => {
						console.log(err)
					}
				})
			},
			// 删除照片
			delPhoto(index) {
				this.photoList.splice(index, 1)
			},
			// 设置照片权限
			setPhoto(item, index) {
				this.photoList[index] = item
			},
			// 发布照片
			editImages() {
				this.toShowToast('load', '发布中')
				let photoData = this.photoList
				let imgList = photoData.map(item => {
					return item.url
				})
				for (let i = 0; i < imgList.length; i++) {
					this.uploadFile(imgList[i]).then(res => {
						console.log(res)
						photoData[i].url = res
						if (imgList.length - i == 1) {
							this.uploadFile(imgList[i]).then(res => {
								console.log(res)
								console.log(photoData)
								setTimeout(() => {
									console.log(photoData)
									CommonService.publishphoto({
										photo_data: JSON.stringify(photoData)
									}).then(res => {
										console.log(res)
										this.toHideToast()
										if (res.code === 1) {
											this.toShowToast('success', '发布成功')
											setTimeout(() => {
												this.toHideToast()
												uni.navigateBack({
													delta: 1
												})
											}, 1500)
										}
									})
								}, 500)
							})
						}
					})
				}
			},
			// 发布视频
			editVideo() {
				this.isPlay = false
				this.toShowToast('load', '发布中')
				let photoData = []
				photoData.push(this.videoData)
				CommonService.publishphoto({
					photo_data: JSON.stringify(photoData)
				}).then(res => {
					this.toHideToast()
					if (res.code === 1) {
						this.toShowToast('success', '发布成功')
						setTimeout(() => {
							this.toHideToast()
							uni.navigateBack({
								delta: 1
							})
						}, 1500)
					}
				})
			},
			// 发布
			toEditPhoto() {
				if (this.photoList.length === 0 && !this.videoData) {
					return false
				}
				// if (this.videoData && this.videoData.rule_type === 4 && this.videoData.price === 0) {
				// 	this.$refs.uToast.show({
				// 		title: '请填写M豆数',
				// 		icon: false,
				// 		duration: 1000
				// 	})
				// 	return false
				// }
				if (this.photoList && this.photoList.length > 0) {
					this.editImages()
				}
				if (this.videoData) {
					this.editVideo()
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.add-photo-box {
		width: calc((100vw - 120rpx) / 3);
		height: calc((100vw - 120rpx) / 3);
		box-shadow: 0 0 10rpx 3rpx rgba(132, 131, 131, 0.2);
	}

	.photo-bot-box {
		margin-top: 130rpx;
		margin-left: 80rpx;
		margin-right: 80rpx;
		height: 80rpx;
		line-height: 80rpx;
		border-radius: 80rpx;
		box-shadow: 0 0 12rpx rgba(0, 0, 0, 0.22)
	}

	.rule-input {
		width: 150rpx;
	}

	.video-box {
		width: calc(100vw - 80rpx);
		height: calc((100vw - 80rpx) * 3 / 4);
	}

	.edit-input-box {
		width: 100rpx;
		border-bottom: 2rpx solid #DDDDDD;

		input {
			width: 100rpx;
			border: 0;
			padding: 0;
			margin: 0;
			background: none;
			text-align: center;
		}
	}
</style>
