import service from "@/utils/request.js";

// 用户涉及地址列表
export function prodInfo(){
	return service({
		url:"/p/address/list",
		method:"get"
	})
}

// 根据地址id，设置默认地址
export function defaultAddr(addrId) {
	return service({
		url: '/p/address/defaultAddr/' + addrId,
		method: 'put'
	})
}

// 新增用户地址
export function addAddr(data) {
	return service({
		url: '/p/address/addAddr',
		method: 'post',
		data: data
	})
}

// 获取省市区信息
export function listByPid(data) {
	return service({
		url: '/p/area/listByPid',
		method: 'get',
		data: data
	})
}

// 修改用户地址
export function updateAddr(data) {
	return service({
		url: '/p/address/updateAddr',
		method: 'put',
		data: data
	})
}


// 根据地址id，删除用户地址
export function deleteAddress(addrId) {
  return service({
    url: '/p/address/deleteAddr/' + addrId,
    method: 'delete'
  }) 
}