<template>
	<view class="width-full height100vh lh1 bg-itsme-1">
		<!-- top begin -->
		<view class="bg-itsme-1">
			<view class="width-full" :style="'height: ' + StatusBar + 'px;'"></view>
			<view class="width-full login-nav-box flex align-items-center">
				<view class="icon_font fs20 color-white fw600 pl15" @click="goBack">
					&#xe638;
				</view>
			</view>
			<view class="width-full mt10 flex align-items-center flex-center">
				<image src="../../static/itsme/itsme_27.png" class="login-logo pb35" mode="widthFix"></image>
			</view>
			<view class="width-full text-center fs18 fw400 color-itsme-2">
				找回密码
			</view>
		</view>
		<!-- top end -->
		<view class="bg-itsme-1 login-box float-hidden mt20 flex flex-col">
			<view class="flex flex-col flex-center">
				<view class="ml35 mr35 pl20 pr20">
					<view class="width-full login-input-box pl25  pr18  flex align-items-center">
						<view class="img-box-user ml5 mb5 mt5 mr15">
							<image src="/static/itsme/itsme_23.png" class="img-box-user" mode="widthFix"></image>
						</view>
						<view class="flex-1">
							<u-input v-model="userInfo.mobile" class="fs14 color-deep" type="number" :custom-style="{'color': '#9e9e9f'}"
								placeholder="请输入手机号" maxlength="11" placeholderStyle="color: #cccccc" :border="false"
								@input="mobileInput" @blur="mobileblur" />
						</view>
					</view>
					<view class="width-full fs12 pl35 border-box color-main3 phone-yz-box">
						{{verification.mobile}}
					</view>
					<view class="width-full login-input-box pl25 pr18 flex align-items-center">
						<view class="icon_font color-itsme-2 fs16 ml5 mb5 mt5 mr15">
							&#xe659;
						</view>
						<view class="flex-1 flex align-items-center">
							<view class="flex-1">
								<u-input v-model="userInfo.code" class="fs14 color-deep" type="number" :custom-style="{'color': '#9e9e9f'}"
									placeholder="请输入验证码" maxlength="11" placeholderStyle="color: #cccccc"
									:border="false" @blur="codeblur" />
							</view>
							<view class="fs10 color-white pt5 pb5 text-center bg-2 pr10 pl10 register-box"
								:class="!verificationMobile ? 'opacity60' : ''" @click="getSend" v-if="!timeShow">
								获取验证码
							</view>
							<view class="fs12 color-white pt5 pb5 text-center bg-2 opacity60 pr10 pl10 register-box"
								v-else>
								{{time}}后重新发送
							</view>
						</view>
					</view>
					<view class="width-full fs12 pl35 border-box color-main3 phone-yz-box">
						{{verification.code}}
					</view>
					<view class="width-full login-input-box pl25 pr18 flex align-items-center">
						<view class="img-box-pwd ml5 mb5 mt5 mr15">
							<image src="/static/itsme/itsme_24.png" class="img-box-pwd" mode="widthFix"></image>
						</view>
						<view class="flex-1">
							<u-input v-model="userInfo.password" class="fs14 color-deep" type="password" :custom-style="{'color': '#9e9e9f'}"
								placeholder="设置密码" maxlength="11" placeholderStyle="color: #cccccc" :border="false"
								@blur="passwordblur" />
						</view>
					</view>
					<view class="width-full fs12 pl35 border-box color-main3 phone-yz-box">
						{{verification.password}}
					</view>
					<view class="width-full login-input-box pl25  pr18  flex align-items-center">
						<view class="img-box-pwd ml5 mb5 mt5 mr15">
							<image src="/static/itsme/itsme_24.png" class="img-box-pwd" mode="widthFix"></image>
						</view>
						<view class="flex-1">
							<u-input v-model="userInfo.repassword" class="fs14 color-deep" type="password" :custom-style="{'color': '#9e9e9f'}"
								placeholder="确定密码" maxlength="11" placeholderStyle="color: #cccccc" :border="false"
								@blur="repasswordblur" />
						</view>
					</view>
					<view class="width-full fs12 pl35 border-box color-main3 phone-yz-box">
						{{verification.repassword}}
					</view>
				</view>
				<view class="ml30 mr30 pr35 pl35 mt20 mb20">
					<view class="ml20 mr20 fs18 color-white text-center pt10 pb10 bg-itsme-2 br40 box-shadow-login btn-box"
						@click="goRegister">
						确认
					</view>
				</view>
			</view>
		</view>
		<!-- 底部文字 start -->
		<view class="absolute left right bottom15 width-full pt10 pb20">
			<view class="width-full fs10 color-itsme-9 lh15 text-center mt8">
				*自动屏蔽手机通讯录中的联系人<br />
				他人通讯录中有你也会自动屏蔽
			</view>
		</view>
		<!-- 底部文字 end -->
		<u-toast ref="uToast" />
		<red-packet></red-packet>
	</view>
</template>

