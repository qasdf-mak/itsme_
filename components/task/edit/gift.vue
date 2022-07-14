<template>
	<view class="width-full lh1">
		<view class="width-full flex align-items-center mt20">
			<view class="flex align-items-center" @click="changeGiftType(1)">
				<image src="../../../static/my/my_16.png" class="photo-bot-img" mode="widthFix" v-if="show === 1"></image>
				<image src="../../../static/my/my_17.png" class="photo-bot-img" mode="widthFix" v-else></image>
				<view class="task-check-box fs16 color-deep ml8">
					选礼物
				</view>
			</view>
			<view class="flex align-items-center ml20" @click="changeGiftType(0)">
				<image src="../../../static/my/my_16.png" class="photo-bot-img" mode="widthFix" v-if="show === 0"></image>
				<image src="../../../static/my/my_17.png" class="photo-bot-img" mode="widthFix" v-else></image>
				<view class="task-check-box fs16 color-deep ml8">
					面议
				</view>
			</view>
		</view>
		<view class="ml10 mt20 flex flex-wrap" v-if="show === 1">
			<view v-for="(item,index) in changeGiftList" :key="index">
				<view class="gift-item-box mb20 relative" :class="(index + 1) % 4 === 0 ? '' : 'mr30'">
					<image :src="item.icon | imageFilter('m11')" class="gift-item-img" mode="scaleToFill"></image>
					<view class="width-full fs14 color-999999 text-center mt10">
						{{item.name}}
					</view>
					<view class="width-full fs14 color-999999 text-center mt5">
						x{{item.num}}
					</view>
					<view class="del-gift-box flex align-items-center flex-center absolute" @click="delGift(item.id)">
						<view class="icon_font fs9 color-white">
							&#xe635;
						</view>
					</view>
				</view>
			</view>
			<view class="add-gift flex align-items-center flex-center" @click="addGift">
				<view class="icon_font fs20 color-white fw600">
					&#xe62c;
				</view>
			</view>
		</view>
		<!-- 选礼物 -->
		<change-gift @changeSuccess="changeSuccess" v-if="showGiftPop" @closeGift="showGiftPop = false"></change-gift>
	</view>
</template>

<script>
	import changeGift from './changegift.vue'
	export default {
		name: 'task-gift',
		data() {
			return {
				showGiftPop: false
			}
		},
		watch: {
			showAdd() {
				this.showGiftPop = true
			}
		},
		props: {
			show: Number,
			gift: String,
			showAdd: Boolean
		},
		components: {
			changeGift
		},
		computed: {
			changeGiftList () {
				if (this.gift) {
					console.log('this.gift')
					console.log(JSON.parse(this.gift))
					console.log('this.gift')
					return JSON.parse(this.gift)
				} else {
					return []
				}
			}
		},
		methods: {
			changeGiftType(index) {
				this.$emit('changeGiftType', index)
			},
			changeSuccess(data) {
				console.log('data')
				console.log(data)
				console.log('data')
				let giftlist = []
				if (this.gift) {
					giftlist = JSON.parse(this.gift)
				}
				console.log(321)
				if (giftlist.length > 0) {
					let giftIds = giftlist.map(item => {
						return item.gift_id
					})
					data.map(item => {
						let index = giftIds.indexOf(item.id)
						if (index === -1) {
							item.num = 1
							item.gift_id = item.id
							giftlist.push(item)
						} else {
							giftlist[index].num++
						}
					})
				} else {
					data.map(item => {
						item.num = 1
						item.gift_id = item.id
						giftlist.push(item)
					})
				}
				console.log(321)
				this.$emit('addGift', JSON.stringify(giftlist))
				this.showGiftPop = false
			},
			addGift() {
				this.showGiftPop = true
			},
			delGift(id) {
				let giftlist = JSON.parse(this.gift).filter(item => {
					return item.id !== id
				})
				this.$emit('addGift', JSON.stringify(giftlist))
			}
		}
	}
</script>

<style lang="scss" scoped>
	.task-dian{
		width: 10rpx;
		height: 10rpx;
		background: #F3CEB0;
		border-radius: 10rpx;
	}
	.task-input-box{
		height: 80rpx;
		border: 2rpx solid #CCCCCC;
	}
	.photo-bot-img{
		width: 30rpx;
	}
	.task-check-box{
		width: 100rpx;
	}
	.add-gift{
		width: 100rpx;
		height: 100rpx;
		border-radius: 100rpx;
		background: #F6F6F6;
	}
	.gift-item-box{
		width: 100rpx;
		height: 180rpx;
	}
	.gift-item-img{
		width: 100rpx;
		height: 100rpx;
	}
	.del-gift-box{
		width: 30rpx;
		height: 30rpx;
		top: -10rpx;
		right: -10rpx;
		border-radius: 30rpx;
		overflow: hidden;
		background: #F2522E;
	}
</style>
