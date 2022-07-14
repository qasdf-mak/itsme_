/* 
*** @type
					//IDCardFront 身份证正面识别、IDCardBack 身份证反面识别、bankCard 银行卡识别、passport 护照识别。
					//105通用文字识别（含位置信息版）、106通用文字识别、107通用文字识别(高精度版)、108通用文字识别（含位置信息高精度版）、109通用文字识别（含生僻字版）
					//110网络图片识别、120行驶证识别、121驾驶证识别、122车牌识别、123营业执照识别、124通用票据识别、126数字识别、127二维码识别
					//128名片识别、129手写文字识别、130彩票识别、131增值税发票识别、132自定义模板 
*** @accuracy //支持这三个字符串：auto、normal、high，精准度，精度越高，速度越慢。default：auto
*** @detectDirection //是否检测图像朝向，0不检测，1检测
*** @isAutoTakePhoto //仅身份证有效，是否自动拍照，0手动，1自动
 */
import store from '../../store/index.js'
var lyBDOCR = uni.requireNativePlugin('longyoung-BDOCR')

function recognitionApp (type, accuracy, detectDirection, isAutoTakePhoto) {
	store.commit('HIDE_TYPE', 'recognition')
	return new Promise((resolve, reject) => {
		lyBDOCR.startOCRLy({
			type, 
			accuracy, 
			detectDirection,
			isAutoTakePhoto
		}, result => {
			resolve(result)
		})
	})
}

export { recognitionApp }