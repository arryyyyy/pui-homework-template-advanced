const glazingPrices = {
    'Keep Original': 0,
    'Sugar Milk': 0,
    'Vanilla': 0.5,
    'Double Chocolate': 1.5,
};

const reverseGlazingPrices = {
    '0': 'Keep Original',
    '0': 'Sugar Milk',
    '0.5': 'Vanilla',
    '1.5': 'Double Chocolate',
  };

const packSizePrices = {
    1: 1,
    3: 3,
    6: 5,
    12: 10,
};

class Roll {
    constructor(type, basePrice) {
        this.type = type;
        this.basePrice = basePrice;
        this.glazing = 'Keep Original';
        this.packSize = 1;
    }

    // Function to calculate the price based on the base price, glazing, and pack size
    calculatePrice() {
        const glazingPrice = glazingPrices[this.glazing];
        const packPrice = packSizePrices[Number(this.packSize)];
        console.log(glazingPrice + " " + this.basePrice + " " + packPrice); //for testing
        return (this.basePrice + glazingPrice) * packPrice;
    }
}

// Creating Roll objects for each type of cinnamon roll with respective base prices
const rollTypes = {
    'Original': new Roll('Original', 2.49),
    'Apple': new Roll('Apple', 3.49),
    'Raisin': new Roll('Raisin', 2.99),
    'Walnut': new Roll('Walnut', 3.49),
    'Double-chocolate': new Roll('Double-chocolate', 3.99),
    'Strawberry': new Roll('Strawberry', 3.99),
};

function populateGlazingOptions() {
    for (const [type] of Object.entries(rollTypes)) {
        populateOptions(`glazingOptions${type}`, glazingPrices);
    }
}

// Function to populate the individual dropdown menus
function populateOptions(elementId, options) {
    const element = document.getElementById(elementId);
    for (const [optionName, optionValue] of Object.entries(options)) {
        const option = document.createElement('option');
        option.value = optionValue;
        option.text = optionName;
        element.appendChild(option);
    }
}

// Function to update glazing choice and update the price displayed
function glazingChange(element) {
    const selectedRoll = getSelectedRoll(element);
    const selectedValue = reverseGlazingPrices[element.value];
    rollTypes[selectedRoll].glazing = selectedValue;
    updatePrice(selectedRoll);
}

// Function to update pack size choice and update the price displayed
function packSizeChange(element) {
    const selectedRoll = getSelectedRoll(element);
    rollTypes[selectedRoll].packSize = parseInt(element.value);
    updatePrice(selectedRoll);
}

// Function to fetch the selected roll type from the drop-down
function getSelectedRoll(element) {
    const rollType = element.getAttribute('data-roll-type');
    console.log('Selected roll: ', rollType);
    return rollType;
}

// Function to update the displayed price based on the selected roll type, glazing, and pack size
function updatePrice(rollType) {
    const priceElementId = `price${rollType}`; 
    const priceElement = document.getElementById(priceElementId);
    const totalPrice = rollTypes[rollType].calculatePrice().toFixed(2);
    priceElement.innerText = '$' + totalPrice;
}

// Cart data structure to store selected rolls
let cart = [];

// Function to add the selected roll with the chosen configurations to the cart
function addToCart(rollType) {
    const selectedRoll = rollTypes[rollType];
    cart.push({
        type: selectedRoll.type,
        glazing: selectedRoll.glazing,
        packSize: selectedRoll.packSize,
        price: selectedRoll.calculatePrice(),
    });

    // Populating and showing the popup
    document.getElementById('popupRollType').innerText = selectedRoll.type+ " cinnamon roll";
    document.getElementById('popupGlazingOption').innerText = selectedRoll.glazing;
    document.getElementById('popupPackSize').innerText = `Pack of ${selectedRoll.packSize}`;
    document.getElementById('popupPrice').innerText = `Price: $${selectedRoll.calculatePrice().toFixed(2)}`;
    
    const cartPopup = document.getElementById('cartPopup');
    cartPopup.style.display = 'block';

    // Hide the popup after 3 seconds
    setTimeout(() => {
        cartPopup.style.display = 'none';
    }, 3000);

    // Update cart menu item to display the current number of items and total price
    updateCartMenuItem();
}

// Function to update the cart menu item with the number of items and the total price
function updateCartMenuItem() {
    const items = document.getElementById('items');
    const totPrice = document.getElementById('totPrice');
    const itemCount = cart.length;
    const total = cart.reduce((acc, roll) => acc + roll.price, 0).toFixed(2);
    items.innerText = `${itemCount} items`;
    totPrice.innerText = `${total}`;
}


window.onload = function() {
    populateGlazingOptions();
}

/* MDN was used to look up many methods like window.onLoad, setTimeout etc */