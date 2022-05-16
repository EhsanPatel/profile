// Ehsan Patel 2022
// Profile Website Project



// Speed scaling for all attributes
const SPEED_SCALE = 0.8;

//map properties
var zoom = 1.0;
var scale = 10;


// Car Properties
const FIXED_ROTATION = 0;
const ACCEL_SPEED = 0.02;
const ACCEL_MAX = 15;

// positioning
var accel = 0;
var turnAccelR = 0;
var turnAccelL = 0;
var forwardX = 0;
var forwardY = 0;
var rotation = 0;

// inputs
var forward = false;
var back = false;
var left = false;
var right = false;

// window behaviour
popupSize = 26

// actions when car drives over the roads
class TriggerZone {
  constructor(order, x, y, width, height, side, action, ...args) {
    this.order = order;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.action = action;
    this.inZone = false;
    this.args = args;
    this.side = side;
  }

  getPopupSide(){
    return this.side;
  }
  
  zoneAction() {
    this.action(this.args, arguments);
  }

  checkInZone(carX, carY) {
    return (carX >= this.x && carX <= this.x + this.width && 
            carY >= this.y && carY <= this.y + this.height);
  }
}

// For Fast-Travel to zones
const zones = [{name:'Welcome', x:4087, y:-1902, r:0},
               {name:'About', x:2764, y:360, r:0},
               {name:'Education', x:2457, y:2522, r:-90},
               {name:'Experience', x:-781, y:3708, r:-90},
               {name:'Languages', x:-2163, y:2732, r:180},
               {name:'Tools', x:-3464, y:281, r:180},
               {name:'Skills', x:-3464, y:-1824, r:180},
               {name:'Extra-Curriculars', x:-2538, y:-3718, r:90},
               {name:'Hobbies', x:-1438, y:-2723, r:50},
               {name:'Resume', x:967, y:-882, r:180},
               {name:'Contact', x:2467, y:-3138, r:90}]

// adds key listeners
keyDown();
keyUp();


function showPopup(zone){
  if (zone.getPopupSide() === 'right'){
    $("#panel-container").css("right", "0");
    $("#panel-container").css("left", "");
  }else {
    $("#panel-container").css("left", "0");
    $("#panel-container").css("right", "");
  }
  
  $("#panel-container").css("display", "flex");
  $("#panel-container").animate({width: popupSize + "vw"}, 200 );
}

function closePopup(){
  $("#panel-container").animate({width: 0}, 200 );
  setTimeout(function () {$("#panel-container").css("display", "none")}, 200);
  $('nav').show(100);
}


let infoPopup = function(args){
  $("#panel-title").html(args[0]);
  $("#panel-content").html(args[1]);
}

let home = new TriggerZone(0, 3950, -2750, 400, 1000, 'right', infoPopup, "Ehsan Patel", 
 `<b class='terminal-open'>&gt;</b> <b class='terminal-command'>Welcome to my interactive portfolio!</b>
  <br><br>
  <b class='terminal-comment'>// Explore my projects and experience by driving along the track.</b>
  <br><br>
  <b class='terminal-open'>&gt;</b> <b class='terminal-command'>Use the arrow keys to navigate</b>
  <br><br>
  <b class='terminal-comment'>// Approach the computer chips to learn more.</b>
  <br><br>
  <b class='terminal-open'>&gt;</b> <b class='terminal-command'>Try using z to zoom in, and x to zoom out</b>
  <br><br>
  <b class='terminal-comment'>// For the best experience, viewing on a computer is recommended over mobile devices for full functionality</b>
  <br><br>`);

