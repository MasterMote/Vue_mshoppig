<template>
  <div class="detail">
    <detail-tab-bar class="top-nav"
                    @titleClick="titleClick"
                    ref="nav"></detail-tab-bar>
    <scroll class="content"
            ref="scroll"
            :probeType="3"
            @scroll="contentScroll">
      <!-- <div>{{$store.state.cartList.length}}</div> -->
      <detail-swiper :banners="topBnner"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detailInfo="detailInfo"
                         @imgLoad="goodsImgLoad"></detail-goods-info>
      <detail-param-info :paramInfo="paramInfo"
                         ref="param"></detail-param-info>
      <detail-comment-info :commentInfo="commentInfo"
                           ref="comment"></detail-comment-info>
      <!-- 组件复用 -->
      <goods-list :goods="recommendInfo"
                  ref="recommend"></goods-list>
    </scroll>
    <!-- <Toast :message="message"
           :isShow="isToastShow"></Toast> -->
    <div class="toast"
         v-show='isToastShow'>{{message}}
    </div>
    <back-top @click.native="backTop"
              v-show="isShowBackTop" />
    <detail-bot-bar @addToCart="addToCart"></detail-bot-bar>

  </div>
</template>

<script>
import { mapActions } from 'vuex'

import Scroll from 'components/common/scroll/Scroll.vue'
import BackTop from 'components/content/backTop/BackTop.vue'
import GoodsList from 'components/content/goodsList/GoodsList.vue'

import DetailTabBar from './childCopm/DetailTabBar.vue'
import DetailSwiper from './childCopm/DetailSwiper.vue'
import DetailBaseInfo from './childCopm/DetailBaseInfo.vue'
import DetailShopInfo from './childCopm/DetailShopInfo.vue'
import DetailGoodsInfo from './childCopm/DetailGoodsInfo.vue'
import DetailParamInfo from './childCopm/DetailParamInfo.vue'
import DetailCommentInfo from './childCopm/DetailCommentInfo.vue'
import DetailBotBar from './childCopm/DetailBotBar.vue'
// import Toast from '@/components/common/toast/Toast.vue'

import { imgRefrashMixin, scrollTopMixin } from '../../common/mixins.js'

import { getDetail, Goods, Shop, Param, getRecommend } from 'network/detail.js'
export default {
  name: 'Detail',
  mixins: [imgRefrashMixin, scrollTopMixin],
  components: {
    Scroll,
    // BackTop,
    DetailTabBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBotBar
    // Toast
  },
  data() {
    return {
      iid: null,
      topBnner: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: [],
      recommendInfo: [],
      // isShowBackTop: false,
      themeTopY: [],
      currentIndex: 0,
      itemImgLister: null,
      message: '',
      isToastShow: false
    }
  },
  created() {
    //保存传入的id
    this.iid = this.$route.params.iid

    //根据iid请求详情数据
    getDetail(this.iid).then(res => {
      // console.log(res);
      const data = res.data.result
      //1.获取顶部banner
      this.topBnner = data.itemInfo.topImages
      //2.获取商品详情
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo)
      //3.获取商家详情
      this.shop = new Shop(data.shopInfo)
      //4.获取商家详情图片
      this.detailInfo = data.detailInfo
      //5.获取参数信息
      this.paramInfo = new Param(data.itemParams.info, data.itemParams.rule)
      //6.获取评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list
      }
    })

    //请求推荐数据
    getRecommend().then(res => {
      this.recommendInfo = res.data.data.list
    })
  },

  methods: {
    //映射actions中方法
    ...mapActions(['addCart']),

    goodsImgLoad() {
      this.$refs.scroll.refresh()
      this.themeTopY = []
      this.themeTopY.push(0)
      this.themeTopY.push(this.$refs.param.$el.offsetTop)
      this.themeTopY.push(this.$refs.comment.$el.offsetTop)
      this.themeTopY.push(this.$refs.recommend.$el.offsetTop)
      this.themeTopY.push(Number.MAX_VALUE)
    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopY[index], 200)
    },
    contentScroll(position) {
      //返回顶部是否显示
      this.isShowBackTop = -position.y > 500
      const positionY = -position.y
      let _lenth = this.themeTopY.length
      for (let i = 0; i < _lenth - 1; i++) {
        if (
          this.currentIndex !== i &&
          positionY >= this.themeTopY[i] &&
          positionY < this.themeTopY[i + 1]
        ) {
          this.currentIndex = i
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }
    },
    //加入购物车
    addToCart() {
      // 获取购物车需要展示的信息
      const product = {}
      product.image = this.topBnner[0]
      product.title = this.goods.title
      product.desc = this.goods.discountDesc
      product.price = this.goods.lowNowPrice
      product.iid = this.iid

      //将商品添加到购物车里
      // this.$store.dispatch('addCart', product).then(res => console.log(res))
      this.addCart(product).then(res => {
        //插件方式，全局使用
        //console.log(this.$toast)
        //this.$toast.methods.show(res, 2000)
        this.message = res
        this.isToastShow = true
        //普通方式
        setTimeout(() => {
          this.message = ''
          this.isToastShow = false
        }, 1500)
      })
    }
  },
  destroyed() {
    //取消全局的事件监听
    this.$bus.$off('itemImgLoad', this.itemImgLister)
    this.$destroy('Toast')
  }
}
</script>

<style lang="less" scoped>
.detail {
  height: 100vh;
  background-color: #fff;
  position: relative;
  z-index: 10;
}
.top-nav {
  background-color: #fff;
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  z-index: 11;
}
.content {
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
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
</style>