<template>
	<view class="width-full height100vh bg-white lh1">
		<view class="fixed top left top-nav-box right bg-white" :style="'padding-top:' + StatusBar + 'px;'">
			<view class="width-full bg-white">
				<view class="width-full top-nav-box relative bg-white">
					<view class="absolute top bottom left15 fs13 color-shallow icon_font" @click="goBack">
						&#xe638;
					</view>
					<view class="absolute top bottom right15 fs13 color-shallow" v-if="isMypass == 1" @click="toIndex">
						跳过
					</view>
				</view>
			</view>
		</view>
		<view class="top-nav-box width-full"></view>
		<view class="width-full" v-if="profileData">
			<view class="width-full mt50 text-center fs22 fw600">
				完善资料将为您<text class="color-main5">提升{{profileWorth}}身价值</text>
			</view>
			<view class="width-full mt35 pt25">
				<view class="ml35 mr35 mt15 bg-white pl20 pt20 pb20 pr20 br10 relative">
					<!-- 头像 -->
					<view class="absolute left right profile-avator-box flex align-items-center flex-center">
						<view class="flex align-items-center flex-col flex-center" @click="changeAvator">
							<view class="profile-avator bg-white">
								<image :src="userAvatar | imageFilter('m11')" class="profile-avator" mode="widthFix"
									v-if="userAvatar"></image>
								<image src="../../static/my/my_4.png" class="profile-avator" mode="widthFix" v-else>
								</image>
							</view>
							<view class="fs13 color-deep mt15">
								{{userAvatar ? '修改头像' : '上传头像'}}
							</view>
							<view class="fs10 mt5 color-bbbbbb">
								上传一张好看的自拍照吧
							</view>
						</view>
					</view>
					<view class=" width-full pt35 mb20 "></view>
					<!-- 封面 -->
					<view class="profile-avator-box flex align-items-center flex-center pt25">
						<view class="flex align-items-center flex-col flex-center" @click="changeCover">
							<view class="profile-cover line-height text-center bg-eee">
								<image :src="cover_photo | imageFilter" class="profile-cover" mode="aspectFill"
									v-if="cover_photo"></image>
								<view class="profile-cover fs26 color-shallow icon_font" v-else>
									&#xe61d;
								</view>
							</view>
							<view class="fs13 color-deep mt15">
								{{cover_photo ? '修改封面' : '上传封面'}}
							</view>
							<view class="fs10 mt5 color-bbbbbb">
								上传一张好看的照片做封面吧
							</view>
						</view>
					</view>
					<view class="width-full mt35 pb20"></view>
					<!-- 生日 -->
					<view class="width-full pt12 pb12 flex align-items-center b-b-1 line-color-1"
						@click="showTime = true">
						<view class="fs14 color-deep profile-left">
							生日
						</view>
						<view class="flex-1 flex align-items-center">
							<view class="flex-1">
								<view class="fs14 color-deep"
									v-if="profileData && profileData.birthday && profileData.birthday.content">
									{{profileData.birthday.content}}
								</view>
								<view class="fs14 color-shallow" v-else>
									请选择您的生日
								</view>
							</view>
							<view class="icon_font fs16 color-shallow">
								&#xe609;
							</view>
						</view>
					</view>
					<!-- 身高 -->
					<view class="width-full pt12 pb5 flex align-items-center b-b-1 line-color-1">
						<view class="fs14 color-deep profile-left">
							身高(cm)
						</view>
						<view class="flex-1 flex align-items-center">
							<view class="flex-1">
								<u-input v-model="userHeight" placeholder="请填写您的身高" :clearable="false"
									class="fs14 color-deep" type="number" maxlength="3"
									placeholderStyle="color: #cccccc" :border="false" @input="heightInput" />
							</view>
						</view>
					</view>
					<!-- 体重 -->
					<view class="width-full pt12 pb5 flex align-items-center b-b-1 line-color-1">
						<view class="fs14 color-deep profile-left">
							体重(kg)
						</view>
						<view class="flex-1 flex align-items-center">
							<view class="flex-1">
								<u-input v-model="userWeight" placeholder="请填写您的体重" class="fs14 color-deep"
									type="number" maxlength="3" placeholderStyle="color: #cccccc" :border="false"
									@input="weightInput" />
							</view>
						</view>
					</view>
					<!-- 常住地 -->
					<view class="width-full pt12 pb12 flex align-items-center b-b-1 line-color-1 heightbox"
						@click="addressPickerShow = true">
						<view class="fs14 color-deep profile-left">
							常住地
						</view>
						<view class="flex-1 flex align-items-center">
							<view class="flex-1">
								<view class="fs14 color-deep"
									v-if="profileData && profileData.czd && profileData.czd.content">
									{{userCzd}}
								</view>
								<view class="fs14 color-shallow" v-else>
									请选择您的常住地
								</view>
							</view>
							<view class="icon_font fs16 color-shallow">
								&#xe609;
							</view>
						</view>
					</view>
					<!-- 个人简介 -->
					<view class="width-full pt12 pb12">
						<view class="fs14 color-deep">
							个人简介
						</view>
						<view class="width-full mt5">
							<u-input v-model="userBio" placeholder="简单介绍一下自己..." class="fs14 color-deep" type="textarea"
								placeholderStyle="color: #cccccc" :border="false" @input="bioInput" />
						</view>
					</view>
				</view>
			</view>
			<view class="width-full pb_iphoneX_safe">
				<view class="ml30 mr30 mt25 pb30">
					<view class="ml10 mr10 fs18 text-center pt12 pb12 bg-orange-fff br40 box-shadow-login btn-box"
						@click="confirmProfile">
						确定
					</view>
				</view>
			</view>
		</view>
		<u-toast ref="uToast" />
		<!-- 时间选择器 -->
		<view class="width-full" v-if="showTime">
			<u-picker mode="time" v-model="showTime" :params="timeParams" :default-time="defaultTime" :start-year="1960"
				:end-year="2002" safe-area-inset-bottom @confirm="timeConfirm"></u-picker>
		</view>
		<!-- 地址筛选器 -->
		<address-picker :addressPickerShow="addressPickerShow" :addressid="addressData"
			@confirmAddress="confirmAddress"></address-picker>
		<!-- 图片裁切 -->
		 <yq-avatar @upload="myUpload" ref="avatar"></yq-avatar>
		 
		 <view v-if="showRedPacket">
		 	<red-packet></red-packet>
		 </view>
	</view>
