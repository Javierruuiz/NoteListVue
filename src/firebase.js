import { initializeApp } from 'firebase/app'
import { getFirestore, collection } from 'firebase/firestore'
// ... other firebase imports

export const firebaseApp = initializeApp({
        apiKey: "AIzaSyAr2eIZZsLPVFNVuUT2drhLtmeXUTirO6A",
        authDomain: "testfirestore-4af0c.firebaseapp.com",
        projectId: "testfirestore-4af0c",
        storageBucket: "testfirestore-4af0c.firebasestorage.app",
        messagingSenderId: "893800609055",
        appId: "1:893800609055:web:5f736b91af7646d2366c2a",
        measurementId: "G-SQ44X83FTE"
})

// used for the firestore refs
const db = getFirestore(firebaseApp)

// here we can export reusable database references
export const recordatoriosRef = collection(db, 'recordatorios')