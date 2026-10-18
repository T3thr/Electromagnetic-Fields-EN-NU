# ระบบการออกแบบและมาตรฐานสถาปัตยกรรมเว็บไซต์ (System Design & UI/UX Standards)
## 303214 สนามแม่เหล็กไฟฟ้า 1 (Electromagnetic Fields I) — มหาวิทยาลัยนเรศวร

เอกสารฉบับนี้กำหนดมาตรฐานการออกแบบระบบ (System Design), สถาปัตยกรรมโค้ด (Software Architecture), ระบบดีไซน์ (Design System), ลำดับชั้นการจัดวาง (Visual Hierarchy) และแนวทางการพัฒนาเว็บเพื่อการศึกษาระดับมหาวิทยาลัยที่เป็นมาตรฐานสากล เพื่อให้ AI Agents และนักพัฒนาทุกคนยึดถือปฏิบัติเป็นแนวทางเดียวกันทั้งโครงการ

---

## 1. ปรัชญาการออกแบบและสถาปัตยกรรมรายวิชา (Curriculum & Educational Architecture)

1. **การแบ่งโครงสร้างรายวิชาอย่างเป็นระบบ (Course Partitioning · Sets 01–22 ตามชุดสไลด์อาจารย์):**
   - **ส่วนกลางภาค (Midterm Syllabus · Sets 01–09):** พีชคณิตเวกเตอร์, พิกัดทรงกระบอก, พิกัดทรงกลม, แรงคูลอมบ์, สนามไฟฟ้า <b>E</b>, ฟลักซ์ <b>D</b>, กฎของเกาส์, ไดเวอร์เจนซ์ ∇ • <b>D</b>, ศักย์ไฟฟ้า <em>V</em>
   - **ส่วนปลายภาค (Final Syllabus · Sets 10–22 อิงจากโฟลเดอร์ `lecture/final`):** Current & Current Density (Set 10), Metallic Conductors & Dielectrics (Set 11), Boundary Conditions (Set 12), Capacitance & Electrostatic Energy (Set 13), Poisson's & Laplace's Equations (Set 14), Steady Magnetic Field & Biot-Savart (Set 15), Ampere's Circuital Law (Set 16), Curl & Stokes' Theorem (Set 17), Magnetic Flux Density (Set 18), Maxwell's Equations for Static Fields (Set 19), Time-Varying Fields & Faraday's Law (Set 20), Displacement Current (Set 21), Maxwell's Equations for Time-Harmonic Fields (Set 22)
   - *ข้อกำหนดการสอบ (Examination Policy):* ต้องจัดวางไว้ในหน้าจำลองการสอบ (`exam-simulator/`) ไม่นำมาแสดงปะปนในหน้าหลัก

2. **ความเป็นทางการและวิชาการ (Scholarly & Academic Tone):**
   - ห้ามใช้อิโมจิ (No Emojis) ในเนื้อหาบทเรียน หัวข้อ สารบัญ ปุ่ม และไอคอน UI ทั้งหมด ให้ใช้ SVG Icons หรือ Unicode มาตรฐานทางการ
   - ใช้ภาษาไทยเชิงวิชาการวิศวกรรมศาสตร์ตามมาตรฐานราชบัณฑิตยสภาและตำราสากล (Hayt & Buck 9th Edition)
   - การอธิบายต้องบอกที่มา (Origin), ความสำคัญ (Physical Meaning), ทุกตัวแปร, คำอ่าน, หน่วย SI, และสูตรตั้งต้นเสมอ

