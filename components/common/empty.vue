<template>
	<view class="width-full lh1">
		<view class="width-full mt35 pt35">
			<view class="width-full flex flex-col align-items-center flex-center">
				<image :src="emptyData[type].icon" class="empty-img" mode="widthFix"></image>
				<view class="fs15 color-666666 mt25">
					{{emptyData[type].content}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				emptyData: {
					task: {
						icon: '/static/base/black.png',
						content: '暂无Me约'
					},
					life: {
						icon: '/static/base/black.png',
						content: '暂无动态'
					},
					match: {
						icon: '/static/base/black.png',
						content: '暂无匹配用户'
					},
					redPack: {
						icon: '/static/base/black.png',
						content: '暂无会员券'
					},
					withdrawal: {
						icon: '/static/base/black.png',
						content: '暂无提现记录'
					},
					lookWx: {
						icon: '/static/base/black.png',
						content: '暂无解锁微信'
					},
					isSeeWx: {
						icon: '/static/base/black.png',
						content: '您的微信还没被查看'
					},
				}
			}
		},
		props: {
			type: String
		}
	}
</script>

<style lang="scss" scoped>
	.empty-img {
		width: 200rpx;
		height: 200rpx;
	}
</style>
