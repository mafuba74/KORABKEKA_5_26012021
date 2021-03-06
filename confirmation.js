
//on récupère les infos de la commande dans le local storage
let myOrderInfo = localStorage.getItem('Orinoco-my-order')
let myOrderParsed = JSON.parse(myOrderInfo)
console.log(myOrderParsed)

// on récupère les infos de contacte (nom prénom...)
let contactInfo = myOrderParsed.contact
console.log(contactInfo)

//on récupère l'id de la commande
let order_id = myOrderParsed.orderId 
console.log(order_id)

// on se connecte à l'élément du DOM qui a l'id #confirm-msg
let confirmation = document.getElementById('confirm-msg')

//on crée un élément h2 et on y affiche l'id de la commande
let displayOrderId = document.createElement('h2')
displayOrderId.style.fontSize = '24px'
displayOrderId.textContent = 'Commande n°: ' + order_id
confirmation.appendChild(displayOrderId)

//on crée un élément p et on y affiche un message de remerciment personnalisé
let thankMsg = document.createElement('p')
thankMsg.textContent = "Nous vous remercions " + contactInfo.firstName + " " + contactInfo.lastName + " pour votre commande"
confirmation.appendChild(thankMsg)

//on crée un élément p et on y confirme l'adresse de livraison de l'utilisateur
let addressMsg = document.createElement('p')
addressMsg.textContent = "Elle vous sera envoyée dès qu'elle est prête à l'adresse: " + contactInfo.address + " " + contactInfo.city
confirmation.appendChild(addressMsg)

// on clear le local storage des données de notre application
localStorage.removeItem('Orinoco-my-order')
localStorage.removeItem('products')