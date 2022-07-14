<template>
	<view class="width-full height100vh lh1 bg-white">
		<view class="width-full">
			<!-- 顶部 -->
			<view class="fixed top left right" v-if="isSticky">
				<view class="width-full bg-white" :style="'height:' + StatusBar + 'px;'"></view>
				<view class="width-full fs16 color-deep bg-white fw600 text-center my-head-box">
					{{user && user.nickname || ''}}
				</view>
			</view>
			<!-- 顶部 -->
			<!-- top -->
			<view class="width-full my-top-box relative flex align-items-center">
				<view class="flex-1 ml30 mt20">
					<view class="user-avatar ml10">
						<image :src="user && user.avatar | imageFilter('m11')" class="user-avatar" mode="widthFix">
						</image>
					</view>
					<view class="pl8 mt15 width-full border-box pr30">
						<view class="width-full nowrap1 fs18 color-white fw600">
							{{user && user.nickname || ''}}
						</view>
						<view class="width-full mt8 fs13 color-my-1" @click="toShowPerfectPop()">
							编辑资料>
						</view>
					</view>
				</view>
				<view class="flex-1 ml15 mr15 mt20">
					<view class="width-full flex">
						<view class="mt15 br5 my-top-num flex align-items-center pl10 pr12">
							<image src="../../static/base/base_6.png" class="zs" mode="widthFix"></image>
							<view class="pl5 fs25 fw600 color-black">
								{{user && user.worth || 0}}
							</view>
						</view>
					</view>
					<view class="width-full my-lable-box">
						<view class="width-full mt25 flex align-items-center">
							<view v-if="userInfo && userInfo.gender === 1">
								<view class="my-lable-item" v-if="userInfo.is_vip === 1">
									<image src="../../static/my/certify_vip_1.png" class="width-full" mode="widthFix">
									</image>
								</view>
								<view class="my-lable-item" v-else>
									<image src="../../static/my/certify_vip_2.png" class="width-full" mode="widthFix">
									</image>
								</view>
							</view>
							<view v-if="userInfo && userInfo.gender === 0">
								<!-- <view class="my-lable-item"
									v-if="userInfo && userInfo.certifyData && userInfo.certifyData.goddess && userInfo.certifyData.goddess.verified === 'true'">
									<image src="../../static/my/certify_ns_1.png" class="width-full" mode="widthFix">
									</image>
								</view>
								<view class="my-lable-item" v-else>
									<image src="../../static/my/certify_ns_2.png" class="width-full" mode="widthFix">
									</image>
								</view> -->
							</view>
							<view class="my-lable-item ml10"
								v-if="userInfo && userInfo.certifyData && userInfo.certifyData.real && userInfo.certifyData.real.verified === 'true'">
								<image src="../../static/my/certify_real_1.png" class="width-full" mode="widthFix">
								</image>
							</view>
							<view class="my-lable-item ml10" v-else>
								<image src="../../static/my/certify_real_2.png" class="width-full" mode="widthFix">
								</image>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- top -->
			<view class="width-full mt20 pt20 mb12">
				<view class="ml30 mr30 flex align-items-center flex-between">
					<view class="flex-1 flex align-items-center flex-center" @click="toPayPage(2)">
						<view class="my-nav-box flex flex-col align-items-center flex-center">
							<image src="../../static/my/my_19.png" class="my-nav-img" mode="widthFix"></image>
							<view class="width-full fs15 color-deep text-center fw600 mt20">
								钱包
							</view>
						</view>
					</view>
					<view class="flex-1 flex align-items-center flex-center" @click="toPayPage(4)"
						v-if="platform === 'android' || (platform === 'ios' && commonInfo && !commonInfo.check)">
						<view class="my-nav-box flex flex-col align-items-center flex-center">
							<view class="icon_font fs30 color-main6">
								&#xe669;
							</view>
							<view class="width-full fs15 color-deep text-center fw600 mt20">
								佣金
							</view>
						</view>
					</view>
					<view class="flex-1 flex align-items-center flex-center" @click="toPayPage(1)">
						<view class="my-nav-box flex flex-col align-items-center flex-center">
							<image src="../../static/my/my_18.png" class="my-nav-img" mode="widthFix"></image>
							<view class="width-full fs15 color-deep text-center fw600 mt20">
								喜欢
							</view>
						</view>
					</view>
					<view class="flex-1 flex align-items-center flex-center" @click="toPayPage(3)">
						<view class="my-nav-box flex flex-col align-items-center flex-center">
							<image src="../../static/my/my_20.png" class="my-nav-img" mode="widthFix"></image>
							<view class="width-full fs15 color-deep text-center fw600 mt20">
								足迹
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="width-full mt15">
				<!-- 测试连接 -->
				<!-- 	<view class="width-full flex align-items-center" @click="toNavigateTo('/pages/index/test')">
					<view class="icon_font ml15 mr10 fs20 my-cell-left">
						&#xe67e;
					</view>
					<view class="flex-1 my-cell mr15 flex align-items-center flex-between">
						<view class="fs15 color-deep">
							测试使用连接
						</view>
					</view>
				</view> -->
				<!-- 会员券 -->
			<!-- 	<view class="width-full flex align-items-center" v-if="userInfo && userInfo.gender === 0"
					@click="toNavigateTo('./newgift')">
					<view class="icon_font ml15 mr10 fs20 my-cell-left">
						&#xe67e;
					</view>
					<view class="flex-1 my-cell mr15 flex align-items-center flex-between">
						<view class="fs15 color-deep">
							新手会员券
						</view>
					</view>
				</view> -->
				<!-- 我的身价 -->
				<view class="width-full flex align-items-center" @click="toNavigateTo('/pages/my/worthlist')">
					<view class="icon_font ml15 mr10 fs20 my-cell-left">
						&#xe67e;
					</view>
					<view class="flex-1 my-cell mr15 flex align-items-center flex-between">
						<view class="fs15 color-deep">
							我的身价
						</view>
						<view class="fs14 color-shallow">
							去提升
						</view>
					</view>
				</view>
				<!-- 女神认证 -->
				<!-- <view class="width-full flex align-items-center" @click="toNavigateTo('/pages/my/prove/index')"
					v-if="userInfo && userInfo.gender === 0">
					<view class="icon_font ml15 mr10 fs20 my-cell-left">
						&#xe67e;
					</view>
					<view class="flex-1 my-cell mr15 flex align-items-center flex-between">
						<view class="fs15 color-deep">
							女神认证（可获得女神礼包）
						</view>
						<view class="fs14 color-shallow">
							{{nvshenProve}}
						</view>
					</view>
				</view> -->
				<!-- 会员 -->
				<view class="width-full flex align-items-center" @click="toNavigateTo('/pages/my/member/index')"
					v-if="userInfo && userInfo.gender === 1">
					<view class="icon_font ml15 mr10 fs20 my-cell-left">
						&#xe6bb;
					</view>
					<view class="flex-1 my-cell mr15 flex align-items-center flex-between">
						<view class="fs15 color-deep">
							会员
						</view>
						<view class="fs14 color-my-2" v-if="isVipExpire">
							到期时间：{{user.user_vip.end_time | dateFilter(2, '-')}}
						</view>
						<view class="fs14 color-my-2" v-else>
							升级会员尊享特权
						</view>
					</view>
				</view>
				<!-- 我的动态 -->
				<view class="width-full flex align-items-center" @click="toNavigateTo('/pages/meet/mylist')">
					<view class="icon_font ml15 mr10 fs20 my-cell-left">
						&#xe602;
					</view>
					<view class="flex-1 my-cell mr15 flex align-items-center flex-between">
						<view class="fs15 color-deep">
							我的动态
						</view>
					</view>
				</view>
				<!-- 我的邀约 -->
				<!-- 	<view class="width-full flex align-items-center" @click="toNavigateTo('/pages/task/my')">
					<view class="icon_font ml15 mr10 fs20 my-cell-left">
						&#xe606;
					</view>
					<view class="flex-1 my-cell mr15 flex align-items-center flex-between">
						<view class="fs15 color-deep">
							我的Me约
						</view>
					</view>
				</view> -->
				<!-- 我的相册 -->
				<view class="width-full flex align-items-center">
					<view class="icon_font ml15 mr10 fs20 my-cell-left">
						&#xe606;
					</view>
					<view class="flex-1 my-cell mr15 flex align-items-center flex-between" style="border-bottom: none;"
						@click="toNavigateTo('/pages/my/myphoto')">
						<view class="fs15 color-deep">
							我的相册
						</view>
						<view class="flex align-items-center">
							<view class="fs12 color-shallow mb3 ">
								{{user && user.user_photo_count}}张
							</view>
							<view class="icon_font fs15 ml5 color-shallow">
								&#xe60f;
							</view>
						</view>
					</view>
				</view>

				<view class="width-full pb20" v-if="user && user.user_photo && user.user_photo.length > 0"
					@click="toNavigateTo('/pages/my/myphoto')">
					<scroll-view scroll-x="true" class="width-full pl15 border-box">
						<view class="flex">
							<view v-for="(item, index) in user.user_photo" :key="index" class="mr10">
								<photo-item :item="item"></photo-item>
							</view>
						</view>
					</scroll-view>
				</view>
				<view class="width-full bg-main pt10"></view>
				<!-- 设置 -->
				<view class="width-full flex align-items-center" @click="toNavigateTo('/pages/my/setup')">
					<view class="icon_font ml15 mr10 fs20 my-cell-left">
						&#xe60a;
					</view>
					<view class="flex-1 my-cell mr15 flex align-items-center flex-between" style="border-bottom: none;">
						<view class="fs15 color-deep">
							设置
						</view>
					</view>
				</view>
				<view class="width-full bg-main pt10"></view>
				<!-- 分享《是我啊 (it’s me)》 -->
				<view class="width-full flex align-items-center" @click="toShare(user.invite_code)">
					<view class="icon_font ml15 mr10 fs20 my-cell-left">
						&#xe608;
					</view>
					<view class="flex-1 my-cell mr15 flex align-items-center flex-between">
						<view class="fs15 color-deep">
							分享《Itsme是我》可获得奖励
						</view>
					</view>
				</view>
				<!-- 分享《是我啊 (it’s me)》 -->
				<view class="width-full flex align-items-center" v-if="isReal">
					<view class="icon_font ml15 mr10 fs20 my-cell-left">
						&#xe6d1;
					</view>
					<view class="flex-1 my-cell mr15 flex align-items-center flex-between" style="border-bottom: none;"
						@click="copycentent('id')">
						<view class="fs15 color-deep">
							邀请码:{{user && user.invite_code}}
						</view>
						<view class="fs14 color-shallow">
							复制
						</view>
					</view>
				</view>
				<view class="width-full bg-main pt10"></view>
				<!-- 联系客服 -->
				<view class="width-full flex align-items-center" @click="servicePop">
					<view class="icon_font ml15 mr10 fs20 my-cell-left">
						&#xe6d1;
					</view>
					<view class="flex-1 my-cell mr15 flex align-items-center flex-between" style="border-bottom: none;">
						<view class="fs15 color-deep">
							联系客服
						</view>
					</view>
				</view>
				<view class="width-full bg-main pt10"></view>
				<view class="width-full text-center fs15 color-deep pt15 pb15">
					版本号 {{version}}
				</view>
				<view class="width-full bg-main pt10"></view>
				<view class="width-full mt35 pt35 pb25"></view>
			</view>
		</view>
		<!-- 完善资料 -->
		<view class="width-full" v-if="showPerfectPop">
			<perfect-pop @closePerfectPop="toHidePerfectPop">
			</perfect-pop>
		</view>
		<!-- 权限弹窗 -->
		<unify-pop :showUnify="showUnifyPop" :type="unifyType" @clonePop="copycentent('wx')">
		</unify-pop>
		<!-- 权限弹窗 -->
		<view v-if="showRedPacket">
			<red-packet></red-packet>
		</view>
	</view>
