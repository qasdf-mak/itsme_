<template>
	<view class="width-full height100vh bg-white lh1">
		<view class="fixed top left top-nav-box right bg-white" :style="'padding-top:' + StatusBar + 'px;'">
			<view class="width-full bg-white">
				<view class="width-full top-nav-box relative bg-white">
					<view class="absolute top bottom right15 fs13 color-shallow" @click="toProfile">
						跳过
					</view>
				</view>
			</view>
		</view>
		<view class="top-nav-box width-full"></view>
		<view class="width-full" v-if="profileList">
			<view class="width-full mt30 text-center fs22 fw600">
				完善资料将为您<text class="color-main5">提升{{profileWorth}}身价值</text>
			</view>
			<view class="width-full mt25">
				<view v-for="(item,index) in profileList" :key="index">
					<view class="ml30 mr35 mb12 flex align-items-start" v-if="item.type === 3">
						<view class="label-left-box flex align-items-center flex-center"></view>
						<view class="ml5 flex-1">
							<view class="width-full label-right-top flex align-items-center flex-between">
								<view class="fs15 color-deep">
									{{item.name}}
								</view>
							</view>
							<view class="width-full mt10 mb10">
								<view class="label-item-box b-b-1 line-color-1">
									<u-input v-model="item.content" class="fs14 color-deep" type="text" maxlength="11" placeholderStyle="color: #cccccc" :border="false" />
								</view>
							</view>
						</view>
					</view>
					<view class="ml30 mr35 mb12 flex align-items-start" v-else @click="toChangeLable(index)">
						<view class="label-left-box flex align-items-center flex-center">
							<image :src="index | leftImg" class="label-left-img" mode="widthFix"></image>
						</view>
						<view class="ml5 flex-1">
							<view class="width-full label-right-top flex align-items-center flex-between">
								<view class="fs15 color-deep">
									{{item.name}}
								</view>
								<view class="icon_font fs16 color-shallow">
									&#xe609;
								</view>
							</view>
							<view class="width-full mt10 mb10">
								<view class="label-list-box flex flex-wrap">
									<view v-for="(label,lindex) in item.item" :key="lindex">
										<view class="label-item pt8 pb8 pl15 pr15 br20 mb5 mr10" :class="'label-item-' + ((index + 3) % 3 + 1)" v-if="label.state === 1">
											{{label.name}}
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="ml30 mr30 pl3 pr3 fs14 lh15 mt5 mb25 color-main2">
				*身价是您在是我啊（It’s me）的身份标识之一。
				可提升交友圈，获得更高的社交资源。向更多异性
				展示自己，更多的曝光，提高匹配度哦!
			</view>
			<view class="width-full pb_iphoneX_safe">
				<view class="ml30 mr30 mt25 pb30">
					<view class="ml10 mr10 fs18 color-deep text-center pt12 pb12 bg-white br40 box-shadow-login btn-box" @click="confirmProfile">
						下一步
					</view>
				</view>
			</view>
		</view>
		<u-popup v-model="showPop" mode="center">
			<view class="label-pop-box bg-white flex flex-col lh1" v-if="labelList">
				<view class="width-full pt35">
					<view class="width-full pt35 flex align-items-center flex-col">
						<view class="flex align-items-center flex-center">
							<view class="label-left-box flex align-items-center flex-center mt5">
								<image src="../../static/my/my_1.png" class="label-left-img" mode="widthFix"></image>
							</view>
							<view class="fs22 color-deep fw600 ml10">
								选择你的{{labelList.name}}
							</view>
						</view>
					</view>
					<view class="width-full text-center color-shallow mt15 pl25 border-box" v-if="labelList.type === 2">
						请至少勾选3项
					</view>
				</view>
				<view class="flex-1">
					<view class="ml30 mt30 pt15 mr30 flex flex-wrap">
						<view v-for="(label,index) in labelList.item" :key="index">
							<view class="mb25 mr25" :class="label.state === 0 ? 'label-pop-item1' : 'label-pop-item2'" @click="changeLable(index)">
								{{label.name}}
							</view>
						</view>
					</view>
				</view>
				<view class="width-full pb_iphoneX_safe">
					<view class="ml30 mr30 mt25 pb30">
						<view class="ml10 mr10 fs18 color-deep text-center pt12 pb12 bg-white br40 box-shadow-login btn-box" @click="confirmLable">
							确定
						</view>
					</view>
				</view>
			</view>
		</u-popup>
		<u-toast ref="uToast" />
		<view v-if="showRedPacket">
			<red-packet></red-packet>
		</view>
	</view>
