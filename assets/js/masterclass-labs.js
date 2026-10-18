/* Guided physical models; the existing chapter laboratories remain available. */
(() => {
 const eps=8.8541878128e-12,k=1/(4*Math.PI*eps),rad=d=>d*Math.PI/180;
 const fmt=x=>Number.isFinite(x)?(Math.abs(x)<1e-12?'0':Number(x.toPrecision(5)).toString()):'ไม่กำหนด';
 const models={
  1:{c:[['มุม θ (°)',0,180,1,60],['|B|',1,10,.1,3]],f:(a,b)=>2*b*Math.cos(rad(a)),r:(a,b)=>'|<b>A</b>|=2: <b>A</b> • <b>B</b> = '+fmt(2*b*Math.cos(rad(a)))+'; |<b>A</b> × <b>B</b>| = '+fmt(2*b*Math.sin(rad(a))),note:'A อยู่ตาม +x, B อยู่ระนาบ xy มุมกราฟคือมุมระหว่างเวกเตอร์',plot:x=>Math.cos(Math.PI*x),axis:'ผลคูณจุดตามมุม 0° ถึง 180°'},
  2:{c:[['ϕ ของฐาน (°)',-180,180,1,30],['|A| ตาม +x',1,10,.1,5]],r:(a,b)=>'<em>A</em><sub>ρ</sub> = '+fmt(b*Math.cos(rad(a)))+'; <em>A</em><sub>ϕ</sub> = '+fmt(-b*Math.sin(rad(a)))+'; |<b>A</b>| = '+fmt(b),note:'เวกเตอร์ฉากคงเดิม ฐานทรงกระบอกหมุนตามตำแหน่ง',plot:x=>Math.cos(2*Math.PI*x),axis:'องค์ประกอบรัศมีตาม ϕ ครบหนึ่งรอบ'},
  3:{c:[['θ จาก +z (°)',0,180,1,50],['r (m)',.2,5,.1,2]],r:(a,b)=>'ช่อง Δθ=Δϕ=0.1 rad มีพื้นที่ประมาณ '+fmt(b*b*Math.sin(rad(a))*.01)+' m²; z = '+fmt(b*Math.cos(rad(a)))+' m',note:'พื้นที่ช่องเล็ก r²sinθΔθΔϕ ลดเป็นศูนย์ที่ขั้ว',plot:x=>Math.sin(Math.PI*x),axis:'พื้นที่ช่องผิวตาม θ จาก 0° ถึง 180°'},
  4:{c:[['ประจุแหล่ง (µC)',-5,5,.1,2],['R (m)',.2,5,.1,1]],r:(a,b)=>'ประจุทดสอบ +1 µC: F ตามแนวจากแหล่ง = '+fmt(k*a*1e-12/(b*b))+' N',note:'จุดประจุในอวกาศว่าง F ลบหมายถึงดึงเข้าหาแหล่ง',plot:x=>1/(1+4*x)**2,axis:'ขนาดแรงลดตาม 1/R²'},
  5:{c:[['ρl (nC/m)',-10,10,.1,3],['L ของลวดช่วง 0 ถึง L (m)',.1,10,.1,4]],r:(a,b)=>'P(0,3,0): <em>E</em><sub>y</sub> = '+fmt(k*a*1e-9*b/(3*Math.hypot(3,b)))+' V/m; <em>E</em><sub>z</sub> = '+fmt(k*a*1e-9*(1/Math.hypot(3,b)-1/3))+' V/m',note:'ลวดบนแกน z อวกาศว่าง ลวดด้านเดียวจึงมีองค์ประกอบตาม z',plot:x=>10*x/Math.hypot(3,10*x),axis:'ส่วนรัศมีเพิ่มตามความยาวลวด'},
  6:{c:[['มุมกับปกติ (°)',0,180,1,30],['พื้นที่ (m²)',.1,5,.1,1]],r:(a,b)=>'|<b>D</b>|=2 C/m²: Ψ = '+fmt(2*b*Math.cos(rad(a)))+' C',note:'สนามสม่ำเสมอบนผิวแบน เลือกปกติก่อนกำหนดเครื่องหมาย',plot:x=>Math.cos(Math.PI*x),axis:'ฟลักซ์ตามมุมกับปกติ'},
  7:{c:[['ρl (nC/m)',-10,10,.1,3],['ρ ของผิว (m)',.2,5,.1,1]],r:(a,b)=>'<em>D</em><sub>ρ</sub> = '+fmt(a/(2*Math.PI*b))+' nC/m²; ผิวปิดยาว 1 m มีฟลักซ์ '+fmt(a)+' nC',note:'ลวดอนันต์สม่ำเสมอ ไม่มีฟลักซ์ผ่านฝาทรงกระบอก',plot:x=>1/(1+4*x),axis:'D ลดตาม 1/ρ แต่ฟลักซ์รวมคงเดิม'},
  8:{c:[['k (C/m³)',-3,3,.1,1],['ด้านกล่อง (m)',.2,3,.1,1]],r:(a,b)=>'<b>D</b>=k(x <b>a</b><sub>x</sub>+y <b>a</b><sub>y</sub>+z <b>a</b><sub>z</sub>): ∇ • <b>D</b> = '+fmt(3*a)+' C/m³; ฟลักซ์ = '+fmt(3*a*b**3)+' C',note:'กล่องรอบจุดกำเนิด สนามเชิงเส้นตามตำแหน่ง; k=0 ให้สนามศูนย์ ใช้สื่อหลักด้านล่างเทียบสนามคงที่ที่ไม่ศูนย์',plot:x=>x**3,axis:'ฟลักซ์เพิ่มตามปริมาตรกล่อง'},
  9:{c:[['Q (nC)',-10,10,.1,3],['r (m)',.2,5,.1,1]],r:(a,b)=>'V = '+fmt(k*a*1e-9/b)+' V; <em>E</em><sub>r</sub> = '+fmt(k*a*1e-9/b**2)+' V/m',note:'ประจุจุดในอวกาศว่าง V(∞)=0',plot:x=>1/(1+4*x),axis:'ศักย์ประจุจุดตาม r'},
  10:{c:[['σ (S/m)',.1,10,.1,2],['E ปกติ (V/m)',-10,10,.1,3]],r:(a,b)=>'<em>J</em><sub>n</sub> = '+fmt(a*b)+' A/m²; กระแสผ่านพื้นที่ 0.01 m² = '+fmt(.01*a*b)+' A',note:'ตัวนำโอห์ม σ คงที่ สนามสม่ำเสมอตั้งฉากผิว',plot:x=>x,axis:'J ตาม σ เมื่อ E ตรึง'},
  11:{c:[['εr',1,10,.1,2.1],['Q อิสระ (nC)',.1,10,.1,1]],r:(a,b)=>'พื้นที่ 0.01 m²: D = '+fmt(b*1e-7)+' C/m²; E = '+fmt(b*1e-7/(eps*a))+' V/m',note:'ตรึงประจุอิสระและพื้นที่ แผ่นขนาน ไดอิเล็กทริกเชิงเส้น; ใช้สื่อหลักเทียบกรณีแรงดันตรึง',plot:x=>1/(1+9*x),axis:'E ลดตาม εr เมื่อ Q ตรึง'},
  12:{c:[['θ1 จากปกติ (°)',0,80,1,40],['εr2',1,10,.1,1]],r:(a,b)=>{const et=100*Math.sin(rad(a)),en=2.1*100*Math.cos(rad(a))/b;return '<em>E</em><sub>t2</sub> = '+fmt(et)+' V/m; <em>E</em><sub>n2</sub> = '+fmt(en)+' V/m; θ2 = '+fmt(Math.atan2(et,en)*180/Math.PI)+'°';},note:'εr1=2.1, |E1|=100 V/m, ρs=0 ลูกศรคือสนาม ไม่ใช่เส้นทางแสง',plot:x=>1/(1+9*x),axis:'E ปกติฝั่ง 2 ลดตาม εr2'},
  13:{c:[['d (mm)',.1,5,.1,1],['S (cm²)',1,100,1,20]],r:(a,b)=>{const c=2*eps*b*1e-4/(a*1e-3);return 'ε<sub>r</sub>=2: <em>C</em> = '+fmt(c*1e12)+' pF; V=10 V ให้ W = '+fmt(.5*c*100)+' J';},note:'แผ่นขนานละเลยสนามขอบ cm² เป็น 10⁻⁴ m², mm เป็น 10⁻³ m',plot:x=>1/(1+9*x),axis:'C ลดเมื่อ d เพิ่ม'},
  14:{c:[['V0 (V)',-100,100,1,50],['d (mm)',.1,5,.1,1]],r:(a,b)=>'<em>V</em>(z) = '+fmt(a)+' z/d V; <em>E</em><sub>z</sub> = '+fmt(-a/(b*1e-3))+' V/m',note:'V(0)=0, V(d)=V0, ε คงที่, ρv=0, หนึ่งมิติ',plot:(x,a)=>a/100*x,axis:'ศักย์ตาม z/d'},
  15:{c:[['I ตาม +z (A)',-10,10,.1,3],['ρ (m)',.1,5,.1,1]],r:(a,b)=>'<em>H</em><sub>ϕ</sub> = '+fmt(a/(2*Math.PI*b))+' A/m',note:'ลวดอนันต์ สนาม +aϕ เมื่อ I บวก ไม่ใช้ที่แกนลวด',plot:x=>1/(1+4*x),axis:'H ลดตาม 1/ρ'},
  16:{c:[['I รวมตาม +z (A)',-10,10,.1,3],['ρ (mm)',1,60,1,10]],r:(a,b)=>'<em>H</em><sub>ϕ</sub> = '+fmt(b<20?a*b*.001/(2*Math.PI*.02**2):a/(2*Math.PI*b*.001))+' A/m',note:'ตัวนำตันรัศมี a=20 mm กระแสกระจายสม่ำเสมอ',plot:x=>x<1/3?3*x:1/(3*x),axis:'H ภายในเพิ่มตาม ρ แล้วภายนอกลดตาม 1/ρ'},
  17:{c:[['k (A/m²)',-5,5,.1,2],['ด้านวง a (m)',.2,3,.1,1]],r:(a,b)=>'<b>H</b>=k x <b>a</b><sub>y</sub>: ∇ × <b>H</b> = '+fmt(a)+' <b>a</b><sub>z</sub> A/m²; ทั้งสองด้านสโตกส์ = '+fmt(a*b*b)+' A',note:'วง 0≤x,y≤a, z=0, ปกติ +az; กราฟแสดงการวนตามขนาดพื้นที่',plot:x=>x*x,axis:'การวนเพิ่มตาม a²'},
  18:{c:[['μr',1,100,1,10],['H (A/m)',-10,10,.1,3]],r:(a,b)=>'B = '+fmt(4*Math.PI*1e-7*a*b)+' T; ผิวเปิด 0.01 m² ปกติ B มี Φ = '+fmt(4*Math.PI*1e-9*a*b)+' Wb',note:'ตัวกลางเชิงเส้น ไม่จำลองความอิ่มตัวของเหล็ก',plot:x=>x,axis:'B ตาม μ เมื่อ H ตรึง'},
  19:{c:[['Q ที่ล้อม (nC)',-5,5,.1,1],['I ที่ล้อม (A)',-5,5,.1,1]],r:(a,b)=>'ฟลักซ์ D ผิวปิด = '+fmt(a)+' nC; การวน H = '+fmt(b)+' A; ฟลักซ์ B ผิวปิด = 0',note:'ประจุและกระแสสถิต ทิศวงกับผิวตามมือขวา',plot:x=>x,axis:'ฟลักซ์ D เพิ่มตาม Q ที่ล้อม'},
  20:{c:[['เฟส ωt (°)',0,360,1,45],['Φ0 ต่อรอบ (mWb)',.1,10,.1,2]],r:(a,b)=>'Φ = '+fmt(b*Math.cos(rad(a)))+' mWb; e = '+fmt(100*2*Math.PI*50*b*.001*Math.sin(rad(a)))+' V',note:'วงอยู่นิ่ง N=100 รอบ f=50 Hz แต่ละรอบรับฟลักซ์เดียวกัน',plot:(x,a)=>Math.cos(2*Math.PI*x+rad(a)),axis:'ฟลักซ์ตามเวลา · e แปรตาม −dΦ/dt'},
  21:{c:[['f (Hz)',1,1000,1,50],['V0 (V)',1,100,1,10]],r:(a,b)=>'<em>C</em>=100 nF: แอมพลิจูด <em>I</em><sub>d</sub> = '+fmt(2*Math.PI*a*1e-7*b)+' A',note:'V=V0cos(2πft), σ=0; Id=−ωCV0sin(ωt)',plot:x=>-Math.sin(2*Math.PI*x),axis:'กระแสการกระจัดต่างเฟสจาก V 90°'},
  22:{c:[['f (MHz)',10,300,1,100],['เฟส ωt (°)',0,360,1,0]],r:(a)=>'อวกาศว่าง: λ = '+fmt(299792458/(a*1e6))+' m; β = '+fmt(2*Math.PI*a*1e6/299792458)+' rad/m; <em>E</em><sub>0</sub>=1 V/m ให้ <em>H</em><sub>0</sub>≈2.6544 mA/m',note:'คลื่นสูญเสียเป็นศูนย์เดิน +z, E ตาม x, H ตาม y, cos(ωt−βz)',plot:(x,a,b)=>Math.cos(rad(b)-4*Math.PI*x),axis:'E ตาม z จาก 0 ถึง 2λ · เพิ่มเวลา ยอดเดิน +z'}
 };
 function line(x,y,xx,yy,color){return '<line x1="'+x+'" y1="'+y+'" x2="'+xx+'" y2="'+yy+'" stroke="'+(color||'#2563eb')+'" stroke-width="3"/>';}
 function arrow(x,y,dx,dy,color){const t=Math.atan2(dy,dx),xx=x+dx,yy=y+dy;return line(x,y,xx,yy,color)+line(xx,yy,xx-10*Math.cos(t-.45),yy-10*Math.sin(t-.45),color)+line(xx,yy,xx-10*Math.cos(t+.45),yy-10*Math.sin(t+.45),color);}
 const charts={
  3:{domain:[0,180],x:'θ (°)',y:'พื้นที่ช่องผิว (m²)',sample:(a)=>a,f:(x,a,b)=>b*b*Math.sin(rad(x))*.01},
  4:{domain:[.2,5],x:'R (m)',y:'แรงตามแนวแหล่ง → ผู้รับ (N)',sample:(a,b)=>b,f:(x,a)=>k*a*1e-12/(x*x)},
  5:{domain:[.1,10],x:'ความยาวลวด L (m)',y:'E (V/m) · น้ำเงิน Ey / ส้ม Ez',sample:(a,b)=>b,f:(x,a)=>k*a*1e-9*x/(3*Math.hypot(3,x)),second:(x,a)=>k*a*1e-9*(1/Math.hypot(3,x)-1/3)},
  6:{domain:[0,180],x:'มุม D กับปกติ (°)',y:'ฟลักซ์ Ψ (C)',sample:(a)=>a,f:(x,a,b)=>2*b*Math.cos(rad(x))},
  7:{domain:[.2,5],x:'ρ (m)',y:'D รัศมี (nC/m²)',sample:(a,b)=>b,f:(x,a)=>a/(2*Math.PI*x)},
  8:{domain:[.2,3],x:'ด้านกล่อง (m)',y:'ฟลักซ์ผิวปิด (C)',sample:(a,b)=>b,f:(x,a)=>3*a*x**3},
  9:{domain:[.2,5],x:'r (m)',y:'ศักย์ V (V)',sample:(a,b)=>b,f:(x,a)=>k*a*1e-9/x},
  10:{domain:[.1,10],x:'σ (S/m)',y:'J ปกติ (A/m²)',sample:(a)=>a,f:(x,a,b)=>x*b},
  11:{domain:[1,10],x:'ε สัมพัทธ์',y:'E (V/m) · Q คงที่',sample:(a)=>a,f:(x,a,b)=>b*1e-7/(eps*x)},
  13:{domain:[.1,5],x:'d (mm)',y:'ความจุ C (pF)',sample:(a)=>a,f:(x,a,b)=>2*eps*b*1e-4/(x*1e-3)*1e12},
  14:{domain:[0,1],x:'z/d',y:'ศักย์ V (V)',sample:()=>.5,f:(x,a)=>a*x},
  16:{domain:[0,60],x:'ρ (mm) · ผิวลวดที่ 20 mm',y:'H สัมผัสวง (A/m)',sample:(a,b)=>b,f:(x,a)=>x===0?0:x<20?a*x*.001/(2*Math.PI*.02**2):a/(2*Math.PI*x*.001)},
  17:{domain:[.2,3],x:'ด้านวง a (m)',y:'การวน H (A)',sample:(a,b)=>b,f:(x,a)=>a*x*x},
  18:{domain:[1,100],x:'μ สัมพัทธ์',y:'B (T) · H คงที่',sample:(a)=>a,f:(x,a,b)=>4*Math.PI*1e-7*x*b},
  19:{domain:[-5,5],x:'ประจุที่ล้อม Q (nC)',y:'ฟลักซ์ D สุทธิ (nC)',sample:(a)=>a,f:x=>x},
  20:{domain:[0,360],x:'เฟส ωt (°)',y:'ฟลักซ์ Φ (mWb)',sample:(a)=>a,f:(x,a,b)=>b*Math.cos(rad(x))},
  21:{domain:[0,1],x:'t/T · น้ำเงิน i / ส้ม Id ซ้อนกัน',y:'กระแส (A)',sample:()=>.25,f:(x,a,b)=>-2*Math.PI*a*1e-7*b*Math.sin(2*Math.PI*x),second:(x,a,b)=>-2*Math.PI*a*1e-7*b*Math.sin(2*Math.PI*x)},
  22:{domain:[0,6],x:'z (m) · E/1 V/m = ηH/1 V/m',y:'สนามปรับขนาด',sample:()=>1.5,f:(x,a,b)=>Math.cos(rad(b)-2*Math.PI*a*1e6*x/299792458)}
 };
 function chart(conf,a,b){
  const [lo,hi]=conf.domain,values=Array.from({length:121},(_,i)=>{const x=lo+(hi-lo)*i/120;return [x,conf.f(x,a,b)];});
  const other=conf.second?values.map(p=>[p[0],conf.second(p[0],a,b)]):[];
  const all=values.concat(other).map(p=>p[1]),low=Math.min(0,...all),high=Math.max(0,...all),span=high-low||1;
  const xx=x=>95+475*(x-lo)/(hi-lo),yy=y=>235-170*(y-low)/span;
  const path=points=>points.map((p,i)=>(i?'L':'M')+xx(p[0]).toFixed(2)+','+yy(p[1]).toFixed(2)).join(' ');
  const sample=conf.sample(a,b),value=conf.f(sample,a,b),number=x=>Math.abs(x)>1e5||(x!==0&&Math.abs(x)<.001)?x.toExponential(2):fmt(x);
  return '<svg viewBox="0 0 620 300" role="img" aria-label="'+conf.y+' ตาม '+conf.x+'" data-sample-x="'+sample+'" data-sample-y="'+value+'"><text x="95" y="30" fill="var(--ink)" font-size="15">'+conf.y+'</text><path d="M95 55V235H575" fill="none" stroke="var(--ink-muted)"/><path d="M95 '+yy(0)+'H575" stroke="var(--rule)" stroke-dasharray="4 4"/><text x="85" y="70" text-anchor="end" fill="var(--ink)" font-size="13">'+number(high)+'</text><text x="85" y="237" text-anchor="end" fill="var(--ink)" font-size="13">'+number(low)+'</text><text x="95" y="257" fill="var(--ink)" font-size="13">'+lo+'</text><text x="570" y="257" text-anchor="end" fill="var(--ink)" font-size="13">'+hi+'</text><text x="95" y="282" fill="var(--ink)" font-size="14">'+conf.x+'</text><path d="'+path(values)+'" fill="none" stroke="var(--accent)" stroke-width="3"/>'+(other.length?'<path d="'+path(other)+'" fill="none" stroke="var(--accent2)" stroke-width="2.5" stroke-dasharray="6 5"/>':'')+'<path d="M'+xx(sample)+' 55V235" stroke="var(--ink-muted)" stroke-dasharray="4 4"/><circle cx="'+xx(sample)+'" cy="'+yy(value)+'" r="5" fill="var(--accent)" stroke="var(--paper)" stroke-width="2"/></svg>';
 }
 document.querySelectorAll('.master-lab').forEach(host=>{
  const n=Number(host.dataset.chapter),m=models[n];if(!m)return;const controls=host.querySelector('.master-lab-controls');
  m.c.forEach(s=>{const label=document.createElement('label');label.innerHTML='<span>'+s[0]+'</span><input type="range" min="'+s[1]+'" max="'+s[2]+'" step="'+s[3]+'" value="'+s[4]+'" aria-label="'+s[0]+'"><output></output>';controls.append(label);label.querySelector('input').addEventListener('input',draw);});
  const reflection=host.querySelector('textarea'),storage='emf-reflection-'+n;try{reflection.value=localStorage.getItem(storage)||'';}catch{/* Session only. */}
  reflection.addEventListener('input',()=>{try{localStorage.setItem(storage,reflection.value);host.querySelector('.reflection-status').textContent='บันทึกข้อสังเกตแล้ว';}catch{host.querySelector('.reflection-status').textContent='บันทึกไม่ได้';}});
  function draw(){
   const inputs=[...controls.querySelectorAll('input')],a=Number(inputs[0].value),b=Number(inputs[1].value);inputs.forEach(x=>x.parentElement.querySelector('output').value=x.value);
   let picture='';
   if(n===12){const et=100*Math.sin(rad(a)),en1=100*Math.cos(rad(a)),en2=2.1*en1/b,sc=100/Math.max(100,Math.hypot(et,en2));picture=line(30,130,390,130,'#64748b')+line(210,20,210,240,'#94a3b8')+arrow(130,30,et*sc,en1*sc,'#b45309')+arrow(210,135,et*sc,en2*sc);}
   else if(n===15){if(a!==0)[35,65,95].forEach(r=>{picture+='<circle cx="210" cy="135" r="'+r+'" fill="none" stroke="#2563eb"/>'+arrow(210+r,135,0,a>=0?-22:22);});const radius=25+16*b;picture+='<circle cx="210" cy="135" r="9" fill="#b45309"/><circle cx="'+(210+radius)+'" cy="135" r="5" fill="var(--green)"/><text x="'+(218+radius)+'" y="128" fill="var(--ink)">P</text><text x="20" y="25" fill="var(--ink)">P ที่ ρ = '+fmt(b)+' m · I = '+fmt(a)+' A</text>';}
   else if(n===1){picture=arrow(160,150,36,0)+arrow(160,150,18*b*Math.cos(rad(a)),-18*b*Math.sin(rad(a)),'#b45309')+'<text x="20" y="25" fill="var(--ink)">น้ำเงิน A คงที่ / ส้ม B · สเกลเดียวกัน</text>';}
   else if(n===2){picture=arrow(180,140,16*b,0)+arrow(180,140,90*Math.cos(rad(a)),-90*Math.sin(rad(a)),'#b45309')+arrow(180,140,-75*Math.sin(rad(a)),-75*Math.cos(rad(a)),'#047857')+'<text x="20" y="25" fill="var(--ink)">น้ำเงิน A / ส้ม ฐาน ρ / เขียว ฐาน ϕ</text>';}
   const svgTitle=n===12?'ทิศสนามสองฝั่งรอยต่อ':n===15?'วงสนามแม่เหล็กรอบลวด':m.axis;
   host.querySelector('.master-lab-view').innerHTML=charts[n]?chart(charts[n],a,b):'<svg viewBox="0 0 420 260" role="img" aria-label="'+svgTitle+'">'+picture+'</svg>';
   host.querySelector('.master-lab-result').innerHTML=m.r(a,b);host.querySelector('.master-lab-assumptions').textContent=m.note+(charts[n]?' · แกนมีหน่วยจริง เส้นประและจุดคือ '+(n===14?'กึ่งกลางช่อง z/d=0.5':n===21?'เวลา t/T=0.25':n===22?'ตำแหน่ง z=1.5 m':'ค่าที่เลือก'):' · รูปแสดงทิศและเรขาคณิต ค่าตัวเลขอ่านจากผลคำนวณ');
  }draw();
 });
})();
