/**
 * 303214 สนามแม่เหล็กไฟฟ้า 1 (Electromagnetic Fields I)
 * Simulator Module: Coulomb's Law & Multi-Charge Sandbox (Chapter 4)
 * จำลองแรงไฟฟ้าคูลอมบ์ระหว่างจุดประจุในอวกาศ 3 มิติ พร้อมคำนวณแรงลัพธ์และสมดุลแรงแบบเรียลไทม์
 */

class CoulombSimEngine {
  constructor(canvasId, outputId) {
    this.core = new Vector3DCore(canvasId, { scale: 30, rotX: 0.35, rotY: -0.55 });
    this.outputEl = typeof outputId === 'string' ? document.getElementById(outputId) : outputId;

    this.bindInputs();
    this.bindHUD();
    this.bindPresets();
    this.update();
  }

  bindInputs() {
    const inputIds = [
      'q1-val', 'q1-x', 'q1-y', 'q1-z',
      'q2-val', 'q2-x', 'q2-y', 'q2-z',
      'q3-val', 'q3-x', 'q3-y', 'q3-z'
    ];
    inputIds.forEach(id => {
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
    document.querySelectorAll('[data-coulomb-preset]').forEach(btn => {
      btn.addEventListener('click', () => {
        const preset = btn.getAttribute('data-coulomb-preset');
        this.applyPreset(preset);
      });
    });
  }

  applyPreset(preset) {
    if (preset === 'exam2') {
      // Exam Question 2: Q1 = 3√3 ≈ 5.196 C at (5, 0, 0), Q2 = 2 C at (0, 0, 0), Q3 = 3 C at (-2.5, 4.33, 0)
      this.setVal('q1-val', 5.196); this.setVal('q1-x', 5.0); this.setVal('q1-y', 0.0); this.setVal('q1-z', 0.0);
      this.setVal('q2-val', 2.0); this.setVal('q2-x', 0.0); this.setVal('q2-y', 0.0); this.setVal('q2-z', 0.0);
      this.setVal('q3-val', 3.0); this.setVal('q3-x', -2.5); this.setVal('q3-y', 4.33); this.setVal('q3-z', 0.0);
    } else if (preset === 'dipole') {
      // Electric Dipole: Q1 = +3 C at (0, 2, 0), Q2 = +1 C at (0, 0, 0), Q3 = -3 C at (0, -2, 0)
      this.setVal('q1-val', 3.0); this.setVal('q1-x', 0.0); this.setVal('q1-y', 2.0); this.setVal('q1-z', 0.0);
      this.setVal('q2-val', 1.0); this.setVal('q2-x', 0.0); this.setVal('q2-y', 0.0); this.setVal('q2-z', 0.0);
      this.setVal('q3-val', -3.0); this.setVal('q3-x', 0.0); this.setVal('q3-y', -2.0); this.setVal('q3-z', 0.0);
    } else if (preset === 'equilateral') {
      // Equilateral Triangle: 3 equal charges of +2 C
      this.setVal('q1-val', 2.0); this.setVal('q1-x', 3.0); this.setVal('q1-y', 0.0); this.setVal('q1-z', 0.0);
      this.setVal('q2-val', 2.0); this.setVal('q2-x', 0.0); this.setVal('q2-y', 0.0); this.setVal('q2-z', 0.0);
      this.setVal('q3-val', 2.0); this.setVal('q3-x', 1.5); this.setVal('q3-y', 2.598); this.setVal('q3-z', 0.0);
    }
    this.update();
  }

  setVal(id, val) {
    const el = document.getElementById(id);
    if (el) el.value = val;
  }

  getValues() {
    return {
      q1: {
        q: parseFloat(document.getElementById('q1-val')?.value) || 0,
        x: parseFloat(document.getElementById('q1-x')?.value) || 0,
        y: parseFloat(document.getElementById('q1-y')?.value) || 0,
        z: parseFloat(document.getElementById('q1-z')?.value) || 0
      },
      q2: {
        q: parseFloat(document.getElementById('q2-val')?.value) || 0,
        x: parseFloat(document.getElementById('q2-x')?.value) || 0,
        y: parseFloat(document.getElementById('q2-y')?.value) || 0,
        z: parseFloat(document.getElementById('q2-z')?.value) || 0
      },
      q3: {
        q: parseFloat(document.getElementById('q3-val')?.value) || 0,
        x: parseFloat(document.getElementById('q3-x')?.value) || 0,
        y: parseFloat(document.getElementById('q3-y')?.value) || 0,
        z: parseFloat(document.getElementById('q3-z')?.value) || 0
      }
    };
  }

  update() {
    const { q1, q2, q3 } = this.getValues();

    // k = 1 / (4 * pi * eps0) ≈ 8.98755e9 N*m^2/C^2
    const k = 8.98755e9;

    // Vector R12 = r2 - r1
    const r12x = q2.x - q1.x;
    const r12y = q2.y - q1.y;
    const r12z = q2.z - q1.z;
    const d12 = Math.sqrt(r12x * r12x + r12y * r12y + r12z * r12z) || 1e-6;

    // Force F12 on Q2 from Q1 = (k * q1 * q2 / d12^3) * R12
    const f12_coeff = (k * q1.q * q2.q) / Math.pow(d12, 3);
    const f12x = f12_coeff * r12x;
    const f12y = f12_coeff * r12y;
    const f12z = f12_coeff * r12z;
    const f12_mag = Math.sqrt(f12x * f12x + f12y * f12y + f12z * f12z);

    // Vector R32 = r2 - r3
    const r32x = q2.x - q3.x;
    const r32y = q2.y - q3.y;
    const r32z = q2.z - q3.z;
    const d32 = Math.sqrt(r32x * r32x + r32y * r32y + r32z * r32z) || 1e-6;

    // Force F32 on Q2 from Q3 = (k * q3 * q2 / d32^3) * R32
    const f32_coeff = (k * q3.q * q2.q) / Math.pow(d32, 3);
    const f32x = f32_coeff * r32x;
    const f32y = f32_coeff * r32y;
    const f32z = f32_coeff * r32z;
    const f32_mag = Math.sqrt(f32x * f32x + f32y * f32y + f32z * f32z);

    // Net Force F_net = F12 + F32
    const fnetx = f12x + f32x;
    const fnety = f12y + f32y;
    const fnetz = f12z + f32z;
    const fnet_mag = Math.sqrt(fnetx * fnetx + fnety * fnety + fnetz * fnetz);

    this.core.clear();

    // Add charges
    this.core.addCharge({ x: q1.x, y: q1.y, z: q1.z }, q1.q, `Q₁ (${q1.q > 0 ? '+' : ''}${q1.q} C)`);
    this.core.addCharge({ x: q2.x, y: q2.y, z: q2.z }, q2.q, `Q₂ (${q2.q > 0 ? '+' : ''}${q2.q} C)`);
    this.core.addCharge({ x: q3.x, y: q3.y, z: q3.z }, q3.q, `Q₃ (${q3.q > 0 ? '+' : ''}${q3.q} C)`);

    // Add distance dashed lines
    this.core.addLine({ x: q1.x, y: q1.y, z: q1.z }, { x: q2.x, y: q2.y, z: q2.z }, '#CBD5E1', 1, true);
    this.core.addLine({ x: q3.x, y: q3.y, z: q3.z }, { x: q2.x, y: q2.y, z: q2.z }, '#CBD5E1', 1, true);

    // Scaling for visual vectors on canvas
    const maxF = Math.max(f12_mag, f32_mag, fnet_mag, 1e-6);
    const visualScale = maxF > 0 ? 3.2 / maxF : 1;

    // Vector F12 (Amber)
    if (f12_mag > 1e-9) {
      this.core.addVector(
        { x: q2.x, y: q2.y, z: q2.z },
        { x: q2.x + f12x * visualScale, y: q2.y + f12y * visualScale, z: q2.z + f12z * visualScale },
        '#D97706', 'F_12', 2.5
      );
    }

    // Vector F32 (Green)
    if (f32_mag > 1e-9) {
      this.core.addVector(
        { x: q2.x, y: q2.y, z: q2.z },
        { x: q2.x + f32x * visualScale, y: q2.y + f32y * visualScale, z: q2.z + f32z * visualScale },
        '#059669', 'F_32', 2.5
      );
    }

    // Vector F_net (Purple - Bold)
    if (fnet_mag > 1e-9) {
      this.core.addVector(
        { x: q2.x, y: q2.y, z: q2.z },
        { x: q2.x + fnetx * visualScale, y: q2.y + fnety * visualScale, z: q2.z + fnetz * visualScale },
        '#7C3AED', 'F_net', 3.8
      );
    }

    this.core.render();

    // Format scientific notation
    const fmt = (n) => {
      if (Math.abs(n) < 1e-9) return '0.000';
      if (Math.abs(n) >= 1e6 || Math.abs(n) <= 1e-3) return n.toExponential(3);
      return n.toFixed(3);
    };

    const fmt4pieps0 = (n) => {
      const coeff = n / k;
      return coeff.toFixed(3);
    };

    if (this.outputEl) {
      this.outputEl.innerHTML = `
        <div class="breakdown-grid">
          <div class="breakdown-card">
            <div class="breakdown-card-title">1. เวกเตอร์ระยะทางและแรงย่อยกระทำบนประจุ Q₂</div>
            <div class="breakdown-card-value">
              • <strong>R</strong><sub>12</sub> = <strong>r</strong>₂ - <strong>r</strong>₁ = (${r12x.toFixed(2)}) <strong>a</strong><sub>x</sub> + (${r12y.toFixed(2)}) <strong>a</strong><sub>y</sub> + (${r12z.toFixed(2)}) <strong>a</strong><sub>z</sub> | |<strong>R</strong><sub>12</sub>| = <strong>${d12.toFixed(3)}</strong> m
              <br>• <strong>R</strong><sub>32</sub> = <strong>r</strong>₂ - <strong>r</strong>₃ = (${r32x.toFixed(2)}) <strong>a</strong><sub>x</sub> + (${r32y.toFixed(2)}) <strong>a</strong><sub>y</sub> + (${r32z.toFixed(2)}) <strong>a</strong><sub>z</sub> | |<strong>R</strong><sub>32</sub>| = <strong>${d32.toFixed(3)}</strong> m
              <br>• <strong>F</strong><sub>12</sub> (จาก Q₁): [${fmt4pieps0(f12x)} <strong>a</strong><sub>x</sub> ${fmt4pieps0(f12y) >= 0 ? '+' : ''}${fmt4pieps0(f12y)} <strong>a</strong><sub>y</sub>] / (4πε₀) N
              <br>&nbsp;&nbsp;&nbsp;⇒ ขนาด |<strong>F</strong><sub>12</sub>| = <strong>${fmt(f12_mag)}</strong> N (${(f12_mag / 1e9).toFixed(3)} × 10⁹ N)
              <br>• <strong>F</strong><sub>32</sub> (จาก Q₃): [${fmt4pieps0(f32x)} <strong>a</strong><sub>x</sub> ${fmt4pieps0(f32y) >= 0 ? '+' : ''}${fmt4pieps0(f32y)} <strong>a</strong><sub>y</sub>] / (4πε₀) N
              <br>&nbsp;&nbsp;&nbsp;⇒ ขนาด |<strong>F</strong><sub>32</sub>| = <strong>${fmt(f32_mag)}</strong> N (${(f32_mag / 1e9).toFixed(3)} × 10⁹ N)
            </div>
          </div>

          <div class="breakdown-card">
            <div class="breakdown-card-title">2. แรงลัพธ์รวมบนประจุ Q₂ (Net Superposition Force F₂):</div>
            <div class="breakdown-card-value" style="font-size: 0.95rem;">
              • <strong>F</strong><sub>net</sub> = <strong>F</strong><sub>12</sub> + <strong>F</strong><sub>32</sub>
              <br>• <strong>F</strong><sub>net</sub> = <strong>[ ${fmt4pieps0(fnetx)} <strong>a</strong><sub>x</sub> ${fmt4pieps0(fnety) >= 0 ? '+' : ''}${fmt4pieps0(fnety)} <strong>a</strong><sub>y</sub> ${fmt4pieps0(fnetz) >= 0 ? '+' : ''}${fmt4pieps0(fnetz)} <strong>a</strong><sub>z</sub> ] / (4πε₀)</strong> N
              <br>• ขนาดแรงลัพธ์ |<strong>F</strong><sub>net</sub>| = <strong>${fmt(fnet_mag)}</strong> N 
              <br>• สถานะสมดุล: ${fnet_mag < 1e-4 ? '<span style="color: var(--green); font-weight:800;">อยู่ในสภาวะสมดุลแรง (F_net ≈ 0)</span>' : '<span style="color: var(--purple); font-weight:700;">มีแรงลัพธ์กระทำ (ไม่สมดุล)</span>'}
            </div>
          </div>
        </div>
      `;
    }
  }
}

window.CoulombSimEngine = CoulombSimEngine;
