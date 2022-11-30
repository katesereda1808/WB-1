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
        old_price_total: null,
        checked: false

    },
    {
        id: 2,
        img: "./assets/images/good-2.png",
        price: 10500.23,
        old_price: 11500.24,
        title: "Силиконовый чехол картхолдер (отверстия) для карт, прозрачный кейс бампер на Apple iPhone XR, MobiSafe",
        color: "прозрачный",
        size: "",
        seller_name: "Коледино WB",
        seller_legal_name: "OOO Мегапрофстиль",
        quantity: 200,
        left_in_stock: "",
        price_total: null,
        old_price_total: null,
        checked: false
    },
    {
        id: 3,
        img: "./assets/images/good-3.png",
        price: 494,
        old_price: 950,
        title: "Карандаши цветные Faber-Castell \"Замок\", набор 24 цвета, заточенные, шестигранные, Faber-Castell",
        color: "",
        size: "",
        seller_name: "Коледино WB",
        seller_legal_name: "OOO Вайлдберриз",
        quantity: 2,
        left_in_stock: "Осталось 2 шт.",
        price_total: null,
        old_price_total: null,
        checked: false

    }
]
let checkedGoods = [];

function checkGood(goodItem, goodLayout) {
    const goodCheckbox = goodLayout.querySelector('.checkbox');
    if (goodCheckbox.checked) {
        goodItem.checked = true;
        checkedGoods.push(goodItem)
    } else {
        goodItem.checked = false;
        let newArr = checkedGoods.filter(item => item !== goodItem)
        checkedGoods = newArr;
    }
    processAllPrices()
}

let cart = document.querySelector('.cart');
let check_all = cart.querySelector('#check_all');
let good_checkboxes = cart.querySelectorAll('.good_checkbox');

function changeAllCheckboxes(goodsArr, checkAll) {
    const checkboxes = document.querySelectorAll('.good_checkbox');
    for (let i = 0; i < checkboxes.length; i++) {
        if (checkAll.checked) {
            checkboxes[i].checked = true
        } else {
            checkboxes[i].checked = false
        }
    }
    for (let i = 0; i < goodsArr.length; i++) {
        let goodObj = goodsArr[i];
        if (checkAll.checked) {
            goodObj.checked = true;
            checkedGoods = [...goodsArr]
        } else {
            goodObj.checked = false;
            checkedGoods = [];
        }
    }
    processAllPrices()
}
function loadGoods(goodsArr) {
    const goodsContainer = document.querySelector(".in_the_cart_goods")
    goodsContainer.innerHTML = ''

    goodsArr.map((goodItem) => {
        const goodLayout = document.createElement("div");
        goodLayout.className = "good"
        goodLayout.innerHTML = `
        <div class="good__info">
            <label class="good__checkbox checkbox_container">
                <input type="checkbox" name="${goodItem.id}" id="${goodItem.id}" class="checkbox good_checkbox" data-price="${goodItem.price}">
                <span class="custom_checkbox"></span>
                ${goodItem.size ?
                `<span class="mobile size_indicator">${goodItem.size}</span>` :
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
                    <div class="old_price tooltip-container">
                        <span  class="old_price_sum">
                        ${goodItem.old_price}
                        </span>
                        <span class="price_cur">сом</span>
                        <div class="tooltip tooltip-discount hidden">
                                    <div>
                                        <p class="text-gray">Скидка 55%</p>
                                        <p>−300 сом</p>
                                    </div>
                                    <div>
                                        <p class="text-gray">Скидка покупателя 10%</p>
                                        <p>−30 сом</p>
                                    </div>
                        </div>
                    </div>
                </div>
                <p class="good__title">
                    ${goodItem.title}
                </p>
                <div class="good__parameters">
                    <p class="good__color">
                    ${goodItem.color ?
                'Цвет: ' + goodItem.color :
                ''}
                    </p>
                    <p class="good__size desktop">
                    ${goodItem.size ?
                'Размер: ' + goodItem.size :
                ''}
                    </p>
                </div>
                <div class="good__seller tooltip-container">
                    <p class="good__seller_name">${goodItem.seller_name}</p>
                    <div class="good__seller_legal_name desktop">
                        ${goodItem.seller_legal_name}
                        <img src="./assets/icons/icon-20.svg" alt="">
                    </div>
                    <div class="tooltip tooltip-seller hidden">
                        <div class="tooltip-heading">
                            OOO «МЕГАПРОФСТИЛЬ»
                        </div>
                        <div>
                            ОГРН: 5167746237148
                        </div>
                        <div>
                            129337, Москва, улица Красная Сосна, 2, корпус 1, стр. 1, помещение 2, офис 34
                        </div>
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
                        <input class="counter__quantity" value= "${goodItem.quantity}"/>
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
                <div class="old_price tooltip-container">
                    <span  class="old_price_sum">
                    ${goodItem.old_price}
                    </span>
                    <span class="price_cur">сом</span>
                    <div class="tooltip tooltip-discount hidden">
                                    <div>
                                        <p class="text-gray">Скидка 55%</p>
                                        <p>−300 сом</p>
                                    </div>
                                    <div>
                                        <p class="text-gray">Скидка покупателя 10%</p>
                                        <p>−30 сом</p>
                                    </div>
                        </div>
                </div>
            </div>
        </div>`;
        goodsContainer.appendChild(goodLayout);
        multiplyGoodsPrice(goodItem, goodLayout)
        animateCounter(goodItem, goodLayout);
        const goodCheckbox = goodLayout.querySelector('.checkbox')
        goodCheckbox.addEventListener('change', () => checkGood(goodItem, goodLayout))
        totalSumWithoutDiscount = countTotalGoodsSum(goodItem, totalSumWithoutDiscount, 'old_');
    })

    check_all.addEventListener('change', () => changeAllCheckboxes(goodsArr, check_all))
    renderGoodsQuantity(checkedGoods)
    renderValue(total, totalSum)
    renderValue(old_total, totalSumWithoutDiscount)
    renderValue(discount, (totalSumWithoutDiscount - totalSum))
}

