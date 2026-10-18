/* Self-assessment state is distinct from official marks. */
(() => {
  const config=window.EMF_EXAM_CONFIG||{bank:'EMF_FINAL_PROBLEMS',key:'emf-final-attempt-v2',historyKey:'emf-final-history-v2',minutes:180,sourceIds:[],groups:['electric','magnetic','dynamic','wave'],semester:'final'};
  const bank=window[config.bank];
  const host=document.getElementById('final-exam-questions');
  if(!host||!bank)return;
  const key=config.key;
  const rubric=[['formula','เขียนสูตรตั้งต้นทั่วไปก่อนแทนค่า',5],['setup','แยกองค์ประกอบ เลือกพิกัด ผิว และทิศครบ',5],['analysis','แสดงอนุพันธ์หรือปริพันธ์ด้วยมือพร้อมค่าคงตัวและขอบเขต',9],['units','แปลงหน่วย SI และตรวจมิติครบ',3],['answer','รวมคำตอบพร้อมเวกเตอร์ เครื่องหมาย และตรวจความหมาย',3]];
  const empty=()=>({version:2,mode:'source',ids:[],work:{},checks:{},revealed:[],minutes:config.minutes,remaining:config.minutes*60000,deadline:null,finished:false});
  let state=empty();
  try {
    const saved=JSON.parse(localStorage.getItem(key));
    const record=value=>value&&typeof value==='object'&&!Array.isArray(value);
    if(saved?.version===2&&['source','mock','bank'].includes(saved.mode)&&Array.isArray(saved.ids)&&saved.ids.length&&new Set(saved.ids).size===saved.ids.length&&saved.ids.every(id=>bank.some(p=>p.id===id))&&record(saved.work)&&record(saved.checks)&&Array.isArray(saved.revealed)&&Number.isFinite(saved.remaining)&&saved.remaining>=0&&Number.isFinite(saved.minutes)&&saved.minutes>=1&&saved.minutes<=360&&(saved.deadline===null||Number.isFinite(saved.deadline))){state=saved;}
  }catch { /* Ignore unavailable or invalid local state. */ }
  const save=()=>{try {localStorage.setItem(key,JSON.stringify(state));document.getElementById('save-status').textContent='บันทึกในเบราว์เซอร์แล้ว';}catch {document.getElementById('save-status').textContent='เบราว์เซอร์บันทึกไม่ได้ ใช้ปุ่มบันทึกงานเป็นไฟล์';}};
  function choose(){return config.groups.map(group=>{const candidates=bank.filter(p=>p.group===group&&p.examEligible!==false&&!p.dependsOn);return candidates[Math.floor(Math.random()*candidates.length)].id;});}
  if(state.mode==='source'&&config.sourceIds.length)state.ids=config.sourceIds.slice();
  if(!state.ids.length)state.ids=config.sourceIds.length?config.sourceIds:choose();
  const requested=decodeURIComponent(location.hash.slice(1)).replace(/^problem-/,'');
  if(bank.some(p=>p.id===requested)&&!state.ids.includes(requested)){state.mode='bank';state.ids=bank.map(p=>p.id);}
  document.getElementById('exam-mode').value=state.mode;
  document.getElementById('exam-minutes').value=state.minutes;
  let questionObserver;
  const topics={vector:'เวกเตอร์และพิกัด',coulomb:'แรงคูลอมบ์',field:'สนามและฟลักซ์',potential:'ศักย์และงาน',electric:'สนามไฟฟ้าสถิต',magnetic:'สนามแม่เหล็ก',dynamic:'สนามแปรตามเวลา',wave:'คลื่นและเฟสเซอร์'};
  function updateQuestionCard(id){
    const card=document.querySelector('[data-question="'+id+'"]');if(!card)return;
    const p=resolved(id),result=scoreProblem(p),started=!!state.work[id]||Object.values(state.checks[id]||{}).some(Boolean);
    const status=result.score===(p.maxPoints||25)?'complete':started?'working':'ready';
    card.dataset.status=status;
    card.querySelector('.points-badge').textContent=result.score+' / '+(p.maxPoints||25)+' คะแนน';
    card.querySelector('.question-status').textContent=(status==='complete'?'ตรวจครบ':started?'กำลังทำ':'ยังไม่เริ่ม')+(state.revealed.includes(id)?' · เปิดเฉลยแล้ว':'');
  }
  function activateQuestion(id){document.querySelectorAll('[data-question]').forEach(card=>card.setAttribute('aria-current',String(card.dataset.question===id)));}
  function resolved(id){
    const p=bank.find(p=>p.id===id);
    if(state.mode!=='mock'||id!=='ampere')return p;
    const next=bank.find(p=>p.id==='ampere-continuation');
    if(!next)return p;
    const refs=p.source.concat(next.source).filter((s,i,a)=>a.findIndex(r=>r[1]===s[1]&&r[2]===s[2])===i);
    return {...p,originCode:'ALL-Q05 + ALL-Q06',integration:true,prompt:'ลวดยาวอนันต์บนแกน z ให้ <b>H</b> = <span class="math-frac"><span class="math-num"><em>K</em></span><span class="math-den">2πρ</span></span><b>a</b><sub>ϕ</sub> A/m โดย K เป็นค่าคงตัวหน่วย A จงเลือกวงตามสมมาตร เขียนสูตรทั่วไป อินทิเกรตด้วยมือ และหาขนาด/ทิศกระแส ชุดสุ่มรวมสองหน้าต่อเนื่องของตัวอย่างเดียวกัน',steps:p.steps.concat(next.steps.slice(1)),source:refs};
  }
  function scoreProblem(p){
    p=resolved(p.id);
    const c=state.checks[p.id]||{};
    const weight=(p.maxPoints||25)/25;
    let score=c.formula?5+(c.setup?5:0):0;
    if(c.formula&&c.analysis&&c.setup&&(!p.integration||c.analytical))score+=9+(c.units?3:0)+(c.answer&&c.units?3:0);
    score=Number((score*weight).toFixed(2));
    return {score,note:!c.formula?'ยังไม่ยืนยันสูตรทั่วไป: ส่วนสูตรและงานที่ต่อเนื่องเป็นศูนย์ตามคำชี้แจง':!c.setup?'ยังไม่ได้ยืนยันการตั้งปัญหา':p.integration&&!c.analytical?'ยังไม่ยืนยันปริพันธ์ด้วยมือ: ส่วนวิเคราะห์และผลที่เกี่ยวข้องเป็นศูนย์':!c.analysis?'ยังไม่ยืนยันขั้นวิเคราะห์: ไม่รับคะแนนงานต่อเนื่อง':!c.units?'ยังไม่ยืนยันหน่วย SI':!c.answer?'ยังไม่ยืนยันคำตอบรวม':'Checklist ครบ · เป็นคะแนนประเมินด้วยตนเอง'};
  }
  function updateScore(){
    let total=0,maximum=0;
    state.ids.forEach(id=>{const p=resolved(id);const result=scoreProblem(p);total+=result.score;maximum+=p.maxPoints||25;document.getElementById('score-'+id).textContent=result.score+' / '+(p.maxPoints||25);document.getElementById('rubric-'+id).textContent=result.note;updateQuestionCard(id);});
    document.getElementById('final-score').textContent=Number(total.toFixed(2))+' / '+maximum;
    if(state.finished){const summary=document.getElementById('exam-completion');summary.hidden=false;summary.innerHTML='<h2>สิ้นสุดการฝึก</h2><p>คะแนน Checklist: '+Number(total.toFixed(2))+' / '+maximum+'</p><p>เปิดเฉลยแล้ว '+state.revealed.filter(id=>state.ids.includes(id)).length+' ข้อ ตรวจช่องที่ขาดด้านบนและบันทึกงานเพื่อทบทวน คะแนนนี้ไม่ใช่คะแนนทางการ</p>';}
  }
  function render(){
    host.replaceChildren();
    questionObserver?.disconnect();
    document.getElementById('question-nav').innerHTML=state.ids.map((id,i)=>{const p=resolved(id);return '<a class="question-card" data-question="'+id+'" data-status="ready" aria-current="false" href="#problem-'+id+'"><span class="question-card-heading"><span class="question-code">'+(p.originCode||'DRILL '+String(i+1).padStart(2,'0'))+'</span><span class="points-badge">'+(p.maxPoints||25)+' คะแนน</span></span><span class="question-title">'+p.title+'</span><span class="question-card-meta"><span class="topic-pill">'+(topics[p.group]||'โจทย์ฝึก')+'</span><span class="question-status">ยังไม่เริ่ม</span></span></a>';}).join('');
    document.querySelectorAll('[data-question]').forEach(card=>card.addEventListener('click',()=>activateQuestion(card.dataset.question)));
    state.ids.forEach((id,i)=>{
      const p=resolved(id),article=document.createElement('article');article.id='problem-'+id;article.className='card exam-question';
      const refs=p.source.map(s=>'<a href="../../'+encodeURI(s[1])+'#page='+s[2]+'" target="_blank" rel="noopener">'+s[0]+' · หน้า PDF '+s[2]+'</a>').join(' · ');
      article.innerHTML='<h2>ข้อ '+(i+1)+' · '+(p.originCode?p.originCode+' · ':'')+p.title+'</h2><p>'+p.prompt+'</p><p class="source-line">'+p.status+' · '+refs+'</p>'+(p.dependsOn?'<p>ข้อนี้ต่อจาก <a href="#problem-'+p.dependsOn+'">ALL-Q05</a> ในตัวอย่างเดียวกัน</p>':'')+'<label for="work-'+id+'">บันทึกวิธีทำหรือสิ่งที่ต้องกลับไปตรวจ (คำนวณในกระดาษได้)</label><textarea id="work-'+id+'" class="learning-input final-work" placeholder="บันทึกสูตรตั้งต้น ลำดับวิธีทำ และหน่วย"></textarea><h3>ตรวจงานทีละขั้น · <output id="score-'+id+'" class="problem-score"></output></h3><div class="rubric-list"></div><p id="rubric-'+id+'" class="rubric-status" role="status"></p><details class="exam-solution"><summary>เปิดเฉลยและที่มาทุกขั้น</summary>'+p.steps.map((step,idx)=>'<div class="card solution-step"><h4>'+ (idx+1)+'. '+step[0]+'</h4>'+step[1]+'</div>').join('')+'</details><p class="reveal-status"></p>';
      const work=article.querySelector('textarea');work.value=state.work[id]||'';work.disabled=state.finished;
      const editor=document.createElement('div');editor.className='worksheet-editor';work.before(editor);editor.innerHTML='<p class="worksheet-hint">สูตรทั่วไป → พิกัดและขอบเขต → วิเคราะห์ด้วยมือ → คำตอบพร้อมหน่วย SI<br>ใช้สัญลักษณ์ ∫ ∂ ∇ × และเขียนสมการเต็มบนกระดาษ</p>';editor.append(work);
      article.querySelector('.exam-solution').classList.add('accordion-solution');
      work.addEventListener('input',()=>{state.work[id]=work.value;updateQuestionCard(id);save();});
      const checks=article.querySelector('.rubric-list');
      const items=p.integration?rubric.concat([['analytical','ยืนยันว่าแสดงปริพันธ์ด้วยมือ ไม่ใช้เครื่องคิดเลขหาปริพันธ์',0]]):rubric;
      items.forEach(([name,label,points])=>{
        const row=document.createElement('label');row.className='rubric-row rubric-card-item';
        row.innerHTML='<input type="checkbox" aria-label="'+label+'"><span class="rubric-label">'+label+'</span><span class="rubric-points">'+(points?'+'+Number((points*(p.maxPoints||25)/25).toFixed(2))+' คะแนน':'เงื่อนไขบังคับ')+'</span>';
        const input=row.querySelector('input');input.checked=!!state.checks[id]?.[name];
        input.addEventListener('change',()=>{state.checks[id]??={};state.checks[id][name]=input.checked;updateScore();save();});checks.append(row);
      });
      const details=article.querySelector('.exam-solution');details.open=state.revealed.includes(id);
      const status=article.querySelector('.reveal-status');status.textContent=details.open?'ฝึกพร้อมเฉลย: ข้อนี้เคยเปิดวิธีทำแล้ว':'';
      details.addEventListener('toggle',()=>{if(details.open&&!state.revealed.includes(id)){state.revealed.push(id);status.textContent='ฝึกพร้อมเฉลย: ข้อนี้เคยเปิดวิธีทำแล้ว';updateQuestionCard(id);save();}});
      host.append(article);
    });
    updateScore();save();
    activateQuestion(state.ids.includes(requested)?requested:state.ids[0]);
    if('IntersectionObserver' in window){
      questionObserver=new IntersectionObserver(entries=>{const first=entries.filter(e=>e.isIntersecting).sort((a,b)=>a.boundingClientRect.top-b.boundingClientRect.top)[0];if(first)activateQuestion(first.target.id.replace('problem-',''));},{rootMargin:innerWidth<=768?'-340px 0px -35% 0px':'-90px 0px -45% 0px',threshold:0});
      host.querySelectorAll('.exam-question').forEach(el=>questionObserver.observe(el));
    }
  }
  function remaining(){return state.deadline?Math.max(0,state.deadline-Date.now()):state.remaining;}
  function finish(){state.remaining=remaining();state.deadline=null;state.finished=true;host.querySelectorAll('textarea').forEach(el=>el.disabled=true);updateScore();save();}
  function tick(){
    const left=remaining();const seconds=Math.ceil(left/1000);
    document.getElementById('final-timer').textContent=Math.floor(seconds/60).toString().padStart(2,'0')+':'+(seconds%60).toString().padStart(2,'0');
    document.getElementById('timer-toggle').textContent=state.deadline?'พักเวลา':'เริ่มเวลา';
    document.getElementById('timer-toggle').disabled=state.finished;
    document.getElementById('exam-minutes').disabled=!!state.deadline||state.finished;
    if(state.deadline&&left===0)finish();
  }
  document.getElementById('timer-toggle').addEventListener('click',()=>{if(state.finished)return;if(state.deadline){state.remaining=remaining();state.deadline=null;}else{state.deadline=Date.now()+state.remaining;}save();tick();});
  document.getElementById('exam-minutes').addEventListener('change',event=>{const n=Number(event.target.value);if(!Number.isFinite(n)||n<1||n>360){event.target.value=state.minutes;return;}state.minutes=n;state.remaining=n*60000;save();tick();});
  function reset(mode){
    if(Object.values(state.work).some(Boolean)||Object.values(state.checks).some(c=>Object.values(c).some(Boolean))){if(!confirm('เริ่มชุดฝึกใหม่? งานเดิมจะเก็บในประวัติของเบราว์เซอร์ กรุณาบันทึกเป็นไฟล์หากต้องการสำเนา')){document.getElementById('exam-mode').value=state.mode;return;}}
    try {const history=JSON.parse(localStorage.getItem(config.historyKey)||'[]');if(Array.isArray(history))localStorage.setItem(config.historyKey,JSON.stringify([state,...history].slice(0,10)));}catch { /* Export remains available when storage is full. */ }
    const minutes=state.minutes;state=empty();state.minutes=minutes;state.remaining=minutes*60000;state.mode=mode;state.ids=mode==='bank'?bank.map(p=>p.id):mode==='source'?config.sourceIds:choose();
    document.getElementById('exam-completion').hidden=true;document.getElementById('exam-mode').value=mode;render();tick();
  }
  document.getElementById('new-exam').addEventListener('click',()=>reset(state.mode));
  document.getElementById('exam-mode').addEventListener('change',e=>reset(e.target.value));
  document.getElementById('finish-exam').addEventListener('click',()=>{finish();tick();});
  const dialog=document.getElementById('final-formula-dialog');
  window.addEventListener('message',event=>{
    if(event.source===dialog.querySelector('iframe').contentWindow&&event.origin===location.origin&&event.data?.type==='emf-close-formula'&&dialog.open)dialog.close();
  });
  document.getElementById('open-final-formula').addEventListener('click',()=>dialog.showModal());
  document.getElementById('close-final-formula').addEventListener('click',()=>dialog.close());
  document.getElementById('export-final-attempt').addEventListener('click',()=>{
    const snapshot={...state,remaining:remaining(),exportedAt:new Date().toISOString(),scores:state.ids.map(id=>({id,...scoreProblem(bank.find(p=>p.id===id))}))};
    const link=document.createElement('a');const object=URL.createObjectURL(new Blob([JSON.stringify(snapshot,null,2)],{type:'application/json'}));link.href=object;link.download='em-'+config.semester+'-attempt.json';link.click();setTimeout(()=>URL.revokeObjectURL(object),1000);
  });
  render();tick();setInterval(tick,500);
  if(requested)requestAnimationFrame(()=>document.getElementById('problem-'+requested)?.scrollIntoView());
})();
