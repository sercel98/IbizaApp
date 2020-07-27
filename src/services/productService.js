import firebaseClient from "./firebaseClient";
import getProducts from '../../assets/productsData';
class ProductService {
	PRODUCTS_COLLECTION = "products";

	constructor() {
		this.db = firebaseClient.firestoreDb;
	}


	async fetchProducts() {
		let productsCollection = this.db.collection('productos');

		const products = await productsCollection.where('active', '==', true).get();


		return products.docs.map(product => {
			const data = product.data();
			data.id = product.id;
			return data;
		});
	}


	async testingProducts() {
		return getProducts();
	}
}

const productService = new ProductService();
export default productService;
