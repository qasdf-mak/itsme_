<template>
	<view class="width-full mintabh100vh lh1 bg-itsme-1">
		<!-- top -->
		<view class="fixed top left right bg-itsme-1">
			<view class="width-full" :style="'height: ' + StatusBar + 'px;'"></view>
			<view class="my-top-box flex align-items-center">
				<view class="my-top-item"></view>
				<view class="flex-1 fs18 color-itsme-2 fw600 text-center">
					我的
				</view>
				<view class="my-top-item flex align-items-center flex-right" @click="toJumpPage(1,'/pages/my/setup')">
					<image src="../../static/itsme/its_20.png" class="my-top-img mr15" mode="widthFix"></image>
				</view>
			</view>
		</view>
		<view class="width-full">
			<view class="width-full" :style="'height: ' + StatusBar + 'px;'"></view>
			<view class="width-full my-top-box"></view>
		</view>
		<!-- top -->
		<view class="ml15 mr15 pb30">

			<!-- 用户信息 -->
			<view class="width-full mt15 mb30 flex align-items-center">
				<view class="avator-box relative">
					<image :src="userInfo && userInfo.avatar | avatarFormat('m11')" class="avator-box" mode="aspectFill">
					</image>
					<view class="edit-avator absolute bottom right bg-itsme-1" @click="toShowPerfect(4)">
						<image src="../../static/itsme/its_21.png" class="edit-avator" mode="widthFix"></image>
					</view>
				</view>
				<view class="flex-1 ml15">
					<view class="width-full flex align-items-center">
						<view class="fs18 color-white fw600 lh1 nowrap1 mb5">
							{{userInfo && userInfo.nickname || ''}}
						</view>
					<!-- 	<view class="flex align-items-center pl8 br12 float-hidden bg-itsme-8 ml8"
							@click="toJumpPage(1,'/pages/my/worthlist')">
							<image src="../../static/itsme/its_1.png" class="itsme-user-worth" mode="widthFix">
							</image>
							<view class="fs10 color-white ml5 lh15 mr10">
								{{user && user.worth || 0}}
							</view>
						</view> -->
						<view v-if="userInfo && userInfo.gender === 1 && user.is_vip === 1">
							<view class="user-top-horn ml8">
								<image src="../../static/itsme/its_7.png" class="user-top-horn" mode="widthFix"></image>
							</view>
						</view>
						<view v-if="user && isReal">
							<view class="user-top-horn ml8">
								<image src="../../static/itsme/its_2.png" class="user-top-horn" mode="widthFix"></image>
							</view>
						</view>
					</view>
					<view class="width-full fs10 color-itsme-9 mt10">
						{{user && user.gender === 1 ? '男' : '女'}} / {{user.age}}
					</view>
				</view>
			</view>
			<!-- 用户信息 -->
			<!-- 微信 -->
			<view class="pt15 pb15 pl15 pr15 bg-itsme-2 br10 float-hidden flex align-items-center mb30">
				<!-- user.gender === 0 -->
				<view class="fs24 mr5 icon_font color-white">
					&#xe648;
				</view>
				<view class="flex align-items-center flex-1" v-if="isWxCode === 1">
					{{wxCode}} l <text class="ml5" @click="toJumpPage(1,'/pages/my/seeWx')" v-if="user.is_vip === 1 || user.gender === 0"> 被查看 ：{{wxcount}}</text><text class="ml5" @click="toJumpPage(1,'/pages/my/seeWx')" v-else>仅VIP才能被他人查看</text>
				</view>
				<view class="flex-1" v-else>
					<image src="../../static/itsme/itsme_62.png" class="vip-img-1 ml5" mode="widthFix"></image>
				</view>
				<view class="fs13 color-itsme-2 pt6 pb6 pl10 pr10 br20 bg-white" @click="toPagesWx(isWxCode)">
					{{isWxCode === 1 ? "修改" : "立即认证"}}
				</view>
			</view>
			<!-- 微信 -->
			<!-- 升级vip -->
			<view class="pt15 pb15 pl15 pr15 bg-itsme-2 br10 float-hidden flex align-items-center mb30"
				v-if="user.gender === 1">
				<view class="flex-1 flex align-items-center" v-if="user.is_vip === 0">
					<view class="fs12 color-white mt8">
						升级为
					</view>
					<image src="../../static/itsme/its_22.png" class="vip-img ml5 mr5" mode="widthFix"></image>
					<view class="fs12 color-white mt8">
						可享受更多特权
					</view>
				</view>
				<view class="flex-1 flex " v-else>
					<view class="fs12 color-white mt8">
						已开通
					</view>
					<image src="../../static/itsme/its_22.png" class="vip-img-2 ml5 mr5 mt3" mode="widthFix"></image>
					<view class="fs12 color-white mt8" v-if="user.end_time">
						| &nbsp; {{user.end_time | dateFilter(2, '.')}} 到期
					</view>
				</view>
				<view class="fs13 color-itsme-2 pt10 pb10 pl10 pr10 br20 bg-white"
					@click="toJumpPage(1,'/pages/my/member/index')">
					{{user.is_vip === 1 ? "立即续费" : "立即开通"}}
				</view>
			</view>
			<!-- 升级vip -->
			<!-- 编辑资料 -->
			<view class="pl15 pr15 pt15 br10 bg-itsme-4">
				<view class="width-full flex align-items-center mb15  " v-if="isUserExpect">
					<!-- -->
					<view class="flex-1 flex fs12 color-itsme-10  mr15">
						<view class="">
							{{userExpect.name}} ： 
						</view>
						<view class="flex-1 hidd-text">
							{{userExpect.data}}
						</view>
					</view>
					<view class="fs10 color-itsme-2 bg-itsme-3 pl10 pr10 pt5 br10" @click="toShowPerfect(1)">
						编辑
					</view>
				</view>
				<view class="width-full flex align-items-center pb15 lh1 float-hidden">
					<view class="flex-1 fs12 color-itsme-10 nowrap1 mr15 " v-if="userInfo && userInfo.profession">
						我的职业：{{userInfo.profession}}
					</view>
					<view class="fs10 color-itsme-2 bg-itsme-3 pl10 pr10 pt5 pb5 br10" @click="toShowPerfect(2)">
						编辑
					</view>
				</view>
				<view class="width-full flex align-items-center pb15">
					<view class="flex-1 fs12 color-itsme-10 nowrap1 mr15 lh1 float-hidden" v-if="userInfo && userInfo.city && userInfo.birthday">
						个人资料：{{userInfo.birthday || '暂未填写'}} / {{userInfo.city || '暂未填写'}}
					</view>
					<view class="fs10 color-itsme-2 bg-itsme-3 pl10 pr10 pt5 pb5 br10" @click="toShowPerfect(3)">
						编辑
					</view>
				</view>
			</view>
			<!-- 编辑资料 -->
			<!-- 数据统计 -->
			<view class="width-full pt30 flex align-items-center flex-between">
				<view class="flex flex-col align-items-center flex-center flex-1" @click="toPayPage(1)">
					<view class="fs24 fw600" style="color: #D97DB0;">
						{{dataNum && dataNum.m_dou || 0}}
					</view>
					<view class="color-white fs12 mt10">
						M豆(个)
					</view>
				</view>
				<view class="flex flex-col align-items-center flex-center flex-1" @click="toPayPage(2)"
					v-if="platform === 'android' || (platform === 'ios' && commonInfo && !commonInfo.check)">
					<view class="fs24 fw600" style="color: #EDA303;" v-if="dataNum && dataNum.commission">
						{{dataNum.commission | numberFilter}}
					</view>
					<view class="fs24 fw600" style="color: #EDA303;" v-else>
						0
					</view>
					<view class="color-white fs12 mt10">
						佣金(元)
					</view>
				</view>
				<view class="flex flex-col align-items-center flex-center flex-1" @click="toPayPage(3)">
					<view class="fs24 fw600" style="color: #FE757E;">
						{{dataNum && dataNum.like_me_num || 0}}
					</view>
					<view class="color-white fs12 mt10">
						喜欢我
					</view>
				</view>
				<view class="flex flex-col align-items-center flex-center flex-1" @click="toPayPage(4)">
					<view class="fs24 fw600" style="color: #2F93ED;">
						{{dataNum && dataNum.see_me_num || 0}}
					</view>
					<view class="color-white fs12 mt10">
						看过我
					</view>
				</view>
			</view>
			<!-- 数据统计 -->
			<!-- 看过的微信 -->
			<!-- user.gender === 1 -->
			<view class="pl15 pr15 pt10 pb10 br10 bg-itsme-4 mt30 flex align-items-center" 
				@click="toJumpPage(1,'/pages/my/recordingWx')">
				<view class="flex-1 fs12 color-itsme-10">
					看过的微信
				</view>
				<view class="icon_font fs14 color-itsme-10">
					&#xe60f;
				</view>
			</view>
			<!-- 看过的微信 -->
			<!-- 分享 -->
			<view class="pl15 pr15 pt10 pb10 br10 bg-itsme-4 mt30 flex align-items-center"
				@click="toJumpPage(1,'/pages/my/share')">
				<view class="flex-1 fs12 color-itsme-10">
					分享《是我啊》可获得奖励 &nbsp; &nbsp; &nbsp;邀请码 ：{{user.invite_code}}
				</view>
				<view class="icon_font fs14 color-itsme-10">
					&#xe60f;
				</view>
			</view>
			<!-- 分享 -->
			<!-- 相册&&动态 -->
			<view class="pl15 pr15 pt15 pb15 br10 bg-itsme-4 mt30"
				@click.stop="deleteimg.isShow = false, deleteimg.isSelected = []">
				<view class="width-full flex align-items-center">
					<view class="my-tab-box">
						<u-tabs :list="tabList" :is-scroll="false" :current="tabCurrent" active-color="#D97DB0"
							inactive-color="#898585" bg-color="" bar-width="40" bar-height="6" height="80"
							@change="changeTab"></u-tabs>
					</view>
					<view class="flex-1 flex flex-right">
						<view class="my-tab-img ml35" @click="operation(tabCurrent)">
							<view class="icon_font fs16 color-itsme-10" v-if="tabCurrent === 1">
								&#xe664;
							</view>
							<image src="../../static/itsme/its_26.png" class="my-tab-img" mode="widthFix" v-else>
							</image>
						</view>
					</view>

				</view>
				<view class="width-full mt15">
					<!-- 相册区域 start -->
					<view class="width-full" v-if="tabCurrent === 1">
						<view class="flex flex-wrap" v-if="photoList && photoList.length > 0">
							<view v-for="(item,index) in photoList" :key="index">
								<view class="my-photo-item br10 float-hidden relative mb10"
									:class="(index + 4) % 3 === 0 ? '' : 'mr10'">
									<view v-if="item.type === 'itsme_image'"
										@click.stop="examinePhoto(photoList,index,'photo')">
										<view class="my-photo-item">
											<image :src="item.url | imageFilter" class="my-photo-item"
												mode="aspectFill"></image>
										</view>
									</view>
									<view v-else>
										<view class="my-photo-item relative" @click.stop="toPlayVideo(item.url)">
											<image :src="item.url | imageFilter('poster')" class="my-photo-item"
												mode="aspectFill"></image>
											<view
												class="absolute top bottom right left flex align-items-center flex-center">
												<view class="icon_font fs25 color-white">
													&#xe622;
												</view>
											</view>
										</view>
									</view>
									<view class="absolute top5 left5" v-if="item.rule_type === 3">
										<image src="../../static/itsme/its_23.png" class="my-photo-img"
											mode="scaleToFill">
										</image>
									</view>
									<view class="absolute top5 left5" v-if="item.rule_type === 4">
										<image src="../../static/itsme/its_24.png" class="my-photo-img"
											mode="scaleToFill">
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
						<view class="color-3F3C43 flex flex-center align-items-center" v-else>
							<view class="fs15 pt10 pb10">
								您的相册空空如也
							</view>
						</view>
					</view>
					<!-- 相册区域 end -->
					<!-- 动态区域 start -->
					<view class="width-full" v-else>
						<view class="width-full mt20" v-if="lifeList && lifeList.length > 0"
							v-for="(item,index) in lifeList" :key="index">
							<view class="mb15 width-full flex flex-between align-items-center">
								<view class="fs15">
									{{item.createtime | dateFilter(7)}}
								</view>
								<view class="icon_font fs15 color-itsme-10" @click="deleteLife(item)">
									&#xe664;
								</view>
							</view>
							<view class="width-full color-itsme-10 fs12 lh15 mb10">
								{{item.content}}
							</view>
							<view class="width-full" v-if="item.attachment && item.attachment.length === 1">
								<view class="life-one-box br10 float-hidden" v-if="item.attachment[0].type === 1"
									@click="previewImage(0,item)">
									<image :src="item.attachment[0].url | imageFilter" class="life-one-box"
										mode="aspectFill">
									</image>
								</view>
								<view class="life-one-box br10 float-hidden relative"
									v-if="item.attachment[0].type === 2 && item.attachment[0].url"
									@click="toPlayVideo(item.attachment[0].url)">
									<video-item type="life" :url="item.attachment[0].url" :isPlay="isPlay"
										@toPlayVideo="isPlay = true" :isMuted="isMuted" @videoEnded="isPlay = false"
										:isVisible="isVisible">
									</video-item>
								</view>
							</view>
							<view class="width-full flex align-items-center flex-between"
								v-if="item.attachment && item.attachment.length === 2">
								<view class="life-two-box br10 float-hidden" @click="previewImage(0,item)">
									<image :src="item.attachment[0].url | imageFilter" class="life-two-box"
										mode="aspectFill">
									</image>
								</view>
								<view class="life-two-box br10 float-hidden" @click="previewImage(1,item)">
									<image :src="item.attachment[1].url | imageFilter" class="life-two-box"
										mode="aspectFill">
									</image>
								</view>
							</view>
							<view class="width-full flex flex-between"
								v-if="item.attachment && item.attachment.length > 2">
								<view class="life-one-box br10 float-hidden" @click="previewImage(0,item)">
									<image :src="item.attachment[0].url | imageFilter" class="life-one-box"
										mode="aspectFill">
									</image>
								</view>
								<view class="life-three-box">
									<view class="life-three-item br10 float-hidden" @click="previewImage(1,item)">
										<image :src="item.attachment[1].url | imageFilter" class="life-three-item"
											mode="aspectFill">
										</image>
									</view>
									<view class="life-three-item br10 mt15 float-hidden relative"
										@click="previewImage(2,item)">
										<image :src="item.attachment[2].url | imageFilter"
											class="life-three-item absolute" mode="aspectFill">
										</image>
										<view
											class="life-three-num absolute bottom8 right8 flex align-items-center flex-center"
											v-if="item.attachment.length > 3">
											<view class="icon_font color-white fs10">
												&#xe65a;
											</view>
											<view class="fs10 ml5 color-white">
												{{item.attachment.length}}张
											</view>
										</view>
									</view>
								</view>
							</view>
						</view>
						<view class="color-3F3C43 flex flex-center align-items-center"
							v-if="lifeList && lifeList.length === 0">
							<view class="fs15 pt10 pb10">
								您还没有动态,快去发布吧 !
							</view>
						</view>
					</view>
					<!-- 动态区域 start -->
				</view>
			</view>
			<!-- 相册&&动态 -->
		</view>
		<!-- 编辑资料组件 start -->
		<view class="width-full" v-if="showPerfectPop">
			<perfect-pop @closePerfectPop="toHidePerfectPop" :perfectNum="perfectNumber">
			</perfect-pop>
		</view>
		<!-- 编辑资料组件 end -->
		<view v-if="showRedPacket && isLogin">
			<red-packet></red-packet>
		</view>
		<view>
			<previewImage ref="previewImage" :imgs="previewImgs" :saveBtn="false" :rotateBtn="false" :circular="false">
			</previewImage>
		</view>
		<!-- 视频播放 -->
		<view class="fixed top bottom right left bg-black" style="z-index: 999;" v-if="isPlay">
			<view class="ml20 pt35 mt20 icon_font color-white fs20" style="z-index:9999;" @click.stop="isPlay = false">
				&#xe638;
			</view>
			<video-item type="life" :url="videoUrl" :isPlay="isPlay" @toPlayVideo="isPlay = true" :isMuted="isMuted"
				@videoEnded="isPlay = false">
			</video-item>
		</view>
		<view class="showDel">
			<deletebounced-action :showDeletePop="showDel" :isLife="isLife" @deletePhoto="deletePhoto"
				@closePop="showDel = false" @deleteLift="delLife(lifeId)" @shareLife="shareLife(myLife)"
				@addPhoto="toJumpPage(1, '/pages/edit/photo')">
			</deletebounced-action>
		</view>
		<!-- <u-action-sheet :list="moreList" v-model="showDel" @click="delLife(lifeId)"></u-action-sheet> -->
	</view>
