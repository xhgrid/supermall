<template>
  <div class="back-top" @click="backTop">
    <img src="~assets/img/common/top.png" alt />
  </div>
</template>

<script>
export default {
  name: 'BackTop',
  data () {
    return {

    }
  },
  computed: {

  },
  created () {

  },
  mounted () {

  },
  watch: {

  },
  methods: {
    backTop () {
      this.$emit('backClick')
    }
  },
  components: {

  }
}
</script>

<style scoped>
.back-top {
  position: fixed;
  right: 10px;
  bottom: 55px;
}
img {
  width: 43px;
  height: 43px;
}
</style>
