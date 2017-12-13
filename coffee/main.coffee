dropclick = document.getElementById "dropclick"
dropmenu = document.getElementById "showLogin"
active = false
dropclick.onclick = ->
  if active
    dropmenu.classList.remove "drop-active"
    dropmenu.classList.add "drop-noactive"
    active = no
  else
    dropmenu.classList.remove "drop-noactive"
    dropmenu.classList.add "drop-active"
    active = on
main_header = document.getElementsByClassName('main_header')[0]
main_header.onclick = (e)->
  if e.target != dropclick and active and e.target != document.getElementsByClassName('defInput')[0] and e.target != document.getElementsByClassName('defInput')[1] and e.target != document.getElementsByClassName("button_login")[0] and e.target != dropmenu and e.target != document.getElementById "form_dropmenu"
    dropmenu.classList.remove "drop-active"
    dropmenu.classList.add "drop-noactive"
    active = no
    console.dir e.target