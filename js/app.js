//getting user data from localStorage
userName = localStorage.getItem("userName"); 
userWallet = parseFloat(localStorage.getItem("userWallet"));

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