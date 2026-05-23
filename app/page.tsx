"use client"
import React, { useState, useEffect, useRef } from "react"

const PHONE = "+201009005579"
const WA = "https://wa.me/201009005579"
const WEB3_KEY = "50f2c493-44ae-415d-8942-1195ac718d26"
const TO_EMAIL = "apkzoz85@gmail.com"

const UNITS = [
  { type: "Beach Home — 1 غرفة", price: "11.7M", raw: "11,700,000 ج" },
  { type: "Beach Home — 2 غرفة", price: "14.7M", raw: "14,700,000 ج" },
  { type: "Beach Home — 3 غرف", price: "21.9M", raw: "21,900,000 ج" },
  { type: "Junior Chalet", price: "23.5M", raw: "23,500,000 ج" },
  { type: "Senior Chalet صغير", price: "27.5M", raw: "27,500,000 ج" },
  { type: "Senior Chalet كبير", price: "32.5M", raw: "32,500,000 ج" },
  { type: "Duo — توين هاوس", price: "44M", raw: "44,000,000 ج" },
]

const VILLAS = [
  { row: "الصف الأول", beds: "7 غرف", land: "1,300", bua: "1,150", floor: "طابق واحد" },
  { row: "الصف الثاني", beds: "6 غرف", land: "850", bua: "700", floor: "طابق واحد" },
  { row: "الصف الثالث", beds: "5 غرف", land: "750", bua: "700", floor: "طابقين" },
  { row: "الصف الرابع", beds: "—", land: "770", bua: "515", floor: "طابقين" },
]

/* ── Intersection Observer ── */
function useReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  const [v, setV] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const ob = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); ob.disconnect() } }, { threshold })
    ob.observe(el); return () => ob.disconnect()
  }, [threshold])
  return { ref, v }
}
function R({ children, d = 0, className = "" }: { children: React.ReactNode; d?: number; className?: string }) {
  const { ref, v } = useReveal()
  return <div ref={ref} className={className} style={{ opacity: v ? 1 : 0, transform: v ? "none" : "translateY(24px)", transition: `all .6s cubic-bezier(.16,1,.3,1) ${d}s` }}>{children}</div>
}

/* ── Lead Form ── */
function Form({ dark = false, label = "سجّل الآن" }: { dark?: boolean; label?: string }) {
  const [f, setF] = useState({ name: "", phone: "" })
  const [loading, setLoading] = useState(false)
  const [ok, setOk] = useState(false)
  const go = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true)
    try {
      const r = await fetch("https://api.web3forms.com/submit", {
        method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ access_key: WEB3_KEY, name: f.name, phone: f.phone, project: "Palm Hills Ras El Hekma", subject: "Lead — Palm Hills رأس الحكمة" }),
      })
      if (r.ok) setOk(true); else setLoading(false)
    } catch { setLoading(false) }
  }
  if (ok) return <div style={{ textAlign: "center", padding: "1.5rem 0" }}><div style={{ fontSize: "2rem", marginBottom: 6 }}>✅</div><p style={{ fontWeight: 700, color: dark ? "#fff" : "#111" }}>تم الإرسال!</p><p style={{ fontSize: ".75rem", color: dark ? "rgba(255,255,255,.35)" : "#999", marginTop: 4 }}>هنتواصل معاك خلال 24 ساعة</p></div>
  const bg = dark ? "rgba(255,255,255,.07)" : "rgba(0,0,0,.03)"
  const brd = dark ? "rgba(255,255,255,.1)" : "rgba(0,0,0,.08)"
  const col = dark ? "#fff" : "#111"
  const ph = dark ? "rgba(255,255,255,.25)" : "#aaa"
  return (
    <form onSubmit={go}>
      <style>{`.fi${dark ? "d" : "l"}::placeholder{color:${ph}}.fi${dark ? "d" : "l"}:focus{border-color:#8B1A1A!important}`}</style>
      {[{ p: "الاسم الكريم", k: "name", t: "text" }, { p: "رقم الهاتف", k: "phone", t: "tel" }].map(x => (
        <input key={x.k} className={`fi${dark ? "d" : "l"}`} type={x.t} placeholder={x.p} required
          value={(f as any)[x.k]} onChange={e => setF({ ...f, [x.k]: e.target.value })}
          style={{ width: "100%", padding: "14px 16px", marginBottom: 10, background: bg, border: `1px solid ${brd}`, borderRadius: 8, color: col, fontSize: ".85rem", outline: "none", fontFamily: "'Almarai',sans-serif", transition: "border .2s", direction: x.k === "phone" ? "ltr" : "rtl" }} />
      ))}
      <button type="submit" disabled={loading} style={{ width: "100%", padding: "15px", background: "#8B1A1A", color: "#fff", border: "none", borderRadius: 8, fontWeight: 700, fontSize: ".88rem", cursor: "pointer", fontFamily: "'Almarai',sans-serif", opacity: loading ? .7 : 1 }}>
        {loading ? "..." : label}
      </button>
    </form>
  )
}

