<template>
	<view class="width-full lh1">
		<u-popup v-model="showMedia" mode="center">
			<view class="look-box bg-black flex flex-col">
				<view class="width-full" :style="'height:' + StatusBar + 'px;'"></view>
				<!-- top -->
				<view class="width-full look-height-box flex align-items-center flex-between">
					<view class="icon_font fs24 color-white ml15" @click="closeMedia">
						&#xe638;
					</view>
					<view class="time-box mr15 relative" v-if="lookData.timeShow">
						<view class="width-full height bg-white br100 opacity3"></view>
						<view class="absolute top right left bottom flex align-items-center flex-center">
							<view class="fs20 color-white">
								{{lookData.time}}
							</view>
						</view>
					</view>
				</view>
				<!-- top -->
				<!-- main -->
				<view class="width-full flex-1 float-hidden image-box">
					<swiper class="width-full height" :current="current" @change="changeMedia">
						<swiper-item v-for="(item, index) in list" :key="index">
							<view class="width-full height relative">
								<!-- 原图 -->
								<view class="width-full height float-hidden">
									<view class="width-full height flex align-items-center flex-center"
										:class="(((Number(item.rule_type) === 3 || (Number(item.rule_type) === 4 && Number(item.is_read) === 0 && user && !user.is_vip)) && !isMy) || (!isLogin && Number(item.rule_type) !== 2)) ? 'look-mask' : ''">
										<view class="width-full" v-if="item.type === 'itsme_image'">
											<image :src="item.url | imageFilter" class="width-full" mode="widthFix">
											</image>
										</view>
										<view class="width-full relative" v-if="item.type === 'itsme_video'"
											@click="toPlayVideo(index)">
											<image :src="item.url | imageFilter('poster')" class="width-full"
												mode="widthFix"></image>
											<view
												class="absolute top bottom right left flex align-items-center flex-center">
												<view class="icon_font fs40 color-white">
													&#xe622;
												</view>
											</view>
										</view>
									</view>
								</view>
								<!-- 原图 -->
								<view class="width-full" v-if="isLogin">
									<view class="width-full" v-if="!isMy">
										<!-- 阅后即焚-照片-未查看 -->
										<view
											class="absolute top left right bottom flex align-items-center flex-center flex-col"
											v-if="item.type === 'itsme_image' && Number(item.rule_type) === 3 && Number(item.is_read) === 0"
											@longtap="photoLongTap(index)">
											<image src="../../static/itsme/itsme_33.png" class="rule-huo"
												mode="widthFix"></image>
											<view class="fs18 color-white text-center lh18 mt25">
												阅后即焚照片
											</view>
											<view class="fs12 color-white text-center lh18 mt25">
												长按查看
											</view>
										</view>
										<!-- 阅后即焚-照片-未查看 -->
										<!-- 阅后即焚-照片-已查看 -->
										<view class="absolute top left right bottom flex align-items-center flex-center flex-col" v-if="item.type === 'itsme_image' && Number(item.rule_type) === 3 && Number(item.is_read) === 1">
											<image src="../../static/itsme/itsme_19.png" class="rule-huo" mode="widthFix"></image>
											<view class="fs18 color-white text-center mt25">
												照片已焚毁
											</view>
											<view>
												<view class="width-full" >
													<view class="fs12 color-white text-center mt15"  v-if="user && user.is_vip === 0 && user.gender === 1">
														会员可延长查看8秒
													</view>
												</view>                         
												<view class="mt35 mb35"> </view>                                   <!-- user && user.is_vip === 0 && user.gender === 1  暂时隐藏-->
												<view class="width-full vip-btn bg-2 flex align-items-center flex-center btn-box"  v-if="false" @click="toPayMember(item)">
													<view class="fs15 color-white ml10 mt3">
														升级会员
													</view>
												</view>
											</view>
										</view>
										<!-- 阅后即焚-照片-已查看 -->
										<!-- 阅后即焚-视频 - 未看 -->
										<view
											class="absolute top left right bottom flex align-items-center flex-center flex-col"
											v-if="item.type === 'itsme_video' && Number(item.rule_type) === 3 && Number(item.is_read) === 0"
											@longtap="videoLongTap(index)">

											<image src="../../static/itsme/itsme_33.png" class="rule-huo"
												mode="widthFix"></image>
											<view class="fs18 color-white text-center lh18 mt25">
												阅后即焚视频
											</view>
											<view class="fs12 color-white text-center lh18 mt25">
												长按查看
											</view>
										</view>
										<!-- 阅后即焚-视频 - 未看 -->
										<!-- 阅后即焚-视频 - 已看 -->
										<view
											class="absolute top left right bottom flex align-items-center flex-center flex-col"
											v-if="item.type === 'itsme_video' && Number(item.rule_type) === 3 && Number(item.is_read) === 1">
											<image src="../../static/itsme/itsme_19.png" class="rule-huo"
												mode="widthFix"></image>
											<view class="fs14 color-white text-center mt25">
												视频已焚毁
											</view>
										</view>
										<!-- 阅后即焚-视频 - 已看 -->
										<!-- 会员券    v-if="Number(item.rule_type) === 4 && Number(item.is_read) === 0 && user.is_vip !== 1"  -->
										<view
											class="absolute top left right bottom flex align-items-center flex-center flex-col"
											v-if="Number(item.rule_type) === 4 && Number(item.is_read) === 0 && user.is_vip !== 1">
											<image src="../../static/itsme/itsme_34.png" class="rule-huo"
												mode="scaleToFill"></image>
											<view class="mt25 fs18 color-white">
												VIP可免费查看会员照片
											</view>
											<view class=" mt35 mb35"> </view>
											<view class="vip-btn mt35  mt12 flex align-items-center flex-center"
												@click="toPayMember(item)"
												v-if="user && user.is_vip === 0 && user.gender === 1">
												升级会员
											</view>
											<!-- 	<view class="fs14 color-white text-center mt25">
												花费{{item.price}}M豆查看
											</view> -->
											<!-- 会员照片取消 发会员券按钮 -->
											<!-- 	<view
												class="media-btn-box btn-box bg-2 mt35 flex align-items-center flex-center"
												@click="sendMoney(index)">
												<image src="../../static/itsme/itsme_6.png" class="media-btn-img"
													mode="scaleToFill"></image>
												<view class="fs15 color-white ml10">
													发会员券
												</view>
											</view> -->

										</view>
										<!-- 会员-照片 - 未看 -->
									</view>
								</view>
								<view class="width-full" v-else>
									<view
										class="absolute top left right bottom flex align-items-center flex-center flex-col"
										v-if="Number(item.rule_type) === 3 || Number(item.rule_type) === 4">
										<view class="fs14 color-white text-center mt25">
											{{item.type === 'itsme_image' ? '照片' : '视频'}}需要登录后查看
										</view>
										<view
											class="media-btn-box btn-box bg-2 mt35 flex align-items-center flex-center"
											@click="toLogin">
											<view class="fs15 color-white ml10">
												登录/注册
											</view>
										</view>
									</view>
								</view>
							</view>
						</swiper-item>
					</swiper>
				</view>
				<!-- main -->
				<!-- bottom -->
				<view class="width-full look-height-box"></view>
				<!-- bottom -->
			</view>
		</u-popup>
		<!-- 视频 -->
		<view class="fixed top left right bottom bg-black flex flex-col" style="z-index: 99999;"
			v-if="videoPlay && videoData">
			<view class="width-full" :style="'height:' + StatusBar + 'px;'"></view>
			<view class="width-full look-height-box flex align-items-center">
				<view class="icon_font fs22 color-white ml15" @click="closeMedia">
					&#xe638;
				</view>
			</view>
			<view class="width-full flex-1 flex align-items-center flex-center">
				<view :style="videoSize">
					<video-play :url="videoData.url" @closeVideo="closeVideo"></video-play>
				</view>
			</view>
			<view class="width-full look-height-box"></view>
		</view>
		<!-- 视频 -->
		<!-- M豆不足，提示充M豆 -->
		<unify-pop :showUnify="showUnifyPop" :type="unifyType" @closePop="showUnifyPop = false" @rechargeM='toRecharge'>
		</unify-pop>
		<!-- 	<custom-pop
			:showPop="moneyLess"
			confirmText="充值"
			cancelText="取消"
			contentTitle="M豆不足"
			:meiNv="3"
			@confirm="toRecharge"
			@cancel="moneyLess = false"
		></custom-pop> -->
		<!-- 发会员券 -->
		<view class="fixed top bottom right left" v-if="showHongbao" style="z-index: 99999999;">
			<view class="width-full height relative">
				<view class="absolute top bottom right left bg-black opacity60"></view>
				<view class="absolute top bottom right left flex flex-col align-items-center flex-center">
					<view class="hongbao-box relative">
						<image src="../../static/base/hongbao.png" class="hongbao-box" mode="scaleToFill"></image>
						<view class="hongbao-btn absolute fs15 color-white text-center" @click="toSendHongbao">
							发送
						</view>
						<view class="absolute top30 left right flex align-items-center flex-center">
							<image src="/static/itsme/itsme_6.png" class="hongbao-img" mode="scaleToFill"></image>
							<view class="fs20 ml10 color-deep fw600">
								{{list[hongbaoIndex].price}}
							</view>
						</view>
					</view>
					<view class="icon_font color-white fs18 mt35" @click="showHongbao = false">
						&#xe635;
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
	import CommonService from '../../common/service/common-service.js'
	import videoPlay from '../video/play.vue'
	export default {
		name: 'media-list',
		data() {
			return {
				showHongbao: false,
				moneyLess: false,
				showMedia: true,
				lookData: {
					index: -1,
					time: 3,
					timeShow: false,
					isTime: null
				},
				videoPlay: false,
				videoData: null,
				videoIndex: -1,

				videoSize: '',
				hongbaoIndex: -1
			}
		},
		props: {
			type: String,
			list: Array,
			current: Number,
			isMy: Boolean,
			isLogin: Boolean
		},
		components: {
			videoPlay
		},
		computed: {
			...mapGetters(['user'])
		},
		mounted() {
			console.log('点击了图片')
			console.log(this.list)
			this.$nextTick(() => {
				setTimeout(() => {
					let media = this.list[this.current]
					if (media.type === 'itsme_video' && (Number(media.rule_type) === 2 || (Number(media
							.rule_type) === 4 && Number(media.is_read) === 1))) {
						this.toPlayVideo(this.current)
					}
				}, 500)
			})
		},
		methods: {
			closeMedia() {
				if (this.lookData.timeShow) {
					this.timeOut()
				}
				if (this.videoPlay) {
					this.closeVideo()
				}
				this.$emit('closeMedia')
			},
			changeMedia({
				detail
			}) {
				if (this.lookData.timeShow) {
					this.timeOut()
				}
			},
			toPayMember(item) {
				this.closeMedia()
				this.$emit('toPayMember')
				// this.toJumpPage(1, '/pages/my/member/index?fromurl=' + this.type + '&id=' + item.id)
			},
			// 长按图片
			photoLongTap(index) {
				this.lookData = {
					index: index,
					time: this.user.is_vip === 1 ? 8 : 3,
					timeShow: true
				}
				this.$emit('changeMediaStatus', 'start', index, 3)
				this.isTime = setInterval(this.timeCountdown, 1000)
			},
			// 倒计时
			timeCountdown() {
				if (this.lookData.timeShow) {
					if (this.lookData.time > 0) {
						this.lookData.time--
					} else {
						this.timeOut()
					}
				}
			},
			// 倒计时结束
			timeOut() {
				this.$emit('changeMediaStatus', 'end', this.lookData.index, 3)
				this.lookData = {
					index: -1,
					time: 3,
					timeShow: false
				}
				if (this.isTime) {
					clearInterval(this.isTime)
				}
			},
			// 长按视频
			videoLongTap(index) {
				this.videoIndex = index
				this.$emit('changeMediaStatus', 'start', index, 3)
				this.toPlayVideo(index)
			},
			// 播放视频
			toPlayVideo(index) {
				let that = this
				let video = this.list[index]
				console.log(video)
				uni.createSelectorQuery().select('.image-box').boundingClientRect(res => {
					let width = 0
					let height = 0
					if (video.width >= video.height) {
						width = res.width
						height = video.height / video.width * res.width
					} else {
						height = res.height
						width = res.width
					}
					that.videoSize = 'width: ' + width + 'px; height: ' + height + 'px'
					that.videoData = video
					that.videoPlay = true
				}).exec()
			},
			// 关闭视频
			closeVideo() {
				if (this.videoIndex !== -1) {
					this.$emit('changeMediaStatus', 'end', this.videoIndex, 3)
				}
				this.videoPlay = false
				this.videoData = null
				this.videoIndex = -1
			},
			// 充M豆
			toRecharge() {
				this.showUnifyPop = false
				uni.navigateTo({
					url: '/pages/my/member/recharge'
				})
			},
			// 发会员券
			sendMoney(index) {
				console.log(this.user.money)
				console.log(this.list[index])
				if (this.user.money > this.list[index].price) {
					this.hongbaoIndex = index
					this.showHongbao = true
				} else {
					this.showUnifyPop = true
					this.unifyType = 29
				}
			},
			// 去登录
			toLogin() {
				uni.reLaunch({
					url: '/pages/login/index'
				})
			},
			// 发会员券
			toSendHongbao() {
				CommonService.userreadphotogoldconsume({
					type: 1,
					money: this.list[this.hongbaoIndex].price,
					photo_id: this.list[this.hongbaoIndex].id
				}).then(res => {
					if (res.code === 1) {
						this.showHongbao = false
						if (this.list[this.hongbaoIndex].type === 'itsme_video') {
							this.toPlayVideo(this.hongbaoIndex)
						}
						this.$emit('changeMediaStatus', 'money', this.hongbaoIndex, 4)
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.look-box {
		width: 100vw;
		height: 100vh;
	}

	.look-height-box {
		height: 150rpx;
	}

	.rule-huo {
		width: 121rpx;
		height: 121rpx !important;
	}

	.time-box {
		width: 80rpx;
		height: 80rpx;
	}

	.huiyuan-btn {
		margin-left: 135rpx;
		margin-right: 135rpx;
		height: 90rpx;
		line-height: 90rpx;
		border-radius: 90rpx;
		box-shadow: 0 0 8rpx #EEEEEE;

		&-img {
			width: 42rpx;
		}
	}

	.media-btn-box {
		width: 480rpx;
		height: 90rpx;
		border-radius: 90rpx;
	}

	.media-btn-img {
		width: 40rpx;
		height: 40rpx;
	}

	.hongbao-box {
		width: 515rpx;
		height: 431rpx;
	}

	.hongbao-btn {
		width: 300rpx;
		height: 90rpx;
		line-height: 89rpx;
		left: 107.5rpx;
		top: 190rpx;
		border-radius: 90rpx;
		background: linear-gradient(to bottom, #FCE342, #FFB530);
		;
	}

	.hongbao-img {
		width: 40rpx;
		height: 40rpx;
	}

	.look-mask {
		position: relative;
		filter: blur(40rpx);
		user-select: none;
	}

	.look-mask::after {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		content: '';
		display: block;
		background: rgba(0, 0, 0, 0.8);
	}

	.vip-btn {
		width: 240rpx;
		height: 80rpx;
		background: #D97DB0;
		box-shadow: 0px 0px 8rpx 0px #EEEEEE;
		border-radius: 40rpx;
	}
</style>
