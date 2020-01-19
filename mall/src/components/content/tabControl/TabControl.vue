<template>
  <div class="TabControl">
    <div
      v-for="(item,index) in titles"
      :key="index"
      class="tab-control-item"
      :class="{active:index === currentIndex}"
      @click="itemClick(index)"
    >
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabControl',
  props: {
    titles: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      currentIndex: 0
    }
  },
  methods: {
    itemClick (index) {
      this.currentIndex = index
      // 子组件将事件传出去
      this.$emit('tabClick', index)
    }
  }
}
</script>

<style scoped>
.TabControl {
  display: flex;
  text-align: center;
  height: 40px;
  line-height: 40px;
}
.tab-control-item {
  flex: 1;
}
.active span {
  padding: 5px;
  color: var(--color-tint);
  border-bottom: 3px solid var(--color-tint);
}
</style>
