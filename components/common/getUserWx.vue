<template>
	<view class="fixed left right top height100vh popup"
		:class="showMemberPay === true ? 'z_index_small' : 'z_index_big'" v-if="">
		<view class="popup-info">
			<image src="/static/itsme/itsme_57.png" class="w-100 relative img-pop" mode="widthFix"> </image>
			<view class="absolute top bottom left right lh14">
				<view class="w-100 flex flex-1 flex-center mt10">
					<view class="img-avatar img-box">
						<image :src="item.avatar | imageFilter" mode="widthFix" class="img-avatar"></image>
					</view>
				</view>
				<view class="w-100 flex flex-1 flex-center mt8">
					<view class="fs18 fw600 color-black">
						{{item.nickname}}
					</view>
				</view>
				<view class="w-100 flex flex-1 flex-center align-items-center"
					v-if="judgmentAuthority !== 1 && judgmentAuthority !== 3 && judgmentAuthority !== 5">
					<view class="icon_font fs16 color-06CA64 mr6">
						&#xe648;
					</view>
					<view class="fs10 color-363636">
						{{userWx.wxCode}}
					</view>
				</view>
				<view class="w-100 flex flex-1 flex-center mt5"
					v-if="judgmentAuthority !== 1 && judgmentAuthority !== 3 && judgmentAuthority !== 5 ">
					<view class="fs10 color-a3a3a3">
						为保护女生不被骚扰，需要消耗M豆解锁
					</view>
				</view>
				<view class="w-100 flex flex-1 flex-center mt5"
					v-if="judgmentAuthority === 1 || judgmentAuthority === 3 || judgmentAuthority === 5" @click.stop="toRecordingWx">
					<image src="/static/itsme/itsme_60.png" class="image-success" mode="widthFix"></image>
				</view>
				<view class="w-100 flex flex-1 flex-center mt30"
					v-if="judgmentAuthority === 1 || judgmentAuthority === 3 || judgmentAuthority === 5">
					<image src="/static/itsme/itsme_61.png" mode="widthFix" class="image-success-1"></image>
				</view>
				<view class="w-100 flex flex-1 flex-center align-items-center mt15"
					v-if="judgmentAuthority === 1 || judgmentAuthority === 3 || judgmentAuthority === 5">
					<view class="icon_font fs20 color-06CA64 mr6">
						&#xe648;
					</view>
					<view class="fs15 fw600 color-black">
						{{userWx.wxCode}}
					</view>
				</view>
				<view class="w-100 flex flex-1 flex-center mt5 lh18 text-center"
					v-if="judgmentAuthority === 1 || judgmentAuthority === 3 || judgmentAuthority === 5">
					<view class="fs10 color-a3a3a3">
						解锁微信只展示24小时<br>
						添加时备注“是我啊APP”会加速通过哟
					</view>
				</view>
				<view class="w-100 flex flex-1 flex-center pt20"
					v-if="judgmentAuthority === 1 || judgmentAuthority === 3 || judgmentAuthority === 5">
					<view class="recharge-btn-on-vip fs12 bg-FFD0EA color-itsme-2 text-center br20 mr15"
						@click.stop="closeWxPop">
						解锁其他
					</view>
					<view class="recharge-btn-on-vip fs12 bg-itsme-2 color-white text-center br20"
						@click.stop="cloneCode">
						复制微信号
					</view>
				</view>
				<view class="w-100 flex flex-1 flex-center " :class="judgmentAuthority === 2 ? 'mt35' : 'mt35 mb35'"
					v-if="judgmentAuthority !== 1 && judgmentAuthority !== 3 && judgmentAuthority !== 5">
					<image src="/static/itsme/itsme_58.png" mode="widthFix" class="is-vip-img"
						v-if="judgmentAuthority === 2 "></image>
					<image src="/static/itsme/itsme_59.png" mode="widthFix" class="is-vip-img"
						v-if="judgmentAuthority === 4 "></image>
					<image src="/static/itsme/itsme_78.png" mode="widthFix" class="is-vip-img"
						v-if="judgmentAuthority ===  6"></image>
				</view>
				<view class="w-100 flex flex-1 flex-center mt8" v-if="judgmentAuthority === 2 ">
					<view class="fs16 fw600 fontf color-itsme-2">
						原需{{userWx.originaPrice}}M豆解锁
					</view>
				</view>
				<view class="w-100 flex flex-1 flex-center mt25" v-if="judgmentAuthority === 2 ">
					<view class="recharge-btn bg-itsme-2 br20 text-center fs12 pl10" @click.stop="unlockWx">
						{{userWx.price}}M豆可解锁（9折）
					</view>
				</view>
				<view class="w-100 flex flex-1 flex-center pt15" v-if="judgmentAuthority === 4 ">
					<view class="recharge-btn-on-vip fs12 bg-FFD0EA color-itsme-2 text-center br20 mr15"
						@click.stop="showMemberPay = true">
						立即开通VIP
					</view>
					<view class="recharge-btn-on-vip fs12 bg-itsme-2 color-white text-center br20"
						@click.stop="unlockWx">
						{{userWx.originaPrice}}M豆解锁
					</view>
				</view>
				<view class="w-100 flex flex-1 flex-center pt15" v-if="judgmentAuthority === 6 ">
					<view class="recharge-btn-on-vip fs12 bg-itsme-2 color-white text-center br20"
						@click.stop="unlockWx">
						{{userWx.originaPrice}}M豆解锁
					</view>
				</view>
				<view class="w-100 flex flex-1 flex-center mt8 opacity60">
					<view class="fs10 color-black">
						*每日使用M豆最高可解锁N次微信
					</view>
				</view>
			</view>
			<image src="/static/base/close.png" class="close-box relative popup-btn" mode="widthFix"
				@click.stop="closeWxPop">
		</view>
		<!-- 充值VIP弹框 -->
		<view v-if="showMemberPay">
			<member-pay :showMemberPay="showMemberPay" @closeVipPop="showMemberPay = false"
				@closePop="showMemberPay = false" @paySuccess="showMemberPay = false">
			</member-pay>
		</view>
		<!-- 充值VIP弹框 -->
		<!-- 权限弹窗 -->
		<unify-pop :showUnify="showUnifyPop" :type="unifyType" @closePop="showUnifyPop = false" @rechargeM="goWallet">
		</unify-pop>
		<!-- 权限弹窗 -->
		<view >
			<red-packet></red-packet>
		</view>
	</view>
