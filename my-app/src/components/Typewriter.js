
import "./App.css"


export default function typeWriter(props) {
const display = document.getElementsByClassName("searchbox")
const jobs = ["Facebook Media Buyer", "Google Media Buyer", "Email Marketer", "UGC Content Creator", "Video Editor"]
let i = 0
let j = 0
let newJobs = []
let isDeleting = false; 
function loop() {

display.setAttribute("placeholder", newJobs.join(''))

  if (i < jobs.length) {
    
    if (!isDeleting && j <= jobs[i].length) {
      newJobs.push(jobs[i][j])

      j++
    }

    if (isDeleting && j  <= jobs[i].length) {
      newJobs.pop(jobs[i][j])
      j--

    }


    if (j == jobs[i].length) {
      isDeleting = true; 
    }

    if (isDeleting && j == 0) {
      newJobs = []
      isDeleting = false; 
      i++ 

    }

  }
  setTimeout(loop, 100)
}
loop()
}

typeWriter()