let bio = new TriggerZone(1, 2500, 0, 400, 1000, 'left', infoPopup, "Hi, I'm Ehsan 👋", 
 `<b class='terminal-open'>&gt;</b> <b class='terminal-command'>Student software developer</b>
  <br><br>
  <b class='terminal-open'>&gt;</b> <b class='terminal-command'>Owner of <span style='color:#e41111;'>Echo Web Design</span></b>
  <br><br>
  <b class='terminal-comment'>// <a style="cursor:pointer;text-decoration:underline;" onclick="teleport(3)">Learn more</a> about my experience from this venture</b>
  <br><br>
  <b class='terminal-open'>&gt;</b> <b class='terminal-command'>Co-Founder of <span style='color:#CE9FFC;'>Startup</span> <span style='color:#F48411;'>Engine</span></b>
  <br><br>
  <b class='terminal-comment'>// <a target="blank" href="https://thestartup.app">Coming Soon!</a> Stay tuned for updates</b>
  <br><br>
  <b class='terminal-open'>&gt;</b> <b class='terminal-command'>Former Chief (WO1) & Royal Canadian Air Cadet at 121 Red Arrows ✈️</b>
  <br><br>
  <b class='terminal-comment'>// <a target="blank" href="https://121redarrows.ca">Learn more</a> about the program</b>
  <br><br>`);

let education = new TriggerZone(2, 1500, 2350, 2000, 400, 'right', infoPopup, "Education 📖",
 `<b class='terminal-open'>&gt;</b> <b class='terminal-command'>Double Degree Student (2A)</b>
  <br><br>
  <b class='terminal-open'>&gt;</b> <b class='terminal-command' style='color:#e41111;'><a target="blank" href="https://uwaterloo.ca/future-students/programs/business-administration-computer-science-double-degree">University of Waterloo</a></b>
  <br><br>
  <b class='terminal-comment'>// Bachelor of Computer Science (BCS)</b>
  <br><br>
  <b class='terminal-open'>&gt;</b> <b class='terminal-command' style='color:#9a50f6;'><a target="blank" href="https://www.wlu.ca/programs/business-and-economics/undergraduate/business-bba-and-computer-science-bcs-uw/index.html">Wilfrid Laurier University</a></b>
  <br><br>
  <b class='terminal-comment'>// Bachelor of Business Administration (BBA)</b>
  <br><br>
  <b class='terminal-open'>&gt;</b> <b class='terminal-command'>Current Classes</b>
  <br><br>
  <b class='terminal-comment'>// Intermediate Macroeconomic Analysis for Management (EC250)</b>
  <br><br>
  <b class='terminal-comment'>// Intermediate Microeconomic Analysis for Management (EC260)</b>
  <b class='terminal-open'>
  <br><br>`);

let projects = new TriggerZone(3, -1750, 3600, 2200, 400, 'left', infoPopup, "Experience", 
 `<b class='terminal-open'>&gt;</b> <b class='terminal-command' style='color:#e41111;'>Work Experience</b>
  <br><br>
  <b class='terminal-open'>&gt;</b> <b class='terminal-command'>Echo Web Design<br><span style="color:#9a50f6">(Lead Frontend Developer)</span></b>
  <br><br>
  <b class='terminal-comment'>// Integrated UGC system for multinational client with syndication to parent brand</b>
  <br><br>
  <b class='terminal-comment'>// Implemented design changes through HTML, CSS and JQuery on the Commercebuild Platform</b>
  <br><br>
  <b class='terminal-comment'>// Harnessed SEO practices to boost performance and used the Google Marketing Platform to track and visualize results for stakeholders</b>
  <br><br>
  <b class='terminal-comment'>// Wrote software in Python to automate XML product feed generation</b>
  <br><br>
  <b class='terminal-open'>&gt;</b> <b class='terminal-command'>The Aberfoyle Mill<br><span style="color:#9a50f6">(Busser, Server, Bartender)</span></b>
  <br><br>
  <b class='terminal-comment'>// Worked on a team to deliver a high quality dining experience, through effective communication with customers and staff</b>
  <br><br>
  <b class='terminal-comment'>// Prepared venue for weddings, leading rearrangements for occupancies exceeding 100 guests</b>
  <br><br>
  <b class='terminal-open'>&gt;</b> <b class='terminal-command'>The Great Wall Restaurant<br><span style="color:#9a50f6">(Takeout Fulfillment)</span></b>
  <br><br>
  <b class='terminal-comment'>// Created website and connected Google Analytics to better forecast and prepare for customers</b>
  <br><br>
  <b class='terminal-comment'>// Prepared food for kitchen staff, ensuring optimal inventory levels</b>
  <br><br>`);

