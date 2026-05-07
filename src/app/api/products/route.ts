import { NextRequest, NextResponse } from "next/server";
import { mapWooProduct } from "@/lib/products";

const STORE_PRODUCTS_ENDPOINT =
  "https://cms.confitechone.com/wp-json/wc/store/products";

const getAuthQuery = () => {
  const consumerKey = process.env.WC_CONSUMER_KEY;
  const consumerSecret = process.env.WC_CONSUMER_SECRET;
  if (!consumerKey || !consumerSecret) return "";
  return `&consumer_key=${encodeURIComponent(consumerKey)}&consumer_secret=${encodeURIComponent(consumerSecret)}`;
};

export async function GET(request: NextRequest) {
  try {
    const slug = request.nextUrl.searchParams.get("slug")?.trim();
    const slugFilter = slug ? `&slug=${encodeURIComponent(slug)}` : "";

    const response = await fetch(
      `${STORE_PRODUCTS_ENDPOINT}?per_page=50${slugFilter}${getAuthQuery()}`,
      {
        method: "GET",
        cache: "no-store",
      },
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch products" },
        { status: response.status },
      );
    }

    const rawProducts = (await response.json()) as Array<{
      id: number;
      slug: string;
      name?: string;
      short_description?: string;
      description?: string;
      images?: Array<{ src?: string }>;
      prices?: {
        currency_symbol?: string;
        price?: string;
        regular_price?: string;
      };
    }>;

    const payload = rawProducts.map(mapWooProduct);
    return NextResponse.json(payload);
  } catch {
    return NextResponse.json(
      { error: "Unexpected server error while fetching products" },
      { status: 500 },
    );
  }
}
