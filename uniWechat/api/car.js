import service from "@/utils/request.js";

// 获取购物车物品
export function shopCartInfo(data){
	return service({
		url:"/p/shopCart/info",
		method:"post",
		params:data
	})
}