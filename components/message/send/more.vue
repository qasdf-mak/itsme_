<template>
	<view class="width-full lh1">
		<view class="width-full bg-white flex align-items-center flex-wrap border-box more-box">
			<view v-for="(item,index) in moreList" :key="index">
				<view class="more-item br5 bg-main flex align-items-center flex-col flex-center" @click="clickItem(item.type)">
					<view class="icon_font more-icon fs20" v-html="item.icon"></view>
					<view class="fs12 color-deep mt10">
						{{item.title}}
					</view>
				</view>
			</view>
		</view>
		<!-- 发照片视频 -->
		<view v-if="showMediaSheet">
			<send-media :friend="friend" :type="mediaType" @sendSuccess="sendSuccess" @closeMediaSheet="showMediaSheet = false"></send-media>
		</view>
	</view>
</template>

<script>
	import sendMedia from './media.vue'
	export default {
		name: 'send-more',
		props: {
			friend: Object
		},
		data() {
			return {
				mediaType: '', // 媒体类型
				showMediaSheet: false, // 照片、视频
				moreList: [
					{
						title: '照片',
						icon: '&#xe61d;',
						type: 'photo'
					},
					{
						title: '视频',
						icon: '&#xe7f4;',
						type: 'video'
					},
					{
						title: '礼物',
						icon: '&#xe636;',
						type: 'photo'
					},
					{
						title: '邀请',
						icon: '&#xe618;',
						type: 'photo'
					},
					{
						title: '邀请',
						icon: '&#xe618;',
						type: 'photo'
					},
					{
						title: '表情',
						icon: '&#xe708;',
						type: 'photo'
					}
				]
			}
		},
		components: {
			sendMedia
		},
		methods: {
			// 发送消息成功后显示最新数据
			sendSuccess(res) {
				this.$emit('sendSuccess', res)
			},
			clickItem(type) {
				if (type === 'photo') {
					this.mediaType = 'photo'
					this.showMediaSheet = true
				}
				if (type === 'video') {
					this.mediaType = 'video'
					this.showMediaSheet = true
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.more-box{
		padding-left: 54rpx;
	}
	.more-item{
		width: calc((100vw - 270rpx) / 4);
		height: 140rpx;
		margin-right: 54rpx;
		margin-bottom: 54rpx;
	}
	.more-icon{
		color: #969696;
	}
</style>
