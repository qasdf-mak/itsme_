<template>
	<view class="width-full lh1">
		<view class="ml15 mr15 pb35 flex" @click="toHome">
			<!-- 封面 -->
			<view class="user-avatar br5 float-hidden relative">
				<image :src="item.avatar | imageFilter" class="user-avatar" mode="aspectFill"
					v-if="item.avatar"></image>
				<view v-if="item.gender === 1 && item.is_vip === 1">
					<view class="absolute top10 left8 user-top-horn">
						<image src="../../static/itsme/its_7.png" class="user-top-horn" mode="widthFix"></image>
					</view>
				</view>
				<view v-if="item.gender === 0 && item.is_real === 1">
					<view class="absolute top10 left8 user-top-horn">
						<image src="../../static/itsme/its_2.png" class="user-top-horn" mode="widthFix"></image>
					</view>
				</view>
				<view class="absolute bottom bg-mask pt5">
					<view class="ml6 mr10 mt35 flex align-items-center flex-between">
						<view class="flex align-items-center">
							<view class="fs15 color-white fw600">
								{{item.nickname}}
							</view>
						</view>
					</view>
					<view class="flex align-items-center ml6 mt8">
						<view class="flex align-items-center flex-1">
							<view class="flex align-items-center mr6">
								<view class="online-yes mr5"
									v-if="item && item.outtime && (nowTime1 - item.outtime) < 24 * 60 * 60 || item.is_online === 1">
								</view>
								<view class="online-no mr5"
									v-if="item && item.outtime && (nowTime1 - item.outtime) > 1 * 24 * 60 * 60 && (nowTime1 - item.outtime) < 7 * 24 * 60 * 60">
								</view>
								<view class="online-no2 mr5"
									v-if="item && item.outtime && (nowTime1 - item.outtime) >   7 * 24 * 60 * 60">
								</view>
								<view class="fs10 color-white" v-if="item.is_online === 0">
									{{item.outtime | indexTimeFilter(item.server_time)}}
								</view>
								<view class="fs12 color-white" v-else>
									活跃
								</view>
							</view>
							<view class="color-white fs10 flex">
								<text class="nowrap fs10">{{item.distance || '152km'}}</text>
								<text class="ml10 nowrap fs10"> {{item.city || '太原市'}}
								</text>
							</view>
						</view>
					</view>
					<view class="flex align-items-center ml6 mt8 opacity60">
						<view class="color-white fs10">
							<text class="ml3"> {{item.gender === 1 ? '男' : '女' }} /</text>
							<text class="ml3"> {{item.age}} /</text>
							<text class="ml3"> {{item.profession || '自由职业'}}</text>
						</view>
					</view>
				</view>
			</view>
			<!-- 封面 -->
			<!-- 资料 -->
			<view class="flex-1 ml15 float-hidden relative">
				<view class="ml2">
					<view class="width-full flex align-items-center mt12 mb10" @click.stop v-if="item.gender === 0">
						<view class="flex align-items-center pl10 pr10 pt5 pb5 br20 float-hidden ml6 "
							:class="item.is_wx === 1 ? 'wx_box' : 'is_wx_box'" @click="isShowWxPop(item)">
							<view class="icon_font fs14 mt2 "
								:class="item.is_wx === 1 ? 'color-green' : 'color-9B9999'">
								&#xe648;
							</view>
							<view class="fs12 color-white ml5" v-if="item.is_wx === 1">
								解锁
							</view>
							<view class="fs12 color-white ml5" v-else>
								未认证
							</view>
						</view>
					</view>
					<view class="width-full flex align-items-center mt12 mb10" @click.stop v-else>
						<view class="flex align-items-center pl10 pr10 pt5 pb5 br20 float-hidden ml6 "
							:class="item.is_wx === 1 ? 'wx_box' : 'is_wx_box'" v-if="item.is_vip === 1" @click="isShowWxPop(item)">
							<view class="icon_font fs14 mt2 "
								:class="item.is_wx === 1 ? 'color-green' : 'color-9B9999'">
								&#xe648;
							</view>
							<view class="fs12 color-white ml5" v-if="item.is_wx === 1">
								解锁
							</view>
							<view class="fs12 color-white ml5" v-else>
								未认证
							</view>
						</view>
						<view class="flex align-items-center pl10 pr10 pt5 pb5 br20 float-hidden ml6 is_wx_box" @click="ShowWxPop(item)" v-else>
							<view class="icon_font fs14 mt2 color-9B9999" >
								&#xe648;
							</view>
							<view class="fs12 color-white ml5">
								未认证
							</view>
						</view>
					</view>
				</view>
				<view class="flex flex-wrap mr3">
					<view class="" v-for="(item,index) in item.expect" :key="index">
						<view class=" text-center skills-box fs13 mt8 mr3 color-black"
							:style="{'background-color':item.color}">
							{{item.name}}
						</view>
					</view>
				</view>
				<view class="width-full flex mt30 pl10 pr10 flex-between absolute bottom12" @click.stop>
					<view class="itsme-user-btn" @click="likeBtn">
						<image src="../../static/itsme/its_34.png" class="itsme-user-btn" mode="widthFix"
							v-if="((isLogin && item.like === 0) || (!isLogin && likeList.indexOf(item.id) === -1))">
						</image>
						<image src="../../static/itsme/its_32.png" class="itsme-user-btn" mode="widthFix" v-else>
						</image>
					</view>
					<view class="itsme-user-btn">
						<image src="../../static/itsme/its_33.png" class="itsme-user-btn" mode="widthFix"
							@click="toChat"></image>
					</view>
				</view>
			</view>
			<!-- 资料 -->
			<!-- 获取微信弹框 -->
			<view class="" v-if="showWxPop">
				<get-user-wx :showWxPop="showWxPop" :item="item" @closeWxPop="showWxPop = false"></get-user-wx>
			</view>
			<!-- 获取微信弹框 -->
		</view>
		<u-toast ref="uToast" />
		<view class="" v-if="showUnifyPop">
			<unify-pop :showUnify="showUnifyPop" :type="unifyType" @closePop="showUnifyPop = false" @reminfBingWx="reminfBingWx">
			</unify-pop>
		</view>
	</view>
