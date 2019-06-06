var numberOfPayments = localStorage.getItem("numberOfPayments");
if(numberOfPayments) {
    // Load google charts
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);
} else {
    document.getElementById("piechart").classList.add("invisible");
}
var a = getChartData();
//console.log(getChartData());
// Draw the chart and set the chart values
function drawChart() {
    var data = google.visualization.arrayToDataTable(getChartData());

  // Optional; add a title and set the width and height of the chart
  var options = {'width':600, 'height':400};

  // Display the chart inside the <div> element with id="piechart"
  var chart = new google.visualization.PieChart(document.getElementById('piechart'));
  chart.draw(data, options);
}

function getChartData() {
    var chartData = new Array();
    chartData = [
        ['Category', 'Expense']
    ];
    var objectsArray = getObjectsFromJSON();

    for(var i = 0; i<objectsArray.length; i++) {
        chartData[i+1] = [objectsArray[i].type, parseFloat(objectsArray[i].price)];
    }
    return chartData;
}

function getObjectsFromJSON() { // TODO: I have to group toghether the expenses with the same type. It's fucking hard, i know :()
    var JSONArray = getJSONArray(numberOfPayments);
    var objectsArray = new Array();
    var currentObject;
    
    for(var i = 0; i<JSONArray.length; i++) {
        currentObject = JSON.parse(JSONArray[i]);
        objectsArray[i] = currentObject;
    }
    return objectsArray;
}