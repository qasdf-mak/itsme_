<template>
<view>
	<u-popup v-model="show" mode="center">
		<view class="look-box bg-black flex flex-col">
			<view class="width-full" :style="'height:' + StatusBar + 'px;'"></view>
			<view class="width-full look-height-box flex align-items-center flex-between" >
				<view class="icon_font fs24 color-white ml15">
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
			<view class="width-full flex-1 float-hidden">
				<swiper class="width-full height" circular :current="currentIndex" @change="changeLook">
					<swiper-item v-for="(item, index) in photoList" :key="index">
							<!-- 原图 -->
							<view class="width-full height relative">
								<view
									class="width-full height float-hidden"
									:class="(item.rule_type === 1 || item.rule_type === 2 || ((item.rule_type === 3 || item.rule_type === 4) && lookData.index === index && lookData.timeShow)) ? '' : 'look-mask'"
								>
									<view class="width-full height flex align-items-center flex-center" v-if="Number(item.type) ===1">
										<view class="width-full">
											<image :src="item.url | imageFilter" class="width-full" mode="widthFix"></image>
										</view>
									</view>
									<view class="width-full height flex align-items-center flex-center" v-else>
										<view class="width-full">
											<image :src="item.url | imageFilter('poster')" class="width-full" mode="widthFix"></image>
										</view>
										<view class="absolute top left right bottom flex align-items-center flex-center" v-if="Number(item.type) ===2 && (item.rule_type === 1 || item.rule_type === 2)" @click="toPlayVideo(index)">
											<view class="icon_font fs50 color-white">
												&#xe622;
											</view>
										</view>
									</view>
								</view>
								<!-- 原图 -->
								<!-- 阅后即焚-照片 - 未看 -->
								<view
									class="absolute top left right bottom flex align-items-center flex-center flex-col"
									v-if="Number(item.type) === 1 && item.rule_type === 3 && item.is_read === 0 && !lookData.timeShow"
									@longtap="photoLongTap(index)"
								>
									<image src="../../static/itsme/itsme_5.png" class="rule-huo" mode="widthFix"></image>
									<view class="fs14 color-white text-center lh18 mt25">
										阅后即焚照片<br/>
										长按照片查看
									</view>
								</view>
								<!-- 阅后即焚-照片 - 未看 -->
								<!-- 阅后即焚-视频 - 未看 -->
								<view
									class="absolute top left right bottom flex align-items-center flex-center flex-col"
									v-if="Number(item.type) === 2 && item.rule_type === 3 && item.is_read === 0 && !lookData.timeShow"
									@longtap="videoLongTap(index)"
								>
									<image src="../../static/itsme/itsme_5.png" class="rule-huo" mode="widthFix"></image>
									<view class="fs14 color-white text-center lh18 mt25">
										阅后即焚视频<br/>
										长按查看视频
									</view>
								</view>
								<!-- 阅后即焚-视频 - 未看 -->
								<!-- 阅后即焚照片 - 已看 -->
								<view
									class="absolute top left right bottom flex align-items-center flex-center flex-col"
									v-if="Number(item.type) === 1 && item.rule_type === 3 && item.is_read === 1 && !lookData.timeShow"
								>
									<image src="../../static/itsme/itsme_8.png" class="rule-huo" mode="widthFix"></image>
									<view class="fs14 color-white text-center mt25">
										照片已焚毁
									</view>
									<view class="width-full">
										<view class="fs14 color-white text-center mt15">
											（会员可延长查看8秒）
										</view>
										<view class="mt15 huiyuan-btn bg-2 flex align-items-center flex-center btn-box">
											<image src="../../static/itsme/itsme_9.png" class="huiyuan-btn-img" mode="widthFix"></image>
											<view class="fs15 color-white ml10 mt3">
												升级会员
											</view>
										</view>
									</view>
								</view>
								<!-- 阅后即焚照片 - 已看 -->
								<!-- 阅后即焚视频 - 已看 -->
								<view
									class="absolute top left right bottom flex align-items-center flex-center flex-col"
									v-if="Number(item.type) === 2 && item.rule_type === 3 && item.is_read === 1 && !lookData.timeShow"
								>
									<image src="../../static/itsme/itsme_8.png" class="rule-huo" mode="widthFix"></image>
									<view class="fs14 color-white text-center mt25">
										视频已焚毁
									</view>
									<view class="width-full">
										<view class="fs14 color-white text-center mt15">
											（会员可查看完整视频）
										</view>
										<view class="mt15 huiyuan-btn bg-2 flex align-items-center flex-center btn-box">
											<image src="../../static/itsme/itsme_9.png" class="huiyuan-btn-img" mode="widthFix"></image>
											<view class="fs15 color-white ml10 mt3">
												升级会员
											</view>
										</view>
									</view>
								</view>
								<!-- 阅后即焚 - 已看 -->
							</view>
					</swiper-item>
				</swiper>
			</view>
			<view class="width-full look-height-box"></view>
		</view>
	</u-popup>
	<!-- 视频 -->
	<view class="fixed top left right bottom bg-black flex flex-col" style="z-index: 99999;" v-if="videoPlay && videoData">
		<view class="width-full" :style="'height:' + StatusBar + 'px;'"></view>
		<view class="width-full look-height-box flex align-items-center">
			<view class="icon_font fs22 color-white ml15" @click="closeVideo">
				&#xe619;
			</view>
		</view>
		<view class="width-full flex-1 flex align-items-center flex-center">
			<video-play :url="videoData.url" @closeVideo="closeVideo"></video-play>
		</view>
		<view class="width-full look-height-box"></view>
	</view>
	<!-- 视频 -->
