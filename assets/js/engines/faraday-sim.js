/**
 * 303214 สนามแม่เหล็กไฟฟ้า 1 (Electromagnetic Fields I)
 * Simulator Module: Faraday's Concentric Spheres & Electric Flux Density D (Chapter 6)
 * จำลองการทดลองทรงกลมตัวนำซ้อนของฟาราเดย์ คำนวณฟลักซ์ไฟฟ้า Ψ, ความหนาแน่นฟลักซ์ D(r) และสนามไฟฟ้า E(r) แบบเรียลไทม์
 */

class FaradaySimEngine {
  constructor(canvasId, outputId) {
    this.core = new Vector3DCore(canvasId, { scale: 35, rotX: 0.35, rotY: -0.55 });
    this.outputEl = typeof outputId === 'string' ? document.getElementById(outputId) : outputId;

    this.bindInputs();
    this.bindHUD();
    this.bindPresets();
    this.update();
  }

  bindInputs() {
    const ids = ['sphere-q', 'sphere-a', 'sphere-b', 'sphere-eps-r', 'obs-r'];
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener('input', () => this.update());
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
    document.querySelectorAll('[data-faraday-preset]').forEach(btn => {
      btn.addEventListener('click', () => {
        const preset = btn.getAttribute('data-faraday-preset');
        this.applyPreset(preset);
      });
    });
  }

  applyPreset(preset) {
    if (preset === 'lecture') {
      // Lecture Set 6 example: a = 2 m, b = 5 m, Q = 965 nC, eps_r = 1.0
      this.setVal('sphere-q', 965);
      this.setVal('sphere-a', 2.0);
      this.setVal('sphere-b', 5.0);
      this.setVal('sphere-eps-r', 1.0);
      this.setVal('obs-r', 3.5);
    } else if (preset === 'dielectric') {
      // Medium with eps_r = 4.0 (Teflon / Ceramic)
      this.setVal('sphere-q', 20);
      this.setVal('sphere-a', 1.0);
      this.setVal('sphere-b', 3.0);
      this.setVal('sphere-eps-r', 4.0);
      this.setVal('obs-r', 2.0);
    } else if (preset === 'compact') {
      // Small scale high charge
      this.setVal('sphere-q', 50);
      this.setVal('sphere-a', 0.8);
      this.setVal('sphere-b', 2.2);
      this.setVal('sphere-eps-r', 2.5);
      this.setVal('obs-r', 1.5);
    }
    this.update();
  }

  setVal(id, val) {
    const el = document.getElementById(id);
    if (el) el.value = val;
  }

  getValues() {
    return {
      q_nC: parseFloat(document.getElementById('sphere-q')?.value) || 10,
      a: parseFloat(document.getElementById('sphere-a')?.value) || 1.0,
      b: parseFloat(document.getElementById('sphere-b')?.value) || 2.5,
      eps_r: parseFloat(document.getElementById('sphere-eps-r')?.value) || 1.0,
      r_obs: parseFloat(document.getElementById('obs-r')?.value) || 1.8
    };
  }

