let urlInfo = window.location.href
let urlSplit = urlInfo.split('?')

let teddyName = document.querySelector('.title')
let teddyImg = document.querySelector('.card-img-top')
let teddyDescribe = document.querySelector('.card-text')
let teddyPrice = document.querySelector('.price')
let selectColor = document.querySelector('#choose-color')

console.log(urlInfo)
console.log(urlSplit)
let myRequest = new XMLHttpRequest()
    
    myRequest.onreadystatechange = function(){
        if(this.readyState == XMLHttpRequest.DONE && this.status == 200){
            let results = JSON.parse(this.responseText)
            checkTeddy(results)
        }
    }
    myRequest.open("GET", "http://localhost:3000/api/teddies")
    myRequest.send()

    let checkTeddy = function(data){
        for(let i = 0; i < data.length; i++){
            if(urlSplit[1] == data[i]._id){
                teddyName.textContent = data[i].name
                teddyImg.setAttribute('src', data[i].imageUrl)
                teddyDescribe.textContent = data[i].description
                teddyPrice.textContent = data[i].price + " €"
                
                for(let j = 0; j < data[i].colors.length; j++){
                    let colorOption = document.createElement('option')
                    colorOption.setAttribute('value', data[i].colors[j])
                    colorOption.textContent = data[i].colors[j]
                    selectColor.appendChild(colorOption)
                }
            }
        }
    }
