import * as Three from 'three'

// 빛 추가



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
    camera.position.x = 1
    camera.position.y = 2
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

    
    









    // 화면에 그리기 
    renderer.render(scene, camera)






    const setResize = e => {

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.render(scene, camera)
        
    }


    window.addEventListener('resize', setResize)



}