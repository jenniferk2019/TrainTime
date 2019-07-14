$(document).ready(function() {

    var firebaseConfig = {
        apiKey: "AIzaSyCMMc3qgx4bqPnPdJs-NjQdtwIZz1XXNT4",
        authDomain: "new-project-e0fad.firebaseapp.com",
        databaseURL: "https://new-project-e0fad.firebaseio.com",
        projectId: "new-project-e0fad",
        storageBucket: "new-project-e0fad.appspot.com",
        messagingSenderId: "315244355942",
        appId: "1:315244355942:web:ede7af7a4e24bf04"
      };
            firebase.initializeApp(config);
            var trainData = firebase.database();
            // var trainName = "";
            // var destination = "";
            // var firstTrain= "";
            // var frequency;
            $("#add-train").click(function (event) {
                event.preventDefault();
                trainName = $("#name-input").val().trim();
                destination = $("#destination-input").val().trim();
                firstTrain = $("#date-input").val().trim();
                frequency = $("#frequency-input").val().trim();
                // Code for handling the push
                var newTrain = {
                    trainName: trainName,
                    destination: destination,
                    firstTrain: firstTrain,
                    frequency: frequency
                }
                trainData.ref().push(newTrain);
                console.log("I added a new train")
            });
            trainData.ref().on("child_added", function (snapshot) {
                // storing the snapshot.val() in a variable for convenience
                var sv = snapshot.val();
                var newRow = $("<tr>");
                var nameData = $("<td>");
                nameData.text(sv.name);
                var roleData = $("<td>");
                roleData.text(sv.role);
                var dateData = $("<td>");
                dateData.text(sv.date);
                var rateData = $("<td>");
                rateData.text(sv.rate);
                // Console.loging the last user's data
                console.log(sv.name);
                console.log(sv.role);
                console.log(sv.date);
                console.log(sv.rate);
                newRow.append(nameData, roleData, dateData, rateData);
                $("tbody").append(newRow);
            });
});