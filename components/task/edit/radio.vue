<template>
	<view class="width-full lh1">
		<view class="width-full mt25 flex align-items-center flex-between">
			<view class="flex align-items-center">
				<view class="task-dian" v-if="isDian"></view>
				<view class="fs16 color-deep ml5" v-if="type === 'worth'">身价要求</view>
				<view class="fs16 color-deep ml5" v-if="type === 'age'">年龄要求</view>
				<view class="fs16 color-deep ml5" v-if="type === 'others'">是否允许带他人</view> 
				<view class="fs14 color-itsme-10" v-if="type === 'industries'">是否从事过相关行业</view>
				<view class="fs14 color-itsme-10" v-if="type === 'platform'">是否参加过其他平台</view>
			</view>
			<view class="flex align-items-center flex-right">
				<view class="flex align-items-center flex-right" @click="changeRadio(1)">
					<image src="../../../static/base/check_1.png" class="photo-bot-img" mode="widthFix" v-if="show === 1"></image>
					<image src="../../../static/base/check_2.png" class="photo-bot-img" mode="widthFix" v-else></image>
					<view class="task-check-box fs14 color-itsme-10 ml8 ">
						{{type === 'others' ? '允许' : '有'}}
					</view>
				</view>
				<view class="flex align-items-center ml20" @click="changeRadio(0)">
					<image src="../../../static/base/check_1.png" class="photo-bot-img" mode="widthFix" v-if="show === 0"></image>
					<image src="../../../static/base/check_2.png" class="photo-bot-img" mode="widthFix" v-else></image>
					<view class="task-check-box fs14 color-itsme-10 ml8">
						{{type === 'others' ? '不允许' : '无'}}
					</view>
				</view>
			</view>
		</view>
		<view class="mt20 ml10 flex align-items-center flex-between" v-if="false">
			<view class="fs16 color-999999" v-if="type === 'worth'">
				选择身价范围
			</view>
			<view class="fs16 color-999999" v-if="type === 'age'">
				选择年龄范围
			</view>
			<view class="fs16 color-999999" v-if="type === 'others'">
				随行人数
			</view>
			<view class="flex align-items-center" v-if="type === 'others'">
				<view class="num-box text-center fs15 color-deep" @click="changeNum('min')">
					{{min}}
				</view>
			</view>
			<view class="flex align-items-center" v-else>
				<view class="num-box text-center fs15 color-deep" @click="changeNum('min')">
					{{min}}
				</view>
				<view class="num-line"></view>
				<view class="num-box text-center fs15 color-deep" @click="changeNum('max')">
					{{max}}
				</view>
			</view>
		</view>
		<u-picker
			v-model="showPicker"
			mode="selector"
			safe-area-inset-bottom
			:mask-close-able="false"
			:range="rangelist"
			:default-selector="[defaultSelector]"
			@confirm="confirmPicker"
			@cancel="cancelPicker"
		></u-picker>
	</view>
</template>

<script>
	export default {
		name: 'task-radio',
		data() {
			return {
				pickerType: '',
				showPicker: false,
				rangelist: [],
				defaultSelector: -1
			}
		},
		props: {
			type: String,
			show: Number,
			min: Number,
			max: Number,
			num: Number,
			isDian:Boolean
		},
		methods: {
			changeRadio(value) {
				this.$emit('changeRadio', this.type, value)
			},
			changeNum(type) {
				this.pickerType = type
				let minNum = 0
				let maxNum = 0
				if (type === 'min') {
					if (this.type === 'worth') {
						minNum = 50
					}
					if (this.type === 'age') {
						minNum = 18
					}
					if (this.type === 'others') {
						minNum = 1
					}
					maxNum = this.max
				}
				if (type === 'max') {
					if (this.type === 'worth') {
						maxNum = 5000
					}
					if (this.type === 'age') {
						maxNum = 60
					}
					if (this.type === 'others') {
						maxNum = 10
					}
					minNum = this.min
				}
				if (this.type === 'worth') {
					for (let i = minNum; i <= maxNum; i+=50) {
						this.rangelist.push(i)
					}
				} else {
					for (let i = minNum; i <= maxNum; i++) {
						this.rangelist.push(i)
					}
				}
				if (type === 'min') {
					this.defaultSelector = this.rangelist.indexOf(this.min)
				} else {
					this.defaultSelector = this.rangelist.indexOf(this.max)
				}
				this.showPicker = true
			},
			confirmPicker(value) {
				let index = value[0]
				this.$emit('changeRadioNum', this.type, this.pickerType, this.rangelist[index])
				this.showPicker = false
				this.rangelist = []
			},
			cancelPicker() {
				
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
	.photo-bot-img{
		width: 30rpx;
	}
	.task-check-box{
		width: 60rpx;
	}
	.num-box{
		width: 142rpx;
		height: 80rpx;
		line-height: 80rpx;
		border: 2rpx solid #DDDDDD;
	}
	.num-line{
		width: 34rpx;
		height: 2rpx;
		margin: 0 13rpx;
		background: #CCCCCC;
	}
</style>
