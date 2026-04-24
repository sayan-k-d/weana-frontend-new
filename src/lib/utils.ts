/**
 * Returns the standard white card Paper sx styles used across the dashboard.
 * Import WHITE_CARD_STYLES from constants for static usage,
 * or call this when you need a merged override.
 */
export function whiteCardStyles(overrides?: Record<string, unknown>) {
  return {
    border: "1px solid #E7E6EE",
    borderRadius: "16px",
    boxShadow: "0 1px 2px rgba(23, 19, 33, 0.04)",
    bgcolor: "#FFFFFF",
    ...overrides,
  };
}

/**
 * Derives initials from a full name string.
 * e.g. "William Anderson" → "WA"
 */
export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}