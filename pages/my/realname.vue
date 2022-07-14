<template>
	<view class="width-full minnavh100vh bg-itsme-1 lh1">
		<view class="pl15 pr15 pt15">
			<view class="width-full border-box bg-itsme-1 br5  pb35 pl20 pr20 box-shadow-index">
				<view class="width-full">
					<view class="width-full flex align-items-center">
						<view class="fs15 color-white pt20 pb20">
							身份证姓名：
						</view>
						<view class="flex-1 ml10 fs14 color-white">
							<input type="text" v-model="name" placeholder="请填写身份证姓名"/>
						</view>
					</view>
					<view class="width-full flex align-items-center">
						<view class="fs15 color-white pt20 pb20">
							身份证号码：
						</view>
						<view class="flex-1 ml10 fs14 color-white">
							<input type="text" v-model="idNumber" maxlength="18" placeholder="请填写身份证号码"/>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="fixed bottom35 left right pb_iphoneX_safe">
			<view class="ml20 mr20">
				<view class="ml20 mr20 realname-btn bg-2 fs18 color-white text-center btn-box" :class="idNumber && name ? '' : 'opacity60'" @click="toAdd">
					提交申请
				</view>
				<view class="ml15 mr15 fs12 color-itsme-17 text-center lh18 mt15">
					您提交的身份证信息，仅用于认证身份和提现绑定卡号
					认证通过后，平台不会保存您的信息
				</view>
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
				cardImg: '',
				idNumber: '',
				name: '',
				pageType:'',
				WithdrawType:0,
			}
		},
		onLoad(options) {
			this.init(options)
		},
		methods: {
			init(options) {
				Object.assign(this.$data, this.$options.data())
				this.pageType = options.type
				this.WithdrawType = options.Withdraw
				console.log(this.WithdrawType)
			},
			toAdd() {
				UserService.userrealadd({
					name: this.name,
					identity_card: this.idNumber
				}).then(res => {
					console.log(res)
					if (res.code === 1) {
						this.$refs.uToast.show({
							title: '实名认证已通过',
							duration: 1500
						})
						setTimeout(() => {
							if(this.pageType === "agent"){
								this.toJumpPage(2,'/pages/my/Applyforabroker')
							}else{
								uni.redirectTo({
									url:'/pages/my/banklist?Withdraw=' + this.WithdrawType
								})
							}
							if(this.pageType === "banklist"){
								
								this.toJumpPage(2,'/pages/my/banklist')
							}
							
							// this.toJumpPage(2,'./banklist')
							// this.goBack()
						}, 1500)
					}else{
						this.$refs.uToast.show({
							title: res.msg,
							duration: 1500
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.realname-box{
		width: 420rpx;
		height: 300rpx;
	}
	.realname-btn{
		height: 80rpx;
		line-height: 80rpx;
		border-radius: 80rpx;
	}
</style>