let languages = new TriggerZone(4, -2350, 1900, 400, 1600, 'left', infoPopup, "Programming Knowledge 💻", 
 `<b class='terminal-open'>&gt;</b> <b class='terminal-command' style='color:#e41111;'>Project Experience</b>
  <br>
  <b class='terminal-comment'>// <a target="blank" href="https://profile.echoweb.ca/portfolio">View Projects</a></b>
  <br><br>
  <b class='terminal-open'>&gt;</b> <b class='terminal-command' style='color:#e41111;'>Primary Languages</b>
  <br>
  <b class='terminal-open'>&gt;</b> <b class='terminal-command'>Python</b>
  <br>
  <b class='terminal-comment'>// Flask</b>
  <br>
  <b class='terminal-comment'>// Pygame</b>
  <br><br>
  <b class='terminal-open'>&gt;</b> <b class='terminal-command'>JavaScript</b>
  <br>
  <b class='terminal-comment'>// jQuery</b>
  <br>
  <b class='terminal-comment'>// React Native + JSX</b>
  <br><br>
  <b class='terminal-open'>&gt;</b> <b class='terminal-command'>Java</b>
  <br>
  <b class='terminal-comment'>// Object Oriented Programming</b>
  <br>
  <b class='terminal-comment'>// Java2D</b>
  <br>
  <b class='terminal-comment'>// Processing + Android</b>
  <br><br>
  <b class='terminal-open'>&gt;</b> <b class='terminal-command'>C</b>
  <br>
  <b class='terminal-comment'>// Data Structures</b>
  <br>
  <b class='terminal-comment'>// Algorithm Design</b>
  <br><br>
  <b class='terminal-open'>&gt;</b> <b class='terminal-command'>Racket</b>
  <br>
  <b class='terminal-comment'>// Functional Programming</b>
  <br>
  <b class='terminal-comment'>// Recursive Design</b>
  <br><br>
  <b class='terminal-open'>&gt;</b> <b class='terminal-command'>SQL</b>
  <br><br>
  <b class='terminal-open'>&gt;</b> <b class='terminal-command'>XML</b>
  <br><br>
  <b class='terminal-open'>&gt;</b> <b class='terminal-command'>HTML, CSS</b>
  <br><br>
  <b class='terminal-open'>&gt;</b> <b class='terminal-command'>Lua</b>
  <br>
  <b class='terminal-comment'>// Love2D Game Engine</b>
  <br><br>`);

let techStack = new TriggerZone(5, -3650, -500, 400, 1500, 'right', infoPopup, "Key Tools ⚒️", 
 `<b class='terminal-open'>&gt;</b> <b class='terminal-command' style='color:#e41111;'>Design:</b>
  <br>
  <b class='terminal-comment'>// Figma Graphic Design</b>
  <br>
  <b class='terminal-comment'>// Pixlr Photo Editing</b>
  <br><br>
  <b class='terminal-open'>&gt;</b> <b class='terminal-command' style='color:#e41111;'>Development</b>
  <br>
  <b class='terminal-comment'>// Sublime Text</b>
  <br>
  <b class='terminal-comment'>// Command Line (Windows + Linux)</b>
  <br><br>
  <b class='terminal-open'>&gt;</b> <b class='terminal-command' style='color:#e41111;'>Analysis + Reports</b>
  <br>
  <b class='terminal-comment'>// Microsoft Office Suite</b>
  <br>
  <b class='terminal-comment'>// Google Analytics, Data Studio, Search Console, My Business</b>
  <br><br>
  <b class='terminal-open'>&gt;</b> <b class='terminal-command' style='color:#e41111;'>Web Hosting</b>
  <br>
  <b class='terminal-comment'>// <a target="blank" href="https://www.pythonanywhere.com">Linux Cloud Hosting</a></b>
  <br>
  <b class='terminal-comment'>// <a target="blank" href="https://domains.google.com/registrar/">Domain Management Systems</a></b>  
  <br><br>`);

