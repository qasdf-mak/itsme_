import ajax from '../utils/ajax.js'
import $jsonurl from '../config/api-url.js'

class PayService {
	// 微信支付
	wxpay(params) {
		return ajax($jsonurl.pay.wxpay, 'POST', false, params)
	}
	// 获取支付状态
	getorderstatus(params) {
		return ajax($jsonurl.pay.getorderstatus, 'POST', false, params)
	}
	// 支付宝支付
	alipay(params) {
		return ajax($jsonurl.pay.alipay, 'POST', false, params)
	}
	// ios支付回调
	applenotify(params) {
		return ajax($jsonurl.pay.applenotify, 'POST', false, params)
	}
}

export default new PayService()
