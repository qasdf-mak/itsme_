<template>
	<view class="width-full height100vh bg-white flex flex-col">
		<view class="width-full exclusive-top-box" :style="'padding-top:' + StatusBar + 'px;'">
			<view class="width-full">
				<view class="width-full top-nav-box relative">
					<view class="absolute top bottom left right text-center fs18 color-deep fw600">
						专属推荐
					</view>
					<view class="absolute top bottom right15 fs13 color-shallow" @click="toIndex">
						不看了,去首页
					</view>
				</view>
				<exclusive-top :list="exclusiveList" :girlNum="girlNum" @changeGirlNum="changeGirlNum" @changeGirl="changeGirl"></exclusive-top>
			</view>
		</view>
		<view class="width-full flex-1 flex align-items-center flex-center">
			<exclusive-item :item="exclusiveData" v-if="exclusiveData" @prveGirl="prveGirl" @nextGirl="nextGirl"></exclusive-item>
		</view>
		<view class="width-full pb15 pt15">
			<view class="pb_iphoneX_safe width-full text-center fs13 color-shallow" @click="toIndex">
				不看了,去首页
			</view>
		</view>
		<red-packet></red-packet>
	</view>
</template>

<script>
	import UserService from '../../common/service/user-service.js'
	import exclusiveTop from '../../components/exclusive/top.vue'
	import exclusiveItem from '../../components/exclusive/item.vue'
	export default {
		data() {
			return {
				girlNum: 0,
				exclusiveList: [],
				exclusiveData: null
			}
		},
		onLoad() {
			this.init()
		},
		components: {
			exclusiveTop,
			exclusiveItem
		},
		methods: {
			init() {
				Object.assign(this.$data, this.$options.data())
				this.getExclusiveList()
			},
			getExclusiveList() {
				UserService.getexclusiverecommend().then(res => {
					if (res.code === 1) {
						this.exclusiveList = res.data.filter(item => {
							return item.avatar
						})
						this.changeGirl(this.exclusiveList[0].id)
					}
				})
			},
			toIndex() {
				uni.switchTab({
					url: '/pages/itsme/index'
				})
			},
			changeGirl(id) {
				UserService.getuserinfo({
					user_id: id
				}).then(res => {
					if (res.code === 1) {
						this.exclusiveData = res.data
						if (this.exclusiveData.user_photo && this.exclusiveData.user_photo.length > 3) {
							this.exclusiveData.user_photo = this.exclusiveData.user_photo.slice(0, 3)
						}
					}
				})
			},
			changeGirlNum (index) {
				this.girlNum = index
			},
			prveGirl() {
				if (this.girlNum === 0) {
					this.girlNum = this.exclusiveList.length - 1
				} else {
					this.girlNum--
				}
			},
			nextGirl() {
				if (this.girlNum === this.exclusiveList.length - 1) {
					this.girlNum = 0
				} else {
					this.girlNum++
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
.top-nav-box{
	height: 88rpx;
	line-height: 88rpx;
}
.exclusive-top-box{
		box-shadow: 0 0 20rpx rgba(0, 0, 0, 0.18) !important;
	}
</style>

