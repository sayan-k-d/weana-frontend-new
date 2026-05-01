import type { Metadata } from "next";
import IndividualAdminImportContactsPage from "@/components/pages/individualAdmin/contacts/import";

export const metadata: Metadata = {
  title: "Individual Admin Import Contacts",
};

export default function IndividualAdminImportContacts() {
  return <IndividualAdminImportContactsPage />;
}
