import CommonService from '../../common/service/common-service.js'
export default {
	data() {
		return {}
	},
	methods: {
		// 更新用户信息
		canToHome() {
			return new Promise((resolve, reject) => {
				CommonService.membership().then(res => {
					if (res.code === 1) {
						resolve(res.data)
					} else {
						// 接口错误
						reject(res.msg)
					}
				})
			})
		}
	}
}
