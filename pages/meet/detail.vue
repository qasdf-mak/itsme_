<template>
	<view class="width-full lh1 height100vh">
		<view class="width-full pt15">
			<!-- top -->
			<custom-top title="详情" :isMyId="userInfoId" @clickMore="showDel = true"></custom-top>
			<!-- top -->
			<!-- 用户 -->
			<view class="width-full flex align-items-center mb15 user-box" v-if="userInfo" @click="toHome()">
				<view class="avator-box ml10 float-hidden">
					<image :src="userInfo.avatar | imageFilter('m11')" class="avator-box" mode="aspectFill"></image>
				</view>
				<view class="ml25 flex-1">
					<view class="width-full flex align-items-center">
						<view class="fs15 color-deep fw600 mr5">
							{{userInfo.nickname}}
						</view>
						<image src="../../static/base/base_5.png" class="user-six-img" mode="widthFix"
							v-if="userInfo.gender === 1"></image>
						<image src="../../static/base/base_4.png" class="user-six-img" mode="widthFix" v-else></image>
						<view class="ml15 flex flex-right flex-1 align-items-center mr25">
							<image src="../../static/base/base_6.png" class="user-worth-img" mode="widthFix"></image>
							<view class="color-deep fs20 fw600 ml5">
								{{userInfo.worth}}
							</view>
						</view>
					</view>
					<view class="width-full flex align-items-center mt10">
						<view class="flex align-items-center">
							<image src="../../static/base/base_1.png" class="user-bot-img" mode="widthFix"></image>
							<view class="fs11 color-middle ml5">
								{{userInfo.profession || '自由职业'}}
							</view>
						</view>
						<view class="flex align-items-center ml12">
							<image src="../../static/base/base_2.png" class="user-bot-img" mode="widthFix"></image>
							<view class="fs11 color-middle ml5">
								{{userInfo.age}}岁
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 动态内容 -->
			<view class="width-full" v-if="detail">
				<view class="ml25 mr20 fs15 color-deep fw600 lh15" v-if="detail.content">
					{{detail.content}}
				</view>
				<view class="ml20 mr10 flex flex-wrap mt15" v-if="detail.attachment && detail.attachment.length === 1">
					<view class="width-full" v-if="detail.attachment[0].type === 1" @click="previewImage()">
						<image :src="detail.attachment[0].url | imageFilter" class="width-full" mode="widthFix"></image>
					</view>
					<view class="width-full video-box" v-if="detail.attachment[0].type === 2">
						<video-item :url="detail.attachment[0].url" :isPlay="isPlayVideo"
							@toPlayVideo="isPlayVideo = true" @videoEnded="isPlayVideo = false"></video-item>
					</view>
				</view>
				<view class="ml20 mr10 flex flex-wrap mt15" v-if="detail.attachment && detail.attachment.length > 1">
					<view v-for="(item,index) in detail.attachment" :key="index">
						<view class="life-imglist-box mr10 mb10 br5 float-hidden" @click="previewImage(index)">
							<image :src="item.url | imageFilter('m11')" class="life-imglist-box" mode="widthFix">
							</image>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="fixed bottom left right bg-white pb_iphoneX_safe">
			<view class="pl15 pr15 pt15 flex flex-between align-items-end mb10">
				<view class="fs12 color-shallow" v-if="detail && detail.createtime">
					{{detail.createtime | lifeTimeFilter}}
				</view>
				<view class="flex align-items-center">
					<view class="flex flex-col flex-center align-items-center mr25" @click="Share(detail)">
						<view class="icon_font fs25 color-999999">
							&#xe612;
						</view>
						<view class="fs14 color-999999 mt10">
							{{detail && detail.forward_num}}
						</view>
					</view>
					<view class="flex flex-col flex-center align-items-center mr25" @click="getliked(detail)">
						<view class="icon_font fs25 color-999999" v-if="discoverlist == 1">
							&#xe600;
						</view>
						<view class="icon_font fs25 color-999999" v-else>
							&#xe65c;
						</view>
						<view class="fs14 color-999999 mt10">
							{{detail && detail.like_num}}
						</view>
					</view>
				</view>
			</view>
			<view class="pl15 pr15 pt20 pb30 align-items-center" v-if="userInfo && userInfo.id !== user.id">
				<view class="flex align-items-center flex-center" v-if="!isLike">
					<view class="flex-1 flex align-items-center flex-center mr15" @click="changeLike(userInfo)">
						<view class="like-btn">
							<image src="../../static/base/like_m.png" class="like-btn" mode=""></image>
						</view>
					</view>
					<view class="flex-1 flex align-items-center flex-center" @click="goOpenChat(userInfo)">
						<view class="like-btn">
							<image src="../../static/base/chat_m.png" class="like-btn" mode=""></image>
						</view>
					</view>
				</view>
				<view class="pl35 pr35 flex-1" v-else>
					<view class="flex-1 ml20 mr20 chat-btn flex align-items-center flex-center"
						@click="toOpenChat('meetDetail',userInfo.id)">
						<view class="icon_font fs20 color-purple">
							&#xe652;
						</view>
						<view class="fs15 color-deep ml12">
							聊天
						</view>
					</view>
				</view>
			</view>
			<!-- 完善资料 -->
			<view class="width-full" v-if="showPerfectPop">
				<perfect-pop @refreshTheList="refreshTheList" @closePerfectPop="toHidePerfectPop">
				</perfect-pop>
			</view>
			<!-- 完善资料 -->
			<!-- 	<home-power :showPower="showPower" :powerData="powerData" @closePop="showPower = false"></home-power> -->
			<!-- 充值vip弹框 -->
			<member-pay :showMemberPay="showMemberPay" :powerData="powerData" :centent="memberCentent"
				@closePop="showMember(powerData)" @paySuccess="showMemberPay = false">
			</member-pay>
		</view>
		<view v-if="showRedPacket">
			<red-packet></red-packet>
		</view>
		<u-action-sheet :list="moreList" v-model="showDel" @click="delLife"></u-action-sheet>
	</view>
