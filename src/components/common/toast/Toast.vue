<template>
  <div class="toast"
       v-if="isShow">
    <div>{{message}}</div>
  </div>
</template>

<script>
export default {
  name: 'Toast',
  props: {
    message: {
      type: String,
      default() {
        return ''
      }
    },
    isShow: {
      type: Boolean,
      default() {
        return false
      }
    }
    // delay: {
    //   type: Number,
    //   default() {
    //     return 2000
    //   }
    // }
  },
  data() {
    // return {
    //   message: '',
    //   isShow: false
    // }
  },
  methods: {
    // show(message, delay) {
    //   console.log(this.isShow)
    //   console.log('dianle ')
    //   this.message = message
    //   // this.isShow = true
    //   // this.$set(this.isShow, 0, 'true')
    //   console.log(this.isShow)
    // setTimeout(() => {
    //   this.isShow = false
    //   this.message = ''
    // }, delay)
    // }
  }
}
</script>

<style>
.toast {
  position: fixed;
  width: auto;
  left: 50%;
  top: 50%;
  padding: 10px;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 999;
  color: #fff;
  border-radius: 2px;
  text-align: center;
}
</style>

