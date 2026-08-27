/**
 * 303214 สนามแม่เหล็กไฟฟ้า 1 (Electromagnetic Fields I)
 * Universal Wiki-Style Site Search Controller (Non-Blocking Palette)
 * ออกแบบตามมาตรฐานคลังวิชาการดิจิทัลและ Wiki ระดับสากล (MDN / Stripe Docs standard)
 */

class SiteSearchController {
  constructor() {
    this.index = window.EMF_SEARCH_INDEX || [];
    this.isOpen = false;
    this.selectedIndex = 0;
    this.filteredResults = [];

    this.initDOM();
    this.bindGlobalEvents();
  }

  getBasePath() {
    const path = window.location.pathname;
    if (path.includes('/01-') || path.includes('/02-') || path.includes('/03-') || 
        path.includes('/04-') || path.includes('/05-') || path.includes('/06-') || 
        path.includes('/07-') || path.includes('/08-') || path.includes('/09-') || 
        path.includes('/formula-sheet') || path.includes('/exam-simulator')) {
      return '../';
    }
    return '';
  }

  initDOM() {
    if (document.getElementById('site-search-modal')) return;

    const modalHtml = `
      <div id="site-search-modal" class="search-modal-backdrop" style="display: none;">
        <div class="search-modal-container" role="dialog" aria-modal="true" aria-label="ค้นหาคลังความรู้">
          <div class="search-input-wrapper">
            <svg class="search-icon-svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input type="text" id="site-search-input" class="search-input-field" placeholder="ค้นหาบทเรียน ทฤษฎี สูตร กฎ หรือข้อสอบ..." autocomplete="off">
            <button id="site-search-close-btn" class="search-close-btn" type="button" aria-label="ปิดกล่องค้นหา">✕</button>
          </div>

          <div id="site-search-results" class="search-results-list">
            <!-- Dynamic Category Results -->
          </div>

          <div class="search-modal-footer">
            <span><strong>ESC</strong> ปิด</span>
            <span><strong>↑ ↓</strong> นำทาง</span>
            <span><strong>Enter</strong> เปิดอ่าน</span>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);

    this.modalEl = document.getElementById('site-search-modal');
    this.inputEl = document.getElementById('site-search-input');
    this.resultsEl = document.getElementById('site-search-results');
    this.closeBtn = document.getElementById('site-search-close-btn');

    this.inputEl.addEventListener('input', (e) => this.handleInput(e.target.value));
    this.closeBtn.addEventListener('click', () => this.close());
    this.modalEl.addEventListener('click', (e) => {
      if (e.target === this.modalEl) this.close();
    });
  }

  bindGlobalEvents() {
    window.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        this.toggle();
      } else if (e.key === 'Escape' && this.isOpen) {
        this.close();
      } else if (this.isOpen) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          this.moveSelection(1);
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          this.moveSelection(-1);
        } else if (e.key === 'Enter') {
          e.preventDefault();
          this.selectCurrent();
        }
      }
    });

    document.querySelectorAll('.search-trigger-btn').forEach(btn => {
      btn.addEventListener('click', () => this.open());
    });
  }

  open() {
    if (!this.modalEl) return;
    this.isOpen = true;
    this.modalEl.style.display = 'flex';
    this.inputEl.value = '';
    this.inputEl.focus();
    this.handleInput('');
  }

  close() {
    if (!this.modalEl) return;
    this.isOpen = false;
    this.modalEl.style.display = 'none';
  }

  toggle() {
    if (this.isOpen) this.close();
    else this.open();
  }

  handleInput(query) {
    const q = query.toLowerCase().trim();
    const basePath = this.getBasePath();

    if (!q) {
      this.filteredResults = this.index.slice(0, 6);
    } else {
      this.filteredResults = this.index.filter(item => {
        const titleMatch = item.title.toLowerCase().includes(q);
        const snippetMatch = item.snippet.toLowerCase().includes(q);
        const keywordMatch = item.keywords.some(k => k.toLowerCase().includes(q));
        return titleMatch || snippetMatch || keywordMatch;
      });
    }

    this.selectedIndex = 0;
    this.renderResults(basePath, q);
  }

  renderResults(basePath, query) {
    if (!this.resultsEl) return;

    if (this.filteredResults.length === 0) {
      this.resultsEl.innerHTML = `
        <div class="search-empty-state">
          <div>ไม่พบข้อมูลสำหรับ "<strong>${query}</strong>"</div>
          <div style="font-size: 0.82rem; color: var(--ink-muted); margin-top: 4px;">ลองค้นหาด้วยคำสำคัญ เช่น เวกเตอร์, พิกัดทรงกระบอก, คูลอมบ์, เกาส์, ศักย์ไฟฟ้า</div>
        </div>
      `;
      return;
    }

    let html = '';
    this.filteredResults.forEach((item, idx) => {
      const isSelected = idx === this.selectedIndex;
      const fullUrl = basePath + item.url;
      html += `
        <a href="${fullUrl}" class="search-result-item ${isSelected ? 'selected' : ''}" data-index="${idx}">
          <div class="result-header">
            <span class="result-title">${item.title}</span>
            <span class="result-category-badge">${item.category}</span>
          </div>
          <div class="result-snippet">${item.snippet}</div>
        </a>
      `;
    });

    this.resultsEl.innerHTML = html;

    this.resultsEl.querySelectorAll('.search-result-item').forEach(itemEl => {
      itemEl.addEventListener('mouseenter', () => {
        const idx = parseInt(itemEl.getAttribute('data-index'), 10);
        this.selectedIndex = idx;
        this.updateSelectionVisuals();
      });
    });
  }

  moveSelection(delta) {
    if (this.filteredResults.length === 0) return;
    this.selectedIndex = (this.selectedIndex + delta + this.filteredResults.length) % this.filteredResults.length;
    this.updateSelectionVisuals();
  }

  updateSelectionVisuals() {
    const items = this.resultsEl.querySelectorAll('.search-result-item');
    items.forEach((el, idx) => {
      if (idx === this.selectedIndex) {
        el.classList.add('selected');
        el.scrollIntoView({ block: 'nearest' });
      } else {
        el.classList.remove('selected');
      }
    });
  }

  selectCurrent() {
    if (this.filteredResults.length > 0 && this.filteredResults[this.selectedIndex]) {
      const item = this.filteredResults[this.selectedIndex];
      const fullUrl = this.getBasePath() + item.url;
      window.location.href = fullUrl;
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.siteSearch = new SiteSearchController();
});
