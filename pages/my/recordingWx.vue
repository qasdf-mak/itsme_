<template>
	<view>
		<view v-if="isData">
			<view class="width-full flex flex-center mt15" v-for="(item , index) in userList" :key="index">
				<view class="wx-box bg-itsme-4 flex flex-col p17">
					<view class="flex flex-1">
						<view class="img-avatar-wx mr30" @click="goHome(item.user_id)">
							<image :src="item.avatar | imageFilter('m11')" mode="widthFix" class="img-avatar-wx">
							</image>
						</view>
						<view class="ml5 flex flex-col">
							<view class="flex align-items-center">
								<view class="fs15 mr5">
									{{item.nickname}}
								</view>
								<!-- <view class="flex bg-itsme-8 br20 align-items-center pl5 pr5">
									<image src="/static/itsme/its_1.png" class="img-worth mr5 mt2" mode=""></image>
									<view class="fs10">
										{{item.worth}}
									</view>
								</view> -->
								<view>
									<view class="img-certification-box ml8" v-if="item.is_real === 1">
										<image src="/static/itsme/its_2.png" class="img-certification-box"
											mode="widthFix">
										</image>
									</view>
								</view>
							</view>
							<view class="flex mt10">
								<view class="icon_font fs16 color-06CA64 mr6">
									&#xe648;
								</view>
								<view class="fs12 color-363636">
									{{item.wx}}
								</view>
							</view>
						</view>
					</view>
					<view class="flex flex-between">
						<view class="flex align-items-center flex-center wx-btn bg-itsme-2 br20 color-white" @click="cloneWx(item.wx)">
							<image src="/static/itsme/itsme_64.png" class="img-certification-box" mode="widthFix" >
							</image>
							<view class="ml5">
								复制
							</view>
						</view>
						<view class="flex align-items-center flex-center wx-btn bg-itsme-2 br20 color-white"
							@click="goReport(item.id,item.user_id)">
							<image src="/static/itsme/itsme_66.png" class="img-certification-box" mode="widthFix">
							</image>
							<view class="ml5">
								举报
							</view>
						</view>
						<view class="flex align-items-center flex-center wx-btn bg-white br20 color-itsme-2" @click="toOpenChat('seeWx',item.user_id)">
							<image src="/static/itsme/itsme_65.png" class="img-certification-box" mode="widthFix">
							</image>
							<view class="ml5">
								聊天
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="mt35" v-else>
			<empty-tip type="lookWx"></empty-tip>
		</view>
		<view >
			<red-packet></red-packet>
		</view>
	</view>
</template>
<script>
	//复制
	import uniCopy from '../../js_sdk/xb-copy/uni-copy.js'
	import UserService from '../../common/service/user-service.js'
	export default {
		data() {
			return {
				userList: [],
				isData: true,
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
				UserService.checkMyUnlockWx({}).then(res => {
					if (res.code === 1) {
						if (res.data.data.length === 0) {
							this.isData = false
						} else {
							this.userList = res.data.data
							console.log(this.userList)
						}
					}
				})
			},
			goReport(id, userid) {
				uni.redirectTo({
					url: '/pages/my/wxReport?type=' + 2 + '&id=' + id + '&userId=' + userid
				})
			},
			cloneWx(wx){
				console.log('111111111111')
				uniCopy({
					content: wx,
					success: (res) => {
						uni.showToast({
							title: '复制成功',
							icon: 'none'
						})
					},
					error: (e) => {
						uni.showToast({
							title: e,
							icon: 'none',
							duration: 3000,
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.wx-box {
		width: 686rpx;
		height: 242rpx;
		box-shadow: 0px 0px 18rpx 0px rgba(0, 0, 0, 0.1);
		border-radius: 20rpx;
	}

	.img-avatar-wx {
		width: 116rpx;
		height: 116rpx !important;
		border-radius: 50%;
	}

	.img-worth {
		width: 19rpx;
		height: 17rpx;
	}

	.wx-btn {
		width: 120rpx;
		height: 42rpx;
	}


	.img-certification-box {
		width: 30rpx;
		height: 30rpx;
	}

	.color-06CA64 {
		color: #06CA64;
	}
</style>
