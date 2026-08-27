/**
 * 303214 สนามแม่เหล็กไฟฟ้า 1 (Electromagnetic Fields I)
 * Lightweight 3D Canvas Vector & Coordinate Engine
 */

class Vector3DCanvas {
  constructor(canvasId, options = {}) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    
    this.width = this.canvas.width = this.canvas.clientWidth || 400;
    this.height = this.canvas.height = this.canvas.clientHeight || 350;
    
    this.rotX = options.rotX || 0.45;
    this.rotY = options.rotY || -0.65;
    this.scale = options.scale || 50;
    this.origin = { x: this.width / 2, y: this.height / 2 };
    
    this.isDragging = false;
    this.lastMouse = { x: 0, y: 0 };
    
    this.items = []; // objects to draw: vectors, points, charges, planes
    this.showAxes = options.showAxes !== false;
    this.coordMode = options.coordMode || 'cartesian'; // cartesian, cylindrical, spherical
    
    this.initEvents();
    this.render();
  }

  initEvents() {
    const startDrag = (x, y) => {
      this.isDragging = true;
      this.lastMouse = { x, y };
    };

    const drag = (x, y) => {
      if (!this.isDragging) return;
      const dx = x - this.lastMouse.x;
      const dy = y - this.lastMouse.y;
      this.rotY += dx * 0.01;
      this.rotX += dy * 0.01;
      this.lastMouse = { x, y };
      this.render();
    };

    const endDrag = () => {
      this.isDragging = false;
    };

    this.canvas.addEventListener('mousedown', e => startDrag(e.clientX, e.clientY));
    window.addEventListener('mousemove', e => drag(e.clientX, e.clientY));
    window.addEventListener('mouseup', endDrag);

    this.canvas.addEventListener('touchstart', e => {
      if (e.touches.length === 1) {
        startDrag(e.touches[0].clientX, e.touches[0].clientY);
      }
    });
    window.addEventListener('touchmove', e => {
      if (e.touches.length === 1) {
        drag(e.touches[0].clientX, e.touches[0].clientY);
      }
    });
    window.addEventListener('touchend', endDrag);

    window.addEventListener('resize', () => {
      if (!this.canvas) return;
      this.width = this.canvas.width = this.canvas.clientWidth || 400;
      this.height = this.canvas.height = this.canvas.clientHeight || 350;
      this.origin = { x: this.width / 2, y: this.height / 2 };
      this.render();
    });
  }

  // 3D Projection to 2D
  project(x, y, z) {
    // Rotate Y
    const cosY = Math.cos(this.rotY);
    const sinY = Math.sin(this.rotY);
    const x1 = x * cosY + z * sinY;
    const z1 = -x * sinY + z * cosY;

    // Rotate X
    const cosX = Math.cos(this.rotX);
    const sinX = Math.sin(this.rotX);
    const y2 = y * cosX - z1 * sinX;
    const z2 = y * sinX + z1 * cosX;

    // Map to Canvas
    return {
      x: this.origin.x + x1 * this.scale,
      y: this.origin.y - y2 * this.scale,
      z: z2
    };
  }

  clear() {
    this.items = [];
    this.render();
  }

  addVector(from, to, color = '#60A5FA', label = '', width = 2.5) {
    this.items.push({ type: 'vector', from, to, color, label, width });
  }

  addCharge(pos, charge, label = '') {
    this.items.push({ type: 'charge', pos, charge, label });
  }

  addLineCharge(zStart, zEnd, color = '#F59E0B', label = '') {
    this.items.push({ type: 'line-charge', zStart, zEnd, color, label });
  }

  render() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    // Background subtle grid
    this.drawBackgroundGrid();

    // Draw Axes
    if (this.showAxes) {
      this.drawAxes();
    }

    // Draw Items
    this.items.forEach(item => {
      if (item.type === 'vector') {
        this.drawVectorItem(item);
      } else if (item.type === 'charge') {
        this.drawChargeItem(item);
      } else if (item.type === 'line-charge') {
        this.drawLineChargeItem(item);
      }
    });
  }

  drawBackgroundGrid() {
    const gridLimit = 3;
    const step = 1;
    this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    this.ctx.lineWidth = 1;

    for (let x = -gridLimit; x <= gridLimit; x += step) {
      const p1 = this.project(x, 0, -gridLimit);
      const p2 = this.project(x, 0, gridLimit);
      this.ctx.beginPath();
      this.ctx.moveTo(p1.x, p1.y);
      this.ctx.lineTo(p2.x, p2.y);
      this.ctx.stroke();
    }
    for (let z = -gridLimit; z <= gridLimit; z += step) {
      const p1 = this.project(-gridLimit, 0, z);
      const p2 = this.project(gridLimit, 0, z);
      this.ctx.beginPath();
      this.ctx.moveTo(p1.x, p1.y);
      this.ctx.lineTo(p2.x, p2.y);
      this.ctx.stroke();
    }
  }

  drawAxes() {
    const len = 3.5;
    const o = this.project(0, 0, 0);

    // X Axis (Red)
    const px = this.project(len, 0, 0);
    this.drawArrow(o, px, '#EF4444', 2, '+x');

    // Y Axis (Green)
    const py = this.project(0, len, 0);
    this.drawArrow(o, py, '#10B981', 2, '+y');

    // Z Axis (Blue)
    const pz = this.project(0, 0, len);
    this.drawArrow(o, pz, '#3B82F6', 2, '+z');

    // Origin dot
    this.ctx.fillStyle = '#FFFFFF';
    this.ctx.beginPath();
    this.ctx.arc(o.x, o.y, 3, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.fillStyle = '#9CA3AF';
    this.ctx.font = '11px monospace';
    this.ctx.fillText('(0,0,0)', o.x + 6, o.y + 12);
  }

  drawArrow(from2D, to2D, color, width, label) {
    const headLen = 9;
    const angle = Math.atan2(to2D.y - from2D.y, to2D.x - from2D.x);

    this.ctx.strokeStyle = color;
    this.ctx.fillStyle = color;
    this.ctx.lineWidth = width;

    // Line
    this.ctx.beginPath();
    this.ctx.moveTo(from2D.x, from2D.y);
    this.ctx.lineTo(to2D.x, to2D.y);
    this.ctx.stroke();

    // Arrow Head
    this.ctx.beginPath();
    this.ctx.moveTo(to2D.x, to2D.y);
    this.ctx.lineTo(
      to2D.x - headLen * Math.cos(angle - Math.PI / 6),
      to2D.y - headLen * Math.sin(angle - Math.PI / 6)
    );
    this.ctx.lineTo(
      to2D.x - headLen * Math.cos(angle + Math.PI / 6),
      to2D.y - headLen * Math.sin(angle + Math.PI / 6)
    );
    this.ctx.closePath();
    this.ctx.fill();

    if (label) {
      this.ctx.font = 'bold 13px sans-serif';
      this.ctx.fillText(label, to2D.x + 8, to2D.y - 4);
    }
  }

  drawVectorItem(item) {
    const p1 = this.project(item.from.x, item.from.y, item.from.z);
    const p2 = this.project(item.to.x, item.to.y, item.to.z);
    this.drawArrow(p1, p2, item.color, item.width, item.label);
  }

  drawChargeItem(item) {
    const p = this.project(item.pos.x, item.pos.y, item.pos.z);
    const isPos = item.charge >= 0;
    const radius = 9;

    this.ctx.beginPath();
    this.ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
    this.ctx.fillStyle = isPos ? '#EF4444' : '#3B82F6';
    this.ctx.fill();
    this.ctx.strokeStyle = '#FFFFFF';
    this.ctx.lineWidth = 1.5;
    this.ctx.stroke();

    // Sign
    this.ctx.fillStyle = '#FFFFFF';
    this.ctx.font = 'bold 11px sans-serif';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillText(isPos ? '+' : '-', p.x, p.y);

    // Label
    if (item.label) {
      this.ctx.textAlign = 'left';
      this.ctx.textBaseline = 'alphabetic';
      this.ctx.fillStyle = '#F3F4F6';
      this.ctx.fillText(item.label, p.x + 12, p.y - 6);
    }
  }

  drawLineChargeItem(item) {
    const p1 = this.project(0, 0, item.zStart);
    const p2 = this.project(0, 0, item.zEnd);

    this.ctx.strokeStyle = item.color;
    this.ctx.lineWidth = 5;
    this.ctx.beginPath();
    this.ctx.moveTo(p1.x, p1.y);
    this.ctx.lineTo(p2.x, p2.y);
    this.ctx.stroke();

    // Glow points
    const steps = 6;
    for (let i = 0; i <= steps; i++) {
      const z = item.zStart + (item.zEnd - item.zStart) * (i / steps);
      const p = this.project(0, 0, z);
      this.ctx.fillStyle = '#FBBF24';
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
      this.ctx.fill();
    }

    if (item.label) {
      const mid = this.project(0, 0, (item.zStart + item.zEnd) / 2);
      this.ctx.fillStyle = item.color;
      this.ctx.font = 'bold 13px sans-serif';
      this.ctx.fillText(item.label, mid.x + 12, mid.y);
    }
  }
}

window.Vector3DCanvas = Vector3DCanvas;
