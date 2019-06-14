//getting user data from localStorage
userName = localStorage.getItem("userName"); 
userWallet = parseFloat(localStorage.getItem("userWallet")); //converting string to float

//displaying user data
document.getElementById("userNameHeader").textContent = userName; 
document.getElementById("userWalletHeader").textContent = userWallet + "€";

displayListOfPayments();

function checkAddMoney() { //this function checks if the value entered is good, and if it the value will be saved, otherwise will display an error message
    userWallet = parseFloat(localStorage.getItem("userWallet")); //reloading the value
    var moneyToAdd = parseFloat(document.getElementById("inputAddMoney").value);
    var errorMessage = document.getElementById("invalidAddMoney");

    if(!moneyToAdd || moneyToAdd < 0){
        errorMessage.classList.remove("invisible");
    }
    else {
        userWallet += moneyToAdd;
        localStorage.setItem("userWallet", userWallet);
        errorMessage.classList.add("invisible");
        window.location.reload(false);
    }
}

function checkMakeTransaction() { //this function checks if the values entered is good, and if it the payment will be saved, otherwise will display an error message
    var amountOfMoney = parseFloat(document.getElementById("inputMakeTransaction").value);
    var elSelectTypeOfPayment = document.getElementById("typeOfPayments");
    var selectedOption = elSelectTypeOfPayment.options[elSelectTypeOfPayment.selectedIndex].value;
    var errorMessage = document.getElementById("invalidMakeTransactionData");
    var userWallet = parseFloat(localStorage.getItem("userWallet"));

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    
    today = mm + '/' + dd + '/' + yyyy; //the date will be saved in this format. ES: 08/30/2019

    if(amountOfMoney < 0 || !amountOfMoney || selectedOption == "default") { //invalid values
        errorMessage.classList.remove("invisible");
    }
    else { //payment can be saved
        //var payment = new Payment(amountOfMoney, selectedOption, today);
        var payment = new Object();
        payment.price = amountOfMoney;
        payment.type = selectedOption;
        payment.date = today;

        writeJSON(payment);

        var newUserWallet = userWallet - payment.price;
        localStorage.setItem("userWallet", newUserWallet);
        window.location.reload(false);
    }
}

function writeJSON(objToWrite) {
    var paymentCounter = parseInt(localStorage.getItem("numberOfPayments"));
    var nameOfPayment = "payment" + (paymentCounter);
    localStorage.setItem("numberOfPayments", (paymentCounter + 1));

    paymentJSON = JSON.stringify(objToWrite);
    localStorage.setItem(nameOfPayment, paymentJSON);
}

function displayListOfPayments() {
    var numberOfPayments = localStorage.getItem("numberOfPayments");
    var tableOfPayments =  document.getElementById("tableOfPayments");

    if(numberOfPayments < 1) { //there's no payment yet, will be displayed a message
        tableOfPayments.classList.add("invisible");
        document.getElementById("noPaymentYet").classList.remove("invisible");
    }
    else {
        var arrayOfPayments = getObjectsFromJSON(getJSONArray(numberOfPayments));

        for(var i = 0; i<arrayOfPayments.length; i++) {
            price = arrayOfPayments[i].price;
            type = arrayOfPayments[i].type;
            date = arrayOfPayments[i].date;
            addTableRow("tableOfPayments", i,  price, type, date);
        }
    }
}

function getObjectsFromJSON(JSONArray) { //this function converts the JSON strings in JS Objects
    var objectsArray = new Array();

    for(var i = 0; i<JSONArray.length; i++) {
        objectsArray[i] = JSON.parse(JSONArray[i]);
    }

    return objectsArray;
}

function getJSONArray(numberOfPayments) { //this returns an array of JSON strings that represents the payments did
    var currentName;
    var arrayOfPayments = new Array();

    for(var i = 0; i<numberOfPayments; i++) {
        currentName = "payment" + i;
        arrayOfPayments[i] = localStorage.getItem(currentName);
    }

    return arrayOfPayments;
}


function addTableRow(tableID, number, price, type, date) { 
    var table = document.getElementById(tableID);

    var row = table.insertRow(number+1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);

    cell1.innerHTML = number + 1;
    cell2.innerHTML = price + '€';
    cell3.innerHTML = type;
    cell4.innerHTML = date;
}