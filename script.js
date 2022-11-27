"use strict"
let total = document.querySelector('.summary__price_value');
let old_total = document.querySelector('.summary__old_price_value');
let discount = document.querySelector('.discount_sum');

// console.log(old_total.innerText)
const pay_btn = document.querySelector('.order_btn');
const pay_now__checkbox = document.querySelector("#pay_now");
const in_the_cart_goods = document.querySelector('.in_the_cart_goods').children;
let totalSum = null;
let totalSumWithoutDiscount = null;

const adresses = [

]
const cards = [

]

const goodsInCartArr = [
    {
        id: 1,
        img: "./assets/images/good-1.png",
        price: 522,
        old_price: 1051,
        title: "Футболка UZcotton мужская",
        color: "Цвет: белый",
        size: "Размер: 56",
        seller_name: "Коледино WB",
        seller_legal_name: "OOO Вайлдберриз",
        quantity: 1,
        left_in_stock: "Осталось 2 шт.",
        price_total: null,
        old_price_total: null

    },
    {
        id: 2,
        img: "./assets/images/good-2.png",
        price: 10500.23,
        old_price: 11500.24,
        title: "Футболка UZcotton мужская",
        color: "Цвет: белый",
        size: "Размер: 56",
        seller_name: "Коледино WB",
        seller_legal_name: "OOO Вайлдберриз",
        quantity: 200,
        left_in_stock: "",
        price_total: null,
        old_price_total: null

    },
]
function loadGoods (goodsArr){
    const goodsContainer = document.querySelector(".in_the_cart_goods")
    goodsContainer.innerHTML = ''
    
    goodsArr.map((goodItem)=>{
        const goodLayout = document.createElement("div")
        goodLayout.className = "good"
        goodLayout.innerHTML = `
        <div class="good__info">
            <label class="good__checkbox checkbox_container">
                <input type="checkbox" name="${goodItem.id}" id="${goodItem.id}" class="checkbox good_checkbox" data-price="${goodItem.price}">
                <span class="custom_checkbox"></span>
            </label>
            <div class="good__img">
                <img src=${goodItem.img} alt="">
            </div>
            <div class="good__details">
                <div class="good__price mobile">
                    <div class="price">
                        <span class="price_sum">
                        ${goodItem.price}
                        </span> 
                        <span class="price_cur">сом</span>
                    </div>
                    <div class="old_price">
                        <span  class="old_price_sum">
                        ${goodItem.old_price}
                        </span>
                        <span class="price_cur">сом</span>
                    </div>
                </div>
                <p class="good__title">
                    ${goodItem.title}
                </p>
                <div class="good__parameters">
                    <p class="good__color">
                    ${goodItem.color}
                    </p>
                    <p class="good__size">
                    ${goodItem.size}
                    </p>
                </div>
                <div class="good__seller">
                    <p class="good__seller_name">${goodItem.seller_name}</p>
                        <div class="good__seller_legal_name desktop">
                        ${goodItem.seller_legal_name}
                            <img src="./assets/icons/icon-20.svg" alt="">
                        </div>
                </div>
            </div>
        </div>
        <div class="good__order">
            <div class="good__quantity">
                <div class="good__added">
                    <div class="counter">
                        <div class="counter__decrease">
                            -
                        </div>
                        <input class="counter__quantity" value= "${goodItem.quantity}" pattern="^[1-9]\d*$"/>
                        <div class="counter__increase">
                            +
                        </div>
                    </div>
                </div>
                <div class="good__in_stock">
                ${goodItem.left_in_stock}
                </div>
                <div class="good__action">
                    <div class="add_to_favorites">
                        <img src="./assets/icons/heart.svg" alt="">
                    </div>
                    <div class="remove">
                        <img src="./assets/icons/trash.svg" alt="">
                    </div>
                </div>
            </div>
            <div class="good__price desktop">
                <div class="price">
                    <span class="price_sum">
                    ${goodItem.price}
                    </span> 
                    <span class="price_cur">сом</span>
                </div>
                <div class="old_price">
                    <span  class="old_price_sum">
                    ${goodItem.old_price}
                    </span>
                    <span class="price_cur">сом</span>
                </div>
            </div>
        </div>`;
        goodsContainer.appendChild(goodLayout);

        multiplyGoodsPrice (goodItem, goodLayout)
   
        animateCounter(goodItem, goodLayout);

        totalSum = countTotalGoodsSum(goodItem, totalSum, '');
        totalSumWithoutDiscount = countTotalGoodsSum(goodItem, totalSumWithoutDiscount, 'old_');
    })

    // запись в разметку общей цены, цены без скидки и разницы
    // total.innerText = totalSum;
    renderValue(total, totalSum)

    // old_total.innerText = totalSumWithoutDiscount;
    renderValue(old_total, totalSumWithoutDiscount)

    // discount.innerText = totalSumWithoutDiscount - totalSum;
    renderValue(discount, (totalSumWithoutDiscount - totalSum))

}

// срабатывает только 1 раз при первичной загрузке страницы
function countTotalGoodsSum(goodItem, totalSum, marker) {
    totalSum+=goodItem[`${marker}price_total`]
    return totalSum
}

loadGoods(goodsInCartArr);

