<template>
	<view class="width-full lh1 minnavh100vh bg-itsme-1 pb10">
		<!-- 顶部  start-->
		<custom-top title="佣金" isCommission @clickNavto="toJumpPage(1,'/pages/my/withdrawalRecord')"></custom-top>
		<!-- 顶部  end-->
		<!-- tab 切换  start -->
		<view class="width-full pl35 pr35 bg-itsme-1">
			<u-tabs :list="list" :is-scroll="false" :current="current" @change="changeTabs" inactive-color="#9E9E9F"
				font-size="32" height="100" bg-color="#1A1A1F" bar-height="8" bar-width="20" active-color="#D97DB0">
			</u-tabs>
		</view>
		<!-- tab 切换  end -->
		<view v-if="current === 0">
			<!-- 提现菜单  start -->
			<view class="pr20 pl20 mt15 ">
				<view class="width-full menu-card ">
					<view class="width-full color-white fs10 flex flex-between text-right pt10">
						<view class="pl20">
							可提现佣金总额
						</view>
						<view class="pr18 color-FFE6F4" @click="showpop = true">
							规则
						</view>
					</view>
					<view class="width-full flex align-items-center mt20">
						<view class="flex-1 color-white fs10 pt5 pl20">
							￥<text class="color-white fs36 ml3 fw600 pt10">{{availableMoney}}</text><text
								class="ml8 color-FFE6F4" @click="clickShowDetail">明细</text>
						</view>
						<view class="mr18">
							<view class="tx-btn color-main6 text-center" @click="toRecovery(2)">
								提现
							</view>
						</view>
					</view>
					<view class="width-full color-FFE6F4 fs10 pl20 pt10">
						*满{{isStandardsMoney}}元可提现
					</view>
				</view>
			</view>
			<!-- 提现菜单  end -->
			<!-- 佣金列表  start -->
			<view class="pr20 pl20 pt30" v-if="showGiftPack">
				<view class="commission-list pb10 bg-itsme-4">
					<view class="flex align-items-center pt15">
						<view class="bar-type ml10"> </view>
						<view class="fs16 color-main6 ml6">
							获得更多佣金
						</view>
					</view>
					<view class="ml10 mr10 mt15 pt3 ">
						<view class=" mb15" v-if="user.gender === 0">
							<view
								class="width-full br10 float-hidden flex commission-show align-items-center pl15 pr15 pt8 pb8 mb10 bg-itsme-4"
								v-for="(item,index) in giftPack" :key="index" v-if="index < newRedEnvelopesIndex">
								<image :src="item.icon" class="gold-item-img" mode="widthFix"></image>
								<view class="flex-1 ml12">
									<view class="width-full flex align-items-center mb12">
										<view class="fs32 fw900 color-main6">
											{{item.money}}
										</view>
										<view class="fs14 color-main6 ml6 mt15">
											元
										</view>
									</view>
									<view class="fs12 color-bbbbbb nowrap1">
										{{item.name}}
									</view>
								</view>
								<view>
									<view class="gift-btn-1 text-center fs14" v-if="item.is === 1">
										已获得
									</view>
									<view class="gift-btn-2 text-center fs14" @click="clickGift(item.id)" v-else>
										去获得
									</view>
								</view>
							</view>
						</view>
						<view
							class="width-full bg-itsme-4 br10 float-hidden flex commission-show align-items-center pl15 pr15 pt8 pb8 mb10">
							<image src="/static/itsme/itsme_46.png" class="gold-item-img" mode="widthFix"></image>
							<view class="flex-1 ml12">
								<view class="fs13 color-itsme-10 nowrap1">
									邀请好友一起玩各得奖励
								</view>
							</view>
							<view>
								<view class="gift-btn-2 text-center fs14"
									@click="shareWx(0,'是我啊APP','http://share.shiwoaapp.com/#/','告诉你一个APP，我下了，真实又靠谱，秘密使用。我的邀请码：' + user.invite_code,user.avatar)">
									去获得
								</view>
							</view>
						</view>
					</view>
					<view v-if="giftPack && giftPack.length > 2 && user.gender === 0">
						<view class="width-full">
							<view class="pt15 fs12 width-full flex align-items-center color-bfbcbc text flex-center"
								@click="aNewRedEnvelopesListOf">
								{{!isNewRedEnvelopesListOf ? '查看更多':'收起'}} <text
									class="icon_font color-bfbcbc fs18 ml5 mt5">{{!isNewRedEnvelopesListOf ? '&#xe637;': '&#xe776;'}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 佣金列表  end -->
			<!-- 可用卡卷  start-->
			<view class="ml15 mr15 mt25 mb35 red-pack" v-if="cardPackList.length > 0">
				<view
					class="card-box-vip-no-hidden bg-itsme-4 width-full flex flex-wrap align-items-center flex-between pr5 pl5">
					<view class="small-box  color-white fs10 text-center mt12 relative left-5 bg-2">
						抵用金额
					</view>
					<view class="width-full flex align-items-center ml35 mt15 pb15 pr15"
						v-for="(item , index) in cardPackList" :key="index" v-if="index < cardPackListIndex">
						<view class="fs12 fw600 flex color-main6 align-items-end">
							<view class="text-box nowrap1">
								<text class="fs36 fw600 color-main6 mr5 ">{{item.money}}</text>元
							</view>
							<view class="text fs10 pl8 align-items-end color-itsme-10">
								（送男性使用后返现金）
							</view>
						</view>
						<view class="flex-1 flex flex-right text-center">
							<view class="tx-btn bg-2 fs12 color-white" @click="shareFend">
								送好友
							</view>
						</view>
					</view>
					<view class="width-full mr15 ml15 b-b-1 line-itsme-7"></view>
					<view class="width-full">
						<view class="pt15 pb15 fs12 width-full flex align-items-center color-itsme-10 text flex-center"
							@click="aListOf">
							{{!isListOf ? '查看更多':'收起'}} <text
								class="icon_font color-itsme-10 fs18 ml5 mt5">{{!isListOf ? '&#xe637;': '&#xe776;'}}</text>
						</view>
					</view>
				</view>
			</view>
			<!-- 可用卡卷   end -->
		</view>
		<view class="pr12 pl12 mt15" v-else>
			<view class="width-full width-full box-shadow-1 br10 pt20 pb20 pl18 pr18"
				:class="goldList && goldList.length === 0 ? '' : 'bg-itsme-4'">
				<view class="width-full flex align-items-start">
					<view class="fs15 color-white mt10 fw600">
						可提现礼物
					</view>
					<view class="flex-1">
						<view class="width-full flex flex-right">
							<view class="recovery-color-1 fs13 mb12">
								<!-- 全部提现 -->
							</view>
						</view>
						<view class="width-full flex flex-right">
							<view class="color-999999 fs13">
								共计 {{totalPrice}} M豆
							</view>
						</view>
					</view>
				</view>
				<view class="width-full mt20 flex flex-wrap">
					<view v-for="(item,index) in goldList" :key="index">
						<view
							class="gold-item-box mb25 mt3 flex flex-col p5 align-items-center bg-itsme-19 flex-center check"
							:class="((index + 1) % 3 === 0) ? '' : 'mr30' ">
							<view class="gold-item-img">
								<image :src="item.icon | imageFilter('m11')" class="gold-item-img" mode="scaleToFill">
								</image>
							</view>
							<view class="mt5 class-itsme-10 fs10 mt10">
								{{item.name}} x {{item.num}}
							</view>
						</view>
					</view>
					<view class="gift_box"> </view>
					<view class="fixed bottom left right pb_iphoneX_safe bg-itsme-1 box-shadow-1 pl20 pr20">
						<view class="ml35 mr35 pt15">
							<view class="recovery-btn fs18 color-white text-center btn-box" @click="toRecovery(1)"
								v-if="totalPriceRMB !== 0">
								可提现{{totalPriceRMB}}元
							</view>
							<view class="recovery-btn fs18 color-white text-center btn-box" v-else>
								回收
							</view>
							<view class="width-full text-center mt8 mb12 color-999999 lh18 fs13">
								预计1-3个工作日内到账
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
		</view>
		<u-toast ref="uToast" />
		<!-- 规则弹框  start-->
		<u-popup v-model="showpop" mode="center" width="80%" border-radius="14" :closeable="true">
			<view class="p20 lh15 color-black">
				<view>
					<text class="fw600 fs16"> 新手奖励：</text> <br />
					1.佣金满{{isStandardsMoney}}元可提现；<br />
					2.通过真人认证的用户，可获得1元佣金，只能获得1次；<br />
					3.查看5条动态，可获得1元佣金，只能获得1次；<br />
					4.首次发布动态成功，可获得1元佣金；<br />
					5.首次与一位异性聊天，可获得1元佣金，只能获得1次；<br />
				</view>
				<view class="mt5">
					<text class="fw600 fs16 ">邀请规则：</text><br />
					1.邀请女性好友注册后，并通过真人认证，可获得1元佣金，可获得多次；<br />
					2.邀请一位男性好友使用会员券后付费，可获会员券金额的佣金<br />
					3.无次数上限，无提现上限<br />
				</view>
				<view class="mt5">
					<text class="fw600 fs16 ">其他规则：</text><br />
					1.如果您的帐号被平台识别出存在风险，您将无法提现或继续参与活动；<br />
					2.如果您的好友存在风险，您将无法获得收益；<br />
				</view>
			</view>
		</u-popup>
		<!-- 规则弹框  end-->
		<!-- 权限弹窗 start-->
		<unify-pop :showUnify="showUnifyPop" :type="unifyType" :bankListType="bankListType"
			@closePop="showUnifyPop = false" @popConfirmReal="popConfirm" @goMemberPay="goMemberPay">
		</unify-pop>
		<!-- 权限弹窗 end-->
		<!-- 编辑资料 start-->
		<view class="width-full" v-if="showPerfectPop">
			<perfect-pop @refreshTheList="refreshTheList" @closePerfectPop="toHidePerfectPop">
			</perfect-pop>
		</view>
		<!-- 编辑资料 end-->
		<!-- 收支明细弹窗 start-->
		<view v-if="showDetail">
			<detail-pop :list="redPacketList" :showPop="showDetail"></detail-pop>
		</view>
		<!-- 收支明细弹窗 end-->
		<!-- 充值vip弹框 start-->
		<view v-if="showMemberPay">
			<member-pay :showMemberPay="showMemberPay" @closePop="showMemberPay = false" :centent="cententText"
				@paySuccess="showMemberPay = false">
			</member-pay>
		</view>
		<!-- 充值vip弹框 end-->
		<!-- 编辑资料组件 start -->
		<view class="width-full" v-if="showPerfectPop">
			<perfect-pop @closePerfectPop="toHidePerfectPop">
			</perfect-pop>
		</view>
		<!-- 编辑资料组件 end -->
		<view v-if="showRedPacket">
			<red-packet></red-packet>
		</view>
	</view>
</template>P

<script>
	import detailPop from '../../components/common/detail.vue'
	import CommonService from '../../common/service/common-service.js'
	import UserService from '../../common/service/user-service.js'
	export default {
		data() {
			return {
				list: [{
					name: '佣金'
				}, {
					name: '礼物'
				}],
				availableMoney: 0,
				showpop: false,
				showDetail: false,
				bankListType: 1,
				totalPrice: 0,
				newRedEnvelopesIndex: 1,
				isNewRedEnvelopesListOf: false,
				isListOf: false,
				cardPackListIndex: 1,
				cardPackList: [],
				redPacketList: [],
				showGiftPack: false,
				giftPack: [{
						is: 2,
						id: 1,
						money: 0,
						title: 'real',
						icon: '/static/itsme/itsme_49.png',
						name: '完成真人认证'
					},
					{
						is: 2,
						id: 2,
						money: 0,
						title: 'me',
						icon: '/static/itsme/itsme_50.png',
						name: '查看5条Me圈'
					},
					{
						is: 2,
						id: 3,
						money: 0,
						title: 'life',
						icon: '/static/itsme/itsme_48.png',
						name: '发布一条动态'
					},
					{
						is: 2,
						id: 4,
						money: 0,
						title: 'chat',
						icon: '/static/itsme/itsme_53.png',
						name: '与1位异性聊天'
					},
					{
						is: 2,
						id: 5,
						money: 0,
						title: 'chat',
						icon: '/static/itsme/itsme_52.png',
						name: '邀请好友真人认证'
					},
					{
						is: 2,
						id: 6,
						money: 0,
						title: 'chat',
						icon: '/static/itsme/itsme_52.png',
						name: '绑定微信'
					}
				],
				// 默认选择
				defaultRedpacket: {
					money: 0,
					nickname: '',
					avatar: '',
					id: ''
				},
				current: 0,
				goldList: null,
				withdrawType: 1,
				showMemberPay: false,
				cententText: "",
				isStandardsMoney: '',
			}
		},
		components: {
			detailPop,
		},
		computed: {
			isVip() {
				if (this.user && this.user.gender === 1 && this.user.is_vip === 1) {
					return true
				}
				return false
			},

			isReal() {
				if (this.user && this.user.gender === 0) {
					if (this.user.is_real === 1) {
						return true
					} else {
						return false
					}
				} else {
					return true
				}
			},
			totalPriceRMB() {
				return Math.floor((this.totalPrice * 0.1) * 100) / 100
			}
		},
		onLoad() {
			this.init()
		},
		methods: {
			init() {
				Object.assign(this.$data, this.$options.data())
				this.loginExpire().then(res => {})
				this.getGiftPack()
				this.changeTabs(0)
				this.getCardPackList()
				setTimeout(() => {
					this.getUserAllBenefits()
				}, 100)
			},
			clickShowDetail() {
				this.showDetail = !this.showDetail
				this.getCompleteNoviceTaskList(0)
			},
			shareFend() {
				this.shareWx(0, '是我啊APP', 'http://share.shiwoaapp.com', '告诉你一个APP，我下了，真实又靠谱，秘密使用。我的邀请码：' + this.user.invite_code,
					this.user.avatar)
			},
			getGiftTotalPrice() {
				UserService.giftGiftTotalPrice().then(res => {
					if (res.code === 1) {
						this.totalPrice = res.data
					}
				})
			},
			//新手任务展示
			getGiftPack() {
				UserService.novicegiftdata().then(res => {
					this.showGiftPack = true
					this.moneyNum = res.data.money
					console.log(res.data.list.length)
					for (let i = 0; i < res.data.list.length; i++) {
						this.giftPack[i].is = res.data.list[i].is
						this.giftPack[i].money = res.data.list[i].money
					}
					this.giftPack = this.giftPack.filter(item => {
						return item.is !== 1
					})
					console.log(this.giftPack)
				})
			},
			// 点击新手任务
			clickGift(id) {
				if (id === 1) {
					this.toShowPerfectPop()
				}
				if (id === 2) {
					this.toNavGo('../discover/discover')
				}
				if (id === 3) {
					if(this.user.is_real === 1){
						this.toNavGo('../edit/life')
					}else{
						this.toShowPerfectPop()
					}
				}
				if (id === 4) {
					this.toNavGo('../itsme/index')
				}
				if (id === 6 || id === 5) {
					this.toJumpPage(1, '/pages/my/share')
				}
			},
			//是否完成实名认证
			isRealName(type) {
				UserService.userrealget().then(res => {
					if (res.code === 0) {
						this.unifyType = 17
						this.showUnifyPop = true
						this.bankListType = type
						console.log(this.bankListType)
					} else {
						if (type === 2) {
							if (this.availableMoney >= this.isStandardsMoney) {
								uni.redirectTo({
									url: '/pages/my/banklist?isType=' + type
								})
							} else {
								uni.showToast({
									title: "需要满" + this.isStandardsMoney + "元才可以提现哦!",
									icon: "none"
								})
							}
						} else {
							uni.redirectTo({
								url: '/pages/my/banklist?isType=' + type
							})
						}
					}
				})
			},
			toRecovery(type) {
				if (this.user.gender === 1) {
					if (this.isVip) {
						this.isRealName(type)
					} else {
						this.showMemberPay = true
						this.cententText = "男性需是VIP才可提现哦"
					}
				} else {
					if (this.isReal) {
						this.isRealName(type)
					} else {
						this.toShowPerfectPop()
					}
				}
			},
			//获取礼物或者会员券列表
			getCompleteNoviceTaskList(index) {
				UserService.completeNoviceTaskList({
					type: index,
				}).then(res => {
					if (res.code === 1) {
						if (index === 1) {
							this.goldList = res.data.map(item => {
								item.value = item.num
								return item
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
			// tab 切换
			changeTabs(index) {
				this.current = index;
				if (index === 1) {
					this.getGiftTotalPrice()
					this.getCompleteNoviceTaskList(1)
				}
			},
			//获得会员券总额
			getUserAllBenefits() {
				CommonService.userAllBenefits().then(res => {
					if (res.code === 1) {
						console.log(res)
						this.availableMoney = res.data.money
						this.isStandardsMoney = res.data.config_money
					}
				})
			},
			//获取卡卷
			getCardPackList() {
				CommonService.userCardPackage({
					state: 3,
					page: 1,
					limit: 1000
				}).then(res => {
					if (res.code === 1) {
						this.cardPackList = res.data
					}
				})
			},
			// 展开更多
			aListOf() {
				if (this.isListOf) {
					this.isListOf = false
					this.cardPackListIndex = 1
				} else {
					this.isListOf = true
					this.cardPackListIndex = 999
				}
			},
			//购买 Vip 
			goMemberPay() {
				this.showUnifyPop = false
				this.showMemberPay = true
			},
			//展开更多
			aNewRedEnvelopesListOf() {
				if (this.isNewRedEnvelopesListOf) {
					this.isNewRedEnvelopesListOf = false
					this.newRedEnvelopesIndex = 1
				} else {
					this.isNewRedEnvelopesListOf = true
					this.newRedEnvelopesIndex = 999
				}
			},
			popConfirm(type) {
				console.log(type)
				if (this.unifyType === 17) {
					uni.navigateTo({
						url: '/pages/my/realname?Withdraw=' + type
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
			toNavGo(url) {
				if (url === '../discover/discover' || url === '../itsme/index') {
					uni.switchTab({
						url: url
					})
				} else {
					uni.navigateTo({
						url: url
					})
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.color-FFE6F4 {
		color: #FFE6F4;
		opacity: 0.7;
	}

	.text {
		font-family: PingFang SC;
		font-weight: 400;
		color: #D5D5D5;
	}

	.menu-card {
		height: 240rpx;
		background: #D97DB0;
		box-shadow: 0px -3rpx 57rpx 0px rgba(217, 125, 176, 0.23);
		border-radius: 10rpx;
	}

	.black-no-img {
		width: 280rpx;
	}

	.tx-btn {
		width: 124rpx;
		height: 47rpx;
		line-height: 45rpx;
		background: #FFFFFF;
		border-radius: 23rpx;
	}

	.recovery-btn {
		height: 80rpx;
		line-height: 80rpx;
		border-radius: 80rpx;
		background: #D97DB0;
	}

	.text-box {
		width: 130rpx;
	}

	.line {
		margin: 0 auto;
		width: 554rpx;
		height: 1rpx;
		border: 1rpx solid #FCE3F1;
		opacity: 0.45;
	}

	.small-box {
		width: 128rpx;
		height: 34rpx;
		line-height: 35rpx;
		border-radius: 4rpx;
	}

	.red-pack {
		background: #FFFFFF;
		box-shadow: 0px 0px 18rpx 0px rgba(140, 56, 103, 0.13);
		border-radius: 20rpx;
	}
	.gift_box{
		height: 130rpx;
		width: 600rpx;
	}

	.img-box {
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
	}


	.gift-btn-1 {
		width: 140rpx;
		height: 54rpx;
		color: #fff;
		background: #535354;
		line-height: 52rpx;
		border-radius: 54rpx;
	}

	.gift-btn-2 {
		width: 140rpx;
		height: 54rpx;
		color: #fff;
		background: #D97DB0;
		line-height: 52rpx;
		border-radius: 54rpx;
	}

	.commission-list {
		height: auto;
		background: #FFFFFF;
		box-shadow: 0px 0px 18rpx 0px rgba(140, 56, 103, 0.13);
		border-radius: 20rpx;
	}

	.img-box1 {
		width: 150rpx;
		height: 23rpx;
	}

	.commission-show {
		border: 1rpx solid #D87BAE;
		box-shadow: 0px 0px 18px 0px rgba(140, 56, 103, 0.13);
		border-radius: 20rpx;
	}

	.gift-icon {
		width: 90rpx;
		height: 90rpx;
	}

	.bar-type {
		width: 6rpx;
		height: 28rpx;
		background: #D87BAE;
	}

	.gold-item-box {
		width: calc((100vw - 252rpx) / 3);
		height: 220rpx;
	}

	.check {
		padding: 10rpx;
		border-radius: 10rpx;
		background: #FFFCF6;
		border: 1px solid #D97DB0;
	}

	.gold-item-img {
		width: 60rpx;
		height: 60rpx;
	}
</style>
