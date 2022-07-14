<template>
	<view class="width-full lh1 minnavh100vh bg-itsme-1 pl15 pr15 pb35">
		<view class="width-full">
			<view v-for="(set,sindex) in setList" :key="sindex">
				<view class="width-full">
					<view v-for="(item,index) in set" :key="index">
						<view
							class="width-full pl15 pr15 border-box flex align-items-center flex-between set-item b-b-10 line-itsme-8"
							@click="toNavigateTo(item.url,item.type,item.delete)">
							<view class="fs15 color-white fw600">
								{{item.title}}
							</view>
							<view class="flex">
								<view
									v-if="item.delete === 'realname' || item.delete === 'broker' || item.delete === 'shareCode' || item.delete === 'version'">
									<view class="fs15 mr10 color-shallow" v-if="item.delete === 'realname'">
										{{realnameText}}
									</view>
									<view class="fs15 mr10 color-shallow" v-if="item.delete === 'broker'">
										<view class="" v-if="agentAudit === 1">
											<navigator :url="agentUrl+ user.token">
												{{agentAuditText}}
											</navigator>
										</view>
										<view class="" v-else>
											{{agentAuditText}}
										</view>
									</view>
									<view class="fs15 mr10 color-shallow" v-if="item.delete === 'shareCode'">
										{{user.invite_code}}
									</view>
									<view class="fs15 mr10 color-shallow" v-if="item.delete === 'version'">
										{{version}}
									</view>
								</view>
								<view class="icon_font fs20 color-shallow" v-else>
									&#xe60f;
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="width-full pt10 bg-itsme-1"></view>
			</view>
		</view>
		<view class="width-btn mt35 pt35 flex flex-center">
			<view class="set-btn text-center fs18" @click="loginOut">
				退出登录
			</view>
		</view>
		<!-- 权限弹窗 -->
		<unify-pop :showUnify="showUnifyPop" :type="unifyType" @closePop="showUnifyPop = false" @realWrite="realWrite"
			@clonePop="copycentent('wx')" @popConfirmReal="toRealname('agent')">
		</unify-pop>
		<!-- 权限弹窗 -->
		<view v-if="showRedPacket">
			<red-packet></red-packet>
		</view>
		<!-- 完善资料 -->
		<view class="width-full" v-if="showPerfectPop">
			<perfect-pop @refreshTheList="refreshTheList" @closePerfectPop="toHidePerfectPop">
			</perfect-pop>
		</view>
		<!-- 完善资料 -->
	</view>
</template>

