import request from '@/utils/request'

// 获取等级列表
export function levelMain() {
  return request({
    url: '/showLevel',
    method: 'get',
  })
}

// 添加等级列表
export function addLevel(data) {
    return request({
      url: '/insertOneLevel',
      method: 'post',
      data,
    })
  }

  // 删除等级列表
export function delLevel(params) {
    return request({
      url: '/delOneLevel',
      method: 'get',
      params,
    })
  }