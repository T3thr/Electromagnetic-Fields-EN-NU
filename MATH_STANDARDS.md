# มาตรฐานการแสดงผลทางคณิตศาสตร์และตัวดำเนินการ (Mathematical Typesetting Standards)
## 303214 สนามแม่เหล็กไฟฟ้า 1 (Electromagnetic Fields I) — มหาวิทยาลัยนเรศวร

เอกสารฉบับนี้กำหนดมาตรฐานการเขียน การจัดรูปแบบโค้ด HTML/CSS และการแสดงผลตัวแปร เวกเตอร์ ตัวดำเนินการ เศษส่วน เมทริกซ์ และดีเทอร์มิแนนต์ สำหรับแพลตฟอร์มการศึกษาวิชาสนามแม่เหล็กไฟฟ้า 1 เพื่อให้ AI Agents และผู้พัฒนายึดถือปฏิบัติอย่างเคร่งครัด

---

## 1. นโยบายการใช้สัญลักษณ์ทางคณิตศาสตร์ (Strict Mathematical Policy)

1. **ห้ามใช้ Dollar Sign (`$` หรือ `$$`) และ KaTeX/LaTeX ใน Markdown/Chat โดยเด็ดขาด** (ตาม `GEMINI.md`)
2. **ในไฟล์ HTML ให้ใช้โครงสร้าง Semantic HTML ร่วมกับ CSS Math Components** เพื่อความคมชัด สวยงาม และรองรับทุกเบราว์เซอร์
3. **ฟอนต์คณิตศาสตร์:** ใช้ `var(--font-math)` ซึ่งแมปไปยัง `"Cambria Math", "Latin Modern Math", "STIX Two Math", "Times New Roman", serif`
4. **กฎเหล็กของโครงสร้างคอนเทนเนอร์สมการ (`.math-display`):**
   - `.math-display` ต้องเป็น **Block Container (`display: block`) เสมอ**
   - **ห้ามใส่ `display: flex; flex-wrap: wrap;` ให้กับ `.math-display` โดยตรงเป็นอันขาด** เพราะจะทำให้ตัวอักษร คำ ข้อความภาษาไทย ตัวห้อย (`<sub>`) ตัวยก (`<sup>`) และแท็ก `<br>` กระจัดกระจายและหลุดแยกจากกัน
   - หากต้องการจัดวางสมการ เมทริกซ์ หรือดีเทอร์มิแนนต์ให้อยู่ในแถวเดียวกันแบบยืดหยุ่น ให้ใช้คอนเทนเนอร์เฉพาะ **`<div class="math-equation">...</div>`** ครอบส่วนนั้นๆ

---

## 2. มาตรฐานการแสดงผลเศษส่วนทางคณิตศาสตร์ (Stacked Mathematical Fractions)

**ห้ามใช้เครื่องหมายขีดทับเฉียง (`/`) ในการแสดงผลสมการทางการ** ให้ใช้โครงสร้าง `.math-frac` ที่มีตัวเศษ (`.math-num`) และตัวส่วน (`.math-den`) เสมอ:

### 2.1 โครงสร้างเศษส่วนมาตรฐาน:
```html
<span class="math-frac">
  <span class="math-num">ตัวเศษ (Numerator)</span>
  <span class="math-den">ตัวส่วน (Denominator)</span>
</span>
```

### 2.2 ตัวอย่างการใช้งาน:
- **เวกเตอร์หนึ่งหน่วย:**
  ```html
  <strong>a</strong><sub>PQ</sub> = <span class="math-frac"><span class="math-num"><strong>R</strong><sub>PQ</sub></span><span class="math-den">|<strong>R</strong><sub>PQ</sub>|</span></span>
  ```
- **สูตรมุมระหว่างเวกเตอร์ (Dot Product Projection):**
  ```html
  cos θ<sub>AB</sub> = <span class="math-frac"><span class="math-num"><strong>A</strong> • <strong>B</strong></span><span class="math-den">|<strong>A</strong>| |<strong>B</strong>|</span></span> = <span class="math-frac"><span class="math-num">A<sub>x</sub> B<sub>x</sub> + A<sub>y</sub> B<sub>y</sub> + A<sub>z</sub> B<sub>z</sub></span><span class="math-den">√[A<sub>x</sub>² + A<sub>y</sub>² + A<sub>z</sub>²] √[B<sub>x</sub>² + B<sub>y</sub>² + B<sub>z</sub>²]</span></span>
  ```
- **สูตรพื้นที่สามเหลี่ยม:**
  ```html
  Area<sub>triangle</sub> = <span class="math-frac"><span class="math-num">1</span><span class="math-den">2</span></span> |<strong>A</strong> × <strong>B</strong>|
  ```
