<template>
	<view class="width-full lh1 bg-white">
		<!-- 用户信息 -->
		<view class="width-full task-top-box">
			<view class="pl20 pr20 height flex align-items-center" v-if="userInfo" @click="toHome">
				<view class="user-avatar">
					<image :src="userInfo.avatar | imageFilter('m11')" class="width-full" mode="widthFix"></image>
				</view>
				<view class="flex-1 ml25 mr20">
					<view class="width-full">
						<view class="width-full nowrap1 fs14 fw600 color-deep">
							{{userInfo.nickname}}
						</view>
					</view>
					<view class="width-full mt8 flex align-items-center">
						<view class="flex align-items-center">
							<image src="../../static/base/base_1.png" class="user-img-1" mode="widthFix"></image>
							<view class="fs13 color-666666 ml8">
								{{userInfo.profession || '自由职业者'}}
							</view>
						</view>z
						<view class="flex align-items-center ml15">
							<image src="../../static/base/base_2.png" class="user-img-1" mode="widthFix"></image>
							<view class="fs13 color-666666 ml8">
								{{userInfo.age}}岁
							</view>
						</view>
					</view>
				</view>
				<view class="flex align-items-center">
					<image src="../../static/base/base_6.png" class="user-img-2" mode="widthFix"></image>
					<view class="worth-box fs24 fw600 ml5">
						{{userInfo.worth}}
					</view>
				</view>
			</view>
		</view>
		<!-- 用户信息 -->
		<!-- Me约信息 -->
		<view class="ml15 mr15 box-shadow-1 pt15 pb15 pl15 pr15 br10" v-if="taskInfo">
			<view class="width-full flex align-items-start">
				<view class="flex-1 mr30 task-gift-box">
					<view class="ml18 fs18 fw600 color-deep">
						{{taskInfo.other_gift ? '见面礼' : '面议'}}
					</view>
					<view class="width-full flex align-items-center mt15" v-if="taskInfo.other_gift">
						<view class="task-dian mr15 mb15"></view>
						<view class="flex-1 flex align-items-center flex-wrap"
							v-if="taskInfo && taskInfo.gift && taskInfo.gift.length > 0">
							<view v-for="(item,index) in taskInfo.gift" :key="index">
								<view class="task-gift-item mr30 mb15 flex align-items-center">
									<image :src="item.icon | imageFilter('m11')" class="task-gift-img" mode="widthFix">
									</image>
									<view class="fs12 color-deep ml8">
										×{{item.num}}
									</view>
								</view>
							</view>
						</view>
					</view>
					<view class="width-full flex align-items-center mt15" v-if="taskInfo && taskInfo.other_gift">
						<view class="task-dian mr15 mb15"></view>
						<view class="flex-1 mb15 fs13 lh15 fw600 color-deep">
							{{taskInfo.other_gift}}
						</view>
					</view>
				</view>
				<view class="task-img-box br5 relative" v-if="taskImg" @click="previewImage">
					<image :src="taskImg.url | imageFilter('m11')" class="width-full" mode="widthFix"></image>
					<view class="task-img-num absolute bottom right flex align-items-center flex-center"
						v-if="taskImg.num > 1">
						<view class="color-white fs10">
							{{taskImg.num}}
						</view>
					</view>
				</view>
			</view>
			<view class="width-full mt15">
				<view class="width-full">
					<view class="ml18 fs18 fw600 color-deep mb15">
						{{taskInfo.task_type}}
					</view>
					<!-- 名称 -->
					<view class="width-full flex align-items-start" v-if="taskInfo.name">
						<view class="task-dian mt10 mr15 mb10"></view>
						<view class="flex-1 mb10 flex align-items-start">
							<view class="fs14 lh15 color-middle">
								标题：
							</view>
							<view class="flex-1 fs14 color-deep fw600 lh15">
								{{taskInfo.name}}
							</view>
						</view>
					</view>
					<!-- 地点 -->
					<view class="width-full flex align-items-start" v-if="taskInfo.address">
						<view class="task-dian mt10 mr15 mb10"></view>
						<view class="flex-1 mb10 flex align-items-start">
							<view class="fs14 lh15 color-middle">
								地点：
							</view>
							<view class="flex-1 fs14 color-deep fw600 lh15">
								{{taskInfo.address}}
							</view>
						</view>
					</view>
					<!-- 时间 -->
					<view class="width-full flex align-items-start" v-if="taskInfo.start_time && taskInfo.end_time">
						<view class="task-dian mt10 mr15 mb10"></view>
						<view class="flex-1 mb10 flex align-items-start">
							<view class="fs14 lh15 color-middle">
								时间：
							</view>
							<view class="flex-1 fs14 color-deep fw600 lh15">
								{{taskInfo.start_time | dateFilter(1, '.')}} -
								{{taskInfo.end_time | dateFilter(1, '.')}}
							</view>
						</view>
					</view>
					<!-- 描述 -->
					<!-- 		<view class="width-full flex align-items-start" v-if="taskInfo.content">
						<view class="task-dian mt10 mr15 mb10"></view>
						<view class="flex-1 mb10 flex align-items-start">
							<view class="fs14 lh15 color-middle">
								描述：
							</view>
							<view class="flex-1 fs14 color-deep fw600 lh15">
								{{taskInfo.content}}
							</view>
						</view>
					</view> -->
					<!-- 费用 -->
					<view class="width-full flex align-items-start" v-if="taskInfo.cost_type">
						<view class="task-dian mt10 mr15 mb10"></view>
						<view class="flex-1 mb10 flex align-items-start">
							<view class="fs14 lh15 color-middle">
								费用：
							</view>
							<view class="flex-1 fs14 color-deep fw600 lh15">
								{{taskInfo.cost_type | taskCostFilter}}
							</view>
						</view>
					</view>
				</view>
				<view class="width-full mt15">
					<view class="ml18 fs18 fw600 color-deep mb15">
						要求
					</view>
					<!-- 期望对象 -->
					<view class="width-full flex align-items-start" v-if="qwdxData">
						<view class="task-dian mt10 mr15 mb10"></view>
						<view class="flex-1 mb10 flex align-items-start">
							<view class="fs14 lh15 color-middle">
								期望对象：
							</view>
							<view class="flex-1 fs14 color-deep fw600 lh15">
								{{qwdxData}}
							</view>
						</view>
					</view>
					<!-- 性格要求 -->
					<!-- <view class="width-full flex align-items-start" v-if="xgyqData">
						<view class="task-dian mt10 mr15 mb10"></view>
						<view class="flex-1 mb10 flex align-items-start">
							<view class="fs14 lh15 color-middle">
								性格要求：
							</view>
							<view class="flex-1 fs14 color-deep fw600 lh15">
								{{xgyqData}}
							</view>
						</view>
					</view> -->
					<!-- 年龄-->
					<view class="width-full flex align-items-start">
						<view class="task-dian mt10 mr15 mb10"></view>
						<view class="flex-1 mb10 flex align-items-start">
							<view class="fs14 lh15 color-middle">
								年龄：
							</view>
							<view class="flex-1 fs14 color-deep fw600 lh15">
								{{taskInfo.age || '18-60'}}
							</view>
						</view>
					</view>
					<!-- 是否允许带他人 -->
					<view class="width-full flex align-items-start">
						<view class="task-dian mt10 mr15 mb10"></view>
						<view class="flex-1 mb10 flex align-items-start">
							<view class="fs14 lh15 color-middle">
								是否允许带他人：
							</view>
							<view class="flex-1 fs14 color-deep fw600 lh15">
								{{taskInfo.others ? taskInfo.others_num + '人' : '不允许'}}
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- Me约信息 -->
		<view class="mt25 ml15 mr15">
			<view class="width-full task-bot-btn bg-2 flex align-items-center flex-center" @click="toChat(userInfo.id)">
				<view class="color-white fs18">
					聊一下
				</view>
			</view>
		</view>
		<view class="width-full pt35 pt35 pb_iphoneX_safe"></view>
		<!-- 会员权限 -->
		<member-pop :showPop="showMemberPop" :member="memberData" popType="look" @closePop="showMemberPop = false">
		</member-pop>
		<!-- 会员权限 -->
		<!-- 完善资料 -->
		<view class="width-full" v-if="showPerfectPop">
			<perfect-pop @refreshTheList="refreshTheList" @closePerfectPop="toHidePerfectPop">
			</perfect-pop>
		</view>
		<!-- 完善资料 -->
		<!-- 充值vip弹框 -->
		<member-pay :showMemberPay="showMemberPay" :powerData="powerData" :centent="memberCentent"
			@closePop="showMember(powerData)" @paySuccess="showMemberPay = false">
		</member-pay>
		<view v-if="showRedPacket">
			<red-packet></red-packet>
		</view>
	</view>
