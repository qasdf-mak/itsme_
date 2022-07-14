<template>
	<view class="width-full bg-white lh1 height100vh">
		<view class="width-full" :style="'height: ' + StatusBar + 'px;'"></view>
		<view class="width-full pt15 pb15 flex flex-right">
			<view class="pl12 pr12 text-right fs15 color-999999" @click="goBack">稍后认证</view>
		</view>
		<view class="width-full mt35">
			<view class="width-full text-center fs20 color-deep fw600 mb30">
				真人认证
			</view>
			<view class="width-full flex flex-col align-items-center">
				<view class="img-box">
					<view class="width-full height" v-if="imgUrl" @click="changeImg">
						<image :src="imgUrl" class="width-full height" mode="aspectFill"></image>
					</view>
					<view class="width-full height flex align-items-center flex-center bg-white br5 box-shadow-face"
						v-else @click="changeImg">
						<view class="icon_font fs40 color-eeeeee">
							&#xe60d;
						</view>
					</view>
				</view>
				<view class="fs14 color-deep mt20 mb35">
					请上传真实照片
				</view>
			</view>
			<view class="ml30 mr25">
				<view class="ml30">
					<view class="width-full flex align-items-center mb10">
						<image src="../../static/base/face_1.png" class="face-img-1" mode="widthFix"></image>
						<view class="fs14 color-main6 ml10">
							认证要求：
						</view>
					</view>
					<view class="width-full fs13 color-999999 lh18">
						1、请上传1张形象良好的正脸照片<br />
						2、保证照片像素清晰、五官可见<br />
						3、上传的照片，会自动上传到相册
					</view>
					<view class="width-full flex align-items-center mt30 mb10">
						<image src="../../static/base/face_2.png" class="face-img-1" mode="widthFix"></image>
						<view class="fs14 color-main6 ml10">
							认证特权：
						</view>
					</view>
					<view class="width-full fs13 color-999999 lh18">
						1、提现现金礼物，提升100身价<br />
						2、完成认证立得10元现金礼物<br />
						3、获得与国王特权交流的机会，解锁提现特权
					</view>
				</view>
			</view>
		</view>
		<view class="fixed bottom left right pb_iphoneX_safe">
			<view class="mb35 ml35 mr35">
				<view class="ml5 mr5 fs18 color-white text-center pt12 pb12 bg-2 br40 box-shadow-login btn-box"
					@click="toStartFace">
					提交照片
				</view>
			</view>
		</view>
		<u-toast ref="uToast" />
		<view v-if="showPop">
			<custom-pop :showPop="showPop" confirmText="重新认证" cancelText="取消" contentTitle="温馨提示"
				contentText="人脸认证失败,请重新认证或跳过" :isText="true" :meiNv="1" @confirm="popConfirm" @cancel="popCancel">
			</custom-pop>
		</view>
		<view v-if="showMalePop">
			<custom-pop :showPop="showMalePop" confirmText="重新选择" cancelText="取消" contentTitle="温馨提示"
				contentText="系统检测到您为男性,是否重新选择性别" :isText="true" :meiNv="1" @confirm="popMaleConfirm" @cancel="popCancel">
			</custom-pop>
		</view>
		<view class="fixed top bottom left right bg-white flex flex-col" v-if="faceIsSuccess">
			<view class="width-full">
				<view class="width-full" :style="'height: ' + StatusBar + 'px;'"></view>
				<view class="pl15 pr15 pt15 pb15 icon_font fs18 color-deep" @click="goBack">
					&#xe638;
				</view>
			</view>
			<view class="width-full flex-1 mb35 pb35 flex align-items-center flex-col flex-center">
				<image src="../../static/base/base_15.png" class="rztg-img" mode="widthFix"></image>
				<view class="mt35 fs20 color-deep fw600">
					真人认证
				</view>
				<view class="mt20 fs15 color-deep mb35 pb35">
					恭喜您，您的真人认证已通过认证
				</view>
			</view>
		</view>
		<view v-if="showRedPacket">
			<red-packet></red-packet>
		</view>
	</view>
</template>

