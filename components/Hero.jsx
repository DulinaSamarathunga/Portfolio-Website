import Image from "next/image";
import SocialLinks from "./SocialLinks";
import profileImage from "@/public/Images/Profile_Image.jpeg";

export default function Hero() {
  return (
    <section id="home" className="hero-section">
      <div className="container hero-container">
        <div className="hero-content">
          <div className="hero-image">
            <div className="image-wrapper">
              <Image
                src={profileImage}
                className="main-image"
                alt="Dulina Samarathunga"
                priority
                placeholder="blur"
                sizes="(max-width: 860px) 260px, 400px"
              />
              <div className="image-overlay"></div>
            </div>
          </div>

          <div className="hero-text">
            <p className="greeting">Hi there, I&apos;m</p>
            <h1 className="hero-title">Dulina Samarathunga</h1>
            <p className="hero-subtitle">
              <span>Software Engineer</span>
              <span className="divider">|</span>
              <span>AI Enthusiast</span>
            </p>
            <p className="hero-description">
              Building reliable, scalable software with clean code and thoughtful design,
              and exploring how AI can make it smarter.
            </p>

            <div className="hero-buttons">
              <a href="#projects" className="btn btn-primary">
                View My Work <i className="fas fa-arrow-right"></i>
              </a>
              <a href="#contact" className="btn btn-secondary">Get In Touch</a>
            </div>

            <SocialLinks className="social-links" />
          </div>
        </div>
      </div>

      <div className="scroll-indicator">
        <a href="#about" aria-label="Scroll to About section">
          <span></span>
        </a>
      </div>
    </section>
  );
}
