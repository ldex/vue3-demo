import { createStore } from 'vuex'

import ProductService from "@/services/ProductService.js";

export default createStore({
  state: {
    isLoading: false,
    products: [],
    product: {}
  },
  mutations: {
    SET_LOADING_STATUS(state) {
      state.isLoading = !state.isLoading;
    },
    SET_PRODUCTS(state, payload) {
      state.products = payload;
    },
    ADD_PRODUCT(state, product) {
      state.products.push(product)
    },
    SET_PRODUCT(state, payload) {
      state.product = payload;
    }
  },
  actions: {
    fetchProducts({commit}) {
      commit('SET_LOADING_STATUS');
      return ProductService.getProducts()
        .then(response => {
          commit('SET_PRODUCTS', response.data);
        })
        .finally(() => commit('SET_LOADING_STATUS'));      
    },
    fetchProduct({commit,getters}, id) {
      let p = getters.getProductById(id);
      if(p == null) {
        ProductService.getProduct(id)
          .then(response => {
            commit('SET_PRODUCT', response.data);
          })
      } else {
        commit('SET_PRODUCT', p);
      }
    },
    addProduct({commit}, newProduct) {
      return ProductService.insertProduct(newProduct)
        .then(() => {        
          commit('ADD_PRODUCT', newProduct);
        })
    }
  },
  getters: {
    getProductById: state => id => {
      return state.products.find(product => product.id === id);
    }
  }
  
})
