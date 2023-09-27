// search bar wisible
var serc = document.getElementById("search");

function sear() {
    serc.style.display = "block";
}
//shopping cart page show
var itemsbuing = document.getElementById("items");
function show() {
    document.getElementById("xbutton").style.display = "block"
    itemsbuing.style.width = "700px";
    itemsbuing.style.transition = ".4s";
    document.getElementById("firstitem").style.display = "block"

}
//shopping cart page hide
function hide() {

    document.getElementById("xbutton").style.display = "none"
    itemsbuing.style.width = "0px";
    itemsbuing.style.transition = ".4s";
    document.getElementById("firstitem").style.display = "none"
}

// axios

var row = document.getElementById("row");


axios.get("https://fakestoreapi.com/products").then(function (responce) {

    var products = [];

    responce.data.forEach((product, index) => {

        if (products.length < 6) {
            products.push(product)

            var col = document.createElement("div");
            col.classList.add("col-12")
            col.classList.add("col-md-6")
            col.classList.add("col-lg-4")
            row.appendChild(col);
            //end cols

            //create product boxes
            var box = document.createElement("div")
            col.appendChild(box)
            box.classList.add("product-box")

            var imageBox = document.createElement("div");
            box.appendChild(imageBox);
            imageBox.classList.add("image-box")
            imageBox.style.backgroundColor = "rgba(246, 246, 246, 1)"

            // create a new images
            var img = document.createElement("img");

            // Create a new attribute object
            var src = document.createAttribute("src");

            // Set the name of the attribute
            src.name = "src";

            // Set the value of the attribute
            src.value = product.image;
            img.attributes.setNamedItem(src);
            imageBox.appendChild(img)
            img.classList.add("img-2")
            img.style.width = "95%";
            img.style.height = "280px";

            var shopCart = document.createElement("button")
            imageBox.appendChild(shopCart);
            shopCart.classList.add("shop-carts")
            shopCart.classList.add("btn")

            // create a new image for shop-cart
            var img2 = document.createElement("img");
            img2.src = './images/Shopping Cart.png'
            img2.classList.add("img2")
            img2.classList.add("shop-cart")
            shopCart.appendChild(img2)
            img2.setAttribute('onclick', 'add()');




            var wishList = document.createElement("div");
            imageBox.appendChild(wishList);
            wishList.classList.add("wish-list")
            // create a new image for wishList
            var img3 = document.createElement("img");
            img3.src = './images/heart.png'
            wishList.appendChild(img3)


            var priceBox = document.createElement("div");
            box.appendChild(priceBox);
            priceBox.classList.add("price-box")

            var poductName = document.createElement("h5");
            priceBox.appendChild(poductName);
            poductName.classList.add("poductName")
            poductName.innerText = product.title;

            var img4 = document.createElement("img")
            img4.src = './images/stars.png';
            priceBox.appendChild(img4)
            img4.style.marginBottom = "12px"

            var prices = document.createElement("div");
            priceBox.appendChild(prices);
            prices.classList.add("prices");

            if (index < 6) {
                let span1 = document.createElement("span")
                prices.appendChild(span1);
                span1.innerText = "$300.00";
                span1.style.textDecorationLine = "line-through";
                span1.classList.add("span-1")

                let span2 = document.createElement("span");
                prices.appendChild(span2);
                span2.innerText = "$" + product.price;
                span2.classList.add("span-2")
                if (index == 5) {
                    let span4 = document.createElement("span");
                    prices.appendChild(span4);
                    span1.innerText = " ";
                }
            }

        }

    })
    var carts = document.getElementsByClassName("shop-cart")
    var qantiti_field = document.getElementsByClassName("num")
    var deleteBtns = document.getElementsByClassName("btnDelete")


    for (let i = 0; i < carts.length; i++) {
        carts[i].addEventListener("click", addToCart);
    }

    function addToCart(event) {
        let img2 = event.target
        let img2_parent = img2.parentElement
        let img2_grndParent = img2.parentElement.parentElement.parentElement
        let itemName = img2_grndParent.children[1].children[0].innerText
        let cartsPrice = img2_grndParent.children[1].children[2].children[1].innerText
        let cartsImage = img2_grndParent.children[0].children[0].src

        var meinItemContainer = document.getElementById("products")
        var tBody = document.createElement("tbody")
        meinItemContainer.appendChild(tBody)
        var itemContainer = document.createElement("tr")
        tBody.appendChild(itemContainer)
        itemContainer.innerHTML = `
            <td class="table-link d-flex align-items-center gap-0 gap-md-2 ">
                <input class="checkbox" type="checkbox">
                <img class="image-inCart" src="${cartsImage}" alt="">
                <h3 class="item-name pe-2 ps-2">${itemName}</h3>
            </td>
            <td class="tdprice"> <h3>${cartsPrice}</h3></td>
            <td class="tdnum"><input type="number" name="1" class="num text-center" value="1"></td>
            <td class="totat-Price"><h3>${cartsPrice}</h3></td>
            <td><button class="btn btn-danger btnDelete" type="button">DEL</button></td>
        `

        for (let i = 0; i < qantiti_field.length; i++) {
            qantiti_field[i].addEventListener("change", updateTotal);
        }

        for (let i = 0; i < deleteBtns.length; i++) {
            deleteBtns[i].addEventListener("click", removeItem);
        }

        var empty = document.getElementById("empty")
        empty.style.display = "none"
        grandTotal()

    }

    function updateTotal(event) {
        let number_of_items = event.target
        let number_of_items_parent = number_of_items.parentElement.parentElement
        let price_field = number_of_items_parent.getElementsByClassName("tdprice")[0]
        let total_field = number_of_items_parent.getElementsByClassName("totat-Price")[0]
        let price_field_content = price_field.children[0].innerText.replace("$", "")
        total_field.children[0].innerText = "$" + number_of_items.value * price_field_content

        if (isNaN(number_of_items.value) || number_of_items.value <= 0) {
            number_of_items.value = 1
        }

        add()

        grandTotal()

    }

    function grandTotal() {
        let total = 0;
        let grand_Total = document.getElementById("grandTotal")
        let total_price = document.getElementsByClassName("totat-Price")
        for (let i = 0; i < total_price.length; i++) {
            total_price_content = Number(total_price[i].innerText.replace("$", ""))
            total += total_price_content
        }

        grand_Total.children[0].innerText = "$" + total

        if (total == 0) {
            empty.style.display = "block"
        }
    
    }

    function removeItem(event) {
        remove_btn = event.target
        remove_btn_grandparent = remove_btn.parentElement.parentElement
        remove_btn_grandparent.remove();

        grandTotal()
        minus2()
    }


})
// caunter 
var i = 0
var caunter = document.getElementById("count");
var caunter2 = document.getElementById("count2");
caunter.innerText = "0"
caunter2.innerText = "0"
function add() {
    i++
    caunter.textContent = i;
    caunter2.textContent = i;
}

function minus2() {
    i--
    caunter.textContent = i;
    caunter2.textContent = i;
}

//when shopping cart is empty
var empty = document.getElementById("empty")

if (caunter.innerText == 0 || caunter2.innerText == 0) {
    empty.style.display = "block"
}

