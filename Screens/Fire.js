import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyATaL-xHVjegnNtFlr-7aWCndM5-oxCgtc",
  authDomain: "spar-14070.firebaseapp.com",
  databaseURL: "https://spar-14070-default-rtdb.firebaseio.com",
  projectId: "spar-14070",
  storageBucket: "spar-14070.appspot.com",
  messagingSenderId: "692689008796",
  appId: "1:692689008796:web:3eb5ca0943febefa66d559",
  measurementId: "G-M051Z10KK8"

};

export const app = initializeApp(firebaseConfig);
// MARK: Firestore Reference
export const db = getFirestore(app);