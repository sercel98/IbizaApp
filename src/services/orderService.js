import firebaseClient from "./firebaseClient";
import getOrders from "../../assets/ordersData";

class OrderService {
  ORDERS_COLLECTIONS = "orders";
  STATUS_CONFIRMED = "confirmed";
  STATUS_PENDING = "pending";
  STATUS_CANCELLED = "cancelled";

  constructor() {
    this.db = firebaseClient.firestoreDb;
  }

  getOrdersCollection() {
    return this.db.collection(this.ORDERS_COLLECTIONS);
  }
  getOrdersCollectionQuery() {
    return this.getOrdersCollection()
      .where("status", "==", this.STATUS_PENDING)
      .orderBy("createdAt", "asc");
  }

  async save(order) {
    order.createdAt = new Date();
    order.status = this.STATUS_PENDING;
    const newDocRef = await this.getOrdersCollection().add(order);
    return newDocRef.id;
  }

  async cancelOrder(id) {
    const docRef = await this.getOrdersCollection().doc(id);
    docRef
      .update({ status: this.STATUS_CANCELLED })
      .then(function () {
        //throw alert
        console.log("Document successfully updated!");
      })
      .catch(function (error) {
        //throw alert
        console.error("Error updating document: ", error);
      });
  }

  async confirmOrder(id) {
    const docRef = await this.getOrdersCollection().doc(id);
    docRef
      .update({ status: this.STATUS_CONFIRMED })
      .then(function () {
        //throw alert
        console.log("Document successfully updated!");
      })
      .catch(function (error) {
        //throw alert
        console.error("Error updating document: ", error);
      });
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
