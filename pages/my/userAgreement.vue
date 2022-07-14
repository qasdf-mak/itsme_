<template>
	<view class="u-content p20">
		<u-parse :html="data"></u-parse>
		<view v-if="showRedPacket">
			<red-packet></red-packet>
		</view> 
	</view>
</template>

<script>
	import UserService from '../../common/service/user-service.js'
	export default {
		data() {
			return {

				data: '',
			}
		},
		onLoad() {
			this.getuseragreement()
		},
		methods: {
			// 获取用户协议
			getuseragreement() {
				UserService.useragreement().then(res => {
					if (res.code === 1) {
						console.log(res)
						console.log(res.msg)
						this.data = res.data;
						this.time = res.time;
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
</style>
