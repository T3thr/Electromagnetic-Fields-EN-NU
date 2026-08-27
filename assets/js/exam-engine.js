/**
 * 303214 สนามแม่เหล็กไฟฟ้า 1 (Electromagnetic Fields I) · มหาวิทยาลัยนเรศวร
 * Midterm Exam Simulation & Strict Rubric Assessment Engine
 * ออกแบบตามมาตรฐาน DESIGN_SYSTEM.md และ MATH_STANDARDS.md (Zero-Dollar-Sign Policy)
 */

class ExamEngine {
  constructor(options = {}) {
    this.totalSeconds = options.durationMinutes ? options.durationMinutes * 60 : 3 * 3600; // 3 hours
    this.remainingSeconds = this.totalSeconds;
    this.timerInterval = null;
    this.isPaused = false;
    this.currentQIndex = 0;
    
    this.questions = this.getExamQuestions();
    this.userScores = {}; // Key: "qIndex_partId_rubricIdx" -> boolean
    
    this.initDOM();
  }

  getExamQuestions() {
    return [
      {
        id: 1,
        title: "ข้อที่ 1: เวกเตอร์หน่วยและระบบพิกัดทรงกลม (25 คะแนนเต็ม)",
        parts: [
          {
            partId: "1.1",
            points: 10,
            question: "จงอธิบายว่า เวกเตอร์หน่วยในระบบพิกัดทรงกลม (<strong>a</strong><sub>r</sub>, <strong>a</strong><sub>θ</sub>, <strong>a</strong><sub>ϕ</sub>) มีข้อจำกัดอย่างไรเมื่อเทียบกับระบบพิกัดฉาก พร้อมกับวาดรูปประกอบ และอธิบายวิธีปฏิบัติที่ถูกต้องในการรวมเวกเตอร์",
            rubric: [
              { id: "r11_1", label: "ระบุข้อจำกัดว่าเวกเตอร์หน่วย <strong>a</strong><sub>r</sub>, <strong>a</strong><sub>θ</sub>, <strong>a</strong><sub>ϕ</sub> มีทิศทางเปลี่ยนไปตามตำแหน่งมุม (θ, ϕ) ของแต่ละจุด ไม่คงที่ในอวกาศ", pts: 4 },
              { id: "r11_2", label: "อธิบายว่าไม่สามารถนำเวกเตอร์ในพิกัดทรงกลมที่อยู่คนละจุดมาบวก/ลบองค์ประกอบกันตรงๆ ได้ พร้อมยกตัวอย่างประกอบ", pts: 4 },
              { id: "r11_3", label: "ระบุวิธีปฏิบัติที่ถูกต้องว่าต้องแปลงเป็นพิกัดฉาก (Cartesian: <strong>a</strong><sub>x</sub>, <strong>a</strong><sub>y</sub>, <strong>a</strong><sub>z</sub>) ก่อนคำนวณเสมอ", pts: 2 }
            ],
            solutionHtml: `
              <div class="step-card step-essential">
                <span class="step-badge must-write">หลักการสำคัญและข้อจำกัด (Core Limitations)</span>
                <p><strong>1. สาระสำคัญของข้อจำกัด (Limitation Principle):</strong></p>
                <ul style="margin-left: 20px; line-height: 1.85;">
                  <li>เวกเตอร์หนึ่งหน่วยฐานในระบบพิกัดทรงกลมทั้งสามตัว ได้แก่ <code><strong>a</strong><sub>r</sub></code>, <code><strong>a</strong><sub>θ</sub></code>, และ <code><strong>a</strong><sub>ϕ</sub></code> <strong>ไม่ใช่เวกเตอร์คงที่ในอวกาศ (Non-constant Base Vectors)</strong> โดยทิศทางของเวกเตอร์จะเปลี่ยนแปลงไปตามตำแหน่งเชิงมุม <code>(θ, ϕ)</code> ของแต่ละจุดสังเกต <code>P(r, θ, ϕ)</code></li>
                  <li>แตกต่างจากระบบพิกัดฉาก (Cartesian Coordinates) ที่เวกเตอร์ฐาน <code><strong>a</strong><sub>x</sub>, <strong>a</strong><sub>y</sub>, <strong>a</strong><sub>z</sub></code> มีทิศทางชี้คงที่ขนานกับแกนอ้างอิงทั่วทั้งอวกาศ 3 มิติ</li>
                </ul>

                <p><strong>2. การพิสูจน์เชิงวิเคราะห์จากเวกเตอร์ฐานพิกัดฉาก:</strong></p>
                <div class="math-display">
                  <strong>a</strong><sub>r</sub> = sin θ cos ϕ <strong>a</strong><sub>x</sub> + sin θ sin ϕ <strong>a</strong><sub>y</sub> + cos θ <strong>a</strong><sub>z</sub> &nbsp; (ทิศทางแปรผันตาม θ และ ϕ)<br>
                  <strong>a</strong><sub>θ</sub> = cos θ cos ϕ <strong>a</strong><sub>x</sub> + cos θ sin ϕ <strong>a</strong><sub>y</sub> - sin θ <strong>a</strong><sub>z</sub> &nbsp; (ทิศทางแปรผันตาม θ และ ϕ)<br>
                  <strong>a</strong><sub>ϕ</sub> = -sin ϕ <strong>a</strong><sub>x</sub> + cos ϕ <strong>a</strong><sub>y</sub> &nbsp; (ทิศทางแปรผันตาม ϕ)
                </div>

                <p><strong>3. ผลกระทบและข้อห้ามในการคำนวณทางวิศวกรรม:</strong></p>
                <div class="math-display" style="border-left-color: var(--red);">
                  <strong>ข้อห้ามเด็ดขาด:</strong> หากมีเวกเตอร์ <code><strong>A</strong></code> ที่จุด P₁ และเวกเตอร์ <code><strong>B</strong></code> ที่จุด P₂ ซึ่งมีพิกัดเชิงมุมต่างกัน <strong>ห้ามนำองค์ประกอบมาบวกกันตรงๆ</strong><br>
                  เช่น <code><strong>A</strong> + <strong>B</strong> ≠ (A<sub>r</sub> + B<sub>r</sub>) <strong>a</strong><sub>r</sub> + (A<sub>θ</sub> + B<sub>θ</sub>) <strong>a</strong><sub>θ</sub> + (A<sub>ϕ</sub> + B<sub>ϕ</sub>) <strong>a</strong><sub>ϕ</sub></code> เพราะ <code><strong>a</strong><sub>r</sub></code> ที่จุด P₁ และ P₂ ชี้คนละทิศทาง!
                </div>

                <p><strong>4. แนวทางปฏิบัติที่ถูกต้อง (Standard Engineering Procedure):</strong></p>
                <ol style="margin-left: 20px; line-height: 1.85;">
                  <li>แปลงเวกเตอร์ทุกตัวให้อยู่ใน <strong>ระบบพิกัดฉาก (Cartesian: <strong>a</strong><sub>x</sub>, <strong>a</strong><sub>y</sub>, <strong>a</strong><sub>z</sub>)</strong> เสียก่อน</li>
                  <li>ดำเนินการทางพีชคณิต (บวก, ลบ, อินทิเกรต) ตามแนวแกน x, y, z ซึ่งเป็นเวกเตอร์คงที่</li>
                  <li>หากต้องการผลลัพธ์ในพิกัดทรงกลม จึงแปลงคำตอบลัพธ์กลับสู่พิกัดทรงกลม ณ ตำแหน่งปลายทางที่ต้องการ</li>
                </ol>
              </div>
            `
          },
          {
            partId: "1.2",
            points: 15,
            question: "กำหนดให้เวกเตอร์ <strong>A</strong> ที่อยู่ ณ จุดในระบบพิกัดทรงกลม P(2.4, 50°, 70°) มีค่าเป็น<br><code><strong>A</strong> = <span class=\"math-frac\"><span class=\"math-num\">2 sin θ</span><span class=\"math-den\">r</span></span> <strong>a</strong><sub>θ</sub> + <span class=\"math-frac\"><span class=\"math-num\">sin ϕ</span><span class=\"math-den\">sin θ</span></span> <strong>a</strong><sub>ϕ</sub></code><br>จงเขียนเวกเตอร์นี้ให้อยู่ในรูประบบพิกัดทรงกระบอก (Cylindrical Coordinates) ณ จุด P",
            rubric: [
              { id: "r12_1", label: "เขียนสูตรตั้งต้นทั่วไปของการแปลงเวกเตอร์ (General Transformation Formulas) ก่อนแทนค่า", pts: 5 },
              { id: "r12_2", label: "คำนวณค่าตัวเลขขององค์ประกอบ A_r, A_θ, A_ϕ ณ จุด P(2.4, 50°, 70°) ถูกต้อง", pts: 4 },
              { id: "r12_3", label: "คำนวณหา A_ρ, A_ϕ, A_z ในพิกัดทรงกระบอกครบถ้วนถูกต้องพร้อมเขียนเวกเตอร์รวมสมบูรณ์", pts: 6 }
            ],
            solutionHtml: `
              <div class="step-card step-essential">
                <span class="step-badge must-write">ขั้นที่ 1: เขียนสูตรตั้งต้นทั่วไปของการแปลงเวกเตอร์ (Formula-First)</span>
                <p>ความสัมพันธ์ระหว่างองค์ประกอบของเวกเตอร์ในระบบพิกัดทรงกระบอก <code>(A<sub>ρ</sub>, A<sub>ϕ</sub>, A<sub>z</sub>)</code> และพิกัดทรงกลม <code>(A<sub>r</sub>, A<sub>θ</sub>, A<sub>ϕ</sub>)</code>:</p>
                <div class="math-display">
                  A<sub>ρ</sub> = <strong>A</strong> • <strong>a</strong><sub>ρ</sub> = A<sub>r</sub> sin θ + A<sub>θ</sub> cos θ<br>
                  A<sub>ϕ</sub> = <strong>A</strong> • <strong>a</strong><sub>ϕ</sub> = A<sub>ϕ</sub> &nbsp;&nbsp; (แกนมุมหมุน ϕ ในทั้งสองระบบเป็นแนวเดียวกัน)<br>
                  A<sub>z</sub> = <strong>A</strong> • <strong>a</strong><sub>z</sub> = A<sub>r</sub> cos θ - A<sub>θ</sub> sin θ
                </div>
              </div>

              <div class="step-card">
                <span class="step-badge">ขั้นที่ 2: คำนวณค่าองค์ประกอบ ณ จุด P(r = 2.4, θ = 50°, ϕ = 70°)</span>
                <p>ค่าฟังก์ชันตรีโกณมิติ: <code>sin(50°) ≈ 0.766044</code>, <code>cos(50°) ≈ 0.642788</code>, <code>sin(70°) ≈ 0.939693</code></p>
                <div class="math-display">
                  • A<sub>r</sub> = <strong>0</strong> &nbsp; (โจทย์ไม่มีองค์ประกอบในแนว a<sub>r</sub>)<br>
                  • A<sub>θ</sub> = <span class="math-frac"><span class="math-num">2 sin(50°)</span><span class="math-den">2.4</span></span> = <span class="math-frac"><span class="math-num">2(0.766044)</span><span class="math-den">2.4</span></span> = <span class="math-frac"><span class="math-num">1.532088</span><span class="math-den">2.4</span></span> ≈ <strong>0.63837</strong><br>
                  • A<sub>ϕ</sub> = <span class="math-frac"><span class="math-num">sin(70°)</span><span class="math-den">sin(50°)</span></span> = <span class="math-frac"><span class="math-num">0.939693</span><span class="math-den">0.766044</span></span> ≈ <strong>1.22668</strong>
                </div>
              </div>

              <div class="step-card step-essential">
                <span class="step-badge must-write">ขั้นที่ 3: แทนค่าหาองค์ประกอบในระบบพิกัดทรงกระบอกและสรุปคำตอบ</span>
                <div class="math-display">
                  1) องค์ประกอบแนวรัศมีทรงกระบอก (A<sub>ρ</sub>):<br>
                  A<sub>ρ</sub> = A<sub>r</sub> sin(50°) + A<sub>θ</sub> cos(50°) = 0 + (0.63837 × 0.642788) ≈ <strong>0.41033</strong><br><br>
                  2) องค์ประกอบแนวราบมุมหมุน (A<sub>ϕ</sub>):<br>
                  A<sub>ϕ</sub> = A<sub>ϕ</sub> ≈ <strong>1.22668</strong><br><br>
                  3) องค์ประกอบแนวแกนดิ่ง (A<sub>z</sub>):<br>
                  A<sub>z</sub> = A<sub>r</sub> cos(50°) - A<sub>θ</sub> sin(50°) = 0 - (0.63837 × 0.766044) ≈ <strong>-0.48902</strong>
                </div>

                <div class="math-display" style="border-left-color: var(--accent);">
                  <strong>คำตอบสุดท้าย (Final Answer):</strong><br>
                  <strong>A</strong> = <strong>0.410 a</strong><sub>ρ</sub> + <strong>1.227 a</strong><sub>ϕ</sub> - <strong>0.489 a</strong><sub>z</sub><br>
                  <em>(หรือในรูปความแม่นยำสูง 4 ตำแหน่ง: <strong>A</strong> ≈ 0.4103 <strong>a</strong><sub>ρ</sub> + 1.2267 <strong>a</strong><sub>ϕ</sub> - 0.4890 <strong>a</strong><sub>z</sub>)</em>
                </div>
              </div>
            `
          }
        ]
      },
      {
        id: 2,
        title: "ข้อที่ 2: กฎของคูลอมบ์และสมดุลแรงลัพธ์ (20 คะแนนเต็ม)",
        parts: [
          {
            partId: "2.1",
            points: 12,
            question: "จงหาแรงคูลอมบ์บนประจุ Q₂ ที่เกิดจากประจุ Q₁ และ Q₃ เมื่อ<br>• Q₂ = 2 C วางอยู่ที่จุดกำเนิด P₂(0, 0, 0) ในระบบพิกัดฉาก<br>• Q₁ = 3√3 C วางอยู่ที่ตำแหน่ง P₁(5, 0, 0) ในระบบพิกัดฉาก<br>• Q₃ = 3 C วางอยู่ที่ตำแหน่ง P₃(-2.5, <span class=\"math-frac\"><span class=\"math-num\">5√3</span><span class=\"math-den\">2</span></span>, 0) ในระบบพิกัดฉาก",
            rubric: [
              { id: "r21_1", label: "เขียนสูตรทั่วไปของกฎของคูลอมบ์ F = (1/4πε₀)(Q_a Q_b / |R|²) a_R ก่อนแทนค่า", pts: 3 },
              { id: "r21_2", label: "คำนวณเวกเตอร์ระยะทาง R₁₂ = r₂ - r₁ และ R₃₂ = r₂ - r₃ พร้อมขนาด |R| = 5 m ถูกต้อง", pts: 4 },
              { id: "r21_3", label: "รวมแรงเวกเตอร์ F₂ = F₁₂ + F₃₂ ได้ผลลัพธ์ถูกต้องทั้งในรูปตัวแปรและตัวเลขพร้อมหน่วย นิวตัน (N)", pts: 5 }
            ],
            solutionHtml: `
              <div class="step-card step-essential">
                <span class="step-badge must-write">ขั้นที่ 1: เขียนสูตรตั้งต้นทั่วไป (Formula-First)</span>
                <div class="math-display">
                  <strong>F</strong> = <span class="math-frac"><span class="math-num">1</span><span class="math-den">4πε₀</span></span> <span class="math-frac"><span class="math-num">Q<sub>a</sub> Q<sub>b</sub></span><span class="math-den">|<strong>R</strong>|²</span></span> <strong>a</strong><sub>R</sub> = <span class="math-frac"><span class="math-num">Q<sub>a</sub> Q<sub>b</sub></span><span class="math-den">4πε₀ |<strong>R</strong>|³</span></span> <strong>R</strong> &nbsp;&nbsp; (โดย <em>k</em> = <span class="math-frac"><span class="math-num">1</span><span class="math-den">4πε₀</span></span> ≈ 8.988 × 10⁹ N·m²/C²)
                </div>
              </div>

              <div class="step-card">
                <span class="step-badge">ขั้นที่ 2: คำนวณแรง F₁₂ และ F₃₂ ทีละตัว</span>
                <p><strong>1) แรง F₁₂ จากประจุ Q₁ กระทำต่อ Q₂:</strong></p>
                <div class="math-display">
                  • <strong>r</strong>₁ = 5 <strong>a</strong><sub>x</sub> , &nbsp; <strong>r</strong>₂ = 0 <strong>a</strong><sub>x</sub><br>
                  • <strong>R</strong>₁₂ = <strong>r</strong>₂ - <strong>r</strong>₁ = (0 - 5) <strong>a</strong><sub>x</sub> = -5 <strong>a</strong><sub>x</sub> &nbsp; (|<strong>R</strong>₁₂| = 5 m)<br>
                  • <strong>F</strong>₁₂ = <span class="math-frac"><span class="math-num">1</span><span class="math-den">4πε₀</span></span> [ <span class="math-frac"><span class="math-num">(3√3)(2)</span><span class="math-den">5³</span></span> (-5 <strong>a</strong><sub>x</sub>) ] = <span class="math-frac"><span class="math-num">1</span><span class="math-den">4πε₀</span></span> [ -<span class="math-frac"><span class="math-num">6√3</span><span class="math-den">25</span></span> <strong>a</strong><sub>x</sub> ] N ≈ -0.41569 <em>k</em> <strong>a</strong><sub>x</sub> N
                </div>

                <p><strong>2) แรง F₃₂ จากประจุ Q₃ กระทำต่อ Q₂:</strong></p>
                <div class="math-display">
                  • <strong>r</strong>₃ = -2.5 <strong>a</strong><sub>x</sub> + <span class="math-frac"><span class="math-num">5√3</span><span class="math-den">2</span></span> <strong>a</strong><sub>y</sub> , &nbsp; <strong>r</strong>₂ = 0<br>
                  • <strong>R</strong>₃₂ = <strong>r</strong>₂ - <strong>r</strong>₃ = (0 - (-2.5)) <strong>a</strong><sub>x</sub> + (0 - <span class="math-frac"><span class="math-num">5√3</span><span class="math-den">2</span></span>) <strong>a</strong><sub>y</sub> = 2.5 <strong>a</strong><sub>x</sub> - <span class="math-frac"><span class="math-num">5√3</span><span class="math-den">2</span></span> <strong>a</strong><sub>y</sub><br>
                  • |<strong>R</strong>₃₂| = √[ (2.5)² + (<span class="math-frac"><span class="math-num">5√3</span><span class="math-den">2</span></span>)² ] = √[ 6.25 + 18.75 ] = √25 = <strong>5 m</strong><br>
                  • <strong>F</strong>₃₂ = <span class="math-frac"><span class="math-num">1</span><span class="math-den">4πε₀</span></span> [ <span class="math-frac"><span class="math-num">(3)(2)</span><span class="math-den">5³</span></span> (2.5 <strong>a</strong><sub>x</sub> - <span class="math-frac"><span class="math-num">5√3</span><span class="math-den">2</span></span> <strong>a</strong><sub>y</sub>) ] = <span class="math-frac"><span class="math-num">1</span><span class="math-den">4πε₀</span></span> [ <span class="math-frac"><span class="math-num">3</span><span class="math-den">25</span></span> <strong>a</strong><sub>x</sub> - <span class="math-frac"><span class="math-num">3√3</span><span class="math-den">25</span></span> <strong>a</strong><sub>y</sub> ] N<br>
                  &nbsp;&nbsp;<strong>F</strong>₃₂ ≈ <em>k</em> (0.12000 <strong>a</strong><sub>x</sub> - 0.20785 <strong>a</strong><sub>y</sub>) N
                </div>
              </div>

              <div class="step-card step-essential">
                <span class="step-badge must-write">ขั้นที่ 3: รวมแรงลัพธ์บนประจุ Q₂ ด้วยหลักการซ้อนทับ (Superposition)</span>
                <div class="math-display">
                  <strong>F</strong>₂ = <strong>F</strong>₁₂ + <strong>F</strong>₃₂ = <span class="math-frac"><span class="math-num">1</span><span class="math-den">4πε₀</span></span> [ (-<span class="math-frac"><span class="math-num">6√3</span><span class="math-den">25</span></span> + <span class="math-frac"><span class="math-num">3</span><span class="math-den">25</span></span>) <strong>a</strong><sub>x</sub> - <span class="math-frac"><span class="math-num">3√3</span><span class="math-den">25</span></span> <strong>a</strong><sub>y</sub> ] N<br><br>
                  <strong>ตอบ (รูปเศษส่วนและค่าคงตัว):</strong><br>
                  <strong>F</strong>₂ = <span class="math-frac"><span class="math-num">1</span><span class="math-den">4πε₀</span></span> [ (<span class="math-frac"><span class="math-num">3 - 6√3</span><span class="math-den">25</span></span>) <strong>a</strong><sub>x</sub> - <span class="math-frac"><span class="math-num">3√3</span><span class="math-den">25</span></span> <strong>a</strong><sub>y</sub> ] N<br><br>
                  <strong>ตอบ (รูปตัวเลขแม่นยำ):</strong><br>
                  <strong>F</strong>₂ = <em>k</em> [ -0.29569 <strong>a</strong><sub>x</sub> - 0.20785 <strong>a</strong><sub>y</sub> ] N = <strong>-2.658 × 10⁹ <strong>a</strong><sub>x</sub> - 1.868 × 10⁹ <strong>a</strong><sub>y</sub> นิวตัน (N)</strong>
                </div>
              </div>
            `
          },
          {
            partId: "2.2",
            points: 8,
            question: "ถ้านำประจุหนึ่งตัวซึ่งแทนด้วย Q₄ เข้าไปวางในระบบเพื่อให้ผลรวมของแรงบนประจุ Q₂ มีค่าเท่ากับศูนย์ (สภาวะสมดุล <strong>F</strong><sub>2,net</sub> = <strong>0</strong>) จงหาค่าของประจุและตำแหน่งของประจุ Q₄ พร้อมแสดงรายละเอียดการได้มาของคำตอบ",
            rubric: [
              { id: "r22_1", label: "ตั้งสมการเงื่อนไขสมดุลแรง F_net = F₂ + F₄₂ = 0 ⇒ F₄₂ = -F₂", pts: 2 },
              { id: "r22_2", label: "คำนวณหาทิศทางและขนาดของแรงต้าน F₄₂", pts: 3 },
              { id: "r22_3", label: "ระบุขนาด ชนิด และพิกัดตำแหน่ง P₄ ของประจุ Q₄ ที่ถูกต้องสอดคล้องกัน", pts: 3 }
            ],
            solutionHtml: `
              <div class="step-card step-essential">
                <span class="step-badge must-write">ขั้นที่ 1: ตั้งสมการเงื่อนไขสมดุลแรง (Equilibrium Condition)</span>
                <div class="math-display">
                  <strong>F</strong><sub>2,net</sub> = <strong>F</strong>₂ + <strong>F</strong>₄₂ = <strong>0</strong> &nbsp;&nbsp; ⇒ &nbsp;&nbsp; <strong>F</strong>₄₂ = -<strong>F</strong>₂<br><br>
                  <strong>F</strong>₄₂ = <span class="math-frac"><span class="math-num">1</span><span class="math-den">4πε₀</span></span> [ <span class="math-frac"><span class="math-num">6√3 - 3</span><span class="math-den">25</span></span> <strong>a</strong><sub>x</sub> + <span class="math-frac"><span class="math-num">3√3</span><span class="math-den">25</span></span> <strong>a</strong><sub>y</sub> ] N = <em>k</em> (0.29569 <strong>a</strong><sub>x</sub> + 0.20785 <strong>a</strong><sub>y</sub>) N
                </div>
              </div>

              <div class="step-card">
                <span class="step-badge">ขั้นที่ 2: วิเคราะห์ขนาดและทิศทางของแรงต้าน</span>
                <div class="math-display">
                  • ขนาดแรงต้าน: |<strong>F</strong>₄₂| = <em>k</em> √[(0.29569)² + (0.20785)²] = <em>k</em> √(0.08743 + 0.04320) = <strong>0.36143 <em>k</em> N</strong><br>
                  • ทิศทางแรงต้านชี้ไปในควอดรันต์ที่ 1: θ = arctan(<span class="math-frac"><span class="math-num">0.20785</span><span class="math-den">0.29569</span></span>) ≈ <strong>35.10°</strong> (เทียบแกน +x)
                </div>
              </div>

              <div class="step-card step-essential">
                <span class="step-badge must-write">ขั้นที่ 3: กำหนดขนาด ชนิด และพิกัดตำแหน่งของประจุ Q₄</span>
                <p>จากกฎของคูลอมบ์ <code><strong>F</strong>₄₂ = <span class="math-frac"><span class="math-num">Q₄ Q₂</span><span class="math-den">4πε₀ |<strong>R</strong>₄₂|³</span></span> <strong>R</strong>₄₂</code> โดย <code><strong>r</strong>₂ = (0,0,0)</code> ดังนั้น <code><strong>R</strong>₄₂ = -<strong>r</strong>₄</code></p>
                <div class="math-display">
                  หากเลือกวางประจุที่ระยะรัศมีสมมาตร <em>d</em> = 5 เมตร (เท่ากับ Q₁ และ Q₃):<br>
                  • เพื่อให้เกิดแรงผลักชี้ไปที่มุม 35.10° ประจุ Q₄ ต้องวางอยู่ที่มุมตรงข้าม (180° + 35.10° = 215.10°)<br>
                  • <strong>ตำแหน่งของ Q₄:</strong> P₄(-5 cos 35.10°, -5 sin 35.10°, 0) = <strong>P₄(-4.091 m, -2.875 m, 0 m)</strong><br><br>
                  • <strong>คำนวณหาขนาดประจุ Q₄:</strong><br>
                  <span class="math-frac"><span class="math-num">|Q₄| (2)</span><span class="math-den">5²</span></span> = 0.36143 &nbsp;&nbsp; ⇒ &nbsp;&nbsp; <strong>Q₄ = <span class="math-frac"><span class="math-num">0.36143 × 25</span><span class="math-den">2</span></span> = +4.518 คูลอมบ์ (C)</strong> (ประจุบวก)
                </div>
              </div>
            `
          }
        ]
      },
      {
        id: 3,
        title: "ข้อที่ 3: สนามไฟฟ้าจากลวดประจุจำกัดบนแกน z (30 คะแนนเต็ม)",
        parts: [
          {
            partId: "3.1",
            points: 30,
            question: "ลวดเส้นหนึ่งทอดตัวยาวในแนวแกน z ตั้งแต่ z = 0 ถึง z = 4 เส้นลวดนี้มีประจุเรียงชิดกันมากตลอดช่วงความยาว และมีความหนาแน่นประจุเชิงเส้นเท่ากับ ρ<sub>l</sub> C/m<br><br>จงหาสนามไฟฟ้า ณ จุดในพิกัดฉาก P(0, 3, 0) โดยให้แสดงสนามไฟฟ้าที่คำนวณได้ในรูปพิกัดฉาก และให้เขียนผลลัพธ์ในคำตอบสุดท้ายไว้ในรูปของ π และ ε₀ (ไม่ต้องแทนค่า π และ ε₀ เป็นตัวเลข)",
            rubric: [
              { id: "r31_1", label: "เขียนสูตรตั้งต้นทั่วไป dE = (ρ_l dz' / 4πε₀ R²) a_R และอินทิกรัลรวม", pts: 5 },
              { id: "r31_2", label: "กำหนด dQ = ρ_l dz' และหาเวกเตอร์ระยะทาง R = 3 a_y - z' a_z ถูกต้อง", pts: 6 },
              { id: "r31_3", label: "แยกองค์ประกอบอินทิกรัล E_y และ E_z พร้อมกำหนดขอบเขต z' = 0 ถึง 4", pts: 5 },
              { id: "r31_4", label: "แสดงการอินทิเกรตเชิงวิเคราะห์ด้วยตรีโกณมิติ z' = 3 tan ψ ทีละขั้นตอนอย่างสมบูรณ์", pts: 10 },
              { id: "r31_5", label: "ได้คำตอบสุดท้ายในรูปพิกัดฉากและติดค่า π, ε₀ ถูกต้องสมบูรณ์", pts: 4 }
            ],
            solutionHtml: `
              <div class="step-card step-essential">
                <span class="step-badge must-write">ขั้นที่ 1: เขียนสูตรตั้งต้นและนิยามเวกเตอร์ส่วนย่อย (Setup)</span>
                <div class="math-display">
                  <strong>สูตรตั้งต้น:</strong> <strong>E</strong> = ∫ <span class="math-frac"><span class="math-num">dQ</span><span class="math-den">4πε₀ |<strong>R</strong>|²</span></span> <strong>a</strong><sub>R</sub> = ∫ <span class="math-frac"><span class="math-num">ρ<sub>l</sub> dz'</span><span class="math-den">4πε₀ |<strong>R</strong>|³</span></span> <strong>R</strong><br><br>
                  • จุดสังเกต (Observation Point): <strong>r</strong> = (0, 3, 0) = 3 <strong>a</strong><sub>y</sub><br>
                  • จุดประจุย่อยบนเส้นลวด (Source Point): <strong>r'</strong> = (0, 0, z') = z' <strong>a</strong><sub>z</sub> &nbsp; (0 ≤ z' ≤ 4)<br>
                  • เวกเตอร์ระยะทาง: <strong>R</strong> = <strong>r</strong> - <strong>r'</strong> = 3 <strong>a</strong><sub>y</sub> - z' <strong>a</strong><sub>z</sub><br>
                  • ขนาดระยะทาง: |<strong>R</strong>| = √[ 3² + (z')² ] = √[ 9 + (z')² ]
                </div>
              </div>

              <div class="step-card step-essential">
                <span class="step-badge must-write">ขั้นที่ 2: แสดงการอินทิเกรตเชิงวิเคราะห์องค์ประกอบ E<sub>y</sub></span>
                <div class="math-display">
                  E<sub>y</sub> = <span class="math-frac"><span class="math-num">ρ<sub>l</sub></span><span class="math-den">4πε₀</span></span> ∫<sub>0</sub><sup>4</sup> <span class="math-frac"><span class="math-num">3 dz'</span><span class="math-den">[9 + (z')²]<sup>3/2</sup></span></span><br><br>
                  <strong>เทคนิคการแทนค่าด้วยตรีโกณมิติ (Trigonometric Substitution):</strong><br>
                  ให้ <code>z' = 3 tan ψ</code> &nbsp; ⇒ &nbsp; <code>dz' = 3 sec² ψ dψ</code><br>
                  และ <code>√[9 + (z')²] = 3 sec ψ</code> &nbsp; ⇒ &nbsp; <code>[9 + (z')²]<sup>3/2</sup> = 27 sec³ ψ</code><br><br>
                  = <span class="math-frac"><span class="math-num">ρ<sub>l</sub></span><span class="math-den">4πε₀</span></span> ∫ <span class="math-frac"><span class="math-num">3(3 sec² ψ dψ)</span><span class="math-den">27 sec³ ψ</span></span> = <span class="math-frac"><span class="math-num">ρ<sub>l</sub></span><span class="math-den">4πε₀</span></span> (<span class="math-frac"><span class="math-num">9</span><span class="math-den">27</span></span>) ∫ <span class="math-frac"><span class="math-num">1</span><span class="math-den">sec ψ</span></span> dψ<br>
                  = <span class="math-frac"><span class="math-num">ρ<sub>l</sub></span><span class="math-den">12πε₀</span></span> ∫ cos ψ dψ = <span class="math-frac"><span class="math-num">ρ<sub>l</sub></span><span class="math-den">12πε₀</span></span> [ sin ψ ]<br><br>
                  แปลงตัวแปรกลับ: <code>sin ψ = <span class="math-frac"><span class="math-num">z'</span><span class="math-den">√[9 + (z')²]</span></span></code><br>
                  = <span class="math-frac"><span class="math-num">ρ<sub>l</sub></span><span class="math-den">12πε₀</span></span> [ <span class="math-frac"><span class="math-num">z'</span><span class="math-den">√[9 + (z')²]</span></span> ]<sub>0</sub><sup>4</sup> = <span class="math-frac"><span class="math-num">ρ<sub>l</sub></span><span class="math-den">12πε₀</span></span> [ <span class="math-frac"><span class="math-num">4</span><span class="math-den">√[9 + 16]</span></span> - 0 ] = <span class="math-frac"><span class="math-num">ρ<sub>l</sub></span><span class="math-den">12πε₀</span></span> (<span class="math-frac"><span class="math-num">4</span><span class="math-den">5</span></span>)<br>
                  <strong>E<sub>y</sub> = <span class="math-frac"><span class="math-num">ρ<sub>l</sub></span><span class="math-den">15πε₀</span></span> <strong>a</strong><sub>y</sub> V/m</strong>
                </div>
              </div>

              <div class="step-card step-essential">
                <span class="math-display">
                  <strong>ขั้นที่ 3: แสดงการอินทิเกรตเชิงวิเคราะห์องค์ประกอบ E<sub>z</sub></strong><br><br>
                  E<sub>z</sub> = <span class="math-frac"><span class="math-num">ρ<sub>l</sub></span><span class="math-den">4πε₀</span></span> ∫<sub>0</sub><sup>4</sup> <span class="math-frac"><span class="math-num">- z' dz'</span><span class="math-den">[9 + (z')²]<sup>3/2</sup></span></span><br><br>
                  <strong>เทคนิคการเปลี่ยนตัวแปร u (u-substitution):</strong><br>
                  ให้ <code>u = 9 + (z')²</code> &nbsp; ⇒ &nbsp; <code>du = 2 z' dz'</code> (เมื่อ z'=0 ⇒ u=9, z'=4 ⇒ u=25)<br><br>
                  = - <span class="math-frac"><span class="math-num">ρ<sub>l</sub></span><span class="math-den">8πε₀</span></span> ∫<sub>9</sub><sup>25</sup> u<sup>-3/2</sup> du = - <span class="math-frac"><span class="math-num">ρ<sub>l</sub></span><span class="math-den">8πε₀</span></span> [ -2 u<sup>-1/2</sup> ]<sub>9</sub><sup>25</sup><br>
                  = <span class="math-frac"><span class="math-num">ρ<sub>l</sub></span><span class="math-den">4πε₀</span></span> [ <span class="math-frac"><span class="math-num">1</span><span class="math-den">√25</span></span> - <span class="math-frac"><span class="math-num">1</span><span class="math-den">√9</span></span> ] = <span class="math-frac"><span class="math-num">ρ<sub>l</sub></span><span class="math-den">4πε₀</span></span> [ <span class="math-frac"><span class="math-num">1</span><span class="math-den">5</span></span> - <span class="math-frac"><span class="math-num">1</span><span class="math-den">3</span></span> ] = <span class="math-frac"><span class="math-num">ρ<sub>l</sub></span><span class="math-den">4πε₀</span></span> (- <span class="math-frac"><span class="math-num">2</span><span class="math-den">15</span></span>)<br>
                  <strong>E<sub>z</sub> = - <span class="math-frac"><span class="math-num">ρ<sub>l</sub></span><span class="math-den">30πε₀</span></span> <strong>a</strong><sub>z</sub> V/m</strong>
                </div>
              </div>

              <div class="step-card step-essential">
                <span class="step-badge must-write">ขั้นที่ 4: รวมเวกเตอร์สนามไฟฟ้าลัพธ์ (Final Result)</span>
                <div class="math-display" style="border-left-color: var(--accent);">
                  <strong>คำตอบสุดท้าย (ในรูปติดค่า π และ ε₀ ตามสั่ง):</strong><br>
                  <strong>E</strong> = <span class="math-frac"><span class="math-num">ρ<sub>l</sub></span><span class="math-den">30πε₀</span></span> [ 2 <strong>a</strong><sub>y</sub> - <strong>a</strong><sub>z</sub> ] V/m<br>
                  <em>(หรือเขียนแยก: <strong>E</strong> = <span class="math-frac"><span class="math-num">ρ<sub>l</sub></span><span class="math-den">15πε₀</span></span> <strong>a</strong><sub>y</sub> - <span class="math-frac"><span class="math-num">ρ<sub>l</sub></span><span class="math-den">30πε₀</span></span> <strong>a</strong><sub>z</sub> โวลต์ต่อเมตร)</em>
                </div>
              </div>
            `
          }
        ]
      },
      {
        id: 4,
        title: "ข้อที่ 4: ความต่างศักย์และอุปมาพลังงาน (25 คะแนนเต็ม)",
        parts: [
          {
            partId: "4.1",
            points: 12,
            question: "จงหาความต่างศักย์ระหว่างจุด A และ B (V<sub>AB</sub>) เมื่อจุด A คือจุดที่มีระยะในแนวรัศมี r = r<sub>A</sub>, จุด B คือจุดที่มีระยะในแนวรัศมี r = r<sub>B</sub> ท่ามกลางความหนาแน่นฟลักซ์ไฟฟ้า <code><strong>D</strong> = <span class=\"math-frac\"><span class=\"math-num\">r</span><span class=\"math-den\">(r² + a²)²</span></span> <strong>a</strong><sub>r</sub></code> ในอวกาศว่าง (เมื่อ a คือค่าคงตัว)",
            rubric: [
              { id: "r41_1", label: "เขียนความสัมพันธ์ E = D/ε₀ และสูตรตั้งต้น V_AB = -∫_B^A E • dl", pts: 4 },
              { id: "r41_2", label: "แสดงการอินทิเกรตเชิงวิเคราะห์ด้วยการเปลี่ยนตัวแปร u = r² + a² ละเอียดทุกขั้นตอน", pts: 5 },
              { id: "r41_3", label: "แทนค่าขอบเขต r_B ถึง r_A ได้คำตอบ V_AB ถูกต้องสมบูรณ์", pts: 3 }
            ],
            solutionHtml: `
              <div class="step-card step-essential">
                <span class="step-badge must-write">ขั้นที่ 1: เขียนสูตรตั้งต้นทั่วไป (General Formulation)</span>
                <div class="math-display">
                  • สนามไฟฟ้าในอวกาศว่าง: <strong>E</strong> = <span class="math-frac"><span class="math-num"><strong>D</strong></span><span class="math-den">ε₀</span></span> = <span class="math-frac"><span class="math-num">r</span><span class="math-den">ε₀ (r² + a²)²</span></span> <strong>a</strong><sub>r</sub><br>
                  • นิยามความต่างศักย์: V<sub>AB</sub> = V<sub>A</sub> - V<sub>B</sub> = - ∫<sub>r<sub>B</sub></sub><sup>r<sub>A</sub></sup> <strong>E</strong> • d<strong>l</strong><br>
                  • เนื่องจากสนามชี้ตามแนว <strong>a</strong><sub>r</sub>: <code>d<strong>l</strong> = dr <strong>a</strong><sub>r</sub></code> &nbsp; ⇒ &nbsp; <code><strong>E</strong> • d<strong>l</strong> = <span class="math-frac"><span class="math-num">r dr</span><span class="math-den">ε₀ (r² + a²)²</span></span></code><br>
                  V<sub>AB</sub> = - ∫<sub>r<sub>B</sub></sub><sup>r<sub>A</sub></sup> <span class="math-frac"><span class="math-num">r dr</span><span class="math-den">ε₀ (r² + a²)²</span></span>
                </div>
              </div>

              <div class="step-card step-essential">
                <span class="step-badge must-write">ขั้นที่ 2: แสดงการอินทิเกรตเชิงวิเคราะห์ (Analytical Hand-Integration)</span>
                <p>ให้ <code>u = r² + a²</code> &nbsp; ⇒ &nbsp; <code>du = 2r dr</code> &nbsp; ⇒ &nbsp; <code>r dr = <span class="math-frac"><span class="math-num">du</span><span class="math-den">2</span></span></code></p>
                <div class="math-display">
                  V<sub>AB</sub> = - <span class="math-frac"><span class="math-num">1</span><span class="math-den">2ε₀</span></span> ∫ u<sup>-2</sup> du = - <span class="math-frac"><span class="math-num">1</span><span class="math-den">2ε₀</span></span> [ <span class="math-frac"><span class="math-num">u<sup>-1</sup></span><span class="math-den">-1</span></span> ] = <span class="math-frac"><span class="math-num">1</span><span class="math-den">2ε₀</span></span> [ <span class="math-frac"><span class="math-num">1</span><span class="math-den">u</span></span> ]<br>
                  = <span class="math-frac"><span class="math-num">1</span><span class="math-den">2ε₀</span></span> [ <span class="math-frac"><span class="math-num">1</span><span class="math-den">r² + a²</span></span> ]<sub>r<sub>B</sub></sub><sup>r<sub>A</sub></sup><br><br>
                  <strong>ตอบ: V<sub>AB</sub> = <span class="math-frac"><span class="math-num">1</span><span class="math-den">2ε₀</span></span> [ <span class="math-frac"><span class="math-num">1</span><span class="math-den">r<sub>A</sub>² + a²</span></span> - <span class="math-frac"><span class="math-num">1</span><span class="math-den">r<sub>B</sub>² + a²</span></span> ] โวลต์ (V)</strong>
                </div>
              </div>
            `
          },
          {
            partId: "4.2",
            points: 8,
            question: "ถ้า r<sub>A</sub> &lt; r<sub>B</sub> ความต่างศักย์ V<sub>AB</sub> ที่หาได้ในข้อ 4.1 มีค่าเป็นบวกหรือลบ ทำไมจึงเป็นเช่นนั้น และยกอุปมาประกอบ",
            rubric: [
              { id: "r42_1", label: "ระบุชัดเจนว่า V_AB มีค่าเป็น 'บวก' (Positive)", pts: 2 },
              { id: "r42_2", label: "อธิบายเหตุผลทางฟิสิกส์ว่าการเลื่อนประจุทดสอบบวกจาก B เข้าหา A สวนทิศทางสนามไฟฟ้า ต้องมีแรงภายนอกทำงานต้านสนาม", pts: 3 },
              { id: "r42_3", label: "ยกอุปมาประกอบที่ถูกต้อง เช่น การเข็นวัตถุขึ้นภูเขาต้านแรงโน้มถ่วง หรือการออกแรงอัดสปริง", pts: 3 }
            ],
            solutionHtml: `
              <div class="step-card step-essential">
                <span class="step-badge must-write">คำตอบและเหตุผลทางฟิสิกส์ (Physical Meaning)</span>
                <p><strong>1) เครื่องหมายของ V<sub>AB</sub>:</strong> มีค่าเป็น <strong>บวก (+)</strong></p>
                <div class="math-display">
                  เมื่อ <code>r<sub>A</sub> &lt; r<sub>B</sub></code> จะได้ <code>r<sub>A</sub>² + a² &lt; r<sub>B</sub>² + a²</code><br>
                  ทำให้ <code><span class="math-frac"><span class="math-num">1</span><span class="math-den">r<sub>A</sub>² + a²</span></span> &gt; <span class="math-frac"><span class="math-num">1</span><span class="math-den">r<sub>B</sub>² + a²</span></span></code><br>
                  ส่งผลให้ <code>V<sub>AB</sub> = <span class="math-frac"><span class="math-num">1</span><span class="math-den">2ε₀</span></span> [ <span class="math-frac"><span class="math-num">1</span><span class="math-den">r<sub>A</sub>² + a²</span></span> - <span class="math-frac"><span class="math-num">1</span><span class="math-den">r<sub>B</sub>² + a²</span></span> ] &gt; 0</code> (เป็นบวกเสมอ)
                </div>

                <p><strong>2) เหตุผลทางฟิสิกส์ (Physical Reason):</strong></p>
                <p>สนามไฟฟ้า <code><strong>E</strong></code> มีทิศพุ่งออกจากจุดศูนย์กลาง (ตามแนว <code>+<strong>a</strong><sub>r</sub></code>) เมื่อเราเลื่อนประจุทดสอบบวกจากจุด <code>B</code> เข้าสู่จุด <code>A</code> ซึ่งอยู่ใกล้ศูนย์กลางมากกว่า (<code>r<sub>A</sub> &lt; r<sub>B</sub></code>) ทิศทางการเคลื่อนที่ <code>d<strong>l</strong></code> จะสวนทางกับแรงของสนามไฟฟ้า จึงต้องมี <strong>แรงภายนอกทำงานต้านสนามไฟฟ้า (External Work Done)</strong> พลังงานนี้จะถูกสะสมเป็นพลังงานศักย์ไฟฟ้า ทำให้ศักย์ที่จุดปลายทางสูงกว่าจุดเริ่มต้น (<code>V<sub>A</sub> &gt; V<sub>B</sub> ⇒ V<sub>AB</sub> = V<sub>A</sub> - V<sub>B</sub> &gt; 0</code>)</p>

                <p><strong>3) อุปมาประกอบ (Physical Analogy):</strong></p>
                <p>เปรียบเสมือน <strong>การเข็นลูกบอลขึ้นภูเขาต้านแรงโน้มถ่วงของโลก</strong> หรือ <strong>การออกแรงดันลูกสูบเพื่ออัดสปริงให้หดตัว</strong> งานที่แรงภายนอกทำเพื่อต้านแรงสนามจะถูกเก็บสะสมเป็นพลังงานศักย์ที่มีค่าเพิ่มขึ้นเป็นบวก</p>
              </div>
            `
          },
          {
            partId: "4.3",
            points: 5,
            question: "จงหาศักย์ไฟฟ้าสัมบูรณ์ (Absolute Potential V(r)) ในปัญหานี้ เทียบกับจุดอ้างอิงที่ระยะอนันต์",
            rubric: [
              { id: "r43_1", label: "ใช้นิยามศักย์ไฟฟ้าสัมบูรณ์เทียบระยะอนันต์ V(r) = -∫_∞^r E • dl", pts: 2 },
              { id: "r43_2", label: "แทนค่าและประเมินลิมิตที่ระยะอนันต์ได้ V(r) = 1 / [2ε₀(r² + a²)] โวลต์", pts: 3 }
            ],
            solutionHtml: `
              <div class="step-card step-essential">
                <span class="step-badge must-write">การหาศักย์ไฟฟ้าสัมบูรณ์เทียบระยะอนันต์</span>
                <p>กำหนดให้จุดอ้างอิงอยู่ที่ระยะอนันต์ (<code>r<sub>ref</sub> = ∞</code> ซึ่งมี <code>V(∞) = 0</code>):</p>
                <div class="math-display">
                  V(r) = - ∫<sub>∞</sub><sup>r</sup> <strong>E</strong> • d<strong>l</strong> = <span class="math-frac"><span class="math-num">1</span><span class="math-den">2ε₀</span></span> [ <span class="math-frac"><span class="math-num">1</span><span class="math-den">r² + a²</span></span> - <span class="math-frac"><span class="math-num">1</span><span class="math-den">∞² + a²</span></span> ]<br><br>
                  เนื่องจาก <code><span class="math-frac"><span class="math-num">1</span><span class="math-den">∞</span></span> = 0</code><br><br>
                  <strong>ตอบ: V(r) = <span class="math-frac"><span class="math-num">1</span><span class="math-den">2ε₀ (r² + a²)</span></span> โวลต์ (V)</strong>
                </div>
              </div>
            `
          }
        ]
      }
    ];
  }

