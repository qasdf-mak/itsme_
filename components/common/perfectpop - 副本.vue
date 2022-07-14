<template>
	<view class="width-full lh1">
		<view class="fixed top35 bottom left right" style="z-index: 9999999;" @click.stop
			@touchmove.stop.prevent="moveHandle">
			<view class="width-full height flex align-items-center flex-center">
				<view class="perfect-box relative">
					<view class="width-full height pt15 pb15 border-box">
						<!-- 步奏条 begin -->
						<view class="ml20 mr20 perfect-top-box flex align-items-center" v-if="perfectIndex < 5">
							<view class="perfect-top-num color-white fs13 fw600 text-center ml10 mr10"
								:class="perfectIndex > 0 ? 'bg-itsme-2' : 'perfect-top-select bg-black'"
								@click="toChangeIndex(1)">
								1
							</view>
							<view class="perfect-top-line flex-1 "
								:class="perfectIndex > 0 ? 'bg-itsme-2' : 'perfect-top-select bg-black'"></view>
							<view class="perfect-top-num  color-white fs13 fw600 text-center ml10 mr10"
								:class="perfectIndex > 1 ? 'bg-itsme-2' : 'perfect-top-select bg-black'"
								@click="toChangeIndex(2)">
								2
							</view>
							<view class="perfect-top-line flex-1 "
								:class="perfectIndex > 1 ? 'bg-itsme-2' : 'perfect-top-select bg-black'"></view>
							<view class="perfect-top-num  color-white fs13 fw600 text-center ml10 mr10"
								:class="perfectIndex > 2 ? 'bg-itsme-2' : 'perfect-top-select bg-black'"
								@click="toChangeIndex(3)">
								3
							</view>
							<view class="perfect-top-line flex-1 "
								:class="perfectIndex > 2 ? 'bg-itsme-2' : 'perfect-top-select bg-black'"></view>
							<view class="perfect-top-num  color-white fs13 fw600 text-center ml10 mr10"
								:class="perfectIndex > 3 ? 'bg-itsme-2' : 'perfect-top-select bg-black'"
								@click="toChangeIndex(4)">
								4
							</view>
						</view>
						<!-- 步奏条 end -->
						<!-- 步奏一  你希望遇到怎样的人？ -->
						<view class="width-full" v-if="perfectIndex === 1">
							<view class="width-full mt15 mb10 fs15 fw600 color-black text-center">
								你希望遇到怎样的人？
							</view>
							<view class="width-full">
								<view v-for="(item,index) in expectData" :key="index">
									<view class="ml12 mr12 flex align-items-center mb8">
										<view class="fs14 color-deep fw600">
											{{item.type_info.type_name}}
										</view>
									</view>
									<view class="ml20 mb10 flex flex-wrap">
										<view v-for="(lable,lindex) in item.list" :key="lindex">
											<view class="lable-item text-center fs12 mb5"
												:class="lable.is_choice === 1 ? 'lable-item-active' : 'lable-item-default'"
												v-if="lindex < 9" @click="choiceLable(index, lindex)">
												{{lable.name}}
											</view>
										</view>
									</view>
								</view>
							</view>
						</view>
						<!-- 步奏一  你希望遇到怎样的人？ -->
						<!-- 步奏二  为自己添加标签 -->
						<view class="width-full" v-if="perfectIndex === 2">
							<view class="width-full mt15 mb10 fs15 color-black fw600 text-center">
								为自己添加标签
							</view>
							<view class="width-full">
								<view v-for="(item,index) in expectData" :key="index">
									<view class="ml12 mr12 flex align-items-center mb8">
										<view class="fs14 color-deep fw600">
											{{item.type_info.type_name}}
										</view>
									</view>
									<view class="ml20 mb10 flex flex-wrap">
										<view v-for="(lable,lindex) in item.list" :key="lindex">
											<view class="lable-item text-center fs12 mb5"
												:class="lable.is_choice === 1 ? 'lable-item-active' : 'lable-item-default'"
												v-if="lindex < 9" @click="choiceLable(index, lindex)">
												{{lable.name}}
											</view>
										</view>
									</view>
								</view>
							</view>
						</view>
						<!-- 步奏二  为自己添加标签 -->
						<!-- 步奏三  填写个人资料 -->
						<view class="width-full" v-if="perfectIndex === 3">
							<view class="width-full mt15 mb10 fs15 fw600 color-black text-center">
								填写个人资料
							</view>
							<view class="ml35 mr35 mt8">
								<view class="ml15 mr15">
									<!-- 封面 -->
									<view class="width-full flex align-items-start">
										<view class="flex-1">
											<view class="width-full fs12 color-deep fw600 mt8">
												上传封面
											</view>
											<view class="width-full fs12 color-999999 pr10 mt12 lh15">
												此照片将展示于主页，尽量上传全身图或半身图
											</view>
										</view>
										<view class="cover-box br5 float-hidden mb10 bg-itsme-14" @click="upCoverImg">
											<view class="width-full height" v-if="coverImg">
												<image :src="coverImg | imageFilter" class="width-full height"
													mode="widthFix"></image>
											</view>
											<view class="width-full height flex align-items-center flex-center" v-else>
												<view class="icon_font fs20 color-white">
													&#xe61d;
												</view>
											</view>
										</view>
									</view>
									<!-- 封面 -->
									<!-- 昵称 -->
									<view class="width-full perfect-lable-item flex align-items-center">
										<view class="perfect-lable-item-left fs12 color-deep fw600">
											昵称
										</view>
										<view class="flex-1 fs12 color-itsme-15">
											<input class="fs12 color-deep" type="text" v-model="nickname"
												placeholder="请输入您的昵称" placeholderStyle="color: #686869" :border="false"
												:custom-style="{'color': '#686869'}" @blur="nicknameBlur" />
										</view>
										<view class="icon_font fs20 pt8 color-man" v-if="user.gender===1">
											&#xe663;
										</view>
										<view class="icon_font fs20 pt8 color-woman" v-else>
											&#xe662;
										</view>
									</view>
									<!-- 昵称 -->
									<!-- 生日 -->
									<view class="width-full perfect-lable-item flex align-items-center"
										@click="showTime = true">
										<view class="perfect-lable-item-left fs12 color-deep fw600">
											生日
										</view>
										<view class="flex-1 fs12 color-itsme-15 fw600"
											v-if="profileData && profileData.birthday && profileData.birthday.content">
											{{profileData.birthday.content}}
										</view>
										<view class="flex-1 fs12 color-itsme-15" v-else>
											请选择日期
										</view>
										<view class="icon_font fs13 color-itsme-15">
											&#xe637;
										</view>
									</view>
									<!-- 生日 -->
									<!-- 身高 -->
									<view class="width-full perfect-lable-item flex align-items-center"
										@click="showHeight = true">
										<view class="perfect-lable-item-left fs12 color-deep fw600">
											身高(cm)
										</view>
										<view class="flex-1 fs12 color-itsme-15 fw600"
											v-if="profileData && profileData.height && profileData.height.content">
											{{profileData.height.content}}
										</view>
										<view class="flex-1 fs12 color-itsme-15" v-else>
											请选择身高
										</view>
										<view class="icon_font fs13 color-itsme-15">
											&#xe637;
										</view>
									</view>
									<!-- 身高 -->
									<!-- 体重 -->
									<view class="width-full perfect-lable-item flex align-items-center"
										@click="showWeight = true">
										<view class="perfect-lable-item-left fs12 color-deep fw600">
											体重(kg)
										</view>
										<view class="flex-1 fs12 color-itsme-15 fw600"
											v-if="profileData && profileData.weight && profileData.weight.content">
											{{profileData.weight.content}}
										</view>
										<view class="flex-1 fs12 color-itsme-15" v-else>
											请选择体重
										</view>
										<view class="icon_font fs13 color-itsme-15">
											&#xe637;
										</view>
									</view>
									<!-- 体重 -->
									<!-- 常驻地 -->
									<view class="width-full perfect-lable-item flex align-items-center"
										@click="addressPickerShow = true">
										<view class="perfect-lable-item-left fs12 color-deep fw600">
											常驻地
										</view>
										<view class="flex-1 fs12 color-itsme-15 fw600" v-if="userCzd">
											{{userCzd}}
										</view>
										<view class="flex-1 fs12 color-itsme-15" v-else>
											请选择常驻地
										</view>
										<view class="icon_font fs13 color-itsme-15">
											&#xe637;
										</view>
									</view>
									<!-- 常驻地 -->
									<!-- 个人简介 -->
									<view class="width-full flex align-items-center">
										<view class="width-full fs12 color-deep fw600 mt10">
											个人简介
										</view>
									</view>
									<view class="width-full">
										<u-input v-model="channel" placeholder="这个人很懒，什么都没留下..." class="fs12 color-deep"
											type="text" placeholderStyle="color: #686869" :border="false"
											:custom-style="{'color': '#686869'}" @input="bioInput" @blur="bioBlur" />
									</view>
									<!-- 个人简介 -->
								</view>
							</view>
						</view>
						<!-- 步奏三  填写个人资料 -->
						<!-- 步奏四  上传头像 -->
						<view class="width-full" v-if="perfectIndex === 4">
							<view class="width-full mt30 flex flex-col flex-center align-items-center">
								<view class="perfect-avator-box" @click="upAvatorImg">
									<view class="width-full height" v-if="avatorImg">
										<image :src="avatorImg | avatarFormat" class="width-full height" mode="widthFix">
										</image>
									</view>
									<view class="width-full height flex align-items-center flex-center bg-itsme-14"
										v-else>
										<view class="icon_font fs23 color-white">
											&#xe61d;
										</view>
									</view>
								</view>
								<view class="fs13 color-deep fw600 mt10">
									上传头像
								</view>
							</view>
							<view class="ml35 mr35 mt25">
								<view class="width-full flex align-items-center mb15">
									<image src="../../static/base/face_1.png" class="perfect-img-1" mode="widthFix">
									</image>
									<view class="fs13 color-main6 fw600 ml5">
										认证要求：
									</view>
								</view>
								<view class="width-full flex align-items-center flex-between">
									<view v-for="(item, index) in examples" :key="index">
										<view class="perfect-avator-list relative">
											<image :src="item.img" class="perfect-avator-list" mode="widthFix"></image>
										</view>
									</view>
								</view>
								<view class="width-full fs12 color-999999 fw600 text-center mt15">
									*上传的照片，会自动上传到相册
								</view>
								<view class="width-full mt25" v-if="user.gender === 0">
									<view class="width-full flex align-items-center mb10">
										<image src="../../static/base/face_2.png" class="perfect-img-2" mode="widthFix">
										</image>
										<view class="fs13 ml5 color-main6">
											认证特权：
										</view>
									</view>
									<view class="width-full fs12 color-999999 lh18">
										1.开启无限畅聊<br />
										2.获得每日登录领会员券的资格<br />
										3.认证完成得佣金，可提现
									</view>
								</view>
							</view>
						</view>
						<!-- 步奏四  上传头像 -->
						<!-- 真人认证完成 -->
						<view class="width-full height flex align-items-center flex-col flex-center"
							v-if="perfectIndex === 5">
							<image src="../../static/base/base_15.png" class="rztg-img" mode="widthFix"></image>
							<view class="mt35 fs20 color-deep fw600">
								真人认证
							</view>
							<view class="mt20 fs15 color-deep mb35 pb35">
								恭喜您，您的真人认证已通过认证
							</view>
						</view>
						<!-- 真人认证完成 -->
					</view>
					<view class="absolute top right">
						<view class="icon_font color-bbbbbb fs15 pt8 pb5 pl5 pr8" @click="closebtn">
							&#xe635;
						</view>
					</view>
					<view class="absolute left right flex align-items-center flex-center perfect-bot-box"
						v-if="perfectIndex < 4">
						<image src="../../static/base/pop-btn.png" class="perfect-bot btn-box" mode="scaleToFill"
							@click="nextStep"></image>
					</view>
					<view class="absolute left right flex flex-col align-items-center flex-center perfect-face-box"
						v-if="perfectIndex === 4 && !isReal">
						<view class="fs12 color-666666 text-center perfect-face-no" @click="closePerfectPop"
							v-if="user && user.gender && user.gender === 1">
							暂不认证
						</view>
						<view class="fs16 color-white text-center perfect-face-yes" @click="toStartFace">
							立即认证
						</view>
					</view>
					<view class="absolute left right flex flex-col align-items-center flex-center perfect-face-box"
						v-if="perfectIndex === 4 && isReal">
						<view class="fs16 color-white text-center perfect-face-yes" @click="toStartFace">
							完成
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 图片裁切 -->
		<yq-avatar @upload="myUpload" ref="avatar"></yq-avatar>
		<!-- 时间选择器 -->
		<view class="width-full" v-if="showTime">
			<u-picker mode="time" v-model="showTime" :params="timeParams" :default-time="defaultTime" :start-year="1960"
				:end-year="2002" z-index="99999999" safe-area-inset-bottom @confirm="timeConfirm"></u-picker>
		</view>
		<!-- 时间选择器 -->
		<!-- 选择身高 -->
		<view class="width-full" v-if="showHeight">
			<u-picker title="身高(cm)" mode="selector" v-model="showHeight" :range="heightList"
				:default-selector="heightDefault" z-index="99999999" safe-area-inset-bottom @confirm="heightConfirm">
			</u-picker>
		</view>
		<!-- 选择身高 -->
		<!-- 选择体重 -->
		<view class="width-full" v-if="showWeight">
			<u-picker title="体重(kg)" mode="selector" v-model="showWeight" :range="weightList"
				:default-selector="weightDefault" z-index="99999999" safe-area-inset-bottom @confirm="weightConfirm">
			</u-picker>
		</view>
		<!-- 选择体重 -->
		<!-- 地址筛选器 -->
		<address-picker :addressPickerShow="addressPickerShow" :addressid="addressData"
			@cancelAddress="addressPickerShow = false" @confirmAddress="confirmAddress"></address-picker>
		<!-- 地址筛选器 -->
		<!-- 权限弹窗 -->
		<unify-pop :showUnify="showUnifyPop" :type="unifyType" @closePop="showUnifyPop = false"
			@closePopCancel="closePopCancel" @NoPerfectCancel="NoPerfectCancel" @popMaleConfirm="popMaleConfirm">
		</unify-pop>
		<!-- 权限弹窗 -->
		<u-toast ref="uToast" z-index="99999999" />
	</view>
