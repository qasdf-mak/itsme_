<template>
	<view class="fixed left right top height100vh popup">
		<view class="popup-info">
			<image src="/static/base/activityPop.png" class="w-100 relative" mode="widthFix"> </image>
				<view class="width-full absolute top-189 bottom left right lh14">
					<view class="flex flex-center align-items-center">
						<view class="flex box-s mr5"> </view>
						<view class="flex box-l mr5"> </view>
						<view class="flex color-white fs18 color-52391F fw600">
							活动详情
						</view>
						<view class="flex box-l ml5"> </view>
						<view class="flex box-s ml5"> </view>
					</view>
					<view class="width-full p-133 p-128 mt15">
						<view class="flex">
							<view class="flex ">
								<view class="circle mt10 mr5"> </view>
							</view>
							<view class="fs12 color-9C9B9B lh18">
								充值完成后，根据实付金额会获得会员券；  
							</view>
						</view>
						<view class="flex">
							<view class="flex">
								<view class="circle mt10 mr5"> </view>
							</view>
							<view class="fs12 color-9C9B9B lh18">
								 可用于邀请同性朋友注册；   
							</view>
						</view>
						<view class="flex">
							<view class="flex">
								<view class="circle mt10 mr5"> </view>
							</view>
							<view class="fs12 color-9C9B9B lh18">
								填写您的邀请码后自动获得并使用；     
							</view>
						</view>
						<view class="flex">
							<view class="flex">
								<view class="circle mt10 mr5"> </view>
							</view>
							<view class="fs12 color-9C9B9B lh18">
								使用会员券充值成功，券金额返回您账户内，直接提现。
							</view>
						</view>
					</view>
				</view>
				<image src="/static/base/gotIt.png" class="btn-box absolute popup-btn" mode="widthFix" @click="closePop">
				</image>

		</view>
	</view>
</template>

<script>
	export default {
		name: 'activity-pop',
		data() {
			return {
				showLablePop: false,
			}
		},
		props: {
			showUnify: Boolean,
		},
		computed: {
			show: {
				get() {
					return this.showUnify
				},
				set() {}
			},
		},
		methods: {
			closePop() {
				this.$emit('closePop')
			},
			toShare() {
				this.toJumpPage(1, '/pages/my/share')
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
		height: 668rpx;
		top: 48%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 9999;
	}

	.popup-btn {
		width: 288rpx;
		height: 71rpx;
		bottom: 7%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 9999;
	}

	.color-9C9B9B {
		color: #9C9B9B;
	}
	
	.circle{
		width: 6rpx;
		height: 6rpx;
		background: #CC4852;
		border-radius: 50%;
	}

	.top-189 {
		top: 134rpx;
	}

	.w-100 {
		width: 100%;
		height: 100%;
	}

	.ml45 {
		margin-left: 75rpx;
	}

	.box-s {
		width: 8rpx;
		height: 4rpx;
		background: #F36570;
		border-radius: 2rpx;
	}

	.box-l {
		width: 24rpx;
		height: 4rpx;
		background: #F36570;
		border-radius: 2rpx;
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

	.p-133 {
		padding-left: 133rpx;
	}

	.p-128 {
		padding-right: 128rpx;
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
