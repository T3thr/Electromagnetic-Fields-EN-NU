#!/usr/bin/env python3
"""Run after build-final.py. Adds bridges, HUD data and verified exam editions."""
import json, re
from pathlib import Path
from urllib.parse import quote
from masterclass_content import NODES
from exam_content import MIDTERM, FINAL, SOURCE_MAP
from masterclass_render import render_bridge

ROOT=Path(__file__).resolve().parents[1]
for page in ROOT.rglob('index.html'):
    page.write_text(re.sub(r'\?v=[a-f0-9]+', '', page.read_text()))
def save(path, value):
    p=ROOT/path; p.parent.mkdir(parents=True,exist_ok=True);p.write_text(value)

roadmap=dict(schemaVersion=2,courseCode='303214',convention='eʲωᵗ',
             progressMeaning='บทก่อนหน้าคือความรู้ที่ใช้ต่อยอด ไม่ใช่การยืนยันว่าผู้เรียนเข้าใจแล้ว',chapters=NODES)
save('assets/data/curriculum-roadmap.json',json.dumps(roadmap,ensure_ascii=False,indent=2))
save('assets/js/roadmap-data.js','window.EMF_CURRICULUM = '+json.dumps(roadmap,ensure_ascii=False)+';\n')
save('assets/data/exam-source-map.json',json.dumps(dict(schemaVersion=1,physicalPages=dict(midterm=10,final=36),final=SOURCE_MAP,midterm=[dict(code=p['originCode'],problemId=p['id'],sources=p['source']) for p in MIDTERM if p.get('originCode')]),ensure_ascii=False,indent=2))
save('assets/data/final-problems.json',json.dumps(FINAL,ensure_ascii=False,indent=2))
save('assets/data/midterm-problems.json',json.dumps(MIDTERM,ensure_ascii=False,indent=2))
save('assets/js/final-problems.js','window.EMF_FINAL_PROBLEMS = '+json.dumps(FINAL,ensure_ascii=False)+';\n')
save('assets/js/midterm-problems.js','window.EMF_MIDTERM_PROBLEMS = '+json.dumps(MIDTERM,ensure_ascii=False)+';\n')

# Refresh only the two source tables; preserve the verified narrative findings.
analysis=ROOT/'raw/exam-source-analysis.md'
if analysis.exists():
    text=analysis.read_text()
    def refs(src):return '<br>'.join('['+label+' · PDF '+str(page)+'](../'+quote(path,safe='/-.')+'#page='+str(page)+')' for label,path,page in src)
    midtable='| รหัส | หัวข้อ | น้ำหนักเดิม | แหล่งสอบทาน |\n| :--- | :--- | ---: | :--- |\n'+'\n'.join('| '+p['originCode']+' | '+p['title']+' | '+str(p['maxPoints'])+' | '+refs(p['source'])+' |' for p in MIDTERM if p.get('originCode'))
    finaltable='| ป้ายต้นฉบับ | หน้า PDF | หัวข้อ/สถานะ | แหล่งตรวจย้อนกลับ |\n| :--- | :--- | :--- | :--- |\n'+'\n'.join('| '+p['code']+' | '+str(p['pages'][0])+'–'+str(p['pages'][1])+' | '+p['note']+' | '+refs(p['sources'])+' |' for p in SOURCE_MAP)
    text=re.sub(r'\| รหัส \|.*?(?=\n\nตำรา)',lambda m:midtable,text,flags=re.S)
    text=re.sub(r'\| ป้ายต้นฉบับ \|.*?(?=\n\nป้าย)',lambda m:finaltable,text,flags=re.S)
    analysis.write_text(text)

