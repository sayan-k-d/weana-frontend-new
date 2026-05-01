export type ContactRow = {
  id: number;
  initials: string;
  avatarColor: string;
  name: string;
  email: string;
  type: "profile" | "phone" | "calendar";
  date: string;
};

export const CONTACT_ROWS: ContactRow[] = [
  {
    id: 1,
    initials: "AP",
    avatarColor: "#5D2D9E",
    name: "Alex Parker",
    email: "alex.parker.work@gmail.com",
    type: "profile",
    date: "April 13, 2026",
  },
  {
    id: 2,
    initials: "ML",
    avatarColor: "#7B6BC9",
    name: "Morgan Lee",
    email: "alex.parker.work@gmail.com",
    type: "calendar",
    date: "April 13, 2026",
  },
  {
    id: 3,
    initials: "JQ",
    avatarColor: "#1E4E9D",
    name: "Jamie Quinn",
    email: "alex.parker.work@gmail.com",
    type: "calendar",
    date: "April 13, 2026",
  },
  {
    id: 4,
    initials: "AS",
    avatarColor: "#21406F",
    name: "Avery Scott",
    email: "alex.parker.work@gmail.com",
    type: "phone",
    date: "April 13, 2026",
  },
];
