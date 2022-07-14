<template>
	<view class="width-full lh1">
		<view class="flex align-items-center mb10 mt20">
			<view class="task-dian" v-if="isRequired"></view>
			<view class="fs16 color-deep ml5">我的照片</view>
		</view>
		<view class="fs13 color-shallow ml10">
			上传近期高质量的照片，Me约曝光度更高
		</view>
		<view class="flex align-items-center mt15 ml10">
			<view v-for="(item,index) in photoList" :key="index">
				<view class="photo-item-box br5 float-hidden relative" :class="index === 2 ? '' : 'mr10'">
					<view class="deletebtn absolute right fs10 color-shallow icon_font" @click="delPhoto(index)">
						&#xe635;
					</view>
					<image :src="item.url | imageFilter('m11')" class="photo-item-box" mode="aspectFill"
						@click="replacePhoto(index)"></image>
				</view>
			</view>
			<view class="add-photo-box flex align-items-center flex-center br5" @click="addPhoto"
				v-if="photoList.length < 3">
				<view class="icon_font fs30 color-white">
					&#xe60d;
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uploadImg from '../../../common/utils/upload-img.js'
	export default {
		name: 'task-photo',
		props: {
			photo: String,
			isRequired : true,
		},
		computed: {
			photoList() {
				if (this.photo) {
					return JSON.parse(this.photo)
				} else {
					return []
				}
			}
		},
		methods: {
			// 添加照片
			addPhoto() {
				let that = this
				let count = 3
				if (this.photoList && this.photoList.length > 0) {
					count = 3 - this.photoList.length
				}
				let images = this.photoList
				uni.chooseImage({
					count: count, //可以选择多少张图片
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //相册或者相机拍摄
					success: (res) => {
						if (res.errMsg === 'chooseImage:ok' && res.tempFilePaths && res.tempFilePaths.length >
							0) {
							uploadImg(res.tempFilePaths).then(imgs => {
								images = images.concat(imgs.map(img => {
									let item = {}
									item.url = '/' + img
									return item
								}))
								that.$emit('changePhoto', images)
							})
						}
					},
					error: (err) => {
						console.log(err)
					}
				})
			},

			// 删除照片
			delPhoto(index) {
				let images = this.photoList
				images.splice(index, 1)
				this.$emit('delPhoto', images)
			},

			// 替换照片
			replacePhoto(index) {
				let nowImages = this.photoList
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						if (res.errMsg === 'chooseImage:ok' && res.tempFilePaths && res.tempFilePaths.length >
							0) {
							uploadImg(res.tempFilePaths).then(imgs => {
								console.log(imgs)
								let item = {}
								item.url = '/' + imgs
								// nowImages[index] = item
								nowImages.splice(index, 1, item)
								this.$emit('replacePhoto', nowImages)
							})
						}
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.task-dian {
		width: 10rpx;
		height: 10rpx;
		background: #F3CEB0;
		border-radius: 10rpx;
	}

	.add-photo-box {
		width: calc((100vw - 200rpx) / 3);
		height: calc((100vw - 200rpx) / 3);
		background: #F6F6F6;
	}

	.photo-item-box {
		width: calc((100vw - 200rpx) / 3);
		height: calc((100vw - 200rpx) / 3);
	}

	.deletebtn {
		width: 30rpx;
		height: 30rpx;
		line-height: 30rpx;
		text-align: center;
		background: #111111;
		z-index: 99;
		color: #fff;
	}
	.right05{
		right: 0.5rpx;
	}
</style>
