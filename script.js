'use strict';

const orderForm = document.querySelector('.form-container');
const pancakeType = document.querySelector('#type');
const checkboxes = document.querySelectorAll('input[type="checkbox"]');
const deliveryOptions = document.querySelectorAll('input[name="deliverytype"]');
const priceDisplayElement = document.querySelector('#totalPrice');
const checkOrderButton = document.querySelector('.checkOrderButton');

let total = 0;
let selectedPancakeType = '';
let selectedToppings = [];
let selectedExtras = [];
let selectedDelivery = '';
let orders = [];


function pancakePriceTotal() {

    selectedPancakeType = pancakeType.selectedOptions[0].dataset.name;
    total = parseInt(pancakeType.options[pancakeType.selectedIndex].dataset.price);

    selectedToppings = [];
    selectedExtras = [];
    selectedDelivery = '';

    checkCheckboxes();
    checkDeliveryOptions();

    priceDisplayElement.textContent = `${total.toFixed(0)} €`;

    //const priceBanner = document.querySelector('.price-banner');

    const priceBoy = document.querySelector('.img-pancakeboy img');
    priceBoy.animate(

        [
            { transform: 'none' },
            { transform: 'translateY(-20%)' },
            { transform: 'none' },
        ],
        {
            duration: 350,
            iteration: 1,
        }
    );         
}; 


function checkCheckboxes() {   
    checkboxes.forEach(item => {
        if (item.checked === true) {
            total += parseInt(item.value);

            if (item.dataset.category === 'toppings') {
                selectedToppings.push(item.dataset.name);
            } else if (item.dataset.category === 'extras') {
                selectedExtras.push(item.dataset.name);
            }
        }
    });    
};


function checkDeliveryOptions() {
    deliveryOptions.forEach(item => {
        if (item.checked === true) {
          selectedDelivery = item.dataset.name;  
          total += parseInt(item.value);
        }
    });
}


function displayOrder() {
    const orderPancakeType = document.querySelector('#orderPancakeType');
    const orderToppings = document.querySelector('#orderToppings');
    const orderExtras = document.querySelector('#orderExtras');
    const orderDelivery = document.querySelector('#orderDelivery');
    const orderCustomerName = document.querySelector('#orderCustomerName');
    const orderTotalPrice = document.querySelector('#orderTotalPrice');
    const overlay = document.querySelector('.overlay');
    const closeButton = document.querySelector('.closeButton');
    const customerNameInput = document.querySelector('input[id="customerName"]').value.trim();
    const customerNameArray = customerNameInput.split(' ');
    const customerNameCapitalized = customerNameArray.map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()});
    const customerName = customerNameCapitalized.join(' ');

    orderPancakeType.textContent = selectedPancakeType;
    orderToppings.textContent = selectedToppings.length ? selectedToppings.join(', ') : 'No Toppings';
    orderExtras.textContent = selectedExtras.length ? selectedExtras.join(', ') : 'No Extras';
    orderDelivery.textContent = selectedDelivery;
    orderCustomerName.textContent = customerName; 
    orderTotalPrice.textContent = `${total.toFixed(2)} €`;
   

    overlay.style.display = "block";

    function closeModal() {
        if (overlay.style.display = "block") {
        overlay.style.display = "none";
        };
    };

    closeButton.addEventListener('click', closeModal);
       

    const order = {
        name: customerName,
        pancakeType: selectedPancakeType,
        toppings: selectedToppings,
        extras: selectedExtras,
        deliveryMethod: selectedDelivery,
        totalPrice: total.toFixed(2),
    };

    orders.push(order);
    console.log('Orders:', orders);
};

    
orderForm.addEventListener('change', pancakePriceTotal);
checkOrderButton.addEventListener('click', displayOrder);

pancakePriceTotal();