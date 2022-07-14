<template>
	<view class="width-full lh1 pl15 pr15">
		<view class="pl15 pr15 pt30 pb30 br10 float-hidden">
			<!-- 用户信息 -->
			<view class="width-full flex align-items-center mb10" :id="'videoBox' + item.id" @click="toHome" v-if="!isMy">
				<view class="avator-box float-hidden" @click.stop="toHome">
					<image :src="item.avatar | imageFilter('m11')" class="avator-box" mode="aspectFill"></image>
				</view>
				<view class="flex-1 ml10">
					<view class="width-full flex align-items-center">
						<view class="fs15 color-white fw600 mr8">
							{{item.nickname}}
						</view>
						<view class="flex align-items-center pl8 pr8 pt3 pb3 br20 float-hidden bg-itsme-8 mr6"
							v-if="item.is_wx === 1" @click.stop="isShowWxPop(item)">
							<view class="icon_font fs12 mt2 color-green">
								&#xe648;
							</view>
							<view class="fs10 color-white ml5">
								解锁
							</view>
						</view>
						<view v-if="item && item.gender === 1 && item.is_vip === 1">
							<image src="../../static/itsme/its_7.png" class="user-icon" mode="widthFix"></image>
						</view>
						<view v-if="item && item.gender === 0 && item.is_real === 1">
							<image src="../../static/itsme/its_2.png" class="user-icon" mode="widthFix"></image>
						</view>
						
					</view>
					<view class="width-full mt10 color-itsme-9 fs10">
						{{item && item.gender === 0 ? '女' : '男'}} / {{item.age}} /
						{{item.profession || '自由职业'}}
					</view>
				</view>
			</view>
			<view class="width-full flex align-items-center mb10" :id="'videoBox' + userInfo.id" @click="toHome" v-else>
				<view class="avator-box float-hidden" @click.stop="toHome">
					<image :src="userInfo.avatar | imageFilter('m11')" class="avator-box" mode="aspectFill"></image>
				</view>
				<view class="flex-1 ml10">
					<view class="width-full flex align-items-center">
						<view class="fs15 color-white fw600">
							{{userInfo.nickname}}
						</view>
						<!-- <view class="flex align-items-center pl8 pr8 br12 pt3 pb3 float-hidden bg-itsme-8 ml8 mr8">
							<image src="../../static/itsme/its_1.png" class="itsme-user-worth" mode="widthFix"></image>
							<view class="fs10 color-white ml5 lh15">
								{{userInfo.worth || 0}}
							</view>
						</view> -->
						<view v-if="userInfo && userInfo.gender === 1 && userInfo.is_vip === 1">
							<image src="../../static/itsme/its_7.png" class="user-icon" mode="widthFix"></image>
						</view>
						<view v-if="userInfo && userInfo.gender === 0 && userInfo.is_real === 1">
							<image src="../../static/itsme/its_2.png" class="user-icon" mode="widthFix"></image>
						</view>
					</view>
					<view class="width-full mt10 color-itsme-9 fs10">
						{{userInfo && userInfo.gender === 0 ? '女' : '男'}} / {{userInfo.age}} /
						{{userInfo.profession || '自由职业'}}
					</view>
				</view>
			</view>
			<!-- 用户信息 -->
			<!-- 动态详情 -->
			<view class="width-full mt30">
				<view class="width-full color-white fs12 lh15 mb10">
					{{item.content}}
				</view>
				<view class="width-full" v-if="item.attachment && item.attachment.length === 1">
					<view class="life-one-box br10 float-hidden" v-if="item.attachment[0].type === 1"
						@click="previewImage(0)">
						<image :src="item.attachment[0].url | imageFilter" class="life-one-box" mode="aspectFill">
						</image>
					</view>
					<view class="life-one-box br10 float-hidden relative" v-if="item.attachment[0].type === 2">
						<video-item type="life" :url="item.attachment[0].url" :isPlay="isPlay"
							@toPlayVideo="isPlay = true" :isMuted="isMuted" @videoEnded="isPlay = false"
							:isVisible="isVisible">
						</video-item>
					</view>
				</view>
				<view class="width-full flex align-items-center flex-between"
					v-if="item.attachment && item.attachment.length === 2">
					<view class="life-two-box br10 float-hidden" @click="previewImage(0)">
						<image :src="item.attachment[0].url | imageFilter" class="life-two-box" mode="aspectFill">
						</image>
					</view>
					<view class="life-two-box br10 float-hidden" @click="previewImage(1)">
						<image :src="item.attachment[1].url | imageFilter" class="life-two-box" mode="aspectFill">
						</image>
					</view>
				</view>
				<view class="width-full flex flex-between" v-if="item.attachment && item.attachment.length > 2">
					<view class="life-one-box br10 float-hidden" @click="previewImage(0)">
						<image :src="item.attachment[0].url | imageFilter" class="life-one-box" mode="aspectFill">
						</image>
					</view>
					<view class="life-three-box">
						<view class="life-three-item br10 float-hidden" @click="previewImage(1)">
							<image :src="item.attachment[1].url | imageFilter" class="life-three-item"
								mode="aspectFill">
							</image>
						</view>
						<view class="life-three-item br10 mt15 float-hidden relative" @click="previewImage(2)">
							<image :src="item.attachment[2].url | imageFilter" class="life-three-item absolute"
								mode="aspectFill">
							</image>
							<view class="life-three-num absolute bottom8 right8 flex align-items-center flex-center"
								v-if="item.attachment.length > 3">
								<view class="icon_font color-white fs10">
									&#xe65a;
								</view>
								<view class="fs10 ml5 color-white">
									{{item.attachment.length}}张
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="width-full align-items-center mt20">
				<view class="flex fs12 color-itsme-10">
					<view class="nowrap">
						{{item.createtime | lifeTimeFilter}}
					</view>
					<view class="nowrap w-310 ml5 color-itsme-10">
						{{item.addr ? item.addr : ''}}
					</view>
				</view>
				<view class="width-full flex align-items-center flex-between mt20">
					<view class="flex align-items-center ml25 ml30">
						<view class="left-btn-img">
							<image src="../../static/itsme/itsme_21.png" class="left-btn-img" mode="widthFix"
								@click.stop @click="getliked(item)" v-if="item.is_fabulous === 1"></image>
							<image src="../../static/itsme/its_15.png" class="left-btn-img" v-else mode="widthFix"
								@click.stop @click="getliked(item)"></image>
						</view>
						<view class="color-itsme-13 fs12 ml5">
							{{item.like}}
						</view>
					</view>
					<view class="flex align-items-center ml20 ">
						<view class="left-btn-img">
							<image src="../../static/itsme/its_16.png" class="left-btn-img" mode="widthFix" @click.stop
								@click="Share(item)"></image>
						</view>
						<view class="color-itsme-13 fs12 ml5 mr15">
							{{item.forwarding}}
						</view>
					</view>
					<view class="left-btn-img mr30" v-if="isHome">
						<image src="../../static/itsme/its_33.png" class="left-btn-img" mode="widthFix" @click.stop
							@click="toChat(item)"></image>
					</view>
					<!-- 获取微信弹框 -->
					<view class="" v-if="showWxPop">
						<get-user-wx :showWxPop="showWxPop" :item="item" @closeWxPop="showWxPop = false"></get-user-wx>
					</view>
					<!-- 获取微信弹框 -->
				</view>
			</view>
		</view>
		<view class="line-life bg-itsme-4">

		</view>
	</view>
