<template>
	<view class="width-full lh1 share-box flex flex-col">
		<!-- top -->
		<view class="width-full">
			<view class="width-full" :style="'height: ' + StatusBar + 'px;'"></view>
			<view class="width-full flex align-items-center">
				<view class="icon_font fs18 color-white fw600 pt15 pl15 pr15 pb15" @click="goBack">
					&#xe638;
				</view>
			</view>
			<view class="ml35 mr35 mt10">
				<image src="../../static/share/share_1.png" class="width-full" mode="widthFix"></image>
			</view>
		</view>
		<!-- top -->
		<!-- cent -->
		<view class="width-full flex-1 flex flex-col align-items-center flex-center">
			<view class="fs14 color-white text-center lh18 mb25">
				邀请一位男性使用会员券开通VIP，获会员券的佣金<br />
				邀请一位男性注册，并开通VIP，立得{{sharePre}}的充值奖励<br />
				邀请一位女性注册，并真人认证，立得{{inviteMoney}}元佣金
			</view>
			<view class="share-cent-box relative">
				<image src="../../static/share/share_2.png" class="share-cent-box" mode="scaleToFill"></image>
				<view class="absolute top25 left right flex align-items-center flex-center">
					<view class="qrimg">
						<tki-qrcode ref="qrcode" cid="1" :val="shareUrl" :size="275" :onval="true" :loadMake="true"
							background="#ffffff" foreground="#333333" pdground="#333333" />
					</view>
				</view>
				<view class="absolute bottom left right text-center pb30 fs15 color-white">
					已成功邀请 {{shareNum}} 位好友
				</view>
				<view class="absolute bottom8 left right text-center fs15 color-white" v-if="isReal">
					邀请码:{{idCode}}
				</view>
			</view>
		</view>
		<!-- cent -->
		<!-- bottom -->
		<view class="width-full pb_iphoneX_safe">
			<view class="width-full pb25 mb25">
				<view class="width-full flex align-items-center">
					<view class="flex-1 flex flex-col align-items-center flex-center" @click="shareWx(0,'是我啊APP','http://share.shiwoaapp.com/#/','告诉你一个APP，我下了，真实又靠谱，秘密使用。我的邀请码：' + user.invite_code,userAvatar)">
						<view class="share-bottom-img flex align-items-center flex-center">
							<view class="icon_font color-wx fs20">
								&#xe648;
							</view>
						</view>
						<view class="fs15 color-white fw600 mt15">
							微信邀请
						</view>
					</view>
					<view class="flex-1 flex flex-col align-items-center flex-center" @click="saveShareImg">
						<view class="share-bottom-img flex align-items-center flex-center">
							<view class="icon_font color-tp fs20">
								&#xe64b;
							</view>
						</view>
						<view class="fs15 color-white fw600 mt15">
							图片分享
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- bottom -->
		<u-toast ref="uToast" />
		<view v-if="showRedPacket">
			<red-packet></red-packet>
		</view>
	</view>
</template>

<script>
	import CommonService from '../../common/service/common-service.js'
	import tkiQrcode from '../../components/tki-qrcode/tki-qrcode.vue'
	export default {
		data() {
			return {
				sharePre: '',
				shareUrl: '',
				shareNum: 0,
				idCode: 0,
				inviteMoney: 0,
				userAvatar:null
			}
		},
		onLoad(options) {
			this.init()
		},
		components: {
			tkiQrcode
		},
		computed: {
			isReal() {
				if (this.user && this.user.gender === 0) {
					if (this.user.certify && JSON.parse(this.user.certify).real && JSON.parse(this.user.certify).real
						.verified) {
						return true
					} else {
						return false
					}
				} else {
					return true
				}
			},
		},
		methods: {
			init() {
				Object.assign(this.$data, this.$options.data())
				this.userAvatar = this.user.avatar ? this.user.avatar : null
				this.getShareData()
			},
			getShareData() {
				CommonService.invitedata().then(res => {
					if (res.code === 1) {
						this.sharePre = res.data.percentage
						this.shareUrl = res.data.url
						this.idCode = res.data.invite_code
						this.inviteMoney = res.data.h2
					}
				})
				CommonService.invitenum().then(res => {
					if (res.code === 1) {
						console.log(res)
						if (res.code === 1) {
							this.shareNum = res.data.num
						}
					}
				})
			},
			goBack() {
				this.toJumpPage(4, '/pages/my/index')
			},
			// 保存图片到本地
			// saveShareImg() {
			// 	uni.downloadFile({
			// 		url: 'http://client.shiwoaapp.com/api/common/share_image?invite_code=' + this
			// 			.idCode, //仅为示例，并非真实的资源
			// 		success: (res) => {
			// 			if (res.statusCode === 200) {
			// 				console.log(res.tempFilePath)
			// 				uni.saveImageToPhotosAlbum({
			// 					filePath: res.tempFilePath,
			// 					success: (arr) => {
			// 						console.log(arr)
			// 						this.$refs.uToast.show({
			// 							title: '已保存图片至本地相册'
			// 						})
			// 					}
			// 				})
			// 			}
			// 		}
			// 	})
			// },
			saveShareImg() {
				// 创建下载任务
				const picurl = 'http://client.shiwoaapp.com/api/common/share_image?invite_code=' + this
					.idCode
				let that = this
				//图片保存到手机后的路径
				let picname = "_downloads/share.png";
				var dtask = plus.downloader.createDownload(
					picurl, {
						filename: picname,
					},
					function(d, status) {
						// 下载完成
						if (status == 200) {
							plus.gallery.save(
								d.filename, //这个很关键记得要填d 返回的名字
								function() {
									//保存到相册方法
									that.$refs.uToast.show({
										title: '已保存图片至本地相册'
									})
								},
								function(e) {
									that.$refs.uToast.show({
										title: '保存失败，请重试！'
									})
								}
							);
						}
					}
				);
				dtask.start(); //开始下载
			}
		}
	}
</script>

<style lang="scss" scoped>
	.share-box {
		height: 100vh;
		background: linear-gradient(41deg, #222222 1%, #333333 49%, #111111 100%);
	}

	.share-bottom-img {
		width: 96rpx;
		height: 96rpx;
		background: #FFFFFF;
		border-radius: 96rpx;
	}

	.color-wx {
		color: #50BF1F;
	}

	.color-tp {
		color: #FFC11C;
	}

	.share-cent-box {
		width: 473rpx;
		height: 540rpx;
	}
</style>
