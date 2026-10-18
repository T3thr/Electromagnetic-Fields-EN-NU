#!/usr/bin/env python3
"""Build readable static chapters, formula sheet, and shared navigation."""
from pathlib import Path
import json, re, subprocess
from urllib.parse import quote
from final_content import *
from final_problems import PROBLEMS
from final_formulas import FORMULA_PAGES
from final_annotations import DERIVATIONS, SUPPLEMENT_NOTES

ROOT = Path(__file__).resolve().parents[1]
MID = [('01-vector-algebra','พีชคณิตเวกเตอร์'),('02-cylindrical-coordinates','พิกัดทรงกระบอก'),('03-spherical-coordinates','พิกัดทรงกลม'),('04-coulombs-law','กฎคูลอมบ์'),('05-electric-field-intensity','สนามไฟฟ้า'),('06-electric-flux-density','ฟลักซ์ไฟฟ้า'),('07-gauss-law','กฎเกาส์'),('08-divergence-theorem','ไดเวอร์เจนซ์'),('09-electric-potential','ศักย์ไฟฟ้า')]
COURSE = [(str(i+1).zfill(2),slug,title) for i,(slug,title) in enumerate(MID)] + [(str(c[0]),c[1],c[2]) for c in CHAPTERS]

def url(path, base=''):
    return base+quote(path, safe='/#-.')

def navigation(base):
    groups=''; mobile=''
    for name,items in [('กลางภาค · Sets 01–09',COURSE[:9]),('ปลายภาค · Sets 10–22',COURSE[9:])]:
        groups += '<div class="dropdown-header">'+name+'</div>'
        links=''.join('<a class="dropdown-item" href="'+base+s+'/index.html"><span class="ch-num">'+n+'</span>'+t+'</a>' for n,s,t in items)
        groups+=links
        mobile += '<details class="mobile-course-group"><summary>'+name+'</summary>'+links+'</details>'
    resources=[('formula-sheet/index.html','ใบสูตรกลางภาค'),('formula-sheet-final/index.html','ใบสูตรปลายภาค')]
    exams=[('exam-simulator/midterm/index.html','ห้องสอบกลางภาค'),('exam-simulator/final/index.html','ห้องสอบปลายภาค')]
    def menu(title,items):
        return '<li class="nav-item"><button class="nav-link nav-dropdown-button" type="button" aria-expanded="false">'+title+' ▾</button><div class="dropdown-menu">'+''.join('<a class="dropdown-item" href="'+base+p+'">'+t+'</a>' for p,t in items)+'</div></li>'
    return '<header class="site-header"><nav class="site-navbar" aria-label="เมนูหลัก"><a href="'+base+'index.html" class="nav-brand"><span class="course-code">303214</span><span>สนามแม่เหล็กไฟฟ้า 1</span></a><ul class="nav-menu"><li><a class="nav-link" href="'+base+'index.html">หน้าหลัก</a></li><li class="nav-item"><button type="button" class="nav-link nav-dropdown-button" aria-expanded="false">สารบัญรายวิชา ▾</button><div class="dropdown-menu">'+groups+'</div></li>'+menu('ใบสูตร',resources)+menu('ห้องสอบ',exams)+'</ul><div class="nav-actions"><button class="search-trigger-btn" type="button" aria-label="ค้นหาคลังความรู้"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><circle cx="10" cy="10" r="7"></circle><path d="m16 16 6 6"></path></svg><span>ค้นหา</span><span class="search-kbd-hint">Ctrl K</span></button><button class="theme-toggle-btn" type="button" aria-label="เปลี่ยนธีม"></button><button class="nav-mobile-toggle" type="button" aria-label="เปิดเมนู" aria-expanded="false">☰</button></div></nav><div class="mobile-nav-drawer"><a class="mobile-nav-link" href="'+base+'index.html">หน้าหลัก</a>'+''.join('<a class="mobile-nav-link" href="'+base+p+'">'+t+'</a>' for p,t in resources+exams)+mobile+'</div></header>'

def shell(title, content, base='../', extra=''):
    return '<!doctype html><html lang="th"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="emf-root" content="'+base+'"><link rel="icon" href="data:,"><title>'+title+' · 303214</title><link rel="stylesheet" href="'+base+'assets/css/style.css"><link rel="stylesheet" href="'+base+'assets/css/final.css"></head><body>'+navigation(base)+content+'<script src="'+base+'assets/js/common.js"></script><script src="'+base+'assets/js/engines/search-index.js"></script><script src="'+base+'assets/js/engines/site-search.js"></script><script src="'+base+'assets/js/final-learning.js"></script>'+extra+'</body></html>'