// срабатывает только 1 раз при первичной загрузке страницы
function countTotalGoodsSum(goodItem, totalSum, marker) {
    totalSum += goodItem[`${marker}price_total`]
    return totalSum
}
loadGoods(goodsInCartArr);

function animateCounter(goodObject, goodLayout) {
    let increase = goodLayout.querySelector(".counter__increase");
    let decrease = goodLayout.querySelector(".counter__decrease");
    let counter_input = goodLayout.querySelector(".counter__quantity");

    increase.addEventListener("click", () => changeQuantityAndPrices('increase', goodObject, goodLayout))
    decrease.addEventListener("click", () => changeQuantityAndPrices('decrease', goodObject, goodLayout))
    counter_input.addEventListener('input', () => changeQuantityAndPrices('input', goodObject, goodLayout))
}

function processAllPrices() {
    countTotalSum(checkedGoods, '');
    countTotalSum(checkedGoods, 'old_');
    renderGoodsQuantity(checkedGoods);
    renderValue(discount, (totalSumWithoutDiscount - totalSum));
    payNow()
}
function changeQuantityAndPrices(operation, goodObject, goodLayout) {
    let quantity = goodObject.quantity;
    let counter_input = goodLayout.querySelector(".counter__quantity");
    if (operation === 'input') {
        counter_input.value = counter_input.value.replace(/[^\d]/g, '');
        goodObject.quantity = counter_input.value;
        multiplyGoodsPrice(goodObject, goodLayout);
        processAllPrices();
    } else {
        if (operation === 'increase') {
            goodObject.quantity = ++quantity;
            counter_input.value = quantity;
            multiplyGoodsPrice(goodObject, goodLayout);
            processAllPrices()
        } else if (operation === 'decrease' && quantity > 1) {
            goodObject.quantity = --quantity;
            counter_input.value = quantity;
            multiplyGoodsPrice(goodObject, goodLayout);
            processAllPrices()
        }
    }
}

function renderValue(place, value) {
    place.innerHTML = value
}

