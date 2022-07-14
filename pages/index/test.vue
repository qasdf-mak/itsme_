<template>
	<view>
<button type="default" @click="phoneLogin">phoneLogin</button>
	</view>
</template>

<script>
	import {
		phoneLogin
	} from '../../common/appjs/login.js'
	export default {
		data() {
			return {

			}
		},
		onLoad() {
			this.init()
		},
		methods: {
			init() {
				Object.assign(this.$data, this.$options.data())
				this.phoneLogin()
			},
			phoneLogin() {
				phoneLogin().then(
					res => {
						console.log(res)
					},
					rej => {
						console.log('一键授权失败')
					}
				)
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>
