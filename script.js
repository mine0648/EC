/*!
 * ModernShop - E-commerce Website JavaScript
 * Interactive shopping experience with cart and product management
 * 
 * @author Claude Code
 * @version 1.0.0
 * @license MIT
 */

// Sample product data
const products = [
  {
    id: 1,
    title: "プレミアムTシャツ",
    description: "高品質なコットン100%のTシャツ。快適な着心地と洗練されたデザイン。",
    price: 3980,
    originalPrice: 4980,
    category: "fashion",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80",
    rating: 4.5,
    badge: "SALE"
  },
  {
    id: 2,
    title: "レザーハンドバッグ",
    description: "本革を使用した上質なハンドバッグ。ビジネスシーンにもカジュアルにも。",
    price: 12800,
    category: "accessories",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80",
    rating: 4.8
  },
  {
    id: 3,
    title: "モダンテーブルランプ",
    description: "シンプルでモダンなデザインのテーブルランプ。調光機能付き。",
    price: 8900,
    category: "home",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80",
    rating: 4.3
  },
  {
    id: 4,
    title: "ワイヤレスイヤホン",
    description: "高音質でノイズキャンセリング機能付きのワイヤレスイヤホン。",
    price: 15800,
    originalPrice: 19800,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80",
    rating: 4.7,
    badge: "NEW"
  },
  {
    id: 5,
    title: "カシミアセーター",
    description: "上質なカシミア100%のセーター。柔らかな肌触りと暖かさ。",
    price: 19800,
    category: "fashion",
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80",
    rating: 4.9
  },
  {
    id: 6,
    title: "シルバーネックレス",
    description: "925シルバー製のエレガントなネックレス。どんなスタイルにも合わせやすい。",
    price: 7200,
    category: "accessories",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80",
    rating: 4.4
  },
  {
    id: 7,
    title: "北欧風クッション",
    description: "モダンな北欧デザインのクッション。リビングのアクセントに最適。",
    price: 2800,
    category: "home",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80",
    rating: 4.2
  },
  {
    id: 8,
    title: "スマートウォッチ",
    description: "健康管理機能付きのスマートウォッチ。防水仕様で日常使いに最適。",
    price: 22800,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80",
    rating: 4.6
  }
];

// Cart state management
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let currentFilter = 'all';

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
  initializeApp();
});

function initializeApp() {
  renderProducts();
  updateCartUI();
  setupEventListeners();
  console.log('ModernShop initialized successfully! 🛒');
}

function setupEventListeners() {
  // Filter buttons
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      currentFilter = e.target.dataset.filter;
      updateFilterButtons();
      renderProducts();
    });
  });

  // Category cards
  document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', (e) => {
      const category = e.currentTarget.dataset.category;
      currentFilter = category;
      updateFilterButtons();
      renderProducts();
      scrollToProducts();
    });
  });

  // Search functionality
  const searchInput = document.getElementById('search-input');
  const searchBtn = document.querySelector('.search-btn');
  
  searchInput.addEventListener('input', handleSearch);
  searchBtn.addEventListener('click', handleSearch);
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSearch();
  });

  // Close modals when clicking outside
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
      closeAllModals();
    }
  });
}

