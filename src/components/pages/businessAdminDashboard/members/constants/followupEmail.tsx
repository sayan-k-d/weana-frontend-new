export interface FollowUpEmailFormData {
  enabled: boolean;
  delayHours: number;
  delayMinutes: number;
  toRecipients: string[]; // e.g. ["New Contact's Email", "abc@gmail.com"]
  ccRecipients: string[];
  subject: string;
  message: string;
  attachments: File[];
}

export const DEFAULT_FOLLOW_UP_EMAIL_FORM: FollowUpEmailFormData = {
  enabled: false,
  delayHours: 0,
  delayMinutes: 0,
  toRecipients: ["New Contact's Email", "abc@gmail.com"],
  ccRecipients: [],
  subject: "👋 {Contact's First Name} <> {Weana User's Name}",
  message: `Hi Diago and Contact's First Name,\n\nYou both just connected via Weana and this is an automatic email intro.\n\nReply to this email to continue the conversation.\n\nContact's First Name, here is Diago's digital business card.`,
  attachments: [],
};

export type VariableToken =
  | "{Contact's First Name}"
  | "{Contact's Last Name}"
  | "{Weana User's Name}"
  | "{Weana User's Email}"
  | "{Weana User's Company}";

export const VARIABLE_OPTIONS: VariableToken[] = [
  "{Contact's First Name}",
  "{Contact's Last Name}",
  "{Weana User's Name}",
  "{Weana User's Email}",
  "{Weana User's Company}",
];
