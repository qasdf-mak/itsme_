<template>
	<view class="width-full lh1 bg-itsme-1">
		<view class="width-full">
			<view class="width-full" :style="'height: ' + StatusBar + 'px;'"></view>
			<view class="custom-top-box"></view>
		</view>
		<view class="fixed top left right bg-itsme-1">
			<view class="width-full" :style="'height: ' + StatusBar + 'px;'"></view>
			<view class="custom-top-box flex align-items-center">
				<view class="nav-left flex align-items-center" @click="goBack">
					<view class="icon_font fs18 color-white pl15 pr15 fw600">
						&#xe638;
					</view>
				</view>
				<view class="nav-center flex-1 flex align-items-center flex-center">
					<view class="fs18 color-white fw600">
						{{title}}
					</view>
				</view>
				<view class="nav-right flex align-items-center flex-right" v-if="isMyId">
					<view class="icon_font fs18 color-white pl15 pr15 fw600" @click="clickMore">
						&#xe613;
					</view>
				</view>
				<view class="nav-right flex align-items-center flex-right" v-if="isCommission">
					<view class="icon_font fs12 color-bbb pl15 pr15 fw600" @click="clickNavto">
						提现记录
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'custom-top',
		data() {
			return {
			}
		},
		props: {
			isMyId:Boolean,
			isCommission:Boolean,
			title: {
				type: String,
				default: "it's me"
			}
		},
		computed: {
			
		},
		mounted() {
			console.log(this.isMyId)
		},
		methods: {
			clickMore() {
				this.$emit('clickMore')
			},
			clickNavto() {
				this.$emit('clickNavto')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.custom-top-box{
		height: 88rpx;
	}
	.nav-left{
		width: 176rpx;
		height: 88rpx;
	}
	.nav-center{
		height: 88rpx;
	}
	.nav-right{
		width: 176rpx;
		height: 88rpx;
	}
	.color-bbb{
	    color: #bbb;
	    opacity: 0.7;
	}
</style>
