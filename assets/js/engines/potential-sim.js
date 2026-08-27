/**
 * 303214 สนามแม่เหล็กไฟฟ้า 1 (Electromagnetic Fields I)
 * Simulator Module: Electric Potential, Gradient Field & Work Energy (Chapter 9)
 * จำลองผิวสมศักย์ (Equipotential Surfaces), เวกเตอร์เกรเดียนต์ E = -∇V, และคำนวณงานในการเลื่อนประจุ W = -Q ∫ E • dl แบบเรียลไทม์
 */

class PotentialSimEngine {
  constructor(canvasId, outputId) {
    this.core = new Vector3DCore(canvasId, { scale: 35, rotX: 0.38, rotY: -0.58 });
    this.outputEl = typeof outputId === 'string' ? document.getElementById(outputId) : outputId;

    this.bindInputs();
    this.bindHUD();
    this.bindPresets();
    this.update();
  }

  bindInputs() {
    const ids = [
      'pot-preset', 'pot-q', 'pt-a-x', 'pt-a-y', 'pt-a-z',
      'pt-b-x', 'pt-b-y', 'pt-b-z', 'test-q'
    ];
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener('input', () => this.update());
        el.addEventListener('change', () => this.update());
      }
    });
  }

  bindHUD() {
    document.getElementById('hud-zoom-in')?.addEventListener('click', () => this.core.zoomIn());
    document.getElementById('hud-zoom-out')?.addEventListener('click', () => this.core.zoomOut());
    document.getElementById('hud-reset')?.addEventListener('click', () => this.core.resetView());

    document.querySelectorAll('[data-preset-view]').forEach(btn => {
      btn.addEventListener('click', () => {
        const view = btn.getAttribute('data-preset-view');
        this.core.setPresetView(view);
        document.querySelectorAll('[data-preset-view]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });
  }

  bindPresets() {
    document.querySelectorAll('[data-pot-preset]').forEach(btn => {
      btn.addEventListener('click', () => {
        const preset = btn.getAttribute('data-pot-preset');
        this.applyPreset(preset);
      });
    });
  }

  applyPreset(preset) {
    if (preset === 'lecture-grad') {
      // Lecture Example: V = 2x^2 y - 5z at P(-4, 3, 6)
      this.setVal('pot-preset', 'lecture-grad');
      this.setVal('pt-a-x', -4.0);
      this.setVal('pt-a-y', 3.0);
      this.setVal('pt-a-z', 6.0);
      this.setVal('pt-b-x', 0.0);
      this.setVal('pt-b-y', 0.0);
      this.setVal('pt-b-z', 0.0);
      this.setVal('test-q', 1.0);
    } else if (preset === 'point-radial') {
      // Point charge Q = 10 nC at origin
      this.setVal('pot-preset', 'point-radial');
      this.setVal('pot-q', 10.0);
      this.setVal('pt-a-x', 1.0);
      this.setVal('pt-a-y', 0.0);
      this.setVal('pt-a-z', 0.0);
      this.setVal('pt-b-x', 3.0);
      this.setVal('pt-b-y', 0.0);
      this.setVal('pt-b-z', 0.0);
      this.setVal('test-q', 2.0); // 2 nC
    } else if (preset === 'dipole-pot') {
      // Dipole
      this.setVal('pot-preset', 'dipole');
      this.setVal('pt-a-x', 0.0);
      this.setVal('pt-a-y', 1.5);
      this.setVal('pt-a-z', 0.0);
      this.setVal('pt-b-x', 0.0);
      this.setVal('pt-b-y', -1.5);
      this.setVal('pt-b-z', 0.0);
      this.setVal('test-q', 1.0);
    } else if (preset === 'exam4') {
      // Exam Question 4: Radial field D = [r / (r^2 + a^2)^2] a_r
      this.setVal('pot-preset', 'exam4');
      this.setVal('pt-a-x', 1.0); // r_A = 1
      this.setVal('pt-a-y', 0.0);
      this.setVal('pt-a-z', 0.0);
      this.setVal('pt-b-x', 3.0); // r_B = 3
      this.setVal('pt-b-y', 0.0);
      this.setVal('pt-b-z', 0.0);
      this.setVal('test-q', 1.0);
    }
    this.update();
  }

  setVal(id, val) {
    const el = document.getElementById(id);
    if (el) el.value = val;
  }

  getValues() {
    return {
      preset: document.getElementById('pot-preset')?.value || 'point-radial',
      pot_q_nC: parseFloat(document.getElementById('pot-q')?.value) || 10,
      test_q_nC: parseFloat(document.getElementById('test-q')?.value) || 1.0,
      aPt: {
        x: parseFloat(document.getElementById('pt-a-x')?.value) || 1.0,
        y: parseFloat(document.getElementById('pt-a-y')?.value) || 0.0,
        z: parseFloat(document.getElementById('pt-a-z')?.value) || 0.0
      },
      bPt: {
        x: parseFloat(document.getElementById('pt-b-x')?.value) || 3.0,
        y: parseFloat(document.getElementById('pt-b-y')?.value) || 0.0,
        z: parseFloat(document.getElementById('pt-b-z')?.value) || 0.0
      }
    };
  }

  update() {
    const { preset, pot_q_nC, test_q_nC, aPt, bPt } = this.getValues();
    const eps0 = 8.854187817e-12;

    this.core.clear();

    // 1. Draw Equipotential Surfaces / Contours
    if (preset === 'point-radial') {
      this.drawPointEquipotentials(pot_q_nC);
    } else if (preset === 'lecture-grad') {
      this.drawLectureGradContours(aPt);
    } else if (preset === 'exam4') {
      this.drawExam4Contours();
    } else if (preset === 'dipole') {
      this.drawDipoleContours();
    }

    // 2. Draw Points A (Target) and B (Initial)
    this.core.addCharge(aPt, 1, `A (ปลายทาง)`);
    this.core.addCharge(bPt, -1, `B (เริ่มต้น)`);

    // 3. Draw Path Line from B to A (dl direction)
    this.core.addLine(bPt, aPt, '#DC2626', 2.0, [4, 2]);
    this.core.addCustomLabel(
      { x: (aPt.x + bPt.x) / 2, y: (aPt.y + bPt.y) / 2, z: (aPt.z + bPt.z) / 2 },
      'แนวการเลื่อนประจุ dl (B → A)',
      '#DC2626'
    );

    // 4. Draw Electric Field E at Point A
    const fieldAtA = this.calculateFieldAtPoint(preset, aPt, pot_q_nC, eps0);
    this.core.addVector(
      aPt,
      { x: aPt.x + fieldAtA.vec.x * 0.4, y: aPt.y + fieldAtA.vec.y * 0.4, z: aPt.z + fieldAtA.vec.z * 0.4 },
      '#047857',
      'E = -∇V',
      2.5
    );

    this.core.render();

    // 5. Calculate Potential V_A, V_B, V_AB, and Work W
    this.renderAnalytics(preset, aPt, bPt, pot_q_nC, test_q_nC, eps0, fieldAtA);
  }

  drawPointEquipotentials(q_nC) {
    this.core.addCharge({ x: 0, y: 0, z: 0 }, q_nC, `+Q (${q_nC} nC)`);
    const radii = [1.0, 2.0, 3.0];
    const colors = ['#3B82F6', '#60A5FA', '#93C5FD'];

    radii.forEach((r, idx) => {
      const segs = 32;
      const pts = [];
      for (let i = 0; i <= segs; i++) {
        const ang = (i / segs) * 2 * Math.PI;
        pts.push({ x: r * Math.cos(ang), y: r * Math.sin(ang), z: 0 });
      }
      for (let i = 0; i < pts.length - 1; i++) {
        this.core.addLine(pts[i], pts[i + 1], colors[idx], 1.2, [4, 3]);
      }
      const k = 8.98755e9;
      const vVal = (k * q_nC * 1e-9) / r;
      this.core.addCustomLabel({ x: r * 0.707, y: r * 0.707, z: 0 }, `V = ${vVal.toFixed(1)} V`, colors[idx]);
    });
  }

  drawLectureGradContours(aPt) {
    // V = 2x^2 y - 5z
    const vAtA = 2 * Math.pow(aPt.x, 2) * aPt.y - 5 * aPt.z;
    this.core.addCustomLabel({ x: aPt.x, y: aPt.y, z: aPt.z + 0.8 }, `V(A) = ${vAtA.toFixed(1)} V`, '#1E40AF');

    // Draw reference grid plane
    const size = 4;
    this.core.addLine({ x: -size, y: 0, z: 0 }, { x: size, y: 0, z: 0 }, '#94A3B8', 1.0);
    this.core.addLine({ x: 0, y: -size, z: 0 }, { x: 0, y: size, z: 0 }, '#94A3B8', 1.0);
  }

  drawExam4Contours() {
    // Concentric contours for radial field D = [r / (r^2 + a^2)^2] a_r
    const radii = [1.0, 2.0, 3.0];
    radii.forEach((r, idx) => {
      const segs = 32;
      const pts = [];
      for (let i = 0; i <= segs; i++) {
        const ang = (i / segs) * 2 * Math.PI;
        pts.push({ x: r * Math.cos(ang), y: r * Math.sin(ang), z: 0 });
      }
      for (let i = 0; i < pts.length - 1; i++) {
        this.core.addLine(pts[i], pts[i + 1], '#B45309', 1.2, [4, 3]);
      }
    });
  }

  drawDipoleContours() {
    this.core.addCharge({ x: 0, y: 1.5, z: 0 }, 5, '+Q');
    this.core.addCharge({ x: 0, y: -1.5, z: 0 }, -5, '-Q');
    // Equipotential plane at y = 0 where V = 0
    this.core.addLine({ x: -3, y: 0, z: 0 }, { x: 3, y: 0, z: 0 }, '#047857', 2.0);
    this.core.addCustomLabel({ x: 1.5, y: 0, z: 0 }, 'ระนาบสมศักย์ V = 0 V', '#047857');
  }

  calculateFieldAtPoint(preset, pt, q_nC, eps0) {
    const k = 8.98755e9;
    let vec = { x: 0, y: 0, z: 0 };
    let eMag = 0;
    let formula = '';

    if (preset === 'point-radial') {
      const r = Math.sqrt(pt.x * pt.x + pt.y * pt.y + pt.z * pt.z) || 0.01;
      const eVal = (k * q_nC * 1e-9) / (r * r);
      vec = { x: (pt.x / r) * 1.5, y: (pt.y / r) * 1.5, z: (pt.z / r) * 1.5 };
      eMag = eVal;
      formula = `<b>E</b> = <span class="math-frac"><span class="math-num">Q</span><span class="math-den">4πε₀ r²</span></span> <b>a</b><sub>r</sub>`;
    } else if (preset === 'lecture-grad') {
      // V = 2x^2 y - 5z => E = -∇V = -4xy a_x - 2x^2 a_y + 5 a_z
      const Ex = -4 * pt.x * pt.y;
      const Ey = -2 * Math.pow(pt.x, 2);
      const Ez = 5.0;
      eMag = Math.sqrt(Ex * Ex + Ey * Ey + Ez * Ez);
      const scale = 1.8 / (eMag || 1);
      vec = { x: Ex * scale, y: Ey * scale, z: Ez * scale };
      formula = `<b>E</b> = -∇V = -(${4 * pt.x * pt.y}) <b>a</b><sub>x</sub> - (${2 * pt.x * pt.x}) <b>a</b><sub>y</sub> + 5 <b>a</b><sub>z</sub> V/m`;
    } else if (preset === 'exam4') {
      // D = [r / (r^2 + a^2)^2] a_r => E = D / eps0
      const a = 1.0;
      const r = Math.sqrt(pt.x * pt.x + pt.y * pt.y + pt.z * pt.z) || 0.01;
      const D_val = r / Math.pow(r * r + a * a, 2);
      eMag = D_val / eps0;
      vec = { x: (pt.x / r) * 1.5, y: (pt.y / r) * 1.5, z: (pt.z / r) * 1.5 };
      formula = `<b>E</b> = <span class="math-frac"><span class="math-num">r</span><span class="math-den">ε₀ (r² + a²)²</span></span> <b>a</b><sub>r</sub>`;
    } else {
      vec = { x: 0, y: 1.5, z: 0 };
      eMag = 10;
    }

    return { vec, eMag, formula };
  }

  renderAnalytics(preset, aPt, bPt, q_nC, test_q_nC, eps0, fieldData) {
    if (!this.outputEl) return;

    const k = 8.98755e9;
    const test_q_C = test_q_nC * 1e-9;
    let v_A = 0, v_B = 0, v_AB = 0, work_J = 0;
    let analogyText = '';
    let natureColor = '';

    if (preset === 'point-radial') {
      const rA = Math.sqrt(aPt.x * aPt.x + aPt.y * aPt.y + aPt.z * aPt.z) || 0.01;
      const rB = Math.sqrt(bPt.x * bPt.x + bPt.y * bPt.y + bPt.z * bPt.z) || 0.01;

      v_A = (k * q_nC * 1e-9) / rA;
      v_B = (k * q_nC * 1e-9) / rB;
      v_AB = v_A - v_B;
      work_J = test_q_C * v_AB;
    } else if (preset === 'lecture-grad') {
      // V = 2x^2 y - 5z
      v_A = 2 * Math.pow(aPt.x, 2) * aPt.y - 5 * aPt.z;
      v_B = 2 * Math.pow(bPt.x, 2) * bPt.y - 5 * bPt.z;
      v_AB = v_A - v_B;
      work_J = test_q_C * v_AB;
    } else if (preset === 'exam4') {
      // V(r) = 1 / [2 eps0 (r^2 + a^2)]
      const a = 1.0;
      const rA = Math.sqrt(aPt.x * aPt.x + aPt.y * aPt.y + aPt.z * aPt.z) || 0.01;
      const rB = Math.sqrt(bPt.x * bPt.x + bPt.y * bPt.y + bPt.z * bPt.z) || 0.01;

      v_A = (1 / (2 * eps0 * (rA * rA + a * a))) * 1e-9; // normalized in nV
      v_B = (1 / (2 * eps0 * (rB * rB + a * a))) * 1e-9;
      v_AB = v_A - v_B;
      work_J = test_q_C * (v_AB * 1e9);
    }

    if (v_AB > 0.0001) {
      analogyText = 'V_AB มีค่าเป็น <strong>บวก (+)</strong>: เลื่อนประจุทวนสนามไฟฟ้า เปรียบเสมือน<strong>การเข็นลูกบอลขึ้นเนินสูง หรือการออกแรงกดสปริง</strong> (แรงภายนอกต้องทำงาน W > 0 ทำให้ระบบสะสมพลังงานศักย์สูงขึ้น)';
      natureColor = 'var(--green)';
    } else if (v_AB < -0.0001) {
      analogyText = 'V_AB มีค่าเป็น <strong>ลบ (-)</strong>: เลื่อนประจุตามแนวสนามไฟฟ้า เปรียบเสมือน<strong>ลูกบอลกลิ้งลงเนินตามแรงโน้มถ่วง</strong> (สนามไฟฟ้าทำงานเอง พลังงานศักย์ลดลง)';
      natureColor = 'var(--red)';
    } else {
      analogyText = 'V_AB = 0: จุดทั้งสองอยู่บน<strong>ผิวสมศักย์เดียวกัน (Equipotential Surface)</strong> ไม่ต้องทำงานสุทธิในการเลื่อนประจุ W = 0';
      natureColor = 'var(--accent)';
    }

    this.outputEl.innerHTML = `
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px;">
        <div class="result-item">
          <div class="res-label">1. ศักย์ไฟฟ้า ณ จุดปลายทาง A และจุดเริ่มต้น B</div>
          <div class="res-val" style="font-size: 0.95rem;">
            • V<sub>A</sub> = <strong>${v_A.toFixed(2)} V</strong> ณ A(${aPt.x}, ${aPt.y}, ${aPt.z})<br>
            • V<sub>B</sub> = <strong>${v_B.toFixed(2)} V</strong> ณ B(${bPt.x}, ${bPt.y}, ${bPt.z})
          </div>
          <p style="font-size: 0.85rem; color: var(--ink-muted); margin-top: 4px;">
            ความต่างศักย์: <strong>V<sub>AB</sub> = V<sub>A</sub> - V<sub>B</sub> = ${v_AB.toFixed(2)} V</strong>
          </p>
        </div>

        <div class="result-item">
          <div class="res-label">2. งานในการเลื่อนประจุทดสอบ q = ${test_q_nC} nC (B → A)</div>
          <div class="res-val" style="font-size: 0.95rem;">
            W = q V<sub>AB</sub> = -q ∫<sub>B</sub><sup>A</sup> <b>E</b> • d<b>l</b> = <strong>${(work_J).toExponential(3)} J</strong>
          </div>
          <p style="font-size: 0.85rem; color: var(--ink-muted); margin-top: 4px;">
            สูตรสนามไฟฟ้า: ${fieldData.formula}
          </p>
        </div>

        <div class="result-item" style="border-left-color: ${natureColor}; grid-column: 1 / -1;">
          <div class="res-label">3. การวิเคราะห์อุปมาทางฟิสิกส์เครื่องหมายบวก/ลบ (Physical Analogy)</div>
          <div class="res-val" style="color: ${natureColor}; line-height: 1.85;">
            ${analogyText}
          </div>
        </div>
      </div>
    `;
  }
}
