// Imported (not referenced by path) so the URL is content-hashed: replacing the
// file automatically busts the browser and Next.js image caches.
import portfolioScreenshot from "@/public/Images/project-image.png";

export const socialLinks = [
  { href: "https://github.com/DulinaSamarathunga", label: "GitHub", icon: "fab fa-github" },
  { href: "https://www.linkedin.com/in/dulina-samarathunga-006735358/", label: "LinkedIn", icon: "fab fa-linkedin" },
  { href: "https://www.kaggle.com/dulinasamarathunga", label: "Kaggle", icon: "fab fa-kaggle" },
  { href: "https://www.instagram.com/_dulina.s__/", label: "Instagram", icon: "fab fa-instagram" },
];

export const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact", className: "contact-btn" },
];

export const stats = [
  { value: "7+", label: "Projects Completed" },
  { value: "7+", label: "Certifications" },
  { value: "40+", label: "Commits This Year" },
];

export const experience = [
  { title: "Intern - Technology", place: "Virtusa", detail: "Software Engineering", year: "Present" },
];

export const education = [
  { title: "BSc (Hons) Computer Science", place: "University of Westminster", year: "Currently Reading" },
  { title: "Foundation in Computer Science", place: "Informatics Institute of Technology", year: "2023 - 2024" },
  { title: "Secondary Education", place: "Ananda College, Colombo", year: "2012 - 2023" },
];

export const approach = [
  "Problem-solving through innovation",
  "Clean, maintainable code",
  "Continuous learning mindset",
  "Scalable, user-focused design",
];

// Each skill shows either an image (`image`) or a Font Awesome icon (`icon` + `color`)
export const skillCategories = [
  {
    title: "Languages",
    icon: "fas fa-code",
    skills: [
      { name: "Python", image: "/Images/python.png", color: "#3776AB" },
      { name: "Java", image: "/Images/java.png", color: "#E76F00" },
      { name: "JavaScript", image: "/Images/js.png", color: "#F7DF1E" },
      { name: "SQL", icon: "fas fa-database", color: "#2AA3BF" },
    ],
  },
  {
    title: "AI & ML",
    icon: "fas fa-brain",
    skills: [
      { name: "TensorFlow", icon: "fas fa-project-diagram", color: "#FF6F00" },
      { name: "PyTorch", icon: "fas fa-fire", color: "#EE4C2C" },
      { name: "Scikit-Learn", icon: "fas fa-chart-line", color: "#F7931E" },
      { name: "Pandas", icon: "fas fa-table", color: "#E70488" },
      { name: "NumPy", icon: "fas fa-calculator", color: "#4DABCF" },
      { name: "OpenCV", icon: "fas fa-eye", color: "#5C3EE8" },
    ],
  },
  {
    title: "Web Dev",
    icon: "fas fa-laptop-code",
    skills: [
      { name: "HTML5", image: "/Images/html-5.png", color: "#E34F26" },
      { name: "CSS3", image: "/Images/css-3.png", color: "#1572B6" },
      { name: "React", icon: "fab fa-react", color: "#61DAFB" },
      { name: "Flask", icon: "fas fa-flask", color: "#F5F7FA" },
    ],
  },
  {
    title: "Tools & Cloud",
    icon: "fas fa-tools",
    skills: [
      { name: "Git", icon: "fab fa-git-alt", color: "#F05032" },
      { name: "Docker", icon: "fab fa-docker", color: "#2496ED" },
      { name: "MySQL", image: "/Images/mysql.png", color: "#4479A1" },
      { name: "MongoDB", icon: "fas fa-database", color: "#47A248" },
      { name: "Azure", icon: "fab fa-microsoft", color: "#0078D4" },
      { name: "Figma", image: "/Images/figma.png", color: "#F24E1E" },
    ],
  },
];

