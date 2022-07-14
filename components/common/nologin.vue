<template>
	<view class="width-full lh1">
		<view class="fixed top bottom left right">
			<view class="width-full height relative">
				<view class="absolute top bottom left right bg-black opacity60"></view>
				<view class="absolute top bottom left right flex align-items-center flex-col flex-center">
					<view class="flex">
						<view class="icon_font color-yellow mr10">
							&#xe67d;
						</view>
						<view class="fs15 color-white" v-if="type === 'meet'">
							登录后可查看到更多动态
						</view>
					</view>
					<view class="login-box flex pt8 pb8 align-items-center bg-itsme-2 mt35" @click="toLogin">
						<view class="login-btn text-center fs15 color-white pl15 pr10">
							登录&#8194;/&#8194;注册
						</view>
						<view class="login-time pl10 pr10 fs15 color-white">
							{{time}}S
						</view>
					</view>
					<view class="width-full pb35 pt35 mt35 mb35"></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'no-login',
		data() {
			return {
				time: 4
			}
		},
		watch: {
			pageShow() {
				if (this.pageShow) {
					this.time = 4
					this.setStartTime()
				}
			}
		},
		props: {
			pageShow: Boolean,
			type: String
		},
		mounted() {
			this.setStartTime()
		},
		methods: {
			// 启动页倒计时
			setStartTime() {
				if (this.time > 1) {
					if (this.pageShow) {
						this.time--
						setTimeout(() => {
							this.setStartTime()
						}, 1000);
					}
				} else {
					this.toLogin()
				}
			},
			toLogin() {
				uni.reLaunch({
					url: '/pages/login/index'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.login-box {
		border-radius: 88rpx;
	}

	.color-yellow {
		color: #FABD02;
	}

	.login-time {
		height: 30rpx;
		line-height: 30rpx;
		border-left: 2rpx solid #fff;
		color: #fff;
	}
</style>
