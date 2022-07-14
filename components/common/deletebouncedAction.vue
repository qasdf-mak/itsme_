<template>
	<view v-if="show">
		<view class="fixed left right top popup br10 pb10" style="height: 100vh;">
			<view class="mr15 ml15 absolute bottom15 popup-info pt20">
				<view class="flex" v-if="isLife">
					<view class="width-btn flex flex-center flex-col" @click="shareLife">
						<view class="color-black flex flex-center">
							<view class="flex flex-center circle icon_font color-black fs28 text-center">
								&#xe66d;
							</view>
						</view>
						<view class="color-black flex flex-center mt8">
							分享
						</view>
					</view>
					<view class="width-btn flex flex-center flex-col" @click="deleteLift">
						<view class="color-black flex flex-center">
							<view class="flex flex-center circle icon_font color-black fs22 text-center">
								&#xe686;
							</view>
						</view>
						<view class="color-black flex flex-center mt8">
							删除
						</view>
					</view>
				</view>
				<view class="flex" v-else>
					<view class="width-btn flex flex-center flex-col" @click="addPhoto">
						<view class="color-black flex flex-center">
							<view class="flex flex-center circle icon_font color-black fs24 text-center">
								&#xe62c;
							</view>
						</view>
						<view class="color-black flex flex-center mt8">
							发布相册
						</view>
					</view>
					<view class="width-btn flex flex-center flex-col" @click="deletePop">
						<view class="color-black flex flex-center">
							<view class="flex flex-center circle icon_font color-black fs22 text-center">
								&#xe686;
							</view>
						</view>
						<view class="color-black flex flex-center mt8">
							删除
						</view>
					</view>
				</view>
				<view class="width-full line mt15"> </view>
				<view class="width-full color-black fs18 text-center mt20" @click="closePop">
					取消
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'deletebounced-action',
		props: {
			showDeletePop: Boolean,
			isLife:Boolean
		},
		data() {
			return {

			}
		},
		computed: {
			show: {
				get() {
					return this.showDeletePop
				},
				set() {}
			},
		},
		methods: {
			closePop() {
				this.$emit('closePop')
			},
			shareLife(){
				this.$emit('shareLife')
			},
			deleteLift(){
				this.$emit('deleteLift')
			},
			addPhoto(){
				this.$emit('closePop')
				this.$emit('addPhoto')
			},
			deletePop(){
				this.$emit('closePop')
				this.$emit('deletePhoto')
			}
		},
	}
</script>

<style lang="scss" scoped>
	.popup {
		background-color: rgba(0, 0, 0, 0.6);
		z-index: 999998;
	}

	.popup-info {
		width: 686rpx;
		height: 330rpx;
		background: #FFFFFF;
		border-radius: 20rpx;
	}

	.circle {
		width: 90rpx;
		height: 90rpx;
		line-height: 90rpx;
		background: #F1EFEF;
		border-radius: 50%;
	}

	.line {
		height: 14rpx;
		background: #F1EFEF;
	}

	.width-btn {
		width: calc((100vw - 80rpx) / 4);
	}
</style>
