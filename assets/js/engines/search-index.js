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
    snippet: "ตัวแปร (ρ, ϕ, z), ผิวตัดกัน 3 ผิว, เวกเตอร์ฐาน (a_ρ, a_ϕ, a_z), ส่วนย่อย dv = ρ dρ dϕ dz, การแปลงจุดและสนามเวกเตอร์"
  },
  {
    title: "ตารางผลคูณจุด Table 1.1 และเมทริกซ์การแปลงเวกเตอร์ [A_rc]",
    category: "บทเรียน",
    url: "02-cylindrical-coordinates/index.html#sec6",
    keywords: ["เมทริกซ์", "matrix", "table 1.1", "a_rc", "a_cr", "แปลงเวกเตอร์", "cos phi", "sin phi", "dot product table"],
    snippet: "เมทริกซ์แปลงระหว่าง Cartesian และ Cylindrical: A_ρ = Ax cos ϕ + Ay sin ϕ, A_ϕ = -Ax sin ϕ + Ay cos ϕ"
  },

  // ── บทที่ 3 ──
  {
    title: "บทที่ 3: ระบบพิกัดทรงกลม (Spherical Coordinates) — ข้อสอบข้อ 1 (25 คะแนน)",
    category: "บทเรียน",
    url: "03-spherical-coordinates/index.html",
    keywords: ["ทรงกลม", "spherical", "r", "theta", "phi", "ข้อสอบ 1", "ข้อ 1", "exam 1", "เมทริกซ์ทรงกลม", "a_rs", "ข้อจำกัดเวกเตอร์หน่วย", "table 1.2", "d1.7", "d1.8"],
    snippet: "ตัวแปร (r, θ, ϕ), ผิวตัดกัน 3 ผิว, เวกเตอร์ฐาน (a_r, a_θ, a_ϕ), ส่วนย่อย dv = r² sin θ dr dθ dϕ, ตาราง Table 1.2 และเฉลยข้อสอบข้อ 1"
  },
  {
    title: "ตารางผลคูณจุด Table 1.2 และเมทริกซ์แปลงพิกัดทรงกลม [A_rs]",
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
    snippet: "คำอธิบายเหตุผลทางเรขาคณิตว่าเหตุใด a_r, a_θ, a_ϕ จึงเปลี่ยนทิศตามมุม θ และ ϕ พร้อมภาพประกอบและข้อสรุปห้ามบวกตรงๆ"
  },

  // ── บทที่ 4 ──
  {
    title: "บทที่ 4: กฎของคูลอมบ์และแรงระหว่างประจุ (Coulomb's Law) — ข้อสอบข้อ 2 (20 คะแนน)",
    category: "บทเรียน",
    url: "04-coulombs-law/index.html",
    keywords: ["คูลอมบ์", "coulomb", "แรง", "force", "f_net = 0", "สมดุลแรง", "ข้อสอบ 2", "ข้อ 2", "exam 2", "จุดประจุ", "d2.1", "superposition"],
    snippet: "กฎของคูลอมบ์ในรูปเวกเตอร์ F = k (Q1 Q2 / R²) a_R, หลักการซ้อนทับ (Superposition), จุดสะเทิน และเฉลยข้อสอบจริง ข้อ 2"
  },
  {
    title: "เฉลยข้อสอบกลางภาคฉบับจริง ข้อที่ 2: แรงลัพธ์และสมดุลแรง (20 คะแนน)",
    category: "ข้อสอบ",
    url: "04-coulombs-law/index.html#sec7",
    keywords: ["ข้อสอบ 2", "ข้อ 2.1", "ข้อ 2.2", "q1 = 3sqrt3", "q2 = 2", "q3 = 3", "แรงลัพธ์บน q2", "สมดุลแรง q4"],
    snippet: "ขั้นตอนคำนวณแรงลัพธ์บน Q2 อย่างละเอียดทุกตัวแปร และการหาขนาด/ตำแหน่งประจุเพื่อสร้างสภาวะสมดุลแรง F_net = 0"
  },

  // ── บทที่ 5 ──
  {
    title: "บทที่ 5: ความเข้มสนามไฟฟ้า E (Electric Field Intensity) — ข้อสอบข้อ 3 (30 คะแนน)",
    category: "บทเรียน",
    url: "05-electric-field-intensity/index.html",
    keywords: ["สนามไฟฟ้า", "electric field", "e", "ลวดประจุ", "line charge", "rho_l", "อินทิเกรตตรีโกณ", "tan psi", "ข้อสอบ 3", "ข้อ 3", "exam 3", "d2.2", "d2.3", "d2.4", "d2.5"],
    snippet: "นิยามสนามไฟฟ้า E = F/q_t, การกระจายตัวประจุ (ρ_l, ρ_s, ρ_v), อินทิเกรตลวดประจุจำกัดด้วยการแทนค่าตรีโกณมิติ และเฉลยข้อสอบข้อ 3"
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
    snippet: "การทดลองทรงกลมตัวนำซ้อนของฟาราเดย์, ฟลักซ์รวม Ψ = Q_enc, ความสัมพันธ์ D = ε₀ E ในอวกาศว่างและ D = ε E ในตัวกลาง"
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
    snippet: "สมการอินทิกรัล ∮ D • ds = Q_enc และการประยุกต์ผิวเกาส์เซียนสมมาตร 3 รูปแบบ (ทรงกลม, ทรงกระบอก, แผ่นระนาบ)"
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
    snippet: "สมการแมกซ์เวลล์ข้อที่ 1 ∇ • D = ρ_v, สูตรไดเวอร์เจนซ์ใน 3 ระบบพิกัด และทฤษฎีบทไดเวอร์เจนซ์ ∮ D • ds = ∫ (∇ • D) dv"
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
    snippet: "งานและความต่างศักย์ V_AB = -∫ E • dl, เกรเดียนต์ E = -∇V, พลังงานไฟฟ้าสถิต และเฉลยข้อสอบกลางภาคข้อ 4"
  },
  {
    title: "เฉลยข้อสอบกลางภาคฉบับจริง ข้อที่ 4: ความต่างศักย์และอุปมาพลังงาน (25 คะแนน)",
    category: "ข้อสอบ",
    url: "09-electric-potential/index.html#sec8",
    keywords: ["ข้อสอบ 4", "ข้อ 4.1", "ข้อ 4.2", "ข้อ 4.3", "v_ab อินทิเกรต", "d = r/(r^2+a^2)^2", "อุปมาฟิสิกส์", "เข็นลูกบอลขึ้นเนิน"],
    snippet: "เฉลยข้อสอบข้อ 4 ละเอียดทุกบรรทัด: อินทิเกรต u = r² + a², วิเคราะห์เครื่องหมายบวก V_AB เมื่อ rA < rB และอุปมาการเข็นลูกบอลขึ้นเนิน"
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
    url: "exam-simulator/index.html",
    keywords: ["จำลองสอบ", "exam simulator", "ข้อสอบเก่า", "จับเวลา", "3 ชั่วโมง", "rubric", "เกณฑ์การตรวจ", "สุ่มตัวเลข"],
    snippet: "จำลองการสอบ 4 ข้อใหญ่ 100 คะแนน (น้ำหนัก 45%) พร้อมตัวจับเวลา 3 ชม. และ Checklist ตรวจตามเกณฑ์จริง"
  }
];
