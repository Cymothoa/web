import service from "@/utils/request.js";

// 结算，生成订单信息
export function confirm(data){
	return service({
		url:"/p/order/confirm",
		method:"post",
		params:data
	})
}