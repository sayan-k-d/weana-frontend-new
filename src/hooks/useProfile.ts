import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function useProfile() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // const fetchProfile = async () => {
    //   try {
    //     const res = await fetch(
    //       `${process.env.NEXT_PUBLIC_API_URL}profile`,
    //       {
    //         credentials: "include",
    //       }
    //     );

    //     let data;
    //     try {
    //       data = await res.json();
    //     } catch {
    //       data = {};
    //     }

    //     if (!res.ok) {
    //       throw new Error(data.message || "Failed to fetch profile");
    //     }

    //     setProfile(data);
    //   } catch (err) {
    //     console.error("Failed to fetch profile:", err);
    //     router.push("/");
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    const fetchProfile = async () => {
        try {
          const token = localStorage.getItem("accessToken"); // adjust key name if different
      
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}profile`,
            {
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
                Authorization: token ? `Bearer ${token}` : "",
              },
            }
          );
      
          let data;
          try {
            data = await res.json();
          } catch {
            data = {};
          }
      
          if (!res.ok) {
            throw new Error(data.message || "Failed to fetch profile");
          }
      
          setProfile(data);
        } catch (err) {
          console.error("Failed to fetch profile:", err);
          router.push("/");
        } finally {
          setLoading(false);
        }
      };
    fetchProfile();
  }, [router]);

  return { profile, loading };
}