import * as THREE from 'three';

export function createStage(scene) {
	const stageGroup = new THREE.Group();

	// ==========================================
	// 1. SÀN SÂN KHẤU CHÍNH HÌNH ĐĨA TRÒN PHẲNG (Màu hồng pastel trơn)
	// ==========================================
	const stageGeom = new THREE.CylinderGeometry(9.2, 9.4, 0.45, 64);
	const stageMat = new THREE.MeshStandardMaterial({
		color: 0xff99cc, // Màu hồng pastel ngọt ngào
		roughness: 0.2,
		metalness: 0.1,
	});

	const mainStage = new THREE.Mesh(stageGeom, stageMat);
	mainStage.position.set(0, -0.22, 0);
	mainStage.receiveShadow = true;
	stageGroup.add(mainStage);

	scene.add(stageGroup);

	return {
		stageGroup
	};
}