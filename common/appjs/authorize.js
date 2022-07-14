import permission from '../utils/permission.js'

let platform = uni.getSystemInfoSync().platform

// 位置权限
function locationAuthorize () {
	return new Promise((resolve, reject) => {
		// 授权状态
		let permissionResult = '' // -1=永久拒绝， 0 = 拒绝|受限， null = 未请求 1 = 已允许
		// android获取定位授权
		if (platform === 'android') {
		  permissionResult = permission.requestAndroid('android.permission.ACCESS_FINE_LOCATION')
		}
		// ios获取定位授权
		if (platform === 'ios') {
		  permissionResult = permission.requestIOS('location')
		}
		resolve(permissionResult)
	})
}

// 麦克风权限
function recordAuthorize () {
	return new Promise((resolve, reject) => {
		// 授权状态
		let permissionResult = '' // -1=永久拒绝， 0 = 拒绝|受限， null = 未请求 1 = 已允许
		// android获取定位授权
		if (platform === 'android') {
		  permissionResult = permission.requestAndroid('android.permission.RECORD_AUDIO')
		}
		// ios获取定位授权
		if (platform === 'ios') {
			console.log('permission.requestIOS')
			console.log(permission.requestIOS('record'))
			console.log('permission.requestIOS')
		  permissionResult = permission.requestIOS('record')
		}
		resolve(permissionResult)
	})
}

export { locationAuthorize, recordAuthorize }