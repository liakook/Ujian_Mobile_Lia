import Firebase from 'firebase'


var firebaseConfig = {
  // API Mas Fikri
    // apiKey: "AIzaSyAaNKKy80W9pHxTt_BcomvwA_OfvfeagkA",
    // authDomain: "managerapp-86dca.firebaseapp.com",
    // databaseURL: "https://managerapp-86dca.firebaseio.com",
    // projectId: "managerapp-86dca",
    // storageBucket: "managerapp-86dca.appspot.com",
    // messagingSenderId: "1046199915043",
    // appId: "1:1046199915043:web:d13b0205c07be23f"

    apiKey: "AIzaSyCkcw-ufkaYovxCxlXel07baS96ZIROvmw",
    authDomain: "managerapp-3ac2b.firebaseapp.com",
    databaseURL: "https://managerapp-3ac2b.firebaseio.com",
    projectId: "managerapp-3ac2b",
    storageBucket: "managerapp-3ac2b.appspot.com",
    messagingSenderId: "1054135253847",
    appId: "1:1054135253847:web:6dbd01ba0f57608e"

  };

export const Fire = Firebase.initializeApp(firebaseConfig)