3. **มาตรฐานการแสดงผลทางคณิตศาสตร์ (Strict Mathematical Standards):**
   - อ้างอิงตามเอกสารมาตรฐาน **[`MATH_STANDARDS.md`](./MATH_STANDARDS.md)** อย่างเคร่งครัด
   - ห้ามใช้ Dollar Sign (ตัวคั่นเดี่ยว หรือ ตัวคั่นคู่) หรือรหัส KaTeX/LaTeX ใน Markdown/Chat (Zero-Dollar-Sign Policy ตาม `GEMINI.md`)
   - **คอนเทนเนอร์สมการ (`.math-display`):** ต้องเป็น `display: block` เสมอ ห้ามใส่ `display: flex; flex-wrap: wrap;` เด็ดขาด เพราะจะทำให้ข้อความ ตัวห้อย และเวกเตอร์กระจัดกระจาย หากต้องการจัดแถวเฉพาะให้ใช้ `<div class="math-equation">`
   - **เศษส่วน (Fractions):** ห้ามใช้เครื่องหมายขีดทับ `/` ในการแสดงสูตรหลัก ให้ใช้ `<span class="math-frac"><span class="math-num">...</span><span class="math-den">...</span></span>`
   - **ดีเทอร์มิแนนต์และเมทริกซ์:** ต้องใช้คลาส `.math-det`, `.math-mat` (ปีกกาสมมาตรซ้ายขวาด้วย gradient) และ `.math-table`
   - **ในโจทย์และตัวเลือกแบบทดสอบ:** ห้ามใช้ `_` แทนตัวห้อยเด็ดขาด ต้องใช้ `<sub>` และ `<sup>` ยกกำลังลอยเหนือบรรทัดอย่างถูกต้องเสมอ
   - **ห้ามใส่ข้อความสปอยล์/บอกใบ้ในตัวเลือก:** ตัวเลือกทุกข้อต้องเป็นนิพจน์คำตอบที่บริสุทธิ์ ห้ามใส่วงเล็บคำอธิบายเฉลยในตัวเลือกเด็ดขาด คำอธิบายทั้งหมดต้องอยู่ใน Feedback Box เท่านั้น

---

## 2. ระบบการจัดวางตัวอักษรและระยะห่าง (Typography & Spacing Scale)

### 2.1 ชุดแบบอักษร (Font Family Stack)
```css
--font-sans: "IBM Plex Sans Thai", "Sarabun", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
--font-math: "Cambria Math", "Latin Modern Math", "STIX Two Math", "Times New Roman", serif;
--font-mono: "JetBrains Mono", "Fira Code", monospace;
```

---

## 6. มาตรฐาน Sticky Sidebar ในหน้าบทเรียน (Chapter Sidebar Sticky Standard)

### 6.1 พฤติกรรมตามขนาดหน้าจอ (Responsive Sticky Behavior)

| ขนาดหน้าจอ | Grid Layout | พฤติกรรม Sidebar |
| :--- | :--- | :--- |
| **Desktop** (> 1024px) | `290px + minmax(0, 1fr)` | `position: sticky; top: calc(var(--header-height) + 24px)` |
| **Tablet** (769px – 1024px) | `220px + minmax(0, 1fr)` | `position: sticky; top: calc(var(--header-height) + 24px)` — ยังคง sticky แต่ขนาดคอลัมน์เล็กลง |
| **Mobile** (≤ 768px) | `1fr` (single column) | `position: sticky` ที่ระยะหัวเว็บ + 24px และสูงไม่เกิน 180px — สารบัญเลื่อนได้ภายในกล่อง |

### 6.2 กฎเหล็กสำหรับ Sticky Sidebar

> [!IMPORTANT]
> 1. **`align-items: start` บน `.chapter-container` (Grid Parent) เป็นเงื่อนไขบังคับ** สำหรับ `position: sticky` ให้ทำงาน หากขาด property นี้ Grid จะยืด sidebar ให้สูงเท่ากับ main content และ sticky จะไม่มีผล
> 2. **`align-self: start` บน `.chapter-sidebar`** เพิ่มความชัดเจนและป้องกัน override โดย parent
> 3. **`max-height` ต้องน้อยกว่า viewport** — ตั้งค่าเป็น `calc(100vh - var(--header-height) - 48px)` เสมอ และเปิด `overflow-y: auto` เพื่อรองรับเมนูที่ยาว
> 4. **ห้ามแก้ไข `position` ของ `.chapter-sidebar` โดยตรงในแต่ละ HTML** — ให้ควบคุมทั้งหมดผ่าน `assets/css/style.css` เท่านั้น เพื่อให้ทุก chapter สอดคล้องกัน

### 6.3 ตัวอย่างโครงสร้าง HTML มาตรฐาน (Canonical Chapter Layout)