def save(path,text):
    p=ROOT/path; p.parent.mkdir(parents=True,exist_ok=True);p.write_text(text)

def source_link(source,base='../'):
    label,path,page=source
    return '<a href="'+url(path,base)+'#page='+str(page)+'" target="_blank" rel="noopener">'+label+' · หน้า PDF '+str(page)+'</a>'

def solution(p):
    return ''.join('<div class="card solution-step"><h4>'+str(i+1)+'. '+t+'</h4>'+s+'</div>' for i,(t,s) in enumerate(p['steps']))

def symbol_text(s):
    names={'I':I,'J':J,'ρv':rv,'ρs':rs,'εr':'ε<sub>r</sub>','V0':sub(V,'0'),'Et':'<em>E</em><sub>t</sub>','Dn':'<em>D</em><sub>n</sub>','Hϕ':'<em>H</em><sub>ϕ</sub>','Ienc':'<em>I</em><sub>enc</sub>','Jd':sub(J,'d'),'Id':sub(I,'d'),'dl′':'d<b>l</b>′','∇²V':'∇<sup>2</sup>'+V,'∇×H':'∇ × '+H}
    return names.get(s,vec(s) if s in ['P','D','E','H','B','A','v'] else scalar(s))

def source_manifest():
    result=[]
    for p in sorted((ROOT/'lecture/final').rglob('*.pdf')):
        meta=subprocess.run(['pdfinfo',str(p)],capture_output=True,text=True,check=True).stdout
        pages=int(re.search(r'Pages:\s+(\d+)',meta).group(1))
        match=re.match(r'set(\d+)',p.parent.name)
        key=re.sub(r'[^a-zA-Z0-9-]','-',p.stem)
        result.append(dict(path=str(p.relative_to(ROOT)),pages=pages,set=int(match.group(1)),key=key))
    return result

def glossary():
    rows = [
        ('x,y,z; r,ρ; θ,ϕ','เอ็กซ์ วาย แซด; อาร์ โร; ทีตา ไฟ · พิกัดและมุม','m; m; rad'),
        ('<b>E</b>, <b>D</b>; <b>H</b>, <b>B</b>','อี ดี; เอช บี · สนามและฟลักซ์ไฟฟ้า/แม่เหล็ก','V/m, C/m²; A/m, T'),
        ('<b>J</b>, <b>K</b>; ρ<sub>v</sub>, ρ<sub>s</sub>','เจ เค; โรซับวี โรซับเอส · กระแสปริมาตร/ผิวและประจุปริมาตร/ผิว','A/m², A/m; C/m³, C/m²'),
        ('ε, μ, σ; ε<sub>r</sub>, μ<sub>r</sub>','เอปไซลอน มิว ซิกมา · สภาพยอม ความซาบซึมได้ สภาพนำ; ค่าสัมพัทธ์','F/m, H/m, S/m; ไม่มีหน่วย'),
        ('<b>P</b>, χ<sub>e</sub>','พี ไคซับอี · โพลาไรเซชันและความไวทางไฟฟ้า','C/m², ไม่มีหน่วย'),
        ('<em>I</em>, <em>Q</em>, <em>q</em>; <em>V</em>, <em>V</em><sub>0</sub>','ไอ คิว คิว; วี วีซับศูนย์ · กระแส ประจุรวม/ย่อย ศักย์/แรงดันกำหนด','A, C, C; V, V'),
        ('<em>C</em>, <em>W</em>; <em>S</em>, <em>A</em>; d,L','ซี ดับเบิลยู; เอส เอ; ดี แอล · ความจุ พลังงาน พื้นที่ ระยะห่าง ความยาว','F, J; m², m²; m,m'),
        ('<b>A</b>, Φ','เอ ไฟตัวใหญ่ · ศักย์เวกเตอร์แม่เหล็กและฟลักซ์','Wb/m, Wb'),
        ('ω, f, λ; k, η','โอเมกา เอฟ แลมบ์ดา; เค อีตา · ความถี่เชิงมุม ความถี่ ความยาวคลื่น เลขคลื่น อิมพีแดนซ์','rad/s, Hz, m; rad/m, Ω'),
        ('<b>v</b>, t; d<b>l</b>, d<b>s</b>, dv','วี ที; ดีแอล ดีเอส ดีวี · ความเร็ว เวลา ส่วนย่อยความยาว ผิว ปริมาตร','m/s, s; m,m²,m³'),
        ('<b>a</b><sub>n</sub>, j; ∇, ∇<sup>2</sup>','เอซับเอ็น เจ; เดล ลาปลาเซียน · เวกเตอร์หน่วย หน่วยจินตภาพ ตัวดำเนินการพื้นที่','ไม่มีหน่วย; ต่อระยะทางและระยะทาง²'),
        ('<b>E</b><sub>s</sub>, <b>H</b><sub>s</sub>','อีซับเอส เอชซับเอส · เฟสเซอร์เชิงอวกาศ','V/m, A/m'),
    ]
    return '<details class="card"><summary>คำอ่านและหน่วยของสัญลักษณ์ร่วม</summary><div class="table-scroll"><table class="academic-table"><thead><tr><th>สัญลักษณ์</th><th>คำอ่านและความหมาย</th><th>SI</th></tr></thead><tbody>'+''.join('<tr><td>'+s+'</td><td>'+m+'</td><td>'+u+'</td></tr>' for s,m,u in rows)+'</tbody></table></div><p>องค์ประกอบสนามมีหน่วยเดียวกับสนาม ตัวห้อย t,n คือสัมผัสและปกติ ตัวห้อย 1,2 คือตัวกลาง ไพรม์ระบุแหล่งกำเนิด a ที่เป็นค่าคงตัวจากการอินทิเกรตมีหน่วยตามสมการที่ใช้; a ที่เป็นเวกเตอร์หน่วยไม่มีหน่วย</p></details>'

