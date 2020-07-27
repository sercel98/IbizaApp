import firebaseClient from "./firebaseClient";
import getProducts from '../../assets/products';
class ProductService {
	PRODUCTS_COLLECTION = "products";

	constructor() {
		this.db = firebaseClient.firestoreDb;
		this._products = getProducts();
	}


	async fetchProducts(){ 
		let productsCollection = this.db.collection('productos');
		
		const products = await productsCollection.where('active', '==', true).get();

		console.log(products); 

		return products.docs.map(product => product.data());
	}


	async testingProducts() {
		return this._products;
	}
}

const productService = new ProductService();
export default productService;
