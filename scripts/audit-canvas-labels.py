#!/usr/bin/env python3
"""Inspect text actually drawn by the legacy Canvas engines, including subscript labels."""
from pathlib import Path
import json,os,subprocess
root=Path(__file__).resolve().parents[1]
cli=os.environ.get('EMF_PLAYWRIGHT_CLI','/Users/3rapat/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright-core/lib/tools/cli-client/cli.js')
session=os.environ.get('EMF_BROWSER_SESSION','em-revamp')
code='''async(page)=>{
 await page.addInitScript(()=>{
  window.emfPaintedText=[];
  const original=CanvasRenderingContext2D.prototype.fillText;
  CanvasRenderingContext2D.prototype.fillText=function(text,...args){if(window.emfPaintedText.length<2000)window.emfPaintedText.push(String(text));return original.call(this,text,...args);};
 });
 const reports=[];
 for(const path of ['01-vector-algebra','02-cylindrical-coordinates','03-spherical-coordinates','04-coulombs-law','08-divergence-theorem']){
  await page.goto('http://127.0.0.1:8765/'+path+'/index.html');await page.waitForTimeout(250);
  reports.push(await page.evaluate(path=>({path,painted:window.emfPaintedText.length,raw:[...new Set(window.emfPaintedText.filter(t=>t.includes('_')||t.includes(String.fromCharCode(36))||t.includes('<sub>')))]}),path));
 }
 const mobile=[];
 for(const width of [320,390]){
  await page.setViewportSize({width,height:900});await page.goto('http://127.0.0.1:8765/exam-simulator/final/index.html#problem-continuity');await page.waitForTimeout(350);
  mobile.push(await page.evaluate(width=>{const side=document.querySelector('.chapter-sidebar'),card=document.querySelector('.question-card'),q=document.querySelector('#problem-continuity');return {width,overflow:document.documentElement.scrollWidth>innerWidth,cardFullyVisible:card.getBoundingClientRect().bottom<=side.getBoundingClientRect().bottom,questionClearsSidebar:q.getBoundingClientRect().top>=side.getBoundingClientRect().bottom,anchorGap:q.getBoundingClientRect().top-side.getBoundingClientRect().bottom};},width));
 }
 return {reports,mobile};
}'''
result=subprocess.run(['node',cli,'-s='+session,'run-code',code],capture_output=True,text=True,timeout=90)
out=root/'docs/qa-masterclass'
(out/'canvas-output.txt').write_text(result.stdout+result.stderr)
if '### Result\n' not in result.stdout:raise SystemExit(result.stdout+result.stderr)
data=json.loads(result.stdout.split('### Result\n',1)[1].split('\n###',1)[0]);(out/'canvas-results.json').write_text(json.dumps(data,ensure_ascii=False,indent=2))
print(json.dumps(data,ensure_ascii=False,indent=2))
if any(r['raw'] or not r['painted'] for r in data['reports']) or any(r['overflow'] or not r['cardFullyVisible'] or not r['questionClearsSidebar'] or r['anchorGap']>80 for r in data['mobile']):raise SystemExit(1)
