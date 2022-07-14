<template>
	<view>

	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		onLoad() {
			this.init()
		},
		methods: {
			init() {
				Object.assign(this.$data, this.$options.data())
				this.phoneLogin()
			},
			phoneLogin() {
				let univerifyStyle = {
					"fullScreen": "true", // 是否全屏显示，默认值： "false"
					"backgroundColor": "#1A1A1F", // 授权页面背景颜色，默认值：#ffffff
					"icon": {
						"path": "static/itsme/itsme_login_logo.png" // 自定义显示在授权框中的logo，仅支持本地图片 默认显示App logo   
					},
					"phoneNum": {
						"color": "#FFFFFF" // 手机号文字颜色 默认值：#202020  
					},
					"slogan": {
						"color": "#1A1A1F" //  slogan 字体颜色 默认值：#BBBBBB  
					},
					"authButton": {
						"normalColor": "#d97db0", // 授权按钮正常状态背景颜色 默认值：#3479f5
						"highlightColor": "#bc6696", // 授权按钮按下状态背景颜色 默认值：#2861c5（仅ios支持）  
						"disabledColor": "#898585", // 授权按钮不可点击时背景颜色 默认值：#73aaf5（仅ios支持）  
						"textColor": "#ffffff", // 授权按钮文字颜色 默认值：#ffffff  
						"title": "本机号码一键登录", // 授权按钮文案 默认值：“本机号码一键登录”  
						"borderRadius": "24px" // 授权按钮圆角 默认值："24px" （按钮高度的一半）
					},
					"otherLoginButton": {
						"visible": "true", // 是否显示其他登录按钮，默认值：true  
						"textColor": "#9E9E9F", // 其他登录按钮文字颜色 默认值：#656565  
						"title": "其他号码登录" // 其他登录方式按钮文字 默认值：“其他登录方式”  
					},
					"privacyTerms": {
						"defaultCheckBoxState": "true", // 条款勾选框初始状态 默认值： true   
						"textColor": "#BBBBBB", // 文字颜色 默认值：#BBBBBB  
						"termsColor": "#5496E3", //  协议文字颜色 默认值： #5496E3  
						"prefix": "我已阅读并同意", // 条款前的文案 默认值：“我已阅读并同意”  
						"suffix": "并使用本机号码登录", // 条款后的文案 默认值：“并使用本机号码登录”  
						"privacyItems": [
							// 自定义协议条款，最大支持2个，需要同时设置url和title. 否则不生效  
							{
								"url": "https://", // 点击跳转的协议详情页面  
								"title": "用户服务协议" // 协议名称  
							}
						]
					}
				}
				uni.login({
					provider: 'univerify',
					univerifyStyle: univerifyStyle
				})
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>