function renderGoodsQuantity(goods) {
    let goodsQuantityArr = extractGoodsSums(goods, 'quantity');
    totalQuantity = countSum(goodsQuantityArr);
    renderValue(summary_quantity, totalQuantity);
}

function countTotalSum(goods, marker) {
    let prices = extractGoodsSums(goods, `${marker}price_total`);
    let commonSum = countSum(prices);
    if (marker === 'old_') {
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
    return sums
}

function countSum(nums) {
    let result = nums.reduce(function (sum, num) {
        return sum + num;
    }, 0);
    return result
}

function multiplyPrices(goodObject, goodLayout, marker) {
    let quantity = goodObject.quantity;
    let price = goodObject[`${marker}` + 'price']
    let sum = goodObject[`${marker}` + 'sum']
    sum = Math.ceil(quantity * price);
    goodObject[`${marker}` + 'price_total'] = sum;
    let prices = goodLayout.querySelectorAll(`.${marker}price_sum`)
    for (const price of prices) {
        price.innerText = sum
    }
}

function multiplyGoodsPrice(goodObject, goodLayout) {
    multiplyPrices(goodObject, goodLayout, '')
    multiplyPrices(goodObject, goodLayout, 'old_')
}

pay_now__checkbox.addEventListener("click", payNow);

function payNow() {
    if (pay_now__checkbox.checked) {
        pay_btn.innerText = `Оплатить ${totalSum ? totalSum : '0'} сом`
    } else {
        pay_btn.innerText = `Заказать`
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

change_delivery.addEventListener('click', () => popupToggle('delivery', 'open'));
summary__delivery_change.addEventListener('click', () => popupToggle('delivery', 'open'));
delivery_popup__close.addEventListener('click', () => popupToggle('delivery', 'close'));

change_payment.addEventListener('click', () => popupToggle('payment', 'open'));
summary__payment_change.addEventListener('click', () => popupToggle('payment', 'open'));
payment_popup__close.addEventListener('click', () => popupToggle('payment', 'close'));

function popupToggle(marker, action) {
    let popup = document.querySelector(`.${marker}_popup`);
    action === 'open' ?
        popup.hidden = false :
        popup.hidden = true;
}



/////////////////////////
// tooltips
let tooltipContainers = document.querySelectorAll('.tooltip-container');
for (let i = 0; i < tooltipContainers.length; i++) {
    const container = tooltipContainers[i];
    console.log(container)
    let tooltip = container.querySelector('.tooltip');
    container.addEventListener('mouseover', ()=>{
        console.log('mouseover')
        tooltip.classList.remove('hidden')
    })
    container.addEventListener('mouseout', ()=>{
        tooltip.classList.add('hidden')
    })
}


// form
// Пустое поле становится ошибочным, если пользователь нажал кнопку «Оформить заказ». В таком случае мы подсвечиваем незаполненное поле, просим заполнить его, а на мобильных подкручиваем к нему по нажатию на кнопку Оплатить.

// после того, как пользователь нажал кнопку и появилась ошибка

// 5) Как только пользователь ввёл что-то, что удаётся провалидировать, мы убираем ошибку. То есть триггером для валидации является ввод с клавиатуры.

const customerForm = document.querySelector('.customer_form');
const form_name = customerForm.querySelector('input[name="name"]');
const form_surname = customerForm.querySelector('input[name="surname"]');
const form_pnoneNumber = customerForm.querySelector('input[name="phone_number"]');
const form_inn = customerForm.querySelector('input[name="inn"]');
// const form_zipCode = customerForm.querySelector('input[name="zipCode"]');
// console.log(form_surname)
// function validateInputs() {
// }
form_pnoneNumber.addEventListener('input',(e)=>{
    let s = e.target.value;
    console.log(s)
    e.target.value = s.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
})

let regName = /^[a-zа-яё]+$/i;
// let regPhone = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,30}(\s*)?$/;
let regPhone = /(?:\+)[\d\-\(\) ]{9,30}\d/g;
let regEmail = /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/;
/// в тз описана валидация только индекса
let regInn = /^\d{1,10}$/;






//Алгоритм проверки ИНН 10 знаков:
// Вычисляется контрольная сумма со следующими весовыми коэффициентами: (2,4,10,3,5,9,4,6,8,0)
// Вычисляется контрольное число как остаток от деления контрольной суммы на 11
// Если контрольное число больше 9, то контрольное число вычисляется как остаток от деления контрольного числа на 10
// Контрольное число проверяется с десятым знаком ИНН. В случае их равенства ИНН считается правильным.
// function is_valid_inn(i) {
//     i = i.toString();
//     if (i.match(/\D/)) return false;
//     let inn = i.match(/(\d)/g);
//     if (inn.length == 10) {
//         return inn[9] == String(((
//             2 * inn[0] + 4 * inn[1] + 10 * inn[2] +
//             3 * inn[3] + 5 * inn[4] + 9 * inn[5] +
//             4 * inn[6] + 6 * inn[7] + 8 * inn[8]
//         ) % 11) % 10);
//     }
//     return false;
// }
// пример верного ИНН: 6167109768
// console.log(is_valid_inn(6167109768));


function clearWarning(input, flag) {
    let inputContainer = input.parentElement;
    inputContainer.classList.remove('invalid');
    flag == 'valid' ?
        inputContainer.children[1].src = 'images/check.svg' :
        inputContainer.children[1].src = 'images/arrow.svg';
    Array.from(inputContainer.children).map((el) => {
        if (el.classList.contains('error')) {
            el.remove();
        };
    });
};
function validate(regex, str) {
    return regex.test(str);
};

function handleValidation(regEx, str) {
    let inputContainer = str.parentElement;
    if (!validate(regEx, str.value)) {
        console.log(str)
        if (!inputContainer.classList.contains('invalid')) {
            inputContainer.classList.add('invalid');
            inputContainer.children[1].src = 'images/red-cross.svg';
            let p = document.createElement('p');
            p.className = 'error';
            p.innerText = 'Попробуйте еще раз';
            inputContainer.appendChild(p);
        };
    } else {
        clearWarning(str, 'valid');
    };
};

let inputs = customerForm.querySelectorAll('input')
customerForm.addEventListener('submit', onSubmit)
function onSubmit(e) {
    e.preventDefault();
    for (let i = 0; i < inputs.length; i++) {
        const inputContainer = inputs[i].parentElement;
        if (inputs[i].value.length < 1) {
            if (!inputContainer.classList.contains('empty')) {
                inputContainer.classList.add('empty');
                let p = document.createElement('p');
                p.className = 'error';
                p.innerText = 'Попробуйте еще раз';
                inputContainer.appendChild(p);
            };
        } else {
            clearWarning(inputs[i], 'valid');
        }
    }
}

for (let i = 0; i < inputs.length; i++) {
    const input = inputs[i];
    input.addEventListener('blur', (e) => validateInput(e))
}
function validateInput(e) {
    console.log('something')
    e.preventDefault();
    let input = e.target;
    if (input.value) {
        let regEx;
        switch (input.name) {
            case 'name':
                // regEx = regName;
                break;
            case 'surname':
                // regEx = regName;
                break;
            case 'phone_number':
                regEx = regPhone;
                break;
            case 'email':
                regEx = regEmail;
                break;
            case 'inn':
                regEx = regInn;
                break;
        };
        if (regEx) {
            handleValidation(regEx, input);
        };
    }
};

// почта - валидация, Текст ошибки «Проверьте адрес электронной почты»
// Текст для незаполненного поля «Укажите электронную почту»

// Телефон
// Проверяем по существующему алгоритму, просим проверить формат номера. Добавляем пробелы между группами цифр, чтобы удобнее было считывать номер. Ограничиваем количество символов до 30 на случай копипаста со скобками. Не разрешаем вводить буквы.
// Текст ошибки «Формат: +9 999 999 99 99»
// Текст для незаполненного поля «Укажите номер телефона»


//   inputs[i].value = inputs[i].value.replace(/\B(?=(\d{3})+(?!\d))/g, " ")
let strs = ['1000,999', '10000.99', '1000000'];
for (let s of strs) {
    console.log(s.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "))
}
