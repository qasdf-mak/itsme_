<strong></strong><template>
	<view v-if="item && item.payload && item.payload.duration">
		<view class="width-full flex align-items-center lh1 flex-right" v-if="item.senderId == user.id">
			<view v-if="item.payload.recordhuo">
				<image src="../../../static/itsme/itsme_8.png" class="recordhuo-img mr10" mode="widthFix" v-if="canToPlay"></image>
				<image src="../../../static/itsme/itsme_5.png" class="recordhuo-img mr10" mode="widthFix" v-else></image>
			</view>
			<view class="flex align-items-center flex-between pl12 pr12 border-box audio-box bg-itsme-2" :style="audioStyle" @click="audioPlay">
				<image src="../../../static/chat/chat_8.gif" class="audio-img" mode="widthFix" v-if="isPlay"></image>
				<image src="../../../static/chat/chat_5.png" class="audio-img" mode="widthFix" v-else></image>
				<view class="fs14 color-white">
					{{parseInt(item.payload.duration)}}s
				</view>
			</view>
		</view>
		<view class="width-full flex align-items-center lh1 flex-left" v-else>
			<view class="avatar-box mr12 float-hidden" @click="toHome">
				<image :src="friend.avatar | imageFilter('m11')" class="width-full height" mode="widthFix"></image>
			</view>
			<view
				class="flex align-items-center flex-between pl12 pr12 border-box audio-box bg-itsme-4"
				:style="audioStyle"
				@click="audioPlay"
			>
				<view class="fs14 color-white">
					{{parseInt(item.payload.duration)}}s
				</view>
				<image src="../../../static/chat/chat_9.gif" class="audio-img" mode="widthFix" v-if="isPlay"></image>
				<image src="../../../static/chat/chat_6.png" class="audio-img" mode="widthFix" v-else></image>
			</view>
			<view v-if="item.payload.recordhuo">
				<image src="../../../static/itsme/itsme_8.png" class="recordhuo-img ml10" mode="widthFix" v-if="canToPlay"></image>
				<image src="../../../static/itsme/itsme_5.png" class="recordhuo-img ml10" mode="widthFix" v-else></image>
			</view>
		</view>
	</view>
</template>

<script>
import { mapGetters } from 'vuex'
import ChatService from '../../../common/service/chat-service.js'
export default{
	name: 'item-audio',
	data() {
		return {
			canToPlay: false,
			isTime: null 
		}
	},
	props: {
		item: Object,
		friend: Object,
		isPlay: {
			type: Boolean,
			default: false
		}
	},
	destroyed() {
		if (this.isTime) {
			clearTimeout(this.isTime)
		}
	},
	mounted() {
		this.setCanToPlay()
	},
	computed: {
		...mapGetters(['user']),
		audioStyle () {
			if (this.item && this.item.payload && this.item.payload.duration) {
				let duration = parseInt(this.item.payload.duration)
				if (duration > 0 && duration <= 60) {
					return 'width: ' + (120 + duration * 6) + 'rpx'
				}
				if (duration > 45 && duration <= 60) {
					return 'width: 480rpx'
				}
			} else {
				return ''
			}
		}
	},
	methods: {
		toHome() {
			this.$emit('toHome')
		},
		audioPlay() {
			if (this.item && this.item.payload && this.item.payload.recordhuo && !this.item.payload.clicktime) {
				ChatService.chatmsghandle({
					message_id: this.item.messageId
				}).then(res => {
					if (res.code === 1) {
						let messagedata = res.data
						messagedata.show = true
						messagedata.payload = JSON.parse(res.data.payload)
						this.$emit('changeItem', messagedata)
						setTimeout(() => {
							this.setCanToPlay()
						}, 3000)
					}
				})
			}
			if (!this.canToPlay) {
				this.$emit('audioPlay')
			}
		},
		setCanToPlay() {
			let settime = 60
			console.log('this.item.payload')
			console.log(this.item.payload)
			if (this.item && this.item.payload && this.item.payload.recordhuo && this.item.payload.clicktime) {
				console.log(this.item.payload.clicktime)
				let time = Math.round(new Date().getTime() / 1000) - this.item.payload.clicktime
				if (time > settime) {
					this.canToPlay = true
				} else {
					this.isTime = setTimeout(() => {this.setCanToPlay()}, (settime - time + 1) * 1000)
				}
			}
		}
	}
}
</script>

<style lang="scss" scoped>
	.audio-box{
		height: 70rpx;
		line-height: 68rpx;
		border-radius: 70rpx;
	}
	.audio-img{
		width: 24rpx;
	}
	.avatar-box{
		width: 80rpx;
		height: 80rpx;
		border-radius: 80rpx;
	}
	.recordhuo-img{
		width: 30rpx;
	}
</style>
