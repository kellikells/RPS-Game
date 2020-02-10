$(document).ready(function () {

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
    var firstChoice = "";
    var secondChoice = "";
    var p1wins = 0;
    var p2wins = 0;

    // Get a reference to the database service
    var database = firebase.database();

    console.log("database.ref(): " + database.ref());


    // ============ FUNCTION: CLICK 'PLAY' BUTTON ============
    //                   setting username 
    // ------------------------------------------------------

    $("#playButton").on("click", function (event) {

        event.preventDefault();

        var opponentExists;

        // ---- Checking to see if there is an opponent 
        // ---- (purpose: if the user is p1 or p2 & if app has to set 'keys' to database)
        // ==================================================
        database.ref().once('value')
            .then(function (snapshot) {
                opponentExists = snapshot.exists();   //if this is true, then a player already exist
                console.log("opponentExists: " + opponentExists);

                if (opponentExists) {
                    p2name = $("#p-name").val().trim();
                    console.log("user is p2name: " + p2name);

                    database.ref().update({             //updating database
                        p2name: p2name
                    });
                    //other player has already set keys to the database => skip step to 'set' keys
                    firebaseWatcher();
                }
                else {
                    // --- username input 
                    p1name = $("#p-name").val().trim();

                    // --- setting these to firebase
                    database.ref().set({
                        p1name: p1name,
                        p2name: p2name,
                        firstChoice: firstChoice,
                        secondChoice: secondChoice,
                        p1wins: p1wins,
                        p2wins: p2wins
                    });
                    console.log("p1name: " + p1name);
                    firebaseWatcher();
                }
            });
    });//playButton on click 







    // ============== FUNCTION: game buttons ==================
    var choiceExists;
    var letter;

    $(".selection").on("click", function () {
        letter = $(this).attr("data-value");
        console.log("letter: " + letter);

        // if opponent hasn't clicked yet => user's letter is firstChocie 
        //else user's letter = secondChoice

        database.ref().once('value')
            .then(function (snapshot) {
                choiceExists = snapshot.val().firstChoice.exists();   //if this is true, then a player already exist
                console.log("choiceExists: " + choiceExists);

                if (choiceExists) {
                    letter = secondChoice;
                    console.log("user is the second choice: " + secondChoice + "and opponent is firstChoice: " + firstChoice);

                    database.ref().update({             //updating database
                        secondChoice: secondChoice
                    });
                    //other player has already set keys to the database => skip step to 'set' keys
                    firebaseWatcher();
                } else {
                    letter = firstChoice;
                    console.log("user is the firstChoice: " + firstChoice);

                    database.ref().update({
                        firstChoice: firstChoice
                    });
                }
            });
    });






    //========================= GAME LOGIC =========================
    // function gamePlay() {
    //     $(this).snapshot.val().firstChoice 
    // }





    // ======= FIREBASE WATCHER :.on("value") ==============
    function firebaseWatcher() {
        database.ref().on("value", function (snapshot) {

            console.log("snapshot.val() :" + snapshot.val());        //everything from the snapshot

            var sv = snapshot.val();        //easier to type for getting values

            // this is everything from the snapshot of the database 
            console.log("sv.p1name: " + sv.p1name);
            console.log("sv.p2name: " + sv.p2name);
            console.log("sv.firstChoice: " + sv.firstChoice);
            console.log("sv.secondChoice: " + sv.secondChoice);
            console.log("sv.p1wins: " + sv.p1wins);
            console.log("sv.p2wins: " + sv.p2wins);


            // ========= update HTML ============

            $("#p1Score").text(sv.p1name + " score:");
            $("#p2Score").text(sv.p2name + " score:");
            $("#p1wins").text(sv.p1wins);
            $("#p2wins").text(sv.p2wins);

        }, function (errorObject) {
            console.log("Errors handled: " + errorObject.code);
        });   //database.ref()
    }   //function firebaseWatcher

});  //document.ready