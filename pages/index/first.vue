<template>
	<view class="width-full lh1 height100vh bg-itsme-1">
		<!-- 底图 -->
		<view class="width-full height100vh flex flex-col align-items-center flex-between">
			<view class="first-img-1">
				<image src="../../static/itsme/its_27.png" class="width-full" mode="widthFix"></image>
			</view>
			<view class="first-img-2">
				<image src="../../static/itsme/its_28.png" class="width-full" mode="widthFix"></image>
			</view>
			<view class="first-img-3">
				<image src="../../static/itsme/its_29.png" class="width-full" mode="widthFix"></image>
			</view>
		</view>
		<!-- 底图 -->
		<!-- 倒计时 -->
		<view class="fixed top left right">
			<view class="width-full" :style="'height:' + StatusBar + 'px;'"></view>
			<view class="pt15 pr15 flex flex-right">
				<view class="time-box flex align-items-center flex-center">
					<view class="fs14 color-white" @click="startImgHide">
						跳过
					</view>
					<view class="fs14 color-white b-l-1 ml5 pl5 line-color-4">
						{{time}} S
					</view>
				</view>
			</view>
		</view>
		<!-- 倒计时 -->
		<!-- 用户协议 -->
		<u-mask :show="showProtocol">
			<view class="height flex align-items-center flex-center">
				<view class="protocol-box bg-white br8 pl20 pr20 pt30 pb20 border-box" @tap.stop>
					<view class="width-full fs18 color-itsme-1 fw600 text-center mb15">
						温馨提示
					</view>
					<view class="width-full lh15 fs12 color-itsme-1">
						<text>欢迎使用 是我啊App,在你使用 是我啊App前，请您认真阅读并了解</text>
						<text class="first-text" @click="toProtocol('protocol')">《用户协议》</text>
						<text>及</text>
						<text class="first-text" @click="toProtocol('policy')">《隐私政策》</text>
						<text>，并且年满18岁，点击同意即表示您已阅读并同意全部条款。</text>
					</view>
					<view class="ml25 mt20 mr25 fs14 color-white text-center pt10 pb10 bg-itsme-2 br40 btn-box"
						@click="hideProtocol">
						同意
					</view>
					<view class="ml35 mt10 mr35 text-center fs12 color-itsme-9" @click="quitApp">
						不同意并退出
					</view>
				</view>
			</view>
		</u-mask>
		<!-- 用户协议 -->
		<!--  -->
		<u-modal v-model="showUpdate" z-index="999999" :title="'发现新版本(' + versiondata.version +')'"
			:confirm-text="confirmText" @confirm="confirmUpdate" ref="uModal" async-close>
			<view class="slot-content">
				<view class="pt15 pl20 pr20 pb15 fs14 color-deep lh15">
					<rich-text :nodes="versiondata.content"></rich-text>
				</view>
			</view>
		</u-modal>
		<!--  -->
	</view>
</template>

<script>
	import {
		mapActions,
		mapGetters
	} from 'vuex'
	import {
		quitApp
	} from '../../common/appjs/system.js'
	export default {
		data() {
			return {
				time: 3 ,
				showUpdate: false,
				confirmText: '升级',
				showProtocol: false,
				versiondata: {
					content: '',
					url: '',
					version: ''
				},
			}
		},
		onLoad() {
			this.init()
		},
		computed: {
			...mapGetters(['token', 'user', 'version', 'commonInfo'])
		},
		methods: {
			...mapActions(['USER']),
			init() {
				Object.assign(this.$data, this.$options.data())
				if (this.token) {
					this.showProtocol = false
					this.isUpdateIng()
				} else {
					this.showProtocol = false
					this.isUpdateIng()
				}
			},
			// 同意协议
			hideProtocol() {
				this.showProtocol = false
				this.isUpdateIng()
			},
			// 去用户协议
			toProtocol(type) {
				if (type === 'protocol') {
					uni.navigateTo({
						url: '/pages/my/userAgreement'
					})
				} else {
					uni.navigateTo({
						url: '/pages/my/privacyagreement'
					})
				}
			},

			quitApp() {
				quitApp()
			},
			// 判断是否有更新
			isUpdateIng() {
				console.log(this.commonInfo)
				if (this.commonInfo) {
					let version = this.commonInfo.versiondata.version
					if (version > this.version) {
						this.versiondata.content = this.commonInfo.versiondata.content
						this.versiondata.version = this.commonInfo.versiondata.version
						this.versiondata.url = this.commonInfo.uploaddata.cdnurl + '/apps/com.itsme' + this
							.versiondata.version.split('.').join('_') + '.apk'
						this.showUpdate = true
					} else {
						this.setStartTime()
					}
				} else {
					setTimeout(() => {
						this.isUpdateIng()
					}, 500)
				}
			},
			confirmUpdate() {
				if (uni.getSystemInfoSync().platform === 'ios') {
					console.log(this.versiondata.url)
					this.$refs.uModal.clearLoading()
					plus.runtime.launchApplication({
						action: 'https://apps.apple.com/cn/app/itsme%E6%98%AF%E6%88%91/id1560441374'
					}, function(e) {
						console.log('Open system default browser failed: ' + e.message);
					});
					return false
				}
				this.$refs.uModal.clearLoading()
				this.confirmText = '下载中，请稍后...'
				const downloadTask = uni.downloadFile({
					url: this.versiondata.url, //仅为示例，并非真实的资源
					success: (ddd) => {
						if (ddd.statusCode === 200) {
							plus.runtime.openFile(ddd.tempFilePath)
							this.showUpdate = false
						}
					},
					fail: (err) => {
						this.showUpdate = false
					}
				})
				downloadTask.onProgressUpdate((res) => {
					this.confirmText = '已下载' + res.progress + '%，请稍后...'
				})
			},
			// 启动页倒计时
			setStartTime() {
				console.log('11111111111111')
				if (this.time > 1) {
					this.time--
					setTimeout(() => {
						this.setStartTime()
					}, 1000);
				} else {
					this.startImgHide()
				}
			},
			// 跳过启动动画
			startImgHide() {
				if (this.time < 3) {
					console.log(this.user)
					if (this.user) {
						if (this.user && this.user.nickname && (this.user.gender === 0 && this.user.is_real === 1) || this.user.gender === 1) {
							if (!this.user.profession) {
								console.log('3')
								uni.redirectTo({
									url: '/pages/itsme/fillInformation'
								})
							} else {
								uni.switchTab({
									url: '/pages/itsme/index'
								})
							}
						} else {
							console.log('2')
							uni.redirectTo({
								url: '/pages/login/sex'
							})
						}
					} else {
						console.log('4')
						uni.switchTab({
							url: '/pages/itsme/index'
						})
					}

				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.first-top-bg {
		width: 200%;
		left: -50%;
		background: linear-gradient(150deg, #F18AAE 0%, #F37E9A 100%);
		border-radius: 0 0 50% 50%;
	}

	.first-bot-box {
		height: 345rpx;
	}

	.logo-box {
		width: 190rpx;
	}

	.time-box {
		width: 160rpx;
		height: 44rpx;
		border-radius: 44rpx;
		background: #39394F;
	}

	.protocol-box {
		width: 65vw;
	}

	// 
	.first-img-1 {
		width: 110rpx;
		padding-top: 160rpx;
	}

	.first-img-2 {
		width: 590rpx;
	}

	.first-img-3 {
		width: 400rpx;
		padding-bottom: 160rpx;
	}

	.first-text {
		color: #2242CC;
	}
</style>
