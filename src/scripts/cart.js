// Simple localStorage cart — this is a static demo template with no real
// backend, but the API is shaped so a real cart/checkout could be swapped
// in later without touching the components that call it.
const KEY = 'lume_cart';

export function getCart() {
	try {
		const raw = localStorage.getItem(KEY);
		return raw ? JSON.parse(raw) : [];
	} catch {
		return [];
	}
}

function saveCart(items) {
	localStorage.setItem(KEY, JSON.stringify(items));
	document.dispatchEvent(new CustomEvent('cart:updated', { detail: { items } }));
}

export function addToCart(product, qty = 1) {
	const items = getCart();
	const existing = items.find((i) => i.slug === product.slug);
	if (existing) {
		existing.qty += qty;
	} else {
		items.push({ ...product, qty });
	}
	saveCart(items);
	return items;
}

export function updateQty(slug, qty) {
	let items = getCart();
	if (qty <= 0) {
		items = items.filter((i) => i.slug !== slug);
	} else {
		const item = items.find((i) => i.slug === slug);
		if (item) item.qty = qty;
	}
	saveCart(items);
	return items;
}

export function removeFromCart(slug) {
	const items = getCart().filter((i) => i.slug !== slug);
	saveCart(items);
	return items;
}

export function getCartCount() {
	return getCart().reduce((sum, i) => sum + i.qty, 0);
}

export function getCartTotal() {
	return getCart().reduce((sum, i) => sum + i.qty * i.price, 0);
}

// Global event-delegation: any [data-add-to-cart] button on any page adds
// its product automatically.
//
// `bound` guards against double-binding — with Astro's ClientRouter,
// Header.astro re-runs initCartDelegation() after every client-side
// navigation so it stays attached to the new page's elements. Without this
// guard the document click listener would stack up across navigations and
// a single "Add to cart" click would add the item multiple times.
let bound = false;
export function initCartDelegation() {
	if (bound) return;
	bound = true;
	document.addEventListener('click', (e) => {
		const btn = e.target.closest('[data-add-to-cart]');
		if (!btn) return;
		e.preventDefault();
		const { slug, name, brand, price, image } = btn.dataset;
		addToCart({ slug, name, brand, price: parseFloat(price), image });

		const label = btn.querySelector('[data-add-label]') ?? btn;
		const original = label.textContent;
		label.textContent = document.documentElement.dataset.cartAdded || 'Added ✓';
		btn.classList.add('is-added');
		setTimeout(() => {
			label.textContent = original;
			btn.classList.remove('is-added');
		}, 1400);
	});
}
