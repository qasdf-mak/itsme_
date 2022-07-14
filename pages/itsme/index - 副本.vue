<template>
	<view class="width-full mintabh100vh lh1 bg-itsme-1">
		<!-- top begin -->
		<view class="width-full">
			<view class="width-full">
				<view class="width-full" :style="'height: ' + StatusBar + 'px;'"></view>
				<view class="index-top-box"></view>
			</view>
			<view class="fixed top left right bg-itsme-1" style="z-index: 99;">
				<view class="width-full" :style="'height: ' + StatusBar + 'px;'"></view>
				<view class="width-full">
					<view class="width-full flex align-items-center flex-between pt15 pb15 pl18 pr15">
						<image src="../../static/itsme/itsme_logo.png" class="itsme-logo" mode="widthFix"></image>
						<view class="flex align-items-center">
							<view class="icon_font color-itsme-7 fw600 fs16 mr15" @click="clickSearch" v-if="!noAdress">
								&#xe645;
							</view>
							<view class="icon_font color-itsme-7 fw600 fs16 mr15" @click="clickFilter" v-if="!noAdress">
								&#xe641;
							</view>
							<view class="flex align-items-center" @click="changeAddress" v-if="navIndex === 0">
								<view class="icon_font color-itsme-7 fs16 mr5">
									&#xe643;
								</view>
								<view class="fs15 color-itsme-7 fw600">
									{{filterData.city_name}}
								</view>
							</view>
						</view>
					</view>
					<view class="width-full mt15" v-if="!noAdress && !showFilterPop">
						<view class="ml35 mr35 pl30 pr30">
							<u-tabs :list="navList" :is-scroll="false" font-size="28" active-color="#D97DB0"
								inactive-color="#9E9E9F" bg-color="" :current="navIndex" @change="changeNav"></u-tabs>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- top begin -->
		<!-- list begin -->
		<view class="width-full mt25">
			<view class="width-full">
				<view v-for="(item,index) in userList" :key="index">
					<itsme-index :item="item" :isLogin="isLogin" @changeLike="changeLike(index)"  @userRefuse="userRefuse" @openBounced="openBounced"></itsme-index>
				</view>
			</view>
			<view class="fixed top left right bottom bg-main" v-if="showLoadBox && isLogin">
				<nearby-box :userList="userList" @closeNearby="showLoadBox = false"></nearby-box>
			</view>
		</view>
		<!-- list end -->
		<!-- 筛选弹框 -->
		<top-filter :showFilterPop="showFilterPop" :filterList="filterData" :isLogin="isLogin"
			@changeFilter="changeFilter" @closeTop="showFilterPop = false"></top-filter>
		<!-- 筛选弹框 -->
		<!-- 位置权限未获取 -->
		<view class="fixed top bottom left right bg-itsme-1 flex align-items-center flex-col flex-center"
			v-if="noAdress">
			<image src="../../static/itsme/itsme_32.png" class="img-big-box" mode="widthFix"></image>
			<view class="fs15 color-white mt20 lh15 ml35 mr35 text-center">
				您的位置未开启，暂时收不到附近消息
			</view>
			<view class="mt12 pl30 pr30 pt20 pb30" @click="toGetAddressAgain">
				<view class="no-adress-btn color-white fs15 text-center">
					打开定位
				</view>
			</view>
			<view class="width-full pt30 pb20"></view>
		</view>
		<!-- 位置权限未获取 -->
		<!-- 未登录按钮 begin -->
		<view class="fixed bottom20 left15 right15 pb_iphoneX_safe" v-if="!isLogin && userList && userList.length > 0">
			<view class="width-full flex align-items-center flex-center"
				:style="platform === 'H5' ? 'margin-bottom: 80rpx' : ''">
				<view class="index-login-box color-white fs16 text-center" @click="toLogin">
					注册/登录
				</view>
			</view>
		</view>
		<!-- 未登录按钮 end -->
		<!-- 地址筛选器 -->
		<view v-if="addressPickerShow">
			<address-picker :addressPickerShow="addressPickerShow" :addressid="addressData"
				@cancelAddress="addressPickerShow = false" @confirmAddress="confirmAddress"></address-picker>
		</view>
		<!-- 地址筛选器 -->
		<u-toast ref="uToast" />
		<!-- 真人弹框 -->
		<view v-if="showUnifyPop">
			<information-pop :showUnify="showUnifyPop" :type="unifyType" @closePop="showUnifyPop = false">
			</information-pop>
		</view>
		<!-- 完善资料 -->
		<view class="width-full" v-if="showPerfectPop">
			<perfect-pop @refreshTheList="refreshTheList" @closePerfectPop="toHidePerfectPop" :perfectNum="1">
			</perfect-pop>
		</view>
		<!-- 完善资料 -->
		<!-- 充值vip弹框 -->
		<view v-if="showMemberPay">
			<member-pay :showMemberPay="showMemberPay" :powerData="powerData" :centent="memberCentent"
				@closeVipPop="showMemberPay = false" @closePop="showMember(powerData)"
				@paySuccess="showMemberPay = false">
			</member-pay>
		</view>
		<!-- 充值vip弹框 -->
	
		<view v-if="showRedPacket && isLogin">
			<red-packet></red-packet>
		</view>
	</view>
