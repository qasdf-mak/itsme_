<template>
	<view class="width-full lh1">
		<view class="width-full flex align-items-center flex-center">
			<view class="card-box relative">
				<view v-if="user.gender===1">
					<image src="../../static/my/my_card_1.png" class="card-box" mode="scaleToFill"
						v-if="isCardPackPastDue && index !== 3 && index !== 1"></image>
					<image src="../../static/my/my_card_2.png" class="card-box" mode="scaleToFill" v-else></image>
				</view>
				<view v-else>
					<image src="../../static/my/my_card_1.png" class="card-box" mode="scaleToFill"
						v-if="isCardPackPastDue && index === 1"></image>
					<image src="../../static/my/my_card_2.png" class="card-box" mode="scaleToFill" v-else></image>
				</view>
				<view class="absolute top bottom left right flex">
					<view class="flex-1">
						<view class="width-full flex mt15 align-items-center flex-between">
							<view class="fs9 pt3 pl10 pr10 pb5 br3 color-white ml3"
								:class="hidden ? 'bg-white' : 'bg-2' ">
								<!-- v-if="index === 0" -->
								{{hidden ? "":"可使用"}}
							</view>
							<!-- <view class="fs9 pt3 pl10 pr10 pb5 br3 bg-2 color-white ml3" v-if="index === 1">
								未使用
							</view>
							<view class="fs9 pt3 pl10 pr10 pb5 br3 bg-2 color-white ml3" v-if="index === 2">
								立即分享
							</view>
							<view class="fs9 pt3 pl10 pr10 pb5 br3 bg-d3d1d1 color-white ml3" v-if="index === 3">
								已使用
							</view> -->
							<view class="mr30 fs12 color-deep fw600 "
								v-if="timesTamp <= 86400 && index === 0 && user.gender === 1">
								<u-count-down :timestamp="timesTamp" :show-days="false" v-if="index !== 3">
								</u-count-down>
							</view>
						</view>
						<view class="width-full mt5 flex">
							<view class="flex-1 ml20">
								<view class="width-full flex align-items-end">
									<view class="color-main6 fw600 fs15">
										￥
									</view>
									<view class="color-main6 fw600 fs20">
										{{item.money}}
									</view>
									<view class="color-deep fw600 fs10">
										会员充值抵用会员券
									</view>
								</view>
								<view class="width-full flex align-items-start mt15 lh15 fs9 color-999999">
									<view class="fw600">
										说明：
									</view>
									<view class="flex-1 nowrap2">
										此抵用币可充值会员享受折扣；24小时为使用将自动退回；
									</view>
								</view>
							</view>
							<view class="card-cent-right">
								<view class="width-full flex" v-if="user.gender === 1">
									<view class="card-cent-avatar" @click="goHome(item)">
										<image :src="item.avatar | imageFilter('m11')" class="card-cent-avatar"
											mode="aspectFill" v-if="index !== 2"></image>
									</view>
									<view class="flex-1 ml5 fs9 color-666666">
										<view class="mt15" v-if="index !== 2">
											{{index === 1 ? '领取人:':'赠送人:'}}
										</view>
										<view class="mt5 width-full nowrap1" v-if="index !== 2">
											{{item.nickname}}
										</view>
									</view>
								</view>
								<view class="width-full flex" v-else>
									<view class="card-cent-avatar" @click="goHome(item)">
										<image :src="item.avatar | imageFilter('m11')" class="card-cent-avatar"
											mode="aspectFill" v-if="index !== 1"></image>
									</view>
									<view class="flex-1 ml5 fs9 color-666666">
										<view class="mt15" v-if="index !== 1 && item.nickname">
											领取人
										</view>
										<view class="mt5 width-full nowrap1" v-if="index !== 1">
											{{item.nickname}}
										</view>
									</view>
								</view>
								<view class="width-full fs9 color-main6 fw600 mt15 nowrap1">
									有效期：{{item.overtime | dateFilter(8, '.')}}
								</view>
							</view>
						</view>
					</view>
					<view class="card-right-box flex align-items-center flex-center" @click="goPages(index,item.id)">
						<view class="fs13 color-white lh15 fw600"
							v-if="isCardPackPastDue && index !== 3 && index !== 1 && index !== 2 && user.gender === 1">
							立<br />即<br />使<br />用
						</view>
						<view class="fs13 color-white lh15 fw600" v-if="isCardPackPastDue === false">
							已<br />过<br />期<br />
						</view>
						<view class="fs13 color-white lh15 fw600" v-if="index===3">
							已<br />使<br />用<br />
						</view>
						<view class="fs13 color-white lh15 fw600" v-if="user.gender === 1 && index == 1">
							已<br />分<br />享<br />
						</view>
						<view class="fs13 color-white lh15 fw600" v-if="user.gender === 0 && index == 0">
							已<br />分<br />享<br />
						</view>
						<view class="fs13 color-white lh15 fw600" v-if="user.gender === 1 && index == 2 ">
							立<br />即<br />分<br />享
						</view>
						<view class="fs13 color-white lh15 fw600"
							v-if="user.gender === 0 && index == 1 && isCardPackPastDue">
							立<br />即<br />分<br />享
						</view>
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		name: 'mycard-pack',
		props: {
			item: Object,
			index: Number,
			first: Number
		},
		computed: {
			// 判断 卡卷 是否到期
			isCardPackPastDue() {
				let untreatedTime = Date.parse(new Date());
				let newTime = untreatedTime.toString().substring(0, untreatedTime.toString().length - 3)
				if (this.item && this.item.overtime > newTime) {
					return true
				} else {
					return false
				}
			},
			timesTamp() {
				let untreatedTime = Date.parse(new Date());
				let newTime = untreatedTime.toString().substring(0, untreatedTime.toString().length - 3)
				if (this.item && this.item.overtime - parseInt(newTime)) {
					return this.item.overtime - parseInt(newTime)
				}
			},
		},
		mounted() {
			console.log(this.item)
			console.log(this.index)
		},
		data() {
			return {
				hidden: true
			}
		},
		methods: {
			goHome(item) {
				console.log(item)
				if (item.uid === this.user.id) {
					console.log('自己点自己')
				} else {
					if (item.gender === this.user.gender) {
						uni.showToast({
							title: '同性不可聊天'
						})
					} else {
						this.toOpenChat('cardpack', item.v_uid)
					}
				}
			},
			goPages(index, id) {
				if (this.user.gender === 1) {
					if (index === 0) {
						if (this.user.gender === 1) {
							this.toJumpPage(1, '/pages/my/member/index')
						}
					}
					if (index === 2) {
						this.toJumpPage(1, '/pages/my/share')
					}
				} else {
					if (index === 1) {
						this.toJumpPage(4, '/pages/message/index')
					}
				}
			}
		},
	}
</script>

<style lang="scss" scoped>
	.card-box {
		width: 725rpx;
		height: 248rpx;
	}

	.card-right-box {
		width: 138rpx;
		height: 248rpx;
	}

	.card-cent-right {
		width: 220rpx;
	}

	.card-cent-avatar {
		width: 80rpx;
		height: 80rpx;
		border-radius: 80rpx;
		overflow: hidden;
	}

	.bg-d3d1d1 {
		background: #D3D1D1;
	}
</style>
