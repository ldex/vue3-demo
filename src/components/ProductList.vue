<template>
    <div>
        <h2>{{ title }}</h2>
        <fieldset>
          Sort by: 
          <button @click="sort('name')">Name</button>
          <button @click="sort('price')">Price</button>
          <button @click="sort('modifiedDate')">Date</button>
          <span>Filter by name: <input v-model="filterName" /></span>
        </fieldset>
        <ul class="products">
            <li v-for="product in sortedFilteredPaginatedProducts" v-bind:key="product.id"
                v-bind:class='{ discontinued: product.discontinued, selected: product === selectedProduct }'
                :title="JSON.stringify(product)"
                @click="onSelect(product)">
                <slot :product="product">
                  {{ product.name }}
                </slot>
            </li>
        </ul>
        <div class="right">
          <router-link to="/product/insert">Create new product</router-link>
        </div>
        <button @click="prevPage" :disabled="pageNumber==0">
          Previous
        </button>
        <button @click="nextPage" :disabled="pageNumber >= pageCount-1">
          Next
        </button>
    </div>    
</template>

<script>
    export default {
        props: {
          products: {
            type: Array
          },
          pageSize: {
            type: Number,
            required: false,
            default: 5
          }
        },
        data() {
          return {
            title: "Products",
            selectedProduct: null,
            filterName: '',
            sortName: 'modifiedDate',
            sortDir: 'desc',
            pageNumber: 0,
          }
        },
        watch: {
          // reset pagination when filtering
          filterName(newValue, oldValue) {
            this.pageNumber = 0;
          },
          // reset pagination when sorting
          sortName(newValue, oldValue) {
            this.pageNumber = 0;
          },
          sortDir(newValue, oldValue) {
            this.pageNumber = 0;
          }
        },
        methods: {  
          sort:function(s) {
            //if s == current sort, reverse order
            if(s === this.sortName) {
              this.sortDir = this.sortDir==='asc'?'desc':'asc';
            }
            this.sortName = s;
          },
          nextPage() {
            this.pageNumber++;
            this.selectedProduct = null;
          },
          prevPage() {
            this.pageNumber--;
            this.selectedProduct = null;
          },
          onSelect(product) {
            this.$router.push({ name: "product", params: { id: product.id } });
          }
        },
        computed: {
          pageCount() {
            let l = this.filteredProducts.length,
              s = this.pageSize;
            return Math.floor(l / s);
          },
          filteredProducts() {
            let filter = new RegExp(this.filterName, 'i')
            return this.products.filter(el => el.name.match(filter))
          },
          sortedFilteredProducts() {
            return [...this.filteredProducts].sort((a,b) => {
              let modifier = 1;
              if(this.sortDir === 'desc') modifier = -1;
              if(a[this.sortName] < b[this.sortName]) return -1 * modifier;
              if(a[this.sortName] > b[this.sortName]) return 1 * modifier;
              return 0;
            })
          },
          sortedFilteredPaginatedProducts() {
            const start = this.pageNumber * this.pageSize,
                  end = start + this.pageSize;

            return this.sortedFilteredProducts.slice(start, end);
          }
        },
    }
</script>

<style lang="css" scoped>
  .products {
    margin: 0;
    list-style-type: none;
    padding: 0;
  }
  .products li {
    cursor: pointer;
    position: relative;
    left: 0;
    background-color: #EEE;
    margin: .5em;
    padding: .3em 0em;
    height: 1.6em;
    border-radius: 4px;
  }

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