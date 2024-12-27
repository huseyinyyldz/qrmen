document.addEventListener('DOMContentLoaded', function() {
    const productCards = document.querySelectorAll('.product-card');
    const searchInput = document.getElementById('searchInput');
    const modal = document.getElementById('productModal');
    const closeModal = document.querySelector('.close-modal');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Ürün kartlarına tıklama olayı
    productCards.forEach(card => {
        // Sepete ekle butonuna tıklama
        const addToCartBtn = card.querySelector('.add-to-cart');
        addToCartBtn.addEventListener('click', function(e) {
            e.stopPropagation(); // Kartın modal açmasını engelle
            const productId = card.dataset.productId;
            const productName = card.querySelector('h3').textContent;
            const productPrice = card.querySelector('.price').textContent.replace('₺', '');
            const productImage = card.querySelector('img').src;

            // Ürün zaten sepette var mı kontrol et
            const existingItem = cart.find(item => item.id === productId);

            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({
                    id: productId,
                    name: productName,
                    price: productPrice,
                    image: productImage,
                    quantity: 1
                });
            }

            // Sepeti güncelle
            localStorage.setItem('cart', JSON.stringify(cart));

            // Animasyonlu bildirim göster
            showNotification('Ürün sepete eklendi');
        });

        // Karta tıklama - modal açma
        card.addEventListener('click', function() {
            const productImage = this.querySelector('img').src;
            const productName = this.querySelector('h3').textContent;
            const productDesc = this.querySelector('.description').textContent;
            const productPrice = this.querySelector('.price').textContent;

            // Modal içeriğini güncelle
            modal.querySelector('.modal-image').src = productImage;
            modal.querySelector('.modal-image').alt = productName;
            modal.querySelector('h2').textContent = productName;
            modal.querySelector('.modal-description').textContent = productDesc;
            modal.querySelector('.modal-price').textContent = productPrice;

            // Modalı göster
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });

    // Modalı kapatma
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    });

    // Modal dışına tıklama
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }
    });

    // Arama fonksiyonu
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        
        productCards.forEach(card => {
            const productName = card.querySelector('h3').textContent.toLowerCase();
            const productDesc = card.querySelector('.description').textContent.toLowerCase();
            
            if (productName.includes(searchTerm) || productDesc.includes(searchTerm)) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    });

    // Bildirim gösterme fonksiyonu
    function showNotification(message) {
        // Varsa eski bildirimi kaldır
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Yeni bildirim oluştur
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;

        // Bildirimi sayfaya ekle
        document.body.appendChild(notification);

        // CSS ekle
        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            z-index: 1000;
            animation: slideUp 0.3s ease, fadeOut 0.3s ease 2s forwards;
        `;

        // Animasyon stilleri ekle
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideUp {
                from {
                    transform: translate(-50%, 20px);
                    opacity: 0;
                }
                to {
                    transform: translate(-50%, 0);
                    opacity: 1;
                }
            }

            @keyframes fadeOut {
                to {
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);

        // 2.5 saniye sonra bildirimi kaldır
        setTimeout(() => {
            notification.remove();
            style.remove();
        }, 2500);
    }

    // Lazy loading için Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                observer.unobserve(entry.target);
            }
        });
    });

    // Tüm ürün kartlarını observe et
    productCards.forEach(card => observer.observe(card));
}); 