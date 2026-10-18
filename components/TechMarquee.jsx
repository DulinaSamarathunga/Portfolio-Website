import { skillCategories } from "@/lib/data";

const skills = skillCategories.flatMap((category) => category.skills);

function TechItem({ skill }) {
  return (
    <li className="marquee-item">
      {skill.image ? (
        <img src={skill.image} alt="" />
      ) : (
        <i className={skill.icon} style={{ color: skill.color }} aria-hidden="true"></i>
      )}
      <span>{skill.name}</span>
    </li>
  );
}

// Infinite horizontally scrolling strip of the tech stack.
// The list is rendered twice so the CSS animation can loop seamlessly.
export default function TechMarquee() {
  return (
    <div className="tech-marquee" aria-label="Tech stack">
      <div className="marquee-track">
        <ul className="marquee-group">
          {skills.map((skill) => (
            <TechItem key={skill.name} skill={skill} />
          ))}
        </ul>
        <ul className="marquee-group" aria-hidden="true">
          {skills.map((skill) => (
            <TechItem key={skill.name} skill={skill} />
          ))}
        </ul>
      </div>
    </div>
  );
}
