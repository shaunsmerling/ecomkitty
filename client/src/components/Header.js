import logo from "./bali.svg"
import "./App.css"
import AnimatedInput from "./AnimatedInput.js"
import React from "react"
import {useState} from "react"





function Header() {

  const [searchTerm, setSearchTerm] = React.useState("")

  const [jobData, setJobData] = React.useState([])



  React.useEffect(() => {
    fetch("http://localhost:4567/jobs")
      .then(res => res.json())
      .then(data => setJobData(data))
  },)

  function giveInitials(job) {
    if (job.image_link === "") {
      const letter = job.title.charAt(0)
      return <div className="noimage"><p>{letter}</p></div>
    } else {
      return <img alt=""src={job.image_link} className="jobinfo-img"/>
    }

  }

  return (
      <header className="header">
        <div className="jobpost">
        <button className="postbutton"><strong>Post A Job</strong></button>
        </div>
        <div className="searchjob">
        <button className="searchcobtn"><strong>Search company</strong></button>
        </div>
      <div className="logocontainer">
      <img src={logo} className="logo"/>
       </div>
       <div class="box">
       <AnimatedInput  
       name="AnimatedInput" 
       className="searchbar" 
       type="search" 
       placeholder="Facebook Media Buyer" 
       onChange={(event) => {
         setSearchTerm(event.target.value);
       }}
        />
        {jobData.filter((job) => {
          if (job.title.toLowerCase().includes(searchTerm.toLowerCase())) {
            return job
          } else {
            return job;
          }
        }).map((job, i) => {

          return (
           <span key={i} id="jobcontainer" className="jobcontainer">
                {giveInitials(job)}
                 <p  className="jobinfo-company">{job.company}</p>
                 <p className="jobinfo-title">{job.title}</p>
                 <p className="jobinfo-salary">{job.salary}</p>
                 <button onClick={(e) => {
               e.preventDefault();
               window.location.href=job.job_link;
               }}className="postbuttonjobs">Apply</button>
           </span>
           )})}
       </div>
    </header>
  );


}

export default Header;
