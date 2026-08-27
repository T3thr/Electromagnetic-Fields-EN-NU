/**
 * 303214 สนามแม่เหล็กไฟฟ้า 1 (Electromagnetic Fields I)
 * Core 3D Vector & Field Projection Canvas Engine (Engineering Simulation Grade)
 * ออกแบบสำหรับการเรนเดอร์ระบบพิกัด 3 มิติ เวกเตอร์ ประจุไฟฟ้า และเส้นสนาม
 * พร้อมระบบควบคุมกล้องระดับสากล: ซูมละเอียด, มุมมองมาตรฐาน (ISO, Top, Side, Front), และ Retina Resolution
 */

class Vector3DCore {
  constructor(canvasId, options = {}) {
    this.canvas = typeof canvasId === 'string' ? document.getElementById(canvasId) : canvasId;
    if (!this.canvas) {
      console.warn(`Vector3DCore: Canvas with ID '${canvasId}' not found.`);
      return;
    }
    this.ctx = this.canvas.getContext('2d');
    
    // Initial Camera Configurations
    this.defaultScale = options.scale || 38;
    this.scale = this.defaultScale;
    this.defaultRotX = options.rotX !== undefined ? options.rotX : 0.45;
    this.defaultRotY = options.rotY !== undefined ? options.rotY : -0.65;
    this.rotX = this.defaultRotX;
    this.rotY = this.defaultRotY;
    
    this.showAxes = options.showAxes !== undefined ? options.showAxes : true;
    this.showGrid = options.showGrid !== undefined ? options.showGrid : true;
    this.axisLength = options.axisLength || 5.5;

    // Data Containers
    this.vectors = [];
    this.charges = [];
    this.lines = [];
    this.customLabels = [];

    this.initHiDPI();
    this.bindInteractions();
  }

  initHiDPI() {
    const dpr = window.devicePixelRatio || 1;
    const rect = this.canvas.getBoundingClientRect();
    const width = rect.width || this.canvas.clientWidth || 600;
    const height = rect.height || this.canvas.clientHeight || 420;

    this.canvas.width = width * dpr;
    this.canvas.height = height * dpr;
    this.ctx.scale(dpr, dpr);
    this.displayW = width;
    this.displayH = height;
  }

