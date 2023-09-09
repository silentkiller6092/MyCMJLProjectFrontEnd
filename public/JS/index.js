let openmenuButton = document.getElementById("openmenuButton");
let closebtn = document.getElementById("closebtn");
let navbar = document.getElementById("navbar");

openmenuButton.addEventListener("click", () => {
  navbar.style.display = "block";
  navbar.classList.remove("animate-slide-right");
  navbar.classList.add("animate-slide-left");
});

closebtn.addEventListener("click", () => {
  navbar.style.display = "none";
  navbar.classList.remove("animate-slide-left");
  navbar.classList.add("animate-slide-right");
});

function filterlist(){
  let input = document.getElementById('searchbar').value
  input=input.toLowerCase();
  let x = document.getElementsByClassName('value1');
    
  for (i = 0; i < x.length; i++) { 
      if (!x[i].innerHTML.toLowerCase().startsWith(input)) {
          x[i].style.display="none";
      }
      else {
          x[i].style.display="list-item";                 
      }
  }
}

function filterlist18k(){
  let input = document.getElementById('searchbar18k').value
  input=input.toLowerCase();
  let x = document.getElementsByClassName('value1');
    
  for (i = 0; i < x.length; i++) { 
      if (!x[i].innerHTML.toLowerCase().startsWith(input)) {
          x[i].style.display="none";
      }
      else {
          x[i].style.display="list-item";                 
      }
  }
}

function filterlist16k(){
  let input = document.getElementById('searchbar16k').value
  input=input.toLowerCase();
  let x = document.getElementsByClassName('value1');
    
  for (i = 0; i < x.length; i++) { 
      if (!x[i].innerHTML.toLowerCase().startsWith(input)) {
          x[i].style.display="none";
      }
      else {
          x[i].style.display="list-item";                 
      }
  }
}



function filterlist18kt(){
  let input = document.getElementById('searchbar18kt').value
  input=input.toLowerCase();
  let x = document.getElementsByClassName('value1');
    
  for (i = 0; i < x.length; i++) { 
      if (!x[i].innerHTML.toLowerCase().startsWith(input)) {
          x[i].style.display="none";
      }
      else {
          x[i].style.display="list-item";                 
      }
  }
}

function filterlist16kt(){
  let input = document.getElementById('searchbar16kt').value
  input=input.toLowerCase();
  let x = document.getElementsByClassName('value1');
    
  for (i = 0; i < x.length; i++) { 
      if (!x[i].innerHTML.toLowerCase().startsWith(input)) {
          x[i].style.display="none";
      }
      else {
          x[i].style.display="list-item";                 
      }
  }
}


let kButtonsmall22 = document.getElementById("22kButtonsmall");
let kButtonsmall18 = document.getElementById("18kButtonsmall");
let kButtonsmall16 = document.getElementById("16kButtonsmall");
let dimondbtn=document.getElementById("multiLevelDropdownButtondmndsmall")

let isHidden = true;

kButtonsmall22.addEventListener("click", () => {
  if (isHidden) {
    kButtonsmall18.style.display = "none";
    kButtonsmall16.style.display = "none";
   
  } else {
    kButtonsmall18.style.display = "block";
    kButtonsmall16.style.display = "block";
    kButtonsmall22.classList.add("ml-2");
  
  }
  
  isHidden = !isHidden; 
});



// For Diamond
let kButtonsmall18kt = document.getElementById("18ktButtonsmall");
let kButtonsmall16KT = document.getElementById("16ktButtonsmall");


let isHiddendinnd = true;

kButtonsmall18kt.addEventListener("click", () => {
  if (isHiddendinnd) {
    kButtonsmall16KT.style.opacity = "0";
  } else {
    kButtonsmall16KT.style.opacity=1
    kButtonsmall22.classList.add("mr-10");
  
  }
  
  isHiddendinnd = !isHiddendinnd; // Toggle the state for the next click
});



let goldbtn = document.getElementById("multiLevelDropdownButtongoldsmall");
let kbut22kbtn=document.getElementById("dropdownsmallgold")
let rightgold=document.getElementById("rightgold")
let downgold=document.getElementById("downgold")
let ishiddens = true;
let diamondButton = document.getElementById("multiLevelDropdownButtondmndsmall");

goldbtn.addEventListener("click", () => {
  if (ishiddens) {
    // diamondButton.style.visibility = "hidden"; // Hide the Diamond button, but keep its space
    rightgold.style.display="none"
    downgold.style.display="block"
    kbut22kbtn.style.display="block"
  } else {
    diamondButton.style.visibility = "visible"; // Show the Diamond button
    kbut22kbtn.style.display="none"
    rightgold.style.display="block"
    downgold.style.display="none"
  }
  ishiddens = !ishiddens;
});


