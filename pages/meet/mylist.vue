<template>
	<view class="width-full minnavh100vh bg-main">
		<view class="width-full pt10">
			<view class="width-full">
				<view>
					<view v-for="(item,index) in lifeList" :key="index">
						<view class="width-full mb25">
							<discover-dynamic :item="item" :userInfo="user" :isMy="isMy"></discover-dynamic>
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
		<view class="width-full pt30"></view>
		<!-- 发布Me约 -->
		<view class="lift-add-box fixed bottom30 right20" @click="addLife">
			<image src="../../static/base/base_17.png" class="width-full" mode="widthFix"></image>
		</view>
		<!-- 完善资料 -->
		<view class="width-full" v-if="showPerfectPop">
			<perfect-pop @refreshTheList="refreshTheList" @closePerfectPop="toHidePerfectPop">
			</perfect-pop>
		</view>
		<!-- 完善资料 -->
		<view v-if="showRedPacket">
			<red-packet></red-packet>
		</view>
	</view>
</template>

<script>
	import {
		mapGetters,
		mapActions
	} from 'vuex'
	import ItsmeService from '../../common/service/itsme-service.js'
	import {
		formatImage
	} from '../../common/utils/common-methods'
	import commonService from '../../common/service/common-service.js'
	import discoverDynamic from '../../components/discover/dynamic.vue'
	export default {
		data() {
			return {
				lifeList: [],
				isMy: false,
				pages: {
					page: 1,
					size: 5,
					finish: false
				}
			}
		},
		computed: {
			...mapGetters(['user','IfTheRefresh','isShare'])
		},
		components: {
			discoverDynamic
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
		onLoad() {
			this.init()
		},
		onShow() {
			if (this.IfTheRefresh) {
				this.pages.finish = false
				this.pages.page = 1
				this.lifeList = []
				this.getMeetLife()
				this.IFTHE_REFRESH(false)
			}
			if(this.isShare){
				console.log('完成任务前 --- 未成功')
				commonService.buryingPoint({
					text: '完成发布第一条动态',
					val1: '新手任务'
				})
				console.log('完成任务后 --- 成功')
				this.IS_SHARE(false)
			}
		},
		methods: {
			...mapActions(['IFTHE_REFRESH','IS_SHARE']),
			init() {
				Object.assign(this.$data, this.$options.data())
				this.loginExpire().then(res => {
					if (res) {
						this.getMeetLife()
					}
				})
			},
			addLife() {
				console.log(this.user)
				if (this.user && this.user.certify && JSON.parse(this.user.certify).real && JSON.parse(this.user.certify)
					.real.verified || this.user.gender === 1) {
					uni.navigateTo({
						url: '/pages/edit/life'
					})
				} else {
					this.toShowPerfectPop()
				}
			},
			// 动态列表
			getMeetLife() {
				console.log(321)
				ItsmeService.userownhomelife({
					page: this.pages.page,
					limit: this.pages.size
				}).then(res => {
					uni.stopPullDownRefresh()
					if (res.code === 1 && res.data && res.data.user_life && res.data.user_life.length > 0) {
						this.pages.finish = false
						this.lifeList = this.lifeList.concat(res.data.user_life.map(item => {
							if (item.attachment && item.attachment.length > 1) {
								item.attachment.map(att => {
									att.image = formatImage(att.url)
									return att
								})
							}
							return item
						}))
						console.log(this.lifeList)
					} else {
						this.pages.finish = true
					}
				})
			}
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
