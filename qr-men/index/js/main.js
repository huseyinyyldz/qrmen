// Sayfa yüklendiğinde çalışacak fonksiyonlar
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const body = document.body;
    let isMenuOpen = false;

    // Mevcut sayfanın dizin derinliğini kontrol et
    const isInCategoryPage = window.location.pathname.includes('/categories/');
    const basePath = isInCategoryPage ? '../' : '';

    // Kategori menüsünü oluştur
    const categoryMenu = document.createElement('div');
    categoryMenu.className = 'category-menu';
    categoryMenu.innerHTML = `
        <div class="category-menu-header">Kategoriler</div>
        <div class="category-grid">
            <a href="${basePath}categories/breakfast.html" class="category-card">
                <img src="${basePath}../img/categories/cig-kfte.jpg" alt="Kahvaltı" class="category-image">
                <div class="category-title">Çiğköfte Dürüm Menüler</div>
            </a>
            <a href="${basePath}categories/hot-drinks.html" class="category-card">
                <img src="${basePath}../img/categories/ekmek-arasi.jpg" alt="Sıcak İçecekler" class="category-image">
                <div class="category-title">Ekmek Arası Ürünlerr</div>
            </a>
            <a href="${basePath}categories/cold-drinks.html" class="category-card">
                <img src="${basePath}../img/categories/cold.jpg" alt="Soğuk İçecekler" class="category-image">
                <div class="category-title">Soğuk İçecekler</div>
            </a>
            <a href="${basePath}categories/beverages.html" class="category-card">
                <img src="${basePath}../img/categories/cig-prsiyn.jpg" alt="Kutu İçecekler" class="category-image">
                <div class="category-title">Çiğ Köfte Porsiyonlar</div>
            </a>
            <a href="${basePath}categories/snacks.html" class="category-card">
                <img src="${basePath}../img/categories/atistirmalik.jpg" alt="Atıştırmalıklar" class="category-image">
                <div class="category-title">Atıştırmalıklar</div>
            </a>
            <a href="${basePath}categories/main-dishes.html" class="category-card">
                <img src="${basePath}../img/categories/ana-yemek.jpg" alt="Ana Yemek" class="category-image">
                <div class="category-title">Ana Yemek</div>
            </a>
            <a href="${basePath}categories/burgers.html" class="category-card">
                <img src="${basePath}../img/categories/burger.jpg" alt="Burgerler" class="category-image">
                <div class="category-title">Burgerler</div>
            </a>
        </div>
    `;
    body.appendChild(categoryMenu);

    // Menü butonuna tıklama olayı
    menuToggle.addEventListener('click', function() {
        isMenuOpen = !isMenuOpen;
        if (isMenuOpen) {
            menuToggle.classList.add('active');
            categoryMenu.classList.add('active');
            body.style.overflow = 'hidden';
        } else {
            menuToggle.classList.remove('active');
            categoryMenu.classList.remove('active');
            body.style.overflow = '';
        }
    });

    // Menü dışına tıklama olayı
    document.addEventListener('click', function(e) {
        if (isMenuOpen && !menuToggle.contains(e.target) && !categoryMenu.contains(e.target)) {
            isMenuOpen = false;
            menuToggle.classList.remove('active');
            categoryMenu.classList.remove('active');
            body.style.overflow = '';
        }
    });

    // Butonlara tıklama efekti
    const buttons = document.querySelectorAll('a');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#') {
                e.preventDefault();
            }
            
            // Tıklama animasyonu
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 100);
        });
    });

    // Garson çağırma fonksiyonu
    const waiterButton = document.querySelector('.btn-waiter');
    if (waiterButton) {
        waiterButton.addEventListener('click', function(e) {
            e.preventDefault();
            // Garson çağırma animasyonu
            this.classList.add('calling');
            setTimeout(() => {
                this.classList.remove('calling');
                alert('Garson çağrınız alındı. En kısa sürede size ulaşılacaktır.');
            }, 1000);
        });
    }

    // Kategori menüsü için elementler
    const orderButton = document.getElementById('orderButton');
    const menuButton = document.getElementById('menuButton');
    const myOrdersButton = document.getElementById('myOrdersButton');
    const footerOrdersButton = document.getElementById('footerOrdersButton');

    // Sipariş ver ve menü butonları için fonksiyon
    function toggleCategoryMenu() {
        categoryMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
    }

    // Siparişlerim sayfasına yönlendirme fonksiyonu
    function goToOrders() {
        window.location.href = 'pages/orders.html';
    }

    // Event Listeners
    if (menuToggle) {
        menuToggle.addEventListener('click', toggleCategoryMenu);
    }

    if (orderButton) {
        orderButton.addEventListener('click', function(e) {
            e.preventDefault();
            toggleCategoryMenu();
        });
    }

    if (menuButton) {
        menuButton.addEventListener('click', function(e) {
            e.preventDefault();
            toggleCategoryMenu();
        });
    }

    if (myOrdersButton) {
        myOrdersButton.addEventListener('click', function(e) {
            e.preventDefault();
            goToOrders();
        });
    }

    if (footerOrdersButton) {
        footerOrdersButton.addEventListener('click', function(e) {
            e.preventDefault();
            goToOrders();
        });
    }

    // Kategori menüsünü dışarı tıklayınca kapatma
    document.addEventListener('click', function(e) {
        if (categoryMenu && categoryMenu.classList.contains('active')) {
            if (!categoryMenu.contains(e.target) && !menuToggle.contains(e.target) && 
                !orderButton.contains(e.target) && !menuButton.contains(e.target)) {
                categoryMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        }
    });

    // Kampanya modalı için elementler
    const campaignSheet = document.getElementById('campaignsModal');
    const campaignButtons = document.querySelectorAll('a[href="pages/campaigns.html"]');
    const closeSheet = document.getElementById('closeCampaigns');
    const copyButtons = document.querySelectorAll('.copy-code');

    // Kampanya modalını aç
    function openCampaignSheet() {
        if (campaignSheet) {
            campaignSheet.style.visibility = 'visible';
            campaignSheet.style.pointerEvents = 'auto';
            document.body.style.overflow = 'hidden';
            
            requestAnimationFrame(() => {
                campaignSheet.classList.add('active');
            });
        }
    }

    // Kampanya modalını kapat
    function closeCampaignSheet() {
        if (campaignSheet) {
            campaignSheet.classList.remove('active');
            document.body.style.overflow = '';
            campaignSheet.style.pointerEvents = 'none';
            
            setTimeout(() => {
                campaignSheet.style.visibility = 'hidden';
            }, 300);
        }
    }

    // Kampanya kodunu sepete ekle
    function applyCampaignCode(code) {
        localStorage.setItem('campaignCode', code);
        
        const button = document.querySelector(`[data-code="${code}"]`);
        if (button) {
            button.textContent = 'Kod Uygulandı';
            button.classList.add('copied');
            button.disabled = true;
            
            setTimeout(() => {
                closeCampaignSheet();
                window.location.href = 'pages/cart.html';
            }, 1500);
        }
    }

    // Event Listeners
    if (campaignButtons) {
        campaignButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                openCampaignSheet();
            });
        });
    }

    if (closeSheet) {
        closeSheet.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            closeCampaignSheet();
        });
    }

    if (copyButtons) {
        copyButtons.forEach(button => {
            button.addEventListener('click', function() {
                const code = this.getAttribute('data-code');
                applyCampaignCode(code);
            });
        });
    }

    // Modal dışına tıklayınca kapat
    if (campaignSheet) {
        campaignSheet.addEventListener('click', function(e) {
            if (e.target === campaignSheet) {
                e.stopPropagation();
                closeCampaignSheet();
            }
        });
    }

    // Ürün modalı için elementler
    const productModal = document.querySelector('.product-modal');
    const closeProductModal = document.querySelector('.close-product-modal');
    const productCards = document.querySelectorAll('.product-card');

    // Ürün modalını aç/kapa
    function toggleProductModal() {
        if (productModal) {
            productModal.classList.toggle('active');
            document.body.style.overflow = productModal.classList.contains('active') ? 'hidden' : '';
        }
    }

    // Event Listeners
    if (productCards) {
        productCards.forEach(card => {
            card.addEventListener('click', function(e) {
                e.preventDefault();
                toggleProductModal();
            });
        });
    }

    if (closeProductModal) {
        closeProductModal.addEventListener('click', toggleProductModal);
    }

    // Modal dışına tıklayınca kapat
    if (productModal) {
        productModal.addEventListener('click', function(e) {
            if (e.target === productModal) {
                toggleProductModal();
            }
        });
    }
}); 