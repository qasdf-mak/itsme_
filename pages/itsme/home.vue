<template>
	<view class="width-full height100vh lh1 bg-itsme-1" v-if="userInfo"> 
		<!-- 顶部 -->
		<view class="fixed top left right" :class="isSticky ? 'bg-white fixed z-index' : ''">
			<view class="width-full" :style="'height:' + StatusBar + 'px;'" :class="isSticky ? 'bg-itsme-1' : ''">
			</view>
			<view class="width-full home-top-box" :class="isSticky ? 'bg-itsme-1' : ''">
				<view class="width-full height flex align-items-center bg-itsme-1" v-if="isSticky">
					<view class="icon_font fs30 color-white ml10" @click="goBack">
						&#xe60e;
					</view>
					<view class="flex-1 fs16 color-white fw600 text-center">
						{{userInfo.nickname}}
					</view>
					<view class="icon_font fs30 color-white mr15" @click="shieldingJudgment">
						&#xe613;
					</view>
				</view>
				<view class="width-full height flex align-items-center flex-between" v-else>
					<view class="top-nav-img flex align-items-center flex-center" @click="goBack">
						<image src="../../static/itsme/itsme_14.png" class="img_1" mode="widthFix"></image>
					</view>
					<view class="top-nav-img flex align-items-center flex-center" @click="shieldingJudgment">
						<image src="../../static/itsme/itsme_15.png" class="img_2" mode="widthFix"></image>
					</view>
				</view>
			</view>
		</view>
		<!-- 顶部 -->
		<!-- 头部照片 -->
		<view class="bg-main float-hidden relative avatar-img" @click="showoperation = false">
			<image :src="userInfo.avatar | avatarFormat" class="avatar-img float-hidden" mode="aspectFill"></image>
			<view class="absolute bottom left right">
				<image src="../../static/itsme/itsme_1.png" class="width-full" mode="widthFix"></image>
			</view>
			<view class="absolute left right bottom15">
				<view class="pl20  pb8 pt8">
					<view class="width-full flex align-items-center flex-between">
						<view class="flex align-items-center">
							<!-- <view
								class="name-bg pl8 pr8 pt5 pb5 bg-itsme-8  flex flex-center align-items-center mr10 br20">
								<view class="img-super-min flex mr5 ">
									<image src="/static/itsme/its_1.png" class="img-super-min" mode="widthFix"></image>
								</view>
								<view class="color-white fs10 flex">
									{{userInfo.worth}}
								</view>
							</view> -->
							<view class="fs18 color-white fw400">
								{{userInfo.nickname}}
							</view>
							<image src="/static/itsme/its_7.png" class="home-img-3 ml8" mode="widthFix"
								v-if="userInfo && userInfo.is_vip === 1"></image>
							<image src="/static/itsme/its_2.png" class="home-img-3 ml8" mode="widthFix" v-if="isReal">
							</image>
							<image src="../../static/itsme/itsme_11.png" class="home-img-3 ml8" mode="widthFix"
								v-if="isGoddess"></image>
						</view>
					</view>
					<view class="flex align-items-center mt10">
						<view class="flex align-items-center ">
							<view class="flex align-items-center fs12" v-if="isLogin">
								<view class="online-yes mr5"
									v-if="userInfo && userInfo.outtime && (nowTime1 - userInfo.outtime) < 24 * 60 * 60 || userInfo.is_online === 1">
								</view>
								<view class="online-no mr5"
									v-if="userInfo && userInfo.outtime && (nowTime1 - userInfo.outtime) > 1 * 24 * 60 * 60 && (nowTime1 - userInfo.outtime) < 7 * 24 * 60 * 60">
								</view>
								<view class="online-no2 mr5"
									v-if="userInfo && userInfo.outtime && (nowTime1 - userInfo.outtime) >  7 * 24 * 60 * 60">
								</view>
								<view class=" nowrap1 fs12 color-white" v-if="userInfo.is_online === 0">
									{{userInfo.outtime | indexTimeFilter(userInfo.server_time)}}
								</view>
								<view class=" nowrap1 fs12 color-white" v-else>
									活跃
								</view>
							</view>
							<view class="flex align-items-center" v-else>
								<view class="dots mr6"> </view>
								<view class=" nowrap1 fs12 color-white">
									活跃
								</view>
							</view>
						</view>
						<view class="color-white fs12 ml10">
							<text class="ml3"> {{userInfo.gender === 1 ? '男' : '女' }} /</text>
							<text class="ml3"> {{userInfo.age}} /</text>
							<text class="ml3"> {{userInfo.profession}}</text>
						</view>
					</view>
					<view class="width-full flex align-items-center mb8 mt10">
						<view class="flex align-items-center flex-1" v-if="isLogin">
							<view class="color-white fs12 flex">
								<text class="nowrap fs15">{{userInfo.distance}}</text> <text class="ml10 nowrap">
									{{userInfo.city}}
								</text>
							</view>
						</view>
					</view>
					<view
						class="absolute right bottom20 matchingBox bg-itsme-1 fs12 color-white flex flex-center align-items-center">
						<text class="fs17 fw600 mr8">{{userInfo.match}}% </text>匹配度
					</view>
				</view>
			</view>
			<view class="absolute left right bottom avatar-bot-white bg-itsme-1"></view>
		</view>
		<!-- 头部照片 -->
		<view class="width-full bg-itsme-1" id="home-nav" @click="showoperation = false">
			<!-- tab栏 -->
			<view class="width-full">
				<view class="width-full bg-itsme-1" :style="navTop" :class="isSticky ? 'fixed' : 'initial'">
					<view class="pr35 pl35 ml15 pl15 border-box itsme-home-tab">
						<u-tabs :list="tabList" :is-scroll="false" inactive-color="#9E9E9F" font-size="32" height="100"
							bg-color="#1A1A1F" bar-height="8" bar-width="20" active-color="#D97DB0"
							:current="tabCurrent" @change="changeTabs"></u-tabs>
					</view>
				</view>
				<view class="pt25 pb25" v-if="isSticky"></view>
			</view>
			<!-- tab栏 -->
			<view class="width-full mt15">
				<!-- 用户信息 -->
				<view class="width-full pl12 pr12 border-box" v-if="tabCurrent === 0">
					<!-- 解锁微信 -->
					<view class="" v-if="showWx">
						<view class="WX-box pl25 pr25 flex bg-itsme-2" v-if="userInfo.gender === 0"
							@click="isShowWxPop">
							<!-- showWx && user.gender === 1 -->
							<view class="flex-1 flex flex flex-col">
								<view class="flex align-items-center pt12 pb5">
									<view class="icon_font fs23 color-white">
										&#xe648;
									</view>
									<view class="ml20 fs12 color-white">
										{{userWx.wxCode}}
									</view>
								</view>
								<view class="flex color-white mb15 align-items-center">
									<view class="fs14 mr5">
										升级为
									</view>
									<view class="vip-img">
										<image src="/static/itsme/home/home_1.png" class="vip-img" mode="widthFix"></image>
									</view>
									<view class="fs14 ml5">
										可成功解锁微信
									</view>
								</view>
							</view>
							<view class="flex align-items-center">
								<view class="WX-btn bg-white color-itsme-2 fw600 text-center">
									{{isLook ? '查看' : '解锁'}}
								</view>
							</view>
						</view>
						<view class="" v-else>
							<view class="WX-box pl25 pr25 flex bg-itsme-2" v-if="userInfo.is_vip === 1" @click="isShowWxPop">
								<!-- showWx && user.gender === 1 -->
								<view class="flex-1 flex flex flex-col">
									<view class="flex align-items-center pt12 pb5">
										<view class="icon_font fs23 color-white">
											&#xe648;
										</view>
										<view class="ml20 fs12 color-white">
											{{userWx.wxCode}}
										</view>
									</view>
									<view class="flex color-white mb15 align-items-center" v-if="user.gender === 1">
										<view class="fs14 mr5">
											升级为
										</view>
										<view class="vip-img">
											<image src="/static/itsme/home/home_1.png" class="vip-img" mode="widthFix">
											</image>
										</view>
										<view class="fs14 ml5">
											可成功解锁微信
										</view>
									</view>
									<view class="flex color-white mb15 align-items-center" v-else>
										<view class="fs14 mr5">
											解锁微信让你更加了解TA
										</view>
									</view>
								</view>
								<view class="flex align-items-center">
									<view class="WX-btn bg-white color-itsme-2 fw600 text-center">
										{{isLook ? '查看' : '解锁'}}
									</view>
								</view>
							</view>
						</view>
					</view>
					<!-- 解锁微信 -->
					<!-- 认证情况 -->
					<view
						class="WX-box bg-itsme-4 mt30 mb25 pt8 pb8  width-full text-center fs12 color-itsme-2 flex align-items-center"
						v-if="user && user.gender === 0 && userInfo.gender === 1 && userInfo.is_vip === 0">
						<view class="dot bg-itsme-2 ml15 mr10"> </view>
						对方还不是会员，发展他为会员可以获得奖励。
					</view>
					<view
						class="WX-box bg-itsme-4 mt30 mb25 pt8 pb8  width-full text-center fs12 color-itsme-2 flex align-items-center"
						v-if="userInfo.gender === 0 && isReal && !isGoddess">
						<view class="dot bg-itsme-2 ml15 mr10"> </view>
						真人认证：已通过人脸识别，可放心与对方畅聊
					</view>
					<view
						class="WX-box bg-itsme-4 mt30 mb25 pt8 pb8  width-full text-center fs12 color-itsme-2 flex align-items-center"
						v-if="userInfo.gender === 0 && isGoddess">
						<view class="dot bg-itsme-2 ml15 mr10"> </view>
						女神认证：已通过平台的女神认证，属于高端资源
					</view>
					<!-- 认证情况 -->
					<view class="width-full bg-itsme-4 WX-box" v-if="userInfo && userInfo.user_photo.length > 0">
						<view class="width-full flex align-items-center flex-between mb15 pt15 pb3"
							@click="toPhotoList">
							<view class="fs16 pl15 color-white fw600">
								相册
							</view>
							<view class="flex align-items-center pr12" v-if="isLogin">
								<view class="fs10 color-white fw200">
									<!-- {{userInfo.photocount}}张 --> 查看更多
								</view>
								<view class="icon_font fs10 mt3 color-white ml5">
									&#xe60f;
								</view>
							</view>
						</view>
						<view class="width-full flex flex-wrap pb8 pl12">
							<view v-for="(item,index) in userPhoto" :key="index">
								<view class="mb8" :class="(index + 1) % 3 === 0 ? '' : 'mr6'">
									<photo-item :item="item" isHome @clickPhoto="clickPhoto(index)"></photo-item>
								</view>
							</view>
						</view>
					</view>
					<!-- 标签 -->
					<view class="width-full mt30" v-if="userexpect && userexpect.length > 0">
						<view class="pl15 pr15 pb10 bg-itsme-4 box-shadow-login br10">
							<view class="fs16 color-white pt15 pb6 fw600">
								{{ userInfo.expect.name}}
							</view>
							<view class="flex flex-wrap ">
								<view class=" mb10" v-for="(item,index) in userexpect" :key="index">
									<view class="labelbox color-black fs14 pl10 pr10 mt10 ml15 mr15"
										:style="{'background-color':item.color}">
										{{item.name}}
									</view>
								</view>
							</view>
						</view>
					</view>
					<!-- 标签 -->
					<!-- 信息 -->
					<view class="width-full mt30 ">
						<view class="pl15 pt20  pr15 pb10 bg-itsme-4 box-shadow-login br10">
							<view class="fs16 pb15 color-white fw600">
								信息
							</view>
							<view class="width-full mb20 flex align-items-start">
								<view class="fs14 color-itsme-10 mr5 lh15">
									常驻城市：
								</view>
								<view class="flex-1">
									<view class="lh15 fs14 color-white fw600" v-if="userInfo && userInfo.city">
										{{userInfo.city}}
									</view>
									<view class="lh15 fs14 color-main6 fr mr35" v-else @click="toInvite('a')">
										邀请填写
									</view>
								</view>
							</view>
							<view class="width-full mb20 flex align-items-start">
								<view class="fs14 color-itsme-10 mr5 lh15">
									职&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;业：
								</view>
								<view class="flex-1">
									<view class="lh15 fs14 color-white fw600" v-if="userInfo && userInfo.profession">
										{{userInfo.profession}}
									</view>
									<view class="lh15 fs14 color-main6 fr mr35" v-else @click="toInvite('a')">
										邀请填写
									</view>
								</view>
							</view>
							<view class="width-full mb20 flex align-items-start">
								<view class="fs14 color-itsme-10 mr5 lh15">
									身&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;高：
								</view>
								<view class="flex-1">
									<view class="lh15 fs14 color-white fw600" v-if="userInfo && userInfo.height">
										{{userInfo.height}}
									</view>
									<view class="lh15 fs14 color-main6 fr mr35" v-else @click="toInvite('a')">
										邀请填写
									</view>
								</view>
							</view>
							<view class="width-full mb20 flex align-items-start">
								<view class="fs14 color-itsme-10 mr5 lh15">
									体&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;重：
								</view>
								<view class="flex-1">
									<view class="lh15 fs14 color-white fw600" v-if="userInfo && userInfo.weight">
										{{userInfo.weight}}
									</view>
									<view class="lh15 fs14 color-main6 fr mr35" v-else @click="toInvite('a')">
										邀请填写
									</view>
								</view>
							</view>
							<view class="width-full mb20 flex align-items-start">
								<view class="fs14 color-itsme-10 mr5 lh15">
									生&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日：
								</view>
								<view class="flex-1">
									<view class="lh15 fs14 color-white fw600" v-if="userInfo && userInfo.birthday">
										{{userInfo.birthday}}
									</view>
									<view class="lh15 fs14 color-main6 fr mr35" v-else @click="toInvite('a')">
										邀请填写
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<!-- 用户信息 -->
				<!-- 动态 -->
				<view class="width-full border-box" v-if="tabCurrent === 1">
					<view class="width-full">
						<view class="width-full mt15">
							<view class="width-full fs16 pl15 fw900 mb15">
							</view>
						</view>
						<view v-for="(item,index) in discoverList" :key="index">
							<view class="width-full mb25" v-if="discoverList.length > 0">
								<discover-dynamic :item="item" :userInfo="userInfo" isMeet :isMy="true"
									:isLogin="isLogin" :fromTheTop="fromTheTop" @changeLike="changeLike(index)"
									@changefabulous="changefabulous(index,item)" @shareWxPop="shareWxPop">
								</discover-dynamic>
							</view>
						</view>
						<view class="width-full" v-if="discoverList.length === 0">
							<empty-tip type="life"></empty-tip>
						</view>
						<view class="width-full pt30 pb15"
							v-if="discoverList && discoverList.length > 0 && pages.finish">
							<u-divider bg-color="">没有更多了</u-divider>
						</view>
					</view>
				</view>
				<!-- 动态 -->
			</view>
		</view>
		<view class="mt35 mb35 pb15 pt15"></view>
		<view class="mt35 mb35 pb35 pt35"></view>
		<view class="fixed bottom left right bg-itsme-1 pb_iphoneX_safe">
			<view class="pl15 pr15 pt10 pb20 flex align-items-center">
				<view class="flex-1 flex align-items-center flex-center" v-if="!isLike">
					<view class="flex-1 flex flex-center relative" @click="changeLike">
						<image src="../../static/itsme/home/home_2.png" class="pop-img-1 fixed bottom80" mode=""
							v-if="tabCurrent === 0 && isSticky"></image>
						<image src="../../static/itsme/home/home_5.png" class="pop-img-2 fixed bottom80" mode=""
							v-if="tabCurrent === 1 && discoverList.length !== 0 && pages.page > 1"></image>
						<view class="like-btn">
							<image src="../../static/itsme/home/home_4.png" class="like-btn" mode=""></image>
						</view>
					</view>
					<view class="flex-1 flex flex-center" @click=" toChat">
						<view class="like-btn">
							<image src="../../static/itsme/home/home_3.png" class="like-btn" mode=""></image>
						</view>
					</view>
				</view>
				<view class="pl35 pr35 flex-1" v-else>
					<view class="flex-1 flex align-items-center flex-center" @click="toChat">
						<image src="../../static/itsme/home/home_3.png" class="like-btn" mode=""></image>
					</view>
				</view>
			</view>
		</view>
		<!-- 媒体浏览 -->
		<view v-if="showLook">
			<media-list type="list" :list="userPhoto" :current="lookIndex" :isLogin="isLogin" @toPayMember="toPayMember"
				@changeMediaStatus="changeMediaStatus" @closeMedia="showLook = false"></media-list>
		</view>
		<!-- 媒体浏览 -->
		<!-- 顶部操作框 -->
		<view class="fixed left right flex align-items-center flex-right" :style="topRightTop" v-if="showoperation">
			<view class="mr15 bg-white br5 box-shadow-index operation-box pl5 pr5 border-box">
				<view v-for="(item,index) in operationList" :key="index">
					<view class="width-full item flex align-items-center flex-center b-t-1 line-color-2"
						@click="operationClick(item.type,index)">
						<view class="icon_font fs15 black-color fw600" v-html="item.icon"></view>
						<view class="fs15 color-deep fw600 ml8">
							{{item.title}}
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 顶部操作框 -->
		<!-- 拉黑提示 -->
		<!-- 	<custom-pop :showPop="showSetBlack" confirmText="确定" cancelText="取消" contentTitle="确定要将对方拉黑吗？" :meiNv="3"
			@confirm="setBlack" @cancel="showSetBlack = false"></custom-pop> -->
		<!-- 拉黑提示 -->
		<unify-pop :showUnify="showUnifyPop" :type="unifyType" @closePop="showUnifyPop = false" @setBlack='setBlack'
			@rechargeM="goWallet">
		</unify-pop>
		<!-- 完善资料 -->
		<view class="width-full" v-if="showPerfectPop">
			<perfect-pop @refreshTheList="refreshTheList" @closePerfectPop="toHidePerfectPop">
			</perfect-pop>
		</view>
		<!-- 完善资料 -->
		<!-- 充值vip弹框 -->
		<view v-if="showMemberPay">
			<member-pay :showMemberPay="showMemberPay" :centent="memberCentent" @closeVipPop="showMemberPay = false"
				@closePop="showMemberPay = false" @paySuccess="showMemberPay = false">
			</member-pay>
		</view>
		<!-- 充值vip弹框 -->
		<!-- 获取微信弹框 -->
		<view class="" v-if="showWxPop">
			<get-user-wx :showWxPop="showWxPop" :item="userInfo" @closeWxPop="showWxPop = false"></get-user-wx>
		</view>
		<!-- 获取微信弹框 -->
		<u-toast z-index="9999999999999999" ref="uToast" />
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
	// 接口相关
	import ItsmeService from '../../common/service/itsme-service.js'
	import UserService from '../../common/service/user-service.js'
	import TaskService from '../../common/service/task-service.js'
	import CommonService from '../../common/service/common-service.js'
	import discoverService from '../../common/service/discover-service.js'
	import discoverDynamic from '../../components/discover/dynamic.vue'
	// 媒体组件
	import photoItem from '../../components/photo/item.vue'
	// 动态组件
	import lifeItem from '../../components/life/item.vue'
	// 媒体预览
	import mediaList from '../../components/common/medialist.vue'
	//WX 弹框
	import getUserWx from '../../components/common/getUserWx.vue'

	import {
		formatImage
	} from '../../common/utils/common-methods.js'
	export default {
		data() {
			return {
				likeIng: false,
				isLogin: false,
				taskInfo: null,
				isSticky: false,
				userId: '',
				userexpect: [],
				fromTheTop: '',
				jyLabel: true,
				zsLabel: true,
				xqLabel: true,
				userInfo: null,
				userTag: null,
				userPhoto: null,
				showLook: false,
				matchedDegree: Number,
				showMemberPay: false,
				memberCentent: '',
				lookIndex: 0,
				tabList: [{
					name: '个人信息'
				}, {
					name: 'Me圈'
				}],
				tabCurrent: 0,
				discoverList: [], // 动态列表
				pages: {
					page: 1,
					size: 3,
					finish: false
				},
				showWx: false,
				blackType: '',
				showoperation: false,
				operationList: [{
						title: '拉黑',
						icon: '&#xe665;',
						type: 'black'
					}, {
						title: '举报',
						icon: '&#xe649;',
						type: 'report'
					},
					{
						title: '分享',
						icon: '&#xe66d;',
						type: 'shareUser'
					}
				],
				yaoqingtianxie: '邀请填写',
				blacklist: null,
				showWxPop: false,
				nowTime1: Math.ceil(new Date().getTime() / 1000),
				userWx: {
					wxCode: '',
					originaPrice: '',
					price: ''
				},
				isLook: false,
				isRefresh: null
			}
		},
		onShow() {
			if (this.isLogin) {
				this.getUserInfo(1)
			}
		},
		onLoad(options) {
			this.init(options)
			this.matchedDegree = this.random(90, 70)
		},
		onPullDownRefresh() {
			// 用户信息
			this.getUserInfo(1)
			// 动态
			this.discoverList = []
			this.pages = {
				page: 1,
				size: 3,
				finish: false
			}
			this.getDiscoverList()
			// Me约
			this.getTaskInfo()
		},
		onPageScroll(e) {
			this.showoperation = false
			this.fromTheTop = e.scrollTop
			this.setSticky(e.scrollTop)
		},
		onReachBottom() {
			if (!this.pages.finish && this.isLogin) {
				this.pages.page++
				this.getDiscoverList()
			}
		},
		computed: {
			...mapGetters(['likeList']),
			navTop() {
				if (this.isSticky) {
					return 'top:' + (this.StatusBar + uni.upx2px(100)) + 'px'
				} else {
					return ''
				}
			},
			isLabel() {
				if (this.userInfo.expect) {
					return true
				} else {
					return false
				}
			},
			topRightTop() {
				return 'top: calc(100rpx + ' + this.StatusBar + 'px)'
			},
			isReal() {
				if (this.userInfo && this.userInfo.is_real === 1) {
					return true
				} else {
					return false
				}
			},
			isGoddess() {
				return false
			},
			isLike() {
				if (this.isLogin) {
					if (this.userInfo && this.userInfo.is_like === 1) {
						return true
					} else {
						return false
					}
				} else {
					if (this.userInfo && this.likeList && this.likeList.indexOf(this.userInfo.id) !== -1) {
						return true
					} else {
						return false
					}
				}
				return false
			},

		},
		components: {
			photoItem,
			lifeItem,
			mediaList,
			discoverDynamic,
			getUserWx
		},
		methods: {
			...mapActions(['LIKE_LIST', 'IS_LIKE', 'IFTHE_REFRESH']),
			init(options) {
				Object.assign(this.$data, this.$options.data())
				this.loginExpire().then(res => {
					this.isLogin = res
					this.userId = options.id
					this.blackType = options.type
					this.isRefresh = options.isRefresh
					let index = this.isRefresh ? this.isRefresh : 2
					// 用户信息
					this.getUserInfo(index)
					// 动态
					this.getDiscoverList()
					// 获取微信
					this.getUserWx()
				})
			},
			random(lower, upper) {
				return Math.floor(Math.random() * (upper - lower)) + lower;
			},
			//获取对方微信号
			getUserWx() {
				UserService.checkWx({
					to_user_id: this.userId
				}).then((res) => {
					if (res.code === 0) { // 没有微信号
						console.log('没有微信')
					}
					if (res.code === 1) { // 有微信号，并且可以查看
						this.showWx = true
						this.userWx.wxCode = res.data.wx
						this.isLook = true
					}
					if (res.code === 2) { // 有微信号，但是不能查看
						this.showWx = true
						this.userWx.wxCode = res.data.wx
						this.userWx.originaPrice = res.data.origina_price
						this.userWx.price = res.data.price
					}
					console.log(this.userWx)
				})
			},
			//购买微信
			unlockWx() {
				UserService.BuyUserWx({
					to_user_id: this.userId
				}).then(res => {
					if (res.code === 2) {
						this.showUnifyPop = true
						this.unifyType = 29
					}
					if (res.code === 1) {
						this.isLook = true
						this.getUserWx()
					}
				})
			},
			// 页面滚动，监听头部事件
			setSticky(scrollTop) {
				if (scrollTop < (this.windowWidth - this.StatusBar - uni.upx2px(100))) {
					this.isSticky = false
				} else {
					this.isSticky = true
				}
			},
			// 用户信息
			getUserInfo(index) {
				ItsmeService.userhomeinfo({
					user_id: this.userId,
					refresh: index
				}).then(res => {
					uni.stopPullDownRefresh()
					if (res.code === 1) {
						console.log(res)
						this.userInfo = res.data
						if (res.data && res.data.user_photo && res.data.user_photo.length > 0) {
							if (res.data.user_photo.length > 3) {
								this.userPhoto = res.data.user_photo.slice(0, 3)
							} else {
								this.userPhoto = res.data.user_photo
							}
						}
						console.log(this.userPhoto)
						if(res.data && res.data.expect && res.data.expect.data.length > 0){
							this.userexpect = res.data.expect.data.map(res => {
								let colors = ['#DFE6FD', '#E5FCF6', '#FDFDD7', '#F9E6FD',
									'#FDE3E2'
								]
								let rand = Math.floor(Math.random() * 5);
								let item = {}
								item.expect_id = res.expect_id
								item.name = res.name
								item.user_id = res.user_id
								item.color = colors[rand]
								return item
							})
							console.log(this.userexpect)
						}
					}
				})
			},
			//解锁微信
			isShowWxPop() {
				if (this.isLogin) {
					if (this.user.gender === this.userInfo.gender) {
						this.$refs.uToast.show({
							title: '同性之间，不可查看微信哦',
							duration: 1500,
						})
					} else {
						this.showWxPop = true
					}
				} else {
					this.$refs.uToast.show({
						title: '请先登录',
						duration: 1500,
						url: '/pages/login/index'
					})
				}
			},
			// 去聊天
			toChat() {
				if (this.isLogin) {
					let userIsReal = false
					if (this.user.certify) {
						let certify = JSON.parse(this.user.certify)
						userIsReal = certify.real && certify.real.verified
					}
					// 女性非真人点击喜欢提示去真人认证
					if (this.user.gender === 0 && !userIsReal) {

						this.$emit('userRefuse', 'like', 1)
						return false
					}
					// 同性不能点击喜欢
					if (this.user.gender === this.item.gender) {
						this.$emit('userRefuse', 'like', 2)
						return false
					}
					this.toOpenChat('itsmelist', this.item.id)
				} else {
					uni.navigateTo({
						url: '/pages/login/index'
					})
				}
			},
			//是否点赞
			changefabulous(index, item) {
				console.log('this.discoverList')
				console.log(this.discoverList)
				console.log(item)
				if (this.discoverList[index].is_fabulous === 1) {
					this.discoverList[index].is_fabulous = 0
					this.discoverList[index].like--
					console.log(item.like)
				} else {
					this.discoverList[index].is_fabulous = 1
					this.discoverList[index].like++
					console.log(item.like)
				}
			},
			//分享
			shareWxPop(item) {
				let user = this.userInfo
				let avatar = user.avatar ? user.avatar : 'images/logo.png'
				if (item.content !== '' && item.attachment.length === 0) {
					console.log('有文字没图片的')
					this.shareWx(0, '来自' + user.city + '的' + user.nickname +
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
					this.shareWx(0, '来自' + user.city + '的' + user.nickname + '发布的新动态', "http://wap.shiwoaapp.com/#/",
						'告诉你一个APP，我下了，真实又靠谱，秘密使用。我的邀请码：' + this.user.invite_code,
						item.attachment[0].url, item.id)
				} else if (item.attachment.length !== 0 && item.content !== '' && (isVideo === 'png' || isVideo ===
						'jpg')) {
					console.log('有图片有文字的')
					this.shareWx(0, '来自' + user.city + '的' + user.nickname + '发布的新动态', "http://wap.shiwoaapp.com/#/",
						item.content,
						item.attachment[0].url, item.id)
				} else if (item.attachment[0].url && isVideo !== 'png' && isVideo !== 'jpg' && item
					.content === '') {
					console.log('有视频没文字的')
					this.shareWx(0, '来自' + user.city + '的' + user.nickname + '发布的新动态', "http://wap.shiwoaapp.com/#/",
						'告诉你一个APP，我下了，真实又靠谱，秘密使用。我的邀请码：' + this.user.invite_code,
						avatar, item.id)
				} else if (item.attachment[0].url && isVideo !== 'png' && isVideo !== 'jpg' && item
					.content !== '') {
					console.log('有视频有文字的')
					this.shareWx(0, '来自' + user.city + '的' + user.nickname + '发布的新动态', "http://wap.shiwoaapp.com/#/", item
						.content,
						avatar, item.id)
				}
			},
			// 格式化标签信息
			formatTag(tag) {
				let lable = {}
				for (let i = 0; i < tag.length; i++) {
					lable[tag[i].code] = tag[i]
				}
				if (lable && lable.jymd) {
					if (lable.jymd.item && lable.jymd.item.length > 0) {
						for (let i = 0; i < lable.jymd.item.length; i++) {
							if (i === 0) {
								lable.jymd.content = lable.jymd.item[i].name
							} else {
								lable.jymd.content = lable.jymd.content + ' / ' + lable.jymd.item[i].name
							}
						}
					}
				}
				if (lable && lable.qwdx) {
					if (lable.qwdx.item && lable.qwdx.item.length > 0) {
						for (let i = 0; i < lable.qwdx.item.length; i++) {
							if (i === 0) {
								lable.qwdx.content = lable.qwdx.item[i].name
							} else {
								lable.qwdx.content = lable.qwdx.content + ' / ' + lable.qwdx.item[i].name
							}
						}
					}
				}
				if (lable && lable.profession) {
					if (lable.profession.item && lable.profession.item.length > 0) {
						lable.profession.content = lable.profession.item[0].name
					}
				}
				return lable
			},
			changeTabs(index) {
				this.tabCurrent = index
				this.pages.page = 1
			},
			toPhotoList() {
				uni.navigateTo({
					url: '/pages/itsme/photolist?name=' + this.userInfo.nickname + '&id=' + this.userInfo.id
				})
			},
			// 动态
			getDiscoverList() {
				ItsmeService.userhomelife({
					user_id: this.userId,
					page: this.pages.page,
					limit: this.pages.size
				}).then(res => {
					if (res.code === 1 && res.data) {
						this.pages.finish = false
						this.discoverList = this.discoverList.concat(res.data.map(item => {
							if (item.attachment && item.attachment.length > 1) {
								item.attachment.map(att => {
									att.image = formatImage(att.url)
									return att
								})
							}
							return item
						}))
						console.log(this.discoverList)
					} else {
						this.pages.finish = true
					}
				})

			},
			// 点击查看图片
			clickPhoto(index) {
				this.lookIndex = index
				this.showLook = true
			},
			// 去聊天
			toChat() {
				if (this.isLogin) {
					let userIsReal = false
					if (this.user.is_real === 1) {
						userIsReal = true
					}
					// 女性非真人点击喜欢提示去真人认证
					if (this.user.gender === 0 && !userIsReal) {
						this.toShowPerfectPop()
						return false
					}
					// 同性不能点击喜欢
					if (this.user.gender === this.userInfo.gender) {
						uni.showToast({
							title: '对方与您性别相同，只能观赏不能互动喔~',
							icon: 'none'
						})
						return false
					}
					this.toOpenChat('home', this.userId)
				} else {
					uni.navigateTo({
						url: '/pages/login/index'
					})
				}
			},
			//q去充值
			goWallet() {
				this.showUnifyPop = false
				this.toJumpPage(1, '/pages/my/wallet')
			},
			// 喜欢操作
			changeLike() {
				if (this.isLogin) {
					let userIsReal = false
					if (this.user.is_real === 1) {
						userIsReal = true
					}
					// 女性非真人点击喜欢提示去真人认证
					if (this.user.gender === 0 && !userIsReal) {
						console.log(123)
						this.toShowPerfectPop()
						return false
					}
					// 同性不能点击喜欢
					if (this.user.gender === this.userInfo.gender) {
						uni.showToast({
							title: '对方与您性别相同，只能观赏不能互动喔~',
							icon: 'none'
						})
						return false
					}
					if (!this.likeIng) {
						this.likeIng = true
						if (this.userInfo.is_like === 1) {
							console.log('1111111111111111111')
							this.setUserLike('list', 'del', this.userInfo).then(res => {
								this.userInfo.is_like = 0
								this.likeIng = false
								this.IS_LIKE(this.userInfo.id)
								console.log(321)
							})
						} else {
							console.log('1111111111111111111')
							console.log(this.userInfo)
							this.setUserLike('list', 'plus', this.userInfo).then(res => {
								this.userInfo.is_like = 1
								this.likeIng = false
								this.IS_LIKE(this.userInfo.id)
								console.log(123)
							})
						}
					}
				} else {
					let likes = JSON.parse(JSON.stringify(this.likeList))
					if (likes && likes.length > 0 && likes.indexOf(this.userInfo.id) !== -1) {
						likes.splice(likes.indexOf(this.userInfo.id), 1)
						this.LIKE_LIST(likes)
					} else {
						if (likes && likes.length >= 2) {
							likes.push(this.userInfo.id)
							this.LIKE_LIST(likes)
							uni.navigateTo({
								url: '/pages/login/index'
							})
						} else {
							likes.push(this.userInfo.id)
							this.LIKE_LIST(likes)
						}
					}
				}
			},
			// 顶部下拉操作
			operationClick(type) {
				// 拉黑
				console.log(this.userInfo)
				let userInfo = this.userInfo
				if (type === 'black') {
					this.showUnifyPop = true
					this.unifyType = 16
				} else if (type === 'report') {
					uni.showToast({
						title: '举报成功',
						icon: 'none'
					})
				} else {
					let sex = userInfo.gender === 1 ? '小哥哥' : '小姐姐'
					let avatar = userInfo.avatar ? userInfo.avatar : '/images/logo.png'
					let height = userInfo.height ? userInfo.height : '175'
					let city = userInfo.city ? userInfo.city : '太原市'
					let weight = userInfo.weight ? userInfo.weight : '60'
					console.log(userInfo.expect)
					let expect = userInfo.expect.data.name ? userInfo.expect.data.name : '吃,喝,玩'
					this.shareWx(0, "发现一位" + city + "宝藏" + sex + userInfo.nickname + ",推荐给你",
						"http://home.shiwoaapp.com/#/", "身高：" + height + "cm ，体重：" + weight +
						"kg ，年龄" +
						userInfo.age + "岁，交友目的：" + expect, avatar, userInfo.id)
				}
				this.showoperation = false
			},
			// 拉黑
			setBlack() {
				this.showUnifyPop = false
				UserService.doblack({
					user_id: this.userId
				}).then(res => {
					this.$refs.uToast.show({
						title: res.msg,
						duration: 1500
					})
					if (this.blackType === 'msg') {
						console.log(123)
						setTimeout(() => {
							uni.switchTab({
								url: '/pages/message/index'
							})
						}, 500)
					} else {
						setTimeout(() => {
							uni.navigateBack({
								delta: 1
							})
						}, 500)
					}
				})
				this.IFTHE_REFRESH(true)
			},
			// 邀请
			toInvite() {
				if (this.isLogin) {
					if (this.isReal) {
						this.$refs.uToast.show({
							title: '已邀请'
						})
						this.invitedToFillOut('home', this.userInfo).then(res => {})
					} else {
						this.$refs.uToast.show({
							title: '请先完成真人认证',
						})
					}
				} else {
					this.$refs.uToast.show({
						title: '请先登录',
					})
				}
			},
			// 媒体预览操作
			changeMediaStatus(type, index, status) {
				if (type === 'start') {
					this.userPhoto[index].rule_type = 2
					CommonService.readphoto({
						photo_id: this.userPhoto[index].id
					}).then(res => {
						if (res.code === 1) {
							console.log('浏览成功！')
							console.log(123)
						}
					})
				}
				if (type === 'end') {
					this.userPhoto[index].rule_type = status
					this.userPhoto[index].is_read = 1
				}
				if (type === 'money') {
					this.userPhoto[index].rule_type = status
					this.userPhoto[index].is_read = 1
					CommonService.readphoto({
						photo_id: this.userPhoto[index].id
					}).then(res => {
						if (res.code === 1) {
							console.log('浏览成功！')
							console.log(321)
						}
					})
				}
			},
			//拉黑提示
			shieldingJudgment() {
				if (this.isLogin) {
					this.showoperation = !this.showoperation
				} else {
					uni.showToast({
						icon: 'none',
						title: '请先登录'
					})
				}
			},
			//邀请填写提示
			reminderForInvitationFilling() {
				if (this.isLogin) {
					uni.showToast({
						icon: 'none',
						title: '正在通知对方'
					})
				} else {
					uni.showToast({
						icon: 'none',
						title: '请先登录'
					})
				}
			},
			toPayMember() {
				this.showMemberPay = true
				this.memberCentent = '升级会员即可免费查看会员照片'
			},

		}
	}
</script>

<style lang="scss" scoped>
	.top-nav-img {
		width: 100rpx;
		height: 100rpx;

		.img_1 {
			width: 35rpx;
		}

		.img_2 {
			width: 65rpx;
		}
	}

	.avatar-img {
		width: 100vw;
		height: 100vw;
	}

	.name-bg {
		border-radius: 15rpx;
	}

	.avatar-bot-white {
		height: 30rpx;
	}

	.avatar-lable {
		width: 105rpx;
	}

	.WX-box {
		border-radius: 20rpx;
	}

	.avatar-distance {
		width: 26rpx;
	}

	.online-yes {
		width: 14rpx;
		height: 14rpx;
		border-radius: 14rpx;
		background: #3DE89C;
	}

	.online-no {
		width: 14rpx;
		height: 14rpx;
		border-radius: 14rpx;
		background: #0f80cf;
	}

	.online-no2 {
		width: 14rpx;
		height: 14rpx;
		border-radius: 14rpx;
		background: #fcbf57;
	}

	.bottom80 {
		bottom: 170rpx;
	}

	.avatar-num {
		&-left {
			width: 54rpx;
		}

		&-right {
			font-size: 82rpx;
			background-image: linear-gradient(to bottom, #FFCC00, #ED934B);
			-webkit-background-clip: text;
			/*必需加前缀 -webkit- 才支持这个text值 */
			-webkit-text-fill-color: transparent;
			/*text-fill-color会覆盖color所定义的字体颜色： */
		}
	}

	.home-bot-btn {
		height: 90rpx;
		border-radius: 90rpx;
		box-shadow: 0 0 8rpx #EEEEEE !important;
	}

	.home-bot-img {
		width: 90rpx;
	}

	.home-top-box {
		height: 100rpx;
	}

	.operation-box {
		width: 200rpx;

		.item {
			height: 100rpx;
		}

		.black-color {
			color: #BF0000;
		}
	}

	.home-img-1 {
		width: 30rpx;
	}

	.home-img-3 {
		width: 46rpx;
		height: 46rpx;
	}

	.home-img-2 {
		width: 40rpx;
	}

	.task-dian {
		width: 8rpx;
		height: 8rpx;
		border-radius: 8rpx;
		background: #F3CEB0;
	}

	.task-gift-item {
		width: 120rpx;
		height: 60rpx;
	}

	.like-btn {
		width: 335rpx;
		height: 70rpx;
	}

	.chat-btn {
		height: 90rpx;
		background: #FFFFFF;
		box-shadow: 0rpx 5rpx 12rpx 0rpx rgba(217, 125, 213, 0.63);
		border-radius: 45rpx;
	}

	.color-dominant-hue {
		color: #D97DB0;
	}

	.task-gift-img {
		width: 60rpx;
		height: 60rpx;
	}

	.matched-degree-small {
		height: 40rpx;
		line-height: 38rpx;
		text-align: center;
		border-radius: 20px;
		white-space: nowrap;
		background: linear-gradient(-90deg, #E44D7B 0%, #EA89BF 100%);
	}

	.matched-degree-big {
		width: 100%;
		background: rgba($color: #eee, $alpha: 0.6);
		border-radius: 20px;

	}

	.w-100 {
		width: 200rpx;
		height: 40rpx;
	}

	.pop-img-1 {
		width: 260rpx;
		height: 132rpx;
	}

	.pop-img-2 {
		width: 260rpx;
		height: 132rpx;
	}

	.labelbox {
		height: 40rpx;
		text-align: center;
		line-height: 38rpx;
		border-radius: 8rpx;
	}

	.height-box {
		height: 54rpx;
		line-height: 50rpx;
	}

	.img-super-min {
		width: 19rpx;
		height: 19rpx;
	}

	.matchingBox {
		width: 240rpx;
		height: 60rpx;
		opacity: 0.8;
		border-radius: 30rpx 0px 0px 30rpx;
	}

	.vip-img {
		width: 71rpx;
		height: 38rpx;
	}

	.WX-btn {
		width: 125rpx;
		height: 55rpx;
		line-height: 52rpx;
		border-radius: 27rpx;
	}
</style>
