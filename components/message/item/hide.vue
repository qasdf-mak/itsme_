<template>
	<view>
		<view class="width-full flex align-items-center lh1 flex-right" v-if="item.senderId == user.id">
			<view class="text-box br20 bg-itsme-2 fs14 color-white pt8 pb8 pl15 pr15 lh15 mt5">
				{{item.payload.text}}
			</view>
		</view>
		<view class="width-full flex align-items-start lh1 flex-left" v-else>
			<view class="avatar-box mr12 float-hidden" @click="toHome">
				<image :src="friend.avatar | imageFilter('m11')" class="width-full height" mode="widthFix"></image>
			</view>
			<!-- 文本消息 -->
			<view class="flex-1" v-if="item.type === 'itsme_text' || item.type === 'itsme_audio'" @click="toMember">
				<image src="../../../static/chat/chat_10.png" class="hide-img" mode="widthFix"
					v-if="item.type === 'itsme_text' || item.type === 'itsme_audio'"></image>
				<view class="width-full mt10 flex align-items-center flex-center" v-if="user && user.gender === 1 && item.showvip"
					@click="toMember">
					<view class="fs13 color-aaaaaa">{{item.type === 'itsme_audio' ? '对方发送了一条语音' : '您的聊天次数已用完'}}
					</view>
					<view class="fs13 color-main6 pl3 pr3">开通会员</view>
					<view class="fs13 color-aaaaaa">即可查看消息！</view>
				</view>
			</view>
			<!-- 图片消息 -->
			<view class="width-full flex-wrap" v-if="item.type === 'itsme_image' || item.type === 'itsme_video'" @click="toMember">
				<view class="float-hidden" :style="imageBox" v-if="item.type === 'itsme_image'">
					<image :src="imageData.url | imageFilter" class="width-full height user-mask" mode="scaleToFill">
					</image>
				</view>
				<view :style="imageBox" v-if="item.type === 'itsme_video'">
					<image :src="imageData.url | imageFilter('poster')" class="width-full height user-mask"
						mode="scaleToFill"></image>
				</view>
				<view class="flex-1 width-full mt10 flex align-items-center flex-center"
					v-if="user && user.gender === 1 && item.showvip" @click="toMember">
					<view class="fs13 color-aaaaaa">对方给您发送了一{{item.type === 'itsme_video' ? '条视频' : '张图片' }},</view>
					<view class="fs13 color-main6 pl3 pr3">开通会员</view>
					<view class="fs13 color-aaaaaa">即可查看！</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		formatImage
	} from '../../../common/utils/common-methods'
	export default {
		name: 'item-hide',
		data() {
			return {
				
			}
		},
		props: {
			friend: Object,
			item: Object
		},
		mounted() {
		},
		computed: {
			imageData() {
				if (this.item && this.item.payload) {
					return this.item.payload
				} else {
					return null
				}
			},

			imageBox() {
				if (this.item.type === 'itsme_image' || this.item.type === 'itsme_video') {
					let width = 300
					let height = 300
					if (this.item && this.item.payload) {
						let oldwidth = this.item.payload.width
						let oldheight = this.item.payload.height
						if (oldwidth >= oldheight) {
							if (oldwidth > 700) {
								width = 350
							} else {
								width = width / 2
							}
							height = oldheight / oldwidth * width
						}
						if (oldwidth < oldheight) {
							if (oldheight > 700) {
								height = 350
							} else {
								height = height / 2
							}
							width = oldwidth / oldheight * height
						}
					}
					return 'width: ' + width + 'rpx; height: ' + height + 'rpx'
				}
			}
		},
		methods: {
			toHome() {
				this.$emit('toHome')
			},
			// 升级会员
			toMember() {
				this.$emit('toMemberPop')
			},
			// 去女神
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
		border-radius: 34rpx;
	}

	.text-send {
		background: #FFFFFF;
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

	.hide-img {
		width: 342rpx;
		height: 70rpx;
	}

	.hide-img2 {
		width: 342rpx;
		height: 200rpx;
	}

	.user-mask {
		position: relative;
		filter: blur(5rpx);
		user-select: none;
	}

	.user-mask::after {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		content: '';
		display: block;
		background: rgba(157, 157, 157, 0.95);
	}
</style>
