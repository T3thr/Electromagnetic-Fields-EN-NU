# การวิเคราะห์แหล่งที่มาของข้อสอบ — EM Fields (EN-NU)

> **วัตถุประสงค์:** เปรียบเทียบข้อสอบใน `ข้อสอบทั้งหมด.pdf` และ `ข้อสอบเก่า.pdf`
> กับ textbook **Engineering Electromagnetics, 9th Ed.** (Hayt & Buck)
> เพื่อระบุว่าข้อสอบมาจากบทใด หน้าใด และ example/drill problem ใด

---

## สรุปผลการวิเคราะห์

| ข้อสอบ | ชื่อโจทย์ | Textbook Source | บท | หน้า (approx.) | ประเภท |
|---|---|---|---|---|---|
| Q1 | Continuity Equation — J radially outward | Section 5.2, Numerical Example | Ch.5 | p.114–115 | Numerical Example (inline) |
| Q2 | Boundary Conditions — Teflon/Free Space | Section 5.8 + Example 5.5 | Ch.5 | p.135–138 | Section + Example |
| Q3 | Parallel-Plate Capacitor — Laplace | Section 6.2 + Example 6.2 | Ch.6 | p.147–148, p.165–166 | Section + Example |
| Q6 | Ampere's Law (Point Form) — J from H | Section 7.3 (curl H = J) | Ch.7 | p.197–204 | Section Example |
| Q8 | Maxwell's Equations — H from time-varying E | D9.1 (variant/reverse) | Ch.9 | p.285–286 | Drill Problem (modified) |
| Q10 | Maxwell's Equations — find k for consistency | D9.4(b) | Ch.9 | p.292 | Drill Problem (EXACT) |
| Q11 | Uniform Plane Wave — phasor, H, instantaneous | Section 11.1 + Example 11.1–11.2 | Ch.11 | p.369–384 | Section + Example |
| Q12 | Plane Wave — phasor from time-domain | Example 11.1 (inverse) | Ch.11 | p.373–374 | Example (inverse) |

---

## รายละเอียดแต่ละข้อ

---

### Q1 — Continuity Equation: J ออกในแนวรัศมี ลดลงตาม e^(-t)

**โจทย์จากข้อสอบ:**

```
J = (e^(-t) / r) a_r  A/m²

กำหนด: rho_v → 0 เมื่อ t → ∞

จงหา:
(ก) ความหนาแน่นประจุไฟฟ้าเชิงปริมาตร (rho_v)
(ข) ความเร็วของความหนาแน่นประจุที่เคลื่อนที่ (v)
```

**แหล่งที่มาใน Textbook:**

- **บท:** Chapter 5 — Conductors and Dielectrics
- **Section:** 5.2 Continuity of Current
- **หน้า:** p.114–115 (9th Ed.)
- **ลักษณะ:** Numerical Example แบบ inline ที่ใช้อธิบาย Section 5.2

**ข้อความ Textbook (ตรงกันทุกประการ):**

> "As a numerical example...let us consider a current density that is directed radially outward and decreases exponentially with time, **J = (1/r) e^(-t) a_r A/m²**"

**เปรียบเทียบ:**

| รายการ | ข้อสอบ | Textbook |
|---|---|---|
| สูตร J | (e^(-t)/r) a_r | (1/r) e^(-t) a_r |
| เงื่อนไข | rho_v → 0 เมื่อ t → ∞ | K(r) = 0, rho_v → 0 as t → ∞ |
| ผล rho_v | e^(-t)/r²  C/m³ | (1/r²) e^(-t) C/m³ |
| ผล v | r a_r  m/s | r m/s |

**ตรงกันทุกประการ** — เนื้อหาเหมือนกัน 100%

**เฉลยจาก Textbook:**
- `rho_v = e^(-t) / r²  C/m³`
- `v = r a_r  m/s`

---

### Q2 — Boundary Conditions: เทฟลอน/อวกาศว่าง

**โจทย์จากข้อสอบ:**

