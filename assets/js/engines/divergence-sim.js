/**
 * 303214 สนามแม่เหล็กไฟฟ้า 1 (Electromagnetic Fields I)
 * Simulator Module: Divergence & Flux Differential Box (Chapter 8)
 * จำลองกล่องปริมาตรส่วนย่อย Δx Δy Δz, คำนวณฟลักซ์สุทธิ 6 ผิว และคำนวณ Del Operator ∇ • D = ρ_v ใน 3 ระบบพิกัด
 */

class DivergenceSimEngine {
  constructor(canvasId, outputId) {
    this.core = new Vector3DCore(canvasId, { scale: 40, rotX: 0.40, rotY: -0.55 });
    this.outputEl = typeof outputId === 'string' ? document.getElementById(outputId) : outputId;

    this.bindInputs();
    this.bindHUD();
    this.bindPresets();
    this.update();
  }

  bindInputs() {
    const ids = ['div-coordsys', 'div-preset', 'pt-x', 'pt-y', 'pt-z', 'box-size'];
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
    document.querySelectorAll('[data-div-preset]').forEach(btn => {
      btn.addEventListener('click', () => {
        const preset = btn.getAttribute('data-div-preset');
        this.applyPreset(preset);
      });
    });
  }

  applyPreset(preset) {
    if (preset === 'lecture-ex') {
      // Lecture Example: D = e^(-x) sin y a_x - e^(-x) cos y a_y + 2z a_z at origin (0,0,0)
      this.setVal('div-preset', 'lecture-ex');
      this.setVal('div-coordsys', 'cartesian');
      this.setVal('pt-x', 0.0);
      this.setVal('pt-y', 0.0);
      this.setVal('pt-z', 0.0);
      this.setVal('box-size', 1.0);
    } else if (preset === 'lecture-hw') {
      // Lecture Homework (10 pts): D = (2xyz - y^2)a_x + (x^2 z - 2xy)a_y + x^2 y a_z at P(2, 3, -1)
      this.setVal('div-preset', 'lecture-hw');
      this.setVal('div-coordsys', 'cartesian');
      this.setVal('pt-x', 2.0);
      this.setVal('pt-y', 3.0);
      this.setVal('pt-z', -1.0);
      this.setVal('box-size', 1.0);
    } else if (preset === 'radial-source') {
      // Point Source D = r a_r / 3 (uniform charge ball inside)
      this.setVal('div-preset', 'radial-uniform');
      this.setVal('div-coordsys', 'spherical');
      this.setVal('pt-x', 1.5);
      this.setVal('pt-y', 1.5);
      this.setVal('pt-z', 1.5);
      this.setVal('box-size', 0.8);
    } else if (preset === 'divergence-free') {
      // Solenoidal Field: D = y a_x + x a_y (div = 0)
      this.setVal('div-preset', 'solenoidal');
      this.setVal('div-coordsys', 'cartesian');
      this.setVal('pt-x', 1.0);
      this.setVal('pt-y', 2.0);
      this.setVal('pt-z', 0.0);
      this.setVal('box-size', 1.0);
    }
    this.update();
  }

  setVal(id, val) {
    const el = document.getElementById(id);
    if (el) el.value = val;
  }

  getValues() {
    return {
      coordsys: document.getElementById('div-coordsys')?.value || 'cartesian',
      preset: document.getElementById('div-preset')?.value || 'lecture-ex',
      x: parseFloat(document.getElementById('pt-x')?.value) || 0,
      y: parseFloat(document.getElementById('pt-y')?.value) || 0,
      z: parseFloat(document.getElementById('pt-z')?.value) || 0,
      delta: parseFloat(document.getElementById('box-size')?.value) || 1.0
    };
  }

  update() {
    const { coordsys, preset, x, y, z, delta } = this.getValues();

    this.core.clear();

    // 1. Center Point P Marker
    this.core.addCharge({ x, y, z }, 1, `P(${x.toFixed(1)}, ${y.toFixed(1)}, ${z.toFixed(1)})`);

    // 2. Draw Differential Box Δx Δy Δz around P
    this.drawDifferentialBox({ x, y, z }, delta);

    // 3. Evaluate Field Vector & Derivatives at Point P
    const fieldData = this.evaluateField(preset, coordsys, x, y, z);

    // 4. Draw flux flow arrows on 6 faces
    this.drawFaceVectors({ x, y, z }, delta, fieldData);

    this.core.render();
    this.renderAnalytics(preset, coordsys, x, y, z, delta, fieldData);
  }

