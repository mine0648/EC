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
  initializeSophisticatedAnimations();
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
  showSophisticatedNotification(`${product.title} がカートに追加されました`);
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
    showSophisticatedNotification('カートに商品がありません');
    return;
  }

  // Simulate checkout process
  showSophisticatedNotification('決済処理中...', 'info');
  
  setTimeout(() => {
    cart = [];
    updateCartStorage();
    updateCartUI();
    closeCart();
    showSophisticatedNotification('ご注文ありがとうございました！', 'success');
  }, 2000);
}

// Utility functions
function scrollToProducts() {
  sophisticatedScrollTo('#products');
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

// Sophisticated animation system
function initializeSophisticatedAnimations() {
  // Create floating particles
  createFloatingParticles();
  
  // Create interactive background elements
  createInteractiveBackground();
  
  // Create intersection observer for scroll animations
  const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Add staggered animation delays
        setTimeout(() => {
          entry.target.classList.add('animated');
          
          // Add specific animation classes based on element type
          if (entry.target.classList.contains('section-title')) {
            entry.target.classList.add('animate-text-reveal');
          } else if (entry.target.classList.contains('category-card')) {
            entry.target.classList.add('animate-scale-in');
          } else if (entry.target.classList.contains('product-card')) {
            entry.target.classList.add('animate-slide-up');
          } else if (entry.target.classList.contains('feature')) {
            entry.target.classList.add('animate-slide-left');
          } else {
            entry.target.classList.add('animate-slide-up');
          }
        }, index * 100);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  // Observe elements for sophisticated animations
  const animatedElements = document.querySelectorAll(`
    .section-title, 
    .category-card, 
    .product-card, 
    .feature, 
    .contact-item,
    .hero-content h2,
    .hero-content p,
    .cta-btn
  `);

  animatedElements.forEach((element, index) => {
    element.classList.add('animate-on-scroll');
    element.style.transitionDelay = `${index * 0.05}s`;
    animationObserver.observe(element);
  });

  // Add sophisticated hover effects
  addSophisticatedHoverEffects();
  
  // Initialize floating animations with different delays
  const floatingElements = document.querySelectorAll('.category-card, .product-card');
  floatingElements.forEach((element, index) => {
    element.style.animationDelay = `${index * 0.2}s`;
  });

  // Add parallax scrolling effects
  initializeParallaxEffects();
}

function addSophisticatedHoverEffects() {
  const hoverElements = document.querySelectorAll(`
    .category-card, 
    .product-card, 
    .contact-item, 
    .feature,
    .filter-btn,
    .cta-btn,
    .add-to-cart-btn
  `);

  hoverElements.forEach(element => {
    element.classList.add('sophisticated-hover');
    
    element.addEventListener('mouseenter', function() {
      this.style.animationPlayState = 'paused';
    });
    
    element.addEventListener('mouseleave', function() {
      this.style.animationPlayState = 'running';
    });
  });
}

function initializeParallaxEffects() {
  const parallaxElements = document.querySelectorAll('.hero, .categories, .about');
  
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    
    parallaxElements.forEach((element, index) => {
      const speed = 0.5 + (index * 0.1);
      const yPos = -(scrollTop * speed);
      element.style.transform = `translateY(${yPos}px)`;
    });
  });
}

// Enhanced smooth scrolling with sophisticated easing
function sophisticatedScrollTo(target) {
  const targetElement = document.querySelector(target);
  if (!targetElement) return;

  const targetPosition = targetElement.offsetTop - 100;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  const duration = 1200;
  let start = null;

  function sophisticatedEase(t) {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
  }

  function animation(currentTime) {
    if (start === null) start = currentTime;
    const timeElapsed = currentTime - start;
    const progress = Math.min(timeElapsed / duration, 1);
    const easedProgress = sophisticatedEase(progress);
    
    window.scrollTo(0, startPosition + distance * easedProgress);
    
    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    }
  }
  
  requestAnimationFrame(animation);
}

// Enhanced notification system with sophisticated animations
function showSophisticatedNotification(message, type = 'success') {
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${type === 'success' ? 'linear-gradient(135deg, #10b981, #34d399)' : 
                 type === 'info' ? 'linear-gradient(135deg, #3b82f6, #60a5fa)' : 
                 'linear-gradient(135deg, #ef4444, #f87171)'};
    color: white;
    padding: 1.5rem 2rem;
    border-radius: 16px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
    z-index: 10000;
    max-width: 350px;
    word-wrap: break-word;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    animation: slideInFromRight 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    font-weight: 500;
    letter-spacing: 0.02em;
  `;
  
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = 'slideInFromRight 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) reverse';
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 600);
  }, 4000);
}

// Create floating particles for dynamic background
function createFloatingParticles() {
  const particleContainer = document.createElement('div');
  particleContainer.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    pointer-events: none;
    z-index: 1;
    overflow: hidden;
  `;
  document.body.appendChild(particleContainer);

  // Create different types of particles
  for (let i = 0; i < 15; i++) {
    createParticle(particleContainer, 'circle');
  }
  for (let i = 0; i < 10; i++) {
    createParticle(particleContainer, 'square');
  }
  for (let i = 0; i < 8; i++) {
    createParticle(particleContainer, 'triangle');
  }
}

