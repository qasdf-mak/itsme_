<template>
	<view class="fixed left right top height100vh popup" v-if="show">
		<view class="popup-info bg-white br8">
			<image src="../../static/itsme/itsme_74.png" class="img-pop" mode="widthFix"></image>
			<view class="color-black fw600 fs18 width-full text-center mt8">
				请打开推送消息
			</view>
			<view class="color-B4B4B4 fs10 width-full text-center mt10">
				快打开推送吧，就别错过你<text class="color-itsme-2">心仪的Ta</text>哦
			</view>
			<view class="flex flex-center mt25">
				<view class="push-btn bg-itsme-2 br40 text-center " @click="confirmPop">
					立即开启
				</view>
			</view>
			<image src="/static/base/close.png" class="close-box relative" mode="widthFix" @click="cancelPop">
			</image>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'openpush-pop',
		data() {
			return {}
		},
		props: {
			openPushShow: Boolean,
		},
		computed: {
			show: {
				get() {
					return this.openPushShow
				},
				set() {}
			},
		},
		methods: {
			confirmPop(){
				this.$emit('confirm')
			},
			cancelPop(){
				this.$emit('cancel')
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
		width: 540rpx;
		height: 600rpx;
		top: 48%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 99999999;
	}

	.color-B4B4B4 {
		color: #B4B4B4
	}

	.push-btn {
		width: 400rpx;
		height: 80rpx;
		line-height: 80rpx;
	}

	.img-pop {
		width: 446rpx;
		height: 307rpx;
		margin-left: 42rpx;
		margin-top: 35rpx;
	}

	.close-box {
		width: 40rpx;
		height: 40rpx;
		right: -249rpx;
		top: 100rpx;
	}
</style>
