<template>
	<view class="width-full lh1">
		<view v-if="payData">
			<u-popup v-model="showPayBox" mode="bottom" :closeable="false" border-radius="20" :mask-close-able="false">
				<view class="width-full bg-white">
					<view class="width-full flex align-items-center">
						<view class="icon_font color-shallow pt15 pb15 pl15 pr15" @click="closeRease">
							&#xe635;
						</view>
						<view class="flex-1 text-center fs16 color-deep fw600 mr35 pr15">
							发布Me约:{{taskData.name}}
						</view>
					</view>
					<view class="ml30 mr30 mt15 b-b-1 pb15 line-color-2">
						<view class="width-full flex align-items-center mb8">
							<image src="../../../static/task/task_2.png" class="task-img-1" mode="widthFix"></image>
							<view class="fs14 color-deep ml8 flex-1">
								{{payData && payData.pay_type === 1 ? '消耗次数发布Me约' : '消耗M豆发布Me约'}}
							</view>
							<view class="fs14 color-deep">
								{{payData && payData.pay_type === 1 ? '剩余' + payData.task_num + '次' : '发Me约M豆：' + payData.money}}
							</view>
						</view>
						<view class="fs14 color-main6 text-right" v-if="user.gender === 1 && user.is_vip === 0" @click="goMember">
							升级会员可免费发布Me约
						</view>
					</view>
					<view class="ml30 mr30 b-b-1 mt15 pb15 line-color-2">
						<view class="width-full flex align-items-center mb20">
							<image src="../../../static/task/task_3.png" class="task-img-1" mode="widthFix"></image>
							<view class="fs14 color-deep ml8 flex-1">
								见面礼
							</view>
							<view class="fs14 color-deep" v-if="payData.gift_total_money">
								礼物总额：{{payData.gift_total_money}}
							</view>
						</view>
						<view class="width-full">
							<view class="ml15 flex flex-wrap" v-if="changeGiftList && changeGiftList.length > 0">
								<view v-for="(item,index) in changeGiftList" :key="index">
									<view class="gift-item-box relative" :class="(index + 1) % 4 === 0 ? '' : 'mr30'">
										<image :src="item.icon | imageFilter('m11')" class="gift-item-img" mode="scaleToFill"></image>
										<view class="width-full fs14 color-999999 text-center mt15">
											x{{item.num}}
										</view>
									</view>
								</view>
							</view>
							<view class="width-full" v-else>
								<view class="ml35 mr35 fs14 color-shallow lh18 text-center">
									未选择见面礼，Me约成功率会降低50%可能与女神失之交臂
								</view>
								<view class="fs14 color-main6 text-center fw600 mt10" @click="goToChangeGift">
									去选礼物
								</view>
							</view>
						</view>
					</view>
					<view class="ml30 mr30 mt15 mb15 text-right fs16 color-deep fw600">
						共计支付： {{payData.z_money}}M豆
					</view>
					<view class="width-full bg-main pb_iphoneX_safe">
						<view class="pl30 pr25 pt15 pb15 flex align-items-center flex-between">
							<view class="flex align-items-center">
								<image src="../../../static/task/task_4.png" class="task-img-1" mode="widthFix"></image>
								<view class="fs14 color-deep ml8">
									我的余额：{{user.money}}
								</view>
							</view>
							<view class="release-btn bg-2 color-white text-center fs16 btn-box" v-if="Number(user.money) >= Number(payData.z_money)"
							 @click="publishTask">
								支付并发布
							</view>
							<view class="release-btn bg-2 color-white text-center fs16 btn-box" v-else @click="goRecharge">
								充值并发布
							</view>
						</view>
					</view>
				</view>
			</u-popup>
		</view>
		<view v-if="showMemberPop">
			<view class="fixed bottom50 left right flex align-items-center flex-center pb_iphoneX_safe" style="z-index: 999999;" @click="closeRease">
				<view class="icon_font mb35 color-white fs20">
					&#xe635;
				</view>
			</view>
			<u-popup v-model="showMemberPop" mode="center" :closeable="false" border-radius="20" :mask-close-able="false"
			 :mask-custom-style="{background: 'rgba(0, 0, 0, 0.75)'}">
				<view class="member-pop-box">
					<view class="width-full relative">
						<image src="../../../static/task/task_1.png" class="width-full member-pop-img" mode="aspectFill"></image>
						<view class="absolute top30 left right">
							<view class="width-full pt3 fs18 color-white fw600 text-center mb10">
								会员免费发布Me约
							</view>
							<view class="width-full fs13 color-white text-center">
								多发发，总有一个瞎眼做Me约的
							</view>
						</view>
					</view>
					<view class="width-full bg-white">
						<view class="pt30 pb25 text-center fs15 color-deep">
							非会员发布Me约需要消耗100M豆
						</view>
						<view class="ml15 mr15 b-t-1 pt10 pb10 line-color-3 flex align-items-center">
							<view class="flex-1 fs15 pt8 pb8 text-center color-999999 b-r-1 line-color-3" @click="closeMember">
								消耗M豆发布
							</view>
							<view class="flex-1 fs15 pt8 pb8 text-center color-main6" @click="goMember">
								领取会员特权
							</view>
						</view>
					</view>
				</view>
			</u-popup>
		</view>
	</view>
