# การวิเคราะห์และเปรียบเทียบแหล่งที่มาของข้อสอบ (Exam Source Mapping)

> **เอกสารอ้างอิงและหลักฐานการเปรียบเทียบข้อสอบวิชาสนามแม่เหล็กไฟฟ้า (303214 EM Fields 1)**  
> เปรียบเทียบระหว่างไฟล์ข้อสอบของภาควิชาฯ กับตำราเรียนมาตรฐานสากล (Textbooks) 2 เล่มหลัก:
> 1. **Hayt 9th Ed.:** *Engineering Electromagnetics*, 9th Edition — William H. Hayt, Jr. & John A. Buck (McGraw-Hill, 2012)
> 2. **Sadiku 3rd Ed.:** *Elements of Electromagnetics*, 3rd Edition — Matthew N. O. Sadiku (Oxford University Press, 2001)

---

## สารบัญการเชื่อมโยงไฟล์ (File Index & Mapping Overview)

### 1. ไฟล์ข้อสอบต้นทาง (Exam Source Files)
* **ไฟล์ที่ 1:** `raw/ข้อสอบเก่า.pdf` (จำนวน 10 หน้า) — **ข้อสอบกลางภาค ภาคปลาย ปีการศึกษา 2563 (สอบวันที่ 15 มกราคม 2564)** ภาควิชาวิศวกรรมไฟฟ้าและคอมพิวเตอร์ มหาวิทยาลัยนเรศวร
  * หน้า 1: ปกข้อสอบ คำสั่ง และเกณฑ์การสอบ
  * หน้า 2: โจทย์ข้อสอบข้อที่ 1, 2, 3, 4.1
  * หน้า 3: โจทย์ข้อสอบข้อที่ 4.2, 4.3 พร้อมรูปประกอบ
  * หน้า 4–7: แผ่นสูตรสอบกลางภาค (Formula Sheet)
  * หน้า 8–10: เอกสารเฉลยและกระดาษทดแสดงวิธีทำข้อ 2 (Coulomb's Law)
* **ไฟล์ที่ 2:** `raw/ข้อสอบทั้งหมด.pdf` (จำนวน 36 หน้า) — **ชุดแบบฝึกหัด/ข้อสอบคัดสรรและเฉลยละเอียด (Exam Question Bank & Detailed Solutions)** รวม 11 ข้อหลัก
  * หน้า 1–3: ตัวอย่างที่ 1 (สมการความต่อเนื่องและการกระจายประจุ)
  * หน้า 4–6: ตัวอย่างที่ 2 (เงื่อนไขรอยต่อฉนวนไฟฟ้า Teflon / Free space)
  * หน้า 7–13: ตัวอย่างที่ 3 (ตัวเก็บประจุแผ่นขนานด้วยสมการลาปลาซ)
  * หน้า 14–18: ตัวอย่างที่ 4 (สนามแม่เหล็กจากลวดตัวนำยาวอนันต์ด้วยกฎของบิโอต์-ซาวารต์)
  * หน้า 19–20: ตัวอย่างที่ 5 (การหากระแสในลวดตัวนำจากสนามแม่เหล็ก)
  * หน้า 21–22: ตัวอย่างที่ 6 (กฎวงจรของแอมแปร์ในรูปจุด หา J จาก H)
  * หน้า 23–25: ตัวอย่างที่ 8 (สมการของแมกซ์เวลล์ หาสนามแม่เหล็กแปรตามเวลาจาก E)
  * หน้า 26–27: ตัวอย่างที่ 9 (กระแสการนำและกระแสการแทนที่ในตัวเก็บประจุ)
  * หน้า 28–30: ตัวอย่างที่ 10 (การหาค่าคงที่ k ที่สอดคล้องกับสมการของแมกซ์เวลล์)
  * หน้า 31–35: ตัวอย่างที่ 11 (คลื่นระนาบเอกรูป การหาพารามิเตอร์คลื่นและสนามแม่เหล็ก)
  * หน้า 36: ตัวอย่างที่ 12 (การแปลงสนามไฟฟ้าระหว่างโดเมนเวลาและเฟสเซอร์)

---

## ตารางสรุปการเชื่อมโยงข้อสอบกับ Textbook (Master Comparison Matrix)

| ข้อสอบ (Exam Source) | หน้าใน PDF | หัวข้อ / ตัวแปรสำคัญ | แหล่งที่มาใน Hayt 9th Ed. | แหล่งที่มาใน Sadiku 3rd Ed. | ระดับความตรง |
|---|---|---|---|---|---|
| **[ข้อสอบเก่า 2563] ข้อ 1.1** | หน้า 2 | ข้อจำกัดของเวกเตอร์หน่วยพิกัดทรงกลม (Singularities at poles/origin) | **Chapter 1**, Section 1.9 (p. 18–22) | **Chapter 2**, Section 2.4 (p. 34–38) | ⭐⭐⭐ Concept ตรง |
| **[ข้อสอบเก่า 2563] ข้อ 1.2** | หน้า 2 | แปลงเวกเตอร์ `A = (2sinθ/r)a_θ + (sinφ/sinθ)a_φ` เป็นพิกัดทรงกระบอก | **Chapter 1**, Section 1.8–1.9 (p. 14–22) | **Chapter 2**, Section 2.5 (p. 39–41) & Problem 2.9 (p. 50) | ⭐⭐⭐⭐ Problem Style |
| **[ข้อสอบเก่า 2563] ข้อ 2** | หน้า 2 | แรงคูลอมบ์บน `Q₂=2C` จาก `Q₁=3√3C` ที่ (5,0,0) และ `Q₃=3C` ที่ (-2.5, 2.5√3, 0) | **Chapter 2**, Section 2.1 & Drill D2.1 (p. 26–29) | **Chapter 4**, Section 4.2, Example 4.1 & PE 4.1 (p. 104–108) | ⭐⭐⭐⭐ ตัวเลขดัดแปลง |
| **[ข้อสอบเก่า 2563] ข้อ 3** | หน้า 2 | ลวดประจุตรง `z=0` ถึง `z=4`, `ρ_l`, สนามไฟฟ้า ณ `P(0, 3, 0)` | **Chapter 2**, Section 2.4 & Problem 2.12 (p. 36–39, 45) | **Chapter 4**, Section 4.3 (Eq. 4.20, Finite Line Charge) (p. 111–114) | ⭐⭐⭐⭐⭐ **สูตรเฉพาะ Sadiku** |
| **[ข้อสอบเก่า 2563] ข้อ 4** | หน้า 2–3 | หา `V_AB` จาก `D = [r/(r²+a²)²] a_r` และศักย์ไฟฟ้าสัมบูรณ์ | **Chapter 4**, Problem 4.12 (p. 107) & Section 4.3–4.4 (p. 83–87) | **Chapter 4**, Section 4.7 (p. 133–139) | ⭐⭐⭐⭐⭐ **ดึงจาก Hayt P4.12** |
| **[ข้อสอบทั้งหมด] ข้อ 1** | หน้า 1–3 | `J = (e⁻ᵗ/r) a_r`, หา `ρ_v` และความเร็ว `v` | **Chapter 5**, Section 5.2 (Numerical Example, p. 114–115) | **Chapter 5**, Section 5.8 (Continuity Equation, p. 180–182) | ⭐⭐⭐⭐⭐ **ตรง 100% (Hayt)** |
| **[ข้อสอบทั้งหมด] ข้อ 2** | หน้า 4–6 | รอยต่อ Teflon (`ε_r = 2.1`) / Free space, `E_tan2=45`, `D_N2=20` | **Chapter 5**, Section 5.8, Example 5.4/5.5 (p. 135–139) & Drill D5.9 | **Chapter 5**, Section 5.9, Example 5.8 (p. 182–190) | ⭐⭐⭐⭐ Example Teflon |
| **[ข้อสอบทั้งหมด] ข้อ 3** | หน้า 7–13 | ตัวเก็บประจุแผ่นขนานจากสมการลาปลาซ `∇²V = 0` | **Chapter 6**, Section 6.2 (p. 147–148) & Example 6.2 (p. 165–166) | **Chapter 6**, Section 6.4 (Example 6.1, p. 203–204) & 6.5 (p. 223–230) | ⭐⭐⭐⭐⭐ **ตรง 100% (Hayt Ex 6.2)** |
| **[ข้อสอบทั้งหมด] ข้อ 4** | หน้า 14–18 | ลวดยาวอนันต์ตามแกน z หากระแส I และสนาม `B` บนระนาบ `z=0` (Biot-Savart) | **Chapter 7**, Section 7.1 (Eq. 7, p. 182–186) | **Chapter 7**, Section 7.2 (Eq. 7.13, p. 263–267) | ⭐⭐⭐⭐⭐ ทฤษฎีมาตรฐาน |
| **[ข้อสอบทั้งหมด] ข้อ 5** | หน้า 19–20 | ลวดตัวนำหากระแสจาก `B = (μ₀K / 2πρ) a_φ` | **Chapter 7**, Section 7.2 (p. 190–195) | **Chapter 7**, Section 7.3–7.4 (p. 273–280) | ⭐⭐⭐⭐ ทฤษฎีมาตรฐาน |
| **[ข้อสอบทั้งหมด] ข้อ 6** | หน้า 21–22 | หา `J` ที่ `P(2,3,4)` จาก `H = x²z a_y - y²x a_z` | **Chapter 7**, Section 7.3 (Eq. 28, p. 197–204) | **Chapter 7**, Section 7.3 & Example 7.6 (p. 273–280) | ⭐⭐⭐⭐ Problem Style |
| **[ข้อสอบทั้งหมด] ข้อ 8** | หน้า 23–25 | `ε=10⁻¹¹`, `μ=10⁻⁵`, `E = 20×10⁻⁴ cos(10⁵t) sin(10⁻³y) a_x`, หา `H` | **Chapter 9**, Drill Problem **D9.1** (p. 285–286) | **Chapter 9**, Section 9.2 & Example 9.1 (p. 370–372) | ⭐⭐⭐⭐⭐ **Parameters ตรง Hayt D9.1** |
| **[ข้อสอบทั้งหมด] ข้อ 9** | หน้า 26–27 | ตัวเก็บประจุ `V(t) = V₀ cos(ωt)`, หา `I_c` และ `I_d` (Displacement Current) | **Chapter 9**, Section 9.2 (Figure 9.3, p. 286–288) | **Chapter 9**, Section 9.4 (Figure 9.7 & Example 9.4, p. 381–384) | ⭐⭐⭐⭐⭐ **รูปและทฤษฎีตรงทั้ง 2 เล่ม** |
| **[ข้อสอบทั้งหมด] ข้อ 10** | หน้า 28–30 | `E = (20y - kt) a_x`, `H = (y + 2×10⁶t) a_z`, หา `k` | **Chapter 9**, Drill Problem **D9.4(b)** (p. 292) | **Chapter 9**, Section 9.5 & Practice Exercise 9.6 (p. 384–387) | ⭐⭐⭐⭐⭐ **โจทย์ตรง Hayt D9.4(b) 100%** |
| **[ข้อสอบทั้งหมด] ข้อ 11** | หน้า 31–35 | คลื่นระนาบ `E_s = 250 e⁻ʲᵏ⁰ᶻ a_x`, `ω = 1 Mrad/s`, หา `f, λ, k₀, H_s, H(t)` | **Chapter 11**, Section 11.1 (p. 369–384), Example 11.1–11.2 (p. 373–374) | **Chapter 10**, Section 10.5 (Example 10.3/10.4, p. 423–425) | ⭐⭐⭐⭐⭐ **Framework ตรง Hayt Ch.11** |
| **[ข้อสอบทั้งหมด] ข้อ 12** | หน้า 36 | `E(z;t) = E_x0 cos(ωt - k₀z) a_x` แปลงเป็นรูปเฟสเซอร์ `E_s` | **Chapter 11**, Section 11.1.2 & Example 11.1 (p. 373) | **Chapter 9**, Section 9.7 (Example 9.8, p. 389–394) | ⭐⭐⭐⭐⭐ **Method ตรงทั้ง 2 เล่ม** |

---

## รายละเอียดการวิเคราะห์เชิงลึกรายข้อ (In-Depth Problem-by-Problem Breakdown)

---

### ส่วนที่ 1: ข้อสอบจากไฟล์ `raw/ข้อสอบเก่า.pdf` (ข้อสอบกลางภาค 2563)

#### ข้อ 1.1 (หน้า 2 ในข้อสอบเก่า.pdf) — ข้อจำกัดของเวกเตอร์หน่วยในระบบพิกัดทรงกลม
* **คำถาม:** จงอธิบายว่าเวกเตอร์หน่วยในระบบพิกัดทรงกลมมีข้อจำกัดอย่างไร พร้อมวาดรูปประกอบ (25 คะแนน)
* **การอ้างอิงใน Hayt 9th Ed.:** Chapter 1, Section 1.9 *The Spherical Coordinate System* (หน้า 18–22)
  * ในหน้า 18–19 ระบุว่า เวกเตอร์หน่วย `a_θ` และ `a_φ` จะไม่สามารถนิยามทิศทางได้อย่างเฉพาะเจาะจงที่แนวแกน z (ที่ขั้ว `θ = 0` และ `θ = π`) และที่จุดกำเนิด (`r = 0`) เนื่องจากแนววงกลมละติจูดและลองจิจูดหดตัวลงเป็นจุดเดี่ยว (Coordinate Singularities)
* **การอ้างอิงใน Sadiku 3rd Ed.:** Chapter 2, Section 2.4 *Spherical Coordinates (r, θ, φ)* (หน้า 34–38)
  * ในหน้า 36–37 อธิบายความสัมพันธ์ของ `a_r, a_θ, a_φ` และข้อควรระวังในการหาอนุพันธ์หรืออินทิเกรตเมื่อจุดสังเกตอยู่ที่แนวแกน Polar axis

---

#### ข้อ 1.2 (หน้า 2 ในข้อสอบเก่า.pdf) — การแปลงเวกเตอร์จากพิกัดทรงกลมเป็นพิกัดทรงกระบอก
* **โจทย์:** กำหนดเวกเตอร์ `A` ณ จุด `P(r=2.4, θ=50°, φ=70°)` ในพิกัดทรงกลม มีค่า `A = (2 sin θ / r) a_θ + (sin φ / sin θ) a_φ` จงแปลงเวกเตอร์นี้ให้อยู่ในรูประบบพิกัดทรงกระบอก
* **การอ้างอิงใน Hayt 9th Ed.:** Chapter 1, Section 1.8–1.9 (หน้า 14–22)
  * ใช้ Transformation Matrix และความสัมพันธ์ `r = √(ρ² + z²)`, `tan θ = ρ / z`
* **การอ้างอิงใน Sadiku 3rd Ed.:** Chapter 2, Section 2.5 (หน้า 39–41) และ **Problem 2.9 (หน้า 50)**
  * ในหน้า 50 แสดงสมการ Transformation Matrix ระหว่างพิกัดทรงกระบอกและทรงกลมโดยตรง:
    * `A_ρ = A_r sin θ + A_θ cos θ`
    * `A_φ = A_φ`
    * `A_z = A_r cos θ - A_θ sin θ`

---

#### ข้อ 2 (หน้า 2 ในข้อสอบเก่า.pdf) — แรงคูลอมบ์ระหว่างประจุ 3 จุดบนระนาบ 2 มิติ
* **โจทย์:**
  * `Q₂ = 2 C` อยู่ที่จุดกำเนิด `P₂(0, 0, 0)`
  * `Q₁ = 3√3 C` อยู่ที่ `P₁(5, 0, 0)`
  * `Q₃ = 3 C` อยู่ที่ `P₃(-2.5, 5√3/2, 0)`  *(หมายเหตุ: จุด P₃ ห่างจากจุดกำเนิดเป็นระยะ r = √[(-2.5)² + (2.5√3)²] = 5 หน่วย ทำมุม 120° กับแกน +x)*
  * (2.1) หาแรงลัพธ์บน `Q₂`
  * (2.2) หาตำแหน่งและขนาดของประจุ `Q₄` ที่นำมาวางเพื่อให้แรงลัพธ์บน `Q₂` กลายเป็นศูนย์
* **การอ้างอิงใน Hayt 9th Ed.:** Chapter 2, Section 2.1 *The Experimental Law of Coulomb* (หน้า 26–29) และ Drill Problem **D2.1** (หน้า 29)
* **การอ้างอิงใน Sadiku 3rd Ed.:** Chapter 4, Section 4.2 *Coulomb's Law and Field Intensity* (หน้า 104–110), **Example 4.1 & Practice Exercise 4.1 (หน้า 107–108)**
  * ข้อสอบข้อนี้เป็นโจทย์สไตล์คลาสสิกของ Sadiku Practice Exercise 4.1 ที่ให้ประจุจุดมา 3 ตำแหน่งแล้วหาตำแหน่งของประจุที่สี่มาหักล้างแรงลัพธ์

---

#### ข้อ 3 (หน้า 2 ในข้อสอบเก่า.pdf) — สนามไฟฟ้าจากลวดประจุตรงความยาวจำกัด (Finite Line Charge)
* **โจทย์:** ลวดเส้นหนึ่งทอดยาวบนแกน z จาก `z = 0` ถึง `z = 4` มีความหนาแน่นประจุเชิงเส้น `ρ_l C/m` จงหาสนามไฟฟ้า ณ จุด `P(0, 3, 0)` ในรูปพิกัดฉาก ติดรูป `π` และ `ε₀`
* **การอ้างอิงใน Hayt 9th Ed.:** Chapter 2, Section 2.4 *Field of a Line Charge* (หน้า 36–39) และ Chapter 2 Problems (Problem 2.12 หน้า 45)
  * Hayt เน้นการหาอินทิกรัลทีละแกนจาก `dE = [ρ_l dz' / 4πε₀ R²] a_R`
* **การอ้างอิงใน Sadiku 3rd Ed.:** Chapter 4, Section 4.3 *Electric Fields due to Continuous Charge Distributions* (หน้า 111–114)
  * ⭐ **นี่คือจุดเด่นสำคัญ:** ใน Sadiku หน้า 113 มีการสรุปสูตรสำเร็จของ **Finite Line Charge (Eq. 4.20)** โดยใช้องค์ประกอบมุม `α₁` และ `α₂`:
    ```text
    E = [ρ_l / (4πε₀ ρ)] × [ -(sin α₂ - sin α₁) a_ρ + (cos α₂ - cos α₁) a_z ]
    ```
    การที่อาจารย์ออกโจทย์ลวดช่วงจำกัด `z = 0` ถึง `z = 4` สอดคล้องกับการประยุกต์ใช้สูตรจาก Sadiku Section 4.3 อย่างชัดเจน

---

#### ข้อ 4 (หน้า 2–3 ในข้อสอบเก่า.pdf) — การหาความต่างศักย์และศักย์ไฟฟ้าสัมบูรณ์จากสนามฟลักซ์
* **โจทย์:**
  * กำหนด `D = [r / (r² + a²)²] a_r` (เมื่อ a เป็นค่าคงที่)
  * (4.1) จงหาความต่างศักย์ `V_AB` ระหว่างรัศมี `r = r_A` และ `r = r_B`
  * (4.2) ถ้า `r_A < r_B` ค่า `V_AB` เป็นบวกหรือลบ เพราะเหตุใด พร้อมยกอุปมาอธิบาย
  * (4.3) จงหาศักย์ไฟฟ้าสัมบูรณ์ (Absolute potential)
* **การอ้างอิงใน Hayt 9th Ed.:** ⭐ **Chapter 4, Problem 4.12 (หน้า 107)**
  * ใน Hayt หน้า 107 ข้อ 4.12 มีโจทย์ที่เหมือนกันแทบทุกประการ:
    > *"4.12 In spherical coordinates, E = 2r/(r² + a²)² a_r V/m. Find the potential at any point, using the reference (a) V = 0 at infinity; (b) V = 0 at r = 0; (c) V = 100 V at r = a."*
  * อาจารย์นำฟังก์ชัน `r / (r² + a²)²` จากข้อนี้มาตั้งเป็นโจทย์ `D` แล้วให้นิสิตหา `V_AB = -∫ E · dL` โดย `E = D / ε₀`
* **การอ้างอิงใน Sadiku 3rd Ed.:** Chapter 4, Section 4.7 *Electric Potential* (หน้า 133–139)

---

### ส่วนที่ 2: ข้อสอบจากไฟล์ `raw/ข้อสอบทั้งหมด.pdf` (ชุดเฉลยข้อสอบ 36 หน้า)

---

#### ข้อ 1 (หน้า 1–3 ในข้อสอบทั้งหมด.pdf) — สมการความต่อเนื่องในพิกัดทรงกลม (Continuity Equation)
* **โจทย์:** กำหนด `J = (e⁻ᵗ / r) a_r A/m²` ถ้ากำหนดให้ `ρ_v → 0` เมื่อ `t → ∞` จงหา: (ก) ความหนาแน่นประจุเชิงปริมาตร `ρ_v` และ (ข) ความเร็ว `v`
* **การอ้างอิงใน Hayt 9th Ed.:** ⭐ **Chapter 5, Section 5.2 Continuity of Current (หน้า 114–115)**
  * ในหน้า 114 บรรทัดล่าง มี Numerical Example ที่ตรงกัน 100%:
    > *"As a numerical example illustrating some of the concepts from the last two sections, let us consider a current density that is directed radially outward and decreases exponentially with time, **J = (1/r) e⁻ᵗ a_r A/m²**... If we assume that ρ_v → 0 as t → ∞, then K(r) = 0, and **ρ_v = (1/r²) e⁻ᵗ C/m³**... We may now use J = ρ_v v to find the velocity, **v_r = r m/s**"*
* **การอ้างอิงใน Sadiku 3rd Ed.:** Chapter 5, Section 5.8 *Continuity Equation and Relaxation Time* (หน้า 180–182)

---

#### ข้อ 2 (หน้า 4–6 ในข้อสอบทั้งหมด.pdf) — เงื่อนไขรอยต่อฉนวนไฟฟ้า (Boundary Conditions)
* **โจทย์:** รอยต่อระหว่าง Teflon (`ε_r = 2.1`) (บริเวณ 1) และ Free space (บริเวณ 2) ณ รอยต่อมี `E_tan2 = 45 N/C`, `D_N2 = 20 C/m²` จงหา `E_tan1, D_tan1, D_N1, E_N1`
* **การอ้างอิงใน Hayt 9th Ed.:** Chapter 5, Section 5.8 *Boundary Conditions for Perfect Dielectric Materials* (หน้า 135–139)
  * Hayt ใช้ Teflon `ε_r = 2.1` เป็นตัวอย่างหลักใน **Example 5.4 & 5.5 (หน้า 133, 137–139)**
  * กฎเงื่อนไขรอยต่อ: `E_tan1 = E_tan2` (Eq. 32) และ `D_N1 = D_N2` (Eq. 35)
* **การอ้างอิงใน Sadiku 3rd Ed.:** Chapter 5, Section 5.9 *Boundary Conditions* (หน้า 182–190) & Example 5.8 (หน้า 187–188)

---

#### ข้อ 3 (หน้า 7–13 ในข้อสอบทั้งหมด.pdf) — ตัวเก็บประจุแผ่นขนานด้วยสมการลาปลาซ (Laplace's Equation)
* **โจทย์:** แผ่นตัวนำคู่ขนานบนระนาบ xy ที่ `z = 0 (V = 0)` และ `z = d (V = V₀)` จงหา `V(z), E, D, ρ_s, C` โดยใช้ `∇²V = 0`
* **การอ้างอิงใน Hayt 9th Ed.:** ⭐ **Chapter 6, Section 6.7 Examples of the Solution of Laplace's Equation — Example 6.2 (หน้า 165–166)**
  * ในหน้า 165 Example 6.2: *"Start with the potential function, Eq. (31), and find the capacitance of a parallel-plate capacitor of plate area S, plate separation d, and potential difference V₀ between plates."*
  * ผลลัพธ์: `V(z) = V₀(z/d)`, `E = -(V₀/d) a_z`, `D = -ε(V₀/d) a_z`, `ρ_s = εV₀/d`, `C = εA/d`
* **การอ้างอิงใน Sadiku 3rd Ed.:** Chapter 6, Section 6.4 *General Procedure for Solving Poisson's or Laplace's Equation* — **Example 6.1 (หน้า 203–204)** และ Section 6.5 (หน้า 223–225)

---

#### ข้อ 4 & 5 (หน้า 14–20 ในข้อสอบทั้งหมด.pdf) — สนามแม่เหล็กจากลวดตัวนำยาวอนันต์ (Biot-Savart & Ampère)
* **โจทย์ข้อ 4:** เส้นลวดยาวอนันต์ตามแกน z มีกระแส `I` ไหลในทิศ `+z` จงหาสนามแม่เหล็ก `B` บนระนาบ `z = 0` โดยใช้กฎของบิโอต์-ซาวารต์
* **โจทย์ข้อ 5:** ลวดยาวอนันต์ที่สร้างสนามแม่เหล็ก `B = (μ₀K / 2πρ) a_φ` จงหากระแสไฟฟ้า `I`
* **การอ้างอิงใน Hayt 9th Ed.:** Chapter 7, Section 7.1 *Biot-Savart Law* (หน้า 182–186, Eq. 7: `H = (I / 2πρ) a_φ`) และ Section 7.2 *Ampère's Circuital Law* (หน้า 190–195)
* **การอ้างอิงใน Sadiku 3rd Ed.:** Chapter 7, Section 7.2 *Biot-Savart's Law* (หน้า 263–267, Eq. 7.13: `H = (I / 2πρ) a_φ`) และ Section 7.4 (หน้า 274–276)

---

#### ข้อ 6 (หน้า 21–22 ในข้อสอบทั้งหมด.pdf) — กฎวงจรของแอมแปร์ในรูปจุด (Ampère's Law: ∇ × H = J)
* **โจทย์:** จงหาความหนาแน่นกระแส `J` ที่จุด `P(2, 3, 4)` เมื่อ `H = x²z a_y - y²x a_z`
* **การอ้างอิงใน Hayt 9th Ed.:** Chapter 7, Section 7.3 *Curl* (หน้า 197–204, Eq. 28: `∇ × H = J`)
* **การอ้างอิงใน Sadiku 3rd Ed.:** Chapter 7, Section 7.3 *Ampere's Circuit Law — Maxwell's Equation* (หน้า 273–274) และ Example 7.6 (หน้า 280)

---

#### ข้อ 8 (หน้า 23–25 ในข้อสอบทั้งหมด.pdf) — หาสนามแม่เหล็กแปรตามเวลาจากสนามไฟฟ้า (Faraday's Law)
* **โจทย์:** กำหนด `ε = 10⁻¹¹ F/m`, `μ = 10⁻⁵ H/m`, `E = a_x 20×10⁻⁴ [cos(10⁵t)][sin(10⁻³y)] N/C` จงหา `H(t)`
* **การอ้างอิงใน Hayt 9th Ed.:** ⭐ **Chapter 9, Drill Problem D9.1 (หน้า 285–286)**
  * ใน Hayt หน้า 285 โจทย์ Drill Problem D9.1:
    > *"D9.1. Within a certain region, **ε = 10⁻¹¹ F/m and μ = 10⁻⁵ H/m**. If **B_x = 2 × 10⁻⁴ cos(10⁵t) sin(10⁻³y) T**: (a) use ∇ × H = ε ∂E/∂t to find E..."*
  * **การวิเคราะห์:** อาจารย์นำตัวเลขพารามิเตอร์ของ **Hayt D9.1** มาสลับด้าน (Inverse Problem) โดยกำหนด `E` มาให้แล้วให้หา `H` ผ่านกฎฟาราเดย์ `∇ × E = -∂B/∂t`
* **การอ้างอิงใน Sadiku 3rd Ed.:** Chapter 9, Section 9.2 *Faraday's Law* (หน้า 370–372) & Example 9.1 (หน้า 371)

---

#### ข้อ 9 (หน้า 26–27 ในข้อสอบทั้งหมด.pdf) — กระแสการนำและกระแสการแทนที่ (Displacement Current)
* **โจทย์:** ตัวเก็บประจุแผ่นขนานที่มีแรงดัน `V(t) = V₀ cos(ωt)` จงหา (ก) กระแสการนำในสาย `I_c` และ (ข) กระแสการแทนที่ระหว่างแผ่น `I_d`
* **การอ้างอิงใน Hayt 9th Ed.:** ⭐ **Chapter 9, Section 9.2 Displacement Current — Figure 9.3 (หน้า 286–288)**
  * ในหน้า 288 รูป 9.3 แสดงวงจรตัวเก็บประจุต่อกับขดลวดตัวนำในฟิลด์แปรตามเวลาอย่างชัดเจน พร้อมข้อความสรุป: *"The conduction current I is equal to the displacement current between the capacitor plates."*
* **การอ้างอิงใน Sadiku 3rd Ed.:** Chapter 9, Section 9.4 *Displacement Current* (หน้า 381–384)
  * ในหน้า 382 รูป 9.7 และ Example 9.4 (หน้า 383–384) พิสูจน์ว่า `I_c = I_d = C (dV/dt)`

---

#### ข้อ 10 (หน้า 28–30 ในข้อสอบทั้งหมด.pdf) — การหาค่าคงที่ k ที่สอดคล้องกับสมการของแมกซ์เวลล์
* **โจทย์:** กำหนด `μ = 10⁵ H/m` *(ใน Textbook คือ 10⁻⁵)*, `ε = 4×10⁻⁹ F/m, σ = 0, ρ_v = 0` โดยที่ `E = (20y - kt) a_x N/C` และ `H = (y + 2×10⁶t) a_z A/m` จงหาค่าคงที่ `k` พร้อมหน่วย
* **การอ้างอิงใน Hayt 9th Ed.:** ⭐⭐⭐ **Chapter 9, Drill Problem D9.4(b) (หน้า 292) — ตรงกัน 100%**
  * ใน Hayt หน้า 292 ข้อ D9.4(b):
    > *"D9.4. Let μ = 10⁻⁵ H/m, ε = 4 × 10⁻⁹ F/m, σ = 0, and ρ_v = 0. Find k (including units) so that each of the following pairs of fields satisfies Maxwell's equations:  
    > **(b) E = (20y - kt) a_x V/m, H = (y + 2 × 10⁶t) a_z A/m.**  
    > **Ans. (b) -2.5 × 10⁸ V/(m · s)**"*
* **การอ้างอิงใน Sadiku 3rd Ed.:** Chapter 9, Section 9.5 *Maxwell's Equations in Final Forms* (หน้า 384–387) & Practice Exercise 9.6 (หน้า 387)

---

#### ข้อ 11 & 12 (หน้า 31–36 ในข้อสอบทั้งหมด.pdf) — คลื่นระนาบเอกรูปและเฟสเซอร์ (Uniform Plane Wave & Phasors)
* **โจทย์ข้อ 11:** กำหนด `E_s(z) = 250 e⁻ʲᵏ⁰ᶻ a_x V/m`, `ω = 1 Mrad/s` ในอวกาศว่าง จงหา `f, λ, k₀, H_s, H(z;t)` ทิศทางและวาดรูป
* **โจทย์ข้อ 12:** กำหนด `E(z;t) = E_x0 cos(ωt - k₀z) a_x` จงเขียนในรูป `Re{E_s eʲωᵗ}` และหา `E_s`
* **การอ้างอิงใน Hayt 9th Ed.:**
  * **Chapter 11, Section 11.1 Wave Propagation in Free Space (หน้า 369–384)**
  * **Example 11.1 (หน้า 373):** การแปลง Time domain เป็น Phasor (`E(t) ↔ E_s`)
  * **Example 11.2 (หน้า 374):** การหา Instantaneous field และพารามิเตอร์คลื่น `k₀ = ω/c`
  * **Section 11.1.4 (หน้า 376–380):** ความสัมพันธ์ระหว่าง E และ H ผ่าน Intrinsic Impedance `η₀ = √(μ₀/ε₀) = 120π ≈ 377 Ω` (ทำให้ได้ `|H_s| = 250 / 120π ≈ 0.6631 A/m`)
* **การอ้างอิงใน Sadiku 3rd Ed.:**
  * Chapter 9, Section 9.7 *Time-Harmonic Fields* (หน้า 389–394)
  * Chapter 10, Section 10.5 *Plane Waves in Free Space* (หน้า 423–425) & Example 10.3 (หน้า 424)

---

## สรุปพฤติกรรมและยุทธศาสตร์การออกข้อสอบของอาจารย์ (Professor's Exam Pattern Insights)

จากการวิเคราะห์เชิงลึกเปรียบเทียบทั้ง 2 ไฟล์ข้อสอบกับทั้ง 2 Textbook สรุปได้ดังนี้:

1. **Textbook หลักที่ใช้ดึงโจทย์โดยตรงคือ William H. Hayt (Engineering Electromagnetics 9th Ed.):**
   * ข้อสอบบรรยายและคำนวณเชิงลึกหลายข้อ **คัดลอกจาก Hayt โดยตรงแบบ 100% หรือปรับเพียงเล็กน้อย**:
     * `[ข้อสอบทั้งหมด] ข้อ 1` = Hayt Section 5.2 (p. 114–115) Numerical Example
     * `[ข้อสอบทั้งหมด] ข้อ 3` = Hayt Example 6.2 (p. 165–166)
     * `[ข้อสอบทั้งหมด] ข้อ 8` = Hayt Drill Problem D9.1 (p. 285–286)
     * `[ข้อสอบทั้งหมด] ข้อ 10` = Hayt Drill Problem D9.4(b) (p. 292) **(ตรง 100%)**
     * `[ข้อสอบเก่า 2563] ข้อ 4` = Hayt Chapter 4 Problem 4.12 (p. 107)

2. **Textbook เสริมที่ใช้สำหรับการตั้งโจทย์เชิงวิเคราะห์พิกัดและลวดประจุคือ Matthew N. O. Sadiku (Elements of Electromagnetics 3rd Ed.):**
   * `[ข้อสอบเก่า 2563] ข้อ 1.2` (แปลงพิกัดเวกเตอร์) = Sadiku Problem 2.9 (p. 50)
   * `[ข้อสอบเก่า 2563] ข้อ 3` (ลวดประจุตรงช่วงจำกัด z=0 ถึง z=4) = นิยมใช้สูตรของ Sadiku Section 4.3 Eq. 4.20 (p. 113)

3. **คำแนะนำสำหรับการเตรียมสอบ:**
   * ควรอ่านและทำ **Drill Problems ท้ายหัวข้อย่อยของ Hayt 9th Edition** (โดยเฉพาะบทที่ 4, 5, 6, 7, 9, 11) ให้ครบทุกข้อ เพราะอาจารย์มักนำ Drill Problems มาออกเป็นข้อสอบโดยตรง!
