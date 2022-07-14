<template>
	<view class="width-full height100vh bg-itsme-1">
		<view class="width-full height100vh border-box bg-itsme-1 popo" :style="'padding-top:' + StatusBar + 'px;'">
			<view class="fixed top left right bg-itsme-1">
				<view class="width-full top-nav fs18 color-white fw600 text-center"
					style="background: #1A1A1F  !important; height: 123rpx;"></view>
			</view>
			<view class="" style="height: 100rpx; background: #1A1A1F  !important;">
				<view class="width-full pt15 pb15 pl12 pr12 border-box flex align-items-center fixed"
					style="background: #1A1A1F  !important; height: 123rpx;">
					<view class="flex-1 flex align-items-center search-box bg-itsme-4 pl25 pr25">
						<image src="../../static/itsme/itsme_54.png" class="search-img" mode="widthFix"></image>
						<u-input v-model="searchText" class="fs14 color-white ml10" type="text" placeholder="输入昵称查找"
							maxlength="30" placeholderStyle="color: #9e9e9f" :border="false" :clearable="false"  :custom-style="{'color': '#9e9e9f'}"
							@input="$u.debounce(inputSearch, 500)" @click='xianshiyincang' @confirm="confirmInput"
							confirm-type="搜索" />
					</view>
					<view class="ml5 pl8 pr5 fs14 color-itsme-9" @click="cancelInput">
						取消
					</view>
				</view>
			</view>
			<!-- 主体列表 begin -->
			<view class="width-full bg-itsme-1" v-if="searchBegin">
				<view class="width-full mt15" v-if="beautyList && beautyList.length > 0">
					<view v-for="(item,index) in beautyList" :key="index">
						<itsme-index :item="item" :isLogin="isLogin" @changeLike="changeLike(index)" @openBounced="openBounced"
							@userRefuse="userRefuse"></itsme-index>
					</view>
					<view class="width-full pt15 pb15" v-if="beautyList && beautyList.length > 0 && pages.finish">
						<u-divider>没有更多了</u-divider>
					</view>
				</view>
				<view class="pl20 pt20 fs14 color-shallow" v-else>
					暂无搜索结果
				</view>
			</view>
			<view class="width-full mt10" v-else>

				<!-- 推荐搜索 -->
				<view class="width-full mt20 mb25 pl35 pr20 mr20 border-box bg-itsme-1">
					<view class="width-full flex align-items-center flex-between">
						<view class="fs14 color-itsme-9 fw600">
							推荐搜索
						</view>
					</view>
					<view class="xuanzekuang bg-itsme-4 color-itsme-9 mt15 mr10 text-center lh pl20 pr20" v-for="(item,index) in tuijianleibiao"
						:key="index" @click="recommendation(index)">
						{{item.name}}
					</view>
					<!-- 线条 -->
					<view class="line"></view>
					<!-- 线条 -->
				</view>

				<!-- 推荐搜索 -->

				<view class="width-full mt35 pl35 pr20 border-box bg-itsme-1">
					<view class="width-full flex align-items-center flex-between">
						<view class="fs14 color-itsme-9 fw600">
							历史搜索
						</view>
						<view class="icon_font fs16 color-itsme-9" @click="delKey">
							&#xe686;
						</view>
					</view>
					<view class="width-full mt35">
						<view v-for="(item,index) in userSearchList" :key="index">
							<view class="width-full fs14 color-itsme-9 nowrap1 mb20" @click="toSearchKey(item)">
								{{item}}
							</view>
						</view>
						<view class="width-full fs14 color-itsme-9"
							v-if="!userSearchList || (userSearchList && userSearchList.length === 0)">
							暂无搜索历史
						</view>
					</view>
				</view>

			</view>
		</view>
		<!-- 完善资料 -->
		<view class="width-full" v-if="showPerfectPop">
			<perfect-pop @refreshTheList="refreshTheList" @closePerfectPop="toHidePerfectPop">
			</perfect-pop>
		</view>
		<!-- 完善资料 -->
		<view v-if="showRedPacket">
			<red-packet></red-packet>
		</view>
		<!-- 充值vip弹框 -->
		<member-pay :showMemberPay="showMemberPay" :powerData="powerData" :centent="memberCentent" 
			@closePop="showMember(powerData)" @paySuccess="showMemberPay = false">
		</member-pay>
		<!-- 充值vip弹框 -->
	</view>
</template>

