<template>
	<view class="width-full lh1 height100vh bg-main" v-if="taskData">
		<!-- top -->
		<view class="fixed top left right">
			<view class="width-full" :style="'height:' + StatusBar + 'px;'" :class="isSticky ? '' : 'bg-white'">
			</view>
			<view class="width-full task-top-box flex align-items-center" v-if="isSticky">
				<view class="icon_font fs20 color-999999 ml15" @click="goToBack">
					&#xe638;
				</view>
			</view>
			<view class="width-full task-top-box flex align-items-center bg-white" v-else>
				<view class="icon_font fs20 color-deep ml15" @click="goToBack">
					&#xe638;
				</view>
				<view class="flex-1 mr35 text-center color-deep fs18 fw600">
					发布Me约
				</view>
			</view>
		</view>
		<!-- top -->
		<view class="width-full relative">
			<view class="width-full">
				<view class="width-full" :style="'height:' + StatusBar + 'px;'"></view>
				<image src="../../static/edit/edit_1.png" class="width-full" mode="widthFix"></image>
			</view>
			<view class="task-top-bot width-full"></view>
			<view class="absolute bottom left15 right15">
				<view class="width-full bg-white br5 box-shadow-1 border-box pl20 pr20 pt5 pb20" v-if="taskType">
					<!-- Me约类型 -->
					<task-select :rangelist="taskType" title="Me约类型" type="radio" :changeid="taskData.type_id"
						:changename="taskData.type_name" @confirmPicker="confirmPicker"></task-select>
					<!-- Me约类型 -->
				</view>
			</view>
		</view>
		<view class="mt10 ml15 mr15">
			<view class="width-full bg-white br5 box-shadow-1 border-box pl20 pr20 pt20 pb20">
				<!-- 名称 -->
				<view class="flex align-items-center mb10">
					<view class="task-dian"></view>
					<view class="fs16 color-deep ml5">标题</view>
				</view>
				<view class="width-full border-box task-input-box flex align-items-center">
					<view class="flex-1 flex align-items-center">
						<input type="text" v-model="taskData.name" maxlength="12"
							class="width-full border-box pl18 pr18" />
					</view>
				</view>
				<!-- 名称 -->
				<!-- 地点 -->
				<task-map :address="taskData.address" @changeAddress="changeAddress" isMust title="地点"></task-map>
				<!-- 地点 -->
				<!-- 时间 -->
				<task-time :start="taskData.start_time" :end="taskData.end_time" @changeTime="changeTime">
				</task-time>
				<!-- 时间 -->
			</view>
			<view class="width-full bg-white br5 box-shadow-1 border-box pl20 pr20 pt20 pb20 mt10">
				<!-- Me约描述 -->
				<!-- <view class="flex align-items-center mb10">
					<view class="task-dian"></view>
					<view class="fs16 color-deep ml5">Me约描述</view>
				</view>
				<view class="width-full border-box task-text-box">
					<textarea v-model="taskData.content" placeholder="请输入100字以内的Me约描述" maxlength="100"
						class="width-full border-box p15 lh15" />
				</view> -->
				<!-- Me约描述 -->
				<!-- 我的照片 -->
				<task-photo :photo="taskData.url" @changePhoto="changePhoto" :isRequired="false" @delPhoto="delPhoto"
					@replacePhoto="replacePhoto"></task-photo>
				<!-- 我的照片 -->
				<!-- 支付方式 -->
				<pay-type :costType="taskData.cost_type" @changePayType="changePayType"></pay-type>
				<!-- 支付方式 -->
			</view>
			<view class="width-full bg-white br5 box-shadow-1 border-box pl20 pr20 pt20 pb20 mt10">
				<view class="width-full text-center fs20 fw600 color-deep">
					要求对方
				</view>
				<!-- 期望对象 -->
				<task-select :rangelist="clothingType" title="期望对象" type="more" :changeid="taskData.qwdx"
					:changename="taskData.qwdx_name" @confirmPicker="confirmPicker"></task-select>
				<!-- 期望对象 -->
				<!-- 性格要求 -->
