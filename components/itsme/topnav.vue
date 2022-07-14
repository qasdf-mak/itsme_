<template>
	<view class="width-full lh1">
		<view class="width-full">
			<view class="width-full" :style="'height: ' + StatusBar + 'px;'"></view>
			<view class="width-full itsme-index-top-box"></view>
		</view>
		<view class="fixed top left right bg-itsme-1" style="z-index: 999;">
			<view class="width-full" :style="'height: ' + StatusBar + 'px;'"></view>
			<view class="width-full itsme-index-top">
				<view class="width-full top-nav flex align-items-center">
					<view class="top-nav-side mr15 flex align-items-center">
						<view class="icon_font fs18 color-white ml15" @click="goBack" v-if="showBack">
							&#xe638;
						</view>
					</view>
					<view class="flex-1 fs18 fw600 color-white text-center">{{title}}</view>
					<view class="top-nav-side height flex align-items-center flex-right mr15">
						<view class="top-nav-right flex align-items-center flex-center" @click="clickSearch" v-if="showSearch">
							<image
								src="../../static/nav/nav_2.png"
								class="top-nav-img"
								mode="widthFix"
							></image>
						</view>
						<view class="top-nav-right flex align-items-center flex-center" @click="clickFilter" v-if="showFilter">
							<image
								src="../../static/nav/nav_1.png"
								class="top-nav-img"
								mode="widthFix"
							></image>
						</view>
					</view>
				</view>
				<view class="width-full top-nav flex align-items-center" v-if="showNav">
					<view
						v-for="(item,index) in navList"
						:key="index"
						class="flex-1 text-center pt8 pb8 fs16"
						:class="navIndex === index ? 'color-main6 fw600' : 'color-bbbbbb'"
						@click="changeNav(index)"
					>
						{{item}} 
						<text v-if="navIndex === index"> {{'( ' + likeMe + ' )' }}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'top-nav',
		data() {
			return {
				
			}
		},
		props: {
			title: String,
			navList: Array, 
			navIndex: Number,
			showSearch: Boolean,
			showFilter: Boolean,
			showBack: Boolean,
			showNav: Boolean,
			likeMe:Number,
			showHeight:Boolean,
		},
		methods: {
			goBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			changeNav(index) {
				this.$emit('changeNav', index)
			},
			clickSearch() {
				this.$emit('clickSearch')
			},
			clickFilter() {
				this.$emit('clickFilter')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.itsme-index-top{
		&-box{
			height: 176rpx;
		}
		.top-nav{
			height: 88rpx;
		}
		.top-nav-side{
			width: 176rpx;
		}
		.top-nav-img{
			width: 64rpx;
		}
		.top-nav-right{
			width: 88rpx;
			height: 88rpx;
		}

	}
</style>
