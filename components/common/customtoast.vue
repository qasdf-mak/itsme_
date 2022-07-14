<template>
	<view class="fixed top bottom left right" style="z-index: 99999;" v-if="show">
		<view class="width-full height relative">
			<view class="absolute top bottom right left"></view>
			<view class="absolute top bottom right left flex align-items-center flex-center">
				<view class="load-box br10 float-hidden relative">
					<view class="absolute top bottom right left bg-black opacity60"></view>
					<view class="absolute top bottom right left flex align-items-center flex-center flex-col">
						<view v-if="type === 'load'" class="pb15">
							<u-loading mode="flower" size="60"></u-loading>
						</view>
						<view v-if="type === 'success'">
							<view class="icon_font fs40 color-white">
								&#xe632;
							</view>
						</view>
						<view class="fs14 color-white">
							{{title}}
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'custom-toast',
		data() {
			return {
			}
		},
		props: {
			title: {
				type: String,
				default: "加载中"
			},
			type: {
				type: String,
				default: "load"
			},
			show: {
				type: Boolean,
				default: false
			}
		},
		computed: {
			
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
	.load-box{
		width: 250rpx;
		height: 200rpx;
		
	}
</style>