manifest=source_manifest()
save('assets/data/final-sources.json',json.dumps(manifest,ensure_ascii=False,indent=2))
save('assets/data/final-problems.json',json.dumps(PROBLEMS,ensure_ascii=False,indent=2))
save('assets/js/final-problems.js','window.EMF_FINAL_PROBLEMS = '+json.dumps(PROBLEMS,ensure_ascii=False)+';\n')

# Preserve the original simulator before installing the chooser.
midtarget=ROOT/'exam-simulator/midterm/index.html'
if not midtarget.exists():
    old=(ROOT/'exam-simulator/index.html').read_text()
    old=old.replace('../','../../')
    save('exam-simulator/midterm/index.html',old)

for c in CHAPTERS:
    n,slug,title,en,count,pdf,intro,formula,symbols,trap,lab,book=c
    notes=PAGE_NOTES[n]
    assert len(notes)==count,(n,len(notes),count)
    main=next(x for x in manifest if x['path']=='lecture/final/'+pdf)
    assert main['pages']==count
    sections=[('overview','ภาพรวมและที่มาของสูตร'),('variables','ตัวแปรและหน่วย SI'),('pages','บทเรียนตามหน้าสไลด์'),('examples','ตัวอย่างเชิงวิเคราะห์'),('lab','สื่อจำลอง'),('sources','เอกสารประกอบ')]
    sidebar='<aside class="chapter-sidebar card"><div class="sidebar-title">Set '+str(n)+' · ปลายภาค</div><nav><ul class="sidebar-nav">'+''.join('<li><a class="sidebar-link" href="#'+i+'">'+t+'</a></li>' for i,t in sections)+'</ul></nav><a class="btn btn-secondary" href="../formula-sheet-final/index.html">เปิดใบสูตรปลายภาค</a></aside>'
    content='<div class="chapter-container">'+sidebar+'<main class="chapter-main"><span class="academic-badge badge-primary">Final · Set '+str(n)+'</span><h1 class="book-title">'+title+'</h1><p class="subtitle">'+en+' · '+book+'</p>'
    content+='<section id="overview"><h2 class="section-title">แนวคิดและสูตรตั้งต้น</h2><div class="card"><p>'+intro+'</p>'+math(formula)+'<p>อ่าน '+source_link(('สไลด์หลัก','lecture/final/'+pdf,1))+' ควบคู่กับคำอธิบายด้านล่าง เพื่อเทียบรูปและลำดับสมการ</p></div><div class="summary-box exam-trap"><h3>กับดักข้อสอบ</h3><p>'+trap+'</p></div></section>'
    content+='<div class="card"><h3>ที่มาและความหมายทางกายภาพ</h3>'+DERIVATIONS[n]+'</div>'
    content+='<section id="variables"><h2 class="section-title">สัญลักษณ์ ความหมาย และหน่วย</h2><div class="card"><div class="table-scroll"><table class="academic-table"><thead><tr><th>สัญลักษณ์</th><th>ความหมาย / คำอ่าน</th><th>SI</th></tr></thead><tbody>'+''.join('<tr><td>'+symbol_text(s)+'</td><td>'+meaning+'</td><td>'+u+'</td></tr>' for s,meaning,u in symbols)+'</tbody></table></div></div></section>'
    content+='<section id="pages"><h2 class="section-title">ถอดความตามหน้าสไลด์ · '+str(count)+' หน้า</h2><div class="card"><label for="slide-filter">ค้นหาหัวข้อในบทนี้</label><input class="learning-input" type="search" id="slide-filter" placeholder="เช่น สูตรทั่วไป หรือ เครื่องหมาย"><p id="slide-count" role="status">แสดง '+str(count)+' หน้า</p><p>แต่ละรายการเรียบเรียงภาษาไทย พร้อมภาพต้นฉบับหน้าเดียวกัน ภาพคงรูปเวกเตอร์และลำดับการพิสูจน์ของอาจารย์ เปิดเฉพาะหน้าที่ต้องการอ่าน</p></div>'
    content+=glossary()
    for i,note in enumerate(notes,1):
        note=re.sub(r'\b([A-Za-zρ]+)([vtrn]+[12]?)\b',lambda m:m.group(0),note)
        content+='<details class="card slide-note" id="slide-'+str(i)+'"><summary>หน้า '+str(i)+' · '+note.split(':')[0]+'</summary><p>'+note+'</p><figure><img class="source-page-image" loading="lazy" width="960" height="720" src="../assets/source-pages/'+main['key']+'/'+str(i)+'.webp" alt="สไลด์ต้นฉบับ Set '+str(n)+' หน้า '+str(i)+'"><figcaption>'+source_link(('เปิดต้นฉบับขนาดเต็ม','lecture/final/'+pdf,i))+'</figcaption></figure></details>'
    content+='</section><section id="examples"><h2 class="section-title">ตัวอย่างและวิธีทำครบขั้นตอน</h2>'
    related=[p for p in PROBLEMS if n in p['sets']]
    if not related:
        related=[p for p in PROBLEMS if p['id']==('boundary' if n==11 else 'laplace' if n==13 else 'ampere' if n==18 else 'consistency')]
    for p in related:
        content+='<article class="card"><h3>'+p['title']+'</h3><p>'+p['prompt']+'</p><p class="source-line">'+p['status']+' · '+' · '.join(source_link(x) for x in p['source'])+'</p><details><summary>เปิดวิธีทำเชิงวิเคราะห์</summary>'+solution(p)+'</details></article>'
    if n==18:
        content+='<article class="card"><h3>ตัวอย่างฟลักซ์ผ่านผิวเอียง</h3><p>สนาม B = 0.2az T สม่ำเสมอ ผิวขนาด 0.03 m² มีปกติทำมุม 60° กับ +z</p>'+math('Φ = ∫<sub>S</sub> '+B+' • d<b>s</b> = BS cos θ = (0.2)(0.03)cos 60° = 0.003 Wb')+'<p>สูตรตั้งต้นเป็นอินทิกรัลผิว ใช้ B คงที่กับมุมคงที่จึงดึงออก และ ∫ ds = S ตัวอย่างนี้แพลตฟอร์มสร้างเพื่ออธิบาย ไม่ใช่ข้อสอบทางการ</p></article>'
    content+='</section><section id="lab"><h2 class="section-title">สำรวจความสัมพันธ์เชิงกายภาพ</h2><div class="practice-generator-card physics-lab" data-lab="'+lab+'"><h3>'+en+'</h3><p>เลื่อนพารามิเตอร์เพื่อดูแนวโน้มและเครื่องหมาย แล้วกลับไปพิสูจน์ด้วยสูตรตั้งต้นในตัวอย่าง</p><div class="lab-controls"></div><div class="lab-chart"></div><div class="lab-result" role="status" aria-live="polite"></div></div></section>'
    content+='<section id="sources"><h2 class="section-title">เอกสารประกอบทุกไฟล์ใน Set นี้</h2><div class="card"><p>ตัวอย่างเพิ่มเติม โน้ต และภาพลายมือแสดงเป็นหน้าต้นฉบับเรียงลำดับ ใช้คำอธิบายและวิธีทำในบทนี้ประกอบ</p><ul>'
    supp=[x for x in manifest if x['set']==n and x!=main]
    for x in supp:
        content+='<li>'+source_link(('เอกสารประกอบ '+str(supp.index(x)+1),x['path'],1))+' · '+str(x['pages'])+' หน้า</li>'
    content+='</ul></div>'
    for idx,x in enumerate(supp,1):
        annotations=SUPPLEMENT_NOTES[x['key']]
        assert len(annotations)==x['pages'],x['key']
        for page in range(1,x['pages']+1):
            content+='<details class="card supplementary-page"><summary>เอกสารประกอบ '+str(idx)+' · หน้า '+str(page)+'</summary><p>'+annotations[page-1]+'</p><img class="source-page-image" loading="lazy" src="../assets/source-pages/'+x['key']+'/'+str(page)+'.webp" alt="เอกสารประกอบ Set '+str(n)+' ชุด '+str(idx)+' หน้า '+str(page)+'"><p>'+source_link(('เปิดหน้าต้นฉบับ',x['path'],page))+'</p></details>'
    content+='</section><nav class="chapter-pagination">'
    pos=n-10
    if pos: content+='<a class="btn btn-secondary" href="../'+CHAPTERS[pos-1][1]+'/index.html">← Set '+str(n-1)+'</a>'
    if pos<12:content+='<a class="btn btn-primary" href="../'+CHAPTERS[pos+1][1]+'/index.html">Set '+str(n+1)+' →</a>'
    content+='</nav><footer class="page-footer">303214 · บทเรียนภาษาไทยที่เชื่อมกลับถึงต้นฉบับ</footer></main></div>'
    save(slug+'/index.html',shell(title,content))

