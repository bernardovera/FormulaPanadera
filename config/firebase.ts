import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBYOPcDHpfuB97haDhEzdfVgxCLnoOYAmc',
  authDomain: 'formulapanadera-93e78.firebaseapp.com',
  projectId: 'formulapanadera-93e78',
  storageBucket: 'formulapanadera-93e78.firebasestorage.app',
  messagingSenderId: '377601270360',
  appId: '1:377601270360:android:07dd9316228a85007c602d',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);