```html
<div class="chapter-container">
  <!-- Sidebar: ต้องเป็น <aside> ที่มี class="chapter-sidebar" เสมอ -->
  <aside class="chapter-sidebar">
    <div class="sidebar-title">สารบัญบท</div>
    <nav>
      <ul class="sidebar-nav">
        <li><a href="#section-1" class="sidebar-link">1. หัวข้อ</a></li>
      </ul>
    </nav>
  </aside>
  <!-- Main Content: ต้องมี min-width: 0 ผ่าน class="chapter-main" -->
  <main class="chapter-main">
    <!-- เนื้อหาบทเรียน -->
  </main>
</div>
```

### 6.4 มาตรฐานแถบควบคุมการสอบและการจำลองแบบแนวตั้ง (Exam Simulator Vertical Tool Palette Standard)

ระบบจำลองการสอบ (`exam-simulator/`) มีฟังก์ชันควบคุมเวลา (Countdown Timer), เกณฑ์การตรวจคะแนนสด (Live Rubric Score), และรายการข้อสอบ 4 ข้อ ซึ่งต้องเข้าถึงได้ตลอดเวลาโดยไม่บดบังหรือรบกวนพื้นที่การอ่านโจทย์ จึงกำหนดมาตรฐานพิเศษดังนี้:

1. **โหมดย่อแถบเครื่องมือแนวตั้ง (Vertical Tool Palette · Collapsed Mode):**
   - แถบควบคุมเมื่อย่อ (`.exam-sidebar.collapsed`) ต้องจัดเรียงไอคอนเครื่องมือทั้งหมดใน **แนวตั้งคอลัมน์เดี่ยว 100% (Strict Vertical Single Column)** เลียนแบบแถบเครื่องมือในโปรแกรม CAD / Drawing Software (เช่น Figma, Photoshop, Illustrator) **ห้ามจัดเรียงเป็นแนวนอน (No Horizontal Wrap/Grid) เด็ดขาด**
   - ความกว้างในโหมดย่อ: `44px` (Mobile) / `56px` (Desktop)
   - ลำดับไอคอนแนวตั้ง:
     1. ปุ่มลูกศรขยาย (`▶` `.mini-expand-btn`)
     2. เส้นคั่นบาง (`.mini-divider`)
     3. แคปซูลตัวจับเวลาแนวตั้งพร้อมไฟสถานะ (`.mini-timer-capsule` + `.timer-pulse-dot`)
     4. ปุ่มเริ่ม/พักเวลา (`▶` / `❚❚` `.mini-tool-btn`)
     5. เส้นคั่นบาง (`.mini-divider`)
     6. ปุ่มเลือกข้อสอบแนวตั้งเดี่ยว (`Q1`, `Q2`, `Q3`, `Q4` ใน `.mini-q-column`)
     7. เส้นคั่นบาง (`.mini-divider`)
     8. ป้ายแสดงคะแนนสะสมแนวตั้ง (`.mini-score-indicator` แสดงคะแนนรวมสด เช่น `25 pts`)
     9. ปุ่มเปิดใบสูตรด่วน (`📄` `.mini-tool-btn`)

2. **พฤติกรรมบนหน้าจอมือถือ (Sticky Grid Palette):**
   - ตามข้อกำหนดปลายภาค Sidebar ทุกหน้าต้องอยู่ใน Grid flow และใช้ `position: sticky; top: calc(var(--header-height) + 24px)`
   - ห้องกลางภาคที่ย่อใช้คอลัมน์ `44px + minmax(0, 1fr)` เมื่อขยายเปลี่ยนเป็นคอลัมน์เดียวและจำกัดความสูง 180px
   - ห้องปลายภาคใช้สารบัญและเครื่องมือที่เลื่อนภายในกล่องได้ ไม่มีเงาฉากหลังที่รบกวนการอ่านโจทย์
   - บทเรียนบนมือถือใช้สารบัญสูงไม่เกิน 180px เพื่อให้เนื้อหายังมีพื้นที่อ่าน

3. **พฤติกรรมบนหน้าจอ Desktop / Tablet:**
   - บน Desktop เมื่อขยาย จะเป็น Sticky Sidebar ปกติ (`290px`) อยู่ใน Grid flow
   - เมื่อย่อ `.exam-sidebar.collapsed` คอนเทนเนอร์ Grid ของหน้าจะปรับสัดส่วนอัตโนมัติผ่าน `:has(.exam-sidebar.collapsed)` ให้คอลัมน์ซ้ายหดเหลือ `56px` คืนพื้นที่ 95%+ ของหน้าจอให้กับตัวโจทย์และสมการ

