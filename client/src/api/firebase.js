import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyB8dEsample_drivefleet_key",
  authDomain: "drivefleet-ca.firebaseapp.com",
  projectId: "drivefleet-ca",
  storageBucket: "drivefleet-ca.firebasestorage.app",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abc123def456",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
