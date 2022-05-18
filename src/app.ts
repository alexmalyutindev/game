import {
	AmbientLight,
	BoxGeometry,
	BufferGeometry,
	BufferGeometryLoader,
	Color,
	ConeBufferGeometry,
	DirectionalLight,
	Euler,
	Mesh,
	MeshBasicMaterial,
	MeshLambertMaterial,
	MeshStandardMaterial,
	PCFSoftShadowMap,
	PerspectiveCamera,
	PlaneGeometry,
	RingGeometry,
	Scene,
	ShadowMapType,
	ShadowMaterial,
	SphereGeometry,
	Vector3,
	VSMShadowMap,
	WebGLRenderer
} from 'three';

const scene = new Scene();
scene.background = new Color(0.5, 0.5, 0.5);
const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let geometry: BufferGeometry = new SphereGeometry();
const material = new MeshStandardMaterial(); // new MeshBasicMaterial({ color: 0x00ff00 });
const player = new Mesh(geometry, material);
player.position.y = 0.5;
player.castShadow = true;
player.receiveShadow = true;
scene.add(player);

const geomLoader = new BufferGeometryLoader();

geometry = new PlaneGeometry(5, 5, 1, 1);
const floor = new Mesh(geometry, material);
floor.rotation.x = -45;
floor.receiveShadow = true;
scene.add(floor);

const mainLight = new DirectionalLight();
mainLight.position.set(2, 2, 2);
mainLight.target.position.set(0, 0, 0);
mainLight.castShadow = true;

const ambLight = new AmbientLight(0xff11af, 0.1);

scene.add(mainLight, ambLight);

camera.position.z = 5;
camera.position.y = 1;
player.add(camera);

function renderLoop(): void {
	requestAnimationFrame(renderLoop);

	// player.position.x += 0.1;
	renderer.render(scene, camera);
};

renderLoop();