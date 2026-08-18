import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { DanceAnimator } from './animation/DanceAnimator.js';
import { createChuotIdol } from './character/ChuotIdol.js';
import { createLighting } from './scene/Lighting.js';
import { createStage } from './scene/Stage.js';
import './style.css';

// 1. Khởi tạo Khung chứa Ứng dụng
const container = document.querySelector('#app');

// 2. Khởi tạo Scene (Không gian 3D Concert Tươi Sáng Lộng Lẫy)
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x4a8198); // Màu xanh bầu trời đậm
scene.fog = new THREE.FogExp2(0x4a8198, 0.02); // Hiệu ứng sương mù ánh sáng dịu nhẹ

// 3. Khởi tạo Camera phối cảnh (PerspectiveCamera)
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100.0);
camera.position.set(0, 4.2, 10.5);

// 4. Khởi tạo Renderer (Cấu hình màu sắc, bóng đổ, khử răng cưa)
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputColorSpace = THREE.SRGBColorSpace;
container.appendChild(renderer.domElement);

// 5. Khởi tạo OrbitControls điều khiển xoay camera 360 độ bằng chuột
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 1.8, 0); // Khóa điểm nhìn vào trung tâm nhân vật
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.maxPolarAngle = Math.PI / 2 + 0.02; // Không cho xoay xuống dưới mặt đất
controls.minDistance = 3.0;
controls.maxDistance = 20.0;
controls.update();

// 6. Xây dựng các mô-đun bối cảnh & nhân vật
const lighting = createLighting(scene);
const stage = createStage(scene);
const chuotIdol = createChuotIdol(scene);

// PHÓNG TO NHÂN VẬT CHUỘT HAMSTER IDOL (Tăng ~1.65 lần để nổi bật vừa vặn trên sân khấu)
chuotIdol.characterGroup.scale.set(2, 2, 2);

// 7. Khởi tạo bộ diễn hoạt vũ đạo mượt mà
const animator = new DanceAnimator(chuotIdol, lighting, stage);

// 8. Tự động điều chỉnh tỉ lệ khung hình khi co giãn cửa sổ trình duyệt (Responsive)
function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', onWindowResize);

// 9. Vòng lặp kết xuất đồ họa thời gian thực (Render Loop)
const clock = new THREE.Clock();

function animate() {
	requestAnimationFrame(animate);

	const elapsedTime = clock.getElapsedTime();

	// Cập nhật hoạt ảnh vũ đạo & môi trường
	animator.update(elapsedTime);

	// Cập nhật góc nhìn camera
	controls.update();

	// Kết xuất khung hình
	renderer.render(scene, camera);
}

animate();
