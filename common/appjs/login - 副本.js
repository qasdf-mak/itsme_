var MNOModule = uni.requireNativePlugin("Esand-MNOModule")
let appcode = "31e7a26806504f66a38f6a2e59296616"
let secretKey = ""
let authUIConfigJson = ""
import store from '../../store/index.js'

function phoneLogin () {
	return new Promise((resolve, reject) => {
		store.commit('HIDE_TYPE', 'login')
		let platform = uni.getSystemInfoSync().platform
		if ( platform === 'ios' ) {
			let authUIConfig = {}
			// 导航条隐藏
			authUIConfig.navIsHidden = "true"
			// logo
			authUIConfig.logoImage = "logo"
			authUIConfig.logoTopOffetY = '100'
			authUIConfig.logoWidth = '84'
			authUIConfig.logoHeight = '78.5'
			// logo下文字隐藏
			authUIConfig.sloganText = ''
			// 手机号设置
			authUIConfig.numberFont = '30'
			authUIConfig.numberTopOffetY = '330'
			// 一键登录按键设置
			authUIConfig.loginBtnText = ""
			authUIConfig.loginBtnBgImgActivation = "btnimg_1.png"
			authUIConfig.loginBtnBgImgInvalid = "btnimg.png"
			authUIConfig.loginBtnBgImgHighlight = "btnimg_1.png"
			authUIConfig.loginBtnLRPadding = 40
			authUIConfig.loginBtnTopOffetY = '400'
			authUIConfig.changeBtnTitle = ''
			authUIConfig.changeBtnIsHidden = 'true'
			// 其他登录方式
			authUIConfig.container_icon_btn1 = "container_icon_btn1.png"
			authUIConfig.container_icon_btn2 = "container_icon_btn2.png"
			authUIConfig.iconLayoutOffSetY = '500'
			authUIConfig.logBtnTextColor = '0'
			authUIConfig.iconLayoutOffSetX  = '80'
			authUIConfig.iconWidth = '80'
			// 协议栏
			authUIConfig.checkBoxIsChecked = 'true'
			authUIConfig.uncheckedImg = 'check.png'
			authUIConfig.checkedImg = 'check_on.png'
			authUIConfig.privacyAlignment = "Center"
			authUIConfigJson = JSON.stringify(authUIConfig)
			secretKey = "Fw/qAMMrmxYGoagBK2j7saYEgJa9xuJ4qPSlarU+mrHUnRsB8aEh557t4iX8kmFdcndf3dOlAeR6ja8ywwbkinBv8JQwnGlFWinH5ZK754O9TN7i0AhNfyb45yPePJVcm/QJ1xRERkGTW2Dg66XTJ7Teo/UqsntlYyMTITwmuuNxFDLCDza3CIr8ffBXryDMJXXN/8aO55O6TeTCJIgQeu/+IyBg0pbgRjNx3pY7tgJU9g7G4Dft6TMnXHI8NDnL+DDOdcerPeU="
		} else if (platform === 'android' ) {
			let authUIConfig = {}
			authUIConfig.privacyState = true
			authUIConfig.switchAccHidden = true
			authUIConfig.navHidden = true
			authUIConfig.sloganText = "  "
			authUIConfig.logBtnText = "手机号码一键登录"
			authUIConfig.logoImgPath = "logo"
			authUIConfig.logoOffsetY = 100
			authUIConfig.logBtnWidth = 303.5
			authUIConfig.logBtnHeight = 51.5
			authUIConfig.logBtnBackgroundPath = "btnimg"
			authUIConfig.logoWidth = 84
			authUIConfig.logoHeight = 78.5
			authUIConfig.numberSize = 30
			authUIConfig.numFieldOffsetY = 330
			authUIConfig.logBtnOffsetY = 400
			authUIConfig.iconLayoutOffSetY = 580
			authUIConfig.logBtnTextColor = 0
			authUIConfig.iconLayoutWidth = 220
			authUIConfig.iconWidth = 80
			authUIConfigJson = JSON.stringify(authUIConfig)
			secretKey = "k4ouUSA9GRvfRaq/QiX6RLp8i7hjKB6wfIncw9qTHe/MR7r5HzlVSgPe+y8QsTjVg4W5CuZa92aYGJXv2JieTRcm0XggY/t5mRhN81yUVARE5N2M0cDeo6kYMfHHaWf+KdpIMc0unMix5CSsGOu2ZttfkYgl5PGwsdBd9d9HlV+my44xbflPmJikKcb8y0THmdNDcFvt0Fgmnhmh7w9eRc/uW/pKYraSQ00jRP6Aw48DN0taKGy2xRFdz84XWj80+uEjDMKqOvdnhRlWTt5xwztfxwcTE8al0A2IqNHG5yyp/L0B3aK3ZA=="
		}
		MNOModule.getPhoneNum({
			'secretKey': secretKey,
			'authUIConfigJson': authUIConfigJson
		}, (ret) => {
			console.log(ret)
			if (ret.code == '0') {
				let dataBody = ret.data
				let dataBodyJson = JSON.parse(dataBody)
				uni.request({
					url: 'http://edismno.market.alicloudapi.com/mno/getMobile',
					method: 'POST',
					data: {
						'deviceModel': dataBodyJson.deviceModel,
						'packageId':dataBodyJson.packageId,
						'platform':dataBodyJson.platform,
						'token':dataBodyJson.token,
						'transId':dataBodyJson.transId,
						'appName':dataBodyJson.appName,
						'phoneNum':dataBodyJson.phoneNum
					},
					header: {
						'Authorization': 'APPCODE ' + appcode,
						'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
					},
					success: (res) => {
						let phone = res.data.phoneNum
						resolve(phone)
					},
					fail: (err) => {
						reject()
					}
				})
			} else {
				reject()
			}
		})
	})
}

export { phoneLogin }