- **การหาพิกัดมุมควอดรันต์:**
  ```html
  ϕ = arctan<span class="math-frac"><span class="math-num">y</span><span class="math-den">x</span></span>
  ```

---

## 3. มาตรฐานการจัดรูปแบบตัวแปรและเวกเตอร์ (Variables & Vectors)

| ชนิดปริมาณ | มาตรฐาน HTML | ผลลัพธ์ตัวอย่าง | คำอธิบาย |
| :--- | :--- | :--- | :--- |
| **สเกลาร์ (Scalar)** | `<em>V</em>`, `<em>T</em>`, `<em>q</em>` | *V*, *T*, *q* | ตัวเอียง (Italic Serif) |
| **เวกเตอร์ (Vector)** | `<b>A</b>`, `<b>B</b>`, `<b>E</b>`, `<b>D</b>` | <b>A</b>, <b>B</b>, <b>E</b>, <b>D</b> | ตัวหนา (Bold Serif/Sans) |
| **เวกเตอร์หนึ่งหน่วย (Unit Vector)**| `<b>a</b><sub>x</sub>`, `<b>a</b><sub>ρ</sub>`, `<b>a</b><sub>r</sub>` | <b>a</b><sub>x</sub>, <b>a</b><sub>ρ</sub>, <b>a</b><sub>r</sub> | ตัวหนาพร้อมตัวห้อยแกน |
| **เวกเตอร์บอกตำแหน่ง (Position)** | `<b>r</b>`, `<b>r</b><sub>P</sub>` | <b>r</b>, <b>r</b><sub>P</sub> | เวกเตอร์จากจุดกำเนิด |
| **เวกเตอร์ระยะทาง (Distance)** | `<b>R</b><sub>PQ</sub>`, `<b>R</b><sub>12</sub>` | <b>R</b><sub>PQ</sub>, <b>R</b><sub>12</sub> | เวกเตอร์ระหว่างจุดสองจุด |
| **ขนาดของเวกเตอร์ (Magnitude)** | `\|<b>A</b>\|` หรือ `<em>A</em>` | \|<b>A</b>\|, *A* | ขนาดสเกลาร์ |
| **ตัวดำเนินการเดล (Del / Nabla)**| `∇`, `∇ • <b>D</b>`, `∇ × <b>H</b>` | ∇, ∇ • <b>D</b>, ∇ × <b>H</b> | สัญลักษณ์ Unicode เดล |

---

### 3.2 มาตรฐานการเขียนส่วนย่อยเชิงอนุพันธ์ (Differential Elements vs Unit Vectors)

ตามตำราสากล (Hayt & Buck 9th Edition) และเอกสารคำสอนของภาควิชา:

1. **อนุพันธ์ของพิกัดสเกลาร์ (`dx`, `dy`, `dz`, `dρ`, `dϕ`, `dr`, `dθ`):**
   - ตัว `d` คือตัวดำเนินการดิฟเฟอเรนเชียล (Differential Operator) ที่กระทำกับตัวแปรพิกัด $x, y, z$
   - **ไม่ต้องมีตัวห้อย** (ห้ามเขียน $d_x, d_y, d_z$ เด็ดขาด) เพราะ $x, y, z$ คือชื่อตัวแปรที่ถูกดิฟเฟอเรนเชียล
   - ในการพิมพ์สมการ ให้เขียน `dx`, `dy`, `dz` หรือ `<em>dx</em> <em>dy</em>`

2. **เวกเตอร์หนึ่งหน่วย (Unit Vectors: `<b>a</b><sub>x</sub>`, `<b>a</b><sub>y</sub>`, `<b>a</b><sub>z</sub>`, `<b>a</b><sub>ρ</sub>`, `<b>a</b><sub>ϕ</sub>`):**
   - ตัว `a` คือสัญลักษณ์ของ Unit Vector (เวกเตอร์ขนาด 1 หน่วย)
   - **ต้องมีตัวห้อยระบุแนวแกนเสมอ** (`<sub>x</sub>`, `<sub>y</sub>`, `<sub>z</sub>`, `<sub>ρ</sub>`, `<sub>ϕ</sub>`, `<sub>r</sub>`, `<sub>θ</sub>`) เพื่อบอกทิศทางพิกัด

