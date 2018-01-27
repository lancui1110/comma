<template>
  <div class="pay-bar" :class="{'no-choose-any': cart.count <= 0}">
    <!-- <transition name="fade">
      <div class="notify" v-if="notifyUserLogin">小主，专属红包已存入账户啦～<router-link :to="{ name: 'login' }">【一键领取】</router-link></div>
    </transition> -->
    <div class="order-detail" @click="toggleSelProducts">
      <div class="logo">
        <i class="icon icon-cart"></i>
        <span v-if="cart.count > 0" class="product-count">{{cart.count}}</span>
      </div>
      <div class="pay-info">
        <div class="total-price">合计：{{cart.realAmount.toFixed(2)}}元</div>
        <div class="discounts" v-show="cart.totalDiscounts">已优惠{{cart.totalDiscounts.toFixed(2)}}元</div>
      </div>
    </div>
    <div class="pay-btn" :class="{ 'active': cart.count > 0 }" @click="addOrder">去支付11</div>
  </div>
</template>

<script>
import { each, map, find, findIndex, sum, round, cloneDeep } from 'lodash'
import { mapGetters } from 'vuex'
import { Toast } from 'mint-ui'
import { calCartInfo } from '../../store/modules/home'
import weixin from 'weixin' 
import utils from 'utils'

export default {
  name: 'PayBar',
  computed: {
    ...mapGetters({
      cart: 'home/getCart',
      productList: 'home/getProductList',
      availableCouponList: 'coupons/availableCouponList',
      notifyUserLogin: 'user/notifyUserLogin',
      user: 'user/getUser',
      payType: 'home/payType'
    })
  },
  mounted () {
    // alert(1)
    // weixin.init()
  },
  methods: {
    addOrder () {
      if (!this.cart.count) {
        return
      }

      if (this.user && this.user.mobile) {
        const params = {
          goods: map(this.cart.list, item => ({
            id: item.product.id,
            price: item.product.price,
            discountPrice: item.product.discountPrice,
            num: item.count
          })),
          number: this.cart.count,
          realAmount: round(this.cart.realAmount, 2),
          totalAmount: round(sum(map(this.cart.list, item => item.count * item.product.price)), 2),
          totalDiscounts: round(this.cart.totalDiscounts, 2),
          isWallet: this.payType === 'yue'
        }

        if (this.cart.couponNum) {
          params.couponNum = this.cart.couponNum
          params.couponAmount = this.cart.couponAmount
        }
        if (this.cart.discountAmount) {
          params.discountAmount = round(this.cart.discountAmount, 2)
        }

        this.$store.dispatch('order/addOrder', {
          params,
          cb: (res) => {
            if (res.code === 1) {
              // go to '/pay'
              // location.href = `${pageConfig.siteUrl}index/pay?orderNum=${res.data.orderNum}`
              this.goPay(res.data)
            } else {
              Toast(res.msg)
              // 先更新 可用优惠券列表
              this.$store.dispatch('coupons/getAvailableCouponList', () => {
                // 再更新 商品列表的折扣信息 和 购物车
                const ids = map(this.cart.list, item => item.product.id)
                this.$store.dispatch('home/getGoodsByIds', {
                  ids: ids.join(','),
                  cb: (data) => {
                    // 刷新首页商品列表
                    this.$store.dispatch('home/getGoodsList', true)
                    // 用返回的最新的商品信息替换购物车里面的商品
                    const cart = cloneDeep(this.cart)
                    each(ids, id => {
                      const newGoodInfo = find(data, { id })
                      const ci = findIndex(cart.list, item => item.product.id === id)
                      if (newGoodInfo) {
                        // 更新 cart.list
                        if (ci > -1) {
                          cart.list[ci].product = cloneDeep(newGoodInfo)
                        }
                      } else {
                        // 商品下架了
                        if (ci > -1) {
                          cart.list.splice(ci, 1)
                        }
                      }
                    })

                    // 重算 cart 信息
                    const newCart = calCartInfo(cart, this.availableCouponList)
                    this.$store.commit('home/setCart', newCart)
                    this.$store.commit('home/setPayType', newCart.realAmount <= this.user.money ? 'yue' : 'wx')
                  }
                })
              })
            }
          }
        })
      } else {
        this.$router.push({ name: 'login', query: { to: 'home' } })
      }
    },
    goPay (params) {
      if (params.payStatus === 1) { // 0元无需支付
        this.goPaySuc(params.orderNum)
        return
      }

      // 微信支付
      if (utils.isWeixin()) {
        alert('pay..weixin')
        weixin.weixinPay(params, (res) => {
          // go 支付成功
          if (res.err_msg === 'get_brand_wcpay_request:ok') { // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
            this.goPaySuc(params.orderNum)
          } else if (res.err_msg === 'get_brand_wcpay_request:cancel') {
            this.$emit('toggleSelProducts', { show: false })
            // 判断 params 是否有优惠券，有的话才弹提示
            if (params.useCoupon) {
              Toast(`订单未支付，优惠券将在${params.couponReturnMin}分钟后返还账户`)
            }
          }
        })
      }

      // 支付宝支付
      if (utils.isAlipay()) {
        alert('pay..alipay')

        ap.pushWindow({
          url: 'http://comma.isfeel.cn/mock/pay',
          data: {
            keyword: 'test',
          }
        })
        // 添加dom
        // const aliPayForm = params.aliPayForm
        // const oDiv = document.createElement('div')
        // oDiv.innerHTML = aliPayForm
        // document.body.appendChild(oDiv)
        // document.forms[0].submit()
      }
    },
    // 支付成功页面
    goPaySuc (orderNum) {
      // reset cart
      this.$store.dispatch('home/clearCart')
      // hide sel panel
      this.$emit('toggleSelProducts', { show: false })
      setTimeout(() => {
        this.$router.push({ name: 'paySuc', query: { orderNum } })
        // location.href = `${pageConfig.siteUrl}index/pay/success?orderNum=${orderNum}`
      }, 100)
    },
    toggleSelProducts () {
      if (this.cart.count) {
        this.$emit('toggleSelProducts')
      }
    }
  }
}
</script>

