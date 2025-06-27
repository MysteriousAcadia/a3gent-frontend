import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import {
  getChatHistory,
  sendChatMessage,
  searchTools,
  executeTool,
} from "../../utils/axios";
import { Bot, User } from "lucide-react";
import Sidebar from "../../components/Sidebar";
import MarkdownRenderer from "../../components/MarkdownRenderer";

export default function ChatWithAgent() {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [typing, setTyping] = useState(false);
  const [toolSuggestions, setToolSuggestions] = useState(null);
  const [toolSuggestionMsgIdx, setToolSuggestionMsgIdx] = useState(null);
  const [toolExecDialog, setToolExecDialog] = useState({
    open: false,
    tool: null,
  });
  const [toolExecResult, setToolExecResult] = useState(null);
  const [toolExecLoading, setToolExecLoading] = useState(false);
  const [toolExecInputs, setToolExecInputs] = useState({});
  const chatEndRef = useRef(null);
  console.log(toolSuggestions);
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
      const agentMsg = { sender: "agent", text: res.data.response };
      setMessages((msgs) => [...msgs, agentMsg]);
      // If toolsFound in response, show them
      if (res.data.toolsFound && res.data.toolsFound.length > 0) {
        setToolSuggestions(res.data.toolsFound);
        setToolSuggestionMsgIdx(0);
      } else {
        setToolSuggestions(null);
        setToolSuggestionMsgIdx(null);
      }
    } catch {
      setMessages((msgs) => [
        ...msgs,
        { sender: "agent", text: "Sorry, something went wrong." },
      ]);
      setToolSuggestions(null);
      setToolSuggestionMsgIdx(null);
    } finally {
      setTyping(false);
    }
  };

  const handleToolExecute = (tool) => {
    setToolExecDialog({ open: true, tool });
    setToolExecInputs({});
    setToolExecResult(null);
  };

  const handleToolExecSubmit = async () => {
    setToolExecLoading(true);
    setToolExecResult(null);
    try {
      const res = await executeTool(toolExecDialog.tool.toolId, toolExecInputs);
      setToolExecResult(res);
      setMessages((msgs) => [
        ...msgs,
        { sender: "user", text: `execute: ${toolExecDialog.tool.toolId}` },
        {
          sender: "agent",
          text: `Tool Output:\n\n${JSON.stringify(res, null, 2)}`,
        },
      ]);
      setToolExecDialog({ open: false, tool: null });
      setToolSuggestions(null);
    } catch (e) {
      setToolExecResult({ error: e?.response?.data || "Failed to execute" });
      setMessages((msgs) => [
        ...msgs,
        { sender: "user", text: `execute: ${toolExecDialog.tool.toolId}` },
        {
          sender: "agent",
          text: `Tool Output (Error):\n\n${JSON.stringify(
            e?.response?.data || "Failed to execute",
            null,
            2
          )}`,
        },
      ]);
    } finally {
      setToolExecLoading(false);
    }
  };

  const handleToolAction = (tool, action) => {
    // Send a message as user with tool name and action
    setMessages((msgs) => [
      ...msgs,
      { sender: "user", text: `${action}: ${tool.name}` },
    ]);
    setToolSuggestions(null);
    setToolSuggestionMsgIdx(null);
  };

  function extractJpgLinks(text) {
    if (!text) return [];
    const regex = /(https?:\/\/[\w\-./%?=&#]+\.jpg)/gi;
    return [...text.matchAll(regex)].map((m) => m[1]);
  }

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
            {toolSuggestions && (
              <div className="w-full flex flex-col items-center my-6 animate-fade-in">
                <div className="bg-gradient-to-r from-fuchsia-700/80 to-cyan-700/80 border-2 border-fuchsia-400 shadow-xl rounded-2xl p-6 max-w-xl w-full flex flex-col gap-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Bot className="w-6 h-6 text-fuchsia-300 animate-bounce" />
                    <span className="text-lg font-bold text-fuchsia-100">
                      Agent found these tools for you:
                    </span>
                  </div>
                  {toolSuggestions.map((tool) => (
                    <div
                      key={tool.toolId}
                      className="bg-zinc-800 rounded-xl p-4 flex flex-col gap-2 border border-fuchsia-700"
                    >
                      <div className="font-semibold text-fuchsia-300 text-lg">
                        {tool.name}
                      </div>
                      <div className="text-zinc-200 text-sm mb-2">
                        {tool.description}
                      </div>
                      <div className="text-xs text-cyan-300 mb-2">
                        Cost:{" "}
                        {tool.pricing?.formatted ||
                          tool.pricing?.ethCost + " ETH"}
                      </div>
                      <button
                        className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-semibold w-fit"
                        onClick={() => handleToolExecute(tool)}
                      >
                        Execute
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {loading ? (
              <div className="text-center text-zinc-400 animate-pulse mt-10">
                Loading chat history...
              </div>
            ) : (
              [...messages].reverse().map((msg, i) => {
                const jpgLinks =
                  msg.sender === "agent" ? extractJpgLinks(msg.text) : [];
                return (
                  <div
                    key={messages.length - i}
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
                          code({
                            node,
                            inline,
                            className,
                            children,
                            ...props
                          }) {
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
                      {jpgLinks.length > 0 && (
                        <div className="mt-2 flex flex-col gap-2">
                          {jpgLinks.map((url, idx) => (
                            <img
                              key={url + idx}
                              src={url}
                              alt="Agent provided"
                              className="rounded-lg border border-zinc-700 max-w-xs shadow-lg"
                            />
                          ))}
                        </div>
                      )}
                    </div>
                    {msg.sender === "user" && (
                      <div className="bg-zinc-700 p-2 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-white" />
                      </div>
                    )}
                  </div>
                );
              })
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
      {/* Tool Execute Dialog */}
      {toolExecDialog.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="fixed inset-0 bg-black/60"
            onClick={() => setToolExecDialog({ open: false, tool: null })}
          />
          <div className="relative bg-zinc-900 rounded-2xl p-8 w-full max-w-lg mx-auto z-10 flex flex-col gap-4 border-2 border-fuchsia-700">
            <div className="text-xl font-bold text-fuchsia-200 mb-2">
              Execute {toolExecDialog.tool.name}
            </div>
            {toolExecDialog.tool.parameters &&
            toolExecDialog.tool.parameters.length > 0 ? (
              toolExecDialog.tool.parameters.map((param) => (
                <div key={param.name} className="flex flex-col gap-1">
                  <label className="text-zinc-300 font-semibold">
                    {param.name}
                  </label>
                  <input
                    className="px-3 py-2 rounded bg-zinc-800 text-white border border-zinc-700 focus:ring-fuchsia-500 focus:outline-none"
                    value={toolExecInputs[param.name] || ""}
                    onChange={(e) =>
                      setToolExecInputs((inputs) => ({
                        ...inputs,
                        [param.name]: e.target.value,
                      }))
                    }
                    placeholder={param.description || `Enter ${param.name}`}
                  />
                </div>
              ))
            ) : (
              <div className="text-zinc-400">No input parameters required.</div>
            )}
            <button
              className="mt-4 px-6 py-2 bg-fuchsia-600 hover:bg-fuchsia-700 text-white rounded-lg font-semibold disabled:opacity-60"
              onClick={handleToolExecSubmit}
              disabled={toolExecLoading}
            >
              {toolExecLoading ? "Executing..." : "Execute"}
            </button>
            {toolExecResult && (
              <div className="mt-4 bg-zinc-800 rounded p-4 text-zinc-100">
                <div className="font-bold text-fuchsia-400 mb-2">Output:</div>
                <pre className="whitespace-pre-wrap break-all text-sm">
                  {JSON.stringify(toolExecResult, null, 2)}
                </pre>
              </div>
            )}
            <button
              className="absolute top-2 right-4 text-zinc-400 hover:text-white"
              onClick={() => setToolExecDialog({ open: false, tool: null })}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
