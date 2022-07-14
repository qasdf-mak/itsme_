<template>
	<view class="width-full lh1">
		<view class="fixed bottom left right bg-itsme-3">
			<view class="width-full bg-itsme-3 pb_iphoneX_safe">
				<view class="width-full pt15 pb15 flex align-items-center">
					<view class="flex-1">
						<view v-if="isAudio">
							<!-- 发送语音消息 -->
							<send-audio :friend="friend" @sendSuccess="sendSuccess"
								@changeSendType="changeSendType"></send-audio>
						</view>
						<view v-else>
							<!-- 发送文本消息 -->
							<send-text :friend="friend" :isFocusEmoji="!closeEmoji" :emojitext="emojitext" @sendSuccess="sendSuccess"
								@changeSendType="changeSendType" @omomomo="omomomo">
							</send-text>
						</view>
					</view>
					<view class="chat-bot-right ml10 icon_font fs25 color-itsme-2" @click="openEmoji()">
						{{closeEmoji ?  "&#xe66f;" : "&#xe66e;"}}
					</view>
					<view class="chat-bot-right mr15 ml15" @click="showMore(true)">
						<image src="../../static/itsme/its_13.png" class="chat-bot-right" mode="widthFix"></image>
					</view>
				</view>
			
				<view class="width-full" v-if="closeMenuPop">
					<view class="width-full bg-itsme-3 flex align-items-center flex-wrap border-box more-box">
						<view v-for="(item,index) in moreList" :key="index">
							<view class="more-item br5 bg-itsme-4 flex align-items-center flex-col flex-center"
								@click="clickItem(item.type)">
								<view class="icon_font color-white fs20" v-html="item.icon"></view>
								<view class="fs12 color-white mt10">
									{{item.title}}
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="width-full" v-if="closeEmoji">
					<send-emoji :show="closeEmoji" @emojiText="emojiText"></send-emoji>
				</view>
			</view>
		</view>
		<!-- 发照片视频 -->
		<view v-if="showMediaSheet">
			<send-media :friend="friend" :type="mediaType" @sendSuccess="sendSuccess"
				@closeMediaSheet="showMediaSheet = false"></send-media>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import TaskService from '../../common/service/task-service.js'
	import sendText from './send/text.vue'
	import sendAudio from './send/audio.vue'
	import sendMedia from './send/media.vue'
	import sendMore from './send/more.vue'
	import sendEmoji from './send/sendEmoji.vue'
	import {
		recordAuthorize
	} from '../../common/appjs/authorize.js'
	export default {
		name: 'send-box',
		data() {
			return {
				isAudio: false,
				imService: null,
				closeEmoji:false,
				emojitext:'',
				mediaType: '', // 媒体类型
				showMediaSheet: false, // 照片、视频
				moreList: [{
						title: '照片',
						icon: '&#xe666;',
						type: 'photo'
					},
					{
						title: '视频',
						icon: '&#xe667;',
						type: 'video'
					},
					{
						title: '礼物',
						icon: '&#xe668;',
						type: 'gift'
					},
					{
						title: '会员券',
						icon: '&#xe66a;',
						type: 'voucher'
					}
				]
			}
		},
		// {
		// 	title: '位置',
		// 	icon: '&#xe643;',
		// 	type: 'position'
		// }
		props: {
			friend: Object,
			selfTask: Object,
			showSelfTask: Boolean,
			// power: Object,
			closeMenuPop: Boolean // 关闭菜单栏
		},
		components: {
			sendText,
			sendAudio,
			sendMedia,
			sendEmoji
		},
		mounted() {
			this.imService = getApp().globalData.imService
		},
		methods: {
			// 音频 / 文字 切换
			changeSendType(type) {
				if (type === 'audio') {
					if (this.user && this.user.gender === 1 && this.user.is_vip === 0) {
						// 男性非Vip，只能发送文字消息
						this.clickPower(1)
					} else {
						recordAuthorize().then(res => {
							console.log(res)
							if (res !== -1 && res !== 0) {
								this.isAudio = true
							}
						})
					}
				}
				if (type === 'text') {
					this.isAudio = false
				}
			},
			openEmoji(){
				this.closeEmoji = !this.closeEmoji
				this.$emit('closeEmoji')
				this.$emit('showCloseEmoji', this.closeEmoji)
			},
			emojiText(item){
				this.emojitext = item
			},
			omomomo(index) {
				this.closeEmoji = false
				this.$emit('omomomo', index)
				this.$emit('showCloseEmoji', this.closeEmoji)
			},
			showMore(state) {
				this.closeEmoji = false
				this.$emit('showMore', state)
			},
			 
			// clickPower() {
			// 	this.$emit('clickPower')
			// },
			// 信息发送成功
			sendSuccess(res) {
				console.log(res)
				if (res.code === 1) {
					this.showMore(false)
					this.showMediaSheet = false
					this.$emit('sendSuccess', res.data)
					this.closeEmoji = false
					this.$emit('showCloseEmoji', this.closeEmoji)
				} else {
					this.$emit('competence', res)
					this.closeEmoji = false
					this.$emit('showCloseEmoji', this.closeEmoji)
				}
			},
			clickItem(type) {
				if (this.user && this.user.gender === 1 && this.user.is_vip === 0) {
					// 男性非Vip，只能发送文字消息
					this.showMore(false)
					this.$emit('manNoVipPop')
					return false
				}
				// 发照片
				if (type === 'photo') {
					this.showMediaSheet = false
					this.mediaType = 'photo'
					setTimeout(() => {
						this.showMediaSheet = true
					}, 200)
				}
				// 发视频
				if (type === 'video') {
					this.showMediaSheet = false
					this.mediaType = 'video'
					setTimeout(() => {
						this.showMediaSheet = true
					}, 200)
				}
				// 发礼物
				if (type === 'gift') {
					this.$emit('sendGift')
				}
				// 发会员券抵用券
				if (type === 'voucher') {
					if (this.user.gender === 1) {
						uni.showToast({
							title: '功能暂未开放  请耐心等候 ~',
							icon: 'none'
						})
					} else {
						this.$emit('sendVoucher')
					}
				}
				if (type === 'position') {
						this.$emit('sendPosition')
				}
				this.showMore(false)
			},
			sendGift() {
				this.$emit('sendGift')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.chat-bot-right {
		width: 50rpx;
		height: 50rpx;
	}

	.more-box {
		padding-left: 54rpx;
	}

	.more-item {
		width: calc((100vw - 270rpx) / 4);
		height: 140rpx;
		margin-right: 54rpx;
		margin-bottom: 54rpx;
	}
</style>
