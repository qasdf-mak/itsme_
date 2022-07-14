<template>
	<view class="width-full height100vh lh1 bg-itsme-1">
		<view class="width-full" :style="'height:' + StatusBar + 'px;'"></view>
		<view class="width-full pb35">
			<view class="width-full pb15"></view>
			<view class="">
				<view class="fixed top left right bg-itsme-1">
					<view class="width-full" :style="'height:' + StatusBar + 'px;'"></view>
					<view class="flex top-box flex align-items-center">
						<view class="flex pl8 pr8 pt3 pb3  color-white br12 ml15" @click="goBack">
							<view class="icon_font fs18">
								&#xe638;
							</view>
						</view>
						<view class="flex-1 text-center fs18 color-itsme-2 fw600">我的身价</view>
						<view class="flex pl18 pr18 pt3 pb3  color-white br12 mr20">
						</view>
					</view>
				</view>
			</view>
			<view class="fillBox">
				
			</view>
			<view class="width-full mt25 flex align-items-center flex-center">
				<view class="icon_font color-white fs20 mt12 mr10">
					<image src="/static/itsme/its_1.png" class="img-box-2" mode="widthFix"></image>
				</view>
				<view class="fs32 color-white fw600">
					{{user.worth}}
				</view>
			</view>
			<view class="bg-itsme-13 br10 box-shadow-1 ml35 mr35 worth-top-bot mt35 pt10 pb25">
				<view class="pt15 pl18 pr20 fs12 color-white lh18">
					<view class="flex align-items-center">
						<view class="dian-box mr8"> </view>
						<view class="">
							身价是您在It’s me是我App中的身份标识之一
						</view>
					</view>
					<view class="flex align-items-center">
						<view class="dian-box mb18 mr8"> </view>
						<view class="">
							提升交友圈，获得更高端的社交资源，向更多的异性展示自己
						</view>
					</view>
					<view class="flex align-items-center">
						<view class="dian-box mr8"> </view>
						<view class="flex">
							更多的曝光，提高匹配度哦
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="pb15" v-for="(item , indexBox) in worthlist" :key="indexBox">
			<view class="mt25 flex align-items-center">
				<view class="flex ml20 mt1 mr5">
					<image src="../../static/itsme/itsme_56.png" v-if="item.title === '增值提升'" class="img-box-3">
					</image>
					<image src="../../static/itsme/itsme_55.png"
						v-if="item.title === '新手提升' || item.title=== '日常提升身价' || item.title=== '推广提升'" class="img-min">
					</image>
				</view>
				<view class="texttitle fs16 fw600 flex-1 color-white">
					{{item.title}}
				</view>
			</view>
			<view class="ml20 mr20 bg-itsme-4 br10 box-shadow-1 mt12 pt10 pb10">
				<view class="width-full">
					<view class="width-full">
						<view v-for="(item , index) in item.data" :key='index'>
							<view
								class="ml18 mr18 border-box line-color-2 worth-item-box flex align-items-center flex-between mt10 mb10">
								<view>
									<view class="fs16 color-white mb10">
										{{item.title}}
									</view>
									<view class="worth-color-1 fs14">
										{{item.worth}}
									</view>
									<!-- 									<view class="color-bbbbbb fs14" v-if="item.is_write === 1">
										{{item.addworth}}
									</view> -->
								</view>
								<view>
									<view class="text-center color-white" :class="item.is === 2 ? 'btn' : 'btn1'"
										@click="goClick(indexBox,index,item.is)">
										{{item.is === 2 ? '去完成' : '已完成'}}
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 完善资料 -->
		<view class="width-full" v-if="showPerfectPop">
			<perfect-pop @refreshTheList="refreshTheList" @closePerfectPop="toHidePerfectPop">
			</perfect-pop>
		</view>
		<!-- 完善资料 -->
		<!-- 充值vip弹框 -->
		<member-pay :showMemberPay="showMemberPay" @closePop="showMemberPay = false"
			@paySuccess="showMemberPay = false">
		</member-pay>
		<!-- 充值vip弹框 -->
		<view v-if="showRedPacket">
			<red-packet></red-packet>
		</view>
	</view>
</template>

