import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import * as CANNON from 'cannon-es'


// ----- 주제: cannon.js 기본 세팅

// cannon.js 문서
// http://schteppe.github.io/cannon.js/docs/
// 주의! https 아니고 http

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
	const controls = new OrbitControls(camera, renderer.domElement)


	// Mesh
	const geometry = new THREE.BoxGeometry(.5, 5, .02);
	const floorGeometry = new THREE.PlaneGeometry(10, 10)
	const material = new THREE.MeshStandardMaterial({
		color: 'seagreen',
		wireframe: true,
	});
	const floorMaterial = new THREE.MeshStandardMaterial({
		color: '#fff',
		wireframe: true,
	})

	
	const boxMesh = new THREE.Mesh(geometry, material);
	const floorMesh = new THREE.Mesh(floorGeometry, floorMaterial)

	scene.add(boxMesh, floorMesh);

	boxMesh.position.y = .5
	floorMesh.rotation.x = -Math.PI * .5

	
	


	
	// cannon 
	// 1. 월드 만들기
	const cannonWorld = new CANNON.World();

	// 2. 중력 만들기 (지구9.8, 달 중력이 다르듯 중력셋팅도 함)
	cannonWorld.gravity.set(0, -10, 0) //x y z 지금은 위에서 아래로 떨어지면 되니 y축만

	// 3. 캐논 요소 만들기... (three.js 요소에 덧붙일 요소들)
	const floorShape = new CANNON.Plane() // 1. 요소만들고 
	const floorBody = new CANNON.Body({ // 2. 바디만들고 추가
		mass: 0, //바닥도 셋팅안해주면 중력영향을 받기떄문에 ...0으로 설정 
		position:  new CANNON.Vec3(0, 0, 0), //위치 vector
		shape: floorShape,
	})
	cannonWorld.addBody(floorBody)


	floorBody.quaternion.setFromAxisAngle( // 3. 플렌요소를 바닥으로 로테이션해줌
		new CANNON.Vec3(-1, 0, 0),// 축생성 
		Math.PI / 2 //90 각도설정
	)

	// boxShape 
	const boxShape = new CANNON.Box(new CANNON.Vec3(.25, 2.5, .01)); // 중삼에서 어디까지 갈건지 three: 1 이라면 cannon: .5
	const boxBody = new CANNON.Body({
		mass: 1, // 무게..충격
		position: new CANNON.Vec3(0, 10, 0), //y 3 조금 띄움
		shape: boxShape,
	})

	cannonWorld.addBody(boxBody)




	// 그리기
	const clock = new THREE.Clock();

	function draw() {
		const delta = clock.getDelta(); // draw함수 실행 간격 
		
		let cannonStepTime = 1/60
		if(delta < 0.01) { cannonStepTime = 1/120 }
 		cannonWorld.step(cannonStepTime, delta, 3) // 시간단계 셋팅.. 1/60 프레임, 시간차,  잠재적으로 지연되거나 차이가 벌어지는걸 몇번 보정할건지 
		// floorMesh.position.copy(floorBody.position)// 물리엔진 body가 mesh를 따라가게끔 만듦
		boxMesh.position.copy(boxBody.position)// 물리엔진 body가 mesh를 따라가게끔 만듦
		boxMesh.quaternion.copy(boxBody.quaternion) //캐논에서도 쿼터니언써서 여기서도 쿼터니언 카피


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
