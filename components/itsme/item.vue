<template>
	<view class="ml12 pl10 pr10 mr12 mb12 bg-white lh1 br10 float-hidden box-shadow-index itsme-index-box"
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
					<view v-if="isGoddess">
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
					<view class="width-full nowrap1 fs11 color-syzx" v-else>
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
				<view class="width-full height flex flex-col align-items-center flex-center"
					v-if="(isLogin && item.like === 1) || (!isLogin && likeList.indexOf(item.id) !== -1)">
					<image src="../../static/index/index_5.png" class="item-like-yes mb5" mode="widthFix"
						@click="likeBtn"></image>
					<view class="flex align-items-center flex-col flex-center" @click="toChat">
						<image src="../../static/index/index_6.png" class="item-like-chat" mode="widthFix"></image>
						<view class="fs14 color-deep mt8">
							聊天
						</view>
					</view>
				</view>
				<view class="width-full height flex flex-col align-items-center flex-center" v-else @click="likeBtn">
					<image src="../../static/index/index_4.png" class="item-like-no" mode="widthFix"></image>
					<view class="fs14 color-deep mt8">
						喜欢
					</view>
				</view>
			</view>
		</view>
		<view class="width-full flex align-items-center itsme-index-bot">
			<view class="flex-1 height flex align-items-center">
				<image src="../../static/base/base_1.png" class="item-bottom-icon ml15" mode="widthFix"></image>
				<view class="fs12 flex-1 color-middle ml6 nowrap1">
					{{profession}}
				</view>
			</view>
			<view class="flex-1 height flex align-items-center">
				<image src="../../static/base/base_2.png" class="item-bottom-icon ml15" mode="widthFix"></image>
				<view class="fs12 flex-1 color-middle ml6 nowrap1">
					{{item.age}}岁
				</view>
			</view>
			<view class="flex-1 height flex align-items-center">
				<image src="../../static/base/base_3.png" class="item-bottom-icon ml15" mode="widthFix"></image>
				<view class="fs12 flex-1 color-middle ml6 nowrap1">
					{{item.distance}}
				</view>
			</view>
		</view>
		<!-- 会员权限 -->
		<member-pop :showPop="showMemberPop" :member="memberData" popType="look" @closePop="showMemberPop = false">
		</member-pop>
		<!-- 充值vip弹框 -->
		<member-pay :showMemberPay="showMemberPay" :powerData="powerData" :centent="memberCentent"
			@closePop="showMember(powerData)" @paySuccess="showMemberPay = false">
		</member-pay>
	</view>
</template>

<script>
	import {
		mapGetters,
		mapActions
	} from 'vuex'
	import UserService from '../../common/service/user-service.js'
	import CommonService from '../../common/service/common-service.js'
	import homePower from '../common/homePower.vue'
	export default {
		name: 'user-index',
		data() {
			return {
				// 会员权限弹框
				showMemberPop: false,
				memberData: {
					look: 0,
					total: 0
				},
				showPower: false,
				powerData: null,
				showMemberPay: false,
				memberCentent: ''
			}
		},
		props: {
			item: Object,
			isLogin: Boolean
		},
		components: {
			homePower
		},
		computed: {
			...mapGetters(['user', 'likeList', 'homeList']),
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
		watch: {
			powerData() {
				if (this.powerData.look >= this.powerData.total) {
					console.log(123)
					return this.memberCentent = ' 您今天的次数已经用完了 非会员每日只能查看' + this.powerData.total + '位用户  '
		
				} else {
					console.log(321)
					let number = this.powerData.total - this.powerData.look
					return this.memberCentent = '您今天还能查看' + number + '位用户  非会员每日只能查看' + this.powerData.total + '位用户   '
				}
			}
		},
		methods: {
			...mapActions(['LIKE_LIST', 'HOME_LIST']),
			// 去聊天
			toChat() {
				if (this.isLogin) {
					this.toOpenChat('itsmelist', this.item.id)
				} else {
					uni.navigateTo({
						url: '/pages/login/index'
					})
				}
			},
			// 喜欢/取消喜欢
			likeBtn() {
				if (this.isLogin) {
					console.log(this.item.like)
					if (this.item.like === 0) {
						this.$emit('changeLike')
						this.setUserLike('list', 'plus', this.item).then(res => {})
					} else {
						this.$emit('changeLike')
						this.setUserLike('list', 'del', this.item).then(res => {})
					}
				} else {
					let likes = JSON.parse(JSON.stringify(this.likeList))
					if (likes && likes.length > 0 && likes.indexOf(this.item.id) !== -1) {
						likes.splice(likes.indexOf(this.item.id), 1)
						this.LIKE_LIST(likes)
					} else {
						if (likes && likes.length >= 2) {
							likes.push(this.item.id)
							this.LIKE_LIST(likes)
							uni.navigateTo({
								url: '/pages/login/index'
							})
						} else {
							likes.push(this.item.id)
							this.LIKE_LIST(likes)
						}
					}
					this.likeIng = false
				}
			},

			// 去用户首页
			toHome() {
				if (this.item.id !== this.user.id) {
					if (this.isLogin) {
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
								this.showMemberPay = true
							}
						})
					} else {
						let nowtime = new Date().getTime()
						let homes = JSON.parse(JSON.stringify(this.homeList)).filter(item => {
							return nowtime - item.time < 24 * 60 * 60 * 1000
						})
						if (homes && homes.length > 0) {
							let oldhome = homes.filter(item => {
								return item.id === this.item.id
							})
							if (oldhome && oldhome.length > 0) {
								homes.splice(homes.indexOf(oldhome[0]), 1)
								homes.push({
									id: this.item.id,
									time: nowtime
								})
								this.HOME_LIST(homes)
								uni.navigateTo({
									url: '/pages/itsme/home?id=' + this.item.id
								})
							} else {
								console.log(homes.length)
								if (homes.length === 3) {
									this.HOME_LIST(homes)
									uni.navigateTo({
										url: '/pages/login/index'
									})
								} else {
									homes.push({
										id: this.item.id,
										time: nowtime
									})
									this.HOME_LIST(homes)
									uni.navigateTo({
										url: '/pages/itsme/home?id=' + this.item.id
									})
								}
							}
						} else {
							homes.push({
								id: this.item.id,
								time: nowtime
							})
							this.HOME_LIST(homes)
							uni.navigateTo({
								url: '/pages/itsme/home?id=' + this.item.id
							})
						}
					}
				}
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
</style>