```
บริเวณ 1: Teflon (epsilon_r = 2.1)
บริเวณ 2: อวกาศว่าง

ณ รอยต่อ:
- E_tan2 = 45 N/C  (สนามไฟฟ้าสัมผัสใน Region 2)
- D_N2 = 20 uC/m²  (ความหนาแน่นฟลักซ์ไฟฟ้าตั้งฉากใน Region 2)

จงหา: E_tan1, D_tan1, D_N1, E_N1 ใน Region 1
```

**แหล่งที่มาใน Textbook:**

- **บท:** Chapter 5 — Conductors and Dielectrics
- **Section:** 5.8 Boundary Conditions for Perfect Dielectric Materials
- **หน้า:** p.135–139 (9th Ed.)
- **Examples ที่เกี่ยวข้อง:**
  - Example 5.4 & 5.5 — Teflon slab, epsilon_r = 2.1 (หน้า 133–139)
  - Drill Problem D5.9 & D5.10 (หน้า 139) — boundary conditions style

**สูตรจาก Section 5.8:**
- `E_tan1 = E_tan2`  (Eq. 32)
- `D_N1 - D_N2 = rho_s`  (Eq. 34) → ถ้า rho_s = 0 แล้ว `D_N1 = D_N2`
- `D_tan1 / D_tan2 = epsilon_1 / epsilon_2`

**เปรียบเทียบ:**

| รายการ | ข้อสอบ | Textbook |
|---|---|---|
| epsilon_r | 2.1 (Teflon) | Example 5.4/5.5 ใช้ Teflon epsilon_r = 2.1 |
| Approach | หา E_tan, D_tan, D_N, E_N | เหมือน D5.9/D5.10 |

**ตรงกับ Section 5.8 + Example 5.4/5.5**

**เฉลย:**
- `E_tan1 = E_tan2 = 45 N/C`
- `D_tan1 = 2.1 × epsilon_0 × 45 ≈ 8.367e-10 C/m²`
- `D_N1 = D_N2 = 20 uC/m²`
- `E_N1 = D_N1 / epsilon_1 = 20 / (2.1 × epsilon_0) ≈ 1.076e12 N/C`

---

### Q3 — Parallel-Plate Capacitor: Laplace's Equation

**โจทย์จากข้อสอบ:**

```
ตัวนำแผ่นบน: V = V0,  rho_s,UP C/m²
ตัวนำแผ่นล่าง: V = 0,  rho_s,LO C/m²
แผ่นอยู่ที่ z = d (บน) และ z = 0 (ล่าง)

จงหา:
(ก) การกระจาย V(z) ระหว่างแผ่น
(ข) ความเข้มสนามไฟฟ้า E
(ค) ความหนาแน่นฟลักซ์ไฟฟ้า D
(ง) ความหนาแน่นประจุเชิงผิว rho_s แต่ละแผ่น
(จ) ความจุไฟฟ้า C
```

**แหล่งที่มาใน Textbook:**

- **บท:** Chapter 6 — Capacitance
- **Section:** 6.2 Parallel-Plate Capacitor (p.147–148)
- **Example:** **Example 6.2** (p.165–166) — "Find the capacitance of a parallel-plate capacitor from Laplace's equation"
- **Section:** 6.7 Examples of the Solution of Laplace's Equation

**ข้อความ Textbook (Example 6.2):**

> "Start with the potential function, Eq. (31), and find the capacitance of a parallel-plate capacitor of plate area S, plate separation d, and potential difference V0 between plates. Take V = 0 at x = 0 and V = V0 at x = d."

**เปรียบเทียบ:**

| รายการ | ข้อสอบ | Textbook Example 6.2 |
|---|---|---|
| ทิศ | z-direction | x-direction (same physics) |
| BC | V(0) = 0, V(d) = V0 | V(0) = 0, V(d) = V0 |
| ผล V | V = V0 z/d | V = V0 x/d |
| ผล E | -(V0/d) a_z | -(V0/d) a_x |
| ผล C | epsilon*S/d | epsilon*S/d |

**ตรงกับ Example 6.2** — เปลี่ยนแกน x → z แต่ physics เหมือนกัน 100%

