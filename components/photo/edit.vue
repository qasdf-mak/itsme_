<template>
	<view>
		<view class="photo-box relative br5 float-hidden"  v-if="item">
			<view class="photo-box" :class="(item.rule_type === 3 || item.rule_type === 4) ? 'look-mask' : ''">
				<image :src="item.url | imageFilter('m11')" class="photo-box" mode="aspectFill"></image>
			</view>
			<view class="absolute bottom5 right5" v-if="item.rule_type === 2 && user.gender === 0" @click="setPhoto">
				<image src="/static/itsme/itsme_47.png" mode="widthFix" class="img-box-4"></image>
			</view>
			<view class="absolute top bottom right left flex align-items-center flex-center flex-col"
				v-if="item.rule_type === 3">
				<image src="../../static/itsme/its_23.png" class="rule-huo" mode="widthFix"></image>
				<view class="mt8 fs12 color-white">
					阅后即焚
				</view>
			</view>
			<view class="absolute top bottom right left flex align-items-center flex-center flex-col"
				v-if="item.rule_type === 4">
				<image src="../../static/itsme/its_24.png" class="rule-huo" mode="widthFix"></image>
				<view class="mt8 fs12 color-white">
					会员照片
				</view>
			</view>
		</view>
		<view class="fixed top bottom left right bg-itsme-1 flex flex-col" v-if="showSetting" style="z-index: 99999;">
			<view :style="'height:' + StatusBar + 'px;'"></view>
			<view class="width-full flex-1 flex flex-col">
				<view class="pt15 pl15 pb15 pr15 flex align-items-center">
					<view class="flex-1 flex align-items-center" @click="hideSetting">
						<view class="icon_font fs20 color-middle">
							&#xe638;
						</view>
					</view>
					<view class="icon_font fs20 color-middle mr18" @click="delPhoto">
						&#xe686;
					</view>
					<view class="fs15 color-white pt5 pb8 pl15 pr15 bg-2 br20 btn-box" @click="savePhoto">
						保存
					</view>
				</view>
				<view class="flex-1">
					<image :src="photoData.url | imageFilter()" class="width-full height" mode="aspectFit" v-if="photoData && photoData.url"></image>
				</view>
				<view class="pl25 pr25 pt20">
					<view class="width-full">
						<view class="width-full flex align-items-center mb20" @click="changeRule(3)">
							<view class="icon_font color-main6 fs16" v-if="photoData.rule_type === 3">
								&#xe64d;
							</view>
							<view class="icon_font color-itsme-4 fs16" v-else>
								&#xe65f;
							</view>
							<view class="flex-1 fs15 ml12"
								:class="photoData.rule_type === 3 ? 'color-white' : 'color-itsme-10'">
								阅后即焚照片，查看{{(isVip || isNvShen) ? 8 : 3}}秒后焚毁
							</view>
						</view>
						<view class="width-full flex align-items-center mb20" @click="changeRule(4)"
							v-if="!user.gender || user.gender === 0">
							<view class="icon_font color-main6 fs16" v-if="photoData.rule_type === 4">
								&#xe64d;
							</view>
							<view class="icon_font color-itsme-4 fs16" v-else>
								&#xe65f;
							</view>
							<view class="flex-1 ml12 flex align-items-center">
								<view class="fs15"
									:class="photoData.rule_type === 4 ? 'color-white' : 'color-itsme-10'">
									会员照片(仅限会员用户查看)
								</view>
								<!-- 	<view class="fs15 color-deep edit-input-box ml5 mr5">
									消耗<input type="text" v-model="photoData.price" />
								</view>
								<view class="fs15 color-deep">
									M豆可查看
								</view> -->
							</view>
						</view>
						<view class="width-full flex align-items-center mb20" @click="changeRule(2)">
							<view class="icon_font color-main6 fs16" v-if="photoData.rule_type === 2">
								&#xe64d;
							</view>
							<view class="icon_font color-itsme-4 fs16" v-else>
								&#xe65f;
							</view>
							<view class="flex-1 fs15 ml12"
								:class="photoData.rule_type === 2 ? 'color-white' : 'color-itsme-10'">
								普通照片
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 权限弹窗 -->
		<unify-pop :showUnify="showUnifyPop" :type="unifyType" @closePop="showUnifyPop = false"
			@popConfirmFace="popConfirmFace">
		</unify-pop>
		<!-- 权限弹窗 -->
		<!-- 完善资料 -->
		<view class="width-full" v-if="showPerfectPop">
			<perfect-pop @refreshTheList="refreshTheList" @closePerfectPop="toHidePerfectPop">
			</perfect-pop>
		</view>
		<!-- 完善资料 -->
		<u-toast ref="uToast" z-index="999999" />
	</view>
