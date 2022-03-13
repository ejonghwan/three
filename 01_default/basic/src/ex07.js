import * as Three from 'three'

// 애니메이션 추가 getDelta.. 일랩스타임이랑 같이쓰면 안됨



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

    
    let oldTime = Date.now()
    // 애니메이션
    const draw = () => {

        const newTime = Date.now(); 
        const time = newTime - oldTime; 
        oldTime = newTime

        // 화면에 그리기 
        mesh.position.x += 0.01
        if(mesh.position.x >= 2) {
            mesh.position.x = 2
        }

        
        // console.log(Date.now())

        mesh.rotation.x +=  time * 0.001 ;

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