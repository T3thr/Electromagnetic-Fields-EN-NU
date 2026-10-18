/**
 * 303214 สนามแม่เหล็กไฟฟ้า 1 (Electromagnetic Fields I) · มหาวิทยาลัยนเรศวร
 * Midterm Exam Simulation & Strict Rubric Assessment Engine
 * ออกแบบตามมาตรฐาน DESIGN_SYSTEM.md และ MATH_STANDARDS.md (Zero-Dollar-Sign Policy)
 * อิงสูตรทางการจากสูตรมิดเทอม.pdf (Midterm Formula Sheet) 100%
 */

class ExamEngine {
  constructor(options = {}) {
    this.totalSeconds = options.durationMinutes ? options.durationMinutes * 60 : 3 * 3600; // 3 hours
    this.remainingSeconds = this.totalSeconds;
    this.timerInterval = null;
    this.isPaused = true; // Start paused — user must click to begin
    this.timerStarted = false; // Timer has never been started yet
    this.currentQIndex = 0;
    this.openAccordions = new Set(); // Track which accordions are open
    this.isSidebarCollapsed = false;

    this.questions = this.getExamQuestions();
    this.userScores = {}; // Key: rubric id -> boolean

    this.initDOM();
    this.initSidebarToggle();
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
            solutionHtml: ("\n              <div class=\"card step-card step-essential\">\n                <span class=\"step-badge must-write\">หลักการสำคัญและข้อจำกัด (Core Limitations)</span>\n                <div class=\"formula-ref-badge\">อ้างอิงใบสูตร หมวด 3: ระบบพิกัดทรงกลม — เวกเตอร์ฐาน <strong>a</strong><sub>r</sub>, <strong>a</strong><sub>θ</sub>, <strong>a</strong><sub>ϕ</sub> เป็นฟังก์ชันของ (θ, ϕ)</div>\n                <p><strong>1. สาระสำคัญของข้อจำกัด (Limitation Principle):</strong></p>\n                <ul style=\"margin-left: 20px; line-height: 1.85;\">\n                  <li>เวกเตอร์หนึ่งหน่วยฐานในระบบพิกัดทรงกลมทั้งสามตัว ได้แก่ <code><strong>a</strong><sub>r</sub></code>, <code><strong>a</strong><sub>θ</sub></code>, และ <code><strong>a</strong><sub>ϕ</sub></code> <strong>ไม่ใช่เวกเตอร์คงที่ในอวกาศ (Non-constant Base Vectors)</strong> โดยทิศทางของเวกเตอร์จะเปลี่ยนแปลงไปตามตำแหน่งเชิงมุม <code>(θ, ϕ)</code> ของแต่ละจุดสังเกต <code>P(r, θ, ϕ)</code></li>\n                  <li>แตกต่างจากระบบพิกัดฉาก (Cartesian Coordinates) ที่เวกเตอร์ฐาน <code><strong>a</strong><sub>x</sub>, <strong>a</strong><sub>y</sub>, <strong>a</strong><sub>z</sub></code> มีทิศทางชี้คงที่ขนานกับแกนอ้างอิงทั่วทั้งอวกาศ 3 มิติ</li>\n                </ul>\n\n                <div class=\"technical-diagram-box\" style=\"margin: 18px 0; padding: 18px; background: var(--card-bg); border-radius: var(--radius-md); border: 1px solid var(--rule); text-align: center;\">\n                  <svg viewBox=\"0 0 780 310\" width=\"100%\" style=\"max-width: 740px; display: block; margin: 0 auto; font-family: inherit;\">\n                    <defs>\n                      <marker id=\"arrow-blue\" viewBox=\"0 0 10 10\" refX=\"8\" refY=\"5\" markerWidth=\"6\" markerHeight=\"6\" orient=\"auto\"><path d=\"M 0 1 L 10 5 L 0 9 z\" fill=\"var(--accent)\"/></marker>\n                      <marker id=\"arrow-accent2\" viewBox=\"0 0 10 10\" refX=\"8\" refY=\"5\" markerWidth=\"6\" markerHeight=\"6\" orient=\"auto\"><path d=\"M 0 1 L 10 5 L 0 9 z\" fill=\"var(--accent2)\"/></marker>\n                      <marker id=\"arrow-green\" viewBox=\"0 0 10 10\" refX=\"8\" refY=\"5\" markerWidth=\"6\" markerHeight=\"6\" orient=\"auto\"><path d=\"M 0 1 L 10 5 L 0 9 z\" fill=\"var(--green)\"/></marker>\n                      <marker id=\"arrow-muted\" viewBox=\"0 0 10 10\" refX=\"8\" refY=\"5\" markerWidth=\"5\" markerHeight=\"5\" orient=\"auto\"><path d=\"M 0 1 L 10 5 L 0 9 z\" fill=\"var(--ink-muted)\"/></marker>\n                    </defs>\n                    <!-- LEFT PANEL: Cartesian -->\n                    <g transform=\"translate(20, 28)\">\n                      <text x=\"150\" y=\"12\" text-anchor=\"middle\" font-weight=\"700\" fill=\"var(--ink)\" font-size=\"13\">ระบบพิกัดฉาก (Cartesian)</text>\n                      <text x=\"150\" y=\"28\" text-anchor=\"middle\" font-weight=\"600\" fill=\"var(--ink-soft)\" font-size=\"11\">เวกเตอร์ฐานคงที่ทุกจุดในอวกาศ</text>\n                      <!-- Axes -->\n                      <line x1=\"70\" y1=\"220\" x2=\"260\" y2=\"220\" stroke=\"var(--rule)\" stroke-width=\"1.2\" marker-end=\"url(#arrow-muted)\"/>\n                      <line x1=\"70\" y1=\"220\" x2=\"70\" y2=\"50\" stroke=\"var(--rule)\" stroke-width=\"1.2\" marker-end=\"url(#arrow-muted)\"/>\n                      <line x1=\"70\" y1=\"220\" x2=\"30\" y2=\"255\" stroke=\"var(--rule)\" stroke-width=\"1.2\" marker-end=\"url(#arrow-muted)\"/>\n                      <text x=\"266\" y=\"224\" fill=\"var(--ink-soft)\" font-size=\"11\">y</text>\n                      <text x=\"66\" y=\"44\" fill=\"var(--ink-soft)\" font-size=\"11\">z</text>\n                      <text x=\"22\" y=\"262\" fill=\"var(--ink-soft)\" font-size=\"11\">x</text>\n                      <!-- Point P1 with vectors -->\n                      <circle cx=\"120\" cy=\"150\" r=\"4\" fill=\"var(--accent)\"/>\n                      <text x=\"126\" y=\"145\" fill=\"var(--accent)\" font-size=\"10\" font-weight=\"700\">P₁</text>\n                      <line x1=\"120\" y1=\"150\" x2=\"170\" y2=\"150\" stroke=\"var(--accent)\" stroke-width=\"2\" marker-end=\"url(#arrow-blue)\"/>\n                      <line x1=\"120\" y1=\"150\" x2=\"120\" y2=\"105\" stroke=\"var(--accent)\" stroke-width=\"2\" marker-end=\"url(#arrow-blue)\"/>\n                      <text x=\"174\" y=\"147\" fill=\"var(--accent)\" font-size=\"10\" font-weight=\"700\">a<tspan baseline-shift=\"sub\" font-size=\"75%\">y</tspan></text>\n                      <text x=\"124\" y=\"101\" fill=\"var(--accent)\" font-size=\"10\" font-weight=\"700\">a<tspan baseline-shift=\"sub\" font-size=\"75%\">z</tspan></text>\n                      <!-- Point P2 with vectors -->\n                      <circle cx=\"195\" cy=\"100\" r=\"4\" fill=\"var(--green)\"/>\n                      <text x=\"201\" y=\"95\" fill=\"var(--green)\" font-size=\"10\" font-weight=\"700\">P₂</text>\n                      <line x1=\"195\" y1=\"100\" x2=\"245\" y2=\"100\" stroke=\"var(--green)\" stroke-width=\"2\" marker-end=\"url(#arrow-green)\"/>\n                      <line x1=\"195\" y1=\"100\" x2=\"195\" y2=\"55\" stroke=\"var(--green)\" stroke-width=\"2\" marker-end=\"url(#arrow-green)\"/>\n                      <text x=\"249\" y=\"97\" fill=\"var(--green)\" font-size=\"10\" font-weight=\"700\">a<tspan baseline-shift=\"sub\" font-size=\"75%\">y</tspan></text>\n                      <text x=\"199\" y=\"51\" fill=\"var(--green)\" font-size=\"10\" font-weight=\"700\">a<tspan baseline-shift=\"sub\" font-size=\"75%\">z</tspan></text>\n                      <!-- Caption box -->\n                      <rect x=\"35\" y=\"246\" width=\"240\" height=\"24\" rx=\"4\" fill=\"rgba(46,125,50,0.08)\" stroke=\"var(--green)\" stroke-width=\"0.8\"/>\n                      <text x=\"155\" y=\"262\" text-anchor=\"middle\" fill=\"var(--green)\" font-size=\"10.5\" font-weight=\"600\">ทิศ a<tspan baseline-shift=\"sub\" font-size=\"75%\">x</tspan>, a<tspan baseline-shift=\"sub\" font-size=\"75%\">y</tspan>, a<tspan baseline-shift=\"sub\" font-size=\"75%\">z</tspan> ชี้ขนานทิศเดียวกันทุกจุด</text>\n                    </g>\n                    <!-- Divider -->\n                    <line x1=\"380\" y1=\"35\" x2=\"380\" y2=\"290\" stroke=\"var(--rule)\" stroke-width=\"1\" stroke-dasharray=\"4,4\"/>\n                    <!-- RIGHT PANEL: Spherical -->\n                    <g transform=\"translate(400, 28)\">\n                      <text x=\"180\" y=\"12\" text-anchor=\"middle\" font-weight=\"700\" fill=\"var(--ink)\" font-size=\"13\">ระบบพิกัดทรงกลม (Spherical)</text>\n                      <text x=\"180\" y=\"28\" text-anchor=\"middle\" font-weight=\"600\" fill=\"var(--ink-soft)\" font-size=\"11\">ทิศเวกเตอร์ฐานเปลี่ยนตามมุม (θ, ϕ)</text>\n                      <!-- Axes -->\n                      <line x1=\"60\" y1=\"220\" x2=\"310\" y2=\"220\" stroke=\"var(--rule)\" stroke-width=\"1.2\" marker-end=\"url(#arrow-muted)\"/>\n                      <line x1=\"60\" y1=\"220\" x2=\"60\" y2=\"50\" stroke=\"var(--rule)\" stroke-width=\"1.2\" marker-end=\"url(#arrow-muted)\"/>\n                      <text x=\"316\" y=\"224\" fill=\"var(--ink-soft)\" font-size=\"11\">y</text>\n                      <text x=\"56\" y=\"44\" fill=\"var(--ink-soft)\" font-size=\"11\">z</text>\n                      <!-- Reference arc from origin -->\n                      <path d=\"M 60 85 A 135 135 0 0 1 195 220\" stroke=\"var(--rule)\" stroke-dasharray=\"3,3\" fill=\"none\" stroke-width=\"1\"/>\n                      <!-- Point P1 -->\n                      <circle cx=\"115\" cy=\"110\" r=\"5\" fill=\"var(--accent)\"/>\n                      <text x=\"68\" y=\"97\" fill=\"var(--accent)\" font-size=\"10\" font-weight=\"700\">P₁(θ₁, ϕ₁)</text>\n                      <line x1=\"115\" y1=\"110\" x2=\"162\" y2=\"72\" stroke=\"var(--accent)\" stroke-width=\"2.5\" marker-end=\"url(#arrow-blue)\"/>\n                      <text x=\"166\" y=\"66\" fill=\"var(--accent)\" font-size=\"10\" font-weight=\"700\">a<tspan baseline-shift=\"sub\" font-size=\"75%\">r1</tspan></text>\n                      <line x1=\"115\" y1=\"110\" x2=\"152\" y2=\"140\" stroke=\"var(--accent)\" stroke-width=\"1.8\" marker-end=\"url(#arrow-blue)\"/>\n                      <text x=\"156\" y=\"148\" fill=\"var(--accent)\" font-size=\"10\" font-weight=\"700\">a<tspan baseline-shift=\"sub\" font-size=\"75%\">θ1</tspan></text>\n                      <!-- Point P2 -->\n                      <circle cx=\"195\" cy=\"175\" r=\"5\" fill=\"var(--accent2)\"/>\n                      <text x=\"130\" y=\"190\" fill=\"var(--accent2)\" font-size=\"10\" font-weight=\"700\">P₂(θ₂, ϕ₂)</text>\n                      <line x1=\"195\" y1=\"175\" x2=\"252\" y2=\"160\" stroke=\"var(--accent2)\" stroke-width=\"2.5\" marker-end=\"url(#arrow-accent2)\"/>\n                      <text x=\"256\" y=\"155\" fill=\"var(--accent2)\" font-size=\"10\" font-weight=\"700\">a<tspan baseline-shift=\"sub\" font-size=\"75%\">r2</tspan></text>\n                      <line x1=\"195\" y1=\"175\" x2=\"212\" y2=\"210\" stroke=\"var(--accent2)\" stroke-width=\"1.8\" marker-end=\"url(#arrow-accent2)\"/>\n                      <text x=\"216\" y=\"215\" fill=\"var(--accent2)\" font-size=\"10\" font-weight=\"700\">a<tspan baseline-shift=\"sub\" font-size=\"75%\">θ2</tspan></text>\n                      <!-- Caption box -->\n                      <rect x=\"45\" y=\"246\" width=\"280\" height=\"24\" rx=\"4\" fill=\"rgba(198,40,40,0.08)\" stroke=\"var(--red)\" stroke-width=\"0.8\"/>\n                      <text x=\"185\" y=\"262\" text-anchor=\"middle\" fill=\"var(--red)\" font-size=\"10.5\" font-weight=\"600\">a<tspan baseline-shift=\"sub\" font-size=\"75%\">r1</tspan> ≠ a<tspan baseline-shift=\"sub\" font-size=\"75%\">r2</tspan> ชี้คนละทิศ! นำมาบวกกันตรงๆ ไม่ได้</text>\n                    </g>\n                  </svg>\n                  <div style=\"font-size: 0.84rem; color: var(--ink-soft); margin-top: 8px;\">รูปที่ 1.1: แผนภาพแสดงเวกเตอร์หน่วยฐานในระบบพิกัดฉากและระบบพิกัดทรงกลม ณ ตำแหน่งต่างกันในอวกาศ</div>\n                </div>\n\n                <p><strong>2. การพิสูจน์เชิงวิเคราะห์จากเวกเตอร์ฐานพิกัดฉาก:</strong></p>\n                <div class=\"math-display\">\n                  <strong>a</strong><sub>r</sub> = sin θ cos ϕ <strong>a</strong><sub>x</sub> + sin θ sin ϕ <strong>a</strong><sub>y</sub> + cos θ <strong>a</strong><sub>z</sub> &nbsp; (ทิศทางแปรผันตาม θ และ ϕ)<br>\n                  <strong>a</strong><sub>θ</sub> = cos θ cos ϕ <strong>a</strong><sub>x</sub> + cos θ sin ϕ <strong>a</strong><sub>y</sub> - sin θ <strong>a</strong><sub>z</sub> &nbsp; (ทิศทางแปรผันตาม θ และ ϕ)<br>\n                  <strong>a</strong><sub>ϕ</sub> = -sin ϕ <strong>a</strong><sub>x</sub> + cos ϕ <strong>a</strong><sub>y</sub> &nbsp; (ทิศทางแปรผันตาม ϕ)<br><br>\n                  <em>การอนุพันธ์เทียบมุมยืนยันการเปลี่ยนทิศ:</em><br>\n                  <span class=\"math-frac\"><span class=\"math-num\">∂<strong>a</strong><sub>r</sub></span><span class=\"math-den\">∂θ</span></span> = <strong>a</strong><sub>θ</sub> &nbsp; , &nbsp;&nbsp; <span class=\"math-frac\"><span class=\"math-num\">∂<strong>a</strong><sub>r</sub></span><span class=\"math-den\">∂ϕ</span></span> = sin θ <strong>a</strong><sub>ϕ</sub> &nbsp;&nbsp; (มีค่าไม่เป็นศูนย์ แสดงว่าเวกเตอร์ฐานหมุนไปตามมุม)\n                </div>\n\n                <p><strong>3. ผลกระทบและข้อห้ามในการคำนวณทางวิศวกรรม:</strong></p>\n                <div class=\"math-display\" style=\"border-left-color: var(--red);\">\n                  <strong>ข้อห้ามเด็ดขาด:</strong> หากมีเวกเตอร์ <strong>A</strong> ที่จุด P₁ และเวกเตอร์ <strong>B</strong> ที่จุด P₂ ซึ่งมีพิกัดเชิงมุมต่างกัน <strong>ห้ามนำองค์ประกอบมาบวกกันตรงๆ</strong><br>\n                  เช่น <strong>A</strong> + <strong>B</strong> ≠ (A<sub>r</sub> + B<sub>r</sub>) <strong>a</strong><sub>r</sub> + (A<sub>θ</sub> + B<sub>θ</sub>) <strong>a</strong><sub>θ</sub> + (A<sub>ϕ</sub> + B<sub>ϕ</sub>) <strong>a</strong><sub>ϕ</sub> เพราะ <strong>a</strong><sub>r</sub> ที่จุด P₁ และ P₂ ชี้คนละทิศทาง!\n                </div>\n\n                <p><strong>4. แนวทางปฏิบัติที่ถูกต้อง (Standard Engineering Procedure):</strong></p>\n                <ol style=\"margin-left: 20px; line-height: 1.85;\">\n                  <li>แปลงเวกเตอร์ทุกตัวให้อยู่ใน <strong>ระบบพิกัดฉาก (Cartesian: <strong>a</strong><sub>x</sub>, <strong>a</strong><sub>y</sub>, <strong>a</strong><sub>z</sub>)</strong> เสียก่อน</li>\n                  <li>ดำเนินการทางพีชคณิต (บวก, ลบ, อินทิเกรต) ตามแนวแกน x, y, z ซึ่งเป็นเวกเตอร์คงที่</li>\n                  <li>หากต้องการผลลัพธ์ในพิกัดทรงกลม จึงแปลงคำตอบลัพธ์กลับสู่พิกัดทรงกลม ณ ตำแหน่งปลายทางที่ต้องการ</li>\n                </ol>\n              </div>\n            ")
          },
          {
            partId: "1.2",
            points: 15,
            question: ("กำหนดให้เวกเตอร์ <strong>A</strong> ที่อยู่ ณ จุดในระบบพิกัดทรงกลม P(2.4, 50°, 70°) มีค่าเป็น<div class=\"math-display\" style=\"margin: 10px 0; padding: 12px 16px;\"><strong>A</strong> = <span class=\"math-frac\"><span class=\"math-num\">2 sin θ</span><span class=\"math-den\">r</span></span> <strong>a</strong><sub>θ</sub> + <span class=\"math-frac\"><span class=\"math-num\">sin ϕ</span><span class=\"math-den\">sin θ</span></span> <strong>a</strong><sub>ϕ</sub></div>จงเขียนเวกเตอร์นี้ให้อยู่ในรูประบบพิกัดทรงกระบอก (Cylindrical Coordinates) ณ จุด P"),
            rubric: [
              { id: "r12_1", label: "เขียนสูตรตั้งต้นทั่วไปของการแปลงเวกเตอร์ (General Transformation Formulas) ก่อนแทนค่า", pts: 5 },
              { id: "r12_2", label: "คำนวณค่าตัวเลขขององค์ประกอบ <em>A</em><sub>r</sub>, <em>A</em><sub>θ</sub>, <em>A</em><sub>ϕ</sub> ณ จุด P(2.4, 50°, 70°) ถูกต้อง", pts: 4 },
              { id: "r12_3", label: "คำนวณหา <em>A</em><sub>ρ</sub>, <em>A</em><sub>ϕ</sub>, <em>A</em><sub>z</sub> ในพิกัดทรงกระบอกครบถ้วนถูกต้องพร้อมเขียนเวกเตอร์รวมสมบูรณ์", pts: 6 }
            ],
            solutionHtml: ("\n              <div class=\"card step-card step-essential\">\n                <span class=\"step-badge must-write\">ขั้นที่ 1: เขียนสูตรตั้งต้นทั่วไปของการแปลงเวกเตอร์ (Formula-First)</span>\n                <div class=\"formula-ref-badge\">อ้างอิงใบสูตร หมวด 3: ระบบพิกัดทรงกลม — เมทริกซ์แปลง [A<sub>rs</sub>] และความสัมพันธ์ Spherical ↔ Cylindrical</div>\n                <p>ความสัมพันธ์ระหว่างองค์ประกอบของเวกเตอร์ในระบบพิกัดทรงกระบอก <code>(A<sub>ρ</sub>, A<sub>ϕ</sub>, A<sub>z</sub>)</code> และพิกัดทรงกลม <code>(A<sub>r</sub>, A<sub>θ</sub>, A<sub>ϕ</sub>)</code> จากใบสูตรทางการ:</p>\n                <div class=\"math-display\">\n                  A<sub>ρ</sub> = <strong>A</strong> • <strong>a</strong><sub>ρ</sub> = A<sub>r</sub> sin θ + A<sub>θ</sub> cos θ<br>\n                  A<sub>ϕ</sub> = <strong>A</strong> • <strong>a</strong><sub>ϕ</sub> = A<sub>ϕ</sub> &nbsp;&nbsp; (แกนมุมหมุน ϕ ในทั้งสองระบบเป็นแนวราบเดียวกัน)<br>\n                  A<sub>z</sub> = <strong>A</strong> • <strong>a</strong><sub>z</sub> = A<sub>r</sub> cos θ - A<sub>θ</sub> sin θ\n                </div>\n                <p>หรือเขียนในรูปการคูณเมทริกซ์แปลงทางวิศวกรรม:</p>\n                <div class=\"math-equation\">\n                  <div class=\"math-mat\">\n                    <table class=\"math-table\" style=\"font-size: 0.90rem;\">\n                      <tr><td>A<sub>ρ</sub></td></tr>\n                      <tr><td>A<sub>ϕ</sub></td></tr>\n                      <tr><td>A<sub>z</sub></td></tr>\n                    </table>\n                  </div>\n                  <span>=</span>\n                  <div class=\"math-mat\">\n                    <table class=\"math-table\" style=\"font-size: 0.90rem;\">\n                      <tr><td>sin θ</td><td>cos θ</td><td>0</td></tr>\n                      <tr><td>0</td><td>0</td><td>1</td></tr>\n                      <tr><td>cos θ</td><td>-sin θ</td><td>0</td></tr>\n                    </table>\n                  </div>\n                  <div class=\"math-mat\">\n                    <table class=\"math-table\" style=\"font-size: 0.90rem;\">\n                      <tr><td>A<sub>r</sub></td></tr>\n                      <tr><td>A<sub>θ</sub></td></tr>\n                      <tr><td>A<sub>ϕ</sub></td></tr>\n                    </table>\n                  </div>\n                </div>\n              </div>\n\n              <div class=\"card step-card\">\n                <span class=\"step-badge\">ขั้นที่ 2: คำนวณค่าองค์ประกอบ ณ จุด P(r = 2.4, θ = 50°, ϕ = 70°)</span>\n                <p>ค่าฟังก์ชันตรีโกณมิติความแม่นยำสูง (6 ตำแหน่ง): <code>sin(50°) ≈ 0.766044</code>, <code>cos(50°) ≈ 0.642788</code>, <code>sin(70°) ≈ 0.939693</code>, <code>cos(70°) ≈ 0.342020</code></p>\n                <div class=\"math-display\">\n                  • A<sub>r</sub> = <strong>0</strong> &nbsp; (โจทย์ไม่มีองค์ประกอบในแนว a<sub>r</sub>)<br>\n                  • A<sub>θ</sub> = <span class=\"math-frac\"><span class=\"math-num\">2 sin(50°)</span><span class=\"math-den\">2.4</span></span> = <span class=\"math-frac\"><span class=\"math-num\">2(0.766044)</span><span class=\"math-den\">2.4</span></span> = <span class=\"math-frac\"><span class=\"math-num\">1.532088</span><span class=\"math-den\">2.4</span></span> = <strong>0.638370</strong><br>\n                  • A<sub>ϕ</sub> = <span class=\"math-frac\"><span class=\"math-num\">sin(70°)</span><span class=\"math-den\">sin(50°)</span></span> = <span class=\"math-frac\"><span class=\"math-num\">0.939693</span><span class=\"math-den\">0.766044</span></span> = <strong>1.226683</strong>\n                </div>\n              </div>\n\n              <div class=\"card step-card step-essential\">\n                <span class=\"step-badge must-write\">ขั้นที่ 3: แทนค่าหาองค์ประกอบในระบบพิกัดทรงกระบอกและสรุปคำตอบ</span>\n                <div class=\"math-display\">\n                  1) องค์ประกอบแนวรัศมีทรงกระบอก (A<sub>ρ</sub>):<br>\n                  A<sub>ρ</sub> = A<sub>r</sub> sin(50°) + A<sub>θ</sub> cos(50°) = 0 + (0.638370 × 0.642788) = <strong>0.410336</strong><br><br>\n                  2) องค์ประกอบแนวราบมุมหมุน (A<sub>ϕ</sub>):<br>\n                  A<sub>ϕ</sub> = A<sub>ϕ</sub> = <strong>1.226683</strong><br><br>\n                  3) องค์ประกอบแนวแกนดิ่ง (A<sub>z</sub>):<br>\n                  A<sub>z</sub> = A<sub>r</sub> cos(50°) - A<sub>θ</sub> sin(50°) = 0 - (0.638370 × 0.766044) = <strong>-0.489019</strong>\n                </div>\n\n                <p><strong>การตรวจสอบความไม่แปรเปลี่ยนของขนาดเวกเตอร์ (Invariant Magnitude Cross-Check):</strong></p>\n                <div class=\"math-display\">\n                  • |<strong>A</strong>|<sub>spherical</sub> = √[ (0)² + (0.638370)² + (1.226683)² ] = √[ 0 + 0.407516 + 1.504751 ] = √1.912267 = <strong>1.382847</strong><br>\n                  • |<strong>A</strong>|<sub>cylindrical</sub> = √[ (0.410336)² + (1.226683)² + (-0.489019)² ] = √[ 0.168376 + 1.504751 + 0.239140 ] = √1.912267 = <strong>1.382847</strong><br>\n                  <em>(ขนาดเวกเตอร์ทั้ง 2 ระบบเท่ากันสมบูรณ์ 100%)</em>\n                </div>\n\n                <div class=\"math-display\" style=\"border-left-color: var(--accent);\">\n                  <strong>คำตอบสุดท้าย (Final Answer):</strong><br>\n                  <strong>A</strong> = <strong>0.4103 a</strong><sub>ρ</sub> + <strong>1.2267 a</strong><sub>ϕ</sub> - <strong>0.4890 a</strong><sub>z</sub><br>\n                  <em>(หรือรูปทศนิยม 3 ตำแหน่ง: <strong>A</strong> ≈ 0.410 <strong>a</strong><sub>ρ</sub> + 1.227 <strong>a</strong><sub>ϕ</sub> - 0.489 <strong>a</strong><sub>z</sub>)</em>\n                </div>\n              </div>\n            ")
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
              { id: "r21_1", label: "เขียนสูตรทั่วไปของกฎของคูลอมบ์ <strong>F</strong> = <span class=\"math-frac\"><span class=\"math-num\">1</span><span class=\"math-den\">4πε₀</span></span> <span class=\"math-frac\"><span class=\"math-num\">Q₁ Q₂</span><span class=\"math-den\">|<strong>R</strong>|²</span></span> <strong>a</strong><sub>R</sub> ก่อนแทนค่า", pts: 3 },
              { id: "r21_2", label: "คำนวณเวกเตอร์ระยะทาง <strong>R</strong>₁₂ = <strong>r</strong>₂ - <strong>r</strong>₁ และ <strong>R</strong>₃₂ = <strong>r</strong>₂ - <strong>r</strong>₃ พร้อมขนาด |<strong>R</strong>| = 5 m ถูกต้อง", pts: 4 },
              { id: "r21_3", label: "รวมแรงเวกเตอร์ <strong>F</strong>₂ = <strong>F</strong>₁₂ + <strong>F</strong>₃₂ ได้ผลลัพธ์ถูกต้องทั้งในรูปตัวแปรและตัวเลขพร้อมหน่วย นิวตัน (N)", pts: 5 }
            ],
            solutionHtml: ("\n              <div class=\"card step-card step-essential\">\n                <span class=\"step-badge must-write\">ขั้นที่ 1: เขียนสูตรตั้งต้นทั่วไป (Formula-First)</span>\n                <div class=\"formula-ref-badge\">อ้างอิงใบสูตร หมวด 4: กฎของคูลอมบ์ — <strong>F</strong> = <span class=\"math-frac\"><span class=\"math-num\">1</span><span class=\"math-den\">4πε₀</span></span> <span class=\"math-frac\"><span class=\"math-num\">Q₁ Q₂</span><span class=\"math-den\">|<strong>R</strong>|²</span></span> <strong>a</strong><sub>R</sub> (Coulomb's Law)</div>\n                <p>จากใบสูตรกลางภาค กฎของคูลอมบ์สำหรับแรงกระทำระหว่างประจุจุด:</p>\n                <div class=\"math-display\">\n                  <strong>F</strong><sub>2</sub> = <em>k</em> <span class=\"math-frac\"><span class=\"math-num\">Q₁ Q₂</span><span class=\"math-den\">R₁₂²</span></span> <strong>a</strong>̂₁₂ = <span class=\"math-frac\"><span class=\"math-num\">1</span><span class=\"math-den\">4πε₀</span></span> <span class=\"math-frac\"><span class=\"math-num\">Q₁ Q₂</span><span class=\"math-den\">|<strong>R</strong>₁₂|³</span></span> <strong>R</strong>₁₂<br>\n                  โดย <strong>R</strong>₁₂ = <strong>r</strong>₂ - <strong>r</strong>₁ , &nbsp; <em>k</em> = <span class=\"math-frac\"><span class=\"math-num\">1</span><span class=\"math-den\">4πε₀</span></span> ≈ 8.98755 × 10⁹ N·m²/C²\n                </div>\n\n                <div class=\"technical-diagram-box\" style=\"margin: 18px 0; padding: 18px; background: var(--card-bg); border-radius: var(--radius-md); border: 1px solid var(--rule); text-align: center;\">\n                  <svg viewBox=\"0 0 740 330\" width=\"100%\" style=\"max-width: 700px; display: block; margin: 0 auto; font-family: inherit;\">\n                    <defs>\n                      <marker id=\"f-arrow-red\" viewBox=\"0 0 10 10\" refX=\"8\" refY=\"5\" markerWidth=\"6\" markerHeight=\"6\" orient=\"auto\"><path d=\"M 0 1 L 10 5 L 0 9 z\" fill=\"var(--red)\"/></marker>\n                      <marker id=\"f-arrow-blue\" viewBox=\"0 0 10 10\" refX=\"8\" refY=\"5\" markerWidth=\"6\" markerHeight=\"6\" orient=\"auto\"><path d=\"M 0 1 L 10 5 L 0 9 z\" fill=\"var(--accent)\"/></marker>\n                      <marker id=\"f-arrow-green\" viewBox=\"0 0 10 10\" refX=\"8\" refY=\"5\" markerWidth=\"6\" markerHeight=\"6\" orient=\"auto\"><path d=\"M 0 1 L 10 5 L 0 9 z\" fill=\"var(--green)\"/></marker>\n                      <marker id=\"f-arrow-gray\" viewBox=\"0 0 10 10\" refX=\"8\" refY=\"5\" markerWidth=\"5\" markerHeight=\"5\" orient=\"auto\"><path d=\"M 0 1 L 10 5 L 0 9 z\" fill=\"var(--ink-muted)\"/></marker>\n                    </defs>\n                    <g transform=\"translate(20, 10)\">\n                      <circle cx=\"350\" cy=\"160\" r=\"120\" stroke=\"var(--rule)\" stroke-width=\"1.2\" stroke-dasharray=\"4,4\" fill=\"none\"/>\n                      <!-- Axes -->\n                      <line x1=\"140\" y1=\"160\" x2=\"560\" y2=\"160\" stroke=\"var(--rule)\" stroke-width=\"1.5\" marker-end=\"url(#f-arrow-gray)\"/>\n                      <line x1=\"350\" y1=\"300\" x2=\"350\" y2=\"20\" stroke=\"var(--rule)\" stroke-width=\"1.5\" marker-end=\"url(#f-arrow-gray)\"/>\n                      <text x=\"566\" y=\"164\" fill=\"var(--ink-soft)\" font-size=\"12\">x</text>\n                      <text x=\"354\" y=\"18\" fill=\"var(--ink-soft)\" font-size=\"12\">y</text>\n                      <!-- Charges -->\n                      <circle cx=\"350\" cy=\"160\" r=\"8\" fill=\"var(--accent)\" stroke=\"#fff\" stroke-width=\"2\"/>\n                      <text x=\"358\" y=\"150\" fill=\"var(--accent)\" font-size=\"12\" font-weight=\"800\">Q₂ = +2 C (0,0)</text>\n                      <circle cx=\"470\" cy=\"160\" r=\"7\" fill=\"var(--accent2)\" stroke=\"#fff\" stroke-width=\"1.5\"/>\n                      <text x=\"475\" y=\"150\" fill=\"var(--accent2)\" font-size=\"11\" font-weight=\"700\">Q₁ = +3√3 C (5,0)</text>\n                      <line x1=\"350\" y1=\"160\" x2=\"265\" y2=\"160\" stroke=\"var(--accent2)\" stroke-width=\"3\" marker-end=\"url(#f-arrow-red)\"/>\n                      <text x=\"220\" y=\"150\" fill=\"var(--accent2)\" font-size=\"11\" font-weight=\"700\">F<tspan baseline-shift=\"sub\" font-size=\"75%\">12</tspan> (-a<tspan baseline-shift=\"sub\" font-size=\"75%\">x</tspan>)</text>\n                      <!-- Q3 -->\n                      <circle cx=\"290\" cy=\"56\" r=\"7\" fill=\"var(--green)\" stroke=\"#fff\" stroke-width=\"1.5\"/>\n                      <text x=\"180\" y=\"52\" fill=\"var(--green)\" font-size=\"11\" font-weight=\"700\">Q₃ = +3 C (-2.5, 2.5√3)</text>\n                      <line x1=\"350\" y1=\"160\" x2=\"385\" y2=\"220\" stroke=\"var(--green)\" stroke-width=\"2.5\" marker-end=\"url(#f-arrow-green)\"/>\n                      <text x=\"390\" y=\"232\" fill=\"var(--green)\" font-size=\"11\" font-weight=\"700\">F<tspan baseline-shift=\"sub\" font-size=\"75%\">32</tspan></text>\n                      <!-- F2 Net -->\n                      <line x1=\"350\" y1=\"160\" x2=\"280\" y2=\"218\" stroke=\"var(--red)\" stroke-width=\"3.5\" marker-end=\"url(#f-arrow-red)\"/>\n                      <text x=\"175\" y=\"224\" fill=\"var(--red)\" font-size=\"12\" font-weight=\"800\">F<tspan baseline-shift=\"sub\" font-size=\"75%\">2</tspan> = F<tspan baseline-shift=\"sub\" font-size=\"75%\">12</tspan> + F<tspan baseline-shift=\"sub\" font-size=\"75%\">32</tspan></text>\n                      <!-- Q4 Equilibrium -->\n                      <circle cx=\"252\" cy=\"229\" r=\"8\" fill=\"var(--accent)\" stroke=\"var(--ink)\" stroke-width=\"1.5\" stroke-dasharray=\"2,2\"/>\n                      <text x=\"80\" y=\"254\" fill=\"var(--accent)\" font-size=\"11\" font-weight=\"700\">Q₄ = +4.518 C at P₄(-4.09, -2.88)</text>\n                      <line x1=\"350\" y1=\"160\" x2=\"420\" y2=\"102\" stroke=\"var(--accent)\" stroke-width=\"3\" stroke-dasharray=\"4,3\" marker-end=\"url(#f-arrow-blue)\"/>\n                      <text x=\"425\" y=\"98\" fill=\"var(--accent)\" font-size=\"11\" font-weight=\"700\">F<tspan baseline-shift=\"sub\" font-size=\"75%\">42</tspan> = -F<tspan baseline-shift=\"sub\" font-size=\"75%\">2</tspan> (แรงต้านสมดุล)</text>\n                    </g>\n                  </svg>\n                  <div style=\"font-size: 0.84rem; color: var(--ink-soft); margin-top: 8px;\">รูปที่ 2.1: เรขาคณิตของระบบประจุ 3 ตัวบนระนาบ xy แรงผลักลัพธ์ <strong>F</strong>₂ และตำแหน่งสมดุลของประจุ Q₄</div>\n                </div>\n              </div>\n\n              <div class=\"card step-card\">\n                <span class=\"step-badge\">ขั้นที่ 2: คำนวณแรง F₁₂ และ F₃₂ ทีละตัว</span>\n                <p><strong>1) แรง F₁₂ จากประจุ Q₁ กระทำต่อ Q₂:</strong></p>\n                <div class=\"math-display\">\n                  • <strong>r</strong>₁ = 5 <strong>a</strong><sub>x</sub> , &nbsp; <strong>r</strong>₂ = 0 <strong>a</strong><sub>x</sub><br>\n                  • <strong>R</strong>₁₂ = <strong>r</strong>₂ - <strong>r</strong>₁ = (0 - 5) <strong>a</strong><sub>x</sub> = -5 <strong>a</strong><sub>x</sub> &nbsp; (|<strong>R</strong>₁₂| = 5 m)<br>\n                  • <strong>F</strong>₁₂ = <span class=\"math-frac\"><span class=\"math-num\">1</span><span class=\"math-den\">4πε₀</span></span> [ <span class=\"math-frac\"><span class=\"math-num\">(3√3)(2)</span><span class=\"math-den\">5³</span></span> (-5 <strong>a</strong><sub>x</sub>) ] = <span class=\"math-frac\"><span class=\"math-num\">1</span><span class=\"math-den\">4πε₀</span></span> [ -<span class=\"math-frac\"><span class=\"math-num\">6√3</span><span class=\"math-den\">25</span></span> <strong>a</strong><sub>x</sub> ] N = -0.415692 <em>k</em> <strong>a</strong><sub>x</sub> N\n                </div>\n\n                <p><strong>2) แรง F₃₂ จากประจุ Q₃ กระทำต่อ Q₂:</strong></p>\n                <div class=\"math-display\">\n                  • <strong>r</strong>₃ = -2.5 <strong>a</strong><sub>x</sub> + <span class=\"math-frac\"><span class=\"math-num\">5√3</span><span class=\"math-den\">2</span></span> <strong>a</strong><sub>y</sub> , &nbsp; <strong>r</strong>₂ = 0<br>\n                  • <strong>R</strong>₃₂ = <strong>r</strong>₂ - <strong>r</strong>₃ = (0 - (-2.5)) <strong>a</strong><sub>x</sub> + (0 - <span class=\"math-frac\"><span class=\"math-num\">5√3</span><span class=\"math-den\">2</span></span>) <strong>a</strong><sub>y</sub> = 2.5 <strong>a</strong><sub>x</sub> - <span class=\"math-frac\"><span class=\"math-num\">5√3</span><span class=\"math-den\">2</span></span> <strong>a</strong><sub>y</sub><br>\n                  • |<strong>R</strong>₃₂| = √[ (2.5)² + (<span class=\"math-frac\"><span class=\"math-num\">5√3</span><span class=\"math-den\">2</span></span>)² ] = √[ 6.25 + 18.75 ] = √25 = <strong>5 m</strong><br>\n                  • <strong>F</strong>₃₂ = <span class=\"math-frac\"><span class=\"math-num\">1</span><span class=\"math-den\">4πε₀</span></span> [ <span class=\"math-frac\"><span class=\"math-num\">(3)(2)</span><span class=\"math-den\">5³</span></span> (2.5 <strong>a</strong><sub>x</sub> - <span class=\"math-frac\"><span class=\"math-num\">5√3</span><span class=\"math-den\">2</span></span> <strong>a</strong><sub>y</sub>) ] = <span class=\"math-frac\"><span class=\"math-num\">1</span><span class=\"math-den\">4πε₀</span></span> [ <span class=\"math-frac\"><span class=\"math-num\">3</span><span class=\"math-den\">25</span></span> <strong>a</strong><sub>x</sub> - <span class=\"math-frac\"><span class=\"math-num\">3√3</span><span class=\"math-den\">25</span></span> <strong>a</strong><sub>y</sub> ] N<br>\n                  &nbsp;&nbsp;<strong>F</strong>₃₂ = <em>k</em> (0.120000 <strong>a</strong><sub>x</sub> - 0.207846 <strong>a</strong><sub>y</sub>) N\n                </div>\n              </div>\n\n              <div class=\"card step-card step-essential\">\n                <span class=\"step-badge must-write\">ขั้นที่ 3: รวมแรงลัพธ์บนประจุ Q₂ ด้วยหลักการซ้อนทับ (Superposition)</span>\n                <div class=\"math-display\">\n                  <strong>F</strong>₂ = <strong>F</strong>₁₂ + <strong>F</strong>₃₂ = <span class=\"math-frac\"><span class=\"math-num\">1</span><span class=\"math-den\">4πε₀</span></span> [ (-<span class=\"math-frac\"><span class=\"math-num\">6√3</span><span class=\"math-den\">25</span></span> + <span class=\"math-frac\"><span class=\"math-num\">3</span><span class=\"math-den\">25</span></span>) <strong>a</strong><sub>x</sub> - <span class=\"math-frac\"><span class=\"math-num\">3√3</span><span class=\"math-den\">25</span></span> <strong>a</strong><sub>y</sub> ] N<br><br>\n                  <strong>ตอบ (รูปเศษส่วนและค่าคงตัว):</strong><br>\n                  <strong>F</strong>₂ = <span class=\"math-frac\"><span class=\"math-num\">1</span><span class=\"math-den\">4πε₀</span></span> [ (<span class=\"math-frac\"><span class=\"math-num\">3 - 6√3</span><span class=\"math-den\">25</span></span>) <strong>a</strong><sub>x</sub> - <span class=\"math-frac\"><span class=\"math-num\">3√3</span><span class=\"math-den\">25</span></span> <strong>a</strong><sub>y</sub> ] N<br><br>\n                  <strong>ตอบ (รูปตัวเลขแม่นยำ 4 ตำแหน่ง):</strong><br>\n                  <strong>F</strong>₂ = <em>k</em> [ -0.2957 <strong>a</strong><sub>x</sub> - 0.2078 <strong>a</strong><sub>y</sub> ] N = <strong>-2.658 × 10⁹ <strong>a</strong><sub>x</sub> - 1.868 × 10⁹ <strong>a</strong><sub>y</sub> นิวตัน (N)</strong><br>\n                  ขนาดแรงลัพธ์: |<strong>F</strong>₂| = √[ (-2.65755 × 10⁹)² + (-1.86803 × 10⁹)² ] ≈ <strong>3.248 × 10⁹ N (3.248 GN)</strong>\n                </div>\n              </div>\n            ")
          },
          {
            partId: "2.2",
            points: 8,
            question: "ถ้านำประจุหนึ่งตัวซึ่งแทนด้วย Q₄ เข้าไปวางในระบบเพื่อให้ผลรวมของแรงบนประจุ Q₂ มีค่าเท่ากับศูนย์ (สภาวะสมดุล <strong>F</strong><sub>2,net</sub> = <strong>0</strong>) จงหาค่าของประจุและตำแหน่งของประจุ Q₄ พร้อมแสดงรายละเอียดการได้มาของคำตอบ",
            rubric: [
              { id: "r22_1", label: "ตั้งสมการเงื่อนไขสมดุลแรง <b>F</b><sub>net</sub> = <b>F</b>₂ + <b>F</b>₄₂ = <b>0</b> ⇒ <b>F</b>₄₂ = -<b>F</b>₂", pts: 2 },
              { id: "r22_2", label: "คำนวณหาทิศทางและขนาดของแรงต้าน <b>F</b>₄₂", pts: 3 },
              { id: "r22_3", label: "ระบุขนาด ชนิด และพิกัดตำแหน่ง P₄ ของประจุ Q₄ ที่ถูกต้องสอดคล้องกัน", pts: 3 }
            ],
            solutionHtml: ("\n              <div class=\"card step-card step-essential\">\n                <span class=\"step-badge must-write\">ขั้นที่ 1: ตั้งสมการเงื่อนไขสมดุลแรง (Equilibrium Condition)</span>\n                <div class=\"math-display\">\n                  <strong>F</strong><sub>2,net</sub> = <strong>F</strong>₂ + <strong>F</strong>₄₂ = <strong>0</strong> &nbsp;&nbsp; ⇒ &nbsp;&nbsp; <strong>F</strong>₄₂ = -<strong>F</strong>₂<br><br>\n                  <strong>F</strong>₄₂ = <span class=\"math-frac\"><span class=\"math-num\">1</span><span class=\"math-den\">4πε₀</span></span> [ <span class=\"math-frac\"><span class=\"math-num\">6√3 - 3</span><span class=\"math-den\">25</span></span> <strong>a</strong><sub>x</sub> + <span class=\"math-frac\"><span class=\"math-num\">3√3</span><span class=\"math-den\">25</span></span> <strong>a</strong><sub>y</sub> ] N = <em>k</em> (0.295692 <strong>a</strong><sub>x</sub> + 0.207846 <strong>a</strong><sub>y</sub>) N\n                </div>\n              </div>\n\n              <div class=\"card step-card\">\n                <span class=\"step-badge\">ขั้นที่ 2: วิเคราะห์ขนาดและทิศทางของแรงต้าน</span>\n                <div class=\"math-display\">\n                  • ขนาดแรงต้าน: |<strong>F</strong>₄₂| = <em>k</em> √[(0.295692)² + (0.207846)²] = <em>k</em> √(0.087434 + 0.043200) = <strong>0.361433 <em>k</em> N</strong> = <strong>3.248 × 10⁹ N</strong><br>\n                  • ทิศทางแรงต้านชี้ไปในควอดรันต์ที่ 1: θ = arctan(<span class=\"math-frac\"><span class=\"math-num\">0.207846</span><span class=\"math-den\">0.295692</span></span>) = arctan(0.70291) ≈ <strong>35.104°</strong> (เทียบแกน +x)\n                </div>\n              </div>\n\n              <div class=\"card step-card step-essential\">\n                <span class=\"step-badge must-write\">ขั้นที่ 3: กำหนดขนาด ชนิด และพิกัดตำแหน่งของประจุ Q₄</span>\n                <p>จากกฎของคูลอมบ์ <strong>F</strong>₄₂ = <span class=\"math-frac\"><span class=\"math-num\">Q₄ Q₂</span><span class=\"math-den\">4πε₀ |<strong>R</strong>₄₂|³</span></span> <strong>R</strong>₄₂ โดย <strong>r</strong>₂ = (0,0,0) ดังนั้น <strong>R</strong>₄₂ = -<strong>r</strong>₄</p>\n                <div class=\"math-display\">\n                  เนื่องจาก Q₂ = +2 C เป็นประจุบวก และแรงต้านต้องผลัก Q₂ ไปที่มุม 35.104° (ควอดรันต์ 1):<br>\n                  • ประจุ Q₄ ต้องเป็น <strong>ประจุบวก (+)</strong> วางอยู่ที่มุมตรงข้าม (ควอดรันต์ 3: 180° + 35.104° = <strong>215.104°</strong>)<br>\n                  • หากเลือกวางประจุที่ระยะรัศมีสมมาตร <em>d</em> = 5 เมตร (เท่ากับ Q₁ และ Q₃):<br>\n                  &nbsp;&nbsp;x₄ = 5 cos(215.104°) = -5 cos(35.104°) = -5(0.81812) = <strong>-4.0906 m</strong><br>\n                  &nbsp;&nbsp;y₄ = 5 sin(215.104°) = -5 sin(35.104°) = -5(0.57507) = <strong>-2.8754 m</strong><br>\n                  &nbsp;&nbsp;z₄ = <strong>0 m</strong><br>\n                  &nbsp;&nbsp;<strong>ตำแหน่งของ Q₄:</strong> <strong>P₄(-4.091 m, -2.875 m, 0 m)</strong><br><br>\n                  • <strong>คำนวณหาขนาดประจุ Q₄:</strong><br>\n                  <span class=\"math-frac\"><span class=\"math-num\">|Q₄| (2)</span><span class=\"math-den\">5²</span></span> = 0.361433 &nbsp;&nbsp; ⇒ &nbsp;&nbsp; <strong>Q₄ = <span class=\"math-frac\"><span class=\"math-num\">0.361433 × 25</span><span class=\"math-den\">2</span></span> = +4.518 คูลอมบ์ (C)</strong> (ประจุบวก)\n                </div>\n              </div>\n            ")
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
              { id: "r31_1", label: "เขียนสูตรตั้งต้นทั่วไป d<b>E</b> = (ρ<sub>l</sub> dz' / 4πε₀ R²) <b>a</b><sub>R</sub> และอินทิกรัลรวม", pts: 5 },
              { id: "r31_2", label: "กำหนด dQ = ρ<sub>l</sub> dz' และหาเวกเตอร์ระยะทาง <b>R</b> = 3 <b>a</b><sub>y</sub> - z' <b>a</b><sub>z</sub> ถูกต้อง", pts: 6 },
              { id: "r31_3", label: "แยกองค์ประกอบอินทิกรัล <em>E</em><sub>y</sub> และ <em>E</em><sub>z</sub> พร้อมกำหนดขอบเขต z' = 0 ถึง 4", pts: 5 },
              { id: "r31_4", label: "แสดงการอินทิเกรตเชิงวิเคราะห์ด้วยตรีโกณมิติ z' = 3 tan ψ ทีละขั้นตอนอย่างสมบูรณ์", pts: 10 },
              { id: "r31_5", label: "ได้คำตอบสุดท้ายในรูปพิกัดฉากและติดค่า π, ε₀ ถูกต้องสมบูรณ์", pts: 4 }
            ],
            solutionHtml: ("\n              <div class=\"card step-card step-essential\">\n                <span class=\"step-badge must-write\">ขั้นที่ 1: เขียนสูตรตั้งต้นและนิยามเวกเตอร์ส่วนย่อย (Setup)</span>\n                <div class=\"formula-ref-badge\">อ้างอิงใบสูตร หมวด 4: อินทิกรัลเส้น — <b>E</b> = ∫ <span class=\"math-frac\"><span class=\"math-num\">ρ<sub>l</sub> dl'</span><span class=\"math-den\">4πε₀ |<strong>R</strong>|²</span></span> <b>a</b><sub>R</sub> (Line Charge)</div>\n                <div class=\"math-display\">\n                  <strong>สูตรตั้งต้นจากใบสูตรกลางภาค:</strong><br>\n                  d<strong>E</strong> = <strong>a</strong>̂<sub>R</sub> <em>k</em> <span class=\"math-frac\"><span class=\"math-num\">dQ</span><span class=\"math-den\">R²</span></span> , &nbsp; dQ = ρ<sub>l</sub> dl' = ρ<sub>l</sub> dz' &nbsp; ⇒ &nbsp; <strong>E</strong> = ∫<sub>L</sub> <span class=\"math-frac\"><span class=\"math-num\">ρ<sub>l</sub> dz'</span><span class=\"math-den\">4πε₀ |<strong>R</strong>|³</span></span> <strong>R</strong><br><br>\n                  • จุดสังเกต (Observation Point): <strong>r</strong> = (0, 3, 0) = 3 <strong>a</strong><sub>y</sub><br>\n                  • จุดประจุย่อยบนเส้นลวด (Source Point): <strong>r'</strong> = (0, 0, z') = z' <strong>a</strong><sub>z</sub> &nbsp; (0 ≤ z' ≤ 4)<br>\n                  • เวกเตอร์ระยะทาง: <strong>R</strong> = <strong>r</strong> - <strong>r'</strong> = 3 <strong>a</strong><sub>y</sub> - z' <strong>a</strong><sub>z</sub><br>\n                  • ขนาดระยะทาง: |<strong>R</strong>| = √[ 3² + (z')² ] = √[ 9 + (z')² ]\n                </div>\n\n                <div class=\"technical-diagram-box\" style=\"margin: 18px 0; padding: 18px; background: var(--card-bg); border-radius: var(--radius-md); border: 1px solid var(--rule); text-align: center;\">\n                  <svg viewBox=\"0 0 740 320\" width=\"100%\" style=\"max-width: 700px; display: block; margin: 0 auto; font-family: inherit;\">\n                    <defs>\n                      <marker id=\"e-arrow-blue\" viewBox=\"0 0 10 10\" refX=\"8\" refY=\"5\" markerWidth=\"6\" markerHeight=\"6\" orient=\"auto\"><path d=\"M 0 1 L 10 5 L 0 9 z\" fill=\"var(--accent)\"/></marker>\n                      <marker id=\"e-arrow-red\" viewBox=\"0 0 10 10\" refX=\"8\" refY=\"5\" markerWidth=\"6\" markerHeight=\"6\" orient=\"auto\"><path d=\"M 0 1 L 10 5 L 0 9 z\" fill=\"var(--red)\"/></marker>\n                      <marker id=\"e-arrow-muted\" viewBox=\"0 0 10 10\" refX=\"8\" refY=\"5\" markerWidth=\"5\" markerHeight=\"5\" orient=\"auto\"><path d=\"M 0 1 L 10 5 L 0 9 z\" fill=\"var(--ink-muted)\"/></marker>\n                    </defs>\n                    <g transform=\"translate(60, 20)\">\n                      <!-- Axes -->\n                      <line x1=\"80\" y1=\"240\" x2=\"520\" y2=\"240\" stroke=\"var(--rule)\" stroke-width=\"1.5\" marker-end=\"url(#e-arrow-muted)\"/>\n                      <line x1=\"80\" y1=\"240\" x2=\"80\" y2=\"20\" stroke=\"var(--rule)\" stroke-width=\"1.5\" marker-end=\"url(#e-arrow-muted)\"/>\n                      <text x=\"526\" y=\"244\" fill=\"var(--ink-soft)\" font-size=\"12\">y</text>\n                      <text x=\"76\" y=\"14\" fill=\"var(--ink-soft)\" font-size=\"12\">z</text>\n                      <!-- Line charge -->\n                      <line x1=\"80\" y1=\"240\" x2=\"80\" y2=\"60\" stroke=\"var(--accent2)\" stroke-width=\"6\" stroke-linecap=\"round\"/>\n                      <text x=\"12\" y=\"150\" fill=\"var(--accent2)\" font-size=\"12\" font-weight=\"800\">ρ<tspan baseline-shift=\"sub\" font-size=\"75%\">l</tspan> (C/m)</text>\n                      <text x=\"45\" y=\"65\" fill=\"var(--ink-soft)\" font-size=\"11\">z = 4</text>\n                      <text x=\"45\" y=\"245\" fill=\"var(--ink-soft)\" font-size=\"11\">z = 0</text>\n                      <!-- Source element dQ -->\n                      <circle cx=\"80\" cy=\"120\" r=\"5\" fill=\"var(--red)\"/>\n                      <text x=\"90\" y=\"115\" fill=\"var(--red)\" font-size=\"11\" font-weight=\"700\">dQ = ρ<tspan baseline-shift=\"sub\" font-size=\"75%\">l</tspan> dz' (0, 0, z')</text>\n                      <!-- Observation point P -->\n                      <circle cx=\"215\" cy=\"240\" r=\"6\" fill=\"var(--accent)\"/>\n                      <text x=\"210\" y=\"260\" fill=\"var(--accent)\" font-size=\"12\" font-weight=\"800\">P(0, 3, 0)</text>\n                      <!-- Distance vector R -->\n                      <line x1=\"80\" y1=\"120\" x2=\"215\" y2=\"240\" stroke=\"var(--accent)\" stroke-width=\"2\" stroke-dasharray=\"4,3\"/>\n                      <text x=\"135\" y=\"170\" fill=\"var(--accent)\" font-size=\"11\" font-weight=\"700\">R = √[3² + (z')²]</text>\n                      <!-- Angle psi -->\n                      <path d=\"M 175 240 A 40 40 0 0 1 185 214\" stroke=\"var(--ink)\" stroke-width=\"1.2\" fill=\"none\"/>\n                      <text x=\"170\" y=\"228\" fill=\"var(--ink)\" font-size=\"12\" font-weight=\"700\">ψ</text>\n                      <!-- dE vector and components -->\n                      <line x1=\"215\" y1=\"240\" x2=\"320\" y2=\"325\" stroke=\"var(--red)\" stroke-width=\"2.5\" marker-end=\"url(#e-arrow-red)\"/>\n                      <text x=\"325\" y=\"330\" fill=\"var(--red)\" font-size=\"11\" font-weight=\"800\">dE</text>\n                      <line x1=\"215\" y1=\"240\" x2=\"320\" y2=\"240\" stroke=\"var(--accent)\" stroke-width=\"2\" marker-end=\"url(#e-arrow-blue)\"/>\n                      <line x1=\"320\" y1=\"240\" x2=\"320\" y2=\"325\" stroke=\"var(--accent)\" stroke-width=\"2\" marker-end=\"url(#e-arrow-blue)\"/>\n                      <text x=\"260\" y=\"232\" fill=\"var(--accent)\" font-size=\"11\" font-weight=\"700\">dE<tspan baseline-shift=\"sub\" font-size=\"75%\">y</tspan> = dE cos ψ</text>\n                      <text x=\"328\" y=\"285\" fill=\"var(--accent)\" font-size=\"11\" font-weight=\"700\">dE<tspan baseline-shift=\"sub\" font-size=\"75%\">z</tspan> = -dE sin ψ</text>\n                    </g>\n                  </svg>\n                  <div style=\"font-size: 0.84rem; color: var(--ink-soft); margin-top: 8px;\">รูปที่ 3.1: แผนภาพการอินทิเกรตสนามไฟฟ้าจากเส้นลวดจำกัดบนแกน z ที่จุดสังเกต P(0,3,0) และการแตกเวกเตอร์มุม ψ</div>\n                </div>\n              </div>\n\n              <div class=\"card step-card step-essential\">\n                <span class=\"step-badge must-write\">ขั้นที่ 2: แสดงการอินทิเกรตเชิงวิเคราะห์องค์ประกอบ E<sub>y</sub></span>\n                <div class=\"math-display\">\n                  E<sub>y</sub> = <span class=\"math-frac\"><span class=\"math-num\">ρ<sub>l</sub></span><span class=\"math-den\">4πε₀</span></span> ∫<sub>0</sub><sup>4</sup> <span class=\"math-frac\"><span class=\"math-num\">3 dz'</span><span class=\"math-den\">[9 + (z')²]<sup>3/2</sup></span></span><br><br>\n                  <strong>เทคนิคการแทนค่าด้วยตรีโกณมิติ (Trigonometric Substitution):</strong><br>\n                  ให้ <em>z'</em> = 3 tan ψ &nbsp; ⇒ &nbsp; d<em>z'</em> = 3 sec² ψ dψ<br>\n                  และ √[9 + (z')²] = 3 sec ψ &nbsp; ⇒ &nbsp; [9 + (z')²]<sup>3/2</sup> = 27 sec³ ψ<br><br>\n                  = <span class=\"math-frac\"><span class=\"math-num\">ρ<sub>l</sub></span><span class=\"math-den\">4πε₀</span></span> ∫ <span class=\"math-frac\"><span class=\"math-num\">3(3 sec² ψ dψ)</span><span class=\"math-den\">27 sec³ ψ</span></span> = <span class=\"math-frac\"><span class=\"math-num\">ρ<sub>l</sub></span><span class=\"math-den\">4πε₀</span></span> (<span class=\"math-frac\"><span class=\"math-num\">9</span><span class=\"math-den\">27</span></span>) ∫ <span class=\"math-frac\"><span class=\"math-num\">1</span><span class=\"math-den\">sec ψ</span></span> dψ<br>\n                  = <span class=\"math-frac\"><span class=\"math-num\">ρ<sub>l</sub></span><span class=\"math-den\">12πε₀</span></span> ∫ cos ψ dψ = <span class=\"math-frac\"><span class=\"math-num\">ρ<sub>l</sub></span><span class=\"math-den\">12πε₀</span></span> [ sin ψ ]<br><br>\n                  แปลงตัวแปรกลับ: sin ψ = <span class=\"math-frac\"><span class=\"math-num\">z'</span><span class=\"math-den\">√[9 + (z')²]</span></span><br>\n                  = <span class=\"math-frac\"><span class=\"math-num\">ρ<sub>l</sub></span><span class=\"math-den\">12πε₀</span></span> [ <span class=\"math-frac\"><span class=\"math-num\">z'</span><span class=\"math-den\">√[9 + (z')²]</span></span> ]<sub>0</sub><sup>4</sup> = <span class=\"math-frac\"><span class=\"math-num\">ρ<sub>l</sub></span><span class=\"math-den\">12πε₀</span></span> [ <span class=\"math-frac\"><span class=\"math-num\">4</span><span class=\"math-den\">√[9 + 16]</span></span> - 0 ] = <span class=\"math-frac\"><span class=\"math-num\">ρ<sub>l</sub></span><span class=\"math-den\">12πε₀</span></span> (<span class=\"math-frac\"><span class=\"math-num\">4</span><span class=\"math-den\">5</span></span>)<br>\n                  <strong>E<sub>y</sub> = <span class=\"math-frac\"><span class=\"math-num\">ρ<sub>l</sub></span><span class=\"math-den\">15πε₀</span></span> <strong>a</strong><sub>y</sub> V/m</strong>\n                </div>\n              </div>\n\n              <div class=\"card step-card step-essential\">\n                <span class=\"step-badge must-write\">ขั้นที่ 3: แสดงการอินทิเกรตเชิงวิเคราะห์องค์ประกอบ E<sub>z</sub></span>\n                <div class=\"math-display\">\n                  E<sub>z</sub> = <span class=\"math-frac\"><span class=\"math-num\">ρ<sub>l</sub></span><span class=\"math-den\">4πε₀</span></span> ∫<sub>0</sub><sup>4</sup> <span class=\"math-frac\"><span class=\"math-num\">- z' dz'</span><span class=\"math-den\">[9 + (z')²]<sup>3/2</sup></span></span><br><br>\n                  <strong>เทคนิคการเปลี่ยนตัวแปร u (u-substitution):</strong><br>\n                  ให้ <em>u</em> = 9 + (z')² &nbsp; ⇒ &nbsp; d<em>u</em> = 2 z' dz' &nbsp; (เมื่อ z'=0 ⇒ u=9, z'=4 ⇒ u=25)<br><br>\n                  = - <span class=\"math-frac\"><span class=\"math-num\">ρ<sub>l</sub></span><span class=\"math-den\">8πε₀</span></span> ∫<sub>9</sub><sup>25</sup> u<sup>-3/2</sup> du = - <span class=\"math-frac\"><span class=\"math-num\">ρ<sub>l</sub></span><span class=\"math-den\">8πε₀</span></span> [ -2 u<sup>-1/2</sup> ]<sub>9</sub><sup>25</sup><br>\n                  = <span class=\"math-frac\"><span class=\"math-num\">ρ<sub>l</sub></span><span class=\"math-den\">4πε₀</span></span> [ <span class=\"math-frac\"><span class=\"math-num\">1</span><span class=\"math-den\">√25</span></span> - <span class=\"math-frac\"><span class=\"math-num\">1</span><span class=\"math-den\">√9</span></span> ] = <span class=\"math-frac\"><span class=\"math-num\">ρ<sub>l</sub></span><span class=\"math-den\">4πε₀</span></span> [ <span class=\"math-frac\"><span class=\"math-num\">1</span><span class=\"math-den\">5</span></span> - <span class=\"math-frac\"><span class=\"math-num\">1</span><span class=\"math-den\">3</span></span> ] = <span class=\"math-frac\"><span class=\"math-num\">ρ<sub>l</sub></span><span class=\"math-den\">4πε₀</span></span> (- <span class=\"math-frac\"><span class=\"math-num\">2</span><span class=\"math-den\">15</span></span>)<br>\n                  <strong>E<sub>z</sub> = - <span class=\"math-frac\"><span class=\"math-num\">ρ<sub>l</sub></span><span class=\"math-den\">30πε₀</span></span> <strong>a</strong><sub>z</sub> V/m</strong>\n                </div>\n              </div>\n\n              <div class=\"card step-card step-essential\">\n                <span class=\"step-badge must-write\">ขั้นที่ 4: รวมเวกเตอร์สนามไฟฟ้าลัพธ์ (Final Result)</span>\n                <div class=\"math-display\" style=\"border-left-color: var(--accent);\">\n                  <strong>คำตอบสุดท้าย (ในรูปติดค่า π และ ε₀ ตามข้อกำหนด):</strong><br>\n                  <strong>E</strong> = <span class=\"math-frac\"><span class=\"math-num\">ρ<sub>l</sub></span><span class=\"math-den\">30πε₀</span></span> [ 2 <strong>a</strong><sub>y</sub> - <strong>a</strong><sub>z</sub> ] V/m<br>\n                  <em>(หรือเขียนแยก: <strong>E</strong> = <span class=\"math-frac\"><span class=\"math-num\">ρ<sub>l</sub></span><span class=\"math-den\">15πε₀</span></span> <strong>a</strong><sub>y</sub> - <span class=\"math-frac\"><span class=\"math-num\">ρ<sub>l</sub></span><span class=\"math-den\">30πε₀</span></span> <strong>a</strong><sub>z</sub> โวลต์ต่อเมตร)</em>\n                </div>\n              </div>\n            ")
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
            question: ("จงหาความต่างศักย์ระหว่างจุด A และ B (V<sub>AB</sub>) เมื่อจุด A คือจุดที่มีระยะในแนวรัศมี <em>r</em> = <em>r</em><sub>A</sub>, จุด B คือจุดที่มีระยะในแนวรัศมี <em>r</em> = <em>r</em><sub>B</sub> ท่ามกลางความหนาแน่นฟลักซ์ไฟฟ้า<div class=\"math-display\" style=\"margin: 10px 0; padding: 12px 16px;\"><strong>D</strong> = <span class=\"math-frac\"><span class=\"math-num\"><em>r</em></span><span class=\"math-den\">(<em>r</em>² + <em>a</em>²)²</span></span> <strong>a</strong><sub>r</sub></div>ในอวกาศว่าง (เมื่อ <em>a</em> คือค่าคงตัว)"),
            rubric: [
              { id: "r41_1", label: "เขียนความสัมพันธ์ <strong>E</strong> = <strong>D</strong>/ε₀ และสูตรตั้งต้น V<sub>AB</sub> = -∫ <strong>E</strong> • d<strong>l</strong>", pts: 4 },
              { id: "r41_2", label: "แสดงการอินทิเกรตเชิงวิเคราะห์ด้วยการเปลี่ยนตัวแปร <em>u</em> = <em>r</em>² + <em>a</em>² ละเอียดทุกขั้นตอน", pts: 5 },
              { id: "r41_3", label: "แทนค่าขอบเขต <em>r</em><sub>B</sub> ถึง <em>r</em><sub>A</sub> ได้คำตอบ V<sub>AB</sub> ถูกต้องสมบูรณ์", pts: 3 }
            ],
            solutionHtml: ("\n              <div class=\"card step-card step-essential\">\n                <span class=\"step-badge must-write\">ขั้นที่ 1: เขียนสูตรตั้งต้นทั่วไป (General Formulation)</span>\n                <div class=\"formula-ref-badge\">อ้างอิงใบสูตร หมวด 6: <strong>D</strong> = ε₀ <strong>E</strong> (ฟลักซ์) และ หมวด 7: V<sub>AB</sub> = -∫ <strong>E</strong> • d<strong>l</strong> (ศักย์ไฟฟ้า)</div>\n                <div class=\"math-display\">\n                  • จากใบสูตรกลางภาค: <strong>D</strong> = ε₀ <strong>E</strong> &nbsp; ⇒ &nbsp; <strong>E</strong> = <span class=\"math-frac\"><span class=\"math-num\"><strong>D</strong></span><span class=\"math-den\">ε₀</span></span> = <span class=\"math-frac\"><span class=\"math-num\"><em>r</em></span><span class=\"math-den\">ε₀ (<em>r</em>² + <em>a</em>²)²</span></span> <strong>a</strong><sub>r</sub><br>\n                  • นิยามความต่างศักย์: V<sub>AB</sub> = V<sub>A</sub> - V<sub>B</sub> = - ∫<sub>r<sub>B</sub></sub><sup>r<sub>A</sub></sup> <strong>E</strong> • d<strong>l</strong><br>\n                  • ในระบบพิกัดทรงกลมตามแนวรัศมี: d<strong>l</strong> = d<em>r</em> <strong>a</strong><sub>r</sub> &nbsp; ⇒ &nbsp; <strong>E</strong> • d<strong>l</strong> = <span class=\"math-frac\"><span class=\"math-num\"><em>r</em> d<em>r</em></span><span class=\"math-den\">ε₀ (<em>r</em>² + <em>a</em>²)²</span></span><br><br>\n                  V<sub>AB</sub> = - ∫<sub>r<sub>B</sub></sub><sup>r<sub>A</sub></sup> <span class=\"math-frac\"><span class=\"math-num\"><em>r</em> d<em>r</em></span><span class=\"math-den\">ε₀ (<em>r</em>² + <em>a</em>²)²</span></span>\n                </div>\n\n                <div class=\"technical-diagram-box\" style=\"margin: 18px 0; padding: 18px; background: var(--card-bg); border-radius: var(--radius-md); border: 1px solid var(--rule); text-align: center;\">\n                  <svg viewBox=\"0 0 820 320\" width=\"100%\" style=\"max-width: 780px; display: block; margin: 0 auto; font-family: inherit;\">\n                    <defs>\n                      <marker id=\"v-arrow-blue\" viewBox=\"0 0 10 10\" refX=\"8\" refY=\"5\" markerWidth=\"6\" markerHeight=\"6\" orient=\"auto\"><path d=\"M 0 1 L 10 5 L 0 9 z\" fill=\"var(--accent)\"/></marker>\n                      <marker id=\"v-arrow-red\" viewBox=\"0 0 10 10\" refX=\"8\" refY=\"5\" markerWidth=\"6\" markerHeight=\"6\" orient=\"auto\"><path d=\"M 0 1 L 10 5 L 0 9 z\" fill=\"var(--red)\"/></marker>\n                      <marker id=\"v-arrow-muted\" viewBox=\"0 0 10 10\" refX=\"8\" refY=\"5\" markerWidth=\"5\" markerHeight=\"5\" orient=\"auto\"><path d=\"M 0 1 L 10 5 L 0 9 z\" fill=\"var(--ink-muted)\"/></marker>\n                    </defs>\n                    <!-- LEFT PANEL: Integration Path -->\n                    <g transform=\"translate(15, 20)\">\n                      <text x=\"185\" y=\"14\" text-anchor=\"middle\" font-weight=\"700\" fill=\"var(--ink)\" font-size=\"13\">เส้นทางอินทิเกรตต้านสนามไฟฟ้า E(r)</text>\n                      <text x=\"185\" y=\"32\" text-anchor=\"middle\" font-weight=\"600\" fill=\"var(--ink-soft)\" font-size=\"11\">เลื่อนประจุทดสอบบวกจาก B (r<tspan baseline-shift=\"sub\" font-size=\"75%\">B</tspan>) เข้าหา A (r<tspan baseline-shift=\"sub\" font-size=\"75%\">A</tspan>)</text>\n                      <!-- Center Origin -->\n                      <circle cx=\"185\" cy=\"150\" r=\"4\" fill=\"var(--ink-muted)\"/>\n                      <circle cx=\"185\" cy=\"150\" r=\"60\" stroke=\"var(--accent)\" stroke-width=\"1.5\" stroke-dasharray=\"4,4\" fill=\"none\"/>\n                      <circle cx=\"185\" cy=\"150\" r=\"115\" stroke=\"var(--accent2)\" stroke-width=\"1.5\" stroke-dasharray=\"4,4\" fill=\"none\"/>\n                      <text x=\"185\" y=\"170\" text-anchor=\"middle\" fill=\"var(--ink-soft)\" font-size=\"10\">r = 0</text>\n                      <!-- Points A and B -->\n                      <circle cx=\"245\" cy=\"150\" r=\"5\" fill=\"var(--accent)\"/>\n                      <text x=\"245\" y=\"136\" text-anchor=\"middle\" fill=\"var(--accent)\" font-size=\"11\" font-weight=\"800\">A (r<tspan baseline-shift=\"sub\" font-size=\"75%\">A</tspan>)</text>\n                      <circle cx=\"300\" cy=\"150\" r=\"5\" fill=\"var(--accent2)\"/>\n                      <text x=\"300\" y=\"136\" text-anchor=\"middle\" fill=\"var(--accent2)\" font-size=\"11\" font-weight=\"800\">B (r<tspan baseline-shift=\"sub\" font-size=\"75%\">B</tspan>)</text>\n                      <!-- E Field Vector -->\n                      <line x1=\"300\" y1=\"150\" x2=\"360\" y2=\"150\" stroke=\"var(--accent)\" stroke-width=\"2.5\" marker-end=\"url(#v-arrow-blue)\"/>\n                      <text x=\"365\" y=\"145\" fill=\"var(--accent)\" font-size=\"11\" font-weight=\"700\">E(r) a<tspan baseline-shift=\"sub\" font-size=\"75%\">r</tspan></text>\n                      <!-- Path vector dl -->\n                      <line x1=\"300\" y1=\"172\" x2=\"248\" y2=\"172\" stroke=\"var(--red)\" stroke-width=\"3\" marker-end=\"url(#v-arrow-red)\"/>\n                      <text x=\"274\" y=\"194\" text-anchor=\"middle\" fill=\"var(--red)\" font-size=\"11\" font-weight=\"700\">dl = dr a<tspan baseline-shift=\"sub\" font-size=\"75%\">r</tspan> (B → A)</text>\n                      <!-- Annotation box -->\n                      <rect x=\"20\" y=\"244\" width=\"330\" height=\"28\" rx=\"4\" fill=\"rgba(198,40,40,0.08)\" stroke=\"var(--red)\" stroke-width=\"0.8\"/>\n                      <text x=\"185\" y=\"262\" text-anchor=\"middle\" fill=\"var(--red)\" font-size=\"10.5\" font-weight=\"600\">เคลื่อนสวนสนาม E ⇒ แรงภายนอกทำงาน (W &gt; 0) ⇒ V<tspan baseline-shift=\"sub\" font-size=\"75%\">AB</tspan> &gt; 0</text>\n                    </g>\n                    <!-- Divider -->\n                    <line x1=\"395\" y1=\"30\" x2=\"395\" y2=\"295\" stroke=\"var(--rule)\" stroke-width=\"1\" stroke-dasharray=\"4,4\"/>\n                    <!-- RIGHT PANEL: Potential Curve V(r) -->\n                    <g transform=\"translate(415, 20)\">\n                      <text x=\"195\" y=\"14\" text-anchor=\"middle\" font-weight=\"700\" fill=\"var(--ink)\" font-size=\"13\">กราฟศักย์ไฟฟ้า V(r) และอุปมาเข็นบอลขึ้นเนินเขา</text>\n                      <text x=\"195\" y=\"32\" text-anchor=\"middle\" font-weight=\"600\" fill=\"var(--ink-soft)\" font-size=\"11\">ศักย์ไฟฟ้าสูงขึ้นเมื่อเข้าใกล้ศูนย์กลาง (V<tspan baseline-shift=\"sub\" font-size=\"75%\">A</tspan> &gt; V<tspan baseline-shift=\"sub\" font-size=\"75%\">B</tspan>)</text>\n                      <!-- Axes -->\n                      <line x1=\"45\" y1=\"230\" x2=\"345\" y2=\"230\" stroke=\"var(--rule)\" stroke-width=\"1.5\" marker-end=\"url(#v-arrow-muted)\"/>\n                      <line x1=\"45\" y1=\"230\" x2=\"45\" y2=\"45\" stroke=\"var(--rule)\" stroke-width=\"1.5\" marker-end=\"url(#v-arrow-muted)\"/>\n                      <text x=\"350\" y=\"234\" fill=\"var(--ink-soft)\" font-size=\"12\">r</text>\n                      <text x=\"38\" y=\"38\" fill=\"var(--ink-soft)\" font-size=\"12\">V(r)</text>\n                      <!-- Hyperbolic potential curve -->\n                      <path d=\"M 50 68 Q 115 138 200 190 T 330 216\" stroke=\"var(--accent)\" stroke-width=\"3\" fill=\"none\"/>\n                      <!-- Point A on Curve -->\n                      <circle cx=\"115\" cy=\"138\" r=\"5\" fill=\"var(--accent)\"/>\n                      <line x1=\"115\" y1=\"138\" x2=\"115\" y2=\"230\" stroke=\"var(--accent)\" stroke-width=\"1\" stroke-dasharray=\"3,3\"/>\n                      <text x=\"115\" y=\"244\" text-anchor=\"middle\" fill=\"var(--accent)\" font-size=\"10.5\" font-weight=\"700\">r<tspan baseline-shift=\"sub\" font-size=\"75%\">A</tspan></text>\n                      <text x=\"115\" y=\"122\" text-anchor=\"middle\" fill=\"var(--accent)\" font-size=\"11\" font-weight=\"700\">V(r<tspan baseline-shift=\"sub\" font-size=\"75%\">A</tspan>)</text>\n                      <!-- Point B on Curve -->\n                      <circle cx=\"215\" cy=\"194\" r=\"5\" fill=\"var(--accent2)\"/>\n                      <line x1=\"215\" y1=\"194\" x2=\"215\" y2=\"230\" stroke=\"var(--accent2)\" stroke-width=\"1\" stroke-dasharray=\"3,3\"/>\n                      <text x=\"215\" y=\"244\" text-anchor=\"middle\" fill=\"var(--accent2)\" font-size=\"10.5\" font-weight=\"700\">r<tspan baseline-shift=\"sub\" font-size=\"75%\">B</tspan></text>\n                      <text x=\"238\" y=\"190\" fill=\"var(--accent2)\" font-size=\"11\" font-weight=\"700\">V(r<tspan baseline-shift=\"sub\" font-size=\"75%\">B</tspan>)</text>\n                      <!-- Motion Arrow Uphill -->\n                      <line x1=\"215\" y1=\"190\" x2=\"135\" y2=\"148\" stroke=\"var(--red)\" stroke-width=\"2.5\" stroke-dasharray=\"4,3\" marker-end=\"url(#v-arrow-red)\"/>\n                      <text x=\"205\" y=\"152\" fill=\"var(--red)\" font-size=\"10.5\" font-weight=\"700\">เข็นประจุขึ้นเนินเขา (V<tspan baseline-shift=\"sub\" font-size=\"75%\">A</tspan> &gt; V<tspan baseline-shift=\"sub\" font-size=\"75%\">B</tspan>)</text>\n                      <!-- Caption Box -->\n                      <rect x=\"40\" y=\"244\" width=\"310\" height=\"28\" rx=\"4\" fill=\"rgba(21,101,192,0.08)\" stroke=\"var(--accent)\" stroke-width=\"0.8\"/>\n                      <text x=\"195\" y=\"262\" text-anchor=\"middle\" fill=\"var(--accent)\" font-size=\"10.5\" font-weight=\"600\">ศักย์สัมบูรณ์: V(r) = 1 / [2ε₀(r² + a²)] โวลต์ (V)</text>\n                    </g>\n                  </svg>\n                  <div style=\"font-size: 0.84rem; color: var(--ink-soft); margin-top: 8px;\">รูปที่ 4.1: แผนภาพแสดงเส้นทางอินทิเกรตต้านสนามไฟฟ้า <strong>E</strong>(r) กราฟศักย์ไฟฟ้า V(r) และอุปมาการเข็นวัตถุขึ้นเขา</div>\n                </div>\n              </div>\n\n              <div class=\"card step-card step-essential\">\n                <span class=\"step-badge must-write\">ขั้นที่ 2: แสดงการอินทิเกรตเชิงวิเคราะห์ (Analytical Hand-Integration)</span>\n                <p>ให้ <em>u</em> = <em>r</em>² + <em>a</em>² &nbsp; ⇒ &nbsp; d<em>u</em> = 2<em>r</em> d<em>r</em> &nbsp; ⇒ &nbsp; <em>r</em> d<em>r</em> = <span class=\"math-frac\"><span class=\"math-num\">d<em>u</em></span><span class=\"math-den\">2</span></span></p>\n                <div class=\"math-display\">\n                  V<sub>AB</sub> = - <span class=\"math-frac\"><span class=\"math-num\">1</span><span class=\"math-den\">2ε₀</span></span> ∫ u<sup>-2</sup> du = - <span class=\"math-frac\"><span class=\"math-num\">1</span><span class=\"math-den\">2ε₀</span></span> [ <span class=\"math-frac\"><span class=\"math-num\">u<sup>-1</sup></span><span class=\"math-den\">-1</span></span> ] = <span class=\"math-frac\"><span class=\"math-num\">1</span><span class=\"math-den\">2ε₀</span></span> [ <span class=\"math-frac\"><span class=\"math-num\">1</span><span class=\"math-den\">u</span></span> ]<br>\n                  = <span class=\"math-frac\"><span class=\"math-num\">1</span><span class=\"math-den\">2ε₀</span></span> [ <span class=\"math-frac\"><span class=\"math-num\">1</span><span class=\"math-den\">r² + a²</span></span> ]<sub>r<sub>B</sub></sub><sup>r<sub>A</sub></sup><br><br>\n                  <strong>ตอบ: V<sub>AB</sub> = <span class=\"math-frac\"><span class=\"math-num\">1</span><span class=\"math-den\">2ε₀</span></span> [ <span class=\"math-frac\"><span class=\"math-num\">1</span><span class=\"math-den\">r<sub>A</sub>² + a²</span></span> - <span class=\"math-frac\"><span class=\"math-num\">1</span><span class=\"math-den\">r<sub>B</sub>² + a²</span></span> ] โวลต์ (V)</strong>\n                </div>\n              </div>\n            ")
          },
          {
            partId: "4.2",
            points: 8,
            question: "ถ้า r<sub>A</sub> &lt; r<sub>B</sub> ความต่างศักย์ V<sub>AB</sub> ที่หาได้ในข้อ 4.1 มีค่าเป็นบวกหรือลบ ทำไมจึงเป็นเช่นนั้น และยกอุปมาประกอบ",
            rubric: [
              { id: "r42_1", label: "ระบุชัดเจนว่า V<sub>AB</sub> มีค่าเป็น 'บวก' (Positive)", pts: 2 },
              { id: "r42_2", label: "อธิบายเหตุผลทางฟิสิกส์ว่าการเลื่อนประจุทดสอบบวกจาก B เข้าหา A สวนทิศทางสนามไฟฟ้า ต้องมีแรงภายนอกทำงานต้านสนาม", pts: 3 },
              { id: "r42_3", label: "ยกอุปมาประกอบที่ถูกต้อง เช่น การเข็นวัตถุขึ้นภูเขาต้านแรงโน้มถ่วง หรือการออกแรงอัดสปริง", pts: 3 }
            ],
            solutionHtml: ("\n              <div class=\"card step-card step-essential\">\n                <span class=\"step-badge must-write\">คำตอบและเหตุผลทางฟิสิกส์ (Physical Meaning)</span>\n                <p><strong>1) เครื่องหมายของ V<sub>AB</sub>:</strong> มีค่าเป็น <strong>บวก (+) เสมอ</strong></p>\n                <div class=\"math-display\">\n                  เมื่อ <em>r</em><sub>A</sub> &lt; <em>r</em><sub>B</sub> จะได้ <em>r</em><sub>A</sub>² + <em>a</em>² &lt; <em>r</em><sub>B</sub>² + <em>a</em>²<br>\n                  ทำให้ <span class=\"math-frac\"><span class=\"math-num\">1</span><span class=\"math-den\"><em>r</em><sub>A</sub>² + <em>a</em>²</span></span> &gt; <span class=\"math-frac\"><span class=\"math-num\">1</span><span class=\"math-den\"><em>r</em><sub>B</sub>² + <em>a</em>²</span></span><br><br>\n                  ส่งผลให้ <strong>V<sub>AB</sub> = <span class=\"math-frac\"><span class=\"math-num\">1</span><span class=\"math-den\">2ε₀</span></span> [ <span class=\"math-frac\"><span class=\"math-num\">1</span><span class=\"math-den\"><em>r</em><sub>A</sub>² + <em>a</em>²</span></span> - <span class=\"math-frac\"><span class=\"math-num\">1</span><span class=\"math-den\"><em>r</em><sub>B</sub>² + <em>a</em>²</span></span> ] &gt; 0</strong> (เป็นบวก)\n                </div>\n\n                <p><strong>2) เหตุผลทางฟิสิกส์ (Physical Reason):</strong></p>\n                <p>สนามไฟฟ้า <strong>E</strong> มีทิศพุ่งออกจากจุดศูนย์กลาง (ตามแนว +<strong>a</strong><sub>r</sub>) เมื่อเราเลื่อนประจุทดสอบบวกจากจุด B เข้าสู่จุด A ซึ่งอยู่ใกล้ศูนย์กลางมากกว่า (<em>r</em><sub>A</sub> &lt; <em>r</em><sub>B</sub>) ทิศทางการเคลื่อนที่ d<strong>l</strong> จะสวนทางกับแรงของสนามไฟฟ้า จึงต้องมี <strong>แรงภายนอกทำงานต้านสนามไฟฟ้า (External Work Done, W<sub>ext</sub> &gt; 0)</strong> พลังงานนี้จะถูกสะสมเป็นพลังงานศักย์ไฟฟ้า ทำให้ศักย์ที่จุดปลายทางสูงกว่าจุดเริ่มต้น (V<sub>A</sub> &gt; V<sub>B</sub> ⇒ V<sub>AB</sub> = V<sub>A</sub> - V<sub>B</sub> &gt; 0)</p>\n\n                <p><strong>3) อุปมาประกอบ (Physical Analogy):</strong></p>\n                <p>เปรียบเสมือน <strong>การเข็นลูกบอลขึ้นภูเขาต้านแรงโน้มถ่วงของโลก</strong> หรือ <strong>การออกแรงดันลูกสูบเพื่ออัดสปริงให้หดตัว</strong> งานที่แรงภายนอกทำเพื่อต้านแรงสนามจะถูกเก็บสะสมเป็นพลังงานศักย์ที่มีค่าเพิ่มขึ้นเป็นบวก</p>\n              </div>\n            ")
          },
          {
            partId: "4.3",
            points: 5,
            question: "จงหาศักย์ไฟฟ้าสัมบูรณ์ (Absolute Potential V(r)) ในปัญหานี้ เทียบกับจุดอ้างอิงที่ระยะอนันต์",
            rubric: [
              { id: "r43_1", label: "ใช้นิยามศักย์ไฟฟ้าสัมบูรณ์เทียบระยะอนันต์ V(r) = -∫ <strong>E</strong> • d<strong>l</strong>", pts: 2 },
              { id: "r43_2", label: "แทนค่าและประเมินลิมิตที่ระยะอนันต์ได้ V(r) = <span class=\"math-frac\"><span class=\"math-num\">1</span><span class=\"math-den\">2ε₀(r² + a²)</span></span> โวลต์", pts: 3 }
            ],
            solutionHtml: ("\n              <div class=\"card step-card step-essential\">\n                <span class=\"step-badge must-write\">การหาศักย์ไฟฟ้าสัมบูรณ์เทียบระยะอนันต์</span>\n                <p>กำหนดให้จุดอ้างอิงอยู่ที่ระยะอนันต์ (<em>r</em><sub>ref</sub> = ∞ ซึ่งมี V(∞) = 0):</p>\n                <div class=\"math-display\">\n                  V(r) = - ∫<sub>∞</sub><sup>r</sup> <strong>E</strong> • d<strong>l</strong> = <span class=\"math-frac\"><span class=\"math-num\">1</span><span class=\"math-den\">2ε₀</span></span> [ <span class=\"math-frac\"><span class=\"math-num\">1</span><span class=\"math-den\">r² + a²</span></span> - <span class=\"math-frac\"><span class=\"math-num\">1</span><span class=\"math-den\">∞² + a²</span></span> ]<br><br>\n                  เนื่องจาก <span class=\"math-frac\"><span class=\"math-num\">1</span><span class=\"math-den\">∞</span></span> = 0<br><br>\n                  <strong>ตอบ: V(r) = <span class=\"math-frac\"><span class=\"math-num\">1</span><span class=\"math-den\">2ε₀ (r² + a²)</span></span> โวลต์ (V)</strong>\n                </div>\n              </div>\n            ")
          }
        ]
      }
    ];
  }

  initDOM() {
    this.timerEl = document.getElementById('exam-timer');
    this.miniTimerEl = document.getElementById('mini-exam-timer');
    this.timerPulseEl = document.getElementById('timer-pulse');
    this.miniTimerPulseEl = document.getElementById('mini-timer-pulse');
    this.sidebarTotalScoreEl = document.getElementById('sidebar-total-score');
    this.miniTotalScoreEl = document.getElementById('mini-total-score');
    this.sidebarProgressEl = document.getElementById('sidebar-score-progress');
    this.sidebarQListEl = document.getElementById('sidebar-q-list');

    this.qContentEl = document.getElementById('exam-question-content');
    this.qNavGridEl = document.getElementById('exam-nav-grid');

    // Responsive initial collapse state
    const sidebar = document.getElementById('exam-sidebar');
    if (window.innerWidth <= 768) {
      if (sidebar) sidebar.classList.add('collapsed');
      this.isSidebarCollapsed = true;
    } else {
      if (sidebar) sidebar.classList.remove('collapsed');
      this.isSidebarCollapsed = false;
    }

    this.renderSidebarQList();
    this.renderNavGrid();
    this.renderQuestion(0);
    this.updateTimerDisplay();
    this.updateScoreDisplays();
  }

  initSidebarToggle() {
    const toggleBtn = document.getElementById('btn-toggle-sidebar');
    const miniExpandBtn = document.getElementById('mini-btn-expand');
    const miniTimerCapsule = document.getElementById('mini-timer-capsule');
    const sidebar = document.getElementById('exam-sidebar');

    const setCollapsedState = (collapsed) => {
      this.isSidebarCollapsed = collapsed;
      if (sidebar) sidebar.classList.toggle('collapsed', collapsed);

      if (toggleBtn) {
        const iconSpan = toggleBtn.querySelector('.toggle-icon');
        const textSpan = toggleBtn.querySelector('.toggle-text');
        if (collapsed) {
          if (iconSpan) iconSpan.innerText = '▶';
          if (textSpan) textSpan.innerText = 'ขยาย';
        } else {
          if (iconSpan) iconSpan.innerText = '◀';
          if (textSpan) textSpan.innerText = 'ย่อ';
        }
      }
    };

    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        setCollapsedState(!this.isSidebarCollapsed);
      });
    }

    if (miniExpandBtn) {
      miniExpandBtn.addEventListener('click', () => {
        setCollapsedState(false);
      });
    }

    if (miniTimerCapsule) {
      miniTimerCapsule.addEventListener('click', () => {
        setCollapsedState(false);
      });
    }

    // Mini question selectors (Vertical Tool Palette items)
    const miniQBtns = document.querySelectorAll('[data-mini-q]');
    miniQBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const qIdx = parseInt(btn.getAttribute('data-mini-q'), 10);
        this.renderQuestion(qIdx);
      });
    });

    // Mini timer play button
    const miniPauseBtn = document.getElementById('mini-btn-pause');
    const mainPauseBtn = document.getElementById('btn-pause-timer');
    if (miniPauseBtn && mainPauseBtn) {
      miniPauseBtn.addEventListener('click', () => {
        mainPauseBtn.click();
      });
    }

    // Mini formula modal button
    const miniFormulaBtn = document.getElementById('mini-btn-formula');
    const mainFormulaBtn = document.getElementById('btn-open-formula-modal');
    if (miniFormulaBtn && mainFormulaBtn) {
      miniFormulaBtn.addEventListener('click', () => {
        mainFormulaBtn.click();
      });
    }
  }

  startTimer() {
    if (this.timerInterval) clearInterval(this.timerInterval);
    this.isPaused = false;
    this.timerStarted = true;
    if (this.timerPulseEl) this.timerPulseEl.classList.remove('paused');
    if (this.miniTimerPulseEl) this.miniTimerPulseEl.classList.remove('paused');
    this.timerInterval = setInterval(() => {
      if (!this.isPaused && this.remainingSeconds > 0) {
        this.remainingSeconds--;
        this.updateTimerDisplay();
      } else if (this.remainingSeconds <= 0) {
        clearInterval(this.timerInterval);
        alert('หมดเวลาการทำข้อสอบ 3 ชั่วโมง!');
      }
    }, 1000);
  }

  pauseTimer() {
    this.isPaused = true;
    if (this.timerPulseEl) this.timerPulseEl.classList.add('paused');
    if (this.miniTimerPulseEl) this.miniTimerPulseEl.classList.add('paused');
  }

  updateTimerDisplay() {
    const hrs = Math.floor(this.remainingSeconds / 3600);
    const mins = Math.floor((this.remainingSeconds % 3600) / 60);
    const secs = this.remainingSeconds % 60;
    const fullTimeStr = ("").concat(String(hrs).padStart(2, '0')).concat(":").concat(String(mins).padStart(2, '0')).concat(":").concat(String(secs).padStart(2, '0')).concat("");
    const miniTimeStr = ("").concat(String(hrs * 60 + mins).padStart(2, '0')).concat(":").concat(String(secs).padStart(2, '0')).concat("");
    
    if (this.timerEl) this.timerEl.innerText = fullTimeStr;
    if (this.miniTimerEl) this.miniTimerEl.innerText = miniTimeStr;

    if (this.timerPulseEl) {
      this.timerPulseEl.classList.toggle('paused', this.isPaused || !this.timerStarted);
    }
    if (this.miniTimerPulseEl) {
      this.miniTimerPulseEl.classList.toggle('paused', this.isPaused || !this.timerStarted);
    }

    const miniPauseIcon = document.getElementById('mini-pause-icon');
    if (miniPauseIcon) {
      if (!this.timerStarted || this.isPaused) {
        miniPauseIcon.innerHTML = '<polygon points="5 3 19 12 5 21 5 3"></polygon>';
      } else {
        miniPauseIcon.innerHTML = '<rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect>';
      }
    }
  }

  renderSidebarQList() {
    if (!this.sidebarQListEl) return;
    this.sidebarQListEl.innerHTML = '';
    this.questions.forEach((q, idx) => {
      const totalQPoints = q.parts.reduce((sum, p) => sum + p.points, 0);
      const earnedQPoints = this.calculateQuestionEarnedPoints(idx);

      const item = document.createElement('button');
      item.className = ("sidebar-q-item ").concat(idx === this.currentQIndex ? 'active' : '').concat("");
      item.type = 'button';
      item.innerHTML = ("\n        <span>ข้อ ").concat(q.id).concat("</span>\n        <span class=\"sidebar-q-pts-badge\">").concat(earnedQPoints).concat("/").concat(totalQPoints).concat(" คะแนน</span>\n      ");
      item.addEventListener('click', () => this.renderQuestion(idx));
      this.sidebarQListEl.appendChild(item);
    });

    // Update mini q buttons in vertical tool palette
    const miniQBtns = document.querySelectorAll('[data-mini-q]');
    miniQBtns.forEach((btn, idx) => {
      btn.classList.toggle('active', idx === this.currentQIndex);
    });
  }

  renderNavGrid() {
    if (!this.qNavGridEl) return;
    this.qNavGridEl.innerHTML = '';
    this.questions.forEach((q, idx) => {
      const totalQPoints = q.parts.reduce((sum, p) => sum + p.points, 0);
      const earnedQPoints = this.calculateQuestionEarnedPoints(idx);

      const btn = document.createElement('button');
      btn.className = ("q-nav-btn ").concat(idx === this.currentQIndex ? 'active' : '').concat("");
      btn.innerHTML = ("\n        <span>ข้อ ").concat(q.id).concat(" (").concat(totalQPoints).concat(" คะแนน)</span>\n        <span style=\"font-size: 0.76rem; opacity: 0.85; margin-left: 6px;\">[ได้: ").concat(earnedQPoints).concat("/").concat(totalQPoints).concat("]</span>\n      ");
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

  updateScoreDisplays() {
    const totalExamEarned = this.calculateTotalEarnedPoints();
    if (this.sidebarTotalScoreEl) this.sidebarTotalScoreEl.innerText = totalExamEarned;
    if (this.miniTotalScoreEl) this.miniTotalScoreEl.innerText = totalExamEarned;
    if (this.sidebarProgressEl) {
      const pct = Math.min(100, (totalExamEarned / 100) * 100);
      this.sidebarProgressEl.style.width = ("").concat(pct).concat("%");
    }
    const mainTotalScore = document.getElementById('total-score-display');
    if (mainTotalScore) mainTotalScore.innerText = totalExamEarned;

    this.renderSidebarQList();
    this.renderNavGrid();
  }

  renderQuestion(index) {
    this.currentQIndex = index;
    const q = this.questions[index];
    if (!this.qContentEl || !q) return;

    this.renderSidebarQList();
    this.renderNavGrid();

    const totalExamEarned = this.calculateTotalEarnedPoints();
    const currentQEarned = this.calculateQuestionEarnedPoints(index);
    const currentQMax = q.parts.reduce((sum, p) => sum + p.points, 0);

    let partsHtml = '';
    q.parts.forEach(p => {
      let rubricHtml = '';
      p.rubric.forEach(r => {
        const isChecked = !!this.userScores[r.id];
        rubricHtml += ("\n          <div class=\"rubric-item\" style=\"display: flex; align-items: center; justify-content: space-between; padding: 8px 12px; background: ").concat(isChecked ? 'rgba(46,125,50,0.08)' : 'var(--paper)').concat("; border-radius: var(--radius-sm); margin-bottom: 6px; border: 1px solid ").concat(isChecked ? 'var(--green)' : 'var(--rule)').concat(";\">\n            <label style=\"display: flex; align-items: center; gap: 10px; cursor: pointer; flex: 1;\">\n              <input type=\"checkbox\" class=\"rubric-checkbox\" data-rubric-id=\"").concat(r.id).concat("\" ").concat(isChecked ? 'checked' : '').concat(" style=\"width: 18px; height: 18px; cursor: pointer;\">\n              <span style=\"font-size: 0.92rem; color: var(--ink); line-height: 1.5;\">").concat(r.label).concat("</span>\n            </label>\n            <span class=\"rubric-points\" style=\"font-weight: 700; color: ").concat(isChecked ? 'var(--green)' : 'var(--accent)').concat("; white-space: nowrap; margin-left: 12px;\">+").concat(r.pts).concat(" คะแนน</span>\n          </div>\n        ");
      });

      partsHtml += ("\n        <div class=\"quiz-card\" style=\"margin-bottom: 24px;\">\n          <div class=\"quiz-header\">\n            <h3 style=\"font-size: 1.10rem; font-weight: 800; color: var(--accent);\">ตอนที่ ").concat(p.partId).concat("</h3>\n            <span class=\"quiz-points\" style=\"font-size: 0.90rem; background: var(--accent2-bg); padding: 4px 10px; border-radius: var(--radius-sm); border: 1px solid var(--accent2);\">เต็ม ").concat(p.points).concat(" คะแนน</span>\n          </div>\n          <div style=\"font-size: 1.02rem; font-weight: 600; line-height: 1.7; margin-bottom: 14px; color: var(--ink);\">").concat(p.question).concat("</div>\n          \n          <div class=\"rubric-checklist\" style=\"background: var(--paper2); padding: 14px; border-radius: var(--radius-md); border: 1px solid var(--rule);\">\n            <div style=\"font-weight: 800; font-size: 0.90rem; color: var(--ink); margin-bottom: 10px; display: flex; justify-content: space-between; align-items: center;\">\n              <span>เกณฑ์การตรวจและประเมินผลตามกระดาษคำตอบ (Strict Rubric Checklist):</span>\n              <span style=\"font-size: 0.82rem; color: var(--ink-soft); font-weight: normal;\">(ติ๊กถูกเมื่อคุณเขียนส่วนนั้นลงบนกระดาษ)</span>\n            </div>\n            ").concat(rubricHtml).concat("\n          </div>\n\n          <div class=\"accordion\" style=\"margin-top: 16px;\">\n            <div class=\"accordion-header\">\n              <span>เฉลยและวิธีทำอย่างละเอียดทุกขั้นตอน (Step-by-Step Analytical Solution)</span>\n              <span class=\"accordion-icon\">▼</span>\n            </div>\n            <div class=\"accordion-body\">\n              ").concat(p.solutionHtml).concat("\n            </div>\n          </div>\n        </div>\n      ");
    });

    this.qContentEl.innerHTML = ("\n      <div style=\"display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; flex-wrap: wrap; gap: 10px; background: var(--card-bg); padding: 16px 20px; border-radius: var(--radius-md); border: 1.5px solid var(--rule);\">\n        <div>\n          <h2 class=\"section-title\" style=\"margin: 0; padding: 0; border: none; font-size: 1.30rem;\">").concat(q.title).concat("</h2>\n          <div style=\"font-size: 0.88rem; color: var(--ink-soft); margin-top: 4px;\" data-current-q-score>คะแนนในข้อนี้: <strong style=\"color: var(--accent);\">").concat(currentQEarned).concat(" / ").concat(currentQMax).concat("</strong></div>\n        </div>\n        <div style=\"text-align: right;\">\n          <div style=\"font-size: 0.84rem; color: var(--ink-soft);\">คะแนนรวมทั้งชุด 4 ข้อ:</div>\n          <div style=\"font-size: 1.35rem; font-weight: 900; color: var(--accent);\"><span id=\"total-score-display\">").concat(totalExamEarned).concat("</span> / 100</div>\n        </div>\n      </div>\n      ").concat(partsHtml).concat("\n    ");

    // Add Rubric checkbox listeners
    const checkboxes = this.qContentEl.querySelectorAll('.rubric-checkbox');
    checkboxes.forEach(cb => {
      cb.addEventListener('change', (e) => {
        const rId = e.target.getAttribute('data-rubric-id');
        const isChecked = e.target.checked;
        this.userScores[rId] = isChecked;

        // Update ONLY the rubric-item visual style
        const rubricItem = e.target.closest('.rubric-item');
        if (rubricItem) {
          rubricItem.style.background = isChecked ? 'rgba(46,125,50,0.08)' : 'var(--paper)';
          rubricItem.style.borderColor = isChecked ? 'var(--green)' : 'var(--rule)';
          const ptsSpan = rubricItem.querySelector('.rubric-points');
          if (ptsSpan) ptsSpan.style.color = isChecked ? 'var(--green)' : 'var(--accent)';
        }

        // Update score displays
        const currentQEarned = this.calculateQuestionEarnedPoints(this.currentQIndex);
        const currentQMax = this.questions[this.currentQIndex].parts.reduce((s, p) => s + p.points, 0);

        // Update question-level score display
        const qScoreEl = this.qContentEl.querySelector('[data-current-q-score]');
        if (qScoreEl) qScoreEl.innerHTML = ("คะแนนในข้อนี้: <strong style=\"color: var(--accent);\">").concat(currentQEarned).concat(" / ").concat(currentQMax).concat("</strong>");

        this.updateScoreDisplays();
      });
    });

    // Re-init accordions and restore open state
    if (window.initAccordions) window.initAccordions();
    const allAccordions = this.qContentEl.querySelectorAll('.accordion');
    allAccordions.forEach((acc, idx) => {
      const key = ("").concat(this.currentQIndex).concat("_").concat(idx).concat("");
      if (this.openAccordions.has(key)) {
        acc.classList.add('open');
      }
      const header = acc.querySelector('.accordion-header');
      if (header) {
        header.addEventListener('click', () => {
          setTimeout(() => {
            if (acc.classList.contains('open')) {
              this.openAccordions.add(key);
            } else {
              this.openAccordions.delete(key);
            }
          }, 50);
        });
      }
    });
  }
}

window.ExamEngine = ExamEngine;
