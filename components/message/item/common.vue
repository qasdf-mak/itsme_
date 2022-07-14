<template>
	<view v-if="item && item.payload && item && item.payload.text">
		<view class="width-full text-center color-white" v-if='item.type === "itsme_common_paySuccess"'>
            {{item.senderId == user.id ? '' : '对方使用了您的会员券'}}
		</view>
		<view v-else>
			<view class="width-full flex align-items-center lh1 flex-right" v-if="item.senderId == user.id">
				<view class="text-box bg-itsme-2 fs14 color-white pt8 pb8 pl15 pr15 lh15">
					{{item.payload.text}}
				</view>
			</view>
			<view class="width-full flex align-items-start lh1 flex-left" v-else>
				<view class="avatar-box mr12 float-hidden" @click="toHome">
					<image :src="friend.avatar | imageFilter('m11')" class="width-full height" mode="widthFix"></image>
				</view>
				<view class="text-box bg-itsme-4 fs14 color-white pt8 pb8 pl15 pr15 lh15">
					{{item.payload.text}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapGetters
	} from 'vuex'
	export default {
		name: 'item-common',
		props: {
			item: Object,
			friend: Object,
			isPlay: {
				type: Boolean,
				default: false
			}
		},
		computed: {
			...mapGetters(['user'])
		},
		mounted() {
			//console.log(this.item)
		},
		methods: {
			toHome() {
				this.$emit('toHome')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.text-box {
		max-width: 520rpx;
		border-radius: 34rpx;
	}

	.text-send {
		box-shadow: 0 0 14rpx rgba(255, 164, 92, 0.4);
	}

	.avatar-box {
		width: 80rpx;
		height: 80rpx;
		border-radius: 80rpx;
	}
</style>
