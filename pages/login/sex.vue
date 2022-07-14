<template>
	<view class="width-full height100vh lh1 bg-itsme-1">
		<view class="width-full ml30">
			<view class="width-full" :style="'height:' + StatusBar + 'px;'"></view>
			<view class="width-full pt30 pb3 mb20"></view>
			<view class="width-full fs20 color-white fw600 mb8">
				选择性别
			</view>
			<view class="width-full mt8 fs10 color-itsme-10">
				性别选择后不可更改
			</view>
		</view>
		<view class="ml35 mr35 mt20">
			<view class="ml30 mr30 flex align-items-center flex-between">
				<view class="img-sex mr30" @click="changeSex(1)">
					<image src="../../static/itsme/sex/sex_2.png" class="img-sex" mode="widthFix" v-if="gender === 1">
					</image>
					<image src="../../static/itsme/sex/sex_1.png" class="img-sex" mode="widthFix" v-else></image>
					<view class="fs18 fw600 width-full text-center mt10"
						:class="gender === 1 ? 'color-itsme-2' : 'color-white'">
						男生
					</view>
				</view>
				<view class="img-sex" @click="changeSex(0)">
					<image src="../../static/itsme/sex/sex_3.png" class="img-sex" mode="widthFix" v-if="gender === 0">
					</image>
					<image src="../../static/itsme/sex/sex_0.png" class="img-sex" mode="widthFix" v-else></image>
					<view class="fs18 fw600 width-full text-center mt10"
						:class="gender === 0 ? 'color-itsme-2' : 'color-white'">
						女生
					</view>
				</view>
			</view>
		</view>
		<view class="mt30 mb30 pt30"></view>
		<view class="width-full mt30 pt15 flex align-items-center pr30">
			<view class="fs18 ml30 pl3 color-white fw600 mb8 mr25">
				你的昵称
			</view>
			<view class="flex ml12 bg-itsme-12 sex-input pl20 pr18 align-items-center border-box">
				<input v-model="nickname" type="text" maxlength="5" class="sex-box-1 text-left" placeholder="请输入昵称" />
				<view class="flex align-items-center" @click="randomNickname">
					<view class="icon_font ml5 color-itsme-2 fs15">
						&#xe7c6;
					</view>
				</view>
			</view>
		</view>
		<view class="width-full mt30 pt15 flex align-items-center pr30" v-if="showCodeInput">
			<view class="fs18 ml30 pl3 color-white fw600 mb8 mr20">
				好友邀请码
			</view>
			<view class="flex  bg-itsme-12 sex-input pl20 align-items-center border-box">
				<input v-model="inviteCode" type="text" maxlength="8" class="sex-box text-left fs14"
					placeholder="如有关联上级请输入" />
			</view>
			<view class="flex align-items-center ml5" @click="closeInput">
				<view class="icon_font ml5 color-itsme-10 fs15">
					&#xe65d;
				</view>
			</view>
		</view>
		<view class="width-full flex flex-right">
			<view class="invite-msg-box fs14 color-main6">
				{{inviteMsg}}
			</view>
			<view class="mr35 ml8"> </view>
		</view>

		<view class="absolute left right bottom25 ml30 mr30 pt25 pb30  pl20 pr20 ">
			<view class="ml10 mr10 pt12 pb12 br40 fs18 text-center bg-itsme-2 box-shadow-login btn-box"
				@click="nextStep">
				下一步
			</view>
		</view>
		<u-toast ref="uToast" />
		<!-- 权限弹窗 -->
		<unify-pop :showUnify="showUnifyPopFace" :type="unifyTypeFace" :centent="contentText"
			@closePop="showUnifyPopFace = false" @popConfirm="popConfirm" @closePopCancel="closePopCancel"
			@NoPerfectCancel="NoPerfectCancel" @popMaleConfirm="popMaleConfirm"></unify-pop>
		<!-- 权限弹窗 -->
		<!-- 权限弹窗 -->
		<new-unify-pop :showUnify="showUnifyPop" :type="unifyType" :centent="contentText"
			@closePop="showUnifyPop = false" @popConfirm="popConfirm"></new-unify-pop>
		<!-- 权限弹窗 -->
		<custom-toast :show="showToast" :type="toastType" :title="toastTitle"></custom-toast>
		<!-- <red-packet></red-packet> -->
	</view>
</template>

