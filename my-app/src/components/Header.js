import logo from "./bali.svg"
import "./App.css"
import AnimatedInput from "../components/AnimatedInput.js"



function Header() {

  /*Define your texts in an array*/
var placeholders = ['Facebook Media Buyer','PPC Specialist','Email Marketer'];
var length  = placeholders.length;
var counter = 0;
/*Store the object to a variable*/
var inquire = document.getElementsByTagName("AnimatedInput");

function ChangePlaceholder(){
  /*Compare with placeholders length*/
  if(counter>=length){
    counter=0;
  }
 /*Update placeholder text*/
 inquire.setAttribute('placeholder',placeholders[counter]);
 /*Update counter as Index*/
 counter++;
}
/*Call ChangePlaceholder() function after 1 seconds, [1000 millisecond = 1 second]*/
setInterval(ChangePlaceholder,1000);

  return (
      <header className="header">
        <div className="jobpost">
        <button className="postbutton"><strong>Post A Job</strong></button>
        </div>
      <div className="logocontainer">
      <img src={logo} className="logo"/>
       </div>
       <div class="box">
       <AnimatedInput  className="searchbar" type="search" placeholder="Facebook Media Buyer"/>
       </div>
    </header>
  );


}

export default Header;
