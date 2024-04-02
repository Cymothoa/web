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
					<view class="prodRight" @click="addCollection">
						<van-icon name="like-o" v-if="isCollection" />
						<van-icon name="like" v-if="!isCollection" />
						<text style="margin-left: 20rpx;">收藏</text>
					</view>
				</van-col>
			</van-row>
			<view class="prodPrice">
				￥{{productList.price}}
			</view>
		</view>
		<view style="height: 66rpx;background-color: #ebebeb;"></view>
		<!-- 已选 -->
		<view class="choose">
			<view class="left">
				已选：
				<text>{{defaultStr.skuName}}</text>
			</view>
			<view class="right">
				<van-icon name="ellipsis" />
			</view>
		</view>
		<view style="height: 66rpx;background-color: #ebebeb;"></view>
		<!-- 评论 -->
		<view class="comm">
			<!-- 好评 -->
			<!-- <view class="goodComm">
				<view class="left">
					评价：
					<text>好评{{}}</text>
				</view>
				<view class="right">
					<text>共{{}}条</text>
					<van-icon name="arrow" />
				</view>
			</view> -->
			<van-cell-group>
				<van-cell value="共0条" is-link>
					<template #title>
						<view>评价：<text>好评{{}}%</text></view>
					</template>
				</van-cell>
			</van-cell-group>
		</view>
	</view>
</template>

<script>
	import {
		prodInfo,
		isCollection,
		prodComm
	} from '@/api/detail.js'
	export default {
		data() {
			return {
				// 轮播列表
				prodInfoList: [],
				// 商品列表
				productList: [],
				// 该商品是否收藏
				isCollection: false,
				// 默认已选
				defaultStr: {},
				// 评论
				prodCommList: [],
				common: {
					negativeNumber: 0, //差评数
					number: 0, //评论数
					picNumber: 0, //带图评论数
					positiveRating: 0, //好评率
					praiseNumber: 0, //好评数
					secondaryNumber: 0, //中评数
				}
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
			// 默认已选
			this.init(result.skuList);
			// 评论
			this.prodCommList = prodComm({
				prodId: options.id
			});
			// console.log(this.prodCommList,"prodCommList")
			this.common = this.prodCommList.data;
			console.log(this.common, "prodCommList")

		},
		methods: {
			addCollection() {
				this.isCollection = !this.isCollection;
			},
			init(main) {
				// console.log(main,"skulist")
				const properties = [];
				// 拆分skulist数组
				for (var i = 0; i < main.length; i++) {
					properties.push(main[i].properties);
					// console.log(properties+"properties"+i);
				}
				// console.log(properties,"properties");
				// 拆分所有选项的properties的每一项
				for (var i = 0; i < properties.length; i++) {
					let propArr = properties[i];
					let propStr = properties[i].split(";");
					// console.log(propStr,"propStr");
					this.defaultStr = main[i];
					// console.log(this.defaultStr,'defaultStr')
				}
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

	.prodLeft {
		.plTop {
			font-size: 36rpx;
		}

		.plBottom {
			font-size: 24rpx;
			margin: 10rpx 0;
		}
	}

	.prodPrice {
		font-size: 36rpx;
		color: #f00;
	}

	.choose {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 12px 10px;
	}

	.comm {
		.goodComm {
			// padding: 12px 10px;
			display: flex;
			justify-content: space-between;
		}
	}
</style>