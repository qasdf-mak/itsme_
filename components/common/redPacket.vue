<template>
	<view class="width-full lh1">
		<view class="packet-pop">
			<view class="width-full fixed top10" v-if="showInvitation" style="background:none; z-index: 9999999999;">
				<view class="width-full">
					<view class="width-full" :style="'height: ' + StatusBar + 'px;'"></view>
					<view class="pt15 pl10 pr10">
						<view class="width-full bg-white border-box pt20 pb20 pl20 pr20 br10 flex align-items-center">
							<view class="packet-img-box relative">
								<image src="../../static/base/base_24.png" class="width-full" mode="widthFix"></image>
								<view
									class="absolute top bottom left right flex align-items-center flex-center fs12 color-white fw600">
									邀请
								</view>
							</view>
							<view class="flex-1 ml15 mr15">
								<view class="width-full fs14 nowrap1 color-deep fw600">
									{{packetData && packetData.title}}
								</view>
								<view class="width-full fs12 nowrap1 color-999999 mt8">
									{{packetData && packetData.desc}}
								</view>
							</view>
							<view class="red-packet-btn text-center color-white fs15" @click="toSystem">
								查看
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<u-toast ref="uToast" />
		<!-- 新版 -->
		<view class="fixed top bottom left right" style="z-index: 9999999999;" v-if="showNewPacket">
			<view class="width-full height relative">
				<view class="absolute top bottom left right bg-black opacity3"></view>
				<view class="absolute top bottom left right">
					<view class="width-full height flex flex-col align-items-center flex-center">
						<view class="relative new-packet-box">
							<view v-if="user && user.gender === 1">
								<image src="../../static/base/base_29.png" class="new-packet-box" mode="widthFix"
									v-if="packetList && packetList.length === 1"></image>
								<image src="../../static/base/base_30.png" class="new-packet-box" mode="widthFix"
									v-else></image>
							</view>
							<view v-else>
								<image src="../../static/base/base_28.png" class="new-packet-box" mode="widthFix"
									v-if="packetList && packetList.length === 1"></image>
								<image src="../../static/base/base_25.png" class="new-packet-box" mode="widthFix"
									v-else></image>
							</view>
							<view class="absolute left right new-packet-list">
								<view v-for="(item,index) in packetList" :key="index">
									<view class="width-full flex align-items-center flex-center mb20" v-if="index < 2">
										<view class="new-packet-item relative">
											<image src="../../static/base/base_26.png" class="new-packet-item"
												mode="scaleToFill"></image>
											<view class="absolute top bottom left right flex align-items-center">
												<view class="new-packet-price flex flex-center">
													<view class="fs32 fw600">
														{{item.payload.money}}
													</view>
													<view class="fs10 ml5 mt20">
														元
													</view>
												</view>
												<view class="flex-1 ml15 mr15">
													<view class="width-full fs15 fw600 color-deep nowrap1">
														{{item.payload.type === 'voucher' ? '会员充值会员券' : '佣金'}}
													</view>
													<view class="fs10 ml5 mt6 color-999999">
														{{item.payload.desc}}
													</view>
												</view>
											</view>
										</view>
									</view>
									<view class="absolute bottom_10 left right flex align-items-center flex-center"
										@click="toNewGift(item.type)">
										<view class="fs12 color-white">
											前往【我的】页面查看更多>>
										</view>
									</view>
								</view>
							</view>

						</view>
						<view class="width-full pt25 pb25 flex align-items-center flex-center" @click="closePacket">
							<image src="../../static/base/base_27.png" class="new-packet-close" mode="scaleToFill">
							</image>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 新版 -->
	</view>
</template>

