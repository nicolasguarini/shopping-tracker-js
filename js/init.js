function init() {
    var userName = localStorage.getItem("userName");
    var userWallet = localStorage.getItem("userWallet");

    if(userName && userWallet) { //going straight to the app bypassing the registration
        document.getElementById("userRegistration").classList.add("invisible");
        document.getElementById("app").classList.remove("invisible");
    }
    else{
        document.getElementById("userRegistration").classList.remove("invisible");
    }
}

function checkName() {
    userName = document.getElementById("inputName").value; //saving the name in a global variable.
    //is global because "endRegistration()" need to know the userName
    
    if(userName.length < 1) {
        document.getElementById("invalidName").classList.remove("invisible"); //displaying error message
    }
    else {
        document.getElementById("invalidName").classList.add("invisible"); //making the error text invisible
        document.getElementById("enterName").classList.add("invisible"); //making the name form invisible
        document.getElementById("userNameWallet").textContent = userName; //adding the name in the wallet form

        localStorage.setItem("userName", userName); //saving the name in localstorage

        document.getElementById("enterWallet").classList.remove("invisible"); //making the wallet form visible        
    }
}

function endRegistration() {
    var userWallet = document.getElementById("inputWallet").value;

    if(!userWallet || userWallet < 0){
        document.getElementById("invalidWallet").classList.remove("invisible");
    }
    else {
        document.getElementById("invalidWallet").classList.add("invisible");
        document.getElementById("enterWallet").classList.add("invisible");

        localStorage.setItem("userWallet", userWallet);
        
        document.getElementById("app").classList.remove("invisible");

        //displaying user data in the header
        document.getElementById("userNameHeader").textContent = userName; 
        document.getElementById("userWalletHeader").textContent = userWallet + "€";
    }
}