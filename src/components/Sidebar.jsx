import React from "react";

export default function Sidebar({ onSignInGoogle, onSignInEmail }) {
  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-zinc-900 to-zinc-800 shadow-xl flex flex-col items-center py-10 animate-fade-in">
      <h2 className="text-3xl font-extrabold text-white mb-8 tracking-tight">
        Ag3nt
      </h2>
      <div className="flex flex-col gap-4 w-full px-6">
        <button
          onClick={onSignInGoogle}
          className="bg-white/10 hover:bg-white/20 text-white font-semibold py-3 rounded-lg transition-all duration-200 shadow-md border border-white/20"
        >
          Sign in with Google
        </button>
        <button
          onClick={onSignInEmail}
          className="bg-white/10 hover:bg-white/20 text-white font-semibold py-3 rounded-lg transition-all duration-200 shadow-md border border-white/20"
        >
          Sign in with Email
        </button>
      </div>
    </aside>
  );
}
