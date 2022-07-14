<template>
	<view class="fixed left right top height100vh popup">
		<view class="popup-info">
			<image src="/static/base/rechargesuccess.png" class="w-100 relative" mode="widthFix">
				<image src="/static/base/close.png" class="close-box absolute" mode="widthFix" @click="closePoprecharge"></image>
				<view class="width-full absolute top-189 bottom left right text-center lh14">
					<view class="color-white fs18 color-52391F fw600">
						恭喜您<br> 开通会员成功
					</view>
					<view class="color-white fs10 color-8D6844" v-if="expirationTime">
						VIP:{{expirationTime | dateFilter(2, '.')}}
						<!-- VIP:{{expirationTime}} -->
					</view>
					<view class="width-full pl20 pr20 mt25 card-box">
						<view class="flex align-items-center">
							<view class="ml45 mr8 dian"> </view>
							<view class="flex-1 text-left fs15 color-4e4e4e">
								您已参与充值返会员券活动
							</view>
						</view>
						<view class="flex align-items-center mt10">
							<view class="ml45 mr8 dian-box"> </view>
							<view class="flex-1 text-left fs10 lh15 color-9C9B9B">
								<view class="flex">
									<view class="mr5"> 1 . </view>
									<view class="flex-1 text-left fs10 color-9C9B9B">
										已获得会员券充值时抵用
									</view>
								</view>
								<view class="flex mt6">
									<view class="mr5"> 2 . </view>
									<view class="flex-1 text-left fs10 color-9C9B9B">
										每张可抵扣30元 , 有效期30天 , 不可自用
									</view>
								</view>
								<view class="flex mt6">
									<view class="mr5"> 3 . </view>
									<view class="flex-1 text-left fs10 color-9C9B9B">
										邀请注册时,对方输入您的邀请码,注册完成后,自动赠送
									</view>
								</view>
								<view class="flex mt6">
									<view class="mr5"> 4 . </view>
									<view class="flex-1 text-left fs10 color-9C9B9B">
										邀请人使用后，可直接提现
									</view>
								</view>
								<view class="flex mt6">
									<view class="mr5"> 5 . </view>
									<view class="flex-1 text-left fs10 color-9C9B9B">
										邀请码：{{user.invite_code}}
									</view>
								</view>
								
							</view>
						</view>
						<view class="color-ea5a5a fs10 mt15">
							*会员券较为珍惜，请赠送给最需要的兄弟
						</view>
					</view>
				</view>
			</image>
			<image src="/static/base/rechargesuccessBtn.png" class="btn-box relative popup-btn" mode="widthFix" @click="toShare">
		</view>
	</view>
</template>

<script>
	export default {
		name: 'rechargesuccess-pop',
		data() {
			return {
			}
		},
		props: {
			rechargesuccessShow: Boolean,
			expirationTime: Number,
		},
		computed: {
			show: {
				get() {
					return this.rechargesuccessShow
				},
				set() {}
			},
		},
		methods: {
			closePoprecharge() {
				console.log('支付成功后的页面')
				this.$emit('closePoprecharge')
			},
			toShare(){
				this.toJumpPage(1,'/pages/my/share')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.popup {
		background-color: rgba(0, 0, 0, 0.4);
		z-index: 9998;
	}

	.popup-info {
		position: fixed;
		width: 601rpx;
		height: 789rpx;
		top: 48%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 99999999;
	}

	.popup-btn {
		position: fixed;
		width: 287rpx;
		height: 70rpx;
		top: 8%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 9999;
	}

	.top-189 {
		top: 180rpx;
	}

	.w-100 {
		width: 100%;
		height: 100%;
	}

	.ml45 {
		margin-left: 75rpx;
	}

	.close-box {
		width: 40rpx;
		height: 40rpx;
		right: 22rpx;
		top: -20rpx;
	}

	.dian {
		width: 10rpx;
		height: 10rpx;
		background: #52391F;
		border-radius: 50%;
	}

	.dian-box {
		width: 10rpx;
		height: 10rpx;
	}

	.color-52391F {
		color: #52391F !important;
		font-family: PingFang SC;
	}

	.card-box {
		height: 175rpx;
	}

	.color-8D6844 {
		color: #8D6844 !important;
		font-family: PingFang SC;
	}

	.color-9C9B9B {
		color: #9C9B9B !important;
		font-family: PingFang SC;
	}

	.color-ea5a5a {
		color: #ea5a5a !important;
		font-family: PingFang SC;
	}

	.color-4e4e4e {
		color: #4e4e4e !important;
		font-family: PingFang SC;
		font-weight: bold;
	}
</style>
