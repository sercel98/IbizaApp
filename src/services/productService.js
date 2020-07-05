import firebaseClient from "./firebaseClient";
import getProducts from '../../assets/products';
class ProductService {
	PRODUCTS_COLLECTION = "products";

	constructor() {
		this.db = firebaseClient.firestoreDb;
		this._products = getProducts();
	}

	get products() {
		return this._products;
	}
}

const productService = new ProductService();
export default productService;
