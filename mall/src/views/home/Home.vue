<template>
  <div id="home" class="wrapper">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control
      ref="tabControl1"
      :titles="['流行','新款','精选']"
      class="tabControl"
      @tabClick="tabClick"
      v-show="isTabFixed"
    ></tab-control>
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentscroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <recomand-view :recomands="recommends"></recomand-view>
      <feature-view></feature-view>
      <tab-control
        ref="tabControl2"
        :titles="['流行','新款','精选']"
        class="tabControl"
        @tabClick="tabClick"
      ></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <!-- .native 监听组件的原生事件 -->
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
// 子组件的导入
import HomeSwiper from './childComps/HomeSwiper'
import RecomandView from './childComps/RecomendView'
import FeatureView from './childComps/FeatureView'

import NavBar from '@/components/common/navbar/NavBar'
import TabControl from '@/components/content/tabControl/TabControl'
import GoodsList from '@/components/content/goods/GoodsList'
import Scroll from '@/components/common/scroll/Scroll'
import BackTop from '@/components/content/backTop/BackTop'

import { getHomeMultidata, getHomeGoods } from 'network/home'
import { debounce } from '@/common/utils'

export default {
  name: 'Home',
  components: {
    HomeSwiper,
    RecomandView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  data () {
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': { page: 0, list: [] },
        'new': { page: 0, list: [] },
        'sell': { page: 0, list: [] }
      },
      currentType: 'pop',
      isShowBackTop: false,
      tabOffsetTop: 0, // 记录tabControl的offsetTop
      saveY: 0,
      isTabFixed: false
    }
  },
  computed: {
    showGoods () {
      return this.goods[this.currentType].list
    }
  },
  destroyed () {
    console.log('home destoryed')
  },
  activated () {
    // keep-alive 组件 重新进入时激活
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
    this.$refs.scroll.refresh()
  },
  deactivated () {
    // keep-alive 组件生命周期 离开时注销
    this.saveY = this.$refs.scroll.scroll.y
  },
  created () {
    // 1.请求轮播图等数据
    this.getHomeMultidata()
    // 2.请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  mounted () {
    const refresh = debounce(this.$refs.scroll.refresh, 50)
    // 3.兄弟组件通信-监听图片加载完成之后刷新事件
    this.$bus.$on('itemImageLoad', () => {
      refresh()
    })
  },
  methods: {
    /**
     * 事件监听相关的方法
     */
    tabClick (index) {
      console.log(index)
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
    },
    backClick () { // 点击返回
      // 拿到scroll组件的scroll对象,调用scrollTo方法
      this.$refs.scroll.scrollTo(0, 0, 500)
    },
    contentscroll (position) { // 监听滚动
      // console.log(position.y)
      if (-position.y > 1000) {
        this.isShowBackTop = true
      } else {
        this.isShowBackTop = false
      }
      // 决定tabControl是否吸顶(position:fixed)
      this.isTabFixed = (-position.y) > this.tabOffsetTop
    },
    loadMore () {
      console.log('上拉加载更多')
      this.getHomeGoods(this.currentType)
      // this.$refs.scroll.scroll.refresh()
    },
    swiperImageLoad () {
      // 2.获取TabControl的offsetTop
      // 所有组件都有一个属性$el:用于获取组件中的元素
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
    },
    /**
     * 网络请求相关方法
     */
    getHomeMultidata () {
      getHomeMultidata().then(res => {
        // console.log(res)
        this.banners = res.data.data.banner.list
        // console.log(this.banners)
        this.recommends = res.data.data.recommend.list
        // console.log(this.recommends)
      })
    },
    getHomeGoods (type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        // console.log(res)
        this.goods[type].list.push(...res.data.data.list)
        this.goods[type].page += 1

        this.$refs.scroll.finishPullUp()
      })
    }
  }
}
</script>

<style scoped>
#home {
  position: relative;
  height: 100vh;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;

  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9; */
}
.swiper {
  margin-top: 44px;
}
.tabControl {
  background: #fff;
  position: relative;
  z-index: 9;
  /* position: sticky;
  top: 44px;
  z-index: 9; */
}

/* .content { */
/* height: calc(100% - 44px); */
/* height:300px; */
/* margin-top: 44px; */
/* overflow: hidden; */

/* position: absolute; */
/* top:0; */
/* } */
.content {
  overflow: hidden;

  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>
