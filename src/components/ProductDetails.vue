<template>
    <div v-if="product">
        <h2>{{toUppercase(product.name)}}</h2>
        <img :src="product.imageUrl ? product.imageUrl : 'https://placeimg.com/200/200/tech'" width="200" style="float:right" />
        <h3>{{product.description}}</h3>
        <p>Price: {{toCurrency(product.price)}}</p>
        <p>Fixed price? {{product.fixedPrice}}</p>
        <p>Discontinued? {{product.discontinued}}</p>
        <p>Modified date: {{toDate(product.modifiedDate)}}</p>
    </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex'
import { toCurrency, toUppercase, toDate } from './../helpers/filters';

    export default {
        data () {
            return {
                title: 'Product details',
                error: null,
                loading: false
            }
        },
        props: {
            id: {
                type:Number,
                required:true
            }
        },
        computed: {
            ...mapState(['product']), // map `this.product` to `this.$store.state.product`
        },
        methods: {
            toUppercase,
            toCurrency,
            toDate,
            ...mapActions(['fetchProduct']) // map `this.fetchProduct(this.id)` to `this.$store.dispatch('fetchProduct', this.id)`
        },
        created() {
            this.fetchProduct(this.id);
        }
    }
</script>

<style lang="scss" scoped>

</style>