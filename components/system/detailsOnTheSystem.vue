<template>
	<view class="p20" v-if="item.text">
		<view class="bigBox bg-itsme-4 width-full pt25 pl18 pr18 pb15">
			<view>
				<view class="fs13 color-white mb15 pl5 pr5 lh15" v-if="item.type === 7 ">
					{{JSON.parse(item.text).text}}
				</view>
				<view class="fs13 color-white mb15 pl5 pr5 lh15" v-else>
					{{item.text}}
				</view>
			</view>
			<view class="width-full line-b bg-itsme-1"> </view>
			<view class="flex align-items-center mt15">
				<view v-if="item.type === 5 ">
					<view class="flex ml25" v-if="item.agent_btn_show === 1">
						<view class="pr15 pl15 pt5 pb5 bg-green color-white btn-box mr20"
							@click="operation(1,item.agent_id,item.id)">
							加入
						</view>
						<view class="pr15 pl15 pt5 pb5  bg-red color-white btn-box ml35"
							@click="operation(2,item.agent_id,item.id)">
							拒绝
						</view>
					</view>
					<view class="flex ml25 " v-if="item.agent_btn_show === 2">
						<view class="pr15 pl15 pt5 pb5 color-main6 btn-box ml35">
							{{item.agent_text === 1 ? '加入成功' : '拒绝成功'}}
						</view>
					</view>
				</view>
				
				<view class="flex-1 color-itsme-10 flex " :class="item.type === 5 ? 'flex-right' : 'flex-left'">
					{{item.createtime | formatTime}}
				</view>
				<view class="flex align-items-center" v-if="item.type === 6 || item.type === 4" @click="pageTurns(item.type)">
					<view class="color-main6 fs10">
						查看
					</view>
					<view class="icon_font color-main6 ml3 fs10">
						&#xe60f;
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'system-system',
		data() {
			return {}
		},
		props: {
			item: Object,
			state: Boolean,
			btnType: Number
		},
		mounted() {
			console.log(this.btnType)
			console.log(this.state)
		},
		filters: {
			formatTime(time) {
				let value = ''
				let nowtime = new Date(new Date().toLocaleDateString()).getTime()
				let lasttime = 0
				if (String(time).length === 10) {
					lasttime = time * 1000
				} else {
					lasttime = time
				}
				let month = new Date(lasttime).getMonth() + 1
				if (month < 10) {
					month = '0' + month
				}
				let day = new Date(lasttime).getDate()
				if (day < 10) {
					day = '0' + day
				}
				let hour = new Date(lasttime).getHours()
				if (hour < 10) {
					hour = '0' + hour
				}
				let minute = new Date(lasttime).getMinutes()
				if (minute < 10) {
					minute = '0' + minute
				}
				if (time > nowtime) {
					value = hour + ':' + minute
				} else {
					value = month + '-' + day + ' ' + ' ' + hour + ':' + minute
				}
				return value
			}
		},
		methods: {
			operation(index, id, mid) {
				this.$emit('operation', index, id, mid)
			},
			pageTurns(type) {
				console.log(123)
				// 4 === 提现  6 === 卡包
				if (type == 4) {
					uni.navigateTo({
						url: '/pages/my/commission'
					})
				}
				if (type == 6) {
					this.toJumpPage(1, '/pages/my/commission')
				}
			}
		},
	}
</script>

<style>
	.bigBox {
		box-shadow: 0px 0px 18px 0px rgba(0, 0, 0, 0.07);
		border-radius: 20rpx;
	}

	.btn-box {
		border-radius: 20rpx;
	}

	.color-333 {
		color: '#333';
		line-height: 45rpx;
	}

	.line-b {
		width: 100%;
		height: 1px;
		margin: 0 auto;
	}

	.orange {
		color: #F2B27F;
	}

	.bg-red {
		background: red;
	}

	.bg-green {
		background: green;
	}
</style>
