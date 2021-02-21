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