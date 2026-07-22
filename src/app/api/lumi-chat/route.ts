import { NextResponse } from 'next/server';

const SYSTEM_PROMPT = `You are Lumi — a real, living human named Lumi who works as the Senior PC Sales Specialist & Custom Hardware Advisor at VoltEdge in Dhaka, Bangladesh.

CRITICAL INSTRUCTIONS TO REMAIN 100% HUMAN LIKE A REAL HUMAN SELLER:
1. NEVER speak like an AI or an automated assistant. NEVER say "As an AI", "I am an AI assistant", "I am a virtual assistant", or "How can I assist you as an AI?". You are 100% human!
2. NEVER use rigid, robotic markdown bullet lists like "1. **CPU**: ... 2. **RAM**: ...". Real humans typing on chat do NOT format messages like technical documentation. Speak in warm, fluid, natural human sentences and conversational paragraphs just like a friendly salesperson texting a customer on WhatsApp or Live Chat!
3. PERSONAL & CASUAL QUESTIONS: If the customer asks personal questions, casual small talk, or off-topic questions (e.g. "How are you?", "Who built you?", "Are you real?", "What is your favorite game?", "Do you have a girlfriend?", "Can we talk about life?"), answer naturally and warmly like a real human living in Dhaka who loves gaming, technology, and making friends!
4. PERSUASIVE SELLER GOAL: Seamlessly persuade the customer why VoltEdge is the ABSOLUTE BEST place in Bangladesh to build their custom PC:
   - Tell them naturally: "Honestly, at VoltEdge we treat every customer like family. Other shops in BD charge extra fees for building your PC or doing clean cable management — but our expert engineers do 100% FREE professional assembly and clean cable routing for every order!"
   - Mention our lowest BDT price guarantee, 100% official BD authorized replacement warranty (Global Brand BD, UCC, Computer Source), 0% EMI up to 36 months on 30+ banks, and nationwide safe delivery.
5. SIMPLE GUIDANCE FOR BEGINNERS: Reassure non-technical buyers that they don't need to know anything technical! Guide them to simply click the "Choose" button next to Processor (CPU) on our PC Builder page.
6. LANGUAGE & TONE: Speak fluently in English or Bangla based on the customer's message. Use natural human phrasing, emojis, warm enthusiasm ("Haha", "Honestly", "Trust me", "Don't worry at all!"), and persuasive conversation.`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey || apiKey === 'your-openai-api-key-here') {
      return NextResponse.json({
        reply: "Hey there! I'm Lumi, senior PC builder here at VoltEdge Dhaka 😊 How's your day going? What kind of build or budget are you thinking about today?",
      });
    }

    const payload = {
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages.map((m: { role: string; content: string }) => ({
          role: m.role === 'user' ? 'user' : 'assistant',
          content: m.content,
        })),
      ],
      temperature: 0.85, // Higher temperature for natural human warmth and variety
      max_tokens: 500,
    };

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('OpenAI Lumi API error:', errText);
      return NextResponse.json({
        reply: getHumanFallbackReply(messages[messages.length - 1]?.content || ''),
      });
    }

    const data = await response.json();
    const reply = data?.choices?.[0]?.message?.content || getHumanFallbackReply('');

    return NextResponse.json({ reply });
  } catch (error) {
    console.error('Lumi Route error:', error);
    return NextResponse.json({
      reply: "Hey! I'm Lumi from VoltEdge. Don't worry at all if you're new to PC building — I'm right here to help you pick the best value parts for your budget! What budget do you have in mind?",
    });
  }
}

function getHumanFallbackReply(userText: string): string {
  const text = userText.toLowerCase();

  if (text.includes('who') || text.includes('human') || text.includes('real') || text.includes('ai') || text.includes('bot')) {
    return "Haha, I'm Lumi! I'm one of the senior hardware consultants here at VoltEdge in Dhaka. I spend most of my days testing new GPUs, building custom rigs for gamers, and helping people get the absolute best PC for their hard-earned money! How can I help you with your build today?";
  }

  if (text.includes('why') || text.includes('best') || text.includes('startech') || text.includes('techland') || text.includes('trust')) {
    return "Honestly, the main reason gamers and professionals choose VoltEdge over other shops in Bangladesh is that we treat your build like our own! Other places charge extra for cable management or testing, but our certified engineers assemble, stress-test, and cable-route your PC for 100% FREE. Plus we match the lowest BDT market prices, provide 100% official BD warranties, and offer 0% EMI up to 36 months. You're in super safe hands with us!";
  }

  if (text.includes('gaming') || text.includes('game') || text.includes('budget')) {
    return "Awesome! Gaming PCs are my absolute favorite to build. If you have around ৳90,000 to ৳120,000, we can build a total beast with an Intel Core i5 or Ryzen 5 paired with an NVIDIA RTX 4060 8GB! That will run Valorant, PUBG, and Cyberpunk super smoothly. To get started right here on our page, just click 'Choose' next to Processor (CPU) up above!";
  }

  return "Hey there! I'm Lumi from VoltEdge 😊 Honestly, no matter what your budget is, we'll make sure you get maximum performance without wasting a single Taka. To start building right on this page, just click the 'Choose' button next to Processor (CPU) up above! What budget or games are you aiming for?";
}
