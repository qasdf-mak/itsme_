<template>
	<view>
		<view class="width-full lh1">
			<view class="width-full pt15">
				<view v-if="type === 2" v-for="(item , index) in thumbUpList" :key="index">
					<system-like :item="item"></system-like>
				</view>
				<view v-if="type === 1" v-for="(item , index) in systemList" :key="index">
					<system-system :item="item" :btnType="btnType" @operation="operation"></system-system>
				</view>
			</view>
		</view>
		<u-toast ref="uToast" />
		<view v-if="showRedPacket">
			<red-packet></red-packet>
		</view>
	</view>
</template>

<script>
	import systemLike from '../../components/system/thumbUpForDetails.vue'
	import systemSystem from '../../components/system/detailsOnTheSystem.vue'
	import ChatService from '../../common/service/chat-service.js'
	import commonService from '../../common/service/common-service.js'
	export default {
		data() {
			return {
				type: 0,
				agentId: 0,
				thumbUpList: [],
				systemList: [],
				btnType: 0,
				btnState: true
			}
		},
		components: {
			systemLike,
			systemSystem
		},
		onPullDownRefresh() {
			this.getUserSystemPushDetail()
		},
		onLoad(options) {
			this.init(options)
		},
		methods: {
			init(options) {
				Object.assign(this.$data, this.$options.data())
				this.loginExpire().then(res => {
					if (res) {
						this.type = Number(options.type)
						this.getUserSystemPushDetail()
					}
				})
				uni.setNavigationBarTitle({
					title: Number(options.type) === 1 ? '系统' : '点赞'
				})
			},
			getUserSystemPushDetail() {
				ChatService.usersystempushdetail({
					type: this.type
				}).then(res => {
					if (res.code === 1) {
						uni.stopPullDownRefresh()
						if (this.type === 1) {
							this.systemList = res.data
						}
						if (this.type === 2) {
							this.thumbUpList = res.data
							console.log(this.thumbUpList)
						}
					}
				})
			},
			// 经纪人申请操作
			operation(index, id, mid) {
				if (index === 1) {
					this.btnType = 1
				} else {
					this.btnType = 2
				}
				commonService.agentOperation({
					agent_id: id,
					state: parseInt(index),
					id: mid
				}).then(res => {
					if (res.code === 1) {
						this.showInvitation = false
						this.$refs.uToast.show({
							title: res.msg,
						})
                        this.umbUpList = []
						this.systemList = []
						this.getUserSystemPushDetail()
					}
				})
			},
		}
	}
</script>

<style>

</style>