---

### 2.2 ลำดับขั้นของตัวอักษร (Modular Typographic Scale)
| ระดับ | แท็ก / คลาส | ขนาด Font Size | Line Height | Font Weight | Spacing Margin Bottom |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Page Title** | `h1.book-title` | `2.10rem` (Desktop) / `1.65rem` (Mobile) | `1.35` | `800` (Extra Bold) | `12px` (ตามด้วย `.subtitle` 28px) |
| **Section Title** | `h2.section-title` | `1.40rem` | `1.40` | `800` | `18px` (Margin Top `44px`) |
| **Subsection** | `h3.sub-title` | `1.15rem` | `1.45` | `700` | `14px` (Margin Top `26px`) |
| **H4 Step/Card** | `h4` | `1.00rem` | `1.50` | `700` | `8px` |
| **Body Paragraph**| `p` | `1.00rem` (16px) | `1.85` | `400` (Regular) | `16px` |
| **Math Equation** | `.math-display` | `1.10rem` | `2.00` | `500` | `20px` (Margin Top `18px`) |
| **Small / Badge** | `.unit-tag`, `.academic-badge` | `0.78rem` - `0.82rem` | `1.20` | `700` | `0px` |

### 2.3 จังหวะระยะห่างแนวตั้ง (Vertical Rhythm & Content Breathing Room)
- แต่ละ `<section>` ใหญ่ต้องมีระยะคั่นไม่น้อยกว่า `48px`
- ระหว่างย่อหน้า `<p>` ให้มี `margin-bottom: 16px` เพื่อไม่ให้เนื้อหาเกาะกันเป็นก้อน
- หัวข้อ `<h2 class="section-title">` ต้องมีขอบล่างชัดเจน `border-bottom: 2px solid var(--rule)` และ `padding-bottom: 10px`

---

## 3. สถาปัตยกรรมแถบนำทางและระบบค้นหา (Navigation & Wiki Search System)

### 3.1 แถบนำทางด้านบน (Desktop Navbar)
- **Brand Logo:** รหัสวิชา `303214` ใน Badge สีน้ำเงินเข้ม พร้อมชื่อวิชา
- **Menu Items:** จัดกลุ่มสารบัญรายวิชาแบ่งชัดเจนเป็น `เนื้อหาส่วนกลางภาค (Midterm)` และ `เนื้อหาส่วนปลายภาค (Final)`
- **Action Buttons:**
  - ปุ่มค้นหาแบบแคปซูล (`.search-trigger-btn`) พร้อมป้าย `Ctrl K`
  - ปุ่มเปลี่ยนโหมดกลางคืน/กลางวัน **แบบ Icon-Only** (`.theme-toggle-btn` รูปดวงจันทร์/ดวงอาทิตย์ SVG)

### 3.2 ระบบค้นหาแบบ Wiki Digital Library Palette
- **Non-blocking Palette:** แสดงเป็นหน้าต่างค้นหาลอยตัวแบบดิจิทัลไลบรารี ไม่บดบังทั้งหน้าจอ
- รองรับคีย์ลัด `Ctrl + K` / `⌘ + K`
- มีป้ายกำกับหมวดหมู่ชัดเจน: `บทเรียน`, `สูตรคณิตศาสตร์`, `แบบฝึกหัด`, `ข้อสอบ`

### 3.3 มาตรฐานความสอดคล้องของแถบนำทางทุกหน้า (Universal Navigation Synchronization)
- แถบนำทางด้านบน (Navbar) และลิ้นชักเมนูมือถือ (Mobile Drawer) ของทุกหน้า (หน้าหลักและทุกบทเรียน 01–22) **ต้องมีโครงสร้างและรายการเหมือนกัน 100%**:
  - เมนู Dropdown สารบัญรายวิชาต้องแบ่งออกเป็น 2 หมวดหมู่อย่างชัดเจน:
    1. **เนื้อหาส่วนกลางภาค (Midterm Coursework · Sets 01–09)**
    2. **เนื้อหาส่วนปลายภาค (Final Coursework · Sets 10–22 อิงจากโฟลเดอร์ `lecture/final`)**
  - ลิงก์เมนูนำทางหลัก: หน้าหลัก, สารบัญรายวิชา ▾, ใบสูตร ▾ (กลางภาค/ปลายภาค), ห้องสอบ ▾ (กลางภาค/ปลายภาค)
  - ปุ่มฟังก์ชันขวา: ปุ่มค้นหา Wiki Search (Ctrl+K), ปุ่มสลับธีม (Icon-Only), ปุ่มเมนูมือถือ (Mobile Hamburger)