function renderProducts(searchTerm = '') {
  const productsGrid = document.getElementById('products-grid');
  let filteredProducts = products;

  // Filter by category
  if (currentFilter !== 'all') {
    filteredProducts = products.filter(product => product.category === currentFilter);
  }

  // Filter by search term
  if (searchTerm) {
    filteredProducts = filteredProducts.filter(product =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  if (filteredProducts.length === 0) {
    productsGrid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
        <p style="font-size: 1.2rem; color: #6b7280;">商品が見つかりませんでした</p>
        <button onclick="resetFilters()" style="margin-top: 1rem; padding: 0.5rem 1rem; background: var(--primary-color); color: white; border: none; border-radius: 8px; cursor: pointer;">すべての商品を表示</button>
      </div>
    `;
    return;
  }

  productsGrid.innerHTML = filteredProducts.map(product => `
    <div class="product-card" onclick="openProductModal(${product.id})">
      <div class="product-image">
        <img src="${product.image}" alt="${product.title}" loading="lazy">
        ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
      </div>
      <div class="product-info">
        <h3 class="product-title">${product.title}</h3>
        <p class="product-description">${product.description}</p>
        <div class="product-price">
          <span class="price">¥${product.price.toLocaleString()}</span>
          ${product.originalPrice ? `<span class="original-price">¥${product.originalPrice.toLocaleString()}</span>` : ''}
        </div>
        <div class="rating">
          ${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5 - Math.floor(product.rating))}
          <span>${product.rating}</span>
        </div>
        <button class="add-to-cart-btn" onclick="event.stopPropagation(); addToCart(${product.id})">
          カートに追加
        </button>
      </div>
    </div>
  `).join('');

  // Add fade-in animation
  productsGrid.querySelectorAll('.product-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    setTimeout(() => {
      card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, index * 100);
  });
}

function updateFilterButtons() {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.remove('active');
    if (btn.dataset.filter === currentFilter) {
      btn.classList.add('active');
    }
  });
}

function handleSearch() {
  const searchTerm = document.getElementById('search-input').value;
  renderProducts(searchTerm);
}

function resetFilters() {
  currentFilter = 'all';
  document.getElementById('search-input').value = '';
  updateFilterButtons();
  renderProducts();
}

// Cart functionality
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const existingItem = cart.find(item => item.id === productId);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      ...product,
      quantity: 1
    });
  }

  updateCartStorage();
  updateCartUI();
  showNotification(`${product.title} がカートに追加されました`);
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  updateCartStorage();
  updateCartUI();
  renderCartItems();
}

function updateQuantity(productId, change) {
  const item = cart.find(item => item.id === productId);
  if (!item) return;

  item.quantity += change;
  
  if (item.quantity <= 0) {
    removeFromCart(productId);
    return;
  }

  updateCartStorage();
  updateCartUI();
  renderCartItems();
}

function updateCartStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartUI() {
  const cartCount = document.querySelector('.cart-count');
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = totalItems;
  cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
}

function renderCartItems() {
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');

  if (cart.length === 0) {
    cartItems.innerHTML = `
      <div style="text-align: center; padding: 2rem; color: #6b7280;">
        <p>カートは空です</p>
        <button onclick="closeCart()" style="margin-top: 1rem; padding: 0.5rem 1rem; background: var(--primary-color); color: white; border: none; border-radius: 8px; cursor: pointer;">ショッピングを続ける</button>
      </div>
    `;
    cartTotal.textContent = '0';
    return;
  }

  cartItems.innerHTML = cart.map(item => `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.title}">
      <div class="cart-item-info">
        <div class="cart-item-title">${item.title}</div>
        <div class="cart-item-price">¥${item.price.toLocaleString()}</div>
      </div>
      <div class="cart-item-quantity">
        <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
        <span>${item.quantity}</span>
        <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
      </div>
      <button onclick="removeFromCart(${item.id})" style="background: var(--danger-color); color: white; border: none; padding: 0.5rem; border-radius: 4px; cursor: pointer;">削除</button>
    </div>
  `).join('');

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  cartTotal.textContent = total.toLocaleString();
}

// Modal functionality
function openCart() {
  renderCartItems();
  document.getElementById('cart-modal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  document.getElementById('cart-modal').classList.remove('active');
  document.body.style.overflow = 'auto';
}

function openAuthModal() {
  document.getElementById('auth-modal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeAuthModal() {
  document.getElementById('auth-modal').classList.remove('active');
  document.body.style.overflow = 'auto';
}

function openProductModal(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const modal = document.getElementById('product-modal');
  const content = document.getElementById('product-detail-content');

  content.innerHTML = `
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; padding: 2rem;">
      <div>
        <img src="${product.image}" alt="${product.title}" style="width: 100%; border-radius: 12px;">
      </div>
      <div>
        <h2 style="margin-bottom: 1rem; font-size: 1.8rem;">${product.title}</h2>
        <div style="margin-bottom: 1rem;">
          <span style="font-size: 1.5rem; font-weight: 700; color: var(--primary-color);">¥${product.price.toLocaleString()}</span>
          ${product.originalPrice ? `<span style="text-decoration: line-through; color: #6b7280; margin-left: 0.5rem;">¥${product.originalPrice.toLocaleString()}</span>` : ''}
        </div>
        <div style="margin-bottom: 1.5rem; color: #374151;">
          ${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5 - Math.floor(product.rating))}
          <span style="margin-left: 0.5rem;">${product.rating} / 5.0</span>
        </div>
        <p style="margin-bottom: 2rem; line-height: 1.6; color: #6b7280;">${product.description}</p>
        <div style="margin-bottom: 2rem;">
          <h4 style="margin-bottom: 1rem;">商品詳細</h4>
          <ul style="color: #6b7280; line-height: 1.8;">
            <li>高品質な素材を使用</li>
            <li>環境に配慮した製造プロセス</li>
            <li>30日間返品保証</li>
            <li>全国送料無料（5,000円以上）</li>
          </ul>
        </div>
        <button onclick="addToCart(${product.id}); closeProductModal();" style="width: 100%; background: var(--primary-color); color: white; border: none; padding: 1rem; border-radius: 8px; font-size: 1.1rem; font-weight: 600; cursor: pointer;">
          カートに追加 - ¥${product.price.toLocaleString()}
        </button>
      </div>
    </div>
  `;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeProductModal() {
  document.getElementById('product-modal').classList.remove('active');
  document.body.style.overflow = 'auto';
}

function closeAllModals() {
  document.querySelectorAll('.modal').forEach(modal => {
    modal.classList.remove('active');
  });
  document.body.style.overflow = 'auto';
}

// Auth functionality
function showLogin() {
  document.getElementById('login-form').classList.remove('hidden');
  document.getElementById('register-form').classList.add('hidden');
}

function showRegister() {
  document.getElementById('login-form').classList.add('hidden');
  document.getElementById('register-form').classList.remove('hidden');
}

// Checkout functionality
function checkout() {
  if (cart.length === 0) {
    showNotification('カートに商品がありません');
    return;
  }

  // Simulate checkout process
  showNotification('決済処理中...', 'info');
  
  setTimeout(() => {
    cart = [];
    updateCartStorage();
    updateCartUI();
    closeCart();
    showNotification('ご注文ありがとうございました！', 'success');
  }, 2000);
}

// Utility functions
function scrollToProducts() {
  document.getElementById('products').scrollIntoView({
    behavior: 'smooth'
  });
}

function showNotification(message, type = 'success') {
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${type === 'success' ? '#10b981' : type === 'info' ? '#3b82f6' : '#ef4444'};
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
    z-index: 10000;
    animation: slideIn 0.3s ease;
    max-width: 300px;
    word-wrap: break-word;
  `;
  
  notification.textContent = message;
  document.body.appendChild(notification);

  // Add animation styles
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideIn {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
  `;
  document.head.appendChild(style);

  setTimeout(() => {
    notification.style.animation = 'slideIn 0.3s ease reverse';
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 3000);
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
  // ESC key to close modals
  if (e.key === 'Escape') {
    closeAllModals();
  }
  
  // Ctrl/Cmd + K for search
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    document.getElementById('search-input').focus();
  }
});

// Responsive menu toggle (for mobile)
function toggleMobileMenu() {
  const navMenu = document.querySelector('.nav-menu');
  navMenu.classList.toggle('mobile-active');
}

// Analytics tracking (placeholder)
function trackEvent(eventName, properties = {}) {
  console.log('Event tracked:', eventName, properties);
  // Real analytics implementation would go here
}

// Performance monitoring
window.addEventListener('load', () => {
  const loadTime = performance.now();
  console.log(`ModernShop loaded in ${Math.round(loadTime)}ms`);
});

// Service Worker registration (for PWA features)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('SW registered: ', registration);
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}