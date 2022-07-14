<template>
	<view class="width-full minnavh100vh lh1 bg-white card-tabs-box">
		<u-sticky>
			<!-- <u-tabs :list="list" :is-scroll="false" :current="current" @change="change" active-color="#000"></u-tabs> -->
			<view class="flex pr18 pt8 pb10 pl18 flex-between bg-white" v-if="user.gender === 1">
				<view class="tabs-btn pr15 pl15 pt8 pb8"
					:class="current === index ? 'bg-2 color-fff' : 'bg-white color-main6'" v-for="(item,index) in list"
					:key="index" @click="change(index)">
					{{item.name}}
				</view>
			</view>
			<view class="flex pr18 pt8 pb10 pl18 flex-around bg-white" v-else>
				<view class="tabs-btn pr25 pl25 pt8 pb8"
					:class="current === index ? 'bg-2 color-fff' : 'bg-white color-main6'"
					v-for="(item,index) in womanList" :key="index" @click="change(index)">
					{{item.name}}
				</view>
			</view>
		</u-sticky>
		<view class="width-full" v-if="current === 0">
			<view class="mt35" v-if="isCardPack && pages.page === 1">
				<empty-tip type="redPack"></empty-tip>
			</view>
			<view v-for="(item ,index) in cardPackList" :key="index" v-else>
				<card-pack :item="item" :index="current"></card-pack>
			</view>
		</view>
		<view class="width-full" v-if="current === 1">
			<view class="mt35" v-if="isCardPack">
				<empty-tip type="redPack"></empty-tip>
			</view>
			<view v-for="(item ,index) in cardPackList" :key="index" v-else>
				<card-pack :item="item" :index="current"></card-pack>
			</view>
		</view>
		<view class="width-full" v-if="current === 2">
			<view class="mt35" v-if="isCardPack">
				<empty-tip type="redPack"></empty-tip>
			</view>
			<view v-for="(item ,index) in cardPackList" :key="index" v-else>
				<card-pack :item="item" :index="current"></card-pack>
			</view>
		</view>
		<view class="width-full" v-if="current === 3">
			<view class="mt35" v-if="isCardPack">
				<empty-tip type="redPack"></empty-tip>
			</view>
			<view v-for="(item ,index) in cardPackList" :key="index" v-else>
				<card-pack :item="item" :index="current"></card-pack>
			</view>
		</view>

		<u-toast ref="uToast" />
		<!-- 权限弹窗 -->
		<!-- 		<unify-pop :showUnify="showUnifyPop" :type="unifyType" @closePop="showUnifyPop = false"
			@popConfirm="popConfirm">
		</unify-pop> -->
		<!-- 权限弹窗 -->
		<view v-if="showRedPacket">
			<red-packet></red-packet>
		</view>
	</view>
</template>

<script>
	import {
		mapActions
	} from 'vuex'
	import CommonService from '../../common/service/common-service.js'
	import mycardPack from '../../components/common/mycardpack.vue'
	import cardPack from '../../components/common/cardpack.vue'
	export default {
		data() {
			return {
				list: [{
					name: '可使用'
				}, {
					name: '已分享'
				}, {
					name: '可分享',
				}, {
					name: '已使用',
				}],
				womanList: [{
					name: '已分享'
				}, {
					name: '可分享',
				}],
				first: true,
				isCardPack: false,
				isLogin: false,
				pages: {
					page: 1,
					size: 5,
					finish: false
				},
				current: 0,
				state: 1,
				cardPackList: []
			}
		},
		components: {
			mycardPack,
			cardPack
		},
		watch: {
			isCardPack() {
				if (this.isCardPack === true) {
					console.log('没有数据,显示')
				} else {
					console.log('有数据,不显示')
				}
			}
		},
		onPullDownRefresh() {
			this.pages.finish = false
			this.pages.page = 1
			this.cardPackList = []
			this.getCardPackList()
		},
		onReachBottom() {
			if (!this.pages.finish) {
				this.pages.page++
				this.getCardPackList()
			}
		},
		onLoad(options) {
			this.init()
			// this.first = options.first
		},
		methods: {
			init() {
				Object.assign(this.$data, this.$options.data())
				// 判断登录状态
				this.loginExpire().then(res => {
					this.isLogin = res
					this.getCardPackList()
				})
			},
			// 获取卡包列表
			getCardPackList() {
				if (this.isLogin) {
					// if (this.user.gender === 0 && this.first) {
					// 	this.state = 2
					// 	this.first = false
					// }
					CommonService.userCardPackage({
						state: this.state, // 状态 1. 可使用 2. 已分享 3. 可分享 4. 已使用
						page: this.pages.page // 页码
					}).then(res => {
						uni.stopPullDownRefresh()
						if (res.code === 1 && res.data && res.data.length > 0) {
							this.first = false
							this.pages.finish = false
							this.cardPackList = this.cardPackList.concat(res.data.map(item => {
								return item
							}))
						} else {
							if (this.pages.page === 1 && this.first) {
								if(this.user.gender === 1){
									if (this.current <= 3) {
										this.change(this.current + 1)
									} else {
										this.change(0)
										this.first = false
									}
								}else{
									if (this.current <= 1) {
										this.change(this.current + 1)
									} else {
										this.change(0)
										this.first = false
									}
								}
							} else {
								this.pages.finish = true
							}
						}
						//判断性别 为男性时 4 个状态 ; 女性时 2 个状态
						if (this.user.gender === 1) {
							if (this.cardPackList.length < 1) {
								this.isCardPack = true

							} else {
								this.isCardPack = false
							}
						} else {
							if (this.cardPackList.length < 1) {
								this.isCardPack = true
							} else {
								this.isCardPack = false
							}
						}
					})
				}
			},
			change(index) {
				console.log(index)
				if (this.user.gender === 0) {
					if (index === 0) {
						this.state = index + 2
					}
					if (index === 1) {
						this.state = index + 2
					}
				} else {
					this.state = index + 1
				}
				console.log(this.state)
				this.current = index;
				this.pages.page = 1
				this.cardPackList = []
				this.getCardPackList()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.avatar-box {
		width: 249rpx;
	}

	.card-shadow {
		background: #FFFFFF;
		box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.08);
		border-radius: 15px;
	}

	.black-no-img {
		width: 280rpx;
	}

	.card-box {
		width: 180rpx;
	}

	.img-box-1 {
		width: 150rpx;
		height: 150rpx;
	}

	.operation-btn {
		width: 150rpx;
		box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.08);
		border-radius: 10px;
	}

	.tabs-btn {
		box-shadow: 0px 0px 16px 0px rgba(135, 78, 110, 0.2);
		border-radius: 28px;
	}

	.color-fff {
		color: #fff;
	}
</style>
