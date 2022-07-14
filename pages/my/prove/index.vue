<template>
	<view class="width-full lh1">
		<view class="fixed top left right">
			<view class="width-full" :style="'height:' + StatusBar + 'px;'"></view>
			<view class="back-box flex align-items-center flex-center" @click="goBack">
				<view class="icon_font fs18" :class="proveType === 'false' ? 'color-white' : 'color-deep'">
					&#xe638;
				</view>
			</view>
		</view>
		<!-- 未认证 -->
		<view class="width-full height100vh prove-box flex flex-col flex-center" v-if="proveType === 'false'">
			<view class="width-full flex flex-col align-items-center flex-center mb30">
				<view class="prove-top">
					<image src="../../../static/prove/prove_1.png" class="width-full" mode="widthFix"></image>
				</view>
				<view class="color-white fs20 fw600 mt30">
					女神认证
				</view>
				<view class="fs15 color-white lh15 mt15 pt3 ml35 mr35 pl8 pr8" style="text-indent: 60rpx;">
					女神认证指基于真人认证的标准，颜值较高的女士。通过认证后，可设置会员照片，并且拥有女神专属标志。
				</view>
			</view>
			<view class="ml30 mr30 flex align-items-center flex-between mt30">
				<view class="prove-bot relative float-hidden" @click="toNavigateTo('/pages/my/prove/occupation')">
					<image src="../../../static/prove/prove_2.png" class="prove-bot" mode="widthFix"></image>
					<view class="absolute bottom15 left12 right12">
						<view class="width-full mb3 prove-bot-btn color-white text-center">
							去认证职业
						</view>
					</view>
				</view>
				<view class="prove-bot relative float-hidden" @click="toNavigateTo('/pages/my/prove/figure?type=figure')">
					<image src="../../../static/prove/prove_3.png" class="prove-bot" mode="widthFix"></image>
					<view class="absolute bottom15 left12 right12">
						<view class="width-full mb3 prove-bot-btn color-white text-center">
							去认证身材
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 未认证 -->
		<!-- 认证中 -->
		<view class="width-full lh1 minnavh100vh flex flex-col flex-center align-items-center" v-if="proveType === 'audit'">
			<image src="../../../static/prove/prove_4.png" class="examine-img" mode="widthFix"></image>
			<view class="fs15 color-deep mt30 mb12 fw600">
				您提交的认证正在审核中，请耐心等待
			</view>
			<view class="color-main6 fs15 fw600" style="margin-bottom: 30vh;">
				联系客服
			</view>
		</view>
		<!-- 认证中 -->
		<!-- 已认证 -->
		<view class="width-full height100vh flex flex-col flex-center" v-if="proveType === 'true'">
			<view class="width-full flex flex-col align-items-center flex-center mb30">
				<view class="prove-top">
					<image src="../../../static/prove/prove_1.png" class="width-full" mode="widthFix"></image>
				</view>
				<view class="color-deep fs20 fw600 mt30">
					女神认证
				</view>
				<view class="fs15 color-deep lh15 mt15 pt3 ml35 mr35 pl8 pr8" style="text-indent: 60rpx;">
					恭喜您，您的女神认证已通过认证
				</view>
			</view>
			<view class="ml30 mr30">
				<view class="width-full color-middle fs15 mb10">
					通过时间：2021.02.17
				</view>
				<view class="width-full color-middle fs15 mb10">
					认证类型：{{proveName}}
				</view>
				<view class="width-full color-middle fs15 mb15">
					认证照片：
				</view>
				<view class="width-full flex flex-wrap photo-item-box">
					<view v-for="(item,index) in photolist" :key="index">
						<image
							:src="item.img | imageFilter('m11')"
							class="photo-item br5 float-hidden mb10"
							:class="(index + 1) % 3 === 0 ? '' : 'mr10'"
							@click="previewImage(index)"
							mode="aspectFill"
						></image>
					</view>
				</view>
			</view>
		</view>
		<custom-pop
			:showPop="showPop"
			confirmText="真人认证"
			cancelText="取消"
			contentTitle="温馨提示:"
			contentText="请先通过真人认证"
			isText
			:meiNv="2"
			@confirm="popConfirm"
			@cancel="popCancel"
		></custom-pop>
		<!-- 已认证 -->
		<view v-if="showRedPacket">
			<red-packet></red-packet>
		</view>
	</view>
</template>

<script>
	import { mapGetters } from 'vuex'
	import { formatImage } from '../../../common/utils/common-methods.js'
	import UserService from '../../../common/service/user-service.js'
	export default {
		data() {
			return {
				showPop: false,
				proveType: '',
				proveName: '',
				photolist: null
			}
		},
		computed: {
			...mapGetters(['user']),
			isReal() {
				if (this.user && this.user.certify) {
					let certify = JSON.parse(this.user.certify)
					if (certify.real && certify.real.verified) {
						return true
					} else {
						return false
					}
				} else {
					return false
				}
			}
		},
		onShow() {
			this.init()
		},
		methods:{
			init() {
				Object.assign(this.$data, this.$options.data())
				this.getGoddessStatus()
				setTimeout(() => {
					if (!this.isReal) {
						this.showPop = true
					}
				}, 200)
			},
			goBack() {
				uni.switchTab({
					url: '/pages/my/index'
				})
			},
			getGoddessStatus() {
				UserService.usercertifyinfoget({
					code: 'goddess'
				}).then(res => {
					if (res.code ===1) {
						if (res.data.code === 0) {
							this.proveType = 'false'
						} else {
							this.proveType = res.data.data.state
							this.proveName = res.data.data.name
							this.photolist = res.data.data.photo_list
						}
					}
				})
			},
			// 页面跳转
			toNavigateTo(url) {
				uni.navigateTo({
					url: url
				})
			},
			// 图片放大
			previewImage(index) {
				let images = this.photolist.map(item => {
					return formatImage(item.img)
				})
				uni.previewImage({
					current: index,
					urls: images,
					longPressActions: {
						itemList: [''],
						success: function(data) {
								console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
						},
						fail: function(err) {
								console.log(err.errMsg);
						}
					}
				})
			},
			popConfirm() {
				uni.navigateTo({
					url: '/pages/my/face'
				})
				this.showPop = false
			},
			popCancel() {
				this.showPop = false
				uni.navigateBack({
					delta: 1
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.prove-box{
		background: linear-gradient(to bottom, #FFB7D3, #FF95A8);
	}
	.prove-top{
		width: 220rpx;
	}
	.prove-bot{
		width: 290rpx;
		height: 400rpx;
	}
	.prove-bot-btn{
		height: 62rpx;
		line-height: 62rpx;
		border-radius: 62rpx;
		background: linear-gradient(to bottom, #FF748D, #FF7DAF);
	}
	.examine-img{
		width: 280rpx;
	}
	.photo-item{
		width: calc((100vw - 160rpx) / 3);
		height: calc((100vw - 160rpx) / 3);
	}
	.photo-item-box{
		min-height: calc((100vw - 160rpx) / 3 * 2);;
	}
	.back-box{
		width: 88rpx;
		height: 88rpx;
	}
</style>
