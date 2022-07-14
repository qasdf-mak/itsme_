<template>
	<view class="itsme-member-pop">
		<u-popup
			v-model="show"
			mode="center"
			:closeable="false"
			border-radius="20"
			:mask-custom-style="{background: 'rgba(0, 0, 0, 0.75)'}"
			@close="closePop"
		>
			<view class="member-pop-box">
				<view class="width-full relative">
					<image src="../../static/itsme/itsme_13.png" class="width-full member-pop-img" mode="aspectFill"></image>
					<view class="absolute top30 left right">
						<view class="width-full pt3 fs18 color-white fw600 text-center mb10">
							会员无限次数查看用户
						</view>
						<view class="width-full fs13 color-white text-center">
							多看看，总有一个瞎眼看上你的
						</view>
					</view>
				</view>
				<view class="width-full bg-white">
					<view class="pt30 pb25 pl30 pr30 fs15 color-deep">
						<view class="width-full mb12" v-if="member && member.look && member.total && (member.look === member.total)">
							您今天的次数已经用完了
						</view>
						<view class="width-full mb12" v-if="member && member.look && member.total && (member.look !== member.total)">
							您今天还能查看{{member.total - member.look}}位女士
						</view>
						<view class="width-full">
							非会员每日只能查看{{member && member.total || 0}}位女士
						</view>
					</view>
					<view class="ml15 mr15 b-t-1 pt10 pb10 line-color-3 flex align-items-center">
							<view class="flex-1 fs15 pt8 pb8 text-center color-999999 b-r-1 line-color-3" @click="goUserHome" v-if="member && member.look && member.total && (member.look !== member.total)">
								继续查看
							</view>
							<view class="flex-1 fs15 pt8 pb8 text-center color-main6" @click="goMember">
								领取会员特权
							</view>
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		name: 'member-pop',
		data() {
			return {
				
			}
		},
		props: {
			showPop: Boolean,
			member: Object,
			popType: String
		},
		computed: {
			show: {
				get () {
					return this.showPop
				},
				set () {}
			}
		},
		methods: {
			closePop() {
				this.$emit('closePop')
			},
			goUserHome() {
				this.$emit('closePop')
				uni.navigateTo({
					url: '/pages/itsme/home?id=' + this.member.id
				})
			},
			goMember() {
				this.$emit('closePop')
				uni.navigateTo({
					url: '/pages/my/member/index'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.member-pop-box{
		width: 560rpx;
	}
	.member-pop-img{
		height: 400rpx;
	}
</style>
