# Portfolio Website (Next.js)

Next.js (App Router) version of the original HTML/CSS/JS portfolio.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

## Structure

```
app/
  layout.js        # <html>, metadata, Geist fonts, Font Awesome stylesheet
  page.js          # assembles the sections
  globals.css      # all styling (colour tokens at the top)
  icon.svg         # favicon
components/        # Navbar, Hero, About, Skills, Projects, Contact, ContactForm, Footer, CommandPalette, ClientEffects, ...
lib/
  data.js          # skills, projects, certifications, links: edit content here
  emailjs.js       # EmailJS IDs (can be overridden with env vars, see .env.example)
public/Images/     # all images
```

## Interactive features

- **Command palette**: `Ctrl/⌘ + K` (or the search button in the navbar) to jump to sections, open profiles or copy the email.
- **Navbar**: sliding active-section indicator; hides while scrolling down, reappears on scroll up.
- **Hero**: cursor-following glow, rotating gradient border.
- **Skills**: filter tabs (arrow keys supported) over all skills; tiles glow in each tool's brand `color`.
- **Cards**: cursor spotlight (`.spotlight`) and 3D tilt (`.tilt`) via `components/ClientEffects.jsx`.
- **Contact form**: floating labels, inline validation, character counter, `Ctrl/⌘ + Enter` to send, toast notifications.
- **Back to top**: floating button with a scroll-progress ring.

All motion is disabled for users with "reduce motion" enabled, and pointer effects only run on mouse/trackpad devices.

## Deployment

Hosted on Netlify: https://portfolio-dulina.netlify.app/

Build settings live in `netlify.toml` (build command `npm run build`, Node 22); Netlify applies its Next.js runtime automatically. With the site linked to this GitHub repo, every push to `main` triggers a new production deploy.
