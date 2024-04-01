<template>
	<view class="home">
		<!-- 搜索框 -->
		<van-search :value="value" placeholder="请输入搜索关键词" />
		<!-- 轮播图 -->
		<view class="uni-margin-wrap">
			<swiper class="swiper" circular :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval"
				:duration="duration">
				<swiper-item v-for="(item,index) in bannerList" :key="index">
					<image :src="item.imgUrl" mode="" class="oneofImg"></image>
				</swiper-item>
			</swiper>
		</view>
		<!-- 分类 -->
		<van-grid>
			<van-grid-item icon="new-arrival-o" text="新品特惠" />
			<van-grid-item icon="underway-o" text="限时特惠" />
			<van-grid-item icon="hot-o" text="每日疯抢" />
			<van-grid-item icon="coupon-o" text="抢优惠券" />
		</van-grid>
		<!-- 公告 -->
		<van-notice-bar left-icon="volume-o" :scrollable="false">
			<swiper class="noticeSwiper" vertical="true" circular :indicator-dots="indicatorDots" :autoplay="autoplay"
				:interval="interval" :duration="duration">
				<swiper-item v-for="(item,index) in text" :key="index" class="noticeItem">
					<view class="title">
						{{item.title}}
					</view>
				</swiper-item>
			</swiper>
		</van-notice-bar>
		<!-- 商品 -->
		<view v-for="(item,index) in productList" :key="index">
			<view class="plPart">
				<view class="plpTitle">
					<view class="title" style="margin-left: 40rpx;">
						{{item.title}}
					</view>
					<view class="" style="margin-right: 40rpx;">
						查看更多
					</view>
				</view>
				<view class="plpContent">
					<view v-for="(items,index1) in item.productDtoList" :key="index1" class="pcBox" @click.native="goDetail(items)">
						<image :src="items.pic" mode=""></image>
						<view class="prodName">{{items.prodName}}</view>
						<view class="prodPrice">￥{{items.price}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		indexImgs,
		indexNot,
		indexProduct
	} from "@/api/home.js";
	export default {
		data() {
			return {
				value: "",
				bannerList: [],
				text: [],
				productList: [],
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500
			}
		},
		onLoad() {
			uni.startPullDownRefresh();
			setTimeout(()=>{
				this.imgsDisplay();
				this.notDisplay();
				this.proDisplay();
			},1000)
		},
		onPullDownRefresh() {
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 2000);
		},
		methods: {
			imgsDisplay() {
				indexImgs().then(res => {
					this.bannerList = res;
				}).catch(err => {
					console.log(err);
				})
			},
			notDisplay() {
				indexNot().then(res => {
					this.text = res.records;
					// console.log(res, "res noti")
				}).catch(err => {
					console.log(err);
				})
			},
			proDisplay() {
				indexProduct().then(res => {
					this.productList = res;
					// console.log(res, "res pro")
					// console.log(res, "res prolist")
				}).catch(err => {
					console.log(err);
				})
			},
			goDetail(value){
				// console.log(value,"value");
				// console.log(value.prodId,"value");
				uni.navigateTo({
					url:`/pages/detail/detail?id=${value.prodId}`
					// url:'/pages/detail/detail'
				})
			}
		}
	}
</script>

<style lang="scss">
	.uni-margin-wrap {
		width: 690rpx;
		width: 100%;
	}

	.oneofImg {
		width: 100%;
	}

	.noticeSwiper {
		width: 668rpx;
	}

	.plPart {
		margin-top: 30rpx;

		.plpTitle {
			display: flex;
			justify-content: space-between;
		}
	}

	.plpContent {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-evenly;
	}

	.pcBox {
		width: 200rpx;
		margin-top: 30rpx;

		image {
			width: 200rpx;
			height: 200rpx;
			border-radius: 10rpx;
		}

		.prodName {
			height: 50rpx;
			width: 200rpx;
			overflow: hidden;
			font-size: 20rpx;
			text-overflow: ellipsis;
		}

		.prodPrice {
			color: red;
			font-size: 28rpx;
		}
	}
</style>