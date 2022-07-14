<template>
	<view class="width-full minnavh100vh lh1 bg-white">
		<view class="width-full occupation-color-1 text-center fs15 pt25 mb15">
			认证通过后，可极大的提升您的关注度和交友成功率
		</view>
		<view class="mt3 ml35 mr35">
			<view class="width-full fs14 color-deep fw600 mb10">
				我选择的职业
			</view>
			<view class="width-full flex align-items-center">
				<view class="occupation-item-check mb25 fs16" v-if="occupation">
					{{occupation && occupation.name}}
				</view>
				<view class="occupation-item-none mb25 fs16" v-else></view>
			</view>
		</view>
		<view class="mt3 ml35 mr35">
			<view class="width-full mb20 flex align-items-center">
				<view class="fs14 color-deep fw600">
					其他职业
				</view>
				<view class="fs13 color-middle">
					（认证完成后，个人资料的职业将被修改）
				</view>
			</view>
			<view class="width-full flex align-items-center flex-wrap">
				<view v-for="(item,index) in occupationList" :key="index">
					<view
						class="mb20 mt10 fs16 mr20 border-box"
						:class="(occupation && item.name === occupation.name) ? 'occupation-item-check' : 'occupation-item'"
						@click="changeOccupation(index)"
					>
						{{item.name}}
					</view>
				</view>
			</view>
		</view>
		<view class="fixed bottom left right pb_iphoneX_safe pt30 bg-white">
			<view class="ml35 mr35 pb35">
				<view class="ml8 mr8 mb15 bg-2 fs18 color-white text-center br20 pt10 pb10 btn-box" :class="!occupation ? 'opacity60' : ''" @click="toNext">
					下一步
				</view>
			</view>
		</view>
		<view v-if="showRedPacket">
			<red-packet></red-packet>
		</view>
	</view>
</template>

<script>
	import CommonService from '../../../common/service/common-service.js'
export default {
	data() {
		return {
			occupation: null,
			occupationList: []
		}
	},
	onLoad() {
		this.init()
	},
	methods:{
		init() {
			Object.assign(this.$data, this.$options.data())
			this.getOccupationList()
		},
		getOccupationList() {
			CommonService.professionlist().then(res => {
				console.log(res)
				if (res.code === 1) {
					this.occupationList = res.data.profession_list
				}
			})
		},
		changeOccupation(index) {
			this.occupation = this.occupationList[index]
		},
		toNext() {
			console.log(this.occupation)
			uni.navigateTo({
				url: '/pages/my/prove/figure?type=occupation&occupationId=' + this.occupation.id
			})
		}
	}
}
</script>

<style lang="scss" scoped>
	.occupation-color-1{
		color: #FFD200;
	}
	.occupation-item{
		color: #999999;
		height: 78rpx;
		line-height: 76rpx;
		border-radius: 78rpx;
		padding: 0 30rpx;
		border: 2rpx solid #EEEEEE;
	}
	.occupation-item-check{
		color: #666666;
		height: 78rpx;
		line-height: 76rpx;
		background: #FFFDEF;
		border-radius: 78rpx;
		padding: 0 30rpx;
		border: 2rpx solid #EDDD81;
	}
	.occupation-item-none{
		height: 78rpx;
	}
</style>
