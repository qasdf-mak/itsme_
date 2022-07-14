<template>
<view class="width-full lh1 bg-main mintabh100vh">
	<!-- top -->
	<view class="fixed top left right bg-white">
		<view class="width-full" :style="'height:' + StatusBar + 'px;'"></view>
		<view class="top-box flex align-items-center">
			<view class="top-box-left ml15"></view>
			<view class="flex-1 text-center fs18 color-deep fw600">邀约</view>
			<view class="top-box-left text-right mr15 fs14 color-deep" @click="toJumpPage(1, '/pages/task/my')">我的邀约</view>
		</view>
		<view class="width-full top-box" v-if="taskType">
			<u-tabs
				:list="taskType"
				:current="tabCurrent"
				height="100"
				@change="changeType"
				font-size="28"
				:show-bar="false"
				active-color="#F2B27F"
				inactive-color="#BBBBBB"
			></u-tabs>
		</view>
	</view>
	<view class="width-full">
		<view class="width-full" :style="'height:' + StatusBar + 'px;'"></view>
		<view class="width-full top-box"></view>
		<view class="width-full top-box"></view>
	</view>
	<!-- top -->
	<view class="width-full">
		<view v-for="(item,index) in taskList" :key="index">
			<task-list :item="item"></task-list>
		</view>
		<view class="width-full pt15 pb15" v-if="taskList && taskList.length > 0 && pages.finish">
			<u-divider bg-color="">没有更多了</u-divider>
		</view>
		<view class="width-full" v-if="taskList && taskList.length === 0 && pages.finish">
			<empty-tip type="task"></empty-tip>
		</view>
	</view>
	<view class="width-full pt30"></view>
	<!-- 发布Me约 -->
	<view class="task-add-box fixed bottom30 right20" @click="toJumpPage(1, '/pages/edit/task')">
		<image src="../../static/base/base_10.png" class="width-full" mode="widthFix"></image>
	</view>
	<no-login :pageShow="pageShow" type="task" v-if="!isLogin"></no-login>
	<view v-if="showRedPacket">
		<red-packet></red-packet>
	</view>
</view>
</template>

<script>
	import TaskService from '../../common/service/task-service.js'
	import taskList from '../../components/task/list.vue'
	import noLogin from '../../components/common/nologin.vue'
	export default {
		data() {
			return {
				pageShow: false,
				isLogin: true, // 登录状态
				tabCurrent: 0,
				taskType: null,
				taskList: [],
				pages: {
					page: 1,
					size: 5,
					finish: false
				}
			}
		},
		onPullDownRefresh () {
			this.init()
		},
		onReachBottom () {
			if (!this.pages.finish) {
				this.pages.page++
				this.getTaskList()
			}
		},
		onShow() {
			this.init()
			this.pageShow = true
		},
		onHide() {
			this.pageShow = false
		},
		components: {
			taskList,
			noLogin
		},
		methods: {
			init() {
				Object.assign(this.$data, this.$options.data())
				this.loginExpire().then(res => {
					this.isLogin = res
				})
				this.getTaskType()
			},
			// 获取Me约类型
			getTaskType() {
				TaskService.tasktypelist().then(res => {
					if (res.code === 1) {
						this.taskType = res.data
						this.getTaskList()
					}
				})
			},
			changeType(index) {
				this.tabCurrent = index
				this.taskList = []
				this.pages.finish = false
				this.pages.page = 1
				this.getTaskList()
			},
			// 获取Me约列表
			getTaskList() {
				uni.showLoading({
					title: '加载中'
				})
				TaskService.tasklistinfo({
					type: this.taskType[this.tabCurrent].id,
					state: 0,
					page: this.pages.page,
					limit: this.pages.size
				}).then(res => {
					uni.hideLoading()
					uni.stopPullDownRefresh()
					if (res.code === 1 && res.data && res.data.length > 0) {
						this.pages.finish = false
						this.taskList = this.taskList.concat(res.data)
					} else {
						this.pages.finish = true
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.top-box{
		height: 100rpx;
		&-left{
			width: 200rpx;
		}
	}
	.itsme-home-tab{
		width: 500rpx;
	}
	.task-add-box{
		width: 110rpx;
		height: 110rpx;
	}
</style>
