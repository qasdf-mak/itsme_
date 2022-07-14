<template>
	<view class="width-full lh1 bg-itsme-1 mintabh100vh">
		<view class="width-full" :class="show ? 'user-mask' : ''" @click="noCome">
			<!-- top -->
			<view class="fixed top left right bg-itsme-1">
				<view class="width-full" :style="'height:' + StatusBar + 'px;'"></view>
				<view class="flex top-box flex align-items-center">
					<view class="flex pl18 pr18 pt3 pb3  color-white br12 mr20">
					</view>
					<view class="flex-1 text-center fs18 color-itsme-2 fw600">热门</view>
					<view class="flex pl8 pr8 pt3 pb3 bg-itsme-2 color-white br12 mr18" @click="menu">
						发布
					</view>
				</view>
			</view>
			<view class="width-full">
				<view class="width-full" :style="'height:' + StatusBar + 'px;'"></view>
				<view class="width-full top-box"></view>
			</view>
			<!-- top -->
			<view class="width-full">
				<view v-for="(item,index) in discoverList" :key="index">
					<view class="width-full">
						<discover-dynamic :item="item" :isLogin="isLogin" isHome :fromTheTop="fromTheTop"
							@changeLike="changeLike(index)" @goShowPerfect="goShowPerfect"
							@changefabulous="changefabulous(index,item)" @openBounced="openBounced">
						</discover-dynamic>
					</view>
					<!-- <view v-if="false">
						<discover-invitation :item="item"></discover-invitation>
					</view> -->
				</view>
				<view class="width-full pt15 pb15" v-if="discoverList && discoverList.length > 0 && pages.finish">
					<u-divider bg-color="">没有更多了</u-divider>
				</view>
				<view class="width-full" v-if="discoverList && discoverList.length === 0 && pages.finish">
					<empty-tip type="task"></empty-tip>
				</view>
			</view>
			<view class="width-full pt30"></view>
		</view>
		<!-- 发布Me约 -->
		<!-- 	<view class="task-add-box fixed bottom30 right20" v-if="!show" @click="menu">
			<image src="../../static/base/base_17.png" class="width-full" mode="widthFix"></image>
		</view> -->
		<!-- 发布Me约弹出层 -->
		<!-- 	<view class="width-full flex  pr35 pl35 fixed bottom70" v-if="show" style="height: 150rpx;" @click="noCome">
			<view class="flex1">
			</view>
			<view class="flex3">
				<view class="mauto mb10" style="width: 117rpx; height: 117rpx; border-radius: 50%;" @click="noCome">
					<image src="../../static/itsme/itsme_3.png" style="width: 100%; height: 100%; border-radius: 50%;"
						mode="widthFix" @click.stop @click="sendTheTask"></image>
				</view>
				<view class="text-center">
					发Me约
				</view>
			</view>
			<view class="flex3">
				<view class="mauto mb10" style="width: 117rpx; height: 117rpx;border-radius: 50%;" @click="noCome">
					<image src="../../static/itsme/itsme_2.png" style="width: 100%; height: 100%; border-radius: 50%;"
						mode="widthFix" @click.stop @click="withTheDynamic"></image>
				</view>
				<view class="text-center">
					发动态
				</view>
			</view>
			<view class="flex1">
			</view>
		</view> -->
		<no-login :pageShow="pageShow" type="meet" v-if="!isLogin"></no-login>
		<!-- 完善资料 -->
		<view class="width-full" v-if="showPerfectPop">
			<perfect-pop @refreshTheList="refreshTheList" @closePerfectPop="toHidePerfectPop" :perfectNum="1">
			</perfect-pop>
		</view>
		<!-- 完善资料 -->
		<!-- 充值vip弹框 -->
		<member-pay :showMemberPay="showMemberPay" :powerData="powerData" :centent="memberCentent"
			@closePop="showMember(powerData)" @paySuccess="showMemberPay = false">
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
	import ItsmeService from '../../common/service/itsme-service.js'
	import {
		formatImage
	} from '../../common/utils/common-methods'
	import TaskService from '../../common/service/task-service.js'
	import discoverService from '../../common/service/discover-service.js'
	import commonService from '../../common/service/common-service.js'
	import discoverInvitation from '../../components/discover/invitation.vue'
	import discoverDynamic from '../../components/discover/dynamic.vue'
	import noLogin from '../../components/common/nologin.vue'
	export default {
		data() {
			return {
				pageShow: false,
				isLogin: true, // 登录状态
				tabCurrent: 0,
				isRedPacket: false,
				result: Boolean,
				showMemberPay: false,
				powerData: null,
				memberCentent: '',
				taskType: null,
				lastId:'',
				discoverList: [],
				fromTheTop: '',
				show: false,
				nowTime: '',
				pages: {
					page: 1,
					size: 5,
					finish: false
				}
			}
		},
		components: {
			discoverInvitation,
			discoverDynamic,
			noLogin,
		},
		onPullDownRefresh() {
			this.pages.finish = false
			this.pages.page = 1
			this.discoverList = []
			this.nowTime =  Math.ceil(new Date().getTime() / 1000)
			this.getDiscoverList(this.nowTime)
		},
		onReachBottom() {
			if (!this.pages.finish) {
				this.pages.page++
				this.getDiscoverList(this.nowTime)
				if (this.pages.page === 2) {
					this.pushText()
				}
			}
		},
		computed: {
			...mapGetters(['user', 'IfTheRefresh', 'isShare']),
		},
		onPageScroll(e) {
			this.fromTheTop = e.scrollTop
		},

		onShow() {
			this.pageShow = true
			// this.noCome()
			if (this.IfTheRefresh) {
				this.pages.finish = false
				this.pages.page = 1
				this.discoverList = []
				this.getDiscoverList()
				this.IFTHE_REFRESH(false)
			}

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
			// if (this.discoverList && this.discoverList.length > 0) {
			// this.pages.finish = false
			// this.pages.page = 1
			// this.discoverList = []
			// this.getDiscoverList()
			// }
		},
		onHide() {
			this.pageShow = false
		},
		onLoad() {
			this.init()
		},
		watch: {
			powerData() {
				if (this.powerData.look >= this.powerData.total) {
					console.log(123)
					return this.memberCentent = ' 您今天的次数已经用完了 非会员每日只能查看' + this.powerData.total + '位用户  '

				} else {
					console.log(321)
					let number = this.powerData.total - this.powerData.look
					return this.memberCentent = '您今天还能查看' + number + '位用户 非会员每日只能查看' + this.powerData.total + '位用户  '
				}
			}
		},
		methods: {
			...mapActions(['IFTHE_REFRESH', 'IS_SHARE']),
			init() {
				Object.assign(this.$data, this.$options.data())
				this.loginExpire().then(res => {
					this.isLogin = res
					this.nowTime =  Math.ceil(new Date().getTime() / 1000)
					this.getDiscoverList(this.nowTime)
				})
			},
			addLife() {
				uni.navigateTo({
					url: '/pages/edit/life'
				})
			},
			// 发布动态按钮
			menu() {
				if (this.user && this.user.is_real === 1 || this.user.gender === 1) {
					// this.show = !this.show   任务  动态 一起的框
					this.addLife() //
				} else {
					this.toShowPerfectPop()
				}
			},
			// 点击取消发布动态
			noCome() {
				// uni.navigateTo({
				// 	url: '../edit/life'
				// })
				this.show = false
			},
			// 动态列表
			getDiscoverList(time) {
				let isTime = time ? time : ''
				let lat = this.isLogin ? this.user.lat : 37.838836
				let lng = this.isLogin ? this.user.lng : 112.514775
				discoverService.discoverlist({
					page: this.pages.page,
					lat: lat,
					lng: lng,
					time:isTime
				}).then(res => {
					uni.stopPullDownRefresh()
					if (res.code === 1 && res.data && res.data.length > 0) {
						this.pages.finish = false
						this.discoverList = this.discoverList.concat(res.data.map(item => {
							if (item.attachment && item.attachment.length > 1) {
								item.attachment.map(att => {
									att.image = formatImage(att.url)
									return att
								})
							}
							return item
						}))
					} else {
						this.pages.finish = true
					}
				})
			},
			//西辽页面
			goShowPerfect() {
				this.toShowPerfectPop()
				console.log(321)
			},
			//是否点赞
			changefabulous(index, item) {
				console.log(this.discoverList)
				if (this.discoverList[index].is_fabulous === 1) {
					this.discoverList[index].is_fabulous = 0
					this.discoverList[index].like--
				} else {
					this.discoverList[index].is_fabulous = 1
					this.discoverList[index].like++
				}
			},
			sendTheTask() {
				uni.navigateTo({
					url: '../edit/task'
				})
			},
			withTheDynamic() {
				uni.navigateTo({
					url: '../edit/life'
				})
			},
			//看到Me圈第二页
			pushText() {
				commonService.buryingPoint({
					text: '完成查看Me圈',
					val1: '新手任务'
				})
				this.isRedPacket = true
			},
			openBounced(data) {
				this.showMemberPay = true
				this.powerData = data
			},
			// 点击暂不开通
			showMember(powerData) {
				console.log(powerData)
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

			}
		}
	}
</script>

<style lang="scss" scoped>
	.top-box {
		height: 100rpx;

		&-left {
			width: 200rpx;
		}
	}

	.itsme-home-tab {
		width: 500rpx;
	}

	.task-add-box {
		width: 110rpx;
		height: 110rpx;
	}

	.user-mask {
		position: relative;
		filter: blur(5rpx);
		user-select: none;
	}

	.bottom70 {
		bottom: 140rpx;
	}

	.user-mask::after {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		content: '';
		display: block;
		background: rgba(255, 253, 253, 0.8);
	}

	.flex1 {
		flex: 1;
	}

	.flex2 {
		flex: 2;
	}

	.flex2-1 {
		flex: 1.5;
	}

	.flex3 {
		flex: 3;
	}

	.flex4 {
		flex: 4;
	}

	.flex5 {
		flex: 5;
	}
</style>
