<template>
<view class="width-full lh1">
	<view class="pt15 pl18 pr18">
		<view class="width-full user-box flex align-items-center" v-if="item.user_info" @click="toHome">
			<view class="user-avatar">
				<image :src="item.user_info.avatar | imageFilter('m11')" class="user-avatar" mode="widthFix"></image>
			</view>
			<view class="flex-1 ml25 mr25 flex flex-col">
				<view class="width-full flex align-items-center mb12">
					<view class="flex-1 nowrap1 fs15 color-deep fw600">
						{{item.user_info.nickname}}
					</view>
				</view>
				<view class="width-full flex align-items-center">
					<view class="flex align-items-center">
						<image src="../../static/base/base_1.png" class="item-bottom-icon" mode="widthFix"></image>
						<view class="fs12 flex-1 color-middle ml6 nowrap1">
							{{item.user_info.profession || '自由职业'}}
						</view>
					</view>
					<view class="flex align-items-center" v-if="item.user_info.age && item.user_info && item.user_info.age > 0">
						<image src="../../static/base/base_2.png" class="item-bottom-icon ml15" mode="widthFix"></image>
						<view class="fs12 flex-1 color-middle ml6 nowrap1">
							{{item.user_info.age}}岁
						</view>
					</view>
				</view>
			</view>
			<view class="flex align-items-center">
				<image src="../../static/base/base_6.png" class="item-worth-icon" mode="widthFix"></image>
				<view class="worth-box fs22 fw600 ml5">
					{{item.user_info.worth}}
				</view>
			</view>
		</view>
		<view class="mt15 pt15 pb15 pr20 br10 pl15 box-shadow-1 bg-white" v-if="item.task_info" @click="toTaskDetail">
			<view class="width-full flex align-items-start">
				<view class="flex-1">
					<view class="pt10 pl20 fs16 color-deep fw600">
						{{item.task_info.task_type}}
					</view>
					<view class="pt12 pl20 fs14 color-deep">
						{{item.task_info.name}}
					</view>
				</view>
				<view class="task-img-box br5 relative" v-if="taskImg" @click="previewImage">
					<image :src="taskImg.url | imageFilter('m11')" class="width-full" mode="widthFix"></image>
					<view class="task-img-num absolute bottom right flex align-items-center flex-center" v-if="taskImg.num > 1">
						<view class="color-white fs10">
							{{taskImg.num}}
						</view>
					</view>
				</view>
			</view>
			<view class="width-full mt25 b-b-1 line-color-2">
				<!-- 地点 -->
				<view class="width-full flex align-items-start" v-if="item.task_info.address">
					<view class="task-dian ml5 mt10 mr15 mb10"></view>
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
				<view class="width-full flex align-items-start" v-if="item.task_info.address">
					<view class="task-dian ml5 mt10 mr15 mb10"></view>
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
				<view class="width-full flex align-items-start" v-if="item.task_info.address">
					<view class="task-dian ml5 mt10 mr15 mb10"></view>
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
				<view class="width-full flex align-items-start" v-if="item.task_info.address">
					<view class="task-dian ml5 mt10 mr15 mb10"></view>
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
			<view class="width-full mt12">
				<view class="width-full flex align-items-start">
					<view class="fs14 color-middle mt8">
						见&#8194;面&#8194;礼：
					</view>
					<view class="flex-1 flex flex-wrap" v-if="item.task_info && item.task_info.gift_list && item.task_info.gift_list.length > 0">
						<view v-for="(item,index) in item.task_info.gift_list" :key="index">
							<view class="task-gift-item mr20 mb15 flex align-items-center">
								<image :src="item.icon | imageFilter('m11')" class="task-gift-img" mode="widthFix"></image>
								<view class="fs12 color-deep ml8">
									×{{item.num}}
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="width-full flex align-items-start" v-if="item.task_info.other_gift">
					<view class="fs14 color-middle lh15">
						附加奖励：
					</view>
					<view class="flex-1 fs14 lh15 color-deep fw600">
						{{item.task_info.other_gift}}
					</view>
				</view>
			</view>
			
			<view class="width-full mt10 flex align-items-center flex-between">
				<view class="fs12 color-shallow">
					23分钟前发布
				</view>
				<view class="task-btn btn-box bg-2 color-white text-center fs18" @click.stop v-if="item.task_info.state === 2" @click="toOpenChat(item.user_info.id)">
					报名
				</view>
				<view class="task-btn color-shallow text-right fs13" v-else>
					{{item.task_info.state | stateFilter}}
				</view>
			</view>
		</view>
	</view>
	<!-- 会员权限 -->
	<member-pop :showPop="showMemberPop" :member="memberData" popType="look" @closePop="showMemberPop = false"></member-pop>
	<!-- 会员权限 -->
</view>
</template>

<script>
	import { mapGetters } from 'vuex'
	import { formatImage } from '../../common/utils/common-methods.js'
	export default {
		name: 'task-list',
		data() {
			return {
				// 会员权限弹框
				showMemberPop: false,
				memberData: {
					look: 0,
					total: 0
				}
			}
		},
		props: {
			item: Object
		},
		computed: {
			...mapGetters(['user']),
			taskImg() {
				if (this.item.task_info && this.item.task_info.task_img_photo && this.item.task_info.task_img_photo.length > 0) {
					let images = {
						images: this.item.task_info.task_img_photo,
						url: this.item.task_info.task_img_photo[0].url,
						num: this.item.task_info.task_img_photo.length
					}
					return images
				} else {
					return null
				}
			}
		},
		mounted() {
			console.log('this.user')
			console.log(this.item)
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
		methods: {
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
			// 去用户主页
			toHome() {
				this.toUserHome('life', this.item.user_info.id).then(res => {
					if (res.data.code === 1) {
						uni.navigateTo({
							url: '../../pages/itsme/home?id=' + this.item.user_info.id
						})
					} else {
						this.memberData = {
							look: res.data.look_counts,
							total: res.data.zong_counts
						}
						this.showMemberPop = true
					}
				})
			},
			toTaskDetail() {
				console.log(this.item.task_info.id)
				uni.navigateTo({
					url: '/pages/task/detail?taskid=' + this.item.task_info.id + '&userid=' + this.item.user_info.id
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.user-box{
		height: 90rpx;
	}
	.user-avatar{
		width: 90rpx;
		height: 90rpx;
		border-radius: 90rpx;
	}
	.item-bottom-icon{
		width: 22rpx;
	}
	.item-worth-icon{
		width: 30rpx;
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
	.task-btn{
		width: 240rpx;
		height: 80rpx;
		line-height: 78rpx;
		border-radius: 80rpx;
	}
</style>

