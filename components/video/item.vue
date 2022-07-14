<template>
	<view class="width-full height lh1 relative">
		<view class="width-full height " v-if="isPlay">
			<video class="width-full height" autoplay :src="url | imageFilter" :muted="isMuted"
				:show-fullscreen-btn="true" object-fit="scale-down" :controls="true" :show-play-btn="true"
				:enable-progress-gesture="true" :poster="url | imageFilter('poster')" @ended="videoEnded"> </video>
		</view>
		<view class="width-full height relative" v-else>
			<image :src="url | imageFilter('poster')" class="width-full height" mode="aspectFill"></image>
			<view class="absolute top left right bottom flex align-items-center flex-center" @click="toPlayVideo">
				<view class="icon_font fs50 color-white">
					&#xe622;
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'video-item',
		data() {
			return {}
		},
		props: {
			url: String,
			isPlay: Boolean,
			isMuted: Boolean,
		},
		mounted() {
			console.log('this.url')
			console.log(this.url)
			console.log('this.url')
		},
		methods: {
			toPlayVideo() {
				this.$emit('toPlayVideo')
			},
			closeVideo() {
				this.$emit("videoEnded")
			},
			videoEnded() {
				console.log('播放完了')
				this.$emit("videoEnded")
			},
		}
	}
</script>

<style lang="scss" scoped>
	.top-15 {
		top: 50rpx;
	}

	.top-20 {
		top: 200rpx;
	}
</style>
