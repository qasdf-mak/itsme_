<template>
	<view class="width-full height100vh lh1 bg-white">
		<view class="width-full text-center mb35">
			<view class="width-full" :style="'height:' + StatusBar + 'px;'"></view>
			<view class="width-full pt30 pb30 mb20"></view>
			<view class="width-full text-center fs20 color-deep fw600 mb8">
				你的性别
			</view>
			<view class="width-full text-center fs12 color-999999">
				性别选择后不可更改
			</view>
		</view>
		<view class="ml35 mr35 pt10">
			<view class="ml30 mr30 flex align-items-center flex-between">
				<view class="sex-box" @click="changeSex(1)">
					<image src="../../static/base/boy_1.png" class="width-full" mode="widthFix" v-if="gender === 1"></image>
					<image src="../../static/base/boy.png" class="width-full" mode="widthFix" v-else></image>
					<view class="fs14 color-deep width-full text-center mt10">
						男
					</view>
				</view>
				<view class="sex-box" @click="changeSex(0)">
					<image src="../../static/base/girl_1.png" class="width-full" mode="widthFix" v-if="gender === 0"></image>
					<image src="../../static/base/girl.png" class="width-full" mode="widthFix" v-else></image>
					<view class="fs14 color-deep width-full text-center mt10">
						女
					</view>
				</view>
			</view>
		</view>
		<view class="width-full mt35 pt15">
			<view class="width-full text-center fs20 color-deep fw600 mb8">
				输入昵称
			</view>
		</view>
		<view class="ml35 pl35 pr35 pb35 mb35 mr35 mt30">
			<view class="ml20 mr20 flex align-items-center b-b-1 line-color-1">
				<view class="icon_font fs20 color-shallow pb5 pt5">
					&#xe767;
				</view>
				<view class="flex-1 float-hidden">
					<input v-model="nickname" type="text" maxlength="8" class="width-full sex-input" placeholder="请输入昵称" />
				</view>
				<view class="flex align-items-center" @click="randomNickname">
					<view class="fs13 color-main6">
						随机
					</view>
					<view class="icon_font ml5 color-main6 fs13">
						&#xe7c6;
					</view>
				</view>
			</view>
		</view>
		<view class="fixed left bottom bg-white right pb_iphoneX_safe">
			<view
				class="width-full flex align-items-center"
				v-if="showCodeInput"
			>
				<view class="flex-1 mr15">
					<view class="width-full fs16 color-deep fw600 text-right">
						好友邀请码
					</view>
				</view>
				<view class="invite-box">
					<input
						v-model="inviteCode"
						type="text"
						maxlength="8"
						class="invite-input"
						:disabled="inviteMsg === '绑定成功！'"
						@blur="pushInvite"
					/>
				</view>
			</view>
			<view class="width-full flex flex-right">
				<view class="invite-msg-box fs14 color-main6">
					{{inviteMsg}}
				</view>
			</view>
			<view class="ml30 mr30 pt25 pb30">
				<view class="ml10 mr10 pt12 pb12 br40 fs18 text-center bg-white box-shadow-login btn-box" @click="nextStep">
					下一步
				</view>
			</view>
		</view>
		<u-toast ref="uToast" />
		<!-- 权限弹窗 -->
		<unify-pop 
		:showUnify="showUnifyPop" 
		:type="unifyType" 
		:centent="contentText"
		@closePop="showUnifyPop = false"
		@popConfirm="popConfirm"
		></unify-pop>
		<!-- 权限弹窗 -->
		<custom-toast :show="showToast" :type="toastType" :title="toastTitle"></custom-toast>
		<!-- <red-packet></red-packet> -->
	</view>
</template>

