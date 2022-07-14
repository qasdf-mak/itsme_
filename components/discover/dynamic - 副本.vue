<template>
	
	<view class="width-full lh1 pl15 pr15">
		<view class="pl15 pr15 pt15 pb15 br10 float-hidden bg-itsme-4">
			<!-- 用户信息 -->
			<view class="width-full flex align-items-center mb10" :id="'videoBox' + item.id"
				@click="toHome">
				<view class="avator-box float-hidden" @click.stop="toHome">
					<image :src="userInfo.avatar | imageFilter('m11')" class="avator-box" mode="aspectFill"></image>
				</view>
				<view class="flex-1 ml10">
					<view class="width-full flex align-items-center">
						<view class="fs15 color-white fw600">
							{{userInfo.nickname}}
						</view>
						<view class="flex align-items-center pl8 pr8 br12 pt3 pb5 float-hidden bg-itsme-8 ml10 mr10">
							<image src="../../static/itsme/its_1.png" class="itsme-user-worth" mode="widthFix"></image>
							<view class="fs10 color-white ml5 lh15 mr10">
								{{userInfo.worth || 0}}
							</view>
						</view>
						<view v-if="userInfo && userInfo.gender === 1 && userInfo.is_vip === 1">
							<image src="../../static/itsme/its_7.png" class="user-icon" mode="widthFix"></image>
						</view>
						<view v-if="userInfo && userInfo.gender === 0">
							<image src="../../static/itsme/its_2.png" class="user-icon" mode="widthFix"></image>
						</view>
					</view>
					<view class="width-full mt10 color-itsme-9 fs10">
						{{userInfo && userInfo.gender === 0 ? '女' : '男'}} / {{userInfo.age}} / {{userInfo.profession || '自由职业'}}
					</view>
				</view>
			</view>
			<!-- 用户信息 -->
			<!-- 动态详情 -->
			<view class="width-full" @click="toDetail(item)">
				<view class="pl8 pr8 lh18 color-deep fs15 mb15"
					v-if="item.content && item.attachment && item.attachment.length > 0">
					{{item.content}}
				</view>
				<view class="width-full br10 bg-white box-shadow-login float-hidden">
					<view class="pl15 pr15 lh18 color-deep fs15 mt15 mb15"
						v-if="item.content && item.attachment && item.attachment.length === 0">
						{{item.content}}
					</view>
					<view class="width-full">
						<view class="width-full" v-if="item.attachment && item.attachment.length === 1">
							<view class="width-full" v-if="item.attachment[0].type === 1" @click.stop="previewImage(item)">
								<image :src="item.attachment[0].url | imageFilter" class="life-img-box" mode="aspectFill">
								</image>
							</view>
		
							<view class="item-video-box relative" v-if="item.attachment[0].type === 2">
								<video-item type="life" :url="item.attachment[0].url" :isPlay="isPlay"
									@toPlayVideo="isPlay = true" :isMuted="isMuted" @videoEnded="isPlay = false"
									:isVisible="isVisible">
								</video-item>
							</view>
						</view>
		
						<view class="width-full" v-if="item.attachment && item.attachment.length > 1">
							<u-swiper :list="item.attachment" height="700" :autoplay="false" @click="toDetail(item)">
							</u-swiper>
						</view>
		
						<!-- 操作栏 -->
						<view class="pl15 pr15 pt25 pb25 flex align-items-center" v-if="isMy">
							<!-- 转发 -->
							<view class="flex align-items-center ml30 flex1" @click.stop="Share(item)">
								<view class="icon_font color-middle fs16 ">
									<!-- 转发 -->
									&#xe612;
								</view>
								<view class="ml5 fs14 color-middle">
									<!-- 转发次数 -->
									{{item.forwarding}}
								</view>
							</view>
							<!-- 点赞 -->
							<view class="flex align-items-center ml30 flex1" @click.stop="getliked(item)">
								<view class="icon_font color-middle fs16" v-if="item.is_fabulous === 1">
									<!-- 已点赞 -->
									&#xe600;
								</view>
								<view class="icon_font color-middle fs16" v-else>
									<!-- 未点赞 -->
									&#xe65c;
								</view>
								<view class="ml5 fs14 color-middle">
									<!-- 点赞数量 -->
									{{item.like}}
								</view>
							</view>
							<!-- 去聊天 -->
							<view class="flex align-items-center ml30 flex1" @click.stop @click="toChat(item)">
								<view class="icon_font color-middle fs15">
									&#xe640;
								</view>
								<view class="ml5 fs14 color-middle">
									打招呼
								</view>
							</view>
						</view>
						<!-- 完善资料 -->
						<view class="width-full" v-if="showPerfectPop">
							<perfect-pop @refreshTheList="refreshTheList" @closePerfectPop="toHidePerfectPop">
							</perfect-pop>
						</view>
						<!-- 完善资料 -->
					</view>
				</view>
			</view>
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
	import UserService from '../../common/service/user-service.js'
	import CommonService from '../../common/service/common-service.js'
	import videoItem from '../video/item.vue'
	export default {
		name: 'discover-dynamic',
		data() {
			return {
				isPlay: false,
				isVisible: true,
				isMuted: true,
				isliked: false,
				activeUser: null,
				showMemberPay: false,
				memberCentent: '',
				show: false,
				// 会员权限弹框
				powerData: null,
				videoTop: '',
			}
		},
		props: {
			item: Object,
			userInfo: Object,
			isMeet: Boolean,
			isMy: Boolean,
			fromTheTop: '',
		},
		computed: {
			...mapGetters(['user']),
			isgoddess() {
				if (this.userInfo.gender === 0 && this.item.userinfo && this.item.userinfo.certify && JSON.parse(this
						.item.userinfo.certify).goddess && JSON.parse(this.item.userinfo.certify).goddess
					.verified) {
					return true
				}
			},
			isreal() {
				if (this.userInfo.gender === 0 && this.item.userinfo && this.item.userinfo.certify && JSON.parse(this
						.item.userinfo.certify).real && JSON.parse(this.item.userinfo.certify).real.verified) {
					return true
				}
			}
		},

		components: {
			videoItem
		},
		mounted() {
			console.log('this.userInfo')
			console.log(this.userInfo)
			// console.log('this.userInfo')
			// console.log(this.user)
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
					if (this.userInfo.id !== this.user.id) {
						this.toUserHome('life', this.userInfo.id).then(res => {
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
								this.$emit('openBounced', this.powerData)
							}
						})
					}
				}
			},
			// 去聊天
			toChat(item) {
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
				if (this.user.gender === this.userInfo.gender) {
					uni.showToast({
						title: '对方与您性别相同，只能观赏不能互动喔~',
						icon: 'none'
					})
					return false
				}
				this.toOpenChat('discover', this.userInfo.id)
			},
			//点赞
			getliked(item) {
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
			previewImage(item) {
				if (item.content === '') {
					this.toDetail(item)
				} else {
					let images = this.item.attachment.map(item => {
						return formatImage(item.url)
					})
					console.log(images)
					uni.previewImage({
						urls: images,
					});
				}


			},
			// 分享
			Share(item, type) {
				// let userIsReal = false
				// if (this.user.certify) {
				// 	let certify = JSON.parse(this.user.certify)
				// 	userIsReal = certify.real && certify.real.verified
				// }
				// // 女性非真人点击喜欢提示去真人认证
				// if (this.user.gender === 0 && !userIsReal) {
				// 	this.toShowPerfectPop()
				// 	return false
				// }

				UserService.liked({
					life_id: item.id,
					type: 1
				}).then(res => {
					if (res.code === 1) {
						this.shareWx(0)
					}
				})
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

	.item-video-box {
		width: calc(100vw - 48rpx);
		height: calc((100vw - 48rpx) * 3 / 4);
	}

	.user-six-img {
		width: 24rpx;
		height: 24rpx;
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
	.user-icon{
		width: 30rpx;
		height: 30rpx;
	}
</style>
