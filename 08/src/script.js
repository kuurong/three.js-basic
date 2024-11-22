import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
const axesHelper = new THREE.AxesHelper(2)
scene.add(axesHelper)
// Object
//const geometry = new THREE.BoxGeometry(1, 1, 1) // 육면체의 width, heigh, 폭

const geometry = new THREE.BufferGeometry()

//const positionsArr = new Float32Array([0, 0, 0, 0, 1, 0, 1, 0, 0])

//const positionsAttribute = new THREE.BufferAttribute(positionsArr, 3)
// 하나의 vertex에 몇개의 value가 있는지.. 점하나당 xyz 위치 가지고있으므로 3

//geometry.setAttribute('position', positionsAttribute)
//position 은 attribute 값의 이름이다 shaders임....

const count = 50 //50개의 삼각형 만들거임
const positionsArr = new Float32Array(count * 3 * 3)
//각각의 삼각형은 3개의 vertices를 가짐
// 각각의 vertices들은  3개의 values를 가짐 xyz좌표
for (let i = 0; i < count * 3 * 3; i++) {
  positionsArr[i] = Math.random()
}

const positionsAttribute = new THREE.BufferAttribute(positionsArr, 3)
geometry.setAttribute('position', positionsAttribute)

const material = new THREE.MeshBasicMaterial({
  color: 0xff0000,
  wireframe: true,
})
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Sizes
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

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Animate
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