</template>

<script>
	import {
		mapGetters,
		mapActions
	} from 'vuex'
	import CommonService from '../../common/service/common-service.js'
	import UserService from '../../common/service/user-service.js'
	import DiscoverService from '../../common/service/discover-service.js'
	import videoItem from '../../components/video/item.vue'
	import homePower from '../../components/common/homePower.vue'
	import {
		formatImage
	} from '../../common/utils/common-methods'
	export default {
		data() {
			return {
				likeIng: false,
				meetId: null,
				showMemberPay: false,
				memberCentent: '',
				isPlayVideo: true,
				detail: '',
				userInfo: null,
				discoverlist: Number,
				showPower: false,
				powerData: null,
				isLogin: false, // 登录状态
				showDel: false,
				moreList: [{
					text: '删除这条动态'
				}]
			}
		},
		onLoad(options) {
			this.init(options)
			this.discoverlist = options.isFabulous
		},
		components: {
			videoItem,
			homePower
		},
		computed: {
			...mapGetters(['user']),
			userInfoId() {
				if (this.userInfo && this.userInfo.id === this.user.id) {
					return true
				} else {
					return false
				}
			},
			isreal() {
				if (this.user && this.user.gender === 0 && this.user.certify && JSON.parse(this.user.certify).real && JSON
					.parse(this.user.certify).real.verified) {
					return true
				} else {
					return false
				}
			},
			isLike() {
				if (this.isLogin) {
					if (this.userInfo && this.userInfo.is_like === 1) {
						return true
					} else {
						return false
					}
				} else {
					if (this.userInfo && this.likeList && this.likeList.indexOf(this.userInfo.id) !== -1) {
						return true
					} else {
						return false
					}
				}
				return false
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
					return this.memberCentent = '您今天还能查看' + number + '位用户 非会员每日只能查看' + this.powerData.total + '位用户  '
				}
			}
		},
		methods: {
			...mapActions(['IS_SHARE', 'IFTHE_REFRESH']),
			init(options) {
				Object.assign(this.$data, this.$options.data())
				this.loginExpire().then(res => {
					this.isLogin = res
					this.getLifeDetail()
				})
				this.meetId = options.id
			},
			getLifeDetail() {
				CommonService.lifedetails({
					life_id: this.meetId
				}).then(res => {
					if (res.code === 1) {
						this.detail = res.data
						console.log(this.detail)
						this.userInfo = res.data.user_info
						console.log('this.userInfo')
						console.log(this.userInfo)
						console.log('this.userInfo')
					}
				})
			},
			previewImage(index) {
				let images = this.detail.attachment.map(item => {
					return formatImage(item.url)
				})
				console.log(images)
				uni.previewImage({
					current: index,
					urls: images,
				});
			},
			changeLike(item) {
				let userIsReal = false
				console.log(item)
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
				if (this.user.gender === item.gender) {
					uni.showToast({
						title: '对方与您性别相同，只能观赏不能互动喔~',
						icon: 'none'
					})
					return false
				}
				if (!this.likeIng) {
					this.likeIng = true
					if (this.userInfo.is_like === 0) {
						this.setUserLike('list', 'plus', this.userInfo).then(res => {
							this.userInfo.is_like = 1
							this.likeIng = false
						})
					} else {
						this.setUserLike('list', 'del', this.userInfo).then(res => {
							this.userInfo.is_like = 0
							this.likeIng = false
						})
					}
				}
			},
			goOpenChat(item) {
				console.log(item)
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
				if (this.user.gender === item.gender) {
					uni.showToast({
						title: '对方与您性别相同，只能观赏不能互动喔~',
						icon: 'none'
					})
					return false
				}
				this.toOpenChat('detail', item.id)
			},
			//点赞
			getliked(item) {
				if (this.isreal || this.user.gender === 1) {
					UserService.liked({
						life_id: item.id,
						type: 2
					}).then(res => {
						if (res.code === 1) {
							console.log(this.discoverlist)
							if (this.discoverlist === '1') {
								this.discoverlist = 0
								this.detail.like_num--
								console.log(item.like)
							} else {
								this.discoverlist = 1
								this.detail.like_num++
								console.log(item.like)
							}
						}
					})
				} else {
					this.toShowPerfectPop()
				}
			},
			// 分享
			Share(item) {
				UserService.liked({
					life_id: item.id,
					type: 1
				}).then(res => {
					if (res.code === 1) {
						this.shareWx(1)
					}
				})
			},
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
			},
			delLife(index) {
				console.log(index)
				DiscoverService.userlifedel({
					life_id: this.detail.id
				}).then(res => {
					if (res.code === 1) {
						uni.navigateBack({
							delta: 1
						})
					}
				})
				this.IFTHE_REFRESH(true)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.avator-box {
		width: 90rpx;
		height: 90rpx;
		border-radius: 90rpx;
	}

	.user-bot-img {
		width: 24rpx;
	}

	.like-btn {
		width: 125rpx;
		height: 125rpx;
	}


	.item-video-box {
		width: calc(100vw - 48rpx);
		height: calc((100vw - 48rpx) * 3 / 4);
	}

	.video-box {
		width: calc(100vw - 60rpx);
		height: calc(100vw - 60rpx);
	}

	.user-box {
		height: 90rpx;
	}

	.user-six-img {
		width: 24rpx;
	}

	.user-worth-img {
		width: 24rpx;
	}

	.user-chat-img {
		width: 72rpx;
	}

	.user-like-img {
		width: 65rpx;
	}

	.life-imglist-box {
		width: calc((100vw - 120rpx) / 3);
		height: calc((100vw - 120rpx) / 3);
	}

	.home-bot-btn {
		height: 90rpx;
		border-radius: 90rpx;
		box-shadow: 0 0 8rpx #EEEEEE !important;
	}

	.home-bot-img {
		width: 90rpx;
	}

	.chat-btn {
		height: 90rpx;
		background: #FFFFFF;
		box-shadow: 0rpx 5rpx 12rpx 0rpx rgba(217, 125, 213, 0.63);
		border-radius: 45rpx;
	}

	.color-purple {
		color: #D97DB0;
	}
</style>
