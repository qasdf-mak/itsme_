<template>
	<view class="width-full height100vh lh1 bg-itsme-1">
		<view class="width-full" v-if="loginType === 1">
			<!-- top begin -->
			<view class="bg-itsme-1">
				<view class="width-full" :style="'height: ' + StatusBar + 'px;'"></view>
				<view class="width-full login-nav-box flex align-items-center">
					<view class="icon_font fs20 color-white fw600 pl15">
					</view>
				</view>
			</view>
			<!-- top end -->
			<!-- logo 图片 start-->
			<view class="width-full flex align-items-center flex-center">
				<image src="../../static/itsme/itsme_22.png" class="login-logo pb20" mode="widthFix"></image>
			</view>
			<!-- logo 图片 end-->
			<!-- tab 栏 切换 (登录 && 注册) start -->
			<view class="width-full pl35 pr35 mb15">
				<view class="pl25 pr25">
					<u-tabs :list="list" :is-scroll="false" font-size="32" :current="current" inactive-color="#9E9E9F"
						bg-color="#1A1A1F" active-color="#D97DB0" @change="change"></u-tabs>
				</view>
			</view>
			<!-- tab 栏 切换 (登录 && 注册) end -->
			<!-- bottom begin -->
			<!-- 登录 start -->
			<view class="bg-itsme-1 float-hidden" v-if="current === 0">
				<view class="width-full">
					<view class="ml125 mr125">
						<view class="width-full login-input-box pl25  pr18  flex align-items-center">
							<view class="img-box-user ml5 mb5 mt5 mr15">
								<image src="/static/itsme/itsme_23.png" class="img-box-user" mode="widthFix"></image>
							</view>
							<view class="flex-1">
								<u-input v-model="userInfo.mobile" class="fs14 color-itsme-9" type="number"
									:custom-style="{'color': '#fff'}" placeholder="请输入手机号" maxlength="11"
									placeholderStyle="color: #9e9e9f" :border="false" @input="mobileInput"
									@blur="mobileblur" />
							</view>
						</view>
						<view class="width-full fs12 pl35 border-box color-main3 phone-yz-box">
							{{verification.mobile}}
						</view>
						<!-- 密码登录 start -->
						<view class="width-full login-input-box pl25 pr18 flex align-items-center"
							v-if="type === 'pwdlogin'">
							<view class="img-box-pwd ml5 mb5 mt5 mr15">
								<image src="/static/itsme/itsme_24.png" class="img-box-pwd" mode="widthFix"></image>
							</view>
							<view class="flex-1">
								<u-input v-model="userInfo.password" class="fs14 color-itsme-9" type="password"
									:custom-style="{'color': '#fff'}" placeholder="请输入密码" maxlength="11"
									placeholderStyle="color: #9e9e9f" :border="false" @blur="passwordblur" />
							</view>
						</view>
						<!-- 密码登录 end -->
						<!-- 验证码 start -->
						<view class="width-full login-input-box pl25 pr18 flex align-items-center" v-else>
							<view class="img-box-pwd ml5 mb5 mt5 mr15">
								<image src="/static/itsme/itsme_24.png" class="img-box-pwd" mode="widthFix"></image>
							</view>
							<view class="flex-1 flex align-items-center ">
								<view class="flex-1">
									<u-input v-model="userInfo.captcha" class="fs12 color-itsme-9" type="number"
										:custom-style="{'color': '#fff'}" placeholder="请输入验证码" maxlength="11"
										placeholderStyle="color: #9e9e9f" :border="false" @blur="codeblur" />
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
						<!-- 验证码 end -->
						<view class="width-full fs12 pl35 border-box color-main3 phone-yz-box"
							v-if="type === 'pwdlogin'">
							{{verification.password}}
						</view>
						<view class="width-full fs12 pl35 border-box color-main3 phone-yz-box" v-else>
							{{verification.captcha}}
						</view>
						<view class="width-full flex align-items-center flex-between">
							<view class="fs10 color-itsme-9" @click="changeType">
								{{type === 'pwdlogin' ? '验证码登录' : '密码登录'}}
							</view>
							<view class="fs10 color-itsme-9" @click="toForgetPwd">
								忘记密码?
							</view>
						</view>
					</view>
					<view class="ml35 mr35 mt25 mb20 pl25 pr25">
						<view
							class="ml35 mr35 fs18 color-white text-center pt10 pb10 bg-itsme-2 br40 box-shadow-login btn-box"
							@click="toLogin">
							登录
						</view>
					</view>
					<view class="width-full flex align-items-center flex-center mt15" @click="toHome">
						<view class="fs12 color-itsme-9 ml5">
							先逛一逛
						</view>
					</view>
				</view>
			</view>
			<!-- 登录 end -->
			<!-- 注册 start -->
			<view class="" v-else>
				<!-- bottom begin -->
				<view class="bg-itsme-1">
					<view class="width-full">
						<view class="ml125 mr125">
							<view class="width-full login-input-box pl25 pr18 flex align-items-center border-box">
								<view class="img-box-pwd ml5 mb5 mt5 mr15">
									<image src="/static/itsme/itsme_23.png" class="img-box-pwd" mode="widthFix"></image>
								</view>
								<view class="flex-1 ">
									<u-input v-model="register.mobile" trim class="fs14 color-deep" type="number"
										placeholder="请输入手机号" maxlength="11" placeholderStyle="color: #9e9e9f"
										:custom-style="{'color': '#fff'}" :border="false"
										@input="registerMobileInput" @blur="registerMobileblur" />
								</view>
							</view>
							<view class="width-full fs12 pl35 border-box color-main3 phone-yz-box">
								{{verificationRegister.verificationRegMobile}}
							</view>
							<view class="width-full  login-input-box pl25 pr15  flex align-items-center">
								<view class="icon_font color-itsme-2 fs16 ml5 mb5 mt5 mr15">
									&#xe659;
								</view>
								<view class="flex-1 flex align-items-center">
									<view class="flex-1">
										<u-input v-model="register.code" trim class="fs14 color-deep" type="number"
											:custom-style="{'color': '#fff'}" placeholder="请输入验证码" maxlength="11"
											placeholderStyle="color: #9e9e9f" :border="false"
											@blur="registerCodeblur" />
									</view>
									<view class="fs10 color-white pt5 pb5 text-center bg-2 pr10 pl10 register-box"
										:class="!verificationRegisterMobile ? 'opacity60' : ''" @click="getSend"
										v-if="!registerTimeShow">
										获取验证码
									</view>
									<view
										class="fs10 color-white pt5 pb5 text-center bg-2 pr10 pl10 register-box opacity60"
										v-else>
										{{registerTime}}后重新发送
									</view>
								</view>
							</view>
							<view class="width-full fs12 pl35 border-box color-main3 phone-yz-box">
								{{verificationRegister.verificationCode}}
							</view>
							<view class="width-full  login-input-box pl25 pr15  flex align-items-center">
								<view class="img-box-pwd ml5 mb5 mt5 mr15">
									<image src="/static/itsme/itsme_24.png" class="img-box-pwd" mode="widthFix"></image>
								</view>
								<view class="flex-1">
									<u-input v-model="register.regPassword" trim class="fs14 color-deep" type="password"
										:custom-style="{'color': '#cccccc'}" placeholder="设置密码" maxlength="11"
										placeholderStyle="color: #9e9e9f" :border="false"
										@blur="registerPasswordblur" />
								</view>
							</view>
							<view class="width-full fs12 pl35 border-box color-main3 phone-yz-box">
								{{verificationRegister.verificationRegPassword}}
							</view>
							<view class="width-full  login-input-box pl25 pr15  flex align-items-center">
								<view class="icon_font color-itsme-2 fs16 ml5 mb5 mt5 mr15">
									&#xe65b;
								</view>
								<view class="flex-1">
									<u-input v-model="register.invite_code" trim class="fs14 color-deep" type="text"
										:custom-style="{'color': '#ccc'}" placeholder="输入邀请码(非必填)" maxlength="12"
										placeholderStyle="color: #9e9e9f" :border="false" />
								</view>
							</view>
							<view class="width-full fs12 pl35 border-box color-main3 phone-yz-box"></view>
						</view>
						<view class="ml35 mr35 pl35 pr35 mt5 mb20">
							<view
								class="ml20 mr20 fs18 color-white text-center pt10 pb8 bg-itsme-2 br40 box-shadow-login btn-box"
								@click="registerAnAccount">
								注册
							</view>
							<view class="color-itsme-9 width-full mt15 text-center fs12" @click="toHome">
								先逛一逛
							</view>
						</view>
					</view>
				</view>
				<!-- bottom end -->
			</view>
			<!-- 注册 end -->
			<!-- bottom end -->
			<!-- 底部文字 start -->
			<view class="absolute left right bottom15 width-full pt10 pb20">
				<view class="width-full flex align-items-center flex-center" v-if="current !== 0" @click="agreement">
					<view class="img-select-box mr12">
						<image src="/static/itsme/itsme_26.png" class="img-select-box" mode="widthFix"
							v-if="ifTheSelected"></image>
						<image src="/static/itsme/itsme_25.png" class="img-select-box" mode="widthFix" v-else></image>
					</view>
					<view class="fs13 color-white">
						我已同意<text @click="toJumpPage(1,'/pages/my/userAgreement')"> 《隐私协议》 </text>和<text
							@click="toJumpPage(1,'/pages/my/privacyagreement')"> 《用户协议》 </text>并且已满18岁
					</view>
				</view>
				<view class="width-full fs10 color-itsme-9 lh15 text-center mt8">
					*自动屏蔽手机通讯录中的联系人<br />
					他人通讯录中有你也会自动屏蔽
				</view>
			</view>
			<!-- 底部文字 end -->
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import CommonService from '../../common/service/common-service.js'
	import UserService from '../../common/service/user-service.js'
	import {
		phoneLogin
	} from '../../common/appjs/login.js'
	import md5 from '../../js_sdk/js-md5/src/md5.js'
	import {
		mapActions
	} from 'vuex'
	import loginRouter from '../../common/mixins/login.js'
	export default {
		mixins: [loginRouter],
		data() {
			return {
				type: 'pwdlogin',
				userInfo: {
					mobile: '',
					password: '',
					captcha: ''
				},
				verification: {
					mobile: '',
					password: '',
					captcha: ''
				},
				register: {
					mobile: '',
					regPassword: '',
					code: '',
					invite_code: ''
				},
				verificationRegister: {
					verificationRegMobile: '',
					verificationRegPassword: '',
					verificationCode: '',
				},
				timeShow: false,
				ifTheSelected: false,
				time: 59,
				registerTimeShow: false,
				registerTime: 59,
				// 一键登录
				loginType: 0,
				list: [{
					name: '登录'
				}, {
					name: '注册'
				}],
				current: 0
			}
		},
		onLoad(option) {
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
			},
			verificationRegisterMobile() {
				if (this.register.mobile) {
					let myreg = /^[1][2-9][0-9]{9}$/
					if (myreg.test(this.register.mobile)) {
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
			...mapActions(['USER', 'ADDRESS','REGISTER_TYPE']),
			init(option) {
				Object.assign(this.$data, this.$options.data())
				let platform = uni.getSystemInfoSync().platform
				if ((platform === 'android' || (platform === 'ios' && !this.commonInfo.check)) && this.platform === 'APP') {
					this.getPhoneNum()
				} else {
					this.loginType = 1
				}
			},
			//tab栏切换
			change(index) {
				this.current = index
				 this.register.mobile = this.userInfo.mobile
			},
			//同意隐私协议{
			agreement() {
				this.ifTheSelected = !this.ifTheSelected
			},
			// 去注册
			toRegister() {
				uni.redirectTo({
					url: '/pages/login/register'
				})
			},
			// 去主页
			toHome() {
				uni.switchTab({
					url: '/pages/itsme/index'
				})
			},
			// 去忘记密码
			toForgetPwd() {
				uni.navigateTo({
					url: '/pages/login/forgetpwd'
				})
			},
			// 切换登录方式
			changeType() {
				if (this.type === 'pwdlogin') {
					this.type = 'mobilelogin'
				} else {
					this.type = 'pwdlogin'
				}
				this.userInfo = {
					mobile: this.userInfo.mobile,
					password: '',
					captcha: ''
				}
				this.verification = {
					mobile: '',
					password: '',
					captcha: ''
				}
			},
			// 手机号验证(登录)
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

			// 手机号验证(注册)
			registerMobileblur(value) {
				if (value.length === 0) {
					this.verificationRegister.verificationRegMobile = '请输入手机号'
				} else {
					if (value.length === 11) {
						let myreg = /^[1][2-9][0-9]{9}$/
						if (myreg.test(value)) {
							this.verificationRegister.verificationRegMobile = ''
						} else {
							this.register.mobile = ''
							this.verificationRegister.verificationRegMobile = '手机号输入有误，请重新输入'
						}
					} else {
						this.register.mobile = ''
						this.verificationRegister.verificationRegMobile = '手机号输入有误，请重新输入'
					}
				}
			},
			registerMobileInput(value) {
				if (value.length === 11) {
					let myreg = /^[1][2-9][0-9]{9}$/
					if (myreg.test(value)) {
						this.verificationRegister.verificationRegMobile = ''
					} else {
						this.register.mobile = ''
						this.verificationRegister.verificationRegMobile = '手机号输入有误，请重新输入'
					}
				}
			},
			// 密码验证(登录)
			passwordblur(value) {
				if (value.length < 6) {
					this.verification.password = '请输入6位数以上密码'
				} else {
					this.verification.password = ''
				}
			},
			// 密码验证(注册)
			registerPasswordblur(value) {
				if (value.length < 6) {
					this.verificationRegister.verificationRegPassword = '请输入6位数以上密码'
				} else {
					this.verificationRegister.verificationRegPassword = ''
				}
			},
			// 验证码验证(登录)
			codeblur(value) {
				if (value.length === 0) {
					this.verification.captcha = '请输入验证码'
				} else {
					this.verification.captcha = ''
				}
			},
			// 验证码验证(注册)
			registerCodeblur(value) {
				if (value.length === 0) {
					this.verificationRegister.verificationCode = '请输入验证码'
				} else {
					this.verificationRegister.verificationCode = ''
				}
			},
			// 注册
			registerAnAccount() {
				if (this.ifTheSelected) {
					let that = this
					if (!this.register.mobile) {
						this.verificationRegister.verificationRegMobile = '请输入手机号'
					}
					if (!this.register.code) {
						this.verificationRegister.verificationCode = '请输入验证码'
					}
					if (!this.register.regPassword) {
						this.verificationRegister.verificationRegPassword = '请输入6位数以上密码'
						return false
					}
					if (this.register.mobile && this.register.regPassword && this.register.code) {
						uni.showLoading()
						UserService.register({
							mobile: this.register.mobile,
							password: this.register.regPassword,
							code: this.register.code,
							invite_code: this.register.invite_code
						}).then(res => {
							if (res.code === 1) {
								uni.hideLoading()
								that.USER(res.data.userinfo)
								that.REGISTER_TYPE('password')
								that.loginSuccess(1,that.register.invite_code)
							} else {
								uni.hideLoading()
								that.$refs.uToast.show({
									title: res.msg,
									icon: false
								})
							}
						})
					}
				} else {
					this.$refs.uToast.show({
						title: '请先阅读并同意用户协议及隐私协议'
					})
				}
			},

			// 获取手机验证码
			getSend() {
				let that = this
				let event = ''
				let mobile = ''
				if (this.verificationMobile) {
					event = 'mobilelogin'
					mobile = this.userInfo.mobile
				}
				if (this.verificationRegisterMobile) {
					event = 'register'
					mobile = this.register.mobile
				}
				if (this.verificationMobile || this.verificationRegisterMobile) {
					CommonService.getsend({
						mobile: mobile,
						event: event
					}).then(res => {
						if (res.code === 1) {
							that.$refs.uToast.show({
								title: '发送成功',
								icon: false
							})
							if (this.verificationMobile) {
								that.timeShow = true
							} else {
								that.registerTimeShow = true
							}
							that.setTime()
						} else {
							that.$refs.uToast.show({
								title: res.msg,
								icon: false
							})
						}
					})
				}
			},
			// 倒计时
			setTime() {
				let that = this
				if (this.time > 0) {
					this.time--
					this.registerTime--,
						setTimeout(function() {
							that.setTime()
						}, 1000);
				} else {
					this.timeShow = false
					that.registerTimeShow = false
					this.time = 59
					this.registerTime = 59
				}
			},
			// 登录成功后判断
			loginSuccess(isLogin,code) {
				if(isLogin === 1){
					this.$refs.uToast.show({
						title: '注册成功,即将自动登录',
						icon: false,
						duration: 1500
					})
				}else{
					this.$refs.uToast.show({
						title: '登录成功',
						icon: false,
						duration: 1500
					})
				}
				setTimeout(() => {
					this.loginRouter(code)
				}, 1500)
			},
			// 登录
			toLogin() {
				let that = this
				if (this.type === 'pwdlogin') {
					if (!this.userInfo.mobile) {
						this.verification.mobile = '请输入手机号'
					}
					if (!this.userInfo.password) {
						this.verification.password = '请输入密码'
					}
					if (this.userInfo.mobile && this.userInfo.password) {
						console.log(this.user)
						// uni.removeStorageSync('user_info');
						this.USER(null)
						this.ADDRESS(null)
						console.log('已经清除user了')
						console.log(this.user)
						console.log('已经清除user了')
						UserService.pwdlogin({
							account: this.userInfo.mobile,
							password: this.userInfo.password
						}).then(res => {
							if (res.code === 1) {
								that.USER(res.data.userinfo)
								that.loginSuccess()
							} else {
								that.$refs.uToast.show({
									title: res.msg,
									icon: false
								})
							}
						})
					}
				}
				if (this.type === 'mobilelogin') {
					if (!this.userInfo.mobile) {
						this.verification.mobile = '请输入手机号'
					}
					if (!this.userInfo.captcha) {
						this.verification.captcha = '请输入验证码'
					}
					if (this.userInfo.mobile && this.userInfo.captcha) {
						UserService.mobilelogin({
							mobile: this.userInfo.mobile,
							captcha: this.userInfo.captcha
						}).then(res => {
							if (res.code === 1) {
								that.USER(res.data.userinfo)
								that.loginSuccess()
							} else {
								that.$refs.uToast.show({
									title: res.msg,
									icon: false
								})
							}
						})
					}
				}
			},
			// 原生插件一键获取用户手机号
			getPhoneNum() {
				phoneLogin().then(
					res => {
						if (this.$u.test.mobile(res)) {
							this.getRandom(res)
						} else {
							this.loginType = 1
						}
					},
					rej => {
						console.log('一键授权失败')
						this.loginType = 1
					}
				)
			},
			// 获取随机码
			getRandom(phone) {
				uni.showLoading({
					title: '登录中'
				})
				UserService.random({
					mobile: phone
				}).then(res => {
					let key = md5(md5(res.data + 'xrkjyzx') + phone)
					if (res.code === 1) {
						UserService.akeylogin({
							mobile: phone,
							key: key
						}).then(arr => {
							if (arr.code === 1) {
								this.USER(arr.data.userinfo)
								// 登录成功判断
								uni.hideLoading()
								uni.showToast({
									title: '登录成功',
									icon: 'success',
									duration: 1000
								})
								setTimeout(() => {
									this.loginRouter()
								}, 1000);
							} else {
								uni.hideLoading()
								this.loginType = 1
							}
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.login-logo {
		width: 359rpx;
		height: 276rpx;
	}

	.login-nav-box {
		height: 100rpx;
	}

	.login-box {
		border-top-left-radius: 30rpx;
		border-top-right-radius: 30rpx;
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

	.ml125 {
		margin-left: 125rpx;
	}

	.mr125 {
		margin-right: 125rpx;
	}


	.login-img-2 {
		width: 160rpx;
	}

	.mt124 {
		margin-top: 90rpx;
	}

	.phone-yz-box {
		height: 40rpx;
		line-height: 40rpx;
	}

	.register-yzm {
		width: 176rpx;
	}

	.register-box {
		height: 42rpx;
		border-radius: 21rpx;
	}

	.login-input-box {
		border: 1px solid #D97DB0;
		border-radius: 44rpx;
	}

	.img-box-user {
		width: 31rpx;
		height: 32rpx;
	}

	.img-box-pwd {
		width: 24rpx;
		height: 32rpx;
	}

	.img-select-box {
		width: 30rpx;
		height: 30rpx;
	}
</style>
