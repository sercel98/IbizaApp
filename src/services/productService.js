import firebaseClient from "./firebaseClient";
import getProducts from '../../assets/products';
class ProductService {
  PRODUCTS_COLLECTION = "products";
  constructor() {
    this.db = firebaseClient.firestoreDb;
    this._testingProducts = getProducts();
    
  }
  get testingProducts() {
    return this._testingProducts;
  }
}
const productService = new ProductService();
export default productService;
