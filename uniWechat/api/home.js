import service from "@/utils/request.js";

// 轮播图
export function indexImgs(){
	return service({
		url:"/indexImgs",
		method:"get"
	})
}

// 置顶公告
export function indexNot(){
	return service({
		url:"/shop/notice/noticeList",
		method:"get"
	})
}

// 商品信息
export function indexProduct(){
	return service({
		url:"/prod/tagProdList",
		method:"get"
	})
}