import * as THREE from 'three';
import Stats from 'stats.js'
import dat from 'dat.gui'

// ----- 주제: AxesHelper, GridHelper
// ----- 주제: 초당 프레임 보기 (State) 외부 라이브러리
// ----- 주제: gui

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
	camera.position.y = 1;
	camera.position.x = 1;
	camera.position.z = 5;
	scene.add(camera);

	// light
	const ambientLight = new THREE.AmbientLight('#fff', 0.5);
	scene.add(ambientLight)
	const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
	directionalLight.position.x = 1;
	directionalLight.position.z = 2;
	scene.add(directionalLight);


	// axesHelper
	const axesHelper = new THREE.AxesHelper(3)
	scene.add(axesHelper)

	// gridHelper
	const gridHelper = new THREE.GridHelper(5)
	scene.add(gridHelper)

	// stats
	const stats = new Stats()
	document.body.append(stats.domElement)

	

	// Mesh
	const geometry = new THREE.BoxGeometry(1, 1, 1);
	const material = new THREE.MeshStandardMaterial({
		color: 'seagreen'
	});
	const mesh = new THREE.Mesh(geometry, material);
	scene.add(mesh);
	mesh.position.x = 2

	

	
	// 위로 보이게잠깐해둠

	
	// camera.position.y = 5
	// camera.lookAt(mesh.position)

	// dat
	const gui = new dat.GUI();
	// gui.add(mesh.position, 'y', -5, 5, 0.01) //움직일것, 움직일속성, 범위 최소, 최대, 스탭..단계
	// gui.add(mesh.position, 'y').min(-5).max(5).step(0.01).name('메시 z 위치')

	// gui.add(camera.position, 'x').min(-10).max(10).step(0.01).name('camera 위치')
	// camera.lookAt(mesh.position)


	


	// 그리기
	const clock = new THREE.Clock();

	function draw() {

		stats.update()
		camera.lookAt(mesh.position)

		const time = clock.getElapsedTime();

		mesh.rotation.y = time;

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
