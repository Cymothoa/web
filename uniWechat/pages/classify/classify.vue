<template>
	<view class="classify">
		<!-- 搜索框 -->
		<van-search :value="value" placeholder="请输入搜索关键词" />
		<!-- 分类选择 -->
		<van-tree-select :items="categoryList" :main-active-index="active" @click-nav="selectMain">
			<!-- 右侧content -->
			<template #content>
				<image :src="categoryList[active].pic" mode="" class="banner"></image>
				<van-card
				  v-for="(item,index) in pageProdList" :key="index"
				  :num="item.totalStocks"
				  :price="item.price"
				  :desc="item.brief"
				  :title="item.prodName"
				  :thumb="item.pic"
				/>
			</template>
		</van-tree-select>
	</view>
</template>

<script>
	import {
		categoryInfo,
		pageProd
	} from "@/api/type.js"
	export default {
		data() {
			return {
				value: "",
				categoryList: [],
				active: 0,
				pageProdList:[],
			}
		},
		async onLoad() {
			this.categoryList = await categoryInfo();
			console.log(this.categoryList,"cateList")
			// this.pageProdList = await pageProd({categoryId:this.active});
			// console.log(this.pageProdList,"商品列表")
			this.getList();
		},
		methods: {
			selectMain(event){
				this.active=event.detail.index;
			},
			getList(){
				pageProd({
					categoryId:this.active
				}).then(res=>{
					console.log(res,"商品列表")
				})
			}
		}
	}
</script>

<style>
	.banner{
		width: 100%;
		height: 200rpx;
	}
</style>