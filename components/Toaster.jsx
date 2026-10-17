"use client";

import { useEffect, useState } from "react";

const ICONS = {
  success: "fas fa-circle-check",
  error: "fas fa-circle-exclamation",
};

export default function Toaster() {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    let nextId = 0;
    const onToast = (e) => {
      const id = ++nextId;
      setToasts((list) => [...list, { id, ...e.detail }]);
      setTimeout(() => setToasts((list) => list.filter((t) => t.id !== id)), 3500);
    };
    window.addEventListener("toast", onToast);
    return () => window.removeEventListener("toast", onToast);
  }, []);

  return (
    <div className="toaster" role="status" aria-live="polite">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast ${toast.type}`}>
          <i className={ICONS[toast.type] || ICONS.success}></i>
          {toast.message}
        </div>
      ))}
    </div>
  );
}
