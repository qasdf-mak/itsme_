<template>
	<view class="width-full minnavh100vh lh1 bg-itsme-1">
		<!-- top -->
		<view class="width-full">
			<view class="fixed top left right bg-itsme-1">
				<view class="width-full" :style="'height:' + StatusBar + 'px;'"></view>
				<view class="flex top-box flex align-items-center">
					<view class="width-150 pl18 pr18 pt3 pb3 color-white br12" @click="leftBtn">
						{{deleteimg.isShow ? "取消" : "返回"}}						
					</view>
					<view class="flex-1 text-center fs18 color-itsme-2 fw600">我的相册</view>
					<view class="width-150 flex flex-center">
						<view class="bg-itsme-2 color-white br12" :class="deleteimg.isShow ? 'pl8 pr8 pt3 pb3' : ''" @click="deleteIsselectPhoto">
							{{deleteimg.isShow ? "删除" : "  "}}		
						</view>
					</view>
				</view>
			</view>
			<view class="width-full">
				<view class="width-full" :style="'height:' + StatusBar + 'px;'"></view>
				<view class="width-full top-box"></view>
			</view>
		</view>
		<!-- top -->
		<view class="width-full pt15">
			<view class="ml12 flex flex-wrap">
						<!-- <photo-item :item="item" @clickPhoto="clickPhoto(index)"></photo-item> -->
						<view class="flex flex-wrap" v-if="photoList && photoList.length > 0">
							<view v-for="(item,index) in photoList" :key="index">
								<view class="my-photo-item br10 float-hidden relative mb10" :class="(index + 4) % 3 === 0 ? '' : 'mr10'">
									<view v-if="item.type === 'itsme_image'" @click="selectPhoto(photoList,index,'photo')"><!-- @click.stop="examinePhoto(photoList,index,'photo')" -->
										<view class="my-photo-item">
											<image :src="item.url | imageFilter" class="my-photo-item"
												mode="aspectFill"></image>
										</view>
									</view>
									<view v-else  @click="selectPhoto(photoList,index,'photo')">
										<view class="my-photo-item relative" > <!-- @click.stop="toPlayVideo(item.url)" -->
											<image :src="item.url | imageFilter('poster')" class="my-photo-item" mode="aspectFill"></image>
											<view class="absolute top bottom right left flex align-items-center flex-center">
												<view class="icon_font fs25 color-white">
													&#xe622;
												</view>
											</view>
										</view>
									</view>
									<view class="absolute top5 left5" v-if="item.rule_type === 3">
										<image src="../../static/itsme/its_23.png" class="my-photo-img" mode="scaleToFill">
										</image>
									</view>
									<view class="absolute top5 left5" v-if="item.rule_type === 4">
										<image src="../../static/itsme/its_24.png" class="my-photo-img" mode="scaleToFill">
										</image>
									</view>
									<view class="absolute bottom5 right5" v-if="deleteimg.isShow">
										<view class="" v-if="deleteimg.isSelected.indexOf(item.id) === -1">
											<view class="icon_font fs15 ">
												&#xe63f;
											</view>
										</view>
										<view class=" " v-else>
											<view class="icon_font fs15 color-itsme-2">
												&#xe64d;
											</view>
										</view>
									</view>
								</view>
							</view>
				</view>
			</view>
			<view class="width-full pt25 pb25" v-if="photoList && photoList.length > 20 && pages.finish">
				<u-divider bg-color="">没有更多了</u-divider>
			</view>
		</view>
		<!-- 媒体浏览 -->
		<view v-if="showLook">
			<media-list :list="photoList" :current="lookIndex" isMy isLogin @changeMediaStatus="changeMediaStatus"
				@closeMedia="showLook = false"></media-list>
		</view>
		<!-- 媒体浏览 -->
		<view v-if="showRedPacket">
			<red-packet></red-packet>
		</view>
	</view>
</template>

<script>
	import {
		mapGetters
	} from 'vuex'
	import photoItem from '../../components/photo/item.vue'
	import mediaList from '../../components/common/medialist.vue'
	import UserService from '../../common/service/user-service.js'
	import CommonService from '../../common/service/common-service.js'
	export default {
		data() {
			return {
				photoList: [],
				showLook: false,
				lookIndex: 0,
				pages: {
					page: 1,
					size: 20,
					finish: false
				},
				deleteimg: {
					isShow: false,
					isSelected: [],
				}
			}
		},
		onLoad(options) {
			this.init(options)
		},
		computed: {
			...mapGetters(['user'])
		},
		components: {
			photoItem,
			mediaList
		},
		onPullDownRefresh() {
			this.init()
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
				if(options.isdel){
					this.deleteimg.isShow = true
				}
				this.loginExpire().then(res => {
					this.getPhotoList()
				})
			},
			//删除照片
			deletePhoto() {
				this.deleteimg.isShow = true
			},
			//选择照片
			selectPhoto(item,index,type){
				if(this.deleteimg.isSelected.indexOf(item[index].id) === -1){
					this.deleteimg.isSelected.push(item[index].id)
					
				}else{
					this.deleteimg.isSelected = this.deleteimg.isSelected.filter(id => id !== item[index].id)
				}
			},
			//点击删除
			deleteIsselectPhoto(){
				let photoId = this.deleteimg.isSelected.join(',')
				UserService.userPhotoDel({
					photo_id:photoId
				}).then(res=>{
					if(res.code === 1){
						this.deleteimg.isShow = false
						this.photoList = []
						this.getPhotoList()
					}
				})
			},
			getPhotoList() {
				UserService.userphonelist({
					user_id: this.user.id,
					page: this.pages.page,
					limit: this.pages.size
				}).then(res => {
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
			leftBtn(){
				if(this.deleteimg.isShow){
					this.deleteimg.isShow = false
				}else{
					uni.setStorageSync('isfirst', 'true');
					uni.switchTab ({
						url:'/pages/my/index' ,
						fail: (ery) => {
							console.log(ery)
						}
					})
				}
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
			},
			// 添加相册
			addPhoto() {
				uni.navigateTo({
					url: '/pages/edit/photo'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.add-photo-box {
		width: calc((100vw - 88rpx) / 3);
		height: calc((100vw - 88rpx) / 3);
		box-shadow: 0 0 10rpx 3rpx rgba(132, 131, 131, 0.2);
	}
	.my-photo-item {
		width: calc((100vw - 90rpx) / 3);
		height: calc((100vw - 90rpx) / 3);
	}
	.my-photo-img {
		width: 30rpx;
		height: 30rpx;
	}
	.width-150{
		width: 150rpx;
	}
	.top-box {
		height: 100rpx;

		&-left {
			width: 200rpx;
		}
	}
</style>
