// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import {
  collection,
  getDocs,
  addDoc,
  getFirestore,
  onSnapshot,
} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBJmtFVk6nJkgUiL3Yq9r1BwdYsw6H7A3o",
  authDomain: "generatorsource-c3ea4.firebaseapp.com",
  projectId: "generatorsource-c3ea4",
  storageBucket: "generatorsource-c3ea4.appspot.com",
  messagingSenderId: "510629378826",
  appId: "1:510629378826:web:82daead7d5c656d05458f3",
  measurementId: "G-6SWB89J39S",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)

const db = getFirestore(app)
const projets = collection(db, "projets")
const links = collection(db, "links")

const getDataLinks = await getDocs(links)

export { getDocs, addDoc, projets, links, onSnapshot, getDataLinks }