<!-- 				<task-select :rangelist="characterType" title="性格要求" type="more" :changeid="taskData.xgyq"
					:changename="taskData.xgyq_name" @confirmPicker="confirmPicker"></task-select> -->
				<!-- 性格要求 -->
				<view class="width-full mt10">
					<!-- 身价要求 -->
		<!-- 			<task-radio type="worth" :show="taskData.worth" :min="taskData.worth_start"
						:max="taskData.worth_end" @changeRadio="changeRadio" @changeRadioNum="changeRadioNum">
					</task-radio> -->
					<!-- 身价要求 -->
					<!-- 年龄要求 -->
					<task-radio type="age" :show="taskData.age" :min="taskData.age_start" :max="taskData.age_end"
						@changeRadio="changeRadio" @changeRadioNum="changeRadioNum"></task-radio>
					<!-- 年龄要求 -->
					<!-- 是否允许带他人 -->
					<task-radio type="others" :show="taskData.others" :min="taskData.others_num" :max="3"
						@changeRadio="changeRadio" @changeRadioNum="changeRadioNum"></task-radio>
					<!-- 是否允许带他人 -->
					<!-- 期望对方所在地 -->
		<!-- 			<task-address :pid="taskData.expect_region_pid" :pname="taskData.expect_region_pname"
						:cid="taskData.expect_region_cid" :cname="taskData.expect_region_cname"
						@confirmAddress="confirmAddress"></task-address> -->
					<!-- 期望对方所在地 -->
				</view>
			</view>
			<view class="width-full bg-white br5 box-shadow-1 border-box pl20 pr20 pt20 pb35 mt10">
				<view class="width-full text-center fs20 fw600 color-deep">见面礼</view>
				<!-- 酬金 -->
				<task-gift :show="taskData.is_gift" :showAdd="showAddGift" :gift="taskData.gift" @addGift="addGift"
					@changeGiftType="changeGiftType"></task-gift>
				<!-- 酬金 -->
			</view>
		</view>
		<view class="width-full pt35 pb_iphoneX_safe">
			<view class="mt10 ml20 mr20 pb30">
				<view class="ml20 mr20 text-center mb20 fs18 color-white task-bot-btn" @click="toVerifyTask">
					发布Me约
				</view>
				<view class="width-full text-center color-shallow fs13">
					切莫线下交易，届时将无法保证您的资金安全
				</view>
			</view>
		</view>
		<!-- 是否存草稿 -->
	<!-- 	<custom-pop :showPop="showPop" confirmText="保留" cancelText="不保留" contentTitle="将此次编辑保留" :meiNv="3"
			@confirm="popConfirm" @cancel="popCancel"></custom-pop> -->
		<!-- 是否存草稿 -->
		<!-- <custom-pop :showPop="isOldTask" confirmText="查看" cancelText="退出" contentTitle="已经有发布中的Me约" :meiNv="3"
			@confirm="goTaskDetail" @cancel="goBack"></custom-pop> -->
		<!-- 是否真人认证 -->
	<!-- 	<custom-pop :showPop="showRealPop" confirmText="充值VIP" cancelText="取消" contentTitle="温馨提示:"
			contentText="非VIP不可发布Me约,请先充值VIP" isText :meiNv="2" @confirm="popRealConfirm" @cancel="popRealCancel">
		</custom-pop> -->
		<view v-if="showRelease">
			<release-task :taskData="taskData" @setPublishType="setPublishType" @releaseSuccess="releaseSuccess"
				@closeRease="showRelease = false" @goToChangeGift="goToChangeGift"></release-task>
		</view>
		<u-toast ref="uToast" />
		<!-- 权限弹窗 -->
		<unify-pop :showUnify="showUnifyPop" :type="unifyType" @closePop="showUnifyPop = false" :isMaskCloseAble="false" @popConfirmDraft="popConfirm" @popCancel="popCancel" @goTaskDetail="goTaskDetail" @goBackPage="goBack">
		</unify-pop>
		<!-- 权限弹窗 -->
		<!-- 充值vip弹框 -->
		<member-pay :showMemberPay="showMemberPay" :centent="memberCentent"
			@closePop="popRealCancel" @paySuccess="showMemberPay = false">
		</member-pay>
		<view v-if="showRedPacket">
			<red-packet></red-packet>
		</view>
	</view>
</template>

