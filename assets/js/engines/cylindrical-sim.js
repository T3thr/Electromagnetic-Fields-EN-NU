/**
 * 303214 สนามแม่เหล็กไฟฟ้า 1 (Electromagnetic Fields I)
 * Simulator Module: Cylindrical Coordinates Visualizer (Chapter 2)
 * จัดการทัศนภาพ 3 มิติของระบบพิกัดทรงกระบอก การหมุนเวกเตอร์ฐาน และการแปลงจุด
 */

class CylindricalSimEngine {
  constructor(canvasId, outputId) {
    this.core = new Vector3DCore(canvasId, { scale: 36, rotX: 0.45, rotY: -0.65 });
    this.outputEl = typeof outputId === 'string' ? document.getElementById(outputId) : outputId;

    this.bindInputs();
    this.bindHUD();
    this.update();
  }

  bindInputs() {
    ['sl-rho', 'sl-phi', 'sl-z'].forEach(id => {
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

    document.getElementById('hud-toggle-grid')?.addEventListener('click', () => this.core.toggleGrid());
    document.getElementById('hud-toggle-axes')?.addEventListener('click', () => this.core.toggleAxes());
  }

  getValues() {
    const rho = parseFloat(document.getElementById('sl-rho')?.value) || 3.0;
    const phiDeg = parseFloat(document.getElementById('sl-phi')?.value) || 45;
    const z = parseFloat(document.getElementById('sl-z')?.value) || 2.0;
    return { rho, phiDeg, z };
  }

  update() {
    const { rho, phiDeg, z } = this.getValues();

    const lblRho = document.getElementById('lbl-rho');
    const lblPhi = document.getElementById('lbl-phi');
    const lblZ = document.getElementById('lbl-z');
    if (lblRho) lblRho.innerText = rho.toFixed(1);
    if (lblPhi) lblPhi.innerText = ("").concat(phiDeg).concat("°");
    if (lblZ) lblZ.innerText = z.toFixed(1);

    const phiRad = phiDeg * (Math.PI / 180);
    const cosP = Math.cos(phiRad);
    const sinP = Math.sin(phiRad);

    const px = rho * cosP;
    const py = rho * sinP;
    const pz = z;

    this.core.clear();

    // 1. Position Vector r_P
    this.core.addVector({ x: 0, y: 0, z: 0 }, { x: px, y: py, z: pz }, '#64748B', '<b>r</b><sub>P</sub>', 2.0);
    this.core.addCharge({ x: px, y: py, z: pz }, 1, ("P(").concat(rho.toFixed(1)).concat(", ").concat(phiDeg).concat("°, ").concat(z.toFixed(1)).concat(")"));

    // 2. Unit Vector a_ρ (Red)
    this.core.addVector({ x: px, y: py, z: pz }, { x: px + cosP * 1.5, y: py + sinP * 1.5, z: pz }, '#DC2626', '<b>a</b><sub>ρ</sub>', 3.0);

    // 3. Unit Vector a_ϕ (Green)
    this.core.addVector({ x: px, y: py, z: pz }, { x: px - sinP * 1.5, y: py + cosP * 1.5, z: pz }, '#059669', '<b>a</b><sub>ϕ</sub>', 3.0);

    // 4. Unit Vector a_z (Blue)
    this.core.addVector({ x: px, y: py, z: pz }, { x: px, y: py, z: pz + 1.5 }, '#2563EB', '<b>a</b><sub>z</sub>', 3.0);

    // 5. Reference cylinder circle arc at height z
    const segs = 32;
    for (let i = 0; i < segs; i++) {
      const a1 = (i / segs) * 2 * Math.PI;
      const a2 = ((i + 1) / segs) * 2 * Math.PI;
      this.core.addLine(
        { x: rho * Math.cos(a1), y: rho * Math.sin(a1), z: pz },
        { x: rho * Math.cos(a2), y: rho * Math.sin(a2), z: pz },
        '#CBD5E1', 1, true
      );
    }

    this.core.render();

    if (this.outputEl) {
      this.outputEl.innerHTML = ("\n        <div class=\"breakdown-grid\">\n          <div class=\"breakdown-card\">\n            <div class=\"breakdown-card-title\">1. พิกัดฉากของจุด P (Rectangular Coordinates)</div>\n            <div class=\"breakdown-card-value\">\n              • x = ρ cos ϕ = ").concat(rho.toFixed(1)).concat(" × cos(").concat(phiDeg).concat("°) = <strong>").concat(px.toFixed(3)).concat("</strong> m\n              <br>• y = ρ sin ϕ = ").concat(rho.toFixed(1)).concat(" × sin(").concat(phiDeg).concat("°) = <strong>").concat(py.toFixed(3)).concat("</strong> m\n              <br>• z = <strong>").concat(pz.toFixed(2)).concat("</strong> m\n              <br>• ตำแหน่งพิกัดฉาก: <strong>P(").concat(px.toFixed(3)).concat(", ").concat(py.toFixed(3)).concat(", ").concat(pz.toFixed(2)).concat(")</strong>\n            </div>\n          </div>\n\n          <div class=\"breakdown-card\">\n            <div class=\"breakdown-card-title\">2. เวกเตอร์หนึ่งหน่วยฐาน ณ จุด P (Basis Vectors)</div>\n            <div class=\"breakdown-card-value\">\n              • <strong>a</strong><sub>ρ</sub> (แนวรัศมี): <strong>").concat(cosP.toFixed(3)).concat(" a</strong><sub>x</sub> <strong>").concat(sinP >= 0 ? '+' : '').concat("").concat(sinP.toFixed(3)).concat(" a</strong><sub>y</sub> + <strong>0 a</strong><sub>z</sub>\n              <br>• <strong>a</strong><sub>ϕ</sub> (แนวสัมผัส): <strong>").concat((-sinP).toFixed(3)).concat(" a</strong><sub>x</sub> <strong>").concat(cosP >= 0 ? '+' : '').concat("").concat(cosP.toFixed(3)).concat(" a</strong><sub>y</sub> + <strong>0 a</strong><sub>z</sub>\n              <br>• <strong>a</strong><sub>z</sub> (แนวดิ่ง): <strong>0 a</strong><sub>x</sub> + <strong>0 a</strong><sub>y</sub> + <strong>1.0 a</strong><sub>z</sub>\n            </div>\n          </div>\n        </div>\n      ");
    }
  }
}

window.CylindricalSimEngine = CylindricalSimEngine;
