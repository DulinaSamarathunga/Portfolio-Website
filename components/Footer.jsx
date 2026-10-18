import SocialLinks from "./SocialLinks";
import { navLinks } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-cta">
          <div>
            <h2>Have an idea worth building?</h2>
            <p>Let&apos;s turn it into reliable, scalable software together.</p>
          </div>
          <a href="#contact" className="btn btn-primary">
            Start a Conversation <i className="fas fa-arrow-right"></i>
          </a>
        </div>

        <div className="footer-content">
          <div className="footer-brand">
            <a href="#home" className="logo">
              Dulina<span className="accent">.</span>
            </a>
            <p className="footer-quote">&quot;Turning ideas into reliable, scalable software&quot;</p>
          </div>

          <nav className="footer-nav" aria-label="Footer">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>

          <SocialLinks className="social-links footer-social" />
        </div>

        <div className="footer-bottom">
          <p>&copy; 2025 Dulina Samarathunga. All rights reserved.</p>
          <p className="footer-hint">
            Press <kbd>Ctrl</kbd> + <kbd>K</kbd> to navigate
          </p>
        </div>
      </div>
    </footer>
  );
}
