"""Source-preserving exam editions and chapter-specific analytic feedback."""
from copy import deepcopy
import math as numeric_math
from final_content import *
from final_problems import PROBLEMS, problem
from masterclass_content import NODES
from semantic_math import equation as scalar_markup

HAYT='textbook/engineering-electromagnetics-9th-ed.pdf'
SADIKU='textbook/Elements Of Electromagnetics - Sadiku - 3rd ed.pdf'
RAW='raw/ข้อสอบทั้งหมด.pdf'
MIDRAW='raw/ข้อสอบเก่า.pdf'
def S(title,eq,why):
    return (title,math(scalar_markup(eq))+'<p class="why-step"><b>ทำไมจึงทำขั้นนี้?</b> '+why+'</p>')
def mid(pid,title,sets,group,prompt,steps,refs,integration=False,points=25,origin=None):
    p=problem(pid,title,sets,group,prompt,steps,refs,integration,'ข้อสอบเก่าต้นฉบับ · ปีการศึกษา 2563' if origin else 'แบบฝึกหัด Hayt 9th · เรียบเรียงไทย')
    p['maxPoints']=points
    if origin:p['originCode']=origin
    return p

MIDTERM=[
mid('mid-q01','ฐานทรงกลมและการแปลงเวกเตอร์',[1,2,3],'vector',
 '1.1 อธิบายข้อจำกัดของเวกเตอร์หน่วยทรงกลมพร้อมวาดรูป 1.2 ที่ P(r=2.4 m, θ=50°, ϕ=70°) ให้ <b>A</b> = '+frac('2sin θ','r')+unit('θ')+' + '+frac('sin ϕ','sin θ')+unit('ϕ')+' จงเขียนในพิกัดทรงกระบอก (โจทย์ไม่ได้กำหนดหน่วยของ A; คงหน่วยเดียวกันตลอด)',
 [S('นิยามฐานและข้อจำกัด',unit('r')+' = sin θ '+unit('ρ')+' + cos θ '+unit('z')+'<br>'+unit('θ')+' = cos θ '+unit('ρ')+' − sin θ '+unit('z'),
 'ฐานขึ้นกับตำแหน่ง ไม่ใช่ฐานคงที่เหมือนฉาก ที่ r=0 ทิศฐานไม่กำหนด และที่ขั้ว θ=0,π มุม ϕ ไม่กำหนด วาดแกน +z ลูกศรรัศมีและแนวเพิ่ม θ,ϕ'),
  S('สูตรแปลงเวกเตอร์ทั่วไป','<em>A</em><sub>ρ</sub> = <em>A</em><sub>r</sub>sin θ + <em>A</em><sub>θ</sub>cos θ<br><em>A</em><sub>z</sub> = <em>A</em><sub>r</sub>cos θ − <em>A</em><sub>θ</sub>sin θ<br><em>A</em><sub>ϕ,cyl</sub> = <em>A</em><sub>ϕ,sph</sub>','ฉายแต่ละฐานด้วยผลคูณจุดก่อนแทนตัวเลข ระบุว่าฐาน ϕ ของสองระบบตรงกัน'),
  S('แทนองค์ประกอบเชิงสัญลักษณ์','<em>A</em><sub>r</sub>=0; <em>A</em><sub>θ</sub>='+frac('2sin θ','r')+'; <em>A</em><sub>ϕ</sub>='+frac('sin ϕ','sin θ')+'<br><em>A</em><sub>ρ</sub>='+frac('2sin θ cos θ','r')+'; <em>A</em><sub>z</sub>=−'+frac('2sin²θ','r'),'A ไม่มีองค์ประกอบรัศมีทรงกลม แต่มีองค์ประกอบรัศมีทรงกระบอก เพราะฐาน θ มีการฉายบน aρ'),
  S('แทนมุมและตรวจขนาด','<b>A</b> ≈ 0.410337'+unit('ρ')+' + 1.226682'+unit('ϕ')+' − 0.489020'+unit('z'),
 'ใช้โหมดองศา คำนวณ Aϕ=sin70°/sin50° และ Az=−2sin²50°/2.4 ตรวจ Aρ²+Az² = Aθ² เพื่อยืนยันว่าการแปลงรักษาขนาด')],
 [('MID-Q01 · หน้าโจทย์',MIDRAW,2),('Set 3 · ฐานทรงกลม',NODES[2]['sources'][0]['path'],1),('Hayt D1.6 · วิธีแปลงฐาน (คนละข้อมูล)',HAYT,30),('Hayt §1.9 · ทรงกลม',HAYT,31)],points=25,origin='MID-Q01'),
mid('mid-q02','แรงคูลอมบ์และประจุที่ทำให้สมดุล',[4],'electric',
 'Q2=+2 C ที่ (0,0,0), Q1=3√3 C ที่ (5,0,0), Q3=3 C ที่ (−2.5,5√3/2,0) (พิกัด m) ในอวกาศว่าง หาแรงบน Q2 และให้หนึ่งตัวอย่างตำแหน่ง/ประจุ Q4 ที่ทำให้แรงรวมศูนย์ พร้อมอธิบายว่าคำตอบมีเอกลักษณ์หรือไม่',
 [S('สูตรทั่วไปและทิศ','<b>F</b><sub>2←i</sub> = '+frac('<em>Q</em><sub>2</sub><em>Q</em><sub>i</sub>','4πε<sub>0</sub>R<sub>i2</sub>³')+'<b>R</b><sub>i2</sub>; <b>R</b><sub>i2</sub> = <b>r</b><sub>2</sub> − <b>r</b><sub>i</sub>','ทุกประจุเริ่มต้นเป็นบวก แรงจึงชี้ออกจากแหล่งไปผู้รับ กำหนด k=1/(4πε0) และไม่แปลง C เป็น µC'),
  S('หาแรงสองแหล่ง','<b>R</b><sub>12</sub>=−5'+unit('x')+'; <b>R</b><sub>32</sub>=2.5'+unit('x')+'−'+frac('5√3','2')+unit('y')+'; R<sub>12</sub>=R<sub>32</sub>=5 m<br><b>F</b><sub>21</sub>=−'+frac('6√3k','25')+unit('x')+'<br><b>F</b><sub>23</sub>='+frac('3k','25')+unit('x')+'−'+frac('3√3k','25')+unit('y'),'ระยะทั้งสองเป็น 5 m แต่หน่วยเวกเตอร์ต่างกัน ต้องแจกแจงองค์ประกอบก่อนรวม'),
  S('รวมแรงและตั้งสมดุล','<b>F</b><sub>2</sub>='+frac('3k','25')+'[(1−2√3)'+unit('x')+'−√3'+unit('y')+'] N<br><b>F</b><sub>24</sub>=−<b>F</b><sub>2</sub>','แรงเดิมชี้ x ลบและ y ลบ ประจุเพิ่มต้องให้แรงกลับทั้งสององค์ประกอบ ไม่ใช่ชดเชยเฉพาะขนาด'),
  S('สร้างครอบครัวคำตอบ','<b>c</b>=(2√3−1)'+unit('x')+'+√3'+unit('y')+'; c=√(16−4√3)<br><b>r</b><sub>4</sub>=−'+frac('d','c')+'<b>c</b>; Q<sub>4</sub>='+frac('3c','50')+'(d/1 m)² C, d&gt;0','ถ้าเลือก d=1 m ประจุ Q4=3c/50 C และตำแหน่ง r4=−c-vector/c m จะให้ F24=(3k/25)c-vector ตรงพอดี เลือก d อื่นได้โดยปรับประจุตาม d² จึงไม่ใช่ตำแหน่งเดียว ตรวจหน่วยด้วยระยะ d ใน m')],
 [('MID-Q02 · หน้าโจทย์',MIDRAW,2),('Set 4 · เวกเตอร์ระยะทาง',NODES[3]['sources'][0]['path'],8),('Hayt D2.1 · คูลอมบ์เวกเตอร์ (คนละข้อมูล)',HAYT,41),('Hayt Example 2.2 · การซ้อนทับ (คนละข้อมูล)',HAYT,44)],points=20,origin='MID-Q02'),
mid('mid-q03','ลวดประจุจำกัดและปริพันธ์ด้วยมือ',[5],'electric',
 'ลวดตามแกน z ช่วง 0≤z′≤4 m มี ρl C/m คงที่ ในอวกาศว่าง หา <b>E</b> ที่ P(0,3,0) m โดยตั้งปริพันธ์และแสดงการอินทิเกรตเชิงวิเคราะห์',
 [S('สูตรทั่วไปก่อนแทน','<b>E</b> = '+frac('1','4πε<sub>0</sub>')+'∫'+frac('dq <b>R</b>','R³')+'; dq=ρ<sub>l</sub> dz′','รวมประจุย่อยจากแหล่ง ไม่ใช้สูตรลวดอนันต์ซึ่งสมมาตรต่างกัน'),
  S('เรขาคณิตและตั้งปริพันธ์','<b>R</b>=3'+unit('y')+'−z′'+unit('z')+'; R=√(9+z′²)<br><b>E</b>='+frac('ρ<sub>l</sub>','4πε<sub>0</sub>')+'∫<sub>0</sub><sup>4</sup>'+frac('3'+unit('y')+'−z′'+unit('z'),'(9+z′²)<sup>3/2</sup>')+' dz′','จุดสังเกตคงที่ ตัวแปร z′ อยู่บนลวด ความยาว 3 และ 4 ใช้ m จึงให้ผลปริพันธ์หน่วย m⁻¹'),
  S('ส่วน y ด้วยตรีโกณมิติ','z′=3tan ψ; dz′=3sec²ψ dψ; ψ:0→arctan(4/3)<br>∫<sub>0</sub><sup>4</sup>'+frac('3 dz′','(9+z′²)<sup>3/2</sup>')+' = '+frac('1','3')+'∫<sub>0</sub><sup>arctan(4/3)</sup>cos ψ dψ = '+frac('1','3')+'[sin ψ]<sub>0</sub><sup>arctan(4/3)</sup> = '+frac('4','15')+' m<sup>−1</sup>','ใช้เอกลักษณ์ 1 + tan<sup>2</sup>ψ = sec<sup>2</sup>ψ แล้วลด sec<sup>2</sup>ψ กับ sec<sup>3</sup>ψ เป็น cos ψ ใช้สามเหลี่ยม 3–4–5 ให้ sin(arctan(4/3))=4/5 ต้องเปลี่ยนขอบเขตพร้อมตัวแปร'),
  S('ส่วน z และรวม','u=9+z′²; du=2z′dz′<br>∫<sub>0</sub><sup>4</sup>'+frac('−z′dz′','(9+z′²)<sup>3/2</sup>')+' = −'+frac('1','2')+'∫<sub>9</sub><sup>25</sup>u<sup>−3/2</sup>du = [u<sup>−1/2</sup>]<sub>9</sub><sup>25</sup> = −'+frac('2','15')+' m<sup>−1</sup><br><b>E</b>='+frac('ρ<sub>l</sub>','60πε<sub>0</sub>')+'(4'+unit('y')+'−2'+unit('z')+') m<sup>−1</sup>','ฐาน x ไม่มีเพราะทุกแหล่งกับจุดสังเกตอยู่ระนาบ yz ประจุบวกให้ Ey บวก Ez ลบ ตรวจหน่วย ρl/ε0 เป็น V แล้วคูณ m⁻¹ ได้ V/m')],
 [('MID-Q03 · หน้าโจทย์',MIDRAW,2),('Set 5 · สนามจากประจุต่อเนื่อง',NODES[4]['sources'][0]['path'],1),('Sadiku §4.3 · ลวดประจุจำกัด',SADIKU,124),('Hayt §2.4 · การกระจายประจุ',HAYT,47)],True,30,'MID-Q03'),
mid('mid-q04','ศักย์จาก D รัศมีและงานภายนอก',[6,9],'potential',
 'ในอวกาศว่าง D = '+frac('r','(r²+a²)²')+unit('r')+' (สัมประสิทธิ์ของสนามมีหน่วยตามที่ทำให้ D เป็น C/m²; r,a ใช้ m และ a&gt;0) 4.1 หา VAB 4.2 ถ้า rA&lt;rB ความต่างศักย์ VAB เป็นบวกหรือลบ เพราะเหตุใด พร้อมอุปมาและตีความงาน 4.3 หา V(r) เมื่อ V(∞)=0',
 [S('สูตรทั่วไปและปกติ','<b>E</b>='+frac('<b>D</b>','ε<sub>0</sub>')+'; V<sub>AB</sub>=−∫<sub>B</sub><sup>A</sup><b>E</b> • d<b>l</b>; d<b>l</b>=dr'+unit('r')+' บนทางรัศมี','ทางรัศมีเลือกได้ในสนามนี้เพราะเป็นสนามสถิตและศักย์ขึ้นกับ r; กำหนดขอบต้น B ปลาย A'),
  S('อินทิเกรตด้วยการแทนตัวแปร','V<sub>AB</sub>=−'+frac('1','ε<sub>0</sub>')+'∫<sub>rB</sub><sup>rA</sup>'+frac('r dr','(r²+a²)²')+'<br>u=r²+a²; du=2rdr; ∫ u<sup>−2</sup>du=−u<sup>−1</sup><br>V<sub>AB</sub>='+frac('1','2ε<sub>0</sub>')+'['+frac('1','r<sub>A</sub>²+a²')+'−'+frac('1','r<sub>B</sub>²+a²')+']','เก็บลบจากนิยามศักย์และลบจากปริพันธ์แยกกัน แล้วประเมินค่าปลายลบต้น ไม่ใช้เครื่องคิดเลขหาปริพันธ์'),
  S('ตีความเงื่อนไขบวก','V<sub>AB</sub>&gt;0 ⇔ r<sub>A</sub>&lt;r<sub>B</sub>; W<sub>ext</sub>=qV<sub>AB</sub>','ศักย์ลดตาม r สำหรับสัมประสิทธิ์บวก จึงเข้าใกล้ศูนย์กลางเมื่อไป A สำหรับ q บวก งานภายนอกบวก ส่วน q ลบงานภายนอกลบ'),
  S('กำหนดศูนย์อ้างอิง','r<sub>B</sub>→∞, V(∞)=0 ⇒ V(r)='+frac('1','2ε<sub>0</sub>(r²+a²)'),'พจน์ที่อนันต์หายไป ทดสอบ −dV/dr = r/[ε0(r²+a²)²] คืน E เดิม หน่วยศักย์เป็น V เมื่อติดสัมประสิทธิ์สนามตามโจทย์')],
 [('MID-Q04 · หน้าโจทย์และต่อหน้า 3',MIDRAW,2),('Set 9 · นิยามความต่างศักย์',NODES[8]['sources'][0]['path'],8),('Hayt §4.3 · นิยามศักย์',HAYT,96)],True,25,'MID-Q04'),
mid('hayt-eoc-1-2','Hayt 1.2: เวกเตอร์หน่วย',[1],'vector',
 'A จากจุดกำเนิดถึง (1,2,3), B ถึง (2,3,−2) หาเวกเตอร์หน่วยตาม A−B และตามแนวจากจุดกำเนิดไปกึ่งกลางปลายทั้งสอง',
 [S('สูตรทั่วไป',unit('R')+'='+frac('<b>R</b>','|<b>R</b>|'),'เวกเตอร์หน่วยไม่มีหน่วย ต้องหารด้วยขนาดของเวกเตอร์เดียวกัน'),S('ผลต่าง','<b>A</b>−<b>B</b>=−'+unit('x')+'−'+unit('y')+'+5'+unit('z'),'ลบแต่ละองค์ประกอบก่อนหาขนาด'),S('ทำให้เป็นหนึ่ง',unit('R')+'='+frac('−'+unit('x')+'−'+unit('y')+'+5'+unit('z'),'√27'),'√(1+1+25)=√27'),S('แนวไปกึ่งกลาง','<b>r</b><sub>M</sub>='+frac('<b>A</b>+<b>B</b>','2')+'; '+unit('M')+'='+frac('3'+unit('x')+'+5'+unit('y')+'+'+unit('z'),'√35'),'ตำแหน่งกึ่งกลางคือ (1.5,2.5,0.5) ตัวประกอบหนึ่งส่วนสองตัดออกเมื่อทำเป็นเวกเตอร์หน่วย')],[('Hayt Problem 1.2',HAYT,35),('Set 1 · เวกเตอร์',NODES[0]['sources'][0]['path'],1)]),
mid('hayt-eoc-2-2','Hayt 2.2: แรงคู่ประจุ',[4],'electric',
 '+1 nC ที่ (0,0,0), −2 nC ที่ (1,1,1) m ในอวกาศว่าง หาแรงเวกเตอร์บนแต่ละประจุ',
 [S('สูตรทั่วไป','<b>F</b><sub>1←2</sub>='+frac('q<sub>1</sub>q<sub>2</sub>','4πε<sub>0</sub>R³')+'(<b>r</b><sub>1</sub>−<b>r</b><sub>2</sub>)','ผู้รับคือประจุ 1 ต้องตั้ง R จาก 2 ไป 1'),S('แปลงหน่วยและระยะ','q<sub>1</sub>=10<sup>−9</sup> C; q<sub>2</sub>=−2×10<sup>−9</sup> C; R=√3 m','nC สองตัวทำให้ผลคูณมี 10⁻¹⁸'),S('แทนค่า','<b>F</b><sub>1←2</sub>='+frac('2k×10<sup>−18</sup>','3√3')+'('+unit('x')+'+'+unit('y')+'+'+unit('z')+') ≈ 3.459'+unit('x')+'+3.459'+unit('y')+'+3.459'+unit('z')+' nN','ลบจากประจุต่างเครื่องหมายคูณ R ลบ ให้แรงดึงไปประจุ 2'),S('อีกประจุ','<b>F</b><sub>2←1</sub>=−<b>F</b><sub>1←2</sub>','กฎข้อสามของนิวตันตรวจขนาดเท่ากันทิศตรงข้าม')],[('Hayt Problem 2.2',HAYT,56),('Set 4 · แรงคูลอมบ์',NODES[3]['sources'][0]['path'],8)]),
mid('hayt-eoc-3-2','Hayt 3.2: ฟลักซ์สุทธิของกล่อง',[6,7,8],'electric',
 'E = '+frac('5z²','ε<sub>0</sub>')+unit('z')+' V/m ในอวกาศว่าง หากล่องด้าน 4 m รอบจุดกำเนิด (ขอบ ±2 m) มีประจุรวมเท่าใด',
 [S('สูตรทั่วไป','Q=∮<sub>S</sub><b>D</b> • d<b>s</b>; <b>D</b>=ε<sub>0</sub><b>E</b>=5z²'+unit('z'),'ต้องนับเครื่องหมายปกติออกของทุกหน้า ไม่รวมขนาดฟลักซ์เข้าและออกเป็นบวกทั้งคู่'),S('หน้าบนและล่าง','Φ<sub>บน</sub>=∫<sub>−2</sub><sup>2</sup>∫<sub>−2</sub><sup>2</sup>20 dxdy=20(4)(4)=320 C<br>Φ<sub>ล่าง</sub>=−320 C','D บนสองหน้าเท่ากัน แต่ปกติล่างคือ −az จึงฟลักซ์ติดลบ อีกสี่หน้าสนามสัมผัส'),S('รวม','Q=320−320=0 C','ศูนย์หมายถึงประจุสุทธิ ไม่ได้หมายถึงสนามทุกจุดศูนย์'),S('ตรวจด้วยรูปจุด','ρ<sub>v</sub>=∇ • <b>D</b>=10z; Q=16∫<sub>−2</sub><sup>2</sup>10z dz=80[z²]<sub>−2</sub><sup>2</sup>=0','ความหนาแน่นเป็นฟังก์ชันคี่ ส่วนบวกและลบหักล้าง ผลตรงกับผิว')],[('Hayt Problem 3.2',HAYT,83),('Set 8 · กล่องและไดเวอร์เจนซ์',NODES[7]['sources'][0]['path'],3)],True),
mid('hayt-eoc-4-1','Hayt 4.1: งานในสนามสม่ำเสมอ',[1,9],'potential',
 'E=Ex ax+Ey ay+Ez az คงที่ หา incremental work ภายนอกเพื่อย้าย q ระยะ δ ไป (a) +x (b) 45° ในควอดรันต์แรกระนาบ xy (c) ทิศที่องค์ประกอบบวกเท่ากันทั้งสามแกน',
 [S('สูตรทั่วไป','ΔW<sub>ext</sub>=−q<b>E</b> • Δ<b>l</b>','แรงภายนอกที่เคลื่อนช้าต้านสนาม'),S('แนว +x','Δ<b>l</b>=δ'+unit('x')+' ⇒ ΔW=−qδ<em>E</em><sub>x</sub>','ผลคูณจุดเลือกองค์ประกอบ x'),S('แนว 45°','Δ<b>l</b>='+frac('δ','√2')+'('+unit('x')+'+'+unit('y')+') ⇒ ΔW=−'+frac('qδ','√2')+'(<em>E</em><sub>x</sub>+<em>E</em><sub>y</sub>)','เวกเตอร์ทิศต้องขนาดหนึ่งจึงหาร √2'),S('แนวสามแกน','ΔW=−'+frac('qδ','√3')+'(<em>E</em><sub>x</sub>+<em>E</em><sub>y</sub>+<em>E</em><sub>z</sub>)','หาร √3 เพื่อให้ระยะรวมเป็น δ ตรวจ C×m×V/m = J และไม่บังคับงานเป็นบวกทุกทิศ')],[('Hayt Problem 4.1',HAYT,118),('Set 9 · งานภายนอก',NODES[8]['sources'][0]['path'],2)]),
]

