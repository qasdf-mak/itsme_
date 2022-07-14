<template>
<view class="width-full lh1">
	<!-- 用户信息 -->
	<view class="width-full task-top-box pt10 pb10" v-if="type === 'release'">
		<view class="pl20 pr20 height flex align-items-center" v-if="user">
			<view class="user-avatar">
				<image :src="user.avatar | imageFilter('m11')" class="width-full" mode="widthFix"></image>
			</view>
			<view class="flex-1 ml25 mr20">
				<view class="width-full">
					<view class="width-full nowrap1 fs14 fw600 color-deep">
						{{user.nickname}}
					</view>
				</view>
				<view class="width-full mt8 flex align-items-center">
					<view class="flex align-items-center">
						<image src="../../static/base/base_1.png" class="user-img-1" mode="widthFix"></image>
						<view class="fs13 color-666666 ml8">
							{{user.profession || '自由职业者'}}
						</view>
					</view>
					<view class="flex align-items-center ml30" v-if="user.age > 0">
						<image src="../../static/base/base_2.png" class="user-img-1" mode="widthFix"></image>
						<view class="fs13 color-666666 ml8">
							{{user.age}}岁
						</view>
					</view>
				</view>
			</view>
			<view class="flex align-items-center">
				<image src="../../static/base/base_6.png" class="user-img-2" mode="widthFix"></image>
				<view class="worth-box fs24 fw600 ml5">
					{{user.worth}}
				</view>
			</view>
		</view>
	</view>
	<view class="width-full task-top-box pt10 pb10" v-if="type === 'accept'">
		<view class="pl20 pr20 height flex align-items-center" v-if="item && item.user_info">
			<view class="user-avatar">
				<image :src="item.user_info.avatar | imageFilter('m11')" class="width-full" mode="widthFix"></image>
			</view>
			<view class="flex-1 ml25 mr20">
				<view class="width-full">
					<view class="width-full nowrap1 fs14 fw600 color-deep">
						{{item.user_info.nickname}}
					</view>
				</view>
				<view class="width-full mt8 flex align-items-center">
					<view class="flex align-items-center">
						<image src="../../static/base/base_1.png" class="user-img-1" mode="widthFix"></image>
						<view class="fs13 color-666666 ml8">
							{{item.user_info.profession || '自由职业者'}}
						</view>
					</view>
					<view class="flex align-items-center ml30" v-if="item.user_info.age && item.user_info.age > 0">
						<image src="../../static/base/base_2.png" class="user-img-1" mode="widthFix"></image>
						<view class="fs13 color-666666 ml8">
							{{item.user_info.age}}岁
						</view>
					</view>
				</view>
			</view>
			<view class="flex align-items-center">
				<image src="../../static/base/base_6.png" class="user-img-2" mode="widthFix"></image>
				<view class="worth-box fs24 fw600 ml5">
					{{user.worth}}
				</view>
			</view>
		</view>
	</view>
	<!-- 用户信息 -->
	<!-- Me约信息 -->
	<view class="ml15 mr15 box-shadow-1 pt15 pb15 pl15 pr15 br10" v-if="item && item.task_info" @click="toTaskDetail">
		<view class="width-full flex align-items-start">
			<view class="flex-1 mr30 task-gift-box">
				<view class="ml18 fs18 fw600 color-deep">
					礼物
				</view>
				<view class="width-full flex align-items-center mt15">
					<view class="task-dian mr15 mb15"></view>
					<view class="flex-1 flex align-items-center flex-wrap" v-if="item.task_info.gift_list && item.task_info.gift_list.length > 0">
						<view v-for="(gift,index) in item.task_info.gift_list" :key="index">
							<view class="task-gift-item mr20 mb15 flex align-items-center">
								<image :src="gift.icon | imageFilter('m11')" class="task-gift-img" mode="widthFix"></image>
								<view class="fs12 color-deep ml8">
									×{{gift.num}}
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="width-full flex align-items-center mt15" v-if="item.task_info.other_gift">
					<view class="task-dian mr15 mb15"></view>
					<view class="flex-1 mb15 fs13 lh15 fw600 color-deep">
						{{item.task_info.other_gift}}
					</view>
				</view>
			</view>
			<view class="task-img-box br5 relative" v-if="taskImg">
				<image :src="taskImg.url | imageFilter('m11')" class="width-full" mode="widthFix"></image>
				<view class="task-img-num absolute bottom right flex align-items-center flex-center" v-if="taskImg.num > 1">
					<view class="color-white fs10">
						{{taskImg.num}}
					</view>
				</view>
			</view>
		</view>
		<view class="width-full mt15">
			<view class="width-full">
				<view class="ml18 fs18 fw600 color-deep mb15">
					{{item.task_info.task_type}}
				</view>
				<!-- 名称 -->
				<view class="width-full flex align-items-start" v-if="item.task_info.name">
					<view class="task-dian mt10 mr15 mb10"></view>
					<view class="flex-1 mb10 flex align-items-start">
						<view class="fs14 lh15 color-middle">
							名称：
						</view>
						<view class="flex-1 fs14 color-deep fw600 lh15">
							{{item.task_info.name}}
						</view>
					</view>
				</view>
				<!-- 地点 -->
				<view class="width-full flex align-items-start" v-if="item.task_info.address">
					<view class="task-dian mt10 mr15 mb10"></view>
					<view class="flex-1 mb10 flex align-items-start">
						<view class="fs14 lh15 color-middle">
							地点：
						</view>
						<view class="flex-1 fs14 color-deep fw600 lh15">
							{{item.task_info.address}}
						</view>
					</view>
				</view>
				<!-- 时间 -->
				<view class="width-full flex align-items-start" v-if="item.task_info.start_time && item.task_info.end_time">
					<view class="task-dian mt10 mr15 mb10"></view>
					<view class="flex-1 mb10 flex align-items-start">
						<view class="fs14 lh15 color-middle">
							时间：
						</view>
						<view class="flex-1 fs14 color-deep fw600 lh15">
							{{item.task_info.start_time | dateFilter(1, '.')}} - {{item.task_info.end_time | dateFilter(1, '.')}}
						</view>
					</view>
				</view>
				<!-- 描述 -->
				<view class="width-full flex align-items-start" v-if="item.task_info.content">
					<view class="task-dian mt10 mr15 mb10"></view>
					<view class="flex-1 mb10 flex align-items-start">
						<view class="fs14 lh15 color-middle">
							描述：
						</view>
						<view class="flex-1 fs14 color-deep fw600 lh15">
							{{item.task_info.content}}
						</view>
					</view>
				</view>
				<!-- 费用 -->
				<view class="width-full flex align-items-start" v-if="item.task_info.cost_type">
					<view class="task-dian mt10 mr15 mb10"></view>
					<view class="flex-1 mb10 flex align-items-start">
						<view class="fs14 lh15 color-middle">
							费用：
						</view>
						<view class="flex-1 fs14 color-deep fw600 lh15">
							{{item.task_info.cost_type | taskCostFilter}}
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
				<view class="width-full flex align-items-start" v-if="xgyqData">
					<view class="task-dian mt10 mr15 mb10"></view>
					<view class="flex-1 mb10 flex align-items-start">
						<view class="fs14 lh15 color-middle">
							性格要求：
						</view>
						<view class="flex-1 fs14 color-deep fw600 lh15">
							{{xgyqData}}
						</view>
					</view>
				</view>
				<!-- 年龄-->
				<view class="width-full flex align-items-start">
					<view class="task-dian mt10 mr15 mb10"></view>
					<view class="flex-1 mb10 flex align-items-start">
						<view class="fs14 lh15 color-middle">
							年龄：
						</view>
						<view class="flex-1 fs14 color-deep fw600 lh15">
							{{item.task_info.age || '18-80'}}
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
							{{item.task_info.others ? item.task_info.others_num + '人' : '不允许'}}
						</view>
					</view>
				</view>
				<view class="width-full mt15 pb10 flex align-items-center flex-between">
					<view class="fs12 color-shallow">
						{{item.task_info.createtime | dateFilter}}发布
					</view>
					<view class="fs15 color-shallow">
						{{item.task_info.state | stateFilter}}
					</view>
				</view>
			</view>
		</view>
	</view>
	<!-- Me约信息 -->
