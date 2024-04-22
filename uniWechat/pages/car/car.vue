<!-- <template>
	<view class="car">
		购物车
	</view>
</template>

<script>
	import {
		shopCartInfo
	} from "@/api/car.js"
	export default {
		data() {
			return {
				shopCartList: {
					additionalProp1: {
						basketId: 0,
						discountId: 0
					},
					additionalProp2: {
						basketId: 0,
						discountId: 0
					},
					additionalProp3: {
						basketId: 0,
						discountId: 0
					}
				}
			}
		},
		async onLoad(){
			shopCartInfo(this.shopCartList).then(res=>{
				console.log(res,"res")
			})
		},
		methods: {},
	}
</script>

<style>
</style> -->
<template>
	<view class="shop-cart">
		<van-cell :title="defaultAddr === '' ? '默认收货地址' : defaultAddr" is-link link-type="navigateTo"
			url="/pages/address/address" />
		<view style="height: 25rpx;"></view>
		<view class="cards-list">
			<view v-for="(item,index) in shopCartInfo" :key="index">
				<van-row v-for="(items,index1) in item.shopCartItemDiscounts[0].shopCartItems" :key="items.basketId">
					<van-col span="2">
						<van-checkbox @click.native="basketClick" @change="onChange" :data-param1="items.basketId"
							:value="items.isCheck"></van-checkbox>
					</van-col>
					<van-col span="22">
						<text class="shop-name">{{ item.shopName }}</text>
						<van-card :num="items.prodCount" :price="items.price" :desc="items.skuName"
							:title="items.prodName" :thumb="items.pic">
							<template #footer>
								<van-stepper :value="items.prodCount" :data-param1="items" async-change
									@change="changeThing" integer />
							</template>
						</van-card>
					</van-col>
				</van-row>
				<van-divider />
			</view>
			<van-empty v-if="shopCartInfo <= 0" />
			<van-submit-bar :price="totalMoney" button-text="提交订单" @submit="onSubmit">
				<van-checkbox :value="checkedAll" @change="allProdSelected">全选</van-checkbox>
				<a class="clear-cart" v-if="basketIds.length > 0" @click="clearCart">清空</a>
			</van-submit-bar>
		</view>
	</view>
</template>

