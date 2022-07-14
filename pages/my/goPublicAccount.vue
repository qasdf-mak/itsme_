<template>
	<view class="width-full">
		<view class="height-91"> </view>
		<view class="width-full text-center fs15 color-white">
			步骤一：使用微信扫描公众号二维码关注进行验证
		</view>
		<view class="width-full flex flex-center mt25">
			<view class="qr_code_box flex flex-center align-items-center">
				<view class="qr_code">
					<image src="/static/itsme/itsme_63.jpg" mode="widthFix" class="qr_code"></image>
				</view>
			</view>
		</view>
		<view class="width-full mt15 text-center fs18 fs600 color-white">
			《是我啊APP》公众号  <text class="icon_font fs14 ml8" @click="copy(1)">&#xe66b;</text>
		</view>
		<view class="width-full text-center fs15 mt10 color-white flex flex-center" v-if="show">
			<view class=" flex flex-right color-white flex-1 mt12 mr10 fs12">
				在
			</view>
			<view class="">
				<u-count-down :timestamp="STime" bg-color="#1A1A1F" color="#fff" font-size="60" @end="end"
					separator-color="#fff" :show-hours="false" separator-size="60"></u-count-down>
			</view>
			<view class="flex flex-left fs12 color-white flex-1 mt12 ml10">
				后到期
			</view>
		</view>
		<view class="height-158" v-else> </view>
		<view class="width-full text-center fs15 color-white" :class="show ? 'mt35':''">
			步骤二：公众号内发送APP帐号：		
		</view>	
			<view class="width-full text-center mt20 fs15 fw600 color-itsme-2">
				{{user.username}}    <text class="icon_font fs14 ml8 color-white fw400" @click="copy(2)">&#xe66b;</text>
			</view>
		<view class="width-full text-center mt20 fs15 fw600 color-itsme-2">
			审核结果会在公众号中告知
		</view>
		<view class="height-91"> </view>
		<view class="flex flex-between text-center ml25 mr25 mb10">
			<view class="wx-btn bg-white color-itsme-2 fs18 fw600" @click="saveShareImg">
				下载二维码
			</view>
			<view class="wx-btn bg-itsme-2 color-white fs18 fw600" @click="verificationWx">
				验证微信
			</view>
		</view>
		<u-toast ref="uToast" />
		<view >
			<red-packet></red-packet>
		</view>
	</view>
</template>

<script>
	import UserService from '../../common/service/user-service.js'
	//复制
	import uniCopy from '../../js_sdk/xb-copy/uni-copy.js'
	export default {
		data() {
			return {
				data: '',
				show: true,
				STime: 600,
			}
		},
		onLoad(options) {
			let newTime = Date.parse(new Date()) + ''
			let newtime1 = newTime.substring(0, newTime.length - 3)
			console.log(this.STime)
			this.STime = (parseInt(options.cTime) + 600) - parseInt(newtime1)
			console.log((parseInt(options.cTime) + 600) - parseInt(newtime1))
			console.log(this.STime)
		},
		methods: {
			// 验证微信
			verificationWx() {
				UserService.checkWxNum().then(res => {
					if (res.code === 1) {
						if (res.data.status === 1) {
							this.$refs.uToast.show({
								title: '验证成功',
							})
							setTimeout(() => {
								this.goBack()
							}, 1500)
						} else {
							this.$refs.uToast.show({
								title: '验证失败',
							})
						}
					}
				})
			},
			end(){
				this.show = false
			},
			//复制微信
			copy(type) {
				uniCopy({
					content: type === 1 ? '是我啊APP' : this.user.username,
					success: (res) => {
						uni.showToast({
							title: '复制成功',
							icon: 'none'
						})
						this.closeWxPop()
					},
					error: (e) => {
						uni.showToast({
							title: e,
							icon: 'none',
							duration: 3000,
						})
					}
				})
			},
			// 保存图片
			saveShareImg() {
				// 创建下载任务
				const picurl =
					'https://itsme-client.oss-cn-beijing.aliyuncs.com/uploads/20210714/2573a7d16dfb463bb559fb8f5787cd3c.jpg'
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
	.height-91 {
		height: 91rpx;
	}

	.height-158 {
		height: 158rpx;
	}

	.qr_code_box {
		width: 458rpx;
		height: 458rpx;
		background: #FFFFFF;
		border-radius: 10rpx;
	}

	.qr_code {
		width: 458rpx;
		height: 458rpx;
		border-radius: 10rpx;
	}

	.wx-btn {
		width: 280rpx;
		height: 80rpx;
		line-height: 80rpx;
		border-radius: 40rpx;
	}
</style>
