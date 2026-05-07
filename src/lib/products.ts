export type ProductItem = {
  id: number;
  slug: string;
  name: string;
  image: string;
  price: string;
  oldPrice: string;
  blurb: string;
};

type WooStoreImage = {
  src?: string;
};

type WooStorePrices = {
  currency_symbol?: string;
  price?: string;
  regular_price?: string;
};

type WooStoreProduct = {
  id: number;
  slug: string;
  name?: string;
  short_description?: string;
  description?: string;
  images?: WooStoreImage[];
  prices?: WooStorePrices;
};

const stripHtml = (value: string | undefined) =>
  (value ?? "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

const formatPrice = (currencySymbol: string, rawValue: string | undefined) => {
  if (!rawValue) return "";
  const amount = Number(rawValue) / 100;
  if (Number.isNaN(amount)) return "";
  return `${currencySymbol}${amount.toFixed(2)}`;
};

export const mapWooProduct = (item: WooStoreProduct): ProductItem => {
  const currencySymbol = item.prices?.currency_symbol ?? "$";
  const shortDescription = stripHtml(item.short_description);
  const longDescription = stripHtml(item.description);

  return {
    id: item.id,
    slug: item.slug,
    name: item.name?.trim() || "Untitled Product",
    image: item.images?.[0]?.src || "/images/original_card.png",
    price: formatPrice(currencySymbol, item.prices?.price) || `${currencySymbol}0.00`,
    oldPrice: formatPrice(currencySymbol, item.prices?.regular_price),
    blurb: shortDescription || longDescription || "Smart card ready for modern networking.",
  };
};
