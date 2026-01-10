import React from "react";
import '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo } from '@fortawesome/free-solid-svg-icons';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import '../assets/styles/Timeline.scss'
import AE from "./AE.png";
import PS from "./PS.png";
import DA from "./DA.png";
import AI from "./AI.png";
import PR from "./PR.png";
import CC from "./CC.png";
import CV from "./CV.png";
function Timeline() {
  return (
    <div id="history">
      <div className="items-container">
        <h1>Career History</h1>
        <VerticalTimeline>
           <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: 'white', color: 'rgb(39, 40, 34)' }}
            contentArrowStyle={{ borderRight: '7px solid  white' }}
            date="August 2025 - Present"
            iconStyle={{ background: '#c953f8', color: 'rgb(39, 40, 34)' }}
            icon={<FontAwesomeIcon icon={faVideo} />}
          >
            <h3 className="vertical-timeline-element-title">Filmy Curry</h3>
            <h4 className="vertical-timeline-element-subtitle">Video Editor/Motion Graphics Intern | Remote</h4>
            <p>
  🗂️<strong>Tech Stack:</strong>
  <span style={{ display: 'flex', gap: '10px', marginLeft: '10px' }}>
    <img src={AE} alt="After Effects" title="After Effects" style={{ width: '24px', height: '24px' }} />
    <img src={CC} alt="CapCut" title="CapCut" style={{ width: '24px', height: '24px' }} />
    <img src={PR} alt="Premiere Pro" title="Premiere Pro" style={{ width: '24px', height: '24px' }} />
    <img src={CV} alt="Canva" title="Canva" style={{ width: '24px', height: '24px' }} />

  </span>
</p>

<ul>
  <li>Skilled in <strong>video editing</strong> to create polished and engaging content.</li>
  <li>Experienced in <strong>graphic designing</strong> and motion graphics for social media.</li>
  <li>Consistently <strong>meeting deadlines</strong> while managing multiple projects and content posts.</li>
</ul>

          </VerticalTimelineElement>
          
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: 'white', color: 'rgb(39, 40, 34)' }}
            contentArrowStyle={{ borderRight: '7px solid  white' }}
            date="August 2025 - Present"
            iconStyle={{ background: '#c953f8', color: 'rgb(39, 40, 34)' }}
            icon={<FontAwesomeIcon icon={faVideo} />}
          >
            <h3 className="vertical-timeline-element-title">Techbrosky</h3>
            <h4 className="vertical-timeline-element-subtitle">Video/GFX Intern | Remote</h4>
            <p>
  🗂️<strong>Tech Stack:</strong>
  <span style={{ display: 'flex', gap: '10px', marginLeft: '10px' }}>
    <img src={AE} alt="After Effects" title="After Effects" style={{ width: '24px', height: '24px' }} />
    <img src={CC} alt="CapCut" title="CapCut" style={{ width: '24px', height: '24px' }} />
    <img src={PR} alt="Premiere Pro" title="Premiere Pro" style={{ width: '24px', height: '24px' }} />
    <img src={CV} alt="Canva" title="Canva" style={{ width: '24px', height: '24px' }} />

  </span>
</p>

<ul>
  <li>Skilled in <strong>video editing</strong> to create polished and engaging content.</li>
  <li>Experienced in <strong>graphic designing</strong> and motion graphics for social media.</li>
  <li>Consistently <strong>meeting deadlines</strong> while managing multiple projects and content posts.</li>
</ul>

          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date="August 2025 - Present"
            iconStyle={{ background: '#c953f8', color: 'rgb(39, 40, 34)' }}
            icon={<FontAwesomeIcon icon={faVideo} />}
          >
            <h3 className="vertical-timeline-element-title">AbhiVyakti</h3>
            <h4 className="vertical-timeline-element-subtitle">Video Editing Intern | Remote</h4>
         <p>
  🗂️<strong>Tech Stack:</strong>
  <span style={{ display: 'flex', gap: '10px', alignItems: 'center', marginTop: '5px' }}>
    <img src={AE} alt="After Effects" title="After Effects" style={{ width: '24px', height: '24px' }} />
    <img src={CC} alt="CapCut" title="CapCut" style={{ width: '24px', height: '24px' }} />
    <img src={PR} alt="Premiere Pro" title="Premiere Pro" style={{ width: '24px', height: '24px' }} />
  </span>
</p>

<ul>
  <li>Created engaging <strong>motion graphics</strong> to enhance visual storytelling across platforms.</li>
  <li>Produced and edited <strong>BTS videos</strong> capturing behind-the-scenes moments for promotional content.</li>
  <li>Designed and optimized content for <strong>social media posts</strong>, driving audience engagement.</li>
</ul>

          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date="August 2025 - Present"
            iconStyle={{ background: '#c953f8', color: 'rgb(39, 40, 34)' }}
            icon={<FontAwesomeIcon icon={faVideo} />}
          >
            <h3 className="vertical-timeline-element-title">Itrawala</h3>
            <h4 className="vertical-timeline-element-subtitle">Video Editing Intern | Remote</h4>
            <p>
  <strong>🗂️ Tech Stack:</strong>
  <span style={{ display: 'flex', gap: '10px', alignItems: 'center', marginTop: '5px' }}>
    <img src={CV} alt="Canva" title="Canva" style={{ width: '24px', height: '24px' }} />
    <img src={AE} alt="After Effects" title="After Effects" style={{ width: '24px', height: '24px' }} />
    <img src={CC} alt="CapCut" title="CapCut" style={{ width: '24px', height: '24px' }} />
    <img src={PR} alt="Premiere Pro" title="Premiere Pro" style={{ width: '24px', height: '24px' }} />
  </span>
</p>

<ul>
  <li> Produced engaging <strong>motion graphics</strong> using After Effects and Canva to enhance visual storytelling.</li>
  <li> Edited <strong>talking head videos</strong> with clean cuts, synced audio, and subtitles for social media content.</li>
  <li> Created and edited <strong>BTS content, reels, and promotional videos</strong> tailored for platforms like TikTok and Instagram.</li>
</ul>


          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date="February 2025 - March 2025"
            iconStyle={{ background: '#c953f8', color: 'rgb(39, 40, 34)' }}
            icon={<FontAwesomeIcon icon={faVideo} />}
          >
            <h3 className="vertical-timeline-element-title">Gurucool</h3>
            <h4 className="vertical-timeline-element-subtitle">GFX intern | Remote</h4>
            <p>

    🗂️<strong>Tech Stack:</strong> 
    <span style={{  display: 'flex', gap: '10px', alignItems: 'center', marginTop: '5px'  }}>
      <img src={CV} alt="Canva" title="Canva" style={{ width: '24px', height: '24px' }} />
      <img src={AE} alt="After Effects" title="After Effects" style={{ width: '24px', height: '24px' }} />
    </span>
  
  <ul>
    <li>Designed social media creatives using <strong>Canva</strong> and <strong>Adobe After Effects</strong>.</li>
    <li>Created engaging content for <strong>Instagram stories/posts</strong> and <strong>WhatsApp ads</strong>.</li>
    <li>Delivered <strong>high-quality designs</strong> that aligned with the brand’s visual identity in a remote work environment.</li>
  </ul>
</p>

          </VerticalTimelineElement>
          
        </VerticalTimeline>
      </div>
    </div>
  );
}

export default Timeline;