<script>
	import CommonService from '../../common/service/common-service.js'
	import UserService from '../../common/service/user-service.js'
	export default {
		data() {
			return {
				userInfo: {
					mobile: '',
					password: '',
					repassword: '',
					code: ''
				},
				verification: {
					mobile: '',
					password: '',
					repassword: '',
					code: ''
				},
				checked: false,
				timeShow: false,
				time: 59
			}
		},
		onLoad() {
			this.init()
		},
		computed: {
			verificationMobile() {
				if (this.userInfo.mobile) {
					let myreg = /^[1][2-9][0-9]{9}$/
					if (myreg.test(this.userInfo.mobile)) {
						return true
					} else {
						return false
					}
				} else {
					return false
				}
			}
		},
		methods: {
			init() {
				Object.assign(this.$data, this.$options.data())
			},
			// 手机号验证
			mobileblur(value) {
				if (value.length === 0) {
					this.verification.mobile = '请输入手机号'
				} else {
					if (value.length === 11) {
						let myreg = /^[1][2-9][0-9]{9}$/
						if (myreg.test(value)) {
							this.verification.mobile = ''
						} else {
							this.userInfo.mobile = ''
							this.verification.mobile = '手机号输入有误，请重新输入'
						}
					} else {
						this.userInfo.mobile = ''
						this.verification.mobile = '手机号输入有误，请重新输入'
					}
				}
			},
			mobileInput(value) {
				if (value.length === 11) {
					let myreg = /^[1][2-9][0-9]{9}$/
					if (myreg.test(value)) {
						this.verification.mobile = ''
					} else {
						this.userInfo.mobile = ''
						this.verification.mobile = '手机号输入有误，请重新输入'
					}
				}
			},
			// 验证码验证
			codeblur(value) {
				if (value.length === 0) {
					this.verification.code = '请输入验证码'
				} else {
					this.verification.code = ''
				}
			},
			// 同意
			changeChecked({
				value
			}) {
				this.checked = value
			},
			// 密码验证
			passwordblur(value) {
				if (value.length < 6) {
					this.verification.password = '请输入6位数以上密码'
				} else {
					this.verification.password = ''
				}
			},
			// 确认密码验证
			repasswordblur(value) {
				if (value.length === 0) {
					this.verification.repassword = '请再次输入密码'
				} else {
					if (value === this.userInfo.password) {
						this.verification.repassword = ''
					} else {
						this.userInfo.repassword = ''
						this.verification.repassword = '两次密码输入不同，请重新输入'
					}
				}
			},
			// 获取手机验证码
			getSend() {
				let that = this
				if (this.verificationMobile) {
					CommonService.getsend({
						mobile: this.userInfo.mobile,
						event: 'resetpwd'
					}).then(res => {
						if (res.code === 1) {
							that.$refs.uToast.show({
								title: '发送成功',
								icon: false
							})
							that.timeShow = true
							that.setTime()
						} else {
							that.$refs.uToast.show({
								title: res.msg,
								icon: false
							})
						}
					})
				} else {

				}
			},
			toLogin() {
				uni.redirectTo({
					url: '/pages/login/index'
				})
			},
			// 倒计时
			setTime() {
				let that = this
				if (this.time > 0) {
					this.time--
					setTimeout(function() {
						that.setTime()
					}, 1000);
				} else {
					this.timeShow = false
					this.time = 59
				}
			},
			// 注册
			goRegister() {
				let that = this
				if (!this.userInfo.mobile) {
					this.verification.mobile = '请输入手机号'
				}
				if (!this.userInfo.code) {
					this.verification.code = '请输入验证码'
				}
				if (!this.userInfo.password) {
					this.verification.password = '请输入6位数以上密码'
				}
				if (!this.userInfo.repassword) {
					this.verification.repassword = '请再次输入密码'
				}
				if (!this.verification.mobile && !this.verification.password && !this.verification.repassword && !this
					.verification.code) {
					UserService.resetpwd({
						type: 'mobile',
						mobile: this.userInfo.mobile,
						newpassword: this.userInfo.password,
						newpassword1: this.userInfo.repassword,
						captcha: this.userInfo.code
					}).then(res => {
						if (res.code === 1) {
							that.$refs.uToast.show({
								title: '修改密码成功',
								icon: false,
								duration: 1500,
								url: 'pages/login/index'
							})
						} else {
							that.$refs.uToast.show({
								title: res.msg,
								icon: false
							})
						}
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.login-logo {
		width: 427rpx;
		height: 224rpx;
	}

	.img-box-pwd {
		width: 24rpx;
		height: 32rpx;
	}

	.login-box {
		height: 58vh;
		border-top-left-radius: 30rpx;
		border-top-right-radius: 30rpx;
	}

	.login-nav-box {
		height: 100rpx;
	}

	.login-btn {
		height: 100rpx;
		margin-bottom: 140rpx;
		border-radius: 100rpx;
		line-height: 100rpx;
		box-shadow: 0 0 20rpx rgba(0, 0, 0, 0.22)
	}

	.login-btn:active {
		opacity: 0.6;
	}

	.login-img-2 {
		width: 160rpx;
	}

	.phone-yz-box {
		height: 40rpx;
		line-height: 40rpx;
	}

	.register-yzm {
		width: 176rpx;
	}

	.ml125 {
		margin-left: 125rpx;
	}

	.mr125 {
		margin-right: 125rpx;
	}

	.img-box-user {
		width: 31rpx;
		height: 32rpx;
	}

	.login-input-box {
		border: 1px solid #D97DB0;
		border-radius: 44rpx;
	}

	.register-box {
		height: 42rpx;
		border-radius: 21rpx;
	}
</style>
