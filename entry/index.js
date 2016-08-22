import '../public/common/scss/common.scss';
import '../scss/index.scss';

import THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth/window.innerHeight,
    0.1,
    1000
)

const renderer = new THREE.WebGLRenderer();

renderer.setClearColor(new THREE.Color(0xEEEEEE));
renderer.setSize(window.innerWidth,window.innerHeight);

const axes = new THREE.AxisHelper( 20 );
scene.add(axes);


scene.add(
    //平面
    (function(){
        const planeGeometry = new THREE.PlaneGeometry(60,20);
        const planeMaterial = new THREE.MeshBasicMaterial({color:0xffffff});

        const plane = new THREE.Mesh(planeGeometry,planeMaterial);

        plane.rotation.x = -0.5 * Math.PI;
        plane.position.x = 15;
        plane.position.y = 0;
        plane.position.z = 0;
        return plane
    })()
);

scene.add(
    //cube
    (function(){
        const cubeGeometry = new THREE.CubeGeometry(4,4,4);
        const cubeMaterial = new THREE.MeshBasicMaterial({
            color:0xff0000,
            wireframe:true
        });
        const cube = new THREE.Mesh(cubeGeometry,cubeMaterial);
        cube.position.x = -4;
        cube.position.y = 3;
        cube.position.z = 0;
        return cube;
    })()
)

camera.position.x = -30;
camera.position.y = 40;
camera.position.z = 30;
camera.lookAt(scene.position);

//光源
const spotLight = new THREE.SpotLight( 0xffffff );
spotLight.position.set(-40,60,-10);
scene.add( spotLight );

console.log(renderer.domElement)
document.getElementById('three_place').appendChild( renderer.domElement );
renderer.render(scene,camera);
