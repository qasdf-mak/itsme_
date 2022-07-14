<template>
	<view class="width-full lh1">
		<u-popup
			v-model="show"
			mode="bottom"
			safe-area-inset-bottom
			border-radius="20"
			z-index="9999999"
			negative-top="100"
			@close="closePop"
		>
			<view class="width-full lable-box bg-white">
				<expect-list type="pop" @setSuccess="closePop" @refreshTheList="refreshTheList"></expect-list>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import expectList from '../expect/list.vue'
	export default {
		name: 'set-lable',
		props: {
			showLable: Boolean
		},
		components: {
			expectList
		},
		computed: {
			show: {
				get () {
					return this.showLable
				},
				set () { }
			}
		},
		methods: {
			closePop() {
				this.$emit('closePop')
			},
			refreshTheList(){
				this.$emit('refreshTheList')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.lable-box{
		height: 60vh;
	}
</style>
