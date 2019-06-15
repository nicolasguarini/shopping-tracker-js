var numberOfPayments = localStorage.getItem("numberOfPayments");

if(!numberOfPayments || numberOfPayments == 0) {
    document.getElementById("piechart").classList.add("invisible");
} else {
    // Load google charts
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);
}


// Draw the chart and set the chart values
function drawChart() {
    var data = google.visualization.arrayToDataTable(getChartData());

    // Optional; add a title and set the width and height of the chart
    var options = {'width':"600vh", 'height':400};

    // Display the chart inside the <div> element with id="piechart"
    var chart = new google.visualization.PieChart(document.getElementById('piechart'));
    chart.draw(data, options);
}

function getChartData() {
    var chartData = [
        ['Category', 'Expense']
    ];
    var objectsArray = getObjectsFromJSON(getJSONArray(localStorage.getItem("numberOfPayments")));

    for(var i = 0; i<objectsArray.length; i++) {
        var index = checkIfIsPresent(chartData, objectsArray[i].type);

        if(index != null)   
            chartData[index][1] += objectsArray[i].price; //adding the price of the current element to the already existing category
        else 
            chartData[chartData.length] = [objectsArray[i].type, parseFloat(objectsArray[i].price)]; //adding a new array to 'chartData' because the category is not already present
    }

    return chartData; //returning a clean array of array with the right informations
}

function checkIfIsPresent(array, stringToCheck) {
    for (var i = 0; i<array.length; i++)    if(array[i][0] == stringToCheck) return i;

    //if the string is present will be returned the index of it, if not, will be returned null
    return null; 
}
