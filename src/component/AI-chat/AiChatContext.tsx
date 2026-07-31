"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type AiChatTarget = {
  noteId: string;
  noteTitle: string;
} | null;

type AiChatContextValue = {
  isOpen: boolean;
  target: AiChatTarget;
  openChat: (target?: { noteId: string; noteTitle: string }) => void;
  closeChat: () => void;
};

const AiChatContext = createContext<AiChatContextValue | null>(null);

export function AiChatProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [target, setTarget] = useState<AiChatTarget>(null);

  const openChat = (t?: { noteId: string; noteTitle: string }) => {
    setTarget(t ?? null);
    setIsOpen(true);
  };

  const closeChat = () => setIsOpen(false);

  return (
    <AiChatContext.Provider value={{ isOpen, target, openChat, closeChat }}>
      {children}
    </AiChatContext.Provider>
  );
}

export function useAiChat() {
  const ctx = useContext(AiChatContext);
  if (!ctx) throw new Error("useAiChat must be used inside <AiChatProvider>");
  return ctx;
}