<template>
  <div class="toast" v-show="isShowToast">
    <div>{{message}}</div>
  </div>
</template>

<script>
export default {
  name: 'Toast',
  props: {
    // message: {
    //   type: String,
    //   default: ''
    // },
    // isShowToast: {
    //   type: Boolean,
    //   default: false
    // }
  },
  data () {
    return {
      message: '',
      isShowToast: false
    }
  },
  methods: {
    show (message, duration = 1000) {
      this.isShowToast = true
      this.message = message

      setTimeout(() => {
        this.isShowToast = false
        this.message = ''
      }, duration)
    }
  }
}
</script>

<style scoped>
.toast {
  position: fixed;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 8px 10px;
  color: #fff;
  border-radius: 10px;
  font-size: 18px;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 9;
}
</style>
