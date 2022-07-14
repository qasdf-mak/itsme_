<template>
	<view class="width-full height100vh lh1 bg-white">
		<!-- top begin -->
		<view class="fixed top left right bg-gradient" style="height: 50vh;">
			<view class="width-full" :style="'height: ' + StatusBar + 'px;'"></view>
			<view class="width-full login-nav-box flex align-items-center">
				<view class="icon_font fs20 color-white fw600 pl15" @click="goBack">
					&#xe638;
				</view>
			</view>
			<view class="width-full flex align-items-center flex-center">
				<image src="../../static/base/base_logo_2.png" class="login-logo mt35 pb35" mode="widthFix"></image>
			</view>
		</view>
		<!-- top end -->
		<!-- bottom begin -->
		<view class="fixed bottom left right bg-white login-box float-hidden">
			<view class="width-full pt15">
				<view class="ml35 mr35 pl20 pr20">
					<view class="width-full b-b-1 line-color-1 flex align-items-center">
						<view class="icon_font color-shallow fs16 ml5 mb5 mt5 mr15">
							&#xe733;
						</view>
						<view class="flex-1">
							<u-input
								v-model="userInfo.mobile"
								trim
								class="fs14 color-deep"
								type="number"
								placeholder="请输入手机号"
								maxlength="11"
								placeholderStyle="color: #cccccc"
								:border="false"
								@input="mobileInput"
								@blur="mobileblur"
							/>
						</view>
					</view>
					<view class="width-full fs12 pl35 border-box color-main3 phone-yz-box">
						{{verification.mobile}}
					</view>
					<view class="width-full b-b-1 line-color-1 flex align-items-center">
						<view class="icon_font color-shallow fs16 ml5 mb5 mt5 mr15">
							&#xe603;
						</view>
						<view class="flex-1 flex align-items-center">
							<view class="flex-1">
								<u-input
									v-model="userInfo.code"
									trim
									class="fs14 color-deep"
									type="number"
									placeholder="请输入验证码"
									maxlength="11"
									placeholderStyle="color: #cccccc"
									:border="false"
									@blur="codeblur"
								/>
							</view>
							<view class="fs12 color-white pt5 pb5 text-center br5 bg-2 register-yzm" :class="!verificationMobile ? 'opacity60' : ''"
							 @click="getSend" v-if="!timeShow">
								获取验证码
							</view>
							<view class="fs12 color-white pt5 pb5 text-center br5 bg-2 register-yzm opacity60" v-else>
								{{time}}后重新发送
							</view>
						</view>
					</view>
					<view class="width-full fs12 pl35 border-box color-main3 phone-yz-box">
						{{verification.code}}
					</view>
					<view class="width-full b-b-1 line-color-1 flex align-items-center">
						<view class="icon_font color-shallow fs16 ml5 mb5 mt5 mr15">
							&#xe77b;
						</view>
						<view class="flex-1">
							<u-input
								v-model="userInfo.password"
								trim
								class="fs14 color-deep"
								type="password"
								placeholder="设置密码"
								maxlength="11"
								placeholderStyle="color: #cccccc"
								:border="false"
								@blur="passwordblur"
							/>
						</view>
					</view>
					<view class="width-full fs12 pl35 border-box color-main3 phone-yz-box">
						{{verification.password}}
					</view>
					<view class="width-full b-b-1 line-color-1 flex align-items-center">
						<view class="icon_font color-shallow fs16 ml5 mb5 mt5 mr15">
							&#xe77b;
						</view>
						<view class="flex-1">
							<u-input
								v-model="userInfo.repassword"
								trim
								class="fs14 color-deep"
								type="password"
								placeholder="确定密码"
								maxlength="11"
								placeholderStyle="color: #cccccc"
								:border="false"
								@blur="repasswordblur"
							/>
						</view>
					</view>
					<view class="width-full fs12 pl35 border-box color-main3 phone-yz-box">
						{{verification.repassword}}
					</view>
					<view class="width-full b-b-1 line-color-1 flex align-items-center">
						<view class="icon_font color-shallow fs16 ml5 mb5 mt5 mr15">
							&#xe617;
						</view>
						<view class="flex-1">
							<u-input
								v-model="userInfo.invite_code"
								trim
								class="fs14 color-deep"
								type="text"
								placeholder="输入邀请码(非必填)"
								maxlength="12"
								placeholderStyle="color: #cccccc"
								:border="false"
							/>
						</view>
					</view>
					<view class="width-full fs12 pl35 border-box color-main3 phone-yz-box"></view>
				</view>
				<view class="ml30 mr30 mt5 mb20">
					<view class="ml10 mr10 fs18 color-deep text-center pt12 pb12 bg-white br40 box-shadow-login btn-box" @click="goRegister">
						注册
					</view>
					<view class="color-main6 width-full mt15 text-center fs13" @click="toLogin">
						密码登录
					</view>
				</view>
			</view>
			<view class="width-full pt10 pb20">
				<view class="width-full flex align-items-center flex-center">
					<view class="checked-box">
						<u-checkbox v-model="checked" active-color="#2242CC" size="32" label-size="0" @change="changeChecked"></u-checkbox>
					</view>
					<view class="fs13 color-shallow">
						我已同意<text class="color-main2" @click="touserAgreement">《用户协议》</text>和<text class="color-main2" @click="toprivacyagreement">《隐私协议》</text>并且已满18岁
					</view>
				</view>
				<view class="width-full fs13 color-main2 lh18 fw600 text-center mt10">
					*自动屏蔽手机通讯录中的联系人<br />
					他人通讯录中有你也会自动屏蔽
				</view>
			</view>
		</view>
		<!-- bottom end -->
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import CommonService from '../../common/service/common-service.js'
	import UserService from '../../common/service/user-service.js'
	import {
		mapActions
	} from 'vuex'
	import loginRouter from '../../common/mixins/login.js'
	export default {
		mixins: [loginRouter],
		data() {
			return {
				userInfo: {
					mobile: '',
					password: '',
					repassword: '',
					code: '',
					invite_code: ''
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
			...mapActions(['USER', 'REGISTER_TYPE']),
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
			// 去登录
			toLogin() {
				uni.redirectTo({
					url: '/pages/login/index'
				})
			},
			// 去主页
			toHome() {
				uni.switchTab({
					url: '/pages/itsme/index'
				})
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
						event: 'register'
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
			// 登录成功后判断
			loginSuccess() {
				let that = this
				this.$refs.uToast.show({
					title: '注册成功',
					icon: false,
					duration: 1500
				})
				setTimeout(function() {
					that.loginRouter()
				}, 1500)
			},
			// 注册
			goRegister() {
				let that = this
				if (!this.checked) {
					this.$refs.uToast.show({
						title: '请先阅读并同意用户协议及隐私协议',
						icon: false
					})
					return false
				}
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
				if (!this.verification.mobile && !this.verification.password && !this.verification.repassword && !this.verification
					.code) {
					UserService.register({
						mobile: this.userInfo.mobile,
						password: this.userInfo.password,
						password1: this.userInfo.repassword,
						code: this.userInfo.code,
						invite_code: this.userInfo.invite_code
					}).then(res => {
						if (res.code === 1) {
							that.USER(res.data.userinfo)
							that.REGISTER_TYPE('password')
							that.loginSuccess()
						} else {
							that.$refs.uToast.show({
								title: res.msg,
								icon: false
							})
						}
					})
				}
			},
			// 去用户协议
			touserAgreement() {
				uni.navigateTo({
					url: '../my/userAgreement'
				})
			},
			// 去用户协议
			toprivacyagreement() {
				uni.navigateTo({
					url: '../my/privacyagreement'
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.login-nav-box{
		height: 100rpx;
	}
	.login-logo {
		width: 148rpx;
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

	.login-img-2 {
		width: 160rpx;
	}

	.phone-yz-box {
		height: 32rpx;
		line-height: 32rpx;
	}

	.register-yzm {
		width: 176rpx;
	}
	.checked-box{
		width: 38rpx;
		height: 38rpx;
		overflow: hidden;
	}
</style>