<script>
	import {
		shopCartInfo,
		totalPay,
		changeItem,
		deleteItem
	} from '@/api/shop.js'
	import {
		prodInfo
	} from '@/api/adress.js'
	export default {
		data() {
			return {
				checkedAll: false,
				shopCartInfo: [],
				value: 0,
				basketIds: [],
				totalMoney: 0,
				addresslist: [],
				defaultAddr: "",
				defaultAddrId: 0,
				changeItemList: {
					basketId: 0,
					prodId: 0,
					skuId: 0,
					shopId: 0,
					count: 0,
					distributionCardNo: ""
				},
				confirm: {
					basketIds: [],
					orderItem: {
						prodId: 0,
						skuId: 0,
						prodCount: 1,
						shopId: 0,
						distributionCardNo: ""
					},
					addrId: 0,
					userChangeCoupon: 0,
					couponIds: []
				},
			}
		},
		async onShow() {
			this.init();
			this.checkedAll = false;
		},
		methods: {
			onChange(event) {
				let shop = this.shopCartInfo[0].shopCartItemDiscounts[0].shopCartItems;
				setTimeout(() => {
					if (this.basketIds.length == shop.length) {
						this.checkedAll = true;
					} else {
						this.checkedAll = false;
					}
				}, 100)
				shop.forEach((obj) => {
					if (obj.basketId === event.currentTarget.dataset.param1) {
						obj.isCheck = event.detail;
						// this.basketIds.push
					}
				})
			},
			onSubmit() {
				if (this.basketIds.length <= 0) return;
				this.confirm.basketIds = this.basketIds
				this.confirm.addrId = this.defaultAddrId
				uni.setStorageSync("confirm", JSON.stringify(this.confirm))
				uni.navigateTo({
					url: "/pages/order/order"
				})
			},
			changeThing(event) {
				let value = event.detail;
				let items = event.currentTarget.dataset.param1;
				this.shopCartInfo[0].shopCartItemDiscounts[0].shopCartItems.forEach((obj) => {
					if (obj.basketId === items.basketId) {
						obj.prodCount = value;
					}
				})
				if (items.prodCount === value) {
					return;
				}
				let count = 1;
				if (items.prodCount > value) {
					count = -1;
				}
				this.onStepperChange(items, count, () => {
					items.prodCount = value
					setTimeout(() => {
						if (this.basketIds.includes(items.basketId)) {
							totalPay(this.basketIds).then(res => {
								this.totalMoney = res.finalMoney * 100
							})
						}
					}, 200)
				})
			},
			async init() {
				shopCartInfo({}).then(res => {
					this.shopCartInfo = res;
					this.shopCartInfo[0].shopCartItemDiscounts[0].shopCartItems.map((obj) => {
						obj.isCheck = false;
						return obj;
					})
					this.basketClick();
				})
				this.addresslist = await addressList()
				for (const key in this.addresslist) {
					if (Object.hasOwnProperty.call(this.addresslist, key)) {
						if (this.addresslist[key].commonAddr === 1) {
							const result = this.addresslist[key]
							this.defaultAddrId = this.addresslist[key].addrId
							this.defaultAddr = result.province + " " + result.city + " " +
								result.area + " " + result.addr
						}
					}
				}
			},
			async basketClick(event) {
				if (event) {
					let param = event.currentTarget.dataset.param1 || event.basketIds;
					this.basketIds.push(param)
					this.basketIds = this.removeDuplicates(this.basketIds);
				} else {
					this.basketIds = []
				}
				const result = await totalPay(this.basketIds);
				this.totalMoney = result.finalMoney * 100;
			},
			removeDuplicates(arr) {
				for (let i = 0; i < arr.length; i++) {
					for (let j = i + 1; j < arr.length; j++) {
						if (arr[i] === arr[j]) {
							arr.splice(j, 1); // 删除相同的元素
							arr.splice(i, 1);
							i--; // 更新索引，以便继续比较下一个元素
							break;
						}
					}
				}
				return arr;
			},
			allProdSelected(event) {
				this.checkedAll = event.detail;
				let shop = this.shopCartInfo[0].shopCartItemDiscounts[0].shopCartItems;

				if (this.checkedAll == true) {
					shop.forEach((obj) => {
						obj.isCheck = true;
						this.basketIds.push(obj.basketId);
					})
					this.total(this.basketIds);
				} else {
					shop.forEach((obj) => {
						obj.isCheck = false;
					})
					this.basketIds = [];
					this.total(this.basketIds);
				}
			},
			async total(event) {
				setTimeout(()=>{
					totalPay(event).then(res => {
						this.totalMoney = res.finalMoney * 100;
					})
						
				},100)
			},
			clearCart() {
				deleteItem(this.basketIds).then(r => {
					this.init();
				})
			},
			onStepperChange(items, value, callback) {
				this.changeItemList.basketId = items.basketId;
				this.changeItemList.prodId = items.prodId;
				this.changeItemList.skuId = items.skuId;
				this.changeItemList.shopId = items.shopId;
				this.changeItemList.count = value;
				this.changeItemList.distributionCardNo = "";
				changeItem(this.changeItemList).then(res => {
					console.log(res, 'eee')
				})
				callback();
			},
		}
	}
</script>

<style lang='less'>
	.shop-cart {
		background-color: #fafafa;
		height: 100%;

		.clear-cart {
			margin-left: 1rem;
			color: #333;
		}

		.van-submit-bar {
			position: fixed;
			bottom: 0;
			left: 0;
		}

		.cards-list {
			padding-right: 0.5rem;
			padding-left: 0.5rem;
			background-color: #fff;
			padding-bottom: 100rpx;

			.van-row {
				.van-col--2 {
					margin-top: 6rem;
				}

				.van-col {
					.shop-name {
						display: inline-block;
						height: 2.5rem;
						text-align: left;
						width: 100%;
						margin-top: 1rem;
						font-weight: 600;
					}

					.van-card {
						background-color: #fff;
					}
				}

			}
		}
	}
</style>
