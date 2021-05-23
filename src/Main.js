import React, { useState, useEffect, lazy, Suspense } from "react";
import $ from "jquery";
import { LoadingOutlined } from "@ant-design/icons";
import "./Main.scss";

import { getExperience } from "./functions/experience";
import { getProjects } from "./functions/project";
import { getTechs } from "./functions/techs";

const Header = lazy(() => import("./components/Header"));
const Footer = lazy(() => import("./components/Footer"));
const About = lazy(() => import("./components/About"));
const Experience = lazy(() => import("./components/Experience"));
const Projects = lazy(() => import("./components/Projects"));
const Skills = lazy(() => import("./components/Skills"));

const Main = () => {
  const [experience, setExperience] = useState([]);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [resumeData, setResumeData] = useState({});
  const [sharedData, setSharedData] = useState({});
  const [social, setSocial] = useState([]);

  useEffect(() => {
    componentDidMount();
    extractExperience();
    extractProjects();
    extractSkills();
    loadSocialNetwork();
  }, []);

  const extractExperience = () =>
    getExperience()
      .then((e) => setExperience(e.data))
      .catch((err) => console.log(err.data));

  const extractProjects = () =>
    getProjects()
      .then((e) => setProjects(e.data))
      .catch((err) => console.log(err.data));

  const extractSkills = () =>
    getTechs()
      .then((e) => setSkills(e.data))
      .catch((err) => console.log(err.data));

  const applyPickedLanguage = (pickedLanguage) => {
    document.documentElement.lang = pickedLanguage;
    var resumePath = `res_primaryLanguage.json`;
    loadResumeFromPath(resumePath);
  };

  const componentDidMount = () => {
    loadSharedData();
    applyPickedLanguage(window.$primaryLanguage);
  };

  const loadResumeFromPath = (path) => {
    $.ajax({
      url: path,
      dataType: "json",
      cache: false,
      success: function (data) {
        //setState({ setResumeData: data });
        setResumeData(data);
      },
      error: function (xhr, status, err) {
        alert(err);
      },
    });
  };

  const loadSharedData = () => {
    $.ajax({
      url: `portfolio_shared_data.json`,
      dataType: "json",
      cache: false,
      success: function (data) {
        // setState({ setSharedData: data });
        setSharedData(data);
        // document.title = `Document Title`;
      },
      error: function (xhr, status, err) {
        alert(err);
      },
    });
  };

  const loadSocialNetwork = () => {
    setSocial(sharedData.basic_info);
    console.log(social);
  };

  const scrollBelow = () => {
    window.scrollTo(750, 750);
    // document.getElementById("scroller").scroll(0, 0);
  };
  return (
    <Suspense
      fallback={
        <div className="col text-center p-5">
          __ Loading
          <LoadingOutlined />
          Vimal's Site__
        </div>
      }
    >
      <Header sharedData={sharedData.basic_info} />

      <div
        onClick={scrollBelow}
        className="col-md-12 mx-auto text-center language"
      >
        <span key="ScrollDown" className="m-2">
          <a target="_blank" rel="noopener noreferrer">
            <i
              className="fas fa-angle-double-down"
              style={{ fontSize: "175%" }}
            ></i>
          </a>
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
      </span>
    </Suspense>
  );
};

export default Main;