**เฉลย:**
- `V(z) = V0 * z/d`
- `E = -(V0/d) a_z  V/m`
- `D = -epsilon*(V0/d) a_z  C/m²`
- `rho_s,UP = +epsilon*V0/d`,  `rho_s,LO = -epsilon*V0/d`
- `C = epsilon*S/d  F`

---

### Q6 — Ampere's Law (Point Form): หา J จาก H

**โจทย์จากข้อสอบ:**

```
H = x²z a_y - y²x a_z

จงหา: J ที่จุด P(2, 3, 4)
```

**แหล่งที่มาใน Textbook:**

- **บท:** Chapter 7 — The Steady Magnetic Field
- **Section:** 7.3 Curl (p.197–204)
- **สมการ:** curl H = del × H = J  (Eq. 27–28, p.203)

**วิธีทำ:**

```
del × H:
  Hx = 0,  Hy = x²z,  Hz = -y²x

J_x = dHz/dy - dHy/dz = -y² - x²
J_y = dHx/dz - dHz/dx = 0 - (-y²) = y²
J_z = dHy/dx - dHx/dy = 2xz - 0 = 2xz

ที่ P(2,3,4):
J = (-4-9) a_x + 9 a_y + (2×2×4) a_z
  = -13 a_x + 9 a_y + 16 a_z  A/m²
```

**ตรงกับ Section 7.3 methodology** — ข้อสอบออกแบบใหม่ แต่ใช้วิธีตาม Section 7.3

---

### Q8 — Maxwell's Equations: หา H จาก E ที่เปลี่ยนตามเวลา

**โจทย์จากข้อสอบ:**

```
epsilon = 1e-11 F/m,  mu = 1e-5 H/m
E = a_x * 20e-4 * cos(1e5 * t) * sin(1e-3 * y)  N/C

จงหา: H (time-varying magnetic field)
```

**แหล่งที่มาใน Textbook:**

- **บท:** Chapter 9 — Time-Varying Fields and Maxwell's Equations
- **Drill Problem:** **D9.1** (หน้า 285–286)
- **Section:** 9.1 Faraday's Law + 9.3 Maxwell's Equations in Point Form

**ข้อความ Textbook (D9.1):**

> "D9.1. Within a certain region, epsilon = 1e-11 F/m and mu = 1e-5 H/m. If Bx = 2e-4 cos(1e5 t) sin(1e-3 y) T: (a) use del×H = epsilon * dE/dt to find E..."

**เปรียบเทียบ:**

| รายการ | ข้อสอบ Q8 | Textbook D9.1 |
|---|---|---|
| epsilon | 1e-11 F/m | 1e-11 F/m |
| mu | 1e-5 H/m | 1e-5 H/m |
| ตัวแปรที่กำหนด | E (สนามไฟฟ้า) | B (ฟลักซ์แม่เหล็ก) |
| สิ่งที่ต้องหา | H | E |
| สมการที่ใช้ | del×E = -dB/dt (Faraday) | del×H = epsilon*dE/dt (Ampere) |
| ความถี่ | cos(1e5 t), sin(1e-3 y) | cos(1e5 t), sin(1e-3 y) |

**Reverse problem จาก D9.1** — parameters เดียวกัน แต่กำหนด E ให้หา H แทน

**เฉลย:**

```
del × E = -dB/dt  → integrate → H = a_z * 2e-7 * sin(1e5 t) * cos(1e-3 y)  A/m
```

---

### Q10 — Maxwell's Equations: หา k ที่ทำให้ E, H สอดคล้อง

**โจทย์จากข้อสอบ:**

```
mu = 1e5 H/m,  epsilon = 4e-9 F/m,  sigma = 0,  rho_v = 0
E = (20y - k*t) a_x  N/C
H = (y + 2e6 * t) a_z  A/m

จงหา: k (พร้อมหน่วย)
```

**แหล่งที่มาใน Textbook:**

> **ตรงกัน 100% กับ Drill Problem D9.4(b)**

- **บท:** Chapter 9 — Time-Varying Fields and Maxwell's Equations
- **Drill Problem:** **D9.4(b)** (หน้า 292)
- **Section:** 9.3 Maxwell's Equations in Point Form

