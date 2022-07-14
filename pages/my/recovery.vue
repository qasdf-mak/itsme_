<template>
	<view class="width-full lh1 minnavh100vh bg-main">
		<view class="pl15 pr15 pt5">
			<view class="width-full box-shadow-1 br10 bg-white pt12 pb12 pl15 pr15 mb10" @click="addBank">
				<view class="flex align-items-center " v-if="isBankData">
					<view class="bank_icon">
						<view class="icon_font fs60 ">
							&#xe657;
						</view>
					</view>
					<view class="flex align-items-center flex-1 ml8 mr15">
						<view class="pl10 fs18">
							您还未绑定账号
						</view>
					</view>
					<view class="icon_font color-shallow fs15">
						&#xe60f;
					</view>
				</view>
				<view class="width-full bank-box br10 bg-white border-box pl10 pr20 flex align-items-center" v-else>
					<view class="icon_font color-zfb fs45 fw300">
						&#xe61a;
					</view>
					<view class="flex-1 flex align-items-center fs15 color-deep fw600 ml15 mt20 mb20">
						<view class="icon_font color-333333 fs15">
							支付宝
						</view>
						<view class="flex-1 flex align-items-center fs12 color-fafafb fw600 ">
							<view class="ml10">
								( 账号 {{bankData && bankData.alipay_account}} )
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="width-full pt20 pb15 pl20 pr20 flex text-center fs18 color-999999">
				<view class="flex-1 text-center  btn-border" :class="isPage ? 'border-recovery' : ''"
					@click="tabHandover(1)">
					礼物回收
				</view>
				<view class="flex-1 text-center  btn-border" :class="!isPage ? 'border-recovery' : ''"
					@click="tabHandover(2)">
					会员券回收
				</view>
			</view>

			<view class="width-full box-shadow-1 br10 bg-white pt20 pb20 pl18 pr18" v-if="isPage">
				<view class="width-full flex align-items-start">
					<view class="fs15 color-deep mt10 fw600">
						礼物选择
					</view>
					<view class="flex-1">
						<view class="width-full flex flex-right">
							<view class="recovery-color-1 fs13 mb12">
								<!-- 全部提现 -->
							</view>
						</view>
						<view class="width-full flex flex-right">
							<view class="color-999999 fs13">
								可到账
								<text class="color-main6 pl3 pr3">{{totalPrice}}</text>
								M豆
							</view>
						</view>
					</view>
				</view>
				<view class="width-full mt20 flex flex-wrap">
					<view v-for="(item,index) in goldList" :key="index">
						<view class="gold-item-box mb25 mt3 flex flex-col p5 align-items-center flex-center check"
							:class="((index + 1) % 3 === 0) ? '' : 'mr30' ">
							<view class="gold-item-img">
								<image :src="item.icon | imageFilter('m11')" class="gold-item-img" mode="scaleToFill">
								</image>
							</view>
							<view class="fs13 color-deep mt5">
								x {{item.num}}
							</view>
							<view class="mt5">
								{{item.name}}
							</view>
						</view>
					</view>
					<view class="width-full pt25 pb25 fs18 text-center" v-if="goldList && goldList.length === 0">
						<view class="width-full height flex align-items-center flex-center flex-col">
							<image src="../../static/base/black.png" class="black-no-img" mode="widthFix"></image>
							<view class="width-full text-center fs15 color-999999 mt20 " style="line-height: 60rpx;">
								您没有佣金可以提现哦~
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class=" pb20 pl18 pr18" v-else>
				<view class="width-full mt20 flex flex-wrap " v-if="redPacketList && redPacketList.length > 0">
					<view v-for="(item,index) in redPacketList" :key="index" @click="selectRedPacket(item)">
						<view class="gold-item-box mb25 mt3 flex flex-col align-items-center flex-center border-box"
							:class="((index + 1) % 3 === 0) ? '' : 'mr30'">
							<view class="flex flex-col align-items-center flex-center check"
								:class="(changeList.indexOf(item.id) !== -1) ? 'check' : 'check2'">
								<view class="gold-item-img">
									<image src="../../static/base/base_18.png" class="gold-item-img" mode="scaleToFill">
									</image>
								</view>
								<view class="fs15 mt8 text-center">
									¥ {{item.money}}
								</view>
								<view class="fs13 mt8 text-center">
									{{item.text}}
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="width-full mt35 pt25 fs18 text-center" v-else>
					<view class="width-full height flex align-items-center flex-center flex-col">
						<image src="../../static/base/black.png" class="black-no-img" mode="widthFix"></image>
						<view class="width-full text-center fs15 color-999999 mt20 " style="line-height: 60rpx;">
							您没有获得佣金, <br /> 快去完成新手任务吧~
						</view>
					</view>
				</view>
			</view>
			<view class="width-full pt35 pb35">
				<view class="width-full pt35 pb35 mt35"></view>
			</view>
		</view>

		<view class="fixed bottom left right pb_iphoneX_safe bg-white box-shadow-1">
			<view class="ml30 mr30 pt15">
				<view class="recovery-btn fs18 color-white text-center btn-box" @click="toRecovery(isPage)">
					回收
				</view>
				<view class="width-full text-center mt8 mb12 color-999999 lh18 fs13">
					1M豆=0.1元<br />
					预计1-3个工作日内到账
				</view>
			</view>
		</view>
		<u-toast ref="uToast" />
		<!-- 权限弹窗 -->
		<unify-pop :showUnify="showUnifyPop" :type="unifyType" @closePop="showUnifyPop = false" @popConfirm="popConfirm"
			@goMemberPay="goMemberPay">
		</unify-pop>
		<!-- 权限弹窗 -->
		<!-- 充值vip弹框 -->
		<member-pay :showMemberPay="showMemberPay" @closePop="showMemberPay = false"
			@paySuccess="showMemberPay = false">
		</member-pay>
		<view v-if="showRedPacket">
			<red-packet></red-packet>
		</view>
	</view>
