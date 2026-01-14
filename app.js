/* ============================================================
   1. NAVIGATION & LAYOUT RESPONSIVENESS
   ============================================================ */

// Horizontal Scroll for Mobile Navigation (Left Links)
const navContainer = document.querySelector('.left-links');
if (navContainer) {
    navContainer.addEventListener('wheel', (evt) => {
        evt.preventDefault();
        navContainer.scrollLeft += evt.deltaY; // PC par mouse wheel se scroll karne ke liye
    });
}

// Toggle Grid / List View (Listing Page)
const gridViewBtn = document.querySelector('.view-icons .grid-view');
const listViewBtn = document.querySelector('.view-icons .list-view');
const productsGrid = document.querySelector('.products-grid');

if(gridViewBtn && listViewBtn && productsGrid) {
    gridViewBtn.addEventListener('click', () => {
        productsGrid.classList.remove('list-view');
        gridViewBtn.classList.add('active');
        listViewBtn.classList.remove('active');
    });
    listViewBtn.addEventListener('click', () => {
        productsGrid.classList.add('list-view');
        listViewBtn.classList.add('active');
        gridViewBtn.classList.remove('active');
    });
}

/* ============================================================
   2. FILTERS & PRODUCT INTERACTION
   ============================================================ */

// Filter Selection
const filterItems = document.querySelectorAll('.filter-group ul li');
filterItems.forEach(item => {
    item.addEventListener('click', () => {
        filterItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        // Logic to filter products can be added here
    });
});

// Price Range Apply
const priceInputs = document.querySelectorAll('.range-inputs input');
const applyBtn = document.querySelector('.apply-btn');
if(applyBtn) {
    applyBtn.addEventListener('click', () => {
        const min = priceInputs[0].value;
        const max = priceInputs[1].value;
        console.log(`Filtering: ${min} - ${max}`);
    });
}

/* ============================================================
   3. PRODUCT DETAIL PAGE (Gallery & Tabs)
   ============================================================ */

// Gallery Thumbnail Click
const mainImg = document.querySelector('.main-img img');
const thumbs = document.querySelectorAll('.thumb-list img');

thumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
        if(mainImg) mainImg.src = thumb.src;
        thumbs.forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
    });
});

// Product Tabs
const tabLinks = document.querySelectorAll('.tab-link');
const tabBodies = document.querySelectorAll('.tab-body');

tabLinks.forEach((tab, index) => {
    tab.addEventListener('click', () => {
        tabLinks.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        tabBodies.forEach(b => b.style.display = 'none');
        if(tabBodies[index]) tabBodies[index].style.display = 'block';
    });
});

// Default Tab Initialization
if(tabLinks.length > 0) {
    tabLinks[0].click();
}

/* ============================================================
   4. CART SYSTEM (Calculations & Actions)
   ============================================================ */

let cartCount = 0;
const cartBadge = document.querySelector('.cart-count');

// Add to Cart Function
function addToCart(productName) {
    cartCount++;
    if(cartBadge) {
        cartBadge.innerText = cartCount;
        // Animation effect
        cartBadge.style.transform = "scale(1.2)";
        setTimeout(() => cartBadge.style.transform = "scale(1)", 200);
    }
    alert(productName + " has been added to your cart!");
}

// Update Total Price on Cart Page
function updateCartTotal() {
    const cartItems = document.querySelectorAll('.cart-item');
    let subtotal = 0;
    
    cartItems.forEach(item => {
        const priceEl = item.querySelector('.price');
        const qtyEl = item.querySelector('.qty-select');
        
        if(priceEl && qtyEl) {
            const price = parseFloat(priceEl.textContent.replace(/[^0-9.]/g, ''));
            const qty = parseInt(qtyEl.value);
            subtotal += price * qty;
        }
    });
    
    const totalEl = document.querySelector('.total');
    if(totalEl) totalEl.textContent = `$${subtotal.toFixed(2)}`;
}

// Event Listeners for Cart Actions
document.addEventListener('change', (e) => {
    if(e.target.classList.contains('qty-select')) {
        updateCartTotal();
    }
});

document.addEventListener('click', (e) => {
    // Remove Item
    if(e.target.classList.contains('remove')) {
        const item = e.target.closest('.cart-item');
        if(item) {
            item.remove();
            updateCartTotal();
        }
    }
    
    // Save for Later
    if(e.target.classList.contains('save')) {
        const item = e.target.closest('.cart-item');
        const savedSection = document.querySelector('.saved-grid');
        if(item && savedSection) {
            const clone = item.cloneNode(true);
            // Clean up buttons in saved section
            const rBtn = clone.querySelector('.remove');
            const sBtn = clone.querySelector('.save');
            if(rBtn) rBtn.remove();
            if(sBtn) sBtn.remove();
            
            savedSection.appendChild(clone);
            item.remove();
            updateCartTotal();
        }
    }
});

// Checkout & Remove All
const removeAllBtn = document.querySelector('.btn-remove-all');
if(removeAllBtn) {
    removeAllBtn.addEventListener('click', () => {
        const container = document.querySelector('.cart-left-section');
        if(container) container.innerHTML = '';
        updateCartTotal();
    });
}

const checkoutBtn = document.querySelector('.btn-checkout');
if(checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
        alert('Proceeding to checkout!');
    });
}