$( document ).ready(function() {

            var config = {
                apiKey: "AIzaSyB_EHbAh6fz0PYaM4oc0w4r70LgE0TuBVE",
                authDomain: "strongpoint-22712.firebaseapp.com",
                databaseURL: "https://strongpoint-22712.firebaseio.com",
                projectId: "strongpoint-22712",
                storageBucket: "strongpoint-22712.appspot.com",
                messagingSenderId: "471113406244",
                appId: "1:471113406244:web:0f53d94ec981cd25"
            };
            firebase.initializeApp(config);
            var database = firebase.database();
            var name = "";
            var role = "";
            var date = "";
            var rate = 0;
            $("#add-employee").on("click", function (event) {
                event.preventDefault();
                name = $("#name-input").val().trim();
                role = $("#role-input").val().trim();
                date = $("#date-input").val().trim();
                rate = $("#rate-input").val().trim();
                // Code for handling the push
                database.ref().push({
                    name: name,
                    role: role,
                    date: date,
                    rate: rate,
                    dateAdded: firebase.database.ServerValue.TIMESTAMP
                });
            });
            database.ref().on("child_added", function (snapshot) {
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