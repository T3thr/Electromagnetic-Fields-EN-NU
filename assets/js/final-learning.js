/* Interactive physical relationships use explicit units and analytic expressions. */
(() => {
  const frac = (n, d) => '<span class="math-frac"><span class="math-num">' + n + '</span><span class="math-den">' + d + '</span></span>';
  const fmt = n => Number.isFinite(n) ? n.toLocaleString('en-US', { maximumSignificantDigits: 6 }) : 'ไม่กำหนด';
  function filter(inputId, itemSelector, countId) {
    const input = document.getElementById(inputId);
    if (!input) return;
    const items = Array.from(document.querySelectorAll(itemSelector));
    input.addEventListener('input', () => {
      const query = input.value.trim().toLowerCase();
      let count = 0;
      items.forEach(item => {
        item.hidden = !item.textContent.toLowerCase().includes(query);
        if (!item.hidden) count++;
      });
      document.getElementById(countId).textContent = 'พบ ' + count + ' / ' + items.length + ' รายการ';
      document.querySelectorAll('.formula-page').forEach(section => {
        const cards = Array.from(section.querySelectorAll('.searchable-formula'));
        section.hidden = !!query && cards.every(card => card.hidden);
      });
    });
    input.dispatchEvent(new Event('input'));
  }
  filter('slide-filter', '.slide-note', 'slide-count');
  filter('formula-filter', '.searchable-formula', 'formula-count');
  document.getElementById('print-formulas')?.addEventListener('click', () => {
    const input = document.getElementById('formula-filter');
    input.value = ''; input.dispatchEvent(new Event('input')); window.print();
  });

  const config = {
    continuity: { controls: [['เวลา t (s)',0,5,0.1,1],['รัศมี r (m)',0.5,5,0.1,2]], plot: r => Math.exp(-1)/r/r, axis:'r (m)', label:'ρv (C/m³)', domain:[0.5,5], explain:(t,r) => '<b>J</b> = ' + fmt(Math.exp(-t)/r) + '<b>a</b><sub>r</sub> A/m<sup>2</sup><br>ρ<sub>v</sub> = ' + fmt(Math.exp(-t)/r/r) + ' C/m<sup>3</sup><br><b>v</b> = ' + fmt(r) + '<b>a</b><sub>r</sub> m/s<br>กราฟใช้เวลาที่เลือก: ประจุลดลงเมื่อมีไดเวอร์เจนซ์บวก' },
    dielectric: { controls:[['สภาพยอมสัมพัทธ์ εr',1,10,0.1,2.1],['สนาม E (V/m)',10,200,1,45]], domain:[1,10], axis:'εr',label:'D (nC/m²)', explain:(er,e) => '<b>D</b> = ε<sub>r</sub>ε<sub>0</sub><b>E</b> = ' + fmt(er*8.854e-3*e) + ' nC/m<sup>2</sup><br>คง E แล้วเพิ่ม ε ทำให้ D เพิ่ม สมมติวัสดุเชิงเส้นและไอโซทรอปิก' },
    boundary: { controls:[['εr ของตัวกลาง 1',1,10,0.1,2.1],['εr ของตัวกลาง 2',1,10,0.1,1]], domain:[1,10], axis:'εr1',label:'En1 (V/m)', explain:(er1,er2) => '<em>E</em><sub>t1</sub> = <em>E</em><sub>t2</sub> = 45 V/m<br><em>D</em><sub>n1</sub> = <em>D</em><sub>n2</sub> = 1 nC/m<sup>2</sup><br><em>E</em><sub>n1</sub> = ' + fmt(1e-9/(er1*8.854e-12)) + ' V/m; <em>E</em><sub>n2</sub> = ' + fmt(1e-9/(er2*8.854e-12)) + ' V/m<br>ไม่มีประจุผิว; Dn คงที่และปกติชี้ 2 → 1 ค่าฝึกในสื่อนี้แยกจากโจทย์จริง 20 C/m²' },
    capacitor: { controls:[['ระยะ d (mm)',0.2,5,0.1,1],['แรงดัน V (V)',1,100,1,20]], domain:[0.2,5], axis:'d (mm)',label:'C (pF)', explain:(d,v) => {const c=8.854e-12*0.01/(d*1e-3);return '<em>C</em> = ' + fmt(c*1e12) + ' pF<br><em>Q</em> = ' + fmt(c*v*1e9) + ' nC<br><em>W</em> = ' + fmt(0.5*c*v*v*1e9) + ' nJ<br>แผ่นอวกาศว่าง S = 0.01 m²; ละเลยสนามขอบและคงแรงดันที่เลือก';} },
    laplace: { controls:[['ระยะ d (mm)',1,10,0.1,5],['ศักย์แผ่นบน V₀ (V)',1,100,1,20]], domain:[0,1], axis:'z/d',label:'V (V)', explain:(d,v) => '<em>V</em>(z) = ' + fmt(v) + '(z/d) V<br><b>E</b> = −' + fmt(v/(d*1e-3)) + '<b>a</b><sub>z</sub> V/m<br>ที่ z=0 ศักย์ 0; ที่ z=d ศักย์ V<sub>0</sub>; ไม่มีประจุปริมาตร สนามเป็นความชันลบของเส้นศักย์' },
    wire: { controls:[['กระแส I (A)',1,20,0.5,10],['ระยะ ρ (cm)',1,20,0.5,5]], domain:[1,20], axis:'ρ (cm)',label:'Hϕ (A/m)', explain:(i,r) => '<b>H</b> = ' + fmt(i/(2*Math.PI*r*0.01)) + '<b>a</b><sub>ϕ</sub> A/m<br>ลวดยาวอนันต์ กระแส +z และจุดอยู่นอกลวด ขนาดแปรผกผันระยะ; ใช้มือขวาตรวจทิศ' },
    ampere: { controls:[['กระแสลวด I (A)',1,20,0.5,10],['ตำแหน่ง ρ (mm)',0,10,0.1,2]], domain:[0,10], axis:'ρ (mm)',label:'Hϕ (A/m)', explain:(i,r) => {const a=0.005,rho=r*0.001;const enclosed=i*Math.min(1,rho*rho/a/a);const h=rho===0?0:enclosed/(2*Math.PI*rho);return '<em>I</em><sub>enc</sub> = ' + fmt(enclosed) + ' A<br><em>H</em><sub>ϕ</sub> = ' + fmt(h) + ' A/m<br>ลวดตัน a = 5 mm มี J สม่ำเสมอ ภายใน H เพิ่มตาม ρ ภายนอกลดตาม 1/ρ';} },
    curl: { controls:[['พิกัด x (m)',0,5,0.1,2],['พิกัด y (m)',0,5,0.1,3]], domain:[0,5], axis:'x (m)',label:'Jx (A/m²)', explain:(x,y) => '<b>J</b> = ' + fmt(-2*x*y-x*x) + '<b>a</b><sub>x</sub> + ' + fmt(y*y) + '<b>a</b><sub>y</sub> + ' + fmt(8*x) + '<b>a</b><sub>z</sub> A/m<sup>2</sup><br>คง z = 4 m ในตัวอย่าง <b>H</b> = x²z <b>a</b><sub>y</sub> − y²x <b>a</b><sub>z</sub>; สนามเป็นแม่เหล็กสถิต' },
    flux: { controls:[['มุมปกติกับ B (°)',0,180,1,60],['B (T)',0.05,0.5,0.01,0.2]], domain:[0,180], axis:'θ (°)',label:'Φ (mWb)', explain:(theta,b) => 'Φ = BS cos θ = ' + fmt(b*0.03*Math.cos(theta*Math.PI/180)*1e3) + ' mWb<br>S = 0.03 m²; สนามสม่ำเสมอ ปกติกลับทิศให้ฟลักซ์กลับเครื่องหมาย สนามขนานผิวให้ฟลักซ์ศูนย์' },
    maxwell: { controls:[['ρv (nC/m³)',-5,5,0.1,1],['Jz (A/m²)',-5,5,0.1,2]], domain:[-5,5], axis:'ρv (nC/m³)',label:'div D (nC/m³)', explain:(rho,j) => '∇ • <b>D</b> = ' + fmt(rho) + ' nC/m<sup>3</sup><br>∇ × <b>H</b> = ' + fmt(j) + '<b>a</b><sub>z</sub> A/m<sup>2</sup><br>∇ × <b>E</b> = 0; ∇ • <b>B</b> = 0<br>สื่อนี้แสดงค่าตัวดำเนินการในสมการสถิต ไม่ได้กำหนดสนามที่เป็นคำตอบหนึ่งเดียว' },
    faraday: { controls:[['เฟสเวลา ωt (rad)',0,6.28,0.01,1.57],['ความถี่ f (Hz)',1,100,1,50]], domain:[0,6.28], axis:'ωt (rad)',label:'emf (V)', explain:(phase,f) => '<em>emf</em> = −' + frac('dΦ','dt') + ' = ' + fmt(2*Math.PI*f*0.01*0.2*Math.sin(phase)) + ' V<br>Φ = 0.01 × 0.2 cos(ωt) Wb; วงอยู่นิ่ง S=0.01 m², B0=0.2 T<br>เครื่องหมายลบของฟาราเดย์กับอนุพันธ์ cos ที่ติดลบให้ emf เป็น +sin' },
    displacement: { controls:[['เฟสเวลา ωt (rad)',0,6.28,0.01,1.57],['ความถี่ f (Hz)',10,1000,10,100]], domain:[0,6.28], axis:'ωt (rad)',label:'i = Id (µA)', explain:(phase,f) => '<em>i</em> = <em>I</em><sub>d</sub> = −ωCV<sub>0</sub> sin(ωt) = ' + fmt(-2*Math.PI*f*1e-9*10*Math.sin(phase)*1e6) + ' µA<br>C=1 nF, V<sub>0</sub>=10 V; สองเส้นซ้อนกันเพราะกระแสลวดและการกระจัดเท่ากันภายใต้แบบจำลองแผ่นขนาน' },
    wave: { controls:[['เฟสเวลา ωt (rad)',0,6.28,0.01,0],['ทิศการแพร่ (+1 หรือ −1)',-1,1,2,1]], domain:[0,2], axis:'z/λ',label:'E/250 และ η₀H/250', explain:(phase,direction) => '<b>E</b> = 250 cos(ωt ' + (direction===1?'−':'+') + ' kz)<b>a</b><sub>x</sub> V/m<br><b>H</b> = ' + (direction===1?'':'−') + '0.66315 cos(ωt ' + (direction===1?'−':'+') + ' kz)<b>a</b><sub>y</sub> A/m<br>กราฟปรับขนาด E และ η<sub>0</sub>H ให้เท่ากัน; เส้น H กลับเครื่องหมายเมื่อคลื่นย้อนทิศ ตรวจ E × H ชี้ ' + (direction===1?'+z':'−z') + ' ด้วยคอนเวนชัน exp(jωt)' }
  };
  function graph(host, conf, fn, second, sample) {
    const lo=conf.domain[0],hi=conf.domain[1];
    const points=Array.from({length:121},(_,i)=>{const x=lo+(hi-lo)*i/120;return [x,fn(x)];});
    const extra=second?points.map(p=>[p[0],second(p[0])]):[];
    const ys=points.concat(extra).map(p=>p[1]);
    const min=Math.min(0,...ys),max=Math.max(0,...ys),span=max-min||1;
    const path=arr=>arr.map((p,i)=>(i?'L':'M')+(65+490*(p[0]-lo)/(hi-lo)).toFixed(2)+','+(225-170*(p[1]-min)/span).toFixed(2)).join(' ');
    const number=n=>n!==0&&(Math.abs(n)<.001||Math.abs(n)>1e5)?n.toExponential(2):fmt(n);
    const marker=sample===undefined?'':'<path d="M'+(65+490*(sample-lo)/(hi-lo))+' 35V225" stroke="var(--ink-muted)" stroke-dasharray="4 4"/><circle cx="'+(65+490*(sample-lo)/(hi-lo))+'" cy="'+(225-170*(fn(sample)-min)/span)+'" r="5" fill="var(--accent)" stroke="var(--paper)" stroke-width="2"/>';
    host.innerHTML='<svg viewBox="0 0 610 285" role="img" aria-label="กราฟ '+conf.label+' ตาม '+conf.axis+'" data-sample-x="'+sample+'" data-sample-y="'+fn(sample)+'"><path d="M65 35V225H565" fill="none" stroke="var(--ink-muted)"></path><text x="65" y="22" fill="var(--ink)" font-size="14">'+conf.label+'</text><text x="255" y="274" fill="var(--ink)" font-size="14">'+conf.axis+'</text><text x="62" y="247" fill="var(--ink)">'+fmt(lo)+'</text><text x="535" y="247" fill="var(--ink)">'+fmt(hi)+'</text><text x="4" y="55" fill="var(--ink)" font-size="12">'+number(max)+'</text><text x="4" y="224" fill="var(--ink)" font-size="12">'+number(min)+'</text><path d="'+path(points)+'" stroke="var(--accent)" fill="none" stroke-width="3"></path>'+(second?'<path d="'+path(extra)+'" stroke="var(--accent2)" fill="none" stroke-width="2" stroke-dasharray="7 5"></path>':'')+marker+'</svg>';
  }
  document.querySelectorAll('.physics-lab').forEach((host,idx)=>{
    const kind=host.dataset.lab,conf=config[kind]; if (!conf) return;
    const controls=host.querySelector('.lab-controls');
    conf.controls.forEach((c,i)=>{
      const id='lab-'+idx+'-'+i;
      controls.insertAdjacentHTML('beforeend','<div><label for="'+id+'">'+c[0]+' · <output id="'+id+'-value">'+c[4]+'</output></label><input type="range" id="'+id+'" class="learning-input" min="'+c[1]+'" max="'+c[2]+'" step="'+c[3]+'" value="'+c[4]+'"></div>');
    });
    function update() {
      const sliders=Array.from(controls.querySelectorAll('input'));
      const [a,b]=sliders.map(el=>Number(el.value));
      sliders.forEach(el=>document.getElementById(el.id+'-value').value=el.value);
      const fn={
        continuity:r=>Math.exp(-a)/r/r, dielectric:er=>er*8.854e-3*b,
        boundary:er=>1e-9/(er*8.854e-12), capacitor:d=>8.854e-12*0.01/(d*1e-3)*1e12,
        laplace:z=>b*z, wire:r=>a/(2*Math.PI*r*0.01),
        ampere:r=>r===0?0:a*Math.min(1,(r/5)*(r/5))/(2*Math.PI*r*0.001),
        curl:x=>-2*x*b-x*x, flux:t=>b*0.03*Math.cos(t*Math.PI/180)*1e3,
        maxwell:r=>r, faraday:p=>2*Math.PI*b*0.01*0.2*Math.sin(p),
        displacement:p=>-2*Math.PI*b*1e-9*10*Math.sin(p)*1e6,
        wave:z=>Math.cos(a-b*2*Math.PI*z)
      }[kind];
      const second=kind==='wave'?z=>b*fn(z):kind==='displacement'?fn:null;
      const sample=['continuity','wire','ampere'].includes(kind)?b:kind==='laplace'?.5:kind==='wave'?.25:a;
      graph(host.querySelector('.lab-chart'),conf,fn,second,sample);
      host.querySelector('.lab-result').innerHTML='<div class="math-display">'+conf.explain(a,b)+'</div><p>จุดบนกราฟ: '+conf.axis+' = '+fmt(sample)+' · '+conf.label+' = '+fmt(fn(sample))+'</p><p>แกนและผลคำนวณใช้พารามิเตอร์ชุดเดียวกัน กราฟมีไว้ตรวจความหมายทางกายภาพ ขั้นปริพันธ์ในข้อสอบยังต้องแสดงด้วยมือ</p>';
    }
    controls.addEventListener('input',update);update();
    if (kind==='wave') {
      const button=document.createElement('button');button.className='btn btn-secondary';button.type='button';button.textContent='เล่นการเคลื่อนที่';host.append(button);
      let running=false,last=0;
      const tick=time=>{if(!running)return;const slider=controls.querySelector('input');if(last)slider.value=String((Number(slider.value)+(time-last)*0.001)%6.28);last=time;update();requestAnimationFrame(tick);};
      button.addEventListener('click',()=>{running=!running;button.textContent=running?'พักการเคลื่อนที่':'เล่นการเคลื่อนที่';last=0;if(running)requestAnimationFrame(tick);});
      document.addEventListener('visibilitychange',()=>{if(document.hidden){running=false;button.textContent='เล่นการเคลื่อนที่';last=0;}});
    }
  });
})();
