<template>
   <view class="width-full">
   	<view class="width-full pt10 pb10 pl15 pr15">
   		<view class="width-full flex flex-col card-shadow">
   			<view class="flex align-items-center">
   				<view class="flex-1 pl10 pb8 lh18">
   		<!-- 			<view class="pt8 fs16 fw600">
   						会员充值抵用会员券
   					</view> -->
   					<view class="flex">
   						<view class="pr5">
   							抵用金额 :
   						</view>
   						<view class="pr5 color-main6">
   							{{item.money}}
   						</view>
   						元
   					</view>
   					<view class="flex">
   						<view class="pr5">
   							有效期：
   						</view>
   						<view class="pr5 color-main6" v-if="newovertime">
   							{{newovertime | dateFilter}}
   						</view>
   					</view>
   		<!-- 			<view class="flex">
   						<view class="pr5">
   							状态：
   						</view>
   						<view class="pr5 color-main6">
   							可赠送
   						</view>
   					</view> -->
   					<view class="flex">
   						<view class="">
   							说明：<text class="color-main6">此会员券可充值会员，享受折扣；24小时未使用将自动退回</text>
   						</view>
   					</view>
   				</view>
   				<view class="avatar-box">
   					<view class="flex flex-col">
   						<view class="mt15 text-center">
   							赠送人：<text class="color-main6">{{item.nickname}}</text>
   						</view>
   						<view class="width-full text-center mt8">
   							<image :src="item.avatar | imageFilter('m11')"  class="img-box-1" mode=""></image>
   						</view>
   						<view class="width-full flex align-items-center flex-center mb10 mt5">
   							<view class=" text-center">
   								状态 :
   							</view>
   							<view class="operation-btn text-center pt5 pb5" :class="item.is_invalid == 2 ? ' color-main6' : 'color-bbbbbb'" >
   								{{item.is_invalid == 2 ? '可使用' : '已过期'}}
   							</view>
   						</view>
   					</view>
   				</view>
   			</view>
   			
   		</view>
   	</view>

   </view>
</template>

<script>
	export default {
		name: 'mycard-pack',
		props: {
			item:Object
		},
		mounted() {
			console.log(this.item)
		},
		data() {
			return {}
		},
	}
</script>

<style lang="scss" scoped>
	.avatar-box {
		width: 249rpx;
	}

	.card-shadow {
		background: #FFFFFF;
		box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.08);
		border-radius: 15px;
	}

	.card-box {
		width: 180rpx;
	}

	.img-box-1 {
		width: 115rpx;
		height: 115rpx;
		border-radius: 50%;
	}

	.operation-btn {
		width: 120rpx;
		box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.08);
		border-radius: 10px;
	}
	.bg-gray {
		background: #ebebeb;
	}
</style>
