<template>
	<view class="u-content ">
		<view class="width-full" :style="'height:' + StatusBar + 'px;'"></view>
		<view class="p20">
			<!-- 导航条 -->
			<view class="worth-top-nav width-full flex align-items-center">
				<view class="nav-left flex align-items-center flex-left" @click="goBack">
					<view class="icon_font fs18 flex ">
						&#xe638;
					</view>
				</view>
				<view class="flex-1 mr30 flex align-items-center flex-center">
					<view class="fs18">
						{{isInit === '1' ? '修改微信认证':'申请微信认证'}}
					</view>
				</view>
			</view>
			<!-- 导航条 -->
			<view class="pl15 pr15 pt12 pb12 br10 bg-itsme-4 mt20 flex align-items-center mb15">
				<view class="fs12 mr15 color-white">
					微&nbsp;信&nbsp;号&nbsp; :
				</view>
				<view class="flex-1 fs12 color-itsme-10">
					<input v-model.trim="wxData.wx" class="fs12" type="text" value="" placeholder="请输入您的微信号" />
				</view>
				<view class="fs14 icon_font color-itsme-10 mt3" v-if="wxData.wx" @click="wxData.wx = ''">
					&#xe68f;
				</view>
			</view>
		<!-- 	<view class="pl15 pr15 pt12 pb12 br10 bg-itsme-4 mt20 flex align-items-center mb15">
				<view class="fs12 mr15 color-white">
					微信昵称 :
				</view>
				<view class="flex-1 fs12 color-itsme-10">
					<input v-model="wxData.nickname" class="fs12" type="text" value="" placeholder="请输入您的昵称" />
				</view>
			</view> -->
			<view class="fs10 color-itsme-2">
				*我们会保护您的绝对隐私,联系方式只展示给审核人员和付费会员查看
			</view>
			<!-- <view class="">
				<view class="text-wx">
					添加二维码
				</view>
				<view class="add-photo-box flex align-items-center flex-center br5 mt20 bg-itsme-4" v-if="!photolist"
					@click="showOtherSheet = true">
					<view class="icon_font fs30 color-itsme-1">
						&#xe60d;
					</view>
				</view>
				<view class="width-full flex flex-wrap mt20" v-if="photolist" @click="showOtherSheet = true">
					<view>
						<view class="mb10">
							<view class="photo-box br5">
								<image :src="photolist | imageFilter('m11')" class="photo-box br5" mode="aspectFill">
								</image>
							</view>
						</view>
					</view>
				</view>
			</view> -->
		</view>
		<!-- <view class="fs10 color-itsme-2 mt20">
			*请上传与填写的微信匹配的二维码
		</view> -->
		<view class="p20">
			<view class="text-wx">
				设置单次查看所需价格
			</view>
			<view class="pl15 pr15 pt12 pb12 br10 bg-itsme-4 mt20 flex align-items-center mb15">
				<view class="fs12 mr15 color-white">
					M&nbsp;豆&nbsp; :
				</view>
				<view class="flex-1 fs12 color-itsme-10">
					<input v-model="wxData.price" type="number" class="fs12" value="" placeholder="请输入50-300之间" />
				</view>
			</view>
			<view class="fs10 color-itsme-2 mt20 ">
				*1M豆等于0.1元
			</view>
		</view>
		
		<view class="width-full flex flex-center fixed bottom35">
			<view class="submit_btn text-center" @click="submitBindWx">
				提交申请
			</view>
		</view>
		<u-toast ref="uToast" />
		<view class="itsme-action-sheet-box">
			<u-action-sheet :list="sheetotherlist" v-model="showOtherSheet" @click="clickOtherSheet"></u-action-sheet>
		</view>
		<custom-toast :show="showToast" :type="toastType" :title="toastTitle"></custom-toast>
		<view >
			<red-packet></red-packet>
		</view>
	</view>
</template>