let skills = new TriggerZone(6, -3650, -2500, 400, 1500, 'left', infoPopup, "Transferable Skills ", 
 `<b class='terminal-open'>&gt;</b> <b class='terminal-command'>Harnessing <span style="color:#4285f4">G</span><span style="color:#ea4335">o</span><span style="color:#fbbc05">o</span><span style="color:#4285f4">g</span><span style="color:#34a853">l</span><span style="color:#ea4335">e</span></b>
  <br>
  <b class='terminal-comment'>// Finding information in documentation</b>
  <br>
  <b class='terminal-comment'>// Applying related programming concepts from <span style="color:#F2740D">Stack Overflow</span></b>
  <br><br>
  <b class='terminal-open'>&gt;</b> <b class='terminal-command'>Public Speaking</b>
  <br>
  <b class='terminal-comment'>// Instructor of aviation, drill, and speaking</b>
  <br>
  <b class='terminal-comment'>// Regional oratorical competitor</b>
  <br><br>
  <b class='terminal-open'>&gt;</b> <b class='terminal-command'>Leadership</b>
  <br>
  <b class='terminal-comment'>// Chief (WO1) at 121 Red Arrows, managing <span style="color:#ea4335">100+</span> cadets online during pandemic</b>
  <br><br>
  <b class='terminal-open'>&gt;</b> <b class='terminal-command'>Team Player</b>
  <br>
  <b class='terminal-comment'>// Provincial marksman & biathlete (Team & Individual)</b>
  <br>
  <b class='terminal-comment'>// Competed on curling team throughout highschool</b>
  <br><br>`);

let extracurriculars = new TriggerZone(7, -3650, -4000, 1400, 1200, 'left', infoPopup, "Extra-Curriculars", 
 `<b class='terminal-open'>&gt;</b> <b class='terminal-command' style='color:#9a50f6;'>University</b>
  <br>
  <b class='terminal-comment'>// Startup Projects - Networking with other University Incubators</b>
  <br><br>
  <b class='terminal-open'>&gt;</b> <b class='terminal-command'>Air Cadets</b>
  <br>
  <b class='terminal-comment'>// Volunteering with the Royal Canadian Legion</b>
  <br>
  <b class='terminal-comment'>// Ground School Member</b>
  <br>
  <b class='terminal-comment'>// National Summer Training Scholarship Course Recipient</b>
  <br><br>
  <b class='terminal-open'>&gt;</b> <b class='terminal-command' style='color:#e41111;'>High-School</b>
  <br>
  <b class='terminal-comment'>// SHSM Robotics Demonstrations</b>
  <br>
  <b class='terminal-comment'>// Math Tutoring</b>
  <br>
  <b class='terminal-comment'>// Curling</b>
  <br>
  <b class='terminal-comment'>// DECA</b>
  <br><br>`);

let hobbies = new TriggerZone(8, -1750, -3450, 1200, 1200, 'right', infoPopup, "My Hobbies", 
 `<b class='terminal-open'>&gt;</b> <b class='terminal-command' style='color:#e41111;'>Music</b>
  <br>
  <b class='terminal-comment'>// Guitar - Self Taught</b>
  <br>
  <b class='terminal-comment'>// Piano - Currently Learning</b>
  <br><br>
  <b class='terminal-open'>&gt;</b> <b class='terminal-command'>Soccer</b>
  <br><br>
  <b class='terminal-open'>&gt;</b> <b class='terminal-command' style='color:#42E857;'>Team Gaming</b>
  <br><br>
  <b class='terminal-open'>&gt;</b> <b class='terminal-command'>Unicycling & Biking</b>
  <br><br>`);

