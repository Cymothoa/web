import service from "@/utils/request.js";

export function toLogin(data){
	return service({
		url:"/login",
		method:"post",
		data:data
	})
}

export function toRegister(data){
	return service({
		url:"/user/register",
		method:"post",
		data:data
	})
}