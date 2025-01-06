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
}); 