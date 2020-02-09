

// --- my app's firebase configuration
  var config = {
    apiKey: "AIzaSyCdYYUQlhAMk9Hpb9fs9RrgqWNcxeKnMmg",
    authDomain: "rps-game-6a3c3.firebaseapp.com",
    databaseURL: "https://rps-game-6a3c3.firebaseio.com",
    projectId: "rps-game-6a3c3",
    storageBucket: "rps-game-6a3c3.appspot.com",
    messagingSenderId: "499992130787",
    appId: "1:499992130787:web:fef1184ad28373fc01c1d6"
  };
// --- initializing firebase 
  firebase.initializeApp(config);

  // Get a reference to the database service
  var database = firebase.database();


// ============ FUNCTION: CLICK PLAY BUTTON ============
// ----------------- SET INITIAL VALUES-----------------
$("#playButton").on("click", function(){

    database.ref().on("value", function(snapshot){
        
    })
})


// --- key properties for firebase
var p1name="";
var p2name="";
var p1choice="";
var p2choice="";
var p1wins= 0;
var p2wins= 0;


// username input 
p1name = $("#p1-name").val().trim();