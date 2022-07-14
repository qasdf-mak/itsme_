import ajax from '../utils/ajax.js'
import $jsonurl from '../config/api-url.js'

class UserService {
	// 注册
	register(params) {
		return ajax($jsonurl.user.register, 'POST', false, params)
	}
	// 退出登录
	logout(params) {
		return ajax($jsonurl.user.logout, 'POST', false, params)
	}
	// 用户关闭app
	useronline(params) {
		return ajax($jsonurl.user.useronline, 'POST', false, params)
	}
	// 更新会员信息
	userinit(params) {
		return ajax($jsonurl.user.userinit, 'POST', false, params)
	}
	// 账号密码登录
	pwdlogin(params) {
		return ajax($jsonurl.user.pwdlogin, 'POST', false, params)
	}
	// 验证码登录
	mobilelogin(params) {
		return ajax($jsonurl.user.mobilelogin, 'POST', false, params)
	}
	// 一键登录随机码
	random(params) {
		return ajax($jsonurl.user.random, 'POST', false, params)
	}
	// 一键登录
	akeylogin(params) {
		return ajax($jsonurl.user.akeylogin, 'POST', false, params)
	}
	// 获取会员信息
	getuserinfo(params) {
		return ajax($jsonurl.user.getuserinfo, 'POST', false, params)
	}
	// 修改会员昵称及性别
	sexnickname(params) {
		return ajax($jsonurl.user.sexnickname, 'POST', false, params)
	}
	// 修改密码
	resetpwd(params) {
		return ajax($jsonurl.user.resetpwd, 'POST', false, params)
	}
	// 腾讯云人脸识别
	tencentCloudFace(params) {
		return ajax($jsonurl.user.tencentCloudFace, 'POST', false, params)
	}
	tencentCloudFaceGetDetectInfo(params) {
		return ajax($jsonurl.user.tencentCloudFaceGetDetectInfo, 'POST', false, params)
	}
	// 百度人脸识别
	baiduFace(params) {
		return ajax($jsonurl.user.baiduFace, 'POST', false, params)
	}
	// 百度人脸比对
	baiduFaceBd(params) {
		return ajax($jsonurl.user.baiduFaceBd, 'POST', false, params)
	}
	// 更新会员认证信息
	updateusercertify(params) {
		return ajax($jsonurl.user.updateusercertify, 'POST', false, params)
	}

	// 填写邀请码
	updateinvitecode(params) {
		return ajax($jsonurl.user.updateinvitecode, 'POST', false, params)
	}

