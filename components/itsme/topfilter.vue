<template>
	<view class="fixed left right top height100vh popup" style="height: 100vh;" v-if="show">
		<view class=" width-full bg-itsme-4 relative" :class="isLogin ? 'popup-info' : 'popup-info-logout'">
			<view class="width-full flex flex-right pr15" @click="closePop">
				<view class="triangle-box  absolute top-22 right-50" style="z-index: 9999;"> </view>
			</view>
			<!-- 性别筛选 -->
			<view class="width-full pl15 pr15 pt25 pb15 border-box mb10 br10 box-shadow-index">
				<view class="width-full">
					<view class="flex align-items-center ">
						<view class="dot-box mt3 mr10"> </view>
						<view class="fs15 color-white fw600 mr30 ">
							性别
						</view>
					</view>
					<view class="width-full flex-1 flex flex-between align-items-center box-shadow-index-sex br5 pt15  pl30 pr30">
						<view class="flex flex-center align-items-center fs14 pt10 pb10 text-center border-box" :class="filterData.sex.value === index ? 'sex-btn-1' : 'sex-btn'" v-for="(sex, index) in filterData.sex.list" :key="index" @click="changeSex(index)">
							<view class="icon_font mr10 fs12">
								{{sex === '女生' ? '&#xe660;':' &#xe661;'}}
								<!-- list: [['女生','&#xe60e;'],['男生','e60e']] -->
							</view>
							<view class="">
								{{sex}}
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 年龄筛选 -->
			<view class="width-full pl15 pr15 pt15 pb5 border-box mb10 br10  box-shadow-index" v-if="isLogin">
				<view class="width-full flex align-items-center flex-between">
					<view class="flex align-items-center ">
						<view class="dot-box mt3 mr10"> </view>
						<view class="fs15 color-white fw600 mr30 ">
							年龄
						</view>
					</view>
					<view class="fs15 color-deep fw600">
						{{ageNum}}
					</view>
				</view>
				<view class="width-full mt12 pl30 pr30">
					<slider-range
					  :value="filterData.age.value"
					  :min="filterData.age.min"
					  :max="filterData.age.max"
					  :step="1"
						height="40"
					  :bar-height="4"
					  :block-size="16"
					  background-color="#39394F"
					  active-color="#D97DB0"
					  :format="formatAge"
					  :decorationVisible="true"
					  @change="changeAge"
					></slider-range>
				</view>
			</view>
			<!-- 完成 -->
			<view class="flex pb15">
				<view class="ml35 pl35 mr35 ml35"> </view>
				<view class="flex-1 bg-2 br20 fs18 color-white text-center pt10 pb10 mt15" @click="toChangeFilter">
					完成
				</view>
				<view class="mr35 pr35 ml35 ml35"> </view>
			</view>
		</view>
	</view>
</template>

<script>
	import SliderRange from '../primewind-sliderrange/components/primewind-sliderrange/index.vue'
	import {
		mapGetters
	} from 'vuex'
	export default {
		name: 'top-filter',
		data() {
			return {
				filterData: {
					sex: {
						value: 1,
						list: ['女生','男生']
					},
					age: {
						min: 0,
						max: 0,
						value: []
					},
					worth: {
						min: 0,
						max: 0,
						value: []
					},
					address: {
						province: {
							name: '',
							id: ''
						},
						city: {
							name: '',
							id: ''
						},
						name: '',
						id: {
							pid: '',
							cid: ''
						}
					}
				},
				addressPickerShow: false
			}
		},
		watch: {
			filterList() {
				this.setData()
			}
		},
		props: {
			showFilterPop: Boolean,
			filterList: Object,
			isLogin: Boolean
		},
		computed: {
			...mapGetters(['address', 'user', 'commonInfo']),
			show: {
				get() {
					return this.showFilterPop
				},
				set() {}
			},
			ageNum() {
				if (this.filterData.age.value && this.filterData.age.value.length > 0) {
					return this.filterData.age.value[0] + ' - ' + this.filterData.age.value[1]
				} else {
					return ''
				}
			},
			worthNum() {
				if (this.filterData.worth.value && this.filterData.worth.value.length > 0) {
					return this.filterData.worth.value[0] + ' - ' + this.filterData.worth.value[1]
				} else {
					return ''
				}
			}
		},
		components: {
			SliderRange
		},
		mounted() {
			this.setData()
		},
		methods: {
			setData() {
				this.filterData.age.min = this.commonInfo.age_between.s
				this.filterData.age.max = this.commonInfo.age_between.e
				this.filterData.worth.min = this.commonInfo.worth_between.s
				this.filterData.worth.max = this.commonInfo.worth_between.e
				if (this.filterList) {
					this.filterData.sex.value = this.filterList.gender
					this.filterData.age.value = []
					this.filterData.age.value.push(this.filterList.age1)
					this.filterData.age.value.push(this.filterList.age2)
					this.filterData.worth.value = []
					this.filterData.worth.value.push(this.filterList.worth1)
					this.filterData.worth.value.push(this.filterList.worth2)
				}
			},
			// 格式化年龄
			formatAge(val) {
				return val
			},
			// 年龄筛选
			changeAge(e) {
				this.filterData.age.value = e
			},
			// 格式化身价
			formatWorth(val) {
				return val
			},
			// 身价筛选
			changeWorth(e) {
				this.filterData.worth.value = e
			},
			// 性别筛选
			changeSex(index) {
				this.filterData.sex.value = index
			},
			toChangeFilter() {
				this.$emit('changeFilter', this.filterData.sex.value, this.filterData.age.value, this.filterData.worth
					.value)
			},
			closeTop() {
				this.$emit('closeTop')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.itsme-nav-box {
		height: 88rpx;
	}

	.box-shadow-index-sex {
		box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.14);
	}

	.dot-box {
		width: 12rpx;
		height: 12rpx;
		background: #D97DB0;
		border-radius: 50%;
	}
	.triangle-box{
		width: 30rpx;
		height: 50rpx;
		border-width: 30rpx;
		border-style: solid;
		border-color:  transparent transparent #23232D transparent;

	}

	.popup {
		background-color: rgba(0, 0, 0, 0.4);
		z-index: 998;
	}

	.popup-info {
		position: fixed;
		top: 29%;
		left: 50%;
		border-radius:0 0 20rpx 20rpx ;
		transform: translate(-50%, -50%);
		z-index: 998;
	}
	.popup-info-logout {
		position: fixed;
		top: 20%;
		left: 50%;
		border-radius:0 0 20rpx 20rpx ;
		transform: translate(-50%, -50%);
		z-index: 998;
	}
	.top-22{
		top: -50rpx;
	}
	.right-50{
		right: 170rpx;
	}
	.sex-btn{
		width: 250rpx;
		height: 50rpx;
		background: #23232D;
		border: 2px solid #39394F;
		border-radius: 10px;
	}
	.sex-btn-1{
		width: 250rpx;
		height: 50rpx;
		background: #D97DB0;
		border-radius: 10px;
	}
</style>
