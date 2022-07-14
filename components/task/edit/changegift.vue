<template>
	<view class="width-full lh1">
		<u-popup
			v-model="showGift"
			mode="bottom"
			border-radius="20"
			@close="closeGift"
		>
			<view class="width-full bg-white pt20">
				<view class="width-full gift-swiper-box">
					<swiper
						class="width-full height"
						indicator-dots
						indicator-color="#eeeeee"
						indicator-active-color="#F2B27F"
						:autoplay="false"
					>
							<swiper-item v-for="(item, index) in giftList" :key="index">
									<view class="gift-swiper-item flex flex-wrap pl15 border-box ">
										<view class="mt8" v-for="(gift, gindex) in item" :key="gindex">
											<view
												class="gift-box mr15 flex flex-col align-items-center flex-center"
												:class="(changeList.indexOf(gift.id) !== -1) ? 'check' : ''"
												@click="changeGift(gift)"
											>
												<image :src="gift.icon | imageFilter('m11')" class="gift-img" mode="widthFix"></image>
												<view class="width-full fs14 text-center nowrap1 color-deep fw600 mt8">
													{{gift.name || ''}}
												</view>
												<view class="flex align-items-center mt5">
													<view class="fs14 color-deep">
														{{gift.price}}
													</view>
													<image src="../../../static/base/gold.png" class="gold-img ml5" mode="widthFix"></image>
												</view>
											</view>
										</view>
									</view>
							</swiper-item>
					</swiper>
				</view>
				<view class="ml20 mr20 mt10 pb15 flex align-items-center flex-between">
					<view class="fs15 color-deep">
						价值：{{giftTotal}}M豆
					</view>
					<view class="flex align-items-center" @click="giftDetermine">
						<view class="gift-btn bg-2 color-white fs15 text-center btn-box ml10">
							确定
						</view>
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import CommonService from '../../../common/service/common-service.js'
	export default {
		name: 'change-gift',
		data() {
			return {
				giftList: [],
				showGift: true,
				tabCurrent: 0,
				giftData: null,
				changeList: [],
				changeData: [],
				giftNum: 1,
				payType: 'balance',
				imService : null
			}
		},
		computed: {
			giftTotal () {
				if (this.giftData) {
					return (Number(this.giftData.price) * this.giftNum).toFixed(0)
				} else {
					return 0
				}
			}
		},
		mounted() {
			this.getGiftList()
		},
		methods: {
			closeGift() {
				this.$emit('closeGift')
			},
			getGiftList() {
				CommonService.configgift({
					type: 1
				}).then(res => {
					if (res.code === 1) {
						for(var i=0; i<res.data.length; i+=8){
						    this.giftList.push(res.data.slice(i,i+8))
						}
					}
				})
			},
			changeTab(index) {
				this.tabCurrent = index
			},
			changeGift(item) {
				if (this.changeList && this.changeList.length > 0) {
					let index = this.changeList.indexOf(item.id)
					if (this.changeList.indexOf(item.id) !== -1) {
						this.changeList.splice(this.changeList.indexOf(item.id), 1)
						this.changeData = this.changeData.filter(arr => {
							return arr.id !== item.id
						})
					} else {
						this.changeList.push(item.id)
						this.changeData.push(item)
					}
				} else {
					this.changeList.push(item.id)
					this.changeData.push(item)
				}
			},
			giftDetermine() {
				this.$emit('changeSuccess', this.changeData)
				this.showGift = false
			}
		}
	}
</script>

<style lang="scss" scoped>
	.tab-box{
		width: 250rpx;
	}
	.gold-img{
		width: 34rpx;
	}
	.pay-img{
		width: 30rpx;
		height: 30rpx;
	}
	.gift-swiper-box{
		height: 450rpx;
	}
	.gift-btn{
		width: 145rpx;
		height: 62rpx;
		line-height: 62rpx;
		border-radius: 62rpx;
		border: 2rpx solid #F2B27F;
	}
	.gift-swiper-item{
		width: 100vw;
		height: 400rpx;
		padding: 10rpx 0;
	}
	.gift-box{
		width: calc((100vw - 150rpx) / 4);
		height: 195rpx;
		margin-bottom: 5rpx;
	}
	.gift-box.check{
		border-radius: 10rpx;
		box-shadow: 0 5rpx 18rpx rgba(0, 0, 0, 0.10);
	}
	.gift-img{
		width: 110rpx;
	}
	.pay-btn{
		height: 90rpx;
		line-height: 90rpx;
		border-radius: 90rpx;
	}
</style>
