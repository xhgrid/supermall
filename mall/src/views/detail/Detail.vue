<template>
  <div class="Detail">
    <!-- 详情{{id}} -->
    <detail-nav-bar></detail-nav-bar>
    <detail-swiper :topImages="topImages"></detail-swiper>
  </div>
</template>

<script>
import DetailNavBar from './childComponents/DetailNavBar'
import { getDetail } from '@/network/detail'
import DetailSwiper from './childComponents/DetailSwiper'

export default {
  name: 'Detail',
  props: {

  },
  data () {
    return {
      iid: null,
      res: null,
      topImages: []
    }
  },
  created () {
    // 1.将id传过来，然后根据id请求页面
    this.iid = this.$route.params.iid
    // 2.根据id请求详情
    getDetail(this.iid).then(res => {
      console.log(res)
      // 顶部轮播图数据
      this.topImages = res.data.result.itemInfo.topImages
      // console.log(this.topImages)
    })
  },
  methods: {

  },
  components: {
    DetailNavBar,
    DetailSwiper
  }
}
</script>

<style scoped>
</style>
