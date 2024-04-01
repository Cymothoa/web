import request from "@/utils/request.js";
import service from "@/utils/request.js";

// 商品详情信息
export function prodInfo(data){
	return request({
		url:"/prod/prodInfo",
		method:"get",
		params:data
	})
}

// 根据商品id获取该商品是否在收藏夹中
export function isCollection(data){
	return service({
		url:"/p/user/collection/isCollection",
		method:"get",
		params:data
	})
}