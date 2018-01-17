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
        <div class="total-price">合计：{{cart.total.toFixed(2)}}元</div>
        <div class="discounts" v-if="cart.discount">已优惠{{cart.discount.toFixed(2)}}元</div>
      </div>
    </div>
    <div class="pay-btn" :class="{ 'active': cart.count > 0 }" @click="addOrder">去支付</div>
  </div>
</template>

<script>
import { each, map, find, findIndex, sum, round, cloneDeep } from 'lodash'
import { mapGetters } from 'vuex'
import { Toast } from 'mint-ui'
import { calCartInfo } from '../../store/modules/home'
import weixin from 'weixin'

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
    weixin.init()
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
          realAmount: round(this.cart.total, 2),
          totalAmount: round(sum(map(this.cart.list, item => item.count * item.product.price)), 2),
          totalDiscounts: round(this.cart.discount, 2),
          isWallet: this.payType === 'yue'
        }

        if (this.cart.coupon) {
          params.couponNum = this.cart.coupon.numberCode
          params.couponAmount = this.cart.coupon.price
        }
        if (params.totalDiscounts && params.couponAmount) {
          params.discountAmount = round(params.totalDiscounts - params.couponAmount, 2)
        } else if (params.totalDiscounts) {
          params.discountAmount = round(params.totalDiscounts, 2)
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
                    let productList = cloneDeep(this.productList)
                    let cart = cloneDeep(this.cart)
                    each(ids, id => {
                      const p = find(data, { id })
                      const pIndex = findIndex(productList, { id })
                      const cIndex = findIndex(cart.list, (chr) => {
                        return chr.product.id === id
                      })
                      if (p) {
                        // 更新 productList
                        if (pIndex > -1) {
                          productList[pIndex] = cloneDeep(p)
                        }
                        // 更新 cart.list
                        if (cIndex > -1) {
                          cart.list[cIndex].product = cloneDeep(p)
                        }
                      } else {
                        // 商品下架了
                        if (pIndex > -1) {
                          productList.splice(pIndex, 1)
                        }
                        if (cIndex > -1) {
                          cart.list.splice(cIndex, 1)
                        }
                      }
                    })

                    this.$store.commit('home/setProductList', productList)
                    // 重算 cart 信息
                    const newCart = calCartInfo(cart, this.availableCouponList)
                    if (newCart) {
                      this.$store.commit('home/setCart', newCart)
                    } else {
                      // 通过 sever 来计算 cart
                      this.$store.dispatch('home/serverCalCartInfo', map(cart.list, item => {
                        return {
                          id: item.product.id,
                          price: item.product.price,
                          discountPrice: item.product.discountPrice,
                          num: item.count
                        }
                      }))
                    }
                    // this.$store.commit('home/setCart', calCartInfo(this.cart, newCouponList))
                    this.$store.commit('home/setPayType', this.cart.total <= this.user.money ? 'yue' : 'wx')
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
      weixin.weixinPay(params, (res) => {
        // go 支付成功
        if (res.err_msg === 'get_brand_wcpay_request:ok') { // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
          this.goPaySuc(params.orderNum)
        }
      })
    },
    // 支付成功页面
    goPaySuc (orderNum) {
      // reset cart
      this.$store.dispatch('home/clearCart')
      
      location.href = `${pageConfig.siteUrl}index/pay/success?orderNum=${orderNum}`
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
