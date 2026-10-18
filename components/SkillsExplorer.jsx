"use client";

import { useRef, useState } from "react";
import { skillCategories } from "@/lib/data";
import useSlidingIndicator from "@/lib/useSlidingIndicator";

const ALL = "All";

const allSkills = skillCategories.flatMap((category) =>
  category.skills.map((skill) => ({ ...skill, category: category.title }))
);

const tabs = [
  { id: ALL, icon: "fas fa-border-all", count: allSkills.length },
  ...skillCategories.map((c) => ({ id: c.title, icon: c.icon, count: c.skills.length })),
];

export default function SkillsExplorer() {
  const [active, setActive] = useState(ALL);
  const tabsRef = useRef(null);
  const indicatorStyle = useSlidingIndicator(tabsRef, active);

  const visible = active === ALL ? allSkills : allSkills.filter((s) => s.category === active);

  // Arrow-key navigation between tabs (WAI-ARIA tabs pattern)
  const onTabKeyDown = (e) => {
    const i = tabs.findIndex((t) => t.id === active);
    let next = null;
    if (e.key === "ArrowRight") next = (i + 1) % tabs.length;
    if (e.key === "ArrowLeft") next = (i - 1 + tabs.length) % tabs.length;
    if (next === null) return;
    e.preventDefault();
    setActive(tabs[next].id);
    tabsRef.current?.querySelectorAll('[role="tab"]')[next]?.focus();
  };

  return (
    <div className="skills-explorer reveal">
      <div className="skill-tabs-scroller">
        <div className="skill-tabs" role="tablist" aria-label="Skill categories" ref={tabsRef} onKeyDown={onTabKeyDown}>
          <span className="skill-tab-indicator" style={indicatorStyle} aria-hidden="true"></span>
          {tabs.map((tab) => {
            const selected = tab.id === active;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                id={`skill-tab-${tab.id}`}
                aria-selected={selected}
                aria-controls="skills-panel"
                tabIndex={selected ? 0 : -1}
                data-indicator-active={selected ? "true" : undefined}
                className={`skill-tab${selected ? " active" : ""}`}
                onClick={() => setActive(tab.id)}
              >
                <i className={tab.icon}></i>
                {tab.id}
                <span className="skill-tab-count">{tab.count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* `key` remounts the grid so tiles replay their entrance animation on filter change */}
      <div className="skills-tiles" id="skills-panel" role="tabpanel" aria-labelledby={`skill-tab-${active}`} key={active}>
        {visible.map((skill, i) => (
          <div
            className="skill-tile spotlight"
            key={`${skill.category}-${skill.name}`}
            style={{ "--brand": skill.color || "var(--accent)", "--i": i }}
          >
            <div className="skill-tile-icon">
              {skill.image ? (
                <img src={skill.image} alt="" />
              ) : (
                <i className={skill.icon} style={{ color: skill.color }} aria-hidden="true"></i>
              )}
            </div>
            <span className="skill-tile-name">{skill.name}</span>
            {active === ALL && <span className="skill-tile-category">{skill.category}</span>}
          </div>
        ))}
      </div>
    </div>
  );
}
