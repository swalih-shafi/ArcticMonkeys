let cartList = document.getElementById('cartList')
let totalLbl = document.getElementById('totalLbl')
let checkOutBtn = document.getElementById('checkOut')
const shoppingCart = JSON.parse(localStorage.getItem('shoppingCart'))
let sum = 0
console.log(shoppingCart)
if (shoppingCart.productList.length != 0) {
    let innerHtml = ""
    for (x = 0; x < shoppingCart.productList.length; x++) {
        innerHtml += '<div class="product"><div class="image"><img src="' + shoppingCart.productList[x].img + '"' +
            ' /></div><div class="title">' + shoppingCart.productList[x].name + "(" + shoppingCart.sizes[x] + ")" +
            '</div><div class="price">' + shoppingCart.productList[x].price + '</div><div class="quantity">' + shoppingCart.quantity[x]
            + '</div><div class="total">' + (parseInt(shoppingCart.quantity[x]) * parseInt(shoppingCart.productList[x].price)) + '</div></div>'
        sum += (parseInt(shoppingCart.quantity[x]) * parseInt(shoppingCart.productList[x].price))
    }
    totalLbl.innerText = sum + "AED"
    cartList.innerHTML = innerHtml

    checkOutBtn.addEventListener('click', () => {
        for (x = 0; x < shoppingCart.productList.length; x++) {
            if (shoppingCart.productList[x].sizes == null) {
                shoppingCart.productList[x].quantities[0] =
                    parseInt(shoppingCart.productList[x].quantities[0]) - parseInt(shoppingCart.quantity[x])
                console.log("Updated: " + shoppingCart.productList[x].quantities[0])

            } else {
                shoppingCart.productList[x].sizes.forEach(z => {
                    if (z == shoppingCart.sizes[x]) {
                        shoppingCart.productList[x].quantities[shoppingCart.productList[x].sizes.indexOf(z)] =
                            parseInt(shoppingCart.productList[x].quantities[shoppingCart.productList[x].sizes.indexOf(z)]) - parseInt(shoppingCart.quantity[x])
                        console.log("Updated: " + shoppingCart.productList[x].quantities[shoppingCart.productList[x].sizes.indexOf(z)])
                    }
                });
            }
        }
        alert("Thank you for shopping with us!")
        open('/shop', "_self")
        let temp = {
            productList: [],
            sizes: [],
            quantity: []
        }
        localStorage.setItem('shoppingCart', JSON.stringify(temp))
    })

}