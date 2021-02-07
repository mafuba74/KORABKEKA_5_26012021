

let myRequest = new XMLHttpRequest()
myRequest.onreadystatechange = function(){
    if(this.readyState == XMLHttpRequest.DONE && this.status == 200){
        let results = JSON.parse(this.responseText)
        console.log(results)
        
        let itemCards = document.querySelectorAll('.card-body')
        let itemImages = document.querySelectorAll('card-img-top')
        
        for(let i = 0; i < results.length; i++){
            let teddy = results[i]           
            let itemCard = itemCards[i]
            itemCard.setAttribute('id', "teddy" + [i])
            let itemImage = document.createElement("img")
            itemImage.setAttribute('src', teddy.imageUrl)
            itemImage.setAttribute('alt', 'ours en peluche')
            itemImage.className = 'card-img-top'
            itemCard.appendChild(itemImage)
            console.log(teddy + itemCard)
        }        
    }
   
    
}
myRequest.open("GET", "http://localhost:3000/api/teddies")
myRequest.send()







