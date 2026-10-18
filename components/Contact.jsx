import SectionHeader from "./SectionHeader";
import SocialLinks from "./SocialLinks";
import ContactForm from "./ContactForm";
import CopyButton from "./CopyButton";
import { contactDetails, email } from "@/lib/data";

// On narrow screens let an email address wrap at the "@" instead of mid-word
function breakAtSymbol(value) {
  const at = value.indexOf("@");
  if (at === -1) return value;
  return (
    <>
      {value.slice(0, at)}
      <wbr />
      {value.slice(at)}
    </>
  );
}

export default function Contact() {
  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <SectionHeader eyebrow="Contact" title="Get In Touch" subtitle="Let's collaborate on your next project" />

        <div className="contact-container">
          <div className="contact-info reveal">
            <h3>Contact Information</h3>
            <p className="contact-intro">
              Have a project in mind or want to discuss opportunities? I&apos;d love to hear from you!
            </p>

            <div className="contact-details">
              {contactDetails.map((item) => (
                <div className="contact-item spotlight" key={item.title}>
                  <div className="contact-icon">
                    <i className={item.icon}></i>
                  </div>
                  <div className="contact-text">
                    <h4>{item.title}</h4>
                    {item.href ? <a href={item.href}>{breakAtSymbol(item.value)}</a> : <p>{item.value}</p>}
                  </div>
                  {item.value === email && (
                    <CopyButton value={email} label="Copy email address" successMessage="Email copied" />
                  )}
                </div>
              ))}
            </div>

            <div className="contact-social">
              <h4>Connect With Me</h4>
              <SocialLinks className="social-icons-large" />
            </div>
          </div>

          <div className="contact-form-wrapper spotlight reveal" style={{ "--delay": "120ms" }}>
            <h3>Send Me a Message</h3>
            <p className="form-intro">Fill in the form and I&apos;ll get back to you by email.</p>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
