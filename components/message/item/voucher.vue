<template>
	<view v-if="item && item.payload && item && item.payload.type">
		<view class="width-full" v-if="item.senderId == user.id">
			<view class="width-full flex align-items-center mt10 mb10 flex-center"
				v-if="item.payload.type === 'voucher'">
				<view class="icon_font color-main6 fs14 mr10">
					&#xe6b0;
				</view>
				<view class="fs14 task-cent-btn color-white">
					会员券发送成功
				</view>
			</view>
		</view>
		<view class="width-full flex align-items-start lh1 flex-left" v-else>
			<view class="avatar-box mr12 float-hidden" @click="toHome">
				<image :src="friend.avatar | imageFilter('m11')" class="width-full height" mode="widthFix"></image>
			</view>
			<view class="flex-1 mb10" v-if="item.payload.type === 'voucher'">
				<view class="redcard-box relative" @click="toShowRedCard">
					<image src="../../../static/itsme/its_8.png" class="redcard-box" mode="widthFix"></image>
					<view class="absolute top left right bottom flex align-items-center flex-right">
						<view class="fs12 color-white mr35 pr10" v-if="item.payload.is_look || isLook">
							会员券已领取
						</view>
						<view class="fs12 color-white mr25" v-else>
							送会员券了 点击领取
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- gif 动效 -->
		<view class="fixed top bottom left right" v-if="showRedCard">
			<view class="width-full height relative">
				<view class="absolute top bottom left right bg-itsme-1 opacity70"></view>
				<view class="absolute top bottom left right" v-if="showRedCardPng" @click="toHideRedCard">
					<image src="../../../static/itsme/its_10.png" class="width-full" mode="widthFix"></image>
				</view>
				<view class="absolute top bottom left right" v-if="showRedCardGif">
					<image src="../../../static/gif/chat_1.gif" class="width-full" mode="widthFix"></image>
				</view>
				<!-- <view class="absolute bottom left right redcard-btn b-a-1">
					1111
				</view> -->
			</view>
		</view>
		<!-- gif 动效 -->
		<!-- 充值vip弹框 -->
		<view v-if="showMemberPay">
			<member-pay :showMemberPay="showMemberPay" @closePop="showMemberPay = false" fromPage="chat"
				:fromPageId="item.senderId" @paySuccess="showMemberPay = false">
			</member-pay>
		</view>
		<!-- 充值vip弹框 -->
	</view>
</template>

<script>
	import {
		mapGetters
	} from 'vuex'
	import ChatService from '../../../common/service/chat-service.js'
	export default {
		name: 'item-task',
		data() {
			return {
				showRedCard: false,
				showRedCardPng: false,
				showRedCardGif: false,
				showMemberPay: false,
				isLook: false
			}
		},
		props: {
			item: Object,
			friend: Object
		},
		computed: {
			...mapGetters(['user'])
		},
		mounted() {
		
		},
		methods: {
			toHome() {
				this.$emit('toHome')
			},
			useVoucher() {
				this.$emit('useVoucher', this.item.payload)
			},
			toShowRedCard() {
				if (this.item.payload.is_look || this.isLook) {
					uni.showToast({
						title: '已经领取过了哦',
						icon: 'none'
					})
				} else {
					this.isLook = true
					console.log(this.isLook)
					ChatService.ChatUserPacketLook({
						id: this.item.id
					}).then(res => {
						if (res.code === 1) {
							console.log(res)
						}
					})
					this.showRedCardGif = true
					this.showRedCardPng = false
					this.showRedCard = true
					setTimeout(() => {
						this.showRedCardPng = true
					}, 2000)
					setTimeout(() => {
						this.showRedCardGif = false
					}, 2500)
				}
			},
			toHideRedCard() {
				this.showRedCardGif = false
				this.showRedCardPng = false
				this.showRedCard = false

				this.showMemberPay = true
			}
		}
	}
</script>

<style lang="scss" scoped>
	.avatar-box {
		width: 80rpx;
		height: 80rpx;
		border-radius: 80rpx;
	}

	.redcard-box {
		width: 400rpx;
		height: 160rpx;
	}

	.redcard-btn {
		top: 800rpx;
	}
</style>
