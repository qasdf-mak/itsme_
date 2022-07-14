<template>
	<view class="width-full lh1">
		<view class="fixed top35 bottom left right" style="z-index: 9999999;" @click.stop
			@touchmove.stop.prevent="moveHandle">
			<view class="width-full height flex align-items-center flex-center">
				<view class="perfect-box relative">
					<view class="width-full height pt15 pb15 border-box">
						<!-- 步奏一  你希望遇到怎样的人？ -->
						<view class="width-full">
							<view class="width-full mt15 mb10 fs15 fw600 color-black text-center">
								你希望遇到怎样的人？
							</view>
							<view class="width-full">
								<view v-for="(item,index) in expectData" :key="index">
									<view class="ml12 mr12 flex align-items-center mb8">
										<view class="fs14 color-deep fw600">
											{{item.type_info.type_name}}
										</view>
									</view>
									<view class="ml20 mb10 flex flex-wrap">
										<view v-for="(lable,lindex) in item.list" :key="lindex">
											<view class="lable-item text-center fs12 mb5"
												:class="lable.is_choice === 1 ? 'lable-item-active' : 'lable-item-default'"
												v-if="lindex < 9" @click="choiceLable(index, lindex)">
												{{lable.name}}
											</view>
										</view>
									</view>
								</view>
							</view>
						</view>
						<!-- 步奏一  你希望遇到怎样的人？ -->
						<view class="absolute top right">
							<view class="icon_font color-bbbbbb fs15 pt8 pb5 pl5 pr8" @click="closebtn">
								&#xe635;
							</view>
						</view>
						<view class="absolute left right flex flex-col align-items-center flex-center perfect-face-box" >
							<view class="fs16 color-white text-center perfect-face-yes" @click="submitExpect">
								完成
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 权限弹窗 -->
		<u-toast ref="uToast" z-index="99999999" />
	</view>
</template>

