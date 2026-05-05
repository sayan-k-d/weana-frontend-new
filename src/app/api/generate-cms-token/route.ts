import { NextResponse } from "next/server";

const CMS_TOKEN_ENDPOINT =
  "https://cms.confitechone.com/wp-json/jwt-auth/v1/token";

export async function POST() {
  try {
    const response = await fetch(CMS_TOKEN_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: process.env.CMS_USERNAME,
        password: process.env.CMS_PASSWORD,
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to generate token" },
        { status: response.status },
      );
    }

    const { token } = (await response.json()) as { token: string };
    return NextResponse.json({ token });
  } catch {
    return NextResponse.json(
      { error: "Unexpected error while generating token" },
      { status: 500 },
    );
  }
}