### 3.4 มาตรฐานการแสดงผล Navbar และป้องกันการล้นขอบจอบนมือถือ (Zero Horizontal Overflow Standard)

> [!IMPORTANT]
> **กฎเหล็กป้องกันปัญหาจอล้านและต้อง Zoom Out บนมือถือ (Anti-Viewport Blowout Rules):**
> 1. **การบังคับใช้ Overflow Containment ด้วย `overflow-x: clip;` (CRITICAL):**
>    - ทั้ง `html` และ `body` ต้องกำหนด `overflow-x: clip; width: 100%; max-width: 100%;`
>    - 🚫 **ห้ามใช้ `overflow-x: hidden;` บน `html` หรือ `body` เด็ดขาด**: ตามมาตรฐาน CSS Overflow Module Level 3 เมื่อระบุ `overflow-x: hidden` เบราว์เซอร์จะคำนวณ `overflow-y` เป็น `auto` โดยอัตโนมัติ ซึ่งจะเปลี่ยน `body` ให้กลายเป็น scroll container ภายใน และทำให้ `position: sticky` บนแถบ Sidebar (`.chapter-sidebar` และ `#exam-sidebar`) **หยุดทำงานและไม่เลื่อนตามหน้าจอทันที**
>    - การใช้ `overflow-x: clip;` สามารถตัดเนื้อหาที่ล้นขอบจอแนวนอนได้อย่างสมบูรณ์ โดยไม่สร้าง scroll container ภายใน จึงรักษาการทำงานของ `position: sticky` ไว้ได้ 100%
> 2. **Mobile Icon-Only Actions Bar:** บนหน้าจอมือถือ (`≤ 768px`) ปุ่มค้นหา (`.search-trigger-btn`) ต้องซ่อนข้อความ "ค้นหา" ให้เหลือเฉพาะไอคอนแว่นขยาย (`36×36px`) เช่นเดียวกับปุ่มเปลี่ยนธีมและปุ่มเมนู เพื่อให้กลุ่มปุ่มขวาใช้พื้นที่ไม่เกิน `120px`
> 3. **Brand Shrink & Ellipsis:** ข้อความแบรนด์และรหัสวิชา (`.nav-brand`) ต้องมี `min-width: 0; flex-shrink: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;` ป้องกันชื่อวิชาดันแถบ Navbar ให้กว้างเกินหน้าจอ
> 4. **Flex Wrap บน Metadata Bar:** แถบหัวกระดาษ `.course-meta-bar` ต้องมี `flex-wrap: wrap;` เพื่อให้ Badge ป้ายรหัสและฉบับอ้างอิงตัดขึ้นบรรทัดใหม่ได้ ไม่ดันความกว้างหน้าจอทะลุขอบขวา

---

### 3.5 มาตรฐานกล่องเนื้อหาและการ์ดส่วนกลาง (Universal Content Box & Card Standards)

เพื่อป้องกันปัญหาการสร้างกล่องข้อความหรือการ์ดแบบ Ad-hoc ที่ไม่มี Padding, Margin เบี้ยว หรือสีขอบไม่เข้ากับ Design System กำหนดมาตรฐานสถาปัตยกรรมคลาสการ์ดกลางใน `assets/css/style.css` ดังนี้:

1. **คลาสมาตรฐานส่วนกลาง (Centralized Card Classes):**
   - `.card` — การ์ดเนื้อหาทั่วไป
   - `.summary-box` — กล่องสรุปประเด็นสำคัญ หรือบล็อกฟังก์ชันพิเศษ
   - `.practice-generator-card` — กล่องเครื่องมือฝึกทำโจทย์และสุ่มตัวเลข
   - `.feature-box` / `.content-box` — กล่องเน้นข้อความทางวิชาการ

