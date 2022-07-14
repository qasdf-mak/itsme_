<template>
	<view class="width-full lh1">
		<u-popup v-model="show" mode="center" safe-area-inset-bottom :mask-close-able="false" border-radius="20"
			z-index="999" :mask-custom-style="{background: 'rgba(250, 250, 250, 0.6)'}">
			<view class="member-pay-box bg-white">
			      <view class="relative  top left right img-title-logo">
			      	<view class="absolute ">
			      		<image src="/static/itsme/itsme_37.png" class="img-title-logo" mode="widthFix"></image>
			      	</view>
			      </view>
				<!-- 轮播 -->
				<view class="member-swiper-box mt20">
					<swiper class="member-swiper-box" autoplay indicator-dots :interval="2500" circular
						indicator-color="#F9CBE5" indicator-active-color="#D97DB0">
						<swiper-item v-for="(item, index) in swiperList" :key="index">
							<view class="member-swiper-box">
								<image :src="item | imageFilter" class="member-swiper-box" mode="scaleToFill"></image>
							</view>
						</swiper-item>
					</swiper>
				</view>
				<!-- 轮播 -->
				<!-- 价格列表 -->
				<view class="width-full mt30">
					<view class="ml12 mr12 flex align-items-center flex-between">
						<view v-for="(item,index) in vipList" :key="index">
							<view class="vip-item border-box flex flex-col align-items-center flex-center"
								:class="vipIndex === index ? 'vip-item-active' : 'vip-item-default'"
								@click="changeVip(item,index)">
								<view class="fs13 color-deep fw600">
									{{item.name}}
								</view>
								<view class="width-full flex align-items-center flex-center mt15">
									<view class="fs13 color-deep fw900">
										￥
									</view>
									<view class="fs18 color-deep fw900">
										{{item.price}}
									</view>
								</view>
								<view class="fs10 color-aaaaaa mt12">
									加{{item.up_worth}}身价
								</view>
							</view>
						</view>
					</view>
				</view>
				<!-- 价格列表 -->
				<!-- 会员券 -->
				<view class="width-full mt15 mb15 pl15 pr15" @click="showVoucherPop">
					<view
						class="card-box-vip-no-hidden width-full flex flex-wrap align-items-center flex-between pr5 pl5"
						v-if="!redpacket && !isOneDayVip">
						<view class="width-full flex flex-center align-items-center pt10 pb10  color-main6">
							<view class="icon_font fs16 color-BFBCBC mt3 mr15">
								&#xe62c;
							</view>
							<view class="color-BFBCBC fs16">
								请选择会员券
							</view>
						</view>
					</view>
					<view
						class="card-box-vip-no-hidden width-full flex flex-wrap align-items-center flex-between pr5 pl5"
						v-if="!isOneDayVip && redpacket">
						<view class="small-box  color-white fs10 text-center mt8 relative left-5">
							抵用金额
						</view>
						<view class="width-full flex align-items-center pb15 pr15">
							<view class="fs12 fw600 color-main6 ml18">
								￥<text class="fs24 fw600 color-main6">{{redpacket.money || 0}}</text>
							</view>
							<view class="flex flex-1 flex-center">
								<view class="flex " v-if="redpacket.avatar===''">
									<image src="/static/base/startup.jpg" class="img-vip" mode=""></image>
								</view>
								<view class="flex " v-else>
									<image :src="redpacket.avatar | imageFilter('m11')" class="img-vip" mode=""></image>
								</view>
								<view class="ml5 flex w-50 flex-col flex-right">
									<view class="fs10 color-999999">
										赠送人 :
									</view>
									<view class="fs10 mt8 color-999999 nowrap1">
										{{redpacket.nickname === '' ? '请选择会员券' : redpacket.nickname}}
									</view>
								</view>
							</view>
							<view class="fs20 fw600 ml35">
								<view class="icon_font fs20 color-bfbcbc" v-if="false">
									&#xe63f;
								</view>
								<view class="icon_font fs20 color-main6">
									&#xe64d;
								</view>
							</view>
						</view>
					</view>
				</view>
				<!-- 会员券 -->
				<!-- 支付类型 -->
				<view class="width-full mt15 flex"
					v-if="platform === 'android' || (platform === 'ios' && commonInfo && !commonInfo.check)">
					<view class="flex-1" v-for="(item,index) in payList" :key="index">
						<view class="flex align-items-center pt5 pb5 mb10 flex-left" @click="changePay(index)">
							<view class="ml15 pay-img flex align-items-center flex-left">
								<image :src="item.icon" class="pay-img" mode="scaleToFill"></image>
							</view>
							<view class="fs15 color-deep fw600 ml12">
								{{item.name}}
							</view>
							<view class="pay-right-box ml15">
								<image src="../../static/base/check_1.png" class="pay-right-box" mode="scaleToFill"
									v-if="payIndex === index"></image>
								<image src="../../static/base/check_2.png" class="pay-right-box" mode="scaleToFill"
									v-else></image>
							</view>
						</view>
					</view>
				</view>
				<!-- 支付类型 -->
				<!-- 支付 -->
				<view class="width-full mt30 pb15 flex flex-col align-items-center flex-center">
					<view class="fs14 color-999999 mb10 fw600" @click="closePop">
						暂不开通
					</view>
					<view class="pay-btn-box text-center color-white fw600 fs15" @click="toPay">
						领取会员特权
					</view>
					<view class="width-full text-center fs10 color-999999 mt8 pl15 pr15">
						{{centent}}
					</view>
				</view>
				<!-- 支付 -->
			</view>
		</u-popup>
		<!-- 选择会员券弹窗 start -->
		<view v-if="showVoucher">
			<vip-voucher :list="cardPackList" :isOneDayVip="isOneDayVip" @closePop="showVoucher = false"
				@chooseRedPacket="chooseRedPacket"></vip-voucher>
		</view>
		<!-- 选择会员券弹窗 end -->
		<!-- 充值成功 start-->
		<view v-if="rechargesuccessShow">
			<rechargesuccess-pop :showUnify="rechargesuccessShow" :expirationTime="user.user_vip.end_time"
				:type="unifyType" @closePop="closePop">
			</rechargesuccess-pop>
		</view>
		<!-- 充值成功 end-->
	</view>
