<template>
  <div class="home-feature"
       @click="fashionClick">
    <img src="~assets/images/home/recommend_bg.jpg" />
  </div>
</template>

<script>
export default {
  name: 'HomeFeature',
  methods: {
    fashionClick() {
      this.$router.push('/fashion')
    }
  }
}
</script>

<style lang="less" scoped>
.home-feature {
  img {
    width: 100%;
  }
}
</style>
