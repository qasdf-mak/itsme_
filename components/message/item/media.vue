<template>
	<view v-if="imageData"> 
		<!-- 发送方 -->
		<view class="width-full flex align-items-center lh1 flex-right" v-if="item.senderId == user.id">
			<view class="mr15" v-if="Number(imageData.rule_type) === 3">
				<image src="../../../static/itsme/itsme_5.png" class="rule-img" mode="widthFix" v-if="Number(imageData.is_read) === 0"></image>
				<image src="../../../static/itsme/itsme_8.png" class="rule-img" mode="widthFix" v-else></image>
			</view>
			<view class="mr15" v-if="item.status">
				<u-loading mode="circle" size="40"></u-loading>
			</view>
			<view class="relative" :style="imageBox" @click="previewImage" v-if="item.type === 'itsme_image'">
				<image :src="imageData.url | imageFilter" class="width-full height" mode="scaleToFill"></image>
			</view>
			<view class="relative" :style="imageBox" @click="previewImage" v-if="item.type === 'itsme_video'">
				<image :src="imageData.url | imageFilter('poster')" class="width-full height" mode="scaleToFill"></image>
				<view class="absolute top bottom right left flex align-items-center flex-center">
				 	<view class="icon_font fs40 color-white">
				 		&#xe622;
				 	</view>
				</view>
			</view>
		</view>
		<!-- 发送方 -->
		<!-- 接收方 -->
		<view class="width-full flex align-items-start lh1 flex-left" v-else>
			<view class="avatar-box mr12 float-hidden" @click="toHome">
				<image :src="friend.avatar | imageFilter('m11')" class="width-full height" mode="widthFix"></image>
			</view>
			<view class="flex align-items-center">
				<view class="relative float-hidden" :style="imageBox" @click="previewImage" v-if="item.type === 'itsme_image'">
					<image
						:src="imageData.url | imageFilter"
						class="width-full height"
						:class="Number(imageData.rule_type) === 3 ? 'look-mask' : ''"
						mode="scaleToFill"
					></image>
				</view>
				<view class="relative float-hidden" :style="imageBox" @click="previewImage" v-if="item.type === 'itsme_video'">
					<image
						:src="imageData.url | imageFilter('poster')"
						class="width-full height"
						:class="Number(imageData.rule_type) === 3 ? 'look-mask' : ''"
						mode="scaleToFill"
					></image>
					<view class="absolute top bottom right left flex align-items-center flex-center">
					 	<view class="icon_font fs40 color-white">
					 		&#xe622;
					 	</view>
					</view>
				</view>
				<view class="ml15" v-if="Number(imageData.rule_type) === 3">
					<image src="../../../static/itsme/itsme_5.png" class="rule-img" mode="widthFix" v-if="Number(imageData.is_read) === 0"></image>
					<image src="../../../static/itsme/itsme_8.png" class="rule-img" mode="widthFix" v-else></image>
				</view>
			</view>
		</view>
		<!-- 接收方 -->
	</view>
</template>

<script>
	import { mapGetters } from 'vuex'
export default{
	name: 'item-image',
	props: {
		item: Object,
		friend: Object
	},
	computed: {
		...mapGetters(['user']),
		imageData () {
			if (this.item && this.item.payload) {
				return this.item.payload
			} else {
				return null
			}
		},
		imageBox () {
			let width = 300
			let height = 300
			if (this.item && this.item.payload) {
				let oldwidth = this.item.payload.width
				let oldheight = this.item.payload.height
				if (oldwidth >= oldheight) {
					if (oldwidth > 700) {
						width = 350
					} else {
						width = width / 2
					}
					height = oldheight / oldwidth * width
				}
				if (oldwidth < oldheight) {
					if (oldheight > 700) {
						height = 350
					} else {
						height = height / 2
					}
					width = oldwidth / oldheight * height
				}
			}
			return 'width: ' + width + 'rpx; height: ' + height + 'rpx'
		}
	},
	mounted() {
	console.log(this.item)
	},
	methods: {
		previewImage() {
			this.$emit('previewImage')
		},
		toHome() {
			this.$emit('toHome')
		}
	}
}
</script>

<style lang="scss" scoped>
	.text-box{
		max-width: 520rpx;
		border-radius: 34rpx;
	}
	.image-width{
		max-width: 300rpx;
	}
	.image-height{
		max-height: 300rpx;
	}
	.avatar-box{
		width: 80rpx;
		height: 80rpx;
		border-radius: 80rpx;
	}
	.rule-img{
		width: 40rpx;
	}
	.look-mask{position: relative;filter: blur(15rpx);user-select: none;}
	.look-mask::after{position: absolute;top: 0;left: 0;width: 100%;height: 100%;content: '';display: block;background: rgba(0, 0, 0, 0.5);}
</style>
