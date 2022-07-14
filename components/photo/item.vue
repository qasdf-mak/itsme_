<template>
	<view>
		<view class=" relative br5 float-hidden" :class="isHome ? 'photo-box-2':''" @click="clickPhoto">
			<view v-if="item.type === 'itsme_image' || item.type === '1'">
				<image :src="item.url | imageFilter('m11')" class="photo-box"
					:class="(Number(item.rule_type) === 3 || Number(item.rule_type) === 4) ?'look-mask' : ''"
					mode="aspectFill"></image>
			</view>
			<view v-else>
				<image :src="item.url | imageFilter('poster')" class="photo-box"
					:class="(Number(item.rule_type) === 3 || Number(item.rule_type) === 4) ?'look-mask' : ''"
					mode="aspectFill"></image>
			</view>
			<view class="absolute top left right bottom flex align-items-center flex-center"
				v-if="item.type === 'itsme_video' && (Number(item.rule_type) === 1 || Number(item.rule_type) === 2)">
				<view class="icon_font fs20 color-white">
					&#xe622;
				</view>
			</view>
			<view class="absolute top right8" v-if="Number(item.rule_type) === 1">
				<image src="../../static/itsme/itsme_7.png" class="rule-benren" mode="widthFix"></image>
			</view>
			<view v-if="Number(item.rule_type) === 3">
				<view class="absolute top left right bottom flex flex-col flex-center align-items-center"
					v-if="item.is_read === 0">
					<image src="../../static/itsme/itsme_33.png" class="rule-huo" mode="widthFix"></image>
					<view class="mt8 fs12 color-white">
						阅后即焚
					</view>
				</view>
				<view class="absolute top left right bottom flex flex-col flex-center align-items-center" v-else>
					<image src="../../static/itsme/itsme_19.png" class="rule-huo" mode="widthFix"></image>
					<view class="mt8 fs12 color-white">
						已焚毁
					</view>
				</view>
			</view>
			<view class="absolute top left right bottom flex flex-col flex-center align-items-center"
				v-if="Number(item.rule_type) === 4">
				<image src="../../static/itsme/itsme_34.png" class="rule-huo" mode="widthFix"></image>
				<view class="mt8 fs12 color-white">
					会员{{item.type === 'itsme_image' ? '照片' : '视频'}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'photo-item',
		props: {
			item: Object,
			isHome: Boolean
		},
		mounted() {
			console.log(this.item)
		},
		methods: {
			clickPhoto() {
				this.$emit('clickPhoto')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.photo-box {
		width: calc((100vw - 88rpx) / 3);
		height: calc((100vw - 88rpx) / 3);
	}

	.photo-box-2 {
		width: calc((100vw - 120rpx) / 3);
		height: calc((100vw - 120rpx) / 3);
	}

	.rule-benren {
		width: 62rpx;
	}

	.rule-huo {
		width: 42rpx;
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
