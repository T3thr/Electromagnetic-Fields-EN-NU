/**
 * 303214 สนามแม่เหล็กไฟฟ้า 1 (Electromagnetic Fields I)
 * Universal Site Search Index Database
 * ดัชนีสืบค้นเนื้อหาครอบคลุมทุกบทเรียน (01-09), ใบสูตร, และระบบจำลองข้อสอบ
 */

window.EMF_SEARCH_INDEX = [
  // ── บทที่ 1 ──
  {
    title: "บทที่ 1: พีชคณิตเวกเตอร์และระบบพิกัดฉาก (Vector Analysis & Cartesian Coordinates)",
    category: "บทเรียน",
    url: "01-vector-algebra/index.html",
    keywords: ["เวกเตอร์", "พิกัดฉาก", "cartesian", "vector", "dot product", "cross product", "position vector", "distance vector", "ขนาด", "ยูนิตเวกเตอร์", "d1.1", "d1.3", "d1.4", "dl", "ds", "dv"],
    snippet: "ปริมาณสเกลาร์-เวกเตอร์, เวกเตอร์บอกตำแหน่งและระยะทาง, ผลคูณจุด (Dot), ผลคูณไขว้ (Cross), ส่วนย่อยเชิงอนุพันธ์ dl, ds, dv"
  },
  {
    title: "ผลคูณจุด (Dot Product) และการหามุมระหว่างเวกเตอร์",
    category: "บทเรียน",
    url: "01-vector-algebra/index.html#sec4",
    keywords: ["dot product", "ผลคูณจุด", "scalar product", "มุม", "cos theta", "ตั้งฉาก", "orthogonal", "projection", "ภาพฉาย"],
    snippet: "A • B = |A||B| cos θ = Ax Bx + Ay By + Az Bz, การทดสอบการตั้งฉาก และการหาองค์ประกอบภาพฉายสเกลาร์และเวกเตอร์"
  },
  {
    title: "ผลคูณไขว้ (Cross Product) และการหาพื้นที่สามเหลี่ยม",
    category: "บทเรียน",
    url: "01-vector-algebra/index.html#sec5",
    keywords: ["cross product", "ผลคูณไขว้", "vector product", "ดีเทอร์มิแนนต์", "determinant", "พื้นที่", "area", "สามเหลี่ยม", "กฎมือขวา"],
    snippet: "A × B = aN |A||B| sin θ, สูตรดีเทอร์มิแนนต์ในพิกัดฉาก, พื้นที่สี่เหลี่ยมด้านขนานและสามเหลี่ยม"
  },

  // ── บทที่ 2 ──
  {
    title: "บทที่ 2: ระบบพิกัดทรงกระบอก (Circular Cylindrical Coordinates)",
    category: "บทเรียน",
    url: "02-cylindrical-coordinates/index.html",
    keywords: ["ทรงกระบอก", "cylindrical", "rho", "phi", "z", "โรว์", "ฟาย", "พิกัด", "แปลงพิกัด", "table 1.1", "เมทริกซ์", "matrix", "d1.5", "d1.6"],
    snippet: "ตัวแปร (ρ, ϕ, z), ผิวตัดกัน 3 ผิว, เวกเตอร์ฐาน (<b>a</b><sub>ρ</sub>, <b>a</b><sub>ϕ</sub>, <b>a</b><sub>z</sub>), ส่วนย่อย dv = ρ dρ dϕ dz, การแปลงจุดและสนามเวกเตอร์"
  },
  {
    title: "ตารางผลคูณจุด Table 1.1 และเมทริกซ์การแปลงเวกเตอร์ [<em>A</em><sub>rc</sub>]",
    category: "บทเรียน",
    url: "02-cylindrical-coordinates/index.html#sec6",
    keywords: ["เมทริกซ์", "matrix", "table 1.1", "a_rc", "a_cr", "แปลงเวกเตอร์", "cos phi", "sin phi", "dot product table"],
    snippet: "เมทริกซ์แปลงระหว่าง Cartesian และ Cylindrical: <em>A</em><sub>ρ</sub> = Ax cos ϕ + Ay sin ϕ, <em>A</em><sub>ϕ</sub> = -Ax sin ϕ + Ay cos ϕ"
  },

  // ── บทที่ 3 ──
  {
    title: "บทที่ 3: ระบบพิกัดทรงกลม (Spherical Coordinates) — ข้อสอบข้อ 1 (25 คะแนน)",
    category: "บทเรียน",
    url: "03-spherical-coordinates/index.html",
    keywords: ["ทรงกลม", "spherical", "r", "theta", "phi", "ข้อสอบ 1", "ข้อ 1", "exam 1", "เมทริกซ์ทรงกลม", "a_rs", "ข้อจำกัดเวกเตอร์หน่วย", "table 1.2", "d1.7", "d1.8"],
    snippet: "ตัวแปร (r, θ, ϕ), ผิวตัดกัน 3 ผิว, เวกเตอร์ฐาน (<b>a</b><sub>r</sub>, <b>a</b><sub>θ</sub>, <b>a</b><sub>ϕ</sub>), ส่วนย่อย dv = r² sin θ dr dθ dϕ, ตาราง Table 1.2 และเฉลยข้อสอบข้อ 1"
  },
  {
    title: "ตารางผลคูณจุด Table 1.2 และเมทริกซ์แปลงพิกัดทรงกลม [<em>A</em><sub>rs</sub>]",
    category: "บทเรียน",
    url: "03-spherical-coordinates/index.html#sec6",
    keywords: ["table 1.2", "เมทริกซ์ทรงกลม", "a_rs", "a_sr", "แปลงเวกเตอร์ทรงกลม", "sin theta cos phi", "dot product spherical"],
    snippet: "ตาราง Dot Product ยูนิตเวกเตอร์ Table 1.2 และเมทริกซ์การแปลง 3x3 ระหว่าง Cartesian และ Spherical Coordinates"
  },
  {
    title: "ข้อจำกัดของเวกเตอร์หน่วยในพิกัดทรงกลม (ข้อสอบ 1.1 — 10 คะแนน)",
    category: "ข้อสอบ",
    url: "03-spherical-coordinates/index.html#sec8",
    keywords: ["ข้อ 1.1", "ข้อจำกัด", "เวกเตอร์หน่วยเปลี่ยนทิศ", "a_r", "a_theta", "a_phi", "ข้อสอบกลางภาค 1.1"],
    snippet: "คำอธิบายเหตุผลทางเรขาคณิตว่าเหตุใด <b>a</b><sub>r</sub>, <b>a</b><sub>θ</sub>, <b>a</b><sub>ϕ</sub> จึงเปลี่ยนทิศตามมุม θ และ ϕ พร้อมภาพประกอบและข้อสรุปห้ามบวกตรงๆ"
  },

  // ── บทที่ 4 ──
  {
    title: "บทที่ 4: กฎของคูลอมบ์และแรงระหว่างประจุ (Coulomb's Law) — ข้อสอบข้อ 2 (20 คะแนน)",
    category: "บทเรียน",
    url: "04-coulombs-law/index.html",
    keywords: ["คูลอมบ์", "coulomb", "แรง", "force", "f_net = 0", "สมดุลแรง", "ข้อสอบ 2", "ข้อ 2", "exam 2", "จุดประจุ", "d2.1", "superposition"],
    snippet: "กฎของคูลอมบ์ในรูปเวกเตอร์ F = k (Q1 Q2 / R²) <b>a</b><sub>R</sub>, หลักการซ้อนทับ (Superposition), จุดสะเทิน และเฉลยข้อสอบจริง ข้อ 2"
  },
  {
    title: "เฉลยข้อสอบกลางภาคฉบับจริง ข้อที่ 2: แรงลัพธ์และสมดุลแรง (20 คะแนน)",
    category: "ข้อสอบ",
    url: "04-coulombs-law/index.html#sec7",
    keywords: ["ข้อสอบ 2", "ข้อ 2.1", "ข้อ 2.2", "q1 = 3sqrt3", "q2 = 2", "q3 = 3", "แรงลัพธ์บน q2", "สมดุลแรง q4"],
    snippet: "ขั้นตอนคำนวณแรงลัพธ์บน Q2 อย่างละเอียดทุกตัวแปร และการหาขนาด/ตำแหน่งประจุเพื่อสร้างสภาวะสมดุลแรง <em>F</em><sub>net</sub> = 0"
  },

  // ── บทที่ 5 ──
  {
    title: "บทที่ 5: ความเข้มสนามไฟฟ้า E (Electric Field Intensity) — ข้อสอบข้อ 3 (30 คะแนน)",
    category: "บทเรียน",
    url: "05-electric-field-intensity/index.html",
    keywords: ["สนามไฟฟ้า", "electric field", "e", "ลวดประจุ", "line charge", "rho_l", "อินทิเกรตตรีโกณ", "tan psi", "ข้อสอบ 3", "ข้อ 3", "exam 3", "d2.2", "d2.3", "d2.4", "d2.5"],
    snippet: "นิยามสนามไฟฟ้า E = F/<em>q</em><sub>t</sub>, การกระจายตัวประจุ (<em>ρ</em><sub>l</sub>, <em>ρ</em><sub>s</sub>, <em>ρ</em><sub>v</sub>), อินทิเกรตลวดประจุจำกัดด้วยการแทนค่าตรีโกณมิติ และเฉลยข้อสอบข้อ 3"
  },
  {
    title: "การพิสูจน์และอินทิเกรตสนามไฟฟ้าจากเส้นลวดประจุจำกัด (ข้อสอบ 3 — 30 คะแนน)",
    category: "ข้อสอบ",
    url: "05-electric-field-intensity/index.html#sec5",
    keywords: ["อินทิเกรตลวดประจุ", "z' = h tan psi", "sec^2 psi", "พิสูจน์สูตรสนามไฟฟ้า", "ข้อสอบ 3", "analytical integration"],
    snippet: "ขั้นตอนการกำหนดตัวแปรตรีโกณมิติ z' = h tan ψ, ดิฟเฟอเรนเชียล dz', การจัดรูป ∫ cos ψ dψ และแทนขอบเขตล่าง-บนครบทุกบรรทัด"
  },

  // ── บทที่ 6 ──
  {
    title: "บทที่ 6: ฟลักซ์ไฟฟ้าและความหนาแน่นฟลักซ์ D (Electric Flux Density)",
    category: "บทเรียน",
    url: "06-electric-flux-density/index.html",
    keywords: ["ฟลักซ์", "flux", "d", "psi", "faraday", "ฟาราเดย์", "ทรงกลมซ้อน", "d = epsilon e", "d3.1", "d3.2"],
    snippet: "การทดลองทรงกลมตัวนำซ้อนของฟาราเดย์, ฟลักซ์รวม Ψ = <em>Q</em><sub>enc</sub>, ความสัมพันธ์ D = ε₀ E ในอวกาศว่างและ D = ε E ในตัวกลาง"
  },
  {
    title: "การทดลองทรงกลมตัวนำซ้อนของฟาราเดย์ (Faraday's Concentric Spheres Experiment)",
    category: "บทเรียน",
    url: "06-electric-flux-density/index.html#sec1",
    keywords: ["ฟาราเดย์", "faraday", "concentric spheres", "ทรงกลมซ้อน", "ประจุเหนี่ยวนำ -q", "ฉนวนไดอิเล็กทริก"],
    snippet: "การทดลอง 5 ขั้นตอนของไมเคิล ฟาราเดย์ ค.ศ. 1837 ที่พิสูจน์ว่าประจุเหนี่ยวนำบนผิวด้านในของทรงกลมนอกเท่ากับ -Q เสมอ"
  },

  // ── บทที่ 7 ──
  {
    title: "บทที่ 7: กฎของเกาส์และผิวสมมาตร (Gauss's Law & Symmetrical Surfaces)",
    category: "บทเรียน",
    url: "07-gauss-law/index.html",
    keywords: ["เกาส์", "gauss", "กฎของเกาส์", "gaussian surface", "ผิวเกาส์เซียน", "∮ d • ds = q_enc", "สายโคแอกเชียล", "d3.3", "d3.4"],
    snippet: "สมการอินทิกรัล ∮ D • ds = <em>Q</em><sub>enc</sub> และการประยุกต์ผิวเกาส์เซียนสมมาตร 3 รูปแบบ (ทรงกลม, ทรงกระบอก, แผ่นระนาบ)"
  },
  {
    title: "เงื่อนไขการเลือกผิวเกาส์เซียนสมมาตร (Gaussian Surface Selection Rules)",
    category: "บทเรียน",
    url: "07-gauss-law/index.html#sec3",
    keywords: ["ผิวเกาส์เซียน", "gaussian surface", "เงื่อนไขความสมมาตร", "d ขนาน ds", "d ตั้งฉาก ds", "d_n ds"],
    snippet: "หลักเกณฑ์ 2 ข้อ: ขนาด |D| คงที่บนผิว และ D ตั้งฉากกับผิว (เกิดฟลักซ์เต็มที่) หรือขนานกับผิว (ฟลักซ์เป็นศูนย์)"
  },

  // ── บทที่ 8 ──
  {
    title: "บทที่ 8: ไดเวอร์เจนซ์และทฤษฎีบทไดเวอร์เจนซ์ (Divergence & Divergence Theorem)",
    category: "บทเรียน",
    url: "08-divergence-theorem/index.html",
    keywords: ["ไดเวอร์เจนซ์", "divergence", "del dot", "nabla", "maxwell", "สมการแมกซ์เวลล์", "rho_v", "divergence theorem", "d3.5", "d3.6", "d3.7"],
    snippet: "สมการแมกซ์เวลล์ข้อที่ 1 ∇ • D = <em>ρ</em><sub>v</sub>, สูตรไดเวอร์เจนซ์ใน 3 ระบบพิกัด และทฤษฎีบทไดเวอร์เจนซ์ ∮ D • ds = ∫ (∇ • D) dv"
  },
  {
    title: "การพิสูจน์ไดเวอร์เจนซ์บนกล่องส่วนย่อย 6 ด้านด้วยอนุกรมเทย์เลอร์",
    category: "บทเรียน",
    url: "08-divergence-theorem/index.html#sec2",
    keywords: ["พิสูจน์ไดเวอร์เจนซ์", "taylor series", "อนุกรมเทย์เลอร์", "กล่องส่วนย่อย", "delta v", "maxwell 1st"],
    snippet: "การกระจายอนุกรมเทย์เลอร์เชิงเส้นบนผิวหน้า-หลัง ซ้าย-ขวา บน-ล่าง รวมฟลักซ์ได้ (∂Dx/∂x + ∂Dy/∂y + ∂Dz/∂z) Δv = Q"
  },

  // ── บทที่ 9 ──
  {
    title: "บทที่ 9: ศักย์ไฟฟ้า เกรเดียนต์ และพลังงาน (Electric Potential) — ข้อสอบข้อ 4 (25 คะแนน)",
    category: "บทเรียน",
    url: "09-electric-potential/index.html",
    keywords: ["ศักย์ไฟฟ้า", "potential", "v_ab", "งาน", "work", "gradient", "เกรเดียนต์", "e = -grad v", "ข้อสอบ 4", "ข้อ 4", "exam 4", "d4.1", "d4.2"],
    snippet: "งานและความต่างศักย์ <em>V</em><sub>AB</sub> = -∫ E • dl, เกรเดียนต์ E = -∇V, พลังงานไฟฟ้าสถิต และเฉลยข้อสอบกลางภาคข้อ 4"
  },
  {
    title: "เฉลยข้อสอบกลางภาคฉบับจริง ข้อที่ 4: ความต่างศักย์และอุปมาพลังงาน (25 คะแนน)",
    category: "ข้อสอบ",
    url: "09-electric-potential/index.html#sec8",
    keywords: ["ข้อสอบ 4", "ข้อ 4.1", "ข้อ 4.2", "ข้อ 4.3", "v_ab อินทิเกรต", "d = r/(r^2+a^2)^2", "อุปมาฟิสิกส์", "เข็นลูกบอลขึ้นเนิน"],
    snippet: "เฉลยข้อสอบข้อ 4 ละเอียดทุกบรรทัด: อินทิเกรต u = r² + a², วิเคราะห์เครื่องหมายบวก <em>V</em><sub>AB</sub> เมื่อ rA < rB และอุปมาการเข็นลูกบอลขึ้นเนิน"
  },

  // ── ใบสูตรและจำลองสอบ ──
  {
    title: "ใบสูตรสำหรับสอบกลางภาค (Midterm Formula Sheet 4 หน้าเต็ม)",
    category: "ใบสูตร",
    url: "formula-sheet/index.html",
    keywords: ["สูตร", "formula", "สูตรมิดเทอม", "ใบสูตร", "matrix", "เมทริกซ์", "เกรเดียนต์", "ไดเวอร์เจนซ์", "dl", "ds", "dv", "pdf"],
    snippet: "รวบรวมสูตรทางการ 4 หน้าเต็มจากเอกสารสูตรมิดเทอม ค้นหาด่วน คัดลอก และสั่งพิมพ์ A4"
  },
  {
    title: "ระบบจำลองการสอบกลางภาคเสมือนจริง (Midterm Exam Simulator 3 ชั่วโมง)",
    category: "ข้อสอบ",
    url: "exam-simulator/midterm/index.html",
    keywords: ["จำลองสอบ", "exam simulator", "ข้อสอบเก่า", "จับเวลา", "3 ชั่วโมง", "rubric", "เกณฑ์การตรวจ", "สุ่มตัวเลข"],
    snippet: "จำลองการสอบ 4 ข้อใหญ่ 100 คะแนน (น้ำหนัก 45%) พร้อมตัวจับเวลา 3 ชม. และ Checklist ตรวจตามเกณฑ์จริง"
  }
];
// BEGIN MASTERCLASS INDEX
window.EMF_SEARCH_INDEX = window.EMF_SEARCH_INDEX.filter(entry => !entry.url.includes("exam-simulator/"));
window.EMF_SEARCH_INDEX.push(...[{"title": "Set 1: พีชคณิตเวกเตอร์", "category": "เส้นทางความรู้", "url": "01-vector-algebra/index.html#masterclass", "keywords": ["เวกเตอร์คือขนาดพร้อมทิศ", "ฐานตั้งฉาก", "การฉายและผลคูณไขว้", "แผนผัง", "roadmap"], "snippet": "จะบอกแรงหรือสนามให้ครบได้อย่างไร เมื่อขนาดอย่างเดียวบอกไม่ได้ว่ามันชี้ไปไหน?"}, {"title": "Set 2: พิกัดทรงกระบอก", "category": "เส้นทางความรู้", "url": "02-cylindrical-coordinates/index.html#masterclass", "keywords": ["ฐานทรงกระบอกหมุนตามตำแหน่ง", "ตัวประกอบสเกล ρ", "ความยาวและพื้นที่ส่วนย่อย", "แผนผัง", "roadmap"], "snippet": "ลวดบนแกน z มีสมมาตรรอบแกน เหตุใดพิกัดฉากจึงทำให้สนามที่เรียบง่ายดูซับซ้อน?"}, {"title": "Set 3: พิกัดทรงกลม", "category": "เส้นทางความรู้", "url": "03-spherical-coordinates/index.html#masterclass", "keywords": ["มุม θ จากแกน z", "ฐานทรงกลมตามตำแหน่ง", "มุมตันและพื้นที่ผิว", "แผนผัง", "roadmap"], "snippet": "เมื่อแหล่งกำเนิดเป็นจุด สนามแผ่ออกทุกทิศอย่างไรโดยไม่ต้องคำนวณสามแกนแยกกัน?"}, {"title": "Set 4: กฎคูลอมบ์", "category": "เส้นทางความรู้", "url": "04-coulombs-law/index.html#masterclass", "keywords": ["แรงระหว่างประจุ", "เวกเตอร์จากแหล่งไปผู้รับ", "การซ้อนทับ", "แผนผัง", "roadmap"], "snippet": "ประจุหลายตัวผลักหรือดึงประจุเป้าหมายไปทิศใด และจะวางประจุเพิ่มให้แรงหายไปได้อย่างไร?"}, {"title": "Set 5: ความเข้มสนามไฟฟ้า", "category": "เส้นทางความรู้", "url": "05-electric-field-intensity/index.html#masterclass", "keywords": ["สนามคือแรงต่อประจุทดสอบ", "แหล่งประจุต่อเนื่อง", "สมมาตรกับอินทิกรัล", "แผนผัง", "roadmap"], "snippet": "จะอธิบายอิทธิพลของแหล่งประจุโดยไม่ต้องกำหนดประจุทดสอบทุกครั้งได้อย่างไร?"}, {"title": "Set 6: ความหนาแน่นฟลักซ์ไฟฟ้า", "category": "เส้นทางความรู้", "url": "06-electric-flux-density/index.html#masterclass", "keywords": ["ฟลักซ์นับการทะลุผิว", "เวกเตอร์พื้นที่ตั้งฉาก", "D = εE", "แผนผัง", "roadmap"], "snippet": "จะนับอิทธิพลของประจุที่ทะลุพื้นที่หนึ่งได้อย่างไร โดยไม่สับสนกับสนามที่เฉียดผ่าน?"}, {"title": "Set 7: กฎของเกาส์", "category": "เส้นทางความรู้", "url": "07-gauss-law/index.html#masterclass", "keywords": ["ผิวปิดกับประจุรวม", "เลือกผิวด้วยสมมาตร", "แยกฟลักซ์จากค่าสนาม", "แผนผัง", "roadmap"], "snippet": "เมื่อรูปร่างแหล่งสมมาตร จะหาสนามได้โดยไม่รวมลูกศรจากทุกชิ้นแหล่งได้อย่างไร?"}, {"title": "Set 8: ไดเวอร์เจนซ์", "category": "เส้นทางความรู้", "url": "08-divergence-theorem/index.html#masterclass", "keywords": ["ไดเวอร์เจนซ์คือการไหลออกสุทธิต่อปริมาตร", "กฎเกาส์รูปจุด", "ทฤษฎีบทไดเวอร์เจนซ์", "แผนผัง", "roadmap"], "snippet": "กฎที่กล่าวถึงผิวปิดขนาดใหญ่จะบอกแหล่งประจุ ณ จุดเล็ก ๆ ได้อย่างไร?"}, {"title": "Set 9: ศักย์ไฟฟ้า", "category": "เส้นทางความรู้", "url": "09-electric-potential/index.html#masterclass", "keywords": ["งานภายนอกต่อประจุ", "ศักย์คือสเกลาร์", "E = −∇V และจุดอ้างอิง", "แผนผัง", "roadmap"], "snippet": "จะสรุปสนามเวกเตอร์ให้เป็นแผนที่พลังงานเพียงตัวเลขเดียวได้อย่างไร?"}, {"title": "Set 10: กระแสไฟฟ้า ความหนาแน่นกระแส และตัวนำ", "category": "เส้นทางความรู้", "url": "10-current-and-conductors/index.html#masterclass", "keywords": ["กระแสคืออัตราประจุผ่านผิว", "J = ρv v และ J = σE", "ความต่อเนื่องและประจุสะสม", "แผนผัง", "roadmap"], "snippet": "สนามไฟฟ้าทำให้ประจุเคลื่อนอย่างไร และจะตรวจได้อย่างไรว่าประจุไม่ได้หายไปจากระบบ?"}, {"title": "Set 11: ธรรมชาติของไดอิเล็กทริก", "category": "เส้นทางความรู้", "url": "11-dielectrics/index.html#masterclass", "keywords": ["ประจุอิสระกับประจุผูกมัด", "โพลาไรเซชัน", "ตัวนำสมดุลกับไดอิเล็กทริก", "แผนผัง", "roadmap"], "snippet": "ทำไมใส่ฉนวนระหว่างแผ่นตัวนำแล้วสนามและความจุเปลี่ยน ทั้งที่ฉนวนไม่มีกระแสผ่านตามปกติ?"}, {"title": "Set 12: เงื่อนไขขอบเขตสนามไฟฟ้า", "category": "เส้นทางความรู้", "url": "12-boundary-conditions/index.html#masterclass", "keywords": ["ส่วนสัมผัสของ E ต่อเนื่อง", "ส่วนปกติของ D มีการกระโดดตามประจุผิว", "การหักเหของสนาม", "แผนผัง", "roadmap"], "snippet": "สนามเปลี่ยนทิศและขนาดเมื่อผ่านรอยต่อได้อย่างไรโดยไม่ละเมิดกฎสนาม?"}, {"title": "Set 13: ความจุไฟฟ้าและพลังงานสะสม", "category": "เส้นทางความรู้", "url": "13-capacitance/index.html#masterclass", "keywords": ["C คือ Q ต่อความต่างศักย์", "เรขาคณิตกับตัวกลาง", "พลังงานในสนาม", "แผนผัง", "roadmap"], "snippet": "ตัวนำคู่หนึ่งเก็บประจุได้มากเท่าใดต่อแรงดัน และพลังงานที่ใส่เข้าไปอยู่ที่ใด?"}, {"title": "Set 14: สมการปัวซงและลาปลาส", "category": "เส้นทางความรู้", "url": "14-poisson-laplace/index.html#masterclass", "keywords": ["ปัวซงจากเกาส์และศักย์", "ลาปลาสในบริเวณไร้ประจุ", "เงื่อนไขขอบเขตกำหนดค่าคงตัว", "แผนผัง", "roadmap"], "snippet": "ถ้ารู้แรงดันบนตัวนำแต่ไม่รู้ประจุบนผิว จะหาสนามภายในช่องว่างอย่างไร?"}, {"title": "Set 15: สนามแม่เหล็กสถิตและกฎบิโอต์–ซาวารต์", "category": "เส้นทางความรู้", "url": "15-steady-magnetic-field/index.html#masterclass", "keywords": ["กระแสสร้างสนามวน", "บิโอต์–ซาวารต์", "อินทิเกรตเวกเตอร์จากแหล่ง", "แผนผัง", "roadmap"], "snippet": "ประจุเคลื่อนที่สร้างสนามชนิดใด และทำไมลูกศรสนามรอบลวดจึงไม่ชี้ออกเหมือนสนามประจุ?"}, {"title": "Set 16: กฎวงรอบของแอมแปร์", "category": "เส้นทางความรู้", "url": "16-amperes-law/index.html#masterclass", "keywords": ["การวนสนามกับกระแสที่ล้อม", "เลือกวงด้วยสมมาตร", "ความสัมพันธ์ทิศวงกับปกติ", "แผนผัง", "roadmap"], "snippet": "ถ้ารู้ว่ากระแสและรูปร่างมีสมมาตร จะหาสนามวนโดยไม่อินทิเกรตทุกชิ้นลวดได้อย่างไร?"}, {"title": "Set 17: เคิร์ลและทฤษฎีบทสโตกส์", "category": "เส้นทางความรู้", "url": "17-curl-stokes/index.html#masterclass", "keywords": ["เคิร์ลคือการวนต่อพื้นที่", "ดีเทอร์มิแนนต์ทั่วไป", "สโตกส์เชื่อมวงกับผิว", "แผนผัง", "roadmap"], "snippet": "การวนของสนามรอบวงเล็กจะให้ความหนาแน่นกระแส ณ จุดได้อย่างไร?"}, {"title": "Set 18: ฟลักซ์แม่เหล็กและศักย์เวกเตอร์", "category": "เส้นทางความรู้", "url": "18-magnetic-flux/index.html#masterclass", "keywords": ["B = μH", "ไม่มีโมโนโพลแม่เหล็ก", "ศักย์เวกเตอร์ A", "แผนผัง", "roadmap"], "snippet": "สนามแม่เหล็กมีแหล่งต้นและปลายเหมือนประจุไฟฟ้าหรือไม่ และจะนิยามฟลักซ์ที่เกี่ยวกับแรงได้อย่างไร?"}, {"title": "Set 19: สมการแมกซ์เวลล์สำหรับสนามสถิต", "category": "เส้นทางความรู้", "url": "19-maxwell-static/index.html#masterclass", "keywords": ["กฎแหล่งและกฎวนสี่สมการ", "สมการรูปจุดและอินทิกรัล", "สนามสถิต", "แผนผัง", "roadmap"], "snippet": "กฎหลายบทเป็นส่วนหนึ่งของระบบเดียวกันอย่างไร และจะเลือกกฎใดตามชนิดแหล่ง?"}, {"title": "Set 20: สนามแปรตามเวลา กฎฟาราเดย์ และเลนซ์", "category": "เส้นทางความรู้", "url": "20-faradays-law/index.html#masterclass", "keywords": ["ฟลักซ์เปลี่ยนสร้างแรงเคลื่อนไฟฟ้า", "เลนซ์กำหนดเครื่องหมาย", "การเคลื่อนวงกับการเปลี่ยนสนาม", "แผนผัง", "roadmap"], "snippet": "เหตุใดสนามแม่เหล็กที่เปลี่ยนจึงสร้างแรงดันได้ แม้ไม่มีประจุที่เป็นแหล่งคูลอมบ์?"}, {"title": "Set 21: กระแสการกระจัดและสมการแมกซ์เวลล์เต็มรูป", "category": "เส้นทางความรู้", "url": "21-displacement-current/index.html#masterclass", "keywords": ["กระแสการกระจัดไม่ใช่ประจุไหลผ่านฉนวน", "แอมแปร์–แมกซ์เวลล์", "ความต่อเนื่อง", "แผนผัง", "roadmap"], "snippet": "ถ้ากระแสไหลเข้าตัวเก็บประจุแต่ไม่มีประจุข้ามช่องว่าง เหตุใดสนามแม่เหล็กต้องไม่ขึ้นกับผิวที่เลือก?"}, {"title": "Set 22: ฮาร์มอนิกเวลาและคลื่นระนาบสม่ำเสมอ", "category": "เส้นทางความรู้", "url": "22-maxwell-time-harmonic/index.html#masterclass", "keywords": ["เฟสเซอร์ภายใต้ eʲωᵗ", "คลื่นเดินทาง", "ทิศ E×H และอิมพีแดนซ์", "แผนผัง", "roadmap"], "snippet": "สมการที่ E กับ H สร้างกันตามเวลาทำให้เกิดคลื่นเดินทางได้อย่างไร และจะอ่านทิศทางจากเฟสได้อย่างไร?"}, {"title": "MID-Q01 · ฐานทรงกลมและการแปลงเวกเตอร์", "category": "ข้อสอบกลางภาค", "url": "exam-simulator/midterm/index.html#problem-mid-q01", "keywords": ["MID-Q01", "mid-q01", "Hayt", "Sadiku"], "snippet": "ข้อสอบเก่าต้นฉบับ · ปีการศึกษา 2563"}, {"title": "MID-Q02 · แรงคูลอมบ์และประจุที่ทำให้สมดุล", "category": "ข้อสอบกลางภาค", "url": "exam-simulator/midterm/index.html#problem-mid-q02", "keywords": ["MID-Q02", "mid-q02", "Hayt", "Sadiku"], "snippet": "ข้อสอบเก่าต้นฉบับ · ปีการศึกษา 2563"}, {"title": "MID-Q03 · ลวดประจุจำกัดและปริพันธ์ด้วยมือ", "category": "ข้อสอบกลางภาค", "url": "exam-simulator/midterm/index.html#problem-mid-q03", "keywords": ["MID-Q03", "mid-q03", "Hayt", "Sadiku"], "snippet": "ข้อสอบเก่าต้นฉบับ · ปีการศึกษา 2563"}, {"title": "MID-Q04 · ศักย์จาก D รัศมีและงานภายนอก", "category": "ข้อสอบกลางภาค", "url": "exam-simulator/midterm/index.html#problem-mid-q04", "keywords": ["MID-Q04", "mid-q04", "Hayt", "Sadiku"], "snippet": "ข้อสอบเก่าต้นฉบับ · ปีการศึกษา 2563"}, {"title": "Hayt 1.2: เวกเตอร์หน่วย", "category": "ข้อสอบกลางภาค", "url": "exam-simulator/midterm/index.html#problem-hayt-eoc-1-2", "keywords": ["", "hayt-eoc-1-2", "Hayt", "Sadiku"], "snippet": "แบบฝึกหัด Hayt 9th · เรียบเรียงไทย"}, {"title": "Hayt 2.2: แรงคู่ประจุ", "category": "ข้อสอบกลางภาค", "url": "exam-simulator/midterm/index.html#problem-hayt-eoc-2-2", "keywords": ["", "hayt-eoc-2-2", "Hayt", "Sadiku"], "snippet": "แบบฝึกหัด Hayt 9th · เรียบเรียงไทย"}, {"title": "Hayt 3.2: ฟลักซ์สุทธิของกล่อง", "category": "ข้อสอบกลางภาค", "url": "exam-simulator/midterm/index.html#problem-hayt-eoc-3-2", "keywords": ["", "hayt-eoc-3-2", "Hayt", "Sadiku"], "snippet": "แบบฝึกหัด Hayt 9th · เรียบเรียงไทย"}, {"title": "Hayt 4.1: งานในสนามสม่ำเสมอ", "category": "ข้อสอบกลางภาค", "url": "exam-simulator/midterm/index.html#problem-hayt-eoc-4-1", "keywords": ["", "hayt-eoc-4-1", "Hayt", "Sadiku"], "snippet": "แบบฝึกหัด Hayt 9th · เรียบเรียงไทย"}, {"title": "Drill D1.6(a): การฉายฐานทรงกระบอก", "category": "ข้อสอบกลางภาค", "url": "exam-simulator/midterm/index.html#problem-hayt-d1-6", "keywords": ["", "hayt-d1-6", "Hayt", "Sadiku"], "snippet": "แบบฝึกหัด Hayt 9th · เรียบเรียงไทย"}, {"title": "Drill D2.1: แรงบน QA", "category": "ข้อสอบกลางภาค", "url": "exam-simulator/midterm/index.html#problem-hayt-d2-1", "keywords": ["", "hayt-d2-1", "Hayt", "Sadiku"], "snippet": "แบบฝึกหัด Hayt 9th · เรียบเรียงไทย"}, {"title": "Drill D3.1(a): ฟลักซ์ทรงกลมหนึ่งส่วนแปด", "category": "ข้อสอบกลางภาค", "url": "exam-simulator/midterm/index.html#problem-hayt-d3-1", "keywords": ["", "hayt-d3-1", "Hayt", "Sadiku"], "snippet": "แบบฝึกหัด Hayt 9th · เรียบเรียงไทย"}, {"title": "ALL-Q01 · ประจุที่ลดลงกับกระแสพารัศมี", "category": "ข้อสอบปลายภาค", "url": "exam-simulator/final/index.html#problem-continuity", "keywords": ["ALL-Q01", "continuity", "Hayt", "Sadiku"], "snippet": "ALL-Q01 · ตัวอย่างต่อเนื่อง · เรียบเรียงจากไฟล์จริง"}, {"title": "ALL-Q02 · รอยต่อเทฟลอนกับอวกาศว่าง", "category": "ข้อสอบปลายภาค", "url": "exam-simulator/final/index.html#problem-boundary", "keywords": ["ALL-Q02", "boundary", "Hayt", "Sadiku"], "snippet": "ALL-Q02 · ตัวอย่างขอบเขต · เรียบเรียงจากไฟล์จริง"}, {"title": "ALL-Q03 · แผ่นขนาน: จากลาปลาสถึงความจุ", "category": "ข้อสอบปลายภาค", "url": "exam-simulator/final/index.html#problem-laplace", "keywords": ["ALL-Q03", "laplace", "Hayt", "Sadiku"], "snippet": "ALL-Q03 · ลาปลาสแผ่นขนาน · เรียบเรียงจากไฟล์จริง"}, {"title": "ALL-Q04 · พิสูจน์สนามลวดอนันต์ด้วยบิโอต์–ซาวารต์", "category": "ข้อสอบปลายภาค", "url": "exam-simulator/final/index.html#problem-wire", "keywords": ["ALL-Q04", "wire", "Hayt", "Sadiku"], "snippet": "ALL-Q04 · บิโอต์–ซาวารต์ · เรียบเรียงจากไฟล์จริง"}, {"title": "ALL-Q05 · กระแสที่ล้อมจากสนามทรงกระบอก", "category": "ข้อสอบปลายภาค", "url": "exam-simulator/final/index.html#problem-ampere", "keywords": ["ALL-Q05", "ampere", "Hayt", "Sadiku"], "snippet": "ALL-Q05 · ตั้งวงแอมแปร์ · เรียบเรียงจากไฟล์จริง"}, {"title": "ALL-Q06 · อินทิเกรตต่อจาก ALL-Q05", "category": "ข้อสอบปลายภาค", "url": "exam-simulator/final/index.html#problem-ampere-continuation", "keywords": ["ALL-Q06", "ampere-continuation", "Hayt", "Sadiku"], "snippet": "ALL-Q06 · หน้าต่อเนื่อง ALL-Q05 · เรียบเรียงจากไฟล์จริง"}, {"title": "ALL-Q07 · หา J จากเคิร์ล H ในพิกัดฉาก", "category": "ข้อสอบปลายภาค", "url": "exam-simulator/final/index.html#problem-curl", "keywords": ["ALL-Q07", "curl", "Hayt", "Sadiku"], "snippet": "ALL-Q07 · เคิร์ล ณ จุด · เรียบเรียงจากไฟล์จริง"}, {"title": "ALL-Q08 · สัมประสิทธิ์ E ตามไฟล์ข้อสอบจริง", "category": "ข้อสอบปลายภาค", "url": "exam-simulator/final/index.html#problem-raw-faraday", "keywords": ["ALL-Q08", "raw-faraday", "Hayt", "Sadiku"], "snippet": "ALL-Q08 · E สัมประสิทธิ์ 20 · เรียบเรียงจากไฟล์จริง"}, {"title": "ALL-Q09 · กระแสลวดเท่ากระแสในช่องตัวเก็บประจุ", "category": "ข้อสอบปลายภาค", "url": "exam-simulator/final/index.html#problem-displacement", "keywords": ["ALL-Q09", "displacement", "Hayt", "Sadiku"], "snippet": "ALL-Q09 · ตัวเก็บประจุ · เรียบเรียงจากไฟล์จริง"}, {"title": "ALL-Q10 · ตรวจข้อขัดแย้งในข้อมูลต้นฉบับ", "category": "ข้อสอบปลายภาค", "url": "exam-simulator/final/index.html#problem-raw-consistency", "keywords": ["ALL-Q10", "raw-consistency", "Hayt", "Sadiku"], "snippet": "ALL-Q10 · ตรวจข้อมูล μ ขัดแย้ง · เรียบเรียงจากไฟล์จริง"}, {"title": "ALL-Q11 · คลื่นระนาบ: หา H ด้วยแมกซ์เวลล์", "category": "ข้อสอบปลายภาค", "url": "exam-simulator/final/index.html#problem-wave", "keywords": ["ALL-Q11", "wave", "Hayt", "Sadiku"], "snippet": "ALL-Q11 · คลื่นเชิงตัวเลข · เรียบเรียงจากไฟล์จริง"}, {"title": "ALL-Q12 · จากสนามทันทีสู่เฟสเซอร์", "category": "ข้อสอบปลายภาค", "url": "exam-simulator/final/index.html#problem-raw-phasor", "keywords": ["ALL-Q12", "raw-phasor", "Hayt", "Sadiku"], "snippet": "ALL-Q12 · แปลงเฟสเซอร์ · เรียบเรียงจากไฟล์จริง"}, {"title": "สนามแม่เหล็กจาก E ที่เปลี่ยนตามเวลา", "category": "ข้อสอบปลายภาค", "url": "exam-simulator/final/index.html#problem-faraday", "keywords": ["", "faraday", "Hayt", "Sadiku"], "snippet": "ตัวอย่างสไลด์ Set 20 · สัมประสิทธิ์ 2 ต่างจาก ALL-Q08 ที่เป็น 20"}, {"title": "ตรวจแมกซ์เวลล์และค่าคงตัว k", "category": "ข้อสอบปลายภาค", "url": "exam-simulator/final/index.html#problem-consistency", "keywords": ["", "consistency", "Hayt", "Sadiku"], "snippet": "ฉบับแก้เลขชี้กำลัง μ ตาม Hayt D9.4 · ต่างจากต้นฉบับ ALL-Q10"}, {"title": "Drill D5.1: กระแสผ่านผิวทรงกระบอก", "category": "ข้อสอบปลายภาค", "url": "exam-simulator/final/index.html#problem-hayt-current", "keywords": ["", "hayt-current", "Hayt", "Sadiku"], "snippet": "Drill ตำรา: คงค่าตามต้นฉบับ"}, {"title": "Drill D5.10: ฟลักซ์รอยต่อ", "category": "ข้อสอบปลายภาค", "url": "exam-simulator/final/index.html#problem-hayt-boundary", "keywords": ["", "hayt-boundary", "Hayt", "Sadiku"], "snippet": "Drill ตำรา: เลือกส่วนที่อยู่ในขอบเขต"}, {"title": "Drill D6.5(b): ศักย์กับความหนาแน่นประจุ", "category": "ข้อสอบปลายภาค", "url": "exam-simulator/final/index.html#problem-hayt-poisson", "keywords": ["", "hayt-poisson", "Hayt", "Sadiku"], "snippet": "Drill ตำรา: คงค่าตามต้นฉบับ"}, {"title": "Drill D7.6: ตรวจสโตกส์ทั้งสองด้าน", "category": "ข้อสอบปลายภาค", "url": "exam-simulator/final/index.html#problem-hayt-stokes", "keywords": ["", "hayt-stokes", "Hayt", "Sadiku"], "snippet": "Drill ตำรา: คงค่าตามต้นฉบับ"}, {"title": "Drill D9.3(c): แอมพลิจูดกระแสการกระจัด", "category": "ข้อสอบปลายภาค", "url": "exam-simulator/final/index.html#problem-hayt-displacement", "keywords": ["", "hayt-displacement", "Hayt", "Sadiku"], "snippet": "Drill ตำรา: เลือกส่วนที่อยู่ในขอบเขต"}, {"title": "Drill D6.1(a): สภาพยอมจากพลังงาน", "category": "ข้อสอบปลายภาค", "url": "exam-simulator/final/index.html#problem-hayt-energy", "keywords": ["", "hayt-energy", "Hayt", "Sadiku"], "snippet": "Drill ตำรา: คงค่าตามต้นฉบับ"}, {"title": "Drill D9.1: สนาม E และฟลักซ์จาก B", "category": "ข้อสอบปลายภาค", "url": "exam-simulator/final/index.html#problem-hayt-faraday", "keywords": ["", "hayt-faraday", "Hayt", "Sadiku"], "snippet": "Drill ตำรา: คงค่าตามต้นฉบับ"}, {"title": "อ่านเสริม D8.8: ขอบเขตที่มีกระแสผิว", "category": "ข้อสอบปลายภาค", "url": "exam-simulator/final/index.html#problem-hayt-magnetic-boundary", "keywords": ["", "hayt-magnetic-boundary", "Hayt", "Sadiku"], "snippet": "อ่านเสริม: ไม่สุ่มเป็นข้อสอบ"}, {"title": "อ่านต่อยอด D10.1: สายส่งสูญเสียต่ำ", "category": "ข้อสอบปลายภาค", "url": "exam-simulator/final/index.html#problem-hayt-transmission", "keywords": ["", "hayt-transmission", "Hayt", "Sadiku"], "snippet": "เรียบเรียงจากตัวอย่างที่สอน"}, {"title": "ใบสูตรปลายภาค · 9 หน้า", "category": "สูตร", "url": "formula-sheet-final/index.html", "keywords": ["Maxwell", "ไฟนอล", "สูตร"], "snippet": "ค้นหาสูตรและเทียบภาพต้นฉบับ"}, {"title": "ห้องสอบกลางภาคและปลายภาค", "category": "ข้อสอบ", "url": "exam-simulator/index.html", "keywords": ["สอบ", "midterm", "final"], "snippet": "เลือกช่วงเรียนและชุดข้อสอบ"}]);
// END MASTERCLASS INDEX
