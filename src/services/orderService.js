import firebaseClient from "./firebaseClient";

class OrderService {
    ORDERS_COLLECTIONS = "orders";

    constructor() {
        this.db = firebaseClient.firestoreDb;
    }

    async save(order) {
        const newDocRef = await this.db.collection(this.ORDERS_COLLECTIONS)
            .add(order);
        return newDocRef.id;
    }
}

const orderService = new OrderService();
export default orderService;
