import * as THREE from 'three';

export function createChuotIdol(scene) {
	// ==========================================
	// 0. BẢNG MÀU HOẠT HÌNH (Pastel Palette)
	// ==========================================
	const matFur = new THREE.MeshStandardMaterial({ color: 0xe08b3c, roughness: 0.65, metalness: 0.02 });
	const matCream = new THREE.MeshStandardMaterial({ color: 0xffeed4, roughness: 0.6, metalness: 0.02 });
	const matPink = new THREE.MeshStandardMaterial({ color: 0xf29197, roughness: 0.5 });
	const matInnerEar = new THREE.MeshStandardMaterial({ color: 0xdb6b71, roughness: 0.6 });
	const matEye = new THREE.MeshStandardMaterial({ color: 0x121013, roughness: 0.05, metalness: 0.3 });
	const matEyeShine = new THREE.MeshBasicMaterial({ color: 0xffffff });
	const matDark = new THREE.MeshBasicMaterial({ color: 0x3d2012 });

	const hamster = new THREE.Group();

	function addMesh(parent, geo, mat, castShadow = true, receiveShadow = true) {
		const mesh = new THREE.Mesh(geo, mat);
		mesh.castShadow = castShadow;
		mesh.receiveShadow = receiveShadow;
		parent.add(mesh);
		return mesh;
	}

	// ==========================================
	// 1. THÂN BÉO GỌN GÀNG (Tỉ lệ chuẩn Chibi)
	// ==========================================
	const torsoGroup = new THREE.Group();
	torsoGroup.position.set(0, 0.58, 0);
	hamster.add(torsoGroup);

	// Thân tròn nhỏ hơn đầu một chút, đáy múp
	const body = addMesh(torsoGroup, new THREE.SphereGeometry(0.65, 32, 28), matFur);
	body.scale.set(1.02, 0.95, 0.98);

	// Bụng sữa mềm mại ôm trọn mặt trước
	const belly = addMesh(torsoGroup, new THREE.SphereGeometry(0.56, 26, 24), matCream);
	belly.scale.set(0.9, 0.92, 0.4);
	belly.position.set(0, -0.04, 0.46);

	// ==========================================
	// 2. ĐẦU TO NỔI BẬT & KHUÔN MẶT CÂN ĐỐI
	// ==========================================
	const headGroup = new THREE.Group();
	headGroup.position.set(0, 1.22, 0.02);
	hamster.add(headGroup);

	// Hộp sọ to tròn Chibi
	const head = addMesh(headGroup, new THREE.SphereGeometry(0.74, 32, 28), matFur);
	head.scale.set(1.05, 0.92, 1.0);


	// Cặp má phồng ngậm hạt chữ :3
	function makeMuzzlePuff(side) {
		const puff = addMesh(headGroup, new THREE.SphereGeometry(0.24, 20, 18), matCream);
		puff.scale.set(1.12, 0.82, 0.8);
		puff.position.set(side * 0.16, -0.16, 0.65);
		return puff;
	}
	makeMuzzlePuff(1);
	makeMuzzlePuff(-1);

	// Mũi hạt đậu hồng
	const nose = addMesh(headGroup, new THREE.SphereGeometry(0.065, 16, 16), matPink);
	nose.scale.set(1.15, 0.75, 0.9);
	nose.position.set(0, -0.08, 0.78);

	// Miệng chữ vòm cười xinh
	const mouth = addMesh(headGroup, new THREE.TorusGeometry(0.06, 0.015, 8, 16, Math.PI), matDark);
	mouth.position.set(0, -0.21, 0.75);
	mouth.rotation.x = Math.PI * 0.95;

	// Lưỡi hồng tí hon
	const tongue = addMesh(headGroup, new THREE.SphereGeometry(0.045, 12, 12), matPink);
	tongue.scale.set(1.0, 0.7, 0.6);
	tongue.position.set(0, -0.24, 0.73);

	// ==========================================
	// 3. MẮT LONG LANH & RÂU CHUỘT
	// ==========================================
	function makeEye(side) {
		const eyeGroup = new THREE.Group();
		eyeGroup.position.set(side * 0.36, 0.08, 0.62);

		// Mắt đen tròn
		const eye = addMesh(eyeGroup, new THREE.SphereGeometry(0.125, 20, 20), matEye);
		eye.scale.set(0.9, 1.05, 0.5);

		// Đốm sáng to chính
		const shine1 = addMesh(eyeGroup, new THREE.SphereGeometry(0.045, 12, 12), matEyeShine, false, false);
		shine1.position.set(side * -0.02, 0.04, 0.09);

		// Đốm sáng nhỏ phụ
		const shine2 = addMesh(eyeGroup, new THREE.SphereGeometry(0.02, 8, 8), matEyeShine, false, false);
		shine2.position.set(side * 0.03, -0.035, 0.08);

		headGroup.add(eyeGroup);

		// Lông mày biểu cảm
		const brow = addMesh(headGroup, new THREE.BoxGeometry(0.07, 0.018, 0.02), matDark);
		brow.position.set(side * 0.32, 0.28, 0.62);
		brow.rotation.z = side * -0.15;
	}
	makeEye(1);
	makeEye(-1);

	// Râu mọc từ má phồng chĩa sang 2 bên
	function makeWhiskers(side) {
		for (let i = 0; i < 2; i++) {
			const whisker = addMesh(headGroup, new THREE.CylinderGeometry(0.005, 0.003, 0.5, 8), matDark);
			whisker.position.set(side * 0.46, -0.14 + i * 0.08, 0.6);
			whisker.rotation.z = Math.PI / 2 + side * (-0.12 + i * 0.24);
			whisker.rotation.y = side * 0.35;
		}
	}
	makeWhiskers(1);
	makeWhiskers(-1);

	// ==========================================
	// 4. ĐÔI TAI TRÒN KHUM ĐẶC TRƯNG
	// ==========================================
	function makeEar(side) {
		const earGroup = new THREE.Group();
		earGroup.position.set(side * 0.68, 0.4, 0);
		earGroup.rotation.set(0, side * (Math.PI / 2), 0);

		const outer = addMesh(earGroup, new THREE.CylinderGeometry(0.22, 0.22, 0.05, 24), matFur);
		outer.rotation.x = Math.PI / 2;

		const inner = addMesh(earGroup, new THREE.CylinderGeometry(0.15, 0.15, 0.06, 20), matInnerEar);
		inner.rotation.x = Math.PI / 2;
		inner.position.z = 0.01;

		headGroup.add(earGroup);
		return earGroup;
	}
	const leftEar = makeEar(-1);
	const rightEar = makeEar(1);

	// ==========================================
	// 5. TAY DORAEMON ÔM NGỰC & CHÂN CHẠM SÀN
	// ==========================================
	// Tay hình cầu tròn Doraemon đặt trước ngực (Z > R_bụng)
	function makeDoraemonArm(side) {
		const shoulder = new THREE.Group();
		shoulder.position.set(side * 0.2, 0.26, 0.62); // Đặt ngay dưới cằm, chụm vào giữa
		torsoGroup.add(shoulder);

		const paw = addMesh(shoulder, new THREE.SphereGeometry(0.11, 18, 18), matCream);
		paw.scale.set(1.0, 1.0, 1.0);

		return { shoulder, elbow: shoulder, hand: paw };
	}
	const leftArm = makeDoraemonArm(-1);
	const rightArm = makeDoraemonArm(1);

	// Chân to bè dạng hạt dưa, tiến về phía trước chạm sát mặt sàn (y=0)
	function makeLeg(side) {
		const legRoot = new THREE.Group();
		legRoot.position.set(side * 0.36, -0.52, 0.38); // Đưa về phía trước để nhìn rõ
		torsoGroup.add(legRoot);

		const foot = addMesh(legRoot, new THREE.SphereGeometry(0.17, 18, 16), matPink);
		foot.scale.set(1.15, 0.45, 1.45);
		foot.position.set(0, 0.02, 0.05);

		return { legRoot, knee: legRoot, foot };
	}
	const leftLeg = makeLeg(-1);
	const rightLeg = makeLeg(1);

	// Đuôi cụt tròn marshmallow phía sau
	const tailMesh = addMesh(torsoGroup, new THREE.SphereGeometry(0.1, 16, 16), matCream);
	tailMesh.position.set(0, -0.32, -0.62);
	const tailBones = [tailMesh];

	scene.add(hamster);

	return {
		characterGroup: hamster,
		torsoGroup,
		headGroup,
		leftEar,
		rightEar,
		leftArm,
		rightArm,
		leftLeg,
		rightLeg,
		tailBones
	};
}