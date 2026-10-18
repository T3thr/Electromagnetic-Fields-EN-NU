/**
 * 303214 สนามแม่เหล็กไฟฟ้า 1 (Electromagnetic Fields I)
 * Simulator Module: Gauss's Law & Symmetrical Gaussian Surfaces (Chapter 7)
 * จำลองผิวเกาส์เซียนสมมาตร 3 รูปแบบ (ทรงกลม, ทรงกระบอก, แผ่นระนาบ) พร้อมคำนวณอินทิกรัล ∮ D • ds = Q_enc แบบเรียลไทม์
 */

class GaussSimEngine {
  constructor(canvasId, outputId) {
    this.core = new Vector3DCore(canvasId, { scale: 35, rotX: 0.40, rotY: -0.60 });
    this.outputEl = typeof outputId === 'string' ? document.getElementById(outputId) : outputId;

    this.bindInputs();
    this.bindHUD();
    this.bindPresets();
    this.update();
  }

  bindInputs() {
    const ids = ['gauss-type', 'gauss-val', 'gauss-r', 'gauss-a', 'gauss-len'];
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
    document.querySelectorAll('[data-gauss-preset]').forEach(btn => {
      btn.addEventListener('click', () => {
        const preset = btn.getAttribute('data-gauss-preset');
        this.applyPreset(preset);
      });
    });
  }

  applyPreset(preset) {
    if (preset === 'sphere-point') {
      this.setVal('gauss-type', 'sphere');
      this.setVal('gauss-val', 10); // 10 nC
      this.setVal('gauss-r', 2.0);
      this.setVal('gauss-a', 0.5);
    } else if (preset === 'sphere-ball') {
      this.setVal('gauss-type', 'sphere-ball');
      this.setVal('gauss-val', 15); // rho_v = 15 nC/m^3
      this.setVal('gauss-r', 1.8);
      this.setVal('gauss-a', 2.5); // ball radius
    } else if (preset === 'cylinder-line') {
      this.setVal('gauss-type', 'cylinder');
      this.setVal('gauss-val', 8); // rho_l = 8 nC/m
      this.setVal('gauss-r', 1.5);
      this.setVal('gauss-len', 4.0);
    } else if (preset === 'sheet-plane') {
      this.setVal('gauss-type', 'sheet');
      this.setVal('gauss-val', 6); // rho_s = 6 nC/m^2
      this.setVal('gauss-r', 1.5); // distance z
    }
    this.update();
  }

  setVal(id, val) {
    const el = document.getElementById(id);
    if (el) el.value = val;
  }

  getValues() {
    return {
      type: document.getElementById('gauss-type')?.value || 'sphere',
      val: parseFloat(document.getElementById('gauss-val')?.value) || 10,
      r: parseFloat(document.getElementById('gauss-r')?.value) || 2.0,
      a: parseFloat(document.getElementById('gauss-a')?.value) || 1.0,
      len: parseFloat(document.getElementById('gauss-len')?.value) || 4.0
    };
  }

  update() {
    const { type, val, r, a, len } = this.getValues();
    const eps0 = 8.854187817e-12;

    this.core.clear();

    if (type === 'sphere') {
      this.renderSphericalPoint(val, r);
    } else if (type === 'sphere-ball') {
      this.renderSphericalBall(val, r, a);
    } else if (type === 'cylinder') {
      this.renderCylindricalLine(val, r, len);
    } else if (type === 'sheet') {
      this.renderPlanarSheet(val, r);
    }

    this.core.render();
    this.renderAnalytics(type, val, r, a, len, eps0);
  }

  renderSphericalPoint(q_nC, r) {
    // 1. Center Point Charge
    this.core.addCharge({ x: 0, y: 0, z: 0 }, q_nC, ("+Q (").concat(q_nC).concat(" nC)"));

    // 2. Closed Gaussian Sphere Surface (dashed)
    this.drawSphereSurface(r, '#B45309', ("ผิวเกาส์เซียนทรงกลมสมมติ (r = ").concat(r.toFixed(1)).concat(" m)"));

    // 3. Normal area vector ds and Flux vectors D
    const angles = [0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2];
    angles.forEach(ang => {
      const px = r * Math.cos(ang);
      const py = r * Math.sin(ang);
      const pz = 0;
      const dVec = 0.8;
      this.core.addVector({ x: px, y: py, z: pz }, { x: px + dVec * Math.cos(ang), y: py + dVec * Math.sin(ang), z: pz }, '#047857', '<b>D</b>', 2);
      this.core.addVector({ x: px, y: py, z: pz }, { x: px + 0.4 * Math.cos(ang), y: py + 0.4 * Math.sin(ang), z: pz }, '#DC2626', 'd<b>s</b>', 1.5);
    });
  }

