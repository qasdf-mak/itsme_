<template>
	<view class="width-full minnavh100vh lh1 bg-main">
		<view v-if="showRedPacket">
			<red-packet></red-packet>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onShow() {
			this.init()
		},
		methods: {
			init() {
				Object.assign(this.$data, this.$options.data())
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>
