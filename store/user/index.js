import { USER, COMMON_INFO, REGISTER_TYPE, ADDRESS, HIDE_TYPE, OPEN_PUSH, TASK_INFO, IOSPHONE } from '../constant'
export default {
  state: {
    [USER]: uni.getStorageSync('userInfo') || null,
    [REGISTER_TYPE]: uni.getStorageSync('registerType') || '', // 注册方式： 普通注册： password  手机一键注册; phone  微信授权注册： wechat
		[COMMON_INFO]: uni.getStorageSync('commonInfo') || null,
		[ADDRESS]: null ,// 用户位置
		[HIDE_TYPE]: '',
		[OPEN_PUSH]: uni.getStorageSync('openPush') || false, // 推送权限
		[TASK_INFO]: uni.getStorageSync('taskInfo') || null,
		[IOSPHONE]: ['15135138723']
  },
  getters: {
		iosPhone (state) {
		  return state[IOSPHONE]
		},
    user (state) {
      return state[USER]
    },
		taskInfo (state) {
		  return state[TASK_INFO]
		},
    token (state) {
			let userinfo = state[USER]
			if (userinfo && userinfo.token) {
				return userinfo.token
			} else {
				return ''
			}
    },
		openPush (state) {
		  return state[OPEN_PUSH]
		},
		address (state) {
		  return state[ADDRESS]
		},
		hideType (state) {
		  return state[HIDE_TYPE]
		},
		registerType (state) {
		  return state[REGISTER_TYPE]
		},
		commonInfo (state) {
		  return state[COMMON_INFO]
		}
  },
  mutations: {
    [TASK_INFO] (state, taskInfo) {
			return new Promise((resolve, reject) => {
			  uni.setStorage({
			    key: 'taskInfo',
			    data: taskInfo,
			    success () {
			      state[TASK_INFO] = taskInfo
			      resolve()
			    },
			    fail (e) {
			      reject(e)
			      console.error(new Error('存储taskInfo失败！'))
			    }
			  })
			})
    },
		[HIDE_TYPE] (state, hideType) {
		  state[HIDE_TYPE] = hideType
		},
		[ADDRESS] (state, address) {
		  state[ADDRESS] = address
		},
		[OPEN_PUSH] (state, openPush) {
		  return new Promise((resolve, reject) => {
		    uni.setStorage({
		      key: 'openPush',
		      data: openPush,
		      success () {
		        state[OPEN_PUSH] = openPush
		        resolve()
		      },
		      fail (e) {
		        reject(e)
		        console.error(new Error('存储openPush失败！'))
		      }
		    })
		  })
		},
    [USER] (state, user) {
      return new Promise((resolve, reject) => {
        uni.setStorage({
          key: 'userInfo',
          data: user,
          success () {
            state[USER] = user
            resolve()
          },
          fail (e) {
            reject(e)
            console.error(new Error('存储user失败！'))
          }
        })
      })
    },
		[COMMON_INFO] (state, commonInfo) {
		  return new Promise((resolve, reject) => {
		    uni.setStorage({
		      key: 'commonInfo',
		      data: commonInfo,
		      success () {
		        state[COMMON_INFO] = commonInfo
		        resolve()
		      },
		      fail (e) {
		        reject(e)
		        console.error(new Error('存储commonInfo失败！'))
		      }
		    })
		  })
		},
		[REGISTER_TYPE] (state, registerType) {
		  return new Promise((resolve, reject) => {
		    uni.setStorage({
		      key: 'registerType',
		      data: registerType,
		      success () {
		        state[REGISTER_TYPE] = registerType
		        resolve()
		      },
		      fail (e) {
		        reject(e)
		        console.error(new Error('存储registerType失败！'))
		      }
		    })
		  })
		}
  },
  actions: {
    [ADDRESS] ({ commit }, address) {
      commit(ADDRESS, address)
    },
		[TASK_INFO] ({ commit }, taskInfo) {
		  commit(TASK_INFO, taskInfo)
		},
		[OPEN_PUSH] ({ commit }, openPush) {
		  commit(OPEN_PUSH, openPush)
		},
		[HIDE_TYPE] ({ commit }, hideType) {
		  commit(HIDE_TYPE, hideType)
		},
    [USER] ({ commit }, user) {
      commit(USER, user)
    },
		[COMMON_INFO] ({ commit }, commonInfo) {
		  commit(COMMON_INFO, commonInfo)
		},
		[REGISTER_TYPE] ({ commit }, registerType) {
		  commit(REGISTER_TYPE, registerType)
		}
  }
}
