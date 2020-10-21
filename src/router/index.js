import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
 
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    //在vue-admin中，路由的状态是由子路由决定的，如果子路由有1个以上，那么该路由为嵌套路由，只有一个，该路由为根路由
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '影票售卖系统', icon: 'dashboard' }
    },]
  },
// 自定义一个模块（员工管理模块）
{
  path: '/waiters',
  component: Layout,
  children: [
    {
      path: 'index',
      name: 'Waiters',
      component: () => import('@/views/waiters/index'),
      meta: { title: '员工管理', icon: 'example' }
    }
  ]
},
{
  path: '/customer',
  component: Layout,
  children: [
    {
      path: 'index',
      name: 'Customer',
      component: () => import('@/views/customer/index'),
      meta: { title: '会员管理', icon: 'user' }
    }
  ]
},
{
  path: '/product',
  component: Layout,
  children: [
    {
      path: 'index',
      name: 'Product',
      component: () => import('@/views/product/index'),
      meta: { title: '影票管理', icon: 'tree' }
    },
  ]
},
{
  path: '/productDetail',
  component: Layout,
  hidden:true,
  children: [
    {
      path: 'index',
      name: 'productDetail',
      component: () => import('@/views/productDetail/index'),
      meta: { title: '详情管理', icon: 'form' }
    }
  ]
},
{
  path: '/order',
  component: Layout,
  children: [
    {
      path: 'index',
      name: 'Order',
      component: () => import('@/views/order/index'),
      meta: { title: '订单管理', icon: 'form' }
    }
  ]
},
{
  path: '/comment',
  component: Layout,
  children: [
    {
      path: 'index',
      name: 'Comment',
      component: () => import('@/views/comment/index'),
      meta: { title: '评论管理', icon: 'link' }
    }
  ]
},
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
