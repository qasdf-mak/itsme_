<template>
	<u-popup v-model="showVoucher" mode="center" @close="closePop" width="90%" height="1000" border-radius="20"
		z-index="999999999">
		<view class="pl15  pr15 pt15 pb15">
			<view class="w-82 fixed  bg-fafafa color-black pb20 text-center fs18 fw600">
				会员券列表
			</view>
			<view class="mt35 pb10"> </view>
			<view class="over-hid color-black">
				<scroll-view :scroll-y="true">
					<view class="pt5 pl3 pr3 pb35 voucher-box">
						<view class="flex mt15 mb10" v-for="(item , index) in voucherList" :key="index"
							@click="changeVoucher(index,item)">
							<view class="flex width-full vip-item-default align-items-center">
								<view class="flex align-items-center left-box mr10">
									<view class="flex icon_font pl10 fs20 color-main1">
										&#xe64e;
									</view>
									<view class="flex flex-right pl8 fs22 fw600 color-main6">
										{{item.money}}
									</view>
								</view>
								<view class="flex-1 flex-col pt10 pb10 lh15">
									<view class="flex fs15" v-if="false">
										{{item.nickname}}
									</view>
									<view class="flex fs15">
										可抵消{{item.money}}元
									</view>
								</view>
								<view class="flex pay-right-box ml25 mr10">
									<image src="../../../static/base/check_1.png" class="pay-right-box"
										mode="scaleToFill" v-if="changeIndex === index">
									</image>
									<image src="../../../static/base/check_2.png" class="pay-right-box"
										mode="scaleToFill" v-else>
									</image>
								</view>
							</view>
						</view>
						<view class="pb20"></view>
					</view>
				</scroll-view>
			</view>
			<view class="fixed w-82 flex pt10 flex-center" style="z-index: 99999999;">
				<view class="presented_btn bg-2 color-white text-center pt8 pb8"
					@click="sendVoucher(selectVoucher.id,selectVoucher.name,selectVoucher.avatar)">
					发送
				</view>
			</view>
		</view>
	</u-popup>
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
					limit:1000
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
						}
						this.sendImMessage('voucher', this.friend, params).then(
							(res) => {
								console.log('发送成功1111111111111111111111')
								this.content = ""
								this.$emit('sendSuccess', res)
								console.log('发送成功222222222222222222222')
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
</script>

<style lang="scss" scoped>
	.pay-right-box {
		width: 30rpx;
		height: 30rpx;
	}

	.w-82 {
		width: 82%;
	}

	.over-hid {
		overflow: hidden;
	}

	.left-box {
		width: 200rpx;
		height: 30rpx;
	}

	.presented_btn {
		width: 200rpx;
		border-radius: 20rpx;
	}

	.voucher-box {
		width: 100%;
		height: 800rpx;
	}

	.vip-item-default {
		background: #FFFFFF;
		box-shadow: 0 0 16rpx rgba(0, 0, 0, 0.08);
	}
</style>
