<template>
	<view class="width-full lh1">
		<view class="width-full pl15 pr15 pt15 pb15 border-box lh1 flex align-items-center"
			:class="item.top === '0' ? 'bg-itsme-1' : 'bg-itsme-4'" @click="toChat(item.to_user_id,item.nickname)" @longpress="longPress">
			<view class="avatar-box mr18 relative">
				<image :src="item.avatar | imageFilter('m11')" class="avatar-img" mode="aspectFill"></image>
				<view class="user-online absolute" v-if="item.is_online === 1"></view>
			</view>
			<view class="flex-1">
				<view class="width-full flex align-items-center">
					<view class="flex-1 flex align-items-center">
						<view class="fs15 color-white nowrap1 fw600">
							{{item.nickname}}
						</view>
						<view class="gender-img-box ml3" v-if="item.gender && item.gender === 1">
							<image src="/static/itsme/its_30.png" class="gender-img-box" mode="widthFix"></image>
						</view>
						<view class="gender-img-box ml3" v-else>
							<image src="/static/itsme/its_31.png" class="gender-img-box"  mode="widthFix"></image>
						</view>
					<!-- 	<view class="flex align-items-center pl8 pr3 br12 float-hidden bg-itsme-8 ml5">
							<image src="../../static/itsme/its_1.png" class="itsme-user-worth mt3" mode="widthFix">
							</image>
							<view class="fs10 color-white ml5 lh15 mr10">
								{{item.worth || 0}}
							</view>
						</view> -->
						<view class="ml8">
							<image src="../../static/itsme/its_2.png" class="chat-list-img" mode="widthFix"
								v-if="item.gender === 0"></image>
							<image src="../../static/itsme/its_7.png" class="chat-list-img" mode="widthFix"
								v-if="item.gender === 1 && item.is_vip === 1"></image>
						</view>
					</view>
					<view class="fs11 color-itsme-10" v-if="item.updatetime">
						{{item.updatetime | formatTime}}
					</view>
				</view>
				<view class="width-full flex align-items-center mt12">
					<view class="flex-1" v-if="item.msg_show">
						<!-- 文字 -->
						<view class="fs14 color-itsme-10 lh15 nowrap1" v-if="item && item.type === 'itsme_text'">
							{{payloadData.text}}
						</view>
						<!-- 图片 -->
						<view class="fs14 color-itsme-10 lh15 nowrap1" v-if="item && item.type === 'itsme_image'">
							[图片]
						</view>
						<!-- 视频 -->
						<view class="fs14 color-itsme-10 lh15 nowrap1" v-if="item && item.type === 'itsme_video'">
							[视频]
						</view>
						<!-- 语音 -->
						<view class="fs14 color-itsme-10 lh15 nowrap1" v-if="item && item.type === 'itsme_audio'">
							[语音]
						</view>
						<!-- Me约 -->
						<view class="fs14 color-itsme-10 lh15 nowrap1" v-if="item && item.type === 'itsme_task'">
							[Me约]
						</view>
						<!-- 抵用券 -->
						<view class="fs14 color-itsme-10 lh15 nowrap1" v-if="item && item.type === 'itsme_voucher'">
							[会员券]
						</view>
						<!-- 礼物 -->
						<view class="fs14 color-itsme-10 lh15 nowrap1" v-if="item && item.type === 'itsme_gift'">
							[礼物] <!-- {{payloadData.name}} -->
						</view>
						<view class="fs14 color-itsme-10 lh15 nowrap1" v-if="item && item.type === 'itsme_common_tobingwx'">
							{{payloadData.text}}
						</view>
						<!-- 系统 -->
						<view class="fs14 color-itsme-10 lh15 nowrap1" v-if="item && item.type === 'itsme_common_task'">
							{{payloadData.text}}
						</view>
						<!-- 系统-喜欢 -->
						<view class="fs14 color-itsme-10 lh15 nowrap1" v-if="item && item.type === 'itsme_common_like'">
							{{payloadData.text}}
						</view>
						<!-- 系统-邀请填写资料 -->
						<view class="fs14 color-itsme-10 lh15 nowrap1"
							v-if="item && item.type === 'itsme_common_invited'">
							{{payloadData.text}}
						</view>
						<!-- 系统-使用了对方的会员券 -->
						<view class="fs14 color-itsme-10 lh15 nowrap1"
							v-if="item && item.type === 'itsme_common_paySuccess'">
							{{item.user_id == user.id ? '[已用会员券]' : '会员券被使用]'}}
						</view>
					</view>
					<view class="flex-1" v-else>
						<!-- 隐藏消息 -->
						<view class="fs14 color-itsme-10 lh15 nowrap1" v-if="item && item.type === 'itsme_text'">
							[新消息]
						</view>
						<!-- 图片 -->
						<view class="fs14 color-itsme-10 lh15 nowrap1" v-if="item && item.type === 'itsme_image'">
							[图片]
						</view>
						<!-- 视频 -->
						<view class="fs14 color-itsme-10 lh15 nowrap1" v-if="item && item.type === 'itsme_video'">
							[视频]
						</view>
						<!-- 语音 -->
						<view class="fs14 color-itsme-10 lh15 nowrap1" v-if="item && item.type === 'itsme_audio'">
							[语音]
						</view>
						<!-- 抵用券 -->
						<view class="fs14 color-itsme-10 lh15 nowrap1" v-if="item && item.type === 'itsme_voucher'">
							[会员券]
						</view>
					</view>
					<view class="num-box fs10 color-white text-center" v-if="item.num > 0">
						{{item.num}}
					</view>
				</view>
			</view>
		</view>
		<view class="itsme-action-sheet-box">
			<u-action-sheet :list="sheetList" v-model="showSheet" @click="clickSheet"></u-action-sheet>
		</view>
	</view>
