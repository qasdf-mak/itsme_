<template>
	<view class="width-full height100vh lh1 bg-white">
		<expect-page type="page"></expect-page>
		<view v-if="showRedPacket">
			<red-packet></red-packet>
		</view>
	</view>
</template>

<script>
	import expectPage from '../../components/expect/page.vue'
	export default {
		data() {
			return {}
		},
		components: {
			expectPage
		},
		onLoad() {
			this.init()
		},
		methods: {
			init() {
				Object.assign(this.$data, this.$options.data())
				this.loginExpire().then(res => {})
			}
		}
	}
</script>

<style lang="scss" scoped>
	
</style>
