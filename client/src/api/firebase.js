import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBg4r56_YRe96I2hs335oJuFEHv0XZKp1A",
  authDomain: "drive-fleet-e6a44.firebaseapp.com",
  projectId: "drive-fleet-e6a44",
  storageBucket: "drive-fleet-e6a44.firebasestorage.app",
  messagingSenderId: "379327451202",
  appId: "1:379327451202:web:6b094d58e2058ac1449ddb",
  measurementId: "G-JLPMQ8VDM1",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
