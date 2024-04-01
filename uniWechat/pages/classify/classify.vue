<template>
	<view class="classify">
		<!-- 搜索框 -->
		<van-search :value="value" placeholder="请输入搜索关键词" />
		<!-- 分类选择 -->
		<van-tree-select :items="categoryList" :main-active-index="active" @click-nav="selectMain" height="100vh">
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
				  @click.native="goDetail(item)"
				></van-card>
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
			// console.log(this.categoryList,"cateList")
			// this.pageProdList = await pageProd({categoryId:this.active});
			// console.log(this.pageProdList,"商品列表")
			
			// 分类选择左侧的文本渲染
			this.categoryList.map((item)=>{
				item.text=item.categoryName;
			})
			this.getList();
		},
		methods: {
			// 点击分类选择左侧触发的事件
			selectMain(event){
				// console.log(event,'select');
				this.active=event.detail.index;
				this.getList(this.active);
			},
			// 切换右侧渲染
			getList(event){
				let index=event?event:this.active;
				pageProd({
					// 根据左侧关键词匹配右侧页面渲染 这里是匹配分类id
					categoryId:this.categoryList[index].categoryId
				}).then(res=>{
					this.pageProdList=res.records;
					// console.log(res,"商品列表")
				})
			},
			goDetail(event){
				// console.log(event,'event')
				uni.navigateTo({
					url:`/pages/detail/detail?id=${event.prodId}`
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