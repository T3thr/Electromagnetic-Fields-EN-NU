#!/usr/bin/env python3
"""Normalize visible mathematics and legacy content box padding."""
from pathlib import Path
from html.parser import HTMLParser
import re

root=Path(__file__).resolve().parents[1]
tokens={'ρv':'ρ<sub>v</sub>','ρs':'ρ<sub>s</sub>','εr':'ε<sub>r</sub>','ε0':'ε<sub>0</sub>','μ0':'μ<sub>0</sub>','ε1':'ε<sub>1</sub>','ε2':'ε<sub>2</sub>','Jd':'<b>J</b><sub>d</sub>','Id':'<em>I</em><sub>d</sub>','Es':'<b>E</b><sub>s</sub>','Hs':'<b>H</b><sub>s</sub>','k0':'<em>k</em><sub>0</sub>','η0':'η<sub>0</sub>','Ienc':'<em>I</em><sub>enc</sub>'}
for name in ['Et','En','Dt','Dn','Ht','Hn','Bn','Jr','Jz','V0']:
    tokens[name]='<em>'+name[0]+'</em><sub>'+name[1:]+'</sub>'
for name in ['Et1','Et2','En1','En2','Dt1','Dt2','Dn1','Dn2','θ1','θ2']:
    tokens[name]='<em>'+name[0]+'</em><sub>'+name[1:]+'</sub>'
for axis in ['x','y','z','r','ρ','ϕ','R','n12']:
    tokens['a'+axis]='<b>a</b><sub>'+axis+'</sub>'
pattern=re.compile(r'(?<![\w])('+ '|'.join(sorted(map(re.escape,tokens),key=len,reverse=True))+r')(?![\w])')

class Normalizer(HTMLParser):
    def __init__(self):super().__init__(convert_charrefs=False);self.out=[];self.skip=0
    def handle_starttag(self,tag,attrs):
        text=self.get_starttag_text();d=dict(attrs)
        if tag in ['script','style']:self.skip+=1
        classes=d.get('class','').split()
        if any(c in classes for c in ['academic-callout','step-card','formula-card','quiz-card','warning-box','exam-alert-box','feature-box','content-box']):
            if 'card' not in classes:
                text=re.sub(r'class="([^"]*)"',lambda m:'class="'+m[1]+' card"',text,count=1);classes.append('card')
        if any(c in classes for c in ['card','summary-box','practice-generator-card']):
            text=re.sub(r'(style=")([^"]*)(")',lambda m:m[1]+re.sub(r'padding(?:-(?:top|bottom|left|right))?\s*:[^;]+;?','',m[2])+m[3],text)
        self.out.append(text)
    def handle_startendtag(self,tag,attrs):self.handle_starttag(tag,attrs)
    def handle_endtag(self,tag):
        self.out.append('</'+tag+'>')
        if tag in ['script','style']:self.skip=max(0,self.skip-1)
    def handle_data(self,text):
        if not self.skip:
            text=pattern.sub(lambda m:tokens[m[1]],text)
            text=text.replace('for_Exam_mid_214_68_for_prnt.pdf','เอกสารคำชี้แจงกลางภาค')
        self.out.append(text)
    def handle_comment(self,text):self.out.append('<!--'+text+'-->')
    def handle_decl(self,text):self.out.append('<!'+text+'>')
    def handle_entityref(self,name):self.out.append('&'+name+';')
    def handle_charref(self,name):self.out.append('&#'+name+';')

for p in root.rglob('index.html'):
    parser=Normalizer();parser.feed(p.read_text());p.write_text(''.join(parser.out))
print('Normalized visible mathematics and content cards.')
