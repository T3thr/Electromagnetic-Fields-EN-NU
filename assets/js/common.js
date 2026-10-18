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
  initLearningRoadmap();
  initLearningPrimitives();
});

// Shared, offline-capable curriculum drawer. Completion is explicitly learner reported.
function initLearningRoadmap() {
  if (window.self !== window.top) { document.body.classList.add('embedded-formula'); return; }
  const data=window.EMF_CURRICULUM;
  if(!data?.chapters?.length)return;
  const chapters=data.chapters;
  const base=document.querySelector('meta[name="emf-root"]')?.content??'../';
  const current=Number(document.querySelector('meta[name="emf-chapter"]')?.content)||(window.EMF_EXAM_CONFIG?.semester==='final'?10:1);
  let selected=current,tab='anchor',completed=[];
  try { const saved=JSON.parse(localStorage.getItem('emf-learning-v1')||'[]'); if(Array.isArray(saved))completed=[...new Set(saved.filter(n=>Number.isInteger(n)&&n>=1&&n<=22))]; } catch { /* No persisted progress. */ }
  const dialog=document.createElement('dialog');dialog.className='roadmap-dialog';dialog.id='learning-roadmap';
  dialog.setAttribute('aria-labelledby','roadmap-title');
  dialog.innerHTML='<div class="roadmap-heading"><h2 id="roadmap-title">แผนผังการเรียนรู้ · 303214</h2><button class="btn btn-secondary" type="button" aria-label="ปิดแผนผัง">ปิด</button></div><div class="roadmap-body"><p>เลือกบทเพื่อดูฐานความรู้ จุดมุ่งหมาย และการส่งต่อ สีเขียวหมายถึงบทที่คุณยืนยันว่าเข้าใจแล้ว</p><p class="roadmap-progress" role="status"></p><details class="card roadmap-map-disclosure accordion-solution"><summary>เลือกบทจากผังทั้ง 22 บท</summary><div class="roadmap-map"></div></details><div class="roadmap-tabs" role="tablist" aria-label="มุมมองความรู้"><button type="button" class="btn btn-secondary" role="tab" data-view="trail" id="roadmap-tab-trail">เส้นทางความรู้สะสม</button><button type="button" class="btn btn-secondary" role="tab" data-view="anchor" id="roadmap-tab-anchor">แก่นฟิสิกส์ของบทนี้</button><button type="button" class="btn btn-secondary" role="tab" data-view="forward" id="roadmap-tab-forward">สะพานสู่อนาคต</button></div><div class="roadmap-panel" role="tabpanel" id="roadmap-panel"></div></div>';
  document.body.append(dialog);
  const map=dialog.querySelector('.roadmap-map'),panel=dialog.querySelector('.roadmap-panel');
  function link(c){return '<a href="'+base+c.slug+'/index.html">Set '+c.chapterId+' · '+c.title+'</a>';}
  function render(){
    const c=chapters.find(c=>c.chapterId===selected);
    dialog.querySelector('.roadmap-progress').textContent='คุณยืนยันว่าเข้าใจแล้ว '+completed.length+' / 22 บท · กำลังดู Set '+selected;
    map.innerHTML=chapters.map(c=>'<button class="roadmap-node'+(completed.includes(c.chapterId)?' is-complete':'')+'" type="button" aria-current="'+(c.chapterId===selected)+'" data-node="'+c.chapterId+'"><span class="roadmap-node-number">'+String(c.chapterId).padStart(2,'0')+'</span><span>'+c.title+'</span></button>').join('');
    map.querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>{selected=Number(b.dataset.node);map.closest("details").open=false;render();panel.scrollIntoView({block:'nearest'});}));
    dialog.querySelectorAll('[role="tab"]').forEach(b=>{b.setAttribute('aria-selected',String(b.dataset.view===tab));b.setAttribute('aria-controls','roadmap-panel');b.tabIndex=b.dataset.view===tab?0:-1;});
    panel.setAttribute('aria-labelledby','roadmap-tab-'+tab);
    if(tab==='trail'){
      panel.innerHTML='<div class="summary-box"><h3>'+(selected===1?'จุดเริ่มต้นของเส้นทาง':'จากบท 1 ถึงบท '+(selected-1))+'</h3><p>'+data.progressMeaning+'</p><p>ฐานที่ใช้โดยตรง: '+(c.prerequisites.map(n=>link(chapters[n-1])).join(' · ')||'พีชคณิตและตรีโกณมิติพื้นฐาน')+'</p></div>'+chapters.filter(k=>k.chapterId<selected).map(k=>'<details class="card roadmap-trail accordion-solution"><summary>Set '+k.chapterId+' · '+k.title+(completed.includes(k.chapterId)?' · ยืนยันความเข้าใจแล้ว':' · ยังไม่ได้ยืนยัน')+'</summary><ul>'+k.coreConcepts.map(x=>'<li>'+x+'</li>').join('')+'</ul>'+k.keyFormulas.map(f=>'<div class="math-display">'+f+'</div>').join('')+link(k)+'</details>').join('');
    }else if(tab==='forward'){
      panel.innerHTML='<div class="card"><h3>สิ่งที่ Set '+selected+' ส่งต่อ</h3><p>'+c.forwardLink+'</p><p>'+c.application+'</p>'+c.forwardLinks.map(f=>'<p>'+link(chapters[f.chapterId-1])+'<br>'+f.reason+'</p>').join('')+'<p>แต่ละลูกศรหมายถึงบทปลายทางใช้แนวคิดนี้เป็นฐาน จึงอาจเชื่อมข้ามหลายบท</p></div>';
    }else{
      panel.innerHTML='<div class="card"><h3>Set '+selected+' · '+c.title+'</h3><p class="lesson-anchor">'+c.anchor+'</p><p>'+c.intuition+'</p><h4>มโนทัศน์ที่ค้นพบ</h4><p>'+c.coreBreakthrough+'</p><p class="assumption-line"><b>เงื่อนไขที่ใช้:</b> '+c.assumptions+'</p><h4>สูตรที่พิสูจน์แล้ว</h4>'+c.formulasMastered.map(f=>'<div class="math-display">'+f+'</div>').join('')+'<ul>'+c.coreConcepts.map(x=>'<li>'+x+'</li>').join('')+'</ul><p>'+link(c)+'</p><label class="rubric-card-item"><input type="checkbox" id="roadmap-complete"> ฉันอธิบายแนวคิดและทำโจทย์ของบทนี้ได้ด้วยตนเอง</label></div>';
      const complete=panel.querySelector('#roadmap-complete');complete.checked=completed.includes(selected);
      complete.addEventListener('change',()=>{completed=completed.filter(n=>n!==selected);if(complete.checked)completed.push(selected);try{localStorage.setItem('emf-learning-v1',JSON.stringify(completed));}catch{/* Progress is retained in this session. */}render();panel.querySelector('#roadmap-complete')?.focus();});
    }
  }
  dialog.querySelector('.roadmap-heading button').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
  dialog.querySelectorAll('[role="tab"]').forEach(b=>b.addEventListener('click',()=>{tab=b.dataset.view;render();}));
  dialog.querySelector('.roadmap-tabs').addEventListener('keydown',e=>{if(!['ArrowRight','ArrowLeft','Home','End'].includes(e.key))return;e.preventDefault();const buttons=[...dialog.querySelectorAll('[role="tab"]')],i=buttons.indexOf(document.activeElement);const next=e.key==='Home'?0:e.key==='End'?2:(i+(e.key==='ArrowRight'?1:2))%3;tab=buttons[next].dataset.view;render();buttons[next].focus();});
  const actions=document.querySelector('.nav-actions');
  if(!actions)return;
  const trigger=document.createElement('button');trigger.type='button';
  trigger.className='roadmap-trigger btn btn-secondary nav-roadmap';
  trigger.innerHTML='<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><circle cx="5" cy="5" r="2"/><circle cx="19" cy="5" r="2"/><circle cx="12" cy="19" r="2"/><path d="M7 5h10M6 7l5 10M18 7l-5 10"/></svg><span>ผังความรู้สะสม</span>';
  actions.prepend(trigger);
  trigger.setAttribute('aria-haspopup','dialog');trigger.setAttribute('aria-controls','learning-roadmap');
  trigger.addEventListener('click',()=>{
    const active=document.querySelector('.question-card[aria-current="true"]')?.dataset.question;
    const problem=window[window.EMF_EXAM_CONFIG?.bank]?.find(p=>p.id===active);
    selected=problem?.sets[0]||current;tab='anchor';render();
    dialog.querySelector('.roadmap-map-disclosure').open=false;dialog.showModal();
    dialog.querySelector('.roadmap-body').scrollTop=0;dialog.querySelector('.roadmap-heading button').focus();
  });
}