3. **เวกเตอร์และสเกลาร์ส่วนย่อยเชิงอนุพันธ์ (`d<b>l</b>`, `d<b>s</b>`, `dv`):**
   - **เวกเตอร์ความยาวส่วนย่อย (Differential Length Vector):** `d<b>l</b> = dx <b>a</b><sub>x</sub> + dy <b>a</b><sub>y</sub> + dz <b>a</b><sub>z</sub>` (ตัว `l` เป็นตัวหนาเพราะเป็นเวกเตอร์)
   - **เวกเตอร์พื้นที่ผิวส่วนย่อย (Differential Normal Area Vector):** `d<b>s</b>` หรือเมื่อต้องการระบุทิศทางตั้งฉากเฉพาะแกน ให้เขียน `d<b>s</b><sub>x</sub> = dy dz <b>a</b><sub>x</sub>`, `d<b>s</b><sub>y</sub> = dx dz <b>a</b><sub>y</sub>`, `d<b>s</b><sub>z</sub> = dx dy <b>a</b><sub>z</sub>`
   - **ปริมาตรส่วนย่อย (Differential Volume):** `dv = dx dy dz` (เป็นปริมาณสเกลาร์ ตัว `v` เป็นตัวตรงปกติ ไม่ใช่เวกเตอร์)

---

## 4. มาตรฐานการแสดงผลดีเทอร์มิแนนต์และเมทริกซ์ (Determinants & Matrices)

### 4.1 ดีเทอร์มิแนนต์ 3×3 สำหรับผลคูณไขว้ (Cross Product Determinant)
```html
<div class="math-display">
  <div class="math-equation">
    <span style="font-weight: 700;"><strong>A</strong> × <strong>B</strong> = </span>
    <div class="math-det">
      <table class="math-table">
        <tr>
          <td><strong>a</strong><sub>x</sub></td>
          <td><strong>a</strong><sub>y</sub></td>
          <td><strong>a</strong><sub>z</sub></td>
        </tr>
        <tr>
          <td>A<sub>x</sub></td>
          <td>A<sub>y</sub></td>
          <td>A<sub>z</sub></td>
        </tr>
        <tr>
          <td>B<sub>x</sub></td>
          <td>B<sub>y</sub></td>
          <td>B<sub>z</sub></td>
        </tr>
      </table>
    </div>
    <span>= (A<sub>y</sub> B<sub>z</sub> - A<sub>z</sub> B<sub>y</sub>) <strong>a</strong><sub>x</sub> - (A<sub>x</sub> B<sub>z</sub> - A<sub>z</sub> B<sub>x</sub>) <strong>a</strong><sub>y</sub> + (A<sub>x</sub> B<sub>y</sub> - A<sub>y</sub> B<sub>x</sub>) <strong>a</strong><sub>z</sub></span>
  </div>
</div>
```

### 4.2 เมทริกซ์การแปลงเวกเตอร์ 3×3 (Transformation Matrix `[A_rc]`)
```html
<div class="math-display">
  <div class="math-equation">
    <div class="math-mat">
      <table class="math-table">
        <tr><td>A<sub>ρ</sub></td></tr>
        <tr><td>A<sub>ϕ</sub></td></tr>
        <tr><td>A<sub>z</sub></td></tr>
      </table>
    </div>
    <span style="font-size: 1.2rem;">=</span>
    <div class="math-mat">
      <table class="math-table">
        <tr>
          <td>cos ϕ</td>
          <td>sin ϕ</td>
          <td>0</td>
        </tr>
        <tr>
          <td>-sin ϕ</td>
          <td>cos ϕ</td>
          <td>0</td>
        </tr>
        <tr>
          <td>0</td>
          <td>0</td>
          <td>1</td>
        </tr>
      </table>
    </div>
    <div class="math-mat">
      <table class="math-table">
        <tr><td>A<sub>x</sub></td></tr>
        <tr><td>A<sub>y</sub></td></tr>
        <tr><td>A<sub>z</sub></td></tr>
      </table>
    </div>
  </div>
</div>
```

### 4.3 มาตรฐาน CSS สำหรับ Matrix Brackets
```css
/* True Mathematical Matrix with symmetrical square brackets [ ] */
.math-mat {
  display: inline-flex;
  align-items: center;
  vertical-align: middle;
  position: relative;
  margin: 0 6px;
  border-left: 2.5px solid var(--ink);
  border-right: 2.5px solid var(--ink);
  padding: 4px 8px;
}

.math-mat::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2.5px;
  background: linear-gradient(to right, var(--ink) 7px, transparent 7px, transparent calc(100% - 7px), var(--ink) calc(100% - 7px));
}

.math-mat::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2.5px;
  background: linear-gradient(to right, var(--ink) 7px, transparent 7px, transparent calc(100% - 7px), var(--ink) calc(100% - 7px));
}
```

---

## 5. กฎการจัดรูปแบบทางคณิตศาสตร์ในข้อสอบและแบบทดสอบ (Quiz & Exam Math Rules)

