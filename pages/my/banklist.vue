<template>
	<view class="width-full minnavh100vh lh1 bg-itsme-1">
		<view class="pt8 pl15 pr15">
			<view class="width-full">
				<!-- 微信 (未绑定) -->
				<view
					class="width-full bank-box br10 bg-itsme-4 border-box pl20 pr20 pt20 pb20 mb10 flex align-items-center">
					<view class="icon_font color-wx fs45 fw300">
						&#xe61b;
					</view>
					<view class="flex-1 flex align-items-center fs15 color-deep fw600 ml15 mt20 mb20">
						<view class="icon_font color-white fs15">
							微信
						</view>
						<view class="flex-1 flex text-right flex-right align-items-center fs12 color-itsme-10 fw600"
							@click="toAdd(2)">
							<view>
								请绑定微信账号
							</view>
							<view class="fs12 ml8 mt2 icon_font color-itsme-10">
								&#xe60f;
							</view>
						</view>
					</view>
				</view>
				<view class="mt20"></view>
				<!-- 微信 (已绑定) -->
				<view
					class="width-full bank-box br10 bg-itsme-4 border-box pl20 pr20 pt20 pb20 mb10 flex align-items-center"
					v-if="false">
					<view class="icon_font color-wx fs45 fw300">
						&#xe61b;
					</view>
					<view class="flex-1 flex align-items-center fs15 color-deep fw600 ml15 mt20 mb20">
						<view class="icon_font color-white fs15">
							微信
						</view>
						<view class="ml10 flex-1 flex align-items-center fs12 color-itsme-10 fw600 ">
							<view>
								(昵称 炸酱面)
							</view>
						</view>
					</view>
				</view>

				<!-- 支付宝 (已绑定)-->
				<view
					class="width-full bank-box br10 bg-itsme-4 border-box pl20 pr20 pt20 pb20 mt20 mb10 flex align-items-center"
					:class="newIndex === 2 ? 'box-border-show': ''" @click="changeWay(2)" v-if="isBankList">
					<view class="icon_font color-zfb fs45 fw300">
						&#xe61a;
					</view>
					<view class="flex-1 flex align-items-center fs15 color-itsme-10 fw600 ml15 mt20 mb20">
						<view class="icon_font color-white fs15">
							支付宝
						</view>
						<view class="flex-1 flex align-items-center fs12 color-itsme-10 fw600 ">
							<view class="ml10 hidd-text">
								( 账号 {{banklist[0].alipay_account}} )
							</view>
							<view class="img-box-mode ml8" @click="modifyTheAccount(1)">
								<image src="/static/base/modification%20.png" class="img-box-mode" mode="widthFix">
								</image>
							</view>
						</view>
					</view>
				</view>
				<!-- 支付宝 (未绑定)-->
				<view
					class="width-full bank-box br10 bg-itsme-4 border-box pl20 pr20 pt20 mt20 pb20 mb10 flex align-items-center"
					v-else>
					<view class="icon_font color-zfb fs45 fw300">
						&#xe61a;
					</view>
					<view class="flex-1 flex align-items-center fs15 color-deep fw600 ml15 mt20 mb20">
						<view class="icon_font color-white fs15">
							支付宝
						</view>
						<view class="flex-1 flex flex-right align-items-center fs12 color-itsme-10 fw600 ">
							<view class="ml10">
								<input class="fs14 color-itsme-10" v-model="accountNumber" type="string"
									onkeypress="javascript:if(event.keyCode == 32)event.returnValue = false;"
									placeholder="输入支付宝账号" value="" />
							</view>
							<view class="fs10 ml8 zfb-btn text-center" @click="toAdd(1)">
								确定
							</view>
							<view class="fs10 ml8 zfb-btn text-center" v-if="cancelTheChange"
								@click="modifyTheAccount(2)">
								取消
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="absolute bottom25 width-full pl35 pr35">
			<view class="pl35 pr35">
				<view class="bg-2 pt15 fs16 pb15 box-radius text-center" :class="newIndex === 0 ? 'opacity3' : ''"
					@click="toRecovery">
					确认提现
				</view>
			</view>
		</view>

		<u-toast ref="uToast" />
		<!-- 权限弹窗 -->
		<unify-pop :showUnify="showUnifyPop" :type="unifyType" @closePop="showUnifyPop = false"
			@popConfirmFace="">
		</unify-pop>
		<!-- 权限弹窗 -->
		<!-- 提示框 -->
		<view v-if="showUnifyCent">
			<u-popup v-model="showUnifyCent" mode="center" safe-area-inset-bottom border-radius="20" z-index="99999999999"
				negative-top="100">
				<view class="unify-pop-box">
					<view class="ml10 mr10 pt35 pb25 b-b-1 unify-cent fs15 color-deep text-center">{{unifyCentText}}</view>
					<view class="width-full flex unify-btn-box">
						<view class="flex-1 height fs15 color-main6 text-center fw600" @click="showUnifyCent = false">
							确定
						</view>
					</view>
				</view>
			</u-popup>
		</view>
		<!-- 提示框 -->
		<!-- 推送 -->
		<view v-if="showRedPacket">
			<red-packet></red-packet>
		</view>
		<!-- 推送 -->
	</view>
