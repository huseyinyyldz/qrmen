// Sepet verilerini localStorage'dan al
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// DOM elementleri
const cartItemsContainer = document.getElementById('cartItems');
const totalPriceElement = document.getElementById('totalPrice');
const clearCartButton = document.getElementById('clearCart');
const checkoutButton = document.getElementById('checkout');

// Sepeti güncelle ve localStorage'a kaydet
function updateCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
    updateTotalPrice();
}

// Toplam fiyatı güncelle
function updateTotalPrice() {
    const total = cart.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0);
    totalPriceElement.textContent = `₺${total.toFixed(2)}`;
}

// Sepeti görüntüle
function renderCart() {
    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <i class="fa-solid fa-shopping-cart"></i>
                <p>Sepetiniz boş</p>
            </div>
        `;
        return;
    }

    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="cart-item-info">
                <h3>${item.name}</h3>
                <div class="cart-item-actions">
                    <div class="quantity-controls">
                        <button class="quantity-btn" onclick="decreaseQuantity(${index})">
                            <i class="fa-solid fa-minus"></i>
                        </button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn" onclick="increaseQuantity(${index})">
                            <i class="fa-solid fa-plus"></i>
                        </button>
                    </div>
                    <span class="cart-item-price">₺${(parseFloat(item.price) * item.quantity).toFixed(2)}</span>
                    <button class="remove-item" onclick="removeItem(${index})">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
        cartItemsContainer.appendChild(cartItem);
    });
}

// Ürün miktarını artır
function increaseQuantity(index) {
    cart[index].quantity++;
    updateCart();
}

// Ürün miktarını azalt
function decreaseQuantity(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity--;
        updateCart();
    } else {
        removeItem(index);
    }
}

// Ürünü sepetten kaldır
function removeItem(index) {
    cart.splice(index, 1);
    updateCart();
}

// Sepeti temizle
clearCartButton.addEventListener('click', () => {
    if (confirm('Sepeti temizlemek istediğinize emin misiniz?')) {
        cart = [];
        updateCart();
    }
});

// Ödeme işlemi
checkoutButton.addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Sepetiniz boş!');
        return;
    }
    // Ödeme işlemi burada gerçekleştirilecek
    alert('Ödeme işlemi başlatılıyor...');
});

// Sayfa yüklendiğinde sepeti görüntüle
document.addEventListener('DOMContentLoaded', () => {
    renderCart();
    updateTotalPrice();
}); 