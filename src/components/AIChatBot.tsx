'use client';

import React, { useState, useRef, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

type Language = 'EN' | 'BN';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  quickLinks?: { label: string; href: string }[];
}

const GREETINGS: Record<Language, Message> = {
  EN: {
    id: 'init-en',
    sender: 'bot',
    text: "👋 Hi there! I'm VoltAI, your 24/7 Tech Assistant. How can I help you today?",
    timestamp: 'Just now',
    quickLinks: [
      { label: '🖥️ Custom PC Builder', href: '/pc-builder' },
      { label: '💳 0% EMI Calculator', href: '/emi-calculator' },
      { label: '📍 Store Locations', href: '/emi-calculator' },
    ],
  },
  BN: {
    id: 'init-bn',
    sender: 'bot',
    text: "👋 হ্যালো! আমি VoltAI, আপনার ২৪/৭ টেক অ্যাসিস্ট্যান্ট। আজ আপনাকে কীভাবে সাহায্য করতে পারি?",
    timestamp: 'এখনই',
    quickLinks: [
      { label: '🖥️ পিসি বিল্ডার', href: '/pc-builder' },
      { label: '💳 ০% ইএমআই ক্যালকুলেটর', href: '/emi-calculator' },
      { label: '📍 শোরুম লোকেশন', href: '/emi-calculator' },
    ],
  },
};

const SUGGESTIONS: Record<Language, string[]> = {
  EN: [
    'Recommend a gaming laptop under ৳150,000',
    'How does 0% EMI work?',
    'What are your store locations in Dhaka?',
    'Check AM5 & RTX 4070 compatibility',
  ],
  BN: [
    '১৫০,০০০ টাকার মধ্যে সেরা গেমিং ল্যাপটপ',
    '০% ইএমআই সুবিধা কীভাবে পাব?',
    'ঢাকার শোরুমের ঠিকানা কোথায়?',
    'AM5 প্রসেসর ও RTX 4070 কম্প্যাটিবিলিটি চেক',
  ],
};

