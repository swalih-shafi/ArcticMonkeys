let productName = document.getElementById('productName')
let productPrice = document.getElementById('productPrice')
let sizeLbl = document.getElementById('sizeLbl')
let productSize = document.getElementById('productSize')
let productQuantityLbl = document.getElementById('productQuantityLbl')
let productDescription = document.getElementById('productDescription')
let productQuantity = document.getElementById('productQuantity')
let productImg = document.getElementById('productImg')
let addToCart = document.getElementById('addToCart');

console.log(productName.getAttribute('data-name'))
fetch("/shop/getProduct/" + localStorage.getItem('product')).then(response => {
    let data = response.json()
    return data
}).then(data => {
    product = data["response"][0]
    productName.innerText = product.name
    productPrice.innerText = product.price + "AED"
    productImg.src = product.img
    sizesHTML = ""
    console.log()
    if (product.sizes != null) {
        for (i = 0; i < product.sizes.length; i++) {
            sizesHTML += "<option value='" + product.quantities[i] + "'>" + product.sizes[i] + "</option>"
        }
        productSize.innerHTML = sizesHTML
        localStorage.setItem('productSize', product.sizes[0])
    } else {
        localStorage.setItem('productSize', "N/A")
        sizeLbl.style.display = "none"
        productSize.style.display = "none"
    }
    productQuantity.max = product.quantities[0]
    productDescription.innerText = ((product.productDescription) ? product.productDescription + "\n" : "") +
        "Material: " + product.material
    console.log(productQuantity.max)
    addToCart.addEventListener('click', function () {
        var exists = false;
        const shoppingCartInput = localStorage.getItem('shoppingCart')
        let shoppingCart = JSON.parse(shoppingCartInput)
        console.log(shoppingCart)
        shoppingCart.productList.forEach(x => {
            if (x.id == product.id) {
                let index = shoppingCart.productList.indexOf(product)
                shoppingCart.sizes.forEach(z => {
                    if (z == localStorage.getItem('productSize')) {
                        exists = true
                    }
                })
            }
        })

        if (exists) {
            let index = shoppingCart.productList.indexOf(product)
            if ((parseInt(shoppingCart.quantity[index]) + parseInt(productQuantity.value)) <= productQuantity.max) {
                shoppingCart.quantity[index] = parseInt(shoppingCart.quantity[index]) + parseInt(productQuantity.value)
                alert("Added to shopping cart \n" + product.name + " qty: " + productQuantity.value)
                console.log(localStorage.getItem('productSize'))
            } else {
                alert("Exceeds available quantity")
            }
        } else {
            shoppingCart.productList.push(product)
            shoppingCart.quantity.push(productQuantity.value)
            shoppingCart.sizes.push(localStorage.getItem('productSize'))
            alert("Added to shopping cart \n" + product.name + " qty: " + productQuantity.value + " size: " + localStorage.getItem('productSize'))
        }
        console.log(shoppingCart)
        localStorage.setItem('shoppingCart',JSON.stringify(shoppingCart))
        // open('/shop')
    })
}).catch(error => console.error(error))
