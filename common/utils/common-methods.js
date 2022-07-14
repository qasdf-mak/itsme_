import $config from '../config/config.js'
import store from '../../store/index.js'

function formatImage(value, type = '') {
	// 定义了3种样式图片 169 代表 16:9 , 43 代表 4:3 , 11 代表 1:1
	// 每种共三个大小 s 代表 small , m 代表 middle ,b 代表 big
	// 共有9种图片 b169 m169 s169 b43 m43 s43 b11 m11 s11
	// 还有不传参数代表原图
	if (value === '') {
		if (store.getters.user && store.getters.user.gender && store.getters.user.gender === 0) {
			return '/static/my/tx_girl.png'
		} else {
			return '/static/my/tx_boy.png'
		}
	}
	if (value && value.indexOf('uploads') !== -1) {
		let imageUrl = ''
		if (store.getters.commonInfo && store.getters.commonInfo.uploaddata && store.getters.commonInfo.uploaddata
			.cdnurl) {
			imageUrl = store.getters.commonInfo.uploaddata.cdnurl
		} 
		let urltype = ''
		if (value && value.indexOf('uploads') === 0) {
			value = '/' + value
		}
		if (type === 's169') {
			urltype = '?x-oss-process=image/resize,w_80,h_45,m_fill'
		}
		if (type === 's43') {
			urltype = '?x-oss-process=image/resize,w_80,h_60,m_fill'
		}
		if (type === 's11') {
			urltype = '?x-oss-process=image/resize,w_50,h_50,m_fill'
		}
		if (type === 'ss11') {
			urltype = '?x-oss-process=image/resize,w_25,h_25,m_fill'
		}
		if (type === 'm169') {
			urltype = '?x-oss-process=image/resize,w_160,h_90,m_fill'
		}
		if (type === 'm43') {
			urltype = '?x-oss-process=image/resize,w_160,h_120,m_fill'
		}
		if (type === 'm11') {
			urltype = '?x-oss-process=image/resize,w_100,h_100,m_fill'
		}
		if (type === 'b169') {
			urltype = '?x-oss-process=image/resize,w_320,h_180,m_fill'
		}
		if (type === 'b43') {
			urltype = '?x-oss-process=image/resize,w_320,h_240,m_fill'
		}
		if (type === 'b11') {
			urltype = '?x-oss-process=image/resize,w_200,h_200,m_fill'
		}
		if (type === 'poster') {
			urltype = '?x-oss-process=video/snapshot,t_0,f_jpg,w_375,m_fast,ar_auto'
		}
		return imageUrl + value + urltype
	} else {
		return value
	}
}

function formatAvatar(value, type = '') {
	// 定义了3种样式图片 169 代表 16:9 , 43 代表 4:3 , 11 代表 1:1
	// 每种共三个大小 s 代表 small , m 代表 middle ,b 代表 big
	// 共有9种图片 b169 m169 s169 b43 m43 s43 b11 m11 s11
	// 还有不传参数代表原图

		let imageUrl = ''
		if (store.getters.commonInfo && store.getters.commonInfo.uploaddata && store.getters.commonInfo.uploaddata
			.cdnurl) {
			imageUrl = store.getters.commonInfo.uploaddata.cdnurl
		}
		let urltype = ''
		if (value && value.indexOf('uploads') === 0) {
			value = '/' + value
		}
		if (type === 's169') {
			urltype = '?x-oss-process=image/resize,w_80,h_45,m_fill'
		}
		if (type === 's43') {
			urltype = '?x-oss-process=image/resize,w_80,h_60,m_fill'
		}
		if (type === 's11') {
			urltype = '?x-oss-process=image/resize,w_50,h_50,m_fill'
		}
		if (type === 'ss11') {
			urltype = '?x-oss-process=image/resize,w_25,h_25,m_fill'
		}
		if (type === 'm169') {
			urltype = '?x-oss-process=image/resize,w_160,h_90,m_fill'
		}
		if (type === 'm43') {
			urltype = '?x-oss-process=image/resize,w_160,h_120,m_fill'
		}
		if (type === 'm11') {
			urltype = '?x-oss-process=image/resize,w_100,h_100,m_fill'
		}
		if (type === 'b169') {
			urltype = '?x-oss-process=image/resize,w_320,h_180,m_fill'
		}
		if (type === 'b43') {
			urltype = '?x-oss-process=image/resize,w_320,h_240,m_fill'
		}
		if (type === 'b11') {
			urltype = '?x-oss-process=image/resize,w_200,h_200,m_fill'
		}
		if (type === 'poster') {
			urltype = '?x-oss-process=video/snapshot,t_0,f_jpg,w_375,m_fast,ar_auto'
		}
		return imageUrl + value + urltype
}

