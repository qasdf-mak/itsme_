<template>
	<u-popup v-model="show" mode="center" width="650rpx" height="980rpx" border-radius="10" :closeable="true">
		<view class="width-full pt15 pb15 text-center fs20 color-black">
			佣金明细
		</view>
		<view class="flex flex-wrap" v-if="list && list.length >= 1">
			<view  class="img-box-bg relative" v-for="(item , index) in list" :key="index">
				<image src="/static/base/bg-image-redpack.png" class="img-box-bg" mode="widthFix"> </image>
				<view class="absolute top left bottom right flex flex-col align-items-center flex-center border-box">
					<view class="mt8 fs22 color-main6 fw600 text-center">
						{{item.money}}<text class="fs13 color-main6 ml3">元</text>
					</view>
					<view class="fs10 mt20 color-B6B2B4 text-center ml18 mr18 text-box">
						{{item.text}}
					</view>
				</view>
			</view>
		</view>
		<view class="width-full" v-else>
			 <view>
			 	<empty-tip type="redPack"></empty-tip>
			 </view>
		</view>
	</u-popup>
</template>

<script>
	export default {
		name: 'detail-pop',
		data() {
			return {
				show: false
			}
		},
		props: {
			list: Array,
			showPop: Boolean
		},
		computed: {

		},
		mounted() {
			this.show = this.showPop
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.gold-item-img {
		width: 100rpx;
		height: 110rpx;
	}

	.popup {
		background-color: rgba(0, 0, 0, 0.4);
		z-index: 9998;
	}

	.top-189 {
		top: 150rpx;
	}

	.gold-item-box {
		width: calc((100vw - 100rpx) / 3);
	}

	.img-box-bg {
		width: 215rpx;
		height: 337rpx;
	}

	.color-B6B2B4 {
		color: #B6B2B4;
	}
	.text-box{
		height: 50rpx;
		line-height: 25rpx;
		word-break: break-word;
	}
</style>
