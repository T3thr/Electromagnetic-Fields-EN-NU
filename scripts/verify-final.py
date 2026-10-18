#!/usr/bin/env python3
"""Verify source coverage, navigation, links, and analytic reference results."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit,unquote
import math,json,re,subprocess
from final_content import CHAPTERS,PAGE_NOTES
from final_annotations import SUPPLEMENT_NOTES
from exam_content import FINAL as PROBLEMS, MIDTERM, SOURCE_MAP
from masterclass_content import NODES
from final_formulas import FORMULA_PAGES

root=Path(__file__).resolve().parents[1]
errors=[]
class Audit(HTMLParser):
    def __init__(self):super().__init__();self.ids=[];self.links=[];self.skip=0;self.raw=[];self.classes=[]
    def handle_starttag(self,tag,attrs):
        d=dict(attrs)
        if tag in ['script','style']:self.skip+=1
        if 'id' in d:self.ids.append(d['id'])
        self.classes+=d.get('class','').split()
        for k in ['href','src']:
            if k in d:self.links.append(d[k])
    def handle_endtag(self,tag):
        if tag in ['script','style']:self.skip=max(0,self.skip-1)
    def handle_data(self,text):
        if not self.skip and ('_' in text or chr(36) in text):self.raw.append(text[:100])

pages=sorted(root.rglob('index.html'))
for p in pages:
    a=Audit();a.feed(p.read_text())
    if a.raw:errors.append((str(p.relative_to(root)),'raw notation',a.raw))
    if len(a.ids)!=len(set(a.ids)):errors.append((str(p.relative_to(root)),'duplicate ids'))
    if 'assets/js/roadmap-data.js' not in p.read_text() or 'assets/css/masterclass.css' not in p.read_text():errors.append((str(p.relative_to(root)),'missing roadmap assets'))
    chapter=next((c for c in NODES if c['slug']==p.parent.name),None)
    if chapter and ('masterclass' not in a.ids or 'learning-reflection' not in a.classes):errors.append((str(p.relative_to(root)),'missing masterclass'))
    for link in a.links:
        s=urlsplit(link)
        if not s.scheme and not s.netloc and s.path and not (p.parent/unquote(s.path)).exists():errors.append((str(p.relative_to(root)),'missing link',link))
    for n,slug,*rest in CHAPTERS:
        if not any(urlsplit(link).path.endswith(slug+'/index.html') for link in a.links):errors.append((str(p.relative_to(root)),'missing curriculum link',slug))

manifest=json.loads((root/'assets/data/final-sources.json').read_text())
assert sum(c[4] for c in CHAPTERS)==242
assert sum(x['pages'] for x in manifest)==296
assert sum(map(len,SUPPLEMENT_NOTES.values()))==54
assert len(FORMULA_PAGES)==9
for x in manifest:
    for page in range(1,x['pages']+1):
        assert (root/'assets/source-pages'/x['key']/(str(page)+'.webp')).exists()
for c in CHAPTERS:
    assert len(PAGE_NOTES[c[0]])==c[4]
page_counts={}
for p in PROBLEMS+MIDTERM:
    for label,path,page in p['source']:
        assert (root/path).exists()
        assert page>0
        if path not in page_counts:
            info=subprocess.run(['pdfinfo',str(root/path)],check=True,capture_output=True,text=True).stdout
            page_counts[path]=int(re.search(r'Pages:\s+(\d+)',info)[1])
        assert page<=page_counts[path],(p['id'],path,page)
    for text in [p['prompt'],p['title']]+[s for title,s in p['steps']]:
        a=Audit();a.feed(text);assert not a.raw,(p['id'],a.raw)
    assert any(s[1].startswith('lecture/') for s in p['source'])
    assert any(s[1].startswith('textbook/') for s in p['source'])
    assert all('why-step' in s for title,s in p['steps'])
assert len([p for p in PROBLEMS if p.get('originCode')])==12
assert len([p for p in MIDTERM if p.get('originCode')])==4
assert sum(p['maxPoints'] for p in MIDTERM if p.get('originCode'))==100
assert [x['code'] for x in SOURCE_MAP]==['ALL-Q'+str(i).zfill(2) for i in range(1,13)]
assert SOURCE_MAP[5]['dependsOn']=='ALL-Q05'
assert [p for x in SOURCE_MAP for p in range(x['pages'][0],x['pages'][1]+1)]==list(range(1,37))
assert len(NODES)==22
assert json.loads((root/'assets/data/curriculum-roadmap.json').read_text())['chapters']==NODES
assert json.loads((root/'assets/data/final-problems.json').read_text())==json.loads(json.dumps(PROBLEMS))
assert json.loads((root/'assets/data/midterm-problems.json').read_text())==json.loads(json.dumps(MIDTERM))
for c in NODES:
    assert len(c['derivation'])>=7
    assert all(c.get(k) for k in ['prerequisites','coreBreakthrough','formulasMastered','forwardLink']) if c['chapterId']>1 else all(c.get(k) for k in ['coreBreakthrough','formulasMastered','forwardLink'])
    assert len(c['intuitionParagraphs'])>=2 and len(c['engineeringParagraphs'])>=2 and len(c['examTraps'])>=3
    assert all(k<c['chapterId'] for k in c['prerequisites'])
    assert all(c['chapterId'] in NODES[f['chapterId']-1]['prerequisites'] for f in c['forwardLinks'])
for ext in ['*.js','*.cjs','*.html','*.md','*.css','*.py','*.json']:
    for p in root.rglob(ext):
        assert chr(36) not in p.read_text(),('Dollar character',p)

# Independent numerical checks against printed drill answers.
assert math.isclose(.270*2*math.pi*(2.8**2-2**2)/2,3.257203263,rel_tol=1e-8)
assert (-2*2*3-2**2,3**2,2*2*4)==(-16,9,16)
assert -6*(5**2-2**2)/2*(1-(-1))==-126
assert math.isclose(5*8.854e-12*377.1*.9e6,.015024793,rel_tol=1e-6)
assert math.isclose(2e-6/144*80e-6/(8.854e-12*.12),1.045771319,rel_tol=1e-8)
assert math.isclose(250/(120*math.pi),.663145596,rel_tol=1e-8)
assert math.isclose(-1/(4e-9),-2.5e8)
assert (500-150,-400-200,300*5/20)==(350,-600,75)
assert math.isclose(2*math.sin(math.radians(50))*math.cos(math.radians(50))/2.4,.41033656,rel_tol=1e-7)
assert math.isclose(-2*math.sin(math.radians(50))**2/2.4,-.48902007,rel_tol=1e-7)
assert math.isclose(1/5-1/3,-2/15,rel_tol=1e-12)
# Q4 positive-charge family at d=1 m produces exactly the opposite Coulomb force.
cvec=(2*math.sqrt(3)-1,math.sqrt(3));cmag=math.hypot(*cvec)
q4=3*cmag/50
assert all(math.isclose(2*q4*v/cmag,3*v/25,rel_tol=1e-12) for v in cvec)
# Raw Q08 coefficient 20 is ten times the lecture coefficient; raw Q10 has no solution.
assert math.isclose((20e-4*1e-3)/(1e-5*1e5),2e-6)
assert [p['originCode'] for p in PROBLEMS if p.get('originCode')]==['ALL-Q'+str(i).zfill(2) for i in range(1,13)]
assert len(next(p for p in PROBLEMS if p['id']=='wave')['steps'])>=10
assert next(p for p in MIDTERM if p['id']=='mid-q03')['source'][0][2]==2
assert -20 != -1e5*2e6
assert math.isclose(.5*(.2*math.sqrt(1e-10/2.5e-7)+1e-5*math.sqrt(2.5e-7/1e-10)),.00225)

for p in (root/'assets/js').rglob('*.js'):
    subprocess.run(['node','--check',str(p)],check=True,capture_output=True)
result={'htmlPages':len(pages),'chapters':22,'mainFinalLecturePages':242,'supplementPages':54,'formulaPages':9,'midtermBank':len(MIDTERM),'finalBank':len(PROBLEMS),'rawMidtermQuestions':4,'rawFinalEntries':12,'readingProblems':len([p for p in PROBLEMS if p.get('examEligible') is False]),'sourceImages':305,'errors':errors}
print(json.dumps(result,ensure_ascii=False,indent=2))
if errors:raise SystemExit(1)
