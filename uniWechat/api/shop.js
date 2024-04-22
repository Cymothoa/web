
import service from '../utils/request'

// 获取用户购物车信息
export function shopCartInfo(data) {
  return service({
    url: '/p/shopCart/info',
    method: 'post',
    data:data
  }) 
}

// 获取购物车商品数量
export function prodCount(params) {
  return service({
    url: '/p/shopCart/prodCount',
    method: 'get',
    params:params
  }) 
}

// 获取选中购物项总计、选中的商品数量,参数为购物车id数组
export function totalPay(data) {
  return service({
    url: '/p/shopCart/totalPay',
    method: 'post',
    data:data
  }) 
}

// 通过商品id(prodId)、skuId、店铺Id(shopId),添加/修改用户购物车商品
export function changeItem(data) {
  return service({
    url: '/p/shopCart/changeItem',
    method: 'post',
    data:data
  }) 
}

// 通过购物车id删除用户购物车物品
export function deleteItem(data) {
  return service({
    url: '/p/shopCart/deleteItem',
    method: 'delete',
    data:data
  }) 
}
