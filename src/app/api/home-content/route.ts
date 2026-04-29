import { NextResponse } from "next/server";

const CMS_HOME_ENDPOINT =
  "https://cms.confitechone.com/wp-json/wp/v2/pages?slug=home&_fields=acf";

type ACFPayload = Record<string, unknown>;

const asString = (value: unknown) =>
  typeof value === "string" ? value.trim() : "";

const pickFirst = (acf: ACFPayload, keys: string[]) => {
  for (const key of keys) {
    const value = asString(acf[key]);
    if (value) return value;
  }
  return "";
};

const pickButtonLink = (acf: ACFPayload) => {
  const directLink = pickFirst(acf, [
    "button_link",
    "hero_button_link",
    "link",
  ]);
  if (directLink) return directLink;

  const buttonObject = acf.button;
  if (buttonObject && typeof buttonObject === "object") {
    const objectLink = asString((buttonObject as Record<string, unknown>).link);
    if (objectLink) return objectLink;
  }

  return "";
};

export async function GET() {
  try {
    const token = process.env.CMS_API_TOKEN;
    const headers: HeadersInit = token
      ? { Authorization: `Bearer ${token}` }
      : {};

    const response = await fetch(CMS_HOME_ENDPOINT, {
      method: "GET",
      headers,
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch home content" },
        { status: response.status },
      );
    }

    const pages = (await response.json()) as Array<{ acf?: ACFPayload }>;
    const acf = pages?.[0]?.acf ?? {};

    const payload = {
      title: acf.hedding || "", // Note: matching your "hedding" typo
      subtitle: acf["sub-heading"] || "",
      buttonText: acf.button_name || "",
      buttonLink: acf.button_link || "",
    };
    // const payload = {
    //   title: pickFirst(acf, ['title', 'hero_title', 'heading']),
    //   subtitle: pickFirst(acf, ['subtitle', 'hero_subtitle', 'description']),
    //   buttonText: pickFirst(acf, ['button_text', 'hero_button_text', 'cta_text']),
    //   buttonLink: pickButtonLink(acf),
    // };

    return NextResponse.json(payload);
  } catch {
    return NextResponse.json(
      { error: "Unexpected server error while fetching home content" },
      { status: 500 },
    );
  }
}
