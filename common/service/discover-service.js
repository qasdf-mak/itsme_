import ajax from '../utils/ajax.js'
import $jsonurl from '../config/api-url.js'

class DiscoverService {
	// 获取发现列表
	discoverlist(params) {
		return ajax($jsonurl.discover.discoverlist, 'POST', false, params)
	}
	// 删除动态
	userlifedel(params) {
		return ajax($jsonurl.discover.userlifedel, 'POST', false, params)
	}
}

export default new DiscoverService()