/* ══════════ MAIN ══════════ */
export default function Page() {
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [tab, setTab] = useState<"units" | "villas">("units")

  useEffect(() => { setMounted(true); const fn = () => setScrolled(window.scrollY > 50); window.addEventListener("scroll", fn); return () => window.removeEventListener("scroll", fn) }, [])

  const scroll = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })

  return (
    <div dir="rtl">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Almarai:wght@300;400;700;800&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}html{scroll-behavior:smooth}
        body{background:#111;color:#fff;font-family:'Almarai',sans-serif;font-size:16px;direction:rtl}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:.5}}
        @keyframes slowZoom{0%{transform:scale(1)}100%{transform:scale(1.05)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        .fadeUp{animation:fadeUp .7s ease forwards}
        .gold{color:#C8A97E}

        @media(max-width:768px){
          .nav{padding:0 16px!important;height:54px!important}
          .desk-links{display:none!important}
          .hero-wrap{padding:0 20px 40px!important}
          .hero-wrap h1{font-size:2.5rem!important}
          .split{grid-template-columns:1fr!important}
          .split-pad{padding:36px 20px!important}
          .split-img{min-height:240px!important}
          .grid4{grid-template-columns:1fr 1fr!important}
          .grid3{grid-template-columns:1fr!important}
          .unit-row{flex-direction:column!important;gap:10px!important;align-items:stretch!important}
          .unit-cta{width:100%!important;justify-content:center!important}
          .footer-inner{flex-direction:column!important;gap:10px!important;text-align:center!important;padding-bottom:76px!important}
          .float-desktop{display:none!important}
          .stat-bar{flex-wrap:wrap!important}
          .stat-bar>div{flex:1 1 50%!important}
        }
      `}</style>

      {/* NAV */}
      <nav className="nav" style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 36px", height: 60, transition: "all .35s",
        background: scrolled ? "rgba(17,17,17,.95)" : "transparent",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,.04)" : "none",
        backdropFilter: scrolled ? "blur(16px)" : "none",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 20, height: 20, background: "#8B1A1A", transform: "rotate(45deg)" }} />
          <span style={{ fontFamily: "'Playfair Display',serif", fontSize: "1rem", fontWeight: 600, letterSpacing: ".14em" }}>PALM HILLS</span>
        </div>
        <div className="desk-links" style={{ display: "flex", gap: 24, alignItems: "center" }}>
          {[["المشروع", "project"], ["الأسعار", "prices"], ["تواصل", "contact"]].map(([l, id]) => (
            <button key={id} onClick={() => scroll(id)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: ".74rem", fontWeight: 600, color: "rgba(255,255,255,.45)", fontFamily: "'Almarai',sans-serif", letterSpacing: ".04em" }}>{l}</button>
          ))}
          <a href={`tel:${PHONE}`} dir="ltr" style={{ fontSize: ".82rem", fontWeight: 700, textDecoration: "none" }} className="gold">0100 900 5579</a>
        </div>
      </nav>

      {/* ═══ HERO ═══ */}
      <section style={{ position: "relative", height: "100vh", overflow: "hidden" }}>
        {mounted && <img src="/images/masterplan.jpg" alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", animation: "slowZoom 18s ease infinite alternate" }} />}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(17,17,17,.35) 0%, rgba(17,17,17,.65) 50%, rgba(17,17,17,.97) 100%)" }} />

        <div className="hero-wrap fadeUp" style={{ position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 10, padding: "0 48px 64px", maxWidth: 780 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 16, padding: "6px 14px", background: "rgba(139,26,26,.75)", borderRadius: 20 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", animation: "pulse 1.5s infinite" }} />
            <span style={{ fontSize: ".7rem", fontWeight: 700 }}>أول مطور مصري في رأس الحكمة</span>
          </div>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2.8rem,6.5vw,5rem)", fontWeight: 400, lineHeight: .92, marginBottom: 18 }}>
            1,400<span style={{ fontSize: ".35em", opacity: .4, marginRight: 4 }}>فدان</span><br />
            <span style={{ fontStyle: "italic", opacity: .25 }}>في قلب</span> <span className="gold">رأس الحكمة</span>
          </h1>
          <p style={{ fontSize: ".9rem", color: "rgba(255,255,255,.4)", lineHeight: 1.85, maxWidth: 460, marginBottom: 24 }}>
            مدينة متكاملة على مدار العام — 4.8 كم شاطئ · تصميم OBMI · مطار دولي · مارينا · 3 فنادق فاخرة.
          </p>
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={() => scroll("contact")} style={{ padding: "14px 28px", background: "#8B1A1A", color: "#fff", border: "none", borderRadius: 8, fontWeight: 700, fontSize: ".85rem", cursor: "pointer", fontFamily: "'Almarai',sans-serif" }}>سجّل الآن</button>
            <a href={`${WA}?text=${encodeURIComponent("مرحباً، أنا مهتم بمشروع Palm Hills رأس الحكمة 1400 فدان")}`} target="_blank" rel="noopener noreferrer"
              style={{ padding: "14px 28px", background: "#25D366", color: "#fff", borderRadius: 8, fontWeight: 700, fontSize: ".85rem", textDecoration: "none" }}>💬 واتساب</a>
          </div>
        </div>
      </section>

      {/* STATS */}
      <div className="stat-bar" style={{ display: "flex", background: "#1a1a1a", borderBottom: "1px solid rgba(255,255,255,.04)" }}>
        {[{ v: "1,400", l: "فدان" }, { v: "4.8 كم", l: "شاطئ" }, { v: "كيلو 238", l: "رأس الحكمة" }, { v: "OBMI", l: "التصميم العالمي" }].map((s, i) => (
          <div key={i} style={{ flex: 1, textAlign: "center", padding: "22px 12px", borderLeft: i > 0 ? "1px solid rgba(255,255,255,.04)" : "none" }}>
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.4rem", fontWeight: 500 }} className="gold">{s.v}</div>
            <div style={{ fontSize: ".62rem", color: "rgba(255,255,255,.25)", marginTop: 3 }}>{s.l}</div>
          </div>
        ))}
      </div>

      {/* ═══ PROJECT ═══ */}
      <section id="project" style={{ background: "#111" }}>
        {/* About text */}
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "64px 40px 48px", textAlign: "center" }}>
          <R>
            <p style={{ fontSize: ".68rem", fontWeight: 700, letterSpacing: ".25em", color: "#8B1A1A", marginBottom: 10 }}>PALM HILLS DEVELOPMENTS</p>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "2rem", fontWeight: 500, marginBottom: 16 }}>مدينة متكاملة في رأس الحكمة</h2>
            <p style={{ fontSize: ".88rem", color: "rgba(255,255,255,.4)", lineHeight: 1.9, maxWidth: 620, margin: "0 auto" }}>
              أول مطور مصري في رأس الحكمة — مدينة ذكية متكاملة على مدار العام على مساحة 1,400 فدان بتصميم OBMI العالمي. تقع على كيلو 238 بواجهة شاطئية 4.8 كم. تضم مطار دولي ومارينا دولية ومنطقة أعمال مركزية وشبكة نقل سريع ومنطقة حرة و3 فنادق فاخرة ونوادي رياضية ومناطق ترفيه. 84% مساحات مائية وخضرة و95% من الوحدات بإطلالة بحر أو لاجونز.
            </p>
          </R>
        </div>

        {/* Features grid */}
        <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 40px 56px" }}>
          <div className="grid4" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8 }}>
            {["✈️ مطار دولي", "⚓ مارينا دولية", "🏙 منطقة أعمال", "🚄 نقل سريع", "🏪 منطقة حرة", "🤖 مدينة ذكية", "🎭 ترفيه ودايننج", "⚽ نوادي رياضية", "🏨 3 فنادق فاخرة", "💧 84% مياه وخضرة", "🌊 95% إطلالة بحر", "🌍 سداد للأجانب"].map((f, i) => (
              <R key={i} d={i * .03}>
                <div style={{ background: "rgba(255,255,255,.03)", borderRadius: 8, padding: "14px 12px", textAlign: "center", border: "1px solid rgba(255,255,255,.04)", fontSize: ".78rem", fontWeight: 600, color: "rgba(255,255,255,.6)" }}>{f}</div>
              </R>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ MASTERPLAN ═══ */}
      <section style={{ background: "#0a0a0a" }}>
        <div className="split" style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
          <div className="split-img" style={{ position: "relative", overflow: "hidden", minHeight: "45vw" }}>
            <img src="/images/masterplan.jpg" alt="Masterplan" style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0 }} />
          </div>
          <div className="split-pad" style={{ padding: "52px 44px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p style={{ fontSize: ".68rem", fontWeight: 700, letterSpacing: ".2em", marginBottom: 10 }} className="gold">MASTERPLAN</p>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.8rem", fontWeight: 500, marginBottom: 6 }}>4 صفوف فلل بإطلالة بحر</h2>
            <p style={{ fontSize: ".82rem", color: "rgba(255,255,255,.35)", lineHeight: 1.8, marginBottom: 24 }}>
              تصميم OBMI يضمن إن كل الصفوف الأربعة ليها إطلالة بحر كاملة. كل الصفوف one story أو طابقين مع مساحات أراضي وبناء مختلفة.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {VILLAS.map((v, i) => (
                <div key={i} style={{ background: "rgba(255,255,255,.04)", borderRadius: 8, padding: "14px", borderRight: "3px solid #8B1A1A" }}>
                  <div style={{ fontSize: ".72rem", fontWeight: 700, marginBottom: 4 }} className="gold">{v.row}</div>
                  <div style={{ fontSize: ".7rem", color: "rgba(255,255,255,.45)", lineHeight: 1.6 }}>
                    {v.beds !== "—" && <>{v.beds} · </>}{v.floor}<br />أرض {v.land}م² · بناء {v.bua}م²
                  </div>
                </div>
              ))}
            </div>
            <button onClick={() => scroll("contact")} style={{ marginTop: 20, padding: "13px 24px", background: "#8B1A1A", color: "#fff", border: "none", borderRadius: 8, fontWeight: 700, fontSize: ".82rem", cursor: "pointer", fontFamily: "'Almarai',sans-serif", alignSelf: "flex-start" }}>
              سجّل واحصل على الماستر بلان
            </button>
          </div>
        </div>
      </section>

      {/* ═══ PRICES ═══ */}
      <section id="prices" style={{ padding: "64px 40px", background: "#111" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <R>
            <div style={{ textAlign: "center", marginBottom: 32 }}>
              <p style={{ fontSize: ".68rem", fontWeight: 700, letterSpacing: ".25em", color: "#8B1A1A", marginBottom: 8 }}>PRICING</p>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "2rem", fontWeight: 500 }}>الوحدات والأسعار</h2>
            </div>
          </R>

          {/* Units with CTA */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {UNITS.map((u, i) => (
              <R key={i} d={i * .04}>
                <div className="unit-row" style={{
                  background: "rgba(255,255,255,.03)", borderRadius: 10, padding: "18px 22px",
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  border: "1px solid rgba(255,255,255,.04)", transition: "border .2s",
                }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(139,26,26,.2)"}
                  onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,.04)"}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: ".88rem", fontWeight: 700, marginBottom: 2 }}>{u.type}</div>
                    <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.1rem", fontWeight: 600 }} className="gold">{u.raw}</div>
                  </div>
                  <div className="unit-cta" style={{ display: "flex", gap: 8 }}>
                    <a href={`${WA}?text=${encodeURIComponent(`مرحباً، أنا مهتم بـ ${u.type} في Palm Hills رأس الحكمة`)}`} target="_blank" rel="noopener noreferrer"
                      style={{ padding: "10px 14px", background: "#25D366", color: "#fff", fontWeight: 700, fontSize: ".7rem", textDecoration: "none", borderRadius: 6, whiteSpace: "nowrap" }}>💬 واتساب</a>
                    <button onClick={() => scroll("contact")} style={{ padding: "10px 14px", background: "#8B1A1A", color: "#fff", border: "none", fontWeight: 700, fontSize: ".7rem", cursor: "pointer", fontFamily: "'Almarai',sans-serif", borderRadius: 6, whiteSpace: "nowrap" }}>سجّل الآن</button>
                  </div>
                </div>
              </R>
            ))}
          </div>

          {/* Payment */}
          <R d={.15}>
            <div className="grid3" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginTop: 24 }}>
              {[
                { t: "جميع الأنواع", d1: "5% مقدم + 5% تعاقد", d2: "تقسيط 10 سنوات" },
                { t: "فلل صف 1–4", d1: "5% مقدم + 5% تعاقد", d2: "تقسيط 8 سنوات" },
                { t: "الأجانب", d1: "نظام سداد كامل", d2: "مش لحد التسليم فقط" },
              ].map((p, i) => (
                <div key={i} style={{ background: "rgba(255,255,255,.03)", borderRadius: 10, padding: "18px", textAlign: "center", border: "1px solid rgba(255,255,255,.04)" }}>
                  <div style={{ fontSize: ".66rem", fontWeight: 700, letterSpacing: ".1em", color: "#8B1A1A", marginBottom: 6 }}>{p.t}</div>
                  <div style={{ fontSize: ".85rem", fontWeight: 700, marginBottom: 2 }}>{p.d1}</div>
                  <div style={{ fontSize: ".75rem", color: "rgba(255,255,255,.35)" }}>{p.d2}</div>
                </div>
              ))}
            </div>
          </R>
          <R d={.2}>
            <div style={{ marginTop: 14, background: "rgba(139,26,26,.08)", borderRadius: 8, padding: "12px", border: "1px solid rgba(139,26,26,.12)", textAlign: "center" }}>
              <span style={{ fontSize: ".8rem", color: "#8B1A1A", fontWeight: 700 }}>💰 عمولة الوسطاء: 3%</span>
            </div>
          </R>
        </div>
      </section>

      {/* ═══ ABOUT DEVELOPER ═══ */}
      <section style={{ background: "#0a0a0a" }}>
        <div className="split" style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
          <div className="split-img" style={{ position: "relative", overflow: "hidden", minHeight: "35vw" }}>
            <img src="/images/palm-hills-aerial.jpg" alt="Palm Hills" style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0 }} />
          </div>
          <div className="split-pad" style={{ padding: "52px 44px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p style={{ fontSize: ".68rem", fontWeight: 700, letterSpacing: ".25em", marginBottom: 10 }} className="gold">PALM HILLS DEVELOPMENTS</p>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.8rem", fontWeight: 500, marginBottom: 14 }}>أول مطور مصري في رأس الحكمة</h2>
            <div style={{ width: 28, height: 2, background: "#8B1A1A", marginBottom: 16 }} />
            <p style={{ fontSize: ".85rem", color: "rgba(255,255,255,.4)", lineHeight: 1.9, marginBottom: 24 }}>
              Palm Hills Developments واحدة من أكبر المطورين العقاريين في مصر والشرق الأوسط. تأسست عام 1997 ومدرجة في البورصة المصرية وبورصة لندن. أكثر من 35 مشروع متكامل ومحفظة أراضي 29 مليون متر مربع.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {[{ v: "35+", l: "مشروع" }, { v: "1997", l: "تأسست" }, { v: "29M م²", l: "محفظة أراضي" }, { v: "EGX & LSE", l: "مدرجة بالبورصة" }].map((s, i) => (
                <div key={i} style={{ padding: "12px", background: "rgba(255,255,255,.03)", borderRadius: 8, border: "1px solid rgba(255,255,255,.04)" }}>
                  <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.2rem", fontWeight: 600 }} className="gold">{s.v}</div>
                  <div style={{ fontSize: ".62rem", color: "rgba(255,255,255,.2)", marginTop: 2 }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CONTACT ═══ */}
      <section id="contact" style={{ background: "#111" }}>
        <div className="split" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "55vh" }}>
          <div className="split-pad" style={{ background: "#8B1A1A", padding: "52px 44px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p style={{ fontSize: ".65rem", fontWeight: 700, letterSpacing: ".25em", color: "rgba(255,255,255,.45)", marginBottom: 10 }}>تواصل معنا</p>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "2rem", fontWeight: 500, lineHeight: 1.1, marginBottom: 14 }}>ابدأ رحلتك<br /><span style={{ fontStyle: "italic", opacity: .35 }}>في رأس الحكمة</span></h2>
            <p style={{ fontSize: ".85rem", color: "rgba(255,255,255,.5)", lineHeight: 1.85, marginBottom: 28 }}>سجّل بياناتك واحصل على البروشور والأسعار التفصيلية. هنتواصل معاك خلال 24 ساعة.</p>
            <a href={`tel:${PHONE}`} dir="ltr" style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.8rem", fontWeight: 600, color: "#fff", textDecoration: "none", marginBottom: 20 }}>0100 900 5579</a>
            <div style={{ display: "flex", gap: 10 }}>
              <a href={`${WA}?text=${encodeURIComponent("مرحباً، أنا مهتم بمشروع Palm Hills رأس الحكمة 1400 فدان")}`} target="_blank" rel="noopener noreferrer"
                style={{ padding: "12px 20px", background: "#25D366", color: "#fff", fontWeight: 700, fontSize: ".78rem", textDecoration: "none", borderRadius: 8 }}>💬 واتساب</a>
              <a href={`tel:${PHONE}`} style={{ padding: "12px 20px", border: "1px solid rgba(255,255,255,.25)", color: "#fff", fontWeight: 700, fontSize: ".78rem", textDecoration: "none", borderRadius: 8 }}>📞 اتصل</a>
            </div>
          </div>
          <div className="split-pad" style={{ background: "#1a1a1a", padding: "52px 44px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p style={{ fontSize: ".68rem", fontWeight: 700, letterSpacing: ".2em", color: "#8B1A1A", marginBottom: 8 }}>سجّل بياناتك</p>
            <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.5rem", fontWeight: 500, marginBottom: 6 }}>احصل على البروشور</h3>
            <p style={{ fontSize: ".75rem", color: "rgba(255,255,255,.3)", marginBottom: 20 }}>والأسعار التفصيلية وخطط السداد</p>
            <Form dark />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#0a0a0a", padding: "18px 36px 72px" }}>
        <div className="footer-inner" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 16, height: 16, background: "#8B1A1A", transform: "rotate(45deg)" }} />
            <span style={{ fontFamily: "'Playfair Display',serif", fontSize: ".82rem", letterSpacing: ".12em" }} className="gold">PALM HILLS</span>
          </div>
          <span style={{ fontSize: ".6rem", color: "rgba(255,255,255,.15)" }}>© 2026 Palm Hills Developments | وكيل معتمد</span>
        </div>
      </footer>

      {/* FLOAT */}
      <div className="float-desktop" style={{ position: "fixed", bottom: 76, left: 20, zIndex: 50, display: "flex", flexDirection: "column", gap: 8 }}>
        <a href={`tel:${PHONE}`} style={{ width: 46, height: 46, borderRadius: 12, background: "#8B1A1A", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 16px rgba(139,26,26,.3)", textDecoration: "none" }}>
          <svg viewBox="0 0 24 24" style={{ width: 20, height: 20, fill: "#fff" }}><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" /></svg>
        </a>
        <a href={`${WA}?text=${encodeURIComponent("مرحباً، أنا مهتم بمشروع Palm Hills رأس الحكمة")}`} target="_blank" rel="noopener noreferrer"
          style={{ width: 46, height: 46, borderRadius: 12, background: "#25D366", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 16px rgba(37,211,102,.3)", textDecoration: "none" }}>
          <svg viewBox="0 0 24 24" style={{ width: 20, height: 20, fill: "#fff" }}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
        </a>
      </div>

      {/* MOBILE BAR */}
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 40, display: "grid", gridTemplateColumns: "1fr 1fr" }}>
        <a href={`tel:${PHONE}`} style={{ padding: "15px", background: "#8B1A1A", color: "#fff", fontWeight: 700, fontSize: ".78rem", textAlign: "center", textDecoration: "none" }}>📞 اتصل الآن</a>
        <a href={`${WA}?text=${encodeURIComponent("مرحباً، أنا مهتم بمشروع Palm Hills رأس الحكمة")}`} target="_blank" rel="noopener noreferrer"
          style={{ padding: "15px", background: "#25D366", color: "#fff", fontWeight: 700, fontSize: ".78rem", textAlign: "center", textDecoration: "none" }}>💬 واتساب</a>
      </div>
    </div>
  )
}
