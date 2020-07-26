import firebaseClient from "./firebaseClient";
import getProducts from '../../assets/products';
class ProductService {
	PRODUCTS_COLLECTION = "products";

	constructor() {
		this.db = firebaseClient.firestoreDb;
		//this._products = getProducts();

		this.__products = this.loadData();
		console.log(this.__products);
	}

	loadData = async () => {

		let products = this.db.collection('productos');

		let allProduct =  await products.get();
		console.log("hola");

		console.log(allProduct);
		const documentData = allProduct.docs.map(document => document.data());
		//console.log(documentData);

		return documentData;
	}


	get products() {
		return this._products;
	}
}

const productService = new ProductService();
export default productService;
