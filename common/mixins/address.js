import UserService from '../../common/service/user-service.js'
import CommonService from '../../common/service/common-service.js'
import {
	mapGetters,
	mapActions
} from 'vuex'
import {
	getAddress
} from '../../common/appjs/address.js'
import {
	locationAuthorize
} from '../../common/appjs/authorize.js'
import {
	quitApp
} from '../../common/appjs/system.js'
export default {
	data() {
		return {

		}
	},
	computed: {
		...mapGetters(['user', 'version'])
	},
	methods: {
		...mapActions(['USER', 'GET_ADDRESS_FAIL', 'ADDRESS']),
		// 登陆成功跳转路由
		getUserAddress() {
			return new Promise((resolve, reject) => {
				let that = this
				if (this.platform === 'APP') {
					locationAuthorize().then(auth => {
						// -1=永久拒绝， 0 = 拒绝|受限， null = 未请求 1 = 已允许
						if (auth === -1) {
							uni.showModal({
								title: '温馨提示',
								content: '必须获取位置才能访问',
								confirmText: '授权',
								cancelText: '退出',
								success: function(sml) {
									if (sml.confirm) {
										that.HIDE_TYPE('authorize')
										permission.gotoAppSetting()
									} else if (sml.cancel) {
										quitApp()
									}
									reject()
								}
							})
						} else if (auth === 0) {
							uni.showModal({
								title: '温馨提示',
								content: '必须获取位置才能访问',
								confirmText: '授权',
								cancelText: '退出',
								success: function(sml) {
									if (sml.confirm) {
										resolve({
											code: 0
										})
									} else if (sml.cancel) {
										quitApp()
										reject()
									}
								}
							})
						} else {
							getAddress().then(
								arr => {
									UserService.userinit({
										lng: arr.longitude,
										lat: arr.latitude
									}).then(res => {
										if (res.code === 1) {
											this.USER(res.data.user)
											this.ADDRESS(res.data.Area)
											resolve({
												code: 1,
												data: {
													user: res.data.user,
													area: res.data.Area
												}
											})
										} else {
											reject()
										}
									})
								},
								err => {
									uni.showModal({
										title: '温馨提示',
										content: '必须获取位置才能访问',
										confirmText: '授权',
										cancelText: '退出',
										success: function(sml) {
											if (sml.confirm) {
												resolve({
													code: 0
												})
											} else if (sml.cancel) {
												quitApp()
												reject()
											}
										}
									})
									console.log(err)
								}
							)
						}
					})
				} else {
					UserService.userinit({
						lng: '112.514775',
						lat: '37.838836'
					}).then(res => {
						if (res.code === 1) {
							this.USER(res.data.user)
							this.ADDRESS(res.data.Area)
							resolve({
								code: 1,
								data: {
									user: res.data.user,
									area: res.data.Area
								}
							})
						} else {
							reject()
						}
					})
				}
			})
		}
	}
}
