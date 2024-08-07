let productBody = document.getElementById('productBody')
let pageLbl = document.getElementById('pageLbl')
let nextBtn = document.getElementById('nextBtn')
let previousBtn = document.getElementById('previousBtn')
let productArr = null
fetch('/shop/allProducts').then(response => {
    const data = response.json()
    return data
}).then(data => {
    productArr = data["response"]
    if (productArr.length != 0) {
        pageLbl.innerText = (parseInt(pageLbl.getAttribute('data-page')) + 1) + "/" + Math.ceil(productArr.length / 6.0)
        renderProducts(productArr)
    }
}).catch(error => console.error(error))

previousBtn.addEventListener('click', () => {
    fetch('/shop/allProducts').then(response => {
        const data = response.json()
        return data
    }).then(data => {
        productArr = data["response"]
        let page = pageLbl.getAttribute('data-page')
        if (productArr.length != 0 &&
            page >= 1
        ) {
            pageLbl.setAttribute('data-page', parseInt(pageLbl.getAttribute('data-page'))-1)
            pageLbl.innerText = (parseInt(pageLbl.getAttribute('data-page'))+1) + "/" + Math.ceil(productArr.length / 6.0)
            renderProducts(productArr)
        }
    }).catch(error => console.error(error))
})

nextBtn.addEventListener('click', () => {
    fetch('/shop/allProducts').then(response => {
        const data = response.json()
        return data
    }).then(data => {
        productArr = data["response"]
        let page = parseInt(pageLbl.getAttribute('data-page'))
        if (productArr.length != 0 &&
            page < Math.ceil(productArr.length / 6.0) - 1
        ) {
            pageLbl.setAttribute('data-page', parseInt(pageLbl.getAttribute('data-page'))+1)
            pageLbl.innerText = (parseInt(pageLbl.getAttribute('data-page')) + 1) + "/" + Math.ceil(productArr.length / 6.0)
            renderProducts(productArr)
        }
    }).catch(error => console.error(error))
})

function redirectIndex(id){
        console.log("setting index")
        localStorage.setItem('product',id)
    }

function renderProducts(productArr) {
    var page = pageLbl.getAttribute('data-page')
    var count = 0;
    let htmlString = ""
    for (i = page * 6; count < 6; i++) {
        if (count % 3 == 0) {
            htmlString += "<div class = 'grid'>"
        }
        if (productArr == null || productArr[i] == undefined) {
            htmlString += "<div class='noItem'><img src=''/><h3>  </h3>"
            htmlString += "<div class='price'></div></div>"
            console.log("No item")
        } else {
            console.log("Adding item")
            htmlString += "<div class='item'><a onclick='redirectIndex("+productArr[i].id+")' href='shop/"+productArr[i].name+"' ><img src='" + productArr[i].img + "' /></a><h3>" + productArr[i].name + "</h3>"
            htmlString += "<div class='price'>" + productArr[i].price + " AED</div></div>"
        }
        count++;
        if (count == 3) {
            htmlString += "</div>"
        }
    }
    productBody.innerHTML = htmlString

    
}

console.log(productArr)