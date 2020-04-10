import firebase from 'firebase'
import '@firebase/firestore';
import firebaseConfig from "../config/firebaseConfig";
class FirebaseClient {
    constructor() {
        firebase.initializeApp(firebaseConfig);
        this._firestoreDb = firebase.firestore();
        this._storage = firebase.storage();
    }

    get firestoreDb() {
        return this._firestoreDb;
    }

    get storage() {
        return this._storage;
    }
}
const firebaseClient = new FirebaseClient();
export default firebaseClient;