import * as THREE from 'three'
import './style.css'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import gsap from 'gsap'
// scene
const scene = new THREE.Scene()

const geometry = new THREE.SphereGeometry(3, 64, 64);

const material = new THREE.MeshStandardMaterial({
  color: "#fa3972",
});

const mesh = new THREE.Mesh(geometry, material)

scene.add(mesh)


// sizes
const sizes = {
  width: window.innerWidth,
  height:window.innerHeight
}

const light = new THREE.PointLight(0xffffff, 1, 100)
light.position.set(0, 10, 10)
scene.add(light)
// camera

const camera = new THREE.PerspectiveCamera(45, sizes.width/sizes.height,0.1,100)
camera.position.z =20
scene.add(camera)
//  Render
const canvas = document.querySelector(".webgl")

const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setPixelRatio(3)
renderer.setSize(sizes.width, sizes.height)


renderer.render(scene, camera)


// controls
const controls = new OrbitControls(camera,canvas)
// Resize
controls.enableDampingv = true
controls.enablePan = false
controls.enableZoom = false
controls.autoRotate = true
controls.autoRotateSpeed = 7

window.addEventListener('resize', () => {
  // update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight
   
  camera.updateProjectionMatrix()
  camera.aspect = sizes.width / sizes.height
  
  renderer.setSize(sizes.width,sizes.height)
})

const loop = () => {
  controls.update()
  renderer.render(scene, camera)
  window.requestAnimationFrame(loop)

}

loop()
// timeline magic
const t1 = gsap.timeline({ defaults: { duration: 1 } })
t1.fromTo(mesh.scale, { z: 0, x: 0, y: 0 }, { z: 1, x: 1, y: 1 })
t1.fromTo("nav", { y: "-100%" }, { y: "0%" })
t1.fromTo(".title", { opacity: 0 }, { opacity: 1 })

// mouse animation color
let mouseDown = false
let rgb =[12,23,55]
window.addEventListener("mousedown", () => (mouseDown = true))
window.addEventListener("mousedown", () => (mouseUp = false));

window.addEventListener("mousemove", (e) => {
  if (mouseDown) {
    rgb = [
      Math.round((e.pageX / sizes.width) * 255),
      Math.round((e.pageX / sizes.width) * 255),
      200
    ];
    let newColor = new THREE.Color(`rgb(${rgb.join(",")})`)
    gsap.to(mesh.material.color,{r:newColor.r,g:newColor.g,b:newColor.b})
  }
})

