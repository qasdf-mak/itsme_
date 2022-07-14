<template>
	<view class="width-full lh1">
		<u-popup v-model="showGift" mode="bottom" @close="closePop" border-radius="20">
			<view class="width-full bg-white">
				<view class="width-full pl15 pr15 border-box flex align-items-center">
					<!-- <view class="tab-box">
							<u-tabs
								:list="tabList"
								:is-scroll="false"
								height="100"
								:current="tabCurrent"
								active-color="#D97DB0 "
								inactive-color="#333333"
								bar-width="60"
								bar-height="8"
								:bold="false"
								@change="changeTab"
								v-if="backpackList && backpackList.length > 0"
							></u-tabs>
						</view> -->
					<view class="width-full flex flex-between align-items-center pt15">
						<view class="flex align-items-center">
							<view class="fs15 color-deep">
								余额：<text class="fw600">{{(user && user.money) || 0}} 豆</text>
							</view>

						</view>
						<view class="fs15 color-main6 pl8 pr8 fw600" @click="toRecharge">
							充值
						</view>
					</view>
				</view>
				<view class="width-full gift-swiper-box">
					<view class="width-full height" v-if="tabCurrent === 0">
						<swiper class="width-full height" indicator-dots indicator-color="#ccc"
							indicator-active-color="#D97DB0 " :autoplay="false">
							<swiper-item v-for="(item, index) in giftList" :key="index">
								<view class="gift-swiper-item flex flex-wrap pl15 border-box">
									<view v-for="(gift, gindex) in item" :key="gindex">
										<view class="gift-box mr15 mt10 border-box"
											:class="(giftData && giftData.id === gift.id) ? 'check' : ''"
											@click="changeGift(gift)">
											<image :src="gift.icon | imageFilter('m11')" class="gift-img"
												mode="widthFix"></image>
											<view class="width-full fs14 text-center nowrap1 color-deep fw600 pb10">
												{{gift.name || ''}}
											</view>
											<view class="width-full fs13 text-center nowrap1 color-999999 pb10">
												{{gift.price || 0}}M豆
											</view>
										</view>
									</view>
								</view>
							</swiper-item>
						</swiper>
					</view>
					<view class="width-full height" v-if="tabCurrent === 1">
						<swiper class="width-full height" indicator-dots indicator-color="#eeeeee"
							indicator-active-color="#F2B27F" :autoplay="false">
							<swiper-item v-for="(item, index) in backpackList" :key="index">
								<view class="gift-swiper-item flex flex-wrap pl15 border-box">
									<view v-for="(gift, gindex) in item" :key="gindex">
										<view class="gift-box mr15 mt10 border-box"
											:class="(giftData && giftData.id === gift.id) ? 'check' : ''"
											@click="changeGift(gift)">
											<image :src="gift.icon | imageFilter('m11')" class="gift-img"
												mode="widthFix"></image>
											<view class="width-full fs14 text-center nowrap1 color-deep fw600 pb10">
												{{gift.name || ''}}
											</view>
										</view>
									</view>
								</view>
							</swiper-item>
						</swiper>
					</view>
				</view>
				<view class="ml20 mr20 mt10 pb15 flex align-items-center flex-between">
					<view class="fs15 color-deep" v-if="tabCurrent === 0">
						价值：{{giftTotal || 0}} 金币
					</view>
					<view class="flex-1 flex align-items-center flex-right">
						<view class="gift-btn bg-2 color-white fs15 text-center btn-box ml10"
							:class="giftData ? '' : 'opacity60'" @click="giftDetermine">
							发送
						</view>
					</view>
				</view>
			</view>
		</u-popup>
		<u-popup v-model="showPay" mode="bottom" border-radius="20">
			<view class="width-full bg-white pt20 pb20">
				<view class="mr20 flex align-items-center mb25">
					<view class="icon_font fs20 color-shallow ml18" @click="returnGift">
						&#xe638;
					</view>
					<view class="flex-1 text-center fs16 color-deep mr15">
						购买礼物[{{giftData && giftData.name}}]
					</view>
				</view>
				<view class="width-full flex flex-center align-items-center pt20 mb35">
					<image src="../../static/base/gold.png" class="gold-img-2" mode="widthFix"></image>
					<view class="fs40 fw600 color-deep ml8">
						{{giftTotal}}
					</view>
				</view>
				<view class="ml30 mr30">
					<view class="width-full flex align-items-center pt15 pb15" @click="changePay('balance')">
						<image src="../../static/base/gold.png" class="pay-img" mode="widthFix"></image>
						<view class="flex-1 fs15 color-deep ml10" v-if="user">
							M豆余额：{{user.money}} {{Number(user.money) < giftTotal ? '(余额不足)' : ''}}
						</view>
						<image src="../../static/base/check_1.png" class="pay-img" mode="widthFix"
							v-if="payType === 'balance'"></image>
						<image src="../../static/base/redio-2.png" class="pay-img" mode="widthFix" v-else></image>
					</view>
					<view class="width-full flex align-items-center pt15 pb15" @click="changePay('weixin')"
						v-if="payAccordingTo">
						<image src="../../static/base/pay_wx.png" class="pay-img" mode="widthFix"></image>
						<view class="flex-1 fs15 color-deep ml10">
							微信支付(1M豆=0.1元)
						</view>
						<image src="../../static/base/check_1.png" class="pay-img" mode="widthFix"
							v-if="payType === 'weixin'"></image>
						<image src="../../static/base/redio-2.png" class="pay-img" mode="widthFix" v-else></image>
					</view>
					<view class="width-full flex align-items-center pt15 pb15" @click="changePay('zhifubao')"
						v-if="payAccordingTo">
						<image src="../../static/base/pay_zfb.png" class="pay-img" mode="widthFix"></image>
						<view class="flex-1 fs15 color-deep ml10">
							支付宝支付(1M豆=0.1元)
						</view>
						<image src="../../static/base/check_1.png" class="pay-img" mode="widthFix"
							v-if="payType === 'zhifubao'"></image>
						<image src="../../static/base/redio-2.png" class="pay-img" mode="widthFix" v-else></image>
					</view>
				</view>
				<view class="ml10 mr10 pt30 pb_iphoneX_safe">
					<view class="ml35 mr35 bg-2 mt15 mb15 pay-btn text-center btn-box color-white fs16" @click="toPay">
						{{(payType === 'balance' && Number(user.money) < giftTotal) ? '充值' : '支付'}}
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import CommonService from '../../common/service/common-service.js'
	import {
		payMent,
		askPayStatus
	} from '../../common/utils/pay.js'
	import {
		mapGetters
	} from 'vuex'
	export default {
		name: 'gift-pop',
		data() {
			return {
				giftList: [],
				backpackList: [],
				showGift: true,
				showPay: false,
				tabList: [{
					name: '礼物'
				}, {
					name: '背包'
				}],
				giftFalg: true,
				tabCurrent: 0,
				giftData: null,
				giftNum: 1,
				payType: 'balance'
			}
		},
		props: {
			friend: Object,
			type: String,
			phoneType: String
		},
		computed: {
			...mapGetters(['user']),
			giftTotal() {
				if (this.giftData) {
					return Number(this.giftData.price) * this.giftNum
				} else {
					return 0
				}
			},
			payAccordingTo() {
				if (this.phoneType === 'ios' && this.commonInfo.check) {
					return false
				} else {
					return true
				}
			}
		},
		mounted() {
			this.getGiftList()
			this.getBackpackList()
		},
		methods: {
			closePop() {
				this.$emit('closePop')
			},
			getGiftList() {
				CommonService.configgift({
					type: 1
				}).then(res => {
					if (res.code === 1) {
						for (var i = 0; i < res.data.length; i += 8) {
							this.giftList.push(res.data.slice(i, i + 8))
						}
						console.log('this.giftList')
						console.log(this.giftList)
					}
				})
			},
			getBackpackList() {
				CommonService.backpacklist({
					type: 1
				}).then(res => {
					if (res.code === 1) {
						for (var i = 0; i < res.data.length; i += 8) {
							this.backpackList.push(res.data.slice(i, i + 8))
						}
						console.log('this.backpackList')
						console.log(this.backpackList)
					}
				})
			},
			changeTab(index) {
				this.tabCurrent = index
				this.giftData = null
			},
			changeGift(item) {
				this.giftData = item
			},
			changePay(type) {
				this.payType = type
			},
			giftDetermine() {
				if (this.tabCurrent === 0 && this.giftData) {
					// this.showGift = false
					this.showPay = true
				}
				if (this.tabCurrent === 1 && this.giftData) {
					console.log(this.giftData)
					this.apiSendGift(3)
				}
			},
			returnGift() {
				this.showGift = true
				this.showPay = false
			},
			toPay() {
				if (this.payType === 'balance' && Number(this.user.money) < this.giftTotal) {
					this.toRecharge()
					return false
				}
				// M豆购买
				if (this.payType === 'balance' && Number(this.user.money) >= this.giftTotal) {
					if (this.giftFalg) {
						this.giftFalg = false
						console.log('重复点击')
						CommonService.checkgift({
							gift_id: this.giftData.id,
							num: this.giftNum,
							type: 1
						}).then(res => {
							if (res.code === 1) {
								this.apiSendGift(2)
							}
						})
					}
				}
				// 微信购买
				if (this.payType === 'weixin') {
					payMent('wxpay', 3, this.giftData.id, this.giftNum).then(res => {
						if (res.code === 1) {
							this.askPayStatus(res.data)
						} else {
							console.log('支付失败')
						}
					})
				}
				// 支付宝
				if (this.payType === 'zhifubao') {
					payMent('alipay', 3, this.giftData.id, this.giftNum).then(res => {
						if (res.code === 1) {
							this.askPayStatus(res.data)
						} else {
							console.log('支付失败')
						}
					})
				}
			},
			// 查询支付结果
			askPayStatus(data) {
				askPayStatus(data).then(res => {
					if (res === 'success') {
						this.apiSendGift(1)
					} else {
						setTimeout(() => {
							this.askPayStatus(data)
						}, 200)
					}
				})
			},
			// 调用api发送
			apiSendGift(type) {
				console.log(this.friend)
				CommonService.sendgift({
					receive_user_id: this.friend.uuid,
					gift_id: this.tabCurrent === 0 ? this.giftData.id : this.giftData.gift_id,
					num: this.giftNum,
					status: 1,
					type: type,
					send_type: 2
				}).then(res => {
					if (res.code === 1) {
						this.toSendGift()
					}
				})
			},
			// toSendGift
			toSendGift() {
				this.sendImMessage('gift', this.friend, this.giftData, this.giftNum).then(
					(res) => {
						console.log('发送成功')
						this.$emit('sendSuccess', res.data)
					},
					(err) => {
						console.log('发送失败')
						console.log(err)
					}
				)
			},
			// 去充值
			toRecharge() {
				uni.navigateTo({
					url: '/pages/my/wallet'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.tab-box {
		width: 250rpx;
	}

	.gold-img-1 {
		width: 32rpx;
	}

	.gold-img-2 {
		width: 45rpx;
	}

	.pay-img {
		width: 30rpx;
		height: 30rpx;
	}

	.gift-swiper-box {
		height: 600rpx;
	}

	.gift-btn {
		width: 145rpx;
		height: 62rpx;
		line-height: 62rpx;
		border-radius: 62rpx;
	}

	.gift-box {
		width: calc((100vw - 150rpx) / 4);
	}

	.gift-box.check {
		border-radius: 10rpx;
		box-shadow: 0 5rpx 18rpx rgba(0, 0, 0, 0.3);
	}

	.gift-img {
		width: calc((100vw - 150rpx) / 4 - 40rpx);
		height: calc((100vw - 150rpx) / 4 - 40rpx);
		margin: 20rpx;
	}

	.pay-btn {
		height: 90rpx;
		line-height: 90rpx;
		border-radius: 90rpx;
	}

	.tab-box {
		height: 100rpx;
	}
</style>
