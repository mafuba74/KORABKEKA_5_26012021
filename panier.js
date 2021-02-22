

let myStorage = JSON.parse(localStorage.getItem('products'))
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

let itemIds = []
const getIds =function(data){
    for(let i = 0; i < data.length; i++){
        itemIds.push(data[i].id)
    }
}
getIds(myStorage)

let myForm = document.querySelector('form')
let submitButton = document.querySelector('#commander')

class formOrder{
    constructor(firstName, lastName, adress, city, email){
        this.firstName = firstName
        this.lastName = lastName
        this.adress = adress
        this.city = city
        this.email = email
    }
}

let formHandler = function(){

}

const sendOrder = async function(data){
    let myRequest = await fetch('http://localhost:3000/api/teddies/order', {
        method: 'POST', 
        headers : {
            'Content-type' : 'application/json'
        },
        body: JSON.stringify(data)})
    let responseData = await myRequest.json(data)
    console.log(responseData)
}

sendOrder(itemIds)