  renderSphericalBall(rho_v, r, a) {
    // 1. Charge Ball radius a
    this.drawSphereSurface(a, '#1E40AF', ("ลูกบอลประจุรัศมี a = ").concat(a.toFixed(1)).concat(" m"), false);

    // 2. Gaussian Sphere radius r
    this.drawSphereSurface(r, '#B45309', ("ผิวเกาส์เซียน r = ").concat(r.toFixed(1)).concat(" m"), true);

    // 3. Normal vectors
    const angles = [Math.PI / 4, (3 * Math.PI) / 4, (5 * Math.PI) / 4, (7 * Math.PI) / 4];
    angles.forEach(ang => {
      const px = r * Math.cos(ang) * 0.707;
      const py = r * Math.sin(ang) * 0.707;
      const pz = r * 0.707;
      this.core.addVector({ x: px, y: py, z: pz }, { x: px * 1.3, y: py * 1.3, z: pz * 1.3 }, '#047857', '<b>D</b>', 1.8);
    });
  }

  renderCylindricalLine(rho_l, rho, len) {
    // 1. Central Infinite Line Charge on Z-axis
    const halfL = len / 2;
    this.core.addLine({ x: 0, y: 0, z: -halfL - 1 }, { x: 0, y: 0, z: halfL + 1 }, '#DC2626', 3.0);
    this.core.addLabel({ x: 0.1, y: 0.1, z: halfL }, ("ลวดประจุแกน z (ρ<sub>l</sub> = ").concat(rho_l).concat(" nC/m)"), '#DC2626');

    // 2. Gaussian Cylinder of radius rho and length len
    this.drawCylinderSurface(rho, len, '#B45309');

    // 3. Flux vectors out of curved side (D_rho)
    const numVecs = 8;
    for (let i = 0; i < numVecs; i++) {
      const ang = (i / numVecs) * 2 * Math.PI;
      const x = rho * Math.cos(ang);
      const y = rho * Math.sin(ang);
      const z = 0;
      this.core.addVector({ x, y, z }, { x: x * 1.4, y: y * 1.4, z }, '#047857', i === 0 ? '<b>D</b><sub>ρ</sub>' : '', 2);
    }
  }

  renderPlanarSheet(rho_s, zDist) {
    // 1. Infinite Sheet of Charge at z = 0 (XY plane)
    const size = 3.5;
    const sheetCorners = [
      { x: -size, y: -size, z: 0 },
      { x: size, y: -size, z: 0 },
      { x: size, y: size, z: 0 },
      { x: -size, y: size, z: 0 },
      { x: -size, y: -size, z: 0 }
    ];
    for (let i = 0; i < sheetCorners.length - 1; i++) {
      this.core.addLine(sheetCorners[i], sheetCorners[i + 1], '#1E40AF', 2.0);
    }
    this.core.addLabel({ x: size * 0.7, y: size * 0.7, z: 0 }, ("แผ่นระนาบประจุ z = 0 (ρ<sub>s</sub> = ").concat(rho_s).concat(" nC/m²)"), '#1E40AF');

    // 2. Gaussian Pillbox Box (crossing z=0 from -zDist to +zDist)
    const boxSize = 1.2;
    this.drawPillbox(boxSize, zDist, '#B45309');

    // 3. Flux vectors piercing top and bottom caps
    this.core.addVector({ x: 0, y: 0, z: zDist }, { x: 0, y: 0, z: zDist + 1.0 }, '#047857', '<b>D</b><sub>top</sub> = (ρ<sub>s</sub>/2) <b>a</b><sub>z</sub>', 2);
    this.core.addVector({ x: 0, y: 0, z: -zDist }, { x: 0, y: 0, z: -zDist - 1.0 }, '#047857', '<b>D</b><sub>bottom</sub> = −(ρ<sub>s</sub>/2) <b>a</b><sub>z</sub>', 2);
  }

