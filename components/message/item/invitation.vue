<template>
	<view v-if="item && item.payload && item && item.payload.type">
		<view class="width-full" v-if="item.senderId == user.id">
			<view class="width-full flex align-items-center mt10 mb10 flex-center"
				v-if="item.payload.type === 'toInvitation'">
				<view class="icon_font color-main6 fs14 mr10">
					&#xe6b0;
				</view>
				<view class="fs14 task-cent-btn color-deep">
					已经向对方发出邀请
				</view>
			</view>
		</view>
		<view class="width-full" v-else>
			<!-- <view class="width-full flex align-items-center mt10 mb10 flex-center"
				v-if="item.payload.type === 'toInvitation' && !isGoddess">
				<view class="icon_font color-main6 fs14 mr10">
					&#xe6b0;
				</view>
				<view class="fs14 task-cent-btn color-deep">
					对方邀请你去女神认证 <text class="color-main6 fw600" @click="toGoddess">去认证</text>
				</view>
			</view> -->
		</view>
	</view>
</template>

<script>
	import {
		mapGetters
	} from 'vuex'
	export default {
		name: 'item-task',
		props: {
			item: Object,
			friend: Object,
			isPlay: {
				type: Boolean,
				default: false
			}
		},
		computed: {
			...mapGetters(['user']),
			isGoddess() {
				if (this.user) {
					let certify = this.user.certify
					if (certify) {
						certify = JSON.parse(certify)
						if (certify.goddess && certify.goddess.verified === 'true') {
							return true
						} else {
							return false
						}
					} else {
						return false
					}
					return true
				} else {
					return false
				}
			}
		},
		mounted() {
			
		},
		methods: {
			toGoddess() {
				uni.navigateTo({
					url: '/pages/my/prove/index'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.text-box {
		max-width: 520rpx;
		border-radius: 34rpx;
		word-break: break-word;
	}

	.text-send {
		background: #F2B27F;
		box-shadow: 0 0 14rpx rgba(255, 164, 92, 0.4);
	}

	.text-from {
		background: #FFFFFF;
		box-shadow: 0 0 14rpx rgba(255, 164, 92, 0.22);
	}

	.avatar-box {
		width: 80rpx;
		height: 80rpx;
		border-radius: 80rpx;
	}
</style>
