<template>
	<view class="width-full lh1">
		<view class="mt10">
			<view class="flex align-items-center mb10">
				<view class="task-dian"></view>
				<view class="fs16 color-deep ml5">行程费用</view>
			</view>
			<view class="width-full flex align-items-center mt20 ml10">
				<view class="flex-1 flex align-items-center" @click="changePayType(1)">
					<image src="../../../static/my/my_16.png" class="photo-bot-img" mode="widthFix" v-if="costType === 1"></image>
					<image src="../../../static/my/my_17.png" class="photo-bot-img" mode="widthFix" v-else></image>
					<view class="fs16 color-deep ml8">
						AA制
					</view>
				</view>
				<view class="flex-1 flex align-items-center" @click="changePayType(2)">
					<image src="../../../static/my/my_16.png" class="photo-bot-img" mode="widthFix" v-if="costType === 2"></image>
					<image src="../../../static/my/my_17.png" class="photo-bot-img" mode="widthFix" v-else></image>
					<view class="fs16 color-deep ml8">
						我请客
					</view>
				</view>
			</view>
			<view class="width-full flex align-items-center mt20 ml10">
				<view class="flex-1 flex align-items-center" @click="changePayType(3)">
					<image src="../../../static/my/my_16.png" class="photo-bot-img" mode="widthFix" v-if="costType === 3"></image>
					<image src="../../../static/my/my_17.png" class="photo-bot-img" mode="widthFix" v-else></image>
					<view class="fs16 color-deep ml8">
						接单人支付
					</view>
				</view>
				<view class="flex-1 flex align-items-center" @click="changePayType(4)">
					<image src="../../../static/my/my_16.png" class="photo-bot-img" mode="widthFix" v-if="costType === 4"></image>
					<image src="../../../static/my/my_17.png" class="photo-bot-img" mode="widthFix" v-else></image>
					<view class="fs16 color-deep ml8">
						可商议
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'pay-type',
		data() {
			return {
				payTypeData: {
					name: 'AA制'
				}
			}
		},
		props: {
			costType: Number
		},
		methods: {
			changePayType(index) {
				this.$emit('changePayType', index)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.task-dian{
		width: 10rpx;
		height: 10rpx;
		background: #F3CEB0;
		border-radius: 10rpx;
	}
	.photo-bot-img{
		width: 30rpx;
	}
</style>