  update() {
    const { q_nC, a, b, eps_r, r_obs } = this.getValues();
    const q_C = q_nC * 1e-9;
    const eps0 = 8.854187817e-12;
    const eps = eps_r * eps0;

    // Safety guard
    const innerR = Math.max(0.2, Math.min(a, b - 0.2));
    const outerR = Math.max(innerR + 0.2, b);

    this.core.clear();

    // 1. Draw Inner Conductor Sphere (r = a)
    this.drawSphereRings(innerR, '#B45309', 24, `ผิวนอกทรงกลมใน r = a (${innerR.toFixed(1)} m)`);

    // 2. Draw Outer Conductor Sphere (r = b)
    this.drawSphereRings(outerR, '#1E40AF', 32, `ผิวด้านในทรงกลมนอก r = b (${outerR.toFixed(1)} m)`);

    // 3. Center point charge representation
    this.core.addCharge({ x: 0, y: 0, z: 0 }, q_nC, `+Q (${q_nC} nC)`);

    // 4. Draw radial D flux lines emanating between a and b
    const numLines = 12;
    for (let i = 0; i < numLines; i++) {
      const phi = (i / numLines) * 2 * Math.PI;
      const thetaList = [Math.PI / 4, Math.PI / 2, (3 * Math.PI) / 4];
      
      thetaList.forEach(theta => {
        const sinT = Math.sin(theta);
        const cosT = Math.cos(theta);
        const cosP = Math.cos(phi);
        const sinP = Math.sin(phi);

        const x1 = innerR * sinT * cosP;
        const y1 = innerR * sinT * sinP;
        const z1 = innerR * cosT;

        const x2 = outerR * sinT * cosP;
        const y2 = outerR * sinT * sinP;
        const z2 = outerR * cosT;

        this.core.addVector(
          { x: x1, y: y1, z: z1 },
          { x: x2, y: y2, z: z2 },
          '#047857',
          i === 0 && theta === Math.PI / 2 ? 'D' : '',
          1.5
        );
      });
    }

    // 5. Draw Observation Shell / Point
    if (r_obs > 0) {
      this.drawObservationMarker(r_obs, '#DC2626');
    }

    this.core.render();

    // 6. Calculate Analytical Values
    this.renderAnalytics(q_nC, q_C, innerR, outerR, eps_r, eps0, eps, r_obs);
  }

  drawSphereRings(radius, color, segments = 24, label = '') {
    // Equator XY ring
    const xyPts = [];
    for (let i = 0; i <= segments; i++) {
      const ang = (i / segments) * 2 * Math.PI;
      xyPts.push({ x: radius * Math.cos(ang), y: radius * Math.sin(ang), z: 0 });
    }
    for (let i = 0; i < xyPts.length - 1; i++) {
      this.core.addLine(xyPts[i], xyPts[i + 1], color, 1.2, [4, 2]);
    }

    // Meridian XZ ring
    const xzPts = [];
    for (let i = 0; i <= segments; i++) {
      const ang = (i / segments) * 2 * Math.PI;
      xzPts.push({ x: radius * Math.cos(ang), y: 0, z: radius * Math.sin(ang) });
    }
    for (let i = 0; i < xzPts.length - 1; i++) {
      this.core.addLine(xzPts[i], xzPts[i + 1], color, 1.0, [2, 2]);
    }

    // Meridian YZ ring
    const yzPts = [];
    for (let i = 0; i <= segments; i++) {
      const ang = (i / segments) * 2 * Math.PI;
      yzPts.push({ x: 0, y: radius * Math.cos(ang), z: radius * Math.sin(ang) });
    }
    for (let i = 0; i < yzPts.length - 1; i++) {
      this.core.addLine(yzPts[i], yzPts[i + 1], color, 1.0, [2, 2]);
    }

    if (label) {
      this.core.addCustomLabel({ x: radius * 0.707, y: radius * 0.707, z: 0 }, label, color);
    }
  }

  drawObservationMarker(r, color) {
    const pts = [];
    const segs = 36;
    for (let i = 0; i <= segs; i++) {
      const ang = (i / segs) * 2 * Math.PI;
      pts.push({ x: r * Math.cos(ang), y: r * Math.sin(ang), z: 0 });
    }
    for (let i = 0; i < pts.length - 1; i++) {
      this.core.addLine(pts[i], pts[i + 1], color, 1.8, []);
    }
    this.core.addCustomLabel({ x: r, y: 0, z: 0 }, `r = ${r.toFixed(2)} m`, color);
  }

