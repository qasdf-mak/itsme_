<template>
	<view v-if="powerData" :class="(powerData.type === 1001 || powerData.type === 2001) ? 'itsme-member-pop' : ''">
		<u-popup v-model="show" mode="center" :closeable="false" border-radius="20" z-index="99999999999"
			:mask-custom-style="{background: 'rgba(0, 0, 0, 0.75)'}" @close="closePop">
			<view class="member-pop-box">
				<view class="width-full relative">
					<image src="../../static/itsme/itsme_13.png" class="width-full member-pop-img" mode="aspectFill"
						v-if="powerData.type === 1001 || powerData.type === 2001">
						<image src="../../static/itsme/itsme_18.png" class="width-full member-pop-img" mode="aspectFill"
							v-else>
						</image>
						<view class="absolute top30 left right">
							<view class="width-full pt3 fs18 color-white fw600 text-center mb10">
								{{(powerData.type === 1001 || powerData.type === 2001) ? '会员' : '女神'}}无限次数查看用户
							</view>
							<view class="width-full fs13 color-white text-center">
								多看看，总有一个{{(powerData.type === 1001 || powerData.type === 2001) ? '瞎眼看上你的' : '属于你的'}}
							</view>
						</view>
				</view>
				<view class="width-full bg-white">
					<view class="pt30 pb25 pl25 pr25 fs14 color-deep">
						<view class="width-full mb12" v-if="powerData.type === 1001 || powerData.type === 1002">
							您今天的次数已经用完了
						</view>
						<view class="width-full mb12" v-if="powerData.type === 2001 || powerData.type === 2002">
							您今天还能查看{{powerData.total - powerData.look}}位{{(powerData.type === 1001 || powerData.type === 2001) ? '女生' : '男生'}}
						</view>
						<view class="width-full">
							{{(powerData.type === 1001 || powerData.type === 2001) ? '非会员' : '未认证女神'}}每日只能查看{{powerData && powerData.total || 0}}位{{(powerData.type === 1001 || powerData.type === 2001) ? '女生' : '男生'}}
						</view>
					</view>
					<view class="ml15 mr15 b-t-1 pt10 pb10 line-color-3 flex align-items-center">
						<view class="flex-1 fs15 pt8 pb8 text-center color-999999 b-r-1 line-color-3"
							@click="goUserHome" v-if="powerData.type === 2001 || powerData.type === 2002">
							继续查看
						</view>
						<view class="flex-1 fs15 pt8 pb8 text-center color-main6" @click="goMember"
							v-if="powerData.type === 1001 || powerData.type === 2001">
							领取会员特权
						</view>
						<view class="flex-1 fs15 pt8 pb8 text-center color-main6" @click="goGoddess"
							v-if="powerData.type === 1002 || powerData.type === 2002">
							女神认证
						</view>
					</view>
				</view>
			</view>
		</u-popup>
		<member-pay :showMemberPay="showMemberPay" @closePop="showMemberPay = false" @paySuccess="showMemberPay = false">
		</member-pay>
	</view>
</template>

<script>
	export default {
		name: 'home-power',
		data() {
			return {
				showMemberPay: false
			}
		},
		props: {
			showPower: Boolean,
			powerData: Object
		},
		computed: {
			show: {
				get() {
					return this.showPower
				},
				set() {}
			}
		},
		methods: {
			closePop() {
				this.$emit('closePop')
			},
			goUserHome() {
				this.$emit('closePop')
				uni.navigateTo({
					url: '/pages/itsme/home?id=' + this.powerData.id
				})
			},
			goMember() {
				this.$emit('closePop')
				this.showMemberPay = true
			},
			goGoddess() {
				this.$emit('closePop')
				uni.navigateTo({
					url: '/pages/my/prove/index'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.member-pop-box {
		width: 560rpx;
	}

	.member-pop-img {
		height: 400rpx;
	}
</style>