<style lang="less">
  @import "../../global/style/theme.less";

  // 支付条
  .pay-bar {
    position: fixed;
    left: 0;
    bottom: 0;
    display: flex;
    width: 100%;
    height: 100/@R;
    line-height: 100/@R;
    background: #777;
    color: #fff;
    font-size: 30/@R;
    z-index: 1000;
    .order-detail {
      flex: 1;
      display: flex;
      .logo {
        position: relative;
        width: 160/@R;
        text-align: center;
      }
      .product-count {
        display: inline-block;
        position: absolute;
        top: 10/@R;
        left: 80/@R;
        min-width: 45/@R;
        height: 45/@R;
        line-height: 45/@R;
        border-radius: 50%;
        text-align: center;
        background-color: @primary;
        color: #fff;
        font-size: 34/@R;
        font-weight: bold;
        font-family: "Helvetica";
      }
      .pay-info {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
      .total-price {
        line-height: 48/@R;
        font-size: 34/@R;
      }
      .discounts {
        line-height: 30/@R;
        font-size: 22/@R;
      }
    }

    .pay-btn {
      background-color: #555;
      font-size: 36/@R;
      width: 240/@R;
      text-align: center;
      &.active {
        background-color: @primary;
      }
    }

    // .notify {
    //   position: fixed;
    //   left: 0;
    //   bottom: 100/@R;
    //   width: 100%;
    //   height: 60/@R;
    //   line-height: 60/@R;
    //   text-align: center;
    //   font-size: 24/@R;
    //   background-color: #F6EDE1;
    //   a {
    //     color: red;
    //   }
    // }
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0
  }
</style>
