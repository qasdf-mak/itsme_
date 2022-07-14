<template>
	<view class="width-full lh1">
		<u-popup v-model="show" mode="center" safe-area-inset-bottom border-radius="20" z-index="9999999"
			negative-top="100" @close="closePop()">
			<view class="unify-pop-box p20">
				<view class="ml10 mr10  fs15 color-000 text-center">真人认证步骤 </view>
				<view class="ml10 mr10 mt8 mb25 fs12 color-000 text-center">未通过真人认证平台即将限流 </view>
				<view v-for="(item , index) in stepList" :key="index">
					<view class="flex align-items-center width-full">
						<view class="real-yuan text-center "> {{item.whichStep}} </view>
						<view class="flex-1  ml12"> {{item.centent}}</view>
						<view class="complete-btn text-center flex-right" v-if="item.is_pass === 2"
							@click="wanToGo(index)">去完成</view>
						<view class="pass-btn flex-right flex" v-if="item.is_pass === 1">
							<view class="text-center flex-right icon_font fs18 color-green mt2 mr5"> &#xe632;</view>
							<view class="text-center fs13">已完成</view>
						</view>
						<view class="pass-btn flex-right flex text-center" v-if="item.is_pass === 3">
							<view class="color-999999">未完成</view>
						</view>
					</view>
					<view class="real-line ml7" v-if="index !== 3">
					</view>
				</view>
				<view class="width-full flex mt25">
					<view class="real-btn color-eeeeee fs15 text-center fw600" :class="stop_is_pass ? '' : 'opacity60'"
						@click="toFace">
						真人认证
					</view>
				</view>
				<view class="text-real text-center mt8">
					完善个人信息,提高匹配度
				</view>
			</view>
			<!-- 选择标签弹框 -->
			<set-lable :showLable="showLablePop" @closePop="showLablePop = false"></set-lable>
			<!-- 选择标签弹框 -->
		</u-popup>
	</view>
</template>

<script>
	import commonService from '../../common/service/common-service.js'
	import setLable from './setlable.vue'
	/* *  资料弹窗
	 * type 
	 * 1 -----  选择想要遇见的人
	 * 2 -----  标记个人标签
	 * 3 -----  填写个人资料
	 * 4 -----  真人认证
	 * */
	export default {
		name: 'information-pop',
		data() {
			return {
				stepList: [{
						whichStep: 1,
						centent: '选择想要遇见的人',
						is_pass: Number,
					},
					{
						whichStep: 2,
						centent: '标记个人标签',
						is_pass: Number,
					},
					{
						whichStep: 3,
						centent: '填写个人资料',
						is_pass: Number,
					},
					{
						whichStep: 4,
						centent: '真人认证',
						is_pass: 3,
					}
				],
				stop_is_pass: Boolean,
				showLablePop: false,
				isEsc:false,
				isMy:0
			}
		},
		watch: {
			user () {
				this.getCheckexpectanduserInfo()
			},
			showLablePop(){
				this.getCheckexpectanduserInfo()
			}
		},
		props: {
			showUnify: Boolean,
			type: Number,
			isLogin: Boolean
		},
		components: {
			setLable
		},
		mounted() {
			this.getCheckexpectanduserInfo()
		},
		computed: {
			show: {
				get() {
					return this.showUnify
				},
				set() {}
			},
		},
		methods: {
			closePop() {
				this.$emit('closePop')
			},
			// 去真人认证
			toFace() {
				if (this.stop_is_pass) {
					uni.navigateTo({
						url: '/pages/my/face'
					})
				}else{
					uni.showToast({
						title:'请先通过以上步骤',
						icon:'none'
					})
					
				}
			},
			getCheckexpectanduserInfo() {
				// if(islogin){
					commonService.checkexpectanduserinfo().then(res => {
						if (res.code === 1) {
							if (res.data.user_expect) {
								this.stepList[0].is_pass = 1
								this.stepList[1].is_pass = 1
							} else {
								this.stepList[0].is_pass = 2
								this.stepList[1].is_pass = 2
							}
							if (res.data.user_info) {
								this.stepList[2].is_pass = 1
							} else {
								this.stepList[2].is_pass = 2
							}
							if (res.data.user_expect && res.data.user_info) {
								this.stop_is_pass = true
								this.stepList[3].is_pass = 2
							} else {
								this.stop_is_pass = false
							}
						}
					})
				// }
			},
			wanToGo(index) {
				if (index === 0 || index === 1) {
					this.showLablePop = true
				}
				if(index === 2){
					uni.navigateTo({
						url: '/pages/my/profile?isMypass' + this.isMy
					})
				}
				if (index === 3) {
					uni.navigateTo({
						url: '/pages/my/face'
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.unify-pop-box {
		width: 600rpx;
	}

	.unify-cent {
		min-height: 100rpx;
		line-height: 50rpx;
	}

	.unify-btn-box {
		height: 98rpx;
		line-height: 97rpx;
	}

	.color-000 {
		color: #000;
		font-family: PingFang SC;
		font-weight: bold;
	}

	.real-btn {
		width: 490rpx;
		height: 70rpx;
		line-height: 70rpx;
		margin: 0 auto;
		background: #F2B27F;
		box-shadow: 0rpx 0rpx 16rpx 0rpx rgba(0, 0, 0, 0.08);
		border-radius: 35rpx;
	}

	.real-yuan {
		width: 30rpx;
		height: 30rpx;
		color: #FFFFFF;
		line-height: 30rpx;
		background: #F2B27F;
		border-radius: 50%;
	}

	.pass-btn {
		width: 128rpx;
		height: 46rpx;
		color: #333333;
		line-height: 46rpx;
	}

	.complete-btn {
		width: 128rpx;
		height: 46rpx;
		color: #FFFFFF;
		line-height: 46rpx;
		background: #F2B27F;
		border-radius: 23rpx;
	}

	.real-line {
		width: 6rpx;
		height: 70rpx;
		background: #F2B27F;
		border-radius: 3rpx;
	}

	.ml7 {
		margin-left: 14rpx;
	}

	.color-green {
		color: #9CD69F;
	}

	.text-real {
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #999999;
	}
</style>
