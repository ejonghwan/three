import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// ----- 주제: 벽돌모양 스탠다드 재질에 좀더 입체감 주기

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

    const texture4 = textureLoader.load('./textures/mcstyle/right.png')
    const texture5 = textureLoader.load('./textures/mcstyle/left.png')
    const texture6 = textureLoader.load('./textures/mcstyle/top.png')
    const texture7 = textureLoader.load('./textures/mcstyle/bottom.png')
    const texture8 = textureLoader.load('./textures/mcstyle/front.png')
    const texture9 = textureLoader.load('./textures/mcstyle/back.png')
    const materials = [
        new THREE.MeshLambertMaterial({ map: texture4}), 
        new THREE.MeshLambertMaterial({ map: texture5}), 
        new THREE.MeshLambertMaterial({ map: texture6}), 
        new THREE.MeshLambertMaterial({ map: texture7}), 
        new THREE.MeshLambertMaterial({ map: texture8}), 
        new THREE.MeshLambertMaterial({ map: texture9}), 
    ]

    texture4.magFilter = THREE.NearestFilter;
    texture5.magFilter = THREE.NearestFilter;
    texture6.magFilter = THREE.NearestFilter;
    texture7.magFilter = THREE.NearestFilter;
    texture8.magFilter = THREE.NearestFilter;
    texture9.magFilter = THREE.NearestFilter;


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
	camera.position.z = 5;
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


    const brickTextrue1 = textureLoader.load('./textures/brick/Brick_Wall_019_basecolor.jpg')
    const brickTextrue2 = textureLoader.load('./textures/brick/Brick_Wall_019_ambientOcclusion.jpg')
    const brickTextrue3 = textureLoader.load('./textures/brick/Brick_Wall_019_height.png')
    const brickTextrue4 = textureLoader.load('./textures/brick/Brick_Wall_019_normal.jpg')
    const brickTextrue5 = textureLoader.load('./textures/brick/Brick_Wall_019_roughness.jpg')

	// 하이라이트, 반사광이 없는 재질
	const material1 = new THREE.MeshStandardMaterial({
		// color: 'hotpink',
		// wireframe: true,
		roughness: 0.01,
		metalness: 0.3,
		side: THREE.FrontSide,
		side: THREE.BackSide,
		side: THREE.DoubleSide,
		map: brickTextrue1, // 베이직 이미지
		normalMap: brickTextrue4, // 디테일 
		roughnessMap: brickTextrue5, //디테일
		aoMap: brickTextrue2, // 그림자 조금 더 진하게 명암
		aoMapIntensity: 5, //aoMap 조절
		
	});

	const material2 = new THREE.MeshPhongMaterial({
		color: '#ddd',
		map: texture2,
	})

	const material3 = new THREE.MeshLambertMaterial({
		color: '',
		map: texture3,
		
	})

    const material4 = new THREE.MeshLambertMaterial({
        color: '#fff',
        // map: texture4,
    })



    // 매캡 이미지로 재질
    // const loader = new THREE.TextureLoader()
    // const textrue = loader.load('./매탭 이미지 경로')
    // const material7 = new THREE.MeshMatcapMaterial({
    //     color: '#fff',
    //     matcap: textrue,
    // })

    // const mesh = new THREE.Mesh(geometry, material7)
    // scene.add(mesh)

    


        
    const gradiuntTexture = textureLoader.load('./textures/gradient.png')
    const geometryCon = new THREE.ConeGeometry(1, 2, 120)
    const material5 = new THREE.MeshToonMaterial({
        color: 'plum',
        // map: texture4,
        gradientMap: gradiuntTexture,
        
    });
    gradiuntTexture.magFilter = THREE.NearestFilter

    const material6 = new THREE.MeshNormalMaterial({
        // color: 'blue',
    })

    

	
	const mesh = new THREE.Mesh(geometry1, material1);
	const mesh2 = new THREE.Mesh(geometry1, material2)
	const mesh3 = new THREE.Mesh(geometry1, material3)
    const mesh4 = new THREE.Mesh(geometry1, materials)
    
    const mesh5 = new THREE.Mesh(geometryCon, material5) //toon 
    const mesh6 = new THREE.Mesh(geometry1, material6) 

	scene.add(mesh, mesh2, mesh3, mesh4, mesh5, mesh6)

	mesh2.position.y = 1
	mesh3.position.y = 2
    mesh4.position.x = 2.5
    mesh5.position.x = 2.5
    mesh5.position.y = 1.6
    mesh6.position.x = -1.5
	

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
