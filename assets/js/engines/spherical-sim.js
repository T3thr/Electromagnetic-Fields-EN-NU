/**
 * 303214 สนามแม่เหล็กไฟฟ้า 1 (Electromagnetic Fields I)
 * Simulator Module: Spherical Coordinates Visualizer (Chapter 3)
 * จัดการทัศนภาพ 3 มิติของระบบพิกัดทรงกลม การหมุนเวกเตอร์ฐาน (a_r, a_θ, a_ϕ) และการแปลงจุด
 */

class SphericalSimEngine {
  constructor(canvasId, outputId) {
    this.core = new Vector3DCore(canvasId, { scale: 36, rotX: 0.45, rotY: -0.65 });
    this.outputEl = typeof outputId === 'string' ? document.getElementById(outputId) : outputId;

    this.bindInputs();
    this.bindHUD();
    this.update();
  }

  bindInputs() {
    ['sl-r', 'sl-theta', 'sl-phi'].forEach(id => {
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

  getValues() {
    const r = parseFloat(document.getElementById('sl-r')?.value) || 3.0;
    const thetaDeg = parseFloat(document.getElementById('sl-theta')?.value) || 45;
    const phiDeg = parseFloat(document.getElementById('sl-phi')?.value) || 60;
    return { r, thetaDeg, phiDeg };
  }

  update() {
    const { r, thetaDeg, phiDeg } = this.getValues();

    const lblR = document.getElementById('lbl-r');
    const lblTheta = document.getElementById('lbl-theta');
    const lblPhi = document.getElementById('lbl-phi');
    if (lblR) lblR.innerText = r.toFixed(1);
    if (lblTheta) lblTheta.innerText = ("").concat(thetaDeg).concat("°");
    if (lblPhi) lblPhi.innerText = ("").concat(phiDeg).concat("°");

    const thetaRad = thetaDeg * (Math.PI / 180);
    const phiRad = phiDeg * (Math.PI / 180);

    const sinT = Math.sin(thetaRad);
    const cosT = Math.cos(thetaRad);
    const sinP = Math.sin(phiRad);
    const cosP = Math.cos(phiRad);

    const px = r * sinT * cosP;
    const py = r * sinT * sinP;
    const pz = r * cosT;
    const rho = r * sinT;

    this.core.clear();

    // 1. Position Vector r_P
    this.core.addVector({ x: 0, y: 0, z: 0 }, { x: px, y: py, z: pz }, '#64748B', '<b>r</b><sub>P</sub>', 2.0);
    this.core.addCharge({ x: px, y: py, z: pz }, 1, ("P(").concat(r.toFixed(1)).concat(", ").concat(thetaDeg).concat("°, ").concat(phiDeg).concat("°)"));

    // Projection on XY Plane
    this.core.addLine({ x: 0, y: 0, z: 0 }, { x: px, y: py, z: 0 }, '#94A3B8', 1, true);
    this.core.addLine({ x: px, y: py, z: 0 }, { x: px, y: py, z: pz }, '#94A3B8', 1, true);

    // 2. Unit Vector a_r (Red) - Points radially outward
    const arX = sinT * cosP;
    const arY = sinT * sinP;
    const arZ = cosT;
    this.core.addVector(
      { x: px, y: py, z: pz },
      { x: px + arX * 1.5, y: py + arY * 1.5, z: pz + arZ * 1.5 },
      '#DC2626', '<b>a</b><sub>r</sub>', 3.0
    );

    // 3. Unit Vector a_θ (Green) - Points in direction of increasing θ (downward along meridian)
    const atX = cosT * cosP;
    const atY = cosT * sinP;
    const atZ = -sinT;
    this.core.addVector(
      { x: px, y: py, z: pz },
      { x: px + atX * 1.5, y: py + atY * 1.5, z: pz + atZ * 1.5 },
      '#059669', '<b>a</b><sub>θ</sub>', 3.0
    );

    // 4. Unit Vector a_ϕ (Blue) - Points tangentially along parallel of latitude
    const apX = -sinP;
    const apY = cosP;
    const apZ = 0;
    this.core.addVector(
      { x: px, y: py, z: pz },
      { x: px + apX * 1.5, y: py + apY * 1.5, z: pz },
      '#2563EB', '<b>a</b><sub>ϕ</sub>', 3.0
    );

    // 5. Reference wireframe arcs:
    // Parallel circle of latitude at height pz with radius rho = r * sin(θ)
    const segs = 36;
    for (let i = 0; i < segs; i++) {
      const a1 = (i / segs) * 2 * Math.PI;
      const a2 = ((i + 1) / segs) * 2 * Math.PI;
      this.core.addLine(
        { x: rho * Math.cos(a1), y: rho * Math.sin(a1), z: pz },
        { x: rho * Math.cos(a2), y: rho * Math.sin(a2), z: pz },
        '#CBD5E1', 1, true
      );
    }

    // Meridian arc at angle phi from North to South Pole
    const mSegs = 24;
    for (let i = 0; i < mSegs; i++) {
      const t1 = (i / mSegs) * Math.PI;
      const t2 = ((i + 1) / mSegs) * Math.PI;
      this.core.addLine(
        { x: r * Math.sin(t1) * cosP, y: r * Math.sin(t1) * sinP, z: r * Math.cos(t1) },
        { x: r * Math.sin(t2) * cosP, y: r * Math.sin(t2) * sinP, z: r * Math.cos(t2) },
        '#E2E8F0', 1, true
      );
    }

    // Equatorial circle on XY Plane
    for (let i = 0; i < segs; i++) {
      const a1 = (i / segs) * 2 * Math.PI;
      const a2 = ((i + 1) / segs) * 2 * Math.PI;
      this.core.addLine(
        { x: r * Math.cos(a1), y: r * Math.sin(a1), z: 0 },
        { x: r * Math.cos(a2), y: r * Math.sin(a2), z: 0 },
        '#F1F5F9', 1, true
      );
    }

    this.core.render();

    if (this.outputEl) {
      this.outputEl.innerHTML = ("\n        <div class=\"breakdown-grid\">\n          <div class=\"breakdown-card\">\n            <div class=\"breakdown-card-title\">1. พิกัดฉากของจุด P (Cartesian Coordinates)</div>\n            <div class=\"breakdown-card-value\">\n              • x = r sin θ cos ϕ = ").concat(r.toFixed(1)).concat(" × sin(").concat(thetaDeg).concat("°) × cos(").concat(phiDeg).concat("°) = <strong>").concat(px.toFixed(3)).concat("</strong> m\n              <br>• y = r sin θ sin ϕ = ").concat(r.toFixed(1)).concat(" × sin(").concat(thetaDeg).concat("°) × sin(").concat(phiDeg).concat("°) = <strong>").concat(py.toFixed(3)).concat("</strong> m\n              <br>• z = r cos θ = ").concat(r.toFixed(1)).concat(" × cos(").concat(thetaDeg).concat("°) = <strong>").concat(pz.toFixed(3)).concat("</strong> m\n              <br>• พิกัดฉาก: <strong>P(").concat(px.toFixed(3)).concat(", ").concat(py.toFixed(3)).concat(", ").concat(pz.toFixed(3)).concat(")</strong>\n              <br>• รัศมีในแนวระนาบ ρ = r sin θ = <strong>").concat(rho.toFixed(3)).concat("</strong> m\n            </div>\n          </div>\n\n          <div class=\"breakdown-card\">\n            <div class=\"breakdown-card-title\">2. เวกเตอร์หนึ่งหน่วยฐาน ณ จุด P (Spherical Basis Vectors)</div>\n            <div class=\"breakdown-card-value\">\n              • <strong>a</strong><sub>r</sub> (แนวรัศมี): <strong>").concat(arX.toFixed(3)).concat(" a</strong><sub>x</sub> <strong>").concat(arY >= 0 ? '+' : '').concat("").concat(arY.toFixed(3)).concat(" a</strong><sub>y</sub> <strong>").concat(arZ >= 0 ? '+' : '').concat("").concat(arZ.toFixed(3)).concat(" a</strong><sub>z</sub>\n              <br>• <strong>a</strong><sub>θ</sub> (แนวละติจูด): <strong>").concat(atX.toFixed(3)).concat(" a</strong><sub>x</sub> <strong>").concat(atY >= 0 ? '+' : '').concat("").concat(atY.toFixed(3)).concat(" a</strong><sub>y</sub> <strong>").concat(atZ >= 0 ? '+' : '').concat("").concat(atZ.toFixed(3)).concat(" a</strong><sub>z</sub>\n              <br>• <strong>a</strong><sub>ϕ</sub> (แนวลองจิจูด): <strong>").concat(apX.toFixed(3)).concat(" a</strong><sub>x</sub> <strong>").concat(apY >= 0 ? '+' : '').concat("").concat(apY.toFixed(3)).concat(" a</strong><sub>y</sub> + <strong>0 a</strong><sub>z</sub>\n            </div>\n          </div>\n        </div>\n      ");
    }
  }
}

window.SphericalSimEngine = SphericalSimEngine;
