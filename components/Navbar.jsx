"use client";

import { useEffect, useRef, useState } from "react";
import { navLinks } from "@/lib/data";
import useSlidingIndicator from "@/lib/useSlidingIndicator";
import { OPEN_PALETTE_EVENT } from "./CommandPalette";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#home");
  const [isMac, setIsMac] = useState(false);
  const menuRef = useRef(null);
  const indicatorStyle = useSlidingIndicator(menuRef, activeSection);

  useEffect(() => {
    setIsMac(/Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent));
  }, []);

  // Shadow once scrolled; hide while scrolling down, reveal on scroll up
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 50);
      if (Math.abs(y - lastY) > 6) {
        setHidden(y > lastY && y > 300);
        lastY = y;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the link of the section currently in view
  useEffect(() => {
    const sections = navLinks
      .map((link) => document.querySelector(link.href))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Close the mobile menu with Escape
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const navClasses = ["navbar"];
  if (scrolled) navClasses.push("scrolled");
  if (hidden && !menuOpen) navClasses.push("nav-hidden");

  return (
    <nav className={navClasses.join(" ")} id="navbar">
      <div className="nav-container">
        <a href="#home" className="logo" onClick={() => setMenuOpen(false)}>
          Dulina<span className="accent">.</span>
        </a>

        <ul className={`nav-menu${menuOpen ? " active" : ""}`} id="navMenu" ref={menuRef}>
          <li className="nav-indicator" style={indicatorStyle} aria-hidden="true"></li>
          {navLinks.map((link) => {
            const isActive = activeSection === link.href;
            const classes = ["nav-link"];
            if (link.className) classes.push(link.className);
            else if (isActive) classes.push("active");

            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={classes.join(" ")}
                  aria-current={isActive ? "true" : undefined}
                  data-indicator-active={!link.className && isActive ? "true" : undefined}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="nav-actions">
          <button
            type="button"
            className="cmdk-trigger"
            onClick={() => window.dispatchEvent(new Event(OPEN_PALETTE_EVENT))}
            aria-label="Open command menu"
          >
            <i className="fas fa-magnifying-glass"></i>
            <kbd>{isMac ? "⌘" : "Ctrl"} K</kbd>
          </button>

          <button
            type="button"
            className={`hamburger${menuOpen ? " active" : ""}`}
            id="hamburger"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="navMenu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </nav>
  );
}
