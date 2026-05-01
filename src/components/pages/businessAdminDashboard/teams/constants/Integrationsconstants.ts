// ── Types ─────────────────────────────────────────────────────────────────────

export type IntegrationTab = "contact-sync" | "calendar-booking" | "email";

export interface Integration {
  id: string;
  name: string;
  iconUrl?: string; // real icon if available
  locked?: boolean; // requires upgrade
  isRequestCard?: boolean; // "Don't see your integration?" card
}

export interface IntegrationSection {
  tab: IntegrationTab;
  title: string;
  description: string;
  items: Integration[];
}

// ── Constants ─────────────────────────────────────────────────────────────────

export const INTEGRATION_TABS: { id: IntegrationTab; label: string }[] = [
  { id: "contact-sync", label: "Contact Sync" },
  { id: "calendar-booking", label: "Calendar Booking" },
  { id: "email", label: "Email" },
];

export const INTEGRATION_SECTIONS: IntegrationSection[] = [
  {
    tab: "contact-sync",
    title: "Contact Sync",
    description:
      "Sync Weana Contact to your CRM, Marketing Engagement tool and more",
    items: [
      { id: "salesforce", name: "Salesforce" },
      { id: "hubspot", name: "HubSpot" },
      { id: "zoho", name: "Zoho" },
      { id: "microsoft-dynamics", name: "Microsoft Dynamics" },
      { id: "zapier", name: "Zapier" },
      {
        id: "request",
        name: "Don't see your integration?",
        isRequestCard: true,
      },
    ],
  },
  {
    tab: "calendar-booking",
    title: "Calendar Booking",
    description:
      "Add your calendar booking links so you can schedule meetings with contact right after you connect with them",
    items: [
      { id: "calendly", name: "Calendly", locked: true },
      { id: "cal-sf-1", name: "Salesforce", locked: true },
      { id: "cal-sf-2", name: "Salesforce", locked: true },
      { id: "cal-sf-3", name: "Salesforce", locked: true },
      { id: "cal-sf-4", name: "Salesforce", locked: true },
      { id: "cal-sf-5", name: "Salesforce", locked: true },
    ],
  },
  {
    tab: "email",
    title: "Email",
    description:
      "Export Weana contacts and email signatures to your email client",
    items: [
      { id: "outlook-sig", name: "Outlook Email Sig..." },
      { id: "outlook-individual", name: "Outlook (Individ..." },
      { id: "outlook-full", name: "Outlook (Full Te..." },
    ],
  },
];
