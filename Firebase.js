import * as firebase from 'firebase';
import firestore from 'firebase/firestore'



const config = {
  apiKey: "AIzaSyBSHeCLbODv72raI0ALFS6wZ-5Zi2X7_p0",
  authDomain: "productslist-7e5e2.firebaseapp.com",
  databaseURL: "https://productslist-7e5e2.firebaseio.com",
  projectId: "productslist-7e5e2",
  storageBucket: "productslist-7e5e2.appspot.com",
  messagingSenderId: "496322399335"
};
firebase.initializeApp(config);

//firebase.firestore().settings(settings);

export default firebase;
