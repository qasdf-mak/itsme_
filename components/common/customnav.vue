<template>
	<view class="width-full lh1 bg-white" :style="'padding-top:' + StatusBar + 'px;'">
		<view class="width-full nav-box"></view>
		<view class="fixed top left right bg-itsme-1" style="z-index: 999;" :style="'padding-top:' + StatusBar + 'px;'">
			<view class="width-full bg-itsme-1 nav-box flex align-items-center">
				<view class="nav-left pt6 pb6 ml15 flex align-items-center">
					<view class="nav-item ml5 mr5 flex align-items-center flex-center" v-if="showBack" @click="goBack">
						<view class="icon_font fs28 color-shallow">
							&#xe60e;
						</view>
					</view>
					<view class="nav-item ml5 mr5 flex align-items-center flex-center" v-if="showTextBack" @click="goBack">
						<view class="fs14 color-shallow">
							取消
						</view>
					</view>
				</view>
				<view class="flex-1 nav-center fs18 color-white fw600 text-center nowrap1">
					{{title}}
				</view>
				<view class="nav-right pt6 pb6 mr15 flex align-items-center flex-right">
					<view class="nav-item ml5 mr5 flex align-items-center flex-center" v-if="showSearch" @click="clickSearch">
						<image src="../../static/nav/nav_2.png" class="nav-search" mode="widthFix"></image>
					</view>
					<view class="nav-item ml5 mr5 flex align-items-center flex-center" v-if="showFilter" @click="clickFilter">
						<image src="../../static/nav/nav_1.png" class="width-full" mode="widthFix"></image>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'custom-nav',
		data() {
			return {
			}
		},
		props: {
			title: {
				type: String,
				default: "it's me"
			},
			showFilter: {
				type: Boolean,
				default: false
			},
			showSearch: {
				type: Boolean,
				default: false
			},
			showBack: {
				type: Boolean,
				default: false
			},
			showTextBack: {
				type: Boolean,
				default: false
			}
		},
		computed: {
			
		},
		methods: {
			// 点击筛选
			clickFilter() {
				this.$emit('clickFilter')
			},
			// 点击搜索
			clickSearch() {
				this.$emit('clickSearch')
			},
			// 返回上一页
			goBack() {
				uni.navigateBack({
					delta: 1
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.nav-box{
		height: 88rpx;
	}
	.nav-left{
		width: 176rpx;
		height: 64rpx;
		line-height: 64rpx;
	}
	.nav-center{
		height: 88rpx;
		line-height: 88rpx;
	}
	.nav-right{
		width: 176rpx;
		height: 64rpx;
		line-height: 64rpx;
	}
	.nav-item{
		width: 64rpx;
		height: 64rpx;
	}
	.color-nav{
		color: #ccc;
	}
	.nav-search{
		width: 45rpx;
	}
</style>