</template>

<script>
	import UserService from '../../common/service/user-service.js'
	import CommonService from '../../common/service/common-service.js'
	import updateUser from '../../common/mixins/login.js'
	import uploadImg from '../../common/utils/upload-img.js'
	import addressPicker from '../../components/common/addresspicker.vue'
	import yqAvatar from '../../components/yq-avatar/yq-avatar.vue'
	export default {
		mixins: [updateUser],
		data() {
			return {
				profileData: {},
				profileWorth: 0,
				userAvatar: '',
				cover_photo:'',
				userName: '',
				userGender: '',
				userHeight: '',
				userWeight: '',
				isMypass: '',
				userBio: '',
				userCzd: '',
				showTime: false,
				defaultTime: '2000-01-01',
				timeParams: {
					year: true,
					month: true,
					day: true,
					hour: false,
					minute: false,
					second: false
				},
				addressPickerShow: false,
				addressData: {
					pid: '',
					cid: ''
				}
			}
		},
		onLoad(options) {
			this.init(options)
		},
		components: {
			addressPicker,
			yqAvatar
		},
		methods: {
			init(options) {
				Object.assign(this.$data, this.$options.data())
				this.getUserProfile()
				this.isMypass = options.isMypass
			},
			myUpload(rsp) {
				let images = []
				images.push(rsp.path)
				uploadImg(images).then(imgs => {
					// 头像
					if (rsp.index === 0) {
						this.profileData.avatar.content = imgs[0]
						this.userAvatar = imgs[0]
					}
					// 封面图
					if (rsp.index === 1) {
						let cover_photo = {
							type:3,
							code:'cover_photo',
							content: imgs[0],
						}
						this.profileData.cover_photo = cover_photo
						this.cover_photo = imgs[0]
					}
				})
			},
			// 提交资料
			confirmProfile() {
				let profileList = []
				profileList.push(this.profileData.avatar)
				profileList.push(this.profileData.cover_photo)
				profileList.push(this.profileData.birthday)
				profileList.push(this.profileData.bio)
				profileList.push(this.profileData.czd)
				profileList.push(this.profileData.height)
				profileList.push(this.profileData.weight)
				let data = JSON.stringify(profileList)
				console.log(profileList)
				UserService.setuserprofile({
					data: data
				}).then(res => {
					this.updateUser().then(() => {
						// uni.switchTab({
						// 	url: '/pages/itsme/index'
						// })
					})
				})
				// if (this.userAvatar === '' || this.userCzd === '') {
				// 	let title = this.userAvatar === '' ? '请选择头像' : '请选择常住地'
				// 	uni.showToast({
				// 		title: title,
				// 		icon: 'none'
				// 	})
				// } else {
				// 	let profileList = []
				// 	profileList.push(this.profileData.avatar)
				// 	profileList.push(this.profileData.cover_photo)
				// 	profileList.push(this.profileData.birthday)
				// 	profileList.push(this.profileData.bio)
				// 	profileList.push(this.profileData.czd)
				// 	profileList.push(this.profileData.height)
				// 	profileList.push(this.profileData.weight)
				// 	let data = JSON.stringify(profileList)
				// 	console.log(data)
				// 	UserService.setuserprofile({
				// 		data: data
				// 	}).then(res => {
				// 		this.updateUser().then(() => {
				// 			uni.switchTab({
				// 				url: '/pages/itsme/index'
				// 			})
				// 		})
				// 	})
				// }
			},
			// 下一步
			toIndex() {
				uni.switchTab({
					url: '/pages/itsme/index'
				})
			},
			// 选择头像
			changeAvator() {
				this.$refs.avatar.fChooseImg(0,{
						selWidth: '300rpx',
						selHeight: '300rpx'
				})
			},
			//选择封面
			changeCover() {
				this.$refs.avatar.fChooseImg(1,{
						selWidth: '350rpx',
						selHeight: '560rpx'
				})
			},
			// 选择时间
			timeConfirm(e) {
				this.profileData.birthday.content = e.year + '-' + e.month + '-' + e.day
				console.log()
				this.defaultTime = e.year + '-' + e.month + '-' + e.day
			},
			// 选择城市
			// 确认地址
			confirmAddress(pname, cname, pid, cid) {
				this.addressData = {
					pid: pid,
					cid: cid
				}
				this.userCzd = pname + ' - ' + cname
				this.profileData.czd.content = cid
				this.addressPickerShow = false
			},
			// 获取数据
			getUserProfile() {
				UserService.getuserprofile({
					step: 1,
					sex: this.user.gender
				}).then(res => {
					if (res.code === 1) {
						this.profileWorth = res.data.z_worth
						res.data.list.map(item => {
							this.profileData[item.code] = item
						})
						this.userName = this.user.nickname
						this.userGender = this.user.gender === 0 ? '女' : '男'
						this.cover_photo = this.profileData.cover_photo.content
						this.userHeight = this.profileData.height.content
						this.userWeight = this.profileData.weight.content
						this.userBio = this.profileData.bio.content
						this.userAvatar = this.profileData.avatar.content
						if (this.profileData.czd.content) {
							CommonService.getProvince().then(res => {
								if (res.code === 1) {
									let provincelist = JSON.parse(res.data)
									let provincedata = provincelist.filter(item => {
										return Number(item.id) === Number(this.user.province)
									})
									if (provincedata) {
										CommonService.getCity({
											pid: provincedata[0].id
										}).then(city => {
											if (city.code === 1) {
												let citylist = JSON.parse(city.data)
												let citydata = citylist.filter(arr => {
													return Number(arr.id) === Number(this.profileData.czd.content)
												})
												if (citydata) {
													this.addressData = {
														pid: provincedata[0].id,
														cid: citydata[0].id
													}
													this.userCzd = provincedata[0].name + ' - ' +
														citydata[0].name
												}
											}
										})
									}
								}
							})
							CommonService.getCity({
								pid: this.user.province
							}).then(res => {

							})
						}
					}
				})
			},
			heightInput(value) {
				this.profileData.height.content = value
			},
			weightInput(value) {
				this.profileData.weight.content = value
			},
			bioInput(value) {
				this.profileData.bio.content = value
			},
			goBack() {
				uni.navigateBack({
					delta: 1
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background: #FAFAFA;
	}

	.top-nav-box {
		height: 88rpx;
		line-height: 88rpx;
	}

	.mt50 {
		margin-top: 100rpx;
	}

	.profile-avator-box {
		top: -75rpx;
	}

	.heightbox {
		height: 100rpx !important;
	}

	.profile-avator {
		width: 150rpx;
		height: 150rpx;
		border-radius: 150rpx;
	}

	.profile-left {
		width: 130rpx;
	}
  
	.profile-cover {
		width: 200rpx;
		height: 320rpx;
		line-height: 320rpx;
		border-radius: 10rpx;
	}
	.bg-eee{
		background: #EEEEEE;
	}
    .bg-orange-fff{
		background: #F2B27F;
		color: #fff;
	}

</style>
