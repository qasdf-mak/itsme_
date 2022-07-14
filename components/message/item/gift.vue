<template>
	<view v-if="item && item.payload && item && item.payload.name">
		<view class="width-full flex align-items-center lh1 flex-right" v-if="item.senderId == user.id">
			<view class="mr10 flex flex-col flex-right align-items-end">
				<view class="gift-img-box mb20">
					<image :src="item.payload.icon | imageFilter('m11')" class="gift-img-box" mode="widthFix"></image>
				</view>
				<view class="fs14 color-white">
					送出礼物[{{item.payload.name}}]
				</view>
			</view>
		</view>
		<view class="width-full flex align-items-start lh1 flex-left" v-else>
			<view class="avatar-box mr12 float-hidden" @click="toHome">
				<image :src="friend.avatar | imageFilter('m11')" class="width-full height" mode="widthFix"></image>
			</view>
			<view class="mr10 flex flex-col flex-right align-items-start">
				<view class="gift-img-box mb20">
					<image :src="item.payload.icon | imageFilter('m11')" class="gift-img-box" mode="widthFix"></image>
				</view>
				<view class="fs14 color-white" @click="sendGift(user.gender)">
					收到礼物[{{item.payload.name}}]<text class="color-main6">{{user.gender === 0 ? '【回收】' : '【感谢一下】'}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { mapGetters } from 'vuex'
export default{
	name: 'item-text',
	props: {
		item: Object,
		friend: Object,
		isPlay: {
			type: Boolean,
			default: false
		}
	},
	computed: {
		...mapGetters(['user'])
	},
	mounted() {
	},
	methods: {
		toHome() {
			this.$emit('toHome')
		},
		sendGift(sex) {
			this.$emit('sendGift',sex)
		}
	}
}
</script>

<style lang="scss" scoped>
	.text-box{
		max-width: 520rpx;
		border-radius: 34rpx;
	}
	.avatar-box{
		width: 80rpx;
		height: 80rpx;
		border-radius: 80rpx;
	}
	.gift-img-box{
		width: 130rpx;
		height: 130rpx;
	}
</style>