let resume = new TriggerZone(9, -450, -1450, 1700, 1450, 'left', infoPopup, "My Resume 📄",
 `<b class='terminal-open'>&gt;</b> <b class='terminal-command'><a href="Ehsan Patel Resume.docx" download>Download Resume</a></b>
  <br><br>
  <b class='terminal-comment'>// I am always open to new opportunities! I am currently seeking co-op positions for Summer 2022, and Winter 2022</b>
  <br><br>`);

let social = new TriggerZone(10, 1550, -3450, 1800, 500, 'left', infoPopup, "Lets Connect!", 
 `<b class='terminal-open'>&gt;</b> <b class='terminal-command' style='color:#e41111;'>The Essentials:</b>
  <br><br>
  <b class='terminal-comment'>// Email: ehsanpatel@echoweb.ca</b>
  <br>
  <b class='terminal-comment'>// Phone: (226)-962-1750</b>
  <br><br><br>
  <b class='terminal-open'>&gt;</b> <b class='terminal-command'><a target="blank" href="https://github.com/EhsanPatel">View my GitHub</a></b>
  <br><br>
  <b class='terminal-open'>&gt;</b> <b class='terminal-command'><a target="blank" href="https://www.linkedin.com/in/ehsan-patel/">Connect on LinkedIn</a></b>
  <br><br>
  <b class='terminal-open'>&gt;</b> <b class='terminal-command'><a target="blank" href="https://join.skype.com/invite/lJSu77C3gqDt">Chat virtually on Skype</a></b>
  <br><br>
  <b class='terminal-open'>&gt;</b> <b class='terminal-command'><a target="blank" href="https://profile.echoweb.ca/contact">Visit my contact page</a></b>
  <br><br>`);

let triggerZones = [];
let inZone = [];





window.onload = (event) => {
  goTo(4087, -1902, 0);
  triggerZones = [home, bio, education, projects, languages, techStack, skills, extracurriculars, hobbies, resume, social];
  for (var i = 0; i < triggerZones.length; ++i) {
    inZone.push(false);
  }

  // Slider controls
  var elem = document.querySelector('input[type="range"]');
      
  var rangeValue = function(){
    var newValue = elem.value;
    var target = document.querySelector('#value');
    target.innerHTML = zones[newValue].name;
    
    teleport(newValue);
  }
      
  elem.addEventListener("input", rangeValue);
};





// Main Loop

setInterval(function () {
  mapMove(0)
  speedUpdate();

  document.getElementById("x-pos").innerHTML = "X: " + Math.round(forwardX);
  document.getElementById("y-pos").innerHTML = "Y: " + Math.round(forwardY);
  document.getElementById("rotation").innerHTML = "R: " + Math.round(rotation);
  
  //when right is true, the turn accelerates
  if (right === true){
    if (turnAccelR < 5){      
      turnAccelR += 0.8;
    }
    //rotates by turn acceleration
    rotation -= 0.6 * turnAccelR;
  } else {
    turnAccelR = 0;
  }
  
  //when left is true, the turn accelerates
  if (left === true){
    if (turnAccelL < 5){
      turnAccelL += 0.8;
    }
    //rotates by turn acceleration
    rotation += SPEED_SCALE * 0.6 * turnAccelL;
  } else {
    turnAccelL = 0;
  }
  
  //if the player goes forwards
  if (forward === true){
    //while the acceleration is not at the max, it can accelerate
    if (accel < ACCEL_MAX){
      accel++;
    }
  //decelerate if the player is not going forward
  }
  if (back === true) {
    if (accel > -1 * ACCEL_MAX){
      accel--;
    }
  }
  if (!(back === true || forward === true)) {
    if (Math.abs(accel) < 1) {
      accel = 0;
    }
    
    if (accel > 0){
      accel--;
    }

    if (accel < 0){
      accel++;
    }
  }


  for (var i = 0; i < triggerZones.length; ++i) {
    if (!inZone[i] && triggerZones[i].checkInZone(forwardX, forwardY)) {
      showPopup(triggerZones[i])
      inZone[i] = true;
      triggerZones[i].zoneAction();
    } else if (inZone[i] && !triggerZones[i].checkInZone(forwardX, forwardY)) {
      closePopup();
      inZone[i] = false;
    }
  }
  
}, 16);

