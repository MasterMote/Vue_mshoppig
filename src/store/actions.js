import { ADD_COUNTER, ADD_TO_CART } from './mutation-types'

export default {
    addCart(context, payload) {

        return new Promise((resolve, reject) => {
            //1.去找有没有存在商品与与现在商品一致
            let oldProduct = context.state.cartList.find(item => item.iid == payload.iid)

            //2.判断oldProduct
            if (oldProduct) {
                context.commit(ADD_COUNTER, oldProduct)
                resolve('该商品的数量已增加')
            } else {
                payload.count = 1
                context.commit(ADD_TO_CART, payload)
                resolve('商品已加入购物车')
            }
        })
    }
}