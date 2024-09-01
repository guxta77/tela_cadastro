import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBecAQOm66MC_mjwzZpwsoYhPaDSlCGicA",
  authDomain: "myapp-c533f.firebaseapp.com",
  projectId: "myapp-c533f",
  storageBucket: "myapp-c533f.appspot.com",
  messagingSenderId: "78374486191",
  appId: "1:78374486191:web:5a41958b0e89b47146d45a",
  measurementId: "G-LV15S0GS1G"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export { firestore };
