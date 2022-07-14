<template>
	<view class="width-full lh1 flex align-items-center">
		<view class="chat-bot-left ml15 mr10" @click="changeSendType">
			<image src="../../../static/itsme/its_14.png" class="chat-bot-left" mode="widthFix"></image>
		</view>
		<view class="flex-1 message-bot-input bg-itsme-4 flex align-items-center">
			<u-input
				v-model="content"
				type="text"
				placeholder=""
				:clearable="false"
				:custom-style="{'padding-left': '20rpx', 'padding-right': '20rpx', 'color': '#ffffff', 'flex': '1'}"
				:border="false"
				height="50"
				:focus="isFocus"
				cursor-spacing="50"
				:auto-blur="true"
				@click="omomomo(true)" 
				@blur="isFocus = false"
			/>
			<view class="fs12 color-white bg-itsme-2 message-bot-btn pl15 pr15 mr8" @touchend.prevent="sendTextMessage" >
				发送
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'send-text',
		data() {
			return {
				content: '',
				sendContent: null,
				isFocus:true
			}
		},
		props: {
			friend: Object,
			power: Object,
			emojitext:String,
			isFocusEmoji:Boolean
		},
		watch:{
			emojitext(){
				if(this.emojitext){
					this.content  = this.content + this.emojitext
				}else{
					this.content = this.content
				}
			},
			isFocusEmoji(){
				if(this.isFocusEmoji){
					this.isFocus  = this.isFocusEmoji 
				} 
			}
		},
		methods: {
			changeSendType() {
				this.$emit('changeSendType', 'audio')
			},
			omomomo(isFixed) {
				this.$emit('omomomo', isFixed)
			},
			sendTextMessage() {
				this.isFocus = true
				if (this.content.trim() != '') {
					let params = {
						text: this.content
					}
					
					this.content = ""
					this.sendImMessage('text', this.friend, params).then(
						(res) => {
							console.log('发送成功')
							this.$emit('sendSuccess', res)
						},
						(err) => {
							console.log('发送失败')
							console.log(err)
						}
					)
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.message-bot-input {
		height: 65rpx;
		line-height: 64rpx;
		border-radius: 65rpx;
	}
	.message-bot-btn {
		height: 55rpx;
		line-height: 55rpx;
		border-radius: 40rpx;
	}
	.chat-bot-left {
		width: 50rpx;
		height: 50rpx;
	}
</style>
