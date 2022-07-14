<template>
	<view class="width-full lh1 male-box bg-itsme-1">
		<view class="width-full height flex flex-col">
			<!-- top -->
			<view class="width-full bg-itsme-1">
				<view class="width-full" :style="'height: ' + StatusBar + 'px;'"></view>
				<view class="width-full top-box flex align-items-center">
					<view class="flex-1 fs18 color-itsme-2 fw600 text-center">
						专属推荐
					</view>
				</view>
				<view class="width-full top-user-box mt12 mb18">
					<view class="width-full" v-if="topList && topList.length > 0">
						<top-user :list="topList" :haveLike="haveLike" :scrollLeft="scrollLeft"
							@changeCentUser="changeCentUser"></top-user>
					</view>
				</view>
			</view>
			<!-- top -->
			<view class="flex-1 width-full">
				<view class="width-full height pt35 pb35 border-box">
					<view class="width-full height" v-if="goddessList && goddessList.length > 0 && goddessListShow">
						<cent-user :list="goddessList" :current="goddessCurrent" @changeCurrent="changeCurrent"
							@doLike="doLike"></cent-user>
					</view>
				</view>
			</view>
			<!-- bottom -->
			<view class="width-full flex align-items-center flex-center pb_iphoneX_safe">
				<view class="icon_font fs16 color-white">
					&#xe60e;
				</view>
				<view class="fs15 color-white fw600 pt20 pb20 pl10 pr20" @click="goHomePage">
					看更多女生
				</view>
			</view>
			<!-- bottom -->
		</view>
		<!-- 首次进入弹框 begin -->
		<view class="fixed top bottom left right" v-if="showTips">
			<view class="width-full height relative">
				<view class="absolute top bottom left right bg-black opacity60"></view>
				<view class="absolute top bottom left right" @click="showTips = false">
					<view class="ml35 mr35 height flex align-items-center flex-between">
						<image src="../../static/base/exclusive_2.png" class="exclusive-img-1 ml35" mode="widthFix">
						</image>
						<image src="../../static/base/exclusive_1.png" class="exclusive-img-2" mode="widthFix"></image>
						<image src="../../static/base/exclusive_3.png" class="exclusive-img-1 mr35" mode="widthFix">
						</image>
					</view>
				</view>
			</view>
		</view>
		<!-- 首次进入弹框 end -->
		<view>
			<red-packet @comeMessage="comeMessage"></red-packet>
		</view>
	</view>
</template>

<script>
	import {
		mapActions,
		mapGetters
	} from 'vuex'
	import {
		getAddress
	} from '../../common/appjs/address.js'
	import UserService from '../../common/service/user-service.js'
	import ChatService from '../../common/service/chat-service.js'
	import topUser from '../../components/exclusive/top.vue'
	import centUser from '../../components/exclusive/cent.vue'
	export default {
		data() {
			return {
				haveLike: false,
				topList: null,
				goddessList: null,
				goddessCurrent: 0,
				scrollLeft: 0,
				imService: null,
				showTips: false,
				isReturn: false,
				goddessListShow:false,
				// 经纬度
				address: {
					lng: '',
					lat: ''
				},
			}
		},
		components: {
			topUser,
			centUser
		},
		onShow() {
			if (this.isReturn) {
				this.getGoddess()
			}
		},
		onLoad() {
			this.init()
		},
		methods: {
			...mapActions(['USER', 'SHOW_PROFILE', 'ADDRESS']),
			init() {
				Object.assign(this.$data, this.$options.data())
				this.loginExpire().then(res => {
					this.getUserAddress()
					this.getGoddess()
					this.isReturn = true
					setTimeout(() => {
						this.showTips = true
						setTimeout(() => {
							this.showTips = false
						}, 2000)
					}, 1000)
				})
			},
			// 获取用户位置信息
			getUserAddress() {
				if (this.platform === 'APP') {
					getAddress().then(
						res => {
							this.address = {
								lng: res.longitude,
								lat: res.latitude
							}
							this.getUserInfo()
							this.getGoddess()
						},
						err => {
							this.noAdress = true
						}
					)
				} else {
					this.address = {
						lng: 112.514775,
						lat: 37.838836
					}
					this.getUserInfo()
				}
			},
			// 获取位置成功更新用户信息
			getUserInfo() {
				UserService.userinit({
					lng: this.address.lng,
					lat: this.address.lat
				}).then(res => {
					if (res.code === 1) {
						this.USER(res.data.user)
						this.ADDRESS(res.data.Area)
					}
				})
			},
			// 接收新消息
			comeMessage(friendId, message) {
				this.geiNewChat(friendId, message)
			},
			goHomePage() {
				this.SHOW_PROFILE(true)
				uni.switchTab({
					url: '/pages/itsme/index'
				})
			},
  
			// 推荐的人
			getGoddess() {
				uni.showLoading({
					title: '加载中'
				})
				UserService.getexclusiverecommend({
					lat: this.address.lat,
					lng: this.address.lng
				}).then(res => {
					if (res.code === 1) {
						console.log(res.data)
						uni.hideLoading()
						this.goddessList = res.data.list
						this.goddessListShow = true
						console.log(this.goddessList)
						if (res.data.like && res.data.like.length > 0) {
							this.topList = res.data.like.concat(res.data.list)
							this.topList = this.topList.filter(item => {
								if(item.age){
									item.clear = false
								}else{
									item.clear = true
								}
								item.messageId = ''
								return item
							})
							this.haveLike = true
						} else {
							this.haveLike = false
							this.topList = res.data.list
						}
						if (!this.haveLike) {
							this.topList[0].clear = true
							this.topList[1].clear = true
						}
					}
				})
			},
			// 内容滑动
			changeCurrent(index) {
				this.goddessCurrent = index
				// if (this.scrollLeft === 0) {
				// 	this.scrollLeft = 0.1
				// } else {
				// 	this.scrollLeft = 0
				// }
			},
			// 点击头部切换用户
			changeCentUser(id) {
				let user = this.goddessList.filter(item => {
					return item.id === id
				})
				if (user && user.length === 1) {
					let index = this.goddessList.indexOf(user[0])
					this.goddessCurrent = index
				} else {
					this.toUserHome('exclusive', id).then(res => {
						uni.navigateTo({
							url: '../../pages/itsme/home?id=' + id
						})
					})
				}
			},
			// 点击喜欢
			doLike(index) {
				console.log('111111')
				this.goddessList[index].like = 1
				setTimeout(() => {
					if (this.goddessCurrent === this.goddessList.length - 1) {
						this.goddessCurrent = 0
					} else {
						this.goddessCurrent++
					}
				}, 1000)
				let user = this.goddessList[index]
				let topData = this.topList.filter(item => {
					return item.id !== user.id
				})
				if (!this.haveLike) {
					this.haveLike = true
					topData[0].clear = false
					topData[1].clear = false
				}
				user.clear = true
				topData.unshift(user)
				this.topList = topData
			}
		}
	}
</script>

<style lang="scss" scoped>
	.male-box {
		height: 100vh;
	}

	.top-box {
		height: 100rpx;
	}

	.top-user-box {
		height: 100rpx;
	}

	.cent-user-box {
		height: 860rpx;
	}

	.swiper-item {
		background: #333;
	}

	.exclusive-img-1 {
		width: 65rpx;
	}

	.exclusive-img-2 {
		width: 85rpx;
	}
</style>