</template>

<script>
	import {
		mapGetters
	} from 'vuex'
	import TaskService from '../../../common/service/task-service.js'
	export default {
		name: 'release-task',
		data() {
			return {
				payData: null,
				showMemberPop: false,
				showPayBox: false
			}
		},
		props: {
			taskData: Object
		},
		computed: {
			...mapGetters(['user']),
			changeGiftList() {
				if (this.taskData && this.taskData.gift) {
					return JSON.parse(this.taskData.gift)
				} else {
					return []
				}
			}
		},
		methods: {
			// 去会员中心
			goMember() {
				uni.navigateTo({
					url: '/pages/my/member/index'
				})
			},
			// 去充值
			goRecharge() {
				uni.navigateTo({
					url: '/pages/my/member/recharge'
				})
			},
			// 关闭支付窗口
			closeRease() {
				this.$emit('closeRease')
			},
			goToChangeGift() {
				this.$emit('goToChangeGift')
			},
			closeMember() {
				this.showMemberPop = false
				this.showPayBox = true
			},
			publishCheck() {
				TaskService.publishcheck({
					gift: this.taskData.gift
				}).then(res => {
					console.log(res.data)
					if (res.code === 1) {
						this.payData = res.data
						this.$emit('setPublishType', res.data.pay_type)
						if (this.user && this.user.gender && this.user.gender === 1 && this.user.is_vip === 0) {
							this.showMemberPop = true
						} else {
							this.showPayBox = true
						}
					}
				})
			},
			publishTask() {
				console.log('this.taskData')
				console.log(this.taskData)
				console.log('this.taskData')
				let taskInfo = JSON.parse(JSON.stringify(this.taskData))
				if (taskInfo.gift) {
					let gift = JSON.parse(taskInfo.gift).map(item => {
						let data = {
							gift_id: item.id,
							num: item.num
						}
						return data
					})
					taskInfo.gift = JSON.stringify(gift)
				}
				TaskService.publishtask({
					publish_type: taskInfo.publish_type,
					type_id: taskInfo.type_id,
					name: taskInfo.name,
					address: taskInfo.address,
					lng: taskInfo.lng,
					lat: taskInfo.lat,
					start_time: taskInfo.start_time,
					end_time: taskInfo.end_time,
					content: taskInfo.content,
					url: taskInfo.url,
					cost_type: taskInfo.cost_type,
					qwdx: taskInfo.qwdx,
					xgyq: taskInfo.xgyq,
					worth: taskInfo.worth,
					worth_start: taskInfo.worth_start,
					worth_end: taskInfo.worth_end,
					age: taskInfo.age,
					age_start: taskInfo.age_start,
					age_end: taskInfo.age_end,
					others: taskInfo.others,
					others_num: taskInfo.others_num,
					expect_region: taskInfo.expect_region,
					other_demand: taskInfo.other_demand,
					is_gift: taskInfo.is_gift,
					gift: taskInfo.gift
				}).then(res => {
					console.log(res)
					if (res.code === 1) {
						this.$emit('releaseSuccess')
					}
				})
			}
		},
		mounted() {
			console.log(this.user)
			this.publishCheck()
		}
	}
</script>

<style lang="scss" scoped>
	.member-pop-box {
		width: 560rpx;
	}

	.member-pop-img {
		height: 400rpx;
	}

	.task-img-1 {
		width: 32rpx;
	}

	.release-btn {
		width: 300rpx;
		height: 90rpx;
		line-height: 90rpx;
		border-radius: 90rpx;
	}

	.gift-item-box {
		width: 100rpx;
		height: 180rpx;
	}

	.gift-item-img {
		width: 100rpx;
		height: 100rpx;
	}
</style>
