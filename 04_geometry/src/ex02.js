import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// ----- 주제: Geometry 기본

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
	camera.position.z = 50;
	scene.add(camera);




	// Light
	const ambientLight = new THREE.AmbientLight('white', 0.5);
	scene.add(ambientLight);

	const directionalLight = new THREE.DirectionalLight('white', 1);
	directionalLight.position.x = 1;
	directionalLight.position.z = 2;
	scene.add(directionalLight);


	const controls = new OrbitControls(camera, renderer.domElement);


	// Mesh
    const geometry = new THREE.SphereGeometry( 10, 50, 50, 50 );
	const material = new THREE.MeshStandardMaterial({
		color: 'hotpink',
		wireframe: true,
		side: THREE.DoubleSide,
        flatShading: true,
		
	});
	const mesh = new THREE.Mesh(geometry, material);
	scene.add(mesh);

    // 점 컨트롤
    // console.log(geometry.attributes.position.array)
    
    const geoArr = geometry.attributes.position.array;
    let cloneGeoArr = []


    for(let i = 0; i < geoArr.length; i = i + 3) {
        geoArr[i] = geoArr[i] + (Math.random() - 0.5) * 0.01
        geoArr[i + 1] = geoArr[i + 1] + (Math.random() - 0.5) * 0.01
        geoArr[i + 2] = geoArr[i + 2] + (Math.random() - 0.5) * 0.01

        cloneGeoArr[i] = geoArr[i] + (Math.random() - 0.5) * 0.01
        cloneGeoArr[i + 1] = geoArr[i + 1] + (Math.random() - 0.5) * 0.01
        cloneGeoArr[i + 2] = geoArr[i + 2] + (Math.random() - 0.5) * 0.01
    }






	// 그리기
	const clock = new THREE.Clock();
    
	function draw() {
		// const delta = clock.getDelta();
		const time = clock.getElapsedTime();

        


        /*
            처음에 내가 했던 게 안됐던 이유는 랜덤된 좌표가 draw안에 있어서 계속 랜덤좌표가 찍혔기 때문.... 
            그게 아니라 랜덤된 좌표를 하나 만들어준 다음 그 좌표안에서 조금씩 변화를 줘야됨 아래처럼 .....공 자체는 멈춰있어야 하기 때문
        */    
        for(let i = 0; i < geoArr.length; i += 3) {
            // geoArr[i] = cloneGeoArr[i] + Math.sin( time * Math.random() - 0.5 ) * 0.2
            // geoArr[i + 1] = cloneGeoArr[i + 1] + Math.sin( time * Math.random() - 0.5 ) * 0.2
            // geoArr[i + 2] = cloneGeoArr[i + 2] + Math.sin( time * Math.random() - 0.5 ) * 0.2

            geoArr[i] +=  Math.sin( time + cloneGeoArr[i] * 50 ) * 0.001
            geoArr[i + 1] +=  Math.sin( time + cloneGeoArr[i + 1] * 50 ) * 0.001
            geoArr[i + 1] +=  Math.sin( time + cloneGeoArr[i + 2] * 50 ) * 0.001
            geometry.attributes.position.needsUpdate = true
            
        }

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
