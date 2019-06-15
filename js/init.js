function init() {
    var userName = localStorage.getItem("userName");
    var userWallet = localStorage.getItem("userWallet");
    var numberOfPayments = localStorage.getItem("numberOfPayments");
    var userRegistrationElement = document.getElementById("userRegistration");
    
    if(!numberOfPayments){ 
        localStorage.setItem("numberOfPayments", 0);
        document.getElementById("piechart").classList.add("invisible"); 

    if(userName && userWallet) { //going straight to the app bypassing the registration
        userRegistrationElement.classList.add("invisible");
        document.getElementById("app").classList.remove("invisible");
    }
    else{
        userRegistrationElement.classList.remove("invisible");
    }
}

function checkName() {
    var userName = document.getElementById("inputName").value;
    var invalidNameMessage = document.getElementById("invalidName");
    
    if(userName.length < 1) {
        invalidNameMessage.classList.remove("invisible"); //displaying error message
    }
    else {
        invalidNameMessage.classList.add("invisible"); //making the error text invisible
        document.getElementById("enterName").classList.add("invisible"); //making the name form invisible
        document.getElementById("userNameWallet").textContent = userName; //adding the name in the wallet form

        localStorage.setItem("userName", userName); //saving the name in localstorage

        document.getElementById("enterWallet").classList.remove("invisible"); //making the wallet form visible        
    }
}

function endRegistration() {
    var userWallet = parseFloat(document.getElementById("inputWallet").value);
    var invalidWalletMessage = document.getElementById("invalidWallet");
    var userName = localStorage.getItem("userName");

    if(!userWallet || userWallet < 0){
        invalidWalletMessage.classList.remove("invisible");
    }
    else {
        invalidWalletMessage.classList.add("invisible");
        document.getElementById("enterWallet").classList.add("invisible");

        localStorage.setItem("userWallet", userWallet);
        
        document.getElementById("app").classList.remove("invisible");

        //displaying user data in the header
        document.getElementById("userNameHeader").textContent = userName; 
        document.getElementById("userWalletHeader").textContent = userWallet + "€";
    }
}