</template>

<script>
	import {
		mapGetters,
		mapActions
	} from 'vuex'
	import UserService from '../../common/service/user-service.js'
	import CommonService from '../../common/service/common-service.js'
	export default {
		data() {
			return {
				bankData: null,
				goldList: null,
				redPacketList: null,
				showMemberPay: false,
				cententText: '',
				isBankData: false,
				changeList: [],
				RedPacketList: '',
				moneyList: [],
				moneySum: '',
				isPage: true,
				isPass: false,
				totalPrice: 0
			}
		},
		computed: {
			...mapGetters(['user', 'IfTheRefresh']),
			// totalPrice() {
			// 	if (this.goldList) {
			// 		let price = 0
			// 		this.goldList.map(item => {
			// 			if (item.value > 0) {
			// 				price = price + Number(item.value) * Number(item.money)
			// 			}
			// 		})
			// 		let pricepl = price.toString().substr(0, price.toString().length - 1)
			// 		return pricepl
			// 	}
			// },
			isVip() {
				if ((this.user && this.user.gender === 1 && this.user.is_vip === 1) || this.user.gender === 0) {
					return true
				}
				return false
			}
		},
		onPullDownRefresh() {
			this.init()
		},
		onLoad(options) {
			this.init()
			if (options.index) {
				this.isPage = false
				this.tabHandover(options.index)
			} else {
				this.tabHandover(1)
			}
		},
		onShow() {
			if (this.IfTheRefresh) {
				this.getBankData()
				this.IFTHE_REFRESH(false)
			}
		},
		methods: {
			...mapActions(['IFTHE_REFRESH']),
			init() {
				console.log(456)
				Object.assign(this.$data, this.$options.data())
				this.getBankData()
			},
			// 获取默认账号
			getBankData() {
				CommonService.bankUserAlipayList().then(res => {
					console.log(res)
					if (res.code === 1 && res.data.length === 0) {
						this.isBankData = true
						console.log('没有数据---------------------------------------')
					} else {
						this.isBankData = false
						this.bankData = res.data[0]
						console.log('有数据---------------------------------------')
					}
				})
			},
			//tab栏切换
			tabHandover(index) {
				console.log(789)
				if (index === 1) {
					this.isPage = true
				} else {
					this.isPage = false
				}
				UserService.completeNoviceTaskList({
					type: index,
				}).then(res => {
					if (res.code === 1) {
						if (index === 1) {
							this.goldList = res.data.map(item => {
								item.value = item.num
								return item
							})
							UserService.giftGiftTotalPrice().then(res => {
								if (res.code === 1) {
									this.totalPrice = res.data
								}
							})
						} else {
							this.redPacketList = res.data.map(item => {
								item.value = item.num
								return item
							})
						}


					}
				})
			},
			addBank() {
				UserService.userrealbankcheck().then(res => {
					if (res.code === 1) {
						if (res.data === 0) {
							this.unifyType = 17
							this.showUnifyPop = true
							return false
						}
					}
					uni.navigateTo({
						url: '/pages/my/banklist'
					})
				})
			},
			// 获取新手任务会员券列表

			//获取礼物列表
			// getGoldList() {
			// 	UserService.usergiftreceivedlist({
			// 		page: 1,
			// 		limit: 100,
			// 		type: 1,
			// 	}).then(res => {
			// 		if (res.code === 1) {
			// 			this.goldList = res.data.data.map(item => {
			// 				item.value = item.num
			// 				return item
			// 			})
			// 			console.log(this.goldList)
			// 		}
			// 	})
			// },
			changeNum(type, index) {
				if (type === 'del') {
					if (this.goldList[index].value > 0) {
						this.goldList[index].value--
					}
				}
				if (type === 'add') {
					if (this.goldList[index].value < this.goldList[index].num) {
						this.goldList[index].value++
					}
				}
			},
			//选择会员券
			// selectRedPacket(item) {
			// 	if (this.changeList && this.changeList.length > 0) {
			// 		let index = this.changeList.indexOf(item.id)
			// 		console.log(index)
			// 		if (index !== -1) {
			// 			this.changeList.splice(index, 1)
			// 		} else {
			// 			this.changeList.push(item.id)
			// 		}
			// 	} else {
			// 		this.changeList.push(item.id)
			// 	}
			// 	let RedPacket = this.changeList.toString()
			// 	this.RedPacketList = RedPacket
			// },
			//回收按钮
			toRecovery(index) {
				if (this.isVip) {
					UserService.userrealget().then(res => {
						if (res.code === 0) {
							this.unifyType = 17
							this.showUnifyPop = true
						} else {
							let type = index ? 1 : 2
							CommonService.withdrawalWithdrawalRequest({
								type: type
							}).then(res => {
								if (res.code === 1) {
									if (type === 1) {
										this.goldList = []
										this.tabHandover(type)
									} else {
										this.redPacketList = []
										this.tabHandover(type)
									}
									this.$refs.uToast.show({
										title: res.msg
									})
								} else {
									this.$refs.uToast.show({
										title: res.msg
									})
								}
							})
						}
					})
				} else {
					this.unifyType = 26
					this.showUnifyPop = true
				}
			},
			// toRecovery(index) {
			// 	if (this.isVip) {
			// 		UserService.userrealbankcheck().then(res => {
			// 			if (res.code === 1) {
			// 				if (res.data === 0 || res.data === 1) {
			// 					if (res.data === 0) {
			// 						this.unifyType = 17
			// 						this.showUnifyPop = true
			// 					}
			// 					if (res.data === 1) {
			// 						this.unifyType = 20
			// 						this.showUnifyPop = true
			// 					}
			// 				} else {
			// 					if (index) {
			// 						let params = {}
			// 						params.bank = {
			// 							bank_card_id: this.bankData.id
			// 						}
			// 						params.data = this.goldList.filter(item => {
			// 							return item.value > 0
			// 						})
			// 						if (!params.data || (params.data && params.data.length === 0)) {
			// 							this.$refs.uToast.show({
			// 								title: '请选择需要提现的礼物'
			// 							})
			// 							return false
			// 						}
			// 						params.data = params.data.map(item => {
			// 							let gold = {
			// 								id: item.id,
			// 								receive_user_id: this.user.id,
			// 								gift_id: item.gift_id,
			// 								num: item.num,
			// 								choose_num: item.value,
			// 								money: item.money
			// 							}
			// 							return gold
			// 						})
			// 						UserService.dowithdrawal({
			// 							gift_json: JSON.stringify(params)
			// 						}).then(res => {
			// 							this.init()
			// 							this.$refs.uToast.show({
			// 								title: res.msg
			// 							})
			// 						})
			// 					} else {
			// 						let money = 0
			// 						let moneyId = []
			// 						for (let i = 0; i < this.redPacketList.length; i++) {
			// 							money += this.redPacketList[i].money;
			// 							moneyId.push(this.redPacketList[i].id)
			// 						}
			// 						if (money < 30) {
			// 							this.$refs.uToast.show({
			// 								title: '未满30元不可提现',
			// 								icon: false
			// 							})
			// 							return false
			// 						}
			// 						UserService.withdrawalNoviceGift({
			// 							gift_ids: moneyId.toString(),
			// 							bank_id: this.bankData.id
			// 						}).then(res => {
			// 							if (res.code === 1) {
			// 								this.getNewTaskRedPacketList()
			// 								uni.showToast({
			// 									title: '会员券提现成功',
			// 									icon: 'none'
			// 								})
			// 							}
			// 						})
			// 					}
			// 				}
			// 			}
			// 		})
			// 	} else {
			// 		this.unifyType = 26
			// 		this.showUnifyPop = true
			// 	}
			// },

			popConfirm() {
				if (this.unifyType === 17) {
					uni.navigateTo({
						url: '/pages/my/realname'
					})
					this.showUnifyPop = false
				}
				if (this.unifyType === 20) {
					uni.navigateTo({
						url: '/pages/my/addbank'
					})
					this.showUnifyPop = false
				}
			},
			goMemberPay() {
				this.showUnifyPop = false
				this.showMemberPay = true
			}
		}
	}
