import service from '../utils/request'

// 订单列表信息
export function orderCount() {
  return service({
    url: '/p/myOrder/orderCount',
    method: 'get'
  }) 
}
