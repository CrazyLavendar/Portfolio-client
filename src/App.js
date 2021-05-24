import React, { useState, useEffect, lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import "./App.scss";
import sharedDataJson from "./portfolio_shared_data.json";
import primaryDataJson from "./res_primaryLanguage.json";

// const Main = lazy(() => import("./Main"));

import { getExperience } from "./functions/experience";
import { getProjects } from "./functions/project";
import { getTechs } from "./functions/techs";

const Header = lazy(() => import("./components/Header"));
const Footer = lazy(() => import("./components/Footer"));
const About = lazy(() => import("./components/About"));
const Experience = lazy(() => import("./components/Experience"));
const Projects = lazy(() => import("./components/Projects"));
const Skills = lazy(() => import("./components/Skills"));

const ExperienceAdmin = lazy(() => import("./admin/Experience"));
const ExperienceCreate = lazy(() => import("./admin/ExperienceCreate"));
const ExperienceUpdate = lazy(() => import("./admin/ExperienceUpdate"));
const ProjectAdmin = lazy(() => import("./admin/Project"));
const ProjectCreate = lazy(() => import("./admin/ProjectCreate"));

const App = () => {
  const [experience, setExperience] = useState([]);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [resumeData, setResumeData] = useState({});
  const [sharedData, setSharedData] = useState({});
  // const [social, setSocial] = useState([]);

  useEffect(() => {
    setResumeData(primaryDataJson);
    setSharedData(sharedDataJson);

    const extractSkills = () =>
      getTechs()
        .then((e) => setSkills(e.data))
        .catch((err) => console.log(err.data));

    const extractExperience = () =>
      getExperience()
        .then((e) => setExperience(e.data))
        .catch((err) => console.log(err.data));

    const extractProjects = () =>
      getProjects()
        .then((e) => setProjects(e.data))
        .catch((err) => console.log(err.data));

    extractExperience();
    extractProjects();
    extractSkills();
  }, []);

  const scrollBelow = () => {
    window.scrollTo(750, 750);
  };

  const Home = () => {
    return (
      <div>
        {" "}
        <Header sharedData={sharedData.basic_info} />
        <div
          onClick={scrollBelow}
          className="col-md-12 mx-auto text-center language"
        >
          <span key="ScrollDown" className="m-2">
            <i
              className="fas fa-angle-double-down"
              style={{ fontSize: "175%" }}
            ></i>
          </span>
        </div>
        <About
          resumeBasicInfo={resumeData.basic_info}
          sharedBasicInfo={sharedData.basic_info}
        />
        <Projects
          resumeProjects={projects}
          resumeBasicInfo={resumeData.basic_info}
        />
        <Skills sharedSkills={skills} resumeBasicInfo={resumeData.basic_info} />
        <Experience
          resumeExperience={experience}
          resumeBasicInfo={resumeData.basic_info}
        />
        <Footer sharedBasicInfo={sharedData.basic_info} />
        <span key="linkedin" className="fixed-bottom">
          <a
            style={{
              fontSize: "165%",
              position: "absolute",
              bottom: "5px",
              right: "5px",
              margin: "5px",
              padding: "0px",
            }}
            href="https://www.linkedin.com/in/jayamvimal/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-linkedin" style={{ fontSize: "200%" }}></i>
          </a>
        </span>{" "}
      </div>
    );
  };

  return (
    <Suspense
      fallback={
        <div className="col text-center p-5">
          __Loading
          <LoadingOutlined />
          Vimal's Site __
        </div>
      }
    >
      <Switch>
        <Route exact path="/" component={Home} />

        <Route exact path="/experience" component={ExperienceAdmin} />
        <Route exact path="/experience/create" component={ExperienceCreate} />
        <Route
          exact
          path="/experience/update/:slug"
          component={ExperienceUpdate}
        />
        <Route exact path="/project" component={ProjectAdmin} />
        <Route exact path="/project/create" component={ProjectCreate} />
      </Switch>
    </Suspense>
  );
};

export default App;