<script>
	import {
		pathToBase64,
		base64ToPath
	} from '../../js_sdk/gsq-image-tools/image-tools'
	import UserService from '../../common/service/user-service.js'
	import uploadImg from '../../common/utils/upload-img.js'
	import updateUser from '../../common/mixins/login.js'
	import {
		faceFind
	} from '../../common/appjs/face.js'
	import {
		mapGetters
	} from 'vuex'
	export default {
		mixins: [updateUser],
		data() {
			return {
				imgUrl: '',
				faceImg: '',
				showPop: false,
				showMalePop: false,
				faceIsSuccess: false
			}
		},
		onLoad() {
			this.init()
		},
		computed: {
			...mapGetters(['user'])
		},
		methods: {
			init() {
				Object.assign(this.$data, this.$options.data())
			},
			// 选择本地图片
			changeImg() {
				uni.chooseImage({
					count: 1, //可以选择多少张图片
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], //相册或者相机拍摄
					success: (res) => {
						pathToBase64(res.tempFilePaths[0])
							.then(base64 => {
								this.imgUrl = base64
							})
							.catch(error => {
								console.error(error)
							})
					},
					error: (err) => {
						console.log(err)
					}
				})
			},
			// 人脸识别准备
			toStartFace() {
				if (!this.imgUrl) {
					this.$refs.uToast.show({
						title: '请先上传照片',
						icon: false
					})
					return false
				}
				faceFind().then(
					img => {
						this.faceImg = img
						UserService.baiduFace({
							image: img
						}).then(res => {
							if (res.code === 1 && res.data && res.data.result && res.data.result.face_num === 1) {
								let gender = res.data.result.face_list[0].gender.type
								if ((this.user.gender === 1 && gender === 'male') || (this.user.gender === 0 && gender === 'female')) {
									this.faceSuccess()
								} else {
									if (this.user.gender === 0 && gender === 'male') {
										this.showMalePop = true
									} else {
										this.showPop = true
									}
								}
							} else {
								this.showPop = true
							}
						})
					},
					() => {
						this.showPop = true
					}
				)
			},
			// 人脸认证成功
			faceSuccess() {
				uni.showLoading({
					title: '审核中'
				})
				this.toUpFaceImg('real')
				UserService.baiduFaceBd({
					image1: this.faceImg,
					image2: this.imgUrl.substring(this.imgUrl.indexOf(';base64,') + 8, this.imgUrl.length)
				}).then(res => {
					if (res.code === 1 && res.data && res.data.result && res.data.result.score >= 80) {
						this.toUpFaceImg('face')
					} else {
						uni.hideLoading()
						uni.navigateBack({
							delta: 1
						})
					}
				})
			},
			// 弹框确认
			popConfirm() {
				this.showPop = false
				this.toStartFace()
			},
			popMaleConfirm() {
				this.showPop = false
				this.showMalePop = false
				uni.reLaunch({
					url: '/pages/login/sex'
				})
			},
			// 弹框取消
			popCancel() {
				this.showPop = false
				this.showMalePop = false
				uni.navigateBack({
					delta: 1
				})
			},
			toUpFaceImg(type) {
				let that = this
				let imgList = []
				let base64 = ''
				if (type === 'real') {
					base64 = 'data:image/jpeg;base64,' + this.faceImg
				} else {
					base64 = this.imgUrl
				}
				base64ToPath(base64)
					.then(path => {
						imgList.push(path)
						uploadImg(imgList).then(imgs => {
							let certifyItem = JSON.stringify({
								img: imgs[0]
							})
							UserService.updateusercertify({
								code: type,
								certify_item: certifyItem
							}).then(res => {
								console.log(res)
								uni.hideLoading()
								that.updateUser().then(() => {
									if (type === 'face') {
										this.faceIsSuccess = true
										setTimeout(() => {
											uni.navigateBack({
												delta: 1
											})
										}, 2000)
									}
								})
							})
						})
					})
					.catch(error => {
						console.error(error)
					})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.img-box {
		width: 270rpx;
		height: 270rpx;
	}

	.face-img-1 {
		width: 28rpx;
		height: 28rpx;
	}
	.rztg-img{
		width: 200rpx;
	}
</style>
