<template>
	<view class="width-full lh1">
		<u-popup v-model="show" mode="center" width="524"  safe-area-inset-bottom border-radius="20" z-index="99999999999"
			negative-top="100" @close="closePop" :mask-close-able="isMaskCloseAble">
			<view class="width-full fs20 fw600 text-center color-black mt25">
				提示
			</view>
			<view class="pl15 pr15">
				<view class="width-full flex flex-center mr10 pt10 unify-cent">
					<view class="icon_font color-yellow">
						&#xe67d;
					</view>
					<view class="flex fs12 color-deep text-center" v-html="unifyCent"> </view>
				</view>
				<!-- 女性真人认证 -->
				<view class="width-full flex flex-between mt20 pb25"
					v-if="type ===1">
					<view class="btn-box color-white text-center fw600 ml20" @click="closePop">
						再改改
					</view>
					<view class="btn-box bg-itsme-2 fs15 color-white br25 text-center fw600 mr20" @click="popConfirm">
						确定
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	/* *  新版统一弹框
	 * type 
	 * 1 -----  女性非真人提示去真人认证
	 * */
	export default {
		name: 'unify-pop',
		props: {
			showUnify: Boolean,
			type: Number,
			centent: '',
			isMaskCloseAble: true,
		},
		data() {
			return {}
		},
		computed: {
			show: {
				get() {
					return this.showUnify
				},
				set() {}
			},
			unifyCent() {
				if (this.type === 1) {
					return this.centent
				}
			}
		},
		methods: {
			closePop() {
				this.$emit('closePop')
			},
			//性别确认弹框
			popConfirm() {
				this.$emit('popConfirm')
			},
		}
	}
</script>

<style lang="scss" scoped>
	.unify-cent {
		min-height: 100rpx;
		line-height: 50rpx;
	}

	.btn-box {
		width: 160rpx;
		height: 48rpx;
		line-height: 46rpx;
		border-radius: 40rpx;
		background: #E0DEDF;
	}

	.color-yellow {
		color: #FABD02;
	}
</style>
