import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

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
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth, //뷰포트 꽉차게
  height: window.innerHeight,
}
//  창을 resize 하면 계속해서 흰색 여백이남기때문에 resize할때마다 sizes를 업데이트하자
window.addEventListener('resize', () => {
  //Update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  //Update Camera - 리사이즈할때마다 비율이 달라지므로 카메라가찍는 비율도 달라져야하므로
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Update renderer
  renderer.setSize(sizes.width, sizes.height) //canvas를 업데이트하는것과같다.
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

window.addEventListener('dblclick', () => {
  if (!document.fullscreenElement) {
    canvas.requestFullscreen()
  } else {
    document.exitFullscreen()
  }

  //만약 사파리도 적용되게하려면
  //   const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement

  //   if(!fullscreenElement) {
  //       if(canvas.requestFullscreen) {
  //           canvas.requestFullscreen()
  //       } else if(canvas.webkitRequestFullscreen) {
  //           canvas.webkitRequestFullscreen()
  //       }
  //   } else {
  //       if(document.exitFullscreen) {
  //           document.exitFullscreen()
  //       } else if(document.webkitExitFullscreen) {
  //           document.webkitExitFullscreen()
  //       }
  //   }
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
camera.position.z = 3
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
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)) //3이상되면 렌더링해야 할 픽셀수가 너무 많아진다.

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