</template>

<script>
	import {
		mapGetters
	} from 'vuex'
	export default {
		nname: 'edit-photo',
		data() {
			return {
				showPop: false,
				confirmText: '',
				contentText: '',
				showSetting: false,
				photoData: null
			}
		},
		props: {
			item: Object
		},
		computed: {
			...mapGetters(['user']),
			isVip() {
				if (this.user && this.user.is_vip && this.user.is_vip === 1) {
					return true
				} else {
					return false
				}
			},
			isReal() {
				if (this.user && this.user.is_real === 1) {
					return true
				} else {
					return false
				}
			},
			isNvShen() {
				if (this.user && this.user.certify) {
					let certify = JSON.parse(this.user.certify)
					if (certify.goddess && certify.goddess.verified) {
						return true
					} else {
						return false
					}
				} else {
					return false
				}
			}
		},
		methods: {
			// 打开照片设置
			setPhoto() {
				this.photoData = this.item
				console.log(this.item)
				console.log(this.photoData)
				this.showSetting = true
			},
			// 关闭照片设置
			hideSetting() {
				this.showSetting = false
				this.photoData = null
			},
			// 删除照片
			delPhoto() {
				this.$emit('delPhoto')
				this.showSetting = false
			},
			// 保存设置
			savePhoto() {
				this.photoData.rule_type = Number(this.photoData.rule_type)
				this.photoData.price = Number(this.photoData.price)
				// if (this.photoData.rule_type === 4 && this.photoData.price === 0) {
				// 	this.$refs.uToast.show({
				// 		title: '请填写M豆数',
				// 		icon: false,
				// 		duration: 1000
				// 	})
				// 	return false
				// }
				this.$emit('setPhoto', this.photoData)
				this.showSetting = false
				this.photoData = null
			},
			changeRule(value) {
				if (value === 2) {
					this.photoData.rule_type = 2
				}
				if (value === 3) {
					if (this.isReal) {
						this.photoData.rule_type = 3
					} else {
						this.unifyType = 23
						this.showUnifyPop = true
					}
				}
				if (value === 4) {
					if (this.isReal) {
						this.photoData.rule_type = 4
					} else {
						this.unifyType = 23
						this.showUnifyPop = true
					}
				}
			},
			popConfirmFace() {
				if (this.unifyType === 23) {
					this.toShowPerfectPop()
					this.showUnifyPop = false
				}
				if (this.unifyType === 24) {
					uni.showToast({
						title: '暂未开放'
					})
					this.showUnifyPop = false
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.photo-box {
		width: calc((100vw - 120rpx) / 3);
		height: calc((100vw - 120rpx) / 3);
	}

	.rule-input {
		width: 150rpx;
	}

	.rule-huo {
		width: 42rpx;
	}

	.edit-input-box {
		width: 100rpx;
		border-bottom: 2rpx solid #DDDDDD;

		input {
			width: 100rpx;
			border: 0;
			padding: 0;
			margin: 0;
			background: none;
			text-align: center;
		}
	}

	.img-box-4 {
		width: 55rpx;
		height: 55rpx;
	}

	.look-mask {
		position: relative;
		filter: blur(15rpx);
		user-select: none;
	}

	.look-mask::after {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		content: '';
		display: block;
		background: rgba(0, 0, 0, 0.5);
	}
</style>
