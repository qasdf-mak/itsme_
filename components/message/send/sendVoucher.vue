<template>
	<view class="fixed left right top height100vh popup" style="height: 100vh;" v-if="showVoucher">
		<view class="popup-info bg-white br10 relative">
			<view class="width-full flex flex-right absolute top-40 pr15" @click="closePop">
				<image src="/static/itsme/itsme_35.png" mode="widthFix" class="img-box-1"></image>
			</view>
			<view class="width-full pt15 pb15 fs16 color-black text-center fw600">
				会员券列表
			</view>
			<view class="viewing-area pl15 pr15 over-hid">
				<scroll-view :scroll-y="true">
					<view class="pt5 pl3 pr3 pb25 voucher-box">
						<view :class="index===0 ? '' : 'mt10'" v-for="(item , index) in voucherList" :key="index"
							@click="changeVoucher(index,item)">
							<view class="width-full border-big flex align-items-center br5"
								:class="changeIndex === index ? 'line-itsme-5' :'line-itsme-6'">
								<view class="flex-1 flex flex-center align-items-center color-itsme-2"
									:class="changeIndex === index ? 'color-itsme-2' :'color-itsme-16'">
									<view class="mt12">
										￥
									</view>
									<view class="fs30">
										{{item.money}}
									</view>
								</view>
								<view class="voucher-box-1 flex flex-center align-items-center"
									:class="changeIndex === index ? 'bg-itsme-2' :'bg-itsme-16'">
									会员券
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
			<view class="width-full text-center fs12 color-itsme-9 mt15">
				*对方使用会员券充值后,您可获得佣金
			</view>
			<view class="width-full flex flex-center">
				<view class="presented-btn text-center absolute bottom-60 bg-itsme-2" @click="sendVoucher(selectVoucher.id,selectVoucher.name,selectVoucher.avatar)">
					赠送
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapGetters
	} from 'vuex'
	import CommonService from '../../../common/service/common-service.js'
	export default {
		name: 'send-voucher',
		data() {
			return {
				showVoucher: true,
				changeIndex: 0,
				isSelect: true,
				sendFlag:true,
				selectVoucher: {
					id: 0,
					name: '',
					avatar: ''
				},
				pages: {
					page: 1,
					size: 5,
					finish: false
				},
				voucherList: []
			}
		},
		props: {
			item: Array,
			friend: Object
		},
		computed: {
			...mapGetters(['user'])
		},
		onPullDownRefresh() {
			this.pages.finish = false
			this.pages.page = 1
			this.cardPackList = []
			this.getCardPackList()
		},
		onReachBottom() {
			if (!this.pages.finish) {
				this.pages.page++
				this.getCardPackList()
			}
		},
		mounted() {
			this.getCardPackList()
		},
		methods: {
			//获取卡卷
			getCardPackList() {
				CommonService.userCardPackage({
					state: 3,
					page: this.pages.page,
					limit: 1000
				}).then(res => {
					uni.stopPullDownRefresh()
					if (res.code === 1 && res.data && res.data.length > 0) {
						this.pages.finish = false
						this.voucherList = this.voucherList.concat(res.data.map(item => {
							return item
						}))
					} else {
						this.pages.finish = true
					}
				})
			},
			//关闭弹窗
			closePop() {
				this.$emit('closePop')
			},
			// 选择抵用券
			changeVoucher(index, item) {
				this.isSelect = false
				this.changeIndex = index
				console.log('选择了 ID 为' + item.id + '的抵用券')
				this.selectVoucher.id = item.id
				this.selectVoucher.name = item.nickname
				this.selectVoucher.avatar = item.avatar
				console.log(this.selectVoucher)
			},
			sendVoucher(id, name, avatar) {
				if(this.sendFlag){
					this.sendFlag = false
					if (this.isSelect) {
						id = this.voucherList[0].id
						name = this.voucherList[0].nickname
						avatar = this.voucherList[0].avatar
					}
					CommonService.userSendVoucher({
						to_user_id: this.friend.uuid,
						voucher_id: id
					}).then(res => {
						if (res.code === 1) {
							let params = {
								type: 'voucher',
								voucherID: id,
								voucherName: name,
								voucherAvatar: avatar,
								is_look:false
							}
							this.sendImMessage('voucher', this.friend, params).then(
								(res) => {
									this.content = ""
									this.$emit('sendSuccess', res.data)
								},
								(err) => {
									console.log('发送失败')
									console.log(err)
								}
							)
						}
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.popup {
		background-color: rgba(0, 0, 0, 0.9);
		z-index: 9998;
	}

	.popup-info {
		position: fixed;
		width: 540rpx;
		height: 700rpx;
		top: 48%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 99999999;
	}
	.bottom-60{
		bottom: -120rpx;
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

	.pay-right-box {
		width: 30rpx;
		height: 30rpx;
	}

	.w-82 {
		width: 70%;
	}

	.top-40 {
		top: -60rpx;
	}

	.img-box-1 {
		width: 40rpx;
		height: 40rpx;
	}

	.over-hid {
		overflow: hidden;
	}

	.left-box {
		width: 200rpx;
		height: 30rpx;
	}

	.presented-btn {
		width: 200rpx;
		height: 68rpx;
		line-height: 66rpx;
		background: #D97DB0;
		border-radius: 34rpx;
	}

	.viewing-area {
		height: calc((100vw - 220rpx));
		;
	}

	.voucher-box {
		width: 100%;
		height:800rpx;
	}

	.vip-item-default {
		background: #FFFFFF;
		box-shadow: 0 0 16rpx rgba(0, 0, 0, 0.08);
	}

	.border-big {
		border: 10rpx solid #ccc;
	}

	.voucher-box-1 {
		width: 321rpx;
		height: 125rpx;
		border-radius: 40rpx 0 0 40rpx;
	}
</style>
