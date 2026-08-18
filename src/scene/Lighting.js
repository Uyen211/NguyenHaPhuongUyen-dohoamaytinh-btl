import * as THREE from 'three';

export function createLighting(scene) {
	// 1. Ambient Light (Ánh sáng môi trường toàn cảnh dịu sáng, chuẩn dải màu)
	const ambientLight = new THREE.AmbientLight(0xffffff, 1.15);
	scene.add(ambientLight);

	// 2. Directional Light (Key Light - Đèn chiếu chính từ góc trên cao)
	const frontLight = new THREE.DirectionalLight(0xfff8ee, 1.25);
	frontLight.position.set(0, 16, 12);
	frontLight.castShadow = true;
	frontLight.shadow.mapSize.width = 2048;
	frontLight.shadow.mapSize.height = 2048;
	frontLight.shadow.camera.near = 0.5;
	frontLight.shadow.camera.far = 40;
	frontLight.shadow.camera.left = -14;
	frontLight.shadow.camera.right = 14;
	frontLight.shadow.camera.top = 14;
	frontLight.shadow.camera.bottom = -14;
	scene.add(frontLight);

	// 4. PointLight trung tâm biến đổi sắc màu nhịp nhàng
	const pointLight = new THREE.PointLight(0xff99ff, 60, 25);
	pointLight.position.set(0, 4.5, 2.0);
	scene.add(pointLight);

	return {
		ambientLight,
		frontLight,
		pointLight,
	};
}