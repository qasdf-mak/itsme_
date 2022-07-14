<template>
	<view class="width-full mintabh100vh bg-itsme-1">
		<view class="width-full">
			<!-- top -->
			<view class="width-full bg-itsme-1">
				<view class="fixed top left right bg-itsme-1" style="z-index: 999999;">
					<view class="width-full" :style="'height:' + StatusBar + 'px;'"></view>
					<view class="width-full top-nav-box">
						<view class="ml20 mr20 flex align-items-center flex-center">
							<view class="itsme-home-tab" style="width: 300rpx;">
								<u-tabs :list="tabList" :is-scroll="false" inactive-color="#9E9E9F" font-size="36"
									height="100" bg-color="" bar-height="8" bar-width="40" active-color="#D97DB0"
									:current="tabCurrent" @change="changeTabs"></u-tabs>
							</view>
						</view>
					</view>
				</view>
				<view class="width-full">
					<view class="width-full" :style="'height:' + StatusBar + 'px;'"></view>
					<view class="width-full top-nav-box bg-itsme-1"></view>
				</view>
			</view>
			<!-- top -->
			<view class="width-full">
				<view class="width-full" v-if="tabCurrent === 0 && showMsg">
					<view v-for="(item,index) in allList" :key="index">
						<view class="">
							<message-list :item="item" :index="index" @delList="delList(index)"
								@changeTopSuccess="changeTopSuccess('top', index)"></message-list>
						</view>
						<!-- <view class="" v-else>
							<message-list :item="item" @changeTopSuccess="changeTopSuccess('top', index)"
								@delList="delList('top', index)"></message-list>
						</view> -->
					</view>
					<view class="width-full" v-if="allList && allList.length === 0">
						<empty-tip type="life"></empty-tip>
					</view>
				</view>
				<view class="width-full" v-if="tabCurrent === 1">
					<view class="ml20 mr20 pb20" v-if="isNewMessage">
						<!-- 系统通知 -->
						<view class="width-full flex align-items-center mt15 mb15" v-if="systemData"
							@click="toDetail(1)">
							<view class="system-left-box bg-itsme-4 flex align-items-center flex-center">
								<image src="../../static/itsme/its_17.png" class="system-left-item" mode="widthFix">
								</image>
							</view>
							<view class="flex-1 ml20">
								<view class="width-full flex align-items-center flex-between">
									<view class="fs15 color-white fw600">
										系统通知
									</view>
									<view class="fs12 color-itsme-10">
										{{systemData.time | formatTime}}
									</view>
								</view>
								<view class="width-full flex align-items-center mt12">
									<view class="flex-1 nowrap1 fs14 color-shallow">
										{{systemDataText === '' ? '暂无通知' : systemDataText}}
									</view>
									<view class="num-box fs10 color-white text-center" v-if="systemData.num > 0">
										{{systemData.num}}
									</view>
								</view>
							</view>
						</view>
						<!-- 点赞通知 -->
						<view class="width-full flex align-items-center mt15 mb15" v-if="zanData" @click="toDetail(2)">
							<view class="system-left-box bg-itsme-4 flex align-items-center flex-center">
								<image src="../../static/itsme/its_18.png" class="system-left-item" mode="widthFix">
								</image>
							</view>
							<view class="flex-1 ml20">
								<view class="width-full flex align-items-center flex-between">
									<view class="fs15 color-white fw600">
										点赞
									</view>
									<view class="fs12 color-itsme-10">
										{{zanData.time | formatTime}}
									</view>
								</view>
								<view class="width-full flex align-items-center mt12">
									<view class="flex-1 nowrap1 fs14 color-shallow">
										{{zanData.text}}
									</view>
									<view class="num-box fs10 color-white text-center" v-if="zanData.num > 0">
										{{zanData.num}}
									</view>
								</view>
							</view>
						</view>

					</view>
					<!-- 没有通知 -->
					<view class="width-full" v-else>
						<empty-tip type="life"></empty-tip>
					</view>
				</view>
			</view>
		</view>
		<view v-if="showRedPacket">
			<red-packet @comeMessage="comeMessage" @setListTop="setListTop"></red-packet>
		</view>
	</view>
</template>

