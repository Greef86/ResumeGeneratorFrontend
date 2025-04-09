import React from "react";
import "./App.css"
import Home from "./Pages/Home";
import WorkExperience from "./Pages/WorkExperience";
import Education from "./Pages/Education";
import Skills from "./Pages/Skills";
import Certifications from "./Pages/Certifications";
import Languages from "./Pages/Languages";
import Links from "./Pages/Links";
import Publications from "./Pages/Publications";
import SubmitForm from "./Pages/SubmitForm";

function App(){

  return(
    <div className="main-container"> 
      <h1 style={{paddingTop: "0.02em", textAlign: "center"}}>Resume Generator</h1>
      <Home/>
      <WorkExperience/>
      <Education/>
      <Skills/>
      <Certifications/>
      <Languages/>
      <Links/>
      <Publications/>
      <SubmitForm/>
    </div>
  )
}

export default App