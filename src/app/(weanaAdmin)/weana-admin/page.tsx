"use client";
import { useEffect } from "react";

export default function WeanaAdmin() {
    const login = (provider: "keycloak" | "google" = "keycloak") => {
        const baseUrl = process.env.NEXT_PUBLIC_KEYCLOAK_URL;
        const clientId = process.env.NEXT_PUBLIC_KEYCLOAK_ADMIN_BACKEND_CLIENT_ID;
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
    
        const state = btoa(JSON.stringify({ provider,flow:"admin-login" }));
        url.searchParams.set("state", state);
        window.location.href = url.toString();
      };
    useEffect(() => {
        login('keycloak');
    }, []);
    return;
  }