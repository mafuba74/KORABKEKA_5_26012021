

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
let products = []
const getIds =function(data){
    for(let i = 0; i < data.length; i++){
        let prodId = new productId(data[i]._id)

        products.push(prodId)
    }
}
getIds(myStorage)

console.log(products)

let myForm = document.querySelector('form')
let submitButton = document.querySelector('#commander')

class contact{
    constructor(firstName, lastName, address, city, email){
        this.firstName = firstName
        this.lastName = lastName
        this.adress = address
        this.city = city
        this.email = email
    }
}
let myFormOrder = new contact('jean', 'dupont', '13 rue mozart', 'paris', 'pseudo@exemple.com')

/*let formHandler = function(){

}*/

const sendOrder = async function(data){
    try{
        let myRequest = await fetch('http://localhost:3000/api/teddies/order', {
        method: 'POST', 
        headers : {
            'Content-type' : 'application/json'
        },
        body: JSON.stringify(data)})
    let responseData = await myRequest.json(data)
    console.log(responseData)
    }
    catch(e){
        console.log(e)
    }    
}

sendOrder(myFormOrder + products)