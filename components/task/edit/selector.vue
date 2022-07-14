<template>
	<view class="width-full lh1">
		<view class="flex align-items-center mb10 pt15">
			<view class="task-dian"></view>
			<view class="fs16 color-deep ml5">{{title}}</view>
		</view>
		<view class="width-full border-box task-input-box flex align-items-center" @click="toShowPicker">
			<view class="flex-1 flex align-items-center">
				<view class="fs16 color-deep ml18">
					{{changename}}
				</view>
			</view>
			<view class="icon_font fs20 ml15 mr15">
				&#xe61f;
			</view>
		</view>
		<view class="width-full" v-if="showPicker">
			<custom-picker
				:title="title"
				:type="type"
				:list="rangelist"
				:default="changeid"
				@confirm="confirmPicker"
				@cancel="cancelPicker"
			></custom-picker>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'task-select',
		data() {
			return {
				showPicker: false
			}
		},
		props: {
			rangelist: Array,
			changeid: String,
			changename: String,
			title: String,
			type: String
		},
		methods: {
			toShowPicker() {
				this.showPicker = true
			},
			// Picker 确定
			confirmPicker(id, name) {
				this.showPicker = false
				this.$emit('confirmPicker', this.title, id, name)
			},
			// Picker 关闭
			cancelPicker() {
				this.showPicker = false
			}
		}
	}
</script>

<style lang="scss" scoped>
	.task-dian{
		width: 10rpx;
		height: 10rpx;
		background: #F3CEB0;
		border-radius: 10rpx;
	}
	.task-input-box{
		height: 80rpx;
		border: 2rpx solid #CCCCCC;
	}
</style>
