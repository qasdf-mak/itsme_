<template>
	<view class="width-full pr15 pl15 bg-itsme-1 height100vh">
		<view class="b-b-1 line-itsme-2 pb12 pt8" v-if="withdrawalList && withdrawalList.length >= 1"
			v-for="(item,index) in withdrawalList" :key="index">
			<view class="flex flex-between fs15 color-white mt3">
				<view class="">
					{{item.type}} : {{item.alipay_account}}
				</view>
				<view class="fw600">
					+ {{item.money | numberFilter}} 元
				</view>
			</view>
			<view class="flex flex-between fs10 mt8">
				<view class="color-itsme-2">
					{{item.createtime}}
				</view>
				<view class="color-white" v-if="item.status == 1">
					已打款
				</view>
				<view class="color-white" v-if="item.status == 2">
					已申请
				</view>
				<view class="color-white" v-if="item.status == 3">
					已拒绝
				</view>
			</view>
			<view class="fs10 mt10 color-itsme-2" v-if="item.status == 3">
				* {{item.remarks}}
			</view>
		</view>
		<view class="width-full" v-else>
			<view>
				<empty-tip type="withdrawal"></empty-tip>
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
				withdrawalList: []
			}
		},
		onLoad() {
			this.init()
		},
		methods: {
			init() {
				Object.assign(this.$data, this.$options.data())
				this.getWithdrawalList()
			},
			getWithdrawalList() {
				UserService.userWithdrawalList({}).then(res => {
					if (res.code === 1) {
						this.withdrawalList = res.data.data
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.b-b-bbb {
		border-bottom: 1rpx solid #BBBBBB;
	}

	.color-green {
		color: green;
	}
</style>
