import $config from './config.js'

const $jsonurl = {
	common: {
		getsend: $config.service + '/sms/send',
		updateLonLat: $config.service + '/user/update_lng_lat',
		commoninit: $config.service + '/common/init',
		addonsimg: $config.uploadimg + '/alioss/index/params',
		notifyimg: $config.uploadimg + '/alioss/index/notify',
		aliossIndexOssupload: $config.uploadimg + '/alioss/index/ossupload',
		uploadinit: $config.service + '/common/uploadinit',
		getProvince: $config.service + '/common/getProvince',
		getCity: $config.service + '/common/getCity',
		publishphoto: $config.service + '/user/publish_photo',
		publishlife: $config.service + '/user/publish_life',
		professionlist: $config.service + '/itsme/profession_list',
		membership: $config.service + '/user/check_user_permission',
		sendgift: $config.service + '/gift/send',
		checkgift: $config.service + '/gift/check',
		configgift: $config.service + '/itsme/config_gift',
		lifedetails: $config.service + '/itsme/user_life_details',
		readphoto: $config.service + '/user/read_photo',
		userreadphotogoldconsume: $config.service + '/user/user_read_photo_gold_consume',
		backpacklist: $config.service + '/gift/backpackList',
		userphotoreaddel: $config.service + '/photo/user_photo_read_del',
		checkexpectanduserinfo: $config.service + '/common/check_expect_and_userinfo',
		usersimpleinfo: $config.service + '/user/get_user_info',
		buryingPoint: $config.service + '/common/burying_point',
		invitedata: $config.service + '/common/invite_data',
		invitenum: $config.service + '/invite/num',
		addAgent: $config.service + '/agent/add_agent',
		agentAudit: $config.service + '/agent/agent_audit',
		agentOperation: $config.service + '/chat/agent_operation',
		userCardPackage: $config.service + '/user/card_package',
		userSendVoucher: $config.service + '/user/send_voucher',
		setShareImg: $config.service + '/common/share_image',
		bankUserAlipayAdd: $config.service + '/bank/user_alipay_add',
		bankUserAlipayEditState: $config.service + '/bank/user_alipay_edit_state',
		withdrawalWithdrawalRequest: $config.service + '/Withdrawal/withdrawal_request',
		bankUserAlipayDel: $config.service + '/bank/user_alipay_del',
		bankUserAlipayList: $config.service + '/bank/user_alipay_list',
		userAllBenefits: $config.service + '/user/all_benefits',
		userMyOtherData: $config.service + '/user/my_other_data',
		agentDetails: $config.service + '/agent/agent_details',
	},
	user: {
		register: $config.service + '/user/register',
		pwdlogin: $config.service + '/user/login',
		mobilelogin: $config.service + '/user/mobilelogin',
		random: $config.service + '/user/akeylogin_random',
		akeylogin: $config.service + '/user/akeylogin',
		getuserinfo: $config.service + '/user/getuserinfo',
		sexnickname: $config.service + '/user/sex_nickname',
		resetpwd: $config.service + '/user/resetpwd',
		tencentCloudFace: $config.service + '/common/TencentCloudFace',
		baiduFace: $config.service + '/common/BaiduFace',
		baiduFaceBd: $config.service + '/common/BaiduFace_bd',
		tencentCloudFaceGetDetectInfo: $config.service + '/common/TencentCloudFaceGetDetectInfo',
		updateinvitecode: $config.service + '/user/update_invite_code',
		updateusercertify: $config.service + '/user/update_user_certify',
		logout: $config.service + '/user/logout',
		getuserprofile: $config.service + '/user/get_user_profile',
		setuserprofile: $config.service + '/user/set_user_profile',
		getexclusiverecommend: $config.service + '/user/get_exclusive_recommend',
		dolike: $config.service + '/user/do_like',
		userinit: $config.service + '/user/user_init',
		useronline: $config.service + '/user/user_online',
		userphonelist: $config.service + '/itsme/user_phone_list',
		goldlist: $config.service + '/itsme/gold_list',
		viplist: $config.service + '/itsme/vip_list',
		userlike: $config.service + '/itsme/user_like',
		footprint: $config.service + '/itsme/user_footprint',
		doblack: $config.service + '/black/do_black',
		userblackdel: $config.service + '/black/user_black_del',
		userblacklist: $config.service + '/black/user_black_list',
		userrealadd: $config.service + '/bank/user_real_add',
		userrealget: $config.service + '/bank/user_real_get',
		userbankadd: $config.service + '/bank/user_bank_add',
		userbanklist: $config.service + '/bank/user_bank_list',
		userbankeditstate: $config.service + '/bank/user_bank_edit_state',
		usermoneylog: $config.service + '/withdrawal/user_money_log',
		userrealbankcheck: $config.service + '/bank/user_real_bank_check',
		usergiftreceivedlist: $config.service + '/withdrawal/user_gift_received_list',
		dowithdrawal: $config.service + '/withdrawal/do_withdrawal',
		usercertifyinfoget: $config.service + '/user/user_certify_info_get',
		userworthlist: $config.service + '/itsme/user_worth_list',
		userinfosimple: $config.service + '/user/get_user_info_simple',
		useragreement: $config.service + '/itsme/user_agreement',
		privacyagreement: $config.service + '/itsme/privacy_agreement',
		liked: $config.service + '/user/do_life_like',
		getuserexpect: $config.service + '/user/get_user_expect',
		setuserexpect: $config.service + '/user/set_user_expect',
		buyvipslide: $config.service + '/common/buy_vip_slide',
		randomnickname: $config.service + '/common/random_nickname',
		novicegiftdata: $config.service + '/user/novice_gift_data',
		userLogOut: $config.service + '/common/user_logout',
		completeNoviceTaskList: $config.service + '/gift/complete_novice_task_list',
		withdrawalNoviceGift: $config.service + '/withdrawal/novice_gift',
		itsmeWorthList: $config.service + '/itsme/worth_list',
		commonMoneyDetail: $config.service + '/common/money_detail',
		giftGiftTotalPrice: $config.service + '/gift/gift_total_price',
		userWithdrawalList: $config.service + '/Withdrawal/user_withdrawal_list',
		userPhotoDel: $config.service + '/user/user_photo_del',
		checkWx: $config.service + '/itsme/check_wx',
		BuyUserWx: $config.service + '/itsme/buy_user_wx',
		userSetWxNum: $config.service + '/user/set_wx_num',
		checkWxNum: $config.service + '/user/check_wx_num',
		checkUnlockwxWx: $config.service + '/user/check_unlock_wx',
		checkMyUnlockWx: $config.service + '/user/check_my_unlock_wx',
		reportType: $config.service + '/report/report_type',
		userReport: $config.service + '/report/user_report',
	},
	itsme: {
		index: $config.service + '/itsme/index',
		keylist: $config.service + '/itsme/user_key_sreach_list',
		delkey: $config.service + '/itsme/user_key_sreach_del',
		userhomeinfo: $config.service + '/itsme/user_home_info',
		userhomelife: $config.service + '/itsme/user_home_life',
		meetlife: $config.service + '/itsme/life',
		userownhomelife: $config.service + '/itsme/user_own_home_life'
	},
	pay: {
		wxpay: $config.service + '/pay/wx_pay',
		alipay: $config.service + '/pay/ali_pay',
		getorderstatus: $config.service + '/pay/get_order_status',
		applenotify: $config.service + '/pay/apple_notify'
	},
	chat: {
		chatlist: $config.service + '/chat/chat_list',
		chatSend: $config.service + '/chat/send',
		chatdata: $config.service + '/chat/chat_get_find',
		chatmsghandle: $config.service + '/chat/chat_msg_handle',
		chatusernumlist: $config.service + '/chat/chat_user_num_list',
		chatusertop: $config.service + '/chat/chat_user_top',
		chatlistdel: $config.service + '/chat/chat_user_list_del',
		chatuserreadall: $config.service + '/chat/chat_user_read_all',
		chatuserisfirst: $config.service + '/chat_permission/first',
		chatuserinfo: $config.service + '/chat/chat_user_info',
		chatuserpermission: $config.service + '/chat_permission/check',
		chatuserpermissionadd: $config.service + '/chat_permission/add',
		usersystempushlist: $config.service + '/user/user_system_push_list',
		usersystempushdetail: $config.service + '/user/user_system_push_detail',
		openclosesystempush: $config.service + '/user/open_close_system_push',
		chatnum: $config.service + '/chat/num',
		chatCheckVoucher: $config.service + '/chat/check_voucher',
		chatCheckVoucherTwo: $config.service + '/chat/check_voucher2',
		ChatUserPacketLook: $config.service + '/chat/chat_user_packet_look'
	},
	task: {
		taskselect: $config.service + '/task/task_select',
		publishtask: $config.service + '/task/publish_task',
		publishcheck: $config.service + '/task/publish_check',
		taskmatchlist: $config.service + '/task/task_match_list',
		publishingcheck: $config.service + '/task/publishing_check',
		taskmatchhello: $config.service + '/task/task_match_hello',
		taskinfo: $config.service + '/task/task_info',
		taskstatecheck: $config.service + '/task/task_state_check',
		taskmatchuser: $config.service + '/task/task_match_user',
		taskmatchuserdel: $config.service + '/task/task_match_user_del',
		publishingcheckallstate: $config.service + '/task/publishing_check_all_state',
		tasktypelist: $config.service + '/task/task_type_list',
		tasklistinfo: $config.service + '/task/task_list_info',
		tasklistpublish: $config.service + '/task/task_list_publish',
		tasklistaccept: $config.service + '/task/task_list_accept',
		taskmatchuserlist: $config.service + '/task/task_match_user_list',
		tasksuccess: $config.service + '/task/task_success',
		tasksay: $config.service + '/task/say',
	},
	discover: {
		discoverlist: $config.service + '/itsme/task_and_life_lists',
		userlifedel: $config.service + '/itsme/user_life_del'
	}
}

export default $jsonurl
