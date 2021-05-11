import { createContext } from 'react';
import Firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
const config = {
  apiKey: 'AIzaSyDc6mHeDJ9VRWw5gRVDqXv1p3zctpR_6js',
  authDomain: 'clone-instagram-8a70b.firebaseapp.com',
  projectId: 'clone-instagram-8a70b',
  storageBucket: 'clone-instagram-8a70b.appspot.com',
  messagingSenderId: '556834955',
  appId: '1:556834955:web:17e4be97fa6bb6c772f48e',
  measurementId: 'G-3D3QYHM8CK',
};
const FirebaseContext = createContext(null);
const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;
export { firebase, FieldValue };
export default FirebaseContext;
