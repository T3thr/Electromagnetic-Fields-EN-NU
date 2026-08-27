/**
 * 303214 สนามแม่เหล็กไฟฟ้า 1 (Electromagnetic Fields I)
 * Simulator Module: Electric Field Intensity & Line Charge Simulator (Chapter 5)
 * จำลองสนามไฟฟ้าจากการกระจายตัวของประจุเส้นตรงจำกัดบนแกน z พร้อมคำนวณอินทิเกรตเชิงวิเคราะห์และตัวเลขแบบเรียลไทม์
 */

class ElectricFieldSimEngine {
  constructor(canvasId, outputId) {
    this.core = new Vector3DCore(canvasId, { scale: 32, rotX: 0.35, rotY: -0.60 });
    this.outputEl = typeof outputId === 'string' ? document.getElementById(outputId) : outputId;

    this.bindInputs();
    this.bindHUD();
    this.bindPresets();
    this.update();
  }

  bindInputs() {
    ['z1', 'z2', 'yp', 'rho-l'].forEach(id => {
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
    document.querySelectorAll('[data-efield-preset]').forEach(btn => {
      btn.addEventListener('click', () => {
        const preset = btn.getAttribute('data-efield-preset');
        this.applyPreset(preset);
      });
    });
  }

  applyPreset(preset) {
    if (preset === 'exam3') {
      // Exam 3: Line from z = 0 to z = 4, P(0, 3, 0), rho_l = 1 C/m (or 1 nC/m)
      this.setVal('z1', 0);
      this.setVal('z2', 4);
      this.setVal('yp', 3);
      this.setVal('rho-l', 1);
    } else if (preset === 'symmetric') {
      // Symmetric line from -3 to +3, P(0, 4, 0)
      this.setVal('z1', -3);
      this.setVal('z2', 3);
      this.setVal('yp', 4);
      this.setVal('rho-l', 1);
    } else if (preset === 'infinite-approx') {
      // Approaching infinite line from -10 to +10, P(0, 2, 0)
      this.setVal('z1', -8);
      this.setVal('z2', 8);
      this.setVal('yp', 2);
      this.setVal('rho-l', 1);
    }
    this.update();
  }

  setVal(id, val) {
    const el = document.getElementById(id);
    if (el) el.value = val;
  }

  getValues() {
    const z1 = parseFloat(document.getElementById('z1')?.value) || 0;
    const z2 = parseFloat(document.getElementById('z2')?.value) || 4;
    const yp = parseFloat(document.getElementById('yp')?.value) || 3;
    const rhoL = parseFloat(document.getElementById('rho-l')?.value) || 1;
    return { z1, z2, yp, rhoL };
  }

  update() {
    let { z1, z2, yp, rhoL } = this.getValues();
    if (z1 > z2) {
      const temp = z1;
      z1 = z2;
      z2 = temp;
    }
    if (Math.abs(yp) < 0.2) yp = 0.2; // avoid singularity at zero distance

    const k = 8.98755e9; // 1 / (4 * pi * eps0)

    // Numerical integration of finite line charge on z-axis to point P(0, yp, 0)
    const numSteps = 400;
    const dz = (z2 - z1) / numSteps;
    let Ey_num = 0;
    let Ez_num = 0;

    for (let i = 0; i < numSteps; i++) {
      const zPrime = z1 + (i + 0.5) * dz;
      const Ry = yp;
      const Rz = -zPrime;
      const R = Math.sqrt(Ry * Ry + Rz * Rz);
      const dQ = rhoL * dz;
      const dE_coeff = (k * dQ) / Math.pow(R, 3);
      Ey_num += dE_coeff * Ry;
      Ez_num += dE_coeff * Rz;
    }

    // Analytical evaluation:
    // Ey_analytical = [rho_l / (4*pi*eps0 * yp)] * [ z2 / sqrt(yp^2 + z2^2) - z1 / sqrt(yp^2 + z1^2) ]
    // Ez_analytical = [rho_l / (4*pi*eps0)] * [ 1 / sqrt(yp^2 + z2^2) - 1 / sqrt(yp^2 + z1^2) ]
    const term1_y = z2 / Math.sqrt(yp * yp + z2 * z2);
    const term2_y = z1 / Math.sqrt(yp * yp + z1 * z1);
    const Ey_analytical_coeff = (rhoL / yp) * (term1_y - term2_y);
    const Ey_analytical = k * Ey_analytical_coeff;

    const term1_z = 1 / Math.sqrt(yp * yp + z2 * z2);
    const term2_z = 1 / Math.sqrt(yp * yp + z1 * z1);
    const Ez_analytical_coeff = rhoL * (term1_z - term2_z);
    const Ez_analytical = k * Ez_analytical_coeff;

    const Emag = Math.sqrt(Ey_analytical * Ey_analytical + Ez_analytical * Ez_analytical);

    this.core.clear();

    // 1. Draw line charge along z-axis
    const lineSegs = 40;
    const ldz = (z2 - z1) / lineSegs;
    for (let i = 0; i < lineSegs; i++) {
      const za = z1 + i * ldz;
      const zb = z1 + (i + 1) * ldz;
      this.core.addLine({ x: 0, y: 0, z: za }, { x: 0, y: 0, z: zb }, '#EA580C', 5.0);
    }

    // Line charge endpoints markers
    this.core.addCharge({ x: 0, y: 0, z: z1 }, rhoL, `z₁ = ${z1}`);
    this.core.addCharge({ x: 0, y: 0, z: z2 }, rhoL, `z₂ = ${z2}`);

    // 2. Draw observation point P(0, yp, 0)
    this.core.addCharge({ x: 0, y: yp, z: 0 }, 0.5, `P(0, ${yp}, 0)`);

    // 3. Distance vector from z1 and z2 to P
    this.core.addLine({ x: 0, y: 0, z: z1 }, { x: 0, y: yp, z: 0 }, '#94A3B8', 1, true);
    this.core.addLine({ x: 0, y: 0, z: z2 }, { x: 0, y: yp, z: 0 }, '#94A3B8', 1, true);

    // 4. Electric Field Vector E at P
    const visualScale = Emag > 1e-9 ? 3.0 / Emag : 1;
    this.core.addVector(
      { x: 0, y: yp, z: 0 },
      { x: 0, y: yp + Ey_analytical * visualScale, z: Ez_analytical * visualScale },
      '#7C3AED', 'E', 3.8
    );

    this.core.render();

    const fmt = (n) => {
      if (Math.abs(n) < 1e-9) return '0.000';
      if (Math.abs(n) >= 1e6 || Math.abs(n) <= 1e-3) return n.toExponential(3);
      return n.toFixed(3);
    };

    if (this.outputEl) {
      this.outputEl.innerHTML = `
        <div class="breakdown-grid">
          <div class="breakdown-card">
            <div class="breakdown-card-title">1. ผลการคำนวณเชิงวิเคราะห์ (Analytical Solution Breakdown)</div>
            <div class="breakdown-card-value">
              • ขอบเขตเส้นลวด: <code>z' ∈ [${z1}, ${z2}]</code>, รัศมีตั้งฉาก <code>h = y<sub>P</sub> = ${yp}</code> m
              <br>• <strong>องค์ประกอบแนวแกน y (E<sub>y</sub>):</strong>
              <br>&nbsp;&nbsp;E<sub>y</sub> = [ρ<sub>l</sub> / (4πε₀ y<sub>P</sub>)] [ sin α₂ - sin α₁ ]
              <br>&nbsp;&nbsp;E<sub>y</sub> = [(${rhoL}) / (4πε₀ × ${yp})] [ (${term1_y.toFixed(3)}) - (${term2_y.toFixed(3)}) ]
              <br>&nbsp;&nbsp;E<sub>y</sub> = <strong>[ ${Ey_analytical_coeff.toFixed(4)} ] / (4πε₀)</strong> V/m = <strong>${fmt(Ey_analytical)}</strong> V/m
              <br>• <strong>องค์ประกอบแนวแกน z (E<sub>z</sub>):</strong>
              <br>&nbsp;&nbsp;E<sub>z</sub> = [ρ<sub>l</sub> / (4πε₀)] [ 1/R₂ - 1/R₁ ] = <strong>[ ${Ez_analytical_coeff.toFixed(4)} ] / (4πε₀)</strong> V/m = <strong>${fmt(Ez_analytical)}</strong> V/m
            </div>
          </div>

          <div class="breakdown-card">
            <div class="breakdown-card-title">2. เวกเตอร์ความเข้มสนามไฟฟ้ารวม (Total Field Vector E):</div>
            <div class="breakdown-card-value" style="font-size: 0.95rem;">
              • <strong>E</strong> = <strong>[ ${Ey_analytical_coeff.toFixed(3)} <strong>a</strong><sub>y</sub> ${Ez_analytical_coeff >= 0 ? '+' : ''}${Ez_analytical_coeff.toFixed(3)} <strong>a</strong><sub>z</sub> ] / (4πε₀)</strong> V/m
              <br>• ค่าเชิงตัวเลขจริง: <strong>E</strong> = <strong>${fmt(Ey_analytical)} <strong>a</strong><sub>y</sub> ${Ez_analytical >= 0 ? '+' : ''}${fmt(Ez_analytical)} <strong>a</strong><sub>z</sub></strong> V/m
              <br>• ขนาดสนามไฟฟ้ารวม |<strong>E</strong>| = <strong>${fmt(Emag)}</strong> V/m
              <br>• ${Math.abs(Ez_analytical_coeff) < 1e-3 ? '<span style="color: var(--green); font-weight:700;">เส้นลวดสมมาตร: สนามไฟฟ้าหักล้างในแนวแกน z เหลือเฉพาะแนวรัศมีพุ่งออก</span>' : '<span style="color: var(--accent2); font-weight:700;">เส้นลวดไม่สมมาตร: มีสนามไฟฟ้าทั้งแนวรัศมีและแนวดิ่ง</span>'}
            </div>
          </div>
        </div>
      `;
    }
  }
}

window.ElectricFieldSimEngine = ElectricFieldSimEngine;