</template>

<script>
	import {
		mapGetters
	} from 'vuex'
	import TaskService from '../../common/service/task-service.js'
	import UserService from '../../common/service/user-service.js'
	import {
		formatImage
	} from '../../common/utils/common-methods'
	import homePower from '../../components/common/homePower.vue'
	export default {
		data() {
			return {
				userId: 0,
				taskId: 0,
				taskInfo: null,
				userInfo: null,
				showMemberPay: false,
				memberCentent: '',
				// 会员权限弹框
				showMemberPop: false,
				showPower: false,
				powerData: null,
				isLogin: false, // 登录状态
				memberData: {
					look: 0,
					total: 0
				}
			}
		},
		onLoad(options) {
			this.init(options)
		},
		computed: {
			...mapGetters(['user']),
			taskImg() {
				if (this.taskInfo && this.taskInfo.img && this.taskInfo.img.length > 0) {
					let images = {
						images: this.taskInfo.img,
						url: this.taskInfo.img[0].url,
						num: this.taskInfo.img.length
					}
					return images
				} else {
					return null
				}
			},
			qwdxData() {
				if (this.taskInfo && this.taskInfo.qwdx && this.taskInfo.qwdx.length > 0) {
					let qwdx = this.taskInfo.qwdx.join(' ')
					return qwdx
				} else {
					return null
				}
			},
			xgyqData() {
				if (this.taskInfo && this.taskInfo.xgyq && this.taskInfo.xgyq.length > 0) {
					let xgyq = this.taskInfo.xgyq.join(' ')
					return xgyq
				} else {
					return null
				}
			}
		},
		watch: {
			powerData() {
				if (this.powerData.look >= this.powerData.total) {
					console.log(123)
					return this.memberCentent = ' 您今天的次数已经用完了 非会员每日只能查看' + this.powerData.total + '位用户 '

				} else {
					console.log(321)
					let number = this.powerData.total - this.powerData.look
					return this.memberCentent = '您今天还能查看' + number + '位用户  非会员每日只能查看' + this.powerData.total + '位用户   '
				}
			}
		},
		components: {
			homePower
		},
		methods: {
			init(options) {
				Object.assign(this.$data, this.$options.data())
				this.loginExpire().then(res => {
					this.isLogin = res
				})
				this.userId = options.userid
				this.taskId = options.taskid
				this.getTaskInfo()
				this.getUserInfo()
			},
			// 获取用户信息
			getUserInfo() {
				UserService.userinfosimple({
					user_id: this.userId
				}).then(res => {
					if (res.code === 1) {
						this.userInfo = res.data
						console.log(this.userInfo)
					}
				})
			},
			// 获取Me约详情
			getTaskInfo() {
				TaskService.taskinfo({
					task_id: this.taskId
				}).then(res => {
					if (res.code === 1) {
						this.taskInfo = res.data
					}
				})
			},
			// 图片预览
			previewImage() {
				console.log(this.taskImg)
				let images = this.taskImg.images.map(item => {
					return formatImage(item.url)
				})
				if (this.taskImg && this.taskImg.num > 1) {
					uni.previewImage({
						urls: images,
						longPressActions: {
							itemList: ['']
						}
					})
				}
			},
			//聊一下
			toChat(id) {
				let userIsReal = false
				if (this.user.certify) {
					let certify = JSON.parse(this.user.certify)
					userIsReal = certify.real && certify.real.verified
				}
				// 女性非真人点击喜欢提示去真人认证
				if (this.user.gender === 0 && !userIsReal) {
					this.toShowPerfectPop()
					return false
				}
				// 同性不能点击喜欢
				if (this.user.gender === this.userInfo.gender) {
					uni.showToast({
						title: '同性不能点击喜欢',
						icon: 'none'
					})
					return false
				}
				this.toOpenChat('task-detail', id)
			},
			// 去用户主页
			toHome() {
				if (this.userInfo.id !== this.user.id) {
					if (this.isLogin) {
						this.toUserHome('list', this.userInfo.id).then(res => {
							if (res.data.code === 200) {
								uni.navigateTo({
									url: '/pages/itsme/home?id=' + this.userInfo.id
								})
							} else {
								this.powerData = {
									look: res.data.see,
									total: res.data.total,
									type: res.data.code,
									id: this.userInfo.id
								}
								this.showMemberPay = true
							}
						})
					}
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.task-top-box {
		height: 155rpx;
	}

	.user-avatar {
		width: 90rpx;
		height: 90rpx;
		border-radius: 90rpx;
		overflow: hidden;
	}

	.user-img-1 {
		width: 26rpx;
	}

	.user-img-2 {
		width: 36rpx;
	}

	.task-img-box {
		width: 195rpx;
		height: 195rpx;
		overflow: hidden;
	}

	.task-img-num {
		width: 35rpx;
		height: 35rpx;
		background: rgba(0, 0, 0, 0.8);
	}

	.task-gift-box {
		min-height: 195rpx;
	}

	.task-dian {
		width: 8rpx;
		height: 8rpx;
		border-radius: 8rpx;
		background: #F3CEB0;
	}

	.task-gift-item {
		width: 120rpx;
		height: 60rpx;
	}

	.task-gift-img {
		width: 60rpx;
		height: 60rpx;
	}

	.task-bot-btn {
		height: 80rpx;
		border-radius: 80rpx;
	}
</style>
