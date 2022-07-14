// 照片视频选择封装
import store from '../../store/index.js'
// 照片
function changePhoto() {
	return new Promise((resolve, reject) => {
		store.commit('HIDE_TYPE', 'media')
		
	})
}

/* 视频
 * type
 * type === 0(camera 使用相机拍摄)
 * type === 1(album 从相册选视频)
 * type === 2(album,camera)
 */
function changeVideo(type) {
	return new Promise((resolve, reject) => {
		store.commit('HIDE_TYPE', 'media')
		let sourceType = []
		if (type === 0) {
			sourceType = ['camera']
		}
		if (type === 1) {
			sourceType = ['album']
		}
		if (type === 2) {
			sourceType = ['camera', 'album']
		}
		uni.chooseVideo({
			count: 1,
			sourceType: sourceType,
			maxDuration: 10,
			success: (res) => {
				uni.hideLoading()
				resolve(res.tempFilePath)
			},
			error: (err) => {
				uni.hideLoading()
				resolve(err)
			}
		})
	})
}

export {
	changePhoto,
	changeVideo
}
