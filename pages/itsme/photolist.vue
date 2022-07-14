<template>
	<view class="width-full height100vh lh1 bg-itsme-1">
		<custom-nav :title="navText" showBack></custom-nav>
		<view class="width-full pt15">
			<view class="ml12 mr12 flex flex-wrap">
				<view v-for="(item,index) in photoList" :key="index">
					<view class="mb10" :class="(index + 1) % 3 === 0 ? '' : 'mr10'">
						<photo-item :item="item" @clickPhoto="clickPhoto(index)"></photo-item>
					</view>
				</view>
			</view>
			<view class="width-full pt25 pb25" v-if="photoList && photoList.length > 20 && pages.finish">
				<u-divider bg-color="">没有更多了</u-divider>
			</view>
		</view>
		<!-- 媒体浏览 -->
		<view v-if="showLook">
			<media-list :list="photoList" :isLogin="isLogin" :current="lookIndex" @changeMediaStatus="changeMediaStatus" @toPayMember="toPayMember"
				@closeMedia="showLook = false"></media-list>
		</view>
		<!-- 媒体浏览 -->
		<view v-if="showRedPacket">
			<red-packet></red-packet>
		</view>
		<!-- 充值vip弹框 -->
		<member-pay :showMemberPay="showMemberPay" @closePop="showMemberPay = false" @paySuccess="showMemberPay = false"
			:centent="memberCentent">
		</member-pay>
	</view>
</template>

<script>
	import photoItem from '../../components/photo/item.vue'
	import mediaList from '../../components/common/medialist.vue'
	import UserService from '../../common/service/user-service.js'
	import CommonService from '../../common/service/common-service.js'
	export default {
		data() {
			return {
				isLogin: false,
				navText: '',
				userId: null,
				photoList: [],
				showLook: false,
				showMemberPay: false,
				memberCentent: '',
				lookIndex: 0,
				pages: {
					page: 1,
					size: 20,
					finish: false
				}
			}
		},
		onLoad(options) {
			this.init(options)
		},
		onShow() {
			if (this.photoList && this.photoList.length > 0) {
				this.pages = {
					page: 1,
					size: 20,
					finish: false
				}
				this.photoList = []
				this.getPhotoList()
			}
		},
		components: {
			photoItem,
			mediaList
		},
		onPullDownRefresh() {
			this.pages = {
				page: 1,
				size: 20,
				finish: false
			}
			this.photoList = []
			this.getPhotoList()
		},
		onReachBottom() {
			if (!this.pages.finish) {
				this.pages.page++
				this.getPhotoList()
			}
		},
		methods: {
			init(options) {
				Object.assign(this.$data, this.$options.data())
				this.loginExpire().then(res => {
					this.isLogin = res
					this.navText = options.name
					this.userId = options.id
					this.getPhotoList()
				})
			},
			getPhotoList() {
				UserService.userphonelist({
					user_id: this.userId,
					page: this.pages.page,
					limit: this.pages.size
				}).then(res => {
					uni.stopPullDownRefresh()
					if (res.code === 1) {
						if (this.pages.page < res.data.last_page) {
							this.pages.finish = false
						} else {
							this.pages.finish = true
						}
						this.photoList = this.photoList.concat(res.data.data)
					}
				})
			},
			// 点击查看图片
			clickPhoto(index) {
				this.lookIndex = index
				this.showLook = true
			},
			toPayMember(){
				this.showMemberPay = true
				this.memberCentent = '升级会员即可免费查看会员照片'
			},
			// 媒体预览操作
			changeMediaStatus(type, index, status) {
				if (type === 'start') {
					this.photoList[index].rule_type = 2
					CommonService.readphoto({
						photo_id: this.photoList[index].id
					}).then(res => {
						if (res.code === 1) {
							console.log('浏览成功！')
						}
					})
				}
				if (type === 'end') {
					this.photoList[index].rule_type = status
					this.photoList[index].is_read = 1
				}
				if (type === 'money') {
					this.photoList[index].rule_type = status
					this.photoList[index].is_read = 1
					CommonService.readphoto({
						photo_id: this.photoList[index].id
					}).then(res => {
						if (res.code === 1) {
							console.log('浏览成功！')
						}
					})
				}
			}
		}
	}
</script>

<style>
</style>