formula='<div class="chapter-container"><aside class="chapter-sidebar card"><div class="sidebar-title">ใบสูตรปลายภาค · 9 หน้า</div><nav><ul class="sidebar-nav">'+''.join('<li><a class="sidebar-link" href="#page-'+str(n)+'">หน้า '+str(n)+' · '+title+'</a></li>' for n,title,items in FORMULA_PAGES)+'</ul></nav><button class="btn btn-secondary" id="print-formulas" type="button">พิมพ์ใบสูตร</button></aside><main class="chapter-main"><h1 class="book-title">ใบสูตรปลายภาคดิจิทัล</h1><p class="subtitle">เรียบเรียงจากไฟล์แจกสอบปีการศึกษา 2569 · จำนวนจริง 9 หน้า</p><div class="card"><label for="formula-filter">ค้นหาสูตร ชื่อกฎ หรือหน่วย</label><input id="formula-filter" class="learning-input" type="search" placeholder="เช่น เคิร์ล, F/m, ฟาราเดย์"><p id="formula-count" role="status"></p><p>'+source_link(('เปิดใบสูตรทางการ','raw/formu_214_fin_69.pdf',1))+'</p><p>สูตรใช้ Semantic HTML; หน่วยและเงื่อนไขในคำอธิบายเป็นส่วนขยายสำหรับการอ่าน ตรวจรูปต้นฉบับได้ทุกหน้า หน้า 1–4 เป็นเครื่องมือพื้นฐานที่ยังใช้ในไฟนอล</p></div>'
for n,title,items in FORMULA_PAGES:
    formula+='<section id="page-'+str(n)+'" class="formula-page"><h2 class="section-title">หน้า '+str(n)+' · '+title+'</h2>'
    for heading,eq,note in items:
        formula+='<article class="card searchable-formula"><h3>'+heading+'</h3>'+math(eq)+'<p>'+note+'</p></article>'
    formula+='<details class="card formula-original"><summary>เทียบใบสูตรต้นฉบับ · หน้า '+str(n)+'</summary><img class="source-page-image" loading="lazy" src="../assets/source-pages/formula/'+str(n)+'.webp" alt="ใบสูตรทางการหน้า '+str(n)+'"><p>'+source_link(('เปิดหน้าต้นฉบับ','raw/formu_214_fin_69.pdf',n))+'</p></details></section>'
