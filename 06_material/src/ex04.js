import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// ----- 주제: 외부 텍스처 이미지 로드하기

export default function example() {


	// 텍스쳐
	const textureLoader = new THREE.TextureLoader()
	const textrueImage = textureLoader.load(
		'./textures/add/c.png',
		() => {console.log('load com')}, 
		() => {console.log('loading...')}, 
		() => {console.log('load error')},
		)

	console.log(textrueImage)

	// Renderer
	const canvas = document.querySelector('#three-canvas');
	const renderer = new THREE.WebGLRenderer({
		canvas,
		antialias: true
	});
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

	// Scene
	const scene = new THREE.Scene();

	// Camera
	const camera = new THREE.PerspectiveCamera(
		75,
		window.innerWidth / window.innerHeight,
		0.1,
		1000
	);
	camera.position.y = 1.5;
	camera.position.z = 3;
	scene.add(camera);

	// Light
	const ambientLight = new THREE.AmbientLight('white', 0.5);
	const directionalLight = new THREE.DirectionalLight('#fff', 1);
	scene.add(ambientLight, directionalLight);

	directionalLight.position.set(1, 0, 2)




	// Controls
	const controls = new OrbitControls(camera, renderer.domElement)



	// Mesh
	const geometry1 = new THREE.BoxGeometry(1, 1, 1);


	// 하이라이트, 반사광이 없는 재질
	const material1 = new THREE.MeshStandardMaterial({
		color: 'hotpink',
		// wireframe: true,
		roughness: 0.2,
		metalness: 0.3,
		side: THREE.FrontSide,
		side: THREE.BackSide,
		side: THREE.DoubleSide,
		map: textrueImage,
		
	});


	const mesh = new THREE.Mesh(geometry1, material1);
	scene.add(mesh)
	

	// 그리기
	const clock = new THREE.Clock();

	function draw() {
		const delta = clock.getDelta();

		renderer.render(scene, camera);
		renderer.setAnimationLoop(draw);
	}

	function setSize() {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.render(scene, camera);
	}

	// 이벤트
	window.addEventListener('resize', setSize);

	draw();
}
