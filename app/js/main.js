var active, dropclick, dropmenu, main_header;

dropclick = document.getElementById("dropclick");

dropmenu = document.getElementById("showLogin");

active = false;

dropclick.onclick = function() {
  if (active) {
    dropmenu.classList.remove("drop-active");
    dropmenu.classList.add("drop-noactive");
    return active = false;
  } else {
    dropmenu.classList.remove("drop-noactive");
    dropmenu.classList.add("drop-active");
    return active = true;
  }
};

main_header = document.getElementsByClassName('main_header')[0];

main_header.onclick = function(e) {
  if (e.target !== dropclick && active && e.target !== document.getElementsByClassName('defInput')[0] && e.target !== document.getElementsByClassName('defInput')[1] && e.target !== document.getElementsByClassName("button_login")[0] && e.target !== dropmenu && e.target !== document.getElementById("form_dropmenu")) {
    dropmenu.classList.remove("drop-active");
    dropmenu.classList.add("drop-noactive");
    active = false;
    return console.dir(e.target);
  }
};
