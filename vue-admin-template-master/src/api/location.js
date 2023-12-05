import request from '@/utils/request'

// 获取地址列表
export function locationMain() {
  return request({
    url: '/showAddresses',
    method: 'get',
  })
}

// 添加等级列表
export function addLocation(data) {
    return request({
      url: '/insertOneAddress',
      method: 'post',
      data,
    })
  }

  // 删除等级列表
export function delLocation(params) {
    return request({
      url: '/delOneAddress',
      method: 'get',
      params,
    })
  }