</view>
</template>

<script>
	import videoPlay from '../video/play.vue'
	export default {
		name: 'photo-look',
		data() {
			return {
				currentIndex: 0,
				lookData: {
					index: -1,
					time: 3,
					timeShow: false,
					isTime: null
				},
				videoPlay: false,
				videoData: null
			}
		},
		components: {
			videoPlay
		},
		props: {
			showLook: Boolean,
			photoList: Array,
			lookIndex: Number
		},
		computed: {
			show: {
				get () {
					return this.showLook
				},
				set () {}
			}
		},
		methods: {
			// 退出
			closeLook() {
				if (this.lookData.timeShow) {
					this.timeOut()
				}
				this.$emit('closeLook')
			},
			// 播放视频
			toPlayVideo(index) {
				this.videoData = this.photoList[index]
				this.videoPlay  = true
				console.log(this.videoData)
			},
			videoLongTap(index) {
				this.photoList[index].is_read = 1
				this.videoData = this.photoList[index]
				this.videoPlay  = true
				console.log(this.videoData)
			},
			// 关闭视频
			closeVideo() {
				this.videoPlay  = false
				this.videoData = null
			},
			// 切换
			changeLook({detail}) {
				this.currentIndex = detail.current
				if (this.lookData.timeShow) {
					this.timeOut()
				}
			},
			// 长按图片
			photoLongTap(index) {
				this.lookData = {
					index: index,
					time: 3,
					timeShow: true
				}
				this.isTime = setInterval(this.timeCountdown, 1000)
			},
			// 倒计时
			timeCountdown () {
				let that = this
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
				this.photoList[this.lookData.index].is_read = 1
				this.lookData = {
					index: -1,
					time: 3,
					timeShow: false
				}
				if (this.isTime) {
					clearInterval(this.isTime)
				}
			}
		},
		mounted() {
			this.currentIndex = this.lookIndex
		}
	}
</script>

<style lang="scss" scoped>
	.look-box{
		width: 100vw;
		height: 100vh;
	}
	.look-height-box{
		height: 150rpx;
	}
	.rule-huo{
		width: 80rpx;
	}
	.time-box{
		width: 80rpx;
		height: 80rpx;
	}
	.huiyuan-btn{
		margin-left: 135rpx;
		margin-right: 135rpx;
		height: 90rpx;
		line-height: 90rpx;
		border-radius: 90rpx;
		box-shadow: 0 0 8rpx #EEEEEE;
		&-img{
			width: 42rpx;
		}
	}
	.look-mask{position: relative;filter: blur(40rpx);user-select: none;}
	.look-mask::after{position: absolute;top: 0;left: 0;width: 100%;height: 100%;content: '';display: block;background: rgba(0, 0, 0, 0.8);}
</style>
