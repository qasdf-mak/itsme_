<template>
	<view class="width-full lh1 height">
		<view class="width-full height mt20">
			<swiper class="width-full height br10 " :duration="300" :circular="true" :current="current"
				previous-margin="55rpx" next-margin="50rpx" @change="swiperChange" @animationfinish="animationfinish">
				<swiper-item v-for="(item, index) in list" :key="index">
					<view class="cent-container height ">
						<view class="br10 float-hidden "
							:class="current === index ? 'cent-item-check' : 'cent-item-default'">
							<view class="width-full flex flex-col cent-item-box"
								v-if="index === current || (current === 0 && index === list.length - 1) || (current !== 0 && index === current - 1) || (current !== list.length - 1 && index === current + 1) || (current === list.length - 1 && index === 0)">
								<view class="flex-1 cent-main-box relative float-hidden" @click="toHome(item.id)">
									<image ref="sdimages" :src="item.avatar | imageFilter()" id='img1'
										class="width-full " mode="widthFix">
									</image>
									<view class="absolute top-15 left15 img-real">
										<image src="../../static/itsme/its_2.png" mode="widthFix" class="img-real">
										</image>
									</view>
									<view class="absolute left right" style="bottom: -5rpx;">
										<image src="../../static/itsme/itsme_1.png" class="width-full" mode="widthFix">
										</image>
									</view>
									<view class="absolute left right bottom pb15 flex">
										<view class="">
											<view class="ml10 mr10 flex align-items-center flex-between mb8">
												<view class="flex align-items-center">
													<view class="fs20 color-white fw400">
														{{item.nickname}}
													</view>
												</view>
											</view>
											<view class="flex align-items-center ml10 mt12">
												<view class="color-white fs12 ">
													<text class="ml3"> {{item.gender === 1 ? '男' : '女' }} /</text>
													<text class="ml3"> {{item.age}} /</text>
													<text class="ml3"> {{item.profession}}</text>
												</view>
											</view>
											<view class="flex align-items-center ml10 mt8">
												<view class="flex align-items-center flex-1">
													<view class="color-white fs10 flex">
														<text class="nowrap fs10">{{item.distance || '152km'}}</text>
														<text class="ml10 nowrap fs10"> {{item.city_name || '太原市'}}
														</text>
													</view>
												</view>
											</view>
										</view>
										<view class="flex flex-1 align-items-center flex-right mr15" @click.stop>
											<!-- <view class="br3 flex flex-center align-items-center" :class="false ? 'img-list': 'img-list-2' ">
												<image :src="item.cover_photo | imageFilter" class=" border-box" mode="widthFix" @click="avatarReplace(item.cover_photo,index)"></image>
											</view> -->
											<view class="img-list br3 flex flex-center align-items-center ml15"
												v-for="(img,index) in item.user_photo" :key="index"
												@click="examinePhoto(item.user_photo,index,'cent')">
												<image :src="img | imageFilter('b11')" class="border-box"
													mode="widthFix"></image>
											</view>
										</view>
									</view>
								</view>
							</view>
							<view class="width-full bg-itsme-4 height-140 flex flex-between pt20 pl20 pr20">
								<view class="box-btn flex align-items-center flex-center"
									@click="isShowWxPop(item,index)" v-if="item.is_wx === 1">
									<view class="img-real mr8">
										<image src="/static/itsme/itsme_72.png" class="img-real" mode="widthFix">
										</image>
									</view>
									<view class="fs15">
										解锁
									</view>
								</view>
								<view class="box-btn flex align-items-center flex-center">
									<view class="mt3 mr8">
										<like-button
											:src="item.like === 1 ? '/static/itsme/its_5.png' : '/static/itsme/its_4.png'"
											:width="45" :height="45" :imgWidth="45" :imgHeight="45" :range="100"
											:high="200" :site="likeSite" :large="likeLarge" :showImgs="showImgs"
											@handleClick="doLike(item)">
										</like-button>
									</view>
									<view class="fs15">
										喜欢
									</view>
								</view>
								<view class="box-btn flex align-items-center flex-center"
									@click="toOpenChat('exclusive', item.id)">
									<view class="img-real mr8">
										<image src="/static/itsme/itsme_73.png" class="img-real" mode="widthFix">
										</image>
									</view>
									<view class="fs15">
										聊天
									</view>
								</view>

								<!-- <view class="width-full pt20 flex pb20">
									<view class="flex-1 flex align-items-center flex-right mr30">
										<view class="like-box">
											<like-button
												:src="item.like === 1 ? '/static/itsme/its_5.png' : '/static/itsme/its_4.png'"
												:width="60" :height="60" :imgWidth="120" :imgHeight="120" :range="100"
												:high="200" :site="likeSite" :large="likeLarge" :showImgs="showImgs"
												@handleClick="doLike(item)">
											</like-button>
										</view>
									</view>
									<view class="flex-1 flex align-items-center flex-left ml30"
										@click="toOpenChat('exclusive', item.id)">
										<view class="like-box ">
											<image src="/static/itsme/its_6.png" class="like-box" mode="widthFix">
											</image>
										</view>
									</view>
								</view> -->
							</view>
						</view>
					</view>
				</swiper-item>
			</swiper>
			<view class="" v-if="showWxPop">
				<get-user-wx :showWxPop="showWxPop" :item="wxIndex" @closeWxPop="showWxPop = false"></get-user-wx>
			</view>
			<view>
				<previewImage ref="previewImage" :imgs="previewImgs" :saveBtn="false" :rotateBtn="false"
					:circular="false">
				</previewImage>
			</view>
			<!-- 获取微信弹框 -->

			<!-- 获取微信弹框 -->
		</view>
	</view>
