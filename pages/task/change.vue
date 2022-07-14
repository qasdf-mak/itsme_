<template>
	<view class="task-change-box relative lh1 float-hidden">
		<image src="../../static/task/task_5.png" class="width-full height" mode="scaleToFill"></image>
		<view class="absolute top bottom right left flex flex-col">
			<scroll-view scroll-y="true" class="task-change-box">
				<view class="width-full">
					<!-- top -->
					<view class="width-full" :style="'height:' + StatusBar + 'px;'"></view>
					<view class="width-full flex align-items-center flex-col flex-center mb15">
						<view class="fs18 color-deep fw600 pt35 pb10">
							Me约发布成功
						</view>
						<view class="fs14 color-deep">
							{{ifFlip ? '一大批me友正在赶来，请等候...' : '&#12288;&#12288;&#12288;&#12288;'}}
						</view>
					</view>
					<!-- top -->
					<!-- main -->
					<view class="ml35 mr35 pl10 pr10 flex flex-wrap flex-between">
						<view v-for="(item,index) in userlist" :key="index">
							<view class="user-item-box mb12 br5 bg-white float-hidden"
								:class="item.flip ? '' : 'flip-down'">
								<view class="width-full height flex flex-col" :class="item.flip ? '' : 'flip-mask'">
									<view class="user-item-img" @click="getUserInfo(index)">
										<image :src="item.avatar | imageFilter('b11')" class="user-item-img"
											mode="aspectFill"></image>
									</view>
									<view class="width-full flex-1 flex align-items-center flex-center"
										v-if="invitelist.indexOf(item.id) !== -1"
										@click="toOpenChat('taskChange',item.id)">
										<view class="icon_font">
											&#xe640;
										</view>
										<view class="fs14 color-deep ml8">
											去聊天
										</view>
									</view>
									<view class="width-full flex-1 flex align-items-center flex-center" v-else
										@click="matchHello(item)">
										<image src="../../static/task/task_6.png" class="user-item-icon"
											mode="widthFix"></image>
										<view class="fs14 color-deep ml8">
											邀请
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
					<view class="width-full pt35 pb35"></view>
					<!-- main -->
				</view>
			</scroll-view>
		</view>
		<!-- top-left -->
		<view class="absolute top15 left15">
			<view class="pl30" style="width: 30rpx;" :style="'height:' + StatusBar + 'px;'"></view>
			<view @click="goBack">
				<image src="../../static/itsme/itsme_14.png" class="change-top-img" mode="widthFix"></image>
			</view>
		</view>
		<!-- top-left -->
		<!-- bottom -->
		<view class="absolute bottom left right pb_iphoneX_safe">
			<view class="pl15 pr15 pt25 pb25 flex">
				<view class="ml8 mr8 change-btn bg-2 flex-1 flex align-items-center flex-center" @click="getUserList">
					<view class="icon_font fs13 color-white">
						&#xe614;
					</view>
					<view class="fs13 color-white ml10">
						换一批
					</view>
				</view>
				<view class="ml8 mr8 change-btn bg-2 flex-1 flex align-items-center flex-center" @click="toMessageList">
					<view class="icon_font fs13 color-white">
						&#xe640;
					</view>
					<view class="fs13 color-white ml10">
						去聊聊
					</view>
				</view>
			</view>
		</view>
		<!-- bottom -->
		<!-- pop -->
		<u-popup v-model="showPop" safe-area-inset-bottom mode="center" border-radius="20">
			<view class="user-pop-box bg-white flex flex-col" v-if="userInfo">
				<view class="user-pop-img relative float-hidden">
					<image :src="userInfo.avatar | imageFilter" class="width-full height" mode="aspectFill"></image>
					<view class="absolute left right bottom user-pop-bg"></view>
					<view class="absolute left10 right10 bottom5">
						<view class="width-full flex align-items-center flex-between">
							<view class="flex align-items-center">
								<view class="fs16 color-white">
									{{userInfo.nickname}}
								</view>
								<image src="../../static/my/my_6.png" class="user-avatar-img ml8" mode="widthFix"
									v-if="userInfo.is_vip === 1"></image>
								<image src="../../static/my/my_7.png" class="user-avatar-img ml8" mode="widthFix"
									v-if="userInfo.is_real"></image>
							</view>
							<view class="flex align-items-center">
								<image src="../../static/index/index_11.png" class="user-avatar-img mt5"
									mode="widthFix"></image>
								<view class="user-num fs16 fw600 ml8 mr20">
									{{userInfo.worth}}
								</view>
							</view>
						</view>
						<view class="width-full mt8 flex align-items-center">
							<view class="flex align-items-center flex-1">
								<view class="user-avatar-icon">
									<image src="../../static/base/base_1.png" class="user-avatar-icon"
										mode="scaleToFill"></image>
								</view>
								<view class="width-full fs12 color-white ml8">
									{{userInfo.profession || '自由职业'}}
								</view>
							</view>
							<view class="flex align-items-center flex-1">
								<view class="user-avatar-icon">
									<image src="../../static/base/base_2.png" class="user-avatar-icon"
										mode="scaleToFill"></image>
								</view>
								<view class="width-full fs12 color-white ml8">
									{{userInfo.age}}岁
								</view>
							</view>
							<view class="flex align-items-center flex-1">
								<view class="user-avatar-icon">
									<image src="../../static/base/base_3.png" class="user-avatar-icon"
										mode="scaleToFill"></image>
								</view>
								<view class="width-full fs12 color-white ml8">
									{{Number(userInfo.distance).toFixed(0)}}km
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="flex-1 pl10 pr10 flex align-items-center flex-center" @click="matchHello">
					<image src="../../static/task/task_6.png" class="user-pop-btn-img" mode="scaleToFill"></image>
					<view class="color-666666 fw600 fs15 ml12">
						邀请
					</view>
				</view>
			</view>
		</u-popup>
		<!-- 是否存草稿 -->
		<!-- <custom-pop
			:showPop="isInvite"
			confirmText="去聊天"
			cancelText="等下聊"
			contentTitle="已选择10位喜欢的人啦~"
			:meiNv="3"
			@confirm="toJumpPage(4, '/pages/message/index')"
			@cancel="toJumpPage(2, '/pages/task/my')"
		></custom-pop> -->
		<!-- 权限弹窗 -->
		<unify-pop :showUnify="showUnifyPop" :type="unifyType" @closePop="showUnifyPop = false"
			@cancelGoNav="toJumpPage(2, '/pages/task/my')" @confirmToNav="toJumpPage(4, '/pages/message/index')">
		</unify-pop>
		<!-- 权限弹窗 -->
		<view v-if="showRedPacket">
			<red-packet></red-packet>
		</view>
	</view>
