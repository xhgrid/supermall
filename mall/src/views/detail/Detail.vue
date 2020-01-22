<template>
  <div id="Detail">
    <!-- 详情{{id}} -->
    <detail-nav-bar class="nav"></detail-nav-bar>
    <!-- content必须设高度 -->
    <scroll class="scroll" ref="scroll">
      <detail-swiper :topImages="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info :paramInfo="paramInfo"></detail-param-info>
      <detail-comment-info :commentInfo="commentInfo"></detail-comment-info>
      <goods-list :goods="recommends"></goods-list>
    </scroll>
  </div>
</template>

<script>
import DetailNavBar from './childComponents/DetailNavBar'
import DetailSwiper from './childComponents/DetailSwiper'
import DetailBaseInfo from './childComponents/DetailBaseInfo'
import DetailShopInfo from './childComponents/DetailShopInfo'
import DetailGoodsInfo from './childComponents/DetailGoodsInfo'
import DetailParamInfo from './childComponents/DetailParamInfo'
import DetailCommentInfo from './childComponents/DetailCommentInfo'
import GoodsList from '@/components/content/goods/GoodsList'

import { getDetail, Goods, Shop, GoodsParam, getRecommend } from '@/network/detail'

import Scroll from '@/components/common/scroll/Scroll'
import { itemListenerMinxin } from '@/common/mixin'

export default {
  name: 'Detail',
  props: {

  },
  mixins: [itemListenerMinxin],
  data () {
    return {
      iid: null,
      res: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: []
      // itemImgListener: null // 放入混入中
    }
  },
  created () {
    // 1.将id传过来，然后根据id请求页面
    this.iid = this.$route.params.iid
    // 2.根据id请求详情
    getDetail(this.iid).then(res => {
      console.log(res)
      const data = res.data.result
      // 1.获取顶部轮播图数据
      this.topImages = data.itemInfo.topImages

      // 2.获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
      console.log(this.goods)

      // 3.创建店铺信息对象
      this.shop = new Shop(data.shopInfo)
      console.log(this.shop)

      // 4.保存商品详情数据
      this.detailInfo = data.detailInfo

      // 5.获取参数详情
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
      console.log(this.paramInfo)
      // console.log(Object.keys(this.paramInfo).length)

      // 6.获取评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0]
      }
      console.log(this.commentInfo)
    })
    // 3.获取推荐信息
    getRecommend().then(res => {
      // console.log(res)
      this.recommends = res.data.data.list
    })
  },
  methods: {
    // 当图片加载完后，做刷新,使better-scroll适应图片高度-解决bug
    imageLoad () {
      this.$refs.scroll.refresh()
    }
  },
  mounted () {

  },
  destroyed () { // Detail 组件没有缓存keep-alive 离开时只会调用destoryed，没有keep-alive的生命周期
    // console.log('destory detail')
    this.$bus.$off('itemImageLoad', this.itemImgListener)
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList
  }
}
</script>

<style scoped>
#Detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.scroll {
  height: calc(100% - 44px);
}
</style>
