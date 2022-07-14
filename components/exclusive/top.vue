<template>
	<view class="width-full lh1 top-user-box bg-itsme-1 flex align-items-center">
		<view class="fs15 color-white ml15 mr5">
			{{haveLike ? '我喜欢的' : '猜你喜欢'}}
		</view>
		<view class="flex-1 top-user-box">
			<scroll-view scroll-x :scroll-left="scrollLeft" class="width-full height">
				<view class="height flex align-items-center">
					<view v-for="(item, index) in list" :key="index">
						<view class="user-box lh1 relative mr15" @click="clickUser(item)">
							<view class="user-box float-hidden">
								<image :src="item.avatar | imageFilter('m11')" class="user-box" mode="widthFix" :class="item.clear ? '' : 'user-mask'"></image>
							</view>
							<view class="absolute top-dian-box top right" @click.stop v-if="item.messageId"></view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'exclusive-top',
		props: {
			list: Array,
			haveLike: Boolean,
			scrollLeft: Number
		},
		mounted() {
			console.log(this.list)
		},
		methods: {
			clickUser(item) {
				if (item.messageId) {
					this.toOpenChat('exclusive', item.id)
				} else {
					this.$emit('changeCentUser', item.id)
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.top-user-box{
		height: 100rpx;
	}
	.user-box{
		width: 100rpx;
		height: 100rpx;
		border-radius: 100rpx;
	}
	.top-dian-box{
		width: 24rpx;
		height: 24rpx;
		border-radius: 24rpx;
		overflow: hidden;
		background: #FC2727;
		animation: fade-in;/*动画名称*/  
		animation-duration: 1.5s;/*动画持续时间*/  
		-webkit-animation:fade-in 1.5s;/*针对webkit内核*/  
	}
	@keyframes fade-in {  
	    0% {opacity: 0;}/*初始状态 透明度为0*/  
	    40% {opacity: 0;}/*过渡状态 透明度为0*/  
	    100% {opacity: 1;}/*结束状态 透明度为1*/  
	}  
	@-webkit-keyframes fade-in {/*针对webkit内核*/  
	    0% {opacity: 0;}
	    40% {opacity: 0;}
	    100% {opacity: 1;}
	}
	.user-mask{position: relative;filter: blur(5rpx);user-select: none;}
	.user-mask::after{position: absolute;top: 0;left: 0;width: 100%;height: 100%;content: '';display: block;background: rgba(255, 253, 253, 0.5);}
</style>
