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
            firebase.initializeApp(firebaseConfig);
            var trainData = firebase.database();
            var trainName = "";
            var destination = "";
            var firstTrain= "";
            var frequency;
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
                nameData.text(sv.trainName);
                var destinationData = $("<td>");
                destinationData.text(sv.destination);
                var frequencyData = $("<td>");
                frequencyData.text(sv.frequency);

                var firstTime = sv.firstTrain;
                var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
                var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
                var tRemainder = diffTime % sv.frequency;
                var tMinutesTillTrain = sv.frequency - tRemainder;
                var nextTrain = moment().add(tMinutesTillTrain, "minutes");

                //create new td for 1) next train time +add this text: moment(nextTrain).format("hh:mm") 
                var nextTrainData = $("<td>");
                nextTrainData.text(moment(nextTrain).format("hh:mm"));
                var tMinutesTillTrainData = $("<td>");
                tMinutesTillTrainData.text(tMinutesTillTrain);
                //and 2) minutes until the arrival

                // Console.loging the last user's data
                console.log(sv.trainName);
                console.log(sv.destination);
                console.log(sv.firstTrain);
                console.log(sv.frequency);
                newRow.append(nameData, destinationData, frequencyData, nextTrainData, tMinutesTillTrainData);
                $("tbody").append(newRow);
            });
});