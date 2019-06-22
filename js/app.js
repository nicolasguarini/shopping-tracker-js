const checkAddMoney = () => { //this function checks if the value entered is good, and if it the value will be saved, otherwise will display an error message
    userWallet = parseFloat(localStorage.getItem("userWallet")) //reloading the value
    let moneyToAdd = parseFloat(document.getElementById("inputAddMoney").value)
    let errorMessage = document.getElementById("invalidAddMoney")

    if(!moneyToAdd || moneyToAdd < 0){
        errorMessage.classList.remove("invisible")
    }
    else {
        userWallet += moneyToAdd
        localStorage.setItem("userWallet", userWallet)
        errorMessage.classList.add("invisible")
        window.location.reload(false)
    }
}

const checkMakeTransaction = () => { //this function checks if the values entered is good, and if it the payment will be saved, otherwise will display an error message
    let amountOfMoney = parseFloat(document.getElementById("inputMakeTransaction").value)
    let elSelectTypeOfPayment = document.getElementById("typeOfPayments")
    let selectedOption = elSelectTypeOfPayment.options[elSelectTypeOfPayment.selectedIndex].value
    let errorMessage = document.getElementById("invalidMakeTransactionData")
    let userWallet = parseFloat(localStorage.getItem("userWallet"))

    let today = new Date()
    let dd = String(today.getDate()).padStart(2, '0')
    let mm = String(today.getMonth() + 1).padStart(2, '0')
    let yyyy = today.getFullYear()
    
    today = mm + '/' + dd + '/' + yyyy //the date will be saved in this format. ES: 08/30/2019

    if(amountOfMoney < 0 || !amountOfMoney || selectedOption == "default") { //invalid values
        errorMessage.classList.remove("invisible")
    }
    else { //payment can be saved
        //let payment = new Payment(amountOfMoney, selectedOption, today)
        let payment = new Object()
        payment.price = amountOfMoney
        payment.type = selectedOption
        payment.date = today

        writeJSON(payment)

        let newUserWallet = userWallet - payment.price
        localStorage.setItem("userWallet", newUserWallet)
        window.location.reload(false)
    }
}

const writeJSON = objToWrite => {
    let paymentCounter = parseInt(localStorage.getItem("numberOfPayments"))
    let nameOfPayment = "payment" + (paymentCounter)
    localStorage.setItem("numberOfPayments", (paymentCounter + 1))

    paymentJSON = JSON.stringify(objToWrite)
    localStorage.setItem(nameOfPayment, paymentJSON)
}

const displayListOfPayments = () => {
    let numberOfPayments = localStorage.getItem("numberOfPayments")
    let tableOfPayments =  document.getElementById("tableOfPayments")

    if(numberOfPayments < 1) { //there's no payment yet, will be displayed a message
        tableOfPayments.classList.add("invisible")
        document.getElementById("noPaymentYet").classList.remove("invisible")
    }
    else {
        let arrayOfPayments = getObjectsFromJSON(getJSONArray(numberOfPayments))

        for(let i = 0; i<arrayOfPayments.length; i++) {
            price = arrayOfPayments[i].price
            type = arrayOfPayments[i].type
            date = arrayOfPayments[i].date
            addTableRow("tableOfPayments", i,  price, type, date)
        }
    }
}

const getObjectsFromJSON = JSONArray => { //this function converts the JSON strings in JS Objects
    let objectsArray = new Array()

    for(let i = 0; i<JSONArray.length; i++) {
        objectsArray[i] = JSON.parse(JSONArray[i])
    }

    return objectsArray
}

const getJSONArray = numberOfPayments => { //this returns an array of JSON strings that represents the payments did
    let currentName
    let arrayOfPayments = new Array()

    for(let i = 0; i<numberOfPayments; i++) {
        currentName = "payment" + i
        arrayOfPayments[i] = localStorage.getItem(currentName)
    }

    return arrayOfPayments
}

const addTableRow = (tableID, number, price, type, date) => { 
    let table = document.getElementById(tableID)

    let row = table.insertRow(number+1)
    let cell1 = row.insertCell(0)
    let cell2 = row.insertCell(1)
    let cell3 = row.insertCell(2)
    let cell4 = row.insertCell(3)

    cell1.innerHTML = number + 1
    cell2.innerHTML = price + '€'
    cell3.innerHTML = type
    cell4.innerHTML = date
}


//getting user data from localStorage
userName = localStorage.getItem("userName") 
userWallet = parseFloat(localStorage.getItem("userWallet")) //converting string to float

//displaying user data
document.getElementById("userNameHeader").textContent = userName 
document.getElementById("userWalletHeader").textContent = userWallet + "€"

displayListOfPayments()