"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { log } from "console";

// function CallbackPageContent() {
//   const router = useRouter();
//   const params = useSearchParams();
//   const [status, setStatus] = useState("Processing login...");

//   useEffect(() => {
//     const code = params.get("code");
//     const state = params.get("state");
//     const signup_session_id =
//       localStorage.getItem("signup_session_id") || undefined;

//     if (!code) {
//       setStatus("Missing authorization code");
//       return;
//     }
//     let decodedState;
//     try {
//       decodedState = JSON.parse(atob(state || ""));
//     } catch (err) {
//       console.log("Failed to decode state:", err);
//       setStatus("Invalid state");
//       return;
//     }

//     const exchangeToken = async (decodedState: any) => {
//       try {
//         setStatus("Signing you in...");
//         let endpoint = "";

//         if (decodedState?.flow === "signup") {
//           endpoint = `${process.env.NEXT_PUBLIC_API_URL}auth/google-auth`;
//         } else {
//           endpoint = `${process.env.NEXT_PUBLIC_API_URL}auth/exchange`;
//         }
//         const res = await fetch(endpoint, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ code, signup_session_id }),
//         });

//         const data = await res.json();

//         if (!res.ok) {
//           throw new Error(data.message || "Login failed");
//         }

//         // store token
//         localStorage.setItem("access_token", data.access_token || data.token);

//         setStatus("Success! Redirecting...");
//         router.push("/business-admin-dashboard");
//       } catch (err: any) {
//         console.error(err);
//         setStatus(err.message || "Login failed");
//       }
//     };

//     exchangeToken(decodedState);
//   }, [params]);
//   return <p>{status}</p>;
// }
function CallbackPageContent() {
  const router = useRouter();
  const params = useSearchParams();
  const [status, setStatus] = useState("Processing login...");

  useEffect(() => {
    const code = params.get("code");
    const state = params.get("state");
    const signup_session_id =
      localStorage.getItem("signup_session_id") || undefined;

    if (!code) {
      setStatus("Missing authorization code");
      return;
    }

    let decodedState;
    try {
      decodedState = JSON.parse(atob(state || ""));
    } catch (err) {
      console.log("Failed to decode state:", err);
      setStatus("Invalid state");
      return;
    }

    const exchangeToken = async (decodedState: any) => {
      try {
        setStatus("Signing you in...");

        let endpoint = "";
        if (decodedState?.flow === "signup") {
          endpoint = `${process.env.NEXT_PUBLIC_API_URL}auth/google-auth`;
        } 
        else if(decodedState?.flow === "admin-login"){
          endpoint = `${process.env.NEXT_PUBLIC_API_URL}auth/exchange-admin`;
        }
        else {
          endpoint = `${process.env.NEXT_PUBLIC_API_URL}auth/exchange`;
        }

        const res = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ code, signup_session_id }),
        });
        const data = await res.json();
        localStorage.setItem("access_token", data.access_token || data.token);
        localStorage.setItem("refresh_token", data.refresh_token || "");
        if (!res.ok) {
          throw new Error(data.message || "Login failed");
        }
        setStatus("Success! Redirecting...");
        if(decodedState?.flow === "admin-login"){
          router.push("/weana-admin-dashboard");
          return;
        }
        router.push("/individual-admin/dashboard");

      } catch (err: any) {
        console.error(err);
        setStatus(err.message || "Login failed");
      }
    };

    exchangeToken(decodedState);
  }, [params, router]);

  return <p>{status}</p>;
}
export default function CallbackPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CallbackPageContent />
    </Suspense>
  );
}
