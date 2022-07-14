<template>
	<view class="width-full lh1 height100vh bg-itsme-1">
		<!-- header -->
		<top-nav :title="recordType === 'like' ? '喜欢' : '足迹'" :navList="navList" :likeMe="totalNumber"
			:Quantity='this.Quantity' :navIndex="navIndex" showNav showBack @changeNav="changeNav"></top-nav>
		<!-- header -->
		<!-- 主体列表 -->
		<view class="width-full">
			<view class="width-full color-itsme-10 fs10 text-center pt10 pb10">
				为保护用户隐私，已隐藏身份的用户不会展示
			</view>
			<view class="width-full">
				<view class="width-full" v-if="userList && userList.length > 0">
					<view v-for="(item,index) in userList" :key="index">
						<itsme-item :item="item" :index="index" :isLogin="isLogin" :isVisibleBool="isVisibleBool"
							@openBounced="openBounced" @changeLike="changeLike(index)" @memberPop="subsequentOperation"
							:class="index !== 0 ? isVisible : '' ">
						</itsme-item>
					</view>

					<view class="width-full pt15 pb15" v-if="userList && userList.length > 0 && pages.finish">
						<u-divider bg-color="">{{recordType === 'like' ? '没有更多了' : '显示最近浏览过的50名用户'}}</u-divider>
					</view>
				</view>
			</view>
			<view class="width-full pt35 pt35"></view>
		</view>
		<!-- 主体列表 -->
		<!-- 遮罩层 -->
		<!-- <view v-if="navIndex===1 && isVisibleBool === true && user.is_vip !== 1 && user.certify === null"> -->
		<view v-if="isVisibleBool">
			<view class="box" v-if="recordType === 'like'">
				<view class="btn2" @click="user.gender === 1 ? toNavigateTo(vip) : toNavigateTo(realCertification)">
					一键解锁默默喜欢你的 Ta</view>
			</view>
			<view class="box" v-else>
				<view class="btn2" @click="user.gender === 1 ? toNavigateTo(vip) : toNavigateTo(realCertification)">
					一键解锁默默关注你的 Ta</view>
			</view>
		</view>
		<!-- 遮罩层 -->
		<!-- 完善资料 -->
		<view class="width-full" v-if="showPerfectPop">
			<perfect-pop @refreshTheList="refreshTheList" @closePerfectPop="toHidePerfectPop">
			</perfect-pop>
		</view>
		<!-- 充值vip弹框 start-->
		<member-pay :showMemberPay="showMemberPay" :powerData="powerData" :centent="memberCentent"
			@closeVipPop="refreshData" @closePop="showMember(powerData)" @paySuccess="showMemberPay = false">
		</member-pay>
		<!-- 充值vip弹框 end-->
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
	import itsmeItem from '../../components/itsme/like.vue'
	import UserService from '../../common/service/user-service.js'
	import topNav from '../../components/itsme/topnav.vue'
	export default {
		data() {
			return {
				// nav切换
				isLogin: true, // 登录状态
				recordType: '',
				navIndex: 0,
				navList: [],
				isVisible: '',
				userList: [],
				memberCentent: '',
				cententText: '',
				usercheck: 0,
				Quantity: '',
				isVisibleBool: false,
				vip: 'member/index',
				showMemberPay: false,
				realCertification: 'prove/index',
				isFinish: false,
				powerData: null,
				totalNumber: 0,
				pages: {
					page: 1,
					size: 8,
					finish: false
				},
				showMemberPop: false
			}
		},
		components: {
			itsmeItem,
			topNav
		},
		watch: {
			powerData() {
				if (this.powerData.look >= this.powerData.total) {
					return this.memberCentent = ' 您今天的次数已经用完了 非会员每日只能查看' + this.powerData.total + '位用户  '

				} else {
					let number = this.powerData.total - this.powerData.look
					return this.memberCentent = '您今天还能查看' + number + '位用户  非会员每日只能查看' + this.powerData.total + '位用户  '
				}
			}
		},
		computed: {
			...mapGetters(['user']),
			isreal() {
				 if(this.user.is_real === 1){
					 return true
				 }else{
					 return false 
				 }
			}
		},
		// onPullDownRefresh() {
		// 	this.userList = []
		// 	this.pages.page = 1
		// 	this.pages.finish = true
		// 	this.getUserList()
		// },
		// onReachBottom() {
		// 	if (!this.pages.finish) {
		// 		this.pages.page++
		// 		this.getUserList()
		// 	}
		// },
		// onInit(options){
		// 	this.init(options)
		// },
		onShow() {
			if (this.userList && this.userList.length > 0) {
				this.userList = []
				this.pages.page = 1
				this.pages.finish = false
				this.getUserList()
			}

		},
		onLoad(options) {
			this.init(options)
		},
		methods: {
			init(options) {
				Object.assign(this.$data, this.$options.data())
				this.recordType = options.type
				if (this.recordType === 'like') {
					this.navList = ['喜欢我的', '我喜欢的']
				} else {
					this.navList = ['看过我的', '我看过的']
				}
				this.loginExpire().then(res => {
					this.isLogin = res
					this.getUserList()
					if (this.user && this.user.gender === 1) {
						console.log('男的')
						if (this.user.is_vip === 1) {
							console.log('可见')
							this.isVisible = ''
							this.isVisibleBool = false
						} else {
							console.log('不可见')
							this.isVisible = 'user-mask'
							this.isVisibleBool = true
						}
					} else {
						console.log('女的')
						if (this.isreal) {
							console.log('可见')
							this.isVisible = ''
							this.isVisibleBool = false
						} else {
							console.log('不可见')
							this.isVisible = 'user-mask'
							this.isVisibleBool = true
						}
					}
				})

			},
			// 点击暂不开通
			showMember(powerData) {
				this.showMemberPay = false
				if (powerData.look >= powerData.total) {
					uni.showToast({
						title: '今日免费次数已用完',
						icon: 'none'
					})
				} else {
					uni.navigateTo({
						url: '/pages/itsme/home?id=' + this.powerData.id
					})
				}
			},
			refreshData() {
				this.showMemberPay = false
				this.changeNav(0)
			},
			changeNav(index) {
				// 0 喜欢我的&看过我的   1 我喜欢的&我看过的
				if (index === 0) { //判断index
					if (this.user.gender === 0) { // 判断性别
						this.isVisible = 'user-mask'
						this.isVisibleBool = true
						if (this.user && this.user.is_real) { // 性别为女判断是否真人认证
							if (this.user.is_real == 1) {
								this.isVisible = ''
								this.isVisibleBool = false
							} else {
								this.isVisible = 'user-mask'
								this.isVisibleBool = true
							}
						} else {
							this.isVisible = 'user-mask'
							this.isVisibleBool = true
						}
					} else { //性别为男 判断是否 vip 
						if (this.user.is_vip === 1) {
							this.isVisible = ''
							this.isVisibleBool = false
						} else {
							this.isVisible = 'user-mask'
							this.isVisibleBool = true
						}
					}
				} else {
					this.isVisible = ''
					this.isVisibleBool = false
				}
				this.navIndex = index
				this.userList = []
				this.pages.page = 1
				this.pages.finish = false
				this.getUserList()
			},
			openBounced(data) {
				if (this.user.gender === 0) {
					uni.navigateTo({
						url: '/pages/itsme/home?id=' + data.id
					})
				} else {
					this.showMemberPay = true
					this.powerData = data
				}
			},
			getUserList() {
				this.totalNumber = 0
				uni.showLoading({
					title: '加载中'
				})
				UserService[this.recordType === 'like' ? 'userlike' : 'footprint']({
					type: this.navIndex === 0 ? 2 : 1,
				}).then(res => {
					this.Quantity = res.data.data.length
					uni.hideLoading()
					uni.stopPullDownRefresh()
					this.usercheck = res.data.usercheck
					if (this.usercheck === 2) {
						this.showMemberPop = true
					}
					if (res.code === 1 && res.data && res.data.data && res.data.data.length > 0) {
						this.userList = this.userList.concat(res.data.data)
						this.totalNumber = res.data.total
					} else {
						this.totalNumber = res.data.total
						this.pages.finish = true
					}
				})
			},
			// 喜欢不喜欢
			changeLike(index) {
				if (this.userList[index].like === 1) {
					this.userList[index].like = 0
				} else {
					this.userList[index].like = 1
				}
			},
			//跳转
			toNavigateTo(url) {
				if (url === 'member/index') {
					this.showMemberPay = true
					return false
				}
				uni.navigateTo({
					url: url
				})
			},
			paySuccess() {
				this.changeNav(0)
			},
			subsequentOperation(gender) {
				if (gender == 1) {
					this.showMemberPay = true
					this.cententText = '开通会员立即解锁'
				} else {
					this.toShowPerfectPop()
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.itsme-index-top {
		&-box {
			height: 176rpx;
		}

		.top-nav {
			height: 88rpx;
		}

		.top-nav-side {
			width: 176rpx;
		}

		.top-nav-img {
			width: 64rpx;
		}

		.top-nav-right {
			width: 88rpx;
			height: 88rpx;
		}
	}

	.btn {
		width: 330rpx;
		height: 80rpx;
		line-height: 80rpx;
		background: #D97DB0;
		box-shadow: 0rpx 0rpx 16rpx 0rpx rgba(0, 0, 0, 0.08);
		border-radius: 40rpx;
	}

	.box {
		position: fixed;
		bottom: 50rpx;
		z-index: 999;
		width: 750rpx;
		height: auto;
		padding: 0 32rpx 0 32rpx;
	}

	.marg {
		margin-left: 27rpx;
	}

	.fs {
		font-size: 36rpx;
		font-family: PingFang SC;
		color: #FFFFFF;
	}

	.fsblack {
		width: 571rpx;
		height: 29rpx;
		font-size: 30rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #333333;

	}

	.btn2 {
		width: 700rpx;
		height: 80rpx;
		background: #D97DB0;
		box-shadow: 0px 0px 16rpx 0px rgba(0, 0, 0, 0.08);
		border-radius: 40rpx;
		font-size: 36rpx;
		font-family: PingFang SC;
		color: #FFFFFF;
		text-align: center;
		line-height: 80rpx;
	}

	.auto {
		margin: 0 auto;
	}

	.user-mask {
		position: relative;
		filter: blur(5rpx);
		user-select: none;
	}

	.user-mask::after {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		content: '';
		display: block;
		background: rgba(35, 35, 45, 0.9);
	}
</style>
