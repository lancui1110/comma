<template>
  <div class="pay-bar" :class="{'no-choose-any': cart.count <= 0}">
    <!-- <transition name="fade">
      <div class="notify" v-if="notifyUserLogin">小主，专属红包已存入账户啦～<router-link :to="{ name: 'login' }">【一键领取】</router-link></div>
    </transition> -->
    <div class="order-detail" @click="toggleSelProducts">
      <div class="logo">
        <i v-if="cart.count > 0" class="icon icon-head-top"></i>
        <i v-else class="icon icon-head-top-none"></i>
        <span v-if="cart.count > 0" class="product-count">{{cart.count}}</span>
      </div>
      <div class="pay-info">
        <div v-if="cart.count > 0">
          <p v-if="cart.discount" class="discounts">已优惠：- ¥{{cart.discount.toFixed(2)}}</p>
          <p class="total-price" :class="{ 'has-discount' : cart.discount}">合计：¥{{cart.total.toFixed(2)}}</p>
        </div>
        <p v-else class="no-choose">还未选购商品</p>
      </div>
    </div>
    <div class="pay-btn" @click="addOrder">去支付</div>

  </div>
</template>

<script>
import { each, map, find, findIndex, sum, round, cloneDeep } from 'lodash'
import { mapGetters } from 'vuex'
import { Toast } from 'mint-ui'
import { calCartInfo } from '../../store/modules/home'

export default {
  name: 'PayBar',
  computed: {
    ...mapGetters({
      cart: 'home/getCart',
      productList: 'home/getProductList',
      availableCouponList: 'coupons/availableCouponList',
      notifyUserLogin: 'user/notifyUserLogin',
      user: 'user/getUser'
    })
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
          totalDiscounts: round(this.cart.discount, 2)
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
              // reset cart
              this.$store.dispatch('home/clearCart')
              // go to '/pay'
              // this.$router.push({ name: 'pay', query: { orderNum: res.data.orderNum } })
              location.href = `${pageConfig.siteUrl}index/pay?orderNum=${res.data.orderNum}`
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
                    this.$store.commit('home/setCart', calCartInfo(cart, this.availableCouponList))
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
    background: #593C38;
    color: #fff;
    font-size: 30/@R;
    z-index: 1000;
    &.no-choose-any {
      color: #999;
    }
    .order-detail {
      flex: 1;
      display: flex;
      .logo {
        position: relative;
        width: 126/@R;
        text-align: center;
      }
      .icon {
        width: 77/@R;
        height: 77/@R;
        background-size: 77/@R 77/@R;
      }
      .product-count{
        font-family: PingFangHK-Medium;
        position: absolute;
        top: 11/@R;
        left: 79/@R;
        display: inline-block;
        min-width: 34/@R;
        height: 34/@R;
        line-height: 34/@R;
        background: #C30000;
        color: #fff;
        border-radius: 17/@R;
        padding: 0 7/@R;
        font-size: 20/@R;
      }
      .pay-info {
        flex: 1;
        display: flex;
        align-items: center;
      }
      .no-choose {

      }
      .discounts {
        font-size: 24/@R;
        line-height: 33/@R;
        padding-top: 12/@R;
      }
      .total-price.has-discount{
        line-height: 42/@R;
        margin-bottom: 11/@R;
      }
    }

    .pay-btn {
      background: #26100D;
      font-size: 36/@R;
      width: 240/@R;
      text-align: center;
    }

    .notify {
      position: fixed;
      left: 0;
      bottom: 100/@R;
      width: 100%;
      height: 60/@R;
      line-height: 60/@R;
      text-align: center;
      font-size: 24/@R;
      background-color: #F6EDE1;
      a {
        color: red;
      }
    }
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0
  }
</style>
