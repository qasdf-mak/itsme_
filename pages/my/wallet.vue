<template>
	<view class="width-full lh1 minnavh100vh bg-fafafa">
		<view class="width-full flex flex-center">
			<view class="wallet-top mt15 relative">
				<view class="bg-wallet top bottom left right flex align-items-center flex-between">
					<view class="ml30">
						<view class="flex align-items-center flex-center">
							<view class="fs12 color-eeeeee">
								M豆余额
							</view>
						</view>
						<view class="fs32 color-white fw600 mt12">
							{{user && user.money}}
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="bg-itsme-1 br10 ">
			<view class="width-full pt20 pb15 pl20 pr20 flex text-center fs18 color-itsme-17">
				<view class="flex-1 align-items-center flex-center" :class=" navNumber === 1 ? 'btn-border' : ''"
					@click="changetab(1)">
					充值
				</view>
				<view class="flex-1 align-items-center flex-center" :class=" navNumber === 2 ? 'btn-border' : ''"
					@click="changetab(2)">
					收支明细
				</view>
			</view>
			<!-- 充值 -->
			<view class="width-full lh1 bg-itsme-1" v-if="navNumber === 1">
				<!-- M豆种类 -->
				<view class="ml15 mr15 mb15 flex flex-wrap">
					<view v-for="(item,index) in payGoldlist" :key="index">
						<view class="gold-box height-180 mb15" :class="(index + 1) % 3 === 0 ? '' : 'mr15'">
							<view class="width-full height br5 border-box flex flex-col align-items-center flex-center relative" :class="payGoldIndex === index ? 'bg-itsme-2' : 'bg-itsme-4'" @click="changeGold(index)">
								<view class="fs18 color-white">
									{{item.num}}M豆
								</view>
								<view class=" mt20 text-center color-itsme-2" :class="payGoldIndex === index ? 'gold-btn-1' : 'gold-btn'">
									￥{{item.discount_price}}
								</view>
							</view>
						</view>
					</view>
				</view>
				<!-- 支付方式 -->
				<view class="ml15 mr15 br5 pl25 pt15 pb15 pr20" v-if="isIos">
					<!-- || (platform === 'ios' && commonInfo && !commonInfo.check) -->
					<view class="width-full mt8">
						<view v-for="(item,index) in payList" :key="index">
							<view class="width-full flex align-items-center " :class="index === 0 ? 'pb20' : 'mb35' "
								@click="changePay(index)">
								<image :src="item.icon" class="pay-img-1" mode="widthFix"></image>
								<view class="flex-1 fs15 color-white fw600 ml18">
									{{item.name}}
								</view>
								<image
									:src="payIndex === index ? '../../static/base/check_1.png' : '../../static/base/check_2.png'"
									class="pay-img-2" mode="widthFix"></image>
							</view>
						</view>
					</view>
				</view>
				<view class="absolute left right bottom20">
					<view class="width-full flex align-items-center flex-center pb10  ">
						<view class="pay-bot-btn fs18 text-center color-white"
							:class="payGoldIndex === -1 ? 'opacity60' : ''" @click="toPay">
							确定支付
						</view>
					</view>
					<view class="width-full text-center fs10 color-999999">
						由于虚拟物品特殊性，M豆充值完成后，不支持退款
					</view>
				</view>
			</view>
			<!-- 收支明细 -->
			<view class="ml20 mr20 gold-list-box pl18 pr15" v-if="navNumber === 2">
				<view v-for="(item,index) in goldlist" :key="index">
					<view class="width-full flex align-items-center">
						<view class="flex-1 mt12 mb12">
							<view class="fs15 color-white mb8 width-full nowrap1">
								{{item.text}}
							</view>
							<view class="width-full fs13 color-itsme-10">
								{{item.time}}
							</view>
						</view>
						<view class="fs18 fw600"
							:class="(Number(item.before) > Number(item.after)) ? 'color-gold-1' : 'color-gold-2'">
							{{item.money}}
						</view>
					</view>
				</view>
				<view class="width-full fs20 pt35 pb35 text-center mt15 fw600" v-if="goldlist.length <= 0">
					<view class="width-full fs18 text-center">
						<view class="width-full height flex align-items-center flex-center flex-col">
							<image src="../../static/base/black.png" class="black-no-img" mode="widthFix"></image>
							<view class="width-full text-center fs15 color-999999 mt20 " style="line-height: 60rpx;">
								暂无收支明细
							</view>
						</view>
					</view>
				</view>
				<view class="width-full pt15 pb15" v-if="goldlist && goldlist.length > 0 && pages.finish">
					<u-divider bg-color="">没有更多了</u-divider>
				</view>
			</view>
		</view>
		<u-toast ref="uToast" />
		<view class="width-full pt30 pb_iphoneX_safe"></view>
		<!-- 充值vip弹框 start-->
		<view v-if="showMemberPay">
			<member-pay :showMemberPay="showMemberPay" @closePop="showMemberPay = false" :centent="cententText"
				@paySuccess="paySuccess">
			</member-pay>
		</view>
		<!-- 充值vip弹框 end-->
		<view v-if="showRedPacket">
			<red-packet></red-packet>
		</view>
	</view>