</view>
</template>

<script>
	import { mapGetters } from 'vuex'
	export default {
		name: 'task-item',
		props: {
			type: String,
			item: Object
		},
		filters: {
			stateFilter(state) {
				if (state === 1) {
					return '已发布'
				}
				if (state === 2) {
					return '匹配中'
				}
				if (state === 3) {
					return 'Me约中'
				}
				if (state === 4) {
					return '已完成'
				}
			}
		},
		computed: {
			...mapGetters(['user']),
			taskImg() {
				if (this.item && this.item.task_info && this.item.task_info.task_img_photo && this.item.task_info.task_img_photo.length > 0) {
					let images = {
						images: this.item.task_info.task_img_photo,
						url: this.item.task_info.task_img_photo[0].url,
						num: this.item.task_info.task_img_photo.length
					}
					return images
				} else {
					return null
				}
			},
			qwdxData() {
				if (this.item && this.item.task_info && this.item.task_info.qwdx && this.item.task_info.qwdx.length > 0) {
					let qwdx = this.item.task_info.qwdx.join(' ')
					return qwdx
				} else {
					return null
				}
			},
			xgyqData() {
				if (this.item && this.item.task_info && this.item.task_info.xgyq && this.item.task_info.xgyq.length > 0) {
					let xgyq = this.item.task_info.xgyq.join(' ')
					return xgyq
				} else {
					return null
				}
			}
		},
		mounted() {
			console.log(this.type)
			console.log(this.item)
		},
		methods: {
			toTaskDetail() {
				if (this.type === 'release') {
					uni.navigateTo({
						url: '/pages/task/mydetail?id=' + this.item.task_info.id + '&title=' + this.item.task_info.task_type
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.task-top-box{
		height: 155rpx;
	}
	.user-avatar{
		width: 90rpx;
		height: 90rpx;
		border-radius: 90rpx;
		overflow: hidden;
	}
	.user-img-1{
		width: 26rpx;
	}
	.user-img-2{
		width: 36rpx;
	}
	.task-img-box{
		width: 195rpx;
		height: 195rpx;
		overflow: hidden;
	}
	.task-img-num{
		width: 35rpx;
		height: 35rpx;
		background: rgba(0,0,0,0.8);
	}
	.task-gift-box{
		min-height: 195rpx;
	}
	.task-dian{
		width: 8rpx;
		height: 8rpx;
		border-radius: 8rpx;
		background: #F3CEB0;
	}
	.task-gift-item{
		width: 120rpx;
		height: 60rpx;
	}
	.task-gift-img{
		width: 60rpx;
		height: 60rpx;
	}
	.task-bot-btn{
		height: 80rpx;
		border-radius: 80rpx;
	}
</style>