function initLearningPrimitives() {
  document.querySelectorAll('details').forEach(el=>el.classList.add('accordion-solution'));
  document.querySelectorAll('textarea').forEach(input=>{
    if(input.closest('.worksheet-editor'))return;
    const wrapper=document.createElement('div');wrapper.className='worksheet-editor';
    input.before(wrapper);wrapper.append(input);
    const hint=document.createElement('p');hint.className='worksheet-hint';
    hint.textContent='เริ่มจากสูตรทั่วไป → ตั้งพิกัดและขอบเขต → วิเคราะห์ด้วยมือ → คำตอบพร้อมหน่วย SI';
    wrapper.prepend(hint);
  });
  document.querySelectorAll('input[type="checkbox"]').forEach(input=>input.closest('label')?.classList.add('rubric-card-item'));
}

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
      btn.innerHTML = ("\n        <svg viewBox=\"0 0 24 24\" width=\"18\" height=\"18\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n          <circle cx=\"12\" cy=\"12\" r=\"5\"></circle>\n          <line x1=\"12\" y1=\"1\" x2=\"12\" y2=\"3\"></line>\n          <line x1=\"12\" y1=\"21\" x2=\"12\" y2=\"23\"></line>\n          <line x1=\"4.22\" y1=\"4.22\" x2=\"5.64\" y2=\"5.64\"></line>\n          <line x1=\"18.36\" y1=\"18.36\" x2=\"19.78\" y2=\"19.78\"></line>\n          <line x1=\"1\" y1=\"12\" x2=\"3\" y2=\"12\"></line>\n          <line x1=\"21\" y1=\"12\" x2=\"23\" y2=\"12\"></line>\n          <line x1=\"4.22\" y1=\"19.78\" x2=\"5.64\" y2=\"18.36\"></line>\n          <line x1=\"18.36\" y1=\"5.64\" x2=\"19.78\" y2=\"4.22\"></line>\n        </svg>\n      ");
      btn.setAttribute('aria-label', 'เปลี่ยนเป็นโหมดกลางวัน');
      btn.setAttribute('title', 'เปลี่ยนเป็นโหมดกลางวัน');
    } else {
      // Moon icon for switching to dark mode
      btn.innerHTML = ("\n        <svg viewBox=\"0 0 24 24\" width=\"18\" height=\"18\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n          <path d=\"M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z\"></path>\n        </svg>\n      ");
      btn.setAttribute('aria-label', 'เปลี่ยนเป็นโหมดกลางคืน');
      btn.setAttribute('title', 'เปลี่ยนเป็นโหมดกลางคืน');
    }
  });
}