header=re.search(r'<header.*?</header>',(ROOT/'index.html').read_text(),re.S)[0]
header=re.sub(r'(href=")(?!data:|https?:|#)',r'\1../../',header)
for semester,bank,label,formula,raw in [('midterm',MIDTERM,'กลางภาค','formula-sheet','ข้อสอบเก่า.pdf'),('final',FINAL,'ปลายภาค','formula-sheet-final','ข้อสอบทั้งหมด.pdf')]:
    config=dict(semester=semester,bank='EMF_'+semester.upper()+'_PROBLEMS',key='emf-'+semester+'-attempt-v2',historyKey='emf-'+semester+'-history-v2',minutes=180,sourceIds=[p['id'] for p in sorted(bank,key=lambda p:p.get('originCode','ZZ')) if p.get('originCode')],groups=['vector','coulomb','field','potential'] if semester=='midterm' else ['electric','magnetic','dynamic','wave'])
    notes=('ไฟล์ข้อสอบเก่าปีการศึกษา 2563 ระบุ 4 ข้อ 100 คะแนน เวลา 3 ชั่วโมง น้ำหนัก 45% ข้อมูลนี้เป็นประวัติข้อสอบเดิม ไม่ใช่ประกาศการสอบปีปัจจุบัน ชุดต้นฉบับรักษาน้ำหนัก 25/20/30/25; สัดส่วนคะแนน Checklist เป็นเกณฑ์ฝึกที่แพลตฟอร์มกำหนด' if semester=='midterm' else 'ไฟล์ 36 หน้ามีป้าย ALL-Q01–ALL-Q12 โดย ALL-Q06 เป็นหน้าต่อเนื่องของ ALL-Q05 ชุดต้นฉบับแสดงครบทั้ง 12 รายการเพื่อทบทวนตามไฟล์; คะแนนฝึก 25 ต่อรายการไม่ใช่น้ำหนักข้อสอบทางการ การสอบปัจจุบันมีน้ำหนัก 60% ตามคำชี้แจง และไม่รวมเรื่องที่ไม่ได้สอน')
    content='<div class="chapter-container exam-container"><aside class="chapter-sidebar card"><h2 class="sidebar-title">ห้องสอบ'+label+'</h2><nav><ul class="sidebar-nav"><li><a class="sidebar-link" href="#exam-rules">เกณฑ์และแหล่งโจทย์</a></li><li><a class="sidebar-link" href="#exam-controls">เลือกชุดและเวลา</a></li></ul></nav><div id="question-nav" role="navigation" aria-label="รายการข้อสอบ"></div></aside><main class="chapter-main"><h1>ห้องสอบจำลอง'+label+'</h1><p>ฝึกคิดเชิงวิเคราะห์ อธิบายทุกขั้น และตรวจย้อนกลับถึงต้นฉบับ</p><section id="exam-rules"><div class="card academic-callout"><h2>เกณฑ์ฝึกและขอบเขต</h2><p>'+notes+'</p><ol><li>เขียนสูตรทั่วไปก่อนแทนค่า</li><li>แสดงวิธีทำครบทุกขั้น ปริพันธ์ต้องทำด้วยมือ</li><li>แปลงหน่วย SI และตรวจเวกเตอร์ เครื่องหมาย และเงื่อนไขขอบ</li></ol><p>Checklist เป็นการประเมินด้วยตนเอง ระบบไม่สามารถตรวจลายมือหรือยืนยันวิธีใช้เครื่องคิดเลข คะแนนสูตรและงานต่อเนื่องเป็นศูนย์เมื่อไม่เขียนสูตร และคะแนนปริพันธ์เป็นศูนย์เมื่อใช้เครื่องคิดเลขหาปริพันธ์; ระบบฝึกบังคับให้ยืนยันขั้นที่เป็นฐานก่อนให้คะแนนงานต่อเนื่อง</p><p><a href="../../raw/'+quote(raw)+'" target="_blank" rel="noopener">เปิดข้อสอบต้นฉบับ</a> · <a href="../../raw/for_Exam_fin_214_69_for_prnt.pdf" target="_blank" rel="noopener">3 กฎเหล็กปลายภาค</a> · <a href="../../raw/exam-source-analysis.md">ตารางตรวจสอบที่มา</a></p></div></section><section id="exam-controls" class="card"><h2>ชุดฝึกและเวลา</h2><div class="exam-control-grid"><label for="exam-mode">ชุดโจทย์<select id="exam-mode" class="learning-input"><option value="source">เรียงตามไฟล์ข้อสอบจริง</option><option value="mock">สุ่มฝึกตามหมวด</option><option value="bank">คลังโจทย์และอ่านต่อยอดทั้งหมด</option></select></label><label for="exam-minutes">เวลาฝึก (นาที)<input id="exam-minutes" class="learning-input" type="number" min="1" max="360" value="180"></label></div><div class="exam-toolbar"><output id="final-timer">180:00</output><button id="timer-toggle" type="button" class="btn btn-secondary">เริ่มเวลา</button><button id="new-exam" type="button" class="btn btn-secondary">เริ่มชุดใหม่</button><button id="open-final-formula" type="button" class="btn btn-secondary">เปิดใบสูตร'+label+'</button><button id="export-final-attempt" type="button" class="btn btn-secondary">บันทึกงานเป็นไฟล์</button><button id="finish-exam" type="button" class="btn btn-primary">จบการฝึก</button></div><p>คะแนนประเมินตนเอง <output id="final-score"></output> · <span id="save-status" role="status"></span></p><p>งานและเวลาบันทึกแยกห้องสอบในเบราว์เซอร์ เวลาเดินต่อหลังรีโหลดเมื่อเริ่มแล้ว; การพักเวลาเป็นเครื่องมือฝึก เปิดเฉลยแล้วจะมีบันทึกกำกับ</p></section><div id="final-exam-questions"></div><div id="exam-completion" class="summary-box" hidden></div></main></div><dialog id="final-formula-dialog" class="formula-dialog" aria-label="ใบสูตร'+label+'"><div class="formula-dialog-toolbar"><h2>ใบสูตร'+label+'</h2><button id="close-final-formula" class="btn btn-secondary" type="button">ปิดใบสูตร</button></div><iframe src="../../'+formula+'/index.html" title="ใบสูตร'+label+'"></iframe></dialog>'
    page='<!doctype html><html lang="th"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="emf-root" content="../../"><title>ห้องสอบ'+label+' · 303214</title><link rel="icon" href="data:,"><link rel="stylesheet" href="../../assets/css/style.css"><link rel="stylesheet" href="../../assets/css/final.css"></head><body>'+header+content+'<script src="../../assets/js/common.js"></script><script src="../../assets/js/engines/search-index.js"></script><script src="../../assets/js/engines/site-search.js"></script><script src="../../assets/js/'+semester+'-problems.js"></script><script>window.EMF_EXAM_CONFIG = '+json.dumps(config,ensure_ascii=False)+';</script><script src="../../assets/js/final-exam.js"></script></body></html>'
    save('exam-simulator/'+semester+'/index.html',page)

