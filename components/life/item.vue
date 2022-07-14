<template>
	<view class="width-full">
		<!-- 用户信息 -->
		<view class="width-full flex align-items-center mb15 user-box" :id="'videoBox' + item.id">
			<view class="avator-box ml10 float-hidden" @click="toHome">
				<image :src="userInfo.avatar | imageFilter('m11')" class="avator-box" mode="aspectFill"></image>
			</view>
			<view class="ml25 flex-1">
				<view class="width-full flex align-items-center">
					<view class="fs15 color-deep fw600 mr5" @click="toHome">
						{{userInfo.nickname}}
					</view>
					<image src="../../static/base/base_5.png" class="user-six-img" mode="widthFix"
						v-if="userInfo.gender === 1"></image>
					<image src="../../static/base/base_4.png" class="user-six-img" mode="widthFix" v-else></image>
					<view class="ml15 flex align-items-center">
						<image src="../../static/base/base_6.png" class="user-worth-img" mode="widthFix"></image>
						<view class="worth-box fs16 fw600 ml5">
							{{userInfo.worth}}
						</view>
					</view>
				</view>
				<view class="width-full flex align-items-center mt10">
					<view class="flex align-items-center">
						<image src="../../static/base/base_1.png" class="user-bot-img" mode="widthFix"></image>
						<view class="fs11 color-middle ml5">
							自由职业
						</view>
					</view>
					<view class="flex align-items-center ml12" v-if="userInfo && userInfo.age > 0">
						<image src="../../static/base/base_2.png" class="user-bot-img" mode="widthFix"></image>
						<view class="fs11 color-middle ml5">
							{{userInfo.age}}岁
						</view>
					</view>
				</view>
			</view>
			<view class="user-chat-img mr20" @click.stop @click="toOpenChat(userInfo.id)"
				v-if="user && userInfo && userInfo.id !== user.id  && isMeet">
				<image src="../../static/base/base_7.png" class="width-full" mode="widthFix"></image>
			</view>
		</view>
		<!-- 用户信息 -->

		<!-- 动态详情 -->
		<view class="width-full" @click="toDetail(item.is_fabulous)">
			<view class="width-full br10 bg-white box-shadow-login float-hidden">
				<view class="width-full br10 bg-white box-shadow-login float-hidden">
					<view class="pl15 pr15 lh18 color-deep fs15 mt15"
						v-if="item.content && item.attachment && item.attachment.length === 0">
						{{item.content}}
					</view>
					<view class="width-full" v-if="item.attachment && item.attachment.length === 1">
						<view class="width-full" v-if="item.attachment[0].type === 1" @click.stop="previewImage(item)">
							<image :src="item.attachment[0].url | imageFilter" class="life-img-box" mode="aspectFill">
							</image>
						</view>
						<view class="item-video-box relative" v-if="item.attachment[0].type === 2" @click.stop>
							<video-item type="life" :url="item.attachment[0].url" :isPlay="isPlay"
								@toPlayVideo="isPlay = true" :isMuted="isMuted" @videoEnded="isPlay = false"
								:isVisible="isVisible">
							</video-item>
						</view>
					</view>
					
					<view class="width-full" v-if="item.attachment && item.attachment.length > 1">
						<u-swiper :list="item.attachment" height="700" :autoplay="false"></u-swiper>
					</view>
					<view class="pl15 pr15 pt30 pb30 flex align-items-center">
						<view class="fs12 color-shallow flex-1">
							{{item.createtime | lifeTimeFilter}}
						</view>
						<view class="flex align-items-center ml30" @click.stop="Share(item)">
							<view class="icon_font color-middle fs16 ">
								<!-- 转发 -->
								&#xe612;
							</view>
							<view class="ml5 fs14 color-middle">
								<!-- 转发次数 -->
								{{item.forwarding}}
							</view>
						</view>
						<view class="flex align-items-center ml30" @click.stop="getliked(item)">
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
						
						<view class="user-like-img ml20 mr10"
							v-if="user && userInfo && userInfo.id !== user.id && isMeet" @click.stop @click="likeBtn">
							<image src="../../static/base/base_9.png" class="width-full" mode="widthFix"
								v-if="userInfo.is_like === 1"></image>
							<image src="../../static/base/base_8.png" class="width-full" mode="widthFix" v-else></image>
						</view>
					</view>

				</view>
			</view>
			<!-- 动态详情 -->
		</view>
		<!-- 会员权限 -->
		<home-power
			:showPower="showPower"
			:powerData="powerData"
			@closePop="showPower = false"
		></home-power>
		<!-- 会员权限 -->
	</view>