</template>

<script>
	import {
		mapGetters
	} from 'vuex'
	import {
		formatImage
	} from '../../common/utils/common-methods'
	import getUserWx from '../../components/common/getUserWx.vue'
	import UserService from '../../common/service/user-service.js'
	import CommonService from '../../common/service/common-service.js'
	import videoItem from '../video/item.vue'
	export default {
		name: 'discover-dynamic',
		data() {
			return {
				isPlay: false,
				isVisible: true,
				isMuted: false,
				isliked: false,
				activeUser: null,
				showMemberPay: false,
				memberCentent: '',
				showWxPop: false,
				show: false,
				// 会员权限弹框
				powerData: null,
				videoTop: '',
			}
		},
		props: {
			item: Object,
			isMeet: Boolean,
			userInfo:Object,
			isMy: Boolean,
			fromTheTop: '',
			isHome: Boolean
		},

		computed: {
			...mapGetters(['user']),
		},

		components: {
			videoItem,
			getUserWx
		},
		watch: {
			fromTheTop() {
				if (this.isPlay) {
					this.getVideoLocation()
				}
			},
			powerData() {
				if (this.powerData.look >= this.powerData.total) {
					console.log(123)
					return this.memberCentent = ' 您今天的次数已经用完了 非会员每日只能查看' + this.powerData.total + '位用户 '

				} else {
					console.log(321)
					let number = this.powerData.total - this.powerData.look
					return this.memberCentent = '您今天还能查看' + number + '位用户  非会员每日只能查看' + this.powerData.total + '位用户  '
				}
			}
		},
		methods: {
			//去发现详情页
			toDetail(item) {
				uni.navigateTo({
					url: '/pages/meet/detail?id=' + this.item.id + '&isFabulous=' + item.is_fabulous
				})
			},
			// 去用户主页
			toHome() {
				if (this.isMeet) {
					console.log('home ___-_  禁止套娃')
				} else {
					if (this.item.user_id !== this.user.id) {
						this.toUserHome('life', this.item.user_id).then(res => {
							if (res.data.code === 200 || this.user.gender === 0) {
								uni.navigateTo({
									url: '/pages/itsme/home?id=' + this.item.user_id
								})
							} else {
								this.powerData = {
									look: res.data.see,
									total: res.data.total,
									type: res.data.code,
									id: this.item.user_id
								}
								this.$emit('openBounced', this.powerData)
							}
						})
					}
				}
			},
			// 去聊天
			toChat(item) {
				let userIsReal = false
				if (this.user.is_real && this.user.is_real === 1) {
					userIsReal = true
				}
				// 女性非真人点击喜欢提示去真人认证
				if (this.user.gender === 0 && !userIsReal) {
					this.$emit('goShowPerfect')
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
				this.toOpenChat('discover', this.item.user_id)
			},
			//点赞
			getliked(item) {
				console.log(item)
				let userIsReal = false
				if (this.user.is_real && this.user.is_real === 1) {
					userIsReal = true
				}
				// 女性非真人点击喜欢提示去真人认证
				if (this.user.gender === 0 && !userIsReal) {
					this.$emit('goShowPerfect')
					return false
				}
				console.log(item)
				UserService.liked({
					life_id: item.id,
					type: 2
				}).then(res => {
					if (res.code === 1) {
						this.$emit('changefabulous')
					}
				})
			},
			// 预览图片
			previewImage(index) {
				console.log(this.item.attachment)
				let images = this.item.attachment.map(item => {
					return formatImage(item.url)
				})
				uni.previewImage({
					current: index,
					urls: images
				})
			},
			Share(item, type) {
				console.log(item)
				UserService.liked({
					life_id: item.id,
					type: 1
				}).then(res => {
					if (res.code === 1) {
						let user = item
						let avatar = user.avatar ? user.avatar : '/images/logo.png'
						let city = user.city ? user.city : '太原市'
						console.log(user)
						
						console.log(city)
						if (this.isMy) {
							this.$emit('shareWxPop', item)
						} else {
							if (item.content !== '' && item.attachment.length === 0) {
								console.log('有文字没图片的')
								this.shareWx(0, '来自' + city + '的' + user.nickname +
									'发布的新动态',
									"http://wap.shiwoaapp.com/#/", item.content, avatar, item
									.id)
								return false
							}
							let isVideo = item.attachment[0].url.substring(item.attachment[0].url.length - 3, item
								.attachment[0].url.length)
							console.log(isVideo)
							if (item.attachment.length !== 0 && (isVideo === 'png' || isVideo === 'jpg') && item
								.content === '') {
								console.log('有图片没文字的')
								this.shareWx(0, '来自' + city + '的' + user.nickname +
									'发布的新动态',
									"http://wap.shiwoaapp.com/#/", '告诉你一个APP，我下了，真实又靠谱，秘密使用。我的邀请码：' + this.user
									.invite_code, item.attachment[0].url, item
									.id)
								return false
							} else if (item.attachment.length !== 0 && item.content !== '' && (isVideo === 'png' ||
									isVideo === 'jpg')) {
								console.log('有图片有文字的')
								this.shareWx(0, '来自' + city + '的' + user.nickname +
									'发布的新动态',
									"http://wap.shiwoaapp.com/#/", item.content, item.attachment[0].url, item
									.id)
								return false
							} else if (item.attachment[0].url && isVideo !== 'png' && isVideo !== 'jpg' && item
								.content === '') {
								console.log('有视频没文字的')
								this.shareWx(0, '来自' + city + '的' + user.nickname +
									'发布的新动态',
									"http://wap.shiwoaapp.com/#/", '告诉你一个APP，我下了，真实又靠谱，秘密使用。我的邀请码：' + this.user
									.my_id, avatar, item
									.id)
								return false
							} else if (item.attachment[0].url && isVideo !== 'png' && isVideo !== 'jpg' && item
								.content !== '') {
								console.log('有视频有文字的')
								this.shareWx(0, '来自' + city + '的' + user.nickname +
									'发布的新动态',
									"http://wap.shiwoaapp.com/#/", item.content, avatar, item
									.id)
								return false
							}
						}
					}
				})
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
			// 监听视频位置
			getVideoLocation() {
				uni.createSelectorQuery().select('#videoBox' + this.item.id).boundingClientRect(res => {
					console.log(res)
					if (res.top <= 30) {
						if (this.isPlay) {
							this.isPlay = false
						}
					}
				}).exec()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.avator-box {
		width: 80rpx;
		height: 80rpx;
		border-radius: 80rpx;
	}

	.flex1 {
		flex: 1;
	}

	.right45 {
		right: 140rpx;
	}

	.user-bot-img {
		width: 24rpx;
	}

	.line-life {
		height: 2rpx;
	}

	.item-video-box {
		width: calc(100vw - 48rpx);
		height: calc((100vw - 48rpx) * 3 / 4);
	}

	.user-six-img {
		width: 24rpx;
		height: 24rpx;
	}

	.w-310 {
		width: 500rpx;
	}

	.j-c-end {
		justify-content: flex-end;
	}

	.ml3 {
		margin-left: 6rpx;
	}

	.user-worth-img {
		width: 40rpx;
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

	.itsme-user-worth {
		width: 24rpx;
		height: 24rpx;
	}

	.user-icon {
		width: 30rpx;
		height: 30rpx;
	}

	.life-one-box {
		width: 410rpx;
		height: 410rpx;
	}

	.life-two-box {
		width: 300rpx;
		height: 410rpx;
	}

	.life-three-box {
		width: 190rpx;
	}

	.life-three-item {
		width: 190rpx;
		height: 190rpx;
	}

	.life-three-num {
		width: 86rpx;
		height: 30rpx;
		border-radius: 20rpx;
		background: rgba($color: #000000, $alpha: 0.5);
	}

	.left-btn-img {
		width: 44rpx;
		height: 44rpx;
	}

	.btn-img-1 {
		width: 48rpx;
		height: 48rpx;
	}

	.btn-img {
		width: 40rpx;
		height: 40rpx;
	}
	.color-green {
		color: #06CA64;
	}
</style>
