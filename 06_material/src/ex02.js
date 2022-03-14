import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// ----- 주제: MeshLambertMaterial, MeshPhongMaterial

export default function example() {
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
	camera.position.z = 6;
	scene.add(camera);

	// Light
	const ambientLight = new THREE.AmbientLight('white', 0.5);
	const directionalLight = new THREE.DirectionalLight('#fff', 1);
	scene.add(ambientLight, directionalLight);

	directionalLight.position.set(1, 0, 2)




	// Controls
	const controls = new OrbitControls(camera, renderer.domElement)



	// Mesh
	const geometry1 = new THREE.SphereGeometry(1, 16, 16);
	const geometry2 = new THREE.SphereGeometry(1, 16, 16);

	// 하이라이트, 반사광이 없는 재질
	const material1 = new THREE.MeshLambertMaterial({
		color: 'hotpink',
		// wireframe: true,
	});
	// 하이라이트, 반사광 표현 가능 재질
	const material2 = new THREE.MeshPhongMaterial({
		color: 'seagreen',
		shininess: 1000, //하이라이트 정도
		// wireframe: true,
	});


	const mesh = new THREE.Mesh(geometry1, material1);
	mesh.position.y = 2
	const mesh2 = new THREE.Mesh(geometry2, material2);
	scene.add(mesh, mesh2);

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
