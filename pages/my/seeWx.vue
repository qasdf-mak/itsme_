<template>
	<view>
		<view class="width-full flex flex-center mt15" v-for="(item,index) in userList" :key="index">
			<view class="wx-box bg-itsme-4 flex pl15 pr15 pt20 pb20 relative">
				<view class="wx-box-right absolute right top text-center" :class="true ? 'color-itsme-2' : ''">
					{{item.status}}
				</view>
				<view class="flex flex-1">
					<view class="img-avatar-wx mr8"  @click="goHome(item.user_id)">
						<image :src="item.avatar | imageFilter('m11')" mode="widthFix" class="img-avatar-wx"></image>
					</view>
					<view class="ml5 flex flex-col">
						<view class="flex align-items-center mt5">
							<view class="fs15 mr5">
								{{item.nickname}}
							</view>
							<!-- <view class="flex bg-itsme-8 br20 align-items-center pl5 pr5">
								<image src="/static/itsme/its_1.png" class="img-worth mr5 mt2" mode=""></image>
								<view class="fs10">
									{{item.worth}}
								</view>
							</view> -->
							<view v-if="item.is_vip === 1">
								<view class="img-certification-box ml8" >
									<image src="/static/itsme/its_7.png" class="img-certification-box" mode="widthFix">
									</image>
								</view>
							</view>
							<view v-if="item.is_real === 1">
								<view class="img-certification-box ml8">
									<image src="/static/itsme/its_2.png" class="img-certification-box" mode="widthFix">
									</image>
								</view>
							</view>
						</view>
						<view class="flex mt10">
							<view class="fs10 color-white opacity60 mr6" v-if="item.status === '举报中'">
								举报中,平台正在处理
							</view>
							<view class="fs10 color-white opacity60 mr6" v-else-if="item.status === '已到账'">
								 已到账
							</view>
							<view class="fs10 color-white opacity60 mr6" v-else>
								预计到账时间 ： {{item.createtime + 259200 | dateFilter(2)}}
							</view>
						</view>
					</view>
				</view>
				<view class="mt10 flex flex-center align-items-center fs24 fw600 color-itsme-2">
					{{item.money}}M豆
				</view>
			</view>
		</view>
		<view >
			<red-packet></red-packet>
		</view>
	</view>
</template>

<script>
	import UserService from '../../common/service/user-service.js'
	export default {
		data() {
			return {
				userList:[]
			}
		},
		onLoad() {
			this.init()
		},
		computed: {
			isReal() {
				if (this.user && this.user.gender) {
					console.log(JSON.parse(this.user.certify))
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
		},
		methods: {
			init() {
				Object.assign(this.$data, this.$options.data())
				this.getLookWxlist()
			},
			getLookWxlist() {
				UserService.checkUnlockwxWx({}).then(res => {
					if (res.code === 1) {
						console.log(res)
						this.userList = res.data.data
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.wx-box {
		width: 686rpx;
		height: 180rpx;
		box-shadow: 0px 0px 18rpx 0px rgba(0, 0, 0, 0.1);
		border-radius: 20rpx;
	}

	.img-avatar-wx {
		width: 100rpx;
		height: 100rpx !important;
		border-radius: 50%;
	}

	.img-worth {
		width: 19rpx;
		height: 17rpx;
	}

	.img-certification-box {
		width: 30rpx;
		height: 30rpx;
	}
	.wx-box-right{
		width: 133rpx;
		height: 45rpx;
		line-height: 45rpx;
		background: #39394F;
		border-radius:  0px 20rpx 0px 20rpx;
	}
</style>