<script>
	import { mapActions, mapGetters } from 'vuex'
	import UserService from '../../common/service/user-service.js'
	import loginRouter from '../../common/mixins/login.js'
	import updateUser from '../../common/mixins/login.js'
	import IMService from "../../common/appjs/imservice.js"
	export default {
		mixins: [loginRouter, updateUser],
		data() {
			return {
				showToast: false,
				toastType: '',
				toastTitle: '',
				nickname: '',
				gender: null,
				inviteCode: '',
				inviteMsg: '',
				showCodeInput: false,
				contentText: ''
			}
		},
		onLoad() {
			this.init()
		},
		computed:{
			...mapGetters(['likeList'])
		},
		methods: {
			...mapActions(['USER', 'SHOW_PROFILE', 'LIKE_LIST']),
			init() {
				Object.assign(this.$data, this.$options.data())
				if(this.im.getStatus() == 'disconnected') {
					getApp().globalData.imService= new IMService(this.im)
					getApp().globalData.imService.connectIM()
				}
				if (this.user && this.user.p_user_id === 0) {
					this.showCodeInput = true
				}
				if (this.user && this.user.nickname) {
					this.nickname = this.user.nickname
					this.gender = this.user.gender
				}
			},
			// 随机昵称
			randomNickname() {
				if (this.gender !== null) {
					if (this.gender === 0) {
						UserService.randomnickname({
							sex: 2
						}).then(res => {
							this.nickname = res.data
						})
					} else {
						UserService.randomnickname({
							sex: 1
						}).then(res => {
							this.nickname = res.data
						})
					}
				} else {
					this.$refs.uToast.show({
						title: '请先选择性别',
						icon: false
					})
					return false
				}
			},
			// 提交邀请码
			pushInvite() {
				this.inviteMsg = ''
				let code = this.$u.trim(this.inviteCode)
				if (code) {
					UserService.updateinvitecode({
						invite_code: code
					}).then(res => {
						if (res.code === 1) {
							this.inviteMsg = '绑定成功！'
							this.updateUser().then(() => {
								console.log('更新用户信息')
							})
						} else {
							this.inviteMsg = res.msg
						}
					})
				}
			},
			// toShowToast
			toShowToast(type, title) {
				this.toastType = type
				this.toastTitle = title
				this.showToast = true
			},
			// toHideToast
			toHideToast() {
				this.toastType = ''
				this.toastTitle = ''
				this.showToast = false
			},
			// 选择性别
			changeSex(value) {
				this.gender = value
			},
			// 弹窗确认
			popConfirm() {
				let name = this.$u.trim(this.nickname)
				this.showUnifyPop = false
				this.toShowToast('load', '提交中')
				UserService.sexnickname({
					nickname: name,
					gender: this.gender,
					like_user: JSON.stringify(this.likeList)
				}).then(res => {
					if (res.code === 1) {
						// 成功下一步
						this.updateUser().then(() => {})
						if (this.gender === 1 && res.data && res.data.length > 0) {
							for (let i = 0; i < res.data.length; i++) {
								this.setUserLike('sex', 'plus', res.data[i]).then(() => {})
							}
						}
						this.toHideToast()
						this.LIKE_LIST([])
						this.SHOW_PROFILE(true)
						if (this.gender === 0) {
							uni.switchTab({
							    url: '/pages/itsme/index'
							})
						} else {
							uni.redirectTo({
							    url: '/pages/exclusive/male'
							})
						}
					} else {
						this.toHideToast()
						this.$refs.uToast.show({
							title: res.msg,
							icon: false
						})
					}
				})
			},
			// 下一步
			nextStep() {
				let name = this.$u.trim(this.nickname)
				if (!name) {
					this.$refs.uToast.show({
						title: '请输入您的昵称',
						icon: false
					})
					return false
				}
				if (this.gender === null) {
					this.$refs.uToast.show({
						title: '请选择您的性别',
						icon: false
					})
					return false
				}
				if (this.gender === 1) {
					this.contentText = '您选择的性别为: 男 <br /> 注册后不可修改哦！'
				} else {
					this.contentText = '您选择的性别为: 女 <br /> 注册后不可修改哦！'
				}
				this.unifyType = 14
				this.showUnifyPop = true 
			}
		}
	}
</script>

<style lang="scss" scoped>
.sex-box{
	width: 170rpx;
}
.sex-input{
	font-size: 26rpx;
	text-align: center;
}
.invite-box{
	width: 250rpx;
	height: 72rpx;
	margin-right: 90rpx;
	background: rgba($color: #000000, $alpha: 0.05);
	border-radius: 16rpx;
}
.invite-input{
	width: 250rpx;
	height: 72rpx;
	line-height: 72rpx;
	text-align: center;
}
.invite-msg{
	height: 30rpx;
}
.invite-msg-box{
	width: 250rpx;
	height: 72rpx;
	line-height: 70rpx;
	margin-right: 90rpx;
}
</style>
