<template>
	<view class="ml12 pl10 pr10 mr12 mb12 bg-itsme-4 lh1 br10 float-hidden box-shadow-index"
		@click="toHome(isVisibleBool,index)">
		<view class="width-full flex align-items-center itsme-index-top">
			<view class="item-avatar ml10 mr10">
				<image :src="item.avatar | imageFilter('m11')" class="item-avatar" mode="aspectFill"></image>
			</view>
			<view class="ml12 mr12 flex-1 itsme-index-top flex flex-col flex-center">
				<view class="width-full flex align-items-center item-title">
					<view class="nowrap1 fs15 color-white">
						{{item.nickname || ''}}
					</view>
					<!-- 	<view class="name-bg pl5 pr5 bg-itsme-8 br10 flex flex-center align-items-center ml5">
						<view class="img-super-min flex">
							<image src="/static/itsme/its_1.png" class="img-super-min" mode="widthFix"></image>
						</view>
						<view class="color-white fs10 flex">
							{{item.worth}}
						</view>
					</view> -->
					<!-- vip 待判断 -->
					<view v-if="item.is_vip">
						<image src="../../static/itsme/its_7.png" class="item-title-icon ml5" mode="widthFix">
						</image>
					</view>
					<!-- 女神 待判断 -->
					<view class="none">
						<image src="../../static/itsme/itsme_11.png" class="item-title-icon ml5" mode="widthFix">
						</image>
					</view>
					<!-- 真人 -->
					<view v-if="isReal">
						<image src="../../static/itsme/its_2.png" class="item-title-icon ml5" mode="widthFix">
						</image>
					</view>
					<view class="flex align-items-center pl8 pr8 br20 float-hidden bg-itsme-8 ml6"
						v-if=" (item.gender === 1 && item.is_wx === 1 && item.is_vip === 1 )|| (item.gender === 0 && item.is_wx === 1 )" @click.stop="isShowWxPop(item)">
						<view class="icon_font fs12 mt2 color-green">
							&#xe648;
						</view>
						<view class="fs10 color-white ml5">
							解锁
						</view>
					</view>
				</view>
				<view class="width-full mt8 flex align-items-center">
					<view class="online-yes mr5" v-if="item && item.outtime && (nowTime1 - item.outtime) < 24 * 60 * 60 || item.is_online === 1"></view>
					<view class="online-no mr5"
						v-if="item && item.outtime && (nowTime1 - item.outtime) > 1 * 24 * 60 * 60 && (nowTime1 - item.outtime) < 7 * 24 * 60 * 60">
					</view>
					<view class="online-no2 mr5" v-if="item && item.outtime && (nowTime1 - item.outtime) >  7 * 24 * 60 * 60"></view>
					<view class="width-full nowrap1 fs11 color-shallow" v-if="item.is_online === 0">
						{{item.outtime | indexTimeFilter(item.server_time)}}
					</view>
					<view class="width-full nowrap1 fs11" v-else>
						活跃
					</view>
				</view>
				<view class="flex align-items-center mt10">
					<view class="color-white fs12 ">
						<text class="ml3"> {{item.gender === 1 ? '男' : '女' }} /</text>
						<text class="ml3"> {{item.age}} /</text>
						<text class="ml3"> {{item.profession}}</text>
					</view>
				</view>
				<view class="width-full flex align-items-center mt10">
					<view class="flex align-items-center flex-1" v-if="isLogin">
						<view class="color-white fs12 flex">
							<text class="nowrap fs15">{{item.distance}}</text> <text class="ml10 nowrap"> {{item.city}}
							</text>
						</view>
					</view>
				</view>
			</view>
			<view class="item-like-box pr10" @click.stop>
				<view class="width-full height flex flex-col align-items-center flex-center">
					<view class="flex-1 mt15" @click="likeBtn">
						<image src="/static/itsme/its_32.png" class="user-like-box" mode="widthFix" v-if="
							(isLogin && item.like===1) || (!isLogin && likeList.indexOf(item.id) !=-1)"></image>
						<image src="/static/itsme/its_34.png" class="user-like-box" mode="widthFix" v-else>
						</image>
					</view>
					<view class="flex-1">
						<view class="text-center" @click="toChat">
							<image src="/static/itsme/its_33.png" class="user-like-box" mode="widthFix"></image>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 会员权限 -->
		<!-- 充值vip弹框 -->
		<!-- 获取微信弹框 -->
		<view class="" v-if="showWxPop">
			<get-user-wx :showWxPop="showWxPop" :item="item" @closeWxPop="showWxPop = false"></get-user-wx>
		</view>
		<!-- 获取微信弹框 -->
	</view>
</template>