<script>
	import {
		mapGetters,
		mapActions
	} from 'vuex'
	import loginOut from '../../common/mixins/login.js'
	import uniCopy from '../../js_sdk/xb-copy/uni-copy.js'
	import UserService from '../../common/service/user-service.js'
	import commonService from '../../common/service/common-service.js'
	export default {
		mixins: [loginOut],
		data() {
			return {
				fileSizeString: '',
				agentAuditText: '',
				agentAudit: '',
				realnameText: '',
				isrealname: false,
				realname: '',
				isAgentAudit: false,
				agentUrl: '/pages/agent/agent?url=http://agent.shiwoaapp.com/#/pages/login/index/?token=',
				isAgentAuditType: -1,
				setList: [
					[
						// {
						// 	title: '新消息通知',
						// 	type: 'url',
						// 	url: ''
						// },
						{
							title: '手机号码(仅自己可见)',
							type: 'button3',
							url: 'console.log(111)'
						},
						{
							title: '黑名单',
							type: 'url',
							url: '/pages/my/black'
						},
						{
							title: '实名认证',
							type: 'url',
							url: '/pages/my/realname',
							delete: 'realname'
						},
						// {
						// 	title: '我的身价值',
						// 	type: 'url',
						// 	url: '/pages/my/worthlist',
						// },

						{
							title: '修改密码',
							type: 'url',
							url: '/pages/login/forgetpwd'
						}
					],
					[{
							title: '清理缓存',
							type: 'button1',
							url: 'console.log(111)'
						},
						{
							title: '注销账号',
							type: 'button2',
							url: 'console.log(111)'
						}
					],
					[{
							title: '用户协议',
							type: 'url',
							url: '/pages/my/userAgreement'
						},
						{
							title: '隐私协议',
							type: 'url',
							url: '/pages/my/privacyagreement'
						},
						{
							title: '联系客服',
							type: 'button4',
							url: '123',
						},
						{
							title: '申请经纪人',
							type: 'agent',
							url: '/pages/my/Applyforabroker',
							delete: 'broker'
						},
						{
							title: '我的邀请码',
							type: 'url',
							url: '123',
							delete: 'shareCode'
						},

						{
							title: '当前版本号',
							type: 'url',
							url: '123',
							delete: 'version'
						}
					]
				]
			}
		},
		onLoad() {
			this.init()
		},
		computed: {
			isReal() {
				if (this.user && this.user.gender === 0) {
					if (this.user.is_real === 1) {
						return true
					} else {
						return false
					}
				} else {
					return true
				}
			},
		},
		onShow() {
			if (this.IfTheRefresh) {
				this.getAgentAudit()
				this.getUserInfo()
			}
		},
		methods: {
			...mapGetters(['IfTheRefresh']),
			init() {
				Object.assign(this.$data, this.$options.data())
				this.getAgentAudit()
				this.getUserInfo()
			},
			toRealname(type) {
				this.showUnifyPop = false
				uni.navigateTo({
					url: "/pages/my/realname?type=" + type
				})
			},
			getAgentAudit() {
				commonService.agentAudit({}).then(res => {
					console.log(res)
					if (res.code === 1) {
						this.agentAuditText = res.data.msg
						this.agentAudit = res.data.audit
						if (res.data.audit === 1) {
							this.isAgentAudit = true
						}
						if (res.data.audit === 0) {
							this.isAgentAudit = true
							this.isAgentAuditType = 1
						}
					}
				})
			},
			getAgentDetails() {
				commonService.agentDetails({}).then(res => {
					let item = {}
					item.addressId = res.data.city_id
					item.address = res.data.city_name
					item.platform = res.data.is_order_platform
					item.platformName = res.data.order_platform_name
					item.industries = res.data.is_related_industries
					item.mobile = res.data.mobile
					item.partnerId = res.data.partner_mobile === null ? '': res.data.partner_mobile
					item.partnerPhone = res.data.partner_mobile === null ? '': res.data.partner_mobile
					item.realname = res.data.realname
					item.resourceType = res.data.resource_type
					uni.navigateTo({
						url: '/pages/my/Applyforabroker?item=' + JSON.stringify(item)
					})
				})
			},
			// 获取身份证信息
			getUserInfo() {
				UserService.userrealget().then(res => {
					console.log(res)
					if (res.code === 0) {
						if (res.data === null) {
							this.realnameText = "未认证"
						}
					} else {
						this.realnameText = "已认证"
						this.isrealname = true
						this.realname = res.data.name
					}
				})
			},
			toNavigateTo(url, type, deleteType) {
				if (type === 'url') {
					if (deleteType) {
						if (deleteType === "realname") {
							if (this.isReal) {
								if (this.isrealname === false) {
									uni.navigateTo({
										url
									})
								} else {
									uni.showToast({
										icon: 'none',
										title: '您已经实名认证过了',
										duration: 2000
									});
								}
							} else {
								this.toShowPerfectPop()
							}
						}
					} else {
						uni.navigateTo({
							url
						})
					}

				}
				if (type === 'button1') {
					this.formatSize()
				}
				if (type === 'button2') {
					this.unifyType = 27
					this.showUnifyPop = true
				}
				if (type === 'button3') {
					this.unifyType = 28
					this.showUnifyPop = true
				}
				if (type === 'button4') {
					this.unifyType = 18
					this.showUnifyPop = true
				}
				if (type === 'agent') {
					if (deleteType === "broker") {
						if (this.isAgentAudit === false) {
							uni.navigateTo({
								url: '/pages/my/Applyforabroker?name=' + this.realname
							})
						} else {
							if (this.isAgentAuditType === 1) {
								this.getAgentDetails()
								
							}
						}
					}
				}
			},
			// 复制ID号
			copycentent(type) {
				uniCopy({
					content: type === 'id' ? this.user.invite_code : 'saaw1221',
					success: (res) => {
						uni.showToast({
							title: '复制成功',
							icon: 'none'
						})
						this.showUnifyPop = false
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
			// 计算字节
			formatSize() {
				plus.cache.calculate(size => {
					let sizeCache = parseInt(size);
					if (sizeCache == 0) {
						uni.showToast({
							icon: 'none',
							title: '手机已经很干净了',
							duration: 2000
						});
						this.fileSizeString = "0B";
					} else if (sizeCache < 1024) {
						this.fileSizeString = sizeCache + "B";
					} else if (sizeCache < 1048576) {
						this.fileSizeString = (sizeCache / 1024).toFixed(2) + "KB";
					} else if (sizeCache < 1073741824) {
						this.fileSizeString = (sizeCache / 1048576).toFixed(2) + "MB";
					} else {
						this.fileSizeString = (sizeCache / 1073741824).toFixed(2) + "GB";
					}
					this.clearCache()
				});
			},
			clearCache() {
				let that = this;
				let os = plus.os.name;
				if (os == 'Android') {
					let main = plus.android.runtimeMainActivity();
					let sdRoot = main.getCacheDir();
					let files = plus.android.invoke(sdRoot, "listFiles");
					let len = files.length;
					for (let i = 0; i < len; i++) {
						let filePath = '' + files[i]; // 没有找到合适的方法获取路径，这样写可以转成文件路径  
						plus.io.resolveLocalFileSystemURL(filePath, function(entry) {
							console.log(entry)
							if (entry.isDirectory) {
								entry.removeRecursively(function(entry) { //递归删除其下的所有文件及子目录  
									console.log(123)
									uni.showToast({
										icon: 'none',
										title: '清理了' + that.fileSizeString + '缓存',
										duration: 2000
									});
								}, function(e) {
									console.log(e.message)
									console.log(666)
								});
							} else {
								entry.remove();
							}
						}, function(e) {
							console.log('文件路径读取失败')
						});
					}
				} else { // ios  
					plus.cache.clear(function() {
						uni.showToast({
							icon: 'none',
							title: '缓存清理完成',
							duration: 2000
						});
					});
				}
			},
			//确认注销
			realWrite() {
				this.showUnifyPop = false
				this.writeOff()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.set-item {
		height: 98rpx;
		line-height: 98rpx;
	}

	.set-btn {
		width: 400rpx;
		height: 80rpx;
		line-height: 80rpx;
		border-radius: 80rpx;
		background: #23232D;
	}

	.b-b-10 {
		border-bottom: 4rpx solid #23232D;
	}

	.width-btn {
		width: calc(100vw - 40rpx);
	}
</style>
