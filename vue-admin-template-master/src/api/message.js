import request from '@/utils/request'

// 获取信息列表
export function messageMain() {
  return request({
    url: '/showMessage',
    method: 'get',
  })
}

// 添加信息列表
export function addMessage(data) {
    return request({
      url: '/insertAllMessage',
      method: 'post',
      data,
    })
  }

  // 删除信息列表
export function delMessage(params) {
    return request({
      url: '/delOneMessage',
      method: 'get',
      params,
    })
  }

  // 修改信息列表
export function updateMessage(data) {
    return request({
      url: '/updateMessage',
      method: 'post',
      data,
    })
  }

// 根据ID获取信息
export function messageId() {
    return request({
      url: '/showOneMessage',
      method: 'get',
    })
  }

    // 根据地址筛选信息
export function searchMessage(data) {
    return request({
      url: '/searchaddressid',
      method: 'post',
      data,
    })
  }