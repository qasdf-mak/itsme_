<template>
	<view v-if="item && item.payload && item && item.payload.type">
		<view class="width-full" v-if="item.senderId == user.id">
			<view class="width-full flex align-items-center mt10 mb10 flex-center" v-if="item.payload.type === 'signSuccess'">
				<view class="icon_font color-main6 fs14 mr10">
					&#xe6b0;
				</view>
				<view class="fs14 task-cent-btn color-deep">
					报名通过 开始进行Me约
				</view>
			</view>
			<view class="width-full flex align-items-center mt10 mb10 flex-center" v-if="item.payload.type === 'invitationSuccess'">
				<view class="icon_font color-main6 fs14 mr10">
					&#xe6b0;
				</view>
				<view class="fs14 task-cent-btn color-deep">
					你已接受邀请 开始进行Me约
				</view>
			</view>
		</view>
		<view class="width-full" v-else>
			<view class="width-full flex align-items-center mt10 mb10 flex-center" v-if="item.payload.type === 'signSuccess'">
				<view class="icon_font color-main6 fs14 mr10">
					&#xe6b0;
				</view>
				<view class="fs14 task-cent-btn color-deep">
					报名通过 开始进行Me约
				</view>
			</view>
			<view class="width-full flex align-items-center mt10 mb10 flex-center" v-if="item.payload.type === 'invitationSuccess'">
				<view class="icon_font color-main6 fs14 mr10">
					&#xe6b0;
				</view>
				<view class="fs14 task-cent-btn color-deep">
					对方已接受邀请 开始进行Me约
				</view>
			</view>
			<view class="width-full flex align-items-center mt10 mb10 flex-center" v-if="item.payload.type === 'taskEnd'">
				<view class="icon_font color-main6 fs14 mr10">
					&#xe6b0;
				</view>
				<view class="fs14 task-cent-btn color-deep">
					Me约已完成，礼物已发送到你的钱包
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
import { mapGetters } from 'vuex'
export default{
	name: 'item-task',
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
		// console.log(this.item)
	}
}
</script>

<style lang="scss" scoped>
	.text-box{
		max-width: 520rpx;
		border-radius: 34rpx;
	}
	.text-send{
		background: #F2B27F;
		box-shadow: 0 0 14rpx rgba(255, 164, 92, 0.4);
	}
	.text-from{
		background: #FFFFFF;
		box-shadow: 0 0 14rpx rgba(255, 164, 92, 0.22);
	}
	.avatar-box{
		width: 80rpx;
		height: 80rpx;
		border-radius: 80rpx;
	}
</style>