FINAL=deepcopy(PROBLEMS)
MIDTERM.extend([
mid('hayt-d1-6','Drill D1.6(a): การฉายฐานทรงกระบอก',[1,2],'vector',
 'F=10 ax−8 ay+6 az ที่ P(10,−8,6) m จงแปลงเวกเตอร์เป็นองค์ประกอบทรงกระบอก',
 [S('สูตรทั่วไป','F<sub>ρ</sub>=F<sub>x</sub>cosϕ+F<sub>y</sub>sinϕ; F<sub>ϕ</sub>=−F<sub>x</sub>sinϕ+F<sub>y</sub>cosϕ; F<sub>z</sub> คงเดิม','ใช้มุมของตำแหน่ง P มิใช่มุมที่เลือกเอง'),S('พิกัดมุม','ρ=√164; cosϕ=10/√164; sinϕ=−8/√164; ϕ≈−38.66°','P อยู่ควอดรันต์ที่สี่ atan2 เก็บเครื่องหมายถูก'),S('ฉาย','F<sub>ρ</sub>=(100+64)/√164=√164; F<sub>ϕ</sub>=80/√164−80/√164=0','ส่วน xy ของ F ชี้ตามตำแหน่ง P พอดี จึงไม่มีส่วนสัมผัส'),S('รวม','<b>F</b>=12.806'+unit('ρ')+'+6'+unit('z'),'ขนาดรวม √200 เท่าเดิม หน่วย F ตามโจทย์ซึ่งไม่ได้ระบุเป็น N')],[('Hayt D1.6(a)',HAYT,30),('Set 2 · ฐานทรงกระบอก',NODES[1]['sources'][0]['path'],1)]),
mid('hayt-d2-1','Drill D2.1: แรงบน QA',[4],'electric',
 'QA=−20 µC ที่ A(−6,4,7) m, QB=50 µC ที่ B(5,8,−2) m ในอวกาศว่าง หา RAB, ระยะ และแรงบน QA เมื่อ ε0=8.854×10⁻¹² F/m (เลือกส่วน d ของ Drill)',
 [S('สูตรทั่วไป','<b>R</b><sub>AB</sub>=<b>r</b><sub>B</sub>−<b>r</b><sub>A</sub>; <b>F</b><sub>A←B</sub>='+frac('Q<sub>A</sub>Q<sub>B</sub>','4πε<sub>0</sub>R³')+'(<b>r</b><sub>A</sub>−<b>r</b><sub>B</sub>)','แรงบน A ต้องใช้เวกเตอร์จาก B ไป A ซึ่งสวน RAB'),S('ระยะและหน่วย','<b>R</b><sub>AB</sub>=11'+unit('x')+'+4'+unit('y')+'−9'+unit('z')+' m; R=√218≈14.7648 m<br>QA=−20×10⁻⁶ C; QB=50×10⁻⁶ C','หาขนาดหลังลบตำแหน่ง แล้วแปลงประจุทั้งคู่'),S('แรงเวกเตอร์','<b>F</b><sub>A←B</sub>='+frac('10<sup>−9</sup>','4πε<sub>0</sub>(218)<sup>3/2</sup>')+'(11'+unit('x')+'+4'+unit('y')+'−9'+unit('z')+')','ประจุต่างเครื่องหมายดึงกัน ลบจากผลคูณประจุและลบจากเวกเตอร์จึงชี้ A ไป B'),S('แทนตัวเลข','<b>F</b><sub>A←B</sub>≈30.72'+unit('x')+'+11.169'+unit('y')+'−25.13'+unit('z')+' mN','ผลตรงคำตอบส่วน d ของตำรา ใช้ mN ในคำตอบสุดท้ายหลังคำนวณ N')],[('Hayt D2.1(d)',HAYT,41),('Set 4 · กฎคูลอมบ์',NODES[3]['sources'][0]['path'],8)],points=20),
mid('hayt-d3-1','Drill D3.1(a): ฟลักซ์ทรงกลมหนึ่งส่วนแปด',[3,6,7],'electric',
 'ประจุ +60 µC ที่จุดกำเนิด หาไฟฟลักซ์ผ่านส่วนผิวทรงกลม r=26 cm ที่ 0&lt;θ&lt;π/2, 0&lt;ϕ&lt;π/2',
 [S('สูตรทั่วไป','Ψ=∫<sub>S</sub><b>D</b> • d<b>s</b>; <b>D</b>='+frac('Q','4πr²')+unit('r')+'; d<b>s</b>=r²sinθ dθ dϕ'+unit('r'),'ผิวเปิดส่วนหนึ่งของทรงกลม ใช้ปกติชี้ออกและพื้นที่ตามสองมุม'),S('แปลงหน่วยและตั้งปริพันธ์','Q=60×10⁻⁶ C; r=0.26 m<br>Ψ='+frac('Q','4π')+'∫<sub>0</sub><sup>π/2</sup>dϕ ∫<sub>0</sub><sup>π/2</sup>sinθ dθ','r² ในสนามกับพื้นที่ตัดกัน จึงผลไม่ขึ้นกับรัศมี'),S('อินทิเกรตด้วยมือ','[−cosθ]<sub>0</sub><sup>π/2</sup>=1; [ϕ]<sub>0</sub><sup>π/2</sup>=π/2<br>Ψ='+frac('Q','4π')+'(π/2)(1)=Q/8','เขียนปริพันธ์มุมทั้งสอง ไม่ข้ามไปใช้หนึ่งส่วนแปดทันที'),S('แทนค่าและตรวจ','Ψ=7.5 µC','ส่วนผิวคือหนึ่ง octant ผลเป็นบวกและหน่วย C ไม่ใช่ V/m')],[('Hayt D3.1(a)',HAYT,63),('Set 7 · กฎเกาส์',NODES[6]['sources'][0]['path'],7)],True,30)
])
for p in MIDTERM:
    if p['group']=='electric':
        p['group']='coulomb' if 4 in p['sets'] else 'field'
        p['maxPoints']=20 if p['group']=='coulomb' else 30
