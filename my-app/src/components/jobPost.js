import "./App.css"
import Google from "./companyimg/google.png"

function jobPost() {
  return (
  <div className="jobcontainer">
    <div className="jobinfo-logo">
    <img src={Google} className="imgcompany"/>
    </div>
    <div className="jobinfo-company">
        <h3>Google Inc. </h3>
        {/* <p>PPC Specalist</p> */}
    </div>
    <div className="jobinfo-summary">
        <p>Klaviyo Expert</p>
        <p>Copywriter</p>
   </div>
   <div className="jobinfo-salary">
        <span>💰 </span>
        <p> $80,000/year</p>
    </div>
   <div className="jobinfo-location">
        <span> 🌎 </span>
        <p> Worldwide </p>
    </div>
  </div>
  

  ); 
}

export default jobPost;