<script>
	import uploadImg from '../../common/utils/upload-img.js'
	import UserService from '../../common/service/user-service.js'
	export default {
		data() {
			return {
				wxData: {
					wx: '',
					price:''
				},
				cTime: null,
				isInit: '',
				showToast: false,
				toastTitle: '',
				toastType: '',
				showOtherSheet: false,
				sheetotherlist: [{
						text: '拍摄'
					},
					{
						text: '从相册选择'
					}
				]
			}
		},
		onLoad(options) {
			this.init(options)
		},
		methods: {
			init(options) {
				Object.assign(this.$data, this.$options.data())
				if (options) {
					this.wxData.wx = options.wx;
					this.wxData.price = options.price;
					this.isInit = options.isInit
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
			toShowToast(type, title) {
				this.toastType = type
				this.toastTitle = title
				this.showToast = true
			},
			toHideToast() {
				this.toastType = ''
				this.toastTitle = ''
				this.showToast = false
			},
			// // 添加照片
			// addPhoto(type) {
			// 	let sourceType = []
			// 	if (type === 'camera') {
			// 		sourceType = ['camera']
			// 	} else {
			// 		sourceType = ['album']
			// 	}
			// 	let count = 9
			// 	if (this.photoList && this.photoList.length > 0) {
			// 		count = 9 - this.photoList.length
			// 	}
			// 	let that = this
			// 	uni.chooseImage({
			// 		count: count, //可以选择多少张图片
			// 		sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
			// 		sourceType: sourceType, //相册或者相机拍摄
			// 		success: (res) => {
			// 			if (res.errMsg === 'chooseImage:ok' && res.tempFilePaths && res.tempFilePaths.length >
			// 				0) {
			// 				that.toShowToast('load', '上传中')
			// 				that.uploadFile(res.tempFilePaths[0]).then(
			// 					(res) => {
			// 						that.photolist = ''
			// 						that.toHideToast()
			// 					}
			// 				)
			// 			}
			// 		},
			// 		error: (err) => {
			// 			console.log(err)
			// 		},
			// 	})
			// },
			submitBindWx() {
				if (this.wxData.wx === '') {
					this.$refs.uToast.show({
						title: '请填写您的微信号',
					})
					return false
				}
				if (this.wxData.price === '') {
					this.$refs.uToast.show({
						title: '请填写您的所需价格',
					})
				} else {
					let price = parseInt(this.wxData.price)
					if (price < 50 || price > 300) {
						this.wxData.price = ''
						this.$refs.uToast.show({
							title: '请填写 50-300 M豆的价格',
						})
						return false
					}
				}
				UserService.userSetWxNum({
					wx: this.wxData.wx,
					price: this.wxData.price,
				}).then(res => {
					if (res.code === 1) {
						this.$refs.uToast.show({
							title: res.msg,
						})
						UserService.checkWxNum().then(res => {
							if (res.code === 1) {
								console.log(res)
								this.cTime = res.data.createtime
								setTimeout(res => {
									console.log(this.cTime)
									uni.redirectTo({
										url: '/pages/my/goPublicAccount?cTime=' + this.cTime
									})
								}, 1500)
							}
						})

					}
					if (res.code === 2) {
						this.$refs.uToast.show({
							title: res.msg,
						})
					}
					if (res.code === 0) {
						this.$refs.uToast.show({
							title: res.msg,
						})
						this.wxData.wx = ''
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.height_96 {
		height: 60rpx;
	}

	.photo-box {
		width: calc((100vw - 120rpx) / 3);
		height: calc((100vw - 120rpx) / 3);
	}

	.height_158 {
		height: 110rpx;
	}

	.text-wx {
		font-size: 30rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #FFFFFF;
	}

	.add-photo-box {
		width: calc((100vw - 120rpx) / 3);
		height: calc((100vw - 120rpx) / 3);
	}

	.submit_btn {
		width: 582rpx;
		height: 80rpx;
		line-height: 80rpx;
		background: #D97DB0;
		box-shadow: 0px 0px 16rpx 0px rgba(0, 0, 0, 0.08);
		border-radius: 40rpx;
		font-size: 36rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #FFFFFF;
	}
</style>
