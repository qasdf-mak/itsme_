<template>
	<view class="width-full flex flex-col lh1" :class="type === 'page' ? 'expect-box-1' : 'expect-box-2'">
		<view class="width-full" :style="'height: ' + StatusBar + 'px;'" v-if="type === 'page'"></view>
		<view class="width-full flex flex-col align-items-center flex-center relative">
			<view class="fs20 color-deep fw600 pt20">
				{{step === 1 ? '你希望遇到怎样的人' : '你是怎样的人'}}
			</view>
			<view class="pt15 fs14 color-999999">
				{{step === 1 ? '去人海茫茫中找到灵魂共鸣的Ta吧' : '选择你的个性标签，平台将为您匹配更合适的人'}}
			</view>
			<view class="top-line-box mt15 mb15"></view>
			<view class="fs13 color-666666 absolute top20 right15 p3" v-if="type === 'page'" @click="toProfile">跳过</view>
		</view>
		<view class="width-full flex-1 float-hidden">
			<scroll-view scroll-y="true" class="width-full" :class="type === 'page' ? 'scroll-box-1' : 'scroll-box-2'">
				<view class="width-full">
					<view v-for="(item,index) in expectData" :key="index">
						<view class="width-full" v-if="item.type === 1 && item.list && item.list.length > 0 && item.type_info">
							<view class="ml20 mr20">
									<view class="width-full flex align-items-center flex-between">
										<view class="fs15 color-deep fw600">
											{{item.type_info && item.type_info.type_name}}
										</view>
										<view class="flex align-items-center" v-if="item.list && item.list.length > 5" @click="showMore(index)">
											<view class="fs13 color-aaaaaa">
												{{item.isShow ? '收回' : '展开'}}
											</view>
											<view class="icon_font fs13 ml5" v-html="item.isShow ? '&#xe776;' : '&#xe61f;'"></view>
										</view>
									</view>
								</view>
								<view class="ml35 flex flex-wrap mt15 mb10">
									<view v-for="(lable, lindex) in item.list" :key="lindex">
										<view
											class="lable-box border-box text-center mr18 mb12"
											:class="lable.is_choice === 1 ? 'active' : 'default'"
											v-show="(lindex < 5 && !item.isShow) || item.isShow"
											@click="choiceLable(index, lindex)"
										>
											{{lable.name}}
										</view>
									</view>
									<view
										class="lable-box border-box mr18 mb12 default flex align-items-center flex-center"
										@click="addLable(index)"
									>
										<view class="icon_font mr5 fs13">
											&#xe62c;
										</view>
										<view>新增</view>
									</view>
								</view>
							</view>
							<view class="width-full" v-if="item.type === 2 && item.list && item.list.length > 0 && item.type_info">
								<view class="ml20 mr20 flex align-items-center">
									<view class="fs15 color-deep fw600">
										{{item.type_info.type_name}}
									</view>
									<view class="flex align-items-center ml20">
										<view class="label-input-box">
											<input type="number" v-model="item.list[0].name" @blur="changeNum(0)" />
										</view>
										<view class="label-input-line"></view>
										<view class="label-input-box">
											<input type="number" v-model="item.list[1].name" @blur="changeNum(1)" />
										</view>
									</view>
								</view>
							</view>
						</view>
					<view class="width-full pt35"></view>
				</view>
			</scroll-view>
		</view>
		<view class="width-full relative">
			<view class="bottom-btn-box bg-2 text-center fs18 color-white" @click="confirmBable">
				{{step === 1 ? '下一步' : '完成'}}
			</view>
			<view class="absolute left25 right25 br20 float-hidden bottom-tk-box fs18 color-white fw600 text-center" v-if="showPeopleNum">
				有 {{peopleNum}} 位朋友符合您的要求
			</view>
		</view>
		<custom-pop
			:showPop="showPop"
			confirmText="确认"
			cancelText="取消"
			contentTitle="请输入2-4个字"
			isInput
			:meiNv="1"
			@input="popConfirm"
			@cancel="showPop = false"
		></custom-pop>
	</view>
</template>

