<template>
	<view class="width-full bg-white lh1 height100vh">
		<custom-nav :title="navTitle" showBack></custom-nav>
		<view class="width-full border-box pt20 pb20 pl20 pr20 lh18 color-deep fs15">
			<view v-if="type === 'protocol'">
				用户协议
			</view>
			<view v-if="type === 'policy'">
				隐私协议
			</view>
		</view>
		<red-packet></red-packet>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type: 'protocol',
				navTitle: '用户协议'
			}
		},
		onLoad() {
			this.init()
		},
		computed:{
		},
		methods: {
			init() {
				Object.assign(this.$data, this.$options.data())
				if (this.platform === 'H5') {
					this.type = this.$mp.query.type
				} else {
					this.type = this.$options.pageQuery.type
				}
				if (this.type === 'protocol') {
					this.navTitle = '用户协议'
				}
				if (this.type === 'policy') {
					this.navTitle = '隐私政策'
				}
				uni.setNavigationBarTitle({
				　　title: this.navTitle
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	
</style>