</template>

<script>
	import likeButton from '../like-button/like-button.vue'
	import previewImage from 'components/kxj-previewImage/kxj-previewImage.vue'
	import {
		mapGetters
	} from 'vuex'
	import {
		formatImage
	} from 'common/utils/common-methods'
	import getUserWx from 'components/common/getUserWx.vue'
	export default {
		name: 'exclusive-cent',
		data() {
			return {
				showImgs: ['/static/base/base_9.png'],
				likeSite: [330, 150],
				likeLarge: 2,
				previewImgs: [],
				showWxPop: false,
				wxIndex: null,
			}
		},
		props: {
			list: Array,
			current: {
				type: Number,
				default: 0,
			}
		},
		components: {
			likeButton,
			previewImage,
			getUserWx
		},
		computed: {
			...mapGetters(['user']),
		},
		methods: {
			avatarReplace(index, img) {
				console.log(index);
				//this.viewImg = img
			},
			swiperChange(e) {
				console.log(this)
				this.$emit('changeCurrent', e.mp.detail.current)
			},
			animationfinish(e) {
				this.isDescAnimating = false
			},
			// 去用户主页
			toHome(id) {
				uni.navigateTo({
					url: '../../pages/itsme/home?id=' + id + '&isRefresh=1'
				})
			},
			isShowWxPop(item, index) {
				console.log(item)
				console.log(index)
				if (item.gender === this.user.gender) {
					uni.showToast({
						title: '同性之间，不可查看微信哦',
						icon: 'none'
					})
				} else {
					this.wxIndex = this.list[index]
					this.showWxPop = true
				}
			},
			// 点击喜欢
			doLike(item) {
				if (item.like === 0) {
					this.$emit('doLike', this.current)
					this.setUserLike('exclusive', 'plus', item).then(() => {})
				}
			},
			//查看图片
			examinePhoto(item, index) {
				console.log(this.$refs.sdimages[1])
				let images = item.map(item => {
					return formatImage(item)
				})
				console.log(images)
				this.previewImgs = images
				setTimeout(() => {
					console.log(this.$refs.previewImage.open)
					this.$refs.previewImage.open(index)
				}, 200)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.cent-container {
		width: 640rpx;
		height: 640rpx !important;
	}

	.cent-item-box {
		width: 640rpx;
		height: 640rpx !important;
	}

	.cent-item-check {
		transition: 0.2s;
		transform: scale(1);
		transform-style: preserve-3d;
	}

	.cent-item-default {
		transition: 0;
		transform: scale(0.9);
		transform-style: preserve-3d;
	}

	.img-super-min {
		width: 19rpx;
		height: 19rpx;
	}

	.box-btn {
		width: 160rpx;
		height: 60rpx;
		background: #D97DB0;
		border-radius: 30rpx;
	}

	.cent-img-1 {
		width: 32rpx;
	}

	.cent-img-2 {
		width: 28rpx;
	}

	.top-15 {
		top: 30rpx;
	}

	.img-real {
		width: 40rpx;
		height: 40rpx;
	}

	.img-list {
		width: 80rpx;
		height: 80rpx;
		border: 4rpx solid;
		border-color: #fff;
		overflow: hidden;
	}

	.img-list-2 {
		width: 80rpx;
		height: 80rpx;
		border: 4rpx solid;
		border-color: #B9B0AD;
		overflow: hidden;
	}

	.photo-box {
		padding-left: 15rpx;
		padding-top: 15rpx;
		height: 160rpx;
	}

	.photo-item {
		width: 160rpx;
		height: 160rpx;
		margin-right: 15rpx;
	}

	.height-140 {
		height: 140rpx
	}

	.cent-main-box {
		width: 640rpx;
		height: 640rpx !important;
	}

	.like-box {
		width: 60rpx;
		height: 60rpx;
	}

	.color-green {
		color: #06CA64;
	}
</style>
