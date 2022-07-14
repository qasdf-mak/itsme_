import PayService from '../service/pay-service.js'
import CommonService from '../service/common-service.js'
import store from '../../store/index.js'
/* 
 *** 支付统一管理
 *** @mode： gold M豆  wxpay 微信  alipay 支付宝
 *** @type: 	1	会员	2	M豆	3	礼物
 *** @id:		产品ID
 *** @num: 	产品数量	礼物数量 type为3时必填
 *** @voucher_id : 抵用币 Id
 *** @is_chat_view  : 是否来自聊天页 1 = 是 2 = 否 
 *** @chat_user_id  : 来自那个用户  
 */
function payMent(mode, type, id, num, voucher_id, is_chat_view,chat_user_id) {
	console.log(mode, type, id, num, voucher_id, is_chat_view,chat_user_id)
	store.commit('HIDE_TYPE', 'pay')
	return new Promise((resolve, reject) => {
		PayService[mode]({
			type,
			id,
			num,
			voucher_id,
			is_chat_view,
			chat_user_id
		}).then(res => {
			console.log(res)
			console.log('1111111111111111111111111111111111111111111')
			uni.requestPayment({				
				provider: mode,
				orderInfo: mode === 'wxpay' ? JSON.stringify(res.data) : res.data
					.orderInfo, //微信、支付宝订单数据
				success: function(pay) {
					console.log('成功')
					console.log(pay)
					resolve({
						code: 1,
						data: res.data
					})
				},
				fail: function(pay) {
					console.log(pay)
					resolve({
						code: 0,
						data: null
					})
				}
			})
		})
	})
}

function askPayStatus(data) {
	console.log('222222222222222222222222222222222222222222222222222')
	console.log(data)
	return new Promise((resolve, reject) => {
		PayService.getorderstatus({
			type: data.type,
			pay_type: data.pay_type,
			out_trade_no: data.out_trade_no
		}).then(res => {
			console.log(res)
			console.log('成功')
			if (res.msg === '支付成功') {
				CommonService.buryingPoint({
					text: '第一次支付成功',
					val1: '新手任务'
				}).then(res =>{
					if(res.code === 1){
						console.log(res)
					}
				})
				resolve('success')
			} else {
				resolve('fail')
			}
		})
	})
}

export {
	payMent,
	askPayStatus
}
