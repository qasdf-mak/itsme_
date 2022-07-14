<template>
<view class="width-full lh1 bg-white">
	<!-- 自己的Me约 -->
	<view class="width-full bg-white" v-if="selfTask && selfStatus">
		<view class="pl15 pr15 ">
			<view class="width-full pt10"></view>
			<!-- 展开状态-->
			<view class="width-full" v-if="showSelfMore">
				<view class="width-full">
					<!-- 头像交互 -->
					<view class="width-full task-user-box relative">
						<view class="ml35 mr35">
							<view class="width-full text-center pt10 fs15 fw600 color-deep" v-if="selfStatus === 'isInvitation'">
								<text>收到</text>
								<text class="ml5">{{selfTask.type_id | typeName}}</text>
								<text class="ml5">邀请</text>
							</view>
							<view class="width-full text-center pt10 fs15 fw600 color-deep" v-else>
								<text>Ta报名参加</text>
								<text class="ml5">{{selfTask.type_id | typeName}}</text>
							</view>
							<view class="width-full mt5 task-user-line relative">
								<view class="absolute top bottom left right flex align-items-center">
									<image src="../../static/task/task_7.png" class="width-full" mode="widthFix"></image>
								</view>
								<view class="absolute top bottom left right flex align-items-center flex-center">
									<image src="../../static/task/task_8.png" class="task-img-1" mode="widthFix" v-if="selfStatus === 'isInvitation'"></image>
									<image src="../../static/task/task_9.png" class="task-img-1" mode="widthFix" v-else></image>
								</view>
							</view>
						</view>
						<view class="task-user-avatar absolute left top">
							<image :src="friend.avatar | imageFilter('m11')" class="task-user-avatar" mode="scaleToFill"></image>
						</view>
						<view class="task-user-avatar absolute right top">
							<image :src="user.avatar | imageFilter('m11')" class="task-user-avatar" mode="scaleToFill"></image>
						</view>
					</view>
					<!-- 头像交互 -->
					<view class="width-full mt15">
						<view class="ml15 mr15">
							<view class="width-full flex align-items-center mb10">
								<view class="fs14 color-shallow">
									地&#8195;点：
								</view>
								<view class="flex-1 nowrap1 fs14 color-deep">
									{{selfTask.address}}
								</view>
							</view>
							<view class="width-full flex align-items-center mb10">
								<view class="fs14 color-shallow">
									时&#8195;间：
								</view>
								<view class="flex-1 nowrap1 fs14 color-deep">
									{{selfTask.start_time | dateFilter(1, '.')}} - {{selfTask.end_time | dateFilter(1, '.')}}
								</view>
							</view>
							<view class="width-full flex align-items-center mb10">
								<view class="fs14 color-shallow mb15">
									见面礼：
								</view>
								<view class="flex-1 flex flex-wrap" v-if="selfTask && selfTask.gift_list && selfTask.gift_list.length > 0">
									<view v-for="(item,index) in selfTask.gift_list" :key="index">
										<view class="task-gift-item mr20 mb15 flex align-items-center">
											<image :src="item.icon  | imageFilter('m11')" class="task-gift-img" mode="widthFix"></image>
											<view class="fs12 color-deep ml8">
												×{{item.num}}
											</view>
										</view>
									</view>
								</view>
							</view>
						</view>
						<view class="width-full">
							<view class="width-full flex align-items-center flex-center" v-if="selfStatus === 'isSign'">
								<view class="flex-1 mr15 task-cent-btn bg-2 text-center color-white" @click="confirmSign">
									确认
								</view>
								<view class="flex-1 task-cent-btn bg-2 text-center color-white" @click="delSign">
									下次吧
								</view>
							</view>
							<view class="width-full flex align-items-center flex-center" v-if="selfStatus === 'isInvitation'">
								<view class="icon_font color-main6 fs14 mr10">
									&#xe639;
								</view>
								<view class="fs14 task-cent-btn color-deep">
									邀请已发送 等待对方接受邀请
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 缩回状态-->
			<view class="width-full" v-else>
				<view class="width-full flex align-items-center task-top" v-if="selfStatus === 'isSign'">
					<view class="flex-1 fs14 color-deep">
						您有一条<text class="ml5 mr5 fw600">{{selfTask.type_id | typeName}}</text> 报名待处理
					</view>
					<view class="task-btn-1 bg-2 color-white fs14 pl20 pr20" @click="confirmSign">
						通过报名
					</view>
				</view>
				<view class="width-full flex align-items-center flex-center task-top" v-if="selfStatus === 'isInvitation'">
					<view class="fs14 color-deep fw600 mr5">
						{{selfTask.type_id | typeName}}
					</view>
					<view class="fs14 color-deep">
						邀请已发送 等待对方接受邀请
					</view>
				</view>
			</view>
		</view>
		<view class="width-auto task-bot-box flex align-items-center flex-center" @click="changeSelfMore">
			<view class="icon_font fs14 color-shallow" v-if="showSelfMore">
				&#xe776;
			</view>
			<view class="icon_font fs14 color-shallow" v-else>
				&#xe61f;
			</view>
		</view>
	</view>
	<view class="width-full bg-white" v-if="friendTask">
		<view class="pl15 pr15 ">
			<view class="width-full pt10"></view>
			<!-- 展开状态-->
			<view class="width-full" v-if="showFriendMore">
				<view class="width-full">
					<!-- 头像交互 -->
					<view class="width-full task-user-box relative">
						<view class="ml35 mr35">
							<view class="width-full text-center pt10 fs15 fw600 color-deep" v-if="friendStatus === 'isInvitation'">
								<text>收到</text>
								<text class="ml5">{{friendTask.type_id | typeName}}</text>
								<text class="ml5">邀请</text>
							</view>
							<view class="width-full text-center pt10 fs15 fw600 color-deep" v-else>
								<text>报名参加</text>
								<text class="ml5">{{friendTask.type_id | typeName}}</text>
							</view>
							<view class="width-full mt5 task-user-line relative">
								<view class="absolute top bottom left right flex align-items-center">
									<image src="../../static/task/task_7.png" class="width-full" mode="widthFix"></image>
								</view>
								<view class="absolute top bottom left right flex align-items-center flex-center">
									<image src="../../static/task/task_9.png" class="task-img-1" mode="widthFix" v-if="friendStatus === 'isInvitation'"></image>
									<image src="../../static/task/task_8.png" class="task-img-1" mode="widthFix" v-else></image>
								</view>
							</view>
						</view>
						<view class="task-user-avatar absolute left top">
							<image :src="friend.avatar | imageFilter('m11')" class="task-user-avatar" mode="scaleToFill"></image>
						</view>
						<view class="task-user-avatar absolute right top">
							<image :src="user.avatar | imageFilter('m11')" class="task-user-avatar" mode="scaleToFill"></image>
						</view>
					</view>
					<!-- 头像交互 -->
					<view class="width-full mt15">
						<view class="ml15 mr15">
							<view class="width-full flex align-items-center mb10">
								<view class="fs14 color-shallow">
									地&#8195;点：
								</view>
								<view class="flex-1 nowrap1 fs14 color-deep">
									{{friendTask.address}}
								</view>
							</view>
							<view class="width-full flex align-items-center mb10">
								<view class="fs14 color-shallow">
									时&#8195;间：
								</view>
								<view class="flex-1 nowrap1 fs14 color-deep">
									{{friendTask.start_time | dateFilter(1, '.')}} - {{friendTask.end_time | dateFilter(1, '.')}}
								</view>
							</view>
							<view class="width-full flex align-items-center mb10">
								<view class="fs14 color-shallow mb15">
									见面礼：
								</view>
								<view class="flex-1 flex flex-wrap" v-if="friendTask && friendTask.gift_list && friendTask.gift_list.length > 0">
									<view v-for="(item,index) in friendTask.gift_list" :key="index">
										<view class="task-gift-item mr20 mb15 flex align-items-center">
											<image :src="item.icon  | imageFilter('m11')" class="task-gift-img" mode="widthFix"></image>
											<view class="fs12 color-deep ml8">
												×{{item.num}}
											</view>
										</view>
									</view>
								</view>
							</view>
						</view>
						<view class="width-full">
							<view class="width-full flex align-items-center" v-if="friendStatus === ''">
								<view class="flex-1 task-cent-btn bg-2 text-center color-white" @click="signUp">
									报名
								</view>
							</view>
							<view class="width-full flex align-items-center flex-center" v-if="friendStatus === 'isSign'">
								<view class="icon_font color-main6 fs14 mr10">
									&#xe639;
								</view>
								<view class="fs14 task-cent-btn color-deep">
									已报名 等待对方通过
								</view>
							</view>
							<view class="width-full flex align-items-center" v-if="friendStatus === 'isInvitation'">
								<view class="flex-1 mr15 task-cent-btn bg-2 text-center color-white" @click="confirmInvitation">
									接受邀请
								</view>
								<view class="flex-1 task-cent-btn bg-2 text-center color-white" @click="delSign">
									下次吧
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 缩回状态-->
			<view class="width-full" v-else>
				<view class="width-full flex align-items-center task-top" v-if="friendStatus === ''">
					<view class="flex-1 fs14 color-deep">
						Ta有<text class="ml5 mr5 fw600">{{friendTask.type_id | typeName}}</text> Me约发布中
					</view>
					<view class="task-btn-1 bg-2 color-white fs14 pl20 pr20" @click="signUp">
						报名
					</view>
				</view>
				<view class="width-full flex align-items-center flex-center task-top" v-if="friendStatus === 'isSign'">
					<view class="fs14 color-deep fw600 mr10">
						普通聚餐
					</view>
					<view class="fs14 color-deep">
						已报名&#12288;等待对方通过
					</view>
				</view>
				<view class="width-full flex align-items-center task-top" v-if="friendStatus === 'isInvitation'">
					<view class="flex-1 fs14 color-deep">
						您有一条<text class="ml5 mr5 fw600">{{friendTask.type_id | typeName}}</text> 邀请待处理
					</view>
					<view class="task-btn-1 bg-2 color-white fs14 pl20 pr20" @click="confirmInvitation">
						接受邀请
					</view>
				</view>
			</view>
		</view>
		<view class="width-auto task-bot-box flex align-items-center flex-center" @click="changeFriendMore">
			<view class="icon_font fs14 color-shallow" v-if="showFriendMore">
				&#xe776;
			</view>
			<view class="icon_font fs14 color-shallow" v-else>
				&#xe61f;
			</view>
		</view>
	</view>
