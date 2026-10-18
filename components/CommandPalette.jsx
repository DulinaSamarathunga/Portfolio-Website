"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { email, socialLinks } from "@/lib/data";
import { copyToClipboard } from "@/lib/clipboard";

export const OPEN_PALETTE_EVENT = "open-command-palette";

function scrollToSection(href, focusSelector) {
  const target = document.querySelector(href);
  if (!target) return;
  target.scrollIntoView({ behavior: "smooth" });
  history.replaceState(null, "", href);
  if (focusSelector) {
    setTimeout(() => document.querySelector(focusSelector)?.focus({ preventScroll: true }), 600);
  }
}

const openLink = (href) => window.open(href, "_blank", "noopener,noreferrer");

const COMMANDS = [
  { group: "Navigate", label: "Home", icon: "fas fa-house", run: () => scrollToSection("#home") },
  { group: "Navigate", label: "About", icon: "fas fa-user", run: () => scrollToSection("#about") },
  { group: "Navigate", label: "Skills", icon: "fas fa-layer-group", run: () => scrollToSection("#skills") },
  { group: "Navigate", label: "Projects", icon: "fas fa-briefcase", run: () => scrollToSection("#projects") },
  { group: "Navigate", label: "Contact", icon: "fas fa-envelope", run: () => scrollToSection("#contact") },
  { group: "Actions", label: "Send a message", icon: "fas fa-paper-plane", run: () => scrollToSection("#contact", "#name") },
  { group: "Actions", label: "Copy email address", hint: email, icon: "far fa-copy", run: () => copyToClipboard(email, "Email copied") },
  ...socialLinks.map((link) => ({
    group: "Links",
    label: link.label,
    icon: link.icon,
    hint: "Opens in new tab",
    run: () => openLink(link.href),
  })),
  {
    group: "Links",
    label: "All GitHub repositories",
    icon: "fas fa-code-branch",
    hint: "Opens in new tab",
    run: () => openLink("https://github.com/DulinaSamarathunga?tab=repositories"),
  },
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const previousFocus = useRef(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return COMMANDS;
    return COMMANDS.filter((c) => `${c.label} ${c.group}`.toLowerCase().includes(q));
  }, [query]);

  // Global shortcut + custom open event
  useEffect(() => {
    const onKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener(OPEN_PALETTE_EVENT, onOpen);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener(OPEN_PALETTE_EVENT, onOpen);
    };
  }, []);

  // Focus management + scroll lock while open
  useEffect(() => {
    if (open) {
      previousFocus.current = document.activeElement;
      setQuery("");
      setActiveIndex(0);
      document.body.style.overflow = "hidden";
      requestAnimationFrame(() => inputRef.current?.focus());
    } else {
      document.body.style.overflow = "";
      previousFocus.current?.focus?.();
    }
  }, [open]);

  useEffect(() => setActiveIndex(0), [query]);

  useEffect(() => {
    listRef.current
      ?.querySelector(`[data-index="${activeIndex}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  if (!open) return null;

  const runCommand = (command) => {
    setOpen(false);
    // Let the dialog close (and restore scrolling) before acting
    requestAnimationFrame(() => command.run());
  };

  const onKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => (results.length ? (i + 1) % results.length : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => (results.length ? (i - 1 + results.length) % results.length : 0));
    } else if (e.key === "Enter" && results[activeIndex]) {
      e.preventDefault();
      runCommand(results[activeIndex]);
    } else if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
    } else if (e.key === "Tab") {
      e.preventDefault(); // keep focus inside the dialog
    }
  };

  let lastGroup = null;

  return (
    <div className="cmdk-overlay" onMouseDown={() => setOpen(false)}>
      <div
        className="cmdk"
        role="dialog"
        aria-modal="true"
        aria-label="Command menu"
        onMouseDown={(e) => e.stopPropagation()}
        onKeyDown={onKeyDown}
      >
        <div className="cmdk-search">
          <i className="fas fa-magnifying-glass"></i>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search sections, links and actions..."
            aria-label="Search commands"
            role="combobox"
            aria-expanded="true"
            aria-controls="cmdk-list"
            aria-activedescendant={results[activeIndex] ? `cmdk-item-${activeIndex}` : undefined}
          />
          <kbd>Esc</kbd>
        </div>

        <ul className="cmdk-list" id="cmdk-list" role="listbox" ref={listRef}>
          {results.length === 0 && <li className="cmdk-empty">No results for &ldquo;{query}&rdquo;</li>}
          {results.map((command, i) => {
            const showGroup = command.group !== lastGroup;
            lastGroup = command.group;
            return (
              <li key={`${command.group}-${command.label}`} role="presentation">
                {showGroup && <div className="cmdk-group">{command.group}</div>}
                <div
                  id={`cmdk-item-${i}`}
                  data-index={i}
                  role="option"
                  aria-selected={i === activeIndex}
                  className={`cmdk-item${i === activeIndex ? " active" : ""}`}
                  onMouseMove={() => setActiveIndex(i)}
                  onClick={() => runCommand(command)}
                >
                  <span className="cmdk-icon">
                    <i className={command.icon}></i>
                  </span>
                  <span className="cmdk-label">{command.label}</span>
                  {command.hint && <span className="cmdk-hint">{command.hint}</span>}
                  <i className="fas fa-arrow-turn-down cmdk-enter"></i>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="cmdk-footer">
          <span><kbd>↑</kbd><kbd>↓</kbd> navigate</span>
          <span><kbd>↵</kbd> select</span>
          <span><kbd>esc</kbd> close</span>
        </div>
      </div>
    </div>
  );
}