</template>

<script>
	import {
		mapGetters
	} from 'vuex'
	import UserService from '../../common/service/user-service.js'
	import PayService from '../../common/service/pay-service.js'
	import {
		payMent,
		askPayStatus
	} from '../../common/utils/pay.js'
	import updateUser from '../../common/mixins/login.js'
	export default {
		mixins: [updateUser],
		data() {
			return {
				platform: '',
				goldlist: [],
				confirmText: '',
				contentText: '',
				navNumber: 1,
				payGoldlist: null,
				payGoldIndex: 2,
				payIndex: 0,
				payList: [{
						name: '微信支付',
						icon: '../../static/my/my_15.png'
					}, {
						name: '支付宝支付',
						icon: '../../static/my/my_14.png'
					},

				],
				productId: '',
				showMemberPay: false,
				cententText: '',
				iapChannel: null,
				productIds: ['jinbi_120', 'jinbi_680', 'jinbi_1080', 'jinbi_6180', 'jinbi_10980'],
				pages: {
					page: 1,
					limit: 10,
					finish: false
				}
			}
		},
		computed: {
			...mapGetters(['user']),
			isIos() {
				if (this.platform === 'ios' && this.commonInfo.apple_pay) {
					return false
				} else {
					return true
				}
			}
		},
		onPullDownRefresh() {
			this.init()
		},
		onReachBottom() {
			if (!this.pages.finish) {
				this.pages.page++
				this.getGoldList()
			}
		},
		onLoad() {
			this.init()
			console.log(this.commonInfo)
		},
		methods: {
			init() {
				Object.assign(this.$data, this.$options.data())
				this.platform = uni.getSystemInfoSync().platform
				console.log(this.platform)
				this.getGoldList()
				this.getPayGoldList()
			},
			iosPay() {
				let appleProductId = this.payGoldlist[this.payGoldIndex].apple_product_id
				if (!appleProductId || this.productIds.indexOf(appleProductId) === -1) {
					uni.showModal({
						content: "该商品不可购买",
						showCancel: false
					})
				} else {
					this.productId = appleProductId
					uni.showLoading({
						title: '检测支付环境...'
					})
					let zdIospay = uni.requireNativePlugin('ZD-Iospay')
					let transactionDateresult = zdIospay.ZdIospayFunctionSync(this.productId)
					plus.payment.getChannels((channels) => {
						console.log("获取到channel" + JSON.stringify(channels))
						for (var i in channels) {
							var channel = channels[i]
							if (channel.id === 'appleiap') {
								this.iapChannel = channel
								this.iapChannel.requestOrder(this.productIds, (orderList) => { //必须调用此方法才能进行 iap 支付
									console.log('requestOrder success666: ' + JSON.stringify(orderList));
									uni.hideLoading()
									this.requestPayment()
								}, (e) => {
									console.log('requestOrder failed: ' + JSON.stringify(e));
									uni.hideLoading()
									this.errorMsg()
								})
							}
						}
						if (!this.iapChannel) {
							this.errorMsg()
						}
					}, (error) => {
						this.errorMsg()
					})
				}
			},
			requestPayment() {
				uni.showLoading({
					title: '支付中...'
				})
				uni.requestPayment({
					provider: 'appleiap',
					orderInfo: {
						productid: this.productId
					},
					success: (e) => {
						PayService.applenotify({
							id: this.payGoldlist[this.payGoldIndex].id,
							type: 2,
							receipt_data: e.transactionReceipt,
							voucher_id: 1,
							json: JSON.stringify(e)
						}).then(res => {
							uni.hideLoading()
							console.log(res)
							if (res.code === 1) {
								console.log('支付成功')
								this.updateUser().then(() => {
									console.log('会员信息更新完成')
									uni.navigateBack({
										delta: 1
									})
								})
							} else {
								uni.showModal({
									content: "支付失败,请重新支付 ",
									showCancel: false
								})
							}
						})
					},
					fail: (e) => {
						uni.hideLoading()
						uni.showModal({
							content: "支付失败,请重新支付 ",
							showCancel: false
						})
					},
					complete: () => {
						uni.hideLoading()
						console.log("payment结束")
					}
				})
			},
			errorMsg() {
				uni.showModal({
					content: "暂不支持苹果 iap 支付",
					showCancel: false
				})
			},
			changetab(index) {
				if (index === 1) {
					this.navNumber = 1
				}
				if (index === 2) {
					this.navNumber = 2
				}
			},
			getPayGoldList() {
				UserService.goldlist().then(res => {
					if (res.code === 1) {
						this.payGoldlist = res.data
						console.log(this.payGoldlist)
					}
				})
			},
			// 选择M豆种类
			changeGold(index) {
				this.payGoldIndex = index
			},
			// 选择支付方式
			changePay(index) {
				console.log(index)
				this.payIndex = index
			},
			// 支付
			toPay() {

				// if (this.user.gender === 1 && this.user.is_vip !== 1) {
				// 	this.showMemberPay = true
				// 	this.cententText = "男性需是VIP才可购买金币哦"
				// 	return false
				// }
				if (this.payGoldIndex === -1) {
					return false
				}
				if (this.platform === 'ios' && this.commonInfo.apple_pay) { // && this.commonInfo && this.commonInfo.check
					this.iosPay()
				} else {
					let mode = this.payIndex === 0 ? 'wxpay' : 'alipay'
					payMent(mode, 2, this.payGoldlist[this.payGoldIndex].id).then(res => {
						if (res.code === 1) {
							uni.showLoading({
								title: '支付中'
							})
							this.askPayStatus(res.data)
						} else {
							console.log('支付失败')
						}
					})
				}
			},
			// 查询支付结果
			askPayStatus(data) {
				let that = this
				askPayStatus(data).then(res => {
					if (res === 'success') {
						console.log('支付成功')
						this.updateUser().then(() => {
							console.log('会员信息更新完成')
							uni.hideLoading()
							uni.navigateBack({
								delta: 1
							})
						})
					} else {
						setTimeout(function() {
							that.askPayStatus(data)
						}, 200)
					}
				})
			},
			getGoldList() {
				uni.showLoading({
					title: '加载中'
				})
				UserService.commonMoneyDetail({
					page: this.pages.page,
					limit: this.pages.limit
				}).then(res => {
					uni.hideLoading()
					uni.stopPullDownRefresh()
					if (res.code === 1 && res.data && res.data.length > 0) {
						this.pages.finish = false
						this.goldlist = this.goldlist.concat(res.data)
						console.log(this.goldlist)
					} else {
						this.pages.finish = true
					}
				})
			},
			toNavigateTo(url) {
				uni.navigateTo({
					url
				})
			},
			goldRecovery() {
				uni.navigateTo({
					url: '/pages/my/recovery'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.wallet-box {
		height: calc(100vh - 100rpx);
	}

	.wallet-top {
		width: 686rpx;
		height: 220rpx;
	}

	.gold-img {
		width: 30rpx;
	}

	.wallet-top-btn {
		width: 180rpx;
		height: 60rpx;
		border-radius: 60rpx;
		line-height: 60rpx;
		box-shadow: 0 0 12rpx rgba(0, 0, 0, 0.22)
	}

	.wallet-cent-btn {
		height: 80rpx;
		line-height: 80rpx;
		border-radius: 80rpx;
		background: linear-gradient(to bottom, #D98aae, #D97DB0);
	}

	.color-gold-1 {
		color: #333333;
	}

	.gold-list-box {
		box-shadow: 0rpx 0rpx 18rpx 0rpx rgba(0, 0, 0, 0.04);
		border-radius: 20rpx;
	}

	.color-gold-2 {
		color: #D97DB0;
	}

	.worth-box-1 {
		border-radius: 10rpx 0px 10rpx 0px;
	}

	.bg-wallet {
		background: linear-gradient(164deg, #D97DB0 0%, #EC9DC4 100%);
		box-shadow: 0rpx 0rpx 18rpx 0rpx rgba(0, 0, 0, 0.04);
		border-radius: 20rpx;
	}

	.btn-border {
		padding-bottom: 20rpx;
		color: #D97DB0;
		border-bottom: 6rpx solid #D97DB0;
	}

	.recharge-top-left {
		width: 36rpx;
	}

	.gold {
		&-box {
			width: calc((100vw - 120rpx) / 3);
			height: calc((100vw - 120rpx) / 3);
		}

		&-item-1 {
			background: #FFFFFF;
			box-shadow: 0 0 16rpx rgba(0, 0, 0, 0.08)
		}

		&-item-2 {
			background: #FFFCF6;
			border: 2rpx solid #D97DB0;
			box-shadow: 0 0 16rpx rgba(0, 0, 0, 0.08)
		}
	}

	.recharge-color-1 {
		color: #D97DB0;
	}

	.black-no-img {
		width: 280rpx;
	}

	.gold-btn {
		width: 120rpx;
		height: 40rpx;
		background: #23232D;
		line-height: 40rpx;
		border: 1rpx solid #D97DB0;
		border-radius: 20rpx;
	}

	.gold-btn-1 {
		width: 120rpx;
		height: 40rpx;
		background: #FFFFFF;
		line-height: 40rpx;
		border-radius: 20rpx;
	}

	.pay-box {
		box-shadow: 0 0 16rpx rgba(0, 0, 0, 0.08)
	}
	.height-180{
		height: 180rpx;
	}

	.pay-img-1 {
		width: 48rpx;
	}

	.pay-img-2 {
		width: 30rpx;
	}

	.pay-bot-btn {
		width: 300rpx;
		height: 60rpx;
		line-height: 60rpx;
		border-radius: 60rpx;
		background: #D97DB0;
	}

	.pay-bot-btn:active {
		opacity: 0.6;
	}
</style>
