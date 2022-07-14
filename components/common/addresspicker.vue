<template>
	<view class="width-full lh1">
		<u-picker
			mode="multiSelector"
			v-model="show"
			:range="addressList"
			:mask-close-able="false"
			:default-selector='defaultSelector'
			@cancel="cancelAddress"
			z-index="999999999999"
			@changecolumn="changeColumn"
			@confirm="confirmAddress"
		></u-picker>
	</view>
</template>

<script>
	import { mapGetters } from 'vuex'
	import CommonService from '../../common/service/common-service.js'
	export default {
		name: 'address-picker',
		data() {
			return {
				addressList: [],
				provinceList: [],
				cityList: [],
				defaultSelector: [0, 0]
			}
		},
		props: {
			addressPickerShow: Boolean,
			addressid: Object
		},
		watch: {
			addressid () {
				if (this.addressid.pid && this.addressid.cid) {
					for (let i = 0; i < this.provinceList.length; i++) {
						if (this.provinceList[i].id === this.addressid.pid) {
							this.getCity(i)
							break
						}
					}
				}
			}
		},
		computed: {
			...mapGetters(['user']),
			show: {
				get () {
					return this.addressPickerShow
				},
				set () {}
			}
		},
		methods: {
			// 获取省
			getProvince() {
				CommonService.getProvince().then(res => {
					if (res.code === 1) {
						this.provinceList = JSON.parse(res.data)
						this.addressList.push(this.provinceList.map(item => {
							return item.name
						}))
						this.getCity(0)
					}
				})
			},
			// 获取市
			getCity(pnum) {
				let pid = this.provinceList[pnum].id
				CommonService.getCity({
					pid: pid
				}).then(res => {
					this.cityList = JSON.parse(res.data)
					if (this.cityList.length > 0) {
						this.addressList = this.addressList.slice(0, 1)
						this.addressList.push(this.cityList.map(item => {
							return item.name
						}))
					} else {
						this.addressList = this.addressList.slice(0, 1)
						this.addressList.push(['市辖区'])
					}
					if (this.addressid && this.addressid.pid && this.addressid.cid && this.addressid.pid === pid) {
						for (let i = 0; i < this.cityList.length; i++) {
							if (this.cityList[i].id === this.addressid.cid) {
								this.defaultSelector = [pnum, i]
								break
							} else {
								this.defaultSelector = [pnum, 0]
							}
						}
					} else {
						this.defaultSelector = [pnum, 0]
					}
				})
			},
			changeColumn(e) {
				this.getCity(e.index)
			},
			confirmAddress(e) {
				let pnum = 0
				let cnum = 0
				if (e[0]) {
					pnum = e[0]
				}
				if (e[1]) {
					cnum = e[1]
				}
				this.$emit('confirmAddress', this.provinceList[pnum].name, this.cityList[cnum].name, this.provinceList[pnum].id, this.cityList[cnum].id)
			},
			cancelAddress() {
				this.$emit('cancelAddress')
			}
		},
		mounted() {
			this.getProvince()
		}
	}
</script>

<style lang="scss" scoped>
</style>