formula+='<section><h2 class="section-title">สูตรอ่านเสริมที่แยกจากใบสูตรแจกสอบ</h2><div class="card searchable-formula"><h3>ศักย์เวกเตอร์และขอบเขตที่มีกระแสผิว</h3>'+math(B+' = ∇ × <b>A</b><br><b>A</b> = '+frac('μ','4π')+'∫<sub>vol</sub> '+frac(J,'R')+' dv′<br>'+magbc)+'<p>A มีหน่วย Wb/m; สูตรปริพันธ์นี้สำหรับกระแสคงตัวในตัวกลาง μ คงที่ กำหนด <b>a</b><sub>n12</sub> ในหน้านี้ให้ชี้ 2 → 1 เพื่อใช้ H1 − H2; ถ้าใช้ปกติ 1 → 2 ต้องสลับเป็น H2 − H1 สูตรกระแสผิวทั่วไปนี้เป็นการอ่านเสริม ใบสูตรทางการแสดงกรณี K = 0</p>'+source_link(('Hayt ศักย์เวกเตอร์','textbook/engineering-electromagnetics-9th-ed.pdf',224))+'</div></section></main></div>'
save('formula-sheet-final/index.html',shell('ใบสูตรปลายภาค',formula))

portal='<main class="portal-container"><div class="course-meta-bar"><strong>คณะวิศวกรรมศาสตร์ · มหาวิทยาลัยนเรศวร</strong><span class="academic-badge badge-primary">303214</span></div><h1 class="book-title">สนามแม่เหล็กไฟฟ้า 1</h1><p class="subtitle">จากประจุและศักย์ สู่กระแส สนามแม่เหล็ก และคลื่นระนาบ · คลังบทเรียนภาษาไทย</p><div class="card"><h2>เลือกช่วงการเรียน</h2><p>กลางภาควางพื้นฐานเวกเตอร์และไฟฟ้าสถิต ปลายภาคใช้เครื่องมือเดิมวิเคราะห์ตัวกลาง กระแส สนามที่เปลี่ยนตามเวลา และสมการแมกซ์เวลล์</p><div class="action-row"><a class="btn btn-secondary" href="#sec-midterm">กลางภาค · Sets 01–09</a><a class="btn btn-primary" href="#sec-final">ปลายภาค · Sets 10–22</a><a class="btn btn-secondary" href="exam-simulator/index.html">เลือกห้องสอบ</a></div></div>'
for group,items in [('midterm',COURSE[:9]),('final',COURSE[9:])]:
    portal+='<section id="sec-'+group+'"><h2 class="section-title">'+('กลางภาค · Sets 01–09' if group=='midterm' else 'ปลายภาค · Sets 10–22')+'</h2><div class="curriculum-grid">'
    for n,slug,title in items:
        desc=next((c[6] for c in CHAPTERS if str(c[0])==n),'ทบทวนทฤษฎี สูตร และตัวอย่างพื้นฐานไฟฟ้าสถิต')
        portal+='<a class="card curriculum-card" href="'+slug+'/index.html"><span class="academic-badge">Set '+n+'</span><h3>'+title+'</h3><p>'+desc+'</p><span class="chapter-action">เปิดบทเรียน →</span></a>'
    portal+='</div><div class="action-row"><a class="btn btn-secondary" href="'+('formula-sheet' if group=='midterm' else 'formula-sheet-final')+'/index.html">ใบสูตร'+('กลางภาค' if group=='midterm' else 'ปลายภาค')+'</a><a class="btn btn-primary" href="exam-simulator/'+group+'/index.html">ห้องสอบ'+('กลางภาค' if group=='midterm' else 'ปลายภาค')+'</a></div></section>'
