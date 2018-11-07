# _Matrix = [
# 	["circle0", "circle0"]
# 	["circle0", "circle1"]
# 	["circle1", "circle2"]
# 	["circle2", "circle2"]
# 	["circle2", "circle3"]
# 	["circle3", "circle3"]
# ]
###
matrix = [
	   0  1  2  3
	0 [1, 1, 0, 1]
	1 [1, 0, 0, 1]
	2 [0, 1, 0, 1]
	3 [1, 1, 1, 0]
]

tmp_all = ""
	for i in arr
		tmp_all+= i[0]
		tmp_all+= i[1]
	console.log tmp_all
	arr_ints = tmp_all.match /\d+/g
	for i, j in arr_ints
		arr_ints[j] = +i

###
getMatrix = (arr, paths, n, WeightMode)->
	if n > 0
		Mx = []
		tmpObj = {}
		#Create empty Matrix -> empty object
		for i in [0..n-1]
			tmpObj["circle#{i}"] = {}
			for q in [0..n-1]
				tmpObj["circle#{i}"]["circle#{q}"] = 0
		#console.log tmpObj
		#Fitst going
		for i, j in arr
			for q in Object.keys tmpObj
				if i[0] == q
					tmpObj[q][i[1]] = if WeightMode then Math.round paths[j].weight else 1

		#reverse arr
		RevArr = []
		for i in arr
			RevArr.push [i[1], i[0]]

		#Second going
		for i, j in RevArr
			for q in Object.keys tmpObj
				if i[0] == q
					tmpObj[q][i[1]] = if WeightMode then Math.round paths[j].weight else 1

		#From object into array
		for i in Object.keys tmpObj
			tmpArr = []
			for j in Object.keys tmpObj[i]
				tmpArr.push tmpObj[i][j]
			Mx.push tmpArr
		Mx
	else
		[]

	
module.exports = getMatrix