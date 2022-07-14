import ajax from '../utils/ajax.js'
import $jsonurl from '../config/api-url.js'

class CommonService {
	// 获取验证码
	getsend(params) {
		return ajax($jsonurl.common.getsend, 'POST', false, params)
	}
	// 更新用户位置
	updateLonLat(params) {
		return ajax($jsonurl.common.updateLonLat, 'POST', false, params)
	}
	// 初始化配置信息
	commoninit(params) {
		console.log('123')
		return ajax($jsonurl.common.commoninit, 'POST', false, params)
	}
	// 图片上传(1)
	uploadinit(params) {
		return ajax($jsonurl.common.uploadinit, 'POST', false, params)
	}
	// 图片上传(1)
	addonsimg(params) {
		return ajax($jsonurl.common.addonsimg, 'POST', false, params)
	}
	// 图片上传(4)
	notifyimg(params) {
		return ajax($jsonurl.common.notifyimg, 'POST', false, params)
	}
	// 图片上传(后台处理)
	aliossIndexOssupload(params) {
		return ajax($jsonurl.common.aliossIndexOssupload, 'POST', false, params)
	}
	// 获取省
	getProvince(params) {
		return ajax($jsonurl.common.getProvince, 'POST', false, params)
	}
	// 获取市
	getCity(params) {
		return ajax($jsonurl.common.getCity, 'POST', false, params)
	}
	// 发布相册
	publishphoto(params) {
		return ajax($jsonurl.common.publishphoto, 'POST', false, params)
	}
	// 发布动态
	publishlife(params) {
		return ajax($jsonurl.common.publishlife, 'POST', false, params)
	}
	// 职业列表
	professionlist(params) {
		return ajax($jsonurl.common.professionlist, 'POST', false, params)
	}
	// 访问用户主页权限
	membership(params) {
		return ajax($jsonurl.common.membership, 'POST', false, params)
	}
	// 礼物列表
	configgift(params) {
		return ajax($jsonurl.common.configgift, 'POST', false, params)
	}
	// 检查余额或背包礼物是否充足 gift/check
	checkgift(params) {
		return ajax($jsonurl.common.checkgift, 'POST', false, params)
	}
	// 发送礼物
	sendgift(params) {
		return ajax($jsonurl.common.sendgift, 'POST', false, params)
	}
	// 动态详情
	lifedetails(params) {
		return ajax($jsonurl.common.lifedetails, 'POST', false, params)
	}
	// 浏览相片
	readphoto(params) {
		return ajax($jsonurl.common.readphoto, 'POST', false, params)
	}
	// 会员照片减M豆
	userreadphotogoldconsume(params) {
		return ajax($jsonurl.common.userreadphotogoldconsume, 'POST', false, params)
	}
	// 背包礼物
	backpacklist(params) {
		return ajax($jsonurl.common.backpacklist, 'POST', false, params)
	}
	// 阅后即焚照片删除
	userphotoreaddel(params) {
		return ajax($jsonurl.common.userphotoreaddel, 'POST', false, params)
	}
	// 检查会员期望标签或个人资料是否填写完全
	checkexpectanduserinfo(params) {
		return ajax($jsonurl.common.checkexpectanduserinfo, 'POST', false, params)
	}
	// 获取简版的用户信息
	usersimpleinfo(params) {
		return ajax($jsonurl.common.usersimpleinfo, 'POST', false, params)
	}
	// Me圈滚到第二页请求
	buryingPoint(params) {
		return ajax($jsonurl.common.buryingPoint, 'POST', false, params)
	}
	// 海报数据
	invitedata(params) {
		return ajax($jsonurl.common.invitedata, 'POST', false, params)
	}
	// 获取邀请成功总人数
	invitenum(params) {
		return ajax($jsonurl.common.invitenum, 'POST', false, params)
	}
	// 获取邀请成功总人数
	addAgent(params) {
		return ajax($jsonurl.common.addAgent, 'POST', false, params)
	}
	// 申请经纪人状态
	agentAudit(params) {
		return ajax($jsonurl.common.agentAudit, 'POST', false, params)
	}
	// 经纪人邀请操作
	agentOperation(params) {
		return ajax($jsonurl.common.agentOperation, 'POST', false, params)
	}
	// 卡包列表
	userCardPackage(params) {
		return ajax($jsonurl.common.userCardPackage, 'POST', false, params)
	}
	// 发送抵用券
	userSendVoucher(params) {
		return ajax($jsonurl.common.userSendVoucher, 'POST', false, params)
	}
	// 分享图片
	setShareImg(params) {
		return ajax($jsonurl.common.setShareImg, 'POST', false, params)
	}
	// 添加支付宝账号
	bankUserAlipayAdd(params) {
		return ajax($jsonurl.common.bankUserAlipayAdd, 'POST', false, params)
	}
	// 修改默认支付宝账号
	bankUserAlipayEditState(params) {
		return ajax($jsonurl.common.bankUserAlipayEditState, 'POST', false, params)
	}
	// 支付宝提现
	withdrawalWithdrawalRequest(params) {
		return ajax($jsonurl.common.withdrawalWithdrawalRequest, 'POST', false, params)
	}
	// 删除支付宝账号
	bankUserAlipayDel(params) {
		return ajax($jsonurl.common.bankUserAlipayDel, 'POST', false, params)
	}
	// 支付宝账号列表
	bankUserAlipayList(params) {
		return ajax($jsonurl.common.bankUserAlipayList, 'POST', false, params)
	}
	// 用户全部会员券收益
	userAllBenefits(params) {
		return ajax($jsonurl.common.userAllBenefits, 'POST', false, params)
	}
	// 我的页面 (金币/佣金/喜欢/足迹)数字展示
	userMyOtherData(params) {
		return ajax($jsonurl.common.userMyOtherData, 'POST', false, params)
	}
	// 申请经纪人数据
	agentDetails(params) {
		return ajax($jsonurl.common.agentDetails, 'POST', false, params)
	}
}

export default new CommonService()