  drawSphereSurface(radius, color, label, dashed = true) {
    const segs = 32;
    const dashPattern = dashed ? [4, 3] : [];

    // Equator XY
    const xy = [];
    for (let i = 0; i <= segs; i++) {
      const a = (i / segs) * 2 * Math.PI;
      xy.push({ x: radius * Math.cos(a), y: radius * Math.sin(a), z: 0 });
    }
    for (let i = 0; i < xy.length - 1; i++) {
      this.core.addLine(xy[i], xy[i + 1], color, 1.4, dashPattern);
    }

    // Meridian XZ
    const xz = [];
    for (let i = 0; i <= segs; i++) {
      const a = (i / segs) * 2 * Math.PI;
      xz.push({ x: radius * Math.cos(a), y: 0, z: radius * Math.sin(a) });
    }
    for (let i = 0; i < xz.length - 1; i++) {
      this.core.addLine(xz[i], xz[i + 1], color, 1.1, dashPattern);
    }

    // Meridian YZ
    const yz = [];
    for (let i = 0; i <= segs; i++) {
      const a = (i / segs) * 2 * Math.PI;
      yz.push({ x: 0, y: radius * Math.cos(a), z: radius * Math.sin(a) });
    }
    for (let i = 0; i < yz.length - 1; i++) {
      this.core.addLine(yz[i], yz[i + 1], color, 1.1, dashPattern);
    }

    if (label) {
      this.core.addLabel({ x: radius * 0.7, y: radius * 0.7, z: 0 }, label, color);
    }
  }

  drawCylinderSurface(rho, len, color) {
    const segs = 28;
    const halfL = len / 2;

    // Top & Bottom Circles
    const topPts = [];
    const botPts = [];
    for (let i = 0; i <= segs; i++) {
      const ang = (i / segs) * 2 * Math.PI;
      topPts.push({ x: rho * Math.cos(ang), y: rho * Math.sin(ang), z: halfL });
      botPts.push({ x: rho * Math.cos(ang), y: rho * Math.sin(ang), z: -halfL });
    }
    for (let i = 0; i < topPts.length - 1; i++) {
      this.core.addLine(topPts[i], topPts[i + 1], color, 1.2, [4, 3]);
      this.core.addLine(botPts[i], botPts[i + 1], color, 1.2, [4, 3]);
    }

    // 4 Vertical Side Ribs
    const ribAngles = [0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2];
    ribAngles.forEach(ang => {
      const x = rho * Math.cos(ang);
      const y = rho * Math.sin(ang);
      this.core.addLine({ x, y, z: -halfL }, { x, y, z: halfL }, color, 1.2, [4, 3]);
    });

    this.core.addLabel({ x: rho, y: 0, z: halfL }, ("ผิวเกาส์เซียนทรงกระบอก L = ").concat(len).concat(" m, ρ = ").concat(rho).concat(" m"), color);
  }

  drawPillbox(sideA, zDist, color) {
    const halfS = sideA / 2;
    const zTop = zDist;
    const zBot = -zDist;

    // Top face
    const topFace = [
      { x: -halfS, y: -halfS, z: zTop },
      { x: halfS, y: -halfS, z: zTop },
      { x: halfS, y: halfS, z: zTop },
      { x: -halfS, y: halfS, z: zTop },
      { x: -halfS, y: -halfS, z: zTop }
    ];
    // Bottom face
    const botFace = [
      { x: -halfS, y: -halfS, z: zBot },
      { x: halfS, y: -halfS, z: zBot },
      { x: halfS, y: halfS, z: zBot },
      { x: -halfS, y: halfS, z: zBot },
      { x: -halfS, y: -halfS, z: zBot }
    ];

    for (let i = 0; i < 4; i++) {
      this.core.addLine(topFace[i], topFace[i + 1], color, 1.4, [4, 2]);
      this.core.addLine(botFace[i], botFace[i + 1], color, 1.4, [4, 2]);
      this.core.addLine(topFace[i], botFace[i], color, 1.0, [3, 3]);
    }

    this.core.addLabel({ x: halfS, y: halfS, z: zTop }, ("ฝากล่องบน ΔS (z = +").concat(zDist.toFixed(1)).concat(" m)"), color);
    this.core.addLabel({ x: halfS, y: halfS, z: zBot }, ("ฝากล่องล่าง ΔS (z = -").concat(zDist.toFixed(1)).concat(" m)"), color);
  }

