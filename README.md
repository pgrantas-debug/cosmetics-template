# LUMÉ — Cosmetics E-Shop Template

A fully static portfolio/demo template for a cosmetics e-shop, built with
Astro 7. "LUMÉ" is a fictional boutique beauty brand used to showcase the
design and functionality — there is no real backend behind any of it.

**No database, no server-side rendering, no admin panel, no real checkout.**
Meant to be deployed as a plain static site (e.g. Cloudflare Pages).

## What's here

- `/` — home page: hero, bestsellers grid, brand strip, about teaser,
  editor's picks, "follow us" tile grid, newsletter signup.
- `/shop` — full 40-product catalog with client-side category/brand/search
  filtering.
- `/product/[slug]` — one static page per product (`getStaticPaths`), with
  related products.
- `/cart` — client-side cart (localStorage), no real checkout.
- `/about`, `/contact` — static content pages, demo contact form.

Product data lives in `src/data/products.ts` — 40 sample products across
face care, body care, makeup, hair care, perfume, home fragrance,
activewear and gift sets. Cart logic (`src/scripts/cart.js`) is a plain
localStorage cart with no server dependency.

## Commands

| Command           | Action                                       |
| :----------------- | :-------------------------------------------- |
| `npm install`      | Install dependencies                          |
| `npm run dev`       | Start local dev server at `localhost:4321`    |
| `npm run build`     | Build the static site to `./dist/`            |
| `npm run preview`   | Preview the build locally                     |