</template>

<script>
	import {
		mapGetters
	} from 'vuex'
	import rechargesuccessPop from './rechargesuccesspop.vue'
	import UserService from '../../common/service/user-service.js'
	import CommonService from '../../common/service/common-service.js'
	import PayService from '../../common/service/pay-service.js'
	import {
		payMent,
		askPayStatus
	} from '../../common/utils/pay.js'
	import updateUser from '../../common/mixins/login.js'
	import vipVoucher from './vipVoucher.vue'
	export default {
		name: 'member-pay',
		mixins: [updateUser],
		data() {
			return {
				vipList: [],
				vipIndex: 2,
				payIndex: 0,
				showVoucher: false,
				showUnifyPop: false,
				isOneDayVip: false,
				platform: '',
				productId: '',
				iapChannel: null,
				productIds: ['30huiyuan', '68huiyuan', '98huiyuan', '128huiyuan', '268huiyuan', '298huiyuan'],
				redpacket: null,
				payList: [{
					name: '微信支付',
					icon: '/static/base/pay_wx.png'
				}, {
					name: '支付宝支付',
					icon: '/static/base/pay_zfb.png'
				}],
				swiperList: [],
				cardPackList: [],
				cardPackIndex: -1,
				rechargesuccessShow: false
			}
		},
		props: {
			showMemberPay: Boolean,
			centent: String,
			powerData: Object,
			fromPage: String, //chat = 聊天页
			fromPageId: String
		},
		computed: {
			...mapGetters(['user', 'commonInfo']),
			show: {
				get() {
					return this.showMemberPay
				},
				set() {}
			}
		},
		components: {
			vipVoucher,
			rechargesuccessPop
		},
		mounted() {
			this.getVipList()
			this.getSwiperList()
			this.getCardPackList()
			this.platform = uni.getSystemInfoSync().platform
		},
		methods: {
			//获取卡卷
			getCardPackList() {
				CommonService.userCardPackage({
					state: 1,
					page: 1
				}).then(res => {
					if (res.code === 1) {
						this.cardPackList = res.data
						if (this.fromPage === 'chat') {
							console.log('------------------------------------------------')
							if (this.fromPageId && this.cardPackList && this.cardPackList.length > 0) {
								let cardPackData = this.cardPackList.filter(item => {
									return Number(item.v_uid) === Number(this.fromPageId)
								})
								console.log(cardPackData)
								if (cardPackData && cardPackData.length > 0 && !this.isOneDayVip) {
									this.redpacket = cardPackData[0]
								}
							}
						}
					} else {
						this.redpacket = this.cardPackList[0]
					}
				})
			},
			// 关闭弹窗
			closePop() {
				this.$emit('closePop')
				this.rechargesuccessShow = false
			},
			//弹出选择抵用币窗口
			showVoucherPop() {
				console.log('132456748')
				this.showVoucher = true
			},
			chooseRedPacket(item) {
				this.redpacket = item
			},
			// 获取会员种类
			getVipList() {
				UserService.viplist().then(res => {
					if (res.code === 1) {
						this.vipList = res.data.map(item => {
							item.discount_price = Number(item.discount_price).toFixed(0)
							return item
						})
					}
				})
			},
			// 轮播图
			getSwiperList() {
				UserService.buyvipslide().then(res => {
					if (res.code === 1) {
						this.swiperList = res.data
					}
				})
			},

			// 选择vip类型
			changeVip(item, index) {
				this.vipIndex = index
				if (item.name === "1天会员") {
					this.redpacket = null
					this.isOneDayVip = true
				} else {
					if (!this.redpacket) {
						this.getCardPackList()
					}
					this.isOneDayVip = false
				}
			},
			// 选择支付类型
			changePay(index) {
				this.payIndex = index
			},
			// ios支付
			toIosPay() {
				console.log('ios')
				if (this.redpacket && this.redpacket.id) {
					this.productId = (this.vipList[this.vipIndex].price - this.redpacket.money) + 'huiyuan'
				} else {
					this.productId = this.vipList[this.vipIndex].price + 'huiyuan'
				}
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
						let voucherId = 1
						if (this.redpacket && this.redpacket.id) {
							voucherId = this.redpacket.id
						}
						PayService.applenotify({
							id: this.vipList[this.vipIndex].id,
							type: 1,
							receipt_data: e.transactionReceipt,
							voucher_id: voucherId,
							json: JSON.stringify(e)
						}).then(res => {
							if (res.code === 1) {
								this.updateUser().then(() => {
									console.log('会员信息更新完成')
									this.$emit('paySuccess')
									console.log('会员信息更新完成')
									this.rechargesuccessShow = true
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
			// 支付
			toPay() {
				if (this.user.is_vip === 0) {
					if (this.platform === 'ios' && this.commonInfo && this.commonInfo.check) {
						this.toIosPay()
						return false
					}
					let mode = this.payIndex === 0 ? 'wxpay' : 'alipay'
					let voucherId = 1
					if (this.redpacket) {
						voucherId = this.redpacket.id
					}
					let isChatView = this.fromPage === 'chat' ? 1 : 2
					let chatUserId = this.fromPageId
					payMent(mode, 1, this.vipList[this.vipIndex].id, 1, voucherId, isChatView, chatUserId).then(res => {
						console.log(res.code)
						if (res.code === 1) {
							this.askPayStatus(res.data)
						} else {
							console.log('支付失败')
						}
					})
				} else {
					uni.showToast({
						title: '您已经是VIP了',
						icon: 'none',
					})
				}
			},
			// 查询支付结果
			askPayStatus(data) {
				askPayStatus(data).then(res => {
					console.log(res)
					if (res === 'success') {
						console.log('支付成功')
						this.updateUser().then(() => {
							console.log('会员信息更新完成')
							this.rechargesuccessShow = true
							this.$emit('paySuccess')
							console.log('会员信息更新完成')
						})
						this.invitationToPay('paymentSuccess', this.redpacket.userId).then(res => {})
					} else {
						setTimeout(() => {
							this.askPayStatus(data)
						}, 200)
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.member-pay-box {
		width: 680rpx;
	}

	.member-swiper-box {
		width: 680rpx;
		height: 216rpx;
	}
	.img-title-logo{
		width: 344rpx;
		height: 87rpx;
	}

	.color-BFBCBC {
		color: #BFBCBC;
	}

	.vip-item {
		width: 145rpx;
		height: 192rpx;
		border-radius: 10rpx;
	}

	.vip-item-default {
		background: #FFFFFF;
		box-shadow: 0 0 16rpx rgba(0, 0, 0, 0.08);
	}

	.card-box-vip-no-hidden {
		background: #FFFFFF;
		box-shadow: 0px 0px 16px 0px rgba(135, 78, 110, 0.2);
		border-radius: 10rpx;
	}

	.left-5 {
		left: -20rpx;
	}

	.vip-item-active {
		background: #FFF6FB;
		border: 3rpx solid #D97DB0;
		box-shadow: 0 0 16rpx rgba(0, 0, 0, 0.08);
	}

	.img-vip {
		width: 67rpx;
		height: 67rpx;
		border-radius: 50%;
	}

	.pay-img {
		width: 45rpx;
		height: 45rpx;
	}

	.color-red {
		color: red;
	}

	.small-box {
		width: 128rpx;
		height: 34rpx;
		line-height: 35rpx;
		background: #D97DB0;
		border-radius: 4rpx;
	}

	.pay-right-box {
		width: 30rpx;
		height: 30rpx;
	}

	.pay-btn-box {
		width: 410rpx;
		height: 70rpx;
		border-radius: 70rpx;
		line-height: 69rpx;
		background: linear-gradient(to right bottom, #D97DB0, #EC76A8)
	}
</style>