</template>

<script>
	import UserService from '../../common/service/user-service.js'
	//复制
	import uniCopy from '../../js_sdk/xb-copy/uni-copy.js'
	export default {
		name: 'get-user-wx',
		data() {
			return {
				showMemberPay: false,
				showUnifyPop: false,
				userWx: {
					wxCode: '',
					originaPrice: '',
					price: ''
				},
				isLook: false
			}
		},
		watch: {

		},
		props: {
			showWxPop: Boolean,
			item: Object,
		},
		computed: {
			judgmentAuthority() { // 1 = 是会员并且有查看权限 / 2 = 是会员不可查看 / 3 = 不是会员可查看 / 4 = 不是会员不可查看 /5 = 女性可以查看 / 6 = 女性不可以查看
				if (this.user.gender === 1) {
					if (this.user.is_vip === 1) {
						if (this.isLook) {
							return 1
						} else {
							return 2
						}
					} else {
						if (this.isLook) {
							return 3
						} else {
							return 4
						}
					}
				} else {
					if (this.isLook) {
						return 5
					} else {
						return 6
					}
				}
			}
		},
		mounted() {
			this.getUserWx()
		},
		methods: {
			//获取对方微信号
			getUserWx() {
				console.log(this.item)
				let u_id = this.item.user_id ? this.item.user_id : this.item.id
				UserService.checkWx({
					to_user_id: u_id
				}).then((res) => {
					console.log(res)
					if (res.code === 0) { // 没有微信号
						console.log('没有微信')
					}
					if (res.code === 1) { // 有微信号，并且可以查看
						this.showWx = true
						this.userWx.wxCode = res.data.wx
						this.isLook = true
					}
					if (res.code === 2) { // 有微信号，但是不能查看
						this.showWx = true
						this.userWx.wxCode = res.data.wx
						this.userWx.originaPrice = res.data.origina_price
						this.userWx.price = res.data.price
					}
					console.log(this.userWx)
				})
			},
			//购买微信
			unlockWx() {
				let u_id = this.item.user_id ? this.item.user_id : this.item.id
				UserService.BuyUserWx({
					to_user_id: u_id
				}).then(res => {
					if (res.code === 2) {
						this.showUnifyPop = true
						this.unifyType = 29
					}
					if (res.code === 1) {
						this.isLook = true
						this.getUserWx()
					}
				})
			},
			goWallet() {
				this.showUnifyPop = false
				this.toJumpPage(1, '/pages/my/wallet')
			},
			//复制微信
			cloneCode() {
				uniCopy({
					content: this.userWx.wxCode,
					success: (res) => {
						uni.showToast({
							title: '复制成功',
							icon: 'none'
						})
						this.closeWxPop()
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
			closeWxPop() {
				this.$emit('closeWxPop')
			},
			toRecordingWx() {
				this.closeWxPop()
				this.toJumpPage(1, '/pages/my/recordingWx')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.popup {
		background-color: rgba(0, 0, 0, 0.4);
		z-index: 9998;
	}

	.popup-info {
		position: fixed;
		width: 516rpx;
		height: 766rpx;
		top: 48%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.z_index_big {
		z-index: 999999;
	}

	.z_index_small {
		z-index: 999;
	}

	.popup-btn {
		position: fixed;
		width: 287rpx;
		height: 70rpx;
		top: 8%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 9999;
	}

	.fontf {
		font-family: PingFang SC;
	}

	.img-pop {
		width: 516rpx;
		height: 766rpx;
	}

	.is-vip-img {
		width: 403rpx;
		height: 113rpx;
	}

	.w-100 {
		width: 100%;
	}

	.color-06CA64 {
		color: #06CA64;
	}

	.color-363636 {
		color: #363636;
	}

	.color-a3a3a3 {
		color: #a3a3a3;
	}

	.bg-FFD0EA {
		background-color: #FFD0EA;
	}

	.img-box {
		box-shadow: 0rpx 8rpx 8rpx rgba(82, 82, 82, 0.31);
		border-radius: 50%;
	}

	.close-box {
		width: 40rpx;
		height: 40rpx;
	}

	.img-avatar {
		width: 160rpx;
		height: 160rpx !important;
		border-radius: 50%;
	}

	.recharge-btn {
		width: 320rpx;
		height: 60rpx;
		line-height: 60rpx;
	}

	.recharge-btn-on-vip {
		width: 180rpx;
		height: 60rpx;
		line-height: 60rpx;
	}

	.image-success {
		width: 281rpx;
		height: 32rpx;
	}

	.image-success-1 {
		width: 357rpx;
		height: 53rpx;
	}
</style>
