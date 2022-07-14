var lyBDFaceAuth
var imgIndex
var licenseID
import store from '../../store/index.js'


function getAry (num) {
	let aryList = ["Eye", "Mouth", "HeadLeft", "HeadRight", "HeadLeftOrRight"]
	let arrData = []
	for (let i = 0; i < num; i++) {
		let ran = Math.floor(Math.random() * aryList.length)
		arrData.push(aryList.splice(ran, 1)[0])
	}
	return arrData
}

function faceFind () {
	store.commit('HIDE_TYPE', 'face')
	let that = this
	return new Promise((resolve, reject) => {
		// let actionAry = getAry(3)
		let actionAry = ["Eye"]
		//引用插件
		lyBDFaceAuth = uni.requireNativePlugin('longyoung-BDFaceAuth')
		imgIndex = 0
		if (uni.getSystemInfoSync().platform == "ios") {
			licenseID = 'itsme123-face-ios'
		} else if (uni.getSystemInfoSync().platform == "android") {
			licenseID = 'itsme123-face-android'
		}
		lyBDFaceAuth.scanFace({
			licenseID:licenseID,//必须与百度授权资料一致，注意安卓和 iOS 不一样。
			actionAry:actionAry,//不传无动作
			isLivenessRandom:1,//不传默认有序，0有序，1随机
			isSound:1,//不传默认有声音，0无声，1有声
			frontBack: 0, //不传默认前置，0前置，1后置
			txtColor:"#f2b27f",//文字颜色
			bgColor:"#fafafa", //背景颜色，iOS设置无效，需要换图片facecover_new.png，路径 nativeplugins\longyoung-BDFaceAuth-iOS\ios\com.baidu.idl.face.faceSDK.bundle，具体看示例。
			roundColor:"#f2b27f"//圆的颜色
		}, res => {
			store.commit('HIDE_TYPE', '')
			if (res.status === 1) {
				resolve(res.bestImgBase64)
			} else {
				reject()
			}
		})
	})
}

export { faceFind }