// ═══════════ Responsive Navbar & Structured Mobile Drawer ═══════════
function initNavbar() {
  document.querySelectorAll('.nav-dropdown-button').forEach(button => {
    button.addEventListener('click', () => {
      const open = !button.parentElement.classList.contains('open');
      document.querySelectorAll('.nav-item.open').forEach(item => {
        item.classList.remove('open');
        item.querySelector('button')?.setAttribute('aria-expanded', 'false');
      });
      button.parentElement.classList.toggle('open', open);
      button.setAttribute('aria-expanded', String(open));
    });
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      if (window.parent !== window) {
        window.parent.postMessage({ type: 'emf-close-formula' }, location.origin === 'null' ? '*' : location.origin);
      }
      document.querySelectorAll('.nav-item.open').forEach(item => {
        item.classList.remove('open');
        item.querySelector('button')?.setAttribute('aria-expanded', 'false');
      });
      const drawer = document.querySelector('.mobile-nav-drawer');
      drawer?.classList.remove('open');
      const toggle = document.querySelector('.nav-mobile-toggle');
      if (toggle) { toggle.innerHTML = '☰'; toggle.setAttribute('aria-expanded', 'false'); }
    }
  });
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
          feedback.style.border = ("1.5px solid ").concat(isCorrect ? 'var(--green)' : 'var(--red)').concat("");
          feedback.innerHTML = isCorrect 
            ? ("<strong>ถูกต้อง!</strong> ").concat(feedback.getAttribute('data-explanation') || '').concat("")
            : ("<strong>ยังไม่ถูกต้อง!</strong> ").concat(feedback.getAttribute('data-explanation') || '').concat("");
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
