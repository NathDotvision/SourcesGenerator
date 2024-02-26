/**
 * Import the functions you need from the SDKs you need
 */
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

/**
 * Configuration object for Firebase
 */
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

const db = getFirestore(app)
const projets = collection(db, "projets")
const links = collection(db, "links")

/**
 * Get the data from the 'links' collection
 */
let getDataLinks = await getDocs(links)

const getOnSnappLinks = []

/**
 * Listen for changes in the 'links' collection
 */
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

/**
 * Listen for changes in the authentication state
 */
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User is signed in")
    console.log(user)
  } else {
    console.log("No user is signed in")
    console.log(getOnSnappLinks)
  }
})

/**
 * Delete a document from the 'links' collection
 * @param {string} id - The ID of the document to delete
 */
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