</template>

<script>
	import {
		mapGetters
	} from 'vuex'
	import ChatService from '../../common/service/chat-service.js'
	export default {
		name: 'message-list',
		data() {
			return {
				showSheet: false,
				sheetList: []
			}
		},
		props: {
			item: Object,
			index:Number
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
			...mapGetters(['user']),
			payloadData() {
				return this.item && this.item.payload && JSON.parse(this.item.payload)
			},
			isReal() {
				if (this.item && this.item.certify) {
					let certify = JSON.parse(this.item.certify)
					if (certify.real && certify.real.verified) {
						return true
					} else {
						return false
					}
				} else {
					return false
				}
			},
			isGoddess() {
				if (this.item && this.item.certify) {
					let certify = JSON.parse(this.item.certify)
					if (certify.goddess && certify.goddess.verified) {
						return true
					} else {
						return false
					}
				} else {
					return false
				}
			}
		},
		mounted() {
			console.log(this.item,this.index)
		},
		methods: {
			// 去聊天
			toChat(id,name) {
				uni.navigateTo({
					url: '/pages/message/chat/private/index?formpage=chatlist&tofriend=' + id
				})
			},
			longPress() {
				if (this.item.top === '0') {
					this.sheetList = [{
							text: '置顶'
						},
						{
							text: '删除'
						}
					]
				} else {
					this.sheetList = [{
							text: '取消置顶'
						},
						{
							text: '删除'
						}
					]
				}
				this.showSheet = true
			},
			clickSheet(index) {
				console.log(index)
				if (index === 0) {
					this.changeTop()
				}
				if (index === 1) {
					this.delList()
				}
			},
			delList() {
				ChatService.chatlistdel({
					user_id: this.item.to_user_id
				}).then(res => {
					if (res.code === 1) {
						this.$emit('delList')
					}
				})
			},
			changeTop() {
				ChatService.chatusertop({
					user_id: this.item.to_user_id,
					top: this.item.top === '0' ? '1' : '0'
				}).then(res => {
					if (res.code === 1) {
						this.$emit('changeTopSuccess')
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.avatar {
		&-box {
			width: 120rpx;
			height: 120rpx;
		}

		&-img {
			width: 120rpx;
			height: 120rpx;
			border-radius: 120rpx;
		}
	}

	.num-box {
		width: 36rpx;
		height: 36rpx;
		line-height: 36rpx;
		border-radius: 36rpx;
		background: #FF5050;
	}

	.user-online {
		width: 18rpx;
		height: 18rpx;
		border-radius: 18rpx;
		background: #35BE27;
		top: 1rpx;
		right: 20rpx;
	}

	.user-six {
		width: 25rpx;
		height: 25rpx;
		border-radius: 25rpx;
	}

	.user-six-img {
		width: 20rpx;
		height: 20rpx;
	}

	.user-img-1 {
		width: 24rpx;
	}

	.chat-sex-box {
		width: 30rpx;
		height: 30rpx;
		border-radius: 30rpx;
	}

	.chat-list-img {
		width: 30rpx;
		height: 30rpx;
	}

	.itsme-user-worth {
		width: 24rpx;
		height: 24rpx;
	}

	.gender-img-box {
		width: 31rpx;
		height: 31rpx;
	}
</style>
