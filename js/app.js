//getting user data from localStorage
userName = localStorage.getItem("userName"); 
userWallet = parseFloat(localStorage.getItem("userWallet")); //converting string to float

//displaying user data
document.getElementById("userNameHeader").textContent = userName; 
document.getElementById("userWalletHeader").textContent = userWallet + "€";

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
        //console.log(payment.date);
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