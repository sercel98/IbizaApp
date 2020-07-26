import firebaseClient from "./firebaseClient";
import getProducts from '../../assets/products';
class ProductService {
	PRODUCTS_COLLECTION = "products";

	constructor() {
		this.db = firebaseClient.firestoreDb;
		//this._products = getProducts();

		let products = db.collection('productos');

		this._products =  products.get().then(function(querySnapshot) {
				querySnapshot.forEach(function(doc) {
						// doc.data() is never undefined for query doc snapshots
						console.log(doc.id, " => ", doc.data());
				});
		});
		

	}




	get products() {
		return this._products;
	}
}

const productService = new ProductService();
export default productService;