  drawDifferentialBox(center, size) {
    const hs = size / 2;
    const { x, y, z } = center;

    const corners = [
      { x: x - hs, y: y - hs, z: z - hs }, // 0
      { x: x + hs, y: y - hs, z: z - hs }, // 1
      { x: x + hs, y: y + hs, z: z - hs }, // 2
      { x: x - hs, y: y + hs, z: z - hs }, // 3
      { x: x - hs, y: y - hs, z: z + hs }, // 4
      { x: x + hs, y: y - hs, z: z + hs }, // 5
      { x: x + hs, y: y + hs, z: z + hs }, // 6
      { x: x - hs, y: y + hs, z: z + hs }  // 7
    ];

    const edges = [
      [0, 1], [1, 2], [2, 3], [3, 0], // Bottom
      [4, 5], [5, 6], [6, 7], [7, 4], // Top
      [0, 4], [1, 5], [2, 6], [3, 7]  // Vertical
    ];

    edges.forEach(([i, j]) => {
      this.core.addLine(corners[i], corners[j], '#B45309', 1.5, [4, 2]);
    });

    this.core.addCustomLabel({ x: x + hs, y: y + hs, z: z + hs }, `Δv = ΔxΔyΔz (${Math.pow(size, 3).toFixed(3)} m³)`, '#B45309');
  }

  drawFaceVectors(center, size, data) {
    const hs = size / 2;
    const { x, y, z } = center;
    const arrowLen = 0.8;

    // Front (+x face)
    this.core.addVector({ x: x + hs, y, z }, { x: x + hs + arrowLen, y, z }, '#047857', 'D_front', 1.5);
    // Back (-x face)
    this.core.addVector({ x: x - hs - arrowLen, y, z }, { x: x - hs, y, z }, '#047857', 'D_back', 1.5);

    // Right (+y face)
    this.core.addVector({ x, y: y + hs, z }, { x, y: y + hs + arrowLen, z }, '#1E40AF', 'D_right', 1.5);
    // Left (-y face)
    this.core.addVector({ x, y: y - hs - arrowLen, z }, { x, y: y - hs, z }, '#1E40AF', 'D_left', 1.5);

    // Top (+z face)
    this.core.addVector({ x, y, z: z + hs }, { x, y, z: z + hs + arrowLen }, '#DC2626', 'D_top', 1.5);
    // Bottom (-z face)
    this.core.addVector({ x, y, z: z - hs - arrowLen }, { x, y, z: z - hs }, '#DC2626', 'D_bottom', 1.5);
  }

  evaluateField(preset, coordsys, x, y, z) {
    let Dx_str = '', Dy_str = '', Dz_str = '';
    let dDx_dx = 0, dDy_dy = 0, dDz_dz = 0;
    let div_val = 0;
    let explanation = '';

    if (preset === 'lecture-ex') {
      // D = e^(-x) sin y a_x - e^(-x) cos y a_y + 2z a_z
      Dx_str = 'e⁻ˣ sin y';
      Dy_str = '-e⁻ˣ cos y';
      Dz_str = '2z';

      dDx_dx = -Math.exp(-x) * Math.sin(y);
      dDy_dy = Math.exp(-x) * Math.sin(y);
      dDz_dz = 2.0;
      div_val = dDx_dx + dDy_dy + dDz_dz; // -e^-x sin y + e^-x sin y + 2 = 2
      explanation = `∂D<sub>x</sub>/∂x = -e⁻ˣ sin y, &nbsp; ∂D<sub>y</sub>/∂y = e⁻ˣ sin y, &nbsp; ∂D<sub>z</sub>/∂z = 2 <br>ผลรวม ∇ • <b>D</b> = (-e⁻ˣ sin y) + (e⁻ˣ sin y) + 2 = <strong>2 C/m³</strong> (ค่าคงตัวทุกตำแหน่ง)`;
    } else if (preset === 'lecture-hw') {
      // D = (2xyz - y^2) a_x + (x^2 z - 2xy) a_y + x^2 y a_z
      Dx_str = '2xyz - y²';
      Dy_str = 'x²z - 2xy';
      Dz_str = 'x²y';

      dDx_dx = 2 * y * z;
      dDy_dy = -2 * x;
      dDz_dz = 0;
      div_val = dDx_dx + dDy_dy + dDz_dz;
      explanation = `∂D<sub>x</sub>/∂x = 2yz = 2(${y})(${z}) = <strong>${dDx_dx.toFixed(2)}</strong><br>` +
                    `∂D<sub>y</sub>/∂y = -2x = -2(${x}) = <strong>${dDy_dy.toFixed(2)}</strong><br>` +
                    `∂D<sub>z</sub>/∂z = 0 <br>` +
                    `ผลรวม ∇ • <b>D</b> = ${dDx_dx.toFixed(2)} + (${dDy_dy.toFixed(2)}) + 0 = <strong>${div_val.toFixed(2)} C/m³</strong>`;
    } else if (preset === 'radial-uniform') {
      // D = (rho_0 r / 3) a_r in spherical (assume rho_0 = 3 => D = r a_r)
      Dx_str = 'x';
      Dy_str = 'y';
      Dz_str = 'z';

      dDx_dx = 1.0;
      dDy_dy = 1.0;
      dDz_dz = 1.0;
      div_val = 3.0;
      explanation = `ในพิกัดทรงกลม ∇ • <b>D</b> = <span class="math-frac"><span class="math-num">1</span><span class="math-den">r²</span></span> <span class="math-frac"><span class="math-num">∂</span><span class="math-den">∂r</span></span>(r² · r) = <span class="math-frac"><span class="math-num">1</span><span class="math-den">r²</span></span> (3r²) = <strong>3 C/m³</strong> (ประจุบวกกระจายสม่ำเสมอ แหล่งกำเนิด Source)`;
    } else if (preset === 'solenoidal') {
      // D = y a_x + x a_y
      Dx_str = 'y';
      Dy_str = 'x';
      Dz_str = '0';

      dDx_dx = 0;
      dDy_dy = 0;
      dDz_dz = 0;
      div_val = 0;
      explanation = `∂D<sub>x</sub>/∂x = 0, &nbsp; ∂D<sub>y</sub>/∂y = 0, &nbsp; ∂D<sub>z</sub>/∂z = 0 <br>ผลรวม ∇ • <b>D</b> = <strong>0 C/m³</strong> (ไม่มีประจุสุทธิ ฟลักซ์ไหลเข้าเท่ากับไหลออกพอดี Solenoidal Field)`;
    }

    return { Dx_str, Dy_str, Dz_str, dDx_dx, dDy_dy, dDz_dz, div_val, explanation };
  }