  renderAnalytics(type, val, r, a, len, eps0) {
    if (!this.outputEl) return;

    let symmetryName = '';
    let gaussIntegralHtml = '';
    let qEncHtml = '';
    let resultDHtml = '';
    let resultEHtml = '';

    if (type === 'sphere') {
      symmetryName = '1. สมมาตรทรงกลม — จุดประจุ (Point Charge)';
      const q_C = val * 1e-9;
      const S_area = 4 * Math.PI * r * r;
      const D_val_nC = (q_C / S_area) * 1e9;
      const E_val = (q_C / (4 * Math.PI * eps0 * r * r));

      gaussIntegralHtml = ("∮<sub>S</sub> <b>D</b> • d<b>s</b> = D<sub>r</sub> (4π r²) = D<sub>r</sub> (").concat(S_area.toFixed(3)).concat(" m²)");
      qEncHtml = ("Q<sub>enc</sub> = ").concat(val.toFixed(2)).concat(" nC = ").concat((q_C).toExponential(3)).concat(" C");
      resultDHtml = ("<b>D</b>(r) = <span class=\"math-frac\"><span class=\"math-num\">Q</span><span class=\"math-den\">4π r²</span></span> <b>a</b><sub>r</sub> = <strong>").concat(D_val_nC.toFixed(4)).concat(" <b>a</b><sub>r</sub> nC/m²</strong>");
      resultEHtml = ("<b>E</b>(r) = <span class=\"math-frac\"><span class=\"math-num\">Q</span><span class=\"math-den\">4πε₀ r²</span></span> <b>a</b><sub>r</sub> = <strong>").concat(E_val.toFixed(2)).concat(" <b>a</b><sub>r</sub> V/m</strong>");
    } else if (type === 'sphere-ball') {
      symmetryName = '2. สมมาตรทรงกลม — ลูกบอลประจุสม่ำเสมอ (Uniform Volume Charge Ball)';
      const rho_v_C = val * 1e-9;
      const isInside = r <= a;
      let q_enc_C = 0;
      let D_val_nC = 0;
      let formulaD = '';

      if (isInside) {
        // r <= a
        const vol = (4 / 3) * Math.PI * Math.pow(r, 3);
        q_enc_C = rho_v_C * vol;
        D_val_nC = (rho_v_C * r / 3) * 1e9;
        formulaD = ("<b>D</b>(r) = <span class=\"math-frac\"><span class=\"math-num\">ρ<sub>v</sub> r</span><span class=\"math-den\">3</span></span> <b>a</b><sub>r</sub>");
      } else {
        // r > a
        const totalVol = (4 / 3) * Math.PI * Math.pow(a, 3);
        q_enc_C = rho_v_C * totalVol;
        D_val_nC = ((rho_v_C * Math.pow(a, 3)) / (3 * r * r)) * 1e9;
        formulaD = ("<b>D</b>(r) = <span class=\"math-frac\"><span class=\"math-num\">ρ<sub>v</sub> a³</span><span class=\"math-den\">3 r²</span></span> <b>a</b><sub>r</sub> = <span class=\"math-frac\"><span class=\"math-num\">Q<sub>total</sub></span><span class=\"math-den\">4π r²</span></span> <b>a</b><sub>r</sub>");
      }
      const E_val = (D_val_nC * 1e-9) / eps0;

      gaussIntegralHtml = ("∮<sub>S</sub> <b>D</b> • d<b>s</b> = D<sub>r</sub> (4π r²)");
      qEncHtml = ("Q<sub>enc</sub> = ").concat(isInside ? ("ρ<sub>v</sub> (4/3 π r³)") : ("ρ<sub>v</sub> (4/3 π a³)")).concat(" = ").concat((q_enc_C * 1e9).toFixed(3)).concat(" nC");
      resultDHtml = ("").concat(formulaD).concat(" = <strong>").concat(D_val_nC.toFixed(4)).concat(" <b>a</b><sub>r</sub> nC/m²</strong> (").concat(isInside ? 'ภายในลูกบอล r ≤ a' : 'ภายนอกลูกบอล r > a').concat(")");
      resultEHtml = ("<b>E</b>(r) = <strong>").concat(E_val.toFixed(2)).concat(" <b>a</b><sub>r</sub> V/m</strong>");
    } else if (type === 'cylinder') {
      symmetryName = '3. สมมาตรทรงกระบอก — ลวดประจุอนันต์ (Infinite Line Charge)';
      const rho_l_C = val * 1e-9;
      const S_side = 2 * Math.PI * r * len;
      const q_enc_C = rho_l_C * len;
      const D_val_nC = (rho_l_C / (2 * Math.PI * r)) * 1e9;
      const E_val = (rho_l_C / (2 * Math.PI * eps0 * r));

      gaussIntegralHtml = ("∮<sub>S</sub> <b>D</b> • d<b>s</b> = 0 (ฝาบน-ล่าง) + D<sub>ρ</sub> (2π ρ L) = D<sub>ρ</sub> (").concat(S_side.toFixed(3)).concat(" m²)");
      qEncHtml = ("Q<sub>enc</sub> = ρ<sub>l</sub> L = (").concat(val).concat(" nC/m) × (").concat(len).concat(" m) = ").concat((q_enc_C * 1e9).toFixed(2)).concat(" nC");
      resultDHtml = ("<b>D</b>(ρ) = <span class=\"math-frac\"><span class=\"math-num\">ρ<sub>l</sub></span><span class=\"math-den\">2π ρ</span></span> <b>a</b><sub>ρ</sub> = <strong>").concat(D_val_nC.toFixed(4)).concat(" <b>a</b><sub>ρ</sub> nC/m²</strong>");
      resultEHtml = ("<b>E</b>(ρ) = <span class=\"math-frac\"><span class=\"math-num\">ρ<sub>l</sub></span><span class=\"math-den\">2πε₀ ρ</span></span> <b>a</b><sub>ρ</sub> = <strong>").concat(E_val.toFixed(2)).concat(" <b>a</b><sub>ρ</sub> V/m</strong>");
    } else if (type === 'sheet') {
      symmetryName = '4. สมมาตรแผ่นระนาบ — แผ่นประจุอนันต์ (Infinite Sheet of Charge)';
      const rho_s_C = val * 1e-9;
      const D_val_nC = (val / 2); // rho_s / 2
      const E_val = (rho_s_C / (2 * eps0));

      gaussIntegralHtml = ("∮<sub>S</sub> <b>D</b> • d<b>s</b> = D<sub>top</sub> ΔS + D<sub>bottom</sub> ΔS + 0 (ขอบข้าง) = 2 D<sub>n</sub> ΔS");
      qEncHtml = ("Q<sub>enc</sub> = ρ<sub>s</sub> ΔS");
      resultDHtml = ("<b>D</b> = <span class=\"math-frac\"><span class=\"math-num\">ρ<sub>s</sub></span><span class=\"math-den\">2</span></span> <b>a</b><sub>n</sub> = <strong>").concat(D_val_nC.toFixed(4)).concat(" <b>a</b><sub>n</sub> nC/m²</strong> (ไม่ขึ้นกับระยะห่าง z!)");
      resultEHtml = ("<b>E</b> = <span class=\"math-frac\"><span class=\"math-num\">ρ<sub>s</sub></span><span class=\"math-den\">2ε₀</span></span> <b>a</b><sub>n</sub> = <strong>").concat(E_val.toFixed(2)).concat(" <b>a</b><sub>n</sub> V/m</strong>");
    }

    this.outputEl.innerHTML = ("\n      <div style=\"display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px;\">\n        <div class=\"result-item\">\n          <div class=\"res-label\">ชนิดโครงสร้างสมมาตร</div>\n          <div class=\"res-val\">").concat(symmetryName).concat("</div>\n          <p style=\"font-size: 0.85rem; color: var(--ink-muted); margin-top: 4px;\">\n            หลักการเลือกผิว: ขนาด |<b>D</b>| ต้องคงที่บนผิว และ <b>D</b> ตั้งฉากหรือขนานกับผิวเสมอ\n          </p>\n        </div>\n\n        <div class=\"result-item\">\n          <div class=\"res-label\">การอินทิเกรตฟลักซ์รอบผิวปิด ∮ D • ds</div>\n          <div class=\"res-val\">").concat(gaussIntegralHtml).concat("</div>\n          <p style=\"font-size: 0.85rem; color: var(--ink-muted); margin-top: 4px;\">\n            ").concat(qEncHtml).concat("\n          </p>\n        </div>\n\n        <div class=\"result-item\" style=\"border-left-color: var(--accent); grid-column: 1 / -1;\">\n          <div class=\"res-label\">ผลลัพธ์สนามความหนาแน่นฟลักซ์ D และสนามไฟฟ้า E</div>\n          <div class=\"res-val\" style=\"color: var(--accent); line-height: 2.0;\">\n            • ").concat(resultDHtml).concat("<br>\n            • ").concat(resultEHtml).concat("\n          </div>\n        </div>\n      </div>\n    ");
  }
}
