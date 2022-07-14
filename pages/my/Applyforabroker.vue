<template>
	<view class="centent pl30 pr25 pb35 bg-itsme-1">
		<!-- 基本信息 -->
		<view class=" mt10 mb35 relative">
			<view class="flex align-items-center ">
				<view class="dot-box absolute left-18 mt3"> </view>
				<view class="wenben1">
					请填写您的基本信息
				</view>
			</view>
			<view class="jibenxinxi mt10">
				<!-- 姓名 -->
				<view class="xingming pt15 pb15 color-itsme-10">
					<view style="flex: 2;">姓 &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;名 &nbsp;:</view><input style="flex: 5;" v-model="userInfo.realname"
						class="fs14 color-itsme-10" type="text" placeholder="请输入姓名" placeholderStyle="color: #3F3C43"
						value="" />
				</view>
				<!-- 姓名 -->
				<u-line color="#23232D" length="100%" />
				<!-- 手机号 -->
				<view class="xingming pt15 pb15 color-itsme-10">
					<view style="flex: 2;">手 &nbsp;机 &nbsp;号 &nbsp;码  :</view><input style="flex: 5;" v-model="userInfo.mobile"
						class="fs14 color-itsme-10" type="number" placeholder="请输入手机号" maxlength="11"
						placeholderStyle="color: #3F3C43" value="" disabled />
				</view>
				<!-- 手机号 -->
				<u-line color="#23232D" length="100%" />
				<!-- 合伙人手机号 -->
				<view class="xingming pt15 pb15 color-itsme-10">
					<view style="flex: 2;" >合伙人手机号 :</view><input style="flex: 5;" v-model="userInfo.partnerPhone"
						class="fs14 color-itsme-10" type="number" placeholder="请输入合伙人手机号" maxlength="11"
						placeholderStyle="color: #3F3C43" value=""  />
				</view>
				<!-- 合伙人手机号 -->

			</view>
			<!-- 基本信息 -->

			<view class="flex align-items-center ">
				<view class="dot-box absolute left-18 mt3"> </view>
				<view class="wenben1">
					请介绍您的资源
				</view>
			</view>
			<view class="nindeziyuan pt8">
				<!-- 所在城市 -->
				<view class="flex align-items-center mb10 mt10">
					<view class="task-dian" style="background: none;"></view>
					<view class="fs16 color-deep color-itsme-10">所在城市 :</view>
				</view>
				<view class="bg-itsme-4 br10 pt12 pb12 pl15  flex-1 flex align-items-center border-box pl20 pr20"
					@click="addressPickerShow = true"> 
					<view class="flex-1 fs12 color-itsme-10 fw600" v-if="userInfo.address">
						{{userInfo.address}}
					</view>
					<view class="flex-1 fs14 color-3F3C43" v-else>
						请选择所在城市
					</view>
					<view class="icon_font fs14 color-bbbbbb">
						&#xe637;
					</view>
				</view>

				<!-- 所在城市 -->
				<!-- 是否从事过相关行业 -->
				<task-radio type="industries" :show="userInfo.industries" @changeRadio="changeRadio"></task-radio>
				<!-- 是否从事过相关行业 -->
				<!-- 是否参加过其他平台 -->
				<task-radio type="platform" :show="userInfo.platform" @changeRadio="changeRadio"></task-radio>
				<view class="mt20 flex align-items-center flex-between  border-box bg-itsme-4 br10 pt12 pb12 pl15 "
					v-if="userInfo.platform === 1">
					<input v-model="userInfo.platformName" placeholder="请输入参与过的平台名称" class="fs14 color-itsme-10"
						placeholderStyle="color:#3F3C43" style="height: 40rpx;">

					</input>
				</view>
				<!-- 是否参加过其他平台 -->
				<!-- 资源类别 -->
				<view class="flex align-items-center mb10 mt25">
					<view class="task-dian" style="background: none;"></view>
					<view class="fs16 color-deep color-itsme-10">资源类别 :</view>
				</view>
				<view class="bg-itsme-4 br10 pt12 pb12 pl15 flex-1 flex align-items-center border-box ">
					<input v-model="userInfo.resourceType" type="text" placeholder="资源渠道：学生群体、礼仪模特、社群"
						placeholderStyle="color: #3F3C43" class="width-full fs14 border-box pl10 color-itsme-10" />
				</view>
				<!-- 资源类别 -->
			</view>
		</view>

		<view class="pl25 pr25 mb35">
			<view class="width-full pt10 pb10 bg-2 bor-r" @click="submitBroker">
				<view class="text-center fs16 color-white">
					提交申请
				</view>
			</view>
		</view>
		<u-toast ref="uToast" />
		<view v-if="showRedPacket">
			<red-packet></red-packet>
		</view>
		<!-- 地址筛选器 -->
		<address-picker :addressPickerShow="addressPickerShow" :addressid="addressData"
			@cancelAddress="addressPickerShow = false" @confirmAddress="confirmAddress"></address-picker>
		<!-- 地址筛选器 -->
	</view>