</view>
</template>

<script>
	import { mapGetters } from 'vuex'
	import TaskService from '../../common/service/task-service.js'
	export default {
		name: 'task-box',
		data() {
			return {
				imService : null
			}
		},
		props: {
			friend: Object,
			selfTask: Object,
			friendTask: Object,
			showFriendMore: Boolean,
			showSelfMore:Boolean
		},
		filters: {
			typeName(type) {
				if (type === 1) {
					return '普通聚餐'
				}
				if (type === 2) {
					return '休闲旅行'
				}
				if (type === 3) {
					return '玩游戏'
				}
				if (type === 4) {
					return '社交聚会'
				}
				if (type === 5) {
					return '健康运动'
				}
			}
		},
		computed: {
			...mapGetters(['user']),
			// 自己的Me约
			selfStatus() {
				let isSign = this.friend && this.selfTask && this.selfTask.baoming_list && this.selfTask.baoming_list.length > 0 && this.selfTask.baoming_list.indexOf(this.friend.uuid) !== -1
				let isInvitation = this.friend && this.selfTask && this.selfTask.yaoqing_list && this.selfTask.yaoqing_list.length > 0 && this.selfTask.yaoqing_list.indexOf(this.friend.uuid) !== -1
				// 已报名
				if (isSign) {
					return 'isSign'
				} else {
					// 被邀请
					if (isInvitation) {
						return 'isInvitation'
					} else {
						// 未报名未邀请
						return ''
					}
				}
			},
			// 对方的Me约
			friendStatus() {
				let isSign = this.friend && this.friendTask && this.friendTask.baoming_list && this.friendTask.baoming_list.length > 0 && this.friendTask.baoming_list.indexOf(this.user.id) !== -1
				let isInvitation = this.friend && this.friendTask && this.friendTask.yaoqing_list && this.friendTask.yaoqing_list.length > 0 && this.friendTask.yaoqing_list.indexOf(this.user.id) !== -1
				// 已报名
				if (isSign) {
					return 'isSign'
				} else {
					// 被邀请
					if (isInvitation) {
						return 'isInvitation'
					} else {
						// 未报名未邀请
						return ''
					}
				}
			}
		},
		mounted() {
			this.imService = getApp().globalData.imService
		},
		methods: {
			// 展开缩回
			changeSelfMore() {
				this.$emit('changeSelfMore')
			},
			changeFriendMore() {
				this.$emit('changeFriendMore')
			},
			// 报名
			signUp() {
				TaskService.taskstatecheck({
					type: 1,
					task_id: this.friendTask.id,
					user_id: this.user.id
				}).then(res => {
					if (res.code === 1) {
						this.sendTask('toSign')
					}
				})
			},
			// 确认报名
			confirmSign() {
				TaskService.taskmatchuser({
					task_id: this.selfTask.id,
					user_id: this.friend.uuid
				}).then(res => {
					if (res.code === 1) {
						this.sendTask('signSuccess')
					}
				})
			},
			// 接受邀请
			confirmInvitation() {
				TaskService.taskmatchuser({
					task_id: this.friendTask.id,
					user_id: this.user.id
				}).then(res => {
					if (res.code === 1) {
						this.sendTask('invitationSuccess')
					}
				})
			},
			sendTask(type) {
				let params = {
					type: type
				}
				this.sendImMessage('task', this.friend, params).then(
					(res) => {
						console.log('发送成功')
						this.content = ""
						this.$emit('sendSuccess', res)
					},
					(err) => {
						console.log('发送失败')
						console.log(err)
					}
				)
			},
			//下次吧
			delSign(){
				uni.showToast({
					title:'功能暂未开放',
					icon:'none'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.task-top{
		height: 50rpx;
	}
	.task-bot-box{
		height: 40rpx;
	}
	.task-btn-1{
		height: 50rpx;
		line-height: 48rpx;
		border-radius: 50rpx;
	}
	.task-user-box{
		height: 90rpx;
	}
	.task-user-avatar{
		width: 90rpx;
		height: 90rpx;
		border-radius: 90rpx;
	}
	.task-user-line{
		height: 25rpx;
	}
	.task-img-1{
		width: 36rpx;
	}
	.task-cent-btn{
		height: 70rpx;
		line-height: 68rpx;
		border-radius: 70rpx;
	}
	.task-gift-item{
		width: 120rpx;
		height: 60rpx;
	}
	.task-gift-img{
		width: 60rpx;
		height: 60rpx;
	}
</style>
