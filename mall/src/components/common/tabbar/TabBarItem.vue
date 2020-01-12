<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>
    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabBarItem',
  props: {
    path: String,
    activeColor: {
      type: String,
      dafault: 'red'
    }
  },
  data () {
    return {
      //   isActive: true
    }
  },
  computed: {
    // 计算属性为什么是函数--
    // 计算属性-本来是一个getter和setter，一般getter不写，所以就变成setter函数了
    isActive () {
      // $route 和 $router
      // $route 拿到处于活跃状态路由的path
      // 判断活跃状态的路由的path包不包含props里的path
      return this.$route.path.indexOf(this.path) !== -1
    },
    activeStyle () {
      return this.isActive ? { color: this.activeColor } : {}
    }
  },
  methods: {
    itemClick () {
      if (this.$router.history.current.path !== this.path) {
        this.$router.replace(this.path)
      }
    }
  }
}
</script>

<style scoped>
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
}
.tab-bar-item img {
  width: 24px;
  height: 24px;
  margin-top: 3px;
  vertical-align: middle;
  margin-bottom: 2px;
}
.active {
  color: red;
}
</style>
