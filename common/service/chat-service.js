import ajax from '../utils/ajax.js'
import $jsonurl from '../config/api-url.js'

class ChatService {
	// 聊天记录
	chatlist(params) {
		return ajax($jsonurl.chat.chatlist, 'POST', false, params)
	}
	// 发送消息（新）
	chatSend(params) {
		return ajax($jsonurl.chat.chatSend, 'POST', false, params)
	}
	// 单条聊天数据
	chatdata(params) {
		return ajax($jsonurl.chat.chatdata, 'POST', false, params)
	}
	// 阅后即焚语音数据返回
	chatmsghandle(params) {
		return ajax($jsonurl.chat.chatmsghandle, 'POST', false, params)
	}
	// 聊天记录列表
	chatusernumlist(params) {
		return ajax($jsonurl.chat.chatusernumlist, 'POST', false, params)
	}
	// 置顶
	chatusertop(params) {
		return ajax($jsonurl.chat.chatusertop, 'POST', false, params)
	}
	// 删除列表一项
	chatlistdel(params) {
		return ajax($jsonurl.chat.chatlistdel, 'POST', false, params)
	}
	// 标记已读
	chatuserreadall(params) {
		return ajax($jsonurl.chat.chatuserreadall, 'POST', false, params)
	}
	// 聊天判断是否是第一次
	chatuserisfirst(params) {
		return ajax($jsonurl.chat.chatuserisfirst, 'POST', false, params)
	}
	// 聊天用户信息
	chatuserinfo(params) {
		return ajax($jsonurl.chat.chatuserinfo, 'POST', false, params)
	}
	// 判断用户是否有聊天权限
	chatuserpermission(params) {
		return ajax($jsonurl.chat.chatuserpermission, 'POST', false, params)
	}
	// 添加聊天权限记录
	chatuserpermissionadd(params) {
		return ajax($jsonurl.chat.chatuserpermissionadd, 'POST', false, params)
	}
	// 推送列表
	usersystempushlist(params) {
		return ajax($jsonurl.chat.usersystempushlist, 'POST', false, params)
	}
	// 
	usersystempushdetail(params) {
		return ajax($jsonurl.chat.usersystempushdetail, 'POST', false, params)
	}
	// 开启或关闭当前用户app顶部弹框通知
	openclosesystempush(params) {
		return ajax($jsonurl.chat.openclosesystempush, 'POST', false, params)
	}
	// 消息数查询
	chatnum(params) {
		return ajax($jsonurl.chat.chatnum, 'POST', false, params)
	}
	// 检测是否给对方送过会员券
	chatCheckVoucher(params) {
		return ajax($jsonurl.chat.chatCheckVoucher, 'POST', false, params)
	}
	// 检测是否使用对方的会员券
	chatCheckVoucherTwo(params) {
		return ajax($jsonurl.chat.chatCheckVoucherTwo, 'POST', false, params)
	}
	// 检测是否点击过会员券
	ChatUserPacketLook(params) {
		return ajax($jsonurl.chat.ChatUserPacketLook, 'POST', false, params)
	}
}

export default new ChatService()