</template>

<script>
	import {
		mapGetters
	} from 'vuex'
	import {
		base64ToPath,
		pathToBase64
	} from '../../js_sdk/gsq-image-tools/image-tools'
	import UserService from '../../common/service/user-service.js'
	import CommonService from '../../common/service/common-service.js'
	import uploadImg from '../../common/utils/upload-img.js'
	import yqAvatar from '../../components/yq-avatar/yq-avatar.vue'
	import updateUser from '../../common/mixins/login.js'
	import addressPicker from '../../components/common/addresspicker.vue'
	import {
		formatImage
	} from '../../common/utils/common-methods'

	import {
		faceFind
	} from '../../common/appjs/face.js'
	export default {
		mixins: [updateUser],
		name: 'perfect-pop',
		data() {
			return {
				perfectIndex: 1,
				expectData: null,
				profileData: {},
				coverImg: '',
				nickname: '',
				channel: '',
				username: '',
				avatorImg: '',
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
				showHeight: false,
				heightList: [],
				heightDefault: [],
				showWeight: false,
				weightList: [],
				weightDefault: [],
				userCzd: '',
				addressPickerShow: false,
				faceImg: '',
				addressData: {
					pid: '',
					cid: ''
				},
				showClosePop: false,
				examples: [{
						img: '../../static/itsme/itsme_31.png',
					},
					{
						img: '../../static/itsme/itsme_30.png',
					},
					{
						img: '../../static/itsme/itsme_29.png',
					},
					{
						img: '../../static/itsme/itsme_28.png',
					}
				]
			}
		},
		props: {
			perfectNum: Number
		},
		computed: {
			...mapGetters(['address']),
			isReal() {
				if (this.user.is_real === 1) {
					return true
				} else {
					return false
				}
			}
		},
		components: {
			yqAvatar,
			addressPicker
		},
		mounted() {
			this.heightList = this.$jsonBasic.heightList
			this.weightList = this.$jsonBasic.weightList
			this.getLabel()
			this.getUserProfile()
			if (this.perfectNum) {
				this.perfectIndex = this.perfectNum
			}
		},
		methods: {
			// 头部切换
			toChangeIndex(index) {
				if (index < this.perfectIndex) {
					this.perfectIndex = index
					if (index === 1 || index === 2) {
						this.getLabel()
					}
				}
			},
			closePerfectPop() {
				this.$emit('closePerfectPop')
			},
			refreshTheList() {
				this.$emit('refreshTheList', JSON.stringify(this.expectData))
			},
			// 获取标签
			getLabel() {
				console.log(this.perfectIndex)
				setTimeout(() => {
					UserService.getuserexpect({
						step: this.perfectIndex,
						sex: this.user.gender
					}).then(res => {
						if (res.code === 1) {
							this.expectData = res.data
						}
					})
				}, 100)
			},
			moveHandle() {

			},
			popMaleConfirm() {
				this.showUnifyPop = false
				uni.reLaunch({
					url: '/pages/login/sex'
				})
			},
			// 系统补充默认项
			NoPerfectCancel() {
				this.showUnifyPop = false
				if (!this.profileData.birthday.content) {
					if (this.user && this.user.gender && this.user.gender === 1) {
						this.profileData.birthday.content = this.$jsonBasic.baseUserBoy.birthday
					} else {
						this.profileData.birthday.content = this.$jsonBasic.baseUserGirl.birthday
					}
				}
				if (!this.profileData.height.content) {
					if (this.user && this.user.gender && this.user.gender === 1) {
						this.profileData.height.content = this.$jsonBasic.baseUserBoy.height
					} else {
						this.profileData.height.content = this.$jsonBasic.baseUserGirl.height
					}
				}
				if (!this.profileData.weight.content) {
					if (this.user && this.user.gender && this.user.gender === 1) {
						this.profileData.weight.content = this.$jsonBasic.baseUserBoy.weight
					} else {
						this.profileData.weight.content = this.$jsonBasic.baseUserGirl.weight
					}
				}
				if (!this.profileData.czd.content) {
					console.log(this.address)
					if (this.address) {
						this.addressData = {
							pid: this.address.province.id,
							cid: this.address.city.id
						}
						this.userCzd = this.address.province.name + ' - ' + this.address.city.name
						this.profileData.czd.content = this.address.city.id
					} else {
						this.addressData = {
							pid: 1,
							cid: 2
						}
						this.userCzd = '北京 - 北京市'
						this.profileData.czd.content = 2
					}
				}
				setTimeout(() => {
					this.perfectIndex = 4
				}, 500)
				this.confirmProfile()
			},
			// 关闭按钮
			closePopCancel() {
				this.showClosePop = false
				this.$emit('closePerfectPop')
			},
			//关闭 X X
			closebtn() {
				if (this.user.gender === 0 && this.user && this.user.certify === null) {
					this.unifyType = 19
					this.showUnifyPop = true
				} else {
					this.unifyType = 9
					this.showUnifyPop = true
				}
			},
			// 获取数据
			getUserProfile() {
				UserService.getuserprofile({
					step: 1,
					sex: this.user.gender
				}).then(res => {
					console.log(res)
					if (res.code === 1) {
						res.data.list.map(item => {
							this.profileData[item.code] = item
						})
						if (this.profileData && this.profileData.cover_photo && this.profileData.cover_photo
							.content) {
							this.coverImg = this.profileData.cover_photo.content
						}
						if (this.profileData && this.profileData.avatar && this.profileData.avatar.content) {
							this.avatorImg = this.profileData.avatar.content
						}
						if (this.profileData && this.profileData.nickname && this.profileData.nickname.content) {
							this.nickname = this.profileData.nickname.content
						} else {
							this.nickname = this.user.nickname
						}
						this.channel = this.profileData.bio.content
						if (this.profileData && this.profileData.height && this.profileData.height.content) {
							let index = this.heightList.indexOf(Number(this.profileData.height.content))
							if (index !== -1) {
								this.heightDefault.push(index)
							} else {
								this.heightDefault = [15]
							}
						} else {
							this.heightDefault = [15]
						}
						if (this.profileData && this.profileData.cover_photo && this.profileData.cover_photo
							.content) {
							this.coverImg = this.profileData.cover_photo.content
						}
						if (this.profileData && this.profileData.weight && this.profileData.weight.content) {
							let index = this.weightList.indexOf(Number(this.profileData.weight.content))
							if (index !== -1) {
								this.weightDefault.push(index)
							} else {
								this.weightDefault = [15]
							}
						} else {
							this.weightDefault = [15]
						}
						if (this.profileData && this.profileData.czd && this.profileData.czd.content) {
							CommonService.getProvince().then(res => {
								if (res.code === 1) {
									let provincelist = JSON.parse(res.data)
									let provincedata = provincelist.filter(item => {
										return Number(item.id) === Number(this.user.province)
									})
									if (provincedata && provincedata.length > 0) {
										CommonService.getCity({
											pid: provincedata[0].id
										}).then(city => {
											if (city.code === 1) {
												let citylist = JSON.parse(city.data)
												let citydata = citylist.filter(arr => {
													return Number(arr.id) === Number(this
														.profileData.czd.content)
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
						}
						this.$forceUpdate()
					}
				})
			},
			// 选择标签
			choiceLable(index, lindex) {
				if (this.perfectIndex === 2 && index === 1) {
					if (this.expectData[index].list[lindex].is_choice === 0) {
						this.expectData[index].list = this.expectData[index].list.map(item => {
							item.is_choice = 0
							return item
						})
						this.expectData[index].list[lindex].is_choice = 1
					} else {
						this.expectData[index].list[lindex].is_choice = 0
					}
				} else {
					if (this.expectData[index].list[lindex].is_choice === 0) {
						this.expectData[index].list[lindex].is_choice = 1
					} else {
						this.expectData[index].list[lindex].is_choice = 0
					}
				}
				this.refreshTheList()
			},
			// 上传封面图
			upCoverImg() {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], //从相册选择
					success: (res) => {
						if (res.errMsg === 'chooseImage:ok' && res.tempFilePaths && res.tempFilePaths.length >
							0) {
							let images = []
							images.push(res.tempFilePaths[0])
							this.coverImg = res.tempFilePaths[0]
							this.uploadFile(res.tempFilePaths[0]).then(
								(res) => {
									this.profileData.cover_photo.content = res
									this.confirmProfile()
								}
							)
						}
					}
				})
			},
			// 上传头像
			upAvatorImg() {
				this.$refs.avatar.fChooseImg(0, {
					selWidth: '300rpx',
					selHeight: '300rpx'
				})
			},
			// 上传头像
			myUpload(rsp) {
				let images = []
				images.push(rsp.path)
				// 头像
				console.log(images)
				console.log('头像')
				if (rsp.index === 0) {
					this.avatorImg = rsp.path
					this.uploadFile(rsp.path).then(
						(res) => {
							console.log(res)
							this.profileData.avatar.content = res
							this.confirmProfile()
						}
					)
				}
			},
			// 选择生日
			timeConfirm(e) {
				this.profileData.birthday.content = e.year + '-' + e.month + '-' + e.day
				this.defaultTime = e.year + '-' + e.month + '-' + e.day
				this.confirmProfile()
			},
			// 选择身高
			heightConfirm(e) {
				this.profileData.height.content = this.heightList[e[0]]
				this.heightDefault = e
				this.confirmProfile()
			},
			// 选择体重
			weightConfirm(e) {
				this.profileData.weight.content = this.weightList[e[0]]
				this.weightDefault = e
				this.confirmProfile()
			},
			// 确认地址
			confirmAddress(pname, cname, pid, cid) {
				this.addressData = {
					pid: pid,
					cid: cid
				}
				this.userCzd = pname + ' - ' + cname
				this.profileData.czd.content = cid
				this.addressPickerShow = false
				this.confirmProfile()
			},
			// 个人简介
			bioInput(value) {
				console.log(this.$u.trim(value))
				this.channel = this.$u.trim(value)
			},
			bioBlur() {
				console.log(this.$u.trim(this.channel))
				this.profileData.bio.content = this.$u.trim(this.channel)
				this.confirmProfile()
			},
			//昵称
			nicknameBlur() {
				this.profileData.nickname.content = this.nickname
				this.confirmProfile()
			},
			// 提交资料
			confirmProfile() {
				console.log('更新')
				let profileList = []
				profileList.push(this.profileData.avatar)
				profileList.push(this.profileData.cover_photo)
				profileList.push(this.profileData.birthday)
				profileList.push(this.profileData.bio)
				profileList.push(this.profileData.czd)
				profileList.push(this.profileData.height)
				profileList.push(this.profileData.weight)
				profileList.push(this.profileData.nickname)
				console.log(profileList)
				let data = JSON.stringify(profileList)
				UserService.setuserprofile({
					data: data
				}).then(res => {
					this.updateUser().then(() => {
						console.log('更新成功')
						this.$forceUpdate()
					})
				})
			},
			nextStep() {
				//  第一步
				if (this.perfectIndex === 1) {
					let expect = JSON.parse(JSON.stringify(this.expectData)).map(item => {
						item.list = item.list.filter(lable => {
							return lable.is_choice === 1
						})
						return item
					}).filter(item => {
						return item.list.length > 0
					})
					if (expect.length < this.expectData.length) {
						this.$refs.uToast.show({
							title: '每项至少选择一个标签'
						})
						return false
					}
					UserService.setuserexpect({
						data: JSON.stringify(this.expectData)
					}).then(res => {
						console.log(res)
						if (res.code === 1) {
							this.perfectIndex = 2
							this.getLabel()
						}
					})
					return false
				}
				//  第二步
				if (this.perfectIndex === 2) {
					let expect = JSON.parse(JSON.stringify(this.expectData)).map(item => {
						item.list = item.list.filter(lable => {
							return lable.is_choice === 1
						})
						return item
					}).filter(item => {
						return item.list.length > 0
					})
					if (expect.length < this.expectData.length) {
						this.$refs.uToast.show({
							title: '每项至少选择一个标签'
						})
						return false
					}
					UserService.setuserexpect({
						data: JSON.stringify(this.expectData)
					}).then(res => {
						console.log(res)
						if (res.code === 1) {
							this.perfectIndex = 3
						}
					})
					return false
				}
				//  第三步
				if (this.perfectIndex === 3) {
					if (this.coverImg && this.profileData.birthday.content && this.profileData.height
						.content &&
						this
						.profileData.weight.content && this.profileData.czd.content) {
						this.perfectIndex = 4
					} else {
						if (!this.coverImg) {
							this.$refs.uToast.show({
								title: '请上传封面',
								icon: 'none'
							})
						} else {
							this.unifyType = 10
							this.showUnifyPop = true
						}

					}
					return false
				}
			},
			// 人脸认证
			toStartFace() {
				if (this.isReal) {
					this.$emit('closePerfectPop')
					return false
				}
				if (!this.profileData.avatar.content) {
					this.$refs.uToast.show({
						title: '请上传您的头像'
					})
					return false
				}
				if (this.platform !== 'APP') {
					this.perfectIndex = 5
					setTimeout(() => {
						this.closePerfectPop()
					}, 1500)
					return false
				}
				faceFind().then(
					img => {
						this.faceImg = img
						UserService.baiduFace({
							image: img
						}).then(res => {
							console.log(res)
							// this.faceSuccess()
							if (res.code === 1 && res.data && res.data.result && res.data.result
								.face_num ===
								1) {
								let gender = res.data.result.face_list[0].gender.type
								if ((this.user.gender === 1 && gender === 'male') || (this.user
										.gender === 0 &&
										gender === 'female')) {
									this.faceSuccess()
									console.log('认证环节2121')
								} else {
									console.log('认证环节2121')
									if (this.user.gender === 0 && gender === 'male') {
										this.unifyType = 11
										this.showUnifyPop = true
									} else {
										this.unifyType = 13
										this.showUnifyPop = true
									}
								}
							} else {
								this.unifyType = 13
								this.showUnifyPop = true
							}
						})
					},
					() => {
						this.unifyType = 13
						this.showUnifyPop = true
					}
				)
			},
			// 人脸认证成功
			faceSuccess() {
				uni.showLoading({
					title: '审核中'
				})
				console.log('认证环节2121')
				let imgUrl = formatImage(this.profileData.avatar.content)
				uni.downloadFile({
					url: imgUrl,
					success: (img) => {
						if (img.statusCode === 200) {
							pathToBase64(img.tempFilePath)
								.then(base64 => {
									UserService.baiduFaceBd({
										image1: this.faceImg,
										image2: base64.substring(base64.indexOf(
												';base64,') + 8,
											base64.length)
									}).then(res => {
										// this.toUpFaceImg()
										if (res.code === 1 && res.data && res.data
											.result && res
											.data.result.score >= 50) {
											this.toUpFaceImg()
										} else {
											uni.hideLoading()
											this.unifyType = 12
											this.showUnifyPop = true
										}
									})
								})
								.catch(error => {
									uni.hideLoading()
									this.unifyType = 12
									this.showUnifyPop = true
									console.error(error)
								})
						} else {
							uni.hideLoading()
							this.unifyType = 12
							this.showUnifyPop = true
						}
					}
				})
			},
			toUpFaceImg() {
				let imgList = []
				let base64 = 'data:image/jpeg;base64,' + this.faceImg
				base64ToPath(base64)
					.then(path => {
						imgList.push(path)
						uploadImg(imgList).then(imgs => {
							let certifyItem = JSON.stringify({
								img: imgs[0]
							})
							UserService.updateusercertify({
								code: 'real',
								certify_item: certifyItem
							}).then(res => {
								console.log(res)
								uni.hideLoading()
								this.perfectIndex = 5
								setTimeout(() => {
									this.closePerfectPop()
								}, 1500)
								this.updateUser().then(() => {
									console.log('认证成功')
									CommonService.buryingPoint({
										text: '完成真人认证',
										val1: '新手任务'
									}).then(res => {
										console.log('成功')
									})
								})
							})
						})
					})
					.catch(error => {
						console.error(error)
					})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.perfect-box {
		width: 600rpx;
		height: 920rpx;
		border-radius: 18rpx;
		background: rgba($color: #ffffff, $alpha: 0.8);
		box-shadow: 0 0 22rpx rgba(0, 0, 0, 0.4);
	}

	.perfect-top-box {
		height: 30rpx;
	}

	.perfect-top-num {
		width: 30rpx;
		height: 30rpx;
		line-height: 29rpx;
		border-radius: 30rpx;
	}

	.perfect-top-line {
		height: 6rpx;
		border-radius: 3rpx;
	}

	.perfect-top-default {
		opacity: 1.0;
	}

	.perfect-top-select {
		opacity: 0.5;
	}

	.lable-item {
		width: 150rpx;
		height: 50rpx;
		margin-right: 32rpx;
		line-height: 48rpx;
		border-radius: 50rpx;
	}

	.lable-item-default {
		background: #FFFFFF;
		color: #666666;
		border: 2rpx solid #DDDDDD;
	}

	.lable-item-active {
		background: #D97DB0;
		color: #fff;
		border-radius: 27px;
	}

	.perfect-bot-box {
		bottom: -45rpx;
	}

	.perfect-bot {
		width: 90rpx;
		height: 90rpx;
	}

	.cover-box {
		width: 110rpx;
		height: 176rpx;
	}

	.perfect-lable-item {
		height: 70rpx;
	}

	.perfect-lable-item-left {
		width: 140rpx;
	}

	.perfect-avator-box {
		width: 160rpx;
		height: 160rpx;
		border-radius: 160rpx;
		overflow: hidden;
		background: #FFFFFF;
		border: 1rpx solid #E7E7E7;
	}

	.perfect-img-1 {
		width: 28rpx;
		height: 28rpx;
	}

	.perfect-avator-list {
		width: 105rpx;
		height: 105rpx;
		border-radius: 10rpx;
		overflow: hidden;
	}

	.perfect-avator-bot-1 {
		height: 30rpx;
		background: #73DA5F;
	}

	.perfect-avator-bot-2 {
		height: 30rpx;
		background: #DA5F5F;
	}

	.perfect-img-2 {
		width: 28rpx;
	}

	.rztg-img {
		width: 200rpx;
	}

	.perfect-face-box {
		bottom: -35rpx;
	}

	.perfect-face-no {
		height: 40rpx;
		line-height: 40rpx;
		border-bottom: 1rpx solid #666666;
		margin-bottom: 16rpx;
	}

	.color-woman {
		color: rgb(205, 120, 166);
	}

	.color-man {
		color: rgb(58, 136, 201);
	}

	.perfect-face-yes {
		width: 220rpx;
		height: 70rpx;
		line-height: 68rpx;
		border-radius: 70rpx;
		background: linear-gradient(159deg, #D97DB0 0%, #F565A2 100%);
	}

	.fs5 {
		font-size: 10rpx;
	}
</style>
