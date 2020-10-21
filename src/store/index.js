import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import customer from './modules/customer'
import product from './modules/product'
import order from './modules/order'
import comment from './modules/comment'


Vue.use(Vuex)
import waiters from './waiters/index'
const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    waiters,
    customer,
    product,
    order,
    comment

  },
  getters
})

export default store
