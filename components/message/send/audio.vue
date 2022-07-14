<template>
	<view class="width-full lh1">
		<view class="width-full flex align-items-center">
			<view class="chat-bot-left flex align-items-center flex-center ml15 mr10">
				<view class="icon_font color-itsme-2 fs20" @click="changeSendType">
					&#xe624;
				</view>
			</view>
			<view class="flex-1 message-bot-input bg-itsme-4 border-box flex align-items-center" @touchmove.stop.prevent="moveHandle">
				<view
					class="width-full height fs15 color-white text-center"
					@touchstart="onTouchStart"
					@touchmove="onTouchMove"
					@touchend="onTouchEnd"
				>
					按住说话
				</view>
			</view>
		</view>
		<!-- 录音模块 -->
		<view class="fixed top bottom right left" v-if="recording">
			<view class="width-full height relative">
				<view class="absolute top left right bottom bg-black" style="opacity: 0.7;"></view>
				<view class="absolute top left right bottom flex align-items-center flex-center">
					<view class="recording-play mb35">
						<image src="../../../static/chat/chat_7.gif" class="width-full" mode="widthFix"></image>
						<view class="fs15 color-white text-center width-full mt15 mb35">
							{{time}}s
						</view>
					</view>
				</view>
				<view class="absolute bottom recording-bot bg-white pb_iphoneX_safe flex flex-center">
					<view class="fs15 color-deep mt35">
						松开发送
					</view>
				</view>
				<view class="absolute left right recording-cent pb_iphoneX_safe flex">
					<view class="flex-1 flex flex-col flex-center align-items-center relative">
						<view class="recording-btn">
							<image src="../../../static/chat/chat_1.png" class="width-full" mode="widthFix" v-if="recordclose"></image>
							<image src="../../../static/chat/chat_3.png" class="width-full" mode="widthFix" v-else></image>
						</view>
						<view class="fs14 color-white pt12">
							取消发送
						</view>
						<view class="absolute right top recording-dw" id="record-top"></view>
					</view>
					<view class="flex-1 flex flex-col flex-center align-items-center relative">
						<view class="recording-btn">
							<image src="../../../static/chat/chat_2.png" class="width-full" mode="widthFix" v-if="recordhuo"></image>
							<image src="../../../static/chat/chat_4.png" class="width-full" mode="widthFix" v-else></image>
						</view>
						<view class="fs14 color-white pt12">
							设为阅后即焚
						</view>
						<view class="absolute right bottom recording-dw" id="record-bot"></view>
					</view>
				</view>
			</view>
		</view>
		<!-- 录音模块 -->
	</view>
</template>

<script>
	const recorderManager = uni.getRecorderManager()
	import uploadAudio from '../../../common/utils/upload-audio.js'
	export default {
		name: 'send-audio',
		data() {
			return {
				// 录音
				recording: false, // 录音状态
				recordclose: false, // 取消录音
				recordhuo: false, // 设为阅后即焚
				time: 0, // 录音时长
				recordTime: null, // 录音时间控制器
				recordTop: null,
				recordData: null,
				recordLeft: null,
				recordRight: null,
				recordBottom: null
			}
		},
		props: {
			friend: Object,
			power: Object
		},
		mounted() {
			recorderManager.onStop((res) => {
				this.audioSuccess(res)
			})
		},
		methods: {
			changeSendType() {
				this.$emit('changeSendType', 'text')
			},
			moveHandle() {
				
			},
			// 录音开始
			onTouchStart() {
				let that = this
				this.recording = true
				this.$nextTick(() => {
					if (!that.recordTop) {
						uni.createSelectorQuery().select('#record-top').boundingClientRect(res => {
							this.recordTop = res.top
							this.recordLeft = res.left
						}).exec()
						uni.createSelectorQuery().select('#record-bot').boundingClientRect(res => {
							this.recordRight = res.left
							this.recordBottom = res.bottom
						}).exec()
					}
				})
				recorderManager.start()
				this.recordTime = setInterval(() => { this.time++ }, 1000)
			},
			// 录音按钮滑动
			onTouchMove(event) {
				const touch = event.changedTouches[0]
				if (this.recordTop && this.recordLeft && this.recordRight && this.recordBottom) {
					if (touch.clientX >= 0 && touch.clientX < this.recordLeft && touch.clientY >= this.recordTop && touch.clientY < this.recordBottom) {
						this.recordclose = true
					} else {
						this.recordclose = false
					}
					if (touch.clientX > this.recordLeft && touch.clientX <= this.recordRight && touch.clientY >= this.recordTop && touch.clientY < this.recordBottom) {
						this.recordhuo = true
					} else {
						this.recordhuo = false
					}
				} else {
					this.recordclose = false
					this.recordhuo = false
				}
			},
			// 录音结束
			onTouchEnd() {
				recorderManager.stop()
			},
			// 录音结束
			audioSuccess(audiodata) {
				this.recording = false
				clearInterval(this.recordTime)
				// 取消发送
				if (this.recordclose) {
					this.time = 0
					this.recordclose = false
					this.recordhuo = false
					return false
				}
				// 发送时间不够1S
				if (this.time < 1) {
					uni.showToast({
					  title: '多说几句',
						icon: 'none',
					  duration: 1500
					})
					this.time = 0
					this.recordclose = false
					this.recordhuo = false
					return false
				}
				// 发送语音前上传oss
				uploadAudio(audiodata.tempFilePath).then(audio => {
					let audioInfo = {
						url: audio,
						duration: this.time,
						recordhuo: this.recordhuo,
						clicktime: ''
					}
					this.time = 0
					this.recordclose = false
					this.recordhuo = false
					this.sendImMessage('audio', this.friend, audioInfo).then(
						(res) => {
							console.log('发送成功')
							this.$emit('sendSuccess', res)
						},
						(err) => {
							console.log('发送失败')
							console.log(err)
						}
					)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.message-bot-input{
		height: 65rpx;
		line-height: 63rpx;
		border-radius: 65rpx;
	}
	.message-bot-btn{
		height: 60rpx;
		line-height: 56rpx;
		border-radius: 60rpx;
	}
	.recording-box{
		width: 100%;
		height: 100%;
	}
	.recording-bot{
		width: 120%;
		left: -10%;
		height: 238rpx;
		border-radius: 50% 50% 0 0;
	}
	.recording-cent{
		bottom: 400rpx;
	}
	.recording-btn{
		width: 110rpx;
		height: 110rpx;
		border-radius: 110rpx;
	}
	.recording-dw{
		width: 1rpx;
		height: 1rpx;
	}
	.recording-play{
		width: 250rpx;
	}
	.chat-bot-left{
		width: 50rpx;
		height: 50rpx;
	}
</style>
