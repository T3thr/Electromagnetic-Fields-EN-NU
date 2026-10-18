#!/usr/bin/env python3
"""Check rendered lab values against known limits and independent reference values."""
from pathlib import Path
import json,os,subprocess
root=Path(__file__).resolve().parents[1]
cli=os.environ.get('EMF_PLAYWRIGHT_CLI','/Users/3rapat/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright-core/lib/tools/cli-client/cli.js')
session=os.environ.get('EMF_BROWSER_SESSION','em-revamp')
chapters=json.loads((root/'assets/data/curriculum-roadmap.json').read_text())['chapters']
code='''async(page)=>{
 const checks=[],errors=[];page.on('pageerror',e=>errors.push(e.message));
 const check=(name,pass)=>checks.push({name,pass:!!pass});
 const near=(value,target)=>Math.abs(value-target)<Math.max(1e-8,Math.abs(target)*.0001);
 await page.route('**/*',r=>r.continue());
 const references={3:.03064178,4:.01797510,5:7.1900414,6:1.7320508,7:.47746483,8:3,9:26.96265,10:6,11:5378.6146,13:35.416751,14:25,16:11.936621,17:2,18:.0000376991,19:1,20:1.41421356,21:-.000314159265};
 for(const c of CHAPTERS){
  await page.goto('http://127.0.0.1:8765/'+c.slug+'/index.html');
  const plot=page.locator('.master-lab-view svg'),value=Number(await plot.getAttribute('data-sample-y'));
  if(references[c.chapterId]!==undefined)check('Set '+c.chapterId+' numeric plotted sample',near(value,references[c.chapterId]));
 }
 async function slider(index,value){await page.locator('.master-lab input[type="range"]').nth(index).evaluate((e,v)=>{e.value=String(v);e.dispatchEvent(new Event('input',{bubbles:true}));},value);}
 async function sample(){return Number(await page.locator('.master-lab-view svg').getAttribute('data-sample-y'));}
 await page.goto('http://127.0.0.1:8765/04-coulombs-law/index.html');const force=await sample();await slider(1,2);check('doubling distance quarters Coulomb force',near(await sample(),force/4));await slider(0,-2);check('negative source reverses force',await sample()<0);
 await page.goto('http://127.0.0.1:8765/11-dielectrics/index.html');const field=await sample();await slider(0,4.2);check('fixed charge field halves when permittivity doubles',near(await sample(),field/2));
 await page.goto('http://127.0.0.1:8765/16-amperes-law/index.html');await slider(1,20);const surface=await sample();await slider(1,10);check('solid wire interior field linear in radius',near(await sample(),surface/2));await slider(1,40);check('outside wire field inversely proportional to radius',near(await sample(),surface/2));
 await page.goto('http://127.0.0.1:8765/20-faradays-law/index.html');await slider(0,0);check('flux maximum has zero induced emf',await page.locator('.master-lab-result').innerText().then(t=>t.includes('e = 0 V')));
 await page.goto('http://127.0.0.1:8765/22-maxwell-time-harmonic/index.html');check('100 MHz peak near half wavelength is negative',await sample()<-.999);await slider(0,10);check('frequency slider changes spatial wavelength',await sample()>.95);await slider(1,180);check('half period reverses instantaneous field',await sample()<-.95);
 await page.goto('http://127.0.0.1:8765/index.html');await page.locator('.nav-roadmap').click();check('portal roadmap stays inside course root',await page.locator('.roadmap-panel a').first().getAttribute('href')==='01-vector-algebra/index.html');await page.keyboard.press('Escape');
 await page.goto('http://127.0.0.1:8765/exam-simulator/final/index.html');await page.evaluate(()=>localStorage.removeItem('emf-final-attempt-v2'));await page.reload();
 check('source entries retain physical file order',await page.locator('.question-code').allTextContents().then(c=>c.join(',')==='ALL-Q01,ALL-Q02,ALL-Q03,ALL-Q04,ALL-Q05,ALL-Q06,ALL-Q07,ALL-Q08,ALL-Q09,ALL-Q10,ALL-Q11,ALL-Q12'));
 await page.evaluate(()=>{const key='emf-final-attempt-v2',s=JSON.parse(localStorage.getItem(key));s.ids.reverse();s.work.continuity='ตรวจการย้ายลำดับ';localStorage.setItem(key,JSON.stringify(s));});await page.reload();
 check('old source attempts migrate to physical order',await page.locator('.question-code').allTextContents().then(c=>c[5]==='ALL-Q06'&&c[6]==='ALL-Q07'));
 check('source migration preserves worksheet',await page.locator('#problem-continuity textarea').inputValue()==='ตรวจการย้ายลำดับ');
 await page.locator('[data-question="curl"]').click();await page.locator('.nav-roadmap').click();check('exam roadmap follows selected problem',await page.locator('.roadmap-panel h3').innerText().then(t=>t.includes('Set 17')));await page.keyboard.press('Escape');
 const q=page.locator('#problem-continuity');await q.locator('textarea').fill('ตรวจการบันทึกสถานะ');check('worksheet updates question status',await page.locator('[data-question="continuity"]').getAttribute('data-status')==='working');
 for(const box of await q.locator('input[type="checkbox"]').all())await box.check();check('complete checklist updates points badge',await page.locator('[data-question="continuity"] .points-badge').innerText()==='25 / 25 คะแนน');check('complete status is separate from active state',await page.locator('[data-question="continuity"]').getAttribute('data-status')==='complete');
 await q.locator('input[type="checkbox"]').first().uncheck();check('removing general formula removes dependent points',await q.locator('.problem-score').innerText()==='0 / 25');
 return {checks,errors};
}'''.replace('CHAPTERS',json.dumps([dict(chapterId=c['chapterId'],slug=c['slug']) for c in chapters]))
result=subprocess.run(['node',cli,'-s='+session,'run-code',code],capture_output=True,text=True,timeout=180)
out=root/'docs/qa-masterclass';out.mkdir(parents=True,exist_ok=True)
(out/'physical-output.txt').write_text(result.stdout+result.stderr)
if '### Result\n' not in result.stdout:raise SystemExit(result.stdout+result.stderr)
data=json.loads(result.stdout.split('### Result\n',1)[1].split('\n###',1)[0]);(out/'physical-results.json').write_text(json.dumps(data,ensure_ascii=False,indent=2))
print(json.dumps(data,ensure_ascii=False,indent=2))
if data['errors'] or any(not c['pass'] for c in data['checks']):raise SystemExit(1)
