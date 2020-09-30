<template>
    <div>
        <section v-if="error">
            {{error.message}}
        </section>
        <section v-else>
          <div v-if="loading">
              <h2>Loading products...</h2>
          </div>
          <product-list-comp v-else :products="products" :page-size="5">
            <template v-slot="slotProps">
              <span class="name">{{ toUppercase(slotProps.product.name) }}</span>
              <span class="description">{{ slotProps.product.description }}</span>
              <span class="price">{{ toCurrency(slotProps.product.price) }}</span>
            </template>
          </product-list-comp>
        </section>
    </div>
</template>

<script>
import ProductList from '@/components/ProductList.vue';
import ProductListComp from '@/components/ProductListComp.vue';
import { mapState, mapActions } from 'vuex';
import { toCurrency, toUppercase } from './../helpers/filters';

export default {
  name: 'app',
  components: {
  //  ProductList,
    ProductListComp
  },
  data() {
    return {
      error: null
    }
  },
  methods: {
    toCurrency,
    toUppercase,
    ...mapActions(['fetchProducts']) // map `this.fetchProducts()` to `this.$store.dispatch('fetchProducts')`
  },
  computed: {
    ...mapState(['products','isLoading']), // map `this.products` to `this.$store.state.products`
    ...mapState({loading:'isLoading'}) // map `this.loading` to `this.$store.state.isLoading`
  },
  created () {
      this.fetchProducts();
  },
}
</script>

<style lang="css" scoped>
  .products li:hover {
    color: #607D8B;
    background-color: yellow;
    left: .1em;
  } 
  .products li:hover .name,
  .products li:hover .price {
    color: #607D8B;
    background-color: #FFD800;
    left: .1em;
  } 
  .products li.selected {
    background-color: #0094FF;
    color: white;
  }
  .products li.selected:hover {
    color: white;
  }
  .products li.selected .name,
  .products li.selected .price {
    background-color: #0026FF;
    color: white;
  }
  .products .text {
    position: relative;
    top: -3px;
  }
  .products .name {
    display: inline-block;
    font-size: small;
    color: white;
    padding: 0.8em 0.7em 0em 0.7em;
    background-color: #607D8B;
    line-height: 1em;
    position: relative;
    left: -1px;
    top: -4px;
    height: 1.8em;
    margin-right: .8em;
    border-radius: 4px 0px 0px 4px;
    width: 30%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .products .price {
    float: right;
    width: 15%;
    font-size: small;
    color: white;
    padding: 0.8em 0.7em 0em 0.7em;
    background-color: #607D8B;
    line-height: 1em;
    position: relative;
    left: -1px;
    top: -4px;
    height: 1.8em;
    margin-left: .8em;
    border-radius: 0px 4px 4px 0px;
  }
  .products .description {
    height: 1.8em;
    display: inline-block;
    width: 40%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .products .discontinued, .products .discontinued * {
    color: red !important;
  }
</style>