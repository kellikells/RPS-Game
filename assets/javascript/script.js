




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

// --- initializing firebase --------
firebase.initializeApp(config);

// ============= SET INITIAL VALUES ===================
// ----------------------------------------------------
// --- key properties for firebase
var p1name = "";
var p2name = "";
var p1choice = "";
var p2choice = "";
var p1wins = 0;
var p2wins = 0;

// Get a reference to the database service
var database = firebase.database();

console.log(database.ref());


// ============ FUNCTION: CLICK 'PLAY' BUTTON ============
// ------------------------------------------------------

$("#playButton").on("click", function (event) {

    event.preventDefault();

    var playerExists;

    // ---- Checking to see if there is an opponent 
    // ---- know if the user is p1 or p2
    //==================================================
    // database.ref().once('value')
    //     .then(function (snapshot) {
    //         playerExists = snapshot.exists();   //if this is true, then a player already exist
    //         console.log(playerExists);

    //         if (playerExists) {
    //             p2name = $("#p-name").val().trim();
    //         }
    //     })



    // username input 
    p1name = $("#p-name").val().trim();

    //setting these to firebase
    database.ref().set({
        p1name: p1name,
        p2name: p2name,
        p1choice: p1choice,
        p2choice: p2choice,
        p1wins: p1wins,
        p2wins: p2wins
    });
    console.log(p1name);
});


// ============== FUNCTION: game buttons ==================



$("#work").on("click", function() {
    var letter = $(this).attr("data-value");
    console.log(letter);
})








//========================= GAME LOGIC =========================
// function gamePlay() {
//     $(this).snapshot.val().p1choice 
// }





// ======= FIREBASE WATCHER :.on("value") ==============

database.ref().on("value", function (snapshot) {

    console.log(snapshot.val());        //everything from the snapshot

    var sv = snapshot.val();        //easier to type for getting values

    // this is everything from the snapshot of the database 
    console.log(sv.p1name);
    console.log(sv.p2name);
    console.log(sv.p1choice);
    console.log(sv.p2choice);
    console.log(sv.p1wins);
    console.log(sv.p2wins);

    

}, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
});


