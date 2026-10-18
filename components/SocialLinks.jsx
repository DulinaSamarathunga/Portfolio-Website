import { socialLinks } from "@/lib/data";

export default function SocialLinks({ className }) {
  return (
    <div className={className}>
      {socialLinks.map((link) => (
        <a
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.label}
        >
          <i className={link.icon}></i>
        </a>
      ))}
    </div>
  );
}