</template>

<script>
	import {
		mapActions
	} from 'vuex'
	import taskRadio from '../../components/task/edit/radio.vue'
	import CommonService from '../../common/service/common-service.js'
	import addressPicker from '../../components/common/addresspicker.vue'
	export default {
		data() {
			return {
				timeShow: false,
				time: 59,
				addressPickerShow: false,
				userInfo: {
					realname: '', // 姓名
					mobile: '', // 手机号
					partnerPhone:'', // 合伙人手机号
					address: '', // 地点
					addressId: '', // 地点id
					lng: '', //经纬
					lat: '', //经纬
					industries: 0, // 行业
					platform: 0, // 平台
					platformName: '', //平台名称
					resourceType: '' // 资源类别
				},
				addressData: {
					pid: '',
					cid: ''
				},
			}
		},
		components: {
			taskRadio,
			addressPicker
		},
		onLoad(options) {
			this.init(options)
		},
		computed: {

			verificationMobile() {
				if (this.userInfo.mobile) {
					let myreg = /^[1][2-9][0-9]{9}$/
					if (myreg.test(this.userInfo.mobile)) {
						return true
					} else {
						return false
					}
				} else {
					return false
				}
			}
		},
		methods: {
			...mapActions(['IFTHE_REFRESH']),
			init(options) {
				Object.assign(this.$data, this.$options.data())
				this.userInfo.mobile = this.user.mobile
				this.userInfo.realname = options.name
				console.log(JSON.parse(options.item))
				if(options.item){
					this.userInfo = JSON.parse(options.item)
				}
			},
			// 单选
			changeRadio(type, value) {
				if (value === 0) {
					this.userInfo.platformName = ''
				}
				this.userInfo[type] = value
			},
			// 确认地址
			confirmAddress(pname, cname, pid, cid) {
				this.addressData = {
					pid: pid,
					cid: cid
				}
				this.userInfo.address = cname
				this.userInfo.addressId = cid
				this.addressPickerShow = false
			},
			// 获取手机验证码
			getSend() {
				let that = this
				console.log(12)
				if (this.verificationMobile) {
					CommonService.getsend({
						mobile: this.userInfo.mobile,
						event: 'register'
					}).then(res => {
						if (res.code === 1) {
							that.$refs.uToast.show({
								title: '发送成功',
								icon: false
							})
							that.timeShow = true
							that.setTime()
						} else {
							that.$refs.uToast.show({
								title: res.msg,
								icon: false
							})
						}
					})
				} else {

				}
			},
			// 倒计时
			setTime() {
				let that = this
				if (this.time > 0) {
					this.time--
					setTimeout(function() {
						that.setTime()
					}, 1000);
				} else {
					this.timeShow = false
					this.time = 59
				}
			},
			//提交申请
			submitBroker() {
				if (this.userInfo.realname === '') {
					this.$refs.uToast.show({
						title: '请输入姓名',
						icon: false
					})
					return false
				}
				console.log(this.userInfo.mobile.length)
				if (this.userInfo.mobile.length > 11 || this.userInfo.mobile.length < 11) {
					this.$refs.uToast.show({
						title: '请输入正确的手机号',
						icon: false
					})
					return false
				}
				if (this.userInfo.code === '') {
					this.$refs.uToast.show({
						title: '请输入验证码',
						icon: false
					})
					return false
				}
				if (this.userInfo.addressId === '') {
					this.$refs.uToast.show({
						title: '选择所在城市',
						icon: false
					})
					return false
				}

				console.log(this.userInfo)
				CommonService.addAgent({
					realname: this.userInfo.realname,
					mobile: this.userInfo.mobile,
					city_id: this.userInfo.addressId,
					is_related_industries: this.userInfo.industries,
					is_order_platform: this.userInfo.platform,
					order_platform_name: this.userInfo.platformName,
					resource_type: this.userInfo.resourceType,
					partner_phone: this.userInfo.partnerPhone,
				}).then(res => {
					if (res.code === 1) {
						this.$refs.uToast.show({
							title: '申请成功,请等待人工审核',
							icon: false
						})
						this.IFTHE_REFRESH(true)
						setTimeout(function() {
							uni.navigateBack({
								delta: 1
							})
						}, 1500)
						setTimeout(function() {
							uni.navigateBack({
								delta: 1
							})
						}, 1500)
					} else {
						this.$refs.uToast.show({
							title: res.msg,
							icon: false
						})
						this.IFTHE_REFRESH(true)
					}
				})
			}
		}
	}
