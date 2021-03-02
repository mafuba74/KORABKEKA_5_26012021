let myOrderInfo = localStorage.getItem('Orinoco-my-order')
let myOrderParsed = JSON.parse(myOrderInfo)
console.log(myOrderParsed)

let contactInfo = myOrderParsed.contact
console.log(contactInfo)

let order_id = myOrderParsed.orderId 
console.log(order_id)

let confirmation = document.getElementById('confirm-msg')

let displayOrderId = document.createElement('h2')
displayOrderId.style.fontSize = '24px'
displayOrderId.textContent = 'Commande n°: ' + order_id
confirmation.appendChild(displayOrderId)

let thankMsg = document.createElement('p')
thankMsg.textContent = "Nous vous remercions " + contactInfo.firstName + " " + contactInfo.lastName + " pour votre commande"
confirmation.appendChild(thankMsg)

let addressMsg = document.createElement('p')
addressMsg.textContent = "Elle vous sera envoyée dès qu'elle est prête à l'adresse: " + contactInfo.address + " " + contactInfo.city
confirmation.appendChild(addressMsg)

//localStorage.removeItem('Orinoco-my-order')