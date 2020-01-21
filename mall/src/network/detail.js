import { request } from './requests'
export function getDetail (iid) {
  return request({
    url: '/detail',
    method: 'GET',
    params: {
      iid
    }
  })
}

// 作用：整合数据 -- 把服务器返回的数据封装到一个类里面
// 然后new出一个对象来，将对象传到下一个组件里面
export class Goods {
  constructor (itemInfo, columns, services) {
    this.title = itemInfo.title
    this.desc = itemInfo.desc
    this.newPrice = itemInfo.price
    this.oldPrice = itemInfo.oldPrice
    this.discount = itemInfo.discountDesc
    this.columns = columns
    this.services = services
    this.realPrice = itemInfo.lowNowPrice
  }
}

export class Shop {
  constructor (shopInfo) {
    this.logo = shopInfo.shopLogo
    this.name = shopInfo.name
    this.fans = shopInfo.cFans
    this.sells = shopInfo.cSells
    this.score = shopInfo.score
    this.goodsCount = shopInfo.cGoods
  }
}

export class GoodsParam {
  constructor (info, rule) {
    // 注: images可能没有值(某些商品有值, 某些没有值)
    this.image = info.images ? info.images[0] : ''
    this.infos = info.set // infos是一个数组
    this.sizes = rule.tables[0] // sizes是一个数组
  }
}