<script>
	import {
		mapGetters,
		mapActions
	} from 'vuex'
	//WX 弹框
	import getUserWx from '../../components/common/getUserWx.vue'
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
				likeIng: false,
				showPower: false,
				powerData: null,
				showMemberPay: false,
				memberCentent: '',
				showWxPop: false,
				nowTime1: Math.ceil(new Date().getTime() / 1000),
			}
		},
		props: {
			item: Object,
			index: Number,
			isLogin: Boolean,
			isVisibleBool: Boolean,
		},
		components: {
			homePower,
			getUserWx
		},
		watch: {
			powerData() {
				if (this.powerData.look >= this.powerData.total) {
					return this.memberCentent = ' 您今天的次数已经用完了 非会员每日只能查看' + this.powerData.total + '位用户  '

				} else {
					let number = this.powerData.total - this.powerData.look
					return this.memberCentent = '您今天还能查看' + number + '位用户  非会员每日只能查看' + this.powerData.total + '位用户  '
				}
			}
		},
		computed: {
			...mapGetters(['user', 'likeList', 'homeList']),
			isReal() {
				if (this.item && this.item.certify && JSON.parse(this.item.certify).real && JSON.parse(this.item.certify)
					.real.verified) {
					return true
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
						return ''
					}
				} else {
					return ''
				}
			}
		},
		mounted() {
			console.log(this.item)
			console.log((this.isLogin && this.item.like === 1) === true)
			console.log((!this.isLogin && this.likeList.indexOf(item.id) != -1) === true)
		},
		methods: {
			...mapActions(['LIKE_LIST', 'HOME_LIST']),
			// 去聊天
			toChat() {
				if (this.user.gender === this.item.gender) {
					uni.showToast({
						title: '对方与您性别相同，只能观赏不能互动喔~',
						icon: 'none'
					})
					return false
				}
				if (this.isLogin) {
					this.toOpenChat('like', this.item.id)
				} else {
					uni.navigateTo({
						url: '/pages/login/index'
					})
				}
			},
			isShowWxPop(item) {
				if (item.gender === this.user.gender) {
					uni.showToast({
						title: '同性之间，不可查看微信哦',
						icon: 'none'
					})
				} else {
					this.showWxPop = true
				}
			},
			// 喜欢/取消喜欢
			likeBtn() {
				console.log('123')
				let userIsReal = false
				if (this.user && this.user.is_real && this.user.is_real === 1) {
					userIsReal = true
				}
				// 女性非真人点击喜欢提示去真人认证
				if (this.user.gender === 0 && !userIsReal) {
					this.toShowPerfectPop()
					return false
				}
				// 同性不能点击喜欢
				if (this.user.gender === this.item.gender) {
					uni.showToast({
						title: '对方与您性别相同，只能观赏不能互动喔~',
						icon: 'none'
					})
					return false
				}
				this.likeIng = true
				if (this.isLogin) {
					if (this.item.like === 0) {
						this.setUserLike('list', 'del', this.item).then(res => {})
					} else {
						this.setUserLike('list', 'plus', this.item).then(res => {})
					}
					this.$emit('changeLike')
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
				}
				setTimeout(() => {
					this.likeIng = false
				}, 1000)
			},

			// 点击暂不开通
			showMember(powerData) {
				console.log(powerData)
				this.showMemberPay = false
				if (powerData.look >= powerData.total) {
					uni.showToast({
						title: '今日免费次数已用完',
						icon: 'none'
					})
				} else {
					uni.navigateTo({
						url: '/pages/itsme/home?id=' + this.powerData.id
					})
				}
				console.log(this.showMemberPay)
			},
			// 去用户首页
			toHome(isVisible, index) {
				if (this.item.id !== this.user.id) {
					let gender = this.user.gender
					if (isVisible && index !== 0) { // 判断
						this.$emit('memberPop', this.user.gender)
					} else {
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
									this.$emit('openBounced', this.powerData)
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

	.user-mask {
		position: relative;
		filter: blur(5rpx);
		user-select: none;
	}

	.user-mask::after {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		content: '';
		display: block;
		background: rgba(0, 0, 0, 0.8);
	}

	.color-poper {
		color: #D97DB0;
	}

	.online-yes {
		width: 8rpx;
		height: 8rpx;
		border-radius: 8rpx;
		background: #3DE89C;
	}
	
	.online-no {
		width: 8rpx;
		height: 8rpx;
		border-radius: 8rpx;
		background: #0f80cf;
	}
	
	.online-no2 {
		width: 8rpx;
		height: 8rpx;
		border-radius: 8rpx;
		background: #fcbf57;
	}

	.user-like-box {
		width: 60rpx;
		height: 60rpx;
	}

	.img-super-min {
		width: 19rpx;
		height: 19rpx;
	}

	.color-green {
		color: #06CA64;
	}
</style>
