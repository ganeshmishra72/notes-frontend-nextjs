"use client";

import { useEffect, useRef, useState } from "react";
import { X, Send, Sparkles, FileText, Loader2 } from "lucide-react";
import { useAiChat } from "./AiChatContext";

type Message = {
  role: "user" | "assistant";
  text: string;
};

// Matches your ChatResponse DTO: { answer, sessionId }
type ChatApiResponse = {
  answer: string;
  sessionId: string;
};

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

function sessionKey(noteId: string | undefined) {
  return `ai-chat-session:${noteId ?? "general"}`;
}

export default function AiChatDrawer() {
  const { isOpen, target, closeChat } = useAiChat();
  const [messages, setMessages] = useState<Message[]>([]);
  const [question, setQuestion] = useState("");
  const [sending, setSending] = useState(false);
  const [sessionId, setSessionId] = useState<string | undefined>(undefined);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Reset / restore the thread whenever the target note changes
  useEffect(() => {
    if (!isOpen) return;
    const stored = target?.noteId
      ? localStorage.getItem(sessionKey(target.noteId))
      : null;
    setSessionId(stored ?? undefined);
    setMessages([]);
  }, [isOpen, target?.noteId]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, sending]);

  const handleSend = async () => {
    const q = question.trim();
    if (!q || sending) return;

    if (!target?.noteId) {
      // No note in scope — nudge the user instead of silently failing the RAG call.
      setMessages((m) => [
        ...m,
        { role: "user", text: q },
        {
          role: "assistant",
          text: "Pick a note first — open any note's \"Ask AI\" button so I can search inside it. I can't answer without a document to ground my answer in.",
        },
      ]);
      setQuestion("");
      return;
    }

    setMessages((m) => [...m, { role: "user", text: q }]);
    setQuestion("");
    setSending(true);

    try {
      const res = await fetch(`${API_BASE}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          noteId: target.noteId,
          question: q,
        }),
      });

      if (!res.ok) throw new Error(`Request failed: ${res.status}`);

      const data: ChatApiResponse = await res.json();

      setSessionId(data.sessionId);
      localStorage.setItem(sessionKey(target.noteId), data.sessionId);
      setMessages((m) => [...m, { role: "assistant", text: data.answer }]);
    } catch (err) {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          text: "Something went wrong reaching the assistant. Try again in a moment.",
        },
      ]);
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={closeChat}
        className={`fixed inset-0 bg-slate-900/30 backdrop-blur-[2px] z-40 transition-opacity ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 px-6 py-5">
          <div className="flex items-start gap-3 min-w-0">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-sky-500 text-white">
              <Sparkles size={18} />
            </div>
            <div className="min-w-0">
              <h3 className="font-semibold text-slate-800">Ask AI</h3>
              {target?.noteTitle ? (
                <p className="mt-0.5 flex items-center gap-1 text-xs text-slate-500 truncate">
                  <FileText size={12} className="shrink-0" />
                  <span className="truncate">{target.noteTitle}</span>
                </p>
              ) : (
                <p className="mt-0.5 text-xs text-slate-400">No note selected</p>
              )}
            </div>
          </div>
          <button
            onClick={closeChat}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition"
            aria-label="Close chat"
          >
            <X size={18} />
          </button>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
          {messages.length === 0 && (
            <div className="text-center text-sm text-slate-400 mt-10">
              {target?.noteId
                ? `Ask anything about "${target.noteTitle}" — summaries, explanations, MCQs.`
                : "Open a note and hit \"Ask AI\" to start a grounded conversation about it."}
            </div>
          )}

          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-6 ${
                  m.role === "user"
                    ? "bg-gradient-to-r from-blue-600 to-sky-500 text-white rounded-br-sm"
                    : "bg-slate-100 text-slate-700 rounded-bl-sm"
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}

          {sending && (
            <div className="flex justify-start">
              <div className="flex items-center gap-2 rounded-2xl rounded-bl-sm bg-slate-100 px-4 py-2.5 text-sm text-slate-500">
                <Loader2 size={14} className="animate-spin" />
                Reading the note…
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="border-t border-slate-100 p-4">
          <div className="flex items-end gap-2 rounded-2xl border border-slate-200 focus-within:ring-2 focus-within:ring-blue-500 px-3 py-2">
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              rows={1}
              placeholder="Ask about this note…"
              className="flex-1 resize-none outline-none text-sm py-1 max-h-28"
            />
            <button
              onClick={handleSend}
              disabled={sending || !question.trim()}
              className="shrink-0 rounded-xl bg-gradient-to-r from-blue-600 to-sky-500 p-2.5 text-white disabled:opacity-40 transition"
              aria-label="Send"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}