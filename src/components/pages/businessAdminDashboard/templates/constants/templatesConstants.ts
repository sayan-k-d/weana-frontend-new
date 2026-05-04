// ─── Types ────────────────────────────────────────────────────────────────────

export interface Template {
  id: number;
  name: string;
  avatarUrl?: string | null;
  memberCount: number; // 0 = no members assigned yet
}

// ─── Mock data ────────────────────────────────────────────────────────────────

export const INITIAL_TEMPLATES: Template[] = [
  {
    id: 1,
    name: "Diego",
    avatarUrl: "/images/mem1.jpg",
    memberCount: 0,
  },
  {
    id: 2,
    name: "Oleg",
    avatarUrl: "/images/mem2.jpg",
    memberCount: 1,
  },
  {
    id: 3,
    name: "Aiony",
    avatarUrl: "/images/mem3.jpg",
    memberCount: 1,
  },
  {
    id: 4,
    name: "Vicky",
    avatarUrl: "/images/mem4.jpg",
    memberCount: 0,
  },
];
