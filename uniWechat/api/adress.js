import service from "@/utils/request.js";

// 用户涉及地址列表
export function prodInfo(){
	return service({
		url:"/p/address/list",
		method:"get"
	})
}