</template>

<script>
	import TaskService from '../../common/service/task-service.js'
	import UserService from '../../common/service/user-service.js'
	export default {
		data() {
			return {
				isInvite: false,
				userlist: null,
				invitelist: [],
				taskInfo: null,
				page: 1,
				ifFlip: true,
				flipIndex: 0,
				flipTime: null,
				pushCentent: '',
				showPop: false,
				userInfo: null
			}
		},
		onLoad() {
			this.init()
		},
		onUnload() {
			if (this.flipTime) {
				clearInterval(this.flipTime)
				this.flipIndex = 0
			}
		},
		computed: {
			scrollBox() {
				return 'height: ' + (this.windowHeight - this.StatusBar - uni.upx2px(420)) + 'px'
			}
		},
		methods: {
			init() {
				Object.assign(this.$data, this.$options.data())
				// 判断登录状态
				this.loginExpire().then(res => {
					if (res) {
						this.getTaskInfo()
					}
				})
			},
			getUserList() {
				if (this.flipTime) {
					clearInterval(this.flipTime)
					this.flipIndex = 0
				}
				this.ifFlip = true
				this.userlist = []
				TaskService.taskmatchlist({
					task_id: this.taskInfo.id,
					page: this.page
				}).then(res => {
					if (res.code === 1) {
						if (res.data && res.data.length > 0) {
							this.userlist = res.data.map(item => {
								item.flip = false
								return item
							})
							this.flipTime = setInterval(this.flipUser, 500)
							this.page++
						} else {
							this.page = 1
						}

					}
				})

			},
			getTaskInfo() {
				TaskService.publishingcheck().then(res => {
					if (res.code === 1 && res.data && res.data.self) {
						this.taskInfo = res.data.self
						this.getUserList()
					}
				})
			},
			//去消息列表
			toMessageList() {
				uni.switchTab({
					url: '../message/index',
				})
			},
			flipUser() {
				if (this.flipIndex < this.userlist.length) {
					this.userlist[this.flipIndex].flip = true
					this.flipIndex++
				} else {
					clearInterval(this.flipTime)
					this.flipIndex = 0
					this.ifFlip = false
				}
			},
			getUserInfo(index) {
				if (this.invitelist.indexOf(this.userlist[index].id) === -1) {
					UserService.userinfosimple({
						user_id: this.userlist[index].id,
						type: 1,
						type_id: this.taskInfo.id
					}).then(res => {
						if (res.code === 1) {
							this.userInfo = res.data
							if (res.data.certify) {
								let certify = JSON.parse(res.data.certify)
								if (certify && certify.real && certify.real.verified) {
									this.userInfo.is_real = true
								}
							}
							console.log(this.userInfo)
							this.showPop = true
						}
					})
				}
			},
			matchHello(item) {
				let userData = null
				if (item && item.id) {
					userData = item
				} else {
					userData = this.userInfo
				}
				TaskService.taskmatchhello({
					task_id: this.taskInfo.id,
					user_id: userData.id
				}).then(res => {
					if (res.code === 1) {
						console.log(res)
						this.helloOk(userData)
					} else {
						this.unifyType = 25
						this.showUnifyPop = true
						this.showPop = false
					}
				})
				this.getPushCentent()
			},
			getPushCentent() {
				TaskService.tasksay({}).then(res => {
					if (res.code === 1) {
						this.pushCentent = res.data
					}
				})
			},
			helloOk(userData) {
				let friend = {
					uuid: userData.id,
					name: userData.nickname,
					avatar: userData.avatar,
					data: {
						id: userData.id,
						age: userData.age,
						avatar: userData.avatar,
						nickname: userData.nickname
					}
				}
				let params = {
					text: this.pushCentent
				}
				this.sendImMessage('common_task', friend, params).then(
					(res) => {
						console.log('发送成功')
						this.invitelist.push(userData.id)
					},
					(err) => {
						console.log('发送失败')
						console.log(err)
					}
				)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.task-change-box {
		width: 100vw;
		height: 100vh;
	}

	.change-top-img {
		width: 30rpx;
	}

	.change-btn {
		height: 80rpx;
		line-height: 80rpx;
		border-radius: 80rpx;
	}

	.user-item-img {
		width: calc((100vw - 204rpx) / 2);
		height: calc((100vw - 204rpx) / 2);
	}

	.user-item-icon {
		width: 30rpx;
	}

	.user-item-box {
		transition: 0.5s;
		transform-style: preserve-3d;
		width: calc((100vw - 204rpx) / 2);
		height: calc((100vw - 204rpx) / 2 + 70rpx);
	}

	.user-item-box.flip-up {
		transition: 0.5s;
		transform-style: preserve-3d;
	}

	.user-item-box.flip-down {
		transition: 0s;
		transform-style: preserve-3d;
		transform: rotateY(-180deg);
	}

	.flip-mask {
		position: relative;
		filter: blur(40rpx);
		user-select: none;
	}

	.flip-mask::after {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		content: '';
		display: block;
		background: rgba(0, 0, 0, 0.6);
	}

	.user-pop-box {
		width: 540rpx;
		height: 640rpx;
	}

	.user-pop-img {
		width: 540rpx;
		height: 540rpx;
	}

	.user-pop-btn {
		height: 80rpx;
		border-radius: 80rpx;
		box-shadow: 0 0 8rpx #EEEEEE
	}

	.user-pop-btn-img {
		width: 49rpx;
		height: 41rpx;
	}

	.user-pop-bg {
		height: 110rpx;
		background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8));
	}

	.user-avatar-img {
		width: 24rpx;
	}

	.user-num {
		background-image: linear-gradient(to bottom, #FFCC00, #F48630);
		-webkit-background-clip: text;
		/*必需加前缀 -webkit- 才支持这个text值 */
		-webkit-text-fill-color: transparent;
		/*text-fill-color会覆盖color所定义的字体颜色： */
	}

	.user-avatar-icon {
		width: 28rpx;
		height: 28rpx;
	}
</style>
