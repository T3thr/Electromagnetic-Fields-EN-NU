/**
 * 303214 สนามแม่เหล็กไฟฟ้า 1 (Electromagnetic Fields I) · มหาวิทยาลัยนเรศวร
 * Midterm Exam Simulation & Strict Rubric Assessment Engine
 * ออกแบบตามมาตรฐาน DESIGN_SYSTEM.md และ MATH_STANDARDS.md
 */

class ExamEngine {
  constructor(options = {}) {
    this.totalSeconds = options.durationMinutes ? options.durationMinutes * 60 : 3 * 3600; // 3 hours
    this.remainingSeconds = this.totalSeconds;
    this.timerInterval = null;
    this.isPaused = false;
    this.currentQIndex = 0;
    
    this.questions = this.getExamQuestions();
    this.userAnswers = {};
    
    this.initDOM();
  }

  getExamQuestions() {
    return [
      {
        id: 1,
        title: "ข้อที่ 1: เวกเตอร์หน่วยและระบบพิกัดทรงกลม (25 คะแนน)",
        parts: [
          {
            partId: "1.1",
            points: 10,
            question: "จงอธิบายว่าเวกเตอร์หน่วยในระบบพิกัดทรงกลม (<strong>a</strong><sub>r</sub>, <strong>a</strong><sub>θ</sub>, <strong>a</strong><sub>ϕ</sub>) มีข้อจำกัดอย่างไรเมื่อเทียบกับระบบพิกัดฉาก พร้อมอธิบายเหตุผลและวิธีปฏิบัติที่ถูกต้องในการรวมเวกเตอร์",
            rubric: [
              { label: "ระบุข้อจำกัดว่า <strong>a</strong><sub>r</sub>, <strong>a</strong><sub>θ</sub>, <strong>a</strong><sub>ϕ</sub> มีทิศทางเปลี่ยนไปตามตำแหน่งมุม (θ, ϕ) ของแต่ละจุด ไม่คงที่ในอวกาศ", pts: 4 },
              { label: "อธิบายว่าไม่สามารถนำเวกเตอร์ในพิกัดทรงกลมที่อยู่คนละจุดมาบวก/ลบองค์ประกอบกันตรงๆ ได้", pts: 4 },
              { label: "ระบุวิธีปฏิบัติที่ถูกต้องว่าต้องแปลงเป็นพิกัดฉาก (Cartesian: <strong>a</strong><sub>x</sub>, <strong>a</strong><sub>y</sub>, <strong>a</strong><sub>z</sub>) ก่อนคำนวณ", pts: 2 }
            ],
            solutionHtml: `
              <div class="step-card step-essential">
                <span class="step-badge must-write">หลักการสำคัญ (Fundamental Concept)</span>
                <p><strong>ข้อจำกัดของเวกเตอร์หนึ่งหน่วยในระบบพิกัดทรงกลม:</strong></p>
                <ol style="margin-left: 20px; line-height: 1.8;">
                  <li>เวกเตอร์หนึ่งหน่วยฐาน <code><strong>a</strong><sub>r</sub>, <strong>a</strong><sub>θ</sub>, <strong>a</strong><sub>ϕ</sub></code> <strong>ไม่ได้มีทิศทางคงที่ในอวกาศ</strong> แต่มีทิศทางขึ้นอยู่กับตำแหน่งเชิงมุม <code>(θ, ϕ)</code> ของจุดนั้นๆ เสมอ</li>
                  <li><strong>ผลกระทบในการคำนวณ:</strong> หากมีเวกเตอร์ <code><strong>A</strong></code> ที่จุด <code>P₁</code> และเวกเตอร์ <code><strong>B</strong></code> ที่จุด <code>P₂</code> ซึ่งมีพิกัดเชิงมุมต่างกัน จะ<strong>ไม่สามารถนำองค์ประกอบมาบวกหรือลบกันโดยตรงได้</strong> (เช่น <code>A<sub>r</sub> + B<sub>r</sub></code> ไม่ใช่ขนาดรวมในแนวรัศมีเดียวกัน เพราะแนวรัศมีชี้คนละทิศ)</li>
                  <li><strong>วิธีปฏิบัติที่ถูกต้องตามมาตรฐานวิศวกรรม:</strong> ต้องแปลงเวกเตอร์ทั้งสองให้อยู่ใน <strong>ระบบพิกัดฉาก (Cartesian: <strong>a</strong><sub>x</sub>, <strong>a</strong><sub>y</sub>, <strong>a</strong><sub>z</sub>)</strong> เสียก่อน เนื่องจาก <code><strong>a</strong><sub>x</sub>, <strong>a</strong><sub>y</sub>, <strong>a</strong><sub>z</sub></code> มีทิศทางคงที่ทั่วทั้งอวกาศ จึงสามารถบวก/ลบกันได้ แล้วจึงแปลงกลับหากต้องการ</li>
                </ol>
              </div>
            `
          },
          {
            partId: "1.2",
            points: 15,
            question: "กำหนดให้เวกเตอร์ <strong>A</strong> ที่จุด P(r = 2.4, θ = 50°, ϕ = 70°) ในระบบพิกัดทรงกลม มีค่าเป็น <strong>A</strong> = (2 sin θ / sin ϕ) <strong>a</strong><sub>r</sub> + (sin θ / sin ϕ) <strong>a</strong><sub>θ</sub> จงแปลงเวกเตอร์นี้ให้อยู่ในรูประบบพิกัดทรงกระบอก ณ จุด P",
            rubric: [
              { label: "เขียนสูตรความสัมพันธ์หรือเมทริกซ์การแปลงจากพิกัดทรงกลมสู่ทรงกระบอก", pts: 5 },
              { label: "คำนวณค่าตัวเลขขององค์ประกอบ A<sub>r</sub>, A<sub>θ</sub>, A<sub>ϕ</sub> ณ จุด P อย่างถูกต้อง", pts: 4 },
              { label: "คำนวณหา A<sub>ρ</sub>, A<sub>ϕ</sub>, A<sub>z</sub> ในพิกัดทรงกระบอกครบถ้วนถูกต้องพร้อมหน่วย", pts: 6 }
            ],
            solutionHtml: `
              <div class="step-card step-essential">
                <span class="step-badge must-write">สูตรตั้งต้นทั่วไป (General Transformation Formula)</span>
                <p>ความสัมพันธ์การแปลงเวกเตอร์จากพิกัดทรงกลมสู่พิกัดทรงกระบอก ณ จุด <code>P(r, θ, ϕ)</code>:</p>
                <div class="math-display">
                  A<sub>ρ</sub> = A<sub>r</sub> sin θ + A<sub>θ</sub> cos θ<br>
                  A<sub>ϕ</sub> = A<sub>ϕ</sub> &nbsp;&nbsp; (มุม ϕ เดียวกัน)<br>
                  A<sub>z</sub> = A<sub>r</sub> cos θ - A<sub>θ</sub> sin θ
                </div>
              </div>
              <div class="step-card">
                <span class="step-badge">แทนค่าตัวเลข ณ จุด P(r = 2.4, θ = 50°, ϕ = 70°)</span>
                <p>ค่าตรีโกณมิติ: sin 50° ≈ 0.7660, cos 50° ≈ 0.6428, sin 70° ≈ 0.9397</p>
                <div class="math-display">
                  A<sub>r</sub> = <span class="math-frac"><span class="math-num">2 sin 50°</span><span class="math-den">sin 70°</span></span> = <span class="math-frac"><span class="math-num">2(0.7660)</span><span class="math-den">0.9397</span></span> ≈ <strong>1.6304</strong><br>
                  A<sub>θ</sub> = <span class="math-frac"><span class="math-num">sin 50°</span><span class="math-den">sin 70°</span></span> = <span class="math-frac"><span class="math-num">0.7660</span><span class="math-den">0.9397</span></span> ≈ <strong>0.8152</strong><br>
                  A<sub>ϕ</sub> = <strong>0</strong>
                </div>
                <p><strong>คำนวณองค์ประกอบในระบบพิกัดทรงกระบอก:</strong></p>
                <div class="math-display">
                  A<sub>ρ</sub> = (1.6304)(0.7660) + (0.8152)(0.6428) = 1.2489 + 0.5240 = <strong>1.7729</strong><br>
                  A<sub>ϕ</sub> = <strong>0</strong><br>
                  A<sub>z</sub> = (1.6304)(0.6428) - (0.8152)(0.7660) = 1.0480 - 0.6244 = <strong>0.4236</strong><br><br>
                  <strong>คำตอบสุดท้าย:</strong> <strong>A</strong> = 1.773 <strong>a</strong><sub>ρ</sub> + 0.424 <strong>a</strong><sub>z</sub>
                </div>
              </div>
            `
          }
        ]
      },
      {
        id: 2,
        title: "ข้อที่ 2: กฎของคูลอมบ์และสมดุลแรงลัพธ์ (20 คะแนน)",
        parts: [
          {
            partId: "2.1",
            points: 10,
            question: "กำหนดประจุ Q₂ = 2 C อยู่ที่จุดกำเนิด P₂(0, 0, 0), ประจุ Q₁ = 3√3 C อยู่ที่ P₁(5, 0, 0), และประจุ Q₃ = 3 C อยู่ที่ P₃(-2.5, 5√3/2, 0) จงหาแรงคูลอมบ์ลัพธ์บนประจุ Q₂",
            rubric: [
              { label: "เขียนสูตรทั่วไปของกฎของคูลอมบ์ <strong>F</strong><sub>12</sub> = (1/4πε₀)(Q₁Q₂/|<strong>R</strong><sub>12</sub>|²) <strong>a</strong><sub>R12</sub>", pts: 3 },
              { label: "หาเวกเตอร์ระยะทาง <strong>R</strong><sub>12</sub> = <strong>r</strong>₂ - <strong>r</strong>₁ และ <strong>R</strong><sub>32</sub> = <strong>r</strong>₂ - <strong>r</strong>₃ ถูกต้อง", pts: 3 },
              { label: "รวมแรงเวกเตอร์ <strong>F</strong>₂ = <strong>F</strong><sub>12</sub> + <strong>F</strong><sub>32</sub> ได้คำตอบถูกต้องพร้อมหน่วย นิวตัน (N)", pts: 4 }
            ],
            solutionHtml: `
              <div class="step-card step-essential">
                <span class="step-badge must-write">สูตรตั้งต้นทั่วไป (General Formula)</span>
                <div class="math-display">
                  <strong>F</strong> = <span class="math-frac"><span class="math-num">1</span><span class="math-den">4πε₀</span></span> <span class="math-frac"><span class="math-num">Q<sub>a</sub> Q<sub>b</sub></span><span class="math-den">|<strong>R</strong>|²</span></span> <strong>a</strong><sub>R</sub> = <span class="math-frac"><span class="math-num"><em>k</em> Q<sub>a</sub> Q<sub>b</sub></span><span class="math-den">|<strong>R</strong>|³</span></span> <strong>R</strong>
                </div>
              </div>
              <div class="step-card">
                <span class="step-badge">คำนวณแรง <strong>F</strong><sub>12</sub> และ <strong>F</strong><sub>32</sub></span>
                <p><strong>1) จาก Q₁ กระทำต่อ Q₂:</strong></p>
                <div class="math-display">
                  <strong>R</strong><sub>12</sub> = (0 - 5) <strong>a</strong><sub>x</sub> = -5 <strong>a</strong><sub>x</sub> &nbsp; (|<strong>R</strong><sub>12</sub>| = 5 m)<br>
                  <strong>F</strong><sub>12</sub> = <span class="math-frac"><span class="math-num"><em>k</em> (3√3)(2)</span><span class="math-den">5²</span></span> (-<strong>a</strong><sub>x</sub>) = - <em>k</em> <span class="math-frac"><span class="math-num">6√3</span><span class="math-den">25</span></span> <strong>a</strong><sub>x</sub> ≈ <strong>-0.4157 <em>k</em> <strong>a</strong><sub>x</sub></strong> N
                </div>
                <p><strong>2) จาก Q₃ กระทำต่อ Q₂:</strong></p>
                <div class="math-display">
                  <strong>R</strong><sub>32</sub> = (0 - (-2.5)) <strong>a</strong><sub>x</sub> + (0 - 2.5√3) <strong>a</strong><sub>y</sub> = 2.5 <strong>a</strong><sub>x</sub> - 2.5√3 <strong>a</strong><sub>y</sub> &nbsp; (|<strong>R</strong><sub>32</sub>| = 5 m)<br>
                  <strong>F</strong><sub>32</sub> = <span class="math-frac"><span class="math-num"><em>k</em> (3)(2)</span><span class="math-den">5³</span></span> (2.5 <strong>a</strong><sub>x</sub> - 2.5√3 <strong>a</strong><sub>y</sub>) = <span class="math-frac"><span class="math-num">6<em>k</em></span><span class="math-den">125</span></span> (2.5 <strong>a</strong><sub>x</sub> - 4.33 <strong>a</strong><sub>y</sub>) = <strong><em>k</em> (0.1200 <strong>a</strong><sub>x</sub> - 0.2078 <strong>a</strong><sub>y</sub>)</strong> N
                </div>
                <p><strong>3) รวมแรงลัพธ์บนประจุ Q₂:</strong></p>
                <div class="math-display">
                  <strong>F</strong>₂ = <strong>F</strong><sub>12</sub> + <strong>F</strong><sub>32</sub> = <em>k</em> [ (-0.4157 + 0.1200) <strong>a</strong><sub>x</sub> - 0.2078 <strong>a</strong><sub>y</sub> ]<br>
                  <strong>F</strong>₂ = <strong><em>k</em> (-0.2957 <strong>a</strong><sub>x</sub> - 0.2078 <strong>a</strong><sub>y</sub>) N</strong> &nbsp;&nbsp; (หรือ -2.66 × 10⁹ <strong>a</strong><sub>x</sub> - 1.87 × 10⁹ <strong>a</strong><sub>y</sub> N)
                </div>
              </div>
            `
          },
          {
            partId: "2.2",
            points: 10,
            question: "ถ้านำประจุ Q₄ เข้าไปวางในระบบเพื่อให้แรงลัพธ์รวมบนประจุ Q₂ เป็นศูนย์ จงหาขนาดและชนิดของประจุ Q₄ รวมถึงตำแหน่งพิกัด P₄ พร้อมแสดงวิธีทำอย่างละเอียด",
            rubric: [
              { label: "ตั้งสมการสมดุลแรง <strong>F</strong><sub>2,net</sub> = <strong>F</strong><sub>12</sub> + <strong>F</strong><sub>32</sub> + <strong>F</strong><sub>42</sub> = 0", pts: 3 },
              { label: "คำนวณหาทิศทางและขนาดของแรง <strong>F</strong><sub>42</sub> ที่ต้องต้านแรงเดิม", pts: 4 },
              { label: "ระบุพิกัด P₄ และขนาดประจุ Q₄ ที่สอดคล้องถูกต้อง", pts: 3 }
            ],
            solutionHtml: `
              <div class="step-card step-essential">
                <span class="step-badge must-write">เงื่อนไขสมดุลแรง (Static Equilibrium Condition)</span>
                <div class="math-display">
                  <strong>F</strong><sub>42</sub> = - (<strong>F</strong><sub>12</sub> + <strong>F</strong><sub>32</sub>) = <em>k</em> (0.2957 <strong>a</strong><sub>x</sub> + 0.2078 <strong>a</strong><sub>y</sub>)<br>
                  |<strong>F</strong><sub>42</sub>| = <em>k</em> √[(0.2957)² + (0.2078)²] = <strong>0.3614 <em>k</em> N</strong><br>
                  ทิศทางทำมุม θ = arctan<span class="math-frac"><span class="math-num">0.2078</span><span class="math-den">0.2957</span></span> ≈ <strong>35.1°</strong> เทียบแกน +x
                </div>
              </div>
              <div class="step-card">
                <span class="step-badge">การกำหนดค่าประจุและตำแหน่ง</span>
                <p>หากเลือกประจุบวก <code>Q₄ = 2 C</code> วางที่ระยะ <code>R₄₂ = 5 m</code> ในแนวทิศตรงข้ามกับแรงผลัก (เวกเตอร์ตำแหน่ง P₄):</p>
                <div class="math-display">
                  P₄ = (-5 cos 35.1°, -5 sin 35.1°, 0) = <strong>(-4.09, -2.87, 0) m</strong>
                </div>
              </div>
            `
          }
        ]
      },
      {
        id: 3,
        title: "ข้อที่ 3: สนามไฟฟ้าจากลวดประจุจำกัดบนแกน z (30 คะแนน)",
        parts: [
          {
            partId: "3.1",
            points: 30,
            question: "ลวดเส้นหนึ่งทอดตัวยาวในแนวแกน z ตั้งแต่ z = 0 ถึง z = 4 มีความหนาแน่นประจุเชิงเส้น ρ<sub>l</sub> C/m จงหาสนามไฟฟ้า <strong>E</strong> ณ จุด P(0, 3, 0) ในพิกัดฉาก โดยแสดงการอินทิเกรตเชิงวิเคราะห์ละเอียดทุกขั้นตอน และตอบติดตัวแปร π และ ε₀",
            rubric: [
              { label: "เขียนสูตรตั้งต้นทั่วไป <strong>E</strong> = ∫ (dQ / 4πε₀ |<strong>R</strong>|²) <strong>a</strong><sub>R</sub>", pts: 5 },
              { label: "กำหนด dQ = ρ<sub>l</sub> dz' และหาเวกเตอร์ <strong>R</strong> = 3 <strong>a</strong><sub>y</sub> - z' <strong>a</strong><sub>z</sub> ถูกต้อง", pts: 6 },
              { label: "แทนค่าและแยกองค์ประกอบ E<sub>y</sub> และ E<sub>z</sub> ในรูปอินทิกรัล", pts: 6 },
              { label: "แสดงการอินทิเกรตเชิงวิเคราะห์ด้วยตรีโกณมิติ z' = 3 tan ψ ทีละขั้นตอนอย่างสมบูรณ์", pts: 9 },
              { label: "ได้คำตอบสุดท้ายในรูปพิกัดฉากและติดค่า π, ε₀ ถูกต้อง", pts: 4 }
            ],
            solutionHtml: `
              <div class="step-card step-essential">
                <span class="step-badge must-write">สูตรตั้งต้นและเวกเตอร์ส่วนย่อย (Setup & Differential Element)</span>
                <div class="math-display">
                  <strong>E</strong> = ∫ <span class="math-frac"><span class="math-num">ρ<sub>l</sub> dz'</span><span class="math-den">4πε₀ |<strong>R</strong>|³</span></span> <strong>R</strong><br><br>
                  จุดสังเกต: <strong>r</strong> = (0, 3, 0) = 3 <strong>a</strong><sub>y</sub><br>
                  จุดประจุย่อยบนลวด: <strong>r'</strong> = (0, 0, z') = z' <strong>a</strong><sub>z</sub> &nbsp; (0 ≤ z' ≤ 4)<br>
                  <strong>R</strong> = <strong>r</strong> - <strong>r'</strong> = 3 <strong>a</strong><sub>y</sub> - z' <strong>a</strong><sub>z</sub><br>
                  |<strong>R</strong>| = √[3² + (z')²] = √[9 + (z')²]
                </div>
              </div>
              <div class="step-card step-essential">
                <span class="step-badge must-write">การอินทิเกรตเชิงวิเคราะห์ (Analytical Hand-Integration)</span>
                <p><strong>1) อินทิเกรตองค์ประกอบแนวแกน y (E<sub>y</sub>):</strong></p>
                <div class="math-display">
                  E<sub>y</sub> = <span class="math-frac"><span class="math-num">ρ<sub>l</sub></span><span class="math-den">4πε₀</span></span> ∫₀⁴ <span class="math-frac"><span class="math-num">3 dz'</span><span class="math-den">[9 + (z')²]<sup>3/2</sup></span></span><br>
                  ให้ z' = 3 tan ψ ⇒ dz' = 3 sec² ψ dψ, &nbsp; √[9 + (z')²] = 3 sec ψ<br>
                  = <span class="math-frac"><span class="math-num">ρ<sub>l</sub></span><span class="math-den">4πε₀</span></span> ∫ <span class="math-frac"><span class="math-num">3(3 sec² ψ) dψ</span><span class="math-den">27 sec³ ψ</span></span> = <span class="math-frac"><span class="math-num">ρ<sub>l</sub></span><span class="math-den">12πε₀</span></span> ∫ cos ψ dψ<br>
                  = <span class="math-frac"><span class="math-num">ρ<sub>l</sub></span><span class="math-den">12πε₀</span></span> [ sin ψ ] = <span class="math-frac"><span class="math-num">ρ<sub>l</sub></span><span class="math-den">12πε₀</span></span> [ <span class="math-frac"><span class="math-num">z'</span><span class="math-den">√[9 + (z')²]</span></span> ]₀⁴<br>
                  = <span class="math-frac"><span class="math-num">ρ<sub>l</sub></span><span class="math-den">12πε₀</span></span> [ <span class="math-frac"><span class="math-num">4</span><span class="math-den">√[9 + 16]</span></span> - 0 ] = <span class="math-frac"><span class="math-num">ρ<sub>l</sub></span><span class="math-den">12πε₀</span></span> (<span class="math-frac"><span class="math-num">4</span><span class="math-den">5</span></span>) = <strong><span class="math-frac"><span class="math-num">ρ<sub>l</sub></span><span class="math-den">15πε₀</span></span> <strong>a</strong><sub>y</sub></strong>
                </div>

                <p><strong>2) อินทิเกรตองค์ประกอบแนวแกน z (E<sub>z</sub>):</strong></p>
                <div class="math-display">
                  E<sub>z</sub> = <span class="math-frac"><span class="math-num">ρ<sub>l</sub></span><span class="math-den">4πε₀</span></span> ∫₀⁴ <span class="math-frac"><span class="math-num">- z' dz'</span><span class="math-den">[9 + (z')²]<sup>3/2</sup></span></span><br>
                  ให้ u = 9 + (z')² ⇒ du = 2 z' dz' &nbsp; (เมื่อ z'=0 ⇒ u=9, z'=4 ⇒ u=25)<br>
                  = - <span class="math-frac"><span class="math-num">ρ<sub>l</sub></span><span class="math-den">8πε₀</span></span> ∫₉²⁵ u<sup>-3/2</sup> du = - <span class="math-frac"><span class="math-num">ρ<sub>l</sub></span><span class="math-den">8πε₀</span></span> [ -2 u<sup>-1/2</sup> ]₉²⁵<br>
                  = <span class="math-frac"><span class="math-num">ρ<sub>l</sub></span><span class="math-den">4πε₀</span></span> [ <span class="math-frac"><span class="math-num">1</span><span class="math-den">√25</span></span> - <span class="math-frac"><span class="math-num">1</span><span class="math-den">√9</span></span> ] = <span class="math-frac"><span class="math-num">ρ<sub>l</sub></span><span class="math-den">4πε₀</span></span> [ <span class="math-frac"><span class="math-num">1</span><span class="math-den">5</span></span> - <span class="math-frac"><span class="math-num">1</span><span class="math-den">3</span></span> ] = <span class="math-frac"><span class="math-num">ρ<sub>l</sub></span><span class="math-den">4πε₀</span></span> (- <span class="math-frac"><span class="math-num">2</span><span class="math-den">15</span></span>) = <strong>- <span class="math-frac"><span class="math-num">ρ<sub>l</sub></span><span class="math-den">30πε₀</span></span> <strong>a</strong><sub>z</sub></strong>
                </div>

                <div class="math-display">
                  <strong>คำตอบสุดท้าย:</strong><br>
                  <strong>E</strong> = <span class="math-frac"><span class="math-num">ρ<sub>l</sub></span><span class="math-den">30πε₀</span></span> [ 2 <strong>a</strong><sub>y</sub> - <strong>a</strong><sub>z</sub> ] V/m
                </div>
              </div>
            `
          }
        ]
      },
      {
        id: 4,
        title: "ข้อที่ 4: ความต่างศักย์และอุปมาพลังงาน (25 คะแนน)",
        parts: [
          {
            partId: "4.1",
            points: 12,
            question: "กำหนดความหนาแน่นฟลักซ์ไฟฟ้า <strong>D</strong> = [ r / (r² + a²)² ] <strong>a</strong><sub>r</sub> จงหาความต่างศักย์ V<sub>AB</sub> ระหว่าง r = r<sub>A</sub> และ r = r<sub>B</sub> ในอวกาศว่าง",
            rubric: [
              { label: "เขียนความสัมพันธ์ <strong>E</strong> = <strong>D</strong> / ε₀ และสูตร V<sub>AB</sub> = - ∫<sub>r<sub>B</sub></sub><sup>r<sub>A</sub></sup> <strong>E</strong> • d<strong>l</strong>", pts: 4 },
              { label: "แสดงการอินทิเกรตเชิงวิเคราะห์ด้วยการเปลี่ยนตัวแปร u = r² + a²", pts: 5 },
              { label: "ได้ผลลัพธ์ V<sub>AB</sub> ถูกต้องสมบูรณ์", pts: 3 }
            ],
            solutionHtml: `
              <div class="step-card step-essential">
                <span class="step-badge must-write">สูตรตั้งต้นทั่วไป (General Formulation)</span>
                <div class="math-display">
                  <strong>E</strong> = <span class="math-frac"><span class="math-num"><strong>D</strong></span><span class="math-den">ε₀</span></span> = <span class="math-frac"><span class="math-num">r</span><span class="math-den">ε₀ (r² + a²)²</span></span> <strong>a</strong><sub>r</sub><br>
                  V<sub>AB</sub> = - ∫<sub>r<sub>B</sub></sub><sup>r<sub>A</sub></sup> <strong>E</strong> • d<strong>l</strong> = - ∫<sub>r<sub>B</sub></sub><sup>r<sub>A</sub></sup> <span class="math-frac"><span class="math-num">r dr</span><span class="math-den">ε₀ (r² + a²)²</span></span>
                </div>
              </div>
              <div class="step-card">
                <span class="step-badge">อินทิเกรตเชิงวิเคราะห์ (Analytical Integration)</span>
                <p>ให้ u = r² + a² ⇒ du = 2r dr</p>
                <div class="math-display">
                  V<sub>AB</sub> = - <span class="math-frac"><span class="math-num">1</span><span class="math-den">2ε₀</span></span> ∫ u<sup>-2</sup> du = - <span class="math-frac"><span class="math-num">1</span><span class="math-den">2ε₀</span></span> [ - u<sup>-1</sup> ]<br>
                  = <span class="math-frac"><span class="math-num">1</span><span class="math-den">2ε₀</span></span> [ <span class="math-frac"><span class="math-num">1</span><span class="math-den">r² + a²</span></span> ]<sub>r<sub>B</sub></sub><sup>r<sub>A</sub></sup><br>
                  = <strong><span class="math-frac"><span class="math-num">1</span><span class="math-den">2ε₀</span></span> [ <span class="math-frac"><span class="math-num">1</span><span class="math-den">r<sub>A</sub>² + a²</span></span> - <span class="math-frac"><span class="math-num">1</span><span class="math-den">r<sub>B</sub>² + a²</span></span> ] V</strong>
                </div>
              </div>
            `
          },
          {
            partId: "4.2",
            points: 8,
            question: "ถ้า r<sub>A</sub> &lt; r<sub>B</sub> (จุด A อยู่ใกล้จุดกำเนิดมากกว่าจุด B) ค่าความต่างศักย์ V<sub>AB</sub> มีค่าเป็น บวก หรือ ลบ เพราะเหตุใด พร้อมยกอุปมาประกอบให้เห็นภาพชัดเจน",
            rubric: [
              { label: "ระบุชัดเจนว่า V<sub>AB</sub> มีค่าเป็น 'บวก' (Positive)", pts: 2 },
              { label: "อธิบายเหตุผลทางฟิสิกส์ว่าการเลื่อนประจุทดสอบบวกจาก B เข้าหา A ต้องทำงานต้านสนามไฟฟ้าที่พุ่งออก", pts: 3 },
              { label: "ยกอุปมาที่ถูกต้อง เช่น การดันลูกบอลขึ้นเนินต้านแรงโน้มถ่วง หรือการอัดสปริง", pts: 3 }
            ],
            solutionHtml: `
              <div class="step-card step-essential">
                <span class="step-badge must-write">คำตอบและเหตุผลทางฟิสิกส์ (Physical Interpretation)</span>
                <p><strong>1) ค่าของ V<sub>AB</sub>:</strong> มีค่าเป็น <strong>บวก (+)</strong></p>
                <p><strong>2) เหตุผลทางฟิสิกส์:</strong> เนื่องจากสนามไฟฟ้า <code><strong>E</strong></code> มีทิศพุ่งออกจากจุดศูนย์กลาง (ตามแนว <code>+<strong>a</strong><sub>r</sub></code>) เมื่อเราเลื่อนประจุทดสอบบวกจากจุด <code>B</code> เข้าสู่จุด <code>A</code> ซึ่งอยู่ใกล้กว่า (<code>r<sub>A</sub> &lt; r<sub>B</sub></code>) ทิศทางการเคลื่อนที่ <code>d<strong>l</strong></code> จะสวนทางกับแรงของสนามไฟฟ้า จึงต้องมี<strong>แรงภายนอกทำงานต้านสนามไฟฟ้า</strong> ทำให้ประจุมีพลังงานศักย์สูงขึ้น (<code>V<sub>A</sub> &gt; V<sub>B</sub> ⇒ V<sub>AB</sub> = V<sub>A</sub> - V<sub>B</sub> &gt; 0</code>)</p>
                <p><strong>3) อุปมาประกอบ (Physical Analogy):</strong> เปรียบเสมือน<strong>การเข็นลูกบอลขึ้นภูเขาต้านแรงโน้มถ่วง</strong> หรือ<strong>การออกแรงดันสปริงให้หดตัว</strong> พลังงานจากแรงภายนอกจะถูกสะสมเป็นพลังงานศักย์ที่เป็นบวก</p>
              </div>
            `
          },
          {
            partId: "4.3",
            points: 5,
            question: "จงหาศักย์ไฟฟ้าสัมบูรณ์ (Absolute Potential V(r)) ในปัญหานี้เทียบกับจุดอ้างอิงที่ระยะอนันต์",
            rubric: [
              { label: "ใช้นิยามศักย์ไฟฟ้าสัมบูรณ์ V(r) = - ∫<sub>∞</sub><sup>r</sup> <strong>E</strong> • d<strong>l</strong>", pts: 2 },
              { label: "แทนค่าขอบเขตจากอนันต์สู่อนุภาคได้ V(r) = 1 / [2ε₀ (r² + a²)]", pts: 3 }
            ],
            solutionHtml: `
              <div class="step-card">
                <span class="step-badge">ศักย์ไฟฟ้าสัมบูรณ์เทียบระยะอนันต์</span>
                <div class="math-display">
                  V(r) = - ∫<sub>∞</sub><sup>r</sup> <strong>E</strong> • d<strong>l</strong> = <span class="math-frac"><span class="math-num">1</span><span class="math-den">2ε₀</span></span> [ <span class="math-frac"><span class="math-num">1</span><span class="math-den">r² + a²</span></span> - <span class="math-frac"><span class="math-num">1</span><span class="math-den">∞² + a²</span></span> ]<br>
                  <strong>V(r) = <span class="math-frac"><span class="math-num">1</span><span class="math-den">2ε₀ (r² + a²)</span></span> V</strong>
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
      const btn = document.createElement('button');
      btn.className = `q-nav-btn ${idx === this.currentQIndex ? 'active' : ''}`;
      btn.innerText = `ข้อ ${q.id} (เต็ม ${q.parts.reduce((sum, p) => sum + p.points, 0)} คะแนน)`;
      btn.addEventListener('click', () => this.renderQuestion(idx));
      this.qNavGridEl.appendChild(btn);
    });
  }

  renderQuestion(index) {
    this.currentQIndex = index;
    const q = this.questions[index];
    if (!this.qContentEl || !q) return;

    this.renderNavGrid();

    let partsHtml = '';
    q.parts.forEach(p => {
      let rubricHtml = '';
      p.rubric.forEach(r => {
        rubricHtml += `
          <div class="rubric-item">
            <div>
              <span class="rubric-status pass">เกณฑ์</span>
              <span>${r.label}</span>
            </div>
            <span class="rubric-points">${r.pts} คะแนน</span>
          </div>
        `;
      });

      partsHtml += `
        <div class="quiz-card" style="margin-bottom: 24px;">
          <div class="quiz-header">
            <h3 style="font-size: 1.10rem; font-weight: 800; color: var(--accent);">ตอนที่ ${p.partId}</h3>
            <span class="quiz-points" style="font-size: 0.90rem; background: var(--accent2-bg); padding: 4px 10px; border-radius: var(--radius-sm); border: 1px solid var(--accent2);">เต็ม ${p.points} คะแนน</span>
          </div>
          <p style="font-size: 1.02rem; font-weight: 600; line-height: 1.7; margin-bottom: 14px;">${p.question}</p>
          
          <div class="rubric-checklist">
            <div style="font-weight: 800; font-size: 0.88rem; color: var(--ink); margin-bottom: 8px;">
              📋 เกณฑ์การตรวจและให้คะแนนอย่างเข้มงวด (Scoring Rubric):
            </div>
            ${rubricHtml}
          </div>

          <div class="accordion" style="margin-top: 16px;">
            <div class="accordion-header">
              <span>📖 ดูเฉลยและวิธีทำอย่างละเอียด (Step-by-Step Analytical Solution)</span>
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
      <div style="margin-bottom: 20px;">
        <h2 class="section-title">${q.title}</h2>
        ${partsHtml}
      </div>
    `;

    // Re-init accordions
    if (window.initAccordions) window.initAccordions();
  }
}

window.ExamEngine = ExamEngine;
