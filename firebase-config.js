firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const firebaseConfig = {
    apiKey: "AIzaSyBJsRhSpnnXvM3jwLJxWQf0jzQwIEDVx_8",
    authDomain: "crazytime-2d968.firebaseapp.com",
    projectId: "crazytime-2d968",
    storageBucket: "crazytime-2d968.appspot.com",
    messagingSenderId: "277085648275",
    appId: "1:277085648275:web:0e7d8ff6e9299bc9a3a466"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();
