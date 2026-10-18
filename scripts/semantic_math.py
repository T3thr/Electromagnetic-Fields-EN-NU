"""Italicize unambiguous scalar atoms without altering units, operators or bases."""
from html.parser import HTMLParser
import re

ATOM=re.compile(r'(?<![a-zA-Zα-ωΑ-Ω0-9])([xyzrqkabLtωθϕρεμσΦΨδβηχ])(?![a-zA-Zα-ωΑ-Ω0-9])')
SCALAR_ASSIGNMENT=re.compile(r'(?<![a-zA-Z0-9])([IVQCSRWA])(?=\s*[=²³])')

class ScalarMarkup(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=False);self.parts=[];self.tags=[]
    def handle_starttag(self,tag,attrs):
        self.parts.append(self.get_starttag_text())
        if tag not in ['br','hr','input','img','meta','link']:self.tags.append(tag)
    def handle_endtag(self,tag):
        self.parts.append('</'+tag+'>')
        if tag in self.tags:
            while self.tags:
                if self.tags.pop()==tag:break
    def handle_data(self,text):
        if any(t in self.tags for t in ['b','strong','em','sub','sup','svg']):
            self.parts.append(text);return
        text=ATOM.sub(r'<em>\1</em>',text)
        text=SCALAR_ASSIGNMENT.sub(r'<em>\1</em>',text)
        if 'span' in self.tags and text.strip() in ['I','V','Q','C','S','R','W']:
            text='<em>'+text+'</em>'
        self.parts.append(text)
    def handle_entityref(self,name):self.parts.append('&'+name+';')
    def handle_charref(self,name):self.parts.append('&#'+name+';')

def equation(html):
    html=re.sub(r'(?<![a-zA-Z0-9>])([IVQCSRWAEHDJB])(?=<sub>)',r'<em>\1</em>',html)
    parser=ScalarMarkup();parser.feed(html);return ''.join(parser.parts)