<script>
	import {
		mapGetters
	} from 'vuex'
	import {
		base64ToPath,
		pathToBase64
	} from '../../js_sdk/gsq-image-tools/image-tools'
	import UserService from '../../common/service/user-service.js'
	import CommonService from '../../common/service/common-service.js'
	import {
		formatImage
	} from '../../common/utils/common-methods'
	import {
		faceFind
	} from '../../common/appjs/face.js'
	export default {
		name: 'perfect-pop',
		data() {
			return {
				perfectIndex: 1,
				expectData: null,
				expectList: null,
				expectList2: null,
				expectList3: null,
				profileData: {},
				coverImg: '',
				nickname: '',
				channel: '',
				username: '',
				avatorImg: '',
				showTime: false,
				defaultTime: '2000-01-01',
				timeParams: {
					year: true,
					month: true,
					day: true,
					hour: false,
					minute: false,
					second: false
				},
				showHeight: false,
				heightList: [],
				heightDefault: [],
				showWeight: false,
				weightList: [],
				weightDefault: [],
				userCzd: '',
				isOne:false,
				addressPickerShow: false,
				faceImg: '',
				addressData: {
					pid: '',
					cid: ''
				},
				
				showClosePop: false,
			}
		},
		props: {
			perfectNum: Number
		},
		computed: {
			...mapGetters(['address']),
			isReal() {
				if (this.user.is_real === 1) {
					return true
				} else {
					return false
				}
			}
		},
		mounted() {
			this.heightList = this.$jsonBasic.heightList
			this.weightList = this.$jsonBasic.weightList
			this.getLabel()
			if (this.perfectNum) {
				this.perfectIndex = this.perfectNum
			}
		},
		methods: {
			closePerfectPop() {
				this.$emit('closePerfectPop')
			},
			refreshTheList() {
				this.$emit('refreshTheList', JSON.stringify(this.expectData))
			},
			// 获取标签
			getLabel() {
				setTimeout(() => {
					UserService.getuserexpect({
						step: 1,
						sex: this.user.gender
					}).then(res => {
						if (res.code === 1) {
							this.expectData = res.data
							let isExpectItem = []
							isExpectItem = this.expectData[1].list.filter(item => item.is_choice === 1)
							this.expectList = isExpectItem.map(item => item.id)
							let profession = this.expectData[2].list.filter(item => item.is_choice === 1)[0].id
							this.expectList.concat(profession)
						}
					})
				}, 100)
			},
			//关闭 X X
			closebtn() {
				this.showClosePop = false
				this.$emit('closePerfectPop')
			},
			// 选择标签
			choiceLable(index, lindex) {
				if (index === 2) {
					if (this.expectData[index].list[lindex].is_choice === 0) {
						this.expectData[index].list[lindex].is_choice = 1
					} else {
						this.expectData[index].list[lindex].is_choice = 0
					}
					let expList = []
					expList = this.expectData[index].list.filter(item => item.is_choice === 1)
					this.expectList = expList.map(item => item.id)
				} else if(index === 1) {
					if (this.expectData[index].list[lindex].is_choice === 0) {
						this.expectData[index].list[lindex].is_choice = 1
					} else {
						this.expectData[index].list[lindex].is_choice = 0
					}
					let expList2 = []
					expList2 = this.expectData[index].list.filter(item => item.is_choice === 1)
					this.expectList2 = expList2.map(item => item.id)
				}
				this.expectList3 = this.expectList.concat(this.expectList2)
				console.log(this.expectList3)
			},
			submitExpect() {
				let expect =  this.expectList3 ? this.expectList3 : this.expectList
				UserService.setuserexpect({
					expect_data: JSON.stringify(expect),
				}).then(res => {
					if (res.code === 1) {
						if (res.code === 1) {
							this.getLabel()
							this.showClosePop = false
							this.$emit('closePerfectPop')
						}
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.perfect-box {
		width: 600rpx;
		height: 920rpx;
		border-radius: 18rpx;
		background: rgba($color: #ffffff, $alpha: 0.8);
		box-shadow: 0 0 22rpx rgba(0, 0, 0, 0.4);
	}

	.perfect-top-box {
		height: 30rpx;
	}

	.perfect-top-num {
		width: 30rpx;
		height: 30rpx;
		line-height: 29rpx;
		border-radius: 30rpx;
	}

	.perfect-top-line {
		height: 6rpx;
		border-radius: 3rpx;
	}

	.perfect-top-default {
		opacity: 1.0;
	}

	.perfect-top-select {
		opacity: 0.5;
	}

	.lable-item {
		width: 150rpx;
		height: 50rpx;
		margin-right: 32rpx;
		line-height: 48rpx;
		border-radius: 50rpx;
	}

	.lable-item-default {
		background: #FFFFFF;
		color: #666666;
		border: 2rpx solid #DDDDDD;
	}

	.lable-item-active {
		background: #D97DB0;
		color: #fff;
		border-radius: 27px;
	}

	.perfect-bot-box {
		bottom: -45rpx;
	}

	.perfect-bot {
		width: 90rpx;
		height: 90rpx;
	}

	.cover-box {
		width: 110rpx;
		height: 176rpx;
	}

	.perfect-lable-item {
		height: 70rpx;
	}

	.perfect-lable-item-left {
		width: 140rpx;
	}

	.perfect-avator-box {
		width: 160rpx;
		height: 160rpx;
		border-radius: 160rpx;
		overflow: hidden;
		background: #FFFFFF;
		border: 1rpx solid #E7E7E7;
	}

	.perfect-img-1 {
		width: 28rpx;
		height: 28rpx;
	}

	.perfect-avator-list {
		width: 105rpx;
		height: 105rpx;
		border-radius: 10rpx;
		overflow: hidden;
	}

	.perfect-avator-bot-1 {
		height: 30rpx;
		background: #73DA5F;
	}

	.perfect-avator-bot-2 {
		height: 30rpx;
		background: #DA5F5F;
	}

	.perfect-img-2 {
		width: 28rpx;
	}

	.rztg-img {
		width: 200rpx;
	}

	.perfect-face-box {
		bottom: -35rpx;
	}

	.perfect-face-no {
		height: 40rpx;
		line-height: 40rpx;
		border-bottom: 1rpx solid #666666;
		margin-bottom: 16rpx;
	}

	.color-woman {
		color: rgb(205, 120, 166);
	}

	.color-man {
		color: rgb(58, 136, 201);
	}

	.perfect-face-yes {
		width: 220rpx;
		height: 70rpx;
		line-height: 68rpx;
		border-radius: 70rpx;
		background: linear-gradient(159deg, #D97DB0 0%, #F565A2 100%);
	}

	.fs5 {
		font-size: 10rpx;
	}
</style>
