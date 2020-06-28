import firebaseClient from "./firebaseClient";
import getProducts from '../../assets/products';
class ProductService {
    PRODUCTS_COLLECTION = "products";

    constructor() {
        this.db = firebaseClient.firestoreDb;
        this._testingProducts = getProducts();
    }

    test() {
        this.unsubscribe = this.db.collection(this.PRODUCTS_COLLECTION)
            .onSnapshot(function (snapshot) {
                snapshot.docChanges().forEach(function (change) {
                    if (change.type === "added") {
                        console.log("New product: ", change.doc.data());
                    }
                    if (change.type === "modified") {
                        console.log("Modified product: ", change.doc.data());
                    }
                    if (change.type === "removed") {
                        console.log("Removed product: ", change.doc.data());
                    }
                });
            });
    }

    get testingProducts() {
        return this._testingProducts;
    }
}

const productService = new ProductService();
export default productService;