find=lambda pid:next(p for p in FINAL if p['id']==pid)
def arrow(x,y,dx,dy,color):
    angle=numeric_math.atan2(dy,dx);xx=x+dx;yy=y+dy
    lines=[(x,y,xx,yy)]+[(xx,yy,xx-10*numeric_math.cos(angle+s),yy-10*numeric_math.sin(angle+s)) for s in [-.45,.45]]
    return ''.join('<line x1="'+str(a)+'" y1="'+str(b)+'" x2="'+str(c)+'" y2="'+str(d)+'" stroke="'+color+'" stroke-width="3"/>' for a,b,c,d in lines)
def svg_text(x,y,text):
    for axis in ['ρ','z','r','θ','ϕ']:
        text=text.replace('a'+axis,'<tspan font-weight="700">a</tspan><tspan baseline-shift="sub" font-size="10">'+axis+'</tspan>')
    for field,axis in [('E','x'),('H','y')]:
        text=text.replace(field+axis,'<tspan font-style="italic">'+field+'</tspan><tspan baseline-shift="sub" font-size="10">'+axis+'</tspan>')
    return '<text x="'+str(x)+'" y="'+str(y)+'" fill="currentColor" font-size="14">'+text+'</text>'
basis=arrow(220,145,90,0,'#64748b')+arrow(220,145,0,-95,'#64748b')+arrow(220,145,69,-58,'#2563eb')+arrow(220,145,58,69,'#b45309')
basis+='<line x1="151" y1="203" x2="220" y2="145" stroke="#64748b" stroke-dasharray="5 4"/>'
basis+='<circle cx="220" cy="145" r="8" stroke="#16a34a" fill="none"/><path d="M214 139 L226 151 M214 151 L226 139" stroke="#16a34a"/>'
basis+=svg_text(310,150,'aρ')+svg_text(220,40,'az')+svg_text(290,84,'ar')+svg_text(284,226,'aθ')+svg_text(135,226,'O')+svg_text(25,30,'ฐานที่จุด P: θ = 50°')+svg_text(20,255,'aϕ เข้าระนาบภาพ · ระนาบนี้คือแนว ρ,z ณ มุม ϕ ของ P')
title,html=MIDTERM[0]['steps'][0]
MIDTERM[0]['steps'][0]=(title,html+'<figure class="lab-chart"><svg viewBox="0 0 430 270" role="img" aria-label="ฐานทรงกลมที่จุด P ในระนาบรัศมีกับแกน z">'+basis+'</svg><figcaption>ลูกศรหน่วยเริ่มที่ P: รัศมีชี้จาก O ผ่าน P ส่วน θ ชี้ทิศเพิ่มมุมจาก +z ฐาน ϕ ตั้งฉากระนาบภาพ และทุกฐานต้องเปลี่ยนเมื่อย้ายจุด</figcaption></figure>')
wave=find('wave');wave['prompt']+=' พร้อมวาดกราฟสนาม E และ H ณ t=0 บนรูปเดียวกันและระบุแกน/หน่วย'
wave['prompt']+=' ใช้ค่าประมาณ c=3×10<sup>8</sup> m/s และ η<sub>0</sub>=120π Ω เพื่อให้การปัดค่าทั้งข้อสอดคล้องกัน'
curves=''
for center,color,axis,peak in [(85,'#2563eb','Ex (V/m)',250),(215,'#b45309','Hy (A/m)',.66315)]:
    points=' '.join(str(65+4*i)+','+str(center-48*numeric_math.cos(2*numeric_math.pi*i/100)) for i in range(101))
    curves+='<line x1="65" y1="'+str(center)+'" x2="470" y2="'+str(center)+'" stroke="#64748b"/><polyline points="'+points+'" fill="none" stroke="'+color+'" stroke-width="3"/>'
    curves+=svg_text(15,center-48,str(peak))+svg_text(35,center,'0')+svg_text(10,center+50,'−'+str(peak))+svg_text(68,center-60,axis)