def bridge(c):
    return render_bridge(c, NODES, FINAL+MIDTERM)

def example(p,semester):
    refs=' · '.join('<a href="../'+quote(path,safe='/-.')+'#page='+str(page)+'" target="_blank" rel="noopener">'+label+' · หน้า PDF '+str(page)+'</a>' for label,path,page in p['source'])
    steps=''.join('<div class="card solution-step"><h4>'+str(i+1)+'. '+title+'</h4>'+html+'</div>' for i,(title,html) in enumerate(p['steps']))
    return '<article class="card"><h3>'+(p.get('originCode','')+' · ' if p.get('originCode') else '')+p['title']+'</h3><p>'+p['prompt']+'</p><p class="source-line">'+p['status']+' · '+refs+'</p><details><summary>เปิดการพิสูจน์และเหตุผลทุกขั้น</summary>'+steps+'</details><p><a href="../exam-simulator/'+semester+'/index.html#problem-'+p['id']+'">ฝึกข้อนี้พร้อม Checklist ในห้องสอบ</a></p></article>'

for p in ROOT.rglob('index.html'):
    text=p.read_text();base='../../' if 'exam-simulator/' in str(p.relative_to(ROOT)) and p.parent.name!='exam-simulator' else '../' if p.parent!=ROOT else ''
    text=re.sub(r'<!-- BEGIN MASTERCLASS -->.*?<!-- END MASTERCLASS -->','',text,flags=re.S)
    text=re.sub(r'<script src="[^"]*assets/js/roadmap-data.js"></script>','',text)
    text=re.sub(r'<script src="[^"]*assets/js/masterclass-labs.js"></script>','',text)
    text=text.replace('<script src="'+base+'assets/js/common.js">','<script src="'+base+'assets/js/roadmap-data.js"></script><script src="'+base+'assets/js/common.js">')
    text=text.replace('</body>','<script src="'+base+'assets/js/masterclass-labs.js"></script></body>')
    if 'assets/css/masterclass.css' not in text:
        text=text.replace('</head>','<link rel="stylesheet" href="'+base+'assets/css/masterclass.css"></head>')
    c=next((c for c in NODES if c['slug']==p.parent.name),None)
    if c:
        text=re.sub(r'<meta name="emf-chapter"[^>]*>','',text)
        text=text.replace('</head>','<meta name="emf-chapter" content="'+str(c['chapterId'])+'"></head>')
        text=re.sub(r'(</h1>(?:\s*<p class="(?:subtitle|book-subtitle)"[^>]*>.*?</p>)?)',lambda m:m[1]+bridge(c),text,count=1,flags=re.S)
        text=text.replace('<ul class="sidebar-nav">','<ul class="sidebar-nav"><li><a class="sidebar-link" href="#masterclass">ภาพรวมและการพิสูจน์</a></li>',1) if 'href="#masterclass"' not in text else text
        if c['chapterId']>=10:
            examples='<section id="examples"><h2 class="section-title">ตัวอย่างที่ตรวจสอบกับต้นฉบับแล้ว</h2>'+''.join(example(p,'final') for p in FINAL if c['chapterId'] in p['sets'])+'</section>'
            text=re.sub(r'<section id="examples">.*?</section>',lambda m:examples,text,flags=re.S)
        for n,sec,pid in [(3,'sec8','mid-q01'),(4,'sec6','mid-q02'),(5,'sec8','mid-q03'),(9,'sec8','mid-q04')]:
            if c['chapterId']==n:
                question=next(question for question in MIDTERM if question['id']==pid)
                examples='<section id="'+sec+'"><h2 class="section-title">เฉลยข้อสอบเก่าที่ตรวจสอบจากไฟล์จริง</h2>'+example(question,'midterm')+'</section>'
                text=re.sub('<section id="'+sec+'">.*?</section>',lambda m:examples,text,flags=re.S)
    # Repair an English article incorrectly treated as a unit vector by an old normalizer.
    text=text.replace('in <b>a</b><sub>n</sub> Electrostatic','in an Electrostatic')
    text=text.replace('class="formula-dialog-toolbar"','class="card formula-dialog-toolbar"')
    text=re.sub(r'<details(?![^>]*class=)', '<details class="accordion-solution"', text)
    text=re.sub(r'(<details[^>]*class=")([^"]+)', lambda m:m[1]+m[2]+(' accordion-solution' if 'accordion-solution' not in m[2] else ''), text)
    p.write_text(text)

