import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

const auth = getAuth();
const db = getFirestore();

// Check if Firebase Analytics is supported
isSupported().then((isSupported) => {
  if (isSupported) {
    getAnalytics();
  }
});

export { db, auth };
