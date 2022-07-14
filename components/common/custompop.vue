<template>
	<view class="fixed top bottom left right" v-if="show" style="z-index: 99999999;">
		<view class="width-full height relative">
			<view class="absolute top bottom right left bg-black opacity60"></view>
			<view class="absolute top bottom right left flex flex-col flex-center" @touchmove.prevent>
				<view class="width-full pl35 pr35 border-box">
					<image src="../../static/base/pop_bg.png" class="width-full" mode="widthFix"></image>
				</view>
				<view class="width-full pl35 pr35 border-box mb35 pb35">
					<view class="width-full relative"  @tap.stop>
						<view class="width-full bg-pop-main flex align-items-center">
							<view class="meinv-left" v-if="meiNv === 1 || meiNv === 2"></view>
							<view class="flex-1 mr15 mr15">
								<view class="width-full fs16 fw600 color-white" :class="meiNv === 3 ? 'text-center' : 'mb10 mt20'">
									{{contentTitle}}
								</view>
								<view class="width-full fs16 color-white lh15 mb20" v-if="isText">
									<rich-text :nodes="contentText"></rich-text>
								</view>
								<view class="mt20 mb20 mr20" v-if="isInput">
									<view class="width-full bg-white br5">
										<u-input v-model="inputValue" placeholder="" class="fs14 color-deep pl10 pr10" type="text" maxlength="11" :border="false" @input="changeInput" />
									</view>
								</view>
							</view>
						</view>
						<view class="width-full pt10 pb10 bg-white pop-btn-box flex align-items-center">
							<view class="flex-1 fs18 pop-btn-item text-center btn-box color-pop-left" @click="cancel">
								{{cancelText}}
							</view>
							<view class="flex-1 b-l-1 fs18 pop-btn-item text-center line-color-1 btn-box color-pop-right" @click="confirm">
								{{confirmText}}
							</view>
						</view>
						<view class="absolute" :class="meiNv === 3 ? 'pop-meinv-1' : 'pop-meinv-2'">
							<image src="../../static/base/pop_1.png" class="width-full" mode="widthFix" v-if="meiNv === 1"></image>
							<image src="../../static/base/pop_2.png" class="width-full" mode="widthFix" v-if="meiNv === 2"></image>
							<image src="../../static/base/pop_3.png" class="width-full" mode="widthFix" v-if="meiNv === 3"></image>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'custom-pop',
		data() {
			return {
				inputValue: ''
			}
		},
		props: {
			showPop: Boolean,
			confirmText: {
				type: String,
				default: ''
			},
			cancelText: {
				type: String,
				default: ''
			},
			contentTitle: {
				type: String,
				default: ''
			},
			contentText: {
				type: String,
				default: ''
			},
			isText: {
				type: Boolean,
				default: false
			},
			isInput: {
				type: Boolean,
				default: false
			},
			meiNv: {
				type: Number,
				default: 1
			}
		},
		computed: {
			show: {
				get () {
					return this.showPop
				},
				set () {}
			}
		},
		mounted() {
			console.log(this.meiNv)
		},
		methods: {
			// 取消
			cancel() {
				if (this.inputValue !== '') {
					this.inputValue = ''
				}
				this.$emit('cancel')
			},
			// 确认
			confirm() {
				if (this.isInput) {
					if (this.inputValue) {
						this.$emit('input', this.inputValue)
					}
				} else {
					this.$emit('confirm')
				}
			},
			// 输入
			changeInput(value) {
				this.inputValue = value
			}
		}
	}
</script>

<style lang="scss" scoped>
	.bg-pop-main{
		background: #69C5FF;
		min-height: 180rpx;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
	}
	.pop-btn-box{
		border-bottom-left-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
	}
	.pop-btn-item{
		height: 60rpx;
		line-height: 60rpx;
	}
	.color-pop-left{
		color: #999999;
	}
	.color-pop-right{
		color: #69C5FF;
	}
	.pop-meinv-1{
		left: 180rpx;
		bottom: 276rpx;
		width: 238rpx;
	}
	.pop-meinv-2{
		left: 24rpx;
		bottom: 88rpx;
		width: 238rpx;
	}
	.meinv-left{
		width: 280rpx;
	}
</style>
