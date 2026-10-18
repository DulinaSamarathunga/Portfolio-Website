import SectionHeader from "./SectionHeader";
import CountUp from "./CountUp";
import { approach, education, experience, stats } from "@/lib/data";

function Timeline({ items }) {
  return (
    <div className="education-list">
      {items.map((item) => (
        <div className="education-item" key={`${item.title}-${item.place}`}>
          <p className="education-title">{item.title}</p>
          <p className="education-place">
            {item.place}
            {item.detail && <span className="education-detail"> · {item.detail}</span>}
          </p>
          <p className="education-year">{item.year}</p>
        </div>
      ))}
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="about-section">
      <div className="container">
        <SectionHeader eyebrow="About" title="About Me" />

        <div className="about-content">
          <div className="about-text reveal">
            <h3>Building Reliable Software, Curious About AI</h3>
            <p>
              Hi! I&apos;m <strong>Dulina Minrutha Samarathunga</strong>, a Computer Science undergraduate
              at the <strong>University of Westminster</strong>, currently working as an{" "}
              <strong>Intern - Technology at Virtusa</strong>, where I focus on software engineering.
            </p>
            <p>
              I enjoy turning ideas into well-structured, maintainable applications, from the user
              interface down to the data layer. I care about <strong>clean code, solid design and
              building systems that scale</strong>, and I&apos;m always learning better ways to ship
              quality software.
            </p>
            <p>
              Alongside engineering, I&apos;m an <strong>AI enthusiast</strong>. I like exploring how
              machine learning and intelligent automation can make software more useful, and I bring
              that curiosity into the projects I build, from supply chain platforms to custom
              database systems.
            </p>

            <div className="stats-grid">
              {stats.map((stat) => (
                <div className="stat-item spotlight" key={stat.label}>
                  <h4>
                    <CountUp value={stat.value} />
                  </h4>
                  <p>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="about-info">
            <div className="info-card spotlight reveal">
              <div className="info-card-header">
                <div className="info-icon">
                  <i className="fas fa-briefcase"></i>
                </div>
                <h4>Experience</h4>
              </div>
              <Timeline items={experience} />
            </div>

            <div className="info-card spotlight reveal" style={{ "--delay": "100ms" }}>
              <div className="info-card-header">
                <div className="info-icon">
                  <i className="fas fa-graduation-cap"></i>
                </div>
                <h4>Education</h4>
              </div>
              <Timeline items={education} />
            </div>

            <div className="info-card spotlight reveal" style={{ "--delay": "200ms" }}>
              <div className="info-card-header">
                <div className="info-icon">
                  <i className="fas fa-code"></i>
                </div>
                <h4>My Approach</h4>
              </div>
              <ul className="approach-list">
                {approach.map((item) => (
                  <li key={item}>
                    <i className="fas fa-check"></i> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
