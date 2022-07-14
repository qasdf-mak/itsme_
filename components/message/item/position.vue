<template>
	<view v-if="item && item.payload">
		<view class="width-full flex align-items-center lh1 flex-right" v-if="item.senderId == user.id">
			<view class="map-box flex flex-col relative">
				<view class="flex flex-col">
					<view class="fs18 mb5 ml6 mt5 hidd-text">
						{{item.payload.addr}}
					</view>
				</view>
				<view class="flex-1 bg-black">
					<view class="">
						<view class="page-body">
							<view class="page-section page-section-gap absolute over-hid">
								<map style="width: 480rpx; height: 245rpx;" :latitude="item.payload.lat"
									:longitude="item.payload.lng" :markers="markers" :enable-scroll="isScroll"
									:enable-zoom="isZoom">
								</map>
							</view>
						</view>
						<cover-view class="controls-title pop bg-wallet absolute">简单的自定义 controls</cover-view>
					</view>
				</view>
			</view>
		</view>
		<view class="width-full flex align-items-start lh1 flex-left " v-else>
			<view class="avatar-box mr12 float-hidden" @click="toHome">
				<image :src="friend.avatar | imageFilter('m11')" class="width-full height" mode="widthFix"></image>
			</view>
			<view class="map-box flex flex-col relative">
				<view class="flex flex-col">
					<view class="fs18 mb5 ml6 mt5 hidd-text">
						{{item.payload.addr}}
					</view>
				</view>
				<view class="flex-1 bg-black relative">
					<view class="">
						<view class="page-body">
							<view class="page-section page-section-gap">
								<map style="width: 480rpx; height: 245rpx;" :latitude="item.payload.lat"
									:longitude="item.payload.lng" :markers="markers" :enable-scroll="isScroll"
									:enable-zoom="isZoom">
								</map>
							</view>
						</view>
					</view>
					<cover-view class="pop bg-divider absolute bottom"> </cover-view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapGetters
	} from 'vuex'
	export default {
		name: 'item-map',
		props: {
			item: Object,
			friend: Object,
			isPlay: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				id: 1,
				isScroll: false,
				isZoom: false,
				markers: [],
				latitude: null,
				longitude: null,
				address: null
			}
		},

		computed: {
			...mapGetters(['user'])
		},
		mounted() {
			var that = this
			that.latitude = that.item.payload.lat
			that.longitude = that.item.payload.lng
			that.address = that.item.payload.addr
			let arr = [{
				id: 0,
				longitude: that.longitude,
				latitude: that.latitude,
				name: that.address
			}]
			let markers = []
			for (var i = 0; i < arr.length; i++) {
				markers = markers.concat({
					id: arr[i].id,
					latitude: arr[i].latitude, //纬度
					longitude: arr[i].longitude, //经度
					callout: { //自定义标记点上方的气泡窗口 点击有效
						content: arr[i].name, //文本
						color: '#fff', //文字颜色
						fontSize: 16, //文本大小
						borderRadius: 2, //边框圆角
						bgColor: '#00c16f', //背景颜色
						display: 'ALWAYS', //常显
					},
				})
			}
			that.markers = markers
			console.log(that.markers)
		},
		methods: {
			toHome() {
				this.$emit('toHome')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.text-box {
		max-width: 520rpx;
		word-break: break-word;
	}

	.avatar-box {
		width: 80rpx;
		height: 80rpx;
		border-radius: 80rpx;
	}

	.map-box {
		width: 480rpx;
		height: 300rpx;
		background-color: #D97DB0;
		border-radius: 10rpx;
	}

	.hidd-text {
		letter-spacing: 2px;
		/*字间距*/
		display: block;
		/*内联对象需加*/
		width: 450rpx;
		/*指定宽度*/
		word-break: keep-all;
		/* 不换行 */
		white-space: nowrap;
		/* 强制在同一行内显示所有文本,直到文本结束或者遭遇 br 对象。不换行 */
		overflow: hidden;
		/* 内容超出宽度时隐藏超出部分的内容 */
		text-overflow: ellipsis;
		/* IE 专有属性,当对象内文本溢出时显示省略标记(...) ;需与overflow:hidden;一起使用。*/
	}

	.pop {
		width: 480rpx;
		height: 245rpx;
		opacity: 0;
		z-index: 9999 !important;
	}

	.z-i-99 {
		z-index: 999 !important;
	}
</style>
