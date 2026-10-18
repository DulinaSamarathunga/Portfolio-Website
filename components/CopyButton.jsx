"use client";

import { useState } from "react";
import { copyToClipboard } from "@/lib/clipboard";

export default function CopyButton({ value, label = "Copy", successMessage }) {
  const [copied, setCopied] = useState(false);

  const handleClick = async () => {
    await copyToClipboard(value, successMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <button type="button" className={`copy-btn${copied ? " copied" : ""}`} onClick={handleClick} aria-label={label} title={label}>
      <i className={copied ? "fas fa-check" : "far fa-copy"}></i>
    </button>
  );
}