# Keep the legacy topic anchors and replace exam entries with the current source editions.
index=ROOT/'assets/js/engines/search-index.js'
text=re.sub(r'// BEGIN FINAL INDEX.*?// END FINAL INDEX','',index.read_text(),flags=re.S)
text=re.sub(r'// BEGIN MASTERCLASS INDEX.*?// END MASTERCLASS INDEX','',text,flags=re.S)
text=text.rstrip()
entries=[dict(title='Set '+str(c['chapterId'])+': '+c['title'],category='เส้นทางความรู้',url=c['slug']+'/index.html#masterclass',keywords=c['coreConcepts']+['แผนผัง','roadmap'],snippet=c['anchor']) for c in NODES]
for semester,bank in [('midterm',MIDTERM),('final',FINAL)]:
    entries += [dict(title=(p.get('originCode','')+' · ' if p.get('originCode') else '')+p['title'],category='ข้อสอบ'+('กลางภาค' if semester=='midterm' else 'ปลายภาค'),url='exam-simulator/'+semester+'/index.html#problem-'+p['id'],keywords=[p.get('originCode',''),p['id'],'Hayt','Sadiku'],snippet=p['status']) for p in bank]
entries += [dict(title='ใบสูตรปลายภาค · 9 หน้า',category='สูตร',url='formula-sheet-final/index.html',keywords=['Maxwell','ไฟนอล','สูตร'],snippet='ค้นหาสูตรและเทียบภาพต้นฉบับ'),dict(title='ห้องสอบกลางภาคและปลายภาค',category='ข้อสอบ',url='exam-simulator/index.html',keywords=['สอบ','midterm','final'],snippet='เลือกช่วงเรียนและชุดข้อสอบ')]
text+='\n// BEGIN MASTERCLASS INDEX\nwindow.EMF_SEARCH_INDEX = window.EMF_SEARCH_INDEX.filter(entry => !entry.url.includes("exam-simulator/"));\nwindow.EMF_SEARCH_INDEX.push(...'+json.dumps(entries,ensure_ascii=False)+');\n// END MASTERCLASS INDEX\n'
index.write_text(text)
print('Built 22 masterclasses and roadmap data for every page.')


# Content hashes keep shared assets fresh across independently navigated pages.
import hashlib
for page in ROOT.rglob('index.html'):
    def version_asset(match):
        path=match[2]
        asset=(page.parent/path).resolve()
        digest=hashlib.sha256(asset.read_bytes()).hexdigest()[:12]
        return match[1]+path+'?v='+digest+'"'
    page.write_text(re.sub(r'((?:src|href)=")([^"]*assets/(?:js|css)/[^"]+\.(?:js|css))"', version_asset, page.read_text()))
