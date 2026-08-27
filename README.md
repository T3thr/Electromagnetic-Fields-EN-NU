# ⚡ 303214 สนามแม่เหล็กไฟฟ้า 1 (Electromagnetic Fields I) — คลังบทเรียนและระบบจำลองข้อสอบกลางภาค

คลังเอกสารสรุปบทเรียน ทฤษฎีสนามแม่เหล็กไฟฟ้า และ **ระบบจำลองข้อสอบกลางภาคเสมือนจริงแบบ Interactive พร้อมเฉลยเชิงวิเคราะห์ละเอียดทุกขั้นตอน** ประจำรายวิชา **303214 Electromagnetic Fields 1** ภาควิชาวิศวกรรมไฟฟ้า คณะวิศวกรรมศาสตร์ มหาวิทยาลัยนเรศวร

---

## 🎯 สรุปข้อมูลการสอบกลางภาค (Midterm Profile)
- **น้ำหนักคะแนน:** **45%** (100 คะแนนเต็ม)
- **ระยะเวลาทำข้อสอบ:** **3 ชั่วโมง**
- **โครงสร้างข้อสอบ:** อัตนัย 4 ข้อใหญ่
- **ขอบเขตเนื้อหา:** **Lecture Set 1 ถึง Set 9** (เวกเตอร์, 3 ระบบพิกัด, กฎของคูลอมบ์, สนามไฟฟ้า E, ฟลักซ์ D, กฎของเกาส์, ไดเวอร์เจนซ์, ศักย์ไฟฟ้า V)
- **กฎเหล็กการตรวจข้อสอบ (Strict Scoring Policy):**
  1. **ต้องเริ่มจากสูตรตั้งต้นทั่วไปเสมอ (Formula-First Rule):** ต้องเขียนสูตรทั่วไปก่อนแทนค่าตัวเลข (เช่น `A × B = |a_x a_y a_z; A_x A_y A_z; B_x B_y B_z|` หรือ `E = ∫ (dQ / 4πε₀ R²) a_R`)
  2. **ต้องอินทิเกรตด้วยมือเชิงวิเคราะห์ (Analytical Integration Only):** ต้องแสดงการเปลี่ยนตัวแปรตรีโกณมิติ `z = h tan ψ` และหาปฏิยานุพันธ์ทุกขั้นตอน ห้ามใช้คำตอบจากเครื่องคิดเลขโดยตรง
  3. **แสดงขั้นตอนการได้มา (Step-by-Step Derivation):** ห้ามนำสูตรลัดหรือคำตอบสุดท้ายมาใส่ลอยๆ

---

## 🧭 สารบัญบทเรียน 9 บทติวเข้มกลางภาค (Curriculum Hub)

| บทที่ | โฟลเดอร์เนื้อหา | ชื่อบทเรียนภาษาไทย | เครื่องมือ Interactive & ประเด็นข้อสอบ | ลิงก์เว็บแอป |
| :---: | :--- | :--- | :--- | :---: |
| **01** | [`01-vector-algebra/`](01-vector-algebra/) | **เวกเตอร์และระบบพิกัดฉาก** | ตัวจำลองเวกเตอร์ 3D, Dot/Cross Product, Differential Elements | [🌐 เปิดบทเรียน](01-vector-algebra/index.html) |
| **02** | [`02-cylindrical-coordinates/`](02-cylindrical-coordinates/) | **ระบบพิกัดทรงกระบอก** | เมทริกซ์แปลงพิกัดและเวกเตอร์ [A_rc], ส่วนย่อย dl, ds, dv | [🌐 เปิดบทเรียน](02-cylindrical-coordinates/index.html) |
| **03** | [`03-spherical-coordinates/`](03-spherical-coordinates/) | **ระบบพิกัดทรงกลม** | **🔥 ข้อสอบข้อ 1 (25 คะแนน):** ข้อจำกัด a_r, a_θ, a_ϕ + แปลงเวกเตอร์ A ณ จุด P | [🌐 เปิดบทเรียน](03-spherical-coordinates/index.html) |
| **04** | [`04-coulombs-law/`](04-coulombs-law/) | **กฎของคูลอมบ์** | **🔥 ข้อสอบข้อ 2 (20 คะแนน):** รวมแรงเวกเตอร์ F_net + หาประจุ Q₄ ให้ F_net = 0 | [🌐 เปิดบทเรียน](04-coulombs-law/index.html) |
| **05** | [`05-electric-field-intensity/`](05-electric-field-intensity/) | **ความเข้มสนามไฟฟ้า E** | **🔥 ข้อสอบข้อ 3 (30 คะแนน):** อินทิเกรตตรีโกณมิติ z=3 tan ψ ลวดประจุจำกัด | [🌐 เปิดบทเรียน](05-electric-field-intensity/index.html) |
| **06** | [`06-electric-flux-density/`](06-electric-flux-density/) | **ฟลักซ์ไฟฟ้าและความหนาแน่นฟลักซ์ D** | แบบจำลองการทดลองทรงกลมตัวนำซ้อนของฟาราเดย์, D = ε₀ E | [🌐 เปิดบทเรียน](06-electric-flux-density/index.html) |
| **07** | [`07-gauss-law/`](07-gauss-law/) | **กฎของเกาส์** | ตัวเลือกผิวเกาส์เซียนสมมาตร 3 รูปแบบ (ทรงกลม, ทรงกระบอก, แผ่นระนาบ) | [🌐 เปิดบทเรียน](07-gauss-law/index.html) |
| **08** | [`08-divergence-theorem/`](08-divergence-theorem/) | **ไดเวอร์เจนซ์และทฤษฎีบทไดเวอร์เจนซ์** | เครื่องคำนวณ ∇ • D = ρ_v (สมการแมกซ์เวลล์ข้อ 1) ใน 3 ระบบพิกัด | [🌐 เปิดบทเรียน](08-divergence-theorem/index.html) |
| **09** | [`09-electric-potential/`](09-electric-potential/) | **ศักย์ไฟฟ้าและพลังงาน V** | **🔥 ข้อสอบข้อ 4 (25 คะแนน):** V_AB = -∫ E • dl, อุปมาฟิสิกส์เครื่องหมายบวก/ลบ | [🌐 เปิดบทเรียน](09-electric-potential/index.html) |
| **Sim**| [`exam-simulator/`](exam-simulator/) | **ระบบจำลองสอบกลางภาคเสมือนจริง** | จับเวลา 3 ชั่วโมง, ตรวจตามเกณฑ์อย่างเข้มงวด, โหมดสุ่มโจทย์ | [🎯 เข้าห้องสอบ](exam-simulator/index.html) |
| **Ref**| [`formula-sheet/`](formula-sheet/) | **ใบสูตรกลางภาคดิจิทัล** | รวบรวมสูตร 4 หน้าเต็ม ค้นหาด่วน คัดลอกเมทริกซ์ พิมพ์ A4 | [📑 เปิดใบสูตร](formula-sheet/index.html) |

