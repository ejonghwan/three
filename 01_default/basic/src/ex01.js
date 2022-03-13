import * as Three from 'three'

// 기본 구조 공부



export default () => {

    // const renderer = new Three.WebGLRenderer();

    // renderer.setSize(window.innerWidth, window.innerHeight);
    // document.body.appendChild(renderer.domElement)


    const canvas_1 = document.querySelector('canvas')
    const renderer = new Three.WebGLRenderer({ canvas: canvas_1, antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);



    // 씬
    const scene = new Three.Scene();



    // 카메라
    const camera = new Three.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    )

    camera.position.x = 1
    camera.position.y = 2
    camera.position.z = 5

    scene.add(camera)



    // Mesh
    const geometry = new Three.BoxGeometry(1, 1, 1);
    const material = new Three.MeshBasicMaterial({
        color: 'red'
    });

    const mesh = new Three.Mesh(geometry, material)
    scene.add(mesh)





    // 화면에 그리기 
    renderer.render(scene, camera)





    console.log(canvas_1)
    console.log(renderer)
}