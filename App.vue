<script>
	import Vue from 'vue'
	import {
		mapActions,
		mapGetters
	} from 'vuex'
	import CommonService from 'common/service/common-service.js'
	import UserService from 'common/service/user-service.js'
	import ChatService from 'common/service/chat-service.js'
	import md5 from "js_sdk/js-md5/src/md5.js"
	export default {
		globalData: {
			imService: null,
		},
		onLaunch: function() {
			this.setCommonInfo()
			// #ifdef H5
			Vue.prototype.platform = 'H5'
			// #endif
			// #ifdef APP-PLUS
			Vue.prototype.platform = 'APP'
			// #endif
			this.getSystemInfo()
			this.updateAddress()
			this.skinHx()
		},
		onShow: function(e) {
			console.log('App Show')
			this.updateAddress()
			// if (this.token) {
			// 	this.getChatNum()
			// }
			if (!this.hideType && this.profession) {
				this.updateUserInfo()
			}
			// if(this.user){
			// 	if (this.user && this.user.gender) {
			// 		if(!this.user.profession){
			// 			uni.redirectTo({
			// 				url: '/pages/itsme/fillInformation'
			// 			})
			// 		}
			// 	}else{
			// 		uni.switchTab({
			// 			url: '/pages/login/sex'
			// 		})
			// 	}
			// }else{
			// 	uni.switchTab({
			// 		url: '/pages/login/index'
			// 	})
			// }
			if (this.hideType) {
				this.HIDE_TYPE('')
			}
			this.skinHx()
		},
		onHide: function() {
			console.log('App Hide')
		},
		computed: {
			...mapGetters(['version', 'token', 'hideType'])
		},
		methods: {
			...mapActions(['COMMON_INFO', 'USER', 'HIDE_TYPE', 'ADDRESS']),
			// 获取设备信息
			getSystemInfo() {
				uni.getSystemInfo({ // 存储标题栏高度
					success: (e) => {
						console.log(e)
						Vue.prototype.windowWidth = e.windowWidth
						Vue.prototype.windowHeight = e.windowHeight
						if (e.model.search('iPhone X') !== -1) {
							Vue.prototype.isIphoneX = true
						}
						Vue.prototype.StatusBar = e.statusBarHeight
						Vue.prototype.NavBar = e.statusBarHeight + 44
					}
				})
			},
			// 更新位置信息
			updateAddress() {
				let that = this
				console.log('111111111111111')
				if (!this.getAddressFail && this.platform === 'APP') {
					let pinf = plus.push.getClientInfo();
					let cid = pinf && pinf.clientid || ''; //客户端标识
					console.log(cid)
					console.log(pinf)
					uni.getLocation({
						type: 'gcj02',
						geocode: true, // 设置该参数为true可直接获取经纬度及城市信息
						success: function(res) {
							console.log(res)
							that.getUserInfo(res.longitude, res.latitude, cid)
						},
						fail: function() {
							console.log('请求失败')
							console.log(res)
							that.GET_ADDRESS_FAIL(true)
							that.getUserInfo(res.longitude, res.latitude, cid)
						}
					})
				}
				if (this.platform === 'H5') {
					this.getUserInfo(112.514775, 37.838836)
				}
			},
			getUserInfo(lng, lat, cid) {
				let params = {}
				if (lng && lat) {
					params = {
						lng,
						lat,
						cid
					}
				}
				UserService.userinit(params).then(res => {
					if (res.code === 1) {
						if (lng && lat) {
							this.ADDRESS(res.data.Area)
							this.USER(res.data.user)
							console.log("更新定位成功 当前经纬度是" + lng + "," + lat + "," + cid)
						}
					}
				})
			},
			// app 初始化更新系统信息
			setCommonInfo() {
				console.log('12222223232332323')
				let platform = uni.getSystemInfoSync().platform
				let phoneType = platform === 'ios' ? 1 : 2
				CommonService.commoninit({
					version: this.version,
					type: phoneType
				}).then(res => {
					if (res.code === 1) {
						console.log(res.data)
						this.COMMON_INFO(res.data)
						Vue.prototype.imgBaseUrl = res.data.uploaddata.cdnurl
					}
				})
			},
			//登录环信账号登录数据
			skinHx() {
				if (this.user) {
					var options = {
						user: this.user.username,
						pwd: md5(this.user.username),
						apiUrl: this.$WebIM.config.apiURL,
						appKey: this.$WebIM.config.appkey,
					};
					// 登录到IM
					this.$WebIM.conn.open(options)
					// 加入到缓存
					uni.setStorage({
						key: "userinfo_hx",
						data: {
							userId: this.user.username,
							password: this.user.username
						}
					})
					this.getMsg()
				} else {
					console.log('未登录')
				}
			},
			// app 从后台返回前台，更新会员信息
			updateUserInfo() {
				if (this.token) {
					UserService.userinit().then(res => {
						if (res.code === 1) {
							console.log('用户为登录状态')
							this.USER(res.data.user)
						} else {
							this.USER(null)
							console.log('用户为未登录状态')
						}
					})
				} else {
					this.USER(null)
					console.log('用户为未登录状态')
				}
			},
			// getChatNum() {
			// 	ChatService.chatnum().then(res => {
			// 		if (res.code === 1) {
			// 			if (res.data.total > 0) {
			// 				this.loadSubscript(res.data.total)
			// 			}
			// 		}
			// 	})
			// }
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "uview-ui/index.scss";
	@import 'styles/base.scss';
</style>
