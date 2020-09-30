import { reactive, toRefs, watch, computed  } from 'vue'
    
export default function useProductList(router, products, pageSize) {
  const state = reactive({
    title: "Products",
    selectedProduct: null,
    filterName: '',
    sortName: 'modifiedDate',
    sortDir: 'desc',
    pageNumber: 0,
  })

  watch(state.filterName, (newValue, oldValue) => {
    state.pageNumber = 0;
  })

  const sort = (s) => {
    //if s == current sort, reverse order
    if(s === state.sortName) {
      state.sortDir = state.sortDir==='asc'?'desc':'asc';
    }
    state.sortName = s;
  }

  const nextPage = () => {
    state.pageNumber++;
    state.selectedProduct = null;
  }

  const prevPage = () => {
    state.pageNumber--;
    state.selectedProduct = null;
  }

  const onSelect = (product) => {
    router.push({ name: "product", params: { id: product.id } });
  }

  const pageCount = computed(() => {
    let l = filteredProducts.value.length,
    s = pageSize;
    return Math.floor(l / s);
  })
  const filteredProducts = computed(() => {
    let filter = new RegExp(state.filterName, 'i')
    return products.filter(el => el.name.match(filter))
  })
  const sortedFilteredProducts = computed(() => {
    return [...filteredProducts.value].sort((a,b) => {
      let modifier = 1;
      if(state.sortDir === 'desc') modifier = -1;
      if(a[state.sortName] < b[state.sortName]) return -1 * modifier;
      if(a[state.sortName] > b[state.sortName]) return 1 * modifier;
      return 0;
    })
  })
  const sortedFilteredPaginatedProducts = computed(() => {
    const start = state.pageNumber * pageSize,
          end = start + pageSize;

    return sortedFilteredProducts.value.slice(start, end);
  })

  return {
    sort,
    nextPage,
    prevPage,
    onSelect,
    pageCount,
    sortedFilteredPaginatedProducts,
      ...toRefs(state),
  }
}