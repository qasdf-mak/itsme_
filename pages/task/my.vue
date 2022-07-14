<template>
<view class="width-full lh1 bg-main minnavh100vh">
	<view class="width-full">
		<u-sticky>
			<view class="width-full flex align-items-center bg-white">
				<view
				class="flex-1 top-nav-box fs14 text-center fw600"
				:class="tabCurrent === index ? 'active color-main6' : 'default color-bbbbbb'"
				v-for="(item,index) in tabList"
				:key="index"
				@click="changeTab(index)"
				>
					{{item.name}}
				</view>
			</view>
		</u-sticky>
		<view class="width-full pb30">
			<view class="width-full" v-if="tabCurrent === 0">
				<view v-for="(item,index) in releaseList" :key="index">
					<discover-invitationitem :item="item" type="release"></discover-invitationitem>
				</view>
				<view class="width-full pt15 pb15" v-if="releaseList && releaseList.length > 0 && releasePages.finish">
					<u-divider bg-color="">没有更多了</u-divider>
				</view>
				<view class="width-full" v-if="releaseList && releaseList.length === 0 && releasePages.finish">
					<empty-tip type="task"></empty-tip>
				</view>
			</view>
			<view class="width-full" v-if="tabCurrent === 1">
				<view v-for="(item,index) in acceptList" :key="index">
					<discover-invitationitem :item="item" type="accept"></discover-invitationitem>
				</view>
				<view class="width-full pt15 pb15" v-if="acceptList && acceptList.length > 0 && acceptPages.finish">
					<u-divider bg-color="">没有更多了</u-divider>
				</view>
				<view class="width-full" v-if="acceptList && acceptList.length === 0 && acceptPages.finish">
					<empty-tip type="task"></empty-tip>
				</view>
			</view>
		</view>
	</view>
	<view v-if="showRedPacket">
		<red-packet></red-packet>
	</view>
</view>
</template>

<script>
	import TaskService from '../../common/service/task-service.js'
	import taskItem from '../../components/task/item.vue'
	import discoverInvitationitem from '../../components/discover/invitationItem.vue'
	export default {
		data() {
			return {
				tabList: [
					{
						name: ' 已发布Me约'
					}, 
					{
						name: '已接受Me约'
					}
				],
				tabCurrent: 0,
				releaseList: [], // 已发布Me约
				acceptList: [], // 已接受Me约
				releasePages: {
					page: 1,
					size: 10,
					finish: true
				},
				acceptPages: {
					page: 1,
					size: 10,
					finish: true
				}
			}
		},
		components: {
			taskItem,
			discoverInvitationitem
		},
		onShow() {
			this.init()
		},
		methods: {
			init() {
				Object.assign(this.$data, this.$options.data())
				this.getReleaseList()
				this.getAcceptList()
			},
			// 已发布Me约
			getReleaseList() {
				TaskService.tasklistpublish({
					page: this.releasePages.page,
					limit: this.releasePages.size
				}).then(res => {
					this.releaseList = res.data
					console.log(this.releaseList)
				})
			},
			// 已接受Me约
			getAcceptList() {
				TaskService.tasklistaccept({
					page: this.releasePages.page,
					limit: this.releasePages.size
				}).then(res => {
					this.acceptList = res.data
					console.log(this.acceptList)
				})
			},
			// tab切换
			changeTab(index) {
				this.tabCurrent = index
			}
		}
	}
</script>

<style lang="scss" scoped>
	.top-nav-box{
		height: 96rpx;
		line-height: 95rpx;
	}
	.top-nav-box.active{
		border-bottom: 4rpx solid #D97DB0 ;
	}
	.top-nav-box.default{
		border-bottom: 4rpx solid #FFFFFF;
	}
</style>
