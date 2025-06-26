import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import {
  Search,
  FileText,
  Code,
  Wallet,
  Bot,
  LayoutDashboard,
} from "lucide-react";
import { searchTools } from "../../utils/axios";
import { useAuth } from "../../contexts/AuthContext";

function ShimmerCard() {
  return (
    <div className="animate-pulse bg-zinc-800 rounded-xl h-32 w-full mb-4 flex items-center p-4 gap-4">
      <div className="bg-zinc-700 rounded-lg h-12 w-12" />
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-zinc-700 rounded w-1/2" />
        <div className="h-3 bg-zinc-700 rounded w-1/3" />
        <div className="h-3 bg-zinc-700 rounded w-1/4" />
      </div>
    </div>
  );
}

export default function ExploreAPIs() {
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState("apis");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [noData, setNoData] = useState(false);
  const { user } = useAuth();

  // Fetch all data on mount
  useEffect(() => {
    setLoading(true);
    setNoData(false);
    if (!user) {
      return;
    }
    searchTools("").then((res) => {
      setData(res);
      setLoading(false);
      setNoData(res.length === 0);
    });
  }, [user]);

  // Search effect
  useEffect(() => {
    if (search === "") return;
    setLoading(true);
    setNoData(false);
    const timeout = setTimeout(() => {
      searchTools(search).then((res) => {
        setData(res);
        setLoading(false);
        setNoData(res.length === 0);
      });
    }, 500);
    return () => clearTimeout(timeout);
  }, [search]);

  const handleExplore = () => {
    setSearch("");
    setLoading(true);
    setNoData(false);
    searchTools("").then((res) => {
      setData(res);
      setLoading(false);
      setNoData(res.length === 0);
    });
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-800">
      <Sidebar />
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
          <div className="w-full mt-8 min-h-[300px]">
            {loading ? (
              <>
                <ShimmerCard />
                <ShimmerCard />
                <ShimmerCard />
              </>
            ) : noData ? (
              <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-zinc-700 rounded-2xl bg-zinc-900/60 animate-fade-in">
                <span className="text-zinc-400 text-lg mb-4">
                  No data found.
                </span>
                <button
                  onClick={handleExplore}
                  className="px-6 py-2 bg-fuchsia-600 hover:bg-fuchsia-700 text-white rounded-lg font-semibold mt-2"
                >
                  Go to Explore
                </button>
              </div>
            ) : (
              <div className="grid gap-4">
                {data.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-zinc-800 rounded-xl p-6 shadow-md flex flex-col gap-2 animate-fade-in"
                  >
                    <div className="font-bold text-lg text-white">
                      {item.name}
                    </div>
                    <div className="text-zinc-300 text-sm">
                      {item.description}
                    </div>
                    <div className="flex gap-2 mt-2 flex-wrap">
                      {item.metadata?.tags?.map((tag) => (
                        <span
                          key={tag}
                          className="bg-fuchsia-700/30 text-fuchsia-300 px-2 py-1 rounded text-xs font-mono"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