for x,label in [(65,'0'),(165,'λ/4'),(265,'λ/2'),(365,'3λ/4'),(465,'λ')]:curves+=svg_text(x-10,285,label)
curves+=arrow(355,310,95,0,'#16a34a')+svg_text(70,315,'z (m), λ ≈ 1884.96 m; การแพร่ +z')
title,html=wave['steps'][-1]
wave['steps'][-1]=(title,html+'<figure class="lab-chart"><svg viewBox="0 0 510 335" role="img" aria-label="กราฟสนามไฟฟ้าและสนามแม่เหล็กคลื่นเดียวกัน ณ เวลาเป็นศูนย์">'+curves+'</svg><figcaption>t=0: E ตามแกน x และ H ตามแกน y ต่างเฟสกัน 0° กราฟทั้งสองใช้แกน z ร่วมกัน แต่แยกสเกลแนวตั้งเพราะมีหน่วยต่างกัน ที่ z=λ/2 สนามทั้งสองกลับทิศพร้อมกัน</figcaption></figure>')
find('continuity')['source']=[('Hayt §5.2 · ตัวอย่าง J รัศมี',path,127) if path==HAYT else (label,path,page) for label,path,page in find('continuity')['source']]
find('boundary')['source']=[('Hayt D5.9–D5.10 · วิธีรอยต่อ (คนละข้อมูล)',path,151) if path==HAYT else (label,path,page) for label,path,page in find('boundary')['source']]
find('displacement')['source']=[('Hayt Figure 9.3 · ตัวเก็บประจุ',path,300) if path==HAYT else (label,path,page) for label,path,page in find('displacement')['source']]
# Precise teaching-page anchors; these are method references, not invented exact matches.
for p in MIDTERM:
    p['source']=[(label,path,8 if '/set3_' in path else 22 if '/set2_' in path else 37 if '/set5_' in path else 15 if '/set1_' in path else page) for label,path,page in p['source']]
