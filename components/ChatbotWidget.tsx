import { useState } from "react";

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ from: "user" | "bot"; text: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    setMessages((msgs) => [...msgs, { from: "user", text: input }]);
    setLoading(true);
    try {
      const res = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });
      const data = await res.json();
      setMessages((msgs) => [...msgs, { from: "bot", text: data.response || "(No response)" }]);
    } catch (e) {
      setMessages((msgs) => [...msgs, { from: "bot", text: "Error contacting chatbot." }]);
    }
    setInput("");
    setLoading(false);
  };

  return (
    <>
      <button
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full p-4 shadow-xl hover:scale-110 transition-transform duration-200"
        onClick={() => setOpen((o) => !o)}
        aria-label="Open Chatbot"
      >
        <span className="text-2xl">🤖</span>
      </button>
      {open && (
        <div className="fixed bottom-24 right-8 z-50 w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col animate-fade-in">
          <div className="p-4 border-b font-bold bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-2xl flex items-center justify-between">
            <span className="flex items-center gap-2"><span className="text-2xl">🤖</span> LMS Chatbot</span>
            <span className="text-xs bg-green-200 text-green-800 px-2 py-1 rounded">Online</span>
          </div>
          <div className="flex-1 p-4 overflow-y-auto max-h-96" style={{ minHeight: 220 }}>
            {messages.length === 0 && <div className="text-gray-400">Ask me anything about the LMS, courses, or support!</div>}
            {messages.map((msg, i) => (
              <div key={i} className={msg.from === "user" ? "text-right" : "text-left"}>
                <span className={msg.from === "user" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"} style={{ borderRadius: 12, padding: "6px 12px", display: "inline-block", margin: "6px 0", fontSize: "1rem" }}>
                  {msg.text}
                </span>
              </div>
            ))}
            {loading && <div className="text-gray-400">Bot is typing...</div>}
          </div>
          <div className="p-3 border-t flex gap-2 bg-gray-50 rounded-b-2xl">
            <input
              className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") sendMessage(); }}
              placeholder="Type your question..."
              disabled={loading}
            />
            <button
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg disabled:opacity-50 hover:scale-105 transition-transform"
              onClick={sendMessage}
              disabled={loading || !input.trim()}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