</template>

<script>
	import {
		mapActions
	} from 'vuex'
	import UserService from '../../common/service/user-service.js'
	import CommonService from '../../common/service/common-service.js'
	export default {
		data() {
			return {
				name: '',
				cardId: '',
				bankIndex: 0,
				isBankList: false,
				banklist: null,
				bankData: null,
				accountNumber: '',
				cancelTheChange: false,
				newIndex: 0,
				withdrawType: 0,
				withdrawIndex: 1,
				unifyCentText: '',
				showUnifyCent:false,
			}
		},
		onLoad(options) {
			this.init(options)
		},
		methods: {
			...mapActions(['IFTHE_REFRESH']),
			init(options) {
				Object.assign(this.$data, this.$options.data())
				if(options.isType){
					this.withdrawType = options.isType
				}else{
					this.withdrawType = options.Withdraw
				}
				console.log(this.withdrawType)
				this.getBankList()
				this.getUserInfo()
			},
			// 获取身份证信息
			getUserInfo() {
				UserService.userrealget().then(res => {
					if (res.code === 1) {
						this.name = res.data.name,
							this.cardId = res.data.identity_card
					}
				})
			},
			//获取账号列表
			getBankList() {
				CommonService.bankUserAlipayList().then(res => {
					if (res.code === 1) {
						if (res.data !== null) {
							this.banklist = res.data
							if (this.banklist.length >= 1) { //判断是否有数据
								this.isBankList = true
							} else {
								this.isBankList = false
							}
						}
						console.log(this.banklist)
					}
				})
			},
			// 提现
			toRecovery() {
				console.log(this.withdrawType)
				if (this.newIndex === 0) {
					this.$refs.uToast.show({
						title: '请选择提现账号'
					})
				} else {
					uni.showLoading({
						title: '加载中',
						mask: true
					});
					CommonService.withdrawalWithdrawalRequest({
						type: this.withdrawType
					}).then(res => {
						if (res.code === 1) {
							setTimeout(function() {
								uni.hideLoading();
							}, 100);
							this.showUnifyCent = true
							this.unifyCentText = res.msg
							let that = this
							setTimeout(function() {
								that.toJumpPage(2, '/pages/my/commission')
							}, 1500);
						} else {
							setTimeout(function() {
								uni.hideLoading();
							}, 100);
							this.showUnifyCent = true
							this.unifyCentText = res.msg
						}
					})
				}
			},
			//选择
			changeWay(index) {
				if (index === 1) {
					this.$refs.uToast.show({
						title: '暂未开放此功能'
					})
				} else {
					this.newIndex = index
				}
			},
			// 添加账户
			toAdd(type) {
				if (type === 1) {
					if (this.name && this.cardId && this.accountNumber) {
						CommonService.bankUserAlipayAdd({
							alipay_account: this.accountNumber,
							type: type
						}).then(res => {
							let that = this
							console.log(res)
							if (res.code === 1) {
								this.$refs.uToast.show({
									title: '添加成功'
								})
								this.banklist = [],
									this.getBankList()
								let that = this
								let pitchOn = type === 1 ? 2 : 1
								setTimeout(function() {
									that.changeWay(pitchOn)
								}, 1500);
							} else {
								this.$refs.uToast.show({
									title: res.msg
								})
							}
						})
					}
				} else {
					this.$refs.uToast.show({
						title: '暂未开放此功能'
					})
				}
			},
			// changeBank(index) {
			// 	this.bankData = this.banklist[index]
			// 	console.log(this.bankData)
			// },
			modifyTheAccount(type) { //type = 1 =修改    type = 2 = 取消修改
				if (type === 1) {
					this.isBankList = false
					this.cancelTheChange = true
				} else {
					this.isBankList = true
					this.cancelTheChange = false
				}

			},

			//选择默认账号
			toChangeBank(id) {
				console.log(id)
				CommonService.bankUserAlipayEditState({
					id: id
				}).then(res => {
					console.log(res)
					// if (res.code === 1) {
					// 	uni.navigateBack({
					// 		delta: 1
					// 	})
					// }
				})
				this.IFTHE_REFRESH(true)
			},
			popConfirm() {
				if (this.unifyType === 17) {
					uni.navigateTo({
						url: '/pages/my/realname'
					})
					this.showUnifyPop = false
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.bank-box {
		box-shadow: 0 0 16rpx rgba(0, 0, 0, 0.08);
	}

	.box-border-show {
		background: #FCF5F9;
		border: 2rpx solid #D97DB0;
		box-shadow: 0px 0px 16rpx 0px rgba(0, 0, 0, 0.08);
		border-radius: 20rpx;
	}

	.add-bank-btn {
		height: 80rpx;
		line-height: 80rpx;
		border-radius: 80rpx;
	}

	.zfb-btn {
		width: 90rpx;
		height: 40rpx;
		line-height: 38rpx;
		color: #FFFFFF;
		background: #39394F;
		border-radius: 10rpx;
	}

	.bank_icon {
		width: 110rpx;
		height: 110rpx;
	}

	.color-wx {
		color: #09BB07;
	}

	.box-radius {
		border-radius: 50rpx;
		color: #fff;
	}

	.color-zfb {
		color: #1AACEB;
	}

	.color-333333 {
		color: #333333 !important;
	}

	#FFC5C2C2 .color-fafafb {
		color: #AFABAB !important;
	}

	.color-C5C2C2 {
		color: #C5C2C2 !important;
	}

	.bank_check {
		width: 30rpx;
	}

	.img-box-mode {
		width: 20rpx;
		height: 20rpx;
	}

	.unify-pop-box {
		width: 600rpx;
	}

	.unify-cent {
		min-height: 100rpx;
		line-height: 50rpx;
	}

	.unify-btn-box {
		height: 98rpx;
		line-height: 97rpx;
	}
	.hidd-text {
		/*字间距*/
		display: block;
		/*内联对象需加*/
		/*指定宽度*/
		word-break: keep-all;
		/* 不换行 */
		white-space: nowrap;
		/* 强制在同一行内显示所有文本,直到文本结束或者遭遇 br 对象。不换行 */
		overflow: hidden;
		/* 内容超出宽度时隐藏超出部分的内容 */
		text-overflow: ellipsis;
		/* IE 专有属性,当对象内文本溢出时显示省略标记(...) ;需与overflow:hidden;一起使用。*/
	}
</style>