find('faraday')['source']=[s for s in find('faraday')['source'] if s[1]!=RAW]
find('faraday')['status']='ตัวอย่างสไลด์ Set 20 · สัมประสิทธิ์ 2 ต่างจาก ALL-Q08 ที่เป็น 20'
find('consistency')['status']='ฉบับแก้เลขชี้กำลัง μ ตาม Hayt D9.4 · ต่างจากต้นฉบับ ALL-Q10'
find('consistency')['source']=[s for s in find('consistency')['source'] if s[1]!=RAW]
amp=find('ampere')
amp['prompt']='ลวดยาวอนันต์บนแกน z ให้ <b>H</b> = '+frac('<em>K</em>','2πρ')+unit('ϕ')+' A/m โดย K เป็นค่าคงตัวหน่วย A จงอธิบายสมมาตร เลือกวงแอมแปร์และเขียนสูตรตั้งต้นเพื่อหาขนาดและทิศกระแส (อินทิเกรตต่อใน ALL-Q06)'
amp['steps']=[S('กฎทั่วไป','∮<sub>C</sub><b>H</b> • d<b>l</b> = <em>I</em><sub>enc</sub>','แม่เหล็กสถิตและทิศวงกับปกติสัมพันธ์ตามมือขวา'),S('เลือกทางด้วยสมมาตร','ρ=a; d<b>l</b>=a dϕ'+unit('ϕ')+'; <b>H</b> • d<b>l</b>='+frac('<em>K</em>','2π')+'dϕ','สนามสัมผัสวงและคงที่ตามมุม ตั้งปริพันธ์ไว้แล้วส่งต่อไปขั้นต่อเนื่อง')]
amp['integration']=False
FINAL.append(problem('ampere-continuation','ALL-Q06: อินทิเกรตต่อจาก ALL-Q05',[16],'magnetic',
 'ใช้สนาม H=K aϕ/(2πρ) และวงจาก ALL-Q05 จงหาขนาดและทิศของกระแสตามการเดินทวนเข็มเมื่อมองจาก +z ข้อนี้คือหน้าต่อเนื่องของตัวอย่างเดียวกัน',
 [S('สูตรที่ต้องทวนก่อนเริ่ม','<em>I</em><sub>enc</sub> = ∮<sub>C</sub><b>H</b> • d<b>l</b>; d<b>l</b> = ρ dϕ'+unit('ϕ'),'แม้ต่อจากข้อก่อน ต้องเขียนกฎทั่วไปให้ผู้ตรวจเห็น'),S('อินทิเกรตด้วยมือ','<em>I</em><sub>enc</sub> = '+frac('<em>K</em>','2π')+'∫<sub>0</sub><sup>2π</sup>dϕ = '+frac('<em>K</em>','2π')+'[ϕ]<sub>0</sub><sup>2π</sup> = <em>K</em>','รัศมีจาก H หักล้างรัศมีจากส่วนโค้ง ไม่เหลือ dependence ตามวงที่เลือก'),S('ขนาดและทิศ','|<em>I</em>|=|<em>K</em>| A; K&gt;0 ⇒ ทิศ +z; K&lt;0 ⇒ ทิศ −z','ปกติ +az และวงทวนเข็มให้กระแสผ่านผิวบวกตามมือขวา'),S('ตรวจความสมเหตุผล','หน่วย H×ความยาว = A และผลไม่ขึ้นกับ ρ','ต้นฉบับใช้ K ซึ่งเป็นสเกลาร์ค่าคงตัว อย่าสับสนกับเวกเตอร์กระแสผิว K หน่วย A/m')],
 [('ALL-Q06 · หน้าต่อเนื่อง',RAW,20),('Set 16 · ตั้งวงและทิศ','lecture/final/set16_Ampere/set16_eg_Ampere.pdf',2),('Hayt §7.2',HAYT,202)],True))
find('ampere-continuation')['dependsOn']='ampere'
FINAL.append(problem('raw-faraday','ALL-Q08: สัมประสิทธิ์ E ตามไฟล์ข้อสอบจริง',[20],'dynamic',
 'ε=10<sup>−11</sup> F/m, μ=10<sup>−5</sup> H/m; <b>E</b>=20×10<sup>−4</sup>cos(10<sup>5</sup>t)sin(10<sup>−3</sup>y)'+unit('x')+' V/m หา H โดยให้ส่วนสถิตเป็นศูนย์ตามวิธีเฉลยต้นฉบับ',
 [S('สูตรทั่วไป','∇ × <b>E</b>=−μ'+frac('∂<b>H</b>','∂t')+'<br>'+det('E'),'ตัวกลาง μ คงที่ จึงแทน B=μH ได้ ต้องเขียนดีเทอร์มิแนนต์ก่อนใส่ฟังก์ชัน'),S('เคิร์ล','∇ × <b>E</b> = −'+frac('∂<em>E</em><sub>x</sub>','∂y')+unit('z')+' = −2×10<sup>−6</sup>cos(10<sup>5</sup>t)cos(10<sup>−3</sup>y)'+unit('z'),'อนุพันธ์ sin(10⁻³y) ให้ 10⁻³cos และพจน์เคิร์ล z มีลบ'),S('อินทิเกรตเวลา','∂<em>H</em><sub>z</sub>/∂t = 0.2cos(10<sup>5</sup>t)cos(10<sup>−3</sup>y)<br><em>H</em><sub>z</sub>=0.2cos(10<sup>−3</sup>y)∫cos(10<sup>5</sup>t)dt<br>=2×10<sup>−6</sup>sin(10<sup>5</sup>t)cos(10<sup>−3</sup>y)+h<sub>0</sub>(x,y,z)','อินทิเกรต cosωt เป็น sinωt/ω ค่าคงตัวเป็นสนามที่ไม่เปลี่ยนเวลา จึงต้องระบุเงื่อนไขเพื่อเลือกมัน'),S('คำตอบและเปรียบเทียบฉบับ','<b>H</b>=2×10<sup>−6</sup>sin(10<sup>5</sup>t)cos(10<sup>−3</sup>y)'+unit('z')+' A/m','กำหนด h0=0 ตามเฉลย ตัวเลขใหญ่กว่าฉบับสไลด์ 10 เท่าเพราะ E ต้นฉบับเป็น 20 มิใช่ 2; ε ไม่จำเป็นสำหรับการหา H จากฟาราเดย์เพียงสมการเดียว')],
 [('ALL-Q08 · สัมประสิทธิ์ 20',RAW,23),('Set 20 · ฉบับสัมประสิทธิ์ 2','lecture/final/set20_Time_Varying/set20_eg_Time_varying.pdf',1),('Hayt D9.1 · สนาม B คนละโจทย์',HAYT,297)],True))
