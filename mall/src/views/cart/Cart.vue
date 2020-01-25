<template>
  <div id="shopcart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartCount}})</div>
    </nav-bar>
    <!-- 商品列表 -->
    <cart-list></cart-list>
    <!-- 底部汇总 -->
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar'
import CartList from './childComponents/CartList'
import CartBottomBar from './childComponents/CartBottomBar'
import { mapGetters } from 'vuex'

export default {
  name: 'Cart',
  data () {
    return {

    }
  },
  components: {
    NavBar,
    CartList,
    CartBottomBar
  },
  computed: {
    // 第二种用法
    ...mapGetters([
      'cartCount'
    ])
  }
}
</script>

<style  scoped>
#shopcart {
  /*position: relative;*/
  height: 100vh;
}

.nav-bar {
  background-color: var(--color-tint);
  font-weight: 700;
  color: #fff;
}

.cart-list {
  position: absolute;
  top: 44px;
  bottom: 49px;
  width: 100%;
}
</style>
