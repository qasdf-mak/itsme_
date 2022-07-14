<template>
	<view class="width-full lh1 height100vh bg-main">
		<!-- top -->
		<view class="width-full relative">
			<image src="../../static/pack/pack_8.png" class="width-full" mode="widthFix"></image>
			<view class="absolute top left right">
				<view class="width-full" :style="'height: ' + StatusBar + 'px;'"></view>
				<view class="width-full pack-top-box">
					<view class="width-full pack-top-nav flex align-items-center">
						<view class="pack-top-navleft flex align-items-center">
							<view class="icon_font fs18 color-white pl15" @click="goBack">
								&#xe638;
							</view>
						</view>
						<view class="flex-1 text-center fs18 color-white fw600">
							新手礼包
						</view>
						<view class="pack-top-navleft flex align-items-center"></view>
					</view>
					<view class="width-full flex flex-center">
						<view class="pack-top-notice flex align-items-center">
							<view class="fs12 color-deep fw600 ml15">
								系统：
							</view>
							<view class="flex-1 pack-notice">
								<u-notice-bar mode="vertical" :list="noticeList" type="none" :volume-icon="false"
									volume-size="0" font-size="24" color="#000000"></u-notice-bar>
							</view>
						</view>
					</view>
					<view class="width-full mt30 text-center fs40 fw900">
						￥{{totalNum}}
					</view>
					<view class="width-full mt15 text-center fs16">
						满 {{moneyNum}} 元可直接提现
					</view>
				</view>
			</view>
			<view class="absolute left right pack-top-btn-box flex align-items-center flex-center">
				<view class="pack-top-btn relative" @click="goRedPacket(2)">
					<image src="../../static/pack/pack_7.png" class="width-full" mode="widthFix"></image>
					<view class="absolute top bottom right left flex align-items-center flex-center">
						<view class="fs18 color-deep fw600">
							提现
						</view>
					</view>
				</view>
			</view>
			<view class="absolute width-full mt20 text-center fs15" @click="show = true">
				规则
			</view>
		</view>
		<!-- top -->
		<view class="ml12 mr12 pt15 pb15">
			<view class="width-full flex align-items-center mt10">
				<view class="fs16 color-deep fw600 mt12 mb12">
				</view>
			</view>
			<view v-for="(item,index) in giftPack" :key="index">
				<view class="width-full bg-white br10 mb10 float-hidden flex align-items-center pl25 pr15 pt15 pb15">
					<image :src="item.icon" class="gift-icon" mode="widthFix"></image>
					<view class="flex-1 ml20">
						<view class="width-full flex align-items-center mb12">
							<view class="fs32 fw900 color-main6">
								{{item.money}}
							</view>
							<view class="fs14 color-main6 ml6 mt15">
								元
							</view>
						</view>
						<view class="fs13 color-bbbbbb">
							{{item.name}}
						</view>
					</view>
					<view>
						<view class="gift-btn-1 text-center fs14" v-if="item.is === 1">
							已获得
						</view>
						<view class="gift-btn-2 text-center fs14" @click="clickGift(index)" v-else>
							去获得
						</view>
					</view>
				</view>
			</view>
		</view>
		<view v-if="showRedPacket">
			<red-packet></red-packet>
		</view>
		<u-popup v-model="show" mode="center" width="80%" border-radius="14" :closeable="true">
			<view class="p20 lh15">
				<view>
					<text class="fw600 fs16"> 佣金奖励说明：</text> <br />
					1.佣金满30元可提现；<br />
					2.通过真人认证的用户，可获得8元会员券；<br />
					3.查看5条动态，可获得2元会员券；<br />
					4.与一位异性聊天可获得3元会员券，只能获得1次；<br />
					5.首次发布动态成功，可获得2元会员券；<br />
					6.邀请同性好友，注册后，并通过真人认证，可获得5元会员券，只能获得1次；<br />
					7.邀请一位异性好友付费，可获得10元会员券；<br />
					8.如果您的帐号被平台识别出存在风险，您将无法提现或继续参与活动；<br />
					9.如果您的好友存在风险，您将无法获得收益；<br />
					10.一位用户只能获得一次奖励。<br />
				</view>
				<view class="mt5">
					<text class="fw600 fs16 ">转化规则：</text><br />
					1.转化异性成为会员，可多次获得会员券奖励，可直接提现；<br />
					2.转化异性成为会员，无次数上限，无提现上限。<br />
				</view>
			</view>
		</u-popup>
		<view class="width-full" v-if="showPerfectPop">
			<perfect-pop @refreshTheList="refreshTheList" @closePerfectPop="toHidePerfectPop">
			</perfect-pop>
		</view>
	</view>
