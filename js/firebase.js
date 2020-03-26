var firebaseConfig = {
    apiKey: "AIzaSyA-qsu_Q98hfrnTwT7118KllwVzAuLuBSA",
    authDomain: "restaurantesmatamoros.firebaseapp.com",
    databaseURL: "https://restaurantesmatamoros.firebaseio.com",
    projectId: "restaurantesmatamoros",
    storageBucket: "restaurantesmatamoros.appspot.com",
    messagingSenderId: "383927893628",
    appId: "1:383927893628:web:e66244c01ea90742e053f9",
    measurementId: "G-LPLDS3BG8S"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  var storage = firebase.storage();