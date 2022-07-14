<template>
	<view class="width-full height100vh lh1 bg-main" v-if="userInfo">
		<!-- 顶部 -->
		<view class="fixed top left right" :class="isSticky ? 'bg-white fixed z-index' : ''">
			<view class="width-full" :style="'height:' + StatusBar + 'px;'" :class="isSticky ? 'bg-main' : ''"></view>
			<view class="width-full home-top-box" :class="isSticky ? 'bg-main' : ''">
				<view class="width-full height flex align-items-center" v-if="isSticky">
					<view class="icon_font fs30 color-deep ml10" @click="goBack">
						&#xe60e;
					</view>
					<view class="flex-1 fs16 color-deep fw600 text-center">
						{{userInfo.nickname}}
					</view>
					<view class="icon_font fs30 color-deep mr15" @click="shieldingJudgment">
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
			<image :src="userInfo.avatar | imageFilter" class="avatar-img float-hidden" mode="aspectFill"></image>
			<view class="absolute bottom left right">
				<image src="../../static/itsme/itsme_1.png" class="width-full" mode="widthFix"></image>
			</view>
			<view class="absolute left right bottom15">
				<view class="pl12 pr12 pb8 pt8">
					<view class="width-full flex align-items-center flex-between">
						<view class="flex align-items-center">
							<view class="fs18 color-white fw600">
								{{userInfo.nickname}}
							</view>
							<image src="../../static/itsme/itsme_10.png" class="home-img-1 ml10" mode="widthFix"
								v-if="userInfo && userInfo.is_vip === 1"></image>
							<image src="../../static/base/base_12.png" class="home-img-1 ml10" mode="widthFix"
								v-if="isReal"></image>
							<image src="../../static/itsme/itsme_11.png" class="home-img-1 ml10" mode="widthFix"
								v-if="isGoddess"></image>
						</view>
						<view class="flex align-items-center mb10">
							<image src="../../static/base/base_6.png" class="home-img-2" mode="widthFix"></image>
							<view class="color-black fs36 ml15 mr8 fw500">
								{{userInfo.worth}}
							</view>
						</view>
					</view>
					<view class="width-full flex align-items-center mt3 mb3">
						<view class="flex align-items-center" v-if="isLogin">
							<image src="../../static/base/base_3.png" class="home-img-1" mode="widthFix"></image>
							<view class="color-dominant-hue fs14 ml5 ">
								{{userInfo.distance}}
							</view>
						</view>
						<view class="flex align-items-center ml8 " v-if="isLogin">
							<view class="width-full nowrap1 fs11 color-dominant-hue" v-if="userInfo.is_online === 0">
								{{userInfo.outtime | indexTimeFilter(userInfo.server_time)}}
							</view>
							<view class="width-full nowrap1 fs11 color-dominant-hue" v-else>
								活跃
							</view>
							<image src="../../static/base/base_5.png" class="home-img-1 ml5" mode="widthFix"
								v-if="userInfo && userInfo.gender === 1"></image>
							<image src="../../static/base/base_4.png" class="home-img-1 ml5" mode="widthFix" v-else>
							</image>
						</view>
						<view class="flex align-items-center" v-else>
							<view class="width-full nowrap1 fs11 color-dominant-hue">
								活跃
							</view>
							<image src="../../static/base/base_5.png" class="home-img-1 ml5" mode="widthFix"
								v-if="userInfo && userInfo.gender === 1"></image>
							<image src="../../static/base/base_4.png" class="home-img-1 ml5" mode="widthFix" v-else>
							</image>
						</view>
						<view class="flex-1 flex mr10 align-items-center flex-right" v-if="isLogin">
							<view class="w-100">
								<view class="matched-degree-big">
									<view class="matched-degree-small color-white fs12 pl10 border-box"
										:style="'width:' + matchedDegree + '%;'">
										匹配度{{matchedDegree}}%
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="absolute left right bottom avatar-bot-white bg-main"></view>
		</view>
		<!-- 头部照片 -->
		<view class="width-full" id="home-nav" @click="showoperation = false">
			<!-- tab栏 -->
			<view class="width-full">
				<view class="width-full bg-main" :style="navTop" :class="isSticky ? 'fixed' : 'initial'">
					<view class="pr35 mr35 pl15 border-box itsme-home-tab" style="width: 400rpx;">
						<u-tabs :list="tabList" :is-scroll="false" inactive-color="#AAAAAA" font-size="32" height="100"
							bg-color="#FAFAFA" bar-height="8" bar-width="20" active-color="#000000"
							:current="tabCurrent" @change="changeTabs"></u-tabs>
					</view>
				</view>
				<view class="pt25 pb25" v-if="isSticky"></view>
			</view>
			<!-- tab栏 -->
			<view class="width-full mt15">
				<!-- 用户信息 -->
				<view class="width-full pl12 pr12 border-box" v-if="tabCurrent === 0">
					<view class="width-full text-center fs14 color-bbbbbb mb25"
						v-if="user && user.gender === 0 && userInfo.gender === 1 && userInfo.is_vip === 0">
						对方还不是会员，发展他为会员可以获得奖励。
					</view>
					<view class="width-full text-center fs14 color-bbbbbb mb25"
						v-if="userInfo.gender === 0 && isReal && !isGoddess">
						真人认证：已通过人脸识别，可放心与对方畅聊
					</view>
					<view class="width-full text-center fs14 color-bbbbbb mb25"
						v-if="userInfo.gender === 0 && isGoddess">
						女神认证：已通过平台的女神认证，属于高端资源
					</view>
					<view class="width-full" v-if="userInfo && userInfo.photocount > 0">
						<view class="width-full flex align-items-center flex-between mb15 pb3" @click="toPhotoList">
							<view class="fs16 color-deep fw600">
								相册
							</view>
							<view class="flex align-items-center" v-if="isLogin">
								<view class="fs14 color-middle">
									{{userInfo.photocount}}张
								</view>
								<view class="icon_font fs14 color-middle ml5">
									&#xe60f;
								</view>
							</view>
						</view>
						<view class="width-full flex flex-wrap">
							<view v-for="(item,index) in userPhoto" :key="index">
								<view class="mb10" :class="(index + 1) % 3 === 0 ? '' : 'mr10'">
									<photo-item :item="item" @clickPhoto="clickPhoto(index)"></photo-item>
								</view>
							</view>
						</view>
					</view>
					<!-- 标签 -->
					<view class="width-full" v-if="isLabel">
						<view class="width-full flex align-items-center flex-between mb15 pb3 mt12">
							<view class="fs16 color-deep fw600">
								标签
							</view>
						</view>
						<view class="pl15 pt10  pr15 pb10 bg-white box-shadow-login br10">
							<view class="width-full flex align-items-start mb10" v-for="(item,index) in userInfo.expect"
								:key="index">
								<view class="height-box mt10 pr5">
									{{item.title}} :
								</view>
								<view class="flex-1 flex flex-wrap">
									<view class="labelbox pl10 pr10 mt10 ml5 mr5"
										v-for="(itemText , textIndex) in item.content" :key="textIndex">
										{{itemText}}
									</view>
								</view>
							</view>
						</view>
					</view>
					<!-- 标签 -->
					<!-- 信息 -->
					<view class="width-full" v-if="userTag">
						<view class="width-full flex align-items-center flex-between mb15 pb3 mt12">
							<view class="fs16 color-deep fw600">
								信息
							</view>
						</view>
						<view class="pl15 pt20 pr15 pb10 bg-white box-shadow-login br10">
							<!-- 	<view class="width-full mb20 flex align-items-start">
								<view class="fs14 color-deep mr5 lh15">
									交友目的：
								</view>
								<view class="flex-1">
									<view class="lh15 fs14 color-deep fw600"
										v-if="userTag.jymd && userTag.jymd.content">
										{{userTag.jymd.content}}
									</view>
									<view class="lh15 fs14 color-main6 fr mr35" v-else @click="toInvite('a')">
										邀请填写
									</view>
								</view>
							</view>
							<view class="width-full mb20 flex align-items-start">
								<view class="fs14 color-deep mr5 lh15">
									期望对象：
								</view>
								<view class="flex-1">
									<view class="lh15 fs14 color-deep fw600"
										v-if="userTag.qwdx && userTag.qwdx.content">
										{{userTag.qwdx.content}}
									</view>
									<view class="lh15 fs14 color-main6 fr mr35" v-else @click="toInvite('a')">
										邀请填写
									</view>
								</view>
							</view> -->
							<view class="width-full mb20 flex align-items-start">
								<view class="fs14 color-deep mr5 lh15">
									常驻城市：
								</view>
								<view class="flex-1">
									<view class="lh15 fs14 color-deep fw600" v-if="userTag.czd && userTag.czd.content">
										{{userTag.czd.content}}
									</view>
									<view class="lh15 fs14 color-main6 fr mr35" v-else @click="toInvite('a')">
										邀请填写
									</view>
								</view>
							</view>
							<view class="width-full mb20 flex align-items-start">
								<view class="fs14 color-deep mr5 lh15">
									职&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;业：
								</view>
								<view class="flex-1">
									<view class="lh15 fs14 color-deep fw600" v-if="userInfo.profession">
										{{userInfo.profession}}
									</view>
									<view class="lh15 fs14 color-main6 fr mr35" v-else @click="toInvite('a')">
										邀请填写
									</view>
								</view>
							</view>
							<view class="width-full mb20 flex align-items-start">
								<view class="fs14 color-deep mr5 lh15">
									身&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;高：
								</view>
								<view class="flex-1">
									<view class="lh15 fs14 color-deep fw600"
										v-if="userTag.height && userTag.height.content">
										{{userTag.height.content}}
									</view>
									<view class="lh15 fs14 color-main6 fr mr35" v-else @click="toInvite('a')">
										邀请填写
									</view>
								</view>
							</view>
							<view class="width-full mb20 flex align-items-start">
								<view class="fs14 color-deep mr5 lh15">
									体&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;重：
								</view>
								<view class="flex-1">
									<view class="lh15 fs14 color-deep fw600"
										v-if="userTag.weight && userTag.weight.content">
										{{userTag.weight.content}}
									</view>
									<view class="lh15 fs14 color-main6 fr mr35" v-else @click="toInvite('a')">
										邀请填写
									</view>
								</view>
							</view>
							<view class="width-full mb20 flex align-items-start">
								<view class="fs14 color-deep mr5 lh15">
									生&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日：
								</view>
								<view class="flex-1">
									<view class="lh15 fs14 color-deep fw600"
										v-if="userTag.birthday && userTag.birthday.content">
										{{userTag.birthday.content}}
									</view>
									<view class="lh15 fs14 color-main6 fr mr35" v-else @click="toInvite('a')">
										邀请填写
									</view>
								</view>
							</view>
							<view class="width-full mb20 flex align-items-start">
								<view class="fs14 color-deep mr5 lh15">
									个人介绍：
								</view>
								<view class="flex-1">
									<view class="lh15 fs14 color-deep fw600" v-if="userTag.bio && userTag.bio.content">
										{{userTag.bio.content}}
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
					<view class="width-full p10" v-if="false">
						<!-- v-if="taskInfo" -->
						<view class="width-full fs16 fw900 mb15">
							Me约
						</view>
						<view class="width-full box-shadow-1 br10 bg-white pl15 pt15 pr15 pb15">
							<view class="width-full">
								<view class="width-full mt10 mb15 flex align-items-start">
									<view class="task-dian mt8 mr15"></view>
									<view class="flex-1 flex align-items-start">
										<view class="fs14 color-666666 lh15">
											类型：
										</view>
										<view class="flex-1 fs14 lh15 color-deep fw600">
											{{taskInfo.type_id | taskTypeFilter}}
										</view>
									</view>
								</view>
								<view class="width-full mt10 mb15 flex align-items-start">
									<view class="task-dian mt8 mr15"></view>
									<view class="flex-1 flex align-items-start">
										<view class="fs14 color-666666 lh15">
											标题：
										</view>
										<view class="flex-1 fs14 lh15 color-deep fw600">
											{{taskInfo.name}}
										</view>
									</view>
								</view>
								<view class="width-full mt10 mb15 flex align-items-start">
									<view class="task-dian mt8 mr15"></view>
									<view class="flex-1 flex align-items-start">
										<view class="fs14 color-666666 lh15">
											地点：
										</view>
										<view class="flex-1 fs14 lh15 color-deep fw600">
											{{taskInfo.address}}
										</view>
									</view>
								</view>
								<view class="width-full mt10 mb15 flex align-items-start">
									<view class="task-dian mt8 mr15"></view>
									<view class="flex-1 flex align-items-start">
										<view class="fs14 color-666666 lh15">
											时间：
										</view>
										<view class="flex-1 fs14 lh15 color-deep fw600">
											{{taskInfo.start_time | dateFilter(1, '.')}} -
											{{taskInfo.end_time | dateFilter(1, '.')}}
										</view>
									</view>
								</view>
								<view class="width-full mt10 mb15 flex align-items-start">
									<view class="task-dian mt8 mr15"></view>
									<view class="flex-1 flex align-items-start">
										<view class="fs14 color-666666 lh15">
											费用：
										</view>
										<view class="flex-1 fs14 lh15 color-deep fw600">
											{{taskInfo.cost_type | taskCostFilter}}
										</view>
									</view>
								</view>
							</view>
							<view class="width-full pb10 b-t-1 pt15 line-color-2">
								<view class="width-full flex align-items-start">
									<view class="fs14 color-deep mt8">
										见面礼：
									</view>
									<view class="flex-1 flex flex-wrap"
										v-if="taskInfo && taskInfo.gift_list && taskInfo.gift_list.length > 0">
										<view v-for="(item,index) in taskInfo.gift_list" :key="index">
											<view class="task-gift-item mr20 mb15 flex align-items-center">
												<image :src="item.icon | imageFilter('m11')" class="task-gift-img"
													mode="widthFix"></image>
												<view class="fs12 color-deep ml8">
													×{{item.num}}
												</view>
											</view>
										</view>
									</view>
								</view>
								<view class="width-full flex align-items-start" v-if="taskInfo.other_demand">
									<view class="fs14 color-deep lh15">
										见面礼：
									</view>
									<view class="flex-1 fs14 lh15 color-deep fw600">
										{{taskInfo.other_demand}}
									</view>
								</view>
							</view>
						</view>
					</view>
					<view class="width-full">
						<view class="width-full mt15">
							<view class="width-full fs16 pl15 fw900 mb15">
							</view>
						</view>
						<view v-for="(item,index) in discoverList" :key="index">
							<view class="width-full mb25" v-if="discoverList.length > 0">
								<discover-dynamic :item="item" :userInfo="userInfo" isMeet :isMy="true"
									:isLogin="isLogin" :fromTheTop="fromTheTop" @changeLike="changeLike(index)"
									@changefabulous="changefabulous(index,item)">
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
		<view class="mt35 mb35 pb35 pt35"></view>
		<view class="fixed bottom left right bg-main pb_iphoneX_safe">
			<view class="pl15 pr15 pt10 pb20 flex align-items-center">
				<view class="flex-1 flex align-items-center flex-center" v-if="!isLike">
					<view class="flex-1 flex flex-center relative" @click="changeLike">
						<image src="../../static/base/pop_4.png" class="pop-img-1 fixed bottom80" mode=""
							v-if="tabCurrent === 0 && isSticky"></image>
						<image src="../../static/base/pop_5.png" class="pop-img-2 fixed bottom80" mode=""
							v-if="tabCurrent === 1 && discoverList.length !== 0 && pages.page > 1"></image>
						<view class="like-btn">
							<image src="../../static/base/like_m.png" class="like-btn" mode=""></image>
						</view>
					</view>
					<view class="flex-1 flex flex-center" @click=" toChat">
						<view class="like-btn">
							<image src="../../static/base/chat_m.png" class="like-btn" mode=""></image>
						</view>
					</view>
				</view>
				<view class="pl35 pr35 flex-1" v-else>
					<view class="flex-1 ml20 mr20 chat-btn flex align-items-center flex-center" @click="toChat">
						<view class="icon_font fs20 color-dominant-hue">
							&#xe652;
						</view>
						<view class="fs15 color-deep ml12">
							聊天
						</view>
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
		<unify-pop :showUnify="showUnifyPop" :type="unifyType" @closePop="showUnifyPop = false" @setBlack='setBlack'>
		</unify-pop>
		<!-- 完善资料 -->
		<view class="width-full" v-if="showPerfectPop">
			<perfect-pop @refreshTheList="refreshTheList" @closePerfectPop="toHidePerfectPop">
			</perfect-pop>
		</view>
		<!-- 完善资料 -->
		<!-- 充值vip弹框 -->
		<view v-if="showMemberPay">
			<member-pay :showMemberPay="showMemberPay" :centent="memberCentent" @closePop="showMemberPay = false"
				@paySuccess="showMemberPay = false">
			</member-pay>
		</view>
		<u-toast ref="uToast" />
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
				showoperation: false,
				operationList: [{
					title: '拉黑',
					icon: '&#xe665;',
					type: 'black'
				}, {
					title: '举报',
					icon: '&#xe649;',
					type: 'report'
				}],
				yaoqingtianxie: '邀请填写',
				blacklist: null,
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
				if (this.userInfo.expect[0].content === null && this.userInfo.expect[1].content === null && this.userInfo
					.expect[2].content === null) {
					return false
				} else {
					return true
				}
			},
			topRightTop() {
				return 'top: calc(100rpx + ' + this.StatusBar + 'px)'
			},
			isReal() {
				if (this.userInfo && this.userInfo.certify) {
					let certify = JSON.parse(this.userInfo.certify)
					if (certify.real && certify.real.verified) {
						return true
					} else {
						return false
					}
				} else {
					return false
				}
			},
			isGoddess() {
				if (this.userInfo && this.userInfo.certify) {
					let certify = JSON.parse(this.userInfo.certify === 'true')
					if (certify.goddess && certify.goddess.verified === 'true') {
						return true
					} else {
						return false
					}
				} else {
					return false
				}
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
			discoverDynamic
		},
		methods: {
			...mapActions(['LIKE_LIST', 'IS_LIKE', 'IFTHE_REFRESH']),
			init(options) {
				Object.assign(this.$data, this.$options.data())
				this.loginExpire().then(res => {
					this.isLogin = res
					this.userId = options.id
					// 用户信息
					this.getUserInfo(2)
					// 动态
					this.getDiscoverList()
					// Me约
					this.getTaskInfo()
				})
			},
			random(lower, upper) {
				return Math.floor(Math.random() * (upper - lower)) + lower;
			},
			// Me约
			getTaskInfo() {
				TaskService.publishingcheckallstate({
					user_id: this.userId
				}).then(res => {
					if (res.code === 1) {
						console.log(res)
						this.taskInfo = res.data.other
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
						console.log('this.userInfo')
						console.log(this.userInfo)
						if (this.userInfo.user_tag) {
							this.userTag = this.formatTag(this.userInfo.user_tag)
						}
						if (res.data && res.data.user_photo && res.data.user_photo.length > 0) {
							if (res.data.user_photo.length > 6) {
								this.userPhoto = res.data.user_photo.slice(0, 6)
							} else {
								this.userPhoto = res.data.user_photo
							}
						}
					}
				})
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
					if (res.code === 1 && res.data && res.data.user_life && res.data.user_life.length > 0) {
						this.pages.finish = false
						this.discoverList = this.discoverList.concat(res.data.user_life.map(item => {
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
					if (this.user.certify) {
						let certify = JSON.parse(this.user.certify)
						userIsReal = certify.real && certify.real.verified
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
			// 喜欢操作
			changeLike() {
				if (this.isLogin) {
					let userIsReal = false
					if (this.user.certify) {
						let certify = JSON.parse(this.user.certify)
						userIsReal = certify.real && certify.real.verified
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
							this.setUserLike('list', 'del', this.userInfo).then(res => {
								this.userInfo.is_like = 0
								this.likeIng = false
								this.IS_LIKE(this.userInfo.id)
								console.log(321)
							})
						} else {
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
				if (type === 'black') {
					this.showUnifyPop = true
					this.unifyType = 16
				} else {
					uni.showToast({
						title: '举报成功',
						icon: 'none'
					})
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
					setTimeout(() => {
						uni.navigateBack({
							delta: 1
						})
					}, 500)
				})
				this.IFTHE_REFRESH(true)
			},
			// 邀请
			toInvite() {
				if (this.isLogin) {
					this.$refs.uToast.show({
						title: '已邀请'
					})
					this.invitedToFillOut('home', this.userInfo).then(res => {})
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
					console.log(this.userPhoto[index].rule_type)
					this.userPhoto[index].is_read = 1
				}
				if (type === 'money') {
					this.userPhoto[index].rule_type = status
					console.log(this.userPhoto[index].rule_type)
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
			}
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

	.avatar-bot-white {
		height: 30rpx;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
	}

	.avatar-lable {
		width: 105rpx;
	}

	.avatar-distance {
		width: 26rpx;
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
		width: 125rpx;
		height: 125rpx;
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
		width: 288rpx;
		height: 126rpx;
	}

	.pop-img-2 {
		width: 348rpx;
		height: 153rpx;
	}

	.labelbox {
		height: 54rpx;
		line-height: 50rpx;
		display: inline-block;
		background: #FFF4FA;
		border: 2rpx solid #D97DB0;
		border-radius: 27rpx;
		box-shadow: 0rpx 0rpx 8rpx 0rpx #EEEEEE;
	}

	.height-box {
		height: 54rpx;
		line-height: 50rpx;
	}
</style>
