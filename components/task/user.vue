<template>
	<view class="width-full lh1">
		<view class="ml12 pl10 pr10 mr12 mb12 bg-white br10 float-hidden box-shadow-index itsme-index-box relative"
			@click="toHome">
			<view class="width-full flex align-items-center itsme-index-top b-b-1 line-color-2">
				<view class="item-avatar ml10 mr10">
					<image :src="item.avatar | imageFilter('m11')" class="item-avatar" mode="aspectFill"></image>
				</view>
				<view class="ml12 mr12 flex-1 itsme-index-top flex flex-col flex-center">
					<view class="width-full flex align-items-center item-title">
						<view class="nowrap1 fs15 color-deep">
							{{item.nickname || ''}}
						</view>
						<!-- vip 待判断 -->
						<view v-if="item.is_vip">
							<image src="../../static/itsme/itsme_10.png" class="item-title-icon ml5" mode="widthFix">
							</image>
						</view>
						<!-- 女神 待判断 -->
						<view class="none">
							<image src="../../static/itsme/itsme_11.png" class="item-title-icon ml5" mode="widthFix">
							</image>
						</view>
						<!-- 真人 -->
						<view v-if="isReal">
							<image src="../../static/itsme/itsme_12.png" class="item-title-icon ml5" mode="widthFix">
							</image>
						</view>
					</view>
					<view class="width-full mt5 flex align-items-center">
						<image src="../../static/base/base_4.png" class="six-img mr5" mode="widthFix"
							v-if="item.gender === 0"></image>
						<image src="../../static/base/base_5.png" class="six-img mr5" mode="widthFix"
							v-if="item.gender === 1"></image>
						<view class="width-full nowrap1 fs11 color-shallow" v-if="item.is_online === 0">
							{{item.outtime | indexTimeFilter(item.server_time)}}
						</view>
						<view class="width-full nowrap1 fs11 color-dominant-hue" v-else>
							活跃
						</view>
					</view>
					<view class="width-full mt12 flex align-items-center">
						<image src="../../static/index/index_11.png" class="item-num-left" mode="widthFix"></image>
						<view class="fs28 item-num-right ml5">
							{{item.worth}}
						</view>
					</view>
				</view>
				<view class="item-like-box mr10 ml10" @click.stop>
					<view class="width-full height flex flex-col align-items-center flex-center" v-if="item.like === 1">
						<image src="../../static/index/index_5.png" class="item-like-yes mb5" mode="widthFix"
							@click="lickBtn('no')"></image>
						<view class="flex align-items-center flex-col flex-center" @click="toOpenChat(item.id)">
							<image src="../../static/index/index_6.png" class="item-like-chat" mode="widthFix"></image>
							<view class="fs14 color-deep mt8">
								聊天
							</view>
						</view>
					</view>
					<view class="width-full height flex flex-col align-items-center flex-center" v-if="item.like === 0"
						@click="lickBtn('yes')">
						<image src="../../static/index/index_4.png" class="item-like-no" mode="widthFix"></image>
						<view class="fs14 color-deep mt8">
							喜欢
						</view>
					</view>
				</view>
			</view>
			<view class="width-full flex align-items-center itsme-index-bot flex-center" v-if="!isdelete">
				<view class="flex-1 height flex align-items-center">
					<image src="../../static/base/base_1.png" class="item-bottom-icon ml10" mode="widthFix"></image>
					<view class="fs12 flex-1 color-middle ml6 nowrap1">
						{{profession}}
					</view>
				</view>
				<view class="flex-1 height flex align-items-center" v-if="item.age > 0">
					<image src="../../static/base/base_2.png" class="item-bottom-icon ml10" mode="widthFix"></image>
					<view class="fs12 flex-1 color-middle ml6 nowrap1">
						{{item.age}}岁
					</view>
				</view>
				<view class="flex-1 height flex align-items-center">
					<image src="../../static/base/base_3.png" class="item-bottom-icon ml10" mode="widthFix"></image>
					<view class="fs12 flex-1 color-middle ml6 nowrap1">
						{{item.distance || '未知'}}
					</view>
				</view>
			</view>
			<view class="width-full flex align-items-center itsme-index-bot flex-center" v-else>
				<view class="flex-1 height flex align-items-center flex-center b-r-1" @click.stop @click="isDelete">
					<view class="icon_font color-bbbbbb">
						&#xe6a6;
					</view>
					<view class="fs12  color-middle ml6 nowrap1">
						移除
					</view>
				</view>
				<view class="flex-1 height flex align-items-center flex-center" @click.stop
					@click="toOpenChat('task-user',item.id)">
					<view class="icon_font color-dominant-hue">
						&#xe652;
					</view>
					<view class="fs12 color-middle ml6 nowrap1">
						聊天
					</view>
				</view>
			</view>
			<view class="absolute success-box top20 right20" v-if="isSuccess">
				<image src="../../static/task/task_10.png" class="success-box" mode="scaleToFill"></image>
			</view>
		</view>
		<!-- 会员权限 -->
		<member-pop :showPop="showMemberPop" :member="memberData" popType="look" @closePop="showMemberPop = false">
		</member-pop>
		<!-- 会员权限 -->
		<home-power :showPower="showPower" :powerData="powerData" @closePop="showPower = false"></home-power>
		<!-- 权限弹窗 -->
		<unify-pop :showUnify="showUnifyPop" :type="unifyType" @closePop="showUnifyPop = false"
			@deleteList="deleteList(item,taskid)"></unify-pop>
	</view>