function animateCounter(goodObject, goodLayout) {
    let increase = goodLayout.querySelector(".counter__increase");
    let decrease = goodLayout.querySelector(".counter__decrease");
    let counter_input = goodLayout.querySelector(".counter__quantity");

    increase.addEventListener("click", ()=>changeQuantity('increase', goodObject, goodLayout))
    decrease.addEventListener("click", ()=>changeQuantity('decrease', goodObject, goodLayout))
    counter_input.addEventListener('input', ()=>changeQuantity('input', goodObject, goodLayout))
}

// общая функция для всех событий
function changeQuantity(operation, goodObject, goodLayout){
    let quantity = goodObject.quantity;
    let counter_input = goodLayout.querySelector(".counter__quantity");
    if (operation === 'input'){
        counter_input.value = counter_input.value.replace(/[^\d]/g, '');
        goodObject.quantity = counter_input.value;

        // умножает и новую и старую цену
        multiplyGoodsPrice (goodObject, goodLayout);
        countTotalSum(goodsInCartArr, '');
        countTotalSum(goodsInCartArr, 'old_');
        renderValue(discount, (totalSumWithoutDiscount - totalSum))
     
    } else {
        if(operation === 'increase'){
            goodObject.quantity = ++quantity;
            counter_input.value = quantity;
            
            multiplyGoodsPrice (goodObject, goodLayout)
            
            totalSum = Math.ceil(totalSum + goodObject.price)
            
            renderValue(total, totalSum)
            
            totalSumWithoutDiscount = Math.ceil(totalSumWithoutDiscount + goodObject.old_price)
       
            renderValue(old_total, totalSumWithoutDiscount)
     
            renderValue(discount, (totalSumWithoutDiscount - totalSum))
       
        } else if(operation === 'decrease' && quantity > 1){
            goodObject.quantity = --quantity;
            counter_input.value = quantity;
            
            multiplyGoodsPrice (goodObject, goodLayout)
            
            totalSum = Math.ceil(totalSum - goodObject.price)
            
            renderValue(total, totalSum)
            
            totalSumWithoutDiscount = Math.ceil(totalSumWithoutDiscount - goodObject.old_price)
            
            renderValue(old_total, totalSumWithoutDiscount)
            
            renderValue(discount, (totalSumWithoutDiscount - totalSum))

        }
    }
    payNow() 
}
//////////????????????????????+-+-+-+-
function count(operation){
    goodObject.quantity = ++quantity;
    counter_input.value = quantity;
            
    multiplyGoodsPrice (goodObject, goodLayout)
            
    totalSum = Math.ceil(totalSum + goodObject.price)
            
    renderValue(total, totalSum)
            
    totalSumWithoutDiscount = Math.ceil(totalSumWithoutDiscount + goodObject.old_price)
       
    renderValue(old_total, totalSumWithoutDiscount)
     
    renderValue(discount, (totalSumWithoutDiscount - totalSum))
}

function renderValue(place, value){
    place.innerHTML = value
}

function countTotalSum(goods, marker) {
    let prices = extractGoodsSums(goods, marker);
    let commonSum = countSum(prices);
    if(marker === 'old_'){
        totalSumWithoutDiscount = commonSum;
        old_total.innerText = totalSumWithoutDiscount;
    } else {
        totalSum = commonSum;
        total.innerText = totalSum;
    }
}

function extractGoodsSums(goods, marker) {
    let sums = [];
    for (let i = 0; i < goods.length; i++) {
        let sum;
        sum = goods[i][`${marker}price_total`]
        sums.push(sum)
    }
    console.log(sums)
    return sums
}

function countSum(nums) {
    let result = nums.reduce(function (sum, num) {
        return sum + num;
    }, 0);
    return result
}

function multiplyPrices (goodObject, goodLayout, marker){
    let quantity = goodObject.quantity;
    let price = goodObject[`${marker}`+'price']
    let sum = goodObject[`${marker}`+'sum']
    sum = Math.ceil(quantity*price);
    goodObject[`${marker}`+'price_total'] = sum;
    let prices = goodLayout.querySelectorAll(`.${marker}price_sum`)
    // console.log(prices[0].innerText)
    for (const price of prices) {
        price.innerText = sum
    }
}

function multiplyGoodsPrice (goodObject, goodLayout) {
    multiplyPrices (goodObject, goodLayout, '')
    multiplyPrices (goodObject, goodLayout, 'old_')
}

pay_now__checkbox.addEventListener("click", payNow)
function payNow() {
    if (pay_now__checkbox.checked) {
        pay_btn.innerText = `Оплатить ${totalSum}`
    } else {
        pay_btn.innerText = `Заказать`
    }
}

// чекбоксы
let cart = document.querySelector('.cart');
let check_all = cart.querySelector('#check_all');
let good_checkboxes = cart.querySelectorAll('.good_checkbox');

check_all.addEventListener('change',()=>changeAllCheckboxes(good_checkboxes, check_all))

function changeAllCheckboxes(checkboxes, checkAll){
    for(let i = 0; i<checkboxes.length; i++){
        let checkbox = checkboxes[i];
        if(checkAll.checked){
            checkbox.checked = true;
        }else{
            checkbox.checked = false;
        }
    }
}


// change_delivery
// change_payment
const change_delivery = document.querySelector('.change_delivery');
const change_payment = document.querySelector('.change_payment');
console.log(change_delivery);