// Map Functions
function mapMove(perspective) {
  document.getElementById("map").style.transform = "perspective(" + perspective + ") "
    + "rotateX(" + FIXED_ROTATION + "deg) "
    + "rotateZ(" + 0 + "deg) "
    + "translateX(" + SPEED_SCALE * forwardX + "px) "
    + "translateY(" + SPEED_SCALE * forwardY + "px) "
    + "scaleX(" + scale + ") scaleY(" + scale + ")";

  document.getElementById("car").style.transform = "rotateZ(" + -(rotation) + "deg)";
}

function goTo(x, y, r) {
  forwardX = x;
  forwardY = y;
  rotation = r;
}

function speedUpdate() {
  if(accel != 0){
    forwardX += (accel) * Math.sin((rotation) * Math.PI / 180);
    forwardY += (accel) * Math.cos(((rotation) * Math.PI / 180));
  }
}

function mapZoom(amt, speed) {
  if(zoom + amt > 0.5 && zoom + amt < 1.5){
        $('#game-container').transition({ scale: ($('#game-container').css('scale') + amt) }, speed, 'ease');
    zoom += amt;
  }
}

function teleport(zone){
  for (var i=0; i<inZone.length; ++i){
    inZone[i] = false;
  }
  inZone[zone] = true;
  goTo(zones[zone].x, zones[zone].y, zones[zone].r);
  triggerZones[zone].zoneAction();
  showPopup(triggerZones[zone]);
}

// Inputs
function keyDown(){
  //prevents the default
  window.addEventListener("keydown", event => {
    if([32, 37, 38, 39, 40].indexOf(event.keyCode) > -1) {
        event.preventDefault();
    }
    //sets the variables to true
    // left arrow
    if (event.keyCode === 37) {
      right = false;
      left = true;
      return;
    }
    // right arrow
    if (event.keyCode === 39) {
      left = false;
      right = true;
      return;
    }
    // up arrow
    if (event.keyCode === 38) {
      forward = true;
      return;
    }
    // down arrow
    if (event.keyCode === 40) {
      back = true;
      return;
    }
    if (event.keyCode === 90) {
      mapZoom(0.1, 0);
      return;
    }
    if (event.keyCode === 88) {
      mapZoom(-0.1, 0);
      return;
    }
  });
}

function keyUp() {
    //prevents default movements
    window.addEventListener("keyup", event => {
    if([32, 37, 38, 39, 40, 65, 68, 87].indexOf(event.keyCode) > -1) {
        event.preventDefault();
    }
    //sets the variable to false
    if (left === true && (event.keyCode === 37)){
      left = false;
    }
    if (right === true && (event.keyCode === 39)){
      right = false;
    }
    if (forward === true && (event.keyCode === 38)){
      forward = false;
    }
    if (back === true && (event.keyCode === 40)){
      back = false;
    }
  });
}


function isMobile(mediaQuery) {
  if (mediaQuery.matches) { // If media query matches
    popupSize = 100;
  } else {
    popupSize = 26;
  }
}

var mediaQuery = window.matchMedia("(max-width: 768px)")
isMobile(mediaQuery) // Call listener function at run time
mediaQuery.addListener(isMobile) // Attach listener function on state changes