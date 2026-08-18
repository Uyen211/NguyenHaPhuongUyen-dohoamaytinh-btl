import * as THREE from 'three';

export class DanceAnimator {
	constructor(character, lighting = null, stage = null) {
		this.char = character;
		this.lighting = lighting;
		this.stage = stage;
		this.bpm = 128;

		// Quản lý vị trí & góc xoay nội suy
		this.currentPos = new THREE.Vector3(0, 0, 0);
		this.targetPos = new THREE.Vector3(0, 0, 0);
		this.targetRotY = 0;
		this.lastTime = 0;
	}

	update(time) {
		const dt = Math.min(0.05, time - this.lastTime || 0.016);
		this.lastTime = time;

		const beat = (time * this.bpm) / 60;
		const t = time * 3.8;

		const {
			characterGroup,
			torsoGroup,
			headGroup,
			leftEar,
			rightEar,
			leftArm,
			rightArm,
			leftLeg,
			rightLeg,
			tailBones
		} = this.char;

		// Reset độ nghiêng khớp chính
		characterGroup.rotation.x = 0;
		characterGroup.rotation.z = 0;

		// ==========================================
		// 1. TÍNH TOÁN HOẠT ẢNH NHẢY BẬT CAO LIÊN TỤC
		// ==========================================
		const jumpPhase = Math.sin(beat * Math.PI);
		const jumpY = Math.max(0, jumpPhase) * 1.2; // Độ cao nhảy tối đa 1.2m
		this.targetPos.set(0, jumpY, 0);
		this.targetRotY += dt * 5.0; // Xoay tròn liên tục khi nhảy2

		// // Nội suy vị trí & áp dụng góc xoay Y
		const lerpFactor = Math.min(1.0, dt * 7.5);
		this.currentPos.lerp(this.targetPos, lerpFactor);
		characterGroup.position.copy(this.currentPos);
		characterGroup.rotation.y = this.targetRotY;


		// Hiệu ứng sinh học Squash & Stretch (Nén/Giãn cơ thể khi nhảy và chạm đất)
		const isAirborne = this.currentPos.y > 0.3;
		let squash = isAirborne ? 1.22 : 0.75;
		torsoGroup.scale.set(1 / Math.sqrt(squash), squash, 1 / Math.sqrt(squash));


		leftEar.rotation.z = Math.sin(time * 0.4) * 0.5;
		rightEar.rotation.z = Math.sin(time * 0.4) * 0.5;

		// 2. ĐỒNG BỘ ÁNH SÁNG (Center Spotlight & PointLight)
		// ==========================================
		if (this.lighting) {
			const { pointLight } = this.lighting;

			if (pointLight) {
				const hue = (time * 0.15) % 1.0;
				pointLight.color.setHSL(hue, 1.0, 0.55);
			}
		}
	}
}