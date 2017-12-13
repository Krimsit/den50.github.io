window.onload = ->
  canvas = document.getElementById "canvas"
  ctx = canvas.getContext "2d"
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  renderer = new THREE.WebGLRenderer {canvas: canvas, alpha: false}

  scene = new THREE.Scene()
  scene.background = new THREE.Color 0x000000
  camera = new THREE.PerspectiveCamera 45, canvas.width / canvas.height, 0.1, 5000

  camera.position.set 0, 0, 1000
  renderer.render scene, camera