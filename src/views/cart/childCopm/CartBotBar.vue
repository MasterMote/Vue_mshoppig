<template>
  <div class="cart-bot-bar flex">
    <div><input type="checkbox"
             class="check"
             :class="{checked:isTotalPriceButtonChecked}"
             @click="setAllSelected"
             id="check">&ensp;<label for="check"> 全部</label> </div>
    <div>合计：{{totalPrice}}</div>
    <div>去结算{{checkLength}}</div>
  </div>
</template>

<script>
export default {
  name: 'CartBotBar',
  methods: {
    setAllSelected() {
      if (this.getCarlist.find(item => !item.checked)) {
        this.getCarlist.forEach(item => {
          item.checked = true
        })
      } else {
        this.getCarlist.forEach(item => {
          item.checked = false
        })
      }
    }
  },
  computed: {
    getCarlist() {
      return this.$store.state.cartList
    },
    totalPrice() {
      return (
        '￥' +
        this.$store.state.cartList
          .filter(item => {
            return item.checked
          })
          .reduce((preValue, item) => {
            return preValue + item.price * item.count
          }, 0)
          .toFixed(2)
      )
    },
    checkLength() {
      return '(' + this.getCarlist.filter(item => item.checked).length + ')'
    },
    isTotalPriceButtonChecked() {
      return !this.getCarlist.find(item => !item.checked)
    }
  }
}
</script>

<style lang="less" scoped="scoped">
.cart-bot-bar {
  position: fixed;
  bottom: 49px;
  left: 0;
  right: 0;
  height: 40px;
  padding: 0 10px;
  font-size: 13px;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  border-bottom: 1px solid #ececec;
  border-top: 1px solid #ececec;
  .check {
    width: 18px;
    height: 18px;
    overflow: hidden;
    border-radius: 100%;
    vertical-align: bottom;
    border: 1px solid #ececec;
  }
  .checked {
    border: 1px solid var(----color-high-text);
    background: url(~assets/images/detail/check_active.png) no-repeat center;
    background-size: cover;
  }
}
</style>