FINAL.append(problem('raw-consistency','ALL-Q10: ตรวจข้อขัดแย้งในข้อมูลต้นฉบับ',[19,21],'dynamic',
 'ไฟล์ต้นฉบับพิมพ์ μ=10<sup>5</sup> H/m, ε=4×10<sup>−9</sup> F/m, σ=0, ρv=0, E=(20y−kt) ax V/m, H=(y+2×10<sup>6</sup>t) az A/m จงตรวจทุกสมการและพิจารณาว่ามี k ที่ทำให้สอดคล้องทั้งหมดหรือไม่ แล้วเทียบฉบับตำรา',
 [S('ตั้งสมการเต็ม',maxpoint+'<br>'+det('E')+'<br>'+det('H'),'ตรวจทั้งกฎเคิร์ลและเกาส์ ไม่เลือก k จากเพียงสมการที่ให้คำตอบได้'),S('ฟาราเดย์เผยข้อขัดแย้ง','∇ × <b>E</b>=−20'+unit('z')+'<br>−μ∂<b>H</b>/∂t=−(10<sup>5</sup>)(2×10<sup>6</sup>)'+unit('z')+'=−2×10<sup>11</sup>'+unit('z'),'สองข้างไม่เท่ากัน และไม่ขึ้นกับ k จึงไม่มี k ที่แก้ข้อมูลฉบับนี้ได้ครบ'),S('แอมแปร์–แมกซ์เวลล์','∇ × <b>H</b>='+unit('x')+'; ε∂<b>E</b>/∂t=−εk'+unit('x')+' ⇒ k=−2.5×10<sup>8</sup> V/(m·s)','ค่านี้ทำให้แอมแปร์เป็นจริง แต่ยังแก้ฟาราเดย์ที่ขัดแย้งไม่ได้ เกาส์ทั้งสองเป็นศูนย์เพราะอนุพันธ์ตาม x,z เป็นศูนย์'),S('ฉบับแก้ที่ตรวจเทียบได้','Hayt D9.4 ใช้ μ=10<sup>−5</sup> H/m ⇒ −μ∂<b>H</b>/∂t=−20'+unit('z'),'เมื่อแก้เลขชี้กำลังเป็น −5 ทั้งสี่สมการจึงสอดคล้องสำหรับ k ข้างต้น แยกฉบับนี้ในคลัง ห้ามแก้ข้อมูลต้นฉบับโดยไม่แจ้ง')],
 [('ALL-Q10 · ข้อมูล μ ที่พิมพ์',RAW,28),('Set 21 · เฉลยที่เกี่ยวข้อง','lecture/final/set21_Displacement_Current/set21_eg_jd.pdf',1),('Hayt D9.4(b) · μ=10⁻⁵',HAYT,304)]))
FINAL.append(problem('raw-phasor','ALL-Q12: จากสนามทันทีสู่เฟสเซอร์',[22],'wave',
 '<b>E</b>(z,t)=<em>E</em><sub>x0</sub>cos(ωt−k<sub>0</sub>z)'+unit('x')+' V/m เขียนในรูป Re{<b>E</b><sub>s</sub>(x,y,z)e<sup>jωt</sup>} และหา <b>E</b><sub>s</sub>',
 [S('นิยามและออยเลอร์','e<sup>jψ</sup>=cosψ+j sinψ; <b>E</b>=Re{<b>E</b><sub>s</sub>e<sup>jωt</sup>}','กำหนดคอนเวนชัน eʲωᵗ ก่อนเปรียบเทียบเฟส'),S('แทนโคไซน์','<b>E</b>=Re{<em>E</em><sub>x0</sub>'+unit('x')+'e<sup>j(ωt−k<sub>0</sub>z)</sup>}','ส่วนจริงของเอ็กซ์โพเนนเชียลคือโคไซน์ ไม่ต้องใช้สูตรไซน์หรือเปลี่ยนแอมพลิจูด'),S('แยกเวลาออก','e<sup>j(ωt−k<sub>0</sub>z)</sup>=e<sup>−jk<sub>0</sub>z</sup>e<sup>jωt</sup>','ปัจจัยที่ไม่ขึ้นกับเวลาเป็นเฟสเซอร์เชิงอวกาศ'),S('ระบุคำตอบและตรวจ','<b>E</b><sub>s</sub>(x,y,z)=<em>E</em><sub>x0</sub>e<sup>−jk<sub>0</sub>z</sup>'+unit('x')+' V/m','สนามนี้ขึ้นกับ z เท่านั้น คืนส่วนจริงได้โจทย์เดิม เฟส ωt−k0z เดิน +z และแอมพลิจูดยังคงค่า peak')],
 [('ALL-Q12 · หน้าโจทย์และเฉลย',RAW,36),('Set 22 · ตัวอย่างเฟสเซอร์','lecture/final/set22_Maxwell_time_harmonic/set22_eg_Spatial_field.pdf',1),('Hayt §11.1 · คลื่นและเฟสเซอร์',HAYT,385)]))

extra=problem('hayt-transmission','อ่านต่อยอด D10.1: สายส่งสูญเสียต่ำ',[22],'supplement',
 'ω=500 Mrad/s; R=0.2 Ω/m, L=0.25 µH/m, G=10 µS/m, C=100 pF/m หา α,β,λ,vp,Z0 ด้วยประมาณสูญเสียต่ำ หัวข้อสายส่งนี้เป็นการต่อยอด ไม่สุ่มในห้องสอบตามขอบเขตสไลด์',
 [S('สูตรทั่วไป','γ=√[(R+jωL)(G+jωC)]=α+jβ; Z<sub>0</sub>=√'+frac('R+jωL','G+jωC'),'เลือกสาขารากที่ α≥0; R,L,G,C เป็นค่าต่อความยาว'),S('แปลงหน่วยและตรวจเงื่อนไข','ω=5×10<sup>8</sup> rad/s; L=2.5×10<sup>−7</sup> H/m; G=10<sup>−5</sup> S/m; C=10<sup>−10</sup> F/m<br>'+frac('R','ωL')+'=0.0016; '+frac('G','ωC')+'=0.0002','ทั้งสองอัตราส่วนเล็กกว่าหนึ่งมาก จึงใช้ประมาณสูญเสียต่ำได้'),S('พารามิเตอร์แพร่','α≈'+frac('1','2')+'(R√(C/L)+G√(L/C))=0.00225 Np/m<br>β≈ω√(LC)=2.5 rad/m<br>λ='+frac('2π','β')+'≈2.5133 m; v<sub>p</sub>='+frac('ω','β')+'≈2×10<sup>8</sup> m/s','α มีหน่วย Np/m ไม่ใช่ dB/m ส่วน β เป็นเฟสต่อความยาว'),S('อิมพีแดนซ์','Z<sub>0</sub>≈√(L/C)[1+j(G/ωC−R/ωL)/2] = 50−j0.035 Ω','ส่วนจินตภาพติดลบเพราะ R/ωL มากกว่า G/ωC ผลตรงคำตอบตำราโดยความแม่นยำของประมาณ')],
 [('Hayt D10.1 · สายส่ง',HAYT,331),('Set 22 · ความเร็วเฟส (ฐานเชื่อมโยง ไม่ใช่โจทย์สายส่ง)',NODES[21]['sources'][0]['path'],36)])
extra['examEligible']=False;FINAL.append(extra)

SOURCE_ROWS=[('ALL-Q01','continuity',1,3,'ตัวอย่างต่อเนื่อง'),('ALL-Q02','boundary',4,6,'ตัวอย่างขอบเขต'),('ALL-Q03','laplace',7,13,'ลาปลาสแผ่นขนาน'),('ALL-Q04','wire',14,18,'บิโอต์–ซาวารต์'),('ALL-Q05','ampere',19,19,'ตั้งวงแอมแปร์'),('ALL-Q06','ampere-continuation',20,20,'หน้าต่อเนื่อง ALL-Q05'),('ALL-Q07','curl',21,22,'เคิร์ล ณ จุด'),('ALL-Q08','raw-faraday',23,25,'E สัมประสิทธิ์ 20'),('ALL-Q09','displacement',26,27,'ตัวเก็บประจุ'),('ALL-Q10','raw-consistency',28,30,'ตรวจข้อมูล μ ขัดแย้ง'),('ALL-Q11','wave',31,35,'คลื่นเชิงตัวเลข'),('ALL-Q12','raw-phasor',36,36,'แปลงเฟสเซอร์')]
SOURCE_MAP=[]
for code,pid,start,end,note in SOURCE_ROWS:
    p=find(pid);p['originCode']=code;p['sourcePages']=[start,end];p['status']=code+' · '+note+' · เรียบเรียงจากไฟล์จริง'
    if p['title'].startswith(code+': '):p['title']=p['title'][len(code)+2:]
    SOURCE_MAP.append(dict(code=code,problemId=pid,pages=[start,end],note=note,dependsOn='ALL-Q05' if code=='ALL-Q06' else None,sources=p['source']))

