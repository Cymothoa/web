<template>
	<view class="my">
		<!-- 头像 -->
		<div class="header">
			<van-image round width="100" height="100" src="https://img.yzcdn.cn/vant/cat.jpeg" />
			<view class="name" style="margin-top: 20rpx;">何大歪</view>
		</div>
		<view style="height: 56rpx;background-color: #ebebeb;"></view>
		<!-- 我的订单 -->
		<view class="list">
			<view class="order">我的订单</view>
			<view class="all" @click="goList()">查看全部</view>
		</view>
		<view style="height: 24rpx;background-color: #ebebeb;"></view>
		<!-- 四宫格 -->
		<van-grid :border="false">
		  <van-grid-item icon="balance-pay" text="待付款" />
		  <van-grid-item icon="logistics" text="待发货" />
		  <van-grid-item icon="records-o" text="待收货" />
		  <van-grid-item icon="sign" text="已完成" />
		</van-grid>
	</view>
</template>

<script>
	import { orderCount } from "@/api/order.js"
	export default {
		data(){
			return{
				myOrder:{},
			}
		},
		methods:{
			goList(){
				uni.navigateTo({
					url:'/pages/list/list'
				})
			},
			async init(){
				this.myOrder=await orderCount();
				console.log(this.myOrder)
			}
		},
		onShow() {
			this.init();
		}
	}
</script>

<style lang="scss">
	.header{
		height: 380rpx;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.list {
		height: 66rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20rpx 0;
		margin: 0 16rpx;
		.all {
			color: #ccc;
		}
	}
</style>