</template>

<script>
	import {
		mapGetters
	} from 'vuex'
	import UserService from '../../common/service/user-service.js'
	import CommonService from '../../common/service/common-service.js'
	import videoItem from '../video/item.vue'
	import homePower from '../common/homePower.vue'
	export default {
		data() {
			return {
				isPlay: false,
				isVisible: true,
				isMuted: true,
				isliked: false,
				activeUser: null,
				show: false,
				// 会员权限弹框
				showPower: false,
				powerData: null,
				videoTop:'',
				sharelist: [{
						title: '转发给好友',
						type: 'WX'
					},
					{
						title: '分享到朋友圈',
						type: 'PYQ'
					}
				]
			}
		},
		name: 'life-item',
		props: {
			item: Object,
			userInfo: Object,
			isMeet: Boolean,
			fromTheTop: '',
		},
		computed: {
			...mapGetters(['user']),
		},
		components: {
			videoItem,
			homePower
		},
		onLoad() {
			this.panduanisliked()
		},
		watch:{
			fromTheTop(){
				if (this.isPlay) {
					this.getVideoLocation()
				}
			}
		},
		methods: {
			toDetail(is_fabulous) {
				uni.navigateTo({
					url: '../../pages/meet/detail?id=' + this.item.id + '&is_fabulous=' + is_fabulous
				})
			},
			// 喜欢/取消喜欢
			likeBtn() {
				console.log(this.userInfo)
				if (this.userInfo.is_like === 0) {
					this.$emit('changeLike')
					this.setUserLike('list', 'plus', this.userInfo).then(res => {})
				} else {
					this.$emit('changeLike')
					this.setUserLike('list', 'del', this.userInfo).then(res => {})
				}
			},
			// 去用户主页
			toHome() {
				this.toUserHome('list', this.userInfo.id).then(res => {
					console.log(res)
					if (res.data.code === 200) {
						uni.navigateTo({
							url: '../../pages/itsme/home?id=' + this.userInfo.id
						})
					} else {
						this.powerData = {
							look: res.data.see,
							total: res.data.total,
							type: res.data.code,
							id: this.userInfo.id
						}
						this.showPower = true
					}
				})
			},
			// 点赞
			getliked(item) {
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
				console.log(123)
				let images = ['https://itsmev2-client.oss-cn-beijing.aliyuncs.com' + item.attachment[0].url]
				console.log(images)
				uni.previewImage({
					urls: images,
					fail(res) {
						console.log(res)
					}
				});
			},

			// 分享
			Share(item, type) {
				UserService.liked({
					life_id: item.id,
					type: 1
				}).then(res => {
					if (res.code === 1) {
						uni.share({
							provider: "weixin",
							scene: "WXSceneSession",
							type: 0,
							href: "https://www.baidu.com",
							title: "it s me (是我啊)",
							summary: "我正在使用it s me (是我啊)交友软件，赶紧跟我一起来体验！",
							imageUrl: "https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/d8590190-4f28-11eb-b680-7980c8a877b8.png",
							success: function(res) {
								console.log("success:" + JSON.stringify(res));
							},
							fail: function(err) {
								console.log("fail:" + JSON.stringify(err));
							}
						});
					}
					// else {
					// 	uni.share({
					// 		provider: "weixin",
					// 		scene: "WXSenceTimeline",
					// 		type: 0,
					// 		href: "https://www.baidu.com",
					// 		title: "it s me (是我啊)",
					// 		summary: "我正在使用it s me (是我啊)交友软件，赶紧跟我一起来体验！",
					// 		imageUrl: "https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/d8590190-4f28-11eb-b680-7980c8a877b8.png",
					// 		success: function(res) {
					// 			console.log("success:" + JSON.stringify(res));
					// 		},
					// 		fail: function(err) {
					// 			console.log("fail:" + JSON.stringify(err));
					// 		}
					// 	});
					// }
					// }
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
		width: 90rpx;
		height: 90rpx;
		border-radius: 90rpx;
	}

	.user-bot-img {
		width: 24rpx;
	}

	.item-video-box {
		width: calc(100vw - 48rpx);
		height: calc((100vw - 48rpx) * 3 / 4);
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
</style>
