import firebaseClient from "./firebaseClient";
import getOrders from "../../assets/ordersData";

class OrderService {
  ORDERS_COLLECTIONS = "orders";

  constructor() {
    this.db = firebaseClient.firestoreDb;
  }

  getOrdersCollection() {
    return this.db.collection(this.ORDERS_COLLECTIONS);
  }

  async save(order) {
    const newDocRef = await this.getOrdersCollection().add(order);
    return newDocRef.id;
  }
  mockSave(order) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 2000);
    });
  }
  testingData() {
    return getOrders();
  }
}

const orderService = new OrderService();
export default orderService;
