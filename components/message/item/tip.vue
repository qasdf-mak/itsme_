<template>
	<view class="width-full lh1">
		<view class="width-full flex align-items-center flex-center" v-if="item.status === 1" @click="sendGift">
			<view class="fs13 color-deep">Ta对你的好感度有所增加，</view>
			<view class="fs13 color-main6">赠送礼物</view>
			<view class="fs13 color-deep">增加亲密度吧！</view>
		</view>
		<!-- <view class="width-full flex align-items-center flex-center"  v-if="item.status === 2" @click="toGoddess">
			<view class="fs13 color-deep">TA的身价值较高，只想与女神认证的人聊天：【</view>
			<view class="fs13 color-main6">女神认证</view>
			<view class="fs13 color-deep">】</view>
		</view> -->
		<view class="width-full flex align-items-center flex-center" v-if="item.status === 3" @click="toSetLable">
			<view class="fs13 color-deep">不知道我的资料是否跟你的匹配【</view>
			<view class="fs13 color-main6">填写</view>
			<view class="fs13 color-deep">】</view>
		</view>
		<view class="width-full flex align-items-center flex-center" v-if="item.status === 4" @click="toSetLable">
			<view class="fs13 color-deep">不知道我的资料是否跟你的匹配【</view>
			<view class="fs13 color-main6">填写</view>
			<view class="fs13 color-deep">】</view>
		</view>
		<view class="width-full flex align-items-center flex-center" v-if="item.status === 5">
			<view class="fs13 color-deep">对方已填写匹配资料，可放心交友</view>
		</view>
		<view class="width-full flex align-items-center flex-center" v-if="item.status === 6 && showRedPack" @click="openThePopup">
			<view class="fs13 color-deep">他是非会员,送他会员券,使用后获得佣金【</view>
			<view class="fs13 color-main6">送会员券</view>
			<view class="fs13 color-deep">】</view>
		</view>
		<view class="width-full flex align-items-center flex-center" v-if="item.status === 7">
			<view class="fs13 color-deep">对方拒收了，消息发送失败</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'item-tip',
		props: {
			item: Object,
			isWetherNeed:Boolean,
			isWhetherToUse:Boolean
		},
		data(){
			return{
				showRedPack:true
			}
		},
		mounted() {
			console.log(this.isWhetherToUse)
			if(this.isWetherNeed){
				this.showRedPack = true
			}else{
				this.showRedPack = false
			}
		},
		methods: {
			// 设置标签
			toSetLable() {
				this.$emit('toSetLable')
			},
			//打开会员券弹窗
			openThePopup(){ 
				this.$emit('openThePopup')
			},
			// 送礼物
			sendGift() {
				this.$emit('sendGift')
			},
			// 去女神认证
			toGoddess() {
				uni.navigateTo({
					url: '/pages/my/prove/index'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.text-box {
		max-width: 520rpx;
		border-radius: 34rpx;
		word-break: break-word;
	}

	.text-send {
		background: #F2B27F;
		box-shadow: 0 0 14rpx rgba(255, 164, 92, 0.4);
	}

	.text-from {
		background: #FFFFFF;
		box-shadow: 0 0 14rpx rgba(255, 164, 92, 0.22);
	}

	.avatar-box {
		width: 80rpx;
		height: 80rpx;
		border-radius: 80rpx;
	}
</style>
