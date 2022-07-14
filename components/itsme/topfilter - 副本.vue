<template>
	<view class="width-full lh1">
		<u-popup v-model="show" mode="top"  border-radius="30" z-index="99" @close="closeTop">
			<view class="width-full bg-white">
				<view class="width-full" :style="'height:' + StatusBar + 'px;'"></view>
				<view class="width-full itsme-nav-box"></view>
				<view class="width-full bg-white pt5 pb20 pl12 pr12 border-box b-t-1">
					<!-- 性别筛选 -->
					<view class="width-full pl15 pr15 pt15 pb15 border-box mb10 br10 bg-white box-shadow-index">
						<view class="width-full flex align-items-center">
							<view class="fs15 color-deep fw600 mr30">
								性别筛选
							</view>
							<view class="flex-1 flex align-items-center box-shadow-index-sex br5 ml35">
								<view class="flex-1 fs14 pt10 pb10 text-center" :class="filterData.sex.value === index ? 'color-white bg-2 br5' : 'color-deep'" v-for="(sex, index) in filterData.sex.list" :key="index" @click="changeSex(index)">
									{{sex}}
								</view>
							</view>
						</view>
					</view>
					<!-- 年龄筛选 -->
					<view class="width-full pl15 pr15 pt15 pb5 border-box mb10 br10 bg-white box-shadow-index" v-if="isLogin">
						<view class="width-full flex align-items-center flex-between">
							<view class="fs15 color-deep fw600">
								年龄筛选
							</view>
							<view class="fs15 color-deep fw600">
								{{ageNum}}
							</view>
						</view>
						<view class="width-full mt12">
							<slider-range
							  :value="filterData.age.value"
							  :min="filterData.age.min"
							  :max="filterData.age.max"
							  :step="1"
								height="40"
							  :bar-height="4"
							  :block-size="22"
							  background-color="#EEEEEE"
							  active-color="#D97DB0"
							  :format="formatAge"
							  :decorationVisible="true"
							  @change="changeAge"
							></slider-range>
						</view>
					</view>
					<!-- 身价筛选 -->
					<view class="width-full pl15 pr15 pt15 pb5 border-box mb10 br10 bg-white box-shadow-index" v-if="isLogin">
						<view class="width-full flex align-items-center flex-between">
							<view class="fs15 color-deep fw600">
								身价筛选
							</view>
							<view class="fs15 color-deep fw600">
								{{worthNum}}
							</view>
						</view>
						<view class="width-full mt12">
							<slider-range
							  :value="filterData.worth.value"
							  :min="filterData.worth.min"
							  :max="filterData.worth.max"
							  :step="10"
								height="40"
							  :bar-height="4"
							  :block-size="22"
							  background-color="#EEEEEE"
							  active-color="#D97DB0"
							  :format="formatWorth"
							  :decorationVisible="true"
							  @change="changeWorth"
							></slider-range>
						</view>
					</view>
					<view class="width-full bg-2 br5 fs18 color-white text-center pt10 pb10 mt15" @click="toChangeFilter">
						完成
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import SliderRange from '../primewind-sliderrange/components/primewind-sliderrange/index.vue'
	import { mapGetters } from 'vuex'
	export default {
		name: 'top-filter',
		data() {
			return {
				filterData: {
					sex: {
						value: 1,
						list: ['女生', '男生']
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
			filterList () {
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
				get () {
					return this.showFilterPop
				},
				set () {}
			},
			ageNum () {
				if (this.filterData.age.value && this.filterData.age.value.length > 0) {
					return this.filterData.age.value[0] + ' - ' + this.filterData.age.value[1]
				} else {
					return ''
				}
			},
			worthNum () {
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
			setData () {
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
				this.$emit('changeFilter', this.filterData.sex.value, this.filterData.age.value, this.filterData.worth.value)
			},
			closeTop() {
				this.$emit('closeTop')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.itsme-nav-box{
		height: 88rpx;
	}
	.box-shadow-index-sex{
		box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.14);
	}
</style>
