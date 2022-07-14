<template>
	<swiper :class="show" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval"
		:duration="duration">
		<block>
			<swiper-item>
				<view class="emoji_item mt10">
					<image v-for="(item, index) in emojiObj.map1" :key="index"
						:src="'/' + emojiObj.path + item" class="emoji" @tap="sendEmoji" :data-emoji="index">
					</image>
				</view>
				<view class="emoji_item mt10">
					<image v-for="(item, index) in emojiObj.map2" :key="index"
						:src="'/' +emojiObj.path + item" class="emoji"  @click="sendEmoji" :data-emoji="index">
					</image>
				</view>
				<view class="emoji_item mt10">
					<image v-for="(item, index) in emojiObj.map3" :key="index"
						:src="'/' +emojiObj.path + item" class="emoji"  @click="sendEmoji" :data-emoji="index">
					</image>
				</view>
			</swiper-item>
		</block>
		<block class="second">
			<swiper-item >
				<view class="emoji_item mt10">
					<image v-for="(item, index) in emojiObj.map4" :key="index"
						:src="'/' +emojiObj.path + item" class="emoji" @click="sendEmoji" :data-emoji="index">
					</image>
				</view>
				<view class="emoji_item mt10">
					<image v-for="(item, index) in emojiObj.map5" :key="index"
						:src="'/' +emojiObj.path + item" class="emoji"  @click="sendEmoji" :data-emoji="index">
					</image>
				</view>
			</swiper-item>
		</block>
	</swiper>
</template>

<script>
	import emoji from "../../../common/utils/emoji.js"
	export default {
		data() {
			return {
				emoji: emoji.emoji,
				emojiObj: emoji.emojiObj,
				interval: 5000,
				duration: 1000,
				autoplay: false,
				indicatorDots: true // 显示面板指示点
			};
		},
		props: {
			show: Boolean
		},
		mounted() {
			console.log(emoji.emoji)
			console.log(this.emojiObj)
			console.log(this.emoji)
		},
		methods:{
			sendEmoji(event){
				let emoji = event.target.dataset.emoji;
				this.$emit("emojiText",emoji)
			}
		}
	}
</script>

<style scoped>
	.emoji_list {
		margin-top: 30px;
		width: 100%;
		height: 145px;
		background-color: #dddddd;
		padding-top: 10px;
		padding-left: 3%;
		display: none;
	}

	.showEmoji {
		width: 100%;
		height: 145px;
		padding-top: 10px;
		padding-left: 3%;
		display: block;
	}

	.emoji_list image,
	.showEmoji image {
		width: 26px;
		height: 26px;
		margin: 5px 2%;
	}

	.emoji {
		width: 26px;
		height: 26px;
		margin: 0 0;
	}

	.emoji_item {
		display: flex;
		justify-content: space-around;
	}

	.last_item {
		justify-content: flex-end !important
	}
</style>
