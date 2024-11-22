import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'
import GUI from 'lil-gui'

/**
 * Debug
 * 
  import * as dat from 'lil-gui'
   const gui = new dat.GUI() 똑가틈
 */
const gui = new GUI()
// const gui = new GUI({
//width: 300
//title: 'Nice debug UI'
//closeFolders: false
//})
//gui.close() git.hide()

window.addEventListener('keydown', e => {
  if (e.key == 'h') {
    gui.show(gui._hidden)
  }
})

const debugObj = {}

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Object
 */
debugObj.color = '#3a6ea6'
const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2)
const material = new THREE.MeshBasicMaterial({
  color: debugObj.color,
  wireframe: true,
})
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

const cubeTweaks = gui.addFolder('Awesome cube')
// cubeTweaks.close()
// cubeTweaks폴더가 생성됐으니 cubeTweaks.add 할 수 있다

/**
 * gui
 */
gui.add(mesh.position, 'y').min(-3).max(3).step(1).name('elevation')

gui.add(mesh, 'visible')

gui.add(material, 'wireframe')

gui.addColor(debugObj, 'color').onChange(value => {
  //value.getHexString() //진짜 색상!
  material.color.set(debugObj.color) //진짜 색상!
})

debugObj.spin = () => {
  gsap.to(mesh.rotation, { duration: 1, y: mesh.rotation.y + Math.PI * 2 })
}

gui.add(debugObj, 'spin')

debugObj.subdivision = 2
gui
  .add(debugObj, 'subdivision')
  .min(1)
  .max(10)
  .step(1)
  .onFinishChange(() => {
    mesh.geometry.dispose()
    mesh.geometry = new THREE.BoxGeometry(
      1,
      1,
      1,
      debugObj.subdivision,
      debugObj.subdivision,
      debugObj.subdivision
    )
  })

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // Update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Update renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
  const elapsedTime = clock.getElapsedTime()

  // Update controls
  controls.update()

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()
