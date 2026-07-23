'use client';

import React, { useState, useRef, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';
import LumiAvatar from '@/components/ui/LumiAvatar';

interface Message {
  id: string;
  sender: 'user' | 'lumi';
  text: string;
  time: string;
}

const HUMAN_PROMPTS = [
  '💬 Hey Lumi, why should I build my PC at VoltEdge?',
  '🎮 I have ৳1 Lakh budget, what gaming PC can I get?',
  '💼 What parts do I need for Video Editing & 3D Work?',
  '💳 Can I pay using 0% EMI installments?',
  '👋 Hi Lumi, I know zero about PCs. Can you help me?',
];

export default function LumiChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-1',
      sender: 'lumi',
      text: "Hey friend! 👋 I'm **Lumi**, senior hardware specialist here at VoltEdge Dhaka!\n\nDon't worry at all if you've never built a PC before — you're in safe hands! At VoltEdge, we offer **Unbeatable BD Pricing**, **100% Official Warranty**, and **FREE Professional Assembly & Cable Routing**!\n\nWhat kind of PC or budget do you have in mind today?",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || loading) return;

    const userMsg: Message = {
      id: Math.random().toString(36).substring(2, 9),
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/lumi-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({
            role: m.sender === 'user' ? 'user' : 'assistant',
            content: m.text,
          })),
        }),
      });

      const data = await res.json();
      const replyText =
        data?.reply ||
        "Hey! I'm Lumi from VoltEdge. Start by clicking 'Choose' next to Processor (CPU) in the PC Builder section right on this page!";

      setMessages((prev) => [
        ...prev,
        {
          id: Math.random().toString(36).substring(2, 9),
          sender: 'lumi',
          text: replyText,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: Math.random().toString(36).substring(2, 9),
          sender: 'lumi',
          text: "Hey there! I'm Lumi from VoltEdge 😊 Building a PC on our site is super easy:\n1️⃣ Click **Choose** next to **Processor (CPU)** up above.\n2️⃣ Pick a matching **Motherboard**.\n3️⃣ Add **RAM**, **Storage**, and a **GPU**!\n\nNeed help with a specific budget in Taka (৳)?",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Trigger Button with Custom Animated Lumi Avatar Icon */}
      <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative group p-2 rounded-full bg-surface border-2 border-accent text-accent-foreground shadow-[0_0_35px_rgba(0,229,160,0.8)] hover:scale-110 transition-all duration-300 touch-manipulation animate-bounce"
          style={{ animationDuration: '3.5s' }}
          aria-label="Open Lumi Tech Specialist Chat"
          title="Chat with Lumi (Senior PC Specialist)"
        >
          <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-accent via-emerald-400 to-teal-500 opacity-60 blur-sm animate-pulse" />
          <LumiAvatar className="w-12 h-12 relative z-10" />
          <span className="w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-surface animate-ping absolute top-0 right-0 z-20 shadow-md" />
          <span className="w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-surface absolute top-0 right-0 z-20 shadow-md" />
        </button>
      </div>

      {/* Lumi Chat Modal Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] bg-background/60 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="w-full sm:max-w-lg h-[85vh] sm:h-[650px] bg-surface border border-accent/40 rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-slide-up sm:animate-fade-up">
            {/* Header with Avatar */}
            <div className="p-4 bg-gradient-to-r from-surface via-elevated to-surface border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <LumiAvatar className="w-11 h-11" />
                  <span className="w-3 h-3 rounded-full bg-emerald-400 border-2 border-surface absolute -bottom-0.5 -right-0.5 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-display font-bold text-base text-foreground">Lumi</h3>
                    <span className="px-2 py-0.2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold">
                      Online • Hardware Specialist
                    </span>
                  </div>
                  <p className="text-[11px] text-muted-foreground">
                    VoltEdge Dhaka Store Specialist
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-xl bg-elevated border border-border text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Close Lumi Chat"
              >
                <Icon name="XIcon" size={18} />
              </button>
            </div>

            {/* Messages Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-surface/50">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex gap-2.5 items-end ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {m.sender === 'lumi' && <LumiAvatar className="w-8 h-8 shrink-0 mb-1" />}
                  <div
                    className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed ${
                      m.sender === 'user'
                        ? 'bg-accent text-accent-foreground font-medium rounded-br-none shadow-md'
                        : 'bg-elevated border border-border text-foreground rounded-bl-none shadow-sm space-y-2'
                    }`}
                  >
                    <div className="whitespace-pre-wrap font-sans">{m.text}</div>
                    <span className="text-[9px] opacity-60 block text-right mt-1 font-mono">
                      {m.time}
                    </span>
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex items-end gap-2.5 justify-start">
                  <LumiAvatar className="w-8 h-8 shrink-0 mb-1" />
                  <div className="bg-elevated border border-border rounded-2xl rounded-bl-none p-3 flex items-center gap-2 text-xs text-accent">
                    <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
                    <span>Lumi is typing...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Human Prompt Suggestions Chips */}
            <div className="p-2 bg-elevated/40 border-t border-border flex gap-1.5 overflow-x-auto no-scrollbar">
              {HUMAN_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => handleSend(prompt)}
                  disabled={loading}
                  className="px-3 py-1.5 rounded-full bg-surface border border-border hover:border-accent/40 text-[11px] text-muted-foreground hover:text-foreground whitespace-nowrap transition-colors shrink-0 disabled:opacity-50"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <div className="p-3 bg-surface border-t border-border">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Message Lumi..."
                  className="flex-1 px-4 py-2.5 rounded-xl bg-elevated border border-border text-foreground placeholder:text-muted-foreground text-xs focus:outline-none focus:border-accent/60 transition-colors"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || loading}
                  className="p-2.5 rounded-xl bg-accent text-accent-foreground hover:glow-accent-sm transition-all disabled:opacity-40 shrink-0"
                  aria-label="Send Message"
                >
                  <Icon name="SendIcon" size={16} />
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
