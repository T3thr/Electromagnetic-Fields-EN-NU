/**
 * 303214 สนามแม่เหล็กไฟฟ้า 1 (Electromagnetic Fields I)
 * Common JavaScript Helpers, Responsive Navigation, ScrollSpy & UI Standards
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavbar();
  initScrollSpy();
  initAccordions();
  initTabs();
  initQuizzes();
  initCopyButtons();
});

// ═══════════ Theme Toggle (Icon Only Standard) ═══════════
function initTheme() {
  const savedTheme = localStorage.getItem('emf_theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeButton(savedTheme);

  const themeBtns = document.querySelectorAll('.theme-toggle-btn');
  themeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'light';
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('emf_theme', next);
      updateThemeButton(next);
    });
  });
}

function updateThemeButton(theme) {
  const btns = document.querySelectorAll('.theme-toggle-btn');
  btns.forEach(btn => {
    if (theme === 'dark') {
      // Sun icon for switching back to light mode
      btn.innerHTML = `
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
      `;
      btn.setAttribute('aria-label', 'เปลี่ยนเป็นโหมดกลางวัน');
      btn.setAttribute('title', 'เปลี่ยนเป็นโหมดกลางวัน');
    } else {
      // Moon icon for switching to dark mode
      btn.innerHTML = `
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      `;
      btn.setAttribute('aria-label', 'เปลี่ยนเป็นโหมดกลางคืน');
      btn.setAttribute('title', 'เปลี่ยนเป็นโหมดกลางคืน');
    }
  });
}

// ═══════════ Responsive Navbar & Structured Mobile Drawer ═══════════
function initNavbar() {
  const toggleBtn = document.querySelector('.nav-mobile-toggle');
  const drawer = document.querySelector('.mobile-nav-drawer');

  if (toggleBtn && drawer) {
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      drawer.classList.toggle('open');
      const isOpen = drawer.classList.contains('open');
      toggleBtn.innerHTML = isOpen ? '✕' : '☰';
      toggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
      if (drawer.classList.contains('open') && !drawer.contains(e.target) && e.target !== toggleBtn) {
        drawer.classList.remove('open');
        toggleBtn.innerHTML = '☰';
        toggleBtn.setAttribute('aria-expanded', 'false');
      }
    });

    // Mobile Chapter Accordion
    const mobileChHeader = drawer.querySelector('.mobile-accordion-header');
    if (mobileChHeader) {
      mobileChHeader.addEventListener('click', () => {
        const item = mobileChHeader.parentElement;
        item.classList.toggle('open');
      });
    }
  }
}

// ═══════════ Sidebar Table of Contents & ScrollSpy ═══════════
function initScrollSpy() {
  const links = document.querySelectorAll('.sidebar-link');
  if (!links.length) return;

  const sections = [];
  links.forEach(link => {
    const targetId = link.getAttribute('href')?.replace('#', '');
    if (targetId) {
      const section = document.getElementById(targetId);
      if (section) sections.push({ id: targetId, el: section, link: link });
    }
  });

  if (!sections.length) return;

  function onScroll() {
    const scrollPos = window.scrollY + 130;
    let currentId = sections[0].id;

    for (let i = 0; i < sections.length; i++) {
      const top = sections[i].el.offsetTop;
      if (scrollPos >= top) {
        currentId = sections[i].id;
      }
    }

    links.forEach(link => {
      const targetId = link.getAttribute('href')?.replace('#', '');
      if (targetId === currentId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// ═══════════ Standard Accordions ═══════════
function initAccordions() {
  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      const parent = header.parentElement;
      parent.classList.toggle('open');
    });
  });
}

// ═══════════ Tabs ═══════════
function initTabs() {
  document.querySelectorAll('.tab-container').forEach(container => {
    const buttons = container.querySelectorAll('.tab-btn');
    const panes = container.querySelectorAll('.tab-pane');

    buttons.forEach((btn, idx) => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        panes.forEach(p => p.classList.remove('active'));

        btn.classList.add('active');
        if (panes[idx]) panes[idx].classList.add('active');
      });
    });
  });
}

// ═══════════ Quiz Option Checker ═══════════
function initQuizzes() {
  document.querySelectorAll('.quiz-card').forEach(card => {
    const options = card.querySelectorAll('.quiz-option');
    const feedback = card.querySelector('.quiz-feedback');

    options.forEach(opt => {
      opt.addEventListener('click', () => {
        if (card.getAttribute('data-answered') === 'true') return;
        card.setAttribute('data-answered', 'true');

        const isCorrect = opt.getAttribute('data-correct') === 'true';
        options.forEach(o => {
          if (o.getAttribute('data-correct') === 'true') {
            o.classList.add('correct');
          } else if (o === opt && !isCorrect) {
            o.classList.add('wrong');
          }
        });

        if (feedback) {
          feedback.style.display = 'block';
          feedback.style.background = isCorrect ? 'var(--green-bg)' : 'var(--red-bg)';
          feedback.style.color = isCorrect ? 'var(--green)' : 'var(--red)';
          feedback.style.border = `1.5px solid ${isCorrect ? 'var(--green)' : 'var(--red)'}`;
          feedback.innerHTML = isCorrect 
            ? `<strong>ถูกต้อง!</strong> ${feedback.getAttribute('data-explanation') || ''}`
            : `<strong>ยังไม่ถูกต้อง!</strong> ${feedback.getAttribute('data-explanation') || ''}`;
        }
      });
    });
  });
}

// ═══════════ Copy Formula to Clipboard ═══════════
function initCopyButtons() {
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (!textToCopy) return;

      navigator.clipboard.writeText(textToCopy).then(() => {
        const originalText = btn.innerText;
        btn.innerText = 'คัดลอกแล้ว';
        btn.style.background = 'var(--green-bg)';
        btn.style.color = 'var(--green)';
        btn.style.borderColor = 'var(--green)';
        setTimeout(() => {
          btn.innerText = originalText;
          btn.style.background = '';
          btn.style.color = '';
          btn.style.borderColor = '';
        }, 2000);
      });
    });
  });
}
