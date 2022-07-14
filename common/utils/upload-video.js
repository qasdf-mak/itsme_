import CommonService from '../service/common-service.js'

function uploadVideo(video) {
	return new Promise((resolve, reject) => {
		// 第一步初始化上传接口
		CommonService.uploadinit().then(init => {
			if (init.code === 1) {
				let uploadInit = init.data
				// 临时路径转md5
				uni.getFileInfo({
					filePath: video,
					success(res) {
						let tiemr = new Date();
						let address = tiemr.getFullYear() + '' + (tiemr.getMonth() + 1) + '' + tiemr.getDate();
						address = 'itsme/video/' + address + '/';
						let str = video.substr(video.lastIndexOf('.'));
						let nameStr = address + tiemr.getTime() + str;
						// 第二步获取oss信息
						CommonService.addonsimg({
							md5: res.digest,
							name: nameStr,
							type: 'video',
							size: res.size,
							chunk: 0,
							chunksize: uploadInit.chunksize,
							aliosstoken: uploadInit.multipart.aliosstoken
						}).then(arr => {
							console.log('11111')
							console.log(arr)
							console.log(video)
							console.log('11111')
							// 上传(第三步) - oss文件上传
							uni.uploadFile({
								url: uploadInit.cdnurl, //仅为示例，非真实的接口地址
								filePath: video,
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
											type: 'video',
											aliosstoken: uploadInit.multipart.aliosstoken
										}).then(img => {
											console.log('33333')
											console.log(img)
											console.log('33333')
											if (img.code === 1) {
												resolve(arr.data.key)
											}
										})
									}
								}
							})
						})
					}
				})
			} else {
				reject(init.msg)
			}
		})
	})
}

export default uploadVideo
