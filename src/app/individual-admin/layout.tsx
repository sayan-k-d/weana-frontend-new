"use client";
import { Box } from "@mui/material";
import IndividualSidebar from "@/components/layout/individualAdmin/sidebar";
import { useRouter } from "next/navigation";
import { useProfile } from "@/hooks/useProfile";
import { useEffect, useState } from "react";

export default function IndividualAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { profile, loading } = useProfile();
  const [profileData, setProfileData] = useState<any>(null);
  useEffect(() => {
    if (profile) {
      console.log("User:", profile);
      setProfileData(profile);
    }
  }, [profile]);
  return (
    <Box sx={{ display: "flex", minHeight: "100vh", overflow: "hidden" }}>
      <IndividualSidebar profileData={profileData}/>
      <Box sx={{ flex: 1, overflowY: "auto" }}>{children}</Box>
    </Box>
  );
}
