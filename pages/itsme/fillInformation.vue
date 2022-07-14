<template>
	<view class="width-full">
		<view class="width-full flex flex-center mt30 " @click="upAvatorImg">
			<view class="width-full height avatar-box-1" v-if="avatorImg">
				<image :src="avatorImg | avatarFormat" class="avatar-box-1" mode="widthFix">
				</image>
			</view>
			<view class="flex flex-center" v-else>
				<view class="avatar-box relative"
					:class="user && user.gender && user.gender === 1 ? 'avatar-1':'avatar-0'"></view>
				<image src="/static/itsme/itsme_75.png" class="avatar-border absolute top-8 mt30" mode="widthFix">
				</image>
				<image src="/static/itsme/itsme_76.png" class="avatar-center absolute top-50 mt30" mode="widthFix">
				</image>
			</view>
		</view>
		<view class="width-full pl30 pr30 flex flex-between mt15">
			<image src="/static/itsme/itsme_31.png" class="img-pop br10" mode="widthFix"></image>
			<image src="/static/itsme/itsme_28.png" class="img-pop br10" mode="widthFix"></image>
			<image src="/static/itsme/itsme_29.png" class="img-pop br10" mode="widthFix"></image>
			<image src="/static/itsme/itsme_30.png" class="img-pop br10" mode="widthFix"></image>
		</view>
		<view class="width-full ml15 mt25" v-for="(item,index) in expectList" :key="index">
			<view class="width-full mb10 fs15 fw600 color-white">
				{{item.type_info.type_name}} <!-- <text class="fw400">（最多可选9项）</text> -->
			</view>
			<view class="width-full">
				<view class=" mb10 flex flex-wrap ">
					<view v-for="(lable,lindex) in item.list" :key="lindex">
						<view class="expect-box text-center fs12 mb5 mr20 mb10 border-box"
							:class="lable.is_choice === 1 ? 'expect-box-checked' : 'expect-box'"
							@click="choiceLable(index, lindex)">
							<text class=" fs14"
								:class="lable.is === 1 ? 'color-itsme-2' : 'text-expect-box'">{{lable.name}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="width-full pl15 mt25" v-if="isFinish">
			<view class="width-full mb10 fs15 fw600 color-white">
				基础信息
			</view>
			<view class="mt20">
				<!-- 昵称 -->
				<view class="width-full flex align-items-center mt20">
					<view class=" fs14 text-expect-box">
						昵 称 :
					</view>
					<view class="ml30 flex-1">
						<input class="fs14 color-itsme-15 fw600" type="text" v-model="nickname" placeholder="请输入您的昵称"
							placeholderStyle="color: #686869" :border="false" :custom-style="{'color': '#686869'}" />
					</view>
					<view class="icon_font fs16 color-man pr20" v-if="user.gender===1">
						&#xe663;
					</view>
					<view class="icon_font fs16 color-woman pr20" v-else>
						&#xe662;
					</view>
				</view>
				<!-- 昵称 -->
				<!-- 生日 -->
				<view class="width-full flex align-items-center mt20" @click="showTime = true">
					<view class=" fs14 text-expect-box">
						生 日 :
					</view>
					<view class="ml30 flex-1">
						<view class=" fs14 color-itsme-15 fw600" v-if="birthday">
							{{ birthday }}
						</view>
						<view class=" fs14 color-itsme-15" v-else>
							请选择日期
						</view>
					</view>
					<view class="icon_font fs16 color-itsme-15 pr20">
						&#xe637;
					</view>
				</view>
				<!-- 生日 -->
				<!-- 身高 -->
				<view class="width-full flex align-items-center mt20" @click="showHeight = true">
					<view class=" fs14 text-expect-box">
						身 高 :
					</view>
					<view class="ml30 flex-1">
						<view class=" fs14 color-itsme-15 fw600" v-if="height">
							{{ height }}
						</view>
						<view class=" fs14 color-itsme-15" v-else>
							请选择
						</view>
					</view>
					<view class="icon_font fs16 color-itsme-15 pr20">
						&#xe637;
					</view>
				</view>
				<!-- 身高 -->
				<!-- 体重 -->
				<view class="width-full flex align-items-center mt20" @click="showWeight = true">
					<view class=" fs14 text-expect-box">
						体 重 :
					</view>
					<view class="ml30 flex-1">
						<view class=" fs14 color-itsme-15 fw600" v-if="weight">
							{{ weight }}
						</view>
						<view class=" fs14 color-itsme-15" v-else>
							请选择
						</view>
					</view>
					<view class="icon_font fs16 color-itsme-15 pr20">
						&#xe637;
					</view>
				</view>
				<!-- 体重 -->
				<!-- 常住地 -->
				<view class="width-full flex align-items-center mt20" @click="addressPickerShow = true">
					<view class=" fs14 text-expect-box width-100">
						常住地 :
					</view>
					<view class="ml20 flex-1">
						<view class=" fs14 color-itsme-15 fw600" v-if="czd">
							{{ czd }}
						</view>
						<view class=" fs14 color-itsme-15" v-else>
							请选择
						</view>
					</view>
					<view class="icon_font fs16 color-itsme-15 pr20">
						&#xe637;
					</view>
				</view>
				<!-- 常住地 -->
			</view>
		</view>
		<view class="width-full pl15 mt30 mb30">
			<view class="width-full mb20 fs15 fw600 color-white">
				相册
			</view>
			<view class="width-full flex mt20">
				<view class="flex" v-if="photoData && photoData.length > 0">
					<view class="mr18" v-for="(item,index) in photoData" :key="index">
						<edit-photo :item="item" @delPhoto="delPhoto(index)" @setPhoto="setPhoto($event, index)">
						</edit-photo>
					</view>
				</view>
				<view class="photo-box flex align-items-center flex-center" v-if="photoData && photoData.length < 3"
					@click="showOtherSheet = true">
					<image src="/static/itsme/itsme_77.png" class="photo-center" mode="widthFix"></image>
				</view>
			</view>
		</view>
		<view class="width-full flex flex-center pt30">
			<view class="information-btn text-center" @click="submitInformation">
				下一步
			</view>
		</view>
		<view class="pb35"> </view>
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
		<unify-pop :showUnify="showUnifyPop" :type="unifyType" @closePop="showUnifyPop = false"
			@NoPerfectCancel="NoPerfectCancel">
		</unify-pop>
		<view class="itsme-action-sheet-box">
			<u-action-sheet :list="sheetotherlist" v-model="showOtherSheet" @click="clickOtherSheet"></u-action-sheet>
		</view>
		<u-toast ref="uToast" z-index="99999999" />
		<red-packet></red-packet>
	</view>
</template>

<script>
	import UserService from 'common/service/user-service.js'
	import CommonService from 'common/service/common-service.js'
	import yqAvatar from 'components/yq-avatar/yq-avatar.vue'
	import addressPicker from 'components/common/addresspicker.vue'
	import editPhoto from 'components/photo/edit.vue'
	import updateUser from 'common/mixins/login.js'
	import {
		mapGetters,
		mapActions
	} from 'vuex'
	export default {
		mixins: [updateUser],
		data() {
			return {
				showTime: false,
				showUnifyPop: false,
				showHeight: false,
				showWeight: false,
				addressPickerShow: false,
				birthday: null,
				nickname: null,
				avatorImg: null,
				height: null,
				weight: null,
				czd: null,
				profession: null,
				expectData: [],
				photoData: [],
				heightDefault: [],
				weightDefault: [],
				weightList: [],
				heightList: [],
				expectList: null,
				showOtherSheet: false,
				sheetotherlist: [{
						text: '拍摄'
					},
					{
						text: '从相册选择'
					}
				],
				addressData: {
					pid: '',
					cid: ''
				},
				city: null,
				timeParams: {
					year: true,
					month: true,
					day: true,
					hour: false,
					minute: false,
					second: false
				},
				isExpect: false,
				isFinish: false,
				defaultTime: '2000-01-01',
			}
		},
		computed: {
			...mapGetters(['address', 'user', 'pushPop', 'showProfile']),
		},
		components: {
			yqAvatar,
			addressPicker,
			editPhoto
		},
		onLoad(options) {
			this.heightList = this.$jsonBasic.heightList
			this.weightList = this.$jsonBasic.weightList
			
			if (this.user) {
				console.log(this.user)
				console.log('11111111111')
				if (this.user.avatar) {
					this.avatorImg = this.user.avatar
				}
				console.log('2222222222222')
				if (this.user.birthday) {
					this.birthday = this.user.birthday
				}
				console.log('3333333333333')
				if (this.user.height) {
					this.height = this.user.height
				}
				console.log('4444444444444')
				if (this.user.weight) {
					this.weight = this.user.weight
				}
				console.log('55555555555')
				if (this.user.city) {
					this.czd = this.user.city
				}
				console.log('66666666666')
				if (this.user.city_id) {
					this.city = this.user.city_id
				}
				console.log('7777777777')
				if (this.user.profession) {
					this.profession = this.user.profession
				}
				console.log('88888888888')
				if (this.user.nickname) {
					this.nickname = this.user.nickname
				}
				this.isFinish = true
			}
			if(options && options.name){
				this.nickname = options.name
			}
			setTimeout(() => {
				this.getLabel()
			}, 500)
			console.log(this.pushPop)
			if (this.pushPop) {
				console.log('111111111111111111')
				this.pushPopReal()
				this.PUSHPOP(false)
			}
		},
		methods: {
			...mapActions(['SHOW_PROFILE', 'PUSHPOP']),
			// 上传头像
			upAvatorImg() {
				this.$refs.avatar.fChooseImg(0, {
					selWidth: '300rpx',
					selHeight: '300rpx'
				})
			},
			pushPopReal() {
				CommonService.buryingPoint({
					text: '完成真人认证',
					val1: '新手任务'
				}).then(res => {
					console.log('成功')
				})
			},
			myUpload(rsp) {
				let that = this
				let images = []
				images.push(rsp.path)
				console.log(rsp)
				// 头像
				if (rsp.index === 0) {
					console.log(rsp.path)
					this.uploadFile(rsp.path).then(
						(res) => {
							that.avatorImg = res
						}
					)
				}
			},
			//选择方式（相册/拍照）
			clickOtherSheet(index) {
				if (index === 0) {
					console.log(123)
					this.addPhoto('camera')
					console.log(123)
				} else {
					console.log(456)
					this.addPhoto('album')
					console.log(456)
				}
			},
			// 删除照片
			delPhoto(index) {
				this.photoData.splice(index, 1)
			},
			setPhoto(item, index) {
				this.photoData[index] = item
			},
			// 显示加载弹框
			toShowToast(type, title) {
				this.toastType = type
				this.toastTitle = title
				this.showToast = true
			},
			// 隐藏加载弹框
			toHideToast() {
				this.toastType = ''
				this.toastTitle = ''
				this.showToast = false
			},
			// 添加照片
			addPhoto(type) {
				let sourceType = []
				if (type === 'camera') {
					sourceType = ['camera']
				} else {
					sourceType = ['album']
				}
				let count = 3
				if (this.photoList && this.photoList.length > 0) {
					count = 3 - this.photoList.length
				}
				let that = this
				uni.chooseImage({
					count: count, //可以选择多少张图片
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: sourceType, //相册或者相机拍摄
					success: (res) => {
						if (res.errMsg === 'chooseImage:ok' && res.tempFilePaths && res.tempFilePaths
							.length >
							0) {
							that.toShowToast('load', '上传中')
							let photolist = []
							for (let i = 0; i < res.tempFilePaths.length; i++) {
								that.uploadFile(res.tempFilePaths[i]).then(
									(res) => {
										if (res) {
											Promise.all([
												photolist = photolist.concat(res)
											]).then(() => {
												console.log(photolist)
												this.photoData = this.photoData.concat(photolist
													.map(img => {
														let item = {}
														item.url = img
														console.log(img)
														item.type = 'itsme_image'
														item.rule_type = 2
														item.price = 0
														return item
													}))
											})
										}
									}
								)
							}

						}
					},
					error: (err) => {
						console.log(err)
					},
				})
			},
			// 选择生日
			timeConfirm(e) {
				this.birthday = e.year + '-' + e.month + '-' + e.day
			},
			// 选择身高
			heightConfirm(e) {
				console.log(e)
				this.height = this.heightList[e[0]]
			},
			// 选择体重
			weightConfirm(e) {
				this.weight = this.weightList[e[0]]
			},
			getLabel() {
				UserService.getuserexpect({
					step: 2,
				}).then(res => {
					if (res.code === 1) {
						this.expectList = res.data
						let isExpectItem = []
						isExpectItem = this.expectList[1].list.filter(item => item.is_choice === 1)
						this.expectData = isExpectItem.map(item => item.id)
						this.profession = this.expectList[0].list.filter(item => item.is_choice === 1)[0].id
					}
				})
			},
			choiceLable(index, lindex) {
				if (index === 0) {
					if (this.expectList[index].list[lindex].is_choice === 0) {
						this.expectList[index].list = this.expectList[index].list.map(item => {
							item.is_choice = 0
							return item
						})
						this.expectList[index].list[lindex].is_choice = 1
						this.profession = this.expectList[index].list[lindex].id
					} else {
						this.expectList[index].list[lindex].is_choice = 0
					}
				} else {
					if (this.expectList[index].list[lindex].is_choice === 0) {
						this.expectList[index].list[lindex].is_choice = 1
					} else {
						this.expectList[index].list[lindex].is_choice = 0
					}
					let expList = []
					expList = this.expectList[index].list.filter(item => item.is_choice === 1)
					this.expectData = expList.map(item => item.id)
					console.log(this.expectData)
				}
			},
			NoPerfectCancel() {
				this.showUnifyPop = false
				let isfish = false
				if (!this.birthday) {
					if (this.user && this.user.gender && this.user.gender === 1) {
						this.birthday = this.$jsonBasic.baseUserBoy.birthday
					} else {
						this.birthday = this.$jsonBasic.baseUserGirl.birthday
					}
				}
				if (!this.height) {
					if (this.user && this.user.gender && this.user.gender === 1) {
						this.height = this.$jsonBasic.baseUserBoy.height
					} else {
						this.height = this.$jsonBasic.baseUserGirl.height
					}
				}
				if (!this.weight) {
					if (this.user && this.user.gender && this.user.gender === 1) {
						this.weight = this.$jsonBasic.baseUserBoy.weight
					} else {
						this.weight = this.$jsonBasic.baseUserGirl.weight
					}
				}
				if (!this.czd) {
					if (this.address) {
						this.addressData = {
							pid: this.address.province.id,
							cid: this.address.city.id
						}
						this.czd = this.address.city.name
						this.city = this.address.city.id
					} else {
						this.addressData = {
							pid: 1,
							cid: 2
						}
						this.czd = '北京市'
						this.city = 2
					}
					isfish = true
				}
				if (isfish) {
					this.submitInformation()
				}
			},
			confirmAddress(pname, cname, pid, cid) {
				this.addressData = {
					pid: pid,
					cid: cid
				}
				this.czd = cname
				this.city = cid
				this.addressPickerShow = false
			},
			submitInformation() {
				if (!this.avatorImg) {
					this.$refs.uToast.show({
						title: '请上传头像'
					})
					return false
				}
				if (this.profession === null) {
					this.$refs.uToast.show({
						title: '请选择职业'
					})
					return false
				}
				if (this.expectData && this.expectData.length === 0) {
					this.$refs.uToast.show({
						title: '请选择技能'
					})
					return false
				}
				if (!this.nickname) {
					this.$refs.uToast.show({
						title: '请填写昵称'
					})
					return false
				}
				console.log(this.nickname)
				if (this.birthday && this.height && this.weight && this.czd) {
					UserService.setuserprofile({
						birthday: this.birthday,
						avatar: this.avatorImg,
						height: this.height,
						weight: this.weight,
						city: this.city,
						nickname: this.nickname,
						profession: this.profession,
						expect_data: JSON.stringify(this.expectData),
						photo_data: JSON.stringify(this.photoData),
					}).then(res => {
						if (res.code === 1) {
							this.updateUser().then(() => {
								console.log('更新成功')
							})
							if (this.user.gender === 1) {
								console.log(this.user.avatar)
								if (this.user.avatar) {
									this.$refs.uToast.show({
										title: res.msg,
									})
									this.goBack()
								} else {
									this.$refs.uToast.show({
										title: res.msg,
										url: '/pages/exclusive/male'
									})
								}
							} else {
								if (this.user.avatar) {
									this.$refs.uToast.show({
										title: res.msg,
									})
									this.goBack()
								} else {
									this.$refs.uToast.show({
										title: res.msg,
									})
									this.SHOW_PROFILE(true)
									this.toJumpPage(4, '/pages/itsme/index')
								}
							}
						} else {
							this.$refs.uToast.show({
								title: res.msg,
							})
						}
					})
				} else {
					this.unifyType = 10
					this.showUnifyPop = true
					return false
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.avatar-box {
		width: 240rpx;
		height: 240rpx;
		background: #7f7f7f;
		border-radius: 20rpx;
		background-size: cover;
		background-repeat: no-repeat;
	}

	.avatar-box-1 {
		width: 240rpx;
		height: 240rpx;
		border-radius: 20rpx;
	}

	.avatar-0 {
		background-image: url('/static/itsme/avatar_0.png');
		opacity: 0.5;
	}

	.avatar-1 {
		background-image: url('/static/itsme/avatar_1.png');
		opacity: 0.5;
	}

	.avatar-border {
		width: 213rpx;
		height: 213rpx;
		opacity: 0.9999;
	}

	.avatar-center {
		width: 80rpx;
		height: 60rpx;
		opacity: 0.999;
	}

	.photo-center {
		width: 82rpx;
		height: 64rpx;
	}

	.img-pop {
		width: 129rpx;
		height: 129rpx;
		overflow: hidden;
	}

	.top-8 {
		top: 16rpx;
	}

	.top-50 {
		top: 95rpx;
	}

	.expect-box-checked {
		width: 200rpx;
		height: 60rpx;
		line-height: 58rpx;
		background: #282846;
		border: 2rpx solid #D97DB0;
		border-radius: 30rpx;
	}

	.expect-box {
		width: 200rpx;
		height: 60rpx;
		line-height: 58rpx;
		background: #23232D;
		border-radius: 30rpx;
	}

	.text-expect-box {
		color: #fff;
		opacity: 0.5;
	}

	.photo-box {
		width: calc((100vw - 120rpx) / 3);
		height: calc((100vw - 120rpx) / 3);
		background: #272733;
		border: 1rpx dashed #FFFFFF;
		opacity: 0.5;
		border-radius: 10rpx;
	}

	.photo-box-1 {
		width: 200rpx;
		height: 200rpx;
		border-radius: 10rpx;
	}

	.information-btn {
		width: 452rpx;
		height: 72rpx;
		line-height: 70rpx;
		background: #D97DB0;
		color: #fff;
		border-radius: 36rpx;
	}

	.color-woman {
		color: rgb(205, 120, 166);
	}

	.color-man {
		color: rgb(58, 136, 201);
	}
</style>
