import React from "react";
import { ArrowRight, Sparkles, Search, Bot } from "lucide-react";
import { useNavigate } from "react-router";
import { signInWithGoogle } from "../utils/firebase";
import { useAuth } from "../contexts/AuthContext";
import Sidebar from "../components/Sidebar";

export default function Landing() {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Placeholder sign-in handlers
  const handleSignInGoogle = () => alert("Google sign-in coming soon!");
  const handleSignInEmail = () => alert("Email sign-in coming soon!");

  const handleMonetizeClick = async (e) => {
    e.preventDefault();
    if (!user) {
      const result = await signInWithGoogle();
      if (result.user) {
        navigate("/creators/dashboard");
      }
      // Optionally handle error
    } else {
      navigate("/creators/dashboard");
    }
  };

  return (
    <div className="min-h-screen min-w-full bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-800 flex">
      <main className="w-full flex flex-col items-center justify-between px-8 py-0 animate-fade-in min-h-screen">
        {/* Hero Section */}
        <section className="flex flex-col flex-grow justify-center items-center w-full h-full text-center pt-24 pb-12 animate-fade-in-up">
          <h1 className="text-7xl md:text-8xl leading-loose font-extrabold bg-gradient-to-r from-fuchsia-500 via-cyan-400 to-blue-500 bg-clip-text text-transparent drop-shadow-lg mb-8 animate-gradient-x animate-gradient-x-loop">
            Ag3nt
          </h1>
          <p className="text-2xl md:text-3xl text-zinc-200 mb-12 max-w-3xl mx-auto animate-fade-in">
            The next-gen marketplace to{" "}
            <span className="font-bold text-fuchsia-400">monetize</span> your
            APIs & content, and{" "}
            <span className="font-bold text-cyan-400">discover</span> solutions
            with AI-powered chat.
          </p>
          <div className="flex flex-col md:flex-row gap-8 justify-center mb-20 animate-fade-in">
            <a
              href="/consumers/view-apis"
              className="inline-flex items-center px-10 py-5 bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold rounded-2xl shadow-2xl transition-all duration-200 text-xl animate-bounce"
            >
              Explore Marketplace <Search className="ml-3 w-6 h-6" />
            </a>
            <button
              onClick={handleMonetizeClick}
              className="inline-flex items-center px-10 py-5 bg-cyan-600 hover:bg-cyan-700 text-white font-bold rounded-2xl shadow-2xl transition-all duration-200 text-xl"
            >
              Monetize Now <ArrowRight className="ml-3 w-6 h-6" />
            </button>
            <a
              href="/consumers/chat-agent"
              className="inline-flex items-center px-10 py-5 bg-zinc-800 hover:bg-zinc-700 text-white font-bold rounded-2xl shadow-2xl transition-all duration-200 text-xl"
            >
              Chat with Agent <Bot className="ml-3 w-6 h-6 animate-spin-slow" />
            </a>
          </div>
        </section>
        {/* Features Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full max-w-7xl mb-24 animate-fade-in-up">
          <div className="bg-zinc-900/80 rounded-3xl p-12 shadow-2xl flex flex-col items-center hover:scale-105 transition-transform duration-300 animate-fade-in min-h-[320px]">
            <Sparkles className="w-14 h-14 text-fuchsia-400 mb-6 animate-pulse" />
            <h3 className="text-3xl font-bold text-white mb-4">
              Monetize Instantly
            </h3>
            <p className="text-zinc-300 text-lg">
              Upload your APIs or content, set your price, and start earning. No
              gatekeeping, no limits.
            </p>
          </div>
          <div className="bg-zinc-900/80 rounded-3xl p-12 shadow-2xl flex flex-col items-center hover:scale-105 transition-transform duration-300 animate-fade-in min-h-[320px]">
            <Search className="w-14 h-14 text-cyan-400 mb-6 animate-pulse" />
            <h3 className="text-3xl font-bold text-white mb-4">
              Explore & Filter
            </h3>
            <p className="text-zinc-300 text-lg">
              Find APIs and content by category, price, popularity, tags, and
              more. Discover what you need, fast.
            </p>
          </div>
          <div className="bg-zinc-900/80 rounded-3xl p-12 shadow-2xl flex flex-col items-center hover:scale-105 transition-transform duration-300 animate-fade-in min-h-[320px]">
            <Bot className="w-14 h-14 text-blue-400 mb-6 animate-pulse" />
            <h3 className="text-3xl font-bold text-white mb-4">
              AI Chat Agent
            </h3>
            <p className="text-zinc-300 text-lg">
              Describe your problem, get instant suggestions, and auto-execute
              APIs—all in chat.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
