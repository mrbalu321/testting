const restaurants = [
    {
        id: 1,
        name: "Punjabi Rasoi",
        cuisine: "North Indian",
        image: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/d41a7d6537b019b33a7e583c2763f044.jpg",
        menu: [
            { id: "p1", name: "Paneer Butter Masala", price: 250 },
            { id: "p2", name: "Dal Makhani", price: 200 }
        ]
    },
    {
        id: 2,
        name: "Pizza Palace",
        cuisine: "Italian",
        image: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/e0839ef04942001f65593881b23838a0.jpg",
        menu: [
            { id: "z1", name: "Margherita Pizza", price: 350 },
            { id: "z2", name: "Farmhouse Pizza", price: 400 }
        ]
    },
    {
        id: 3,
        name: "Mom's Kitchen",
        cuisine: "South Indian",
        image: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/f01666ac73626461d368d712e0c0ae2f.jpg",
        menu: [
            { id: "s1", name: "Dosa", price: 80 },
            { id: "s2", name: "Idli", price: 60 }
        ]
    }
];

let cart = {};

const restaurantList = document.querySelector('.restaurant-list');
const cartItemsContainer = document.getElementById('cart-items');
const totalPriceSpan = document.getElementById('total-price');
const cartCountSpan = document.getElementById('cart-count');
const cartSidebar = document.getElementById('cart');

// Render restaurant cards
function renderRestaurants() {
    restaurantList.innerHTML = '';
    restaurants.forEach(restaurant => {
        const card = document.createElement('div');
        card.className = 'restaurant-card';
        
        card.innerHTML = `
            <img src="${restaurant.image}" alt="${restaurant.name}">
            <div class="card-content">
                <h3>${restaurant.name}</h3>
                <p>${restaurant.cuisine}</p>
            </div>
            ${restaurant.menu.map(item => `
                <div class="menu-item">
                    <span>${item.name} - ₹${item.price}</span>
                    <button class="add-btn" data-item-id="${item.id}" data-item-name="${item.name}" data-item-price="${item.price}">Add</button>
                </div>
            `).join('')}
        `;
        restaurantList.appendChild(card);
    });

    document.querySelectorAll('.add-btn').forEach(button => {
        button.addEventListener('click', addItemToCart);
    });
}

// Add item to cart
function addItemToCart(event) {
    const { itemId, itemName, itemPrice } = event.target.dataset;
    if (cart[itemId]) {
        cart[itemId].quantity++;
    } else {
        cart[itemId] = { name: itemName, price: parseFloat(itemPrice), quantity: 1 };
    }
    updateCart();
}

// Update cart display and total price
function updateCart() {
    cartItemsContainer.innerHTML = '';
    let total = 0;
    let totalItems = 0;

    for (const itemId in cart) {
        const item = cart[itemId];
        if (item.quantity > 0) {
            total += item.price * item.quantity;
            totalItems += item.quantity;
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="item-info">
                    <h4>${item.name}</h4>
                    <span>₹${item.price.toFixed(2)} x ${item.quantity}</span>
                </div>
                <div class="item-controls">
                    <button data-item-id="${itemId}" onclick="decreaseQuantity(this)">-</button>
                    <span>${item.quantity}</span>
                    <button data-item-id="${itemId}" onclick="increaseQuantity(this)">+</button>
                </div>
            `;
            cartItemsContainer.appendChild(cartItem);
        }
    }

    totalPriceSpan.textContent = total.toFixed(2);
    cartCountSpan.textContent = totalItems;
}

// Increase item quantity in cart
function increaseQuantity(button) {
    const itemId = button.dataset.itemId;
    cart[itemId].quantity++;
    updateCart();
}

// Decrease item quantity in cart
function decreaseQuantity(button) {
    const itemId = button.dataset.itemId;
    if (cart[itemId].quantity > 1) {
        cart[itemId].quantity--;
    } else {
        delete cart[itemId];
    }
    updateCart();
}

// Toggle cart sidebar visibility
function toggleCart() {
    cartSidebar.classList.toggle('open');
}

// Initial render
renderRestaurants();
