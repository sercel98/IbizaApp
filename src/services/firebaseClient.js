import firebase from "firebase";
import "@firebase/firestore";
import firebaseConfig from "../config/firebaseConfig";
class FirebaseClient {
  constructor() {
    firebase.initializeApp(firebaseConfig);
    this._firestoreDb = firebase.firestore();
    this._storage = firebase.storage();
    this._auth = firebase.auth();
  }

  get firestoreDb() {
    return this._firestoreDb;
  }

  get storage() {
    return this._storage;
  }

  get auth() {
    return this._auth;
  }
}
const firebaseClient = new FirebaseClient();
export default firebaseClient;
