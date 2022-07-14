<template>
	<view class="width-full lh1">
		<u-popup
			v-model="showPicker"
			mode="bottom"
			safe-area-inset-bottom
			:mask-close-able="false"
		>
				<view class="width-full">
					<view class="width-full flex align-items-center b-b-1 line-color-2">
						<view class="fs14 pl18 pr18 pt15 pb15 color-666666" @click="cancel">
							取消
						</view>
						<view class="flex-1 fs16 color-deep fw600 text-center">
							{{title}}
						</view>
						<view class="fs14 pl18 pr18 pt15 pb15 color-main6" @click="confirm">
							确定
						</view>
					</view>
					<view class="width-full">
						<view v-for="(item,index) in listdata" :key="index">
							<view class="width-full flex align-items-center flex-between b-b-1 line-color-2 picker-box" @click="changePicker(index)">
								<view class="pl30 pr20 fs14 color-deep">
									{{item.name}}
								</view>
								<view class="icon_font color-assist1 fs16 mr20" v-if="item.ischeck">
									&#xe632;
								</view>
							</view>
						</view>
					</view>
				</view>
			</u-popup>
	</view>
</template>

<script>
	export default {
		name: 'custom-picker',
		data() {
			return {
				showPicker: false,
				listdata: null,
				changedata: []
			}
		},
		props: {
			title: String,
			type: String,
			list: Array,
			default: String
		},
		computed: {
		
		},
		mounted() {
			if (this.default) {
				if (this.default.indexOf(',') !== -1) {
					this.changedata = this.default.split(',').map(num => {
						return Number(num)
					})
				} else {
					this.changedata.push(Number(this.default))
				}
			}
			this.listdata = this.list.map(item => {
				if (this.changedata.indexOf(item.id) !== -1) {
					item.ischeck = true
				} else {
					item.ischeck = false
				}
				return item
			})
			this.showPicker = true
		},
		methods: {
			// 确定
			confirm() {
				let changeid = ''
				let changename = ''
				let changelist = this.listdata.filter(item => {
					return item.ischeck
				})
				if (changelist && changelist.length > 0) {
					for (let i = 0; i < changelist.length; i++) {
						if (i === changelist.length - 1) {
							changeid = changeid + String(changelist[i].id)
							changename = changename + String(changelist[i].name)
						} else {
							changeid = changeid + String(changelist[i].id) + ','
							changename = changename + String(changelist[i].name) + ','
						}
					}
				}
				this.$emit('confirm', changeid, changename)
			},
			// 取消
			cancel() {
				this.$emit('cancel')
			},
			changePicker(index) {
				if (this.type === 'radio') {
					this.listdata = this.listdata.map(item => {
						item.ischeck = false
						return item
					})
					this.listdata[index].ischeck = true
					this.confirm()
				} else {
					if (this.listdata[index].ischeck) {
						this.listdata[index].ischeck = false
					} else {
						this.listdata[index].ischeck = true
					}
				}
				this.$forceUpdate()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.picker-box{
		height: 100rpx;
	}
</style>