1. **ห้ามใช้เครื่องหมายขีดล่าง `_` เป็นตัวห้อยในข้อสอบเด็ดขาด:**
   - ❌ ห้ามเขียน: `a_x`, `a_y`, `a_ρ`, `a_ϕ`, `A_x`, `E_t`
   - ✅ ต้องเขียน: `<b>a</b><sub>x</sub>`, `<b>a</b><sub>y</sub>`, `<b>a</b><sub>ρ</sub>`, `<b>a</b><sub>ϕ</sub>`, `A<sub>x</sub>`, `E<sub>t</sub>`
2. **ตัวยกกำลัง (Exponents & Powers):**
   - ❌ ห้ามเขียน: `a^2`, `a2`, `a²` ธรรมดาที่ไม่ได้สัดส่วน
   - ✅ ต้องเขียน: `a<sup>2</sup>`, `R<sup>2</sup>`, `ε<sub>0</sub>`
3. **เศษส่วนในตัวเลือก:**
   - ใช้ `<span class="math-frac"><span class="math-num">...</span><span class="math-den">...</span></span>` เสมอ
4. **คำอธิบายเฉลยและกล่องข้อเสนอแนะ (`data-explanation`):**
   - ข้อความเฉลยทั้งหมดที่อยู่ในแอตทริบิวต์ `data-explanation` จะถูกนำไปแสดงผลผ่าน `innerHTML` ในระบบ JavaScript (`common.js`)
   - **ห้าม** เขียนตัวแปรแบบข้อความดิบ เช่น `a_ρ = cos(90°) a_x`, `a_z`, `a²/2`, หรือ `A • B = 0`
   - **ต้อง** ใส่แท็ก HTML ให้ครบถ้วนเสมอ: `<b>a</b><sub>ρ</sub> = cos(90°) <b>a</b><sub>x</sub>`, `<b>a</b><sub>z</sub>`, `<em>a</em><sup>2</sup>/2`, `<b>A</b> • <b>B</b> = 0`
5. **ห้ามสปอยล์หรือใส่คำอธิบายใบ้ในตัวเลือก (No Spoilers/Hints in Quiz Options):**
   - ห้ามใส่วงเล็บอธิบายคำตอบในตัวเลือก เช่น `(เป็นสเกลาร์ ไม่ใช่เวกเตอร์)` หรือ `(ข้อนี้ผิดเพราะ...)` เด็ดขาด
   - ตัวเลือกทุกข้อต้องเป็นนิพจน์ทางคณิตศาสตร์หรือคำตอบที่สะอาดบริสุทธิ์ คำอธิบายเหตุผลให้แสดงเฉพาะในกล่อง Feedback หลังผู้เรียนกดเลือกคำตอบเท่านั้น
6. **การจัดเรียงสมการดีเทอร์มิแนนต์:**
   - สำหรับสมการดีเทอร์มิแนนต์ขนาด 3×3 ให้จัดแถวของดีเทอร์มิแนนต์ด้วย `<div class="math-equation">` และบรรทัดถัดไปของผลการกระจายทางพีชคณิตให้เว้นระยะเยื้อง (`padding-left: 20px;`) เพื่อความสบายตาและความเป็นระเบียบตามตำราสากล

---

## 6. ตารางสัญลักษณ์ทางคณิตศาสตร์สากล (Universal Symbol Mapping)

| ปริมาณ / ตัวดำเนินการ | สัญลักษณ์ Unicode | รหัส HTML |
| :--- | :--- | :--- |
| **ผลคูณจุด (Dot Product)** | `•` | `&bull;` หรือ `•` |
| **ผลคูณไขว้ (Cross Product)** | `×` | `&times;` หรือ `×` |
| **อินทิกรัลรอบเส้นปิด (Closed Contour)**| `∮` | `&#8750;` |
| **อินทิกรัลผิวปิด (Closed Surface)** | `∯` หรือ `∮` | `&#8751;` |
| **เดล / เกรเดียนต์ / ไดเวอร์เจนซ์** | `∇` | `&nabla;` |
| **อนุพันธ์ย่อย (Partial Derivative)** | `∂` | `&part;` |
| **ค่าคงที่สภาพยอมในอวกาศว่าง** | `ε₀` | `&epsilon;<sub>0</sub>` |
| **ฟลักซ์ไฟฟ้า (Electric Flux)** | `Ψ` | `&Psi;` |
| **มุมแอซิมัท (Azimuth Angle)** | `ϕ` | `&phi;` |
| **รัศมีพิกัดทรงกระบอก** | `ρ` | `&rho;` |
| **มุมซีนิธ (Zenith / Polar Angle)** | `θ` | `&theta;` |
| **ไม่เท่ากับ / ประมาณ** | `≠`, `≈` | `&ne;`, `&approx;` |
| **น้อยกว่าหรือเท่ากับ / มากกว่าหรือเท่ากับ** | `≤`, `≥` | `&le;`, `&ge;` |