<script>
	import {
		mapActions,
		mapGetters
	} from 'vuex'
	import {
		faceFind
	} from '../../common/appjs/face.js'
	import {
		formatImage
	} from '../../common/utils/common-methods'
	import {
		base64ToPath,
		pathToBase64
	} from '../../js_sdk/gsq-image-tools/image-tools'
	import uploadImg from '../../common/utils/upload-img.js'
	import UserService from '../../common/service/user-service.js'
	import CommonService from '../../common/service/common-service.js'
	import loginRouter from '../../common/mixins/login.js'
	import updateUser from '../../common/mixins/login.js'
	import IMService from "../../common/appjs/imservice.js"
	export default {
		mixins: [loginRouter, updateUser],
		data() {
			return {
				showToast: false,
				toastType: '',
				toastTitle: '',
				nickname: '',
				gender: null,
				inviteCode: '',
				showClosePop: false,
				inviteMsg: '',
				showCodeInput: false,
				contentText: '',
				showUnifyPopFace: false,
				unifyTypeFace: null,
				faceImg: '',
			}
		},
		onLoad(options) {
			this.init(options)
		},
		computed: {
			...mapGetters(['likeList']),
			isReal() {
				if (this.user.is_real === 1) {
					return true
				} else {
					return false
				}
			}
		},
		methods: {
			...mapActions(['USER', 'SHOW_PROFILE', 'LIKE_LIST', 'PUSHPOP']),
			init(options) {
				Object.assign(this.$data, this.$options.data())
				console.log(this.user)
				console.log(options.showCode)
				if (this.user && options.showCode === "true") {
					this.showCodeInput = true
				}
				if (this.user && this.user.nickname) {
					this.nickname = this.user.nickname
					this.gender = this.user.gender
				}
			},
			// 关闭按钮
			closePopCancel() {
				this.showClosePop = false
				this.$emit('closePerfectPop')
			},
			NoPerfectCancel() {
				this.toStartFace()
			},
			popMaleConfirm() {
				this.showUnifyPopFace = false
			},
			// 随机昵称
			randomNickname() {
				if (this.gender !== null) {
					if (this.gender === 0) {
						UserService.randomnickname({
							sex: 2
						}).then(res => {
							this.nickname = res.data
						})
					} else {
						UserService.randomnickname({
							sex: 1
						}).then(res => {
							this.nickname = res.data
						})
					}
				} else {
					this.$refs.uToast.show({
						title: '请先选择性别',
						icon: false
					})
					return false
				}
			},
			//清空好友邀请码输入框
			closeInput() {
				this.inviteCode = ''
			},
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
			// 选择性别
			changeSex(value) {
				console.log(value)
				this.gender = value
			},
			// 弹窗确认
			popConfirm() {
				let name = this.$u.trim(this.nickname)
				console.log(this.nickname)
				this.showUnifyPop = false
				this.toShowToast('load', '提交中')
				UserService.sexnickname({
					nickname: name,
					gender: this.gender,
					invite_code: this.inviteCode,
					like_user: JSON.stringify(this.likeList)
				}).then(res => {
					if (res.code === 1) {
						// 成功下一步
						console.log(res)
						this.updateUser().then(() => {})
						if (this.gender === 1 && res.data && res.data.length > 0) {
							for (let i = 0; i < res.data.length; i++) {
								this.setUserLike('sex', 'plus', res.data[i]).then(() => {})
							}
						}
						this.toHideToast()
						this.LIKE_LIST([])
						this.SHOW_PROFILE(true)
						if (this.gender === 0) {
							this.SHOW_PROFILE(true)
							this.toStartFace()
							// uni.switchTab({
							// 	url: '/pages/itsme/index' 
							// })
						} else {
							uni.redirectTo({
								url: '/pages/itsme/fillInformation?name=' + this.nickname
							})
						}
					} else {
						this.toHideToast()
						this.$refs.uToast.show({
							title: res.msg,
							icon: false
						})
					}
				})
			},
			toStartFace() {
				if (this.platform !== 'APP') {
					this.perfectIndex = 5
					setTimeout(() => {
						this.closePerfectPop()
					}, 1500)
					return false
				}
				faceFind().then(
					img => {
						this.faceImg = img
						UserService.baiduFace({
							image: img
						}).then(res => {
							console.log(res)
							// this.faceSuccess()
							if (res.code === 1 && res.data && res.data.result && res.data.result
								.face_num ===
								1) {
								let gender = res.data.result.face_list[0].gender.type
								console.log(res)
								console.log(gender)
								console.log(this.user.gender)
								if ((this.user.gender === 1 && gender === 'male') || (this.user.gender === 0 &&
										gender === 'female')) {
									// if (true) {
									this.faceSuccess()
								} else {
									if (this.user.gender === 0 && gender === 'male') {
										this.unifyTypeFace = 11
										this.showUnifyPopFace = true
									} else {
										this.unifyTypeFace = 13
										this.showUnifyPopFace = true
									}
								}
							} else {
								this.unifyTypeFace = 13
								this.showUnifyPopFace = true
							}
						})
					},
					() => {
						this.unifyTypeFace = 13
						this.showUnifyPopFace = true
					}
				)
			},
			// 人脸认证成功
			faceSuccess() {
				uni.showLoading({
					title: '审核中'
				})
				console.log('认证环节2121')
				let imgUrl = formatImage('/uploads/20210716/6cdc63a6dfa9d6a3ba0ebf5e93c5ca4e.jpg')
				uni.downloadFile({
					url: imgUrl,
					success: (img) => {
						console.log('认证环节221')
						if (img.statusCode === 200) {
							pathToBase64(img.tempFilePath)
								.then(base64 => {
									UserService.baiduFaceBd({
										image1: this.faceImg,
										image2: base64.substring(base64.indexOf(
												';base64,') + 8,
											base64.length)
									}).then(res => {
										console.log('认证环节2211111')
										uni.hideLoading()
										this.toUpFaceImg()
									})
								})
								.catch(error => {
									uni.hideLoading()
									this.unifyTypeFace = 12
									this.showUnifyPopFace = true
									console.error(error)
								})
						} else {
							uni.hideLoading()
							this.unifyTypeFace = 12
							this.showUnifyPopFace = true
						}
					}
				})
			},
			toUpFaceImg() {
				console.log('认证成功')
				let imgList = []
				let base64 = 'data:image/jpeg;base64,' + this.faceImg
				base64ToPath(base64)
					.then(path => {
						imgList.push(path)
						uploadImg(imgList).then(imgs => {
							let certifyItem = JSON.stringify({
								img: imgs[0]
							})
							UserService.updateusercertify({
								code: 'real',
								certify_item: certifyItem
							}).then(res => {
								console.log(res)
								uni.hideLoading()
								this.perfectIndex = 5
								uni.showToast({
									title: '认证成功'
								})
								this.PUSHPOP(true)
								setTimeout(() => {
									uni.redirectTo({
										url: '/pages/itsme/fillInformation'
									})
								}, 1500)
								this.updateUser().then(() => {
									console.log('认证成功')


								})
							})
						})
					})
					.catch(error => {
						console.error(error)
					})
			},
			// 下一步
			nextStep() {
				let name = this.$u.trim(this.nickname)
				if (!name) {
					this.$refs.uToast.show({
						title: '请输入您的昵称',
						icon: false
					})
					return false
				}
				if (this.gender === null) {
					this.$refs.uToast.show({
						title: '请选择您的性别',
						icon: false
					})
					return false
				}
				if (this.gender === 1) {
					this.contentText = '您选择的性别为: 男 <br /> 注册后不可修改哦！'
				} else {
					this.contentText = '您选择的性别为: 女 <br /> 为了您在APP内更好的体验，<br />邀请您进行人脸识别'
				}
				this.unifyType = 1
				this.showUnifyPop = true
			}
		}
	}
</script>

<style lang="scss" scoped>
	.sex-box {
		width: 300rpx;
	}

	.sex-box-1 {
		width: 280rpx;
	}

	.sex-input {
		font-size: 26rpx;
		text-align: center;
		height: 80rpx;
		border-radius: 30rpx;
	}

	.invite-box {
		width: 250rpx;
		height: 72rpx;
		margin-right: 90rpx;
		background: rgba($color: #000000, $alpha: 0.05);
		border-radius: 16rpx;
	}

	.invite-input {
		width: 250rpx;
		height: 72rpx;
		line-height: 72rpx;
		text-align: center;
	}

	.invite-msg {
		height: 30rpx;
	}

	.invite-msg-box {
		width: 250rpx;
		height: 72rpx;
		line-height: 70rpx;
		margin-right: 90rpx;
	}

	.img-sex {
		width: 240rpx;
		height: 240rpx;
	}
</style>
