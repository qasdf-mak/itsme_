<template>
	<view v-if="item && item.payload && item && item.payload.text">
		<view class="width-full flex align-items-center lh1 flex-right" v-if="item.senderId == user.id">
			<view class=" text-box br20 bg-itsme-2 fs14 color-white pt3 pb3 pl15 pr15 lh15 mt5" v-if="isEmoji">
				<view class="flex align-items-center ">
					<view class="" v-if="textAndEmoji" v-for="(item , index) in textAndEmoji" :key="index">
						<view class="color-white" v-if="item.type === 'string'">
						{{item.msg}}
						</view>
						<image v-if="item.type === 'emoji'" class="emojiAvatar mt5" :src="'/static/itsme/faces/' + item.msg" />
					</view>
				</view>
			</view>
			<view class="text-box br20 bg-itsme-2 fs14 color-white pt8 pb8 pl15 pr15 lh15 mt5" v-else>
				{{item.payload.text}}
			</view>
		</view>
		<view class="width-full flex align-items-start lh1 flex-left" v-else>
			<view class="avatar-box mr12 float-hidden" @click="toHome">
				<image :src="friend.avatar | imageFilter('m11')" class="width-full height" mode="widthFix"></image>
			</view>
			<view class=" text-box br20 bg-itsme-2 fs14 color-white pt3 pb3 pl15 pr15 lh15 mt5" v-if="isEmoji">
				<view class="flex align-items-center ">
					<view class="" v-if="textAndEmoji" v-for="(item , index) in textAndEmoji" :key="index">
						<view class="color-white" v-if="item.type === 'string'">
						{{item.msg}}
						</view>
						<image v-if="item.type === 'emoji'" class="emojiAvatar mt5" :src="'/static/itsme/faces/' + item.msg" />
					</view>
				</view>
			</view>
			<view class="text-box br20 bg-itsme-2 fs14 color-white pt8 pb8 pl15 pr15 lh15 mt5" v-else>
				{{item.payload.text}}
			</view>
		</view>
	</view>
</template>

<script>
	import emoji from '../../../common/utils/emoji.js'
	import {
		mapGetters
	} from 'vuex'
	export default {
		name: 'item-text',
		props: {
			item: Object,
			friend: Object,
			isPlay: {
				type: Boolean,
				default: false
			}
		},
		computed: {
			...mapGetters(['user']),
			isEmoji() {
				let item = this.item.payload.text
				let textemoji = item.split(/[\[*\]]/)
				if (textemoji.length > 1) {
					return true
				} else {
					return false
				}
			},
			textAndEmoji() {
				let textemoji = this.item.payload.text.split(/[\[*\]]/)
				console.log(textemoji)
				let emojiObject = emoji.emoji.map
				let textemoji1 = null
				let emojiArray1 = textemoji.map(res => {
					if (emojiObject[res] !== undefined) {
						let item = {
							type:'emoji',
							msg:emojiObject[res]
						}
						res = item
					}else{
						let item = {
							type:'string',
							msg:res
						}
						res = item
					}
					return res
				})
				console.log(emojiArray1)
				return emojiArray1
			}
		},
		mounted() {
			// console.log(this.item)
		},
		methods: {
			toHome() {
				this.$emit('toHome')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.text-box {
		max-width: 520rpx;
		word-break: break-word;
	}

	.avatar-box {
		width: 80rpx;
		height: 80rpx;
		border-radius: 80rpx;
	}

	.emojiAvatar {
		width: 40rpx;
		height: 40rpx;
	}
</style>