portal+='<footer class="page-footer">303214 · สไลด์ภาควิชา / Hayt & Buck 9th / Sadiku 3rd</footer></main>'
save('index.html',shell('คลังบทเรียนสนามแม่เหล็กไฟฟ้า 1',portal,''))
chooser='<main class="portal-container"><h1 class="book-title">เลือกระบบจำลองการสอบ</h1><p class="subtitle">แยกขอบเขตกลางภาคและปลายภาคอย่างชัดเจน</p><div class="curriculum-grid"><article class="card"><span class="academic-badge">Sets 01–09</span><h2>กลางภาค</h2><p>ห้องเดิมสำหรับเวกเตอร์ คูลอมบ์ สนามไฟฟ้า เกาส์ และศักย์</p><a class="btn btn-secondary" href="midterm/index.html">เข้าสู่ห้องกลางภาค</a></article><article class="card"><span class="academic-badge badge-primary">Sets 10–22</span><h2>ปลายภาค</h2><p>กระแส ตัวกลาง ความจุ แม่เหล็ก เคิร์ล ฟาราเดย์ และคลื่นระนาบ พร้อมตรวจขั้นตอนและใบสูตรทางการ</p><a class="btn btn-primary" href="final/index.html">เข้าสู่ห้องปลายภาค</a></article></div></main>'
save('exam-simulator/index.html',shell('เลือกห้องสอบ',chooser))

