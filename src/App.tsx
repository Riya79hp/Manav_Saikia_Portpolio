import React, { useState, useEffect } from "react";
import {
  Main,
  Timeline,
  Expertise,
  Project,
  Contact,
  Navigation,
  Footer,
  NotFoundPage,
  Motion_Graphics,
  Longform_component,
  Shortform_Component,
  Gfx_Component,
} from "./components";
import FadeIn from './components/FadeIn';
import './index.scss';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function HomePage() {
  
  return (
    <>
      <FadeIn transitionDuration={700}>
        <Main />
        <Expertise />
        <Timeline />
        <Contact />
      </FadeIn>
      <Footer />
    </>
  );
}
function ProjectsPageWrapper({ mode }: { mode: string }) {
  return <ProjectsPage mode={mode} />;
}


function ProjectsPage({ mode }: { mode: string }) {
  return (
    <>
      <Project  />
      <Footer />
    </>
  );
}

function App() {
  const [mode, setMode] = useState<string>('dark');

  const handleModeChange = () => {
    setMode((prevMode) => (prevMode === 'dark' ? 'light' : 'dark'));
  };

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);

  return (
    // ✅ Wrap everything inside <Router>
    <Router>
      <div className={`main-container ${mode === 'dark' ? 'dark-mode' : 'light-mode'}`}>
        {/* ✅ Navigation is inside Router now */}
        <Navigation parentToChild={{ mode }} modeChange={handleModeChange} />
        
        <Routes>
          <Route path="/" element={<HomePage />} />
         <Route
  path="/projects"
  element={<ProjectsPage mode={mode} />}
/>

          <Route path="*" element={<NotFoundPage />} />
          <Route path="/longform" element={<Longform_component/>}></Route>
          <Route path="/motiongraphics" element={<Motion_Graphics/>}></Route>
          <Route path="/shortform" element={<Shortform_Component/>}></Route>
          <Route path="/gfx" element={<Gfx_Component/>}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
