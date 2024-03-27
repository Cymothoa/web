import request from "@/utils/request.js";

export function toLogin(data){
	return request({
		url:"/login",
		method:"post",
		data:data
	})
}

export function toRegister(data){
	return request({
		url:"/user/register",
		method:"post",
		data:data
	})
}