import {
	RETURN_URL,
	VERSION,
	GET_ADDRESS_FAIL,
	LIKE_LIST,
	HOME_LIST,
	SHOW_PROFILE,
	IFTHE_REFRESH,
	IS_SHARE,
	IS_LIKE,
	HXMESSAGE,
	PUSHPOP
} from '../constant' 
export default {
	state: {
		[RETURN_URL]: null,
		[VERSION]: '1.4.9',
		[LIKE_LIST]: uni.getStorageSync('likeList') || [],
		[HOME_LIST]: uni.getStorageSync('homeList') || [],
		[GET_ADDRESS_FAIL]: false,
		[SHOW_PROFILE]: false,
		[IFTHE_REFRESH]: false,
		[IS_SHARE]: false,
		[PUSHPOP]: false,
		[IS_LIKE]: Number,
		[HXMESSAGE]:Object
	},
	getters: {
		returnUrl(state) {
			return state[RETURN_URL]
		},
		version(state) {
			return state[VERSION]
		},
		getAddressFail(state) {
			return state[GET_ADDRESS_FAIL]
		},
		showProfile(state) {
			return state[SHOW_PROFILE]
		},
		IfTheRefresh(state) {
			return state[IFTHE_REFRESH]
		},
		isShare(state) {
			return state[IS_SHARE]
		},
		pushPop(state) {
			return state[PUSHPOP]
		},
		isLikeRefresh(state) {
			return state[IS_LIKE]
		},
		hx_message(state) {
			return state[HXMESSAGE]
		},
		likeList(state) {
			return state[LIKE_LIST]
		},
		homeList(state) {
			return state[HOME_LIST]
		}
	},
	mutations: {
		[RETURN_URL](state, returnUrl) {
			state[RETURN_URL] = returnUrl
		},
		[GET_ADDRESS_FAIL](state, getAddressFail) {
			state[GET_ADDRESS_FAIL] = getAddressFail
		},
		[SHOW_PROFILE](state, showProfile) {
			state[SHOW_PROFILE] = showProfile
		},
		[IFTHE_REFRESH](state, IfTheRefresh) {
			state[IFTHE_REFRESH] = IfTheRefresh
		},
		[IS_SHARE](state, isShare) {
			state[IS_SHARE] = isShare
		},
		[PUSHPOP](state, pushPop) {
			state[PUSHPOP] = pushPop
		},
		[IS_LIKE](state, isLikeRefresh) {
			state[IS_LIKE] = isLikeRefresh
		},
		[HXMESSAGE](state, hx_message) {
			state[HXMESSAGE] = hx_message
		},
		[LIKE_LIST](state, likeList) {
			return new Promise((resolve, reject) => {
				uni.setStorage({
					key: 'likeList',
					data: likeList,
					success() {
						state[LIKE_LIST] = likeList
						resolve()
					},
					fail(e) {
						reject(e)
						console.error(new Error('存储likeList失败！'))
					}
				})
			})
		},
		[HOME_LIST](state, homeList) {
			return new Promise((resolve, reject) => {
				uni.setStorage({
					key: 'homeList',
					data: homeList,
					success() {
						state[HOME_LIST] = homeList
						resolve()
					},
					fail(e) {
						reject(e)
						console.error(new Error('存储homeList失败！'))
					}
				})
			})
		}
	},
	actions: {
		[RETURN_URL]({
			commit
		}, returnUrl) {
			commit(RETURN_URL, returnUrl)
		},
		[LIKE_LIST]({
			commit
		}, likeList) {
			commit(LIKE_LIST, likeList)
		},
		[HOME_LIST]({
			commit
		}, homeList) {
			commit(HOME_LIST, homeList)
		},
		[GET_ADDRESS_FAIL]({
			commit
		}, getAddressFail) {
			commit(GET_ADDRESS_FAIL, getAddressFail)
		},
		[SHOW_PROFILE]({
			commit
		}, showProfile) {
			commit(SHOW_PROFILE, showProfile)
		},
		[IFTHE_REFRESH]({
			commit
		}, IfTheRefresh) {
			commit(IFTHE_REFRESH, IfTheRefresh)
		},
		[IS_SHARE]({
			commit
		}, isShare) {
			commit(IS_SHARE, isShare)
		},
		[PUSHPOP]({
					commit
				}, pushPop) {
					commit(PUSHPOP, pushPop)
				},
		[IS_LIKE]({
			commit
		}, isLikeRefresh) {
			commit(IS_LIKE, isLikeRefresh)
		},
		[HXMESSAGE]({
			commit
		}, hx_message) {
			commit(HXMESSAGE, hx_message)
		}
	}
}
