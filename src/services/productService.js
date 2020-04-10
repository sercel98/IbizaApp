import firebaseClient from "./firebaseClient";

class ProductService {
  PRODUCTS_COLLECTION = "products";
  constructor() {
    this.db = firebaseClient.firestoreDb;
    this._testingProducts = require("../../assets/products.json").products;
  }
  get testingProducts() {
    return this._testingProducts;
  }
}
const productService = new ProductService();
export default productService;