**ข้อความ Textbook (D9.4):**

> "D9.4. Let mu = 1e-5 H/m, epsilon = 4e-9 F/m, sigma = 0, and rho_v = 0. Find k (including units) so that each of the following pairs of fields satisfies Maxwell's equations: **(b) E = (20y - k*t) a_x V/m, H = (y + 2e6 * t) a_z A/m**
> Ans. (b) -2.5e8 V/(m·s)"

> NOTE: ข้อสอบเปลี่ยน mu จาก 1e-5 H/m (textbook) เป็น 1e5 H/m — อาจเป็น typo

**เฉลยจาก Textbook:**
- `k = -2.5e8 V/(m·s)`

---

### Q11 — Uniform Plane Wave: หา H, lambda, k0 จาก Es

**โจทย์จากข้อสอบ:**

```
Es(z) = a_x * 250 * e^(-j*k0*z)  V/m
omega = 1 Mrad/sec = 1e6 rad/s
คลื่นแพร่ในอวกาศว่าง

จงหา:
(ก) ความถี่ f
(ข) ความยาวคลื่น lambda
(ค) wave number k0
(ง) Hs (spatial magnetic field)
(จ) H (instantaneous)
(ฉ) ทิศการแพร่ + วาดรูป
```

**แหล่งที่มาใน Textbook:**

- **บท:** Chapter 11 — The Uniform Plane Wave
- **Sections:**
  - 11.1.1: Wave Equation (p.369+)
  - 11.1.2: Solutions (Eq. 31)
  - 11.1.3: Vector Helmholtz Equation (p.374, Eq. 24)
  - **11.1.4: Relation Between E and H: Intrinsic Impedance** (p.380)
- **Examples:**
  - Example 11.1 (p.373) — phasor conversion
  - Example 11.2 (p.374) — construct phasor + real field

**สูตรสำคัญ:**
- `k0 = omega/c = omega * sqrt(mu0 * epsilon0)`
- `eta0 = 120*pi ≈ 377 Ω` (intrinsic impedance)
- `Hs = (1/eta0) a_k × Es`

**ตรงกับ Section 11.1 โดยตรง** — framework ของ Section 11.1.1–11.1.4

**เฉลย:**
- `f = omega / (2*pi) = 1e6 / (2*pi) ≈ 159.15 kHz`
- `lambda = c/f = 3e8 / 159.15e3 ≈ 1884.9 m`
- `k0 = omega/c = 1e6 / 3e8 ≈ 3.3356e-3 rad/m`
- `Hs = a_y * (250 / 120*pi) * e^(-j*k0*z) ≈ a_y * 0.6631 * e^(-j*k0*z)  A/m`
- `H(z;t) = a_y * 0.6631 * cos(omega*t - k0*z)  A/m`
- ทิศ: +z direction (เนื่องจาก sign -k0z)

---

### Q12 — Plane Wave: เขียน phasor จาก time-domain

**โจทย์จากข้อสอบ:**

```
E(z;t) = a_x * Ex0 * cos(omega*t + k0*z)

จงเขียนให้อยู่ในรูป E(x,y,z;t) = Re{Es(x,y,z) * e^(j*omega*t)}
พร้อมหา Es
```

**แหล่งที่มาใน Textbook:**

- **บท:** Chapter 11
- **Example:** **Example 11.1** (p.373)
- **Method:** Euler's formula: e^(j*theta) = cos(theta) + j*sin(theta)

**เปรียบเทียบ:**

| รายการ | ข้อสอบ | Textbook Example 11.1 |
|---|---|---|
| Input | Ex0 cos(omega*t + k0*z) | 100 cos(1e8*t - 0.5z + 30°) |
| Output | Es = a_x Ex0 e^(+j*k0*z) | Eys = 100 e^(-j*0.5z + j*30°) |
| Method | Euler's formula | Euler's formula |

**ตรงกับ Example 11.1 methodology** — เปลี่ยนทิศคลื่น (+k0z) เพื่อสอบแนวคิดเดิม