	// 用户资料
	getuserprofile(params) {
		return ajax($jsonurl.user.getuserprofile, 'POST', false, params)
	}
	// 保存用户资料
	setuserprofile(params) {
		return ajax($jsonurl.user.setuserprofile, 'POST', false, params)
	}
	// 获取专属推荐会员列表
	getexclusiverecommend(params) {
		return ajax($jsonurl.user.getexclusiverecommend, 'POST', false, params)
	}
	// 喜欢美女
	dolike(params) {
		return ajax($jsonurl.user.dolike, 'POST', false, params)
	}
	// 用户相册列表
	userphonelist(params) {
		return ajax($jsonurl.user.userphonelist, 'POST', false, params)
	}
	// M豆种类 - 列表
	goldlist(params) {
		return ajax($jsonurl.user.goldlist, 'POST', false, params)
	}
	// M豆种类 - 列表
	viplist(params) {
		return ajax($jsonurl.user.viplist, 'POST', false, params)
	}
	// 用户喜欢和被喜欢列表
	userlike(params) {
		return ajax($jsonurl.user.userlike, 'POST', false, params)
	}
	// 用户足迹和被游览列表
	footprint(params) {
		return ajax($jsonurl.user.footprint, 'POST', false, params)
	}
	// 删除相册
	userPhotoDel(params) {
		return ajax($jsonurl.user.userPhotoDel, 'POST', false, params)
	}
	// 添加黑名单
	doblack(params) {
		return ajax($jsonurl.user.doblack, 'POST', false, params)
	}
	// 移除黑名单
	userblackdel(params) {
		return ajax($jsonurl.user.userblackdel, 'POST', false, params)
	}
	// 黑名单列表
	userblacklist(params) {
		return ajax($jsonurl.user.userblacklist, 'POST', false, params)
	}
	// 实名认证数据添加
	userrealadd(params) {
		return ajax($jsonurl.user.userrealadd, 'POST', false, params)
	}
	// 获取用户实名数据
	userrealget(params) {
		return ajax($jsonurl.user.userrealget, 'POST', false, params)
	}
	// 添加银行卡
	userbankadd(params) {
		return ajax($jsonurl.user.userbankadd, 'POST', false, params)
	}
	// 银行卡列表
	userbanklist(params) {
		return ajax($jsonurl.user.userbanklist, 'POST', false, params)
	}
	//修改银行卡默认提现卡
	userbankeditstate(params) {
		return ajax($jsonurl.user.userbankeditstate, 'POST', false, params)
	}
	//M豆收支明细
	usermoneylog(params) {
		return ajax($jsonurl.user.usermoneylog, 'POST', false, params)
	}
	// 用户实名和银行卡判断
	userrealbankcheck(params) {
		return ajax($jsonurl.user.userrealbankcheck, 'POST', false, params)
	}
	// 用户礼物列表
	usergiftreceivedlist(params) {
		return ajax($jsonurl.user.usergiftreceivedlist, 'POST', false, params)
	}
	//添加礼物到提现列表
	dowithdrawal(params) {
		return ajax($jsonurl.user.dowithdrawal, 'POST', false, params)
	}
	// 获取用户认证数据
	usercertifyinfoget(params) {
		return ajax($jsonurl.user.usercertifyinfoget, 'POST', false, params)
	}
	//用户提升身价列表
	userworthlist(params) {
		return ajax($jsonurl.user.userworthlist, 'POST', false, params)
	}
	// 获取用户信息简易版
	userinfosimple(params) {
		return ajax($jsonurl.user.userinfosimple, 'POST', false, params)
	}
	// 获取用户协议
	useragreement(params) {
		return ajax($jsonurl.user.useragreement, 'POST', false, params)
	}
	// 获取隐私协议
	privacyagreement(params) {
		return ajax($jsonurl.user.privacyagreement, 'POST', false, params)
	}
	// 点赞
	liked(params) {
		return ajax($jsonurl.user.liked, 'POST', false, params)
	}
	// 获取期望值
	getuserexpect(params) {
		return ajax($jsonurl.user.getuserexpect, 'POST', false, params)
	}
	// 修改期望值
	setuserexpect(params) {
		return ajax($jsonurl.user.setuserexpect, 'POST', false, params)
	}
	buyvipslide(params) {
		return ajax($jsonurl.user.buyvipslide, 'POST', false, params)
	}
	// 随机昵称
	randomnickname(params) {
		return ajax($jsonurl.user.randomnickname, 'POST', false, params)
	}
	// 新手任务，新手礼物完成情况
	novicegiftdata(params) {
		return ajax($jsonurl.user.novicegiftdata, 'POST', false, params)
	}
	// 注销用户
	userLogOut(params) {
		return ajax($jsonurl.user.userLogOut, 'POST', false, params)
	}
	// 完成新手任务获得的会员券列表
	completeNoviceTaskList(params) {
		return ajax($jsonurl.user.completeNoviceTaskList, 'POST', false, params)
	}
	// 提现新手任务会员券
	withdrawalNoviceGift(params) {
		return ajax($jsonurl.user.withdrawalNoviceGift, 'POST', false, params)
	}
	
	// 我的身价值列表(新)
	itsmeWorthList(params) {
		return ajax($jsonurl.user.itsmeWorthList, 'POST', false, params)
	}
	
	// 收支明细接口
	commonMoneyDetail(params) {
		return ajax($jsonurl.user.commonMoneyDetail, 'POST', false, params)
	}
	// 可提现金额的总数
	giftGiftTotalPrice(params) {
		return ajax($jsonurl.user.giftGiftTotalPrice, 'POST', false, params)
	}
	// 提现记录
	userWithdrawalList(params) {
		return ajax($jsonurl.user.userWithdrawalList, 'POST', false, params)
	}
	// 获取对方绑定的微信号
	checkWx(params) {
		return ajax($jsonurl.user.checkWx, 'POST', false, params)
	}
	// 购买对方微信号
	BuyUserWx(params) {
		return ajax($jsonurl.user.BuyUserWx, 'POST', false, params)
	}
	// 绑定微信号
	userSetWxNum(params) {
		return ajax($jsonurl.user.userSetWxNum, 'POST', false, params)
	}
	// 查看自己的微信号
	checkWxNum(params) {
		return ajax($jsonurl.user.checkWxNum, 'POST', false, params)
	}
	// 看过我微信的  
	checkUnlockwxWx(params) { 
		return ajax($jsonurl.user.checkUnlockwxWx, 'POST', false, params)
	}
	// 我解锁的
	checkMyUnlockWx(params) { 
		return ajax($jsonurl.user.checkMyUnlockWx, 'POST', false, params)
	}
	// 举报类型
	reportType(params) { 
		return ajax($jsonurl.user.reportType, 'POST', false, params)
	}
	// 提交举报信息
	userReport(params) { 
		return ajax($jsonurl.user.userReport, 'POST', false, params)
	}
}

export default new UserService()
