var url = "https://train-sheduler.firebaseio.com";
var name ='';

$(document).ready(function () {
    
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



});