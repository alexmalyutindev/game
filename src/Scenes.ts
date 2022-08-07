import {
	AmbientLight,
	BufferGeometry,
	BufferGeometryLoader,
	Color,
	DirectionalLight,
	Mesh,
	MeshStandardMaterial,
	PerspectiveCamera,
	PlaneGeometry,
	Scene,
	SphereGeometry
} from "three"

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const gltfLoader = new GLTFLoader();

export function LoadMainScene(): Scene {

	const scene = new Scene();
	scene.background = new Color(0.5, 0.5, 0.5);

	const material = new MeshStandardMaterial();

	gltfLoader.load('resources/game_level_scene_low_poly/scene.gltf', (gltf) => {
		gltf.scene.receiveShadow = true;
		scene.add(gltf.scene);
	});

	const mainLight = new DirectionalLight();
	mainLight.position.set(2, 2, -2);
	mainLight.target.position.set(0, 0, 0);
	mainLight.castShadow = true;

	const ambLight = new AmbientLight(0xff11af, 0.1);

	scene.add(mainLight, ambLight);

	return scene;
} 