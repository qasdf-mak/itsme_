<template>
	<view class="width-full height100vh lh1 bg-main">
		<!-- top begin -->
		<view class="width-full">
			<view class="width-full">
				<view class="width-full" :style="'height: ' + StatusBar + 'px;'"></view>
				<view class="width-full top-nav-box"></view>
			</view>
			<view class="fixed top left right bg-main">
				<view class="width-full" :style="'height: ' + StatusBar + 'px;'"></view>
				<view class="width-full top-nav-box flex">
					<view class="top-nav-item height flex align-items-center flex-left ml15">
						<view class="icon_font fs25 color-shallow" @click="goList">
							&#xe60e;
						</view>
					</view>
					<view class="flex-1 height flex align-items-center flex-center">
						<view class="fs18 color-deep fw600 nowrap1">
							{{friendInfo && friendInfo.nickname || ''}}
						</view>
						<image src="../../../../static/itsme/itsme_10.png" class="top-nav-img ml6" mode="widthFix"
							v-if="friendInfo && friendInfo.is_vip && friendInfo.is_vip === 1"></image>
						<image src="../../../../static/itsme/itsme_11.png" class="top-nav-img ml6" mode="widthFix"
							v-if="friendInfo && friendInfo.is_goddess && friendInfo.is_goddess === 1"></image>
						<image src="../../../../static/base/base_12.png" class="top-nav-img ml6" mode="widthFix"
							v-if="friendInfo && friendInfo.is_real && friendInfo.is_real === 1"></image>
					</view>
					<view class="top-nav-item height flex align-items-center flex-right mr15" @click="report">
						<view class="fs13 color-999999">
							举报
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- top end -->
		<!-- 头部Me约模块 -->
		<task-box :friend="friendUser" :selfTask="selfTask" :friendTask="friendTask" :showFriendMore="showFriendMore"
			:showSelfMore="showSelfMore" @changeFriendMore="showFriendMore = !showFriendMore"
			@changeSelfMore="showSelfMore = !showSelfMore" @sendSuccess="sendSuccess"></task-box>
		<!-- 头部Me约模块 -->
		<!-- main begin -->
		<view class="pl15 pt15 pr15 pb15">
			<!-- 首页进入聊天头部名片 -->
			<user-card :friend="friendUser" :friendInfo="friendInfo" @sendSuccess="sendSuccess" @astrict="astrict"
				@popupRedPack="popupRedPack" v-if="friendInfo && friendUser"></user-card>
			<!-- 聊天内容框 -->
			<view class="width-full" @click="closeMenu">
				<view class="width-full pt10 pb15">
					<u-divider bg-color="#FAFAFA">{{allHistoryLoaded ? '已经没有更多的历史消息' : '下拉获取历史消息'}}</u-divider>
				</view>
				<view class="width-full">
					<message-item :messageList="messageList" :isWetherNeed="isWetherNeed"
						:isWhetherToUse="isWhetherToUse" :friend="friendUser" @changeItem="changeItem"
						@toSetLable="toSetLable" @sendGift="sendGift" @toMemberPop="showMemberPay = true"
						@openThePopup="sendVoucher" @useVoucher="useVoucher" v-if="friendUser && messageList">
					</message-item>
				</view>
				<view class="width-full">
					<view class="width-full pt35 pb35"></view>
				</view>
			</view>
		</view>
		<!-- main begin -->
		<!-- 聊天按钮 -->
		<send-box :power="power" :friend="friendUser" :selfTask="selfTask" @clickPower="clickPower"
			:closeMenuPop="closeMenuPop" @sendSuccess="sendSuccess" @sendGift="sendGift" @showMore="showMore"
			@omomomo="omomomo" @sendVoucher="sendVoucher"></send-box>
		<!-- 聊天按钮 -->
		<!-- 送礼物 -->
		<view v-if="showGiftPop">
			<gift-pop :friend="friendUser" @sendSuccess="sendSuccess" v-if="showGiftPop" :phoneType="phoneType"
				@closePop="showGiftPop = false"></gift-pop>
		</view>
		<view v-if="showVoucher">
			<send-voucher @closePop="showVoucher = false" :friend="friendUser" @chooseRedPacket="chooseRedPacket"
				@sendSuccess="sendSuccess"></send-voucher>
		</view>
		<!-- 送礼物 -->
		<!-- 权限弹窗 -->
		<unify-pop :showUnify="showUnifyPop" @showMemberPop="showMemberPop" :type="unifyType"
			@closePop="showUnifyPop = false"></unify-pop>
		<!-- 权限弹窗 -->
		<!-- 充值vip弹框 -->
		<view v-if="showMemberPay">
			<member-pay :showMemberPay="showMemberPay" :fromPageId="friendId" fromPage="chat"
				@closePop="showMember(powerData)" @paySuccess="updateInformationPop" :powerData="powerData"
				:centent="memberCentent">
			</member-pay>
		</view>
		<!-- 充值vip弹框 -->
		<!-- 完善资料 -->
		<view class="width-full" v-if="showPerfectPop">
			<perfect-pop @closePerfectPop="toHidePerfectPop">
			</perfect-pop>
		</view>
		<!-- 完善资料 -->
		<!-- 选择标签弹框 -->
		<set-lable :showLable="showLablePop" @closePop="showLablePop = false"></set-lable>
		<!-- 选择标签弹框 -->
		<view v-if="showRedPacket">
			<red-packet @comeMessage="comeMessage"></red-packet>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import {
		mapActions,
		mapGetters
	} from 'vuex'
	import UserService from '../../../../common/service/user-service.js'
	import ChatService from '../../../../common/service/chat-service.js'
	import CommonService from '../../../../common/service/common-service.js'
	import {
		formatUserInfo
	} from '../../../../common/utils/common-methods.js'
	import userCard from '../../../../components/message/usercard.vue'
	// 消息内容
	import messageItem from '../../../../components/message/index.vue'
	// 发送模块
	import sendBox from '../../../../components/message/send.vue'
	import sendVoucher from '../../../../components/message/send/sendVoucher.vue'
	// 权限弹框
	import chatPop from '../../../../components/message/chatpop.vue'
	// 邀约模块
	import taskBox from '../../../../components/message/task.vue'
	import TaskService from '../../../../common/service/task-service.js'
	import IMService from '../../../../common/appjs/imservice.js'
	import updateUser from '../../../../common/mixins/login.js'
	// 选择标签弹框
	import setLable from '../../../../components/common/setlable.vue'
	export default {
		mixins: [updateUser],
		data() {
			return {
				showPower: false, // 是否需要判断权限
				imService: null, // goeasy
				time: 0, // 定时器
				timer: null, // 定时器载体
				friendId: 0, // 接收方id
				// payload:{}, 女性发来券后,点击去使用所获得的当前的券的数据
				formpage: '', // 来源页面
				friendInfo: null, // 接收方详细信息
				powerData: null,
				friendUser: null, // 接收方信息
				historyPage: 1, // 历史消息页面
				messageList: [], // 消息列表
				allHistoryLoaded: false, // 已经加载完所有历史消息
				showGiftPop: false, // 礼物弹框
				power: null,
				phoneType: '', //手机类型
				showNum: 0,
				showLablePop: false, // 选择标签弹框
				selfTask: null, // 我的Me约
				friendTask: null, // 对方的Me约
				showFriendMore: false,
				showSelfMore: false,
				showVoucher: false,
				showMemberPay: false,
				memberCentent: '',
				isPopTipOne: false,
				isPopTipTwo: false,
				isSticky: false,
				closeMenuPop: false,
				isWetherNeed: true,
				isWhetherToUse: true
			}
		},
		computed: {
			...mapGetters(['user']),
		},
		components: {
			userCard,
			messageItem,
			sendBox,
			taskBox,
			chatPop,
			setLable,
			sendVoucher
		},
		onPageScroll(e) {
			// console.log(e)
		},
		onUnload() {
			//退出聊天页面之前，清空页面定时器
			if (this.timer) {
				clearInterval(this.timer)
			}
			//退出聊天页面之前，清空页面传入的监听器
			if (this.imService) {
				this.imService.onNewPrivateMessageReceive = (friendId, message) => {}
			}
		},
		onShow() {
			if (this.user.is_vip === 1) {
				if (this.messageList && this.messageList.length > 0) {
					this.messageList = []
					this.historyPage = 1
					this.allHistoryLoaded = false
					this.getHistoryMessage()
					this.markPrivateMessageAsRead()
				}
			} else {
				console.log('未支付')
			}
		},
		onLoad(options) {
			this.init(options)
		},
		onPullDownRefresh() {
			if (this.showPower) {
				uni.stopPullDownRefresh()
			} else {
				if (this.allHistoryLoaded) {
					uni.stopPullDownRefresh()
				} else {
					this.getHistoryMessage()
				}
			}
		},
		watch: {
			powerData() {
				if (this.powerData.look >= this.powerData.total) {
					console.log(123)
					return this.memberCentent = ' 您今天的次数已经用完了 非会员每日只能查看' + this.powerData.total + '位用户  '

				} else {
					console.log(321)
					let number = this.powerData.total - this.powerData.look
					return this.memberCentent = '您今天还能查看' + number + '位用户  非会员每日只能查看' + this.powerData.total + '位用户   '
				}
			}
		},
		methods: {
			...mapActions(['SHOW_PROFILE']),
			init(options) {
				Object.assign(this.$data, this.$options.data())
				this.friendId = options.tofriend
				this.formpage = options.formpage
				this.phoneType = uni.getSystemInfoSync().platform
				this.loginExpire().then(res => {
					if (res) {
						Promise.all([
							this.getFriendUser(),
							this.getPower()
						]).then(() => {
							// 男 非vip 只能看3条
							if (this.user && this.user.gender === 1 && this.user.is_vip === 0) {
								this.showPower = true
								this.showNum = 3
							}
							// 检查会员期望标签或个人资料是否填写完全
							this.timer = setInterval(this.timerJudge, 5000)
							this.imService = getApp().globalData.imService
							// 获取对话数据
							this.getHistoryMessage()
							// 收到的消息设置为已读
							this.markPrivateMessageAsRead()
							this.getTaskInfo()
							this.whetherNeed(this.friendId)
							this.whetherNeedTwo(this.friendId)
						})
					}
				})
			},
			//检测对方有没有我的会员券
			whetherNeed(id) {
				if (this.user.gender === 0) {
					ChatService.chatCheckVoucher({
						to_user_id: id
					}).then(res => {
						if (res.code === 1) {
							if (res.msg === '没有') {
								this.isWetherNeed = true
							} else {
								this.isWetherNeed = false
							}
							if (this.isWetherNeed === true) {
								console.log('对方没有我的会员券,')
							} else {
								console.log('对方有我的会员券,')
							}
							console.log('-------------------------------------------------------------')
						}
					})
				}
			},
			//检测对方有没有使用我的会员券
			whetherNeedTwo(id) {
				if (this.user.gender === 0) {
					ChatService.chatCheckVoucherTwo({
						to_user_id: id
					}).then(res => {
						if (res.code === 1) {
							if (res.msg === '没用过') {
								this.isWhetherToUse = true
							} else {
								this.isWhetherToUse = false
							}
							if (this.isWhetherToUse === true) {
								console.log('对方没有使用我的会员券,')
							} else {
								console.log('对方使用了我的会员券,')
							}
							console.log('-------------------------------------------------------------')
						}
					})
				}
			},
			astrict(powerData) {
				if (powerData) {
					this.powerData = powerData
				}
				this.showMemberPay = true
			},
			omomomo(index) {
				this.closeMenuPop = false
				setTimeout(function() {
					uni.pageScrollTo({
						scrollTop: 99999999999
					})
				}, 600)

			},
			// 接收新消息
			comeMessage(friendId, message) {
				if (friendId == this.friendId) {
					this.getPower()
					this.geiNewChat('receiver', message.messageId, 0)
				}
			},
			showMore(state) {
				if (state) { // state为 true 时 打开菜单栏 为 false 时 关闭菜单栏
					this.closeMenuPop = true
				} else {
					this.closeMenuPop = false
				}
			},
			popupRedPack() { // 打开菜单栏
				this.showVoucher = true
			},
			closeMenu() {
				this.closeMenuPop = false
			},
			// 检查会员期望标签或个人资料是否填写完全
			checkExpect() {
				CommonService.checkexpectanduserinfo().then(res => {
					if (res.code === 1) {
						if (res.data && !res.data.user_expect) {
							this.addTipMessage(4)
							this.scrollToBottom()
						}
					}
				})
			},
			// 标记消息为已读
			markPrivateMessageAsRead() {
				ChatService.chatuserreadall({
					user_id: this.friendId
				}).then(res => {
					console.log('标记为已读成功')
				})
			},
			goList() {
				uni.switchTab({
					url: '/pages/message/index'
				})
			},
			// 定时器
			timerJudge() {
				this.time = this.time + 5
				// 更新对方资料
				// this.updateFriendUser()
				// 检查会员期望标签或个人资料是否填写完全
				// 未填写匹配资料(只要有一项不填就展示文案)；进入对话框内停留100s
				if (this.time === 10) {
					this.checkExpect()
				}
			},
			// 不能发送消息
			clickPower() {
				// 男性非Vip，只能发送文字消息
				if (this.user.gender === 1 && this.power.do === 'suc') {
					this.unifyType = 2
					this.showUnifyPop = true
				}
				// 男性非Vip，只能发送三条消息提示去升级会员
				if (this.user.gender === 1 && this.power.msg_type === 'alert' && this.power.msg_type_id === 1003) {
					this.unifyType = 3
					this.showUnifyPop = true
				}
				// 男性非Vip，只能和三个聊天提示去升级会员
				if (this.user.gender === 1 && this.power.msg_type === 'alert' && this.power.msg_type_id === 1002) {
					this.unifyType = 3
					this.showUnifyPop = true
				}
				// 男性非Vip，聊过的人不能再聊提示去升级会员
				if (this.user.gender === 1 && this.power.msg_type === 'alert' && this.power.msg_type_id === 1001) {
					this.memberCentent = '想跟她继续聊天吗?'
					this.showMemberPay = true
				}
				// 女性真人，只能发送10条消息提示去女神认证
				if (this.user.gender === 0 && this.power.msg_type === 'alert' && this.power.msg_type_id === 1003) {
					this.unifyType = 6
					this.showUnifyPop = true
				}
				// 女性真人，只能和10个聊天提示去女神认证
				if (this.user.gender === 0 && this.power.msg_type === 'alert' && this.power.msg_type_id === 1002) {
					this.unifyType = 7
					this.showUnifyPop = true
				}
				// 女性真人，聊过的人不能再聊提示去女神认证
				if (this.user.gender === 0 && this.power.msg_type === 'alert' && this.power.msg_type_id === 1001) {
					this.unifyType = 8
					this.showUnifyPop = true
				}
			},


			// 获取聊天权限
			getPower() {
				ChatService.chatuserpermission({
					to_user_id: this.friendId
				}).then(res => {
					console.log(res)
					if (res.data.msg_type === "alert" && res.data.msg_type === "msg") {
						console.log('消息未发送成功')
					} else {
						CommonService.buryingPoint({
							text: '经纪人统计',
							val1: '聊天',
							val2: this.friendId
						}).then(res => {
							console.log(
								'-------------------------------------------完成任务后 --- 成功--------------------------------------'
							)
							this.isFinish = true
						})
					}
					if (res.code === 1) {
						this.power = res.data
						console.log('')
						console.log(this.power)
						console.log('this.power')
						// 男性Vip进入互聊5句----30条       (发个【小礼物】，可增加双方好感度哦； 点击小礼物弹出礼物框)
						if (this.power && this.power.do === 'suc' && this.power.msg_type_id === 2001) {
							this.addTipMessage(1)
							this.scrollToBottom()
						}
						// 女真非女神收到5条5句      (TA的身价值较高，只想与女神认证的人聊天：【女神认证】)
						if (this.power && this.power.do === 'suc' && this.power.msg_type_id === 2002) {
							this.addTipMessage(2)
							this.scrollToBottom()
						}
						// 发送8句
						if (this.power && this.power.do === 'suc' && this.power.msg_type_id === 2003) {
							this.addTipMessage(3)
							this.scrollToBottom()
						}
						// 收8句
						if (this.power && this.power.do === 'suc' && this.power.msg_type_id === 2004 && !this
							.isPopTipTwo) {
							this.addTipMessage(5)
							this.scrollToBottom()
							this.isPopTipTwo = true
						}
						// 男性非vip,消息隐藏提示女性
						if (this.power && this.power.do === 'suc' && this.power.msg_type_id === 2005 && !this
							.isPopTipOne) {
							this.addTipMessage(6)
							this.scrollToBottom()
							this.isPopTipOne = true
						}
					}
					console.log('执行了')
				})
			},
			// 充值会员后更新信息
			updateInformationPop() {
				console.log('充值后')
				if (this.messageList && this.messageList.length > 0 && this.showPower) {
					if (this.user && this.user.gender === 1 && this.user.is_vip === 1) {
						// vip
						this.showPower = false
						this.messageList = this.messageList.map(item => {
							item.show = true
							return item
						})

					}
					this.getPower()
				}
			},
			// 发送礼物
			sendGift(sex) {
				console.log(sex) // 这里的sex是由点击提现的参数传过来的,所以只有这个参数是0 的时候才会是 true ,不然都是 false
				if (sex === 0) {
					console.log('女')
					this.toJumpPage(1, '../../../my/recovery')
				} else {
					if (this.user.gender === 1) {
						if (this.user.is_vip === 1) {
							this.showGiftPop = true
						} else {
							this.$refs.uToast.show({
								title: '您不是VIP用户，只可发送文字消息哦',
								icon: false
							})
						}
					} else {
						this.showGiftPop = true
					}
				}
			},
			// 发送会员券券
			sendVoucher() {
				this.showVoucher = true
			},
			chooseRedPacket(index) {
				console.log(index)
			},
			// 获取对方资料
			getFriendUser() {
				return new Promise((resolve, reject) => {
					ChatService.chatuserinfo({
						user_id: this.friendId
					}).then(res => {
						if (res.code === 1) {
							this.friendInfo = res.data
							if (this.friendInfo.certify) {
								let certify = JSON.parse(this.friendInfo.certify)
								if (certify.real && certify.real.verified) {
									this.friendInfo.is_real = 1
								} else {
									this.friendInfo.is_real = 0
								}
								if (certify.goddess && certify.goddess.verified) {
									this.friendInfo.is_goddess = 1
								} else {
									this.friendInfo.is_goddess = 0
								}
							}
							this.friendUser = {
								uuid: this.friendInfo.id,
								name: this.friendInfo.nickname,
								avatar: this.friendInfo.avatar,
								data: this.friendInfo
							}
							resolve()
						}
					})
				})
			},
			showMemberPop(msg) {
				this.showMemberPay = true
				this.memberCentent = '开通VIP继续聊天'
			},
			delChat() {
				ChatService.chatlistdel({
					user_id: this.friendUser.uuid
				}).then(res => {
					if (res.code === 1) {
						uni.navigateBack({
							delta: 1
						})
					}
				})
			},
			useVoucher(payload) {
				if (this.user.is_vip === 1) {
					this.toJumpPage(1, '../../../my/cardpack')
				} else {
					this.showMemberPay = true
					this.memberCentent = '使用会员券来购买VIP更省钱哦~'
				}

			},
			// 更新对方资料
			updateFriendUser() {
				ChatService.chatuserinfo({
					user_id: this.friendId
				}).then(res => {
					if (res.code === 1) {
						this.friendInfo = res.data
						if (this.friendInfo.certify) {
							let certify = JSON.parse(this.friendInfo.certify)
							if (certify.real && certify.real.verified) {
								this.friendInfo.is_real = 1
							} else {
								this.friendInfo.is_real = 0
							}
							if (certify.goddess && certify.goddess.verified) {
								this.friendInfo.is_goddess = 1
							} else {
								this.friendInfo.is_goddess = 0
							}
						}
					}
				})
			},
			// 历史消息记录
			getHistoryMessage() {
				ChatService.chatlist({
					user_id: this.friendId,
					page: this.historyPage
				}).then(res => {
					if (res.code === 1) {
						res.data.map(item => {
							item.payload = JSON.parse(item.payload)
							this.messageList.unshift(item)
						})
						console.log(this.messageList)
						if (this.showPower) {
							this.messageList = this.messageList.map(item => {
								if (item.receiverId === this.user.id && item.type.indexOf(
										'itsme_common') === -1) {
									if (this.showNum > 0) {
										this.showNum--
									} else {
										item.show = false
									}
								}
								return item

							})
							console.log(this.messageList)
						}
						if (this.historyPage === 1) {
							this.scrollToBottom()
						}
						if (res.data.current_page < res.data.last_page) {
							this.allHistoryLoaded = false
							this.historyPage++
						} else {
							this.allHistoryLoaded = true
						}
					}
					uni.stopPullDownRefresh()
				})
			},
			// 发送消息成功后显示最新数据
			sendSuccess(res) {
				if (res.type === 'itsme_task') {
					this.getTaskInfo()
				}
				if (res.type === 'itsme_gift') {
					this.showGiftPop = false
					this.updateUser().then(() => {
						console.log('更新用户信息')
					})
				}
				res.show = true
				this.messageList.push(res)
				this.scrollToBottom()
				this.geiNewChat('sender', res.messageId, 0)
				this.sendSuccessJudge()
				this.whetherNeed(this.friendId)
				this.whetherNeedTwo(this.friendId)
				this.showVoucher = false
			},
			// 消息发送成功后判断
			sendSuccessJudge() {
				let that = this
				ChatService.chatuserpermissionadd({
					to_user_id: this.friendId
				}).then(res => {
					console.log(res)
					this.getPower()
					if (that.friendInfo.gender !== that.user.gender) {
						CommonService.buryingPoint({
							text: '完成第一次与异性聊天',
							val1: '新手任务'
						}).then(res => {
							console.log('完成任务后 --- 成功')
							this.isFinish = true
						})
					}
				})
			},
			// 对话框滚动到底部
			scrollToBottom() {
				this.$nextTick(() => {
					setTimeout(() => {
						uni.pageScrollTo({
							scrollTop: 2000000,
							duration: 0
						})
					}, 200)
				})
			},
			// 获取新的消息
			geiNewChat(type, messageId, index) {
				console.log('11111')
				if (index < 10) {
					index++
					ChatService.chatdata({
						message_id: messageId
					}).then(res => {
						if (res.code === 1) {
							let messagedata = res.data
							messagedata.payload = JSON.parse(res.data.payload)
							if (messagedata.type === 'itsme_task') {
								this.getTaskInfo()
							}
							if (type === 'receiver') {
								if (this.showPower) {
									if (this.showNum > 0) {
										this.showNum--
									} else {
										messagedata.show = false
										messagedata.showvip = true
									}
								}
								this.messageList = this.messageList.map(item => {
									if (!item.show) {
										item.showvip = false
									}
									return item
								})
								this.messageList.push(messagedata)
								this.scrollToBottom()
							} else {
								this.changeItem(messagedata)
							}
							this.markPrivateMessageAsRead()
						} else {
							setTimeout(() => {
								this.geiNewChat(type, messageId, index)
							}, 1000)
						}
					})
				}
			},
			// 服务端接收消息替换原消息
			changeItem(message) {
				this.messageList = this.messageList.map(item => {
					if (item.messageId === message.messageId) {
						item = message
					}
					return item
				})
			},
			// 聊天提示
			addTipMessage(type) {
				let tip = {
					type: 'itsme_tip',
					status: type
				}
				this.messageList.push(tip)
			},
			// 设置标签
			// toSetLable() {
			// 	this.SHOW_PROFILE(true)
			// 	uni.switchTab({
			// 		url: '/pages/itsme/index'
			// 	})
			// },
			toSetLable() {
				this.toShowPerfectPop()
			},
			//举报
			report() {
				uni.showToast({
					title: '举报成功',
					icon: 'none'
				})
			},
			// 获取Me约详情
			getTaskInfo() {
				TaskService.publishingcheckallstate({
					user_id: this.friendId
				}).then(res => {
					if (res.code === 1) {
						this.selfTask = res.data.self
						this.friendTask = res.data.other
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.top-nav-box {
		height: 100rpx;
	}

	.top-nav-item {
		width: 100rpx;
	}

	.top-nav-img {
		width: 35rpx;
	}
</style>
