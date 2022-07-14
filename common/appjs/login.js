var MNOModule = uni.requireNativePlugin("Esand-MNOModule")
let appcode = "31e7a26806504f66a38f6a2e59296616"
let secretKey = ""
let authUIConfigJson = ""
import store from '../../store/index.js'

function phoneLogin() { 
	return new Promise((resolve, reject) => {
		store.commit('HIDE_TYPE', 'login')
		let platform = uni.getSystemInfoSync().platform
		if (platform === 'ios') {
			let authUIConfig = {}
			authUIConfig.navIsHidden = true
			authUIConfig.bgImage = 'static/itsme/black.png'
			authUIConfig.logoImage = 'static/itsme/its_27.png'
			authUIConfig.logoWidth = 90
			authUIConfig.logoHeight = 90
			authUIConfig.logoTopOffetY = 140
			authUIConfig.sloganIsHidden = false
			authUIConfig.checkBoxIsChecked = false
			authUIConfig.numberFont = 18
			authUIConfig.numberColor = '0xffffffff'
			authUIConfig.numberTopOffetY = 365 
			authUIConfig.loginBtnBgImgActivation = "static/itsme/itsme_login_btn.png"
			authUIConfig.loginBtnBgImgInvalid = "static/itsme/itsme_login_btn.png"
			authUIConfig.loginBtnBgImgHighlight = "static/itsme/itsme_login_btn.png"
			authUIConfig.loginBtnTopOffetY = 410
			authUIConfig.loginBtnHeight = 43
			authUIConfig.loginBtnLRPadding = 80
			authUIConfig.changeBtnTitle = '其他号码登录'
			authUIConfig.changeBtnTitleFont = 13
			authUIConfig.changeBtnTitleColor = '0xffffffff'
			authUIConfig.changeBtnTopOffetY = 475
			authUIConfig.privacyAlignment = "Center"
			authUIConfigJson = JSON.stringify(authUIConfig)
			secretKey =
				"Fw/qAMMrmxYGoagBK2j7saYEgJa9xuJ4qPSlarU+mrHUnRsB8aEh557t4iX8kmFdcndf3dOlAeR6ja8ywwbkinBv8JQwnGlFWinH5ZK754O9TN7i0AhNfyb45yPePJVcm/QJ1xRERkGTW2Dg66XTJ7Teo/UqsntlYyMTITwmuuNxFDLCDza3CIr8ffBXryDMJXXN/8aO55O6TeTCJIgQeu/+IyBg0pbgRjNx3pY7tgJU9g7G4Dft6TMnXHI8NDnL+DDOdcerPeU="
		} else if (platform === 'android') {
			let authUIConfig = {}
			authUIConfig.pageBackgroundPath = "black"
			authUIConfig.logoImgPath = "static/itsme/its_27.png"
			authUIConfig.navHidden = true
			authUIConfig.statusBarHidden = true
			authUIConfig.logoWidth = 90
			authUIConfig.logoHeight = 90
			authUIConfig.logoOffsetY = 140
			authUIConfig.sloganText = ''
			authUIConfig.sloganTextColor = '0xff1a1a1f'
			authUIConfig.sloganOffsetY = 250
			authUIConfig.numberColor = "0xffffffff"
			authUIConfig.numberSize = 20
			authUIConfig.numFieldOffsetY = 360
			authUIConfig.logBtnText = "本机一键登录"
			authUIConfig.logBtnTextColor = "0xffffffff"
			authUIConfig.logBtnTextSize = 18
			authUIConfig.logBtnBackgroundPath = "itsme_login_btn"
			authUIConfig.logBtnWidth = 220
			authUIConfig.logBtnHeight = 43
			authUIConfig.logBtnOffsetY = 420
			authUIConfig.switchAccText = "其他号码登录"
			authUIConfig.switchAccTextColor = "0xff9E9E9F"
			authUIConfig.switchAccTextSize = 14
			authUIConfig.switchOffsetY = 480
			authUIConfig.privacyState = false

			authUIConfigJson = JSON.stringify(authUIConfig)
			secretKey =
				"k4ouUSA9GRvfRaq/QiX6RLp8i7hjKB6wfIncw9qTHe/MR7r5HzlVSgPe+y8QsTjVg4W5CuZa92aYGJXv2JieTRcm0XggY/t5mRhN81yUVARE5N2M0cDeo6kYMfHHaWf+KdpIMc0unMix5CSsGOu2ZttfkYgl5PGwsdBd9d9HlV+my44xbflPmJikKcb8y0THmdNDcFvt0Fgmnhmh7w9eRc/uW/pKYraSQ00jRP6Aw48DN0taKGy2xRFdz84XWj80+uEjDMKqOvdnhRlWTt5xwztfxwcTE8al0A2IqNHG5yyp/L0B3aK3ZA=="
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
						'packageId': dataBodyJson.packageId,
						'platform': dataBodyJson.platform,
						'token': dataBodyJson.token,
						'transId': dataBodyJson.transId,
						'appName': dataBodyJson.appName,
						'phoneNum': dataBodyJson.phoneNum
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

export {
	phoneLogin
}
