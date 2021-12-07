import './style.css'

import * as THREE from 'three';
import { Color } from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight, 0.1,1000);
const renderer = new THREE.WebGLRenderer({
  canvas:document.querySelector('#bg'),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth,window.innerHeight);
camera.position.setZ(30);

renderer.render(scene,camera);

const geometry = new THREE.TorusGeometry(10,3,16,100)
const material = new THREE.MeshBasicMaterial({color:0xC0C0C0, wireframe:true  });
const torus = new THREE.Mesh(geometry,material);

scene.add(torus)

const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(5,5,5)

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight,ambientLight)

const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200,5);
scene.add(lightHelper, gridHelper)

const controls = new OrbitControls(camera, renderer.domElement);

function addStar(){
  const geometry = new THREE.SphereGeometry(0.25,24,24);
   const material = new THREE.MeshStandardMaterial({color: 0xffffff})
   const star = new THREE.Mesh(geometry, material);

   const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
   star.position.set(x,y,z);
   scene.add(star)
}


Array(150).fill().forEach(addStar)


const player = new THREE.TextureLoader().load('20210930_204502(1).jpg')
const N = new  THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial({map:player})
);

scene.add(N);



const backTexture = new THREE.TextureLoader().load('pexels-alex-andrews-5086477.jpg');
scene.background = backTexture;

function animate()
{
  requestAnimationFrame(animate);
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  controls.update();
  
  renderer.render(scene, camera);
}

animate()