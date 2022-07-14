<template>
	<view class="p20 pt3">
		<view class="flex align-items-center">
			<view class="img-01 ml15" @click="goHome(item)">
				<image :src="item.avatar | imageFilter('m11')" class="img-01" mode=""></image>
			</view>
			<view class="flex-1 ml20">
				<view class="flex ">
					<view class="text-name fs17 mr5 color-white">{{item.nickname}}</view>
					<view>
						<image src="../../static/base/base_13.png" v-if="item.is_goddess === 1" class="img-min ml5"
							mode="aspectFill"></image>
						<image src="../../static/base/base_12.png" v-if="item.is_real === 1" class="img-min ml5"
							mode="aspectFill"></image>
						<image src="../../static/base/base_14.png" v-if="item.is_vip === 1" class="img-min ml5"
							mode="widthFix"></image>
					</view>
				</view>
				<view class="mt8 color-itsme-10">
					{{item.text}}
				</view>
			</view>
		</view>
		<view class="flex">
			<view class="ml35 pl35"> </view>
			<view class="line-b bg-itsme-4 flex-1 mt15 pl35"> </view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'system-like',
		data() {
			return {

			}
		},
		props: {
			item: Object
		},
		mounted() {
			console.log(this.item)
		},
		methods: {
			goHome(item) {
				console.log(item)
				if (item.user_id === this.user.id) {
					console.log('自己点自己')
				} else {
						uni.navigateTo({
							url:'/pages/itsme/home?id=' + item.user_id 
						})
				}
			}
		}
	}
</script>

<style>
	.img-01 {
		width: 110rpx;
		height: 110rpx;
		border-radius: 50%;
	}

	.img-02 {
		width: 120rpx;
		height: 120rpx;
		border-radius: 10px;
	}

	.text-name {
		font-family: Microsoft YaHei UI;
		font-weight: 400;
	}

	.img-min {
		width: 28rpx;
		height: 28rpx;
	}

	.line-b {
		width: 520rpx;
		height: 1px;
	}
</style>
