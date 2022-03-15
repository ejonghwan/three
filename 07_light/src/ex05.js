import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import dat from 'dat.gui';

// ----- 주제: 해미스피어라이트

export default function example() {
	// Renderer
	const canvas = document.querySelector('#three-canvas');
	const renderer = new THREE.WebGLRenderer({
		canvas,
		antialias: true
	});
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
	renderer.shadowMap.enabled = true;
	// renderer.shadowMap.type = THREE.PCFShadowMap
	// renderer.shadowMap.type = THREE.BasicShadowMap
	renderer.shadowMap.type = THREE.PCFSoftShadowMap
	

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
	camera.position.z = 7;
	scene.add(camera);

	// Light
	// const ambLight = new THREE.AmbientLight('#fff', .5) //기본으로 깔아주고 다른조명 씀 
	// const light = new THREE.DirectionalLight('red', .5)
	const light = new THREE.HemisphereLight('red', 'lime', .5)
	scene.add( light) 
	light.position.y = 3


    //Light helper
    const LightHelper = new THREE.HemisphereLightHelper(light, 1)
    scene.add(LightHelper)
    

	// 그림자 설정
	light.castShadow = true;
	// light.shadow.mapSize.width = 2024;
	// light.shadow.mapSize.height = 2024;
	// light.shadow.radius = 10
	
	// 최적화 그림자 적용되는 범위 
	// light.shadow.camera.near = 1
	// light.shadow.camera.far = 5

    
	




	// Controls
	const controls = new OrbitControls(camera, renderer.domElement);


    // geometry 
	const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
    const planeGeometry = new THREE.PlaneGeometry(10, 10)
    const sphereGeometry = new THREE.SphereGeometry(.5, 10, 10)

	
    // material
	const material1 = new THREE.MeshStandardMaterial({
		color: 'hotpink',
        // wireframe: true, 
	});
    const material2 = new THREE.MeshStandardMaterial({
        color: '#333',
        // wireframe: true,
    })
    const material3 = new THREE.MeshStandardMaterial({
        color: '#ddd',
        // wireframe: true,
    })

    // Mesh
	const mesh = new THREE.Mesh(boxGeometry, material1);
    const mesh2 = new THREE.Mesh(planeGeometry, material2)
    const mesh3 = new THREE.Mesh(sphereGeometry, material3)


	// 그림자 설정
	mesh.castShadow = true;
	mesh.receiveShadow = true;
	mesh3.castShadow = true;
	mesh3.receiveShadow = true;
	mesh2.receiveShadow = true;

    mesh.position.y = .5
    mesh.position.x = 1

    mesh2.position.y = 0
    mesh2.rotation.x = -Math.PI * 0.5
   

    mesh3.position.y = 1
    mesh3.position.x = -1

	scene.add(mesh, mesh2, mesh3);




	// AxesHelper
	const axesHelper = new THREE.AxesHelper(3);
	scene.add(axesHelper);


	// Dat GUI
	const gui = new dat.GUI();
	gui.add(camera.position, 'x', -5, 5, 0.1).name('카메라 X');
	gui.add(camera.position, 'y', -5, 5, 0.1).name('카메라 Y');
	gui.add(camera.position, 'z', 2, 10, 0.1).name('카메라 Z');




	// 그리기
	const clock = new THREE.Clock();

	function draw() {
		const delta = clock.getDelta();
        const il = clock.getElapsedTime();


        light.position.x = Math.cos(il) * 3
        light.position.z = Math.sin(il) * 3




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