  initDOM() {
    this.timerEl = document.getElementById('exam-timer');
    this.progressBarEl = document.getElementById('exam-progress-bar');
    this.qContentEl = document.getElementById('exam-question-content');
    this.qNavGridEl = document.getElementById('exam-nav-grid');
    
    if (this.qNavGridEl) {
      this.renderNavGrid();
      this.renderQuestion(0);
      this.startTimer();
      this.initTimerControls();
    }
  }

  initTimerControls() {
    const pauseBtn = document.getElementById('btn-pause-timer');
    const restartBtn = document.getElementById('btn-restart-timer');
    
    if (pauseBtn) {
      pauseBtn.addEventListener('click', () => {
        this.isPaused = !this.isPaused;
        pauseBtn.innerText = this.isPaused ? '▶️ ทำต่อ' : '⏸️ พักเวลา';
      });
    }

    if (restartBtn) {
      restartBtn.addEventListener('click', () => {
        if (confirm('คุณต้องการรีเซ็ตเวลา 3 ชั่วโมงใหม่ใช่หรือไม่?')) {
          this.remainingSeconds = this.totalSeconds;
          this.isPaused = false;
          if (pauseBtn) pauseBtn.innerText = '⏸️ พักเวลา';
          this.updateTimerDisplay();
        }
      });
    }
  }

