<template>
	<view class="width-full minnavh100vh lh1 bg-main">
		<view class="pt8 pl15 pr15">
			<view class="width-full pt10 pb10 fs14 color-shallow">
				请填写您的个人信息
			</view>
			<view class="width-full br10 add-bank-box flex align-items-center mb10">
				<view class="fs15 color-deep">
					户&#12288;&#12288;名：
				</view>
				<view class="fs15 color-deep fw600 flex-1 ml5">
					{{name || ''}}
				</view>
			</view>
			<view class="width-full br10 add-bank-box flex align-items-center mb10">
				<view class="fs15 color-deep">
					账号类型：
				</view>
				<view class="fs15 color-deep fw600 flex-1 flex ml5">
					<picker @change="accountType" class="width-full" :value="accountTypeIndex" :range="accountTypeList">
						<view class="flex-1 fs15 color-deep">{{accountTypeList[accountTypeIndex]}}</view>
					</picker>
					<view class="flex icon_font fs13 color-bbbbbb">
						&#xe637;
					</view>
				</view>
			</view>
			<view class="width-full br10 add-bank-box flex align-items-center mb10">
				<view class="fs15 color-deep">
					账&#12288;&#12288;号：
				</view>
				<view class="fs15 color-deep fw600 flex-1 ml5">
					<input type="text" v-model="deposit" />
				</view>
			</view>
			<view class="width-full mt25 text-center fs14 color-shallow mb30">
				输入的账号必须是实名认证姓名的账号
			</view>
			<view class="ml20 mr20">
				<view class="ml20 mr20 add-bank-btn bg-2 fs18 color-white text-center btn-box"
					:class="name && deposit ? '' : 'opacity60'" @click="toAdd">
					添加
				</view>
			</view>
		</view>
		<!-- 选择体重 -->
		<view class="width-full">

		</view>
		<!-- 选择体重 -->
		<u-toast ref="uToast" />
		<view v-if="showRedPacket">
			<red-packet></red-packet>
		</view>
		<view >
			<red-packet></red-packet>
		</view>
	</view>
</template>

<script>
	import UserService from '../../common/service/user-service.js'
	import CommonService from '../../common/service/common-service.js'
	export default {
		data() {
			return {
				name: '',
				cardId: '',
				showType: false,
				accountTypeList: ['支付宝账号', '微信账号'],
				accountTypeIndex: 0,
				bankId: '',
				deposit: ''
			}
		},
		onLoad() {
			this.init()
		},
		methods: {
			init() {
				Object.assign(this.$data, this.$options.data())
				this.getUserInfo()
			},
			//选择
			accountType(e) {
				this.accountTypeIndex = e.target.value
			},
			getUserInfo() {
				UserService.userrealget().then(res => {
					console.log(res)
					if (res.code === 1) {
						this.name = res.data.name,
						this.cardId = res.data.identity_card
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.add-bank-box {
		padding: 35rpx;
		box-shadow: 0 0 16rpx rgba(0, 0, 0, 0.08);
	}

	.add-bank-btn {
		height: 80rpx;
		line-height: 80rpx;
		border-radius: 80rpx;
	}
</style>
