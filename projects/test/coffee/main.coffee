ButtonNewE = document.getElementById('create_events')
mainBG = document.getElementsByClassName('mainBG')[0]
pass = document.getElementById('password')
info = document.getElementById 'info'
cr = document.getElementById 'createNew'
welcome = document.getElementById 'Welcome'

colors = ["#2E9F5C", "#60CF94", "#F0A165", "#7EEDD9", "#D36B7D", "#47356C", "#5198A6"]
i = 0
ButtonNewE.style.display = 'none'
pass.addEventListener 'keyup', (->
	if @value == '1234'
		do main
	), false
main = ->
	animationBlock pass, "bounceOutUp", 1000, "ease-in-out", "out"
	setTimeout (->
		animationBlock ButtonNewE, "fadeIn", 500, "ease-in-out", "in"
	),500
	UpdateColors = ->
		mainBG.style.background = colors[i]
		i++
		if i == colors.length
			i = 0
	ButtonNewE.onclick = ->
		setTimeout (->
			animationBlock info, "fadeIn", 500, "ease-in-out", "in"
			animationBlock ButtonNewE, "fadeOut", 500, "ease-in-out", "out"
			setTimeout (->
				animationBlock welcome, "fadeInDownBig", 1000, "ease-in-out", "in"
			), 700
		), 1000

		mainBG.style.height = window.innerHeight + "px"
		#console.log window.innerHeight

		#setTimeout (->
		setInterval UpdateColors, 1500
			#), 1000



animationBlock = (block, AnimName, AnimDur, TimeFunc, state)->
	block.style.animationName = AnimName
	block.style.animationDuration = (AnimDur / 1000) + "s"
	block.style.animationTimingFunction = TimeFunc
	setTimeout (->	
		block.style.display = "none" if state is "out"
		block.style.display = "block" if state is "in"
	), AnimDur