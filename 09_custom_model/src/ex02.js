import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

// ----- 주제: 애니매이션 줘보기 

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
	scene.add(camera);

	// Light
	const ambientLight = new THREE.AmbientLight('white', 0.5);
	scene.add(ambientLight);

	const directionalLight = new THREE.DirectionalLight('white', 1);
	directionalLight.position.x = 1;
	directionalLight.position.z = 2;
	scene.add(directionalLight);

	// Controls
	const controls = new OrbitControls(camera, renderer.domElement);

	// gltf loader
    const gltfLoader = new GLTFLoader();
    let mixer; //애니메이션 믹서 draw에서 사용
	gltfLoader.load(
		'/models/ilbuni.glb',
		gltf => {
			//load가 끝나면 인자로 들어옴
			console.log(gltf)
			const cMesh = gltf.scene.children[0] //mesh
			scene.add(cMesh)

            mixer = new THREE.AnimationMixer(cMesh)
            const actions = [];
            actions[0] = mixer.clipAction(gltf.animations[0])
            actions[1] = mixer.clipAction(gltf.animations[1])
            actions[0].play();
            actions[1].play();

            
            actions[1].repetitions = 2 //반복횟수 지정 
            actions[1].clampWhenFinished = true // 끝날때 그 위치로 스톱            
		}
	)

		
	// 그리기
	const clock = new THREE.Clock();


	function draw() {
		const delta = clock.getDelta();
        
        if(mixer) mixer.update(delta)

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
