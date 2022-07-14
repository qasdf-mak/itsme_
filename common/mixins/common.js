import UserService from '../../common/service/user-service.js'
import CommonService from '../../common/service/common-service.js'
import ChatService from '../../common/service/chat-service.js'
import IMService from "../../common/appjs/imservice.js"
import {
	mapGetters,
	mapActions
} from 'vuex'
import {
	getCurrentPageUrlWithArgs
} from 'common/utils/common-methods'
export default {
	data() {
		return {
			showPerfectPop: false,
			imService: null,
			showUnifyPop: false,
			unifyType: 0,
			showRedPacket: false
		}
	},
	onShow() {
		this.showRedPacket = true
	},
	onHide() {
		this.showRedPacket = false
	},
	computed: {
		...mapGetters(['token', 'user', 'commonInfo'])
	},
	methods: {
		...mapActions(['USER', 'SHOW_PROFILE','HXMESSAGE']),
		// 判断用户登录状态 true / false
		loginExpire() {
			return new Promise((resolve, reject) => {
				if (!this.token) {
					this.goToLogin()
					resolve(false)
				} else {
					UserService.getuserinfo().then(res => {
						console.log(res)
						if (res.code === 1) {
							this.USER(res.data)
							if (res.data.nickname) {
								resolve(true)
							} else {
								uni.reLaunch({
									url: '/pages/login/sex'
								})
							}
						} else {
							this.USER(null)
							this.goToLogin()
							resolve(false)
						}
					})
				}
			})
		},
		// 加载角标
		loadSubscript(num) {
			console.log(num)
			console.log('重新加载角标')
			uni.setTabBarBadge({
				index: 2,
				text: num.toString()
			})
		},
		// 点击暂不开通
		showMember(powerData) {
			console.log(powerData)
			if (powerData == null) {
				this.showMemberPay = false
			} else {
				this.showMemberPay = false
				if (powerData.look >= powerData.total) {
					uni.showToast({
						title: '今日免费次数已用完',
						icon: 'none'
					})
				} else {
					uni.navigateTo({
						url: '/pages/itsme/home?id=' + this.powerData.id
					})
				}
			}
		},
		 isJsonString(str) {
		    try {
		        if (typeof JSON.parse(str) == "object") {
		            return JSON.parse(str);
		        }
		    } catch (e) {
		    }
		    return str;
		},
		// 打开完善资料弹窗
		toShowPerfectPop() {
			this.SHOW_PROFILE(false)
			if (this.platform === 'APP') {
				const pages = getCurrentPages()
				const page = pages[pages.length - 1]
				const currentWebview = page.$getAppWebview()
				currentWebview.setStyle({
					pullToRefresh: {
						support: false,
						style: plus.os.name === 'Android' ? 'circle' : 'default'
					}
				})
			}
			this.showPerfectPop = true
		},
		// 关闭完善资料弹窗
		toHidePerfectPop() {
			if (this.platform === 'APP') {
				const pages = getCurrentPages()
				const page = pages[pages.length - 1]
				const currentWebview = page.$getAppWebview()
				currentWebview.setStyle({
					pullToRefresh: {
						support: true,
						style: plus.os.name === 'Android' ? 'circle' : 'default'
					}
				})
			}
			this.showPerfectPop = false
		},
		// 未登录状态判断路由来源跳转登录页
		goToLogin() {
			let url = getCurrentPageUrlWithArgs().url
			if (url !== 'pages/itsme/index' && url !== 'pages/discover/discover' && url !== 'pages/itsme/home') {
				uni.reLaunch({
					url: '/pages/login/index'
				})
			}
		},
		// // 登录状态设置goEasy
		// setGoeasy() {
		// 	if (this.im.getStatus() == 'disconnected') {
		// 		getApp().globalData.imService = new IMService(this.im)
		// 		getApp().globalData.imService.connectIM()
		// 	}
		// },
	
		//上传文件(oss)
		uploadFile(filePath) {
			return new Promise((resolve, reject) => {
				let imgs = []
				uni.uploadFile({
					url: 'https://v2client.shiwoaapp.com/addons/alioss/index/ossupload', //仅为示例，非真实的接口地址
					filePath: filePath,
					name: 'file',
					success: (uploadFileRes) => {
						if (uploadFileRes.statusCode === 200) {
							resolve(JSON.parse(uploadFileRes.data).data.url)
						}
					},
					fail: (err) => {
						reject(err)
					}
				});
			})
		},
		// 打开聊天窗口
		toOpenChat(type, userId) {
			uni.navigateTo({
				url: '/pages/message/chat/private/index?formpage=' + type + '&tofriend=' + userId
			})
		},
		goHome(id) {
			uni.navigateTo({
				url: "/pages/itsme/home?id=" + id
			})
		},
		// 返回上一页
		goBack() {
			let pages = getCurrentPages()
			if (pages && pages.length > 1) {
				uni.navigateBack({
					delta: 1
				})
			} else {
				uni.switchTab({
					url: '/pages/itsme/index'
				})
			}
		},
		// 页面跳转
		/* type
		 * 	1 ---> navigateTo // 保留当前页面，跳转到应用内的某个页面
		 *	2 ---> redirectTo // 关闭当前页面，跳转到应用内的某个页面
		 *	3 ---> reLaunch // 关闭所有页面，打开到应用内的某个页面
		 *	4 ---> switchTab // 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
		 */
		toJumpPage(type, url) {
			if (type === 1) {
				uni.navigateTo({
					url: url
				})
			}
			if (type === 2) {
				uni.redirectTo({
					url: url
				})
			}
			if (type === 3) {
				uni.reLaunch({
					url: url
				})
			}
			if (type === 4) {
				uni.switchTab({
					url: url
				})
			}
		},
		// 接收消息
		getMsg() {
			console.log('12345679')
			this.$WebIM.conn.listen({
				onOpened: function ( message ) {console.log('连接成功')},         //连接成功回调
				
				onClosed: function ( message ) {
					console.log('连接失败')
					
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
				},
				onCustomMessage: function(message) {
					this.$emit('comeMessage', friendId, message)
					this.getChatNum()
					this.playTipAudio(1)
					// console.log(message)
					// this.HXMESSAGE(message)
				}, //收到自定义消息

			});
		},
		/* 
		 * 发送消息
		 * type text(文字) image(图片) video(视频) audio(语音) gift(礼物) task(Me约) common_task(系统-Me约) common_like(系统-喜欢)  common_invited(邀请填写资料)
		 * friend 接收方信息
		 * data   发送内容
		 * num    礼物数量（非必填）
		 * */
		sendImMessage(type, friend, data, num) {
			return new Promise((resolve, reject) => {
				ChatService.chatSend({
					type: 'itsme_' + type,
					receiverId: friend.uuid,
					payload: JSON.stringify(data)
				}).then(res => {
						resolve(res)
				})
			})
		},
		/* 
		 *	进入用户主页前判断
		 * 	type 来源
		 * 	userid 要访问的用户id
		 */
		toUserHome(type, userid) {
			return new Promise((resolve, reject) => {
				CommonService.membership({
					user_id: userid
				}).then(res => {
					if (res.code === 1) {
						resolve(res)
					}
				})
			})
		},

		/*  喜欢操作
		 *	from_type 来源
		 * 	type  	操作类型   plus 加入喜欢 del 取消喜欢
		 * 	userid	对方用户
		 */
		setUserLike(from_type, type, user) {
			return new Promise((resolve, reject) => {
				let friend = {
					uuid: user.id,
					name: user.nickname,
					avatar: user.avatar,
					data: {
						id: user.id,
						age: user.age,
						avatar: user.avatar,
						nickname: user.nickname
					}
				}
				if (from_type === 'sex') {
					console.log('推送喜欢消息')
					resolve()
					// 喜欢
					let params = {
						text: 'Hi~可以聊一聊么'
					}
					this.sendImMessage('common_like', friend, params).then(
						(arr) => {
							console.log('Hi~可以聊一聊么')
						}
					)
				} else {
					console.log('入口')
					UserService.dolike({
						user_id: user.id
					}).then(res => {
						if (res.code === 1) {
							if (type === 'plus') {
								console.log(res.data.is_first)
								if (res.data.is_first) {
									// 喜欢
									let params = {
										text: res.data.text
									}
									this.sendImMessage('common_like', friend, params).then(
										(arr) => {
											console.log(res.data.text)
										}
									)
								}
								resolve()
							} else {
								// 取消喜欢
								resolve()
							}
						}
					})
				}
			})
		},

		/*  邀请填写资料操作
		 *	from_type 来源
		 * 	userid	对方用户
		 */
		invitedToFillOut(from_type, user) {
			return new Promise((resolve, reject) => {
				let friend = {
					uuid: user.id,
					name: user.nickname,
					avatar: user.avatar,
					data: {
						id: user.id,
						age: user.age,
						avatar: user.avatar,
						nickname: user.nickname
					}
				}
				resolve()
				// 邀请
				let params = {
					text: '我对你感兴趣,可以详细填写一下你的资料嘛?'
				}
				this.sendImMessage('common_invited', friend, params).then(
					(arr) => {
						console.log('我对你感兴趣,可以详细填写一下你的资料嘛?')
					}
				)

			})
		},
		ToBingWx(from_type, user) {
			return new Promise((resolve, reject) => {
				let friend = {
					uuid: user.id,
					name: user.nickname,
					avatar: user.avatar,
					data: {
						id: user.id,
						age: user.age,
						avatar: user.avatar,
						nickname: user.nickname
					}
				}
				resolve()
				// 邀请
				let params = {
					text: '想跟你深度了解一下，可以认证一下微信吗？'
				}
				this.sendImMessage('common_tobingwx', friend, params).then(
					(arr) => {
						console.log('想跟你深度了解一下，可以认证一下微信吗？')
					}
				)
		
			})
		},

		/*  购买会员劵后给劵主发一条被动消息
		 *	from_type 来源
		 * 	userid	对方用户
		 */
		invitationToPay(from_type, user) {
			console.log(from_type)
			console.log(user)
			return new Promise((resolve, reject) => {
				let friend = {
					uuid: user,
					data: {
						id: user,
					}
				}
				resolve()
				// 邀请
				let params = {
					text: '我使用了你的会员券?'
				}
				this.sendImMessage('common_paySuccess', friend, params).then(
					(arr) => {
						console.log('我使用了你的会员券')
					}
				)

			})
		},
		//微信分享
		// type 值
		// 0	图文	 
		// 1	纯文字	 
		// 2	纯图片	 
		// 3	音乐	 
		// 4	视频 
		// 5	小程序
		shareWx(type, title, url, content, img, id) {
			console.log('fscg')
			console.log(type)
			console.log(title)
			console.log(url)
			console.log(content)
			console.log(img)
			console.log(id)
			let that = this
			let uid = id ? id : 1
			console.log(uid)
			console.log(img)
			let imgs = img == null ? 'https://itsmev2-client.oss-cn-beijing.aliyuncs.com/images/logo.png' :
				"https://itsmev2-client.oss-cn-beijing.aliyuncs.com" + img
				console.log(imgs)
			uni.getImageInfo({
				src: imgs,
				success: function(image) {
					console.log('图片信息：', JSON.stringify(image));
					plus.zip.compressImage({
							src: image.path,
							dst: '_doc/a.jpg',
							overwrite: true,
							width: '100px', //这里指定了宽度，同样可以修改  
							format: 'jpg',
							quality: 70 //图片质量不再修改，以免失真  
						},
						function(e) {
							// plus.nativeUI.closeWaiting();
							that.uploadFile(e.target).then(
								(res) => {
									console.log(123456)
									console.log(res)
									uni.share({
										provider: "weixin",
										scene: "WXSceneSession",
										type: type,
										href: url + "?id=" + uid + '&code=' + that.user.invite_code ,
										title: title,
										summary: content,
										imageUrl: 'https://itsmev2-client.oss-cn-beijing.aliyuncs.com' +
											res,
										success: function(res) {
											console.log("success:" +
												JSON.stringify(
													res));
										},
										fail: function(err) {
											console.log("fail:" +
												JSON.stringify(
													err));
										}
									});
								}
							)
						},
						function(err) {
							plus.nativeUI.alert('未知错误！', function() {
								mui.back();
							});
						})
				}
			});
		},
		// 播放提示音
		playTipAudio(type) {
			const innerAudioContext = uni.createInnerAudioContext()
			innerAudioContext.autoplay = true
			innerAudioContext.src = '/static/audio/tips_1.mp3'
			innerAudioContext.onPlay(() => {
				console.log('开始播放')
			})
			innerAudioContext.onError(() => {
				console.log('结束播放')
			})
			innerAudioContext.onEnded(() => {
				console.log('结束播放')
			})
		}
	}
}
