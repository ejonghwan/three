import * as Three from 'three'

// 기본 구조 공부



export default () => {

    // const renderer = new Three.WebGLRenderer();

    // renderer.setSize(window.innerWidth, window.innerHeight);
    // document.body.appendChild(renderer.domElement)


    const canvas_1 = document.querySelector('canvas')
    const renderer = new Three.WebGLRenderer({ 
        canvas: canvas_1, 
        antialias: true,
        alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1)
    // console.log(window.devicePixelRatio) // 픽셀 밀도 mac 2  window 1 ...mac은 100px 이미지를 표현할때 200픽셀 쓴다는 뜻 그래서 작으면 꺠져보임
    // 1보다 크면 2로..아님 1로  처리해줘야 성능에 좋음


    // renderer.setClearAlpha(.1)
    // renderer.setClearColor('blue')




    // 씬
    const scene = new Three.Scene();
    // const color = new Three.Color('red')
    // scene.background = color



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
        color: '#9b7fe6'
    });

    const mesh = new Three.Mesh(geometry, material)
    scene.add(mesh)





    // 화면에 그리기 
    renderer.render(scene, camera)




    const setResize = e => {
        // console.log(e)

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.render(scene, camera)

        // console.log(camera)
        
    }


    window.addEventListener('resize', setResize)



    // console.log(canvas_1)
    // console.log(renderer)
}