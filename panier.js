

let myStorage = JSON.parse(localStorage.getItem('products'))
console.log(myStorage)
let itemSection = document.querySelector('.items')

let panier = function(data){
    let totalprices = []
    for(let i = 0; i < data.length; i++){
        let itemInfo = document.createElement('tr')
        itemSection.appendChild(itemInfo)

        let itemImage = document.createElement('td')
        let image = document.createElement('img')
        image.setAttribute('src', data[i].img)
        image.setAttribute('class', 'thumbnail')
        let itemName = document.createElement('td')
        itemName.textContent = data[i].name
        let itemPrice = document.createElement('td')
        itemPrice.textContent = data[i].price 
        let quantity = document.createElement('td')
        quantity.textContent = data[i].quantity
        let totalItem = document.createElement('td')
        let itemTotalPrice = data[i].price * data[i].quantity
        totalItem.innerHTML = itemTotalPrice
        totalprices.push(itemTotalPrice)
        
        itemInfo.appendChild(itemImage)
        itemImage.appendChild(image)

        itemInfo.appendChild(itemName)
        itemInfo.appendChild(itemPrice)
        itemInfo.appendChild(quantity)
        itemInfo.appendChild(totalItem)
    }
    let totalPrice = 0
    for(let j = 0; j < totalprices.length; j++){
        totalPrice += totalprices[j]
    }
    let totalPanier = document.querySelector('.total')
    totalPanier.innerHTML = totalPrice
}

panier(myStorage)


class productId{
    constructor(product_id){
        this.product_id = product_id
    }
}
let myproducts = []
const getIds =function(data){
    for(let i = 0; i < data.length; i++){

        myproducts.push(data[i]._id)
    }
}
getIds(myStorage)

console.log(myproducts)

let myForm = document.querySelector('form')
let firstNameInput = document.getElementById('firstname')
let lastNameInput = document.getElementById('lastname')
let addressInput = document.getElementById('address')
let cityInput = document.getElementById('city')
let emailInput = document.getElementById('email')
let submitButton = document.querySelector('#commander')

let regexNames = /^[A-Za-z\u00C0-\u00FF][A-Za-z\u00C0-\u00FF-]{1,20}$/g
//let regexNames = /^\w{2,20}/g


let formHandler = function(inputs, regex){
    inputs.addEventListener('input', function(e){
        if(inputs.value.length == 0){
            return false
        }else if(regex.test(inputs.value) == true){
            return true
        }else{
            return false
        }
    })
    
}
formHandler(firstNameInput, regexNames)

myForm.addEventListener('submit', function(e){
    e.preventDefault()
    let myFormOrder = {
        firstName: firstNameInput.value,
        lastName: lastNameInput.value,
        address: addressInput.value,
        city: cityInput.value,
        email: emailInput.value
    }
    const envoiform = async function(){
        try{
        let myRequest = await fetch('http://localhost:3000/api/teddies/order', {
        method: 'POST', 
        headers : {
            'Content-type' : 'application/json'
        },
        body: JSON.stringify({contact: myFormOrder, products: myproducts})})
    let responseData = await myRequest.json({contact: myFormOrder, products: myproducts})
    // recuperer l'orderId
    window.location = 'confirmation.html'
    console.log(responseData)
    }
    catch(e){
        console.log(e)
    } 
    } 
    envoiform()   
})




/* 
myForm.addEventListener('submit', function(e) {
    e.preventDefault()

    let myFormOrder = {
        firstName: firstNameInput.value,
        lastName: lastNameInput.value,
        address: addressInput.value,
        city: cityInput.value,
        email: emailInput.value
    }

        fetch('http://localhost:3000/api/teddies/order', {
        method: 'POST', 
        headers : {
            'Content-type' : 'application/json'
        },
        body: JSON.stringify({contact: myFormOrder, products: myproducts})})
        .then(response => response.json())
        .then(data => {
            console.log(data)
        })
        .catch(error => console.error(error))

})
*/