export const certifications = [
  // { name: "Google ML Crash Course", icon: "fab fa-google" },
  // { name: "IBM Data Science", icon: "fas fa-brain" },
  // { name: "FreeCodeCamp Python", icon: "fab fa-free-code-camp" },
  { name: "Python Programming", issuer: "Department of Computer Science & Engineering, University of Moratuwa", icon: "fas fa-building-columns" },
  { name: "Web Design for Beginners", issuer: "Department of Computer Science & Engineering, University of Moratuwa", icon: "fas fa-building-columns" },
  { name: "Java Object-Oriented Programming", issuer: "LinkedIn", image: "/Images/linkedin-learning.png", alt: "LinkedIn Learning" },
  { name: "Java Essential Training: Syntax and Structure", issuer: "LinkedIn", image: "/Images/linkedin-learning.png", alt: "LinkedIn Learning" },
  { name: "Java Essential Training: Objects and APIs", issuer: "LinkedIn", image: "/Images/linkedin-learning.png", alt: "LinkedIn Learning" },
  { name: "LinkedIn MLOps", issuer: "LinkedIn", image: "/Images/linkedin-learning.png", alt: "LinkedIn Learning" },
  { name: "Intro to Machine Learning", issuer: "Kaggle", image: "/Images/Kaggle.png", alt: "Kaggle" },
  { name: "Cyber Security", image: "/Images/download.png", alt: "Cyber Security" },
];

export const projects = [
  {
    title: "Portfolio Website",
    description: "My personal portfolio, built with Next.js and React: a responsive, interactive site with a command palette, skill filters and a working contact form.",
    image: portfolioScreenshot,
    imageAlt: "Homepage of the Dulina Samarathunga portfolio website",
    github: "https://github.com/DulinaSamarathunga/supplygenie-metamorphs-idealize-ai-service",
    tech: ["Next.js", "React", "JavaScript", "CSS", "EmailJS"],
  },
  {
    title: "Stock Management System",
    description:
      "A web-based Stock Management System built with Flask, featuring product tracking, sales processing, invoicing, low-stock alerts, and a responsive dashboard for efficient inventory and billing management.",
    icon: "fas fa-boxes-stacked",
    github: "https://github.com/DulinaSamarathunga/sdg-awareness-site",
    tech: ["Python, Flask", "SQLite with SQLAlchemy ORM", "HTML", "CSS", "JavaScript", "Bootstrap"],
  },
  {
    title: "Weather Prediction Model",
    description:
      "A machine learning model that predicts temperature (°C) from humidity, wind, visibility, pressure and precipitation, with a full preprocessing pipeline and an interactive Streamlit app for real-time predictions. Achieves R² ≈ 0.99 (MAE ≈ 0.74°C).",
    icon: "fas fa-cloud-sun",
    github: "https://github.com/DulinaSamarathunga/Weather-Prediction-Model",
    tech: ["Python", "Scikit-Learn", "Streamlit", "pandas", "NumPy"],
  },
  // Hidden projects carried over from the original site; uncomment to show them.
  // Add `live: "https://..."` to any project to show a Live Demo button.
  // {
  //   title: "SQL DBMS with Python",
  //   description: "Lightweight relational database management system built from scratch in Python for efficient data management and querying.",
  //   github: "https://github.com/DulinaSamarathunga/SQL-DBMS-with-python",
  //   tech: ["Python", "Data Structures", "SQL Parser"],
  // },
  // {
  //   title: "Computer Vision Projects",
  //   description: "Collection of CV projects including image classification, object detection, and facial recognition systems using CNNs.",
  //   github: "https://github.com/DulinaSamarathunga",
  //   tech: ["Python", "OpenCV", "TensorFlow", "Keras"],
  // },
  // {
  //   title: "NLP Text Analysis Tool",
  //   description: "Natural language processing application for sentiment analysis, text classification, and entity recognition.",
  //   github: "https://github.com/DulinaSamarathunga",
  //   tech: ["Python", "NLTK", "SpaCy", "Streamlit"],
  // },
  // {
  //   title: "Data Visualization Dashboard",
  //   description: "Interactive dashboard for real-time data analysis and visualization with predictive modeling capabilities.",
  //   github: "https://github.com/DulinaSamarathunga",
  //   tech: ["Python", "Plotly", "Dash", "Pandas"],
  // },
];

export const email = "dulinaminrutha@gmail.com";

export const contactDetails = [
  { title: "Email", icon: "fas fa-envelope", value: "dulinaminrutha@gmail.com", href: "mailto:dulinaminrutha@gmail.com" },
  { title: "Phone", icon: "fas fa-phone", value: "+94 76 589 3931" },
  { title: "Location", icon: "fas fa-map-marker-alt", value: "Colombo, Sri Lanka" },
];
