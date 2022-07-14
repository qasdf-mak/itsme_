<template>
	<view class="width-full lh1">
		<view v-for="(item,index) in messageList" :key="index">
			<view class="width-full mb20" v-if="item.type === 'itsme_tip'">
				<!-- 提示消息 -->
				<tip-item :item="item" :isWetherNeed="isWetherNeed" :isWhetherToUse="isWhetherToUse"
					@toSetLable="toSetLable" @sendGift="sendGift" @openThePopup="openThePopup"></tip-item>
			</view>
			<view class="width-full mb20" v-else-if="item.type.indexOf('itsme_common') !== -1">
				<!-- 系统消息 -->
				<common-item :item="item" v-if="item.type.indexOf('itsme_common') !== -1" :friend="friend"
					@toHome="toHome"></common-item>
			</view>
			<view class="width-full mb20" v-else>
				<!-- 聊天交互消息 -->
				<view class="width-full" v-if="item.receiver_read == 1 || item.type === 'itsme_gift' ||  item.type === 'itsme_voucher' || item.type === 'itsme_map' || item.senderId == user.id ">
					<!-- item.show ||item.type === 'itsme_gift' ||  item.type === 'itsme_voucher' -->
					<!-- 直接显示的消息 -->
					<!-- 音频 -->
					<audio-item :item="item" v-if="item.type === 'itsme_audio'" :friend="friend"
						:isPlay="audioIndex === index && audioStatus === 'play'" @audioPlay="audioPlay(index)"
						@changeItem="changeItem" @toHome="toHome"></audio-item>
					<!-- 文本 -->
					<text-item :item="item" v-if="item.type === 'itsme_text'" :friend="friend" @toHome="toHome">
					</text-item>
					<!-- 照片 / 视频 -->
					<media-item :item="item" v-if="item.type === 'itsme_image' || item.type === 'itsme_video'"
						:friend="friend" @previewImage="previewImage(item)" @toHome="toHome"></media-item>
					<!-- 礼物 -->
					<gift-item :item="item" v-if="item.type === 'itsme_gift'" :friend="friend" @toHome="toHome"
						@sendGift="sendGift"></gift-item>
					<!-- Me约-->
					<!-- <task-item :item="item" v-if="item.type === 'itsme_task'" :friend="friend" @toHome="toHome">
					</task-item> -->
					<!-- 抵用券-->
					<voucher-item :item="item" v-if="item.type === 'itsme_voucher'" :friend="friend"
						@useVoucher="useVoucher">
					</voucher-item>
					<!-- 邀请-->
					<invitation-item :item="item" v-if="item.type === 'itsme_invitation'" :friend="friend"
						@toHome="toHome">
					</invitation-item>
					 <!-- 位置 -->
					 <itsme-map :item="item" v-if="item.type === 'itsme_map'" :friend="friend"
					 	@toHome="toHome">
					 </itsme-map>
				</view>
				<view class="width-full" v-else>
					<!-- 无访问权限的消息 -->
					<hide-item :friend="friend" :item="item" @toHome="toHome" @toMemberPop="toMemberPop"></hide-item>
				</view>
			</view>
			
		</view>
		<!-- 媒体浏览 -->
		<view v-if="mediaPreview.show">
			<media-list :list="mediaPreview.list" isLogin :current="mediaPreview.index"
				@changeMediaStatus="changeMediaStatus" @closeMedia="mediaPreview.show = false"></media-list>
		</view>
		<!-- 媒体浏览 -->
		<home-power :showPower="showPower" :powerData="powerData" @closePop="showPower = false"></home-power>
	</view>
</template>