---

## 🌲 แผนผังโครงสร้างโฟลเดอร์ (Directory Tree)

```text
electromagnetic-fields/
├── README.md                                # [MAIN HUB] เอกสารสารบัญภาพรวมและคำแนะนำรายวิชา
├── IDEA.md                                  # เอกสารแนวคิดการออกแบบระบบ
├── index.html                               # หน้าหลัก Portal รวม 9 บทเรียน แดชบอร์ดข้อสอบ
├── assets/
│   ├── css/
│   │   ├── style.css                        # ธีมวิชาการ Academic Paper + Dark/Light Mode
│   │   └── interactive.css                  # สไตล์จำลองสอบ, HUD, Accordion, Sliders
│   └── js/
│       ├── common.js                        # ตัวจัดการ Theme, Tabs, Quizzes, Clipboard
│       ├── vector3d.js                      # ตัววาดเวกเตอร์และระบบพิกัด 3 มิติบน Canvas
│       └── exam-engine.js                   # ตัวจับเวลา 3 ชม. และระบบตรวจตามเกณฑ์ Rubric
├── 01-vector-algebra/index.html             # บทที่ 1: เวกเตอร์และพิกัดฉาก
├── 02-cylindrical-coordinates/index.html    # บทที่ 2: ระบบพิกัดทรงกระบอก
├── 03-spherical-coordinates/index.html      # บทที่ 3: ระบบพิกัดทรงกลม (ข้อสอบข้อ 1)
├── 04-coulombs-law/index.html               # บทที่ 4: กฎของคูลอมบ์ (ข้อสอบข้อ 2)
├── 05-electric-field-intensity/index.html   # บทที่ 5: ความเข้มสนามไฟฟ้า (ข้อสอบข้อ 3)
├── 06-electric-flux-density/index.html      # บทที่ 6: ฟลักซ์ไฟฟ้าและความหนาแน่นฟลักซ์
├── 07-gauss-law/index.html                  # บทที่ 7: กฎของเกาส์
├── 08-divergence-theorem/index.html         # บทที่ 8: ไดเวอร์เจนซ์และทฤษฎีบทไดเวอร์เจนซ์
├── 09-electric-potential/index.html         # บทที่ 9: ศักย์ไฟฟ้าและพลังงาน (ข้อสอบข้อ 4)
├── exam-simulator/index.html                # ระบบจำลองสอบกลางภาคเสมือนจริง
├── formula-sheet/index.html                 # ใบสูตรกลางภาคดิจิทัล 4 หน้าเต็ม
├── lecture/                                 # ไฟล์ PDF สไลด์คำสอน Set 1 ถึง 9
└── raw/                                     # ไฟล์ PDF ข้อสอบเก่าและใบสูตร
```

---

## 🚀 วิธีการเปิดใช้งานเว็บแอปพลิเคชัน
1. เปิดไฟล์ `index.html` ผ่านเว็บเบราว์เซอร์มาตรฐาน (Chrome, Edge, Safari, Firefox)
2. หรือรันผ่าน Local HTTP Server:
   ```bash
   python3 -m http.server 8080
   ```
   จากนั้นเข้าใช้งานที่ `http://localhost:8080`
