import React from "react";
import { ArrowRight } from "lucide-react";
import "./ProjectSection.css";

import longform from "./longform.png";
import shortform from "./shortform.png";
import gfx from "./gfx.png";
import motionImg from "./motion.png";

const projects = [
  {
    title: "🎬 Long-form Video",
    subtitle: "Storytelling that lasts.",
    image: longform,
    link: "/longform",
  },
  {
    title: "✨ Motion Graphics",
    subtitle: "Dynamic visual magic.",
    image: motionImg,
    link: "/motiongraphics",
  },
  {
    title: "📱 Short-form Video",
    subtitle: "Quick. Catchy. Viral.",
    image: shortform,
    link: "/shortform",
  },
  {
    title: "🎨 GFX Design",
    subtitle: "Visuals that pop.",
    image: gfx,
    link: "/gfx",
  },
];

const ProjectSection: React.FC = () => {
  return (
    <section id="project-module">
      {/* TITLE + GHOST */}
     <div className="title-container">
  <h2 className="ghost-title">Crafting Stories, Frame by Frame</h2>

  <div className="ghost">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
</div>

      <div className="project-blocks">
        {projects.map((proj, idx) => (
          <div className="project-block" key={idx}>
            <img src={proj.image} alt={proj.title} />
            <div className="project-content">
              <span className="project-title">
                {proj.title} <br />
                <small>{proj.subtitle}</small>
              </span>
              <a href={proj.link}>
                
                <ArrowRight size={24} color="#ffffffff" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProjectSection;
