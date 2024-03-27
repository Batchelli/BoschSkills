import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyB4SWDExikiDovK-NIU1aAR8q83hEX2WpE",
    authDomain: "bosch-skills.firebaseapp.com",
    projectId: "bosch-skills",
    storageBucket: "bosch-skills.appspot.com",
    messagingSenderId: "909770880839",
    appId: "1:909770880839:web:6a2bb420072e36205bbe62",
    measurementId: "G-LG5NTJRMC1"
  };
  
  // Initialize Firebase
  export const app = initializeApp(firebaseConfig);
  export const storage = getStorage(app);
  