// Chnage icon of desktop gold
let goldbtndesktop = document.getElementById("multiLevelDropdownButtongold");
let rightgolddesktop = document.getElementById("rightgolddesktop");
let downgolddesktop = document.getElementById("downgolddesktop");
let ishiddenicons = true;
let bodys = document.getElementsByTagName('body')[0];

goldbtndesktop.addEventListener('click', (event) => {
  event.stopPropagation();
  if (ishiddenicons) {
    rightgolddesktop.style.display = "none";
    downgolddesktop.style.display = "block";
  } else {
    rightgolddesktop.style.display = "block";
    downgolddesktop.style.display = "none";
  }
  ishiddenicons = !ishiddenicons;
});

bodys.addEventListener('click', (event) => {
  // Check if the clicked element or its parent has the ID "dropdown"
  if (!event.target.closest('#dropdown')) {
    rightgolddesktop.style.display = "block";
    downgolddesktop.style.display = "none";
    ishiddenicons = true;
  }
});







let KTdiamnond = document.getElementById("18KTdiamnond");
let dmndrighticon = document.getElementById("dmndrighticon");
let dmndownicon = document.getElementById("dmndownicon");
let ishiddeniconsdmnd = true;
let body= document.getElementsByTagName('body')[0];

KTdiamnond.addEventListener('click', (event) => {
  event.stopPropagation();
  if (ishiddeniconsdmnd) {
    dmndrighticon.style.display = "none";
    dmndownicon.style.display = "block";
  } else {
    dmndrighticon.style.display = "block";
    dmndownicon.style.display = "none";
  }
  ishiddeniconsdmnd = !ishiddeniconsdmnd;
});
let drop=document.getElementById("18KTdiamnondDouble")
bodys.addEventListener('click', (event) => {
  // Check if the clicked element or its parent has the ID "dropdown"
  if (!event.target.closest('.value11')) {
    dmndrighticon.style.display = "block";
    dmndownicon.style.display = "none";
    ishiddeniconsdmnd = true;
  }
});






let Dimondbtns=document.getElementById("multiLevelDropdownButtondmndsmall")
let dmndright=document.getElementById('dmndright')
let dmnddown=document.getElementById("dmnddown")
let gifitng=document.getElementById("gifting")
let diamondsubbtn=document.getElementById("dropdownsmalldmnd")
let isdmndhidden=true
Dimondbtns.addEventListener('click',()=>{
if(isdmndhidden){
  diamondsubbtn.style.display="block"
    dmndright.style.display="none"
    dmnddown.style.display="block"
    gifitng.style.opacity="0"
}
else{
  diamondsubbtn.style.display="none"
    dmnddown.style.display="none"
    dmndright.style.display="block"
    gifitng.style.opacity="1"
  
}
isdmndhidden=!isdmndhidden
})


// Small device search 
// fOR fold 22k
function filter22kgoldsmall(){
  let input = document.getElementById('searchbarsmall22k').value
  input=input.toLowerCase();
  let x = document.getElementsByClassName('value1');
    
  for (i = 0; i < x.length; i++) { 
      if (!x[i].innerHTML.toLowerCase().startsWith(input)) {
          x[i].style.display="none";
      }
      else {
          x[i].style.display="list-item";                 
      }
  }
}

function filter18kgoldsmall(){
  let input = document.getElementById('searchbarsmall18k').value
  input=input.toLowerCase();
  let x = document.getElementsByClassName('value1');
    
  for (i = 0; i < x.length; i++) { 
      if (!x[i].innerHTML.toLowerCase().startsWith(input)) {
          x[i].style.display="none";
      }
      else {
          x[i].style.display="list-item";                 
      }
  }
}

function filter16kgoldsmall(){
  let input = document.getElementById('searchbarsmall16k').value
  input=input.toLowerCase();
  let x = document.getElementsByClassName('value1');
    
  for (i = 0; i < x.length; i++) { 
      if (!x[i].innerHTML.toLowerCase().startsWith(input)) {
          x[i].style.display="none";
      }
      else {
          x[i].style.display="list-item";                 
      }
  }
}


//for diamond
function filter18ktdmndsmall(){
  let input = document.getElementById('searchbarsmall18kt').value
  input=input.toLowerCase();
  let x = document.getElementsByClassName('value1');
    
  for (i = 0; i < x.length; i++) { 
      if (!x[i].innerHTML.toLowerCase().startsWith(input)) {
          x[i].style.display="none";
      }
      else {
          x[i].style.display="list-item";                 
      }
  }
}


function filter16ktdmndsmall(){
  let input = document.getElementById('searchbarsmall16kt').value
  input=input.toLowerCase();
  let x = document.getElementsByClassName('value1');
    
  for (i = 0; i < x.length; i++) { 
      if (!x[i].innerHTML.toLowerCase().startsWith(input)) {
          x[i].style.display="none";
      }
      else {
          x[i].style.display="list-item";                 
      }
  }
}