</template>

<script>
	import {
		mapGetters,
		mapActions
	} from 'vuex'
	import {
		formatImage
	} from '../../common/utils/common-methods'
	import photoItem from '../../components/photo/item.vue'
	import videoItem from '../../components/video/item.vue'
	import deletebouncedAction from '../../components/common/deletebouncedAction.vue'
	import uniCopy from '../../js_sdk/xb-copy/uni-copy.js'
	import ItsmeService from '../../common/service/itsme-service.js'
	import CommonService from '../../common/service/common-service.js'
	import DiscoverService from '../../common/service/discover-service.js'
	import UserService from '../../common/service/user-service.js'
	import previewImage from '../../components/kxj-previewImage/kxj-previewImage.vue'
	export default {
		data() {
			return {
				tabList: [{
					name: '动态'
				}, {
					name: '相册'
				}, ],
				moreList: [{
					text: '删除这条动态'
				}],
				tabCurrent: 0,
				lifeId: null,
				showDel: false,
				photoList: [],
				lifeList: [],
				perfectNumber: 1,
				isVisible: false,
				platform: '',
				isWxCode: -1,
				wxCode: '',
				wxcount: 0,
				photoPages: {
					page: 1,
					finish: false
				},
				lookIndex: 0,
				userWx: [],
				showLook: false,
				isLogin: false,
				isMuted: false,
				isPlay: false,
				dataNum: null,
				userInfo:null,
				userExpect: null,
				isUserExpect:false,
				previewImgs: [],
				videoUrl: '',
				isLife: true,
				myLife: null,
				deleteimg: {
					isShow: false,
					isSelected: [],
				}

			}
		},
		onLoad() {
			this.init()
			console.log(this.lifeList && this.lifeList.length > 0)
		},
		onShow() {
			this.getuserWx()
			this.getUserInfo()
			this.photoPages.page = 1
			this.photoPages.finish = false
			// const options = uni.getStorageSync('isfirst');
			// if(options === 'true'){
			if (this.dataNum) {
				this.photoList = []
				this.getMyPhoto()
			}
			// uni.setStorage({
			//     key: 'isfirst',
			//     data: '',
			// });
			// }
			if (this.dataNum) {
				this.photoPages.finish = false
				this.getMeetLife()
				if (this.isLogin) {
					this.getuserMyOtherData()
				}
			}
		},
		onPullDownRefresh() {
			this.photoPages.page = 1

			this.getMeetLife()
			this.getuserMyOtherData()
			this.getUserInfo()
		},
		onReachBottom() {
			if (this.tabCurrent === 1) {
				if (!this.photoPages.finish) {
					this.photoPages.page++
					this.getMyPhoto()
				}
			}
		},
		computed: {
			...mapGetters(['user', 'version', 'IfTheRefresh']),
			isReal() {
				if (this.user && this.user.is_real === 1) {
					return true
				} else {
					return false
				}
			},
		},
		components: {
			photoItem,
			videoItem,
			previewImage,
			deletebouncedAction
		},
		methods: {
			init() {
				Object.assign(this.$data, this.$options.data())
				this.platform = uni.getSystemInfoSync().platform
				this.loginExpire().then(res => {
					this.isLogin = res
					if (res) {
						this.getMyPhoto()
						this.getMeetLife()
						this.getuserMyOtherData()
						this.getUserInfo()
						this.getuserWx()
					}
				})

			},
			getuserWx() {
				console.log(1111111111111111111111111111111111)
				UserService.checkWxNum().then(res => {
					if (res.code === 1) {
						console.log(res)
						if (res.data.status === 1) {
							this.isWxCode = 1
							this.userWx = res.data
						}
						if (res.data.status === 2) {
							this.isWxCode = 2
						}
						if (res.data.wx) {
							this.wxCode = res.data.wx
							this.wxcount = res.data.count
							this.cTime = res.data.createtime
						} else {
							this.isWxCode = -1
						}
					}
				})
			},
			//跳转编辑
			toShowPerfect(index) {
				if(index === 1){
					this.toShowPerfectPop()
				}else{
					uni.navigateTo({
						url:'/pages/itsme/fillInformation'
					})
				}
			},
			// 视频播放
			toPlayVideo(url) {
				if (this.deleteimg.isShow) {
					console.log(123)
				} else {
					this.videoUrl = url
					this.isPlay = true
				}
			},
			//切换tab栏
			changeTab(index) {
				this.tabCurrent = index
			},
			toPagesWx(type) {

				if (type === -1) {
					uni.navigateTo({
						url: '/pages/my/bindWxCode'
					})
				}
				if (type === 1) {
					uni.navigateTo({
						url: '/pages/my/bindWxCode?wx=' + this.userWx.wx + '&img=' + this.userWx.img + '&price=' +
							this.userWx.price + '&nickname=' + this.userWx.nickname + '&isInit=' + 1
					})
				}
				if (type === 2) {
					uni.navigateTo({
						url: '/pages/my/goPublicAccount?cTime=' + this.cTime
					})
				}
			},
			//获取标签
			getUserInfo() {
				UserService.getuserinfo().then(res => {
					if (res.code === 1) {
						this.userInfo = res.data
						this.userExpect = res.data.expect
						this.isUserExpect = true
					}
				})
			},
			//删除动态
			deleteLife(item) {
				this.isLife = true
				this.showDel = true
				this.myLife = item
				this.lifeId = item.id
			},
			delLife(id) {
				DiscoverService.userlifedel({
					life_id: id
				}).then(res => {
					if (res.code === 1) {
						this.lifeList = []
						this.getMeetLife()
						this.showDel = false
					}
				})
				uni.showToast({
					title: "动态删除成功",
					icon: 'none'
				})
			},
			//我的相册列表
			getMyPhoto() {
				UserService.userphonelist({
					user_id: this.user.id,
					page: this.photoPages.page,
					limit: 9
				}).then(res => {
					if (res.code === 1) {
						if (res.data.data && res.data.data.length > 0) {
							this.photoPages.finish = false
							this.photoList = this.photoList.concat(res.data.data)
						} else {
							this.photoPages.finish = true
						}
						console.log('this.photoList')
						console.log(this.photoList)
					}
				})
			},
			//删除照片
			deletePhoto() {
				uni.navigateTo({
					url: "/pages/my/myphoto?isdel=" + true
				})
			},
			// 动态列表
			getMeetLife() {
				console.log(321)
				ItsmeService.userownhomelife({
					page: 1,
					limit: 100
				}).then(res => {
					if (res.code === 1) {
						this.lifeList = res.data.user_life
						console.log(this.lifeList)
					}
				})
			},
			// 我的页面的数据(金币, 佣金,喜欢我,看过我)
			getuserMyOtherData() {
				CommonService.userMyOtherData().then(res => {
					uni.stopPullDownRefresh()
					if (res.code === 1) {
						this.dataNum = res.data
					}
				})
			},
			//查看图片
			examinePhoto(item, index, type) {
				if (type === 'life') {
					console.log(item)
					let images = item.attachment.map(item => {
						return formatImage(item.url)
					})
					uni.previewImage({
						current: index,
						urls: images
					})
				} else {
					let images = item.map(item => {
						return formatImage(item.url)
					})
					this.previewImgs = images
					setTimeout(() => {
						this.$refs.previewImage.open(index)
					}, 200)
					// uni.previewImage({
					// 	current: index,
					// 	urls: images
					// })
				}
			},
			seeWx(){
				if(this.user.is_vip && this.user.is_vip === 1 || this.user.gender === 0){
					this.toJumpPage(1,'/pages/my/seeWx')
				}else{
					uni.showToast({
						title:'仅VIP才能被解锁',
						icon:'none'
					})
				}
				
			},
			//微信分享
			shareLife(item) {
				console.log('我的页面的分享')
				let avatar = this.user.avatar ? this.user.avatar : 'images/logo.png'
				if (item.content !== '' && item.attachment.length === 0) { //纯文字
					console.log('有文字没图片的')
					this.shareWx(0, '来自' + this.user.city + '的' + this.user.nickname +
						'发布的新动态',
						"http://wap.shiwoaapp.com/#/", item.content, avatar, item
						.id)
					return false
				}
				let isVideo = item.attachment[0].url.substring(item.attachment[0].url.length - 3, item.attachment[0].url
					.length)
				console.log(isVideo)
				if (item.attachment.length !== 0 && (isVideo === 'png' || isVideo === 'jpg') && item.content === '') {
					console.log('有图片没文字的')
					this.shareWx(0, '来自' + this.user.city + '的' + this.user.nickname +
						'发布的新动态',
						"http://wap.shiwoaapp.com/#/", '告诉你一个APP，我下了，真实又靠谱，秘密使用。我的邀请码：' + this.user
						.invite_code, item.attachment[0].url, item
						.id)
				} else if (item.attachment.length !== 0 && item.content !== '' && (isVideo === 'png' || isVideo ===
						'jpg')) {
					console.log('有图片有文字的')
					this.shareWx(0, '来自' + this.user.city + '的' + this.user.nickname +
						'发布的新动态',
						"http://wap.shiwoaapp.com/#/", item.content, item.attachment[0].url, item.id)
				} else if (item.attachment[0].url && isVideo !== 'png' && isVideo !== 'jpg' && item
					.content === '') {
					console.log('有视频没文字的')
					this.shareWx(0, '来自' + this.user.city + '的' + this.user.nickname +
						'发布的新动态',
						"http://wap.shiwoaapp.com/#/", '告诉你一个APP，我下了，真实又靠谱，秘密使用。我的邀请码：' + this.user
						.invite_code, avatar, item
						.id)
				} else if (item.attachment[0].url && isVideo !== 'png' && isVideo !== 'jpg' && item
					.content !== '') {
					console.log('有视频有文字的')
					this.shareWx(0, '来自' + this.user.city + '的' + this.user.nickname +
						'发布的新动态',
						"http://wap.shiwoaapp.com/#/", item.content, avatar, item
						.id)
				}
			},
			//查看动态
			// 预览图片
			previewImage(index, item) {
				console.log(item)
				console.log(item.attachment)
				let images = item.attachment.map(item => {
					return formatImage(item.url)
				})
				uni.previewImage({
					current: index,
					urls: images
				})
			},
			//上传相册或发布动态
			operation(index) {
				if (index === 0) { // 1是动态  0 是相册
						this.toJumpPage(1, '/pages/edit/life')
				} else {
					this.isLife = false
					this.showDel = true
				}
			},
			//页面跳转
			toNavigateTo(url) {
				uni.navigateTo({
					url: url
				})
			},
			toPayPage(index) {
				if (this.user.gender === 1 || (this.user && this.user.is_real === 1)) {
					if (index === 1) {
						this.toNavigateTo('/pages/my/wallet')
					}
					if (index === 2) {
						uni.navigateTo({
							url: '/pages/my/commission'
						})
					}
					if (index === 3) {
						this.toNavigateTo('/pages/my/record?type=like')
					}
					if (index === 4) {
						this.toNavigateTo('/pages/my/record?type=foot')
					}
				} else {
					this.toShowPerfectPop()
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.my-top-box {
		height: 100rpx;
	}

	.life-three-num {
		width: 86rpx;
		height: 30rpx;
		border-radius: 20rpx;
		background: rgba($color: #000000, $alpha: 0.5);
	}

	.my-top-item {
		width: 100rpx;
		height: 100rpx;
	}

	.my-top-img {
		width: 35rpx;
		height: 35rpx;
	}

	.top-15 {
		top: 80rpx;
	}

	.avator-box {
		width: 160rpx;
		height: 160rpx;
		border-radius: 160rpx;
	}

	.itsme-user-worth {
		width: 20rpx;
		height: 20rpx;
	}

	.color-3F3C43 {
		color: #3F3C43;
	}

	.user-top-horn {
		width: 30rpx;
		height: 30rpx;
	}

	.life-three-num {
		width: 86rpx;
		height: 30rpx;
		border-radius: 20rpx;
		background: rgba($color: #000000, $alpha: 0.5);
	}

	.edit-avator {
		width: 45rpx;
		height: 45rpx;
		border-radius: 45rpx;
		overflow: hidden;
	}

	.vip-img {
		width: 85rpx;
		height: 46rpx;
	}

	.vip-img-2 {
		width: 60rpx;
		height: 46rpx;
	}

	.edit-userinfo-btn {
		width: 81rpx;
		height: 31rpx;
	}

	.my-tab-box {
		width: 200rpx;
	}

	.my-tab-img {
		width: 68rpx;
		height: 34rpx;
	}

	.my-photo-item {
		width: calc((100vw - 160rpx) / 3);
		height: calc((100vw - 160rpx) / 3);
	}

	.my-text-item {
		height: calc((100vw - 160rpx) / 3);
	}

	.my-photo-img {
		width: 30rpx;
		height: 30rpx;
	}

	.life-one-box {
		width: 410rpx;
		height: 410rpx;
	}

	.life-two-box {
		width: 300rpx;
		height: 410rpx;
	}

	.life-three-box {
		width: 190rpx;
	}

	.life-three-item {
		width: 190rpx;
		height: 190rpx;
	}

	.life-three-num {
		width: 86rpx;
		height: 30rpx;
		border-radius: 20rpx;
		background: rgba($color: #000000, $alpha: 0.5);
	}

	.left-btn-img {
		width: 44rpx;
		height: 44rpx;
	}

	.btn-img-1 {
		width: 48rpx;
		height: 48rpx;
	}

	.w-btn {
		width: 200rpx;
	}

	.btn-img {
		width: 40rpx;
		height: 40rpx;
	}

	.vip-img-1 {
		width: 353rpx;
		height: 27rpx;
	}

	.hidd-text {
		letter-spacing: 2px;
		/*字间距*/
		display: block;
		/*内联对象需加*/
		width: 5em;
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
</style>
