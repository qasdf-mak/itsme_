<template>
<view class="width-full lh1">
	<view class="nearby-box width-full float-hidden relative">
		<image src="../../static/itsme/itsme_16.png" class="width-full" mode="widthFix"></image>
		<view v-for="(item,index) in nearbyLine" :key="index">
			<view class="absolute top bottom left right flex align-items-center flex-center" v-if="nearbyIndex.indexOf(index) !== -1">
				<view class="nearby-line"></view>
			</view>
		</view>
		<view class="absolute top bottom left right flex align-items-center flex-center">
			<view class="user-avatar">
				<image :src="user.avatar | imageFilter('m11')" class="user-avatar" mode="aspectFill"></image>
			</view>
		</view>
		<view class="absolute top bottom left right">
			<view class="width-full height relative">
				<view v-for="(item,index) in userData" :key="index">
					<view class="user-item-box absolute" :class="'user-item-' + (index + num)">
						<view class="width-full height relative">
							<image src="../../static/itsme/itsme_17.png" class="user-item-bg" mode="widthFix"></image>
							<view class="absolute top bottom left right">
								<image :src="item.avatar | imageFilter('m11')" class="user-item-img" mode="aspectFill"></image>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</view>
</template>

<script>
	export default {
		name: 'nearby-box',
		data() {
			return {
				nearbyLine: [1, 2, 3, 4, 5, 6, 7],
				nearbyIndex: [],
				time: 0,
				nearbyTime: null,
				userData: [],
				num: 10
			}
		},
		props: {
			userList: Array
		},
		computed: {
			userItem0 () {
				return 'top: 100rpx; left: 200rpx'
			}
		},
		mounted() {
			let numdata = [0, 5, 10]
			let numindex = Math.floor(Math.random() * (3 - 0))
			this.num = numdata[numindex]
			this.nearbyTime = setInterval(this.setLine, 500)
		},
		methods: {
			setLine() {
				this.time = this.time + 500
				if (this.time === 500) {
					this.nearbyIndex = [1]
				}
				if (this.time === 1000) {
					if (this.userList && this.userList.length > this.userData.length) {
						this.userData.push(this.userList[this.userData.length])
					}
					this.nearbyIndex = [1, 2]
				}
				if (this.time === 1500) {
					if (this.userList && this.userList.length > this.userData.length) {
						this.userData.push(this.userList[this.userData.length])
					}
					this.nearbyIndex = [1, 2, 3]
				}
				if (this.time === 2000) {
					if (this.userList && this.userList.length > this.userData.length) {
						this.userData.push(this.userList[this.userData.length])
					}
					this.nearbyIndex = [1, 2, 3, 4]
				}
				if (this.time === 2500) {
					if (this.userList && this.userList.length > this.userData.length) {
						this.userData.push(this.userList[this.userData.length])
					}
					this.nearbyIndex = [1, 2, 3, 4, 5]
				}
				if (this.time === 3000) {
					if (this.userList && this.userList.length > this.userData.length) {
						this.userData.push(this.userList[this.userData.length])
					}
					this.nearbyIndex = [1, 2, 3, 4, 5, 6]
				}
				if (this.time === 3500) {
					if (this.userList && this.userList.length > this.userData.length) {
						this.userData.push(this.userList[this.userData.length])
					}
					this.nearbyIndex = [1, 2, 3, 4, 5, 6, 7]
					this.$emit('closeNearby')
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.nearby-box{
		margin-top: 200rpx;
		height: calc(100vh - 300rpx);
	}
	.nearby-line{
		opacity: 0.7;
		border: 2rpx solid #FFFFFF;
		animation: fade-in;/*动画名称*/
		animation-duration: 3s;/*动画持续时间*/  
		-webkit-animation:fade-in 3s;/*针对webkit内核*/  
	}
	@keyframes fade-in {
	    0% {
				width: 100rpx;
				height: 100rpx;
				border-radius: 100rpx;
			}/*初始状态 透明度为0*/   
	    100% {
				width: 100vw;
				height: 100vw;
				border-radius: 100vw;
				opacity: 0;
			}/*结束状态 透明度为1*/  
	}  
	@-webkit-keyframes fade-in {/*针对webkit内核*/  
	   0% {
	   	width: 100rpx;
	   	height: 100rpx;
	   	border-radius: 100rpx;
	   }/*初始状态 透明度为0*/   
	   100% {
	   	width: 100vw;
	   	height: 100vw;
	   	border-radius: 100vw;
			opacity: 0;
	   }/*结束状态 透明度为1*/  
	}
	.user-avatar{
		width: 150rpx;
		height: 150rpx;
		border-radius: 150rpx;
		overflow: hidden;
	}
	.user-item-box{
		width: 50rpx;
		animation: fade-user;/*动画名称*/
		animation-duration: 1s;/*动画持续时间*/  
		-webkit-animation:fade-user 1s;/*针对webkit内核*/ 
	}
	.user-item-bg{
		width: 50rpx;
	}
	.user-item-img{
		width: 40rpx;
		height: 40rpx;
		border-radius: 40rpx;
		overflow: hidden;
		border: 5rpx solid #fff;
	}
	@keyframes fade-user {
	    0% {
				opacity: 0.1;
			}/*初始状态 透明度为0*/   
	    100% {
				opacity: 1.0;
			}/*结束状态 透明度为1*/  
	}  
	@-webkit-keyframes fade-user {/*针对webkit内核*/  
	   0% {
	   	opacity: 0.1;
	   }/*初始状态 透明度为0*/   
	   100% {
	   	opacity: 1.0;
	   }/*结束状态 透明度为1*/  
	}
	.user-item-0{
		top: 400rpx;
		left: 250rpx
	}
	.user-item-1{
		top: 600rpx;
		left: 400rpx
	}
	.user-item-2{
		top: 300rpx;
		left: 500rpx
	}
	.user-item-3{
		top: 500rpx;
		left: 500rpx
	}
	.user-item-4{
		top: 600rpx;
		left: 100rpx
	}
	.user-item-5{
		top: 450rpx;
		left: 250rpx
	}
	.user-item-6{
		top: 600rpx;
		left: 200rpx
	}
	.user-item-7{
		top: 600rpx;
		left: 400rpx
	}
	.user-item-8{
		top: 300rpx;
		left: 500rpx
	}
	.user-item-9{
		top: 600rpx;
		left: 600rpx
	}	
	.user-item-10{
		top: 500rpx;
		left: 500rpx
	}
	.user-item-11{
		top: 400rpx;
		left: 300rpx
	}
	.user-item-12{
		top: 650rpx;
		left: 300rpx
	}
	.user-item-13{
		top: 600rpx;
		left: 500rpx
	}
	.user-item-14{
		top: 600rpx;
		left: 100rpx
	}
</style>
