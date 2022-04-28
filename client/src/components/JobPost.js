import "./App.css"
import React, {useState} from "react"

function JobPost() {

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

const mapJobs = jobData.map((job, i) => {

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
  )})


}

export default JobPost;
