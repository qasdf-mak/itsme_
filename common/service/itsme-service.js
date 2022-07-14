import ajax from '../utils/ajax.js'
import $jsonurl from '../config/api-url.js'

class ItsmeService {
	// 首页
	index(params) {
		return ajax($jsonurl.itsme.index, 'POST', false, params)
	}
	// 搜索历史
	keylist(params) {
		return ajax($jsonurl.itsme.keylist, 'POST', false, params)
	}
	// 清空搜索历史
	delkey(params) {
		return ajax($jsonurl.itsme.delkey, 'POST', false, params)
	}
	// 用户主页
	userhomeinfo(params) {
		return ajax($jsonurl.itsme.userhomeinfo, 'POST', false, params)
	}
	// 用户动态
	userhomelife(params) {
		return ajax($jsonurl.itsme.userhomelife, 'POST', false, params)
	}
	// 遇见动态
	meetlife(params) {
		return ajax($jsonurl.itsme.meetlife, 'POST', false, params)
	}
	// 我的动态
	userownhomelife(params) {
		return ajax($jsonurl.itsme.userownhomelife, 'POST', false, params)
	}
}

export default new ItsmeService()
