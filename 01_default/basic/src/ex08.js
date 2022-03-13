import * as Three from 'three'

// 여러개 만들기 안개



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
    scene.fog = new Three.Fog('black', 3, 7)
  



    // 카메라
    const camera = new Three.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    )
    camera.position.z = 5
    camera.position.y = 1

    scene.add(camera)



    // Mesh
    const geometry = new Three.BoxGeometry(1, 1, 1);
    const material = new Three.MeshStandardMaterial({
        color: '#9b7fe6'
    });

    // const mesh = new Three.Mesh(geometry, material)
    // scene.add(mesh)




    // 빛
    const light = new Three.DirectionalLight('#fff', 2.3) //color, 빛 세기
    scene.add(light)
    light.position.x = 1
    light.position.y = 2
    light.position.z = 7

    

    const meshs = []
    let mesh;

    for(let i = 0; i < 3; i++){
        mesh = new Three.Mesh(geometry, material)
        mesh.position.x = Math.random() * 5 - 2.5
        mesh.position.z = Math.random() * 5 - 2.5
        scene.add(mesh);
        meshs.push(mesh)
        // meshs[i]
    }

    // console.log(meshs)
    


    let oldTime = Date.now()
    // 애니메이션
    const draw = () => {

        const newTime = Date.now(); 
        const time = newTime - oldTime; 
        oldTime = newTime

        // meshs.forEach(item => {
        //     item.rotation.y +=  time * 0.001 ;
        // });

        for(let i = 0; i < meshs.length; i++) {
            // 화면에 그리기 
            // mesh[i].position.x += 0.01
            // if(mesh[i].position.x >= 2) {
            //     mesh[i].position.x = 2
            // }

            // console.log(1)
            
            // console.log(Date.now())

            meshs[i].rotation.x += time * 0.001 ;

            meshs[i].rotation.y += 0.003
            meshs[i].rotation.z += 0.005
            
        }

        
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