</template>

<script>
	import {
		mapGetters,
		mapActions
	} from 'vuex'
	import commonService from '../../common/service/common-service.js'
	import UserService from '../../common/service/user-service.js'
	export default {
		data() {
			return {
				showPacket: false,
				moneyNum: 0,
				totalNum: 0,
				show: false,
				isRulePop: false,
				noticeList: [
					'寒雨连江夜入吴寒雨连江夜入吴',
					'平明送客楚山孤平明送客楚山孤',
					'洛阳亲友如相问洛阳亲友如相问',
					'一片冰心在玉壶一片冰心在玉壶'
				],
				giftPack: [{
						is: 2,
						money: 0,
						title: 'real',
						icon: '/static/pack/pack_1.png',
						name: '完成真人认证'
					},
					{
						is: 2,
						money: 0,
						title: 'me',
						icon: '/static/pack/pack_2.png',
						name: '查看5条Me圈'
					},
					{
						is: 2,
						money: 0,
						title: 'life',
						icon: '/static/pack/pack_3.png',
						name: '发布一条动态'
					},
					{
						is: 2,
						money: 0,
						title: 'chat',
						icon: '/static/pack/pack_4.png',
						name: '与1位异性聊天'
					},
					{
						is: 2,
						money: 0,
						title: 'chat',
						icon: '/static/pack/pack_5.png',
						name: '邀请好友真人认证'
					},
					{
						is: 2,
						money: 0,
						title: 'chat',
						icon: '/static/pack/pack_6.png',
						name: '邀请好友付费'
					}
				]
			}
		},

		onShow() {
			if (this.isShare) {
				console.log('完成任务前 --- 未成功')
				commonService.buryingPoint({
					text: '完成发布第一条动态',
					val1: '新手任务'
				})
				console.log('完成任务后 --- 成功')
				this.isRedPacket = true
				this.IS_SHARE(false)
			}
		},
		computed: {
			...mapGetters(['isShare']),
			isReal() {
				if (this.user && this.user.gender === 0 && this.user.certify && JSON.parse(this.user.certify).real && JSON
					.parse(this.user.certify).real.verified) {
					return true
				}
			}
		},
		onLoad() {
			this.init()
		},
		methods: {
			...mapActions(['IS_SHARE']),
			init() {
				Object.assign(this.$data, this.$options.data())
				this.loginExpire().then(res => {
					this.getGiftPack()
				})
			},
			getGiftPack() {
				UserService.novicegiftdata().then(res => {
					this.totalNum = res.data.total
					this.moneyNum = res.data.money
					for (let i = 0; i < res.data.list.length; i++) {
						this.giftPack[i].is = res.data.list[i].is
						this.giftPack[i].money = res.data.list[i].money
					}
				})
			},
			clickGift(index) {
				if (index === 0) {
					this.toShowPerfectPop()
				}
				if (index === 1) {
					this.toNavGo('../discover/discover')
				}
				if (index === 2) {
					this.toNavGo('../edit/life')
				}
				if (index === 3) {
					this.toNavGo('../itsme/index')
				}
				if (index === 4 || index === 5) {
					uni.showToast({
						title: "功能暂未开放,请耐心等待",
						icon: "none"
					})
				}
			},
			//弹出规则
			rulePopup() {
				console.log('123121')
				this.isRulePop = true
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
			// 去会员券页面
			goRedPacket(index) {
				if (this.isReal) {
					uni.navigateTo({
						url: './recovery?index=' + index
					})
				} else {
					uni.showToast({
						title: "请先通过真人认证",
						icon: "none"
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.gift-icon {
		width: 90rpx;
	}

	.gift-btn-1 {
		width: 140rpx;
		height: 54rpx;
		color: #FFACDA;
		line-height: 52rpx;
		border-radius: 54rpx;
		border: 1rpx solid #EEEEEE;
	}

	.gift-btn-2 {
		width: 140rpx;
		height: 54rpx;
		color: #D97DB0;
		line-height: 52rpx;
		border-radius: 54rpx;
		border: 1rpx solid #DDDDDD;
	}

	.pack-top-box {
		height: 600rpx;
	}

	.pack-top-nav {
		height: 88rpx;
	}

	.pack-top-navleft {
		width: 150rpx;
		height: 88rpx;
	}

	.pack-top-notice {
		width: 528rpx;
		height: 40rpx;
		border-radius: 20rpx;
		overflow: hidden;
		background: rgba($color: #ffffff, $alpha: 0.3);
	}

	.pack-top-btn {
		width: 411rpx;
		height: 101rpx;
	}

	.pack-top-btn-box {
		bottom: -30rpx;
	}
</style>
