<template>
  <div class="HomeSwiper">
    <swiper>
      <swiper-item v-for="(item,index) in banners" :key="index">
        <a :href="item.link">
          <img :src="item.image" alt />
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperItem } from '@/components/common/swiper'
export default {
  props: {
    banners: {
      type: Array,
      // 对象或数组默认值必须从一个工厂函数获取
      dafault () {
        return []
      }
    }
  },
  data () {
    return {}
  },
  components: {
    Swiper,
    'swiper-item': SwiperItem
  }
}
</script>

<style scoped>
</style>