<script>
	import {
		mapActions,
		mapGetters
	} from 'vuex'
	import TaskService from '../../common/service/task-service.js'
	import taskPhoto from '../../components/task/edit/photo.vue'
	import payType from '../../components/task/edit/paytype.vue'
	import taskSelect from '../../components/task/edit/selector.vue'
	import taskMap from '../../components/task/edit/map.vue'
	import taskTime from '../../components/task/edit/time.vue'
	import taskRadio from '../../components/task/edit/radio.vue'
	import taskAddress from '../../components/task/edit/address.vue'
	import taskGift from '../../components/task/edit/gift.vue'
	import releaseTask from '../../components/task/edit/release.vue'
	export default {
		data() {
			return {
				disable: true,
				showMemberPay: false,
				memberCentent:'',
				showRealPop: false,
				oldTask: null,
				isSticky:false,
				showRelease: false,
				taskData: null,
				taskType: null,
				clothingType: null,
				characterType: null,
				showAddGift: false,
			}
		},
		onShow() {
			setTimeout(() => {
				if (this.user && this.user.gender === 1 && !this.isVip) {
					this.showMemberPay = true
					this.memberCentent = '非Vip不可发布邀约哦~'
				} else {
					this.getTaskInfo()
				}
			}, 200)
		},
		computed: {
			...mapGetters(['taskInfo', 'user']),
			// isReal() {
			// 	if (this.user && this.user.certify) {
			// 		let certify = JSON.parse(this.user.certify)
			// 		if (certify.real && certify.real.verified) {
			// 			return true
			// 		} else {
			// 			return false
			// 		}
			// 	} else {
			// 		return false
			// 	}
			// },
			isVip() {
				if (this.user && this.user.is_vip === 1) {
					return true
				} else {
					return false
				}
			}
		},
		components: {
			taskPhoto,
			payType,
			taskSelect,
			taskMap,
			taskTime,
			taskRadio,
			taskAddress,
			taskGift,
			releaseTask
		},
		onLoad() {
			this.init()
		},
		onPageScroll({
			scrollTop
		}) {
			if (scrollTop < (this.StatusBar + uni.upx2px(220))) {
				this.isSticky = true
			} else {
				this.isSticky = false
			}
		},
		methods: {
			...mapActions(['TASK_INFO','IFTHE_REFRESH']),
			init() {
				console.log(this.taskInfo)
				Object.assign(this.$data, this.$options.data())
				this.loginExpire().then(res => {
					if (res) {
						if (this.taskInfo) {
							this.taskData = JSON.parse(JSON.stringify(this.taskInfo))
						} else {
							this.taskData = JSON.parse(JSON.stringify(this.$jsonBasic.baseTask))
						}
						console.log(this.taskData)
						this.getTaskSelect()
					}
				})
			},
			// 去充值
			popRealConfirm() {
				this.showRealPop = false
				this.showMemberPay = true
			},
			popRealCancel() {
				this.showMemberPay = false
				uni.navigateBack({
					delta: 1
				})
			},
			goToChangeGift() {
				this.showRelease = false
				this.taskData.is_gift = 1
				this.showAddGift = !this.showAddGift
			},
			// Me约数据
			getTaskSelect() {
				TaskService.taskselect().then(res => {
					if (res.code === 1) {
						console.log(res.data)
						this.taskType = res.data.task_type
						this.clothingType = res.data.qwdx
						this.characterType = res.data.xgyq
					}
				})
			},
			// 检查是否有进行中的Me约
			getTaskInfo() {
				TaskService.publishingcheck().then(res => {
					if (res.code === 1 && res.data && res.data.self) {
						this.oldTask = res.data.self
						this.unifyType = 22
						this.showUnifyPop = true
					}
				})
			},
			// Picker 确定
			confirmPicker(type, id, name) {
				if (type === 'Me约类型') {
					this.taskData.type_id = id
					this.taskData.type_name = name
				}
				if (type === '期望对象') {
					this.taskData.qwdx = id
					this.taskData.qwdx_name = name
				}
				if (type === '性格要求') {
					this.taskData.xgyq = id
					this.taskData.xgyq_name = name
				}
			},
			// 选择地址
			changeAddress(address) {
				this.taskData.address = address.name
				this.taskData.lng = address.longitude
				this.taskData.lat = address.latitude
			},
			// 选择时间
			changeTime(type, time) {
				if (type === 'start') {
					this.taskData.start_time = time
				}
				if (type === 'end') {
					this.taskData.end_time = time
				}
			},
			// 选择照片
			changePhoto(images) {
				this.taskData.url = JSON.stringify(images)
			},
			// 删除照片
			delPhoto(images) {
				this.taskData.url = JSON.stringify(images)
			},
			//替换照片
			replacePhoto(images) {
				this.taskData.url = JSON.stringify(images)
			},
			// 选择支付方式
			changePayType(index) {
				this.taskData.cost_type = index
			},
			// 单选
			changeRadio(type, value) {
				this.taskData[type] = value
			},
			changeRadioNum(type, numType, value) {
				if (type === 'worth') {
					if (numType === 'min') {
						this.taskData.worth_start = value
					}
					if (numType === 'max') {
						this.taskData.worth_end = value
					}
				}
				if (type === 'age') {
					if (numType === 'min') {
						this.taskData.age_start = value
					}
					if (numType === 'max') {
						this.taskData.age_end = value
					}
				}
				if (type === 'others') {
					if (numType === 'min') {
						this.taskData.others_num = value
					}
				}
			},
			// 选择对方所在地
			confirmAddress(pname, cname, pid, cid) {
				this.taskData.expect_region_pid = pid
				this.taskData.expect_region_pname = pname
				this.taskData.expect_region_cid = cid
				this.taskData.expect_region_cname = cname
				this.taskData.expect_region = cid
			},
			// 选择礼物状态
			changeGiftType(index) {
				this.taskData.is_gift = index
				console.log(index)
				if (index === 0) {
					this.taskData.gift = ''
				}
			},
			addGift(gift) {
				this.taskData.gift = gift
			},
			setPublishType(type) {
				this.taskData.publish_type = type
			},
			toVerifyTask() {
				if (!this.taskData.type_id) {
					this.$refs.uToast.show({
						title: '请选择Me约类型'
					})
					return false
				}
				if (!this.taskData.name) {
					this.$refs.uToast.show({
						title: '请填写Me约名称'
					})
					return false
				}
				if (!this.taskData.address) {
					this.$refs.uToast.show({
						title: '请选择Me约地点'
					})
					return false
				}
				if (!this.taskData.start_time || !this.taskData.end_time) {
					this.$refs.uToast.show({
						title: '请选择Me约时间'
					})
					return false
				}
				// if (!this.taskData.content) {
				// 	this.$refs.uToast.show({
				// 		title: '请填写Me约描述'
				// 	})
				// 	return false
				// }
				// if (this.taskData.content && this.taskData.content.length < 10) {
				// 	this.$refs.uToast.show({
				// 		title: '请填写10个字以上的Me约描述'
				// 	})
				// 	return false
				// }
				if (!this.taskData.qwdx) {
					this.$refs.uToast.show({
						title: '请选择期望对象'
					})
					return false
				}
				// if (!this.taskData.xgyq) {
				// 	this.$refs.uToast.show({
				// 		title: '请选择性格要求'
				// 	})
				// 	return false
				// }
				// if (!this.taskData.expect_region) {
				// 	this.$refs.uToast.show({
				// 		title: '期望对方所在地'
				// 	})
				// 	return false
				// }
				this.showRelease = true
				this.IFTHE_REFRESH(true)
			},
			// 返回
			goReturn() {
				uni.navigateBack({
					delta: 1
				})
			},
			// 退出存缓存
			goToBack() {
				if (JSON.stringify(this.taskData) === JSON.stringify(this.taskInfo)) {
					uni.navigateBack({
						delta: 1
					})
				} else {
					this.unifyType = 21
					this.showUnifyPop = true
				}
			},
			popConfirm() {
				this.TASK_INFO(this.taskData)
				this.showPop = false
				uni.navigateBack({
					delta: 1
				})
			},
			popCancel() {
				this.showPop = false
				uni.navigateBack({
					delta: 1
				})
			},
			releaseSuccess() {
				this.$refs.uToast.show({
					title: '发布成功！'
				})
				this.TASK_INFO(null)
				this.showRelease = false
				uni.redirectTo({
					url: "/pages/task/change"
				})
			},
			goTaskDetail() {
				uni.redirectTo({
					url: '/pages/task/mydetail?id=' + this.oldTask.id
				})
			},
			moveHandle() {

			}
		}
	}
</script>

<style lang="scss" scoped>
	.task-top-bot {
		height: 120rpx;
	}

	.task-dian {
		width: 10rpx;
		height: 10rpx;
		background: #F3CEB0;
		border-radius: 10rpx;
	}

	.task-input-box {
		height: 80rpx;
		border: 2rpx solid #CCCCCC;
	}

	.task-text-box {
		min-height: 200rpx;
		border: 2rpx solid #CCCCCC;
	}

	.task-bot-btn {
		height: 80rpx;
		background: #D97DB0 ;
		line-height: 80rpx;
		border-radius: 80rpx;
	}

	.task-top-box {
		height: 88rpx;
	}
</style>
