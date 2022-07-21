
let cardsShopping = document.querySelector(".cardsShopping");
let accumulated__price = document.querySelector(".accumulated__price");
let accumulated__discount = document.querySelector(".accumulated__discount");
let numberProducts = document.querySelector(".titleShopping");

let discount
let products=[];
 //Mostrar productos del localStorage
 document.addEventListener("DOMContentLoaded",()=>{
    products = JSON.parse(localStorage.getItem('products')) || [];
    
    carShopping();
    let count = products.length;
    console.log(count);
    if(count!=0){
        numberProducts.textContent = `${count} productos en la cesta`;
    }else{
        numberProducts.textContent = "Tu cesta esta vacía";
    }

})

function carShopping(){

    let result = 0;
    let resultDiscount = 0;
    //console.log(typeof productsStorage);
    
    products.forEach(product =>{
        const {image, price,id,quantity,name, discount} = product;
        const unitPrice = parseInt(price.split("$")[1]);
        const unitDiscount = parseInt(discount.split("$")[1]); 
        result+=unitPrice*quantity;
        resultDiscount += unitDiscount*quantity;
        const productDiv = document.createElement('div');
        productDiv.classList.add("product");
        productDiv.innerHTML=`
        
        <img src="${image}" alt="${name}">
        <div class="details">
            <div class="textShopping">
                <h3 class="title">${name}</h3>
                <p class="text price">Precio: ${price}</p>
                <p class="text amount">Cantidad: ${quantity}</p>
            </div>                                
            <span class="delete-p delete"  data-id="${id}">Remove</span>
            <div class="totalPrice">
                <p class="text total"> $$ ${unitPrice * quantity} </p>
                <p class="text discount"> $$ ${ unitDiscount * quantity}</p>
            </div>        
        </div>
  
        `
        cardsShopping.appendChild(productDiv);
        accumulated__price.textContent = "$$"+result;
        accumulated__discount.textContent = "$$"+resultDiscount;
    })
    //Agregar localstorage
    syncStorage();    
}


function syncStorage(){
    localStorage.setItem("products",JSON.stringify(products));
}


function deleteProduct(e){
    if(e.target.classList.contains('delete-p')){
        const id = e.target.getAttribute('data-id')
        
        products = products.filter(prod => prod.id !== id)

        carShoppingTable();
    }
}
