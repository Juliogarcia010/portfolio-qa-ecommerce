/**
 * Módulo do carrinho de compras — operações em memória com persistência em sessionStorage.
 * Atende requisitos R01–R09.
 */
const Cart = (() => {
  const STORAGE_KEY = 'techstore_cart';

  /** @type {Map<number, { productId: number, quantity: number }>} */
  let items = new Map();

  function loadFromSession() {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      items = new Map(parsed.map((entry) => [entry.productId, entry]));
    } catch {
      items = new Map();
    }
  }

  function saveToSession() {
    const data = Array.from(items.values());
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  function getProduct(productId) {
    return PRODUCTS.find((p) => p.id === productId) || null;
  }

  function notifyListeners() {
    window.dispatchEvent(new CustomEvent('cart:updated'));
  }

  /** R01 — Adiciona produto com quantidade inicial 1 */
  function addProduct(productId) {
    const product = getProduct(productId);
    if (!product) return false;

    const existing = items.get(productId);
    if (existing) {
      existing.quantity += 1;
    } else {
      items.set(productId, { productId, quantity: 1 });
    }

    saveToSession();
    notifyListeners();
    return true;
  }

  /** R02 — Altera quantidade (+/-) */
  function updateQuantity(productId, delta) {
    const entry = items.get(productId);
    if (!entry) return false;

    entry.quantity += delta;
    if (entry.quantity <= 0) {
      items.delete(productId);
    }

    saveToSession();
    notifyListeners();
    return true;
  }

  /** R03 — Remove produto */
  function removeProduct(productId) {
    if (!items.has(productId)) return false;
    items.delete(productId);
    saveToSession();
    notifyListeners();
    return true;
  }

  /** R05 — Subtotal de um item */
  function getItemSubtotal(productId) {
    const entry = items.get(productId);
    const product = getProduct(productId);
    if (!entry || !product) return 0;
    return product.price * entry.quantity;
  }

  /** R04/R06 — Lista de itens com detalhes */
  function getItems() {
    return Array.from(items.values())
      .map((entry) => {
        const product = getProduct(entry.productId);
        if (!product) return null;
        return {
          productId: entry.productId,
          name: product.name,
          price: product.price,
          quantity: entry.quantity,
          subtotal: product.price * entry.quantity,
          emoji: product.emoji,
        };
      })
      .filter(Boolean);
  }

  /** R06 — Total do carrinho */
  function getTotal() {
    return getItems().reduce((sum, item) => sum + item.subtotal, 0);
  }

  function getItemCount() {
    return getItems().reduce((sum, item) => sum + item.quantity, 0);
  }

  function isEmpty() {
    return items.size === 0;
  }

  /** R10 — Limpa carrinho após finalização */
  function clear() {
    items = new Map();
    saveToSession();
    notifyListeners();
  }

  loadFromSession();

  return {
    addProduct,
    updateQuantity,
    removeProduct,
    getItems,
    getItemSubtotal,
    getTotal,
    getItemCount,
    isEmpty,
    clear,
  };
})();