<script>
	import ChatService from '../../common/service/chat-service.js'
	import messageList from '../../components/message/list.vue'
	import updateUser from '../../common/mixins/login.js'
	export default {
		mixins: [updateUser],
		data() {
			return {
				tabList: [{
						name: '消息',
						count: 0
					},
					{
						name: '系统',
						count: 0
					}
				],
				showPush: true,
				tabCurrent: 0,
				allList: null, // 全部消息
				getSystemList: [],
				systemData: null,
				systemDataText: '',
				showMsg: false,
				zanData: null
			}
		},
		components: {
			messageList
		},
		onPullDownRefresh() {
			this.getMessage()
			this.getChatNum()
		},
		onLoad() {
			this.init()
		},
		onShow() {
			console.log('11111111111111111111111111111')
			console.log(this.allList)
			this.getMessage()
			this.getSystem()
			setTimeout(() => {
				this.getChatNum()
			}, 500)
			this.getUserSystemPushDetail()
		},
		filters: {
			formatTime(time) {
				let value = ''
				let nowtime = new Date(new Date().toLocaleDateString()).getTime()
				let lasttime = 0
				if (String(time).length === 10) {
					lasttime = time * 1000
				} else {
					lasttime = time
				}
				let month = new Date(lasttime).getMonth() + 1
				if (month < 10) {
					month = '0' + month
				}
				let day = new Date(lasttime).getDate()
				if (day < 10) {
					day = '0' + day
				}
				let hour = new Date(lasttime).getHours()
				if (hour < 10) {
					hour = '0' + hour
				}
				let minute = new Date(lasttime).getMinutes()
				if (minute < 10) {
					minute = '0' + minute
				}
				if (time > nowtime) {
					value = hour + ':' + minute
				} else {
					value = month + '-' + day + ' ' + ' ' + hour + ':' + minute
				}
				return value
			}
		},
		computed: {
			isNewMessage() {
				if (this.systemData || this.zanData) {
					return true
				} else {
					return false
				}
			}
		},
		methods: {
			init() {
				Object.assign(this.$data, this.$options.data())
				this.loginExpire().then(res => {
					if (res) {
						console.log('11111111111111111111111111111')
						this.getMessage()
						this.getSystem()
						this.getChatNum()
						this.getUserSystemPushDetail()
					}
				})
			},
			//获取系统数据的最后一条
			getUserSystemPushDetail() {
				ChatService.usersystempushdetail({
					type: 1
				}).then(res => {
					if (res.code === 1 && res.data.length >= 1) {
						console.log(res.data[0])
						if (res.data[0].type === 7) {
							this.systemDataText = JSON.parse(res.data[0].text).text
						} else {
							this.systemDataText = res.data[0].text
						}
					}
				})
			},
			// tab切换
			changeTabs(index) {
				this.tabCurrent = index
				this.tabList[index].count = 0
			},
			// 加载会话列表
			getMessage() {
				//加载会话列表
				// this.allList = []
				console.log('刷新列表')
				ChatService.chatusernumlist().then(res => {
					if (res.code === 1) {
						uni.stopPullDownRefresh()
						this.allList = res.data
						this.showMsg = true
					}
				})
			},
			// tab 红点提示
			getChatNum() {
				console.log('重新加载角标')
				ChatService.chatnum().then(res => {
					if (res.code === 1) {
						if (res.data.total > 0) {
							console.log(res.data.total)
							this.loadSubscript(res.data.total)
							if (res.data.chat_num > 0 || res.data.system_push_num > 0) {
								this.setListTop(res.data.chat_num, res.data.system_push_num)
							}
						} else {
							uni.removeTabBarBadge({
								index: 2
							})
						}
					}
				})
			},

			// 加载系统列表
			getSystem() {
				ChatService.usersystempushlist().then(res => {
					if (res.code === 1) {
						this.tabList[1].count = res.data.total
						this.getSystemList = res.data
						if (res.data && res.data.system) {
							this.systemData = res.data.system
						}
						if (res.data && res.data.zan) {
							this.zanData = res.data.zan
						}
					}
				})
			},
			// 接收新消息
			comeMessage(friendId, message) {
				this.getMessage()
				this.getSystem()
			},
			// 设置头部红点
			setListTop(chat, system) {
				if (this.tabCurrent === 0) {
					this.tabList[1].count = system
				} else {
					this.tabList[0].count = chat
				}
			},
			// 删除聊天
			delList(index) {
				this.allList.splice(index, 1)
			},
			// 置顶
			changeTopSuccess() {
				this.getMessage()
			},
			// 打开推送
			// toOpenPush() {
			// 	ChatService.openclosesystempush({
			// 		type: 1
			// 	}).then(res => {
			// 		if (res.code === 1) {
			// 			this.updateUser().then(() => {
			// 				console.log('更新用户信息')
			// 				this.$forceUpdate()
			// 			})
			// 		}
			// 	})
			// },
			toDetail(index) {
				ChatService.usersystempushdetail({
					type: index
				}).then(res => {
					console.log('标记为已读成功')
					uni.navigateTo({
						url: '/pages/message/detail?type=' + index
					})
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.top-nav-box {
		height: 100rpx;
	}

	.top-nav-left {
		width: 62rpx;
	}

	.top-push-box {
		height: 65rpx;
		background: #F28D7F;
	}

	.top-push-btn {
		color: #FFE035;
	}

	.system-left-box {
		width: 120rpx;
		height: 120rpx;
		border-radius: 120rpx;
		overflow: hidden;
	}

	.num-box {
		width: 36rpx;
		height: 36rpx;
		line-height: 36rpx;
		border-radius: 36rpx;
		background: #FF5050;
	}

	.black-no-img {
		margin-top: 200rpx;
		width: 280rpx;
	}

	.system-left-item {
		width: 50rpx;
		height: 50rpx;
	}
</style>