</template>

<script>
	import { mapGetters } from 'vuex'
	import UserService from '../../common/service/user-service.js'
	import updateUser from '../../common/mixins/login.js'
	export default {
		mixins: [updateUser],
		data() {
			return {
				profileList: null,
				profileWorth: 0,
				showPop: false,
				labelList: null,
				labelIndex: 0
			}
		},
		onLoad() {
			this.init()
		},
		computed:{
			...mapGetters(['user'])
		},
		filters: {
			leftImg (index) {
				let num = (index + 3) % 3 + 1
				return '../../static/my/my_' + num + '.png'
			}
		},
		methods: {
			init() {
				Object.assign(this.$data, this.$options.data())
				this.getUserProfile()
			},
			// 提交资料
			confirmProfile() {
				console.log(this.profileList)
				let data = JSON.stringify(this.profileList)
				UserService.setuserprofile({
					data: data
				}).then(res => {
					this.updateUser().then(() => {
						uni.navigateTo({
						    url: '/pages/my/profile'
						})
					})
				})
			},
			// 下一步
			toProfile () {
				uni.navigateTo({
					url: '/pages/my/profile'
				})
			},
			// 获取数据
			getUserProfile() {
				UserService.getuserprofile({
					step: 2,
					sex: this.user.gender
				}).then(res => {
					if (res.code === 1) {
						console.log(res)
						this.profileList = res.data.list
						this.profileWorth = res.data.z_worth
						console.log(this.profileList)
					}
				})
			},
			// 打开标签选择框
			toChangeLable(index) {
				this.labelList = this.profileList[index]
				this.labelIndex = index
				this.showPop = true
			},
			// 选择标签
			changeLable(index) {
				if (this.labelList.type === 1) {
					if (this.labelList.item[index].state === 0) {
						this.labelList.item.map(lable => {
							lable.state = 0
							return lable
						})
						this.labelList.item[index].state = 1
					} else {
						this.labelList.item[index].state = 0
					}
				}
				if (this.labelList.type === 2) {
					if (this.labelList.item[index].state === 0) {
						this.labelList.item[index].state = 1
					} else {
						this.labelList.item[index].state = 0
					}
				}
			},
			// 确认标签
			confirmLable() {
				if (this.labelList.type === 1) {
					let lables = this.labelList.item.filter(lable => {
						return lable.state === 1
					})
					if (!lables || (lables && lables.length === 0)) {
						this.$refs.uToast.show({
							title: '请选择您的' + this.labelList.name,
							icon: false
						})
						return false
					}
				}
				if (this.labelList.type === 2) {
					let lables = this.labelList.item.filter(lable => {
						return lable.state === 1
					})
					if (!lables || (lables && lables.length < 3)) {
						this.$refs.uToast.show({
							title: '请至少勾选3项',
							icon: false
						})
						return false
					}
				}
				console.log(this.labelList)
				console.log(this.profileList)
				this.profileList[this.labelIndex] = this.labelList
				this.labelList = null
				this.labelIndex = 0
				this.showPop = false
			}
		}
	}
</script>

<style lang="scss" scoped>
.top-nav-box{
	height: 88rpx;
	line-height: 88rpx;
}
.label-left-box{
	width: 50rpx;
	height: 50rpx;
}
.label-left-img{
	width: 40rpx;
	height: 40rpx;
}
.label-right-top{
	height: 40rpx;
}
.label-list-box{
	width: 110%;
	height: 140rpx;
	overflow: hidden;
}
.label-item-box{
	height: 70rpx;
	overflow: hidden;
}
.label-item-1{
	border: 2rpx solid #EDDD81;
}
.label-item-2{
	border: 2rpx solid #EBB488;
}
.label-item-3{
	border: 2rpx solid #D5DAA7;
}
.label-pop-box{
	width: 100vw;
	height: 100vh;
}
.label-pop-item1{
	color: #999999;
	background: #ffffff;
	border: 2rpx solid #EEEEEE;
	padding: 24rpx 34rpx;
	border-radius: 40rpx;
}
.label-pop-item2{
	color: #666666;
	background: #FFFDEF;
	border: 2rpx solid #EDDD81;
	padding: 24rpx 34rpx;
	border-radius: 40rpx;
}
</style>