function formatDate(time, type, style = '-') {
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
		return `%s${style}%s${style}%s%s%s:%s:%s`.format(time.getFullYear(), month, day, ' ', hour, minute, second)
	} else if (type === 8) {
		return `%s${style}%s${style}%s`.format(time.getFullYear(), month, day)
	} else {
		return `%s${style}%s${style}%s%s%s:%s`.format(time.getFullYear(), month, day, ' ', hour, minute)
	}
}

/* 获取当前页带参数的url */
function getCurrentPageUrlWithArgs() { // 必须在mounted函数调用，否则小程序中携带的参数不显示
	// eslint-disable-next-line
	var pages = getCurrentPages() // 获取加载的页面
	var currentPage = pages[pages.length - 1] // 获取当前页面的对象
	var url = currentPage.route // 当前页面url
	var options = currentPage.options || (currentPage.$route && currentPage.$route.query) || (currentPage.$vm &&
		currentPage.$vm.$mp.query) // 如果要获取url中所带的参数可以查看options
	var urlWithArgs = url + '?'
	for (var key in options) {
		var value = options[key]
		urlWithArgs += key + '=' + value + '&'
	}
	urlWithArgs = urlWithArgs.substring(0, urlWithArgs.length - 1)
	return {
		url,
		urlWithArgs,
		options
	}
}

function formatTimeIndex(time1, time2) {
	let nowtime = 0
	if (time2) {
		nowtime = time2
	} else {
		nowtime = Math.ceil(new Date().getTime() / 1000)
	}
	let time = nowtime - time1
	if (time > 7 * 24 * 60 * 60) {
		return '忙碌'
	} else if (time > 1 * 24 * 60 * 60 && time < 7 * 24 * 60 * 60) {
		return '随叫随到'
	} else if (time < 24 * 60 * 60) {
		return '活跃'
	} else {
		return '活跃'
	}
}

function formatTimeLife(time1, time2) {
	let nowtime = 0
	if (time2) {
		nowtime = time2
	} else {
		nowtime = Math.ceil(new Date().getTime() / 1000)
	}
	let time = nowtime - time1
	if (time > 7 * 24 * 60 * 60) {
		return '7天前'
	} else if (time > 1 * 24 * 60 * 60 && time < 7 * 24 * 60 * 60) {
		let num = Math.ceil(time / (1 * 24 * 60 * 60))
		return num + '天前'
	} else if (time > 60 * 60 && time < 24 * 60 * 60) {
		let num = Math.ceil(time / (60 * 60))
		return num + '小时前'
	} else if (time > 60 && time < 60 * 60) {
		let num = Math.ceil(time / 60)
		return num + '分钟前'
	} else {
		return '刚刚发布'
	}
}

// 格式化Me约类型
function formatTaskType(type) {
	if (type === 1) {
		return '普通聚餐'
	}
	if (type === 2) {
		return '休闲旅行'
	}
	if (type === 3) {
		return '玩游戏'
	}
	if (type === 4) {
		return '社交聚会'
	}
	if (type === 5) {
		return '健康运动'
	}
}

// 格式化Me约支付类型
function formatTaskCost(type) {
	if (type === 1) {
		return 'AA制'
	}
	if (type === 2) {
		return '我请客'
	}
	if (type === 3) {
		return '接单人支付'
	}
	if (type === 4) {
		return '可商议'
	}
}

function formatNumber(data) {
	return data / 100
}

//	格式化用户信息
function formatUserInfo(data) {
	let user = {}
	user.id = data.id
	user.avatar = data.avatar
	user.age = data.age
	user.gender = data.gender
	user.is_online = data.is_online
	user.is_vip = data.is_vip
	user.money = data.money
	user.nickname = data.nickname
	user.outtime = data.outtime
	user.server_time = data.server_time
	if (data.certify) {
		let certify = JSON.parse(data.certify)
		if (certify.real && certify.real.verified) {
			user.is_real = 1
		} else {
			user.is_real = 0
		}
		if (certify.goddess && certify.goddess.verified) {
			user.is_goddess = 1
		} else {
			user.is_goddess = 0
		}
	}
	return user
}



export {
	formatImage,
	formatAvatar,
	formatDate,
	getCurrentPageUrlWithArgs,
	formatTimeIndex,
	formatTimeLife,
	formatTaskType,
	formatTaskCost,
	formatUserInfo,
	formatNumber
}
