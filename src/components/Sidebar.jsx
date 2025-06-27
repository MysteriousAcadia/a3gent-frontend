import React from "react";
import { useAuth } from "../contexts/AuthContext";
import {
  User,
  PlusCircle,
  FilePlus,
  LayoutDashboard,
  Search,
  Bot,
  Wallet,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router";
import Toast from "./Toast";

function getRandomAvatar(name) {
  // Use DiceBear Avatars API for a random avatar based on name
  return `https://api.dicebear.com/7.x/identicon/svg?seed=${encodeURIComponent(
    name || Math.random().toString(36).substring(2)
  )}`;
}

export default function Sidebar() {
  const navigate = useNavigate();
  const { user, callTopup } = useAuth();
  const location = useLocation();
  const path = location.pathname;
  // Placeholder for account address (replace with real address if available)
  const account = user?.address
    ? `0x${user.address.slice(0, 4)}...${user.address.slice(-4)}`
    : "0x0000...0000";
  const avatarUrl =
    user?.photoURL ||
    getRandomAvatar(user?.displayName || user?.email || "user");
  const balance = user?.balance ?? 0;

  const [toast, setToast] = React.useState({ show: false, message: "" });

  let navOptions = null;
  if (path.startsWith("/creators/")) {
    navOptions = (
      <>
        <button
          onClick={() => navigate("/creators/dashboard")}
          className="cursor pointer flex items-center gap-2 text-zinc-200 hover:text-white py-2 px-3 rounded-lg transition-colors"
        >
          <LayoutDashboard className="w-5 h-5" /> Dashboard
        </button>
        <button
          onClick={() => navigate("/creators/create-api")}
          className="cursor pointer flex items-center gap-2 text-zinc-200 hover:text-white py-2 px-3 rounded-lg transition-colors"
        >
          <PlusCircle className="w-5 h-5" /> Add API
        </button>
        <button
          onClick={() => navigate("/creators/create-document")}
          className="cursor pointer flex items-center gap-2 text-zinc-200 hover:text-white py-2 px-3 rounded-lg transition-colors"
        >
          <FilePlus className="w-5 h-5" /> Add Document
        </button>
      </>
    );
  } else if (path.startsWith("/consumers/")) {
    navOptions = (
      <>
        <button
          onClick={() => navigate("/consumers/view-apis")}
          className="cursor-pointer flex items-center gap-2 text-zinc-200 hover:text-white py-2 px-3 rounded-lg transition-colors"
        >
          <Search className="w-5 h-5" /> Explore
        </button>
        <button
          onClick={() => navigate("/consumers/chat-agent")}
          className="cursor-pointer flex items-center gap-2 text-zinc-200 hover:text-white py-2 px-3 rounded-lg transition-colors"
        >
          <Bot className="w-5 h-5" /> Talk to Agent
        </button>
        <button
          onClick={async () => {
            try {
              await callTopup();
              setToast({ show: true, message: "Topup successful!" });
            } catch (e) {
              setToast({
                show: true,
                message: "Topup failed. Please try again.",
              });
            }
          }}
          className="cursor-pointer flex items-center gap-2 text-zinc-200 hover:text-white py-2 px-3 rounded-lg transition-colors"
        >
          <Wallet className="w-5 h-5" /> Topup Balance
        </button>
      </>
    );
  }

  return (
    <>
      <Toast
        message={toast.message}
        show={toast.show}
        onClose={() => setToast({ ...toast, show: false })}
      />
      <aside className="fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-zinc-900 to-zinc-800 shadow-xl flex flex-col items-center py-10 animate-fade-in">
        <h2
          onClick={() => {
            navigate("/");
          }}
          className=" cursor-pointer text-3xl font-extrabold text-white mb-8 tracking-tight"
        >
          Ag3nt
        </h2>
        <div className="flex flex-col items-center gap-3 w-full px-6 mb-4">
          <div className="w-16 h-16 rounded-full border-2 border-fuchsia-500 bg-zinc-700 flex items-center justify-center overflow-hidden">
            <img
              src={avatarUrl}
              alt="User Avatar"
              className="w-16 h-16 rounded-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.style.display = "none";
                const fallback =
                  e.target.parentNode.querySelector(".avatar-fallback");
                if (fallback) fallback.style.display = "flex";
              }}
            />
            <span
              className="avatar-fallback hidden w-full h-full items-center justify-center text-2xl font-bold text-white bg-fuchsia-600"
              style={{ display: "none" }}
            >
              {(user?.displayName || user?.email || "U")[0].toUpperCase()}
            </span>
          </div>
          <div className="text-white font-semibold text-lg text-center truncate w-full">
            {user?.displayName || user?.email || "User"}
          </div>
          <div className="text-xs text-zinc-400 font-mono">{account}</div>
          <div className="text-xs text-fuchsia-400 font-mono mt-1">
            Balance: {balance} ETH
          </div>
        </div>
        <nav className="flex flex-col gap-2 w-full px-6">{navOptions}</nav>
      </aside>
    </>
  );
}