</script>

<style lang="scss" scoped>
	.bank_icon {
		width: 110rpx;
		height: 110rpx;
		line-height: 108rpx;
	}

	.recovery-color-1 {
		color: #D97DB0;
	}

	.mb12 {
		margin-bottom: 24rpx;
	}

	.gold-item-box {
		width: calc((100vw - 252rpx) / 3);
	}

	.m-auto {
		margin: 0 auto;
	}

	.color-wx {
		color: #09BB07;
	}

	.color-zfb {
		color: #1AACEB;
	}

	.gold-item-img {
		width: 110rpx;
		height: 110rpx;
	}

	.fs60 {
		font-size: 100rpx;
	}

	.gold-item-num {
		height: 50rpx;
		border: 1rpx solid #CCCCCC;
	}

	.gold-item-change {
		width: 48rpx;
		height: 50rpx;
	}

	.gold-item-cent {
		border-left: 1rpx solid #CCCCCC;
		border-right: 1rpx solid #CCCCCC;
	}

	.black-no-img {
		width: 280rpx;
	}

	.recovery-btn {
		height: 80rpx;
		line-height: 80rpx;
		border-radius: 80rpx;
		background: linear-gradient(to bottom, #d998c2, #D97DB0);
	}

	.border-recovery {
		padding-bottom: 20rpx;
		border-bottom: 6rpx solid #D97DB0;
		border-radius: 3px;
		box-sizing: border-box;
	}

	.check {
		padding: 10rpx;
		border-radius: 10rpx;
		background: #FFFCF6;
		border: 1px solid #D97DB0;
	}


	.check2 {
		padding: 10rpx;
		border-radius: 10rpx;
	}
</style>