2. **สเกล Padding และ Margin มาตรฐาน (Breathing Room Guarantee):**
   | Viewport | Padding | Margin | Border & Radius |
   | :--- | :--- | :--- | :--- |
   | **Desktop (> 768px)** | `24px 28px` | `28px 0` | `1.5px solid var(--rule)`, `border-radius: var(--radius-md)` |
   | **Mobile (≤ 768px)** | `18px 16px` | `20px 0` | `1.5px solid var(--rule)`, `border-radius: var(--radius-md)` |

3. **โครงสร้างสับคอมโพเนนต์ภายใน (Inner Semantic Hierarchy):**
   ```html
   <div class="summary-box practice-generator-card">
     <div class="summary-box-header">
       <div>
         <h3 class="summary-box-title">ชื่อกล่องหรือการ์ด</h3>
         <p class="summary-box-desc">คำอธิบายการใช้งานหรือบริบทเนื้อหา</p>
       </div>
       <!-- ปุ่ม Action หรือ Badge ทางขวา (ถ้ามี) -->
     </div>
     <div class="summary-box-body">
       <!-- เนื้อหา, ฟอร์ม, หรือปุ่มควบคุม -->
     </div>
   </div>
   ```

4. **กฎเหล็กสำหรับหน้ารายวิชาใหม่ (Future-Proofing Architecture Rule):**
   - 🚫 **ห้ามเขียน `<div>` กล่องเนื้อหาด้วยสไตล์ inline หรือข้าม padding เด็ดขาด**
   - ✅ ต้องเรียกใช้ `.card` หรือ `.summary-box` หรือ `.academic-callout` จาก `assets/css/style.css` เสมอ เพื่อรับประกันว่าทุกหน้าเว็บจะได้รับการจัดระยะห่าง (Breathing Room) ที่ถูกต้องตามมาตรฐานโดยอัตโนมัติ

---

## 4. มาตรฐานการแสดงผลเครื่องมือจำลอง 3 มิติ (Interactive 3D CAD Workbench Standards)

### 4.1 สถาปัตยกรรมแผงควบคุมและวิวพอร์ต (CAD Workbench Architecture)
- **Floating HUD Toolbar:** ติดตั้งแผงควบคุมลอยตัวบน Canvas: Zoom In `+`, Zoom Out `−`, Reset `↺`, Presets (`3D ISO`, `Top XY`, `Side YZ`, `Front XZ`)
- **Retina HiDPI Rendering:** ปรับความละเอียดตาม `window.devicePixelRatio` ให้เส้นเวกเตอร์และตัวอักษรคมชัด
- **Workbench Presets Bar (`.workbench-presets-bar`):** แถบปุ่มลัดด้านบนสำหรับโหลดค่าโจทย์ข้อสอบจริงหรือกรณีศึกษามาตรฐาน (เช่น ข้อสอบข้อ 2.1, ข้อสอบข้อ 3)
- **Coordinate Control Cards (`.coord-card`):** กล่องกรอกพิกัดจุด P, Q, ค่าประจุ หรือขอบเขตการอินทิเกรต ออกแบบเป็นการ์ดแยกชัดเจน พร้อมป้ายกำกับแกน x, y, z และหน่วยวัด `(m)`
- **Analytical Breakdown Grid (`.workbench-breakdown`):** กล่องแสดงผลลัพธ์เวกเตอร์ระยะทาง, ยูนิตเวกเตอร์, ผลคูณจุด, และผลคูณไขว้ ในรูปแบบการ์ด 2 คอลัมน์ที่สบายตา

### 4.2 กฎเหล็กการออกแบบฟอร์มควบคุมให้ Responsive สมบูรณ์แบบ (Responsive Form & Grid Rules)

