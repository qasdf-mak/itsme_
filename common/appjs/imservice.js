/*
 * @Author: jack.lu
 * @Date: 2020-4-21 10:10:20
 * @Last Modified by: jack.lu
 * @Last Modified time: 2020-4-21 15:01:41
 */
import GoEasyIM from '../../lib/goeasy-im-1.5.0.js'
import store from '../../store/index.js'
import ChatService from '../../common/service/chat-service.js'
import CommonService from '../../common/service/common-service.js'

// 初始化聊天
function IMService(im) {
	this.im = im
	//私聊消息记录，map格式，每个好友对应一个数组
	this.privateMessages = {}
	//收到一条私聊消息
	this.onNewPrivateMessageReceive = function (friendId, message) {}
}

//连接GoEasy
IMService.prototype.connectIM = function() {
	let myInfo = {
		id: store.getters.user.id,
		age: store.getters.user.age,
		avatar: store.getters.user.avatar,
		nickname: store.getters.user.nickname
	}
	//初始化IM相关的监听器
	this.initialIMListeners()
	this.im.connect({
		id: myInfo.id,
		data: JSON.stringify(myInfo)
	}).then(() => {
		console.log('connect成功')
	}).catch(error => {
		console.log('connect失败,请确保网络正常，appkey和host正确，code:' + error.code + " content:" + error.content);
	})
}

//IM监听
IMService.prototype.initialIMListeners = function() {
	this.im.on(GoEasyIM.EVENT.CONNECTED, () => {
		console.log('连接成功.')
	})
	this.im.on(GoEasyIM.EVENT.DISCONNECTED, () => {
		console.log('连接断开.')
	})
	this.im.on(GoEasyIM.EVENT.CONNECTING, (times) => {
		console.log('连接中', times)
	})
	// 监听私聊消息
	this.im.on(GoEasyIM.EVENT.PRIVATE_MESSAGE_RECEIVED, (message) => {
		//更新私聊消息记录
		let friendId
		if (store.getters.user.id == message.senderId) {
			friendId = message.receiverId
		} else {
			friendId = message.senderId
		}
		//如果页面传入了相应的listener，执行listener
		this.onNewPrivateMessageReceive(friendId, message)
	})
}

// 发送消息
IMService.prototype.toSendMessage = function(type, friend, data, num) {
	console.log('==================================================')
	return new Promise((resolve, reject) => {
		CommonService.usersimpleinfo({ //获得简版的用户信息
			user_id: friend.uuid
		}).then(res => {
			if (res.code === 1) {
				let message = null
				let friendData = {
					type: GoEasyIM.SCENE.PRIVATE,
					id: res.data.user_id,
					data: JSON.stringify(res.data)
				}
				let notification = {}
				// 文字推送
				if (type === 'text') {
					notification = {
						title: store.getters.user.nickname + '发来一条消息',
						body: '[新消息]'
					}
				}
				// 图片推送
				if (type === 'image') {
					notification = {
						title: store.getters.user.nickname + '发来一张图片',
						body: '[图片]'
					}
				}
				// 视频推送
				if (type === 'video') {
					notification = {
						title: store.getters.user.nickname + '发来一段视频',
						body: '[视频]'
					}
				}
				// 音频推送
				if (type === 'audio') {
					notification = {
						title: store.getters.user.nickname + '发来一段语音',
						body: '[语音]'
					}
				}
				// 礼物推送
				if (type === 'gift') {
					notification = {
						title: store.getters.user.nickname + '给你送了礼物 ,点我查看',
						body: '[礼物]'
					}
				}
				// 抵用券推送
				if (type === 'voucher') {
					notification = {
						title: store.getters.user.nickname + '给你送了一张抵用券 ,点我查看',
						body: '[抵用券]'
					}
				}
				// 喜欢推送  
				if (type === 'common_like') {
					notification = {
						title: res.data.name + '给你点了喜欢',
						body: '[悄悄地告诉你,有人喜欢你哦]'
					}
				}
				// 任务推送
				if (type === 'common_task') {
					notification = {
						title: res.data.name + '邀请你接受Me约',
						body: '[有人邀请您做任务,速来]'
					}
				}
				// 邀请填写资料
				if (type === 'common_invited') {
					notification = {
						title: res.data.name + '邀请你填写资料',
						body: '[有人对你感兴趣]'
					}
				}
				// 使用了会员劵支付
				if (type === 'common_paySuccess') {
					notification = {
						title:'有人用使用了你的会员劵',
						body: '[会员劵被使用]'
					}
				}
				// 判断是否推送
				message = this.im.createCustomMessage({
					type: 'itsme_' + type,
					payload: data,
					to: friendData,
					notification: notification
				})
				// 发送
				this.im.sendMessage(message)
					.then(() => {
						resolve(message)
					})
					.catch(e => {
						reject(e)
					})
			} else {
				reject(res.msg)
			}
		})
	})
}

export default IMService
