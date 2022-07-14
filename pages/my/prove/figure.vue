<template>
	<view class="width-full lh1 mintabh100vh">
		<view class="width-full pt35">
			<view class="width-full pt15">
				<view class="width-full color-deep text-center fss15 fw600">
					{{type === 'occupation' ? '上传工作证件照片' : '请至少上传三张能够体现身材的美照'}}
				</view>
				<view class="width-full color-shallow fs14 text-center mt10">
					上传照片的数量越多越可能通过认证哦
				</view>
			</view>
		</view>
		<!--  -->
		<view class="width-full mt30 flex align-items-center flex-center">
			<view
				class="flex flex-wrap align-items-center"
				:class="(photoList && photoList.length > 3) ? 'photo-box-2 ml15' : 'photo-box-1 flex-between'"
			>
				<view v-for="(item,index) in photoList" :key="index">
					<view
						class="photo-item br5 float-hidden mb15"
						:class="(photoList && photoList.length > 3) ? 'mr15' : ''"
					>
						<image :src="item.url" class="width-full height" mode="aspectFill"></image>
					</view>
				</view>
				<view v-if="!photoList || (photoList && photoList.length < 9)">
					<view class="add-photo-box flex align-items-center flex-center br5 bg-white border-box" @click="addPhoto">
						<view class="icon_font fs30 color-shallow">
							&#xe60d;
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="fixed bottom left right pb_iphoneX_safe pt30 bg-white">
			<view class="ml35 mr35 pb35">
				<view class="ml8 mr8 mb15 bg-2 fs18 color-white text-center br20 pt10 pb10 btn-box" @click="toProve">
					提交审核
				</view>
			</view>
		</view>
		<view v-if="showRedPacket">
			<red-packet></red-packet>
		</view>
	</view>
</template>

<script>
	import { mapGetters } from 'vuex'
	import UserService from '../../../common/service/user-service.js'
	import updateUser from '../../../common/mixins/login.js'
	import uploadImg from '../../../common/utils/upload-img.js'
	export default {
		mixins: [updateUser],
		data() {
			return {
				type: '',
				occupationId: '',
				photoList: []
			}
		},
		onLoad() {
			this.init()
		},
		computed: {
			...mapGetters(['user'])
		},
		methods:{
			init() {
				Object.assign(this.$data, this.$options.data())
				if (this.platform === 'H5') {
					this.type = this.$mp.query.type
					if (this.type === 'occupation') {
						this.occupationId = this.$mp.query.occupationId
					}
				} else {
					this.type = this.$options.pageQuery.type
					if (this.type === 'occupation') {
						this.occupationId = this.$options.pageQuery.occupationId
					}
				}
				uni.setNavigationBarTitle({
				　　title: this.type === 'occupation' ? '职业认证' : '身材认证'
				})
			},
			// 添加照片
			addPhoto() {
				let count = 9
				let that = this
				if (this.photoList && this.photoList.length > 0) {
					count = 9 - this.photoList.length
				}
				uni.chooseImage({
					count: count, //可以选择多少张图片
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //相册或者相机拍摄
					success: (res) => {
						if (res.errMsg === 'chooseImage:ok' && res.tempFilePaths && res.tempFilePaths.length > 0) {
							that.photoList = that.photoList.concat(res.tempFilePaths.map(img => {
								let item = {}
								item.url = img
								return item
							}))
							console.log(that.photoList)
						}
					},
					error: (err) => {
						console.log(err)
					}
				})
			},
			// 去认证 
			toProve() {
				let images = []
				let imgList = this.photoList.map(item => {
					return item.url
				})
				let params = {}
				uploadImg(imgList).then(imgs => {
					for (let i = 0; i < imgs.length; i++) {
						images.push({
							img: '/' + imgs[i]
						})
					}
					if (this.type === 'figure') {
						params = {
							name: 'figure',
							photo_list: images
						}
					} else {
						params = {
							name: 'profession',
							profession_id: this.occupationId,
							photo_list: images
						}
					}
					UserService.updateusercertify({
						code: 'goddess',
						certify_item: JSON.stringify(params)
					}).then(res => {
						console.log(res)
						if (res.code === 1) {
							this.updateUser().then(() => {
								uni.navigateTo({
									url: '/pages/my/prove/index'
								})
							})
						}
					})
				})	
			}
		}
	}
</script>

<style lang="scss" scoped>
	.photo-box-1{
		width: 450rpx;
	}
	.photo-box-2{
		width: 720rpx;
	}
	.add-photo-box{
		width: 210rpx;
		height: 210rpx;
		box-shadow: 0 0 10rpx 3rpx rgba(132, 131, 131, 0.2);
	}
	.photo-item{
		width: 210rpx;
		height: 210rpx;
	}
</style>