</template>

<script>
	import {
		mapGetters,
		mapActions
	} from 'vuex'
	import photoItem from '../../components/photo/item.vue'
	import uniCopy from '../../js_sdk/xb-copy/uni-copy.js'
	import commonService from '../../common/service/common-service.js'
	export default {
		data() {
			return {
				isSticky: false,
				isMy: 0,
				platform: ''
			}
		},
		onLoad() {
			this.init()
		},
		onPullDownRefresh() {
			uni.stopPullDownRefresh()
		},
		onPageScroll({
			scrollTop
		}) {
			this.setSticky(scrollTop)
		},
		computed: {
			...mapGetters(['user', 'version', 'IfTheRefresh']),
			userInfo() {
				let userInfo = null
				if (this.user) {
					userInfo = this.user
					if (userInfo && userInfo.certify) {
						userInfo.certifyData = JSON.parse(userInfo.certify)
					}
				}
				return userInfo
			},
			isReal() {
				if (this.user && this.user.gender === 0) {
					if (this.user.certify && JSON.parse(this.user.certify).real && JSON.parse(this.user.certify).real
						.verified) {
						return true
					} else {
						return false
					}
				} else {
					return true
				}
			},
			// 判断 VIP 是否到期
			isVipExpire() {
				let untreatedTime = Date.parse(new Date());
				let newTime = untreatedTime.toString().substring(0, untreatedTime.toString().length - 3)
				console.log(this.user.user_vip.end_time > newTime)
				if (this.user && this.user.user_vip && this.user.user_vip.end_time > newTime) {
					return true
				}
			},
			nvshenProve() {
				if (this.user && this.user.certify) {
					let certify = JSON.parse(this.user.certify)
					if (certify && certify.goddess) {
						if (certify.goddess.verified === 'true') {
							return '已认证'
						}
						if (certify.goddess.verified === 'audit') {
							return '认证中'
						}
						if (certify.goddess.verified === 'false') {
							return '去认证'
						}
					} else {
						return '去认证'
					}
					return '去认证'
				} else {
					return '去认证'
				}
			}
		},
		onShow() {
			if (this.IfTheRefresh) {
				this.init()
			}
		},
		components: {
			photoItem
		},
		methods: {
			...mapActions(['IFTHE_REFRESH']),
			init() {
				Object.assign(this.$data, this.$options.data())
				this.platform = uni.getSystemInfoSync().platform
				this.loginExpire().then(res => {})
				console.log('this.user')
				console.log(this.user)
				console.log('this.user')
			},
			toNav(url) {
				uni.navigateTo({
					url: url
				})
			},
			// 页面滚动，监听头部事件
			setSticky(scrollTop) {
				if (scrollTop < uni.upx2px(620)) {
					this.isSticky = false
				} else {
					this.isSticky = true
				}
			},
			// 页面跳转
			toNavigateTo(url) {
				uni.navigateTo({
					url: url
				})
			},
			// 复制ID号
			copycentent(type) {
				uniCopy({
					content: type === 'id' ? this.user.invite_code : 'saaw1221',
					success: (res) => {
						uni.showToast({
							title: '复制成功',
							icon: 'none'
						})
						this.showUnifyPop = false
					},
					error: (e) => {
						uni.showToast({
							title: e,
							icon: 'none',
							duration: 3000,
						})
					}
				})
			},

			// 客服小姐姐
			servicePop() {
				this.unifyType = 18
				this.showUnifyPop = true
			},
			toShare() {
				uni.navigateTo({
					url: '/pages/my/share?id=' + this.user.invite_code,
				});
			},
			toPayPage(index) {
				if (this.isReal || this.user.gender === 1) {
					if (index === 1) {
						this.toNavigateTo('/pages/my/record?type=like')
					}
					if (index === 2) {
						this.toNavigateTo('/pages/my/wallet')
					}
					if (index === 3) {
						this.toNavigateTo('/pages/my/record?type=foot')
					}
					if (index === 4) {
						uni.navigateTo({
							url: '/pages/my/commission'
						})
					}
				} else {
					this.toShowPerfectPop()
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.my-top-box {
		height: 495rpx;
		border-bottom-left-radius: 40rpx;
		border-bottom-right-radius: 40rpx;
		background: linear-gradient(to bottom, #E785B3, #F38DC6);
	}

	.user-avatar {
		width: 150rpx;
		height: 150rpx;
		border-radius: 150rpx;
		overflow: hidden;
	}

	.color-my-1 {
		color: #FFF8E1;
	}

	.color-my-2 {
		color: #B1A554;
	}

	.my-top-num {
		height: 100rpx;
		width: 240rpx;
		background: rgba(250, 250, 250, 0.7);

		.zs {
			width: 40rpx;
		}

		.num {
			background-image: linear-gradient(to bottom, #FFCC00, #F48630);
			-webkit-background-clip: text;
			/*必需加前缀 -webkit- 才支持这个text值 */
			-webkit-text-fill-color: transparent;
			/*text-fill-color会覆盖color所定义的字体颜色： */
		}
	}

	.my-lable-box {
		height: 100rpx;
	}

	.my-lable-item {
		width: 40rpx;
	}

	.my-nav-box {
		width: 104rpx;
	}

	.my-nav-img {
		width: 62rpx;
	}

	.my-cell {
		height: 108rpx;
		border-bottom: 1rpx solid #EEEEEE;
	}

	.my-cell-left {
		color: #D97DB0;
	}

	.my-head-box {
		height: 100rpx;
		line-height: 100rpx;
	}

	.index-mask {
		position: relative;
		filter: blur(40rpx);
		user-select: none;
	}

	.index-mask::after {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		content: '';
		display: block;
		background: rgba(255, 253, 253, 0.5);
	}
</style>
