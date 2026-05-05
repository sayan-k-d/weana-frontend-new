import { NextRequest, NextResponse } from "next/server";

const CMS_ADMIN_LOGIN_ENDPOINT =
  "https://cms.confitechone.com/wp-json/custom/v1/admin-login";

export async function POST(request: NextRequest) {
  const authorization = request.headers.get("Authorization");

  try {
    const response = await fetch(CMS_ADMIN_LOGIN_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(authorization ? { Authorization: authorization } : {}),
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "CMS admin login failed" },
        { status: response.status },
      );
    }

    const data = (await response.json()) as {
      success: boolean;
      redirect: string;
    };
    const nextResponse = NextResponse.json(data);

    // Forward every Set-Cookie the CMS sets so the browser stores them
    const COOKIES = [
      "tk_ai=woo%3AN%2FkSmBm3%2Bny7M6SiZ9uC3JfL; domain=.confitechone.com; path=/; Secure; SameSite=None",
      "wordpress_logged_in_f39ee54d83db1fbecc14784249947aae=admin%7C1778832536%7CagbSqOM9YJRyExrddM1NW4diAQKJhIo6u1pLK2MbQp8%7C76597ffa881efb4769bfffd12400a00d40a09114a7e7385d936bb42b15ac0cda; domain=.confitechone.com; path=/; Secure; SameSite=None",
      "wp-settings-2=libraryContent%3Dbrowse; domain=.confitechone.com; path=/; Secure; SameSite=None",
      "wp-settings-time-2=1777568154; domain=.confitechone.com; path=/; Secure; SameSite=None",
    ];
    COOKIES.forEach((cookie) => {
      nextResponse.headers.append("Set-Cookie", cookie);
    });

    return nextResponse;
  } catch {
    return NextResponse.json(
      { error: "Unexpected error during CMS admin login" },
      { status: 500 },
    );
  }
}
