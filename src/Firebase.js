import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// export default function StartFirebase() {
const firebaseConfig = {
  apiKey: "AIzaSyAG6FFtYV9NEeod2fRANxq3wuerqKDlTcc",
  authDomain: "vpa-app-1cd4f.firebaseapp.com",
  databaseURL: "https://vpa-app-1cd4f-default-rtdb.firebaseio.com",
  projectId: "vpa-app-1cd4f",
  storageBucket: "vpa-app-1cd4f.appspot.com",
  messagingSenderId: "486588720384",
  appId: "1:486588720384:web:f42985a4b27b02145dbfe5",
};
const app = initializeApp(firebaseConfig);
//return getDatabase(app);
export const storage = getStorage(app);
