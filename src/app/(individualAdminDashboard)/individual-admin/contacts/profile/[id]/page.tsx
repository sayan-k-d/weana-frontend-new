import type { Metadata } from "next";
import IndividualAdminContactProfilePage from "@/components/pages/individualAdmin/contacts/profile/index";

type PageProps = {
  params: Promise<{ id: string }>;
};

export const metadata: Metadata = {
  title: "Individual Admin Contact Profile",
};

export default async function IndividualAdminContactProfile({
  params,
}: PageProps) {
  const { id } = await params;
  const numericId = Number(id);

  return (
    <IndividualAdminContactProfilePage
      contactId={Number.isNaN(numericId) ? 1 : numericId}
    />
  );
}
