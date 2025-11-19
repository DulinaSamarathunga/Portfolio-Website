# Portfolio Website

## Overview
This is a responsive and modern personal portfolio website built using HTML, CSS, and JavaScript. It showcases my projects, technical skills, certifications, experience, and contact information in a clean and highly interactive interface. The website is designed with smooth animations, a dark neon-accent theme, and a fully optimized layout for mobile and desktop devices. It includes a functional contact form using EmailJS, social media integration, and a well-structured project gallery.

## Key Features
- **Hero Section**: Introduction with animated text, profile image, CTA buttons, and social links.
- **About Section**: Personal summary, education history, approach to development, and professional statistics.
- **Skills Section**: Categorized skill sets covering Languages, AI/ML, Web Development, and Tools & Cloud.
- **Project Showcase**: Interactive cards with hover effects, GitHub links, and technology tags.
- **Contact Form**: EmailJS-powered form for sending messages directly to email.
- **Responsive Layout**: Fully optimized for desktop, tablet, and mobile screens.
- **Smooth Animations**: Fade-in, hover transitions, and scrolling effects across sections.
- **Navigation Menu**: Sticky navbar with anchor links and mobile hamburger menu.

## Tech Stack
- **Frontend**: HTML5, CSS3, JavaScript
- **Styling & UI Libraries**: Google Fonts (Inter, Poppins), Font Awesome Icons
- **Email Service**: EmailJS (for form submissions)
- **Hosting Options**: GitHub Pages, Netlify, Vercel (optional)

## Project Structure
portfolio-website/
│
├── index.html                # Main HTML file containing layout and all sections
├── styles.css                # Complete styling and responsive design
├── script.js                 # JavaScript for interactions and EmailJS handling
├── Images/                   # Profile picture, logos, skill icons, project images
│
└── README.md                 # Project documentation

## Setup Instructions
1. **Clone the repository**
   git clone <repository-url>
   cd portfolio-website

2. **Ensure folder structure is correct**
- Make sure the `Images/` folder exists with all required images.

3. **EmailJS Configuration**
- In `script.js`, replace:
  - `publicKey`
  - `service ID`
  - `template ID`
- These must match your EmailJS dashboard settings for the contact form to work.

4. **Run the Website**
- Option 1: Open `index.html` directly in your browser.
- Option 2 (Recommended): Use VS Code Live Server  
  ```
  Right-click index.html → Open with Live Server
  ```

## Usage
- Update text content directly in `index.html` to personalize details.
- Replace images in the `Images/` folder with your own visuals.
- Modify colors, font sizes, spacing, or animations in `styles.css`.
- Use the “Projects” section to link your GitHub repositories or live demos.
- Verify EmailJS integration to ensure messages from the contact form are delivered.

## Contributing
Contributions are welcome. Please fork the project, create a new branch, make your changes, and submit a pull request.  
Ensure all updates follow clean code standards and maintain design consistency.

## License
This project is licensed under the MIT License.  
You may modify, distribute, or use this project with attribution.