"use client";

import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { EMAILJS_PUBLIC_KEY, EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID } from "@/lib/emailjs";
import { showToast } from "@/lib/toast";
import { email as myEmail } from "@/lib/data";

const MESSAGE_MAX = 1000;
const initialForm = { name: "", email: "", subject: "", message: "" };

// Fallback when EmailJS fails: open the visitor's own mail app with the message pre-filled
function buildMailto({ name, email, subject, message }) {
  const body = `${message}

- ${name} (${email})`;
  return `mailto:${myEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function validate(name, value) {
  const v = value.trim();
  if (!v) return "This field is required.";
  if (name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return "Please enter a valid email address.";
  if (name === "message" && v.length < 10) return "Please write at least 10 characters.";
  return "";
}

function Field({ id, label, icon, error, children }) {
  return (
    <div className={`form-group${error ? " has-error" : ""}`}>
      <div className="field">
        {children}
        <label htmlFor={id}>{label}</label>
        <i className={`field-icon ${icon}`} aria-hidden="true"></i>
      </div>
      {error && (
        <p className="field-error" id={`${id}-error`}>
          <i className="fas fa-circle-exclamation"></i> {error}
        </p>
      )}
    </div>
  );
}

export default function ContactForm() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [failedMessage, setFailedMessage] = useState(null);
  const formRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    // Clear the error as soon as the field becomes valid
    if (errors[name] && !validate(name, value)) setErrors({ ...errors, [name]: "" });
    if (status !== "sending") setStatus("idle");
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setErrors({ ...errors, [name]: validate(name, value) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === "sending") return;

    const nextErrors = Object.fromEntries(Object.keys(form).map((k) => [k, validate(k, form[k])]));
    setErrors(nextErrors);
    const firstInvalid = Object.keys(nextErrors).find((k) => nextErrors[k]);
    if (firstInvalid) {
      formRef.current?.querySelector(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    setStatus("sending");
    try {
      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          subject: form.subject,
          message: form.message,
          reply_to: form.email,
        },
        { publicKey: EMAILJS_PUBLIC_KEY }
      );
      console.log("EmailJS: message sent", response.status);
      setStatus("success");
      setFailedMessage(null);
      setForm(initialForm);
      setErrors({});
      showToast("Message sent! I'll get back to you soon.");
    } catch (error) {
      // EmailJS reports the reason in `error.text` (e.g. "The template ID not found")
      console.error("EmailJS: message failed:", error?.status, error?.text || error);
      setFailedMessage({ ...form });
      setStatus("error");
      showToast("Message couldn't be sent. Use the email option below.", "error");
    }
  };

  // Ctrl/⌘ + Enter submits from the message box
  const handleMessageKeyDown = (e) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      formRef.current?.requestSubmit();
    }
  };

  const fieldProps = (name) => ({
    id: name,
    name,
    value: form[name],
    onChange: handleChange,
    onBlur: handleBlur,
    placeholder: " ",
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${name}-error` : undefined,
  });

  const sending = status === "sending";
  const remaining = MESSAGE_MAX - form.message.length;

  return (
    <form className="contact-form" id="contactForm" onSubmit={handleSubmit} noValidate ref={formRef}>
      <div className="form-row">
        <Field id="name" label="Your Name" icon="far fa-user" error={errors.name}>
          <input type="text" autoComplete="name" {...fieldProps("name")} />
        </Field>
        <Field id="email" label="Your Email" icon="far fa-envelope" error={errors.email}>
          <input type="email" autoComplete="email" {...fieldProps("email")} />
        </Field>
      </div>

      <Field id="subject" label="Subject" icon="far fa-bookmark" error={errors.subject}>
        <input type="text" {...fieldProps("subject")} />
      </Field>

      <Field id="message" label="Message" icon="far fa-comment-dots" error={errors.message}>
        <textarea rows={6} maxLength={MESSAGE_MAX} onKeyDown={handleMessageKeyDown} {...fieldProps("message")}></textarea>
      </Field>

      <div className="form-meta">
        <span className="form-hint">
          <kbd>Ctrl</kbd> + <kbd>Enter</kbd> to send
        </span>
        <span className={`char-count${remaining < 100 ? " warn" : ""}`}>
          {form.message.length}/{MESSAGE_MAX}
        </span>
      </div>

      <button type="submit" className="btn btn-primary btn-submit" disabled={sending}>
        {sending ? (
          <>
            <span className="spinner" aria-hidden="true"></span> Sending...
          </>
        ) : (
          <>
            Send Message <i className="fas fa-paper-plane"></i>
          </>
        )}
      </button>

      <div aria-live="polite">
        {status === "success" && (
          <p className="form-status success">
            <i className="fas fa-circle-check"></i> Thanks! Your message has been sent. I&apos;ll get back to you soon.
          </p>
        )}
        {status === "error" && (
          <div className="form-status error">
            <i className="fas fa-circle-exclamation"></i>
            <div>
              <p>Sorry, the message couldn&apos;t be sent from here.</p>
              {failedMessage && (
                <a className="form-fallback" href={buildMailto(failedMessage)}>
                  <i className="fas fa-envelope"></i> Send it with your email app instead
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </form>
  );
}
