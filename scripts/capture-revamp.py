#!/usr/bin/env python3
"""Capture stable review images after navigation and drawer animations finish."""
from pathlib import Path
import json,os,subprocess
root=Path(__file__).resolve().parents[1]
cli=os.environ.get('EMF_PLAYWRIGHT_CLI','/Users/3rapat/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright-core/lib/tools/cli-client/cli.js')
session=os.environ.get('EMF_BROWSER_SESSION','em-revamp')
code='''async(page)=>{
 const out=OUTPUT;
 await page.emulateMedia({reducedMotion:'reduce'});
 async function capture(name){await page.waitForTimeout(350);await page.screenshot({path:out+'/'+name+'.png'});}
 await page.route('**/*',r=>r.continue());await page.setViewportSize({width:1440,height:1000});
 await page.goto('http://127.0.0.1:8765/index.html');await page.evaluate(()=>{localStorage.removeItem('emf-final-attempt-v2');localStorage.removeItem('emf-midterm-attempt-v2');localStorage.removeItem('emf-learning-v1');});await capture('portal-desktop');
 await page.goto('http://127.0.0.1:8765/exam-simulator/final/index.html');await page.locator('#problem-continuity').evaluate(e=>e.scrollIntoView());await capture('final-exam-desktop');
 await page.goto('http://127.0.0.1:8765/12-boundary-conditions/index.html');await capture('chapter-depth-desktop');await page.locator('.nav-roadmap').click();await capture('roadmap-desktop');await page.keyboard.press('Escape');
 await page.setViewportSize({width:390,height:900});await page.locator('.nav-roadmap').click();await capture('roadmap-mobile');await page.keyboard.press('Escape');
 await page.goto('http://127.0.0.1:8765/exam-simulator/final/index.html');await page.locator('#problem-continuity').evaluate(e=>e.scrollIntoView());await capture('final-exam-mobile');
 await page.evaluate(()=>{const target=document.querySelector('#problem-continuity .rubric-list').previousElementSibling;scrollTo(0,scrollY+target.getBoundingClientRect().top-350);});await capture('rubric-mobile');
 await page.goto('http://127.0.0.1:8765/22-maxwell-time-harmonic/index.html');await page.evaluate(()=>{const e=document.querySelectorAll('.derivation-line')[6];scrollTo(0,scrollY+e.getBoundingClientRect().top-290);});await capture('derivation-mobile');
 await page.goto(OFFLINE);await page.locator('.nav-roadmap').click();const offline={buttons:await page.locator('.roadmap-trigger').count(),nodes:await page.locator('.roadmap-node').count(),link:await page.locator('.roadmap-panel a').first().getAttribute('href')};await page.keyboard.press('Escape');
 await page.setViewportSize({width:1440,height:1000});await page.goto('http://127.0.0.1:8765/index.html');return {screenshots:8,offline};
}'''.replace('OUTPUT',json.dumps(str(root/'output/playwright'))).replace('OFFLINE',json.dumps((root/'index.html').as_uri()))
result=subprocess.run(['node',cli,'-s='+session,'run-code',code],capture_output=True,text=True,timeout=90)
(root/'docs/qa-masterclass/capture-output.txt').write_text(result.stdout+result.stderr)
if '### Result\n' not in result.stdout:raise SystemExit(result.stdout+result.stderr)
data=json.loads(result.stdout.split('### Result\n',1)[1].split('\n###',1)[0]);(root/'docs/qa-masterclass/capture-results.json').write_text(json.dumps(data,ensure_ascii=False,indent=2))
print(json.dumps(data,ensure_ascii=False,indent=2))
assert data['offline']==dict(buttons=1,nodes=22,link='01-vector-algebra/index.html')
