<template>
	<view class="width-full lh1 height100vh bg-itsme-1 float-hidden">
		<!-- top -->
		<view class="fixed top left right bg-itsme-1" style="z-index: 99999999;" :style="'height:' + StatusBar + 'px;'"
			v-if="isSticky"></view>
		<view class="width-full relative">
			<view class="width-full bg-itsme-1" :style="'height:' + StatusBar + 'px;'"></view>
			<image src="../../../static/itsme/itsme_38.png" class="width-full" mode="widthFix">
			</image>
			<view class="absolute top bottom left right">
				<view class="width-full bg-itsme-1" :style="'height:' + StatusBar + 'px;'"></view>
				<view class="width-full member-nav flex align-items-center"
					:class="isSticky ? 'bg-itsme-1 fixed z-index' : ''">
					<view class="member-nav-left flex align-items-center flex-center" @click="goBack">
						<view class="icon_font fs20 color-white">
							&#xe638;
						</view>
					</view>
					<view class="flex-1 fs18 fw600 text-center" :class="isSticky ? 'color-white' : 'color-white'">
						{{isSticky ? '会员中心' : ''}}
					</view>
					<view class="member-nav-left"></view>
				</view>
				<view class="width-full flex flex-col align-items-center" :class="isSticky ? 'mt45' : 'mt8' ">
					<view class="member-avatar">
						<image :src="user.avatar | imageFilter('m11')" class="width-full height" mode="aspectFill">
						</image>
					</view>
					<view class="mt12 flex align-items-center">
						<view class="fs18 color-white mr5">
							{{user && user.nickname || ''}}
						</view>
						<image src="../../../static/itsme/itsme_10.png" class="member-avatar-img" mode="widthFix"
							v-if="user && user.is_vip && user.is_vip === 1"></image>
					</view>
					<!-- <view class="fs12 color-itsme-10 mt12" v-if="user && user.user_vip && isLate"> -->
					<view class="fs12 color-itsme-10 mt12" v-if="isLate">
						会员至：{{user.end_time | dateFilter(2, '.')}}
					</view>
					<view class="fs12 color-white mt12" v-else>
						未开通
					</view>
				</view>
			</view>
		</view>
		<!-- top -->
		<view class="width-full mt5 flex flex-center">
			<view class="event_poster_box" @click="showActivity">
				<image src="/static/itsme/itsme_45.png" class="width-full" mode="widthFix"></image>
			</view>
		</view>
		<!-- 会员列表 -->
		<view>
			<scroll-view scroll-x>
				<view class="mt10 pl15 pr5 pt15 pb5 bg-itsme-1">
					<view class="flex">
						<view v-for="(item,index) in vipList" :key="index">
							<view class="border-box mr10 br5 flex flex-col align-items-center flex-center relative" :class="vipIndex === index ? 'vip-item-check bg-itsme-2' : 'vip-item bg-itsme-4'" @click="changeVip(item,index)">
								<view class="fs15 color-itsme-18 mt20 mb15 nowrap1">
									{{item.name}}
								</view>
								<view class="flex align-items-center mb12">
									<view class="fs15 color-itsme-18 mt10">
										￥
									</view>
									<view class="color-itsme-18 fs24 fw600">
										{{item.price}}
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<!-- 会员列表 -->
		<!-- 会员权益 -->
		<view class="ml15 mr15 mt25">
			<view class="width-full flex align-items-center flex-center mb15">
				<image src="../../../static/base/vip_1.png" class="member-img-1" mode="widthFix"></image>
				<view class="fs15 color-itsme-18 fw600">
					会员特权
				</view>
			</view>
			<view
				class="card-box-vip bg-itsme-4 width-full pt25 flex flex-wrap align-items-center flex-between pr5 pl5 pb15">
				<view v-for="(item,index) in vipRightList" :key="index">
					<view class="hight-240 w-auto bg-itsme-4  br5 border-box flex flex-col align-items-center ">
						<image :src="item.avatar" class="member-img-2" mode="widthFix"></image>
						<view class="mt5 flex flex-col">
							<view class="flex-1 text-center width-full fs10 color-itsme-2 fw600 lh15"
								v-html="item.title">
							</view>
							<view class="mt5 flex-1 text-center width-full fs10 color-itsme-10 lh15 nowrap2"
								v-html="item.text">
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 会员权益 -->
		<view class="ml15 mr15 mt25" v-if="cardPackList && cardPackList.length > 0 ">
			<view class="width-full flex align-items-center flex-center mb15">
				<image src="../../../static/base/vip_1.png" class="member-img-1" mode="widthFix"></image>
				<view class="fs15 color-white fw600">
					会员券
				</view>
			</view>
			<view class="card-box-vip-no-hidden bg-itsme-4 pt30 relative">
				<view class="small-box color-white fs10 text-center absolute top12 left-5"
					:class="unavailable ? 'bg-C5C2C2' : 'bg-2'">
					{{unavailable ? '不可用' : '抵用金额'}}
				</view>
				<view class="pl15 pr15" v-if="!isListOf">
					<view class="width-full pt15 pb15 border-box flex align-items-center b-b-1 line-itsme-7"
						v-if="redpacketIndex === -1" @click="changeRedpacket(0)">
						<view class="flex cardPack-money ml20 mr35">
							<view class="fs24 color-main6 fw600 mt15">
								￥
							</view>
							<view class="fs40 color-main6 fw600">
								{{cardPackList[0].money}}
							</view>
						</view>
						<view class="flex-1 flex">
							<view class="img-box">
								<image :src="cardPackList[0].avatar |  imageFilter('m11')" class="img-box"
									mode="widthFix"></image>
							</view>
							<view class="flex-1 color-999999 fs10 mt12 ml6">
								<view>
									赠送人：
								</view>
								<view class="nowrap1 mt5">
									{{cardPackList[0].nickname}}
								</view>
							</view>
						</view>
						<view class="icon_font fs20 color-bfbcbc">
							&#xe63f;
						</view>
					</view>
					<view class="width-full pt15 pb15 border-box flex align-items-center b-b-1 line-itsme-7" v-else>
						<view class="flex cardPack-money ml20 mr35">
							<view class="fs24 color-main6 fw600 mt15">
								￥
							</view>
							<view class="fs40 color-main6 fw600">
								{{cardPackList[redpacketIndex].money}}
							</view>
						</view>
						<view class="flex-1 flex">
							<view class="img-box">
								<image :src="cardPackList[redpacketIndex].avatar |  imageFilter('m11')" class="img-box"
									mode="widthFix"></image>
							</view>
							<view class="flex-1 color-999999 fs10 mt12 ml6">
								<view>
									赠送人：
								</view>
								<view class="nowrap1 mt5">
									{{cardPackList[redpacketIndex].nickname}}
								</view>
							</view>
						</view>
						<view class="icon_font fs20 color-main6">
							&#xe64d;
						</view>
					</view>
				</view>
				<view class="pl15 pr15" v-else>
					<view v-for="(item,index) in cardPackList" :key="index">
						<view class="width-full pt15 pb15 border-box flex align-items-center b-b-1 line-itsme-7"
							@click="changeRedpacket(index)">
							<view class="flex cardPack-money ml20 mr35">
								<view class="fs24 color-main6 fw600 mt15">
									￥
								</view>
								<view class="fs40 color-main6 fw600">
									{{item.money}}
								</view>
							</view>
							<view class="flex-1 flex">
								<view class="img-box">
									<image :src="item.avatar |  imageFilter('m11')" class="img-box" mode="widthFix">
									</image>
								</view>
								<view class="flex-1 color-999999 fs10 mt12 ml6">
									<view>
										赠送人：
									</view>
									<view class="nowrap1 mt5">
										{{item.nickname}}
									</view>
								</view>
							</view>
							<view class="icon_font fs20 color-main6" v-if="redpacketIndex === index">
								&#xe64d;
							</view>
							<view class="icon_font fs20 color-bfbcbc" v-else>
								&#xe63f;
							</view>
						</view>
					</view>
				</view>
				<view class="width-full">
					<view class="pt15 pb15 fs12 width-full flex align-items-center color-itsme-10"
						:class="!isListOf ? 'ml35': 'flex-center'" @click="aListOf">
						{{!isListOf ? '展开查看更多会员券':'收起'}} <text
							class="icon_font color-itsme-10 fs18 ml5 mt5">{{!isListOf ? '&#xe637;': '&#xe776;'}}</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 会员权益 -->
		<!-- 会员券 -->
		<!-- 支付方式 -->
		<view class="ml15 mr15 br5 pt20 pl25 pr20 mt20" v-if="isIos">
			<view class="width-full mt8">
				<view v-for="(item,index) in payList" :key="index">
					<view class="width-full flex align-items-center pb20" @click="changePay(index)">
						<image :src="item.icon" class="pay-img-1" mode="widthFix"></image>
						<view class="flex-1 fs15 color-itsme-18 fw600 ml18">
							{{item.name}}
						</view>
						<image
							:src="payIndex === index ? '../../../static/base/check_1.png' : '../../../static/base/check_2.png'"
							class="pay-img-2" mode="widthFix"></image>
					</view>
				</view>
			</view>
		</view>
		<view class="width-full mb35 pb35 pt35 mt35"></view>
		<!-- 支付方式 -->
		<view class="fixed bottom left right bg-itsme-1 pb_iphoneX_safe">
			<view class="pt20 pb30 ml15 mr15">
				<view class="width-full member-bot-btn text-center fs16 color-white" v-if="vipList" @click="toPay">
					立即以{{price}}元{{user.is_vip === 1 ? "续费" : "开通"}}
				</view>
			</view>
		</view>
		<view v-if="showActivityPop">
			<activity-pop :showUnify="showActivityPop" :type="unifyType" @closePop="showActivityPop = false">
			</activity-pop>
		</view>
		<!-- 充值成功 -->
		<view v-if="rechargesuccessShow">
			<rechargesuccess-pop :showUnify="rechargesuccessShow" :expirationTime="user.end_time"
				:type="unifyType" @closePoprecharge="closePop">
			</rechargesuccess-pop>
		</view>
		<!-- 充值成功 -->
		<!-- 弹出抵用币弹窗 start -->
		<view v-if="showVoucher">
			<vip-voucher :list="cardPackList" @closePop="showVoucher = false" @chooseRedPacket="chooseRedPacket"
				@presentBtn="presentBtn"></vip-voucher>
		</view>
		<!-- 弹出抵用币弹窗 end-->
		<view v-if="showRedPacket">
			<red-packet></red-packet>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import {
		mapGetters
	} from 'vuex'
	import UserService from '../../../common/service/user-service.js'
	import PayService from '../../../common/service/pay-service.js'
	import CommonService from '../../../common/service/common-service.js'
	import rechargesuccessPop from '../../../components/common/rechargesuccesspop.vue'
	import activityPop from '../../../components/common/activityPop.vue'
	import vipVoucher from '../../../components/common/vipVoucher.vue'
	import {
		payMent,
		askPayStatus
	} from '../../../common/utils/pay.js'
	import updateUser from '../../../common/mixins/login.js'
	export default {
		mixins: [updateUser],
		data() {
			return {
				vipList: null,
				vipIndex: 0,
				payIndex: 0,
				showVoucher: false,
				cardPackList: [],
				showActivityPop: false,
				rechargesuccessShow: false,
				payList: [{
						name: '微信支付',
						icon: '../../../static/base/pay_wx.png'
					},
					{
						name: '支付宝支付',
						icon: '../../../static/base/pay_zfb.png'
					}
				],
				vipRightList: [{
						avatar: '/static/itsme/itsme_39.png',
						title: '无限次查看用户',
						text: '找到最适合你的ta',
					},
					{
						avatar: '/static/itsme/itsme_40.png',
						title: '9折解锁微信',
						text: '解锁微信享优惠',
					},
					{
						avatar: '/static/itsme/itsme_41.png',
						title: '尊贵会员身份标识',
						text: '在人群中闪闪发光',
					},
					{
						avatar: '/static/itsme/itsme_42.png',
						title: '增加阅后即焚<br />照片8秒/视频全部',
						text: '让美好停留的更久',
					},
					{
						avatar: '/static/itsme/itsme_43.png',
						title: '无限畅聊 <br /> 紧密陪伴',
						text: '不再失去心仪的Ta',
					},
					{
						avatar: '/static/itsme/itsme_44.png',
						title: '每日可看会员视频<br />/照片各300次',
						text: '不花钱看更多内容',
					}
				],
				// 点击选择
				redpacket: {
					money: 0,
					nickname: '',
					avatar: '',
					id: ''
				},
				// 默认选择
				defaultRedpacket: {
					money: 0,
					nickname: '',
					avatar: '',
					id: ''
				},
				isListOf: false,
				fromurl: '',
				isSticky: false,
				imgId: '',
				unavailable: false,
				// 
				redpacketIndex: -1,
				platform: '',
				productId: '',
				iapChannel: null,
				productIds: ['30huiyuan', '68huiyuan', '98huiyuan', '128huiyuan', '268huiyuan', '298huiyuan']
			}
		},
		components: {
			rechargesuccessPop,
			vipVoucher,
			activityPop
		},
		computed: {
			...mapGetters(['user', 'commonInfo']),
			price() {
				if (this.unavailable) {
					return this.vipList[this.vipIndex].price
				} else {
					if (this.redpacketIndex === -1) {
						return this.vipList[this.vipIndex].price
					} else {
						return Math.floor((this.vipList[this.vipIndex].price - this.cardPackList[this.redpacketIndex]
							.money) * 100) / 100
					}
				}
			},
			isLate() {
				if (this.user && this.user.end_time) {
					return true
				} else {
					return false
				}
			},
			isIos() {
				if (this.platform === 'ios' && this.commonInfo.apple_pay) {
					return false
				} else {
					return true
				}
			}
		},
		onPageScroll(e) {
			this.setSticky(e.scrollTop)
		},
		onLoad(options) {
			this.init(options)
		},
		methods: {
			init(options) {
				Object.assign(this.$data, this.$options.data())
				this.loginExpire().then(res => {
					this.platform = uni.getSystemInfoSync().platform
					if (options.fromurl && options.id) {
						this.fromurl = options.fromurl
						this.imgId = options.id
					}
					this.getCardPackList()
					this.getVipList()
				})
			},
			// ios支付
			toIosPay() {
				console.log('ios')
				if (this.redpacketIndex === -1) {
					this.productId = this.vipList[this.vipIndex].price + 'huiyuan'
				} else {
					this.productId = (this.vipList[this.vipIndex].price - this.cardPackList[this.redpacketIndex].money) +
						'huiyuan'
				}
				console.log(this.productId)
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
						if (this.redpacketIndex !== -1) {
							voucherId = this.cardPackList[this.redpacketIndex].id
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
			showActivity() {
				this.showActivityPop = true
			},
			//获取卡卷
			getCardPackList() {
				CommonService.userCardPackage({
					state: 1,
					page: 1
				}).then(res => {
					if (res.code === 1) {
						this.cardPackList = res.data
						console.log('this.cardPackList')
						console.log(this.cardPackList)
					}
				})
			},
			// 展开更多
			aListOf() {
				this.isListOf = !this.isListOf
			},
			// 选择会员券
			changeRedpacket(index) {
				if (this.unavailable) {
					this.$refs.uToast.show({
						title: '该会员不可使用会员券'
					})
				} else {
					this.redpacketIndex = index
					this.isListOf = false
				}
			},
			presentBtn(id, name, money) {
				this.showVoucher = false
				this.redpacket.id = id
				this.redpacket.nickname = name
				this.redpacket.money = money
			},
			//弹出选择抵用币窗口
			showVoucherPop() {
				this.showVoucher = true
			},
			// 页面滚动，监听头部事件
			setSticky(scrollTop) {
				if (scrollTop < (this.windowWidth - this.StatusBar - uni.upx2px(500))) {
					this.isSticky = false
				} else {
					this.isSticky = true
				}
			},
			// 获取会员种类
			getVipList() {
				UserService.viplist().then(res => {
					if (res.code === 1) {
						this.vipList = res.data.map(item => {
							item.discount_price = Number(item.discount_price).toFixed(0)
							return item
						})
						this.changeVip(this.vipList[0], 0)
						console.log(this.vipList)
					}
				})
			},
			goBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			closePopSuc() {
				console.log('聊天页面')
				console.log('666666666666666666666666666666666666666666666666666')
			},
			// 选择会员种类
			changeVip(item, index) {
				this.vipIndex = index
				console.log(item)
				if (item.name === "1天会员" || item.name === "3天会员" || item.name === "2个月会员") {
					this.unavailable = true
				} else {
					this.unavailable = false
				}
			},
			// 选择支付方式
			changePay(index) {
				this.payIndex = index
			},
			// 支付
			toPay() {
				if (this.platform === 'ios' && this.commonInfo.apple_pay) {
					this.toIosPay()
					return false
				}
				// if (this.user.is_vip === 0) { 关闭vip 不可重复购买的限制
				let mode = this.payIndex === 0 ? 'wxpay' : 'alipay'
				let voucherId = 1
				if (!this.unavailable && this.redpacketIndex !== -1) {
					console.log('不是体验会员')
					voucherId = this.cardPackList[this.redpacketIndex].id
				}
				let isChatView = this.fromPage === 'chat' ? 1 : 2
				let chatUserId = this.fromPageId
				payMent(mode, 1, this.vipList[this.vipIndex].id, 1, voucherId, isChatView, chatUserId).then(res => {
					console.log(res.code)
					if (res.code === 1) {
						console.log('00000000000000000000000000')
						this.askPayStatus(res.data)
					} else {
						this.$refs.uToast.show({
							title: '支付失败,请重新购买'
						})
						console.log('支付失败')
					}
				})
				// } else {关闭vip 不可重复购买的限制
				// 	uni.showToast({
				// 		title: '您已经是vip了',
				// 		icon: 'none',
				// 	})
				// }
			},
			// 查询支付结果
			askPayStatus(data) {
				askPayStatus(data).then(res => {
					if (res === 'success') {
						console.log('支付成功')
						if (this.fromurl && this.imgId) {
							CommonService.userphotoreaddel({
								photo_id: this.imgId
							}).then(res => {
								console.log(res)
							})
						}
						this.updateUser().then(() => {
							console.log(this.user)
							console.log('会员信息更新完成')
							this.rechargesuccessShow = true
						})
					} else {
						setTimeout(() => {
							this.askPayStatus(data)
						}, 200)
					}
				})
			},
			closePop() {
				this.rechargesuccessShow = false
				uni.navigateBack({
					delta: 1
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.member-color-1 {
		color: #000;
	}

	.member-img-1 {
		width: 62rpx;
	}

	.card-box-vip {
		box-shadow: 0px 0px 20rpx 0px rgba(0, 0, 0, 0.2);
		border-radius: 20rpx;
		overflow: hidden;
	}

	.card-box-vip-no-hidden {
		box-shadow: 0px 0px 20rpx 0px rgba(0, 0, 0, 0.2);
		border-radius: 20rpx;
	}

	.card-box-vip-list {
		background: #FFFFFF;
		box-shadow: 0px 0px 5rpx 0px rgba(0, 0, 0, 0.2);
		border-radius: 20rpx;
	}

	.color-bfbcbc {
		color: #BFBCBC;
	}

	.worth-box-1 {
		border-radius: 10rpx 0px 10rpx 0px;
	}

	.left-5 {
		left: -12rpx;
	}

	.member-img-2 {
		width: 80rpx;
	}

	.member-nav {
		height: 88rpx;

		&-left {
			width: 88rpx;
		}
	}

	.w-80 {
		width: 91%;
	}

	.member-avatar {
		width: 100rpx;
		height: 100rpx;
		border-radius: 100rpx;
		overflow: hidden;
	}

	.color-red {
		color: red;
	}

	.member-avatar-img {
		width: 28rpx;
	}

	.w-50 {
		width: 100rpx;
	}

	.vip-item {
		width: calc((100vw - 120rpx) / 4);
		height: 180rpx;
		box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.08);
		border-radius: 10px;
	}

	.vip-item-check {
		width: calc((100vw - 120rpx) / 4);
		height: 180rpx;
		box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.08);
		border-radius: 10px;
	}

	.img-box {
		width: 80rpx;
		height: 80rpx;
		border-radius: 80rpx;
	}

	.pay-box {
		box-shadow: 0 0 16rpx rgba(0, 0, 0, 0.08)
	}

	.pay-img-1 {
		width: 48rpx;
	}

	.event_poster_box {
		width: 702rpx;
		height: 155rpx;
	}

	.pay-img-2 {
		width: 30rpx;
	}

	.member-bot-btn {
		height: 90rpx;
		line-height: 90rpx;
		background: #D97DB0;
		border-radius: 45rpx;
	}

	.carousel {
		width: 690rpx;
		height: 165rpx;
		margin: 0 auto;
		border-radius: 20rpx;
		overflow: hidden;
	}

	.bg-C5C2C2 {
		background-color: #C5C2C2 !important;
	}

	.whiteedge {
		height: 120rpx;
		z-index: 99999;
	}

	.top-28 {
		top: -53rpx;
	}

	.wh-100 {
		width: 100%;
		height: 100%;
	}

	.bg-fafafa {
		background: #fafafa;
	}

	.z-index {
		z-index: 999999999;
	}

	.mt45 {
		margin-top: 90rpx;
	}

	.color-C5C2C2 {
		color: #C5C2C2 !important;
	}

	.w-auto {
		width: calc((100vw - 80rpx) / 3);
	}

	.vip-item-default {
		background: #FFFFFF;
		box-shadow: 0 0 16rpx rgba(0, 0, 0, 0.08);
	}

	.small-box {
		width: 128rpx;
		height: 34rpx;
		line-height: 35rpx;
		border-radius: 4rpx;
	}

	.hight-240 {
		height: 220rpx;
	}

	.cardPack-money {
		width: 200rpx;
	}
</style>