function createParticle(container, type) {
  const particle = document.createElement('div');
  const size = Math.random() * 20 + 10;
  const opacity = Math.random() * 0.3 + 0.1;
  const animationDuration = Math.random() * 20 + 15;
  const delay = Math.random() * 10;

  let shapeStyles = '';
  switch (type) {
    case 'circle':
      shapeStyles = `
        border-radius: 50%;
        background: linear-gradient(45deg, rgba(102, 126, 234, ${opacity}), rgba(139, 92, 246, ${opacity}));
      `;
      break;
    case 'square':
      shapeStyles = `
        border-radius: 20%;
        background: linear-gradient(135deg, rgba(240, 147, 251, ${opacity}), rgba(245, 101, 101, ${opacity}));
        transform: rotate(45deg);
      `;
      break;
    case 'triangle':
      shapeStyles = `
        width: 0;
        height: 0;
        border-left: ${size/2}px solid transparent;
        border-right: ${size/2}px solid transparent;
        border-bottom: ${size}px solid rgba(16, 185, 129, ${opacity});
      `;
      break;
  }

  particle.style.cssText = `
    position: absolute;
    width: ${size}px;
    height: ${size}px;
    ${shapeStyles}
    left: ${Math.random() * 100}vw;
    top: ${Math.random() * 100}vh;
    animation: particleFloat ${animationDuration}s ease-in-out infinite ${delay}s;
    filter: blur(0.5px);
  `;

  container.appendChild(particle);
}

// Create interactive background that responds to mouse movement
function createInteractiveBackground() {
  const interactiveLayer = document.createElement('div');
  interactiveLayer.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    pointer-events: none;
    z-index: 1;
    opacity: 0.5;
  `;
  document.body.appendChild(interactiveLayer);

  // Create multiple floating blobs that respond to mouse
  for (let i = 0; i < 5; i++) {
    createInteractiveBlob(interactiveLayer, i);
  }

  // Mouse movement effect
  let mouseX = 0;
  let mouseY = 0;
  
  document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth) * 100;
    mouseY = (e.clientY / window.innerHeight) * 100;
    
    updateInteractiveElements(mouseX, mouseY);
  });
}

function createInteractiveBlob(container, index) {
  const blob = document.createElement('div');
  const size = Math.random() * 200 + 100;
  const colors = [
    'rgba(102, 126, 234, 0.1)',
    'rgba(139, 92, 246, 0.1)',
    'rgba(240, 147, 251, 0.1)',
    'rgba(16, 185, 129, 0.1)',
    'rgba(245, 158, 11, 0.1)'
  ];

  blob.style.cssText = `
    position: absolute;
    width: ${size}px;
    height: ${size}px;
    background: radial-gradient(circle, ${colors[index]}, transparent);
    border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
    left: ${Math.random() * 80 + 10}%;
    top: ${Math.random() * 80 + 10}%;
    filter: blur(1px);
    transition: transform 0.3s ease-out;
    animation: morphingBlob ${15 + index * 2}s ease-in-out infinite;
  `;

  blob.classList.add('interactive-blob');
  container.appendChild(blob);
}

function updateInteractiveElements(mouseX, mouseY) {
  const blobs = document.querySelectorAll('.interactive-blob');
  
  blobs.forEach((blob, index) => {
    const offsetX = (mouseX - 50) * (0.1 + index * 0.02);
    const offsetY = (mouseY - 50) * (0.1 + index * 0.02);
    
    blob.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${1 + Math.sin(Date.now() * 0.001 + index) * 0.1})`;
  });
}

// Create scroll-based background effects
function createScrollBasedEffects() {
  const scrollLayer = document.createElement('div');
  scrollLayer.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    pointer-events: none;
    z-index: 1;
  `;
  document.body.appendChild(scrollLayer);

  // Add scroll listener for dynamic effects
  window.addEventListener('scroll', () => {
    const scrollProgress = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    
    // Update background elements based on scroll
    updateScrollBasedElements(scrollProgress);
  });
}

function updateScrollBasedElements(progress) {
  const particles = document.querySelectorAll('[style*="particleFloat"]');
  
  particles.forEach((particle, index) => {
    const rotation = progress * 360 * (index % 2 === 0 ? 1 : -1);
    const scale = 1 + Math.sin(progress * Math.PI * 2 + index) * 0.2;
    
    particle.style.transform += ` rotate(${rotation}deg) scale(${scale})`;
  });
}

// Performance monitoring
window.addEventListener('load', () => {
  const loadTime = performance.now();
  console.log(`ModernShop loaded in ${Math.round(loadTime)}ms`);
  
  // Initialize scroll-based effects after load
  createScrollBasedEffects();
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