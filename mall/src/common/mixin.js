import { debounce } from '@/common/utils'

export const itemListenerMinxin = {
  data () {
    return {
      itemImageListener: null
    }
  },
  mounted () {
    let refresh = debounce(this.$refs.scroll.refresh, 100)
    this.itemImgListener = () => {
      refresh()
    }
    this.$bus.$on('itemImageLoad', this.itemImgListener)
    console.log('我是混入中的内容')
  }
}

export const backTopMixin = {
  data () {
    return {
      isShowBackTop: false
    }
  },
  methods: {
    backClick () { // 点击返回
      // 拿到scroll组件的scroll对象,调用scrollTo方法
      this.$refs.scroll.scrollTo(0, 0, 500)
    }
  }
}
