<template>
<view class="width-full height relative lh1">
	<video
		id="myVideo"
		class="width-full height"
		autoplay
		:src="url | imageFilter"
		:show-fullscreen-btn="false"
		object-fit="cover"
		:controls="false"
		:show-play-btn="false"
		:enable-progress-gesture="false"
		:poster="url | imageFilter('poster')"
		@play="videoPlay"
		@pause="videoPause"
		@ended="videoEnded"
	></video>
</view>
</template>

<script>
	export default {
		name: 'video-item',
		data() {
			return {
				isPlaying: false
			}
		},
		props: {
			url: String
		},
		methods: {
			videoPlay() {
				this.isPlaying = true
			},
			videoPause() {
				this.isPlaying = false
			},
			videoEnded() {
				this.isPlaying = false
				this.$emit("closeVideo")
			}
		}
	}
</script>

<style lang="scss" scoped>
	
</style>
