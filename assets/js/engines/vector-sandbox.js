/**
 * 303214 สนามแม่เหล็กไฟฟ้า 1 (Electromagnetic Fields I)
 * Simulator Module: Cartesian Vector Sandbox Engine (Chapter 1)
 * ควบคุมการคำนวณเวกเตอร์ระยะทาง, ยูนิตเวกเตอร์, ดอทโปรดักต์, ครอสโปรดักต์ และเชื่อมโยง HUD Toolbar
 */

class VectorSandboxEngine {
  constructor(canvasId, outputId) {
    this.core = new Vector3DCore(canvasId, { scale: 38, rotX: 0.45, rotY: -0.65 });
    this.outputEl = typeof outputId === 'string' ? document.getElementById(outputId) : outputId;

    this.bindInputs();
    this.bindHUD();
    this.update();
  }

  bindInputs() {
    ['v1x', 'v1y', 'v1z', 'v2x', 'v2y', 'v2z'].forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener('input', () => this.update());
      }
    });
  }

  bindHUD() {
    // Zoom In / Out / Reset
    document.getElementById('hud-zoom-in')?.addEventListener('click', () => this.core.zoomIn());
    document.getElementById('hud-zoom-out')?.addEventListener('click', () => this.core.zoomOut());
    document.getElementById('hud-reset')?.addEventListener('click', () => this.core.resetView());

    // Preset Views
    document.querySelectorAll('[data-preset-view]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const view = btn.getAttribute('data-preset-view');
        this.core.setPresetView(view);
        document.querySelectorAll('[data-preset-view]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });

    // Grid / Axes Toggle
    document.getElementById('hud-toggle-grid')?.addEventListener('click', () => this.core.toggleGrid());
    document.getElementById('hud-toggle-axes')?.addEventListener('click', () => this.core.toggleAxes());
  }

  getValues() {
    const p = {
      x: parseFloat(document.getElementById('v1x')?.value) || 0,
      y: parseFloat(document.getElementById('v1y')?.value) || 0,
      z: parseFloat(document.getElementById('v1z')?.value) || 0
    };
    const q = {
      x: parseFloat(document.getElementById('v2x')?.value) || 0,
      y: parseFloat(document.getElementById('v2y')?.value) || 0,
      z: parseFloat(document.getElementById('v2z')?.value) || 0
    };
    return { p, q };
  }

  update() {
    const { p, q } = this.getValues();

    // 1. Distance Vector R_PQ = r_Q - r_P
    const rx = q.x - p.x;
    const ry = q.y - p.y;
    const rz = q.z - p.z;
    const dist = Math.sqrt(rx * rx + ry * ry + rz * rz);

    // 2. Unit Vector a_PQ
    const ax = dist > 0.0001 ? rx / dist : 0;
    const ay = dist > 0.0001 ? ry / dist : 0;
    const az = dist > 0.0001 ? rz / dist : 0;

    // 3. Dot Product r_P • r_Q
    const magP = Math.sqrt(p.x * p.x + p.y * p.y + p.z * p.z);
    const magQ = Math.sqrt(q.x * q.x + q.y * q.y + q.z * q.z);
    const dot = p.x * q.x + p.y * q.y + p.z * q.z;
    let cosTheta = 0, thetaDeg = 0;
    if (magP > 0.0001 && magQ > 0.0001) {
      cosTheta = Math.max(-1, Math.min(1, dot / (magP * magQ)));
      thetaDeg = Math.acos(cosTheta) * (180 / Math.PI);
    }

    // 4. Cross Product r_P × r_Q
    const cx = p.y * q.z - p.z * q.y;
    const cy = -(p.x * q.z - p.z * q.x);
    const cz = p.x * q.y - p.y * q.x;
    const crossMag = Math.sqrt(cx * cx + cy * cy + cz * cz);
    const triArea = crossMag / 2;

    // Render Scene on 3D Core
    this.core.clear();

    // Position Vector r_P (Blue)
    this.core.addVector({ x: 0, y: 0, z: 0 }, p, '#2563EB', 'r_P', 2.5);
    this.core.addCharge(p, 1, `P(${p.x}, ${p.y}, ${p.z})`);

    // Position Vector r_Q (Green)
    this.core.addVector({ x: 0, y: 0, z: 0 }, q, '#059669', 'r_Q', 2.5);
    this.core.addCharge(q, -1, `Q(${q.x}, ${q.y}, ${q.z})`);

    // Distance Vector R_PQ (Orange)
    this.core.addVector(p, q, '#D97706', 'R_PQ', 3.0);

    // Cross Product Vector r_P × r_Q (Purple - starting from Origin)
    if (crossMag > 0.0001) {
      this.core.addVector({ x: 0, y: 0, z: 0 }, { x: cx, y: cy, z: cz }, '#7C3AED', 'r_P × r_Q', 2.2);
    }

    this.core.render();

    // Render Clean Breakdown HTML
    if (this.outputEl) {
      const formatSign = (val) => (val >= 0 ? `+ ${val.toFixed(2)}` : `- ${Math.abs(val).toFixed(2)}`);
      
      this.outputEl.innerHTML = `
        <div class="breakdown-grid">
          <div class="breakdown-card">
            <div class="breakdown-card-title">1. เวกเตอร์ระยะทาง (Distance Vector R<sub>PQ</sub> = r<sub>Q</sub> - r<sub>P</sub>)</div>
            <div class="breakdown-card-value">
              <strong>R</strong><sub>PQ</sub> = (${q.x.toFixed(2)} - ${p.x.toFixed(2)}) <strong>a</strong><sub>x</sub> + (${q.y.toFixed(2)} - ${p.y.toFixed(2)}) <strong>a</strong><sub>y</sub> + (${q.z.toFixed(2)} - ${p.z.toFixed(2)}) <strong>a</strong><sub>z</sub>
              <br>= <strong>${rx.toFixed(2)} a</strong><sub>x</sub> <strong>${formatSign(ry)} a</strong><sub>y</sub> <strong>${formatSign(rz)} a</strong><sub>z</sub>
              <br>• ระยะห่าง |<strong>R</strong><sub>PQ</sub>| = <strong>${dist.toFixed(4)}</strong> เมตร (m)
            </div>
          </div>

          <div class="breakdown-card">
            <div class="breakdown-card-title">2. เวกเตอร์หนึ่งหน่วยในทิศทางจาก P ไป Q (Unit Vector a<sub>PQ</sub>)</div>
            <div class="breakdown-card-value">
              <strong>a</strong><sub>PQ</sub> = <strong>R</strong><sub>PQ</sub> / |<strong>R</strong><sub>PQ</sub>|
              <br>= <strong>${ax.toFixed(3)} a</strong><sub>x</sub> <strong>${formatSign(ay)} a</strong><sub>y</sub> <strong>${formatSign(az)} a</strong><sub>z</sub>
              <br>• ขนาด |<strong>a</strong><sub>PQ</sub>| = <strong>${Math.hypot(ax, ay, az).toFixed(3)}</strong> (เวกเตอร์ 1 หน่วยสมบูรณ์)
            </div>
          </div>

          <div class="breakdown-card">
            <div class="breakdown-card-title">3. ผลคูณจุดและมุมระหว่างเวกเตอร์ (Dot Product & Angle)</div>
            <div class="breakdown-card-value">
              • <strong>r</strong><sub>P</sub> • <strong>r</strong><sub>Q</sub> = (${p.x})(${q.x}) + (${p.y})(${q.y}) + (${p.z})(${q.z}) = <strong>${dot.toFixed(2)}</strong>
              <br>• ขนาด |<strong>r</strong><sub>P</sub>| = ${magP.toFixed(3)} , |<strong>r</strong><sub>Q</sub>| = ${magQ.toFixed(3)}
              <br>• cos θ = ${dot.toFixed(2)} / (${magP.toFixed(3)} × ${magQ.toFixed(3)}) = ${cosTheta.toFixed(4)}
              <br>• มุม θ<sub>PQ</sub> = <strong>${thetaDeg.toFixed(2)}°</strong>
            </div>
          </div>

          <div class="breakdown-card">
            <div class="breakdown-card-title">4. ผลคูณไขว้และพื้นที่สามเหลี่ยม (Cross Product & Area)</div>
            <div class="breakdown-card-value">
              • <strong>r</strong><sub>P</sub> × <strong>r</strong><sub>Q</sub> = <strong>${cx.toFixed(2)} a</strong><sub>x</sub> <strong>${formatSign(cy)} a</strong><sub>y</sub> <strong>${formatSign(cz)} a</strong><sub>z</sub>
              <br>• ขนาด |<strong>r</strong><sub>P</sub> × <strong>r</strong><sub>Q</sub>| = <strong>${crossMag.toFixed(3)}</strong>
              <br>• พื้นที่รูปสามเหลี่ยม OPQ = (1/2)|<strong>r</strong><sub>P</sub> × <strong>r</strong><sub>Q</sub>| = <strong>${triArea.toFixed(3)}</strong> ตร.ม.
            </div>
          </div>
        </div>
      `;
    }
  }
}

window.VectorSandboxEngine = VectorSandboxEngine;
