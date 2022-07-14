<template>
	<view class="width-full lh1">
		<view class="width-full mt25">
			<view class="flex align-items-center mb10">
				<view class="task-dian"></view>
				<view class="fs16 color-deep ml5">期望对方所在地</view>
			</view>
			<view class="width-full border-box task-input-box flex align-items-center"  @click="addressPickerShow = true">
				<view class="flex-1 flex align-items-center">
					<view class="fs16 color-deep ml18" v-if="cname">
						{{pname}} - {{cname}}
					</view>
				</view>
				<view class="icon_font fs20 ml15 mr15">
					&#xe61f;
				</view>
			</view>
		</view>
		<!-- 地址筛选器 -->
		<view v-if="addressPickerShow">
			<address-picker :addressPickerShow="addressPickerShow" :addressid="addressData" @confirmAddress="confirmAddress" @cancelAddress="addressPickerShow = false"></address-picker>
		</view>
	</view>
</template>

<script>
	import addressPicker from '../../common/addresspicker.vue'
	export default {
		name: 'task-address',
		data() {
			return {
				addressPickerShow: false
			}
		},
		props: {
			pname: String | Number,
			pid: String | Number,
			cid: String | Number,
			cname: String | Number
		},
		computed: {
			addressData () {
				return {
					pid: this.pid,
					cid: this.cid
				}
			}
		},
		components: {
			addressPicker
		},
		methods: {
			// 确认地址
			confirmAddress(pname, cname, pid, cid) {
				this.$emit('confirmAddress', pname, cname, pid, cid)
				this.addressPickerShow = false
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
