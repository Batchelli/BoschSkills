import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyALNipn4ZFmxfwIeqky8wT6fIs7lBSuwMY",
  authDomain: "boschskills-2024.firebaseapp.com",
  projectId: "boschskills-2024",
  storageBucket: "boschskills-2024.appspot.com",
  messagingSenderId: "506505528202",
  appId: "1:506505528202:web:02f7afc8360bb3d8c1be73",
  measurementId: "G-PLVGLYNQB2"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
const analytics = getAnalytics(app);