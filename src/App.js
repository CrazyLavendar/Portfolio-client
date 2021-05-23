import React, { lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";

const Main = lazy(() => import("./Main"));
const Experience = lazy(() => import("./admin/Experience"));
const ExperienceCreate = lazy(() => import("./admin/ExperienceCreate"));
const ExperienceUpdate = lazy(() => import("./admin/ExperienceUpdate"));
const Project = lazy(() => import("./admin/Project"));
const ProjectCreate = lazy(() => import("./admin/ProjectCreate"));

const App = () => {
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
        <Route exact path="/" component={Main} />
        <Route exact path="/experience" component={Experience} />
        <Route exact path="/experience/create" component={ExperienceCreate} />
        <Route
          exact
          path="/experience/update/:slug"
          component={ExperienceUpdate}
        />
        <Route exact path="/project" component={Project} />
        <Route exact path="/project/create" component={ProjectCreate} />
      </Switch>
    </Suspense>
  );
};

export default App;
