import type { Metadata } from "next";
import IndividualMemberProfilePage from "@/components/pages/individualAdmin/memberProfile";

export const metadata: Metadata = {
  title: "Individual Admin Member Profile",
};

export default function IndividualMemberProfile() {
  return <IndividualMemberProfilePage />;
}
