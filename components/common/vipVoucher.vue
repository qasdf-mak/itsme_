<template>
	<view class="width-full lh1">
		<u-popup v-model="show" mode="center" width="90%" height="900" border-radius="20" :mask-close-able="false" :closeable="false" z-index="9999">
			<view class="pl15 pr15 pt15">
				<view class="w-82 color-black fixed flex text-center flex-center bg-fafafa  pb20 text-center fs18 fw600">
					<view class="flex-1">
						可用会员券
					</view>
					<view class="ml10 mr10 absolute right-10 icon_font fs16 color-FFE6F4" @click="closeVoucherPop">
						&#xe635;
					</view>
				</view>
				<view class="mt25 pb10"> </view>
				<view class="" z-index="99999">
					<scroll-view :scroll-y="true">
						<view class="pt5 pb35 voucher-box" v-if="list && list.length >= 1">
							<view class="flex mt15 pl5 pr5 mb10 " v-for="(value,index) in list" :key="index"
								@click="chooseRedPacket(index,value)">
								<view class="width-full card-box-vip-no-hidden pb15 pt10">
									<view class="small-box  color-white fs10 text-center relative left-5">
										抵用金额
									</view>
									<view class="flex align-items-center">
										<view class="fs12 fw600 color-main6 ml18 mr25">
											￥<text class="fs24 fw600 color-main6">{{value.money}}</text>
										</view>
										<view class="flex flex-1 voucher-info-box ml35 ">
												<view class="flex ">
													<image :src="value.avatar | imageFilter('m11')" class="img-vip" mode="">
													</image>
												</view>
												<view class="ml5 flex w-50 flex-col flex-right">
													<view class="fs10 color-999999">
														赠送人 :
													</view>
													<view class="fs10 mt8 color-999999 nowrap1">
														{{value.nickname}}
													</view>
												</view>
										</view>
										<view class="fs20 ml35 mr15">
											<view class="icon_font fs20 color-main6"
												v-if="isRedPacketId && Number(isRedPacketId) === Number(value.id)">
												&#xe64d;
											</view>
											<view class="icon_font color-999999 fs20 " v-else>
												&#xe63f;
											</view>
										</view>
									</view>
								</view>
								<view class="pb15"> </view>
							</view>
						    <view class="pt30 pb20">   </view>
						</view>
						<view class="width-full p15 text-center fs20" v-else>
							<view>
								<empty-tip type="redPack"></empty-tip>
							</view>
						</view>
					</scroll-view>
				</view>
			</view>
			
		</u-popup>
		<u-toast ref="uToast" z-index='999999999' />
	</view>
</template>

<script>
	import {
		mapGetters
	} from 'vuex'
	export default {
		name: 'item-voucher',
		data() {
			return {
				
			}
		},
		props: {
			showVoucher: Boolean,
			list: Array,
			isRedPacketId: String | Number,
			isOneDayVip: Boolean
		},
		computed: {
			...mapGetters(['user']),
			show: {
				get() {
					return this.showVoucher
				},
				set() {}
			},
		},
		mounted() {
			
		},
		methods: {
			closeVoucherPop(){
				this.$emit('closeVoucherPop')
			},
			chooseRedPacket(index, value) {
				console.log(123456)
				if (this.isOneDayVip) {
					this.$refs.uToast.show({
						title: '购买一天会员不可使用会员券'
					})
				} else {
					this.$emit('chooseRedPacket', value)
					this.closeVoucherPop()
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.pay-right-box {
		width: 30rpx;
		height: 30rpx;
	}
	.right-10{
		right: -60rpx;
	}

	.card-box-vip-no-hidden {
		background: #FFFFFF;
		box-shadow: 0px 0px 16rpx 0px rgba(135, 78, 110, 0.2);
		border-radius: 10rpx;
	}

	.w-82 {
		width: calc(100vw - 180rpx);
	}

	.small-box {
		width: 128rpx;
		height: 34rpx;
		line-height: 35rpx;
		background: #D97DB0;
		border-radius: 4rpx;
	}

	.left-5 {
		left: -20rpx;
	}

	// .over-hid {
	// 	overflow: hidden;
	// }

	.left-box {
		width: 200rpx;
		height: 30rpx;
	}

	.presented_btn {
		width: 200rpx;
		border-radius: 20rpx;
	}

	.btn_or_box_radius {
		border-radius: 20rpx;
	}

	.voucher-box {
		width: 100%;
		height: 700rpx;
	}
	.voucher-info-box {
		width: 200rpx;
	}

	.m-auto {
		margin: 0 auto;
	}

	.img-vip {
		width: 67rpx;
		height: 67rpx;
		border-radius: 50%;
	}


	.vip-item-default {
		background: #FFFFFF;
		box-shadow: 0 0 16rpx rgba(0, 0, 0, 0.08);
	}
</style>