  renderAnalytics(q_nC, q_C, a, b, eps_r, eps0, eps, r) {
    if (!this.outputEl) return;

    // Total Flux
    const totalPsi_nC = q_nC;
    
    // Values at critical boundaries
    const D_at_a = (q_C / (4 * Math.PI * a * a)) * 1e9; // in nC/m^2
    const D_at_b = (q_C / (4 * Math.PI * b * b)) * 1e9; // in nC/m^2
    const E_at_a = (q_C / (4 * Math.PI * eps * a * a)); // in V/m
    const E_at_b = (q_C / (4 * Math.PI * eps * b * b)); // in V/m

    // Value at observation radius r
    let regionName = '';
    let D_r = 0;
    let E_r = 0;

    if (r < a) {
      regionName = 'ภายในทรงกลมตัวนำด้านใน (r < a)';
      D_r = 0;
      E_r = 0;
    } else if (r <= b) {
      regionName = 'ช่องว่างไดอิเล็กทริกระหว่างทรงกลม (a ≤ r ≤ b)';
      D_r = (q_C / (4 * Math.PI * r * r)) * 1e9; // nC/m^2
      E_r = (q_C / (4 * Math.PI * eps * r * r)); // V/m
    } else {
      regionName = 'ภายนอกทรงกลมด้านนอก (r > b — ต่อลงดิน/ประจุสุทธิเป็น 0)';
      D_r = 0;
      E_r = 0;
    }

    const rho_sa = (q_C / (4 * Math.PI * a * a)) * 1e9; // nC/m^2
    const rho_sb = (-q_C / (4 * Math.PI * b * b)) * 1e9; // nC/m^2

    this.outputEl.innerHTML = `
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px;">
        <div class="result-item">
          <div class="res-label">1. ฟลักซ์ไฟฟ้ารวม (Total Electric Flux Ψ)</div>
          <div class="res-val">Ψ = Q<sub>enc</sub> = ${totalPsi_nC.toFixed(2)} nC = ${(q_C).toExponential(3)} C</div>
          <p style="font-size: 0.85rem; color: var(--ink-muted); margin-top: 4px;">
            ตามข้อสรุปการทดลองของฟาราเดย์: ฟลักซ์ไฟฟ้าที่แผ่ออกมาทั้งหมดมีค่าเท่ากับประจุที่ล้อมรอบเสมอ
          </p>
        </div>

        <div class="result-item">
          <div class="res-label">2. สภาพยอมของตัวกลาง (Permittivity ε)</div>
          <div class="res-val">ε = ε<sub>r</sub> ε₀ = ${(eps).toExponential(4)} F/m</div>
          <p style="font-size: 0.85rem; color: var(--ink-muted); margin-top: 4px;">
            ε<sub>r</sub> = ${eps_r.toFixed(2)}, ε₀ ≈ 8.854 × 10⁻¹² F/m
          </p>
        </div>

        <div class="result-item">
          <div class="res-label">3. ความหนาแน่นประจุเชิงผิวบนโลหะ (ρ<sub>s</sub>)</div>
          <div class="res-val">
            • ผิวนอกทรงกลมใน (r = a): <strong>${rho_sa.toFixed(4)} nC/m²</strong><br>
            • ผิวด้านในทรงกลมนอก (r = b): <strong>${rho_sb.toFixed(4)} nC/m²</strong>
          </div>
        </div>

        <div class="result-item" style="border-left-color: var(--accent);">
          <div class="res-label">4. ผลการคำนวณ ณ ระยะสังเกต r = ${r.toFixed(2)} m [${regionName}]</div>
          <div class="res-val" style="color: var(--accent);">
            <strong>D(r) = ${D_r > 0 ? `${D_r.toFixed(4)} <b>a</b><sub>r</sub> nC/m²` : `0 <b>a</b><sub>r</sub> (ศูนย์)`}</strong><br>
            <strong>E(r) = ${E_r > 0 ? `${E_r.toFixed(2)} <b>a</b><sub>r</sub> V/m` : `0 <b>a</b><sub>r</sub> (ศูนย์)`}</strong>
          </div>
        </div>
      </div>
    `;
  }
}
