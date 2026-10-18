"""Render the teaching sequence with semantic math and source provenance."""
from urllib.parse import quote

def render_bridge(c, nodes, bank):
    n=c['chapterId']
    def links(ids):
        return ''.join('<a class="topic-pill" href="../'+nodes[k-1]['slug']+'/index.html">Set '+str(k)+' · '+nodes[k-1]['title']+'</a>' for k in ids)
    def paragraphs(items):return ''.join('<p>'+x+'</p>' for x in items)
    prior=links(c['prerequisites']) or '<p>เริ่มจากพีชคณิต ตรีโกณมิติ และหน่วย SI ไม่ต้องมีพื้นฐานสนามมาก่อน</p>'
    future=links([x['chapterId'] for x in c['forwardLinks']])
    refs=[]
    for p in bank:
        if n in p['sets'] and p.get('originCode'):
            for label,path,page in p['source']:
                if path.startswith(('lecture/','textbook/')) and (label,path,page) not in refs:refs.append((label,path,page))
    if not refs:
        s=c['sources'][0];refs=[(s['label']+' · เปิดขอบเขตบท',s['path'],s['page'])]
    source=''.join('<a href="../'+quote(path,safe='/-.')+'#page='+str(page)+'" target="_blank" rel="noopener">'+label+' · PDF '+str(page)+'</a>' for label,path,page in refs)
    steps=''.join('<article class="card derivation-line"><h3><span class="step-number">'+str(i+1).zfill(2)+'</span> '+s['title']+'</h3><div class="math-display">'+s['equation']+'</div><p class="why-step"><b>เหตุใดจึงแปลงรูปเช่นนี้?</b> '+s['why']+'</p></article>' for i,s in enumerate(c['derivation']))
    traps=''.join('<li>'+x+'</li>' for x in c['examTraps'])
    return ('<!-- BEGIN MASTERCLASS -->'
      '<section id="masterclass" class="masterclass">'
      '<div class="card academic-callout masterclass-reading"><span class="academic-badge badge-primary">SET '+str(n).zfill(2)+' · จากภาพกายภาพสู่การพิสูจน์</span><h2>คำถามที่บทนี้กำลังตอบ</h2><p class="lesson-anchor">'+c['anchor']+'</p><div class="bridge-links">'+prior+'</div></div>'
      '<div class="masterclass-group masterclass-reading"><h2>01 · สร้างภาพในใจก่อนใช้สมการ</h2><div class="card">'+paragraphs(c['intuitionParagraphs'])+'<p class="assumption-line"><b>ขอบเขตแบบจำลอง:</b> '+c['assumptions']+'</p></div></div>'
      '<div class="masterclass-group"><h2>02 · พิสูจน์ทีละบรรทัดพร้อมเหตุผล</h2>'+steps+'</div>'
      '<div class="masterclass-group"><h2>03 · กับดักที่ทำให้เสียคะแนน</h2><div class="summary-box exam-trap"><ul>'+traps+'</ul><p>เขียนสูตรทั่วไป → ระบุพิกัดและทิศ → วิเคราะห์ด้วยมือ → ใช้ขอบเขต → ตรวจหน่วย SI และความหมาย</p></div></div>'
      '<div class="masterclass-group masterclass-reading"><h2>04 · สนามนี้อยู่ในงานวิศวกรรมอย่างไร</h2><div class="card">'+paragraphs(c['engineeringParagraphs'])+'<p class="why-step"><b>ลองอธิบายด้วยคำของตนเอง:</b> '+c['checkpoint']+'</p></div></div>'
      '<div class="masterclass-group"><h2>05 · ทำนาย ทดลอง และตรวจเหตุผล</h2><div class="practice-generator-card master-lab" data-chapter="'+str(n)+'"><h3>ห้องทดลอง Set '+str(n)+'</h3><p>'+c['experiment']+'</p><div class="master-lab-controls"></div><div class="master-lab-view"></div><output class="master-lab-result" aria-live="polite"></output><p class="master-lab-assumptions"></p><details class="accordion-solution"><summary>บันทึกสิ่งที่ทำนายและสิ่งที่สังเกต</summary><label for="reflection-'+str(n)+'">อธิบายเหตุและผลพร้อมเงื่อนไขที่ตรึง</label><div class="worksheet-editor"><p class="worksheet-hint">ก่อนปรับ: ทำนายทิศและขนาด · หลังปรับ: อธิบายด้วยสมการและเงื่อนไข</p><textarea id="reflection-'+str(n)+'" class="learning-input learning-reflection" rows="4" placeholder="ฉันตรึง… ปรับ… จึงทำนายว่า… ผลที่เห็นคือ… เพราะ…"></textarea></div><p class="reflection-status" role="status"></p></details></div></div>'
      '<div class="card"><h3>สะพานสู่บทถัดไป</h3><p>'+c['forwardLink']+'</p><div class="bridge-links">'+future+'</div><details class="accordion-solution"><summary>ตรวจวิธีจากสไลด์และตำราต้นฉบับ</summary><div class="source-reference-list">'+source+'</div><p class="source-line">เลขหน้าทั้งหมดนับหน้า PDF รวมปก ตำราเป็นแหล่งตรวจวิธีและนิยาม ไม่ได้กล่าวว่าข้อมูลทุกตัวอย่างตรงกับข้อสอบ บทอธิบายและการพิสูจน์ด้านบนเรียบเรียงเพื่อการสอน</p></details></div>'
      '</section><!-- END MASTERCLASS -->')
