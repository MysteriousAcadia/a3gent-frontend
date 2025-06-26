import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { getChatHistory, sendChatMessage } from "../../utils/axios";
import { Bot, User } from "lucide-react";
import Sidebar from "../../components/Sidebar";
import MarkdownRenderer from "../../components/MarkdownRenderer";

export default function ChatWithAgent() {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [typing, setTyping] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    async function fetchHistory() {
      setLoading(true);
      try {
        const history = await getChatHistory();
        setMessages(history || []);
      } catch (e) {
        setMessages([]);
      } finally {
        setLoading(false);
      }
    }
    fetchHistory();
  }, [user]);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, typing]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = { sender: "user", text: input };
    setMessages((msgs) => [...msgs, userMsg]);
    setInput("");
    setTyping(true);
    try {
      const res = await sendChatMessage(input);
      setMessages((msgs) => [
        ...msgs,
        { sender: "agent", text: res.data.response },
      ]);
    } catch {
      setMessages((msgs) => [
        ...msgs,
        { sender: "agent", text: "Sorry, something went wrong." },
      ]);
    } finally {
      setTyping(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-800">
      <Sidebar />
      <main className="flex-1 flex flex-col items-center md:ml-64 p-0">
        <div className="w-full flex flex-col h-screen justify-between">
          <div className="flex-1 overflow-y-auto px-4 pt-8 pb-4 bg-zinc-900/80 rounded-b-2xl animate-fade-in flex flex-col-reverse space-y-reverse space-y-4">
            {typing && (
              <div className="flex items-end gap-3 justify-start animate-fade-in">
                <div className="bg-fuchsia-600 p-2 rounded-full flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div className="px-4 py-2 rounded-2xl bg-zinc-800 text-zinc-100 max-w-[70%] shadow-md animate-pulse">
                  <span className="inline-block w-2 h-2 bg-zinc-400 rounded-full mr-1 animate-bounce"></span>
                  <span className="inline-block w-2 h-2 bg-zinc-400 rounded-full mr-1 animate-bounce delay-75"></span>
                  <span className="inline-block w-2 h-2 bg-zinc-400 rounded-full animate-bounce delay-150"></span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
            {loading ? (
              <div className="text-center text-zinc-400 animate-pulse mt-10">
                Loading chat history...
              </div>
            ) : (
              [...messages].reverse().map((msg, i) => (
                <div
                  key={i}
                  className={`flex items-end gap-3 ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {msg.sender === "agent" && (
                    <div className="bg-fuchsia-600 p-2 rounded-full flex items-center justify-center">
                      <Bot className="w-6 h-6 text-white" />
                    </div>
                  )}
                  <div
                    className={`px-4 py-2 rounded-2xl max-w-[70%] text-base shadow-md transition-all duration-200 ${
                      msg.sender === "user"
                        ? "bg-fuchsia-700 text-white rounded-br-none"
                        : "bg-zinc-800 text-zinc-100 rounded-bl-none"
                    }`}
                  >
                    <MarkdownRenderer
                      class="prose prose-invert max-w-none"
                      components={{
                        code({ node, inline, className, children, ...props }) {
                          return (
                            <code
                              className={
                                "bg-zinc-900 px-1 rounded text-fuchsia-300 font-mono text-sm"
                              }
                              {...props}
                            >
                              {children}
                            </code>
                          );
                        },
                        pre({ node, ...props }) {
                          return (
                            <pre className="bg-zinc-900 rounded p-2 overflow-x-auto">
                              {...props}
                            </pre>
                          );
                        },
                      }}
                    >
                      {msg.text}
                    </MarkdownRenderer>
                  </div>
                  {msg.sender === "user" && (
                    <div className="bg-zinc-700 p-2 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
          <form
            onSubmit={handleSend}
            className="flex items-center gap-3 p-4 bg-zinc-950 rounded-t-2xl shadow-2xl"
          >
            <input
              type="text"
              className="flex-1 px-4 py-3 rounded-xl bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 text-lg shadow-md"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading || typing}
            />
            <button
              type="submit"
              className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold px-6 py-3 rounded-xl shadow-lg text-lg transition-all duration-200 disabled:opacity-60"
              disabled={loading || typing || !input.trim()}
            >
              Send
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
