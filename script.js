"use strict"
let total = document.querySelector('.summary__price_value');
let old_total = document.querySelector('.summary__old_price_value');
let discount = document.querySelector('.discount_sum');
let summary_quantity = document.querySelector('.summary__quantity')

const pay_btn = document.querySelector('.order_btn');
const pay_now__checkbox = document.querySelector("#pay_now");
const in_the_cart_goods = document.querySelector('.in_the_cart_goods').children;
let totalSum = null;
let totalSumWithoutDiscount = null;
let totalQuantity = null;

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
        color: "белый",
        size: "56",
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
        color: "белый",
        size: "",
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
                ${goodItem.size?
                    `<span class="mobile size_indicator">${goodItem.size}</span>`:
                ''}
                
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
                    ${goodItem.color?
                    'Цвет: '+goodItem.color:
                    ''}
                    </p>
                    <p class="good__size desktop">
                    ${goodItem.size?
                        'Размер: '+ goodItem.size:
                    ''}
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
                    </div>
                    <div class="remove">
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
// 
        multiplyGoodsPrice (goodItem, goodLayout)
   
        animateCounter(goodItem, goodLayout);

        totalSum = countTotalGoodsSum(goodItem, totalSum, '');
        totalSumWithoutDiscount = countTotalGoodsSum(goodItem, totalSumWithoutDiscount, 'old_');
    })
    renderGoodsQuantity(goodsInCartArr)
    // запись в разметку общей цены, цены без скидки и разницы

    renderValue(total, totalSum)
    renderValue(old_total, totalSumWithoutDiscount)
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
        //
        renderGoodsQuantity(goodsInCartArr)
        //
        renderValue(discount, (totalSumWithoutDiscount - totalSum))
     
    } else {
        if(operation === 'increase'){
            goodObject.quantity = ++quantity;
            counter_input.value = quantity;
            
            multiplyGoodsPrice (goodObject, goodLayout)
            
            totalSum = Math.ceil(totalSum + goodObject.price)
            renderValue(total, totalSum)

            // то же самое только с количеством товаров
            // туть
            totalQuantity++
            renderValue(summary_quantity, totalQuantity);
            ////
            
            totalSumWithoutDiscount = Math.ceil(totalSumWithoutDiscount + goodObject.old_price)
        
            renderValue(old_total, totalSumWithoutDiscount)
     
            renderValue(discount, (totalSumWithoutDiscount - totalSum))
       
        } else if(operation === 'decrease' && quantity > 1){
            goodObject.quantity = --quantity;
            counter_input.value = quantity;
            
            multiplyGoodsPrice (goodObject, goodLayout)
            
            totalSum = Math.ceil(totalSum - goodObject.price)
            
            renderValue(total, totalSum)

            // то же самое только с количеством товаров
            // туть
            totalQuantity--
            renderValue(summary_quantity, totalQuantity);
            ////
            
            totalSumWithoutDiscount = Math.ceil(totalSumWithoutDiscount - goodObject.old_price)
            
            renderValue(old_total, totalSumWithoutDiscount)
            
            renderValue(discount, (totalSumWithoutDiscount - totalSum))

        }
    }
    payNow() 
}
//////////?
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


function renderGoodsQuantity(goods){
    let goodsQuantityArr = extractGoodsSums(goods, 'quantity');
    totalQuantity = countSum(goodsQuantityArr);
    renderValue(summary_quantity, totalQuantity);
}

function countTotalSum(goods, marker) {
    let prices = extractGoodsSums(goods, `${marker}price_total`);
    let commonSum = countSum(prices);
    if(marker === 'old_'){
        totalSumWithoutDiscount = commonSum;
        old_total.innerText = totalSumWithoutDiscount;
    } else {
        totalSum = commonSum;
        total.innerText = totalSum;
    }
}

function extractGoodsSums(goods, field) {
    let sums = [];
    for (let i = 0; i < goods.length; i++) {
        let sum;
        sum = +(goods[i][field])
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



const change_delivery = document.querySelector('.change_delivery');
const summary__delivery_change = document.querySelector('.summary__delivery_change');

const change_payment = document.querySelector('.change_payment');
const summary__payment_change = document.querySelector('.summary__payment_change');

const payment_popup = document.querySelector('.payment_popup');
const delivery_popup = document.querySelector('.delivery_popup');

const payment_popup__close = document.querySelector('.payment_popup__close');
const delivery_popup__close = document.querySelector('.delivery_popup__close');


change_delivery.addEventListener('click',()=>popupToggle('delivery', 'open'));
summary__delivery_change.addEventListener('click',()=>popupToggle('delivery', 'open'));
delivery_popup__close.addEventListener('click',()=>popupToggle('delivery', 'close'));



change_payment.addEventListener('click',()=>popupToggle('payment', 'open'));
summary__payment_change.addEventListener('click',()=>popupToggle('payment', 'open'));
payment_popup__close.addEventListener('click',()=>popupToggle('payment', 'close'));

function popupToggle(marker, action){
    let popup = document.querySelector(`.${marker}_popup`);
    action === 'open'?
    popup.hidden = false:
    popup.hidden = true;
}
