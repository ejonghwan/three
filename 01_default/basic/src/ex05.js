import * as Three from 'three'

// 애니메이션 추가



export default () => {

    const canvas_1 = document.querySelector('canvas')
    const renderer = new Three.WebGLRenderer({ 
        canvas: canvas_1, 
        antialias: true,
        // alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1)
   


    // 씬
    const scene = new Three.Scene();
  



    // 카메라
    const camera = new Three.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    )
    camera.position.z = 5

    scene.add(camera)



    // Mesh
    const geometry = new Three.BoxGeometry(1, 1, 1);
    const material = new Three.MeshStandardMaterial({
        color: '#9b7fe6'
    });

    const mesh = new Three.Mesh(geometry, material)
    scene.add(mesh)




    // 빛
    const light = new Three.DirectionalLight('#fff', 2.3) //color, 빛 세기
    scene.add(light)
    light.position.x = 2
    light.position.y = 1
    light.position.z = 4

    
    const clock = new Three.Clock()


    // 애니메이션
    const draw = () => {

        // 화면에 그리기 
        mesh.position.x += 0.01
        //   console.log(mesh.position.x)
        if(mesh.position.x >= 2) {
            mesh.position.x = 2
        }

        
        // 이렇게 하면 모니터마다 주사율이 달라서 어떤 곳에선 1초에 60번, 노트북에선 30번 ...다 다를 수 있다
        // mesh.rotation.x += Three.MathUtils.degToRad(.1)


        // 그럴때 clock을 이용해서 절대 시간을 대입하면 어떤 환경에서든 같은 동작을 구현할 수 있다
        const time = clock.getElapsedTime()
        mesh.rotation.x = .5 * time ;
        // console.log(mesh.position.x)

        mesh.rotation.y += 0.003
        mesh.rotation.z += 0.005
        renderer.render(scene, camera)        
        //   window.requestAnimationFrame(draw)
        renderer.setAnimationLoop(draw)
    }
    


    

    draw()








    const setResize = e => {

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.render(scene, camera)
        
    }


    window.addEventListener('resize', setResize)



}