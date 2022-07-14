// 地址定位相关方法
import store from '../../store/index.js'

// 获取当前定位，并更新用户信息
function getAddress() {
	return new Promise((resolve, reject) => {
		store.commit('HIDE_TYPE', 'address')
		uni.getLocation({
			type: 'gcj02',
			geocode: true, // 设置该参数为true可直接获取经纬度及城市信息
			success: function(res) {
				console.log('获取定位成功')
				resolve(res)
			},
			fail: function(err) {
				reject(err)
				console.log('获取定位失败')
			}
		})
	})
}

// 获取当前定位，并更新用户信息
function changeAddress() {
	return new Promise((resolve, reject) => {
		store.commit('HIDE_TYPE', 'address')
		uni.chooseLocation({
			success: function (res) {
				resolve(res)
			}
		})
	})
}

export {
	getAddress,
	changeAddress
}
