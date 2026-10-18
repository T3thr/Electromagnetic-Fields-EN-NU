/* AST-based template conversion. Uses the parser bundled with the local runtime. */
const fs=require('fs'),path=require('path');
const runtime=process.env.EMF_BABEL_BUNDLE||'/Users/3rapat/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/lib/transform/babelBundle.js';
const {babelParse,traverse}=require(runtime),root=path.resolve(__dirname,'..'),dollar=String.fromCharCode(36);
function quote(s){return JSON.stringify(s).split(dollar).join('\\u0024');}
function convert(code,filename){
 const ast=babelParse(code,filename,false),edits=[];
 function rendered(start,end){let value=code.slice(start,end);const contained=edits.filter(e=>e.start>=start&&e.end<=end).filter(e=>!edits.some(o=>o!==e&&o.start>=start&&o.end<=end&&o.start<=e.start&&o.end>=e.end));contained.sort((a,b)=>b.start-a.start).forEach(e=>{value=value.slice(0,e.start-start)+e.text+value.slice(e.end-start);});return value;}
 traverse(ast,{
  TemplateLiteral:{exit(p){if(p.parent.type==='TaggedTemplateExpression')throw Error('Tagged template needs explicit review: '+filename);const n=p.node;let value='('+quote(n.quasis[0].value.cooked)+')';n.expressions.forEach((e,i)=>{value+='.concat('+rendered(e.start,e.end)+').concat('+quote(n.quasis[i+1].value.cooked)+')';});edits.push({start:n.start,end:n.end,text:value});}},
  RegExpLiteral(p){if(p.node.pattern.includes(dollar))edits.push({start:p.node.start,end:p.node.end,text:'new RegExp('+quote(p.node.pattern)+(p.node.flags?','+quote(p.node.flags):'')+')'});},
  StringLiteral(p){if(code.slice(p.node.start,p.node.end).includes(dollar))edits.push({start:p.node.start,end:p.node.end,text:quote(p.node.value)});}
 });
 return rendered(0,code.length);
}
let changed=0;
function walk(dir){for(const e of fs.readdirSync(dir,{withFileTypes:true})){if(['.git','node_modules','source-pages','qa-final','qa-masterclass'].includes(e.name))continue;const file=path.join(dir,e.name);if(e.isDirectory())walk(file);else if(e.name.endsWith('.js')||e.name.endsWith('.html')){const original=fs.readFileSync(file,'utf8');const result=e.name.endsWith('.js')?convert(original,file):original.replace(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi,(all,attrs,body)=>!attrs.includes('src=')&&body.trim()?'<script'+attrs+'>'+convert(body,file+'.js')+'</script>':all);if(result!==original){fs.writeFileSync(file,result);changed++;}}}}
walk(root);console.log('Normalized JavaScript in '+changed+' files.');
