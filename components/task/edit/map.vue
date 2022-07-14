<template>
	<view class="width-full lh1">
		<view class="flex align-items-center mb10 mt15">
			<view class="task-dian" v-if="isMust"></view>
			<view class="fs16 color-deep ml5">{{title}}</view>
		</view>
		<view class="width-full border-box task-input-box flex align-items-center" @click="changeAddress">
			<view class="flex-1">
				<view class="fs16 color-deep ml18">
					{{address}}
				</view>
				
			</view>
			<view class="icon_font fs20 ml15 mr15 color-main6">
				&#xe643;
			</view>
		</view>
	</view>
</template>

<script>
	import { changeAddress } from '../../../common/appjs/address.js'
	export default {
		name: 'task-map',
		data() {
			return {
				
			}
		},
		props: {
			address: String,
			isMust: Boolean,
			title: String
		},
		methods: {
			changeAddress(type) {
				changeAddress().then(address => {
					this.$emit('changeAddress', address)
				})
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
	.task-input-box{
		height: 80rpx;
		border: 2rpx solid #CCCCCC;
	}
</style>
