###
	coords = [
		{
			d: "M 365, 171L 123, 66Z", 
			coords1: {x: 365, y: 171}, 
			coords2: {x: 123, y: 66}
		}
	]
###
getWeight = (coords)->
	coords1 = {x: coords[0].x, y: coords[0].y}
	coords2 = {x: coords[1].x, y: coords[1].y}
	if coords1.x == coords2.x and coords1.y == coords2.y
		return 12
	else
		cat1 = Math.abs coords1.x - coords2.x
		cat2 = Math.abs coords1.y - coords2.y

		hypotenuse = Math.sqrt (Math.pow cat1, 2) + (Math.pow cat2, 2)

		return Math.round (Math.round hypotenuse) / 20


module.exports = getWeight