**เฉลย:**
```
Es(z) = a_x * Ex0 * e^(+j*k0*z)  (traveling in -z direction)
```

---

## ข้อสอบเก่า (ข้อสอบเก่า.pdf)

> **หมายเหตุ:** ไฟล์ `ข้อสอบเก่า.pdf` เป็น scanned image PDF (ถ่ายภาพด้วย iOS)
> OCR ไม่สามารถแปลงได้อย่างแม่นยำ — ข้อความที่ได้เป็น garbled characters
> การวิเคราะห์ด้านล่างอิงจาก visual content ที่อ่านได้บางส่วน

**เนื้อหาที่อ่านได้จากไฟล์:**

จากเนื้อหาที่ OCR แปลงได้ (บางส่วน):
- มีการคำนวณแรงระหว่างประจุ (Coulomb's Law)
- มีพิกัด Q1, Q2, Q3 และระยะห่าง -5 ถึง 2.5
- มี unit vector และการหาแรง F2 = F12 + F32
- มีผลลัพธ์ขนาดแรงที่คำนวณได้

**แหล่งที่มาใน Textbook (ประมาณการ):**

- **บท:** Chapter 2 — Coulomb's Law and Electric Field Intensity
- **Section:** 2.1 The Experimental Law of Coulomb (p.26–29)
- **ตัวอย่างที่ใกล้เคียง:** Example 2.1–2.3 — three-charge systems, force vectors

> แนะนำ: เพื่อให้ได้การวิเคราะห์ที่แม่นยำ ควรอ่าน PDF โดยตรง หรือ export เป็น image แล้ววิเคราะห์ด้วย OCR ที่ดีกว่า

---

## สรุป Pattern การออกข้อสอบ

### วิธีการออกข้อสอบ

อาจารย์ใช้ 3 รูปแบบหลัก:

| รูปแบบ | ตัวอย่าง | ความยาก |
|---|---|---|
| Exact Copy — ดัดแปลงน้อยมาก | Q10 = D9.4(b) แทบทุกตัวเลข | Medium |
| Modified — เปลี่ยนค่า หรือทิศทาง | Q8 = Reverse of D9.1; Q3 = เปลี่ยนแกน | Medium-High |
| Inspired — ใช้ concept เดียวกัน | Q11 = Section 11.1 framework | High |

### บทที่ออกข้อสอบบ่อย

```
Ch.5  (Conductors & Dielectrics)   — Q1, Q2
Ch.6  (Capacitance / Laplace)      — Q3
Ch.7  (Steady Magnetic Field)      — Q6
Ch.9  (Time-Varying / Maxwell's)   — Q8, Q10
Ch.11 (Uniform Plane Wave)         — Q11, Q12
```

### Drill Problems ที่ควรทำให้ครบ

| บท | Drill Problems สำคัญ | เหตุผล |
|---|---|---|
| Ch.5 | D5.2, D5.9, D5.10 | ตรงกับ Q1, Q2 |
| Ch.6 | D6.1, D6.2 + Example 6.2 | ตรงกับ Q3 |
| Ch.7 | D7.2, D7.3 + Section 7.3 | ตรงกับ Q6 |
| Ch.9 | **D9.1, D9.4** | ตรงกับ Q8, Q10 — ต้องทำ! |
| Ch.11 | Example 11.1, 11.2 + Section 11.1.4 | ตรงกับ Q11, Q12 |

---

## อ้างอิง

- **Textbook:** Hayt, W.H. & Buck, J.A., *Engineering Electromagnetics*, 9th Edition, McGraw-Hill, 2012
- **ข้อสอบ:** `raw/ข้อสอบทั้งหมด.pdf` (36 หน้า, iOS scan)
- **ข้อสอบเก่า:** `raw/ข้อสอบเก่า.pdf` (10 หน้า, iOS scan — OCR quality poor)
- **วิเคราะห์โดย:** Antigravity AI — 2026-08-28

---

*ไฟล์นี้สร้างขึ้นเพื่อการศึกษาและเปรียบเทียบเนื้อหาเท่านั้น*