<script>
	import {
		mapGetters
	} from 'vuex'
	import IMService from '../../common/appjs/imservice.js'
	import ChatService from '../../common/service/chat-service.js'
	import commonService from '../../common/service/common-service.js'
	import md5 from '../../js_sdk/js-md5/src/md5.js'
	export default {
		name: 'red-packet',
		data() {
			return {
				imService: null,
				showPacket: false,
				showInvitation: false,
				agentId: '',
				packetData: {
					title: '',
					desc: '',
					type: ''
				},
				showNewPacket: false,
				packetList: [],
				platform: ''
			}
		},
		computed: {
			...mapGetters(['token']),
		},
		destroyed() {
			this.showInvitation = false
			if (this.imService) {
				this.imService.onNewPrivateMessageReceive = (friendId, message) => {
					console.log('bbbbbbbbbbbbbbbbb')
				}
			}
		},
		mounted() {
			this.platform = uni.getSystemInfoSync().platform
			console.log(this.$WebIM.conn);
			if (this.token) {
				// if (this.im.getStatus() == 'disconnected') {
				// 	getApp().globalData.imService = new IMService(this.im)
				// 	getApp().globalData.imService.connectIM()
				// }
				this.onNewPrivate()
			}
		},
		methods: {
			// 检测新消息
			onNewPrivate() {
				let that = this
				this.$WebIM.conn.listen({
					onOpened: function(message) {
						console.log('连接成功')
					}, //连接成功回调
					onClosed: function(message) {
						console.log('连接失败1111111111111111111111111111111111111')
						if (this.user) {
							var options = {
								user: this.user.username,
								pwd: md5(this.user.username),
								apiUrl: this.$WebIM.config.apiURL,
								appKey: this.$WebIM.config.appkey,
							};
							// 登录到IM
							this.$WebIM.conn.open(options)
							// 加入到缓存
							uni.setStorage({
								key: "userinfo_hx",
								data: {
									userId: this.user.username,
									password: this.user.username
								}
							})
							this.getMsg()
						} else {
							console.log('未登录')
						}
					},
					onCustomMessage: function(message) {
						console.log('123123123--系统检测到有新消息--123123123')
						console.log(message)
						console.log('123123123--系统检测到有新消息--123123123')
						// this.$emit('comeMessage', friendId, message)
						// this.getChatNum()
						// this.playTipAudio(1)
						let sendmessage = message.customExts
						let friendId = sendmessage.senderId
						if (sendmessage.type && sendmessage.type.indexOf('itsme') !== -1) {
							// 私信消息
							console.log(friendId)
							console.log(sendmessage)
							that.geiNewChat(friendId, sendmessage, 0)
						} else {
							// 系统推送消息
							console.log('系统推送消息')
							that.$emit('comeMessage', friendId, message)
							that.getChatNum()
							that.playTipAudio(3)
						}
						// 经纪人推送
						if (message.customEvent === 'agent_invite') {
							console.log('经纪人')
							that.playTipAudio(2)
							let params = message.customExts
							that.packetData.title = '团队邀请'
							that.packetData.desc = params.realname + '邀请您加入团队'
							that.agentId = params.id
							that.showInvitation = true
							setTimeout(() => {
								that.showInvitation = false
							}, 16000)
						}
						// 会员券推送
						if (message.customEvent === 'red_envelope') {
							console.log('会员券推送')
							that.playTipAudio(2)
							let params = message.customExts
							that.packetList.unshift(params)
							that.packetList.filter((item)=>{
								item.payload  = JSON.parse(item.payload)
								return item
							})
							console.log(that.packetList)
							// this.showNewPacket = true
							if (that.platform === 'android' || (that.platform === 'ios' && that.commonInfo && !that.commonInfo.check)) {
								that.showNewPacket = true
								console.log('推送成功')
							}
						}

					}, //收到自定义消息
				});

				// this.imService = getApp().globalData.imService
				// this.imService.onNewPrivateMessageReceive = (friendId, message) => {
				// 	console.log('--系统检测到有新消息--')
				// 	// 收到新消息统一标记为已读
				// 	this.im.markPrivateMessageAsRead(message.senderId)
				// 		.then(() => {
				// 			console.log('标记为已读成功')
				// 		})
				// 		.catch(e => {
				// 			console.log(e)
				// 		})
				// 	// 会员券推送
				// 	if (message.senderId === 'red_envelope') {
				// 		this.playTipAudio(2)
				// 		if (message.payload && message.payload && message.payload.text) {
				// 			let params = JSON.parse(message.payload.text)
				// 			this.packetList.unshift(params)
				// 			// this.showNewPacket = true
				// 			if (this.platform === 'android' || (this.platform === 'ios' && this.commonInfo && !this
				// 					.commonInfo.check)) {
				// 				this.showNewPacket = true
				// 				console.log('推送成功')
				// 			}
				// 		}
				// 		return false
				// 	}
				// 	// 经纪人推送
				// 	if (message.senderId === 'agent_invite') {
				// 		console.log('经纪人弹窗')
				// 		this.playTipAudio(2)
				// 		if (message.payload && message.payload && message.payload.text) {
				// 			let params = JSON.parse(message.payload.text)
				// 			this.packetData.title = '团队邀请'
				// 			this.packetData.desc = params.realname + '邀请您加入团队'
				// 			this.agentId = params.id
				// 			this.showInvitation = true
				// 			setTimeout(() => {
				// 				this.showInvitation = false
				// 			}, 8000)
				// 		}
				// 		return false
				// 	}
				// 	if (message.type && message.type.indexOf('itsme') !== -1) {
				// 		// 私信消息
				// 		this.geiNewChat(friendId, message, 0)
				// 	} else {
				// 		// 系统推送消息
				// 		this.$emit('comeMessage', friendId, message)
				// 		this.getChatNum()
				// 		this.playTipAudio(3)
				// 	}
				// }
			},
			// 关闭弹窗
			closePacket() {
				this.showNewPacket = false
				this.packetList = []
			},
			// 获取新的消息
			geiNewChat(friendId, message, index) {
				console.log(11111);
				this.$emit('comeMessage', friendId, message)
				this.getChatNum()
				this.playTipAudio(1)
			},
			// tab 红点提示
			getChatNum() {
				console.log('消息提示')
				ChatService.chatnum().then(res => {
					if (res.code === 1) {
						if (res.data.total > 0) {
							uni.setTabBarBadge({
								index: 2,
								text: res.data.total.toString()
							})
							console.log('消息提示')
							if (res.data.chat_num > 0 || res.data.system_push_num > 0) {
								console.log('消息提示')
								this.$emit('setListTop', res.data.chat_num, res.data.system_push_num)
							}
						}
					}
				})
			},
			// 提示音
			playTipAudio(index) {
				let Number = 0
				let i = Number++
				console.log('声音提示')
				const innerAudioContext = uni.createInnerAudioContext()
				innerAudioContext.autoplay = true
				innerAudioContext.src = '/static/audio/tips_' + index + '.mp3'
				innerAudioContext.onPlay(() => {
					// console.log('开始播放')
				})
				innerAudioContext.onError(() => {
					// console.log('结束播放')
				})
				innerAudioContext.onEnded(() => {
					// console.log('结束播放')
				})
			},
			toNewGift(type) {
				console.log(type)
				this.closePacket()
				if (type === 'voucher') {
					if (this.user.gender === 1) {
						this.toJumpPage(1, '/pages/my/member/index')
					} else {
						this.toJumpPage(1, '/pages/my/commission')
					}
				} else {
					uni.navigateTo({
						url: '/pages/my/commission'
					})
				}
				// if (type === 'voucher') {
				// 	uni.navigateTo({
				// 		url: '/pages/my/cardpack'
				// 	})
				// } else {
				// 	if (this.user.gender === 0) {
				// 		uni.navigateTo({
				// 			url: '/pages/my/newgift'
				// 		})
				// 	} else {
				// 		uni.navigateTo({
				// 			url: '/pages/my/recovery?index=' + 1
				// 		})
				// 	}
				// }
			},
			toSystem() {
				uni.navigateTo({
					url: '/pages/message/detail?type=1&agentId=' + this.agentId
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.packet-box {
		width: 720rpx;
		height: 150rpx;
	}

	.packet-img-box {
		width: 63rpx;
		height: 70rpx;
	}

	.color-red {
		color: red;
	}

	.color-green {
		color: green;
	}

	.packet-btn {
		width: 249rpx;
		height: 60rpx;
		line-height: 58rpx;
	}

	.red-packet-btn {
		background: #FB3631;
		width: 150rpx;
		height: 60rpx;
		border-radius: 60rpx;
		line-height: 58rpx;
	}

	.new-packet-box {
		width: 560rpx;
	}


	.new-packet-close {
		width: 40rpx;
		height: 40rpx;
	}

	.bottom_10 {
		bottom: -20rpx;
	}

	.new-packet-list {
		top: 200rpx;
	}

	.new-packet-item {
		width: 483rpx;
		height: 131rpx;
	}

	.new-packet-price {
		width: 160rpx;
		color: #EA5A5A;
	}
</style>
