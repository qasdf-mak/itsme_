<template>
	<view class="width-full mintabh100vh bg-main">
		<view class="width-full">
			<!-- top -->
			<view class="width-full bg-white">
				<view class="fixed top left right bg-white">
					<view class="width-full" :style="'height:' + StatusBar + 'px;'"></view>
					<view class="width-full top-nav fs18 color-deep fw600 text-center">热门</view>
					<view class="width-full text-center fs13 color-main6 top-desc">
						健康交易，请勿发布低俗内容，一经发现将作删除处理
					</view>
				</view>
				<view class="width-full">
					<view class="width-full" :style="'height:' + StatusBar + 'px;'"></view>
					<view class="width-full top-nav"></view>
					<view class="width-full top-desc"></view>
				</view>
			</view>
			<!-- top -->
			<view class="width-full">
				<view class="ml12 mr12 mt10">
					<view v-for="(item,index) in lifeList" :key="index">
						<view class="width-full mb25">
							<life-item :item="item" :userInfo="item.userinfo" :fromTheTop="fromTheTop" isMeet
								@changeLike="changeLike(index)" @changefabulous="changefabulous(index,item)">
							</life-item>
						</view>
					</view>
					<view class="width-full pt15 pb15" v-if="lifeList && lifeList.length > 0 && pages.finish">
						<u-divider bg-color="">没有更多了</u-divider>
					</view>
					<view class="width-full" v-if="lifeList && lifeList.length === 0 && pages.finish">
						<empty-tip type="life"></empty-tip>
					</view>
				</view>
			</view>
		</view>
		<!-- 发布Me约 -->
		<view class="lift-add-box fixed bottom30 right20" @click="addLife">
			<image src="../../static/base/base_10.png" class="width-full" mode="widthFix"></image>
		</view>
		<no-login :pageShow="pageShow" type="meet" v-if="!isLogin"></no-login>
		<view v-if="showRedPacket">
			<red-packet></red-packet>
		</view>
	</view>
</template>

<script>
	import {
		mapGetters
	} from 'vuex'
	import ItsmeService from '../../common/service/itsme-service.js'
	import {
		formatImage
	} from '../../common/utils/common-methods'
	import lifeItem from '../../components/life/item.vue'
	import noLogin from '../../components/common/nologin.vue'
	export default {
		data() {
			return {
				pageShow: false,
				isLogin: true, // 登录状态
				fromTheTop: Number,
				lifeList: [],
				pages: {
					page: 1,
					size: 5,
					finish: false
				}
			}
		},
		components: {
			lifeItem,
			noLogin
		},
		onPullDownRefresh() {
			this.init()
		},
		onReachBottom() {
			if (!this.pages.finish) {
				this.pages.page++
				this.getMeetLife()
			}
		},
		onPageScroll(e) {
			this.fromTheTop = e.scrollTop
		},
		onShow() {
			this.init()
			this.pageShow = true
		},
		onHide() {
			this.pageShow = false
		},
		onLoad() {
			this.init()
		},
		onBackPress() {
			console.log('111111')
		},
		methods: {
			init() {
				Object.assign(this.$data, this.$options.data())
				this.getMeetLife()
				this.loginExpire().then(res => {
					this.isLogin = res
				})
			},
			addLife() {
				uni.navigateTo({
					url: '/pages/edit/life'
				})
			},
			// 动态列表
			getMeetLife() {
				ItsmeService.meetlife({
					page: this.pages.page,
					limit: this.pages.size
				}).then(res => {
					uni.stopPullDownRefresh()
					if (res.code === 1 && res.data && res.data.length > 0) {
						this.pages.finish = false
						this.lifeList = this.lifeList.concat(res.data.map(item => {
							if (item.attachment && item.attachment.length > 1) {
								item.attachment.map(att => {
									att.image = formatImage(att.url)
									return att
								})
							}
							return item
						}))
					} else {
						this.pages.finish = true
					}
				})
			},
			changeLike(index) {
				if (this.lifeList[index].userinfo.is_like === 1) {
					this.lifeList[index].userinfo.is_like = 0
				} else {
					this.lifeList[index].userinfo.is_like = 1
				}
			},

			changefabulous(index, item) {
				console.log(this.lifeList)
				if (this.lifeList[index].is_fabulous === 1) {
					this.lifeList[index].is_fabulous = 0
					this.lifeList[index].like--
					console.log(item.like)
				} else {
					this.lifeList[index].is_fabulous = 1
					this.lifeList[index].like++
					console.log(item.like)
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.top {
		&-nav {
			height: 100rpx;
			line-height: 100rpx;
		}

		&-desc {
			height: 60rpx;
			line-height: 60rpx;
		}
	}

	.lift-add-box {
		width: 110rpx;
		height: 110rpx;
	}
</style>
