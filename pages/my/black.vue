<template>
	<view class="width-full minnavh100vh lh1 bg-itsme-1">
		<view class="width-full" v-if="userList && userList.length > 0">
			<view v-for="(item,index) in userList" :key="index">
				<view class="width-full black-list-item flex align-items-center">
					<view class="black-avator ml18">
						<image :src="item.avatar | imageFilter('m11')" class="black-avator" mode="widthFix"></image>
					</view>
					<view class="flex-1 ml15 mr15 flex align-items-center">
						<view class="nowrap1 fs15 color-white fw600">
							{{item.nickname}}
						</view>
						<view v-if="item.gender === 1">
							<view class="my-lable-item ml10" v-if="item.is_vip === 1">
								<image src="../../static/itsme/its_7.png" class="width-full" mode="widthFix"></image>
							</view>
						</view>
						<view v-if="item.gender === 0">
							<view class="my-lable-item ml10" v-if="item.certifyData && item.certifyData.goddess && item.certifyData.goddess.verified === 'true'">
								<image src="../../static/my/certify_ns_1.png" class="width-full" mode="widthFix"></image>
							</view>
						</view>
						<view class="my-lable-item ml10" v-if="item.certifyData && item.certifyData.real && item.certifyData.real.verified === 'true'">
							<image src="../../static/itsme/its_2.png" class="width-full" mode="widthFix"></image>
						</view>
					</view>
					<view class="black-btn btn-box fs14 color-itsme-10 bg-itsme-4 mr18 text-center" @click="delBlack(index)">
						移除
					</view>
				</view>
				<view class="width-full pl20 pr20 ">
					<view class="line-1 bg-itsme-4"> </view>
				</view>
			</view>
			<view class="width-full pt15 pb15" v-if="userList && userList.length > 0 && pages.finish">
				<u-divider bg-color="">没有更多了</u-divider>
			</view>
		</view>
		<view class="width-full height flex align-items-center flex-center flex-col" style="padding-top: 250rpx;" v-else>
			<image src="../../static/base/black.png" class="black-no-img" mode="widthFix"></image>
			<view class="width-full text-center fs15 color-deep mt20">
				您没有将其他人加入黑名单
			</view>
		</view>
		<u-toast ref="uToast" />
		<view v-if="showRedPacket">
			<red-packet></red-packet>
		</view>
	</view>
</template>

<script>
	import UserService from '../../common/service/user-service.js'
	export default {
		data() {
			return {
				userList: [],
				pages: {
					page: 1,
					size: 8,
					finish: false
				}
			}
		},
		onPullDownRefresh() {
			this.init()
		},
		onReachBottom() {
			if (!this.pages.finish) {
				this.pages.page++
				this.getBlackList()
			}
		},
		onLoad() {
			this.init()
		},
		methods: {
			init() {
				Object.assign(this.$data, this.$options.data())
				this.getBlackList()
			},
			getBlackList() {
				uni.showLoading({
					title: '加载中'
				})
				UserService.userblacklist({
					page: this.pages.page,
					limit: this.pages.size
				}).then(res => {
					uni.hideLoading()
					uni.stopPullDownRefresh()
					uni.$emit('blacklist',res),
						console.log(res)
					if (res.code === 1 && res.data && res.data.data.length > 0) {
						this.pages.finish = false
						this.userList = this.userList.concat(res.data.data.map(item => {
							if (item.certify) {
								item.certifyData = JSON.parse(item.certify)
							}
							return item
						}))
						console.log(this.userList)
					} else {
						this.pages.finish = true
					}
				})
			},
			// 移除黑名单
			delBlack(index) {
				console.log(index)
				UserService.userblackdel({
					user_id: this.userList[index].user_id
				}).then(res => {
					if (res.code === 1) {
						if (this.userList && this.userList.length > 10) {
							this.userList.splice(index, 1)
						} else {
							this.init()
						}
						this.$refs.uToast.show({
							title: '移除黑名单成功'
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.black-list-item {
		height: 200rpx;
	}

	.black-avator {
		width: 100rpx;
		height: 100rpx;
		border-radius: 100rpx;
		overflow: hidden;
	}

	.black-btn {
		width: 140rpx;
		height: 60rpx;
		border-radius: 60rpx;
		line-height: 60rpx;
	}

	.black-no-img {
		width: 280rpx;
	}

	.my-lable-item {
		width: 28rpx;
	}
	.line-1{
		height: 2rpx;
	}
</style>
