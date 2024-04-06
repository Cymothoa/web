<template>
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
</style>