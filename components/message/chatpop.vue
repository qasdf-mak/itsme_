<template>
	<view class="width-full lh1">
		<u-popup
			v-model="showPop"
			mode="center"
			safe-area-inset-bottom
			border-radius="20"
			z-index="999"
			negative-top="200"
			@close="closePop"
		>
			<view class="chat-pop-box">
				<view class="pt20 pb20 pl20 pr20">
					<view class="width-full lh18 color-deep fs15 text-center fw600" v-html="content"></view>
					<view class="width-full mt15" v-if="type === 1">
						<view class="ml10 mr10 bg-2 btn-box chat-pop-btn color-white fs15 text-center" @click="toMember">
							升级会员
						</view>
					</view>
					<view class="width-full mt15" v-if="type === 2">
						<view class="ml10 mr10 bg-2 btn-box chat-pop-btn color-white fs15 text-center" @click="toNvShen">
							去认证
						</view>
					</view>
				</view>
			</view>
		</u-popup>
		<view class="fixed bottom left right pb_iphoneX_safe" style="z-index: 999999;" @click="closePop">
			<view class="width-full mb35">
				<view class="width-full mb35 pb35 flex align-items-center flex-center">
					<view class="icon_font fs28 color-white">
						&#xe635;
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'chat-pop',
		data() {
			return {
				showPop: true
			}
		},
		props: {
			content: {
				type: String,
				default: '她高出你268身价值<br />你们的身价不匹配，无法发送消息'
			},
			type: Number
		},
		methods: {
			closePop() {
				this.$emit('closePop')
			},
			// 升级会员
			toMember() {
				this.closePop()
				uni.navigateTo({
					url: "/pages/my/member/index"
				})
			},
			// 认证女神
			toNvShen() {
				this.closePop()
				uni.navigateTo({
					url: "/pages/my/prove/index"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.chat-pop-box{
		width: 600rpx;
	}
	.chat-pop-btn{
		height: 60rpx;
		line-height: 59rpx;
		border-radius: 60rpx;
	}
</style>
