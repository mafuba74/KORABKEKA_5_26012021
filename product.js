//récupère l'url et la separe 
let urlInfo = window.location.href
let urlSplit = urlInfo.split('?')

//récupère les elements du DOM
let teddyName = document.querySelector('.title')
let teddyImg = document.querySelector('.card-img-top')
let teddyDescribe = document.querySelector('.card-text')
let teddyPrice = document.querySelector('.price')
let selectColor = document.querySelector('#choose-color')

//requete ajax
let myRequest = new XMLHttpRequest()
    
    myRequest.onreadystatechange = function(){
        if(this.readyState == XMLHttpRequest.DONE && this.status == 200){
            let results = JSON.parse(this.responseText)
            checkTeddy(results)
        }
    }
    myRequest.open("GET", "http://localhost:3000/api/teddies")
    myRequest.send()

    

    //compare l'ID dans l'url pour trouver l'item selectionné puis construit le contenu et sauvegarde l'item dans le localStorage
    let checkTeddy = function(data){
        for(let i = 0; i < data.length; i++){
            
            if(urlSplit[1] == data[i]._id){
                const newProduct = new products(data[i].name, data[i]._id, data[i].price, data[i].imageUrl, 1)
                storageItem(newProduct)
                teddyName.textContent = data[i].name
                teddyImg.setAttribute('src', data[i].imageUrl)
                teddyDescribe.textContent = data[i].description
                teddyPrice.textContent = data[i].price + " €"
                
                //créer les options de couleurs
                for(let j = 0; j < data[i].colors.length; j++){
                    let colorOption = document.createElement('option')
                    colorOption.setAttribute('value', data[i].colors[j])
                    colorOption.textContent = data[i].colors[j]
                    selectColor.appendChild(colorOption)
                }
            }          
        }
    }

    let button = document.querySelector('.panier')
    

    class products{
        constructor(name, id, price, img, quantity){
            this.name = name
            this.id = id
            this.price = price
            this.img = img
            this.quantity = quantity
        }
        addQuantity(){
            this.quantity++
        }
        
    }

    let storageItem = function(obj){
        button.addEventListener('click', function(e){
            
            //e.preventDefault()

            let prodTable = []
            
            if(localStorage.getItem('products') == null){
                prodTable.push(obj)
                localStorage.setItem('products', JSON.stringify(prodTable))
            }else if(localStorage.getItem('products').includes(obj.id)){
                let getStorage = JSON.parse(localStorage.getItem('products'))
                for(let i = 0; i < getStorage.length; i++){
                    if(JSON.stringify(getStorage[i]).includes(obj.id)){
                        getStorage[i].quantity++
                    }
                }
                localStorage.setItem('products', JSON.stringify(getStorage))
            }else{
                let newItemStore = JSON.parse(localStorage.getItem('products'))
                newItemStore.push(obj)
                localStorage.setItem('products', JSON.stringify(newItemStore))
            }
            console.log(localStorage)
        })
        
    }





    
