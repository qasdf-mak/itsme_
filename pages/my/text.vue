<template>
	<view class="width-full lh1 minnavh100vh bg-white">
		<view class="pt20 width-full">
			<view class="ml15 mr15 mt10 mb10">
				<u-button type="error" @click="loginOut">退出登录</u-button>
			</view>
		</view>
		<view v-for="(item,index) in linkList" :key="index">
			<view class="ml15 mr15 mt10 mb10">
				<u-button type="primary" @click="toNavigateTo(item.url)">{{item.title}}</u-button>
			</view>
		</view>
		<view v-if="showRedPacket">
			<red-packet></red-packet>
		</view>
	</view>
</template>

<script>
	import loginOut from '../../common/mixins/login.js'
	export default {
		mixins: [ loginOut ],
		data() {
			return {
				linkList: [
					{
						title: '性别昵称',
						url: '/pages/login/sex'
					},
					{
						title: '专属推荐',
						url: '/pages/exclusive/male'
					},
					{
						title: '新手礼包',
						url: './newgift'
					}
				]
			}
		},
		methods: {
			toNavigateTo(url) {
				uni.navigateTo({
					url: url
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.wallet-box{
		width: 700rpx;
		height: calc(100vh - 100rpx);
	}
	.wallet-top{
		width: 700rpx;
		height: 320rpx;
	}
</style>
