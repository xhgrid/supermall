<template>
  <div id="Detail">
    <!-- 详情{{id}} -->
    <detail-nav-bar class="nav" @titleClick="titleClick" ref="nav"></detail-nav-bar>
    <!-- content必须设高度 -->
    <scroll class="scroll" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <!-- 轮播图 -->
      <detail-swiper :topImages="topImages"></detail-swiper>
      <!-- 价格信息等 -->
      <detail-base-info :goods="goods"></detail-base-info>
      <!-- 店铺信息 -->
      <detail-shop-info :shop="shop"></detail-shop-info>
      <!-- 参数信息 -->
      <detail-param-info ref="paramInfo" :paramInfo="paramInfo"></detail-param-info>
      <!-- 商品详情 -->
      <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <!-- 评论信息 -->
      <detail-comment-info ref="commentInfo" :commentInfo="commentInfo"></detail-comment-info>
      <!-- 推荐商品 -->
      <goods-list ref="recommends" :goods="recommends"></goods-list>
    </scroll>
    <detail-bottom-bar @addToCart="addCart"></detail-bottom-bar>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    <!-- <Toast :message="toastMessage" :isShowToast="isShowToast"></Toast> -->
    <!-- <ToastPlugin></ToastPlugin> -->
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
import DetailBottomBar from './childComponents/DetailBottomBar'

import { getDetail, Goods, Shop, GoodsParam, getRecommend } from '@/network/detail'

import Scroll from '@/components/common/scroll/Scroll'
import { itemListenerMinxin, backTopMixin } from '@/common/mixin'
import BackTop from '@/components/content/backTop/BackTop'
// import Toast from '@/components/common/toast/Toast'

export default {
  name: 'Detail',
  props: {

  },
  mixins: [itemListenerMinxin, backTopMixin],
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
      recommends: [],
      // itemImgListener: null // 放入混入中
      themeTopYs: [],
      currentIndex: 0
    }
  },
  created () {
    // 1.将id传过来，然后根据id请求页面
    this.iid = this.$route.params.id

    // 2.根据id请求详情
    getDetail(this.iid).then(res => {
      // console.log(res)
      const data = res.data.result
      // 1.获取顶部轮播图数据
      this.topImages = data.itemInfo.topImages

      // 2.获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
      console.log(this.goods)

      // 3.创建店铺信息对象
      this.shop = new Shop(data.shopInfo)
      // console.log(this.shop)

      // 4.保存商品详情数据
      this.detailInfo = data.detailInfo

      // 5.获取参数详情
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
      // console.log(this.paramInfo)
      // console.log(Object.keys(this.paramInfo).length)

      // 6.获取评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0]
      }
      // console.log(this.commentInfo)

      // 1.第一次获取，值不对-this.$refs.parama.$el压根没有渲染
      // this.themeTopYs = []
      // // $el取根组件
      // this.themeTopYs.push(0) // 商品
      // this.themeTopYs.push(this.$refs.detailInfo.$el.offsetTop)
      // this.themeTopYs.push(this.$refs.paramInfo.$el.offsetTop) // 参数
      // this.themeTopYs.push(this.$refs.commentInfo.$el.offsetTop) // 评论
      // this.themeTopYs.push(this.$refs.recommends.$el.offsetTop) // 推荐

      // console.log(this.themeTopYs)

      // 2.第二次获取，值不对-图片没有计算在内
      // this.$nextTick(() => {
      //   this.themeTopYs = []
      //   // $el取根组件
      //   this.themeTopYs.push(0) // 商品
      //   this.themeTopYs.push(this.$refs.detailInfo.$el.offsetTop)
      //   this.themeTopYs.push(this.$refs.paramInfo.$el.offsetTop) // 参数
      //   this.themeTopYs.push(this.$refs.commentInfo.$el.offsetTop) // 评论
      //   this.themeTopYs.push(this.$refs.recommends.$el.offsetTop) // 推荐

      //   console.log(this.themeTopYs)
      // })
    })
    // 3.获取推荐信息
    getRecommend().then(res => {
      // console.log(res)
      this.recommends = res.data.data.list
      // console.log(this.recommends)
    })
  },
  methods: {
    // 当图片加载完后，做刷新,使better-scroll适应图片高度-解决bug
    imageLoad () {
      this.$refs.scroll.refresh()
      this.themeTopYs = []
      // $el取根组件
      this.themeTopYs.push(0) // 商品
      this.themeTopYs.push(this.$refs.paramInfo.$el.offsetTop - 44) // 参数
      this.themeTopYs.push(this.$refs.commentInfo.$el.offsetTop - 44) // 评论
      this.themeTopYs.push(this.$refs.recommends.$el.offsetTop - 44) // 推荐
      this.themeTopYs.push(Number.MAX_VALUE) // 最大值
      console.log(this.themeTopYs)
    },
    // 联动
    titleClick (index) {
      // console.log(index)
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 300)
    },
    contentScroll (position) {
      const positionY = -position.y
      // [0, 6792, 7602, 7818, __ob__: Observer]
      let len = this.themeTopYs.length
      for (let i = 0; i < len - 1; i++) {
        // console.log(i)
        if ((this.currentIndex !== i) && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1])) {
          // console.log(i)
          this.currentIndex = i
          // 使用$refs取到组件中的值
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }

      // console.log(-position.y)
      if (-position.y > 1000) {
        this.isShowBackTop = true
      } else {
        this.isShowBackTop = false
      }
    },
    addCart () {
      // 1. 获取购物车需要展示的信息
      const product = {}
      product.iamge = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.realPrice
      product.iid = this.iid

      // 2. 将商品添加到购物车中--Vuex
      this.$store.dispatch('addCart', product).then(res => {
        // console.log(res)
        this.$toast.show(res)
      })
    }
  },
  updated () {
    // this.themeTopYs = []
    // // $el取根组件
    // this.themeTopYs.push(0) // 商品
    // this.themeTopYs.push(this.$refs.paramInfo.$el.offsetTop) // 参数
    // this.themeTopYs.push(this.$refs.commentInfo.$el.offsetTop) // 评论
    // this.themeTopYs.push(this.$refs.recommends.$el.offsetTop) // 推荐

    // console.log(this.themeTopYs)
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
    GoodsList,
    DetailBottomBar,
    BackTop
    // Toast
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
