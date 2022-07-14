<template>
	<view class="width-full bg-white lh1 height100vh">
		<custom-nav></custom-nav>
		<view class="width-full mt35 pt20">
			<view class="width-full text-center fs22 color-deep fw600 mb35">
				真人认证
			</view>
			<view class="width-full mt15 flex flex-col align-items-center">
				<view class="img-box">
					<view class="width-full height" v-if="imgUrl" @click="changeImg">
						<image :src="imgUrl" class="width-full height" mode="aspectFill"></image>
					</view>
					<view class="width-full height flex align-items-center flex-center bg-white br5 box-shadow-face" v-else @click="changeImg">
						<view class="icon_font fs40 color-shallow">
							&#xe60d;
						</view>
					</view>
				</view>
				<view class="fs14 color-deep mt20 mb35">
					请上传真实照片
				</view>
			</view>
			<view class="width-full mt20 ml35">
				<view class="color-main1 fs14 mb10 ml35">认证说明：</view>
				<view class="color-shallow fs14 lh18 ml35">
					1、请上传1张形象良好的正脸照片。<br />
					2、保证照片像素清晰、五官可见。<br />
					3、上传的照片，会自动上传到相册。<br />
				</view>
			</view>
		</view>
		<view class="fixed bottom left right pb_iphoneX_safe">
			<view class="mb35 ml35 mr35">
				<view class="ml5 mr5 fs18 color-deep text-center pt12 pb12 bg-white br40 box-shadow-login btn-box" @click="toStartFace">
					下一步
				</view>
			</view>
		</view>
		<u-toast ref="uToast" />
		<custom-pop
			:showPop="showPop"
			confirmText="重新认证"
			cancelText="跳过"
			contentTitle="温馨提示"
			contentText="人脸认证失败,请重新认证或跳过"
			:isText="true"
			:meiNv="1"
			@confirm="popConfirm"
			@cancel="popCancel"
		></custom-pop>
		<red-packet></red-packet>
	</view>
</template>

<script>
	import { pathToBase64, base64ToPath } from '../../js_sdk/gsq-image-tools/image-tools'
	import UserService from '../../common/service/user-service.js'
	import uploadImg from '../../common/utils/upload-img.js'
	import updateUser from '../../common/mixins/login.js'
	import { faceFind } from '../../common/appjs/face.js'
	import { mapGetters } from 'vuex'
	export default {
		mixins: [updateUser],
		data() {
			return {
				imgUrl: '',
				faceImg: '',
				showPop: false
			}
		},
		onLoad() {
			this.init()
		},
		computed:{
			...mapGetters(['user'])
		},
		methods: {
			init() {
				Object.assign(this.$data, this.$options.data())
			},
			// 选择本地图片
			changeImg() {
				let that = this
				uni.chooseImage({
					count: 1, //可以选择多少张图片
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], //相册或者相机拍摄
					success: (res) => {
						pathToBase64(res.tempFilePaths[0])
						  .then(base64 => {
								that.imgUrl = base64
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
				let that = this
				if (!this.imgUrl) {
					this.$refs.uToast.show({
						title: '请先上传照片',
						icon: false
					})
					return false
				}
				faceFind().then(
					img => {
						that.faceImg = img
						UserService.baiduFace({
							image: img
						}).then(res => {
							if (res.code === 1 && res.data && res.data.result && res.data.result.face_num === 1) {
								let gender = res.data.result.face_list[0].gender.type
								if ((this.user.gender === 1 && gender === 'male') || (this.user.gender === 0 && gender === 'female')) {
									that.faceSuccess()
								} else {
									that.showPop = true
								}
							} else {
								that.showPop = true
							}
						})
					},
					() => {
						that.showPop = true
					}
				)
			},
			// 人脸认证成功
			faceSuccess () {
				let that =this
				this.toUpFaceImg('real')
				UserService.baiduFaceBd({
					image1: this.faceImg,
					image2: this.imgUrl.substring(this.imgUrl.indexOf(';base64,') + 8, this.imgUrl.length)
				}).then(res => {
					console.log('res')
					console.log(res)
					console.log('res')
					if (res.code === 1 && res.data && res.data.result && res.data.result.score >= 80) {
						uni.showLoading({
							title: '审核中'
						})
						that.toUpFaceImg('face')
					} else {
						uni.redirectTo({
						    url: '/pages/my/expect'
						})
					}
				})
			},
			// 弹框确认
			popConfirm () {
				this.showPop = false
				this.toStartFace()
			},
			// 弹框取消
			popCancel () {
				this.showPop = false
				uni.redirectTo({
				    url: '/pages/my/lable'
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
							let certifyItem = JSON.stringify({img: imgs[0]})
							UserService.updateusercertify({
								code: type,
								certify_item: certifyItem
							}).then(res => {
								console.log(res)
								uni.hideLoading()
								that.updateUser().then(() => {
									if (type === 'face') {
										uni.redirectTo({
										    url: '/pages/my/expect'
										})
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
	.img-box{
		width: 300rpx;
		height: 300rpx;
	}
</style>
