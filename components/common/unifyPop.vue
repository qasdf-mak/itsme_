<template>
	<view class="width-full lh1">
		<u-popup v-model="show" mode="center" safe-area-inset-bottom border-radius="20" z-index="99999999999"
			negative-top="100" @close="closePop" :mask-close-able="isMaskCloseAble">
			<view class="unify-pop-box">
				<view class="ml10 mr10 pt20 pb10 b-b-1 unify-cent fs15 color-deep text-center" v-html="unifyCent">
				</view>
				<!-- 女性真人认证 -->
				<view class="width-full flex unify-btn-box" v-if="type === 1 || type === 6 || type === 7 || type === 8">
					<view class="flex-1 height fs15 color-main6 text-center fw600" @click="toFace">
						真人认证
					</view>
				</view>
				<!-- 女性女神认证 -->
				<view class="width-full flex unify-btn-box" v-if="type === 6 || type === 7 || type === 8">
					<view class="flex-1 height fs15 color-main6 text-center fw600" @click="toGoddess">
						女神认证
					</view>
				</view>
				<!-- 男性升级会员 -->
				<view class="width-full flex unify-btn-box" v-if="type === 2 || type === 3 || type === 4 || type === 5 || type === 30">
					<view class="flex-1 height fs15 color-main6 text-center fw600" @click="toMember">
						升级会员
					</view>
				</view>
				<!-- 确认离开-->
				<view class="width-full flex unify-btn-box" v-if="type === 9">
					<view class="flex-1 height fs15 color-999999 text-center fw600 b-r-1" @click="closePop">
						取消
					</view>
					<view class="flex-1 height fs15 color-main6 text-center fw600" @click="closePopCancel">
						确认
					</view>
				</view>
				<!-- 系统补齐资料 -->
				<view class="width-full flex unify-btn-box" v-if="type === 10">
					<view class="flex-1 height fs15 color-999999 text-center fw600 b-r-1" @click="closePop">
						取消
					</view>
					<view class="flex-1 height fs15 color-main6 text-center fw600" @click="NoPerfectCancel">
						确认
					</view>
				</view>
				<!-- 人脸识别检测为男性 -->
				<view class="width-full flex unify-btn-box" v-if="type === 11">
					<view class="flex-1 height fs15 color-999999 text-center fw600 b-r-1" @click="closePop">
						取消
					</view>
					<view class="flex-1 height fs15 color-main6 text-center fw600" @click="popMaleConfirm">
						确认
					</view>
				</view>
				<!-- 人脸认证失败,您上传的头像不符合要求或者非您本人 -->
				<view class="width-full flex unify-btn-box" v-if="type === 12">
					<view class="flex-1 height fs15 color-999999 text-center fw600 b-r-1" @click="closePop">
						取消
					</view>
					<view class="flex-1 height fs15 color-main6 text-center fw600" @click="closePop">
						确认
					</view>
				</view>
				<!-- 人脸认证失败,请重新认证或跳过 -->
				<view class="width-full flex unify-btn-box" v-if="type === 13">
					<view class="flex-1 height fs15 color-999999 text-center fw600 b-r-1" @click="closePop">
						跳过
					</view>
					<view class="flex-1 height fs15 color-main6 text-center fw600" @click="NoPerfectCancel">
						重新认证
					</view>
				</view>
				<!--性别确认弹窗-->
				<view class="width-full flex unify-btn-box" v-if="type === 14">
					<view class="flex-1 height fs15 color-999999 text-center fw600 b-r-1" @click="closePop">
						取消
					</view>
					<view class="flex-1 height fs15 color-main6 text-center fw600" @click="popConfirm">
						确认
					</view>
				</view>
				<!--性别确认弹窗-->
				<view class="width-full flex unify-btn-box" v-if="type === 15">
					<view class="flex-1 height fs15 color-999999 text-center fw600 b-r-1" @click="closePop">
						取消
					</view>
					<view class="flex-1 height fs15 color-main6 text-center fw600" @click="deleteList">
						确认
					</view>
				</view>
				<!-- 拉黑 -->
				<view class="width-full flex unify-btn-box" v-if="type === 16">
					<view class="flex-1 height fs15 color-999999 text-center fw600 b-r-1" @click="closePop">
						取消
					</view>
					<view class="flex-1 height fs15 color-main6 text-center fw600" @click="setBlack">
						确认
					</view>
				</view>
				<view class="width-full flex unify-btn-box" v-if="type === 17">
					<view class="flex-1 height fs15 color-999999 text-center fw600 b-r-1" @click="closePop">
						取消
					</view>
					<view class="flex-1 height fs15 color-main6 text-center fw600" @click="popConfirmReal(bankListType)">
						认证
					</view>
				</view>
				<view class="width-full flex unify-btn-box" v-if="type === 20">
					<view class="flex-1 height fs15 color-999999 text-center fw600 b-r-1" @click="clonePop">
						取消
					</view>
					<view class="flex-1 height fs15 color-main6 text-center fw600" @click="popConfirm">
						添加
					</view>
				</view>
				<view class="width-full flex unify-btn-box" v-if="type === 18">
					<view class="flex-1 height fs15 color-main6 text-center fw600" @click="clonePop">
						复制
					</view>
				</view>
				<view class="width-full flex unify-btn-box" v-if="type === 19">
					<view class="flex-1 height fs15 color-999999 text-center fw600 b-r-1" @click="closePopCancel">
						关闭
					</view>
					<view class="flex-1 height fs15 color-main6 text-center fw600 " @click="closePop">
						继续完善
					</view>
				</view>
				<view class="width-full flex unify-btn-box" v-if="type === 21">
					<view class="flex-1 height fs15 color-999999 text-center fw600 b-r-1" @click="popConfirmDraft">
						保留
					</view>
					<view class="flex-1 height fs15 color-main6 text-center fw600 " @click="popCancel">
						不保留
					</view>
				</view>
				<view class="width-full flex unify-btn-box" v-if="type === 22">
					<view class="flex-1 height fs15 color-main6 text-center fw600 b-r-1" @click="goTaskDetail">
						查看
					</view>
					<view class="flex-1 height fs15 color-999999 text-center fw600 " @click="goBackPage">
						退出
					</view>
				</view>
				<view class="width-full flex unify-btn-box" v-if="type === 23 || type === 24">
					<view class="flex-1 height fs15 color-999999 text-center fw600 b-r-1" @click="closePop">
						取消
					</view>
					<view class="flex-1 height fs15 color-main6 text-center fw600 " @click="popConfirmFace">
						真人认证
					</view>
				</view>
				<view class="width-full flex unify-btn-box" v-if="type === 25">
					<view class="flex-1 height fs15 color-999999 text-center fw600 b-r-1" @click="confirmToNav">
						去聊天
					</view>
					<view class="flex-1 height fs15 color-main6 text-center fw600 " @click="cancelGoNav">
						等下聊
					</view>
				</view>
				<view class="width-full flex unify-btn-box" v-if="type === 26">
					<view class="flex-1 height fs15 color-main6 text-center fw600 b-r-1" @click="goMemberPay">
						去升级VIP
					</view>
				</view>
				<view class="width-full flex unify-btn-box" v-if="type === 27">
					<view class="flex-1 height fs15 color-999999 text-center fw600 b-r-1" @click="closePop">
						取消
					</view>
					<view class="flex-1 height fs15 color-main6 text-center fw600 " @click="realWrite">
						注销
					</view>
				</view>
				<view class="width-full flex unify-btn-box" v-if="type === 28">
					<view class="flex-1 height fs15 color-main6 text-center fw600" @click="closePop">
						关闭
					</view>
				</view>
				<view class="width-full flex unify-btn-box" v-if="type === 29">
					<view class="flex-1 height fs15 color-999999 text-center fw600 b-r-1" @click="closePop">
						取消
					</view>
					<view class="flex-1 height fs15 color-main6 text-center fw600 " @click="rechargeM">
						去充值
					</view>
				</view>
				<view class="width-full flex unify-btn-box" v-if="type === 31">
					<view class="flex-1 height fs15 color-999999 text-center fw600 b-r-1" @click="closePop">
						取消
					</view>
					<view class="flex-1 height fs15 color-main6 text-center fw600 " @click="bingWx">
						去绑定
					</view>
				</view>
				<view class="width-full flex unify-btn-box" v-if="type === 32">
					<view class="flex-1 height fs15 color-999999 text-center fw600 b-r-1" @click="closePop">
						取消
					</view>
					<view class="flex-1 height fs15 color-main6 text-center fw600 b-r-1" @click="goMemberPay">
						去升级VIP
					</view>
				</view>
				<view class="width-full flex unify-btn-box" v-if="type === 33">
					<view class="flex-1 height fs15 color-999999 text-center fw600 b-r-1" @click="closePop">
						取消
					</view>
					<view class="flex-1 height fs15 color-main6 text-center fw600 b-r-1" @click="reminfBingWx">
						提醒
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	/* *  统一弹框
	 * type 
	 * 1 -----  女性非真人提示去真人认证
	 * 2 -----  男性非Vip，只能发送文字消息
	 * 3 -----  男性非Vip，只能发送三条消息提示去升级会员
	 * 4 -----  男性非Vip，只能和三个聊天提示去升级会员
	 * 5 -----  男性非Vip，聊过的人不能再聊提示去升级会员
	 * 6 -----  女性真人，只能发送10条消息提示去女神认证
	 * 7 -----  女性真人，只能和10个聊天提示去女神认证
	 * 8 -----  女性真人，聊过的人不能再聊提示去女神认证
	 * 9 -----  您的资料未完善,确定要离开么
	 * 10 -----  您的资料不完整,我们会问您补充默认项
	 * 11 -----  系统检测到您为男性,是否重新选择性别
	 * 12 -----  人脸认证失败,您上传的头像不符合要求或者非您本人
	 * 13 ----- 人脸认证失败,请重新认证或跳过
	 * 15 ------ 移除Me约列表的人
	 * 16 ------ 确定要拉黑吗
	 * 17 ------ 实名认证,绑定银行卡
	 * 18 ------ 客服小姐姐诶
	 * 19 ------ 完善资料后，可立即领取10元佣金奖励 '您还未绑定银行卡,请先添加银行卡'
	 * 20 ------  您还未绑定银行卡,请先添加银行卡
	 * 21 ------  将此次编辑保留
	 * 22 ------  已经有发布中的Me约
	 * 23 ------  设置阅后即焚照片必须先通过真人认证，请先去认证吧！！！
	 * 25 ------   已选择10位喜欢的人啦~'
	 * 26 ------  提示 非 VIP 不可提现
	 * 27 ------  注销后此账号将不可用 您确定要注销账号吗 ?     
	 * 28 ------  手机号码 ? 
	 * 29 ------  M豆不足 去充值 ? 
	 * */
	export default {
		name: 'unify-pop',
		props: {
			showUnify: Boolean,
			type: Number,
			centent: '',
			bankListType:Number,
			isMaskCloseAble: true,
		},
		data() {
			return {
			}
		},
		computed: {
			show: {
				get() {
					return this.showUnify
				},
				set() {}
			},
			unifyCent() {
				if (this.type === 1) {
					return '您未真人认证<br />请先完成真人认证'
				}
				if (this.type === 2) {
					return '您不是VIP用户，只可发送文字消息哦'
				}
				if (this.type === 3) {
					return '今日免费聊天次数已用完<br />首充98元送豪礼，马上充值别错过缘分'
				}
				// if (this.type === 4) {
				// 	return '今日免费聊天次数已用完<br />首充38元送豪礼，马上充值别错过缘分'
				// }
				if (this.type === 5) { //男性非Vip用户，聊过的人不能再聊提示去升级会员
					return '想继续跟她聊天吗？'
				}
				if (this.type === 6) {
					return '非女神认证，只能发送10条消息'
				}
				if (this.type === 7) {
					return '非女神认证，只能与10位异性聊天'
				}
				if (this.type === 8) {
					return '非女神认证，聊过的人不能再聊提示去女神认证'
				}
				if (this.type === 9) {
					return '确定要离开吗'
				}
				if (this.type === 10) {
					return '您的资料未完善，为您补充默认项 '
				}
				if (this.type === 11) {
					return '人脸识别您为:男性<br />是否重新选择性别'
				}
				if (this.type === 12) {
					return '请上传本人照片，否则人脸识别将不会通过'
				}
				if (this.type === 13) {
					return '真人认证失败,请重新认证或跳过'
				}
				if (this.type === 14) {
					return this.centent
				}
				if (this.type === 15) {
					return '您确定要移除吗?'
				}
				if (this.type === 16) {
					return '确定要拉黑吗'
				}
				if (this.type === 17) {
					return '您还未实名认证,请先完成实名认证'
				}
				if (this.type === 20) {
					return '您还未绑定银行卡,请先添加银行卡'
				}
				if (this.type === 18) {
					return '请添加客服小姐姐的微信 : saaw1221'
				}
				if (this.type === 19) {
					return '完善资料后，可立即领取佣金 '
				}
				if (this.type === 21) {
					return '将此次编辑保留'
				}
				if (this.type === 22) {
					return '已经有发布中的Me约'
				}
				if (this.type === 23) {
					return '设置阅后即焚照片必须先通过真人认证<br />请先去认证吧'
				}
				if (this.type === 24) {
					return '设置M币照片必须先通过女神认证，请先去认证吧'
				}
				if (this.type === 25) {
					return '已选择10位喜欢的人啦~'
				}
				if (this.type === 26) {
					return '非 VIP 不可提现'
				}
				if (this.type === 27) {
					return '注销后此账号将不可用 <br /> 您确定要注销账号吗 ? '
				}
				if (this.type === 28) {
					return this.user.mobile // 手机号码
				}
				if (this.type === 28) {
					return this.phone // 手机号码
				}
				if (this.type === 29) {
					return 'M 豆不足' // 手机号码
				}
				if (this.type === 30) {
					return '您不是VIP用户<br />只可发送文字消息哦'
				}
				if (this.type === 31) {
					return '绑定微信可获得收益，是否去绑定'
				}
				if (this.type === 32) {
					return '男性需要升级为 Vip 才可以绑定微信哦'
				}
				if (this.type === 33) {
					return 'TA暂未认证微信，是否提醒TA认证'
				}
			}
		},
		methods: {
			closePop() {
				this.$emit('closePop')
			},
			// 去真人认证
			toFace() {
				this.closePop()
				uni.navigateTo({
					url: '/pages/my/face'
				})
			},
			// 升级会员
			toMember() {
				this.closePop()
				this.$emit('showMemberPop', '充值VIP哦')
			},
			MemberPay() {
				this.showMemberPay = false
				this.closePop()
			},
			// 去女神认证
			toGoddess() {
				uni.navigateTo({
					url: '/pages/my/prove/index'
				})
			},
			//赋值
			clonePop(){
				this.$emit('clonePop')
			},
			// 确认离开
			closePopCancel() {
				this.$emit('closePopCancel')
			},
			//系统补齐资料
			NoPerfectCancel() {
				this.$emit('NoPerfectCancel')
			},
			//人脸识别检测为男性
			popMaleConfirm() {
				this.$emit('popMaleConfirm')
			},
			//性别确认弹框
			popConfirm() {
				this.$emit('popConfirm')
			},
			//确认删除
			deleteList() {
				this.$emit('deleteList')
			},
			//拉黑
			setBlack() {
				this.$emit('setBlack')
			},
			//绑定银行卡,实名认证
			popConfirmReal(bankListType) {
				console.log(bankListType)
				this.$emit('popConfirmReal',bankListType)
			},
			//男性非真人提示提示不可发送阅后即焚
			popConfirmFace() {
				this.$emit('popConfirmFace')
			},
			//确定存入草稿
			popConfirmDraft() {
				this.$emit('popConfirmDraft')
			},
			//取消存草稿
			popCancel() {
				this.$emit('popCancel')
			},
			//查看已发布Me约
			goTaskDetail() {
				this.$emit('goTaskDetail')
			},
			//退出发布Me约
			goBackPage() {
				this.$emit('goBackPage')
			},
			//去聊天
			confirmToNav() {
				this.$emit('confirmToNav')
			},
			//等下聊
			cancelGoNav() {
				this.$emit('cancelGoNav')
			},
			//升级会员
			goMemberPay(){
				this.$emit('goMemberPay')
			},
			//确认注销
			realWrite(){
				this.$emit('realWrite')
			},
			//确认注销
			rechargeM(){
				this.$emit('rechargeM')
			},
			// 提醒绑定微信
			bingWx(){
				this.$emit('bingWx')
			},
			//提醒绑定微信
			reminfBingWx(){
				this.$emit('reminfBingWx')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.unify-pop-box {
		width: 600rpx;
	}

	.unify-cent {
		min-height: 100rpx;
		line-height: 50rpx;
	}

	.unify-btn-box {
		height: 98rpx;
		line-height: 97rpx;
	}
</style>
