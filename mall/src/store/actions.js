import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutation-type'

export default {
  // 复杂逻辑放到actions中管理
  addCart ({ state, commit }, payload) {
    return new Promise((resolve, reject) => {
      // 遍历原数组，判断原数组中是否有和传过来的值相同的值，-即相同的商品
      // 如果没有则将传过来的值添加进数组，记录count=1
      // 如果有，则将count++
      // 1.查找之前数组中是否有该商品
      let oldProduct = state.cartList.find(item => item.iid === payload.iid)
      // 如果标志位有值
      if (oldProduct) {
        // oldProduct.count += 1
        commit(ADD_COUNTER, oldProduct)
        resolve('加入购物车成功')
      } else {
        payload.count = 1
        // state.cartList.push(payload)
        commit(ADD_TO_CART, payload)
        resolve('加入购物车成功')
      }
    })
  }
}