</template>

<script>
	import CommonService from '../../common/service/common-service.js'
	import TaskService from '../../common/service/task-service.js'
	import homePower from '../common/homePower.vue'
	import {
		mapGetters
	} from 'vuex'
	export default {
		name: 'task-user',
		data() {
			return {
				// 会员权限弹框
				showMemberPop: false,
				memberData: {
					look: 0,
					total: 0
				},
				showPower: false,
				powerData: null
			}
		},
		props: {
			item: Object,
			isSuccess: Boolean,
			isdelete: Boolean,
			taskid: Number
		},
		components: {
			homePower
		},
		computed: {
			...mapGetters(['user']),
			isReal() {
				if (this.item && this.item.certify) {
					let certify = JSON.parse(this.item.certify)
					if (certify.faceRecognize && certify.faceRecognize.verified) {
						return true
					} else {
						return false
					}
				} else {
					return false
				}
			},
			profession() {
				if (this.item && this.item.user_tag) {
					let profession = null
					for (let i = 0; i < this.item.user_tag.length; i++) {
						if (this.item.user_tag[i].code === 'profession') {
							profession = this.item.user_tag[i]
							break
						}
					}
					if (profession && profession.content) {
						return profession.content
					} else {
						return '自由职业'
					}
				} else {
					return '自由职业'
				}
			}
		},
		mounted() {
			console.log(this.item)
		},
		methods: {
			// 去用户首页
			toHome() {
				CommonService.membership({
					user_id: this.item.id
				}).then(res => {
					console.log(res)
					if (res.code === 1) {
						this.toUserHome('list', this.item.id).then(res => {
							if (res.data.code === 200) {
								uni.navigateTo({
									url: '/pages/itsme/home?id=' + this.item.id
								})
							} else {
								this.powerData = {
									look: res.data.see,
									total: res.data.total,
									type: res.data.code,
									id: this.item.id
								}
								this.showPower = true
							}
						})
					}
				})
			},
			//确定删除
			isDelete() {
				this.unifyType = 15
				this.showUnifyPop = true
			},
			// 删除Me约报名和邀请人
			deleteList(item, taskid) {
				TaskService.taskmatchuserdel({
					task_id: taskid,
					user_id: item.id
				}).then(res => {
					if (res.code === 1) {
						this.showUnifyPop = false
						this.$emit('deleteList')
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.itsme-index {
		&-box {
			height: 288rpx;
		}

		&-top {
			height: 212rpx;
		}

		&-bot {
			height: 75rpx;
		}
	}

	.item-title {
		height: 30rpx;
		line-height: 30rpx;
		font-weight: bold;

		&-icon {
			width: 28rpx;
		}
	}

	.item-avatar {
		width: 140rpx;
		height: 140rpx;
		border-radius: 140rpx;
		overflow: hidden;
	}

	.item-like {
		&-box {
			width: 88rpx;
			height: 212rpx;
		}

		&-yes {
			width: 62rpx;
		}

		&-chat {
			width: 84rpx;
		}

		&-no {
			width: 70rpx;
		}
	}

	.item-bottom-icon {
		width: 22rpx;
	}



	// 
	.item-num-left {
		color: #FFBA00;
	}

	.item-num-right {
		background-image: linear-gradient(to bottom, #FFCC00, #F48630);
		-webkit-background-clip: text;
		/*必需加前缀 -webkit- 才支持这个text值 */
		-webkit-text-fill-color: transparent;
		/*text-fill-color会覆盖color所定义的字体颜色： */
	}

	.item-live-no {
		width: 70rpx;
	}

	.item-live-chat {
		width: 78rpx;
	}

	.item-bottom-icon {
		width: 24rpx;
	}

	.item-num-left {
		width: 40rpx;
	}

	.user-item-lable {
		width: 150rpx;
	}

	.item-right-box {
		height: 150rpx;
	}

	.six-img {
		width: 22rpx;
	}

	.success-box {
		width: 125rpx;
		height: 125rpx;
	}

	.color-dominant-hue {
		color: #D97DB0;
	}
</style>
