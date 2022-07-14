import CommonService from '../service/common-service.js'

function uploadImg(imgList) {
	return new Promise((resolve, reject) => {
		let imgUrl = []
		// 第一步初始化上传接口
		CommonService.uploadinit().then(init => {
			
			if (init.code === 1) {
				let uploadInit = init.data
				// for 循环上传图片到oss
				for (var i = 0; i < imgList.length; i++) {
					let imgData = imgList[i]
					// 临时路径转md5
					uni.getFileInfo({
						filePath: imgData,
						success:(res) => {
							let tiemr = new Date();
							let address = tiemr.getFullYear() + '' + (tiemr.getMonth() + 1) + '' + tiemr.getDate();
							address = 'itsme/images/' + address + '/';
							let str = imgData.substr(imgData.lastIndexOf('.'));
							let nameStr = address + tiemr.getTime() + str;
							// 第二步获取oss信息
							CommonService.addonsimg({
								md5: res.digest,
								name: nameStr,
								type: 'image/png',
								size: res.size,
								chunk: 0,
								chunksize: uploadInit.chunksize,
								aliosstoken: uploadInit.multipart.aliosstoken
							}).then(arr => {
								// 上传(第三步) - oss文件上传
								console.log(uploadInit.cdnurl)
								uni.uploadFile({
									url: uploadInit.cdnurl, //仅为示例，非真实的接口地址
									filePath: imgData,
									name: 'file',
									formData: {
											'aliosstoken': uploadInit.multipart.aliosstoken,
											'id': arr.data.id,
											'key': arr.data.key,
											'policy': arr.data.policy,
											'signature': arr.data.signature,
											'expire': arr.data.expire,
											'callback': '',
											'OSSAccessKeyId': arr.data.OSSAccessKeyId,
											'success_action_status': arr.data.success_action_status
									},
									success: (uploadFileRes) => {
										if (uploadFileRes.statusCode === 200) {
											CommonService.notifyimg({
												name: nameStr,
												url: arr.data.key,
												md5: res.digest,
												size: res.size,
												type: 'image/png',
												aliosstoken: uploadInit.multipart.aliosstoken
											}).then(img => {
												if (img.code === 1) {
													if (arr.data.key.indexOf('uploads') === 0) {
														imgUrl.push('/' + arr.data.key)
													} else {
														imgUrl.push(arr.data.key)
													}
													if (imgUrl.length === imgList.length) {
														resolve(imgUrl)
													}
												}
											})
										}
									}
								});
							})
						},
						fail: (err) => {
							console.log('err')
							console.log(err)
							console.log('err')
						}
					})
				}
			} else {
				reject(init.msg)
			}
		})
	})
}

export default uploadImg