  renderAnalytics(preset, coordsys, x, y, z, delta, data) {
    if (!this.outputEl) return;

    const vol = Math.pow(delta, 3);
    const netFlux = data.div_val * vol;

    let natureText = '';
    let natureColor = '';
    if (data.div_val > 0.0001) {
      natureText = 'แหล่งกำเนิดฟลักซ์สุทธิ (Source · มีประจุบวก ρ_v > 0 อยู่ภายใน)';
      natureColor = 'var(--green)';
    } else if (data.div_val < -0.0001) {
      natureText = 'แหล่งดูดกลืนฟลักซ์สุทธิ (Sink · มีประจุลบ ρ_v < 0 อยู่ภายใน)';
      natureColor = 'var(--red)';
    } else {
      natureText = 'ฟลักซ์สมดุล ไหลเข้าเท่ากับไหลออก (Solenoidal / Divergence-Free · ρ_v = 0)';
      natureColor = 'var(--accent)';
    }

    this.outputEl.innerHTML = `
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px;">
        <div class="result-item">
          <div class="res-label">1. เวกเตอร์ความหนาแน่นฟลักซ์ D(x, y, z)</div>
          <div class="res-val" style="font-size: 0.95rem;">
            <b>D</b> = (${data.Dx_str}) <b>a</b><sub>x</sub> + (${data.Dy_str}) <b>a</b><sub>y</sub> + (${data.Dz_str}) <b>a</b><sub>z</sub>
          </div>
          <p style="font-size: 0.85rem; color: var(--ink-muted); margin-top: 4px;">
            ตำแหน่งสังเกต: <strong>P(${x.toFixed(2)}, ${y.toFixed(2)}, ${z.toFixed(2)})</strong>
          </p>
        </div>

        <div class="result-item">
          <div class="res-label">2. การหาอนุพันธ์ย่อย (Partial Derivatives)</div>
          <div class="res-val" style="line-height: 1.8; font-size: 0.92rem;">
            ${data.explanation}
          </div>
        </div>

        <div class="result-item" style="border-left-color: ${natureColor}; grid-column: 1 / -1;">
          <div class="res-label">3. ค่าไดเวอร์เจนซ์และสมการของแมกซ์เวลล์ข้อที่ 1 (∇ • D = ρ<sub>v</sub>)</div>
          <div class="res-val" style="color: ${natureColor}; line-height: 2.0;">
            • <strong>∇ • D = ρ<sub>v</sub> = ${data.div_val.toFixed(4)} C/m³</strong><br>
            • <strong>ฟลักซ์สุทธิรอบกล่องส่วนย่อย:</strong> ∮<sub>S</sub> <b>D</b> • d<b>s</b> ≈ (∇ • <b>D</b>) Δv = (${data.div_val.toFixed(4)}) × (${vol.toFixed(4)} m³) = <strong>${netFlux.toFixed(4)} C</strong><br>
            • <strong>ลักษณะทางกายภาพ:</strong> <span style="font-weight: 700;">${natureText}</span>
          </div>
        </div>
      </div>
    `;
  }
}
