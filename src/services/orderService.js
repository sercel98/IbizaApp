import firebaseClient from "./firebaseClient";

class OrderService {
    ORDERS_COLLECTIONS = "orders";

    constructor() {
        this.db = firebaseClient.firestoreDb;
    }
    getOrdersCollection() {
        return this.db.collection(this.ORDERS_COLLECTIONS)
    }

    async save(order) {
        const newDocRef = await this.getOrdersCollection()
            .add(order);
        return newDocRef.id;
    }
}

const orderService = new OrderService();
export default orderService;
