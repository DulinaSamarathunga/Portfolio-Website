import SectionHeader from "./SectionHeader";
import SkillsExplorer from "./SkillsExplorer";
import { certifications } from "@/lib/data";

export default function Skills() {
  return (
    <section id="skills" className="skills-section">
      <div className="container">
        <SectionHeader
          eyebrow="Skills"
          title="Skills & Technologies"
          subtitle="Technologies I work with to bring ideas to life"
        />

        <SkillsExplorer />

        <div className="certifications reveal">
          <h3>Certifications &amp; Learning</h3>
          <div className="cert-grid">
            {certifications.map((cert) => (
              <div className="cert-item spotlight" key={cert.name}>
                <div className="cert-logo">
                  {cert.image ? (
                    <img src={cert.image} alt={cert.alt} />
                  ) : (
                    <i className={cert.icon} aria-hidden="true"></i>
                  )}
                </div>
                <div className="cert-text">
                  <p className="cert-name">{cert.name}</p>
                  {cert.issuer && <p className="cert-issuer">{cert.issuer}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
