<template>
	<view class="width-full lh1">
		<view class="width-full bg-itsme-4 br10" @click="toHome">
			<view class="pl18 pr18 pt15 pb15">
				<view class="width-full flex align-items-center mb15">
					<view class="user-avatar">
						<image :src="friendInfo.avatar | imageFilter('m11')" class="width-full" mode="widthFix"></image>
					</view>
					<view class="flex-1 ml15">
						<view class="width-full flex align-items-center">

							<view class="slider-box float-hidden">
								<view class="slider-item text-right pr10 border-box fs10 color-white"
									:style="'width: ' + friendInfo.match + '%;'">
									匹配度 {{friendInfo.match}}%
								</view>
							</view>
							<view class="ml2" @click.stop v-if="friendInfo.is_wx === 1 && friendInfo.is_vip === 1 || friendInfo.gender === 0">
								<view class="flex align-items-center pl10 pr10 br20 float-hidden ml6 "
									:class="friendInfo.is_wx === 1 ? 'wx_box' : 'is_wx_box'"
									@click="isShowWxPop(friendInfo)">
									<view class="icon_font fs14 mt2 "
										:class="friendInfo.is_wx === 1 ? 'color-green' : 'color-9B9999'">
										&#xe648;
									</view>
									<view class="fs12 color-white ml5" v-if="friendInfo.is_wx === 1">
										解锁
									</view>
									<view class="fs12 color-white ml5" v-else>
										未认证
									</view>
								</view>
							</view>
						</view>
						<view class="width-full fs15 color-white mt15 nowrap1">
							{{friendInfo.age}} / {{friendInfo.profession || '自由职业'}} / {{friendInfo.distance}}
						</view>
					</view>
				</view>
				<view class="width-full">
					<view class="width-full flex align-items-center ml10">
						<view class="fs12 color-itsme-10 mr10">
							{{friendInfo.gender === 1 ? '优势' : '技能'}} :
						</view>
						<view class="flex-1 hidd-text fs12 color-white">
							{{hobbiesAndInterests}}
						</view>
					</view>
				</view>
				<view class="width-full flex align-items-center mt20" v-if="friendInfo && friendInfo.gender === 0 ">
					<view class="tixing-box bg-itsme-2 mr8"></view>
					<view class="fs10 color-itsme-2">
						提醒:
					</view>
					<view class="fs10 color-itsme-2 ml5">
						对方已通过真人认证，可放心交友
					</view>
				</view>
				<view class="width-full flex align-items-center mt20"
					v-if="friendInfo && friendInfo.gender === 1 && friendInfo.is_vip === 0">
					<view class="tixing-box bg-itsme-2 mr5"></view>
					<!-- 	<view class="fs10 color-itsme-2">
						提醒:
					</view> -->
					<view class="fs10 color-itsme-2 ml3">
						他是非会员,送他会员券,使用后获得佣金【<text class="color-main6" @click.stop @click="popupRedPack">送会员券</text>】
					</view>
				</view>
			</view>
		</view>
		<!-- 获取微信弹框 -->
		<view class="" v-if="showWxPop">
			<get-user-wx :showWxPop="showWxPop" :item="friendInfo" @closeWxPop="showWxPop = false"></get-user-wx>
		</view>
		<!-- 获取微信弹框 -->
	</view>
</template>

<script>
	import getUserWx from '../../components/common/getUserWx.vue'
	export default {
		name: 'user-card',
		data() {
			return {
				powerData: null,
				showWxPop: false
			}
		},
		props: {
			friend: Object,
			friendInfo: Object
		},
		computed: {
			hobbiesAndInterests() {
				if (this.friendInfo && this.friendInfo.expect && this.friendInfo.expect.zsys && this.friendInfo.expect.zsys.data.length > 0) {
					console.log(this.friendInfo.expect.zsys.data)
					if (this.friendInfo.expect.zsys.data.length >= 1) {
						let tags = this.friendInfo.expect.zsys.data
						let usertags = ''
						for (let i = 0; i < tags.length; i++) {
							usertags += (' / ' + tags[i].name)
						}
						return usertags.substr(2)
					} else {
						return '对方未填写'
					}
				}else{
					return '对方未填写'
				}
			}
		},
		components:{
			getUserWx
		},
		methods: {
			toInvitation() {
				let params = {
					type: 'toInvitation'
				}
				this.sendImMessage('invitation', this.friend, params).then(
					(res) => {
						console.log('发送成功')
						this.content = ""
						this.$emit('sendSuccess', res)
					},
					(err) => {
						console.log('发送失败')
						console.log(err)
					}
				)
			},

			//弹起送会员券
			popupRedPack() {
				this.$emit('popupRedPack')
			},
			// 去聊天
			isShowWxPop(item) {
				if (item.is_wx === 1) {
					if (item.gender === this.user.gender) {
						uni.showToast({
							title: '同性之间，不可查看微信哦',
							icon: 'none'
						})
					} else {
						this.showWxPop = true
					}
				} else {
					 uni.showToast({
					 	title: 'TA暂未认证微信',
					 	icon: 'none'
					 })
				}
			},
			toHome() {
				this.toUserHome('list', this.friendInfo.id).then(res => {
					if (res.data.code === 200 || this.user.gender === 0) {
						uni.navigateTo({
							url: '/pages/itsme/home?id=' + this.friendInfo.id + '&type="msg"'
						})
					} else {
						this.powerData = {
							look: res.data.see,
							total: res.data.total,
							type: res.data.code,
							id: this.friendInfo.id
						}
						this.$emit('astrict', this.powerData)
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.user-avatar {
		width: 120rpx;
		height: 120rpx;
		border-radius: 120rpx;
		overflow: hidden;
	}

	.user-worth-box {
		height: 30rpx;
		line-height: 28rpx;
	}

	.slider-box {
		width: 180rpx;
		height: 30rpx;
		border-radius: 28rpx;
		background: #37375A;
	}

	.is_wx_box {
		height: 44rpx;
		border: 2rpx solid #9B9999;
		border-radius: 22rpx;
	}

	.wx_box {
		height: 44rpx;
		border: 2rpx solid #24365F;
		border-radius: 22rpx;
	}

	.slider-item {
		height: 30rpx;
		line-height: 28rpx;
		background: #297464;
	}

	.itsme-user-worth {
		width: 19rpx;
		height: 19rpx;
	}

	.tixing-box {
		width: 10rpx;
		height: 10rpx;
		border-radius: 10rpx;
	}

	.color-green {
		color: #06CA64;
	}

	.color-9B9999 {
		color: #9B9999;
	}

	.hidd-text {
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
