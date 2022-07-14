import UserService from '../../common/service/user-service.js'
import CommonService from '../../common/service/common-service.js'
// import IMService from "../appjs/imservice.js"
import md5 from "../../js_sdk/js-md5/src/md5.js"
import {
	mapGetters,
	mapActions
} from 'vuex'
export default {
	data() {
		return {

		}
	},
	computed: {
		...mapGetters(['user', 'version', ])
	},
	methods: {
		...mapActions(['USER', 'GET_ADDRESS_FAIL', 'ADDRESS', 'SHOW_PROFILE']),
		// 登陆成功跳转路由
		loginRouter(code) {
			console.log(this.user)
			var options = {
				user: this.user.username,
				pwd: md5(this.user.username),
				apiUrl: this.$WebIM.config.apiURL,
				appKey: this.$WebIM.config.appkey,
			};
			// 登录到IM
			console.log(this.$WebIM)
			this.$WebIM.conn.open(options)
			uni.setStorage({
				key: "userinfo_hx",
				data: {
					userId: this.user.username,
					password: this.user.username
				}
			})
			this.getMsg()
			this.updateAddress()
			if (this.user && !this.user.nickname) {
				console.log(code)
				console.log('/pages/login/sex?showCode=true')
				let sexUrl = code ? '/pages/login/sex?showCode=false' : '/pages/login/sex?showCode=true'
				console.log(sexUrl)
				uni.redirectTo({
					url: sexUrl
				})
			} else if (this.user && !this.user.avatar) {
				console.log('/pages/login/fillInformation')
				uni.redirectTo({
					url: '/pages/itsme/fillInformation'
				})
			} else {
				if (Number(this.user.gender) === 0) {
					// this.SHOW_PROFILE(true)
					uni.switchTab({
						url: '/pages/itsme/index'
					})
					return false
					let certify = JSON.parse(this.user.certify)
					if (certify && certify.real) {
						if (certify.real.verified) {
							// this.SHOW_PROFILE(true)
							uni.switchTab({
								url: '/pages/itsme/index'
							})
						} else {
							uni.redirectTo({
								url: '/pages/login/face'
							})
						}
					} else {
						uni.redirectTo({
							url: '/pages/login/face'
						})
					}
				} else {
					// this.SHOW_PROFILE(true)
					uni.switchTab({
						url: '/pages/itsme/index'
					})
				}
			}
		},

		// 更新用户信息
		updateUser() {
			return new Promise((resolve, reject) => {
				console.log('33333333333333333333333333333333333333333333')
				UserService.getuserinfo().then(res => {
					if (res.code === 1) {
						this.USER(res.data)
						console.log(this.user)
						resolve()
					} else {
						reject()
					}
				})
			})
		},
		// 退出登录
		loginOut() {
			UserService.logout().then(res => {
				if (res.code === 1) {
					this.USER(null)
					this.ADDRESS(null)
					this.$WebIM.conn.close();
					uni.reLaunch({
						url: '/pages/login/index'
					})
				}
			})
		},
		//注销账号
		writeOff() {
			UserService.userLogOut().then(res => {
				if (res.code === 1) {
					this.USER(null)
					this.ADDRESS(null)
					uni.showToast({
						title: '注销成功',
						icon: 'none'
					})
					setTimeout(function() {
						uni.reLaunch({
							url: '/pages/login/index',
						})
					}, 2000)
				}
			})
		},
		// 更新位置信息
		updateAddress() {
			let that = this
			if (!this.getAddressFail && this.platform === 'APP') {
				let pinf = plus.push.getClientInfo();
				let cid = pinf && pinf.clientid || ''; //客户端标识
				console.log(cid)
				console.log(pinf)
				uni.getLocation({
					type: 'gcj02',
					geocode: true, // 设置该参数为true可直接获取经纬度及城市信息
					success: function(res) {
						// #ifdef APP-PLUS
						that.getUserInfo(res.longitude, res.latitude, cid)
						// #endif
						// #ifdef H5
						that.getUserInfo(res.longitude, res.latitude)
						// #endif
					},
					fail: function() {
						that.GET_ADDRESS_FAIL(true)
						that.getUserInfo()
					}
				})
			}
			if (this.platform === 'H5') {
				// #ifdef APP-PLUS
				this.getUserInfo(112.514775, 37.838836, cid)
				// #endif
				// #ifdef H5
				this.getUserInfo(112.514775, 37.838836)
				// #endif
			}
		},
		getUserInfo(lng, lat, cid) {
			let params = {}
			if (lng && lat && cid) {
				params = {
					lng,
					lat,
					cid
				}
			} else {
				params = {
					lng,
					lat
				}
			}
			UserService.userinit(params).then(res => {
				if (res.code === 1) {
					if (lng && lat) {
						this.ADDRESS(res.data.Area)
						this.USER(res.data.user)
					}
				}
			})
		}
	}
}
