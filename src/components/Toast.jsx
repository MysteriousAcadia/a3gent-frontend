import { useEffect } from "react";

export default function Toast({ message, show, onClose, duration = 2500 }) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [show, duration, onClose]);

  if (!show) return null;
  return (
    <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50 bg-zinc-900 text-white px-6 py-3 rounded-xl shadow-lg border border-fuchsia-500 animate-fade-in">
      {message}
    </div>
  );
}
