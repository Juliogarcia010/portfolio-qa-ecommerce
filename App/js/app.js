/**
 * Aplicação principal — renderização da UI e navegação entre páginas (SPA).
 */
(() => {
  const formatCurrency = (value) =>
    value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => document.querySelectorAll(selector);

  /* ===== Navegação entre páginas (R09) ===== */
  function navigateTo(pageId) {
    $$('.page').forEach((page) => page.classList.remove('page--active'));
    $(`#page-${pageId}`)?.classList.add('page--active');

    $$('.nav__link').forEach((link) => {
      link.classList.toggle('nav__link--active', link.dataset.nav === pageId);
    });

    window.location.hash = pageId;
  }

  function initNavigation() {
    const hash = window.location.hash.replace('#', '') || 'produtos';
    navigateTo(['produtos', 'carrinho', 'sobre'].includes(hash) ? hash : 'produtos');

    $$('[data-nav]').forEach((el) => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        navigateTo(el.dataset.nav);
      });
    });

    window.addEventListener('hashchange', () => {
      const page = window.location.hash.replace('#', '');
      if (['produtos', 'carrinho', 'sobre'].includes(page)) {
        navigateTo(page);
      }
    });
  }

  /* ===== Produtos ===== */
  function renderProducts() {
    const grid = $('#products-grid');
    if (!grid) return;

    grid.innerHTML = PRODUCTS.map(
      (product) => `
        <article class="product-card" data-product-id="${product.id}">
          <div class="product-card__image">${product.emoji}</div>
          <div class="product-card__body">
            <span class="product-card__category">${product.category}</span>
            <h2 class="product-card__name">${product.name}</h2>
            <p class="product-card__description">${product.description}</p>
            <div class="product-card__footer">
              <span class="product-card__price">${formatCurrency(product.price)}</span>
              <button type="button" class="btn btn--primary btn-add" data-id="${product.id}">
                Adicionar
              </button>
            </div>
          </div>
        </article>
      `
    ).join('');

    grid.querySelectorAll('.btn-add').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = Number(btn.dataset.id);
        Cart.addProduct(id);
        showToast('Produto adicionado ao carrinho!');
      });
    });
  }

  /* ===== Carrinho (R04, R08, R07) ===== */
  function renderCart() {
    const container = $('#cart-items');
    const totalEl = $('#cart-total');
    const subtotalEl = $('#cart-subtotal');
    const checkoutBtn = $('#btn-checkout');
    const badge = $('#cart-badge');
    const aboutCount = $('#about-cart-count');

    const items = Cart.getItems();
    const total = Cart.getTotal();
    const count = Cart.getItemCount();

    if (badge) {
      badge.textContent = count;
      badge.dataset.count = count;
    }
    if (aboutCount) aboutCount.textContent = count;
    if (totalEl) totalEl.textContent = formatCurrency(total);
    if (subtotalEl) subtotalEl.textContent = formatCurrency(total);
    if (checkoutBtn) checkoutBtn.disabled = Cart.isEmpty();

    if (!container) return;

    if (Cart.isEmpty()) {
      container.innerHTML = `
        <div class="cart-empty">
          <div class="cart-empty__icon">🛒</div>
          <h2>Seu carrinho está vazio</h2>
          <p>Adicione produtos para começar suas compras.</p>
          <a href="#produtos" class="btn btn--primary" data-nav="produtos">Ver Produtos</a>
        </div>
      `;
      container.querySelector('[data-nav]')?.addEventListener('click', (e) => {
        e.preventDefault();
        navigateTo('produtos');
      });
      return;
    }

    container.innerHTML = items
      .map(
        (item) => `
        <article class="cart-item" data-product-id="${item.productId}">
          <div class="cart-item__emoji">${item.emoji}</div>
          <div class="cart-item__info">
            <h3>${item.name}</h3>
            <p class="cart-item__price-unit">${formatCurrency(item.price)} cada</p>
          </div>
          <div class="cart-item__controls">
            <div class="quantity-control">
              <button type="button" class="btn btn--icon btn-decrease" data-id="${item.productId}" aria-label="Diminuir quantidade">−</button>
              <span class="quantity-control__value">${item.quantity}</span>
              <button type="button" class="btn btn--icon btn-increase" data-id="${item.productId}" aria-label="Aumentar quantidade">+</button>
            </div>
            <span class="cart-item__subtotal">${formatCurrency(item.subtotal)}</span>
            <button type="button" class="btn btn--danger btn-remove" data-id="${item.productId}">Remover</button>
          </div>
        </article>
      `
      )
      .join('');

    container.querySelectorAll('.btn-increase').forEach((btn) => {
      btn.addEventListener('click', () => Cart.updateQuantity(Number(btn.dataset.id), 1));
    });

    container.querySelectorAll('.btn-decrease').forEach((btn) => {
      btn.addEventListener('click', () => Cart.updateQuantity(Number(btn.dataset.id), -1));
    });

    container.querySelectorAll('.btn-remove').forEach((btn) => {
      btn.addEventListener('click', () => {
        Cart.removeProduct(Number(btn.dataset.id));
        showToast('Produto removido do carrinho.');
      });
    });
  }

  /* ===== Finalização (R10) ===== */
  function initCheckout() {
    const modal = $('#checkout-modal');
    const message = $('#modal-message');

    $('#btn-checkout')?.addEventListener('click', () => {
      const total = Cart.getTotal();
      const count = Cart.getItemCount();
      message.textContent = `Pedido de ${count} item(ns) no valor total de ${formatCurrency(total)} registrado com sucesso!`;
      modal?.classList.add('modal--open');
      modal?.setAttribute('aria-hidden', 'false');
      Cart.clear();
    });

    $$('[data-close-modal]').forEach((el) => {
      el.addEventListener('click', () => {
        modal?.classList.remove('modal--open');
        modal?.setAttribute('aria-hidden', 'true');
      });
    });
  }

  /* ===== Toast ===== */
  let toastTimeout;
  function showToast(text) {
    const toast = $('#toast');
    if (!toast) return;
    toast.textContent = text;
    toast.classList.add('toast--visible');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => toast.classList.remove('toast--visible'), 2800);
  }

  /* ===== Init ===== */
  function init() {
    initNavigation();
    renderProducts();
    renderCart();
    initCheckout();

    window.addEventListener('cart:updated', renderCart);
  }

  document.addEventListener('DOMContentLoaded', init);
})();