exam='''<div class="chapter-container final-exam-container"><aside class="chapter-sidebar card final-exam-sidebar"><h2 class="sidebar-title">ห้องสอบปลายภาค</h2><label for="exam-mode">รูปแบบการฝึก</label><select id="exam-mode" class="learning-input"><option value="mock">จำลอง 4 ข้อ · 100 คะแนนฝึก</option><option value="bank">คลังโจทย์ทั้งหมด</option></select><label for="exam-minutes">เวลา (นาที · ค่าฝึกซ้อม)</label><input id="exam-minutes" class="learning-input" type="number" min="1" max="360" value="180"><output id="final-timer" class="final-timer" aria-live="off">180:00</output><div class="action-row"><button id="timer-toggle" class="btn btn-primary" type="button">เริ่มเวลา</button><button id="new-exam" class="btn btn-secondary" type="button">เลือกชุดใหม่</button></div><p>คะแนนตรวจด้วยตนเอง</p><output id="final-score" class="final-score" aria-live="polite">0 / 100</output><nav id="question-nav" aria-label="เลือกข้อสอบ"></nav><button id="open-final-formula" class="btn btn-secondary" type="button">เปิดใบสูตรขณะสอบ</button><button id="export-final-attempt" class="btn btn-secondary" type="button">บันทึกงานเป็นไฟล์</button><p id="save-status" role="status"></p><button id="finish-exam" class="btn btn-secondary" type="button">สิ้นสุดการฝึก</button></aside><main class="chapter-main"><h1 class="book-title">Final Exam Simulator</h1><p class="subtitle">Sets 10–22 · คลังโจทย์จากสไลด์ ชุดตัวอย่างเดิม และ Hayt & Buck</p><section class="card exam-trap"><h2>ข้อกำหนดทางการ</h2><p>ปลายภาคมีน้ำหนัก 60% ออกเฉพาะเรื่องที่สอนใน Set 10–22; Uniqueness Theorem ไม่ออก</p><ol><li>หาปริพันธ์ด้วยมือและวิธีเชิงวิเคราะห์ เครื่องคิดเลขหาปริพันธ์ทำให้ส่วนนี้และงานที่เกี่ยวข้องเป็นศูนย์</li><li>แสดงทุกขั้น รวมสมการเคิร์ล อนุพันธ์ และพารามิเตอร์ งานที่ข้ามและงานที่เกี่ยวข้องเป็นศูนย์</li><li>เขียนสูตรตั้งต้นในรูปทั่วไปก่อนแทนค่า งานสูตรที่ขาดและงานที่เกี่ยวข้องเป็นศูนย์</li></ol><p>''' + source_link(('อ่านคำชี้แจงทางการ','raw/for_Exam_fin_214_69_for_prnt.pdf',4),'../../')+'''</p></section><div class="card"><h2>วิธีใช้คะแนนฝึก</h2><p>เวลาเริ่มต้น 180 นาที จำนวน 4 ข้อ และคะแนนย่อย 25 คะแนนต่อข้อเป็นค่าที่แพลตฟอร์มกำหนดสำหรับฝึก ไม่มีหลักฐานว่าเป็นจำนวนข้อ เวลาหรือสัดส่วนจริงของไฟนอล ระบบนี้ให้ผู้เรียนเทียบงานกับเฉลยและทำ Checklist ด้วยตนเอง ไม่ตรวจความถูกต้องของลายมือหรือข้อความอัตโนมัติ</p><p>แต่ละข้อแบ่งเป็น สูตร 5, ตั้งปัญหา 5, วิเคราะห์ 9, หน่วย 3, คำตอบ 3 คะแนน การขาดสูตรตัดคะแนนงานต่อเนื่องทั้งหมด; การข้ามการวิเคราะห์หรือใช้ปริพันธ์เชิงตัวเลขตัดส่วนวิเคราะห์และคำตอบที่พึ่งพากัน หน่วย SI เป็นเกณฑ์ฝึกเพิ่มเติม</p><p>งานบันทึกอัตโนมัติในเบราว์เซอร์ การเปิดเฉลยทำให้ข้อที่เปิดมีป้ายฝึกพร้อมเฉลย เพื่อแยกจากการทำโดยไม่เห็นวิธีทำ</p></div><div id="final-exam-questions"></div><div id="exam-completion" class="card" hidden></div></main></div><dialog id="final-formula-dialog" class="formula-dialog"><div class="card"><div class="action-row"><h2>ใบสูตรปลายภาค</h2><button id="close-final-formula" type="button" class="btn btn-secondary">ปิด</button><a href="../../formula-sheet-final/index.html" target="_blank" rel="noopener" class="btn btn-secondary">เปิดหน้าเต็ม</a></div><iframe title="ใบสูตรปลายภาคค้นหาได้" src="../../formula-sheet-final/index.html"></iframe></div></dialog>'''
save('exam-simulator/final/index.html',shell('ห้องสอบปลายภาค',exam,'../../','<script src="../../assets/js/final-problems.js"></script><script src="../../assets/js/final-exam.js"></script>'))

