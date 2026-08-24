// Wishlist, stored in localStorage — same pattern as cart.js. No backend, but
// it behaves like the real thing: save/remove products, and the heart icon on
// every product card reflects the current state.
const KEY = 'lume_wishlist';

export function getWishlist() {
	try {
		const raw = localStorage.getItem(KEY);
		return raw ? JSON.parse(raw) : [];
	} catch {
		return [];
	}
}

function saveWishlist(slugs) {
	localStorage.setItem(KEY, JSON.stringify(slugs));
	document.dispatchEvent(new CustomEvent('wishlist:updated', { detail: { slugs } }));
}

export function isInWishlist(slug) {
	return getWishlist().includes(slug);
}

export function addToWishlist(slug) {
	const items = getWishlist();
	if (!items.includes(slug)) items.push(slug);
	saveWishlist(items);
	return items;
}

export function removeFromWishlist(slug) {
	const items = getWishlist().filter((s) => s !== slug);
	saveWishlist(items);
	return items;
}

export function toggleWishlist(slug) {
	return isInWishlist(slug) ? removeFromWishlist(slug) : addToWishlist(slug);
}

// Paints every [data-toggle-wishlist] button on the current page to match
// localStorage — called on load and whenever the wishlist changes, so a card
// shown in more than one place (e.g. homepage + shop) always stays in sync.
export function syncWishlistButtons() {
	const items = getWishlist();
	document.querySelectorAll('[data-toggle-wishlist]').forEach((btn) => {
		btn.classList.toggle('is-active', items.includes(btn.dataset.slug));
	});
}

let bound = false;
export function initWishlistDelegation() {
	syncWishlistButtons();
	document.addEventListener('wishlist:updated', syncWishlistButtons);
	if (bound) return;
	bound = true;
	document.addEventListener('click', (e) => {
		const btn = e.target.closest('[data-toggle-wishlist]');
		if (!btn) return;
		e.preventDefault();
		toggleWishlist(btn.dataset.slug);
	});
}
