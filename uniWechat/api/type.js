import request from "@/utils/request.js";

export function categoryInfo(data){
	return request({
		url:"/category/categoryInfo",
		method:"get",
		params:data
	})
}

// 商品列表
export function pageProd(data){
	return request({
		url:"/prod/pageProd",
		method:"get",
		params:data
	})
}