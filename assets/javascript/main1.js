// Initialize Firebase
var config = {
    apiKey: "AIzaSyAM9vklXoH_28nOxUNSo82VpDZiHKIeVcc",
    authDomain: "my-first-project-mh.firebaseapp.com",
    databaseURL: "https://my-first-project-mh.firebaseio.com",
    projectId: "my-first-project-mh",
    storageBucket: "my-first-project-mh.appspot.com",
    messagingSenderId: "982241292312"
};


firebase.initializeApp(config);

var database = firebase.database();

$("#submit-btn").on("click", function(event) {
    event.preventDefault();

    // Get input
    var tName = $("#name-input").val().trim();
    var tDest = $("#role-input").val().trim();
    var tStart = $("#start-input").val().trim();
    var tFreq = $("#rate-input").val().trim();

    var newT = {
        name: tName,
        role: tDest,
        start: tStart,
        freq: tFreq
    };

    // Add employee data to the database
    database.ref().push(newT);

    // Alert
    alert("Employee successfully added");

    // Clears all of the text-boxes
    $("#name-input").val("");
    $("#role-input").val("");
    $("#start-input").val("");
    $("#rate-input").val("");
});

// Behavior when new employee is added to db
database.ref().on("child_added", function(childSnapshot, prevChildKey) {
    // Create new employee jQuery obj and add to #empList div
    makeRow(childSnapshot.val());
});

// Calculates number of months an employee has worked
function calcMonths(empStart) {
    var startDate = moment(empStart);
    var empMonths = startDate.fromNow('months');
    console.log(empMonths);

    return empMonths;
}


// Calculate remaining minutes to arrival.

function tArrival(tStart, tFreq ){
    // var tFreq = 45;
     var tFreq = moment().minutes(Number);
    // Time is 3:30 AM

    // var firstTime = "03:30";
    var firstTime = moment().minute(Number);

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemMins = diffTime % tFreq;
    console.log(tRemMins );

    // Next Train
    var nextArrival = moment().add(tMinsAway, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextArrival).format("hh:mm"));

     // Minute Until Train
    var tMinsAway = tFreq - tRemMins ;
    console.log("MINUTES TILL TRAIN: " + tMinsAway);


return nextArrival;
return tMinsAway;
    }
 
tArrival();






// Takes an emp (employee) object and adds a new row to #empList with employee data
function makeRow(emp) {
    var empName = emp.name;
    var empRole = emp.role;
    var empStart = emp.start;
    var empRate = emp.rate;
    var empMonths = calcMonths(empStart);
    var empBilled = total(empMonths, empRate);

    console.log("Name: " + empName);
    console.log("Role: " + empRole);
    console.log("Start: " + empStart);
    console.log("Rate: " + empRate);
    console.log("Months worked: " + empMonths);
    console.log("Total billed: " + empBilled);

    var employee = $("<tr>");
    var name = $("<td>").text(empName);
    var role = $("<td>").text(empRole);
    var startDate = $("<td>").text(empStart);
    var monthsWorked = $("<td>").text(empMonths);
    var rate = $("<td>").text(empRate);
    var totalBilled = $("<td>").text(empBilled);

    employee.append(name, role, startDate, monthsWorked, rate, totalBilled);
    $("#empList").append(employee);
}

// Calulate total amount billed to employee
function total(empMonths, empRate) {
    var empBilled = parseInt(empMonths) * parseFloat(empRate);
    console.log(empBilled);
    return empBilled;
}
