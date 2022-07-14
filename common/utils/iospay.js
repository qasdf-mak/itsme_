import PayService from '../service/pay-service.js'
import CommonService from '../service/common-service.js'
import store from '../../store/index.js'
let iapChannel = null
let productId = 'jinbi_120'
let productIds = ['jinbi_120', 'jinbi_680', 'jinbi_1080', 'jinbi_6180', 'jinbi_10980']


/* 
 *** ios支付管理
 *** @mode： gold M豆  wxpay 微信  alipay 支付宝
 *** @type: 	1	会员	2	M豆	3	礼物
 *** @id:		产品ID
 *** @num: 	产品数量	礼物数量 type为3时必填
 *** 
 */
function iosPayMent() {
	return new Promise((resolve, reject) => {
		uni.showLoading({
			title:'检测支付环境...'
		})
		let zdIospay = uni.requireNativePlugin('ZD-Iospay')
		let transactionDateresult = zdIospay.ZdIospayFunctionSync('jinbi_120')
		let transactionDate = eval("(" + transactionDateresult + ")")
		plus.payment.getChannels((channels) => {
			for (var i in channels) {
				var channel = channels[i];
				if (channel.id === 'appleiap') {
					iapChannel = channel
					iapChannel.requestOrder(productIds, (orderList) => { //必须调用此方法才能进行 iap 支付
							uni.hideLoading()
							resolve()
					}, (e) => {
							uni.hideLoading()
							reject('暂不支持苹果 iap 支付')
					})
				}
			}
			if(!iapChannel){
				reject('暂不支持苹果 iap 支付')
			}
		}, (error) => {
			reject('暂不支持苹果 iap 支付')
		})
	})
}


export {
	iosPayMent
}
