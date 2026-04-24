"use client";

import { useState } from "react";

interface UseWelcomeDialogReturn {
  isOpen: boolean;
  close: () => void;
}

export function useWelcomeDialog(initialOpen = true): UseWelcomeDialogReturn {
  const [isOpen, setIsOpen] = useState<boolean>(initialOpen);

  const close = () => setIsOpen(false);

  return { isOpen, close };
}
