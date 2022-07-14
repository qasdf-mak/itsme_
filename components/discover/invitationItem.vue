<template>
	<view class="width-full pl15 pr15">
		<!-- 用户信息 -->
		<view class="width-full task-top-box pt10 pb10" v-if="type === 'release'">
			<view class="height flex align-items-center" v-if="user">
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

		<view class="width-full flex align-items-center mt15 mb15 user-box mt15 mb10 " v-if="type === 'accept'">
			<view class="avator-box float-hidden" v-if="item.user_info" @click="toHome">
				<image :src="item.user_info.avatar | imageFilter('m11')" class="avator-box" mode="aspectFit"></image>
			</view>
			<view class="ml15 flex-1">
				<view class=" width-full flex align-items-center">
					<view class="mr5 flex-1 mr35 flex align-items-center">
						<view class="fs16 color-deep fw600 nowrap1">
							{{item.user_info.nickname}}
						</view>
					</view>
					<view class="border-box p125 flex align-items-center pr10 flex1 j-c-end">
						<image src="../../static/base/base_6.png" class="user-worth-img" mode="widthFix"></image>
						<view class="worth-box fs20 fw600 ml5">
							{{item.user_info.worth}}
						</view>
					</view>
				</view>

				<view class=" width-full flex align-items-center mt10">
					<view class="flex align-items-center flex2-1">
						<view class="fs13 color-middle ">
							{{item.user_info.age}} 岁 ,
						</view>
						<view class="fs13 color-middle ml5">
							{{item.user_info.profession || '自由职业'}}
						</view>
					</view>
					<view class=" height flex align-items-center flex2-1 j-c-end">
						<view class="icon_font fs13 color-main6">
							&#xe643;
						</view>
						<view class="color-main6 fs13 nowrap1 ml5 mr5">
							{{item.task_info.expect_region}}
						</view>
					</view>
					<view class="align-items-center flex1 text-right pr10">
						<view class="fs13 color-shallow nowrap1">
							{{item.task_info.createtime | lifeTimeFilter}}
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 用户信息 -->
		<!-- Me约信息 -->
		<view class="pt15 pb15 pr20 br10 pl20 box-shadow-1 bg-white" v-if="item.task_info" @click="toTaskDetail">
			<view class="width-full flex align-items-start">
				<view class="flex-1 pl60 mt25 relative">
					<image src="../../static/discover/yy.png" class="yy-img absolute left15 top5" mode=""></image>
					<view class="pt10 pl20 fs16 color-deep fw600">
						{{item.task_info.task_type}}
					</view>
					<view class=" mt15 pt12 pl20 fs14 color-deep">
						{{item.task_info.name}}
					</view>
				</view>
				<view class="task-img-box br5 relative" v-if="taskImg" @click.stop="previewImage">
					<image :src="taskImg.url | imageFilter('m11')" class="width-full" mode="widthFix"></image>
					<view class="task-img-num absolute bottom right flex align-items-center flex-center"
						v-if="taskImg.num > 1">
						<view class="color-white fs10">
							{{taskImg.num}}
						</view>
					</view>
				</view>
			</view>
			<view class="width-full ml12 mt25 line-color-2">
				<!-- 地点 -->
				<view class="width-full flex align-items-start" v-if="item.task_info.address">
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
					<view class="flex-1 mb10 flex align-items-start">
						<view class="fs14 lh15 color-middle">
							时间：
						</view>
						<view class="flex-1 fs14 color-deep fw600 lh15">
							{{item.task_info.start_time | dateFilter(1, '.')}} -
							{{item.task_info.end_time | dateFilter(1, '.')}}
						</view>
					</view>
				</view>
				<!-- 描述 -->
				<!-- <view class="width-full flex align-items-start" v-if="item.task_info.content">
					<view class="flex-1 mb10 flex align-items-start">
						<view class="fs14 lh15 color-middle">
							描述：
						</view>
						<view class="flex-1 fs14 color-deep fw600 lh15">
							{{item.task_info.content}}
						</view>
					</view>
				</view> -->
				<!-- 费用 -->
				<view class="width-full flex align-items-start" v-if="item.task_info.cost_type">
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
			<view class="line" v-if="item.user_info && item.user_info.id !== user.id">

			</view>
			<view class="width-full mt12 mb25"
				v-if="item.task_info && item.task_info.gift_list && item.task_info.gift_list.length > 0">
				<view class="width-full flex align-items-start">
					<view class="fs14 color-middle mt8">
						见&#8194;面&#8194;礼：
					</view>
					<view class="flex-1 flex flex-wrap">
						<view v-for="(item,index) in item.task_info.gift_list" :key="index">
							<view class="task-gift-item mr18 mb10  flex align-items-center">
								<image :src="item.icon | imageFilter('m11')" class="task-gift-img" mode="widthFix">
								</image>
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
			<view class="width-full mt15 pb10 flex align-items-center flex-between">
				<view class="fs12 color-shallow">
					{{item.task_info.createtime | dateFilter}}发布
				</view>
				<view class="fs15 color-shallow">
					{{item.task_info.state | stateFilter}}
				</view>
			</view>
		</view>
		<!-- Me约信息 -->
		<!-- 会员权限 -->
		<home-power :showPower="showPower" :powerData="powerData" @closePop="showPower = false"></home-power>
		<!-- 会员权限 -->
		<!-- 完善资料 -->
		<view class="width-full" v-if="showPerfectPop">
			<perfect-pop @refreshTheList="refreshTheList" @closePerfectPop="toHidePerfectPop">
			</perfect-pop>
		</view>
		<!-- 完善资料 -->
	</view>