> [!CAUTION]
> **การป้องกันปัญหา Input Field ล้นกรอบการ์ด (Grid Blowout Prevention):**
> 1. **ต้องกำหนด `min-width: 0` ให้กับ Grid Items ทุกระดับ:** ในระบบ CSS Grid เมื่อใส่ `input[type="number"]` หรือข้อความยาว เบราว์เซอร์จะกำหนดขนาดขั้นต่ำอัตโนมัติ (`min-width: auto`) ซึ่งจะดันให้การ์ดขยายตัวทะลุจอ (Grid Blowout) ดังนั้นคลาส `.coord-card`, `.input-axis-group`, และ `.coord-inputs-row` **ต้องมี `min-width: 0` เสมอ**
> 2. **การบังคับใช้ Box Sizing และขนาดเต็ม 100%:** ช่องกรอกข้อมูลทุกตัวต้องกำหนด `box-sizing: border-box; width: 100%; max-width: 100%; min-width: 0;` ห้ามใช้ Input เปลือยที่ไม่มีคลาสหรือไม่มีการควบคุมขนาด
> 3. **โครงสร้างคลาสมาตรฐานของช่องกรอกพิกัด:**
>    - ใช้โครงสร้าง `.coord-inputs-row` ร่วมกับ `.input-axis-group`
>    - ใส่ป้ายกำกับชัดเจนด้วย `<label class="input-axis-label">แกน X:</label>`
>    - ช่องกรอกตัวเลขต้องใช้คลาส `<input type="number" class="coord-number-input">`
> 4. **ความสมมาตรของคอลัมน์ (Column Symmetry):**
>    - พิกัด 3 มิติ (X, Y, Z): ใช้ `.coord-inputs-row` ซึ่งนิยาม `grid-template-columns: repeat(3, minmax(0, 1fr));`
>    - ขอบเขต 2 ตัวแปร (z₁, z₂): ใช้ `.coord-inputs-row.grid-2-cols` ซึ่งนิยาม `grid-template-columns: repeat(2, minmax(0, 1fr));`
> 5. **การ์ดควบคุม `.coord-card` ใน `.workbench-controls`:**
>    - ใช้ `grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));` เพื่อให้ตัดขึ้นแถวใหม่โดยอัตโนมัติเมื่อดูบนจอมือถือหรือแท็บเล็ต โดยไม่มีการล้นขอบแนวนอนเด็ดขาด

---

## 5. โครงสร้างไฟล์และโฟลเดอร์โครงการ (Directory Structure)

```text
electromagnetic-fields/
├── DESIGN_SYSTEM.md               <-- เอกสารมาตรฐานระบบฉบับนี้
├── MATH_STANDARDS.md              <-- เอกสารมาตรฐานการแสดงผลทางคณิตศาสตร์
├── index.html                     <-- ประตูสู่บทเรียน (Portal Homepage)
├── assets/
│   ├── css/
│   │   ├── style.css              <-- สไตล์ชีตหลัก ระบบธีม สี ฟอนต์ เลย์เอาต์ แมธคอมโพเนนต์
│   │   └── interactive.css        <-- สไตล์โปรแกรมจำลอง 3D Workbench และ CAD HUD
│   └── js/
│       ├── common.js              <-- ตรรกะส่วนกลาง (ธีม, ScrollSpy, Drawer, Tab)
│       └── engines/
│           ├── vector3d-core.js   <-- คอร์เอนจินฉายภาพ 3D
│           ├── vector-sandbox.js  <-- ตัวจำลองเวกเตอร์บทที่ 1
│           ├── cylindrical-sim.js <-- ตัวจำลองพิกัดทรงกระบอกบทที่ 2
│           ├── search-index.js    <-- ดัชนีสืบค้นเนื้อหา
│           └── site-search.js     <-- คอนโทรลเลอร์ค้นหา Wiki Palette
├── 01-vector-algebra/index.html   <-- บทที่ 1
├── 02-cylindrical-coordinates/    <-- บทที่ 2
├── 03-spherical-coordinates/      <-- บทที่ 3 (ข้อสอบ 1)
├── 04-coulombs-law/               <-- บทที่ 4 (ข้อสอบ 2)
├── 05-electric-field-intensity/   <-- บทที่ 5 (ข้อสอบ 3)
├── 06-electric-flux-density/      <-- บทที่ 6
├── 07-gauss-law/                  <-- บทที่ 7
├── 08-divergence-theorem/         <-- บทที่ 8
├── 09-electric-potential/         <-- บทที่ 9 (ข้อสอบ 4)
├── formula-sheet/index.html       <-- ใบสูตรกลางภาค 4 หน้า
└── exam-simulator/index.html      <-- ห้องจำลองการสอบ 3 ชั่วโมง
```