</script>

<style>
	.schedule {
		display: flex;
		padding: 0 15rpx;
	}

	.left-18 {
		left: -36rpx;
	}

	.no {
		width: 171rpx;
		height: 27rpx;
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #aaa;
		margin: 0 auto;
		margin-bottom: 20rpx;

	}

	.bor-r {
		border-radius: 45rpx;
	}

	.no1 {
		height: 8rpx;
		background: #ddd;
		border-radius: 4rpx;
		justify-content: center;

	}

	.wenben1 {
		width: 280rpx;
		height: 30rpx;
		margin-top: 20rpx;
		margin-bottom: 24rpx;
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #fff;
	}

	.jibenxinxi {
		box-shadow: 0rpx 0rpx 16rpx 0rpx rgba(0, 0, 0, 0.08);
		border-radius: 20rpx;
		display: flex;
		flex-direction: column;
	}

	.nindeziyuan {
		height: auto;
		padding-bottom: 50rpx;
		box-shadow: 0rpx 0rpx 16rpx 0rpx rgba(0, 0, 0, 0.08);
		border-radius: 20rpx;
	}

	.jibenxinxi .xingming {
		flex: 1;
		display: flex;
		align-items: center;
	}

	.jibenxinxi .lianxifangshi {
		flex: 1;
		display: flex;
		align-items: center;
	}

	.border1 {
		height: 80rpx;
		border: 1px solid #ccc;
		line-height: 80rpx;
		color: grey;
	}

	.cishu {
		width: 215rpx;
		height: 80rpx;
		border: 1px solid #ccc;
		color: grey;
		flex: 4
	}

	.jiage {
		width: 369rpx;
		height: 80rpx;
		border: 1px solid #ccc;
		color: grey;
		flex: 7
	}

	.color-3F3C43 {
		color: #3F3C43;
	}

	.kongbai {
		flex: 0.4;
	}

	.task-input-box {
		height: 80rpx;
		border: 1rpx solid #CCCCCC;
	}

	.cishujijiage {
		display: flex;
	}

	.register-yzm {
		width: 150rpx;
	}

	.dot-box {
		width: 12rpx;
		height: 12rpx;
		background: #D97DB0;
		border-radius: 50%;
	}
</style>
