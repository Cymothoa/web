<template>
	<view class="detail">
		<!-- 轮播图 -->
		<view class="uni-margin-wrap">
			<swiper class="swiper" circular :indicator-dots="indicatorDots" autoplay="true" interval="2500"
				indicatorDots="true" duration="500">
				<swiper-item v-for="(item,index) in prodInfoList" :key="index">
					<image :src="item.pic" mode="" class="oneofImg"></image>
				</swiper-item>
			</swiper>
		</view>
		<van-divider borderColor="#dfdfdf"></van-divider>
		<!-- 商品信息 -->
		<view class="" style="margin: 12px 10px;">
			<van-row>
			  <van-col span="18">
				  <view class="prodLeft">
				  	<view class="plTop">
				  		{{productList.prodName}}
				  	</view>
					<view class="plBottom">
						{{productList.brief}}
					</view>
				  </view>
			  </van-col>
			  <van-col span="6">
				  <view class="prodRight" @click="addCollection" >
				  	<van-icon name="like-o" v-if="isCollection" />
					<van-icon name="like" v-if="!isCollection"/>
					<text style="margin-left: 20rpx;">收藏</text>
				  </view>
			  </van-col>
			</van-row>
			<view class="prodPrice">
				￥{{productList.price}}
			</view>
		</view>
		<!-- 已选 -->
		<view style="height: 100rpx;background-color: #dfdfdf;"></view>
	</view>
</template>

<script>
	import {
		prodInfo,
		isCollection
	} from '@/api/detail.js'
	export default {
		data() {
			return {
				// 轮播列表
				prodInfoList: [],
				// 商品列表
				productList:[],
				isCollection:false,
			}
		},
		async onLoad(options) {
			// console.log(options,'id');
			let result = await prodInfo({
				prodId: options.id
			});
			this.prodInfoList = result.skuList;
			// console.log(result, 'result');
			this.productList = result;
			// 收藏
			// isCollection({
			// 	prodId:options.id
			// }).then(res=>{
			// 	console.log(res,"收藏")
			// 	this.isCollection=res;
				
			// })
		},
		methods:{
			addCollection(){
				this.isCollection=!this.isCollection;
			}
		}
	}
</script>

<style lang="less">
	.uni-margin-wrap {
		swiper {
			width: 100%;
			height: 600rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}
	}
	.prodLeft{
		.plTop{
			font-size: 36rpx;
		}
		.plBottom{
			font-size: 24rpx;
			margin: 10rpx 0;
		}
	}
	.prodPrice{
		font-size: 36rpx;
		color: #f00;
	}
</style>