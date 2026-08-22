// Brand slug -> logo file + display name, used by the brand strip and the
// shop's brand filter. Slug matches the logo filename under
// /public/images/brands/<slug>.webp. Only brands that appear in our 40
// sample products AND have a logo asset are listed here.

export interface BrandEntry {
	slug: string;
	name: string;
}

export const BRANDS: BrandEntry[] = [
	{ slug: 'tenzero', name: 'Tenzero' },
	{ slug: 'dr-pepti', name: 'Dr.Pepti' },
	{ slug: 'ninetails', name: 'Nine Tails' },
	{ slug: 'id-pla-cosmetics', name: 'ID Placosmetic' },
	{ slug: 'pepplus', name: 'Pepplus' },
	{ slug: 'fontana-contarini', name: 'Fontana Contarini' },
	{ slug: 'cu-skin', name: 'Cu Skin' },
	{ slug: 'keenwell', name: 'Keenwell' },
	{ slug: 'hadat', name: 'Hadat' },
	{ slug: 'cloud-nine', name: 'Cloud Nine' },
	{ slug: 'nook', name: 'Nook' },
	{ slug: 'lowengrip', name: 'Löwengrip' },
	{ slug: 'evagarden', name: 'Eva Garden' },
	{ slug: 'emmanuelle-jane-paris', name: 'Emmanuelle Jane Paris' },
	{ slug: 'jardins-decrivains', name: "Jardins d'Ecrivains" },
	{ slug: 'parco-1923', name: 'Parco 1923' },
	{ slug: 'erbae', name: 'Erbæ' },
	{ slug: 'endocare', name: 'Endocare' },
	{ slug: 'delilah', name: 'Delilah' },
];

export function brandNameToSlug(brand: string): string | null {
	const found = BRANDS.find((b) => b.name.toLowerCase() === brand.toLowerCase());
	return found ? found.slug : null;
}
