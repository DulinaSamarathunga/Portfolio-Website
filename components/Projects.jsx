import Image from "next/image";
import SectionHeader from "./SectionHeader";
import { projects } from "@/lib/data";

export default function Projects() {
  return (
    <section id="projects" className="projects-section">
      <div className="container">
        <SectionHeader eyebrow="Work" title="Featured Projects" subtitle="Building solutions that matter" />

        <div className="projects-grid">
          {projects.map((project, i) => (
            <article
              className="project-card spotlight tilt reveal"
              key={project.title}
              style={{ "--delay": `${i * 120}ms` }}
            >
              <div className="project-image">
                {project.image ? (
                  <Image src={project.image} alt={project.imageAlt} fill sizes="(max-width: 768px) 100vw, 380px" />
                ) : (
                  <div className="project-placeholder">
                    <i className={project.icon || "fas fa-code"} aria-hidden="true"></i>
                  </div>
                )}
                <span className="project-index">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <div className="project-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-tech">
                  {project.tech.map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>
                <div className="project-actions">
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-action">
                    <i className="fab fa-github"></i> Source Code
                  </a>
                  {project.live && (
                    <a href={project.live} target="_blank" rel="noopener noreferrer" className="project-action">
                      <i className="fas fa-arrow-up-right-from-square"></i> Live Demo
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="view-more">
          <a
            href="https://github.com/DulinaSamarathunga?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
          >
            View All Projects <i className="fas fa-arrow-right"></i>
          </a>
        </div>
      </div>
    </section>
  );
}
