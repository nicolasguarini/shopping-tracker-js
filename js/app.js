//getting user data from localStorage
userName = localStorage.getItem("userName"); 
userWallet = localStorage.getItem("userWallet");

//displaying user data
document.getElementById("userNameHeader").textContent = userName; 
document.getElementById("userWalletHeader").textContent = userWallet + "€";