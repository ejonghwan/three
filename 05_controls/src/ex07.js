import * as THREE from 'three';
import { DragControls } from 'three/examples/jsm/controls/DragControls'

// ----- 주제: DragControls

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
	camera.position.z = 10;
	scene.add(camera);

				
	// Light
	const ambientLight = new THREE.AmbientLight('white', 0.5);
	scene.add(ambientLight);

	const directionalLight = new THREE.DirectionalLight('white', 1);
	directionalLight.position.x = 1;
	directionalLight.position.z = 2;
	scene.add(directionalLight);

	// Controls

	// Mesh
	const geometry = new THREE.BoxGeometry(1, 1, 1);
	let mesh;
	let material;
    let meshs = []

	for(let i = 0; i < 20; i++) {
		material = new THREE.MeshStandardMaterial({
			color: `rgb(${Math.round( 200 + Math.random() * 55 )}, ${Math.round( 100 + Math.random() * 155 )}, ${Math.round( 100 + Math.random() * 155 )} )`
		})

		mesh = new THREE.Mesh(geometry, material) 
		mesh.position.x = Math.random() * 6 - 3
		mesh.position.y = Math.random() * 6 - 3
		mesh.position.z = Math.random() * 6 - 3


        mesh.name = `box-${i}`
        meshs[i] = mesh

		scene.add(mesh)
	}
	
	scene.add(mesh);
    console.log(meshs)





	const controls = new DragControls(meshs, camera, renderer.domElement);
    console.dir(controls)

    controls.addEventListener('dragstart', e => console.log(e.object.name))
  

	// 그리기
	const clock = new THREE.Clock();

	function draw() {
		const delta = clock.getDelta();

		// controls.update(delta);

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
