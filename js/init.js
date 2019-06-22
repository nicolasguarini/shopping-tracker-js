const init = () => {
    let userName = localStorage.getItem("userName")
    let userWallet = localStorage.getItem("userWallet")
    let numberOfPayments = localStorage.getItem("numberOfPayments")
    let userRegistrationElement = document.getElementById("userRegistration")
    
    if(!numberOfPayments || numberOfPayments == 0){ 
        localStorage.setItem("numberOfPayments", 0)
        document.getElementById("piechart").classList.add("invisible") 
    }
    if(userName && userWallet) { //going straight to the app bypassing the registration
        userRegistrationElement.classList.add("invisible")
        document.getElementById("app").classList.remove("invisible")
    }
    else{
        userRegistrationElement.classList.remove("invisible")
    }
}

const checkName = () => {
    let userName = document.getElementById("inputName").value
    let invalidNameMessage = document.getElementById("invalidName")
    
    if(userName.length < 1) {
        invalidNameMessage.classList.remove("invisible") //displaying error message
    }
    else {
        invalidNameMessage.classList.add("invisible") //making the error text invisible
        document.getElementById("enterName").classList.add("invisible") //making the name form invisible
        document.getElementById("userNameWallet").textContent = userName //adding the name in the wallet form

        localStorage.setItem("userName", userName) //saving the name in localstorage

        document.getElementById("enterWallet").classList.remove("invisible") //making the wallet form visible        
    }
}

const endRegistration = () => {
    let userWallet = parseFloat(document.getElementById("inputWallet").value)
    let invalidWalletMessage = document.getElementById("invalidWallet")
    let userName = localStorage.getItem("userName")

    if(!userWallet || userWallet < 0){
        invalidWalletMessage.classList.remove("invisible")
    }
    else {
        invalidWalletMessage.classList.add("invisible")
        document.getElementById("enterWallet").classList.add("invisible")

        localStorage.setItem("userWallet", userWallet)
        
        document.getElementById("app").classList.remove("invisible")

        //displaying user data in the header
        document.getElementById("userNameHeader").textContent = userName 
        document.getElementById("userWalletHeader").textContent = userWallet + "€"
    }
}