WHY={
 'continuity':['ความต่อเนื่องวัดอัตราประจุที่ลดจากการไหลออก จึงมีเครื่องหมายลบ','J มีเฉพาะส่วนรัศมี จึงเหลืออนุพันธ์ r²Jr ตามสูตรทรงกลม','ขณะอินทิเกรตเวลา พิกัดคงที่ ต้องใช้เงื่อนไขปลายเวลาหาค่าคงตัว','หาร J ด้วยความหนาแน่นประจุได้ความเร็วพา ตรวจหน่วยให้เป็น m/s'],
 'boundary':['เงื่อนไขสัมผัสมาจากวง E ส่วนปกติมาจากเกาส์ของ D','ส่วนสัมผัส E เท่ากัน แต่ D ต่างตาม ε','ไม่มีประจุผิวทำให้ D ปกติเท่ากัน ไม่บังคับ E ปกติเท่ากัน','ต้องรักษาหน่วย C/m² ที่โจทย์กำหนด ค่าใหญ่ไม่ใช่เหตุให้แก้เป็น nC/m²'],
 'laplace':['สมมาตรแผ่นกว้างลดสมการสามมิติเป็นหนึ่งมิติ','สมการอันดับสองต้องอินทิเกรตสองครั้งและกำหนดค่าคงตัวจากขอบสองแห่ง','สนามเป็นลบเกรเดียนต์ และประจุผิวใช้ปกติออกจากแผ่นแต่ละแผ่น','รวมความหนาแน่นผิวให้ Q ก่อนใช้ C=Q/ΔV'],
 'wire':['ตั้ง R จากชิ้นแหล่งบนลวดไปจุดสังเกต','ผลคูณไขว้เลือกเฉพาะส่วนรัศมีเพราะ az×az=0','การแทนตรีโกณมิติต้องเปลี่ยนขอบเขตเป็น ±π/2','คืนตัวประกอบ Iρ/(4π) และทิศมือขวา จึงได้หน่วย A/m'],
 'curl':['ดีเทอร์มิแนนต์ทั่วไปแสดงเครื่องหมายตามลำดับฐาน','ต้องระบุองค์ประกอบให้ครบรวมส่วนที่เป็นศูนย์','หาอนุพันธ์ก่อนแทนจุด มิฉะนั้นข้อมูลเปลี่ยนเป็นค่าคงที่','ตรวจ divergence J=0 เป็นการตรวจอิสระของกระแสสถิต'],
 'faraday':['ฟาราเดย์เชื่อมเคิร์ล E กับอนุพันธ์เวลา B','สนามมีเฉพาะองค์ประกอบ x แต่เปลี่ยนตาม y จึงได้เคิร์ลแนว z','หาร μ แล้วอินทิเกรตเวลา ต้องหาร ω ที่มาจาก chain rule','ค่าคงตัวเชิงอวกาศคือส่วนสนามสถิต ต้องประกาศว่าเลือกศูนย์'],
 'displacement':['เริ่มจากความจุและสูตร Id ที่สัมพันธ์กับ D','กระแสลวดได้จากอนุพันธ์ประจุ CV','E=V/d ใช้สมมติสนามแผ่นขนานแล้วจึงหา D','อินทิเกรตกระแสหนาแน่นผ่านผิวได้กระแส A เท่ากับในลวด'],
 'consistency':['กำหนดตัวกลางและสมการทั้งสี่ก่อนหา k','ฟาราเดย์เป็นการตรวจข้อมูล μ โดยไม่พึ่ง k','แอมแปร์กำหนด k จากอนุพันธ์ E ตามเวลา','เกาส์ทั้งสองยังต้องตรวจ ไม่พอเพียงเคิร์ลตรง'],
 'wave':['แปลง Mrad/s เป็น rad/s ก่อนใช้ f=ω/(2π)','β=ω/c และ λ=2π/β ต้องใช้ความถี่เชิงมุมเดียวกัน','อนุพันธ์เชิงอวกาศของ Ex ให้ส่วน y ของเคิร์ล ก่อนหาร −jωμ','คืนเวลาจริงแล้วตรวจทิศด้วยเฟสคงที่และ E×H'],
}
LECTURE_PAGES={10:4,12:10,13:3,14:3,17:47,18:1,20:11,21:8,22:8}
WHY.update({
 'hayt-current':['กระแสเป็นอินทิกรัล J ผ่านผิว ต้องเขียนส่วนย่อยทรงกระบอกก่อนแทนรัศมี','แทน ρ=3, ϕ=30°, z=2 หลังแจกแจงองค์ประกอบและหน่วย mA','ผลคูณจุดเลือกเฉพาะส่วนรัศมี แล้วอินทิเกรตมุมก่อน z ด้วยมือ','พจน์สัมผัสไม่ทะลุผิว ตรวจผลด้วยคำตอบต้นฉบับ'],
 'hayt-boundary':['สัมผัส E ต่อเนื่อง ส่วนปกติ D ต่อเนื่องเมื่อไม่มีประจุผิว','ประกาศปกติร่วมแล้วแยกเวกเตอร์เป็นปกติกับสัมผัส','D สัมผัสเปลี่ยนตามอัตราส่วน ε2/ε1 เพราะ E สัมผัสเท่ากัน','รวมส่วนสัมผัสใหม่กับส่วนปกติเดิม ห้ามคูณอัตราส่วนทั้งเวกเตอร์'],
 'hayt-poisson':['เลือกปัวซงพิกัดทรงกระบอกให้ตรงตัวแปรของศักย์','อนุพันธ์รัศมีต้องคูณ ρ ก่อนดิฟแล้วหาร ρ ตามตัวประกอบสเกล','อนุพันธ์มุมอันดับสองมีตัวประกอบหนึ่งส่วน ρ² จึงหักล้างพจน์รัศมี','ศักย์ไม่ศูนย์ในบริเวณไร้ประจุได้ ตรวจค่าจุดหลังหา Laplacian'],
 'hayt-stokes':['ใช้ปกติ +az กำหนดการเดินวงทวนเข็มตามมือขวา','เคิร์ลมีเฉพาะ z จึงผลคูณจุดกับปกติเลือก −6x','ขอบบนและซ้ายเดินสวนแกนบวก ต้องใส่ขอบเขตตามการเดินจริง','ตรวจทั้งสองด้านเท่ากันเพื่อจับเครื่องหมายขอบผิด'],
 'hayt-displacement':['เขียน Jd=ε∂E/∂t แล้วแปลง MV/m เป็น V/m ก่อนคูณ','สัมประสิทธิ์ของ t ภายในเฟสคือ ω ไม่ใช่ค่าคงตัวเชิงอวกาศ','อนุพันธ์ cos ให้ −sin คูณ chain rule ω','แอมพลิจูดใช้ขนาดบวก เครื่องหมายลบเป็นข้อมูลเฟส'],
 'hayt-energy':['แรงดันขณะเติมประจุคือ q/C จึงต้องอินทิเกรตงานจาก 0 ถึง Q','µm และ µJ ต้องแปลงก่อนหา C และ εr','ใช้ W=CV²/2 แก้ C โดยยังรักษาหน่วย F','นำ C กลับเข้าความจุแผ่นขนาน ผล εr ไม่มีหน่วย'],
 'hayt-faraday':['โจทย์ให้ B จึงต้องใช้ B=μH ก่อนหาเคิร์ลและเชื่อมกับ E','เคิร์ล H เลือกอนุพันธ์ตาม y จากนั้นอินทิเกรตเวลาและกำหนดส่วนสถิต','ฟลักซ์เป็นปริพันธ์ผิวของ B ให้ขอบ z และ y ถูกต้อง','ตรวจมิติ Wb และความสัมพันธ์เลขคลื่นกับ ω√με'],
 'hayt-magnetic-boundary':['กำหนดปกติ 2 ไป 1 ให้สมการกระแสผิวมีเครื่องหมายตรงกัน','B ปกติต่อเนื่องจึงให้ H ปกติเปลี่ยนตามอัตราส่วน μ','ผลคูณไขว้กับปกติให้สมการส่วน y,z ของ H กระโดดตาม K','รวมเวกเตอร์และตรวจคำตอบโดยแทนกลับสมการรอยต่อ'],
})
for p in FINAL:
    if not any(s[1].startswith('lecture/') for s in p['source']):
        n=p['sets'][0];src=NODES[n-1]['sources'][0];p['source'].append(('Set '+str(n)+' · สูตรพื้นฐานที่เกี่ยวข้อง',src['path'],LECTURE_PAGES.get(n,1)))
    if p['id']=='hayt-stokes':p['source'].append(('Set 20 · สโตกส์เชื่อมวงกับผิว',NODES[19]['sources'][0]['path'],10))
    if p['id']=='hayt-boundary':p['source'].append(('Set 12 · เงื่อนไข D ปกติ',NODES[11]['sources'][0]['path'],20))
    p['maxPoints']=25
    for i,(title,html) in enumerate(p['steps']):
        if 'why-step' not in html:
            why=WHY.get(p['id'],[s['why'] for s in NODES[p['sets'][0]-1]['derivation']])
            p['steps'][i]=(title,html+'<p class="why-step"><b>ทำไมจึงทำขั้นนี้?</b> '+why[min(i,len(why)-1)]+'</p>')

