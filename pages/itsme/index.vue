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
						<view class="flex align-items-center" @click="changeAddress" v-if="navIndex === 0">
							<view class="icon_font color-FCB834 fs16 mr5 mt3">
								&#xe643;
							</view>
							<view class="fs14 color-white">
								{{filterData.city_name}}
							</view>
						</view>
						<view class="flex align-items-center" :class="navIndex !== 0 ? 'width-full' : ''">
							<view class="flex  mr30" :class="navIndex !== 0 ? 'flex-1 flex-right' : ''">
								<view class="color-white fs14 mr3">
									筛选
								</view>
								<view class="icon_font color-white fs10  mt3" @click="clickFilter" v-if="!noAdress">
									&#xe609;
								</view>
							</view>
							<view class="icon_font color-white fs16 mr15 mt3" @click="clickSearch" v-if="!noAdress">
								&#xe645;
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
					<itsme-index :item="item" :index="index" :isLogin="isLogin" @changeLike="changeLike(index)"
						@userRefuse="userRefuse" @openBounced="openBounced"></itsme-index>
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
		<!-- 	<view v-if="showUnifyPop">
			<information-pop :showUnify="showUnifyPop" :type="unifyType" @closePop="showUnifyPop = false">
			</information-pop>
		</view> -->
		<!-- 完善资料 -->
		<view class="width-full" v-if="showPerfectPop">
			<perfect-pop @refreshTheList="refreshTheList" @closePerfectPop="closePerfectPop" :perfectNum="1">
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
		<unify-pop :showUnify="showUnifyPop" :type="unifyType" @closePop="showUnifyPop = false" @bingWx="bingWx"
			@goMemberPay="goPay">
		</unify-pop>
		<openpush-pop :openPushShow="showUpdate" @confirm="confirmUpdate" @cancel="showUpdate = false"></openpush-pop>
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
	import ChatService from '../../common/service/chat-service.js'
	import {
		getAddress
	} from '../../common/appjs/address.js'
	import permission from '../../common/utils/permission.js'
	import addressPicker from '../../components/common/addresspicker.vue'
	import nearbyBox from '../../components/itsme/nearby.vue'
	// 选择标签弹框
	import setLable from '../../components/common/setlable.vue'
	import openpushPop from 'components/common/openpushpop.vue'
	export default {
		data() {
			return {
				userExpect: null,
				showLablePop: false,
				showUnifyPop: false,
				unifyType: null,
				likeIndex: 0,
				showLoadBox: false, // 加载动画暂时废弃
				showLoginTip: false,
				showMemberPay: false,
				showRedPacket: false,
				powerData: null,
				memberCentent: '',
				isLogin: false, // 登录状态
				showUpdate: false,
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
				isNearby: 0,
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
				expectData: '',
				showWxPop: false,
				newTime: Math.ceil(new Date().getTime() / 1000)
			}
		},
		components: {
			itsmeItem,
			topFilter,
			addressPicker,
			itsmeIndex,
			nearbyBox,
			setLable,
			openpushPop
		},
		onPullDownRefresh() {
			this.userList = []
			this.pages.page = 1
			this.pages.finish = false
			this.getUserList()
			console.log('55555555555555555555555')

		},
		onReachBottom() {
			if (this.userList && this.userList.length > 0) {
				if (this.isLogin) {
					if (!this.pages.finish) {
						this.pages.page++
						this.getUserList()
						console.log('44444444444444444')

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
						console.log('333333333333333333333')

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
				console.log('222222222222222222222')

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
					if (res) {
						this.getChatNum()
					}
					this.getUserAddress()
					
					// 检查会员期望标签或个人资料是否填写完全
				})
			},
			bingWx() {
				this.toJumpPage(1, '/pages/my/bindWxCode')
				this.showUnifyPop = false
			},
			isOpenPermissions() {
				let platform = uni.getSystemInfoSync().platform
				if (platform == 'android') {
					console.log('我是安卓')
					/* 获取当前手机是否有通知权限 */
					// #ifdef APP-PLUS
					let main = plus.android.runtimeMainActivity();
					let pkName = main.getPackageName();
					let NotificationManagerCompat = plus.android.importClass(
						"android.support.v4.app.NotificationManagerCompat");
					let packageNames = NotificationManagerCompat.from(main);
					const expiredTimeNow = uni.getStorageSync('expiredTime')
					if (!packageNames.areNotificationsEnabled() && this.newTime > expiredTimeNow || !expiredTimeNow) {
						this.showUpdate = true //手机没有开启通知的权限
						let newTime = this.newTime
						let expiredTime = this.formatDate(this.newTime, 2, '/')
						let oldTime = (new Date(expiredTime + " 23:59:59")).getTime() / 1000;
						uni.setStorageSync('expiredTime', oldTime);
					}
					// #endif 
					/* 获取当前手机是否有通知权限 */
				}
			},
			confirmUpdate() {
				this.showUpdate = false //手机没有开启通知的权限
				console.log("没有通知权限");
				let main = plus.android.runtimeMainActivity();
				let pkName = main.getPackageName();
				let uid = main.getApplicationInfo().plusGetAttribute("uid");
				let Intent = plus.android.importClass('android.content.Intent');
				let Build = plus.android.importClass("android.os.Build");
				let intent = '';
				//android 8.0引导  
				if (Build.VERSION.SDK_INT >= 26) {
					intent = new Intent('android.settings.APP_NOTIFICATION_SETTINGS');
					intent.putExtra('android.provider.extra.APP_PACKAGE', pkName);
				} else if (Build.VERSION.SDK_INT >= 21) { //android 5.0-7.0  
					intent = new Intent('android.settings.APP_NOTIFICATION_SETTINGS');
					intent.putExtra("app_package", pkName);
					intent.putExtra("app_uid", uid);
				} else { //(<21)其他--跳转到该应用管理的详情页
					let Settings = plus.android.importClass("android.provider.Settings");
					let Uri = plus.android.importClass("android.net.Uri");
					intent = new Intent();
					intent.setAction(Settings.ACTION_APPLICATION_DETAILS_SETTINGS);
					let uri = Uri.fromParts("package", main.getPackageName(), null);
					intent.setData(uri);
				}
				// 跳转到该应用的系统通知设置页  
				main.startActivity(intent);
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
			// checkExpect() {
			// 	CommonService.checkexpectanduserinfo().then(res => {
			// 		if (res.code === 1) {
			// 			console.log(res)
			// 			this.userExpect = res.data
			// 			console.log(this.userExpect)
			// 		}
			// 	})
			// },
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
				console.log(index)
				this.isNearby = index
				// this.showLoadBox = true
				this.navIndex = index
				this.userList = []
				this.pages.page = 1
				this.pages.finish = false
				this.getUserList()
			},
			closePerfectPop() {
				this.toHidePerfectPop()
				if (this.user.gender === 0) {
					this.showUnifyPop = true
					this.unifyType = 31
				}
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
							console.log('000000000000000000000000000000000000')
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
					console.log('000000000000000000000000000000000000')
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
				console.log('1111111111111111111111111')
				console.log(this.address)
				UserService.userinit({
					lng: this.address.lng,
					lat: this.address.lat
				}).then(res => {
					if (res.code === 1) {
						this.USER(res.data.user)
						this.ADDRESS(res.data.Area)
						console.log(res)
						console.log('res')
						console.log('this.indexInit')
						this.indexInit(res.data.user, res.data.Area)
					}
				})
			},
			// 首页初始化
			indexInit(user, area) {
				console.log('222222222222222222222222')
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
				console.log('111111111111111111')
				this.getUserList()
			},
			getChatNum() {
				ChatService.chatnum().then(res => {
					if (res.code === 1) {
						if (res.data.total > 0) {
							this.loadSubscript(res.data.total)
						}
					}
				})
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
			formatDate(time, type, style = '-') {
				if (!time) time = new Date()
				if (/^\d+$/.test(time)) {
					if (String(time).length === 10) {
						time = time * 1000
					}
					time = new Date(time)
				}
				var month = time.getMonth() + 1
				if (month < 10) {
					month = '0' + month
				}
				var day = time.getDate()
				if (day < 10) {
					day = '0' + day
				}
				var hour = time.getHours()
				if (hour < 10) {
					hour = '0' + hour
				}
				var minute = time.getMinutes()
				if (minute < 10) {
					minute = '0' + minute
				}
				var second = time.getSeconds()
				if (second < 10) {
					second = '0' + second
				}
				if (type === 1) {
					return `%s${style}%s%s%s:%s`.format(month, day, ' ', hour, minute)
				} else if (type === 2) {
					return `%s${style}%s${style}%s`.format(time.getFullYear(), month, day)
				} else if (type === 3) {
					return `%s${style}%s`.format(month, day)
				} else if (type === 4) {
					return '%s:%s'.format(hour, minute)
				} else if (type === 5) {
					return '%s年%s月'.format(time.getFullYear(), month)
				} else if (type === 6) {
					return '%s月%s日'.format(month, day)
				} else if (type === 7) {
					return `%s${style}%s${style}%s%s%s:%s:%s`.format(time.getFullYear(), month, day, ' ', hour, minute,
						second)
				} else if (type === 8) {
					return `%s${style}%s${style}%s`.format(time.getFullYear(), month, day)
				} else {
					return `%s${style}%s${style}%s%s%s:%s`.format(time.getFullYear(), month, day, ' ', hour, minute)
				}
			},
			// 获取美女列表
			getUserList() {
				console.log('3333333333333333')
				let params = {
					page: this.pages.page,
					gender: this.filterData.gender,
					age1: this.filterData.age1,
					age2: this.filterData.age2,
					city_id: this.filterData.city_id,
					expect: this.expectData,
					is_nearby: this.isNearby
				}
				console.log(params)
				if (this.navIndex === 1) {
					params.lng = this.address.lng
					params.lat = this.address.lat
				}
				ItsmeService.index(params).then(res => {
					uni.hideLoading()
					uni.stopPullDownRefresh()
					if (res.code === 1 && res.data && res.data.length > 0) {
						this.pages.finish = false
						this.userList = this.userList.concat(res.data.filter(exp => {
							return exp.expect = exp.expect.map(res => {
								let colors = ['#DFE6FD', '#E5FCF6', '#FDFDD7', '#F9E6FD',
									'#FDE3E2'
								]
								let rand = Math.floor(Math.random() * 5);
								let item = {}
								item.expect_id = res.expect_id
								item.name = res.name
								item.user_id = res.user_id
								item.color = colors[rand]
								return item
							})
						}))
						this.showRedPacket = true
						this.isOpenPermissions()
					} else {
						this.pages.finish = true
					}
				})
			},
			goPay() {
				this.showUnifyPop = false
				this.showMemberPay = true
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
				console.log('6666666666666666')
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

	.color-FCB834 {
		color: #FCB834;
	}
</style>
