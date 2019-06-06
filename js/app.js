//getting user data from localStorage
userName = localStorage.getItem("userName"); 
userWallet = parseFloat(localStorage.getItem("userWallet")); //converting string to float

//displaying user data
document.getElementById("userNameHeader").textContent = userName; 
document.getElementById("userWalletHeader").textContent = userWallet + "€";

displayListOfPayments();

function checkAddMoney() {
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

function checkMakeTransaction() {
    var amountOfMoney = parseFloat(document.getElementById("inputMakeTransaction").value);
    var elSelectTypeOfPayment = document.getElementById("typeOfPayments");
    var selectedOption = elSelectTypeOfPayment.options[elSelectTypeOfPayment.selectedIndex].value;
    var errorMessage = document.getElementById("invalidMakeTransactionData");
    var userWallet = parseFloat(localStorage.getItem("userWallet"));

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    
    today = mm + '/' + dd + '/' + yyyy;

    if(amountOfMoney < 0 || !amountOfMoney || selectedOption == "default") {
        errorMessage.classList.remove("invisible");
    }
    else {
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

    if(numberOfPayments < 1) {
        tableOfPayments.classList.add("invisible");
        document.getElementById("noPaymentYet").classList.remove("invisible");
    }
    else {
        var arrayOfPayments = getJSONArray(numberOfPayments);
        var currentPayment;
        var price, type, date; 

        for(var i = 0; i<arrayOfPayments.length; i++) {
            currentPayment = JSON.parse(arrayOfPayments[i]);
            price = currentPayment.price;
            type = currentPayment.type;
            date = currentPayment.date;
            addTableRow("tableOfPayments", i,  price, type, date);
        }
    }
}

function getJSONArray(numberOfPayments) {
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