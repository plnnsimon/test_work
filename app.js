import { OrbitControls } from "https://threejs.org/examples/jsm/controls/OrbitControls.js";
// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color( 0xC0C0C0 );

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Camera
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

camera.position.x = 0;
camera.position.y = 3;
camera.position.z = 10;

// Grid helper
scene.add( new THREE.GridHelper(12,12) );

// Render
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true

// Lights
const light = new THREE.DirectionalLight( 0xFFFFFF, .2 );
light.position.set( 10, 10, 10 );
light.position.set( -10, -5, -1 );
scene.add( light );

const pointLight = new THREE.PointLight(0xffffff, .2)
pointLight.position.x = 1
pointLight.position.y = 2
pointLight.position.z = 3
scene.add(pointLight)


// Input scale + material

let material = new THREE.MeshPhongMaterial( {color: 0xffffff, emissive: 0x708090, shininess: 0} );
document.getElementById('create').onclick = createFunc;

let numbers = [];

function addScale () {
    let scale = document.getElementById('scale');
    scale = scale.value.trim().split(' ', 3);
    // numbers = numbers.concat(scale);
    // let newNumbers = numbers;
    // let numArr = newNumbers.map(number => Number(number))
    let scaleArr = scale.map(el => Number(el));
    // console.log(numArr);
    // return numArr;
    console.log(scaleArr);
    return scaleArr;
}

// objects position 
function positionFunc (shape) {
    shape.position.x = Math.random() * 10 - 5;
    shape.position.y = Math.random() * 5;
    shape.position.z = Math.random() * 10 - 5;
}

// Objects
// Sphere
let sphereObj = function () {
    if (scale.value == 0) {
        alert('scale is null')
    } else if (scale.value === NaN) {
        alert('Not A number')
    } else {
        let arr = addScale();
        
        let geometrySphere = new THREE.SphereGeometry( arr[0], arr[1], arr[2] );
        const sphere = new THREE.Mesh( geometrySphere, material );
        
        positionFunc(sphere)
        scene.add( sphere );
        createInfo(sphere);
        console.log(sphere);
        scale.value = '';
    }
}
// Cube
let cubeObj = function () {
    if (scale.value == 0) {
        alert('scale is null')
    } else {
        let arr = addScale();
        let geometryBox = new THREE.BoxGeometry( arr[0], arr[1], arr[2]);
        const cube = new THREE.Mesh( geometryBox, material );
        
        positionFunc(cube);
        scene.add( cube );
        createInfo(cube);
        scale.value = '';
    }
}
// Cone
let coneObj = function () {
    if (scale.value == 0) {
        alert('scale is null')
    } else {
        let arr = addScale();
        let geometryCone = new THREE.ConeGeometry( arr[0], arr[1], arr[2] );
        const cone = new THREE.Mesh( geometryCone, material );
        positionFunc(cone);
        cone.rotation.z = Math.random() * 5;
        cone.rotation.x = Math.random() * 5;
        cone.rotation.y = Math.random() * 5;
        scene.add( cone );
        console.log(scale.value[1]);
        createInfo(cone);
        scale.value = '';
    }
    
}

// UUID
function createInfo (shape) {
    let infoArea = document.querySelector('.info');
    let info = document.createElement('div');
    info.innerHTML = shape.uuid;
    info.classList.add('uuid');
    infoArea.appendChild(info);
    removeFunc(shape);
} 

// Remove Button
function removeFunc (shape) {

    let removeBtn = document.createElement('button');
    removeBtn.innerHTML = "X";
    removeBtn.classList.add('remove');
    removeBtn.onclick = function () {
        document.querySelector(".uuid").remove();
        scene.remove(shape);
        removeBtn.remove();
    }
    document.querySelector('.info').appendChild(removeBtn);
}

// Create btn + geometries
function createFunc () {

    let selectedValue = document.getElementById('select').value;

    if (selectedValue === "sphere") {
        sphereObj();    
    } 
    if (selectedValue === "cube") {
        cubeObj();
    } 
    if (selectedValue === "cone") {
        coneObj();
    }  
};

// Animate function
function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}
animate();