import store from '../../store/index.js'

const request = function(url, method, isJson = false, data = {}) {
	let contentType = isJson ? 'application/json' : 'application/x-www-form-urlencoded'
	if (store.getters.token) {
		data.token = store.getters.token
	}
	return new Promise((resolve, reject) => {
		try {
			uni.request({
				url: url,
				data: data,
				method: method,
				header: {
					'content-type': contentType,
					'Access-Ajax': 1
				},
				success(res) {
					resolve(res.data)
				},
				fail(e) {
					reject(e)
				},
				complete(res) {
					reject(res)
					if (res.statusCode === 504) {
						reject(res)
						uni.showToast({
							title: '请求超时！',
							icon: 'none'
						})
					}
				}
			})
		} catch (e) {
			console.error(new Error(e))
			reject(e)
		}
	})
}

export default request
