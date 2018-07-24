var url = "https://train-sheduler.firebaseio.com";
var dataRef = new Firebase(url);
var name = '';
var destination = '';
var firstTrainTime = '';
var frequency = '';
var nextTrain = '';
var currentTime = '';
var diffTime = '';
var nextTrainFormatted = '';
var minutesAway = '';
var firstTimeConverted = '';
var tRemainder = '';
var minutesTillTrain = '';
var keyHolder = '';
var getKey = '';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyDwPLaBLFsgi0GCzKKwf7kHdx3XqbYhN8o",
    authDomain: "train-sheduler.firebaseapp.com",
    databaseURL: "https://train-sheduler.firebaseio.com",
    projectId: "train-sheduler",
    storageBucket: "",
    messagingSenderId: "770469942314"
};
firebase.initializeApp(config);

var database = firebase.database();

$(document).ready(function () {

    database.ref("/train-sheduler").on("child_added", function (snapshot) {

        $("#add-train").on("click", function () {
            name = $('#name-input').val().trim();
            destination = $('#destination-input').val().trim();
            firstTrainTime = $('#first-train-time-input').val().trim();
            frequency = $('#frequency-input').val().trim();
            firstTimeConverted = moment(firstTrainTime, "hh:mm").subtract(1, "years");
            currentTime = moment();
            diffTime = moment().diff(moment(firstTimeConverted), "minutes");
            tRemainder = diffTime % frequency;
            minutesTillTrain = frequency - tRemainder;
            nextTrain = moment().add(minutesTillTrain, "minutes");
            nextTrainFormatted = moment(nextTrain).format("hh:mm");

            // Code for the push
            keyHolder = dataRef.push({
                name: name,
                destination: destination,
                firstTrainTime: firstTrainTime,
                frequency: frequency,
                nextTrainFormatted: nextTrainFormatted,
                minutesTillTrain: minutesTillTrain
            });

            $('#name-input').val('');
            $('#destination-input').val('');
            $('#first-train-time-input').val('');
            $('#frequency-input').val('');

            return false;
        });

    });

});