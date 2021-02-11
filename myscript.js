
    let myRequest = new XMLHttpRequest()
    
    myRequest.onreadystatechange = function(){
        if(this.readyState == XMLHttpRequest.DONE && this.status == 200){
            let results = JSON.parse(this.responseText)

            cardBuilder(results)
        }
    }
    myRequest.open("GET", "http://localhost:3000/api/teddies")
    myRequest.send()
    
    let cardBody = document.querySelectorAll('.card-body')
    
    let cardBuilder = function(data) {

        for(let i = 0; i < data.length; i++){
                cardBody[i].setAttribute('id', data[i]._id)
                cardBody[i].setAttribute('href', 'produit.html?' + data[i]._id)
                let cardImage = document.createElement('img')
                let cardName = document.createElement('h3')
                let cardPrice = document.createElement('p')

                cardBody[i].appendChild(cardImage)
                cardBody[i].appendChild(cardName)
                cardBody[i].appendChild(cardPrice)

                cardImage.setAttribute('src', data[i].imageUrl)
                cardImage.className = 'card-img-top'

                cardName.className = 'card-title'
                cardName.textContent = data[i].name

                cardPrice.textContent = data[i].price + ' €'
                
        } 
    }

     

//queryParams










