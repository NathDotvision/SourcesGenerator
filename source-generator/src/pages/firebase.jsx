// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import {
  collection,
  getDocs,
  addDoc,
  getFirestore,
  onSnapshot,
  setDoc,
  doc,
  deleteDoc,
} from "firebase/firestore"

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
} from "firebase/auth"

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
const auth = getAuth(app)
// const analytics = getAnalytics(app)

const db = getFirestore(app)
const projets = collection(db, "projets")
const links = collection(db, "links")

let getDataLinks = await getDocs(links)

const getOnSnappLinks = []

onSnapshot(links, (doc) => {
  doc.docChanges().forEach((change) => {
    if (change.type === "added") {
      getOnSnappLinks.push(change.doc.data())
    }
    if (change.type === "modified") {
      // handle modified data if needed
    }
    if (change.type === "removed") {
      let index = getOnSnappLinks.findIndex(
        (item) => JSON.stringify(item) === JSON.stringify(change.doc.data())
      )
      if (index !== -1) {
        getOnSnappLinks.splice(index, 1)
      }
    }
  })
  getOnSnappLinks.sort((a, b) => a.id - b.id)
})

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User is signed in")
    console.log(user)
  } else {
    console.log("No user is signed in")
    console.log(getOnSnappLinks)
  }
})

const deleteLinks = async (id) => {
  const docToDelete = doc(db, "links", id)

  deleteDoc(docToDelete).then(console.log("Document successfully deleted!"))
}

export {
  getDocs,
  addDoc,
  projets,
  links,
  onSnapshot,
  getDataLinks,
  setDoc,
  db,
  doc,
  auth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  deleteLinks,
  getOnSnappLinks,
}
