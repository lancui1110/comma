<template>
  <div class="product-item">
    <div class="pic">
      <img :src="data.picUrl || require('../../assets/pic_motu.png')">
    </div>
    <div class="detail">
      <div class="title">{{data.name}}</div>
      <div class="tag-wrapper">
        <div class="tag" style="border-color: #999; color: #999;" v-if="data.inventory <= 0">售罄</div>
        <span
          v-else
          class="tag"
          :style="{ 'border-color': item.color, 'color': item.color }"
          v-for="(item, key) in data.goodsMarks"
          :key="key">
          {{item.name}}
        </span>
      </div>
      <div>
        <span class="price" :class="{'twoline' : data.discountPrice}">
          <i>{{(data.discountPrice || data.price).toFixed(2)}}</i>元
        </span>
        <span class="orig-price" v-if="data.discountPrice">{{data.price.toFixed(2)}}元</span>
      </div>
    </div>
    <count-ctrl :num="selectedAmount" :onAdd="addToCart" :onMinus="removeFromCart"></count-ctrl>
  </div>
</template>

<script>
import { find } from 'lodash'
import { mapGetters } from 'vuex'
import { MessageBox } from 'mint-ui'
import CountCtrl from './CountCtrl'

export default {
  name: 'ProductItem',
  components: {
    CountCtrl
  },
  props: {
    data: {
      type: Object
    }
  },
  computed: {
    ...mapGetters({
      cart: 'home/getCart'
    }),
    selectedAmount () {
      const cartItem = find(this.cart.list, item => item.product.id === this.data.id)
      if (cartItem) {
        return cartItem.count
      }
      return 0
    }
  },
  methods: {
    addToCart (e) {
      if (this.data.inventory <= 0) {
        MessageBox('商品可能售罄了', '请您在货架上确认后再购买！')
      }
      // this.$store.dispatch('home/addToCart', this.data)

      const initX = e.clientX - 10
      const initY = e.clientY - 10
      const targetX = 30
      const targetY = screen.height - 50
      let curvature = 0.9
      let speed = 6
      if (initX < screen.width / 2) {
        curvature = 1.6
        speed = 3
      } else if (initX > screen.width / 3 * 2) {
        curvature = 0.6
        speed = 10
      }

      const ball = document.createElement('div')
      ball.appendChild(document.createTextNode('1'))
      ball.setAttribute('class', 'ball')
      ball.style.top = initY + 'px'
      ball.style.left = initX + 'px'
      document.body.insertAdjacentElement('afterbegin', ball)
      const p = new iwjw.Parabola({
        el: ball,
        direction: 'down',
        curvature: curvature,
        speed: speed,
        origin: { x: initX, y: initY },
        target: { x: targetX, y: targetY },
        onMotionDone: () => {
          ball.remove()
          this.$store.dispatch('home/addToCart', this.data)
        }
      })
      p.start()
    },
    removeFromCart () {
      this.$store.dispatch('home/removeFromCart', this.data)
    }
  }
}
</script>

<style lang="less">
  @import "../../global/style/theme.less";
  @itemHeight: 130/@R;
  .product-item {
    display: flex;
    min-height: @itemHeight;
    width: 100%;
    margin-bottom: 30/@R;
    padding-right: 40/@R;
    font-size: 20/@R;

    .pic {
      flex-shrink: 0;
      width: @itemHeight;
      height: @itemHeight;
      margin: 0 15/@R;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .detail {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      min-width: 0;
    }
    .title {
      line-height: 42/@R;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      font-size: 30/@R;
    }
    .tag-wrapper {
      height: 30/@R;
      margin: 4/@R 0 12/@R;
    }
    .tag {
      display: inline-block;
      height: 32/@R;
      padding: 0 10/@R;
      margin-right: 10/@R;
      border: 1px solid #fff;
      border-radius: 15/@R;
      font-size: 20/@R;
    }
    .price {
      margin-right: 20/@R;
      font-size: 24/@R;
      color: @font-orange;
      i {
        margin-right: 5/@R;
        line-height: 41/@R;
        font-size: 34/@R;
        font-family: "Helvetica";
        font-style: normal;
      }
    }
    .orig-price {
      line-height: 29/@R;
      font-size: 24/@R;
      color: #969696;
      text-decoration: line-through;
    }

    .buy-ctrl {
      display: flex;
      align-items: center;
      flex-shrink: 0;
      width: 100/@R;
      .num {
        width: 70/@R;
        line-height: 41/@R;
        text-align: center;
        font-size: 34/@R;
        font-family: "Helvetica";
      }
      .buy {
        width: 38/@R;
        height: 38/@R;
      }
    }
  }
  .ball {
    position: fixed;
    width: 20px;
    height: 20px;
    text-align: center;
    border-radius: 50%;
    background-color: @primary;
    color: #fff;
    z-index: 999;
  }

  .mint-msgbox {
    .mint-msgbox-title {
      font-size: 40/@R;
      font-weight: normal;
    }
    .mint-msgbox-content {
      font-size: 30/@R;
      color: @font-gray-light;
    }
    .mint-msgbox-confirm {
      color: #02BB00;
    }
  }
</style>
