import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import Products from './views/Products.vue'
import ProductDetails from '@/components/ProductDetails.vue';
import ProductInsert from '@/components/ProductInsert.vue';
import Error from './views/Error.vue';


function castRouteParamsId(route) {
  return {
    id: Number(route.params.id),
  };
}

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/products',
    name: 'products',
    component: Products
  },
  {
    path: '/product/insert', // order important! before :id
    name: 'productInsert',
    component: ProductInsert
  },
  {
    path: '/products/:id',
    name: 'product',
    component: ProductDetails,
    props: castRouteParamsId
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'error',
    component: Error
  }
]

export default createRouter({
  history: createWebHistory(),
  routes: routes
})
