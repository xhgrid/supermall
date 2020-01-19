<template>
  <div class="RecomandView">
    <div v-for="(item,index) in recomands" :key="index" class="RecomandView-item">
      <a :href="item.link">
        <img :src="item.image" alt />
        <div class='div-title'>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RecomandView',
  props: {
    recomands: {
      type: Array,
      default () {
        return []
      }
    }
  }
}
</script>

<style scoped>
.RecomandView {
  display: flex;
  width: 100%;
  justify-content: space-between;
  text-align: center;
  margin-top: 10px;
  border-bottom: 8px solid #eee;
}
.RecomandView-item img {
  width: 80px;
  height: 80px;
}
.div-title{
  margin-bottom: 15px;
}
</style>