<script>
	import { mapGetters } from 'vuex'
	import UserService from '../../common/service/user-service.js'
	export default {
		data() {
			return {
				showPop: false,
				inputIndex: -1,
				step: 1,
				peopleNum: 0,
				showPeopleNum: false,
				expectData: null,
				isMy:1,
			}
		},
		props: {
			type: String
		},
		mounted() {
			this.getExpectData()
		},
		computed: {
			...mapGetters(['user'])
		},
		methods: {
			getExpectData() {
				UserService.getuserexpect({
					step: this.step,
					sex: this.user.gender
				}).then(res => {
					if (res.code === 1) {
						this.expectData = res.data.map(item => {
							item.isShow = false
							return item
						})
					}
				})
			},
			// 展开更多
			showMore(index) {
				this.expectData[index].isShow = !this.expectData[index].isShow
			},
			// 选择标签
			choiceLable(index, lindex) {
				let addNum = Math.floor(Math.random() * (100 - 50)) + 50;
				if (this.expectData[index].list[lindex].is_choice === 0) {
					this.expectData[index].list[lindex].is_choice = 1
					this.peopleNum = this.peopleNum + addNum
				} else {
					this.expectData[index].list[lindex].is_choice = 0
					this.peopleNum = this.peopleNum - addNum
				}
				this.showPeopleNum = true
				setTimeout(() => {this.showPeopleNum = false}, 1500)
			},
			// 新增标签
			addLable(index) {
				this.inputIndex = index
				this.showPop = true
			},
			popConfirm(text) {
				let lable = {
					is_choice: 1,
					is_custom: 1,
					name: text,
					type_id: this.expectData[this.inputIndex].type_info.id
				}
				this.expectData[this.inputIndex].list.unshift(lable)
				this.inputIndex = -1
				this.showPop = false
			},
			changeNum(index) {
				console.log(index)
			},
			confirmBable() {
				UserService.setuserexpect({
					data: JSON.stringify(this.expectData)
				}).then(res => {
					console.log(res)
					if (res.code === 1) {
						if (this.step === 1) {
							this.step = 2
							this.getExpectData()
						} else {
							this.toProfile()
						}
					}
				})
			},
			toProfile() {
				if (this.type === 'page') {
					uni.redirectTo({
						url: '/pages/my/profile?isMypass=' + this.isMy
					})
				} else {
					this.$emit('setSuccess')
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.top-line-box{
		width: 450rpx;
		height: 1rpx;
		background: linear-gradient(to right, #FFFFFF, #DDDDDD, #FFFFFF);
	}
	.bottom-btn-box{
		margin: 50rpx 80rpx 90rpx 80rpx;
		height: 80rpx;
		line-height: 78rpx;
		border-radius: 80rpx;
	}
	.bottom-tk-box{
		bottom: 210rpx;
		height: 90rpx;
		line-height: 89rpx;
		background: rgba($color: #000000, $alpha: 0.5);
		animation: fade-in;/*动画名称*/
		animation-duration: 1s;/*动画持续时间*/  
		-webkit-animation:fade-in 1s;/*针对webkit内核*/  
	}
	@keyframes fade-in {
	    0% {opacity: 0;}/*初始状态 透明度为0*/  
	    40% {opacity: 0.4;}/*过渡状态 透明度为0*/  
	    80% {opacity: 0.8;}/*过渡状态 透明度为0*/  
	    100% {opacity: 1;}/*结束状态 透明度为1*/  
	}  
	@-webkit-keyframes fade-in {/*针对webkit内核*/  
	   0% {opacity: 0;}/*初始状态 透明度为0*/
	   40% {opacity: 0.4;}/*过渡状态 透明度为0*/  
	   80% {opacity: 0.8;}/*过渡状态 透明度为0*/  
	   100% {opacity: 1;}/*结束状态 透明度为1*/  
	}
	.lable-box{
		width: 180rpx;
		height: 70rpx;
		line-height: 68rpx;
		border-radius: 70rpx;
	}
	.lable-box.default{
		background: #FFFFFF;
		color: #999999;
		border: 2rpx solid #EEEEEE;
	}
	.lable-box.active{
		background: #FFFDEF;
		color: #666666;
		border: 2rpx solid #EDDD81;
	}
	.expect-box-1{
		width: 100vw;
		height: 100vh;
	}
	.expect-box-2{
		width: 100vw;
		height: 90vh;
	}
	.scroll-box-1{
		height: calc(100vh - 400rpx);
	}
	.scroll-box-2{
		height: calc(90vh - 400rpx);
	}
	.label-input-box{
		width: 142rpx;
		height: 80rpx;
		line-height: 80rpx;
		box-sizing: border-box;
		border: 2rpx solid #DDDDDD;
		input{
			width: 142rpx;
			height: 80rpx;
			line-height: 80rpx;
			text-align: center;
		}
	}
	.label-input-line{
		width: 40rpx;
		height: 4rpx;
		background: #DDDDDD;
		margin: 0 30rpx;
	}
</style>
