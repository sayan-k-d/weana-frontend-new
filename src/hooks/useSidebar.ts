"use client";

import { useState } from "react";

interface UseSidebarReturn {
  isSidebarCollapsed: boolean;
  openSection: string | null;
  toggleSidebar: () => void;
  handleToggleSection: (title: string) => void;
}

export function useSidebar(): UseSidebarReturn {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSidebar = () => setIsSidebarCollapsed((prev) => !prev);

  const handleToggleSection = (title: string) => {
    setOpenSection((prev) => (prev === title ? null : title));
  };

  return {
    isSidebarCollapsed,
    openSection,
    toggleSidebar,
    handleToggleSection,
  };
}