<script>
	import itsmeIndex from '../../components/itsme/index.vue'
	import ItsmeService from '../../common/service/itsme-service.js'
	export default {
		data() {
			return {
				beautyList: [],
				searchText: '',
				userSearchList: [],
				searchList: null,
				powerData:null,
				memberCentent:'',
				searchBegin: false,
				showMemberPay:false,
				xianshi: true,
				isLogin: false, // 登录状态
				pages: {
					page: 1,
					finish: false
				},
				tuijianleibiao: [{
						name: '等待花开'
					},
					{
						name: 'Andreass'
					},
					{
						name: '梨蕊'
					},
					{
						name: '小刘同学'
					},
					{
						name: '甜茶'
					},
					{
						name: '乐乐'
					},
					{
						name: '木头会开花'
					},
				]
			}
		},
		onLoad() {
			this.init()
		},
		onReachBottom() {
			if (!this.pages.finish) {
				console.log(123456)
				this.pages.page++
				this.getBeautyList(this.searchText)
			}
		},
		components: {
			itsmeIndex
		},
		watch: {
			powerData() {
				if (this.powerData.look >= this.powerData.total) {
					console.log(123)
					return this.memberCentent = ' 您今天的次数已经用完了 非会员每日只能查看' + this.powerData.total + '位用户  '
		
				} else {
					console.log(321)
					let number = this.powerData.total - this.powerData.look
					return this.memberCentent = '您今天还能查看' + number + '位用户 非会员每日只能查看' + this.powerData.total + '位用户  '
				}
			}
		},
		computed: {

		},
		methods: {
			init() {
				Object.assign(this.$data, this.$options.data())
				this.loginExpire().then(res => {
					if (this.isLogin !== res) {
						this.isLogin = res
						this.getKeyList()
						this.getBeautyList()
					}
				})

			},
			openBounced(data) {
				console.log('--------------------')
				if(this.user.gender === 0){
					uni.navigateTo({
						url: '/pages/itsme/home?id=' + data.id
					})
				}else{
					this.showMemberPay = true
					this.powerData = data
				}
			},
			getKeyList() {
				ItsmeService.keylist().then(res => {
					if (res.code === 1) {
						this.searchList = res.data.filter(item => {
							return item.keyword && item.keyword !== 'undefined'
						}).splice(0, 10)
					}
				})
			},
			xianshiyincang() {
				this.xianshi = false
			},

			// 喜欢不喜欢
			changeLike(index) {
				if (this.beautyList[index].like === 1) {
					this.beautyList[index].like = 0
				} else {
					this.beautyList[index].like = 1
				}
			},
			delKey() {
				let that = this
				 uni.removeStorage({
				     key: 'user_search',
				     success: function (res) {
				         uni.showToast({
				         	title:'删除成功',
							icon:'none'
				         })
						 that.init()
				     }
				 });
			},
			toSearchKey(keyword) {
				console.log(keyword)
				this.searchText = keyword
				this.searchBegin = true
				this.beautyList = []
				this.pages.page = 1
				this.pages.finish = false
				this.getBeautyList(keyword)
			},
			inputSearch() {
				if (this.searchText) {
					this.searchBegin = true
					this.beautyList = []
					this.pages.page = 1
					this.pages.finish = false
					this.getBeautyList(this.searchText)
				} else {
					this.getKeyList()
					this.beautyList = []
					this.pages.page = 1
					this.pages.finish = false
					this.searchBegin = false
				}
			},
			getBeautyList(name) {
				ItsmeService.index({
					nickname: name,
					page: this.pages.page
				}).then(res => {
					if (res.code === 1 && res.data && res.data.length > 0) {
						this.pages.finish = false
						this.beautyList = this.beautyList.concat(res.data.filter(exp => {
							return exp.expect = exp.expect.map(res => {
								let colors = ['#DFE6FD', '#E5FCF6', '#FDFDD7', '#F9E6FD',
									'#FDE3E2'
								]
								let rand = Math.floor(Math.random() * 5);
								let item = {}
								item.expect_id = res.expect_id
								item.name = res.name
								item.user_id = res.user_id
								item.color = colors[rand]
								return item
							})
						}))
					} else {
						this.pages.finish = true
					}
				})
				let that = this
				uni.getStorage({
				    key: 'user_search',
				    complete: function (res) {
						let status = false;
						if(res.data){
							if(that.userSearchList.length  >10){
								that.userSearchList.pop()
							}
							if(res.data.indexOf(name) === -1){
								status = true;
							}
							res.data.unshift(name)
							that.userSearchList = res.data
						}else{
							status = true;
							that.userSearchList = [name];
						}
						if(status){
							uni.setStorage({
								  key: 'user_search',
								    data: that.userSearchList,
								    success: function () {
								        console.log('success');
								    }
							})
						}
				    }
				});
				if (this.userSearchList && this.userSearchList.length > 0) {
					this.pages.finish = false
				} else {
					this.pages.finish = true
				}
				this.userSearchList = this.userSearchList.filter(item =>{
					if(item !== '' || item !== 'undefined'){
						return item
					}
				})
			},
			userRefuse(type, value) {
				// 女性非真人点击喜欢提示去真人认证
				if (type === 'like' && value === 1) {
					this.toShowPerfectPop()
				}
				// 同性不能点击喜欢
				if (type === 'like' && value === 2) {
					uni.showToast({
						title:"对方与您性别相同，只能观赏不能互动喔~",
						icon:'none'
					})
				}
			},
			cancelInput() {
				uni.navigateBack({
					delta: 1
				})
			},
			//推荐搜索
			recommendation(index) {
				this.searchText = this.tuijianleibiao[index].name
				this.searchBegin = true
				this.beautyList = []
				this.pages.page = 1
				this.pages.finish = false
				this.getBeautyList(this.tuijianleibiao[index].name)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.search-box {
		height: 66rpx;
		border-radius: 66rpx;
		box-shadow: 0 10rpx 20rpx 5rpx rgba(0, 0, 0, 0.10);
	}

	.search-img {
		width: 38rpx;
	}

	.xuanzekuang {
		height: 60rpx;
		display: inline-block;
		border-radius: 30rpx;
	}

	.lh {
		line-height: 60rpx;
	}
	.line {
		width: 630rpx;
		height: 1rpx;
		background: #23232d;
		margin-top: 45rpx;
	}
	.xuanfu {
		position: sticky;
		top: 1rpx;
		z-index: 999;
	}
</style>
