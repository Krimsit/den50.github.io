#canvas settings
canvas = document.getElementById "canvas"
ctx = canvas.getContext "2d"
ctx1 = canvas.getContext "2d"
HEIGHT = window.innerHeight - 5
WIDTH = window.innerWidth - 5
canvas.width = WIDTH
canvas.height = HEIGHT
#end canvas settings

#class Hero
class Hero
  constructor: (x, y)->
    @y = HEIGHT - y
    @x = x
  a: 50
  b: 50
  self = @
  summ: (sx, sy)->
    return 
      dx: @x + sx
      dy: @y + sy


#class LETs
###
  [
    {
      x: 30,
      y: HEIGHT,
      a: 30,
      b: 200,
      color: "red"
    },
    {
      x: 500,
      y: HEIGHT - 50,
      a: 300,
      b: 40,
      color: "green"
    }
  ]
###
class LETs
  constructor: (@arr)->



  add: ()->
    for i in @arr
      view.writeRect i.x, i.y, i.a, i.b, i.color
  a: 50
  b: 50
  self = @


#end class Hero

#object extend's class Hero
hero = new Hero 700, 0

window.requestAnimFrame = ->
  return (
    window.requestAnimationFrame       || 
    window.webkitRequestAnimationFrame || 
    window.mozRequestAnimationFrame    || 
    window.oRequestAnimationFrame      || 
    window.msRequestAnimationFrame     || 
    ((callback) ->
        window.setTimeout(callback, 1000 / 60)
    )
    
  )
pass = ->
  try                            
    throw TypeError()

#view
view=
  writeRect: (x, y, a, b, color)->
    ctx.fillStyle = color
    ctx.fillRect x, y - b, a, b
  
#model
model=
  spacing: (fps)->
    if @reverse
      fx = @summ(hero.x, hero.y, -@speedSpacing.x, @speedSpacing.y).x
      fy = @summ(hero.x, hero.y, -@speedSpacing.x, @speedSpacing.y).y
    else
      fx = @summ(hero.x, hero.y, @speedSpacing.x, @speedSpacing.y).x
      fy = @summ(hero.x, hero.y, @speedSpacing.x, @speedSpacing.y).y

    hero.x = fx
    hero.y = fy
    for i in lets.arr
      if hero.x + hero.a > i.x
        continue
      else
        if hero.y + hero.b >= i.y and (controller.touchX hero.x, hero.a, "r" or controller.touchX hero.x, hero.a, "l")
          hero.y = HEIGHT - i.b
          console.log HEIGHT - hero.b - i.b
          console.log hero.y


    ctx.clearRect 0, 0, WIDTH, HEIGHT
    lets.add()
    view.writeRect hero.x, hero.y, hero.a, hero.b, "#333"

    @speedSpacing = @summ @speedSpacing.x, @speedSpacing.y, @gravity.x, @gravity.y
    if fy >= HEIGHT
      @speedSpacing = {x: 0, y: -30}
    else
      setTimeout (=>
        window.requestAnimFrame @spacing 80
      ), 1000 / fps
  ToLeft: (fps) ->
    if @stopWayLeft
      if !controller.touchX hero.x, hero.a, "l"
        @stopWayLeft = false
    else
      @reverse = true
      fx = @summ(hero.x, hero.y, -@speed.x, 0).x
      fy = @summ(hero.x, hero.y, -@speed.x, 0).y



      hero.x = fx
      hero.y = fy

      ctx.clearRect 0, 0, WIDTH, HEIGHT
      lets.add()
      view.writeRect hero.x, hero.y, hero.a, hero.b, "#333"

      if controller.touchX hero.x, hero.a, "l"
        console.log controller.touchX hero.x, hero.a, "l"

      if fx % 60 == 0# or controller.touchX hero.x, hero.a, "l"
        #if controller.touchX hero.x, hero.a, "l"
        #  @stopWayLeft = true
      else
        setTimeout (=>
          window.requestAnimFrame @ToLeft 120

        ), 1000 / fps
  ToRight: (fps) ->
    @reverse = false
    fx = @summ(hero.x, hero.y, @speed.x, 0).x
    fy = @summ(hero.x, hero.y, @speed.x, 0).y


    hero.x = fx
    hero.y = fy

    ctx.clearRect 0, 0, WIDTH, HEIGHT
    lets.add()
    view.writeRect hero.x, hero.y, hero.a, hero.b, "#333"

    if controller.touchX hero.x, hero.a, "r"
      console.log controller.touchX hero.x, hero.a, "r"

    if fx % 60 == 0
      do pass
    else
      setTimeout (=>
        window.requestAnimFrame @ToRight 120

      ), 1000 / fps
    
  gravity: {x: 0, y: 2}
  speedSpacing: {x: 0, y: -30}
  speed: {x: 2, y: 0}
  reverse: false
  stopWayRight: false
  stopWayLeft: false
  isInBlock: ->
    leftObj = hero.x
    rightObj = hero.x + hero.a
    for i in lets.arr
      leftBlock = i.x
      rightBlock = i.x + i.a
      if 

  summ: (dx, dy, rx, ry)->
    return
      x: dx + rx
      y: dy + ry


#controller

controller = 
  touchX: (x, a, arrow) ->
    if arrow == "r"
      for i in lets.arr
        if x + a > i.x
          continue
        else
          if i?
            if x + a == i.x
              return true
              break
            else
              return false
          else
            return no
            break
    if arrow == "l"
      for i in lets.arr
        if x > i.x + i.a
          continue
        else
          if i?
            if x == i.x + i.a
              return true
              break
            else
              return false
          else
            return no
            break
  #touchY: (y, b, x, a)->
  #  for i in lets.arr
  #    if x + a > i.x
  #      continue
  #    else





conflets = [
    {
      id: 1
      x: 30,
      y: HEIGHT,
      a: 30,
      b: 200,
      color: "red"
    },
    {
      id: 2
      x: 500,
      y: HEIGHT,
      a: 300,
      b: 40,
      color: "green"
    }
  ]
lets = new LETs conflets
!(->
  


  #view.writeRect vec2.getCoords().x, vec2.getCoords().y - 100, 100, 100
  view.writeRect hero.x, hero.y, hero.a, hero.b, "#333"

  #do ctx.beginPath
 # ctx.moveTo vec2.getCoords().x, vec2.getCoords().y


  document.onkeydown = (e) ->
    if(e.code == "Space")
      do model.spacing
    if(e.code == "ArrowUp")
      do model.spacing
    if(e.code == "ArrowLeft")
      do model.ToLeft
    if(e.code == "ArrowRight")
      do model.ToRight



  #LETs
  

  lets.add()
)() 
