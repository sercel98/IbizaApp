import firebaseClient from "./firebaseClient";

class ProductService {
    PRODUCTS_COLLECTION = "products";

    constructor() {
        this.db = firebaseClient.firestoreDb;
    }
}