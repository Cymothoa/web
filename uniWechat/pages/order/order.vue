<template>
	<view class="order">
		<!-- 默认地址 -->
		<van-cell icon="contact-o" is-link>
			<template #title>
				<view class="top">姓名：{{defaultArr===""?"":addressList[0].receiver+" "+addressList[0].mobile}}</view>
				<view class="bottom van-ellipsis" style="width: 500rpx;">地址：{{defaultArr===""?"展示默认地址":defaultArr}}</view>
			</template>
		</van-cell>
	</view>
</template>

<script>
	import { prodInfo } from '@/api/adress.js'
	import { confirm } from '@/api/order.js'
	export default{
		data(){
			return{
				addressList:[],
				defaultArr:"",
			}
		},
		onShow(){
			this.confirm=JSON.parse(uni.getStorageSync("confirm"));
			this.getAdress();
			this.getCard();
		},
		methods:{
			async getAdress() {
				this.addressList= await prodInfo();
				// console.log(this.addressList,'result');
				for(const key in this.addressList){
					if(Object.hasOwnProperty.call(this.addressList,key)){
						if(this.addressList[key].commonAddr===1){
							console.log(this.addressList[key]);
							const result = this.addressList[key];
							this.defaultArr=result.province+""+result.city+""+result.area+""+result.addr;
						}
					}
				}
			},
			async getCard() {
				let result = await confirm(this.confirm);
				console.log(result,"result");
			}
		}
	}
</script>

<style lang="less">
	.van-cell__left-icon-wrap{
		margin-top: 27rpx;
		padding-right: 20rpx;
	}
	.van-icon-arrow{
		margin-top: 48rpx;
	}
</style>