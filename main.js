import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 50

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)
scene.background = new THREE.Color('#00040a')
renderer.render(scene, camera)

const light = new THREE.HemisphereLight(0xffffff, 0x444444, 3)
scene.add(light)
const luzDirecional = new THREE.DirectionalLight(0xffffff, 3);
luzDirecional.position.set(3, 3, 5);
scene.add(luzDirecional);

const loader = new GLTFLoader()
loader.load(
    '/green_lantern_ring.glb',
    (gltf) => {
        console.log(gltf)
        gltf.scene.scale.set(50, 50, 50);
        gltf.scene.rotation.y = Math.PI / 2;
        scene.add(gltf.scene)

        const caixa = new THREE.Box3().setFromObject(gltf.scene);

        const tamanho = caixa.getSize(new THREE.Vector3());
        const centro = caixa.getCenter(new THREE.Vector3());

        console.log('Tamanho:', tamanho);
        console.log('Centro:', centro);

        const inicio = performance.now();
        const rotacaoInicial = gltf.scene.rotation.y;
        const rotacaoInicialX = gltf.scene.rotation.x;

        renderer.setAnimationLoop(() => {
        const segundos = (performance.now() - inicio) / 1000;

        gltf.scene.rotation.x = rotacaoInicialX + segundos * 0.2;
        gltf.scene.rotation.y = rotacaoInicial + segundos * 0.5;

        renderer.render(scene, camera);
        });
    }
)