import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * Textures - Native Javascript
 */

const image = new Image()
const texture2 = new THREE.Texture(image) //처음엔 image 비어있음
texture2.colorSpace = THREE.SRGBColorSpace
// 최근 Three.js버전에선 이 코드를 추가해야지 texture의 컬러감이 정확하게 표시된다

// image.addEventListener('load', () => image.onload와 같은기능
//     {
//       console.log('image loaded!')
//         texture.needsUpdate = true
//     })

image.onload = () => {
  //console.log('이미지 로드됨')
  texture2.needsUpdate = true // 이미지가 업데이트되면 텍스쳐 너도 업데이트하렴
  //console.log('텍스처 업데이트됨')
}
image.src = '/textures/door/color.jpg' //이 코드가 있어야 위에 onload 함수 실행됨

/**
 * Textures - THREE.TextureLoader()
 */
const loadingManager = new THREE.LoadingManager()

loadingManager.onStart = () => {
  console.log('onStart')
}
loadingManager.onLoad = () => {
  console.log('onLoad')
}
loadingManager.onProgress = () => {
  console.log('onProgress')
}
loadingManager.onError = () => {
  console.log('onError')
}

const textureLoader = new THREE.TextureLoader(loadingManager)
const colorTexture = textureLoader.load('/textures/checkerboard-8x8.png')
colorTexture.colorSpace = THREE.SRGBColorSpace

const alphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const normalTexture = textureLoader.load('/textures/door/normal.jpg')
normalTexture.colorSpace = THREE.SRGBColorSpace
const metalnessTexture = textureLoader.load('/textures/door/metalness.jpg')

// repeat 은 vector2 여서 x,y 접근 가능
//colorTexture.repeat.x = 2
//colorTexture.repeat.y = 3
//colorTexture.wrapS = THREE.RepeatWrapping // THREE.MirroredRepeatWrapping
//colorTexture.wrapT = THREE.RepeatWrapping

//colorTexture.rotation = Math.PI / 4

//colorTexture.center.x = 0.5
//colorTexture.center.y = 0.5

//colorTexture.minFilter = THREE.NearestFilter
colorTexture.magFilter = THREE.NearestFilter
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
const material = new THREE.MeshBasicMaterial({ map: colorTexture }) // texture 여기서 사용가능
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

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
camera.position.z = 1
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

// const texture = textureLoader.load(
//   '/textures/door/color.jpg',
//   () => {
//     console.log('texture loading finished')
//   },
//   () => {
//     console.log('progress') // 사용하지않는걸 추천
//   },
//   () => {
//     console.log('error 발생') //error
//   }
// )
