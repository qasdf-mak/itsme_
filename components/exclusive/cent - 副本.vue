<template>
	<view class="width-full lh1 height">
		<view class="width-full height">
			<swiper class="width-full height" :duration="300" :circular="true" :current="current"
				previous-margin="100rpx" next-margin="100rpx" @change="swiperChange" @animationfinish="animationfinish">
				<swiper-item v-for="(item, index) in list" :key="index">
					<view class="cent-container height flex align-items-center flex-center">
						<view class="br10 float-hidden cent-item-box height"
							:class="current === index ? 'cent-item-check' : 'cent-item-default'">
							<view class="width-full height flex flex-col"
								v-if="index === current || (current === 0 && index === list.length - 1) || (current !== 0 && index === current - 1) || (current !== list.length - 1 && index === current + 1) || (current === list.length - 1 && index === 0)">
								<view class="flex-1 cent-main-box relative float-hidden" @click="toHome(item.id)">
									<image :src="item.cover_photo | imageFilter" class="width-full height"
										mode="aspectFill" v-if="item.cover_photo">
									</image>
									<image :src="item.avatar | imageFilter" class="width-full height" mode="aspectFill"
										v-else>
									</image>
									<view class="absolute top-15 left15 img-real">
										<image src="../../static/itsme/its_2.png" mode="widthFix" class="img-real">
										</image>
									</view>
									<view class="absolute left right" style="bottom: -5rpx;">
										<image src="../../static/itsme/itsme_1.png" class="width-full" mode="widthFix">
										</image>
									</view>
									<view class="absolute left right bottom pb20">
										<view class="ml10 mr10 flex align-items-center flex-between mb8">
											<view class="flex align-items-center">
												<!-- <view
													class="name-bg pl5 pr5 bg-itsme-8 br10 pt3 pb3 flex flex-center align-items-center">
													<view class="img-super-min flex">
														<image src="/static/itsme/its_1.png" class="img-super-min"
															mode="widthFix"></image>
													</view>
													<view class="color-white fs10 flex">
														{{item.worth}}
													</view>
												</view> -->
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
										<view class="flex align-items-center ml10 mt12">
											<view class="flex align-items-center flex-1">
												<view class="color-white fs12 flex">
													<text class="nowrap fs15">{{item.distance || '152km'}}</text> <text
														class="ml10 nowrap"> {{item.city_name || '太原市'}}
													</text>
												</view>
											</view>
										</view>
									</view>
								</view>
								<view class="width-full bg-itsme-4">
									<view class="width-full pt20 flex pb20">
										<view class="flex-1 flex align-items-center flex-right mr30">
											<view class="like-box">
												<like-button
													:src="item.like === 1 ? '/static/itsme/its_5.png' : '/static/itsme/its_4.png'"
													:width="60" :height="60" :imgWidth="120" :imgHeight="120"
													:range="100" :high="200" :site="likeSite" :large="likeLarge"
													:showImgs="showImgs" @handleClick="doLike(item)">
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
									</view>
								</view>
							</view>
						</view>
					</view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	import likeButton from '../like-button/like-button.vue'
	import {
		mapGetters
	} from 'vuex'
	export default {
		name: 'exclusive-cent',
		data() {
			return {
				showImgs: ['/static/base/base_9.png'],
				likeSite: [330, 150],
				likeLarge: 2
			}
		},
		props: {
			list: Array,
			current: {
				type: Number,
				default: 0
			}
		},
		components: {
			likeButton
		},
		computed: {
			...mapGetters(['user']),
			userPhoto() {
				if (this.user && this.user.user_photo.length > 0) {
					let imgs = this.user.user_photo
					imgs = imgs.splice(0, 3)
					return imgs
				} else {
					return null
				}
			}
		},
		methods: {
			swiperChange(e) {
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
			// 点击喜欢
			doLike(item) {
				console.log('aaaaaaaaa')
				console.log(item)
				console.log('aaaaaaaaa')
				if (item.like === 0) {
					this.$emit('doLike', this.current)
					this.setUserLike('exclusive', 'plus', item).then(() => {})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.cent-container {
		width: 540rpx;
	}

	.cent-item-box {
		width: 540rpx;
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

	.cent-main-box {
		width: 540rpx;
	}

	.like-box {
		width: 60rpx;
		height: 60rpx;
	}
</style>
