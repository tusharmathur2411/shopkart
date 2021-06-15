import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyDfzITRrAfTOywSdrpHTg4v_CjmIaMao8A",
    authDomain: "shopkart-2411.firebaseapp.com",
    databaseURL: "https://shopkart-2411-default-rtdb.firebaseio.com",
    projectId: "shopkart-2411",
    storageBucket: "shopkart-2411.appspot.com",
    messagingSenderId: "222408394286",
    appId: "1:222408394286:web:a8c47b8c3bbd306f6e41bf"
};

firebase.initializeApp(firebaseConfig)

const db = firebase.database();
const auth = firebase.auth();

export { db, auth };