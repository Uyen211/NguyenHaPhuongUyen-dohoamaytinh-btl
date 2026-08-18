# Dự án Đại Nhạc Hội 3D Concert Tối Giản (WebGL / Three.js)

Dự án này là bài tập lớn môn **Đồ họa Máy tính**, tập trung thiết kế và mô phỏng một không gian đại nhạc hội ảo (Concert) tối giản, cùng với hoạt cảnh vũ đạo nhảy lò cò thời gian thực của nhân vật **Chuột Hamster Chibi (Idol)**.

Toàn bộ mô hình nhân vật, bục diễn và hoạt cảnh đều được dựng trực tiếp bằng mã nguồn thuần (Procedural Modeling), không nạp bất kỳ tệp mô hình 3D đúc sẵn nào (.gltf, .fbx, v.v.), giúp tối ưu hóa dung lượng ứng dụng siêu nhẹ và tốc độ tải trang tức thì.

---

## 🌟 Tính năng nổi bật

1. **Tạo hình hoàn toàn bằng Code (Procedural Modeling):**
   - **Nhân vật Chuột Hamster Chibi:** Dựng phân cấp từ các khối cơ sở như cầu (`SphereGeometry`), trụ (`CylinderGeometry`) để làm đầu, thân béo, yếm bụng, má phồng, tai, mắt hạt cườm, chân hạt dưa, và cánh tay Doraemon đặt trước ngực.
   - **Bục diễn tròn tối giản:** Dùng khối trụ dẹt (`CylinderGeometry`) phủ vật liệu màu hồng pastel ngọt ngào (`0xff99cc`), giúp mã nguồn sạch sẽ và dễ hiểu nhất.
2. **Hoạt cảnh Vũ đạo Sinh học (Choreography & Animation):**
   - **Nhảy lò cò liên tục:** Chuột nhún nhảy liên tục lên xuống trục Y theo nhịp beat nhạc và tự xoay tròn 360 độ trên không trung.
   - **Hiệu ứng Squash & Stretch:** Nén xẹp cơ thể khi rơi xuống chạm đất (`scale.y = 0.75`) và giãn dọc khi đang ở trên không (`scale.y = 1.22`), mô phỏng chân thực tính chất sinh học mềm dẻo.
   - **Hoạt ảnh vẫy tai trên không (Ear Flapping):** Khi nhảy lên không trung, đôi tai chuột vẫy nhanh liên tục với tần số cao (`Math.sin(time * 24)`) đầy sống động, và tự cân bằng trở lại khi chạm đất.
3. **Ánh sáng concert tối giản:**
   - Hệ thống chiếu sáng 3 nguồn sáng tối ưu hiệu năng: `AmbientLight` (ánh sáng môi trường), `DirectionalLight` (Key Light có đổ bóng mượt mà), và `PointLight` tự động biến đổi phổ màu HSL nhịp nhàng tạo sắc màu concert.
   - 300 hạt kim tuyến đa sắc rơi lơ lửng, tự xoay và tự hồi sinh khi chạm đất để tạo bầu không khí lễ hội.

---

## 📂 Cấu trúc thư mục dự án

```text
my-threejs-app/
├── public/                 # Thư mục chứa tài nguyên tĩnh
├── src/                    # Mã nguồn chính của ứng dụng
│   ├── animation/
│   │   └── DanceAnimator.js # Bộ quản lý hoạt ảnh (nhảy, vẫy tai, đổi màu đèn, kim tuyến rơi)
│   ├── character/
│   │   └── ChuotIdol.js     # Khởi tạo mô hình chuột Hamster Chibi & các khớp xương Group phân cấp
│   ├── scene/
│   │   ├── Lighting.js      # Cấu hình hệ thống chiếu sáng (Ambient, Key Light, PointLight)
│   │   └── Stage.js         # Khởi tạo bục tròn sân khấu đơn sắc & 300 hạt kim tuyến rơi tự do
│   ├── main.js             # Entry point: Khởi tạo Scene, Camera, OrbitControls và chạy Render Loop
│   └── style.css           # Cấu hình giao diện CSS toàn màn hình
├── index.html              # Trang chủ HTML chứa thẻ Canvas kết xuất
├── package.json            # Quản lý dependencies (Three.js, Vite, mermaid-filter)
└── README.md               # Hướng dẫn dự án này
```

---

## ⚙️ Hướng dẫn cài đặt và chạy ứng dụng

### 1. Yêu cầu hệ thống
Đảm bảo bạn đã cài đặt **Node.js** (phiên bản 18 trở lên).

### 2. Cài đặt các thư viện phụ thuộc
Di chuyển vào thư mục dự án và cài đặt:
```bash
cd my-threejs-app
npm install
```

### 3. Khởi chạy máy chủ phát triển (Local Dev Server)
Chạy ứng dụng ở chế độ hot-reload trên trình duyệt:
```bash
npm run dev
```
Trình duyệt sẽ tự động mở trang web tại địa chỉ: `http://localhost:5173/`

### 4. Đóng gói mã nguồn sản phẩm (Production Build)
Biên dịch dự án ra thư mục `dist/` để đưa lên staging/hosting:
```bash
npm run build
```

---

## 🎮 Điều khiển Camera trên trình duyệt
Người dùng có thể tương tác với Concert 3D thông qua chuột:
- **Xoay 360 độ:** Nhấp giữ chuột trái và kéo.
- **Tịnh tiến Camera (Pan):** Nhấp giữ chuột phải và kéo.
- **Phóng to / Thu nhỏ (Zoom):** Cuộn bánh xe chuột giữa (được giới hạn từ `3.0` đến `20.0` đơn vị để tránh camera quá xa).