</template>

<script>
	import {
		mapGetters
	} from 'vuex'
	import {
		formatImage
	} from '../../common/utils/common-methods.js'
	import homePower from '../common/homePower.vue'
	export default {
		name: 'discover-invitationitem',
		data() {
			return {
				// 会员权限弹框
				showPower: false,
				powerData: null
			}
		},
		props: {
			item: Object,
			type: String,
			isLogin: Boolean
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
		components: {
			homePower
		},
		computed: {
			...mapGetters(['user']),
			taskImg() {
				if (this.item && this.item.task_info && this.item.task_info.task_img_photo && this.item.task_info
					.task_img_photo.length > 0) {
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
		
		},
		methods: {
			toTaskDetail() {
				if (this.type === 'release') {
					uni.navigateTo({
						url: '/pages/task/mydetail?id=' + this.item.task_info.id + '&title=' + this.item.task_info.task_type
					})
				}
			},
			// 图片预览
			previewImage() {
				console.log(this.taskImg)
				let images = this.taskImg.images.map(item => {
					return formatImage(item.url)
				})
				if (this.taskImg && this.taskImg.num >= 1) {
					uni.previewImage({
						urls: images,
						longPressActions: {
							itemList: ['']
						}
					})
				}
			},
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

	.j-c-end {
		justify-content: flex-end;
	}

	.left15 {
		left: 30rpx;

	}

	.v-a-middle {
		vertical-align: middle;
	}

	.pl60 {
		padding-left: 100rpx;
	}

	.pr60 {
		padding-right: 100rpx;
	}

	.line {
		margin-top: 20rpx;
		margin-bottom: 20rpx;
		width: 600rpx;
		height: 1rpx;
		background: #EEEEEE;
	}

	.yy-img {
		width: 47rpx;
		height: 64rpx;
	}

	.user-img-1 {
		width: 26rpx;
	}

	.wid {
		width: 160rpx !important;
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

	.btn {
		height: 80rpx;
		line-height: 78rpx;
		border-radius: 80rpx;
	}

	.avator-box {
		width: 90rpx;
		height: 90rpx;
		border-radius: 90rpx;
	}

	.flex1 {
		flex: 1;
	}

	.right45 {
		right: 140rpx;
	}

	.user-bot-img {
		width: 24rpx;
		height: 24rpx;
	}

	.item-video-box {
		width: calc(100vw - 48rpx);
		height: calc((100vw - 48rpx) * 3 / 4);
	}

	.user-box {
		height: 90rpx;
	}

	.user-six-img {
		width: 24rpx;
	}

	.ml3 {
		margin-left: 6rpx;
	}

	.user-worth-img {
		width: 24rpx;
	}

	.user-chat-img {
		width: 72rpx;
	}

	.user-like-img {
		width: 65rpx;
		height: 65rpx;
	}

	.life-img-box {
		width: calc(100vw - 30rpx);
		height: calc(100vw - 30rpx);
	}

	.share {
		width: 150rpx;
		height: 150rpx;
		border-radius: 15rpx;
		padding-top: 30rpx;
		margin: 20rpx;
		text-align: center;
	}

	.content {
		font-size: 30px;
		font-family: Microsoft YaHei UI;
		font-weight: bold;
		color: #333333;
	}

	.flex2 {
		flex: 2;
	}

	.flex2-1 {
		flex: 1.5;
	}

	.flex3 {
		flex: 3;
	}

	.flex4 {
		flex: 4;
	}

	.flex5 {
		flex: 5;
	}
</style>
