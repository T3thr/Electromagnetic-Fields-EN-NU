#!/usr/bin/env python3
"""Browser quality gate via local Playwright CLI; serve this directory first."""
from pathlib import Path
import json, os, subprocess

root=Path(__file__).resolve().parents[1]
cli=os.environ.get('EMF_PLAYWRIGHT_CLI','/Users/3rapat/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright-core/lib/tools/cli-client/cli.js')
session=os.environ.get('EMF_BROWSER_SESSION','em-masterclass')
pages=sorted(str(p.relative_to(root)) for p in root.rglob('index.html'))
chapters=json.loads((root/'assets/data/curriculum-roadmap.json').read_text())['chapters']
code='''async(page)=>{
 await page.route('**/*',route=>route.continue());
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 const reports=[];
 for(const width of [1440,834,390]){
  await page.setViewportSize({width,height:900});
  for(const path of PAGES){
   await page.goto('http://127.0.0.1:8765/'+path);await page.waitForTimeout(70);
   const report=await page.evaluate(()=>{
    const side=document.querySelector('.chapter-sidebar'),style=e=>getComputedStyle(e),pad=innerWidth<=768?['18px','16px']:['24px','28px'];
    return {overflow:document.documentElement.scrollWidth>innerWidth,raw:document.body.innerText.split('\\n').filter(t=>t.includes('_')||t.includes(String.fromCharCode(36))),wrongPadding:[...document.querySelectorAll('.card,.summary-box,.practice-generator-card,.academic-callout')].filter(e=>style(e).paddingTop!==pad[0]||style(e).paddingLeft!==pad[1]).map(e=>e.className),side:side?{position:style(side).position,top:style(side).top}:null,buttons:document.querySelectorAll('.roadmap-trigger').length,lab:document.querySelectorAll('.master-lab-result').length,rawEditors:document.querySelectorAll('textarea:not(.worksheet-editor textarea)').length,rawCheckboxes:[...document.querySelectorAll('input[type="checkbox"]')].filter(e=>!e.closest('.rubric-card-item')).length,rawDetails:document.querySelectorAll('details:not(.accordion-solution)').length,rawQuestionLinks:document.querySelectorAll('.question-link').length,unstyledCards:[...document.querySelectorAll('.question-card')].filter(e=>style(e).display!=='grid'||style(e).textDecorationLine!=='none').length,actionGaps:[...document.querySelectorAll('.curriculum-grid + .action-row')].map(e=>e.getBoundingClientRect().top-e.previousElementSibling.getBoundingClientRect().bottom)};
   });
   if(report.side){await page.evaluate(()=>scrollTo(0,2200));await page.waitForTimeout(60);report.stickyTop=await page.locator('.chapter-sidebar').evaluate(e=>e.getBoundingClientRect().top);}
   await page.locator('.nav-roadmap').click();report.hudNodes=await page.locator('.roadmap-node').count();report.hudOverflow=await page.locator('.roadmap-dialog').evaluate(e=>e.scrollWidth>e.clientWidth);
   await page.keyboard.press('Escape');reports.push({width,path,...report});
  }
 }
 const widgets=[];
 await page.setViewportSize({width:1440,height:900});
 for(const c of CHAPTERS){await page.goto('http://127.0.0.1:8765/'+c.slug+'/index.html');const before=await page.locator('.master-lab-result').innerText();await page.locator('.master-lab input[type="range"]').first().evaluate(e=>{e.value=e.min;e.dispatchEvent(new Event('input',{bubbles:true}));});widgets.push({chapter:c.chapterId,changes:before!==await page.locator('.master-lab-result').innerText()});}
 return {reports,widgets,errors};
}'''.replace('PAGES',json.dumps(pages)).replace('CHAPTERS',json.dumps([dict(slug=c['slug'],chapterId=c['chapterId']) for c in chapters]))
out=root/'docs/qa-masterclass';out.mkdir(parents=True,exist_ok=True)
result=subprocess.run(['node',cli,'-s='+session,'run-code',code],capture_output=True,text=True,timeout=300)
(out/'browser-output.txt').write_text(result.stdout+result.stderr)
if '### Result\n' not in result.stdout:raise SystemExit(result.stdout+result.stderr)
data=json.loads(result.stdout.split('### Result\n',1)[1].split('\n###',1)[0])
(out/'browser-results.json').write_text(json.dumps(data,ensure_ascii=False,indent=2))
bad=[r for r in data['reports'] if r['overflow'] or r['raw'] or r['wrongPadding'] or r['buttons']!=1 or r['hudNodes']!=22 or r['hudOverflow'] or r['rawEditors'] or r['rawCheckboxes'] or r['rawDetails'] or r['rawQuestionLinks'] or r['unstyledCards'] or any(g<36 for g in r['actionGaps']) or (r['side'] and (r['side']['position']!='sticky' or abs(r.get('stickyTop',84)-84)>1))]
print(json.dumps(dict(layoutChecks=len(data['reports']),responsiveWidths=[1440,834,390],widgetChecks=len(data['widgets']),errors=data['errors'],layoutFailures=bad,widgetFailures=[r for r in data['widgets'] if not r['changes']]),ensure_ascii=False,indent=2))
if bad or data['errors'] or any(not r['changes'] for r in data['widgets']):raise SystemExit(1)
