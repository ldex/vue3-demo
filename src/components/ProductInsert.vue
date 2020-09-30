<template>
  <form @submit.prevent="onSubmit" novalidate>
    <h2>Add product</h2>
    <div v-if="errors.length" class="errorMessage">
      <b>Please correct the following error(s):</b>
      <ul>
        <li v-for="error in errors" :key="error">{{ error }}</li>
      </ul>
    </div>
    <div class="form-group">
      <img :src="product.imageUrl" width="200" style="float:right">
      <label for="productName">Product name</label>
      <input
        type="text"
        v-model.trim="product.name"
        class="form-control"
        id="productName"
        required
        maxlength="32"
        placeholder="Enter product name"
      >
    </div>
    <div class="form-group">
      <label for="productDescription">
        Product description
        <small class="text-muted">(optional)</small>
      </label>
      <textarea
        class="form-control"
        v-model.trim="product.description"
        id="productDescription"
        rows="3"
        maxlength="128"
        placeholder="Enter description"
      ></textarea>
    </div>
    <div class="form-group">
      <label for="price">Price</label>
      <input
        type="number"
        v-model.number="product.price"
        class="form-control"
        id="price"
        placeholder="Enter Price"
        required
        number
      >
    </div>
            <div class="form-group">
            <label for="discontinued">Discontinued?</label>
            <input type="checkbox" v-model="product.discontinued" 
                class="form-control"
                id="discontinued">
        </div>

        <div class="form-group">
            <label for="fixedPrice">Fixed price?</label>
            <input type="checkbox" v-model="product.fixedPrice" 
                class="form-control"
                id="fixedPrice">
        </div>
      <div style="margin: 10px">
        <button type="submit">Save product</button>
      </div>

      <img :src="product.imageUrl" width="200" />
  </form>
</template>

<script>

export default {
  data() {
    return {
      product: {},
      errors: []
    };
  },
  methods: {
    onSubmit() {
      if (this.product.name && this.product.price) {
        let newProduct = {
          name: this.product.name,
          price: this.product.price,
          description: this.product.description
        };
        console.log(newProduct);
        this.$store.dispatch('addProduct', newProduct)
        .then(response => {
          this.$router.push({ name: 'products'});
          })
          .catch(error => {
            console.log('There was an error:', error.response)
          });
      } else {
        this.errors = [];
        if (!this.product.name) this.errors.push("Name required.");
        if (!this.product.price) this.errors.push("Price required.");
      }
    }
  }
};
</script>

<style lang="css" scoped>
input:active, 
input:focus, 
input:hover, 
textarea:active, 
textarea:focus, 
textarea:hover { 
  background-color: lightyellow; 
  border-color: yellow; 
} 

label {
    clear: both;
    float:left;
    width: 120px;
}
.errorMessage {
  color: red;
}
</style>