export default function AIChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [lang, setLang] = useState<Language>('EN');
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([GREETINGS['EN']]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isTyping]);

  const toggleLanguage = () => {
    const nextLang = lang === 'EN' ? 'BN' : 'EN';
    setLang(nextLang);
    setMessages([GREETINGS[nextLang]]);
  };

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let replyText = lang === 'BN' 
        ? "আপনার প্রশ্নের উত্তর দেওয়ার জন্য ধন্যবাদ! যেকোনো তথ্যের জন্য আমাদের হটলাইন ১৬৭৯৩ এ কল করতে পারেন।"
        : "I'm happy to assist you with that! For specific stock or order queries, you can also reach our hotline at 16793.";
      let quickLinks: { label: string; href: string }[] | undefined = undefined;

      const lower = query.toLowerCase();

      if (lower.includes('laptop') || lower.includes('150') || lower.includes('ল্যাপটপ')) {
        replyText = lang === 'BN'
          ? "৳১৫০,০০০ টাকার বাজেট থাকলে **ASUS ROG Strix G16** অথবা **Lenovo Legion Slim 5** সেরা পছন্দ হবে! উভয়টিতেই Intel i7/Ryzen 7 এবং RTX 4060 জিপিইউ রয়েছে সাথে ৩ বছরের অফিসিয়াল ওয়ারেন্টি।"
          : "For under ৳150,000, we highly recommend the **ASUS ROG Strix G16** or **Lenovo Legion Slim 5**. Both feature Intel i7/Ryzen 7 processors and RTX 4060 GPUs with official warranty!";
        quickLinks = [{ label: lang === 'BN' ? 'ল্যাপটপ ব্রাউজ করুন' : 'Browse Laptops', href: '/category' }];
      } else if (lower.includes('emi') || lower.includes('bank') || lower.includes('ইএমআই') || lower.includes('ব্যাংক')) {
        replyText = lang === 'BN'
          ? "VoltEdge এ আপনি ব্র্যাক ব্যাংক, সিটি ব্যাংক অ্যামেক্স, ইবিএল, ডিবিবিএল সহ ৩০+ ব্যাংকের ক্রেডিট কার্ডে ০% সুদে ৩৬ মাস পর্যন্ত ইএমআই সুবিধা পাবেন (সর্বনিম্ন ৳১০,০০০ অর্ডারে)।"
          : "We offer 0% EMI on credit cards across 30+ banks in Bangladesh (BRAC, City Bank AMEX, EBL, DBBL, etc.) for up to 36 months on orders over ৳10,000!";
        quickLinks = [{ label: lang === 'BN' ? 'ইএমআই ক্যালকুলেটর দেখুন' : 'Open EMI Calculator', href: '/emi-calculator' }];
      } else if (lower.includes('location') || lower.includes('store') || lower.includes('dhaka') || lower.includes('ঠিকানা') || lower.includes('শোরুম')) {
        replyText = lang === 'BN'
          ? "ঢাকায় আমাদের শোরুম রয়েছে আইডিবি ভবন, মাল্টিপ্ল্যান সেন্টার (এলিমেন্ট রোড) এবং উত্তরা সেক্টর ৩ এ। এছাড়া চট্টগ্রামে আগ্রাবাদে শোরুম রয়েছে।"
          : "VoltEdge has physical stores across Bangladesh including **IDB Bhaban**, **Multiplan Center (Elephant Rd)**, **Uttara Sector 3**, and **Agrabad Chittagong**.";
      } else if (lower.includes('pc') || lower.includes('compat') || lower.includes('am5') || lower.includes('পিসি') || lower.includes('বিল্ড')) {
        replyText = lang === 'BN'
          ? "আপনি আমাদের অনলাইন **পিসি বিল্ডার** দিয়ে সহজেই পাওয়ার ওয়্যাটেজ এবং প্রসেসর-মাদারবোর্ড কম্প্যাটিবিলিটি চেক করতে পারেন।"
          : "You can use our interactive **PC Builder** tool! It automatically checks socket compatibility, calculates PSU wattage, and generates printable quotes.";
        quickLinks = [{ label: lang === 'BN' ? 'পিসি বিল্ডারে যান' : 'Open PC Builder', href: '/pc-builder' }];
      }

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        quickLinks,
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 900);
  };

  return (
    <>
      {/* Floating Trigger Button with Gradient & Aura */}
      <div className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative p-3.5 sm:p-4 rounded-full bg-gradient-to-r from-accent to-emerald-400 text-accent-foreground shadow-[0_0_30px_rgba(0,229,160,0.5)] hover:scale-110 transition-all flex items-center justify-center group touch-manipulation border border-accent/40"
          aria-label="VoltAI Assistant"
        >
          {isOpen ? (
            <Icon name="XIcon" size={24} />
          ) : (
            <div className="relative flex items-center justify-center">
              {/* Custom Robot Icon Visual */}
              <div className="w-6 h-6 flex items-center justify-center relative">
                <Icon name="BotIcon" size={24} className="text-slate-950 font-bold" />
              </div>
              <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-background animate-ping" />
              <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-background" />
            </div>
          )}
        </button>
      </div>

      {/* Chat Window Drawer */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:bottom-20 sm:right-6 z-50 w-[calc(100vw-32px)] sm:w-[390px] h-[540px] bg-surface/98 backdrop-blur-2xl border border-border rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-slide-up">
          {/* Header with Language Switcher */}
          <div className="p-4 bg-elevated/90 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-accent/20 to-emerald-500/20 border border-accent/40 flex items-center justify-center text-accent shadow-inner">
                <Icon name="SparklesIcon" size={20} className="text-accent animate-pulse" />
              </div>
              <div>
                <h3 className="font-display font-bold text-sm text-foreground flex items-center gap-1.5">
                  VoltAI Assistant
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-400 font-medium">24/7 Live</span>
                </h3>
                <p className="text-[11px] text-muted-foreground">
                  {lang === 'BN' ? 'আপনার ২৪/৭ টেক সহকারী' : 'Instant AI Support'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Language Switcher Pill */}
              <button
                onClick={toggleLanguage}
                className="px-2.5 py-1 rounded-full bg-surface border border-accent/30 text-[11px] font-bold text-accent hover:bg-accent/10 transition-colors flex items-center gap-1"
                title="Switch Language / ভাষা পরিবর্তন"
              >
                <span>{lang === 'EN' ? '🇬🇧 EN' : '🇧🇩 বাংলা'}</span>
              </button>

              <button onClick={() => setIsOpen(false)} className="p-1.5 rounded-lg hover:bg-surface text-muted-foreground">
                <Icon name="XIcon" size={18} />
              </button>
            </div>
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3.5 rounded-2xl ${
                    msg.sender === 'user'
                      ? 'bg-accent text-accent-foreground rounded-tr-none font-medium shadow-md'
                      : 'bg-elevated border border-border text-foreground rounded-tl-none shadow-sm'
                  }`}
                >
                  <p className="leading-relaxed whitespace-pre-line">{msg.text}</p>

                  {msg.quickLinks && (
                    <div className="mt-2.5 pt-2 border-t border-border/50 flex flex-wrap gap-1.5">
                      {msg.quickLinks.map((link) => (
                        <a
                          key={link.label}
                          href={link.href}
                          onClick={() => setIsOpen(false)}
                          className="px-2.5 py-1 rounded-lg bg-surface border border-accent/30 text-accent font-semibold hover:bg-accent/10 transition-colors"
                        >
                          {link.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
                <span className="text-[10px] text-muted-foreground mt-1 px-1">{msg.timestamp}</span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1.5 p-3 rounded-2xl bg-elevated border border-border text-muted-foreground w-fit rounded-tl-none">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce delay-150" />
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce delay-300" />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions Chips */}
          <div className="px-3 py-2 bg-elevated/40 border-t border-border overflow-x-auto no-scrollbar flex gap-1.5">
            {SUGGESTIONS[lang].map((sug) => (
              <button
                key={sug}
                onClick={() => handleSend(sug)}
                className="px-2.5 py-1 rounded-full bg-surface border border-border text-[10px] text-muted-foreground hover:text-foreground hover:border-accent/40 whitespace-nowrap shrink-0 transition-colors"
              >
                {sug}
              </button>
            ))}
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-elevated border-t border-border flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={lang === 'BN' ? 'আপনার প্রশ্ন লিখুন...' : 'Ask VoltAI anything...'}
              className="flex-1 bg-surface border border-border rounded-xl px-3.5 py-2 text-xs text-foreground placeholder:text-muted-foreground outline-none focus:border-accent/60 transition-colors"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="p-2.5 rounded-xl bg-accent text-accent-foreground hover:glow-accent-sm transition-all disabled:opacity-40"
            >
              <Icon name="SendIcon" size={16} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
