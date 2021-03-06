
/**
 * myStorage récupère le local storage au JSON et le parse
 */
let myStorage = JSON.parse(localStorage.getItem('products'))
console.log(myStorage)

//si le local storage est vide on affiche un message qui indique que le panier est vide
if(localStorage.products == undefined){
    document.querySelector('table').style.display = 'none'
    let emptyPanier = document.createElement('h2')
    emptyPanier.style.color = 'red'
    emptyPanier.textContent = "Votre panier est vide"
    let panierSection = document.querySelector('.panier-bloc')
    panierSection.appendChild(emptyPanier)
}

let itemSection = document.querySelector('.items')

/**
 * 
 * récupère les donnés et créé le tableau du panier  
 */
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

//panier traite les données de myStorage 
panier(myStorage)


class productId{
    constructor(product_id){
        this.product_id = product_id
    }
}

let myproducts = []

/**
 * 
 * getIds récupère les id des différents teddy's présent dans le localStorage et les mets dans le tableau myproducts 
 */
const getIds =function(data){
    for(let i = 0; i < data.length; i++){

        myproducts.push(data[i]._id)
    }
}
getIds(myStorage)

console.log(myproducts)

/**
 * partie formulaire
 */
let myForm = document.querySelector('form')
let formFields = myForm.querySelectorAll('input')

let firstNameInput = document.getElementById('firstname')
let infoFirstName = document.getElementById('firstNameInfo')
let nameError = 'Attention, cette saisie est invalide, veuillez vérifier l\'orthographe et l\'absence de caractère inadéquats'

let lastNameInput = document.getElementById('lastname')
let infoLastName = document.getElementById('lastNameInfo')


let addressInput = document.getElementById('address')
let infoAddress = document.getElementById('addressInfo')
let addressError = 'Attention, cette adresse est invalide, veuillez verifier l\'orthographe de votre saisie'


let cityInput = document.getElementById('city')
let infoCity = document.getElementById('cityInfo')
let cityError = 'Attention, ce nom de ville est invalide, veuillez verifier l\'orthographe de votre saisie'

let emailInput = document.getElementById('email')
let infoEmail = document.getElementById('emailInfo')
let emailError = 'attention cet email est invalide, veuillez vérifier votre saisie'


let submitButton = document.querySelector('#commander')

let inputCount = 0

//regex pour le formulaire
let regexNames = /^[A-Za-z\u00C0-\u00FF][A-Za-z\u00C0-\u00FF-]{1,20}(?<!-)$/
let regexAddress = /^[A-Za-z0-9\u00C0-\u00FF][A-Za-z0-9\u00C0-\u00FF-' ]{10,35}(?<!-)$/
let regexCity = /^[A-Za-z\u00C0-\u00FF][A-Za-z\u00C0-\u00FF-' ]+(?<!-)$/
let regexEmail = /^[ A-Za-z0-9][\w-]*@[\w-]+\.[A-Za-z]{2,}$/

class Formular{
    constructor(dominput, dominputvalue, infoNode, errorInfo, regex, validity){
        this.dominput = dominput
        this.dominputvalue = dominputvalue
        this.infoNode = infoNode
        this.errorInfo = errorInfo
        this.regex = regex
        this.validity = validity
    }
    /**
     * testValue test l'input de l'utilisateur avec le regex
     * si l'input est correct passe validity à true et incrément l'inputCount
     * autrement affiche un message à l'utilisateur pour lui indiquer que son input est mauvais
     */
    testValue(){
        if(this.regex.test(this.dominputvalue) == true){
            this.validity = true
            inputCount++
            console.log(inputCount)           
        }else{
            this.dominput.setAttribute('class', 'invalid')
            this.infoNode.style.color = 'red'
            this.infoNode.textContent = this.errorInfo
        }
    }
}

/**
 * on soumet le formulaire et on l'envoi à l'api qui nous retourne notre commande, le contenu du formulaire et un id de commande
 */
myForm.addEventListener('submit', function(e){
    e.preventDefault()
    let firstNameValue = firstNameInput.value
    let lastNameValue = lastNameInput.value
    let addressValue = addressInput.value
    let cityValue = cityInput.value
    let emailValue = emailInput.value

    let firstName = new Formular(firstNameInput, firstNameValue, infoFirstName, nameError, regexNames, false)
    let lastName = new Formular(lastNameInput, lastNameValue, infoLastName, nameError, regexNames, false)
    let address = new Formular(addressInput, addressValue, infoAddress, addressError, regexAddress, false)
    let city = new Formular(cityInput, cityValue, infoCity, cityError, regexCity, false)
    let email = new Formular(emailInput, emailValue, infoEmail, emailError, regexEmail, false)

    let formArray = [firstName, lastName, address, city, email]
    // on teste chaque instance Formular dans formArray 
    for(let i = 0; i < formArray.length; i++){
        formArray[i].testValue()
    }
    if(inputCount === formArray.length){
        let myFormOrder = {
            firstName: firstNameInput.value,
            lastName: lastNameInput.value,
            address: addressInput.value,
            city: cityInput.value,
            email: emailInput.value
        }
        /**
         * envoiform est une fonction asynchrone qui fait une requete ajax grace à la méthode fetch
         * elle envoi un objet qui contient les valeurs des différents input du formulaire et un tableau des id des teddy's de notre panier
         * elle récupère la réponse de la requete et la met dans le local storage avec la key 'Orinoco-my-order'
         * et redirige l'utilisateur vers la page de confirmation de commande
         */
    const envoiform = async function(){
        try{
            let myRequest = await fetch('http://localhost:3000/api/teddies/order', {
            method: 'POST', 
            headers : {
                'Content-type' : 'application/json'
            },
            body: JSON.stringify({contact: myFormOrder, products: myproducts})})
            let responseData =await myRequest.json({contact: myFormOrder, products: myproducts})
            localStorage.setItem('Orinoco-my-order', JSON.stringify(responseData))
            window.location = 'confirmation.html'
            console.log(responseData)
            console.log(localStorage)
        }catch(e){
            inputCount = 0
            console.log(e)
        }     
    }
    envoiform()
    }else{
        inputCount = 0
    }  
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