# Expand compact solutions into single operations while preserving verified answers.
def teaching_steps(n, indices):
    return [S(s['title'],s['equation'],s['why']) for i in indices for s in [NODES[n-1]['derivation'][i]]]
find('continuity')['steps']=[find('continuity')['steps'][0]]+teaching_steps(10,[4,5,6,7])+[find('continuity')['steps'][-1]]
find('wire')['steps']=teaching_steps(15,range(7))+[find('wire')['steps'][-1]]
find('laplace')['steps']=teaching_steps(14,range(8))+[find('laplace')['steps'][-1]]
find('boundary')['steps']=[find('boundary')['steps'][0],
 S('วงบางพิสูจน์ส่วนสัมผัส','∮<b>E</b> • d<b>l</b>=(E<sub>t1</sub>−E<sub>t2</sub>)Δl+O(Δh)=0<br>Δh→0 ⇒ E<sub>t1</sub>=E<sub>t2</sub>','ด้านยาวของวงเดินสวนกัน ด้านสั้นหายเมื่อความสูงเข้าใกล้ศูนย์ในสนามจำกัด'),
 S('กล่องยาพิสูจน์ส่วนปกติ','(D<sub>n1</sub>−D<sub>n2</sub>)ΔS=ρ<sub>s</sub>ΔS ⇒ D<sub>n1</sub>−D<sub>n2</sub>=ρ<sub>s</sub>','ใช้ปกติร่วมจาก 2 ไป 1 ตามโจทย์ ฝาด้าน 1 ชี้ตามปกติ ฝาด้าน 2 ชี้สวนปกติ ด้านข้างหายเมื่อกล่องบาง')]+find('boundary')['steps'][1:]
find('ampere')['steps']=[find('ampere')['steps'][0],
 S('กำหนดทิศผิวกับวง','d<b>s</b>=ds'+unit('z')+'; วงเดินทวนเข็มเมื่อมองจาก +z','เมื่อปกติ +z กระแสผ่านผิวตาม +z ถูกนับบวก กฎมือขวาผูกทิศทั้งสอง'),
 S('สมมาตรที่อนุญาตให้ดึงสนามออก',''+frac('∂H<sub>ϕ</sub>','∂ϕ')+'=0; H<sub>ϕ</sub>='+frac('K','2πρ'),'ลวดอนันต์ร่วมแกนทำให้ขนาด H คงที่ทุกจุดบนวงรัศมีเดียวกัน กฎนี้ไม่ได้ให้ H คงที่บนทุกวง')]+find('ampere')['steps'][1:]
find('curl')['steps']=find('curl')['steps'][:2]+[
 S('อนุพันธ์สำหรับองค์ประกอบ x',''+frac('∂H<sub>z</sub>','∂y')+'=−2yx; '+frac('∂H<sub>y</sub>','∂z')+'=x² ⇒ J<sub>x</sub>=−2yx−x²','ถือ x,z คงที่ในอนุพันธ์ y และถือ x,y คงที่ในอนุพันธ์ z'),
 S('อนุพันธ์สำหรับองค์ประกอบ y',''+frac('∂H<sub>x</sub>','∂z')+'=0; '+frac('∂H<sub>z</sub>','∂x')+'=−y² ⇒ J<sub>y</sub>=0−(−y²)=y²','รักษาลบจากสูตร curl แยกจากลบในองค์ประกอบ Hz'),
 S('อนุพันธ์สำหรับองค์ประกอบ z',''+frac('∂H<sub>y</sub>','∂x')+'=2xz; '+frac('∂H<sub>x</sub>','∂y')+'=0 ⇒ J<sub>z</sub>=2xz','คง z เป็นตัวแปรจนอนุพันธ์เสร็จ แล้วจึงแทนพิกัด')]+[find('curl')['steps'][-1]]
find('displacement')['steps']=[find('displacement')['steps'][0]]+teaching_steps(21,[5,6,7])+[find('displacement')['steps'][-1]]
find('wave')['steps']=[find('wave')['steps'][0]]+teaching_steps(22,[0,1,2,3,4,5,6,7,8])+find('wave')['steps'][1:]
find('raw-faraday')['steps']=[find('raw-faraday')['steps'][0]]+teaching_steps(20,[6,7,8])+find('raw-faraday')['steps'][1:]
find('raw-consistency')['steps']=find('raw-consistency')['steps'][:3]+[
 S('ตรวจเกาส์ของสนามไฟฟ้า','∇ • <b>D</b>=ε'+frac('∂(20y−kt)','∂x')+'=0=ρ<sub>v</sub>','สนาม E มีองค์ประกอบ x แต่ฟังก์ชันไม่ขึ้นกับ x จึง divergence ศูนย์ ไม่ใช่ดิฟเฟอเรนเชียลตาม y'),
 S('ตรวจเกาส์ของสนามแม่เหล็ก','∇ • <b>B</b>=μ'+frac('∂(y+2×10<sup>6</sup>t)','∂z')+'=0','B มีองค์ประกอบ z แต่ไม่ขึ้นกับ z จึงไม่มีแหล่งแม่เหล็ก ทั้งสองกฎเกาส์ผ่านโดยไม่แก้ข้อขัดแย้งของฟาราเดย์')]+[find('raw-consistency')['steps'][-1]]
MIDTERM[2]['steps']=teaching_steps(5,range(8))+[MIDTERM[2]['steps'][-1]]
MIDTERM[3]['steps']=MIDTERM[3]['steps'][:1]+[
 S('ตั้งขอบและแทนตัวแปร','V<sub>AB</sub>=−'+frac('1','ε<sub>0</sub>')+'∫<sub>rB</sub><sup>rA</sup>'+frac('r dr','(r²+a²)²')+'<br>u=r²+a²; du=2rdr; u<sub>B</sub>=r<sub>B</sub>²+a²; u<sub>A</sub>=r<sub>A</sub>²+a²','เปลี่ยนขอบตามตัวแปรใหม่และคงลบจากนิยามศักย์ไว้ด้านนอก'),
 S('ปริพันธ์กำลังด้วยมือ','V<sub>AB</sub>=−'+frac('1','2ε<sub>0</sub>')+'∫<sub>uB</sub><sup>uA</sup>u<sup>−2</sup>du=+'+frac('1','2ε<sub>0</sub>')+'[u<sup>−1</sup>]<sub>uB</sub><sup>uA</sup>','∫u⁻²du=−u⁻¹ ทำให้ลบสองตัวตัดกัน และต้องประเมินค่าปลายลบต้น')]+MIDTERM[3]['steps'][1:]
# Both rooms retain the physical source order in their canonical banks.
FINAL.sort(key=lambda p:(not bool(p.get('originCode')),p.get('originCode','')))

MIDTERM[3]['source'].insert(1,('MID-Q04 · ข้อย่อยและรูปต่อเนื่อง',MIDRAW,3))

find('laplace')['prompt']=find('laplace')['prompt'].replace('ช่องว่างมี ε คงที่','ช่องว่างเป็นอวกาศว่าง ε=ε₀ (ใช้ S แทนพื้นที่ A ของต้นฉบับ)')
find('laplace')['steps'].append(S('คืนตัวกลางตามต้นฉบับ','ε=ε<sub>0</sub> ⇒ <b>D</b>=−'+frac('ε<sub>0</sub>V<sub>0</sub>','d')+unit('z')+'; C='+frac('ε<sub>0</sub>S','d'),'การพิสูจน์ใช้ ε ทั่วไปเพื่อให้เห็นบทบาทวัสดุ แต่คำตอบของ ALL-Q03 ต้องแทน ε₀ เพราะช่องว่างในไฟล์จริงเป็นอวกาศว่าง'))

find('ampere-continuation')['prompt']='ใช้สนาม <b>H</b>='+frac('<em>K</em>','2πρ')+unit('ϕ')+' A/m และวงจาก ALL-Q05 จงหาขนาดและทิศของกระแสตามการเดินทวนเข็มเมื่อมองจาก +z ข้อนี้คือหน้าต่อเนื่องของตัวอย่างเดียวกัน'
