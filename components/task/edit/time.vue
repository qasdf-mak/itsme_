<template>
	<view class="width-full lh1">
		<view class="flex align-items-center mb10 mt15">
			<view class="task-dian"></view>
			<view class="fs16 color-deep ml5">时间</view>
		</view>
		<view class="width-full flex align-items-center">
			<view class="flex-1 border-box task-input-box flex align-items-center" @click="changeTime('start')">
				<view class="flex-1 fs12  pl10" :class="startTime ? 'color-black' : 'color-shallow'">
					{{startTime ? startTime : '选择起始时间'}}
				</view>
				<view class="icon_font fs18 ml5 mr10">
					&#xe61f;
				</view>
			</view>
			<view class="flex-1 border-box task-input-box flex align-items-center ml10" @click="changeTime('end')">
				<view class="flex-1 fs12  pl10" :class="endTime ? 'color-black' : 'color-shallow'">
					{{endTime ? endTime : '选择结束时间'}}
				</view>
				<view class="icon_font fs18 ml5 mr10" >
					&#xe61f;
				</view>
			</view>
		</view>
		<!-- 时间选择器 -->
		<yu-datetime-picker
			:isAll="false"
			ref="dateTime"
			@confirm="timeConfirm"
		></yu-datetime-picker>
	</view>
</template>

<script>
	import { formatDate } from '../../../common/utils/common-methods.js'
	import yuDatetimePicker from "../../yu-datetime-picker/yu-datetime-picker.vue"
	export default {
		name: 'task-time',
		data() {
			return {
				dateType: ''
			}
		},
		props: {
			start: Number,
			end: Number
		},
		components: {
			yuDatetimePicker
		},
		computed: {
			startTime() {
				if (this.start) {
					return formatDate(this.start)
				} else {
					return ''
				}
			},
			endTime() {
				if (this.end) {
					return formatDate(this.end)
				} else {
					return ''
				}
			}
		},
		methods: {
			// 选择时间
			changeTime(type) {
				this.dateType = type
				this.$refs.dateTime.show()
			},
			// 确认时间
			timeConfirm(date) {
				let selectRes = date.selectRes
				console.log(selectRes.replace(/-/g, '/'))
				this.$emit('changeTime', this.dateType, new Date(selectRes.replace(/-/g, '/')).getTime() / 1000)
			},
			onSelected(e) {//选择
					this.showPicker = false;
					if(e) {
							this[this.type] = e.value; 
							//选择的值
							console.log('value => '+ e.value);
							//原始的Date对象
							console.log('date => ' + e.date);
					}
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
