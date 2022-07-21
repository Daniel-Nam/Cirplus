import { initializeApp } from 'firebase/app'
import {
	getAuth,
	GoogleAuthProvider,
	FacebookAuthProvider,
	signInWithPopup,
	onAuthStateChanged,
	signOut,
} from 'firebase/auth'
import {
	getFirestore,
	getDoc,
	setDoc,
	doc,
	query,
	collection,
	updateDoc,
	where,
	getDocs,
} from 'firebase/firestore'

const firebaseConfig = {
	apiKey: 'AIzaSyDEZ4EVQJu6zNs3xzKn7nXuSrMNqm_DP80',
	authDomain: 'cirplus-id.firebaseapp.com',
	projectId: 'cirplus-id',
	storageBucket: 'cirplus-id.appspot.com',
	messagingSenderId: '457129831826',
	appId: '1:457129831826:web:be2d497b9c76ba50fce54b',
	measurementId: 'G-YR4B2N125T',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

export {
	app,
	auth,
	signInWithPopup,
	GoogleAuthProvider,
	FacebookAuthProvider,
	onAuthStateChanged,
	signOut,
	db,
	doc,
	getDoc,
	setDoc,
	query,
	collection,
	where,
	getDocs,
	updateDoc,
}