</template>

<script>
	import {
		mapActions,
		mapGetters
	} from 'vuex'
	import itsmeItem from '../../components/itsme/item.vue'
	import itsmeIndex from '../../components/itsme/index.vue'
	import topFilter from '../../components/itsme/topfilter.vue'
	import ItsmeService from '../../common/service/itsme-service.js'
	import UserService from '../../common/service/user-service.js'
	import CommonService from '../../common/service/common-service.js'
	import {
		getAddress
	} from '../../common/appjs/address.js'
	import permission from '../../common/utils/permission.js'
	import addressPicker from '../../components/common/addresspicker.vue'
	import nearbyBox from '../../components/itsme/nearby.vue'
	// 选择标签弹框
	import setLable from '../../components/common/setlable.vue'
	export default {
		data() {
			return {
				userExpect: null,
				showLablePop: false,
				likeIndex: 0,
				showLoadBox: false, // 加载动画暂时废弃
				showLoginTip: false,
				showMemberPay: false,
				powerData: null,
				memberCentent: '',
				isLogin: false, // 登录状态
				// 位置权限
				noAdress: false,
				// 经纬度
				address: {
					lng: '',
					lat: ''
				},
				// nav切换
				navIndex: 0,
				navList: [{
					name: '推荐'
				}, {
					name: '附近的人'
				}],
				// 用户列表
				userList: [],
				addressPickerShow: false, // 地址选择器
				addressData: {
					pid: '',
					cid: ''
				},
				pages: {
					page: 1,
					finish: false
				},
				// 头部筛选
				showFilterPop: false,
				// 筛选条件
				filterData: {
					gender: '',
					age1: 0,
					age2: 0,
					worth1: 0,
					worth2: 0,
					province_name: '',
					province_id: '',
					city_name: '',
					city_id: ''
				},
				expectData: ''
			}
		},
		components: {
			itsmeItem,
			topFilter,
			addressPicker,
			itsmeIndex,
			nearbyBox,
			setLable,
		},
		onPullDownRefresh() {
			this.userList = []
			this.pages.page = 1
			this.pages.finish = false
			this.getUserList()
		},
		onReachBottom() {
			if (this.userList && this.userList.length > 0) {
				if (this.isLogin) {
					if ((this.userExpect || !this.userExpect.user_expect) && this.pages.page === 2 && this.user && this
						.user.gender === 0 && this.user.certify === null) {
						this.toShowPerfectPop()
					}
					if (!this.pages.finish) {
						this.pages.page++
						this.getUserList()
					}
				} else {
					this.$refs.uToast.show({
						title: '刷新次数过多，无更多匹配的人'
					})
					this.showLoginTip = true
				}
			}
		},
		onHide() {
			this.showFilterPop = false

		},
		onShow() {
			if (this.userList && this.userList.length > 0) {
				this.loginExpire().then(res => {
					if (this.isLogin !== res) {
						this.isLogin = res
						this.userList = []
						this.pages.page = 1
						this.pages.finish = false
						this.getUserList()
					}
				})
			}
			if (this.showProfile) {
				this.toShowPerfectPop()
			}
			if (this.IfTheRefresh) {
				this.userList = []
				this.pages.page = 1
				this.pages.finish = false
				this.getUserList()
			}
			if (this.isLikeRefresh) { // home 返回后变化喜欢
				let likeId = this.isLikeRefresh
				this.userList.map((likeId) => {
					for (let i = 0; i < this.userList.length; i++) {
						if (this.userList[i].id === this.isLikeRefresh) {
							this.userList[i].like = 1
						}
					}
				})
			}
		},
		onLoad() {
			this.init()
		},
		computed: {
			...mapGetters(['showProfile', 'isLikeRefresh', 'IfTheRefresh'])
		},
		watch: {
			powerData() {
				if (this.powerData.look >= this.powerData.total) {
					console.log(123)
					return this.memberCentent = ' 您今天的次数已经用完了 非会员每日只能查看' + this.powerData.total + '位用户'

				} else {
					console.log(321)
					let number = this.powerData.total - this.powerData.look
					return this.memberCentent = '您今天还能查看' + number + '位用户 非会员每日只能查看' + this.powerData.total + '位用户  '
				}
			}
		},
		methods: {
			...mapActions(['USER', 'ADDRESS', 'HIDE_TYPE', 'IFTHE_REFRESH']),
			init() {
				Object.assign(this.$data, this.$options.data())
				// 判断登录状态
				this.loginExpire().then(res => {
					this.isLogin = res
					// 获取用户位置信息
					this.getUserAddress()
					// 检查会员期望标签或个人资料是否填写完全
					if (res) {
						this.checkExpect()
					}
				})
			},
			/* 用户点击事件被拒绝
			 * type 点击类型  like  喜欢   zan 点赞
			 * value 拒绝类型  1  女性非真人点击喜欢提示去真人认证    2 同性不能点击喜欢
			 */
			userRefuse(type, value) {
				// 女性非真人点击喜欢提示去真人认证
				if (type === 'like' && value === 1) {
					this.toShowPerfectPop()
				}
				// 同性不能点击喜欢
				if (type === 'like' && value === 2) {
					this.$refs.uToast.show({
						title: '对方与您性别相同，只能观赏不能互动喔~'
					})
				}
			},
			checkExpect() {
				CommonService.checkexpectanduserinfo().then(res => {
					if (res.code === 1) {
						this.userExpect = res.data
						console.log(this.userExpect)
					}
				})
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

			},
			// 推荐 / 附近的人 切换
			changeNav(index) {
				// this.showLoadBox = true
				this.navIndex = index
				this.userList = []
				this.pages.page = 1
				this.pages.finish = false
				this.getUserList()
			},
			// 获取用户位置信息
			getUserAddress() {
				if (this.platform === 'APP') {
					getAddress().then(
						res => {
							this.address = {
								lng: res.longitude,
								lat: res.latitude
							}
							this.getUserInfo()
						},
						err => {
							this.noAdress = true
						}
					)
				} else {
					this.address = {
						lng: 112.514775,
						lat: 37.838836
					}
					this.getUserInfo()
				}
			},
			// 打开系统设置，获取手机定位
			toGetAddressAgain() {
				this.HIDE_TYPE('authorize')
				permission.gotoAppSetting()
			},
			// 获取位置成功更新用户信息
			getUserInfo() {
				UserService.userinit({
					lng: this.address.lng,
					lat: this.address.lat
				}).then(res => {
					if (res.code === 1) {
						this.USER(res.data.user)
						this.ADDRESS(res.data.Area)
						this.indexInit(res.data.user, res.data.Area)
					}
				})
			},
			// 首页初始化
			indexInit(user, area) {
				if (this.isLogin) {
					let gender = 0
					if (user && user.gender === 0) {
						gender = 1
					} else {
						gender = 0
					}
					this.filterData = {
						gender: gender,
						age1: this.commonInfo.age_between.s,
						age2: this.commonInfo.age_between.e,
						worth1: this.commonInfo.worth_between.s,
						worth2: this.commonInfo.worth_between.e,
						province_name: area.province.name,
						province_id: area.province.id,
						city_name: area.city.name,
						city_id: area.city.id
					}
				} else {
					this.filterData = {
						gender: null,
						age1: null,
						age2: null,
						worth1: null,
						worth2: null,
						province_name: area.province.name,
						province_id: area.province.id,
						city_name: area.city.name,
						city_id: area.city.id
					}
				}
				this.getUserList()
			},
			// 搜索
			clickSearch() {
				if (this.isLogin) {
					uni.navigateTo({
						url: '/pages/itsme/search'
					})
				} else {
					uni.reLaunch({
						url: '/pages/login/index'
					})
				}
			},
			// 用户点击筛选
			clickFilter() {
				this.addressPickerShow = false
				this.showFilterPop = true
			},
			// 喜欢不喜欢
			changeLike(index) {
				if (index) {
					this.likeIndex = index
				}
				if (this.userList[index].like === 1) {
					this.userList[index].like = 0
				} else {
					this.userList[index].like = 1

				}
			},
			// 获取美女列表
			getUserList() {
				let params = {
					page: this.pages.page,
					gender: this.filterData.gender,
					age1: this.filterData.age1,
					age2: this.filterData.age2,
					worth1: this.filterData.worth1,
					worth2: this.filterData.worth2,
					city_id: this.filterData.city_id,
					expect: this.expectData
				}
				if (this.navIndex === 1) {
					params.lng = this.address.lng
					params.lat = this.address.lat
				}
				ItsmeService.index(params).then(res => {
					uni.hideLoading()
					uni.stopPullDownRefresh()
					if (res.code === 1 && res.data && res.data.length > 0) {
						this.pages.finish = false
						this.userList = this.userList.concat(res.data)
					} else {
						this.pages.finish = true
					}
				})
			},
			// 筛选确认
			changeFilter(gender, age, worth) {
				this.filterData.gender = gender
				this.filterData.age1 = age[0]
				this.filterData.age2 = age[1]
				this.filterData.worth1 = worth[0]
				this.filterData.worth2 = worth[1]
				this.userList = []
				this.pages.page = 1
				this.pages.finish = false
				this.getUserList()
				this.showFilterPop = false
			},
			// 选择地址
			changeAddress() {
				this.addressData = {
					pid: this.filterData.province_id,
					cid: this.filterData.city_id
				}
				this.showFilterPop = false
				this.addressPickerShow = true
			},
			// 改变地址
			confirmAddress(pname, cname, pid, cid) {
				this.filterData.province_name = pname
				this.filterData.province_id = pid
				this.filterData.city_name = cname
				this.filterData.city_id = cid
				this.userList = []
				this.pages.page = 1
				this.pages.finish = false
				this.getUserList()
				this.addressPickerShow = false
			},
			// 跳转登录
			toLogin() {
				uni.reLaunch({
					url: '/pages/login/index'
				})
			},
			refreshTheList(expect) {
				this.expectData = expect
				this.userList = []
				this.pages.page = 1
				this.pages.finish = false
				this.getUserList()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.index-top-box {
		height: 180rpx;
	}

	.no-wz-img {
		width: 280rpx;
	}

	.itsme-logo {
		width: 180rpx;
	}

	.top-nav-item {
		height: 35rpx;
		line-height: 34rpx;
	}

	.top-nav-bot {
		width: 40rpx;
		height: 6rpx;
		border-radius: 3rpx;
		margin-top: 10rpx;
	}

	.index-login-box {
		width: 230rpx;
		height: 70rpx;
		line-height: 69rpx;
		border-radius: 70rpx;
		background: rgba($color: #000000, $alpha: 0.4);
	}

	.img-big-box {
		width: 492rpx;
		height: 492rpx;
	}

	.no-adress-btn {
		width: 200rpx;
		height: 68rpx;
		line-height: 68rpx;
		background: #D97DB0;
		border-radius: 34rpx;
	}
</style>
