import type { Metadata } from "next";
import IndividualAdminContactsPage from "@/components/pages/individualAdmin/contacts";

export const metadata: Metadata = {
  title: "Individual Admin Contacts",
};

export default function IndividualAdminContacts() {
  return <IndividualAdminContactsPage />;
}
