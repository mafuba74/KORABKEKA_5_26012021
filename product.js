let urlInfo = window.location.href
let urlSplit = urlInfo.split('?')

console.log(urlInfo)
console.log(urlSplit)
let myRequest = new XMLHttpRequest()
    
    myRequest.onreadystatechange = function(){
        if(this.readyState == XMLHttpRequest.DONE && this.status == 200){
            let results = JSON.parse(this.responseText)
            checkUrl(results)
        }
    }
    myRequest.open("GET", "http://localhost:3000/api/teddies")
    myRequest.send()

    let checkUrl = function(data){
        for(let i = 0; i < data.length; i++){
            if(urlSplit[1] == data[i]._id){
                document.write('hello word my name is ' + data[i].name)
            }
        }
    }