<script>
	import {
		mapGetters
	} from 'vuex'
	import ChatService from '../../common/service/chat-service.js'
	// 消息内容
	import audioItem from './item/audio.vue'
	import textItem from './item/text.vue'
	import commonItem from './item/common.vue'
	import mediaItem from './item/media.vue'
	import giftItem from './item/gift.vue'
	import voucherItem from './item/voucher.vue'
	import invitationItem from './item/invitation.vue'
	import itsmeMap from './item/position.vue'
	import hideItem from './item/hide.vue'
	import showVoucher from './item/voucher.vue'
	import tipItem from './item/tip.vue'
	import mediaList from '../message/medialist.vue'
	// 公共方法
	import {
		formatImage
	} from '../../common/utils/common-methods.js'
	// 音频
	import homePower from '../common/homePower.vue'
	export default {
		name: 'message-item',
		props: {
			messageList: Array,
			isWetherNeed: Boolean,
			isWhetherToUse: Boolean,
			friend: Object,
		},
		data() {
			return {
				mediaPreview: { // 媒体浏览
					list: null,
					index: 0,
					show: false
				},
				// 音频播放
				isPop: 2,
				innerAudio: null,
				audioIndex: -1,
				audioStatus: '',
				showPower: false,
				powerData: null
			}
		},
		destroyed() {
			if (this.innerAudio) {
				this.innerAudio.destroy()
				this.innerAudio = null
			}
		},
		computed: {
			...mapGetters(['user'])
		},
		components: {
			audioItem,
			textItem,
			mediaItem,
			giftItem,
			commonItem,
			mediaList,
			hideItem,
			tipItem,
			homePower,
			invitationItem,
			voucherItem,
			itsmeMap
		},
		mounted() {
			console.log('视频')
			console.log(this.messageList)
			this.innerAudio = uni.createInnerAudioContext()
			this.innerAudio.autoplay = false
			this.innerAudio.loop = false
			this.innerAudio.onPlay(() => {
				console.log('开始播放')
				this.audioStatus = 'play'
				console.log(this.audioIndex)
			})
			this.innerAudio.onPause(() => {
				console.log('音频暂停')
				if (this.audioIndex === -1) {
					this.audioStatus = ''
				} else {
					this.audioStatus = 'pause'
				}
			})
			this.innerAudio.onStop(() => {
				console.log('音频停止')
				this.audioStatus = ''
			})
			this.innerAudio.onEnded(() => {
				console.log('音频结束')
				this.audioStatus = ''
				this.audioIndex = -1
			})
		},
		methods: {
			// 媒体预览
			previewImage(data) {
				let medias = JSON.parse(JSON.stringify(this.messageList)).filter(item => {
					return item 
				})
				let media = medias.filter(item => {
					return item.id === data.id
				})[0]
				// console.log('medias.indexOf(media)')
				// console.log(medias)
				// console.log(media)
				// console.log(medias.indexOf(media))
				// console.log('medias.indexOf(media)')
				this.mediaPreview.index = medias.indexOf(media)
				this.mediaPreview.list = medias.map(item => {
					return this.formatMedia(item)
				})
				console.log('medias')
				console.log(this.mediaPreview)
				console.log('medias')
				this.mediaPreview.show = true
				
			},
			// 格式化媒体数据
			formatMedia(item) {
				let media = item.payload
				media.messageId = item.id
				media.type = item.type
				if (Number(item.senderId) === Number(this.user.id)) {
					media.rule_type = 2
				}
				return media
			},
			isLook() {
				this.$emit('isLook')
			},
			toMemberPop() {
				this.$emit('toMemberPop')
			},
			//打开会员券弹窗
			openThePopup() {
				this.$emit('openThePopup')
			},
			// 媒体预览操作
			changeMediaStatus(type, index, status) {
				if (type === 'start') {
					console.log( index)
					console.log(this.mediaPreview.list[index])
					console.log(this.mediaPreview.list)
					this.mediaPreview.list[index].rule_type = 2
					ChatService.chatmsghandle({
						id:  this.mediaPreview.list[index].messageId
					}).then(res => {
						if (res.code === 1) {
							let messagedata = res.data
							messagedata.show = true
							this.changeItem(messagedata)
						}
					})
				} else {
					this.mediaPreview.list[index].rule_type = 3
					this.mediaPreview.list[index].is_read = 1
				}
			},
			// 音频播放
			audioPlay(index) {
				if (this.audioStatus === '') {
					this.audioIndex = index
					this.innerAudio.src = formatImage(this.messageList[index].payload.url)
					this.innerAudio.play()
				}
				if (this.audioStatus === 'play') {
					if (this.audioIndex === index) {
						this.innerAudio.pause()
					} else {
						this.innerAudio.stop()
						this.audioIndex = index
						this.innerAudio.src = formatImage(this.messageList[index].payload.url)
						this.innerAudio.play()
					}
				}
				if (this.audioStatus === 'pause') {
					if (this.audioIndex === index) {
						this.innerAudio.play()
					} else {
						this.audioIndex = index
						this.innerAudio.stop()
						this.innerAudio.src = formatImage(this.messageList[index].payload.url)
						this.innerAudio.play()
					}
				}
			},
			// 消息状态发生变化
			changeItem(item) {
				this.$emit('changeItem', item)
			},
			// 去用户主页
			toHome() {
				if (this.friend.uuid !== this.user.id) {
					this.toUserHome('message', this.friend.uuid).then(res => {
						if (res.data.code === 200 || this.user.gender === 0) {
							uni.navigateTo({
								url: '/pages/itsme/home?id=' + this.friend.uuid + '&type=msg'
							})
						} else {
							this.powerData = {
								look: res.data.see,
								total: res.data.total,
								type: res.data.code,
								id: this.friend.uuid
							}
							this.showPower = true
						}
					})
				}
			},
			// 设置标签
			toSetLable() {
				this.$emit('toSetLable')
			},
			sendGift(sex) {
				this.$emit('sendGift', sex)
			},
			useVoucher(payload) {
				this.$emit('useVoucher', payload)
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>
