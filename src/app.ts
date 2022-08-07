import {
	AmbientLight,
	BufferGeometry,
	BufferGeometryLoader,
	CapsuleGeometry,
	Color,
	DirectionalLight,
	Mesh,
	MeshStandardMaterial,
	Object3D,
	PerspectiveCamera,
	PlaneGeometry,
	Scene,
	SphereGeometry,
	Vector3,
	WebGLRenderer
} from 'three';

import { InputSystem } from './InputSystem';
import * as scenes from './Scenes'

// Init Renderer
const renderer = new WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Init Input
const input = new InputSystem(window);

// Load Scene
const scene = scenes.LoadMainScene();

// Load Player
let geometry: BufferGeometry = new CapsuleGeometry();
const material = new MeshStandardMaterial();
const player = new Object3D();

const playerMesh = new Mesh(geometry, material);
playerMesh.position.y = 0.5;
playerMesh.scale.set(0.25, 0.25, 0.25);
playerMesh.castShadow = true;
playerMesh.receiveShadow = true;
player.add(playerMesh);

const camera = new PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 5, -5);
camera.lookAt(player.position);
player.add(camera);

scene.add(player);

const moveSpeed = 0.03;
const movement = new Vector3(0, 0, 0);

function renderLoop(): void {
	requestAnimationFrame(renderLoop);

	input.axis.normalize();
	movement.set(-input.axis.x * moveSpeed, 0, input.axis.y * moveSpeed)

	player.position.add(movement);
	renderer.render(scene, camera);
};

renderLoop();