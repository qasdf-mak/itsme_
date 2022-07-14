<template>
	<view class="width-full lh1 bg-main minnavh100vh">
		<!-- M豆信息 -->
		<view class="width-full border-box pl15 pr15 pt20 pb20 flex align-items-start">
			<view class="recharge-top-left ml5 mr8">
				<image src="../../../static/my/my_13.png" class="width-full" mode="widthFix"></image>
			</view>
			<view class="flex-1">
				<view class="width-full fs16 color-deep fw600">
					当前M豆余额: {{(user && user.money) || 0}}
				</view>
				<view class="width-full fs12 color-shallow mt8">
					用于虚拟物品特殊性，M豆充值完成后，不支持退款
				</view>
			</view>
		</view>
		<!-- M豆种类 -->
		<view class="ml15 mr15 mb35 flex flex-wrap">
			<view v-for="(item,index) in goldlist" :key="index">
				<view class="gold-box mb12" :class="(index + 1) % 3 === 0 ? '' : 'mr15'">
					<view class="width-full height br5 border-box flex flex-col align-items-center flex-center"
						:class="goldIndex === index ? 'gold-item-2' : 'gold-item-1'" @click="changeGold(index)">
						<view class="fs15 color-deep fw600">
							{{item.num}}M豆豆
						</view>
						<view class="recharge-color-1 mt10 fs13">
							增加{{item.up_worth}}身价值
						</view>
						<view class="gold-btn mt12 text-center color-white">
							￥{{item.discount_price}}
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 支付方式 -->
		<view class="pay-box bg-white ml15 mr15 br5 pt20 pl25 pr20">
			<view class="width-full fs15 color-deep fw600 mb15">
				选择支付方式
			</view>
			<view class="width-full mt8">
				<view v-for="(item,index) in payList" :key="index">
					<view class="width-full flex align-items-center pb20" @click="changePay(index)">
						<image :src="item.icon" class="pay-img-1" mode="widthFix"></image>
						<view class="flex-1 fs15 color-deep fw600 ml18">
							{{item.name}}
						</view>
						<image
							:src="payIndex === index ? '../../../static/my/my_16.png' : '../../../static/my/my_17.png'"
							class="pay-img-2" mode="widthFix"></image>
					</view>
				</view>
			</view>
		</view>
		<view class="fixed bottom left right pb_iphoneX_safe">
			<view class="width-full flex align-items-center flex-center pb30">
				<view class="pay-bot-btn fs18 text-center color-white" :class="goldIndex === -1 ? 'opacity60' : ''"
					@click="toPay">
					确定支付
				</view>
			</view>
		</view>
		<view v-if="showRedPacket">
			<red-packet></red-packet>
		</view>
	</view>
</template>

<script>
	import {
		mapGetters
	} from 'vuex'
	import UserService from '../../../common/service/user-service.js'
	import {
		payMent,
		askPayStatus
	} from '../../../common/utils/pay.js'
	import updateUser from '../../../common/mixins/login.js'
	export default {
		mixins: [updateUser],
		data() {
			return {
				goldlist: null,
				goldIndex: -1,
				payIndex: 0,
				payList: [{
						name: '微信支付',
						icon: '../../../static/my/my_15.png'
					},
					{
						name: '支付宝支付',
						icon: '../../../static/my/my_14.png'
					}
				]
			}
		},
		computed: {
			...mapGetters(['user'])
		},
		onLoad() {
			this.init()
		},
		methods: {
			init() {
				Object.assign(this.$data, this.$options.data())
				this.getGoldList()
			},
			// M豆列表
			getGoldList() {
				UserService.goldlist().then(res => {
					if (res.code === 1) {
						this.goldlist = res.data
						console.log(this.goldlist)
					}
				})
			},
			// 选择M豆种类
			changeGold(index) {
				this.goldIndex = index
			},
			// 选择支付方式
			changePay(index) {
				this.payIndex = index
			},
			// 支付
			toPay() {
				if (this.goldIndex === -1) {
					return false
				}
				let mode = this.payIndex === 0 ? 'wxpay' : 'alipay'
				payMent(mode, 2, this.goldlist[this.goldIndex].id).then(res => {
					if (res.code === 1) {
						uni.showLoading({
							title: '支付中'
						})
						this.askPayStatus(res.data)
					} else {
						console.log('支付失败')
					}
				})
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
			}
		}
	}
</script>

<style lang="scss" scoped>
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

	.gold-btn {
		width: 130rpx;
		height: 50rpx;
		line-height: 50rpx;
		border-radius: 50rpx;
		background: linear-gradient(to bottom, #D98aae, #D97DB0);
	}

	.pay-box {
		box-shadow: 0 0 16rpx rgba(0, 0, 0, 0.08)
	}

	.pay-img-1 {
		width: 48rpx;
	}

	.pay-img-2 {
		width: 30rpx;
	}

	.pay-bot-btn {
		width: 600rpx;
		height: 80rpx;
		line-height: 80rpx;
		border-radius: 80rpx;
		background: linear-gradient(to bottom, #D98aae, #D97DB0);
	}

	.pay-bot-btn:active {
		opacity: 0.6;
	}
</style>
