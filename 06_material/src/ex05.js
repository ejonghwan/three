import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// ----- 주제: 외부 텍스처 LoadingManager로 한번에 로드 하기 
// ----- 주제: 외부 텍스처 위치 옮기고 남은 부분 처리하기

export default function example() {


	// load manager
	const manager = new THREE.LoadingManager()
	manager.onStart = () => console.log('start')
	manager.onLoad = () => console.log('load')
	manager.onProgress = () => console.log('progress')
	manager.onError = () => console.log('error')


	// 텍스쳐
	const textureLoader = new THREE.TextureLoader(manager)
	const texture1 = textureLoader.load('./textures/add/c.png')
	const texture2 = textureLoader.load('./textures/add/a.jpg')
	const texture3 = textureLoader.load('./textures/add/b.jpg')



	// 텍스쳐 위치 이동
	texture1.wrapS = THREE.RepeatWrapping;
	texture1.wrapT = THREE.RepeatWrapping;
	texture1.offset.x = 0.3 

	// 이미지 돌리기 
	texture1.rotation = Math.PI * 0.25

	//이미지 센터로 
	texture1.center.x = 0.5
	texture1.center.y = 0.5

	// console.log(textrueImage)




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
		map: texture1,
		
	});

	const material2 = new THREE.MeshPhongMaterial({
		color: '#ddd',
		map: texture2,
	})

	const material3 = new THREE.MeshLambertMaterial({
		color: '',
		map: texture3,
	})

	
	const mesh = new THREE.Mesh(geometry1, material1);
	const mesh2 = new THREE.Mesh(geometry1, material2)
	const mesh3 = new THREE.Mesh(geometry1, material3)
	scene.add(mesh, mesh2, mesh3)

	mesh2.position.y = 1
	mesh3.position.y = 2
	

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