# Synchronize existing lesson headers without altering their instructional content.
for p in ROOT.rglob('index.html'):
    if any(part in ['assets','lecture','textbook','raw'] for part in p.relative_to(ROOT).parts):continue
    depth=len(p.relative_to(ROOT).parts)-1;base='../'*depth
    text=p.read_text()
    text=re.sub(r'<header class="site-header">.*?</header>',lambda _:navigation(base),text,count=1,flags=re.S)
    if 'name="emf-root"' not in text:text=text.replace('</head>','<meta name="emf-root" content="'+base+'">\n<link rel="stylesheet" href="'+base+'assets/css/final.css">\n</head>')
    p.write_text(text)

index=ROOT/'assets/js/engines/search-index.js'
text=index.read_text()
text=re.sub(r'\n// BEGIN FINAL INDEX.*?// END FINAL INDEX\n','\n',text,flags=re.S)
text=text.replace('url: "exam-simulator/index.html"','url: "exam-simulator/midterm/index.html"')
entries=[dict(title='Set '+str(c[0])+': '+c[2],category='บทเรียน',url=c[1]+'/index.html',keywords=[c[3],c[2],'final','ปลายภาค',str(c[0])],snippet=c[6]) for c in CHAPTERS]
entries += [dict(title='ใบสูตรปลายภาค · 9 หน้าจริง',category='ใบสูตร',url='formula-sheet-final/index.html',keywords=['final','ปลายภาค','สูตร','curl','เคิร์ล','phasor','แมกซ์เวลล์'],snippet='ค้นหาสูตร เวกเตอร์ กระแส ลาปลาส ฟาราเดย์ และคลื่นระนาบ พร้อมเงื่อนไข SI')]
entries += [dict(title='Final Exam Simulator · ห้องสอบปลายภาค',category='ข้อสอบ',url='exam-simulator/final/index.html',keywords=['final','ปลายภาค','สอบ','checklist'],snippet='ตัวจับเวลา คลังโจทย์ต้นฉบับ และการตรวจขั้นตอนด้วยตนเอง')]
for p in PROBLEMS:entries.append(dict(title=p['title'],category='แบบฝึกหัด',url='exam-simulator/final/index.html#problem-'+p['id'],keywords=[p['id'],'Hayt','ปลายภาค'],snippet=p['status']))
text+='\n// BEGIN FINAL INDEX\nwindow.EMF_SEARCH_INDEX.push(...'+json.dumps(entries,ensure_ascii=False)+');\n// END FINAL INDEX\n'
index.write_text(text)
print('Built 13 chapters, 9 formula pages, '+str(len(PROBLEMS))+' problems; '+str(sum(x['pages'] for x in manifest))+' lecture source pages.')