  bindInteractions() {
    let isDragging = false;
    let lastX = 0, lastY = 0;
    let initialPinchDist = 0;

    // Mouse Drag Rotation
    this.canvas.addEventListener('mousedown', (e) => {
      isDragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
      this.canvas.style.cursor = 'grabbing';
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;

      this.rotY += dx * 0.009;
      this.rotX += dy * 0.009;
      
      // Limit vertical pitch to avoid tumbling upside down
      this.rotX = Math.max(-Math.PI / 2 + 0.05, Math.min(Math.PI / 2 - 0.05, this.rotX));
      this.render();
    });

    window.addEventListener('mouseup', () => {
      if (isDragging) {
        isDragging = false;
        this.canvas.style.cursor = 'grab';
      }
    });

    // Mouse Wheel Zoom
    this.canvas.addEventListener('wheel', (e) => {
      e.preventDefault();
      const zoomFactor = e.deltaY < 0 ? 1.08 : 0.92;
      this.scale = Math.max(15, Math.min(100, this.scale * zoomFactor));
      this.render();
    }, { passive: false });

    // Touch Support for Mobile (Single Touch Drag + Pinch Zoom)
    this.canvas.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        isDragging = true;
        lastX = e.touches[0].clientX;
        lastY = e.touches[0].clientY;
      } else if (e.touches.length === 2) {
        isDragging = false;
        initialPinchDist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
      }
    }, { passive: true });

    this.canvas.addEventListener('touchmove', (e) => {
      if (isDragging && e.touches.length === 1) {
        const dx = e.touches[0].clientX - lastX;
        const dy = e.touches[0].clientY - lastY;
        lastX = e.touches[0].clientX;
        lastY = e.touches[0].clientY;

        this.rotY += dx * 0.012;
        this.rotX += dy * 0.012;
        this.rotX = Math.max(-Math.PI / 2 + 0.05, Math.min(Math.PI / 2 - 0.05, this.rotX));
        this.render();
      } else if (e.touches.length === 2) {
        const dist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        if (initialPinchDist > 0) {
          const factor = dist / initialPinchDist;
          this.scale = Math.max(15, Math.min(100, this.scale * (factor > 1 ? 1.04 : 0.96)));
          initialPinchDist = dist;
          this.render();
        }
      }
    }, { passive: true });

    this.canvas.addEventListener('touchend', () => {
      isDragging = false;
      initialPinchDist = 0;
    });

    // Window Resize Handler
    window.addEventListener('resize', () => {
      this.initHiDPI();
      this.render();
    });
  }

  // Camera Actions
  zoomIn() {
    this.scale = Math.min(100, this.scale * 1.15);
    this.render();
  }

  zoomOut() {
    this.scale = Math.max(15, this.scale * 0.85);
    this.render();
  }

  resetView() {
    this.scale = this.defaultScale;
    this.rotX = this.defaultRotX;
    this.rotY = this.defaultRotY;
    this.render();
  }

  setPresetView(preset) {
    if (preset === 'iso') {
      this.rotX = 0.45;
      this.rotY = -0.65;
    } else if (preset === 'top') {
      this.rotX = Math.PI / 2 - 0.01;
      this.rotY = 0;
    } else if (preset === 'side') {
      this.rotX = 0;
      this.rotY = -Math.PI / 2;
    } else if (preset === 'front') {
      this.rotX = 0;
      this.rotY = 0;
    }
    this.render();
  }

  toggleGrid() {
    this.showGrid = !this.showGrid;
    this.render();
  }

  toggleAxes() {
    this.showAxes = !this.showAxes;
    this.render();
  }

  clear() {
    this.vectors = [];
    this.charges = [];
    this.lines = [];
    this.customLabels = [];
  }

  addVector(from, to, color = '#2563EB', label = '', width = 2.5) {
    this.vectors.push({ from, to, color, label, width });
  }

  addCharge(pos, q = 1, label = '') {
    this.charges.push({ pos, q, label });
  }

  addLine(p1, p2, color = '#94A3B8', width = 1, dashed = false) {
    this.lines.push({ p1, p2, color, width, dashed });
  }

  addLabel(pos, text, color = '#1E293B') {
    this.customLabels.push({ pos, text, color });
  }

  // 3D to 2D Perspective Projection
  project(p) {
    const x = p.x;
    const y = p.y;
    const z = p.z;

    // Rotate around Y axis
    const cosY = Math.cos(this.rotY);
    const sinY = Math.sin(this.rotY);
    const x1 = x * cosY + y * sinY;
    const y1 = -x * sinY + y * cosY;
    const z1 = z;

    // Rotate around X axis
    const cosX = Math.cos(this.rotX);
    const sinX = Math.sin(this.rotX);
    const x2 = x1;
    const y2 = y1 * cosX - z1 * sinX;
    const z2 = y1 * sinX + z1 * cosX;

    const cx = this.displayW / 2;
    const cy = this.displayH / 2;

    return {
      x: cx + x2 * this.scale,
      y: cy - z2 * this.scale,
      depth: y2
    };
  }

  render() {
    if (!this.ctx) return;
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

    // Clear background
    this.ctx.clearRect(0, 0, this.displayW, this.displayH);

    // 1. Draw Ground Plane Grid (XY Plane at z = 0)
    if (this.showGrid) {
      const gridColor = isDark ? 'rgba(51, 65, 85, 0.4)' : 'rgba(216, 207, 188, 0.5)';
      this.ctx.strokeStyle = gridColor;
      this.ctx.lineWidth = 1;
      this.ctx.setLineDash([]);

      const gridRange = 4;
      for (let i = -gridRange; i <= gridRange; i++) {
        const pA = this.project({ x: i, y: -gridRange, z: 0 });
        const pB = this.project({ x: i, y: gridRange, z: 0 });
        this.ctx.beginPath();
        this.ctx.moveTo(pA.x, pA.y);
        this.ctx.lineTo(pB.x, pB.y);
        this.ctx.stroke();

        const pC = this.project({ x: -gridRange, y: i, z: 0 });
        const pD = this.project({ x: gridRange, y: i, z: 0 });
        this.ctx.beginPath();
        this.ctx.moveTo(pC.x, pC.y);
        this.ctx.lineTo(pD.x, pD.y);
        this.ctx.stroke();
      }
    }

    // 2. Draw Principal Coordinate Axes (X: Red, Y: Green, Z: Blue)
    if (this.showAxes) {
      const orig = this.project({ x: 0, y: 0, z: 0 });
      const L = this.axisLength;

      const axes = [
        { to: { x: L, y: 0, z: 0 }, color: '#DC2626', label: '+X' },
        { to: { x: 0, y: L, z: 0 }, color: '#059669', label: '+Y' },
        { to: { x: 0, y: 0, z: L }, color: '#2563EB', label: '+Z' }
      ];

      // Negative Dotted Axes
      const negAxes = [
        { to: { x: -L * 0.6, y: 0, z: 0 } },
        { to: { x: 0, y: -L * 0.6, z: 0 } },
        { to: { x: 0, y: 0, z: -L * 0.6 } }
      ];

      this.ctx.setLineDash([3, 3]);
      this.ctx.lineWidth = 1;
      this.ctx.strokeStyle = isDark ? '#475569' : '#CBD5E1';
      negAxes.forEach(a => {
        const pt = this.project(a.to);
        this.ctx.beginPath();
        this.ctx.moveTo(orig.x, orig.y);
        this.ctx.lineTo(pt.x, pt.y);
        this.ctx.stroke();
      });

      this.ctx.setLineDash([]);

      // Positive Solid Axes
      axes.forEach(a => {
        const pt = this.project(a.to);
        this.ctx.strokeStyle = a.color;
        this.ctx.lineWidth = 2.2;
        this.ctx.beginPath();
        this.ctx.moveTo(orig.x, orig.y);
        this.ctx.lineTo(pt.x, pt.y);
        this.ctx.stroke();

        // Arrow head
        this.drawArrowHead(orig, pt, a.color, 9);

        // Label
        this.ctx.font = 'bold 13px "JetBrains Mono", sans-serif';
        this.ctx.fillStyle = a.color;
        this.ctx.fillText(a.label, pt.x + 8, pt.y - 6);
      });
    }

    // 3. Draw Auxiliary Lines
    this.lines.forEach(l => {
      const p1 = this.project(l.p1);
      const p2 = this.project(l.p2);
      this.ctx.strokeStyle = l.color;
      this.ctx.lineWidth = l.width;
      if (l.dashed) this.ctx.setLineDash([4, 4]);
      else this.ctx.setLineDash([]);

      this.ctx.beginPath();
      this.ctx.moveTo(p1.x, p1.y);
      this.ctx.lineTo(p2.x, p2.y);
      this.ctx.stroke();
      this.ctx.setLineDash([]);
    });

    // 4. Draw Custom Vectors
    this.vectors.forEach(v => {
      const pFrom = this.project(v.from);
      const pTo = this.project(v.to);

      this.ctx.strokeStyle = v.color;
      this.ctx.lineWidth = v.width;
      this.ctx.setLineDash([]);
      this.ctx.beginPath();
      this.ctx.moveTo(pFrom.x, pFrom.y);
      this.ctx.lineTo(pTo.x, pTo.y);
      this.ctx.stroke();

      this.drawArrowHead(pFrom, pTo, v.color, 11);

      if (v.label) {
        const midX = (pFrom.x + pTo.x) / 2;
        const midY = (pFrom.y + pTo.y) / 2;
        this.ctx.font = 'bold 13px "JetBrains Mono", "Times New Roman", sans-serif';
        this.ctx.fillStyle = v.color;
        this.ctx.fillText(v.label, midX + 6, midY - 6);
      }
    });

    // 5. Draw Charges / Points
    this.charges.forEach(c => {
      const pt = this.project(c.pos);
      const radius = 6.5;

      this.ctx.beginPath();
      this.ctx.arc(pt.x, pt.y, radius, 0, 2 * Math.PI);
      this.ctx.fillStyle = c.q >= 0 ? '#DC2626' : '#2563EB';
      this.ctx.fill();
      this.ctx.strokeStyle = '#FFFFFF';
      this.ctx.lineWidth = 1.5;
      this.ctx.stroke();

      if (c.label) {
        this.ctx.font = 'bold 13px -apple-system, sans-serif';
        this.ctx.fillStyle = isDark ? '#F8FAFC' : '#0F172A';
        this.ctx.fillText(c.label, pt.x + 10, pt.y - 6);
      }
    });

    // 6. Draw Custom Labels
    this.customLabels.forEach(lbl => {
      const pt = this.project(lbl.pos);
      this.ctx.font = '12px "JetBrains Mono", sans-serif';
      this.ctx.fillStyle = lbl.color;
      this.ctx.fillText(lbl.text, pt.x + 6, pt.y + 4);
    });
  }

  drawArrowHead(from, to, color, size = 10) {
    const angle = Math.atan2(to.y - from.y, to.x - from.x);
    this.ctx.fillStyle = color;
    this.ctx.beginPath();
    this.ctx.moveTo(to.x, to.y);
    this.ctx.lineTo(
      to.x - size * Math.cos(angle - Math.PI / 6),
      to.y - size * Math.sin(angle - Math.PI / 6)
    );
    this.ctx.lineTo(
      to.x - size * Math.cos(angle + Math.PI / 6),
      to.y - size * Math.sin(angle + Math.PI / 6)
    );
    this.ctx.closePath();
    this.ctx.fill();
  }
}

window.Vector3DCore = Vector3DCore;
