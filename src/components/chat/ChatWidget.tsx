import { useState, useRef, useEffect } from 'react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const GREETING: Message = {
  id: 'greeting',
  role: 'assistant',
  content:
    "Hi! I'm an AI assistant trained on Jonathan's background and work. Ask me anything — his experience, design process, availability, or community work.",
};

const SUGGESTED = [
  "What's your design process?",
  'Are you available for hire?',
  'Tell me about your work',
];

// ─── Lucide icon paths ──────────────────────────────────────────────────────
const MessageCircleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
    <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
  </svg>
);

const XIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);

const SendIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 2 11 13M22 2 15 22l-4-9-9-4 20-7Z" />
  </svg>
);

// ─── Typing indicator dots ──────────────────────────────────────────────────
function TypingDots() {
  return (
    <div style={{ display: 'flex', gap: '4px', alignItems: 'center', padding: '2px 0' }}>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          style={{
            width: '5px',
            height: '5px',
            borderRadius: '50%',
            backgroundColor: 'var(--text-muted)',
            display: 'block',
            animation: 'dotBounce 1.2s ease-in-out infinite',
            animationDelay: `${i * 0.18}s`,
          }}
        />
      ))}
    </div>
  );
}

// ─── Main widget ────────────────────────────────────────────────────────────
export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom & focus input whenever messages change or panel opens
  useEffect(() => {
    if (open) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => inputRef.current?.focus(), 120);
    }
  }, [open, messages]);

  async function sendMessage(text: string) {
    if (!text.trim() || loading) return;

    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: text.trim(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!res.ok) throw new Error('API error');
      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), role: 'assistant', content: data.content },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: "Sorry, I'm having trouble right now. Reach Jonathan directly at hello@jonathanruiz.dev",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    sendMessage(input);
  }

  // Shared font style
  const fontBase: React.CSSProperties = { fontFamily: "'DM Sans', system-ui, sans-serif" };

  return (
    <>
      {/* ── Floating trigger button ──────────────────────────────────────── */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close chat' : 'Ask Jonathan AI'}
        style={{
          ...fontBase,
          position: 'fixed',
          bottom: '1.5rem',
          right: '1.5rem',
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0 1.25rem',
          height: '3rem',
          borderRadius: '9999px',
          backgroundColor: '#435663',
          color: '#ffffff',
          border: 'none',
          cursor: 'pointer',
          boxShadow: '0 4px 20px rgba(67,86,99,0.35)',
          transition: 'transform 0.15s ease, box-shadow 0.15s ease',
          fontSize: '0.875rem',
          fontWeight: 500,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.03)';
          e.currentTarget.style.boxShadow = '0 6px 28px rgba(67,86,99,0.45)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 4px 20px rgba(67,86,99,0.35)';
        }}
      >
        {/* Green pulse dot */}
        <span style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '8px', height: '8px' }}>
          <span style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            backgroundColor: '#22C55E',
            animation: 'pingDot 1.8s cubic-bezier(0,0,0.2,1) infinite',
          }} />
          <span style={{
            position: 'relative',
            width: '7px',
            height: '7px',
            borderRadius: '50%',
            backgroundColor: '#22C55E',
          }} />
        </span>

        {open ? <XIcon /> : <MessageCircleIcon />}
        {!open && 'Ask Jonathan'}
      </button>

      {/* ── Chat panel ───────────────────────────────────────────────────── */}
      {open && (
        <div
          role="dialog"
          aria-label="Chat with Jonathan's AI assistant"
          style={{
            position: 'fixed',
            bottom: '5.5rem',
            right: '1.5rem',
            zIndex: 100,
            width: 'min(380px, calc(100vw - 2rem))',
            maxHeight: '72vh',
            borderRadius: '1rem',
            overflow: 'hidden',
            backgroundColor: 'var(--bg)',
            border: '1px solid var(--border)',
            boxShadow: '0 24px 64px rgba(0,0,0,0.18)',
            display: 'flex',
            flexDirection: 'column',
            animation: 'chatAppear 0.28s cubic-bezier(0.34,1.56,0.64,1) forwards',
          }}
        >
          {/* Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '1rem 1.25rem',
              backgroundColor: 'var(--bg-secondary)',
              borderBottom: '1px solid var(--border)',
              flexShrink: 0,
            }}
          >
            {/* JR avatar */}
            <div style={{
              width: '2.25rem',
              height: '2.25rem',
              borderRadius: '50%',
              backgroundColor: '#435663',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              <span style={{ ...fontBase, color: '#ffffff', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.02em' }}>
                JR
              </span>
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ ...fontBase, margin: 0, fontSize: '0.875rem', fontWeight: 600, color: 'var(--text)' }}>
                Ask Jonathan
              </p>
              <p style={{ ...fontBase, margin: 0, fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                Powered by Claude
              </p>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--text-muted)',
                display: 'flex',
                padding: '4px',
                borderRadius: '6px',
                transition: 'color 0.15s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              <XIcon />
            </button>
          </div>

          {/* Message thread */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '1rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.625rem',
            }}
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}
              >
                <div
                  style={{
                    ...fontBase,
                    maxWidth: '82%',
                    padding: '0.6rem 0.875rem',
                    borderRadius: msg.role === 'user'
                      ? '1rem 1rem 0.2rem 1rem'
                      : '1rem 1rem 1rem 0.2rem',
                    backgroundColor: msg.role === 'user' ? '#435663' : 'var(--bg-secondary)',
                    color: msg.role === 'user' ? '#ffffff' : 'var(--text)',
                    fontSize: '0.875rem',
                    lineHeight: 1.55,
                    border: msg.role === 'assistant' ? '1px solid var(--border)' : 'none',
                  }}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {/* Loading */}
            {loading && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div style={{
                  padding: '0.625rem 0.875rem',
                  borderRadius: '1rem 1rem 1rem 0.2rem',
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border)',
                }}>
                  <TypingDots />
                </div>
              </div>
            )}

            {/* Suggested prompts — only on greeting */}
            {messages.length === 1 && !loading && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.25rem' }}>
                {SUGGESTED.map((s) => (
                  <button
                    key={s}
                    onClick={() => sendMessage(s)}
                    style={{
                      ...fontBase,
                      padding: '0.3rem 0.75rem',
                      fontSize: '0.75rem',
                      border: '1px solid var(--border)',
                      borderRadius: '9999px',
                      backgroundColor: 'transparent',
                      color: 'var(--text-soft)',
                      cursor: 'pointer',
                      transition: 'border-color 0.15s, color 0.15s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#435663';
                      e.currentTarget.style.color = '#435663';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--border)';
                      e.currentTarget.style.color = 'var(--text-soft)';
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            style={{
              display: 'flex',
              gap: '0.5rem',
              padding: '0.75rem 1rem',
              borderTop: '1px solid var(--border)',
              backgroundColor: 'var(--bg)',
              flexShrink: 0,
            }}
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              disabled={loading}
              style={{
                ...fontBase,
                flex: 1,
                padding: '0.5rem 0.75rem',
                fontSize: '0.875rem',
                borderRadius: '0.5rem',
                border: '1px solid var(--border)',
                backgroundColor: 'var(--bg-secondary)',
                color: 'var(--text)',
                outline: 'none',
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = '#435663')}
              onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              aria-label="Send message"
              style={{
                width: '2.25rem',
                height: '2.25rem',
                borderRadius: '0.5rem',
                border: 'none',
                cursor: input.trim() && !loading ? 'pointer' : 'not-allowed',
                backgroundColor: input.trim() && !loading ? '#435663' : 'var(--border)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                transition: 'background-color 0.15s',
              }}
            >
              <SendIcon />
            </button>
          </form>
        </div>
      )}

    </>
  );
}