</template>

<script>
	import {
		mapGetters,
		mapActions
	} from 'vuex'
	import UserService from '../../common/service/user-service.js'
	import CommonService from '../../common/service/common-service.js'
	//WX 弹框
	import getUserWx from '../../components/common/getUserWx.vue'
	export default {
		name: 'user-index',
		data() {
			return {
				// 会员权限弹框
				likeIng: false,
				showPower: false,
				showUnifyPop:false,
				unifyType:null,
				showWxPop: false,
				memberCentent: '',
				// randColor:['咖啡聊天'],
				randColor: ['咖啡聊天', '树洞倾诉', '去打台球', '咖啡聊天', '密室逃脱'],
				nowTime1: Math.ceil(new Date().getTime() / 1000),
			}
		},
		props: {
			item: Object,
			isLogin: Boolean
		},
		computed: {
			...mapGetters(['user', 'likeList', 'homeList'])
		},
		components: {
			getUserWx
		},
		methods: {
			...mapActions(['LIKE_LIST', 'HOME_LIST']),
			// 去聊天
			isShowWxPop(item) {
				if (this.isLogin) {
					if(item.is_wx === 1){
						if (item.gender === this.user.gender) {
							uni.showToast({
								title: '同性之间，不可查看微信哦',
								icon: 'none'
							})
						} else {
							this.showWxPop = true
						}
					}else{
						this.showUnifyPop = true
						this.unifyType = 33
					}
				} else {
					uni.reLaunch({
						url: '/pages/login/index'
					})
				}
			},
			ShowWxPop(item){
				if(item.gender !== this.user.gender){
					this.showUnifyPop = true
					this.unifyType = 33
				}else{
					uni.showToast({
						title: '同性之间，不可查看微信哦',
						icon: 'none'
					})
				}
			},
			toChat() {
				if (this.isLogin) {
					// 女性非真人点击喜欢提示去真人认证
					if (this.user.is_real === 2 && this.user.gender === 0) {
						console.log('女性非真人点击喜欢提示去真人认证')
						this.$emit('userRefuse', 'like', 1)
						return false
					}
					// 同性不能点击喜欢
					if (this.user.gender === this.item.gender) {
						console.log('同性不能点击喜欢')
						this.$emit('userRefuse', 'like', 2)
						return false
					}
					this.toOpenChat('itsmelist', this.item.id)
				} else {
					uni.navigateTo({
						url: '/pages/login/index'
					})
				}
			},
			// 喜欢/取消喜欢
			likeBtn() {
				if (this.likeIng) {
					return false
				}
				if (this.isLogin) {
					let userIsReal = false
					if (this.user.is_real && this.user.is_real === 1) {
						userIsReal = true
					}
					// 女性非真人点击喜欢提示去真人认证
					if (this.user.gender === 0 && !userIsReal) {
						console.log('女性非真人点击喜欢提示去真人认证')
						this.$emit('userRefuse', 'like', 1)
						return false
					}
					// 同性不能点击喜欢
					if (this.user.gender === this.item.gender) {
						console.log('同性不能点击喜欢')
						this.$emit('userRefuse', 'like', 2)
						return false
					}
					this.likeIng = true
					if (this.item.like === 1) {
						// 取消喜欢
						this.setUserLike('list', 'del', this.item).then(res => {})
					} else {
						// 添加喜欢
						this.setUserLike('list', 'plus', this.item).then(res => {})
						// this.$refs.uToast.show({
						// 	title: '喜欢信号已发出，可以和TA聊天了'
						// })
					}
					this.$emit('changeLike')
					setTimeout(() => {
						this.likeIng = false
					}, 1000)
				} else {
					this.likeIng = true
					setTimeout(() => {
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
					}, 1000)
				}
			},
			reminfBingWx(){
				this.showUnifyPop = false
				this.ToBingWx('formIndex' , this.item)
			},
			// 去用户首页
			toHome() {
				if (this.isLogin) {
					this.toUserHome('list', this.item.id).then(res => {
						if (res.data.code === 200 || this.user.gender === 0 || this.user.is_vip === 1) {
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
					console.log(321)
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
							console.log(homes)
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
</script>

<style lang="scss" scoped>
	.user-avatar {
		width: 400rpx;
		height: 400rpx;
	}

	.itsme-user-worth {
		width: 24rpx;
		height: 24rpx;
	}

	.itsme-user-address {
		width: 14rpx;
		height: 18rpx;
	}

	.user-top-horn {
		width: 46rpx;
		height: 46rpx;
	}

	.is_wx_box {
		height: 44rpx;
		border: 2rpx solid #9B9999;
		border-radius: 22rpx;
	}

	.wx_box {
		height: 44rpx;
		border: 2rpx solid #24365F;
		border-radius: 22rpx;
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
		background: #1295f0;
	}

	.online-no2 {
		width: 8rpx;
		height: 8rpx;
		border-radius: 8rpx;
		background: #fcbf57;
	}

	.itsme-user-btn {
		width: 52rpx;
		height: 50rpx;
	}

	.color-green {
		color: #06CA64;
	}

	.color-9B9999 {
		color: #9B9999;
	}

	.itsme-user-btn-1 {
		width: 45rpx;
		height: 45rpx !important;
	}

	.mt2 {
		margin-top: 4rpx;
	}

	.z-index-999 {
		z-index: 9999;
	}

	.bg-mask {
		width: 400rpx;
		height: 195rpx;
		background: linear-gradient(0deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0) 100%);
		border-radius: 10rpx;
	}

	.skills-box {
		width: 120rpx;
		height: 42rpx;
		line-height: 42rpx;
		border-radius: 10rpx;
	}
</style>