<script>
	import UserService from '../../common/service/user-service.js'
	import setLable from '../../components/common/setlable.vue'
	export default {
		data() {
			return {
				worthnum: 0,
				// worthlist: [],
				isLogin: false,
				isSticky: false,
				showLablePop: false,
				showMemberPay: false,
				memberCentent: '',
				worthlist: [],
				getpath: ['./member/recharge', '../itsme/index', '../itsme/index', '../discover/discover',
					'../discover/discover',
					'../discover/discover', '../discover/discover', '../itsme/index', '../discover/discover',
					'../discover/discover',
					'../edit/life', './face', './realname'
				]
			}
		},
		computed: {
			worthListBox() {
				return 'height:' + (this.windowHeight - uni.upx2px(600)) + 'px'
			},
			isReal() {
				if (this.user && this.user.is_real === 1) {
					return true
				} else {
					return false
				}
			}
		},
		components: {
			setLable
		},
		onPullDownRefresh() {
			this.init()
		},
		onPageScroll(e) {
			this.setSticky(e.scrollTop)
		},
		onLoad() {
			this.init()
		},
		methods: {
			init() {
				Object.assign(this.$data, this.$options.data())
				this.loginExpire().then(res => {
					this.isLogin = res
					this.getWorthList()
				})
			},
			// 页面滚动，监听头部事件
			setSticky(scrollTop) {
				if (scrollTop < (this.windowWidth - this.StatusBar - uni.upx2px(350))) {
					this.isSticky = false
				} else {
					this.isSticky = true
				}
			},
			goBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			getWorthList() {
				uni.showLoading({
					title: '加载中'
				})
				UserService.itsmeWorthList().then(res => {
					uni.hideLoading()
					uni.stopPullDownRefresh()
					if (res.code === 1) {
						this.worthlist = res.data
						console.log(this.worthlist)
					}
				})
			},
			goClick(indexBox, index, isFinish) {
				//新手提升
				if (indexBox === 0) {
					if (index === 0 && isFinish === 2) {
						this.toShowPerfectPop()
					}
					if (index === 1 && isFinish === 2) {
						this.toShowPerfectPop()
					}
					if (index === 2 && isFinish === 2) {
						this.toJumpPage(4, '../itsme/index')
					}
					if (index === 3 && isFinish === 2) {
						this.toJumpPage(4, '../discover/discover')
					}
				}
				// 增值提升
				if (indexBox === 1) {
					if (index === 0 && isFinish === 2) {
						if (this.user.gender === 1) {
							if (this.user.is_vip === 1) {
								this.toJumpPage(1, '../my/wallet')
							} else {
								uni.showToast({
									title: '请先升级会员',
									icon: 'none'
								})
								setTimeout(() => {
									this.showMemberPay = true
								}, 1500)
							}
						} else {
							if (this.isReal) {
								this.toJumpPage(1, '../my/wallet')
							} else {
								uni.showToast({
									title: '请先完成真人认证',
									icon: 'none'
								})
								setTimeout(() => {
									this.toShowPerfectPop()
								}, 1500)
							}
						}
					}
					if (index === 1 && isFinish === 2) {
						if (this.user.gender === 1) {
							this.showMemberPay = true
						} else {
							uni.showToast({
								title: '女性暂不支持开通VIP',
								icon: 'none'
							})
						}
					}
				}
				//日常提升
				if (indexBox === 2) {
					if (index === 0 && isFinish === 2) {
						this.toJumpPage(4, '../itsme/index')
					}
					if (index === 1 && isFinish === 2) {
						this.toJumpPage(4, '../discover/discover')
					}
					if (index === 2 && isFinish === 2) {
						if (this.isReal) {
							this.toJumpPage(1, '../edit/life')
						} else {
							uni.showToast({
								title: '请先完成真人认证',
								icon: 'none'
							})
						}

					}
				}
				//推广提升
				if (indexBox === 3) {
					if (this.user.gender === 1) {
						if (index === 0 && isFinish === 2) {
							this.toJumpPage(1, './share')
						}
						if (index === 1 && isFinish === 2) {
							this.toJumpPage(1, './share')
						}
					} else {
						if (index === 0 && isFinish === 2) {
							this.toJumpPage(1, './share')
						}
						if (index === 1 && isFinish === 2) {
							this.toJumpPage(1, './share')
						}
					}



				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.worth-top-nav {
		height: 88rpx;

		.nav-left {
			width: 30rpx;
		}
	}

	.dian-box {
		width: 8rpx;
		height: 8rpx;
		background: #FFFFFF;
		border-radius: 50%;
	}

	.worth-top-bot {
		width: 606rpx;
		background: #37375A;
		box-shadow: 0px 0px 18rpx 0px rgba(0, 0, 0, 0.04);
		border-radius: 20rpx;
	}

	.worth-item-box {
		height: 115rpx;
	}

	.worth-color-1 {
		color: #D97DB0;
	}

	.btn {
		width: 140rpx;
		height: 54rpx;
		line-height: 52rpx;
		background: #D97DB0;
		border-radius: 27px;
	}

	.img-box-2 {
		width: 47rpx;
		height: 47rpx;
	}

	.btn1 {
		width: 140rpx;
		height: 54rpx;
		line-height: 50rpx;
		background: #535354;
		border-radius: 27rpx;
	}

	.texttitle {
		font-size: 30rpx;
		font-family: Microsoft YaHei UI;
		font-weight: 400;
		color: #111111;
	}

	.img-min {
		width: 40rpx;
		height: 44rpx;
	}

	.color-purple {
		color: #D97DB0;
	}

	.img-box-3 {
		width: 40rpx;
		height: 40rpx;
	}

	.bg-purple {
		background-color: #D97DB0;
	}

	.top-box {
		height: 100rpx;

		&-left {
			width: 200rpx;
		}
	}
	.fillBox{
		height: 120rpx;
	}
</style>
