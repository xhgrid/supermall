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
