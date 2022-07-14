<template>
	<view class="u-content ml15 mr15">
		<view>
			<view class="fs15 fw600">
				选择举报信息
			</view>
			<view class="ml15 mt10 fs15 fw600 fs12 color-itsme-10" v-for="(item,index) in reprotList" :key="index">
				<view class="flex">
					<view class="flex-1" @click="addReprotId(item.id)">
						{{item.name}}
					</view>
					<view class="img-select mt2">
						<image src="/static/itsme/itsme_67.png" mode="widthFix" class="img-select"
							v-if="reprotId.indexOf(item.id) === -1"></image>
						<image src="/static/itsme/itsme_68.png" mode="widthFix" class="img-select" v-else></image>
					</view>
				</view>
			</view>
		</view>
		<view class="mt25">
			<view class="fs15 fw600">
				填写补充理由
			</view>
			<view class="mt15 text-input-box bg-itsme-4 br10 fs12 relative">
				<textarea class="text-input-text p15" maxlength="200" v-model="reportData.reasonForReporting"
					placeholder="请填写举报的相关补充理由（选填）"></textarea>
				<view class="absolute bottom right pr8 pb8 color-itsme-10">
					{{reportData.reasonForReporting.length}}/200
				</view>
			</view>
		</view>
		<view class="mt25">
			<view class="fs15 fw600">
				提供图片
			</view>
			<view class="width-full flex mt20">
				<view class="flex" v-if="photolist && photolist.length > 0">
					<view class="mr30" v-for="(item,index) in photolist" :key="index">
						<view>
							<view class="photo-box br5">
								<image :src="item | imageFilter('m11')" class="photo-box br5" mode="aspectFill"></image>
							</view>
						</view>
					</view>
				</view>
				<view class="add-photo-box flex align-items-center flex-center br5"
					v-if="photolist && photolist.length < 3" @click="showOtherSheet = true">
					<image src="/static/itsme/itsme_69.png" class="add-photo-box" mode="widthFix"></image>
				</view>
			</view>
			<view class="fs10 color-itsme-2 mt20">
				*请提供有效截图，方便审核
			</view>
		</view>
		<view class="width-full flex flex-center mt30">
			<view class="submit-btn bg-itsme-2 color-white text-center fs18 fw600" @click="submitReport">
				提交反馈
			</view>
		</view>
		<view class="width-full flex flex-center mt15">
			<view class="color-itsme-10 fs10">
				举报成功后，会将M豆自动退回到你的账户
			</view>
		</view>
		<view class="itsme-action-sheet-box">
			<u-action-sheet :list="sheetotherlist" v-model="showOtherSheet" @click="clickOtherSheet"></u-action-sheet>
		</view>
		<view >
			<red-packet></red-packet>
		</view>
		<custom-toast :show="showToast" :type="toastType" :title="toastTitle"></custom-toast>
	</view>
</template>

<script>
	import uploadImg from '../../common/utils/upload-img.js'
	import UserService from '../../common/service/user-service.js'
	export default {
		data() {
			return {
				data: '',
				photolist: [],
				showToast: false,
				toastType: '',
				toastTitle: '',
				showOtherSheet: false,
				reportData: {
					type: '', //是否是订单 2是订单页面
					toUserId: '',
					reportType: '', //举报类型
					reasonForReporting: '', //举报内容
					img: [], //举报图片
					orderId: '', //订单id
				},
				reportflag:true,
				sheetotherlist: [{
						text: '拍摄'
					},
					{
						text: '从相册选择'
					}
				],
				reprotList: [],
				reprotId: []
			}
		},
		computed: {

		},
		onLoad(options) {
			this.init(options)
		},
		methods: {
			init(options) {
				Object.assign(this.$data, this.$options.data())
				console.log(options)
				this.reportData.type = options.type
				this.reportData.orderId = options.id
				this.reportData.toUserId = options.userId
				this.getReportType()
			},
			//获取举报类型
			getReportType() {
				UserService.reportType().then(res => {
					if (res.code === 1) {
						this.reprotList = res.data
					}
				})
			},
			//切换举报类型
			addReprotId(id) {
				this.reprotId = []
				this.reprotId.push(id)
				this.reportData.reportType = id
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
			//提交举报
			submitReport() {
				console.log(this.reportData)
				if (!this.reportData.reportType) {
					uni.showToast({
						title: '请选择举报类型',
						icon: 'none'
					})
					return false
				}
				if (this.reportData.img.length === 0) {
					uni.showToast({
						title: '请上传图片',
						icon: 'none'
					})
					return false
				}
				let that = this
				let flag = true
				// uni.showLoading({
				// 	title: '举报中'
				// });
				if (this.reportflag) {
					UserService.userReport({
						report_id: this.reportData.reportType, //举报类型
						to_user_id: this.reportData.toUserId, //举报的人的id
						type: this.reportData.type, //是否是订单页面
						content: this.reportData.reasonForReporting, //举报内容
						img: this.reportData.img.join(','), // 举报图片
						order_id: this.reportData.orderId //订单号
					}).then(res => {
						if (res.code === 1) {
							uni.hideLoading();
							this.reportflag = false
							uni.showToast({
								title: res.msg,
								icon: 'none'
							})
							setTimeout(() => {
								that.goBack()
							}, 1500)
						}
					})
				}
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
						if (res.errMsg === 'chooseImage:ok' && res.tempFilePaths && res.tempFilePaths.length >
							0) {
							that.toShowToast('load', '上传中')
							for(let i = 0 ; i < res.tempFilePaths.length ; i++){
								that.uploadFile(res.tempFilePaths[i]).then(
									(res) => {
										that.photolist = that.photolist.concat(res)
										that.reportData.img.push(res)
										that.toHideToast()
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
		}
	}
</script>

<style lang="scss" scoped>
	.img-select {
		width: 24rpx;
		height: 24rpx;
	}

	.text-input-box {
		width: 686rpx;
		height: 300rpx;
	}

	.text-input-text {
		width: 640rpx;
		height: 220rpx;
	}

	.add-photo-box {
		width: calc((100vw - 180rpx) / 3);
		height: calc((100vw - 180rpx) / 3);
	}

	.photo-box {
		width: calc((100vw - 180rpx) / 3);
		height: calc((100vw - 180rpx) / 3);
	}

	.submit-btn {
		width: 260rpx;
		height: 80rpx;
		line-height: 80rpx;
		border-radius: 40rpx;
	}
</style>
