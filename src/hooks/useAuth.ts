export const useAuth = () => {
    const login = (provider: "keycloak" | "google" = "keycloak") => {
      const baseUrl = process.env.NEXT_PUBLIC_KEYCLOAK_URL;
      const clientId = process.env.NEXT_PUBLIC_KEYCLOAK_BACKEND_CLIENT_ID;
      const redirectUri = process.env.NEXT_PUBLIC_KEYCLOAK_REDIRECT_URI;
  
      if (!baseUrl || !clientId || !redirectUri) {
        throw new Error("Missing required environment variables");
      }
  
      const url = new URL(`${baseUrl}/realms/weana/protocol/openid-connect/auth`);
  
      url.searchParams.set("client_id", clientId);
      url.searchParams.set("redirect_uri", redirectUri);
      url.searchParams.set("response_type", "code");
      url.searchParams.set("scope", "openid");
      url.searchParams.set("prompt", "login");
  
      const state = btoa(JSON.stringify({ provider }));
      url.searchParams.set("state", state);
      console.log("state", state);
      console.log(JSON.parse(atob(state)));
    //   if (provider === "google") {
    //     url.searchParams.set("kc_idp_hint", "google");
    //   }
  
      window.location.href = url.toString();
    };
  
    return { login };
  };