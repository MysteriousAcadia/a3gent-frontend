import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import {
  Search,
  FileText,
  Code,
  Wallet,
  Bot,
  LayoutDashboard,
} from "lucide-react";

export default function ExploreAPIs() {
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState("apis");

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-800">
      <Sidebar>
        <nav className="mt-10 flex flex-col gap-2 w-full px-6">
          <a
            href="/creators/dashboard"
            className="flex items-center gap-2 text-zinc-200 hover:text-white py-2 px-3 rounded-lg transition-colors"
          >
            <LayoutDashboard className="w-5 h-5" /> Dashboard
          </a>
          <button className="flex items-center gap-2 text-zinc-200 hover:text-white py-2 px-3 rounded-lg transition-colors">
            <Wallet className="w-5 h-5" /> Top Up Wallet
          </button>
          <a
            href="/consumers/chat-agent"
            className="flex items-center gap-2 text-zinc-200 hover:text-white py-2 px-3 rounded-lg transition-colors"
          >
            <Bot className="w-5 h-5" /> Chat with Agent
          </a>
        </nav>
      </Sidebar>
      <main className="flex-1 flex flex-col items-center md:ml-64 p-8">
        <div className="w-full max-w-3xl flex flex-col items-center gap-8 mt-8">
          <div className="w-full flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-2/3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 w-5 h-5" />
              <input
                type="text"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 text-lg shadow-md"
                placeholder="Search APIs or Documents..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex gap-2 bg-zinc-800 rounded-xl p-1 border border-zinc-700 shadow-md">
              <button
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-150 ${
                  tab === "apis"
                    ? "bg-fuchsia-600 text-white"
                    : "text-zinc-300 hover:bg-zinc-700"
                }`}
                onClick={() => setTab("apis")}
              >
                <Code className="w-5 h-5" /> APIs
              </button>
              <button
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-150 ${
                  tab === "docs"
                    ? "bg-fuchsia-600 text-white"
                    : "text-zinc-300 hover:bg-zinc-700"
                }`}
                onClick={() => setTab("docs")}
              >
                <FileText className="w-5 h-5" /> Documents
              </button>
            </div>
          </div>
          {/* Marketplace content placeholder */}
          <div className="w-full mt-8">
            {tab === "apis" ? (
              <div className="text-zinc-300 text-center text-xl py-20 border-2 border-dashed border-zinc-700 rounded-2xl bg-zinc-900/60 animate-fade-in">
                {/* Replace with API cards/grid */}
                <span>Browse and discover premium APIs here.</span>
              </div>
            ) : (
              <div className="text-zinc-300 text-center text-xl py-20 border-2 border-dashed border-zinc-700 rounded-2xl bg-zinc-900/60 animate-fade-in">
                {/* Replace with Document cards/grid */}
                <span>Browse and discover premium documents here.</span>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
