import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// ----- 주제: 레이캐스터 광선 구현

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
	camera.position.z = 4;
	camera.position.x = 5;
	scene.add(camera);

	// Light
	const ambientLight = new THREE.AmbientLight('white', 0.5);
	scene.add(ambientLight);

	const directionalLight = new THREE.DirectionalLight('white', 1);
	directionalLight.position.x = 1;
	directionalLight.position.z = 2;
	scene.add(directionalLight);

	// Controls
	const controls = new OrbitControls(camera, renderer.domElement)

	//Mesh
	const lineMaterial = new THREE.LineBasicMaterial({ color: 'yellow' })
	const points = []; 
	points.push(new THREE.Vector3(0, 0, 100))
	points.push(new THREE.Vector3(0, 0, -100))
	const lineGeometry = new THREE.BufferGeometry().setFromPoints(points)

	const guide = new THREE.Line(lineGeometry, lineMaterial)
	scene.add(guide)


	const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
	const boxMaterial = new THREE.MeshStandardMaterial({ color: '#fff' })
	const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
	scene.add(boxMesh)

	
	const torusGeometry = new THREE.TorusGeometry(1.5, .5, 20, 50);
	const torusMaterial = new THREE.MeshStandardMaterial({ color: '#555' });
	const torusMesh = new THREE.Mesh(torusGeometry, torusMaterial)
	scene.add(torusMesh)




	const meshs = [boxMesh, torusMesh];


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