  startTimer() {
    if (this.timerInterval) clearInterval(this.timerInterval);
    this.timerInterval = setInterval(() => {
      if (!this.isPaused && this.remainingSeconds > 0) {
        this.remainingSeconds--;
        this.updateTimerDisplay();
      } else if (this.remainingSeconds <= 0) {
        clearInterval(this.timerInterval);
        alert('⏰ หมดเวลาการทำข้อสอบ 3 ชั่วโมง!');
      }
    }, 1000);
  }

  updateTimerDisplay() {
    if (!this.timerEl) return;
    const hrs = Math.floor(this.remainingSeconds / 3600);
    const mins = Math.floor((this.remainingSeconds % 3600) / 60);
    const secs = this.remainingSeconds % 60;
    this.timerEl.innerText = `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }

  renderNavGrid() {
    if (!this.qNavGridEl) return;
    this.qNavGridEl.innerHTML = '';
    this.questions.forEach((q, idx) => {
      const totalQPoints = q.parts.reduce((sum, p) => sum + p.points, 0);
      const earnedQPoints = this.calculateQuestionEarnedPoints(idx);

      const btn = document.createElement('button');
      btn.className = `q-nav-btn ${idx === this.currentQIndex ? 'active' : ''}`;
      btn.innerHTML = `
        <span>ข้อ ${q.id} (${totalQPoints} คะแนน)</span>
        <span style="font-size: 0.76rem; opacity: 0.85; margin-left: 6px;">[ได้: ${earnedQPoints}/${totalQPoints}]</span>
      `;
      btn.addEventListener('click', () => this.renderQuestion(idx));
      this.qNavGridEl.appendChild(btn);
    });
  }

  calculateQuestionEarnedPoints(qIdx) {
    const q = this.questions[qIdx];
    let earned = 0;
    q.parts.forEach(p => {
      p.rubric.forEach(r => {
        if (this.userScores[r.id]) {
          earned += r.pts;
        }
      });
    });
    return earned;
  }

  calculateTotalEarnedPoints() {
    let total = 0;
    this.questions.forEach((q, idx) => {
      total += this.calculateQuestionEarnedPoints(idx);
    });
    return total;
  }

  renderQuestion(index) {
    this.currentQIndex = index;
    const q = this.questions[index];
    if (!this.qContentEl || !q) return;

    this.renderNavGrid();

    const totalExamEarned = this.calculateTotalEarnedPoints();
    const currentQEarned = this.calculateQuestionEarnedPoints(index);
    const currentQMax = q.parts.reduce((sum, p) => sum + p.points, 0);

    let partsHtml = '';
    q.parts.forEach(p => {
      let rubricHtml = '';
      p.rubric.forEach(r => {
        const isChecked = !!this.userScores[r.id];
        rubricHtml += `
          <div class="rubric-item" style="display: flex; align-items: center; justify-content: space-between; padding: 8px 12px; background: ${isChecked ? 'rgba(46,125,50,0.08)' : 'var(--paper)'}; border-radius: var(--radius-sm); margin-bottom: 6px; border: 1px solid ${isChecked ? 'var(--green)' : 'var(--rule)'};">
            <label style="display: flex; align-items: center; gap: 10px; cursor: pointer; flex: 1;">
              <input type="checkbox" class="rubric-checkbox" data-rubric-id="${r.id}" ${isChecked ? 'checked' : ''} style="width: 18px; height: 18px; cursor: pointer;">
              <span style="font-size: 0.92rem; color: var(--ink); line-height: 1.5;">${r.label}</span>
            </label>
            <span class="rubric-points" style="font-weight: 700; color: ${isChecked ? 'var(--green)' : 'var(--accent)'}; white-space: nowrap; margin-left: 12px;">+${r.pts} คะแนน</span>
          </div>
        `;
      });

      partsHtml += `
        <div class="quiz-card" style="margin-bottom: 24px;">
          <div class="quiz-header">
            <h3 style="font-size: 1.10rem; font-weight: 800; color: var(--accent);">ตอนที่ ${p.partId}</h3>
            <span class="quiz-points" style="font-size: 0.90rem; background: var(--accent2-bg); padding: 4px 10px; border-radius: var(--radius-sm); border: 1px solid var(--accent2);">เต็ม ${p.points} คะแนน</span>
          </div>
          <div style="font-size: 1.02rem; font-weight: 600; line-height: 1.7; margin-bottom: 14px; color: var(--ink);">${p.question}</div>
          
          <div class="rubric-checklist" style="background: var(--paper2); padding: 14px; border-radius: var(--radius-md); border: 1px solid var(--rule);">
            <div style="font-weight: 800; font-size: 0.90rem; color: var(--ink); margin-bottom: 10px; display: flex; justify-content: space-between; align-items: center;">
              <span>📋 เช็คเกณฑ์การตรวจตามกระดาษคำตอบของคุณ (Strict Rubric Checklist):</span>
              <span style="font-size: 0.82rem; color: var(--ink-soft); font-weight: normal;">(ติ๊กถูกเมื่อคุณเขียนส่วนนั้นลงบนกระดาษ)</span>
            </div>
            ${rubricHtml}
          </div>

          <div class="accordion" style="margin-top: 16px;">
            <div class="accordion-header">
              <span>📖 ดูเฉลยและวิธีทำอย่างละเอียดทุกขั้นตอน (Step-by-Step Analytical Solution)</span>
              <span class="accordion-icon">▼</span>
            </div>
            <div class="accordion-body">
              ${p.solutionHtml}
            </div>
          </div>
        </div>
      `;
    });

    this.qContentEl.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; flex-wrap: wrap; gap: 10px; background: var(--card-bg); padding: 16px 20px; border-radius: var(--radius-md); border: 1.5px solid var(--rule);">
        <div>
          <h2 class="section-title" style="margin: 0; padding: 0; border: none; font-size: 1.30rem;">${q.title}</h2>
          <div style="font-size: 0.88rem; color: var(--ink-soft); margin-top: 4px;">คะแนนในข้อนี้: <strong style="color: var(--accent);">${currentQEarned} / ${currentQMax}</strong></div>
        </div>
        <div style="text-align: right;">
          <div style="font-size: 0.84rem; color: var(--ink-soft);">คะแนนรวมทั้งชุด 4 ข้อ:</div>
          <div style="font-size: 1.35rem; font-weight: 900; color: var(--accent);"><span id="total-score-display">${totalExamEarned}</span> / 100</div>
        </div>
      </div>
      ${partsHtml}
    `;

    // Add Rubric checkbox listeners
    const checkboxes = this.qContentEl.querySelectorAll('.rubric-checkbox');
    checkboxes.forEach(cb => {
      cb.addEventListener('change', (e) => {
        const rId = e.target.getAttribute('data-rubric-id');
        this.userScores[rId] = e.target.checked;
        this.renderQuestion(this.currentQIndex);
      });
    });

    // Re-init accordions
    if (window.initAccordions) window.initAccordions();
  }
}

window.ExamEngine = ExamEngine;
