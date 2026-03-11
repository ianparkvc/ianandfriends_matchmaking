// Preview — 3D Glass + 로즈 톤
import { useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"

/* ━━ TOKENS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const C = {
    bg: "#FBF7F4",
    bgTint: "#FFEFEA",
    bgWarm: "#FFF5F0",
    rose: "#D4707E",
    roseVivid: "#E0657A",
    roseDeep: "#BE5E6C",
    roseLight: "#F5D0D6",
    roseMist: "rgba(212,112,126,0.07)",
    roseGlass: "rgba(212,112,126,0.06)",
    gold: "#C9A87C",
    goldLight: "#E8D5B8",
    text: "#2C2428",
    textSoft: "#6E6266",
    textMuted: "#AEA4A8",
    glass: "rgba(255,255,255,0.35)",
    glassBorder: "rgba(255,255,255,0.45)",
    glassHi: "rgba(255,255,255,0.55)",
} as const

const F = {
    serif: '"Pretendard","Cormorant Garamond",Georgia,serif',
    sans: '"Pretendard",-apple-system,BlinkMacSystemFont,sans-serif',
    display: '"Cormorant Garamond","Pretendard",Georgia,serif',
} as const

const EASE = [0.22, 1, 0.36, 1] as const

/* ━━ ANIMATION ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    visible: (d: number = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.8, delay: d, ease: EASE } }),
}
function Reveal({ children, delay = 0, style }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) {
    const ref = useRef<HTMLDivElement>(null)
    const inView = useInView(ref, { once: true, margin: "-60px" })
    return <motion.div ref={ref} variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} custom={delay} style={style}>{children}</motion.div>
}

function Sep() {
    return <div style={{ width: 36, height: 1, background: C.roseLight, margin: "64px auto", opacity: 0.7 }} />
}

/* ━━ CSS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const CSS = `
@keyframes ianf-drift {
  0%, 100% { transform: translate(-50%,-50%) scale(1); opacity: 0.4; }
  50% { transform: translate(-50%,-50%) scale(1.04); opacity: 0.55; }
}
@keyframes ianf-scroll {
  0%   { transform: translateY(0); opacity: 0.4; }
  50%  { transform: translateY(8px); opacity: 0.1; }
  100% { transform: translateY(0); opacity: 0.4; }
}
@keyframes ianf-float {
  0%, 100% { transform: perspective(800px) rotateX(2deg) rotateY(-1deg) translateY(0); }
  50% { transform: perspective(800px) rotateX(-1deg) rotateY(1.5deg) translateY(-6px); }
}
@keyframes ianf-shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
@keyframes ianf-mesh-move {
  0%, 100% { transform: translate(0, 0) scale(1); }
  25% { transform: translate(3%, -2%) scale(1.03); }
  50% { transform: translate(-2%, 3%) scale(0.98); }
  75% { transform: translate(2%, 1%) scale(1.02); }
}

.ianf-btn-primary {
  background: rgba(212,112,126,0.08);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(212,112,126,0.18);
  color: ${C.rose};
  padding: 16px 44px;
  font-family: ${F.sans};
  font-size: 15px;
  font-weight: 400;
  letter-spacing: 0.2px;
  cursor: pointer;
  transition: all 0.35s ease;
  outline: none;
  border-radius: 48px;
}
.ianf-btn-primary:hover {
  background: rgba(212,112,126,0.13);
  border-color: rgba(212,112,126,0.3);
  transform: translateY(-2px);
  box-shadow: 0 8px 32px rgba(212,112,126,0.12);
}
.ianf-btn-primary:active { transform: scale(0.98); }

.ianf-glass-3d {
  background: rgba(255,255,255,0.25);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(255,255,255,0.4);
  border-radius: 24px;
  box-shadow:
    0 4px 16px rgba(212,112,126,0.04),
    0 8px 40px rgba(0,0,0,0.03),
    inset 0 1px 0 rgba(255,255,255,0.6);
  transition: all 0.5s cubic-bezier(0.22,1,0.36,1);
  transform: perspective(800px) rotateX(1deg);
  transform-style: preserve-3d;
}
.ianf-glass-3d:hover {
  transform: perspective(800px) rotateX(0deg) translateY(-4px);
  box-shadow:
    0 8px 24px rgba(212,112,126,0.08),
    0 20px 60px rgba(0,0,0,0.05),
    inset 0 1px 0 rgba(255,255,255,0.7);
  border-color: rgba(255,255,255,0.55);
  background: rgba(255,255,255,0.35);
}

.ianf-glass-card {
  background: rgba(255,255,255,0.2);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255,255,255,0.35);
  border-radius: 20px;
  box-shadow:
    0 2px 12px rgba(0,0,0,0.02),
    inset 0 1px 0 rgba(255,255,255,0.5);
  transition: all 0.45s cubic-bezier(0.22,1,0.36,1);
  transform: perspective(600px) rotateX(0.5deg);
}
.ianf-glass-card:hover {
  transform: perspective(600px) rotateX(0deg) translateY(-3px);
  background: rgba(255,255,255,0.32);
  border-color: rgba(255,255,255,0.5);
  box-shadow:
    0 6px 24px rgba(212,112,126,0.06),
    0 12px 40px rgba(0,0,0,0.04),
    inset 0 1px 0 rgba(255,255,255,0.6);
}

.ianf-link {
  color: ${C.textMuted};
  text-decoration: none;
  font-size: 12.5px;
  letter-spacing: 0.3px;
  transition: color 0.3s ease;
  font-weight: 400;
}
.ianf-link:hover { color: ${C.rose}; }

/* Viral Loops font override */
form-widget,
form-widget * {
  font-family: ${F.sans} !important;
}
`

/* ━━ DATA ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const PILLARS = [
    { title: "프라이빗 네트워크", desc: "실리콘밸리 VC·테크 커뮤니티 기반의 검증된 네트워크에서 연결합니다." },
    { title: "1:1 맞춤 큐레이션", desc: "알고리즘이 아닌, 직접 만나고 분석하여 최적의 매칭을 설계합니다." },
    { title: "깊이 있는 매칭", desc: "설문과 직접 대화를 통해 진짜 궁합을 찾습니다." },
    { title: "완전한 프라이버시", desc: "프로필은 동의하신 매칭 상대에게만 공개됩니다." },
    { title: "검증된 멤버십", desc: "모든 멤버는 추천과 심사를 거쳐 신뢰할 수 있는 분만 합류합니다." },
    { title: "지속적인 케어", desc: "매칭 이후에도 피드백을 반영하여 더 나은 만남을 설계합니다." },
]
const STORY_PARAGRAPHS = [
    `저는 8년째 실리콘밸리 투자 업계에서 일하며 수백 명의 창업자, 엔지니어, 투자자를 만나왔습니다. 그 과정에서 쌓인 이야기들은 뉴스레터 \u201C주간실리콘밸리\u201D로 이어졌습니다.`,
    "실리콘밸리의 진짜 사람들을 가장 가까이에서 보아온 사람으로서, 한 가지 놀라운 점을 자주 보게 되었습니다. 이렇게 훌륭한 사람들이 정작 좋은 사람을 만나는 데에는 생각보다 어려움을 겪는다는 점이었습니다.",
    "그래서 생각했습니다.\n제가 가진 네트워크를 가장 가치 있게 사용하는 방법이 무엇일까.",
    "답은 단순했습니다.\n제가 직접 사람들을 연결하는 것입니다.",
]
const STEPS = [
    { num: "01", title: "멤버 신청", desc: "간단한 프로필을 작성하고 멤버십을 신청합니다." },
    { num: "02", title: "설문 작성", desc: "설문을 통해 당신의 이야기를 들려주세요." },
    { num: "03", title: "온보딩", desc: "줌콜 또는 대면 미팅으로 더 깊이 알아가는 시간을 가집니다." },
    { num: "04", title: "큐레이션", desc: "이안이 직접 분석하고 최적의 매칭을 큐레이팅합니다." },
    { num: "05", title: "소개", desc: "서로에 대한 정성스러운 소개와 함께 연결해 드립니다." },
    { num: "06", title: "만남", desc: "자연스러운 첫 만남. 그 이후는 두 분의 이야기입니다." },
]

/* ━━ COMPONENT ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export default function IanAndFriendsLanding() {
    const LINKS = [
        { label: "뉴스레터", href: "https://ianpark.vc/" },
        { label: "링크드인", href: "https://www.linkedin.com/in/park-ian/" },
        { label: "인스타그램", href: "https://www.instagram.com/ianpark.vc/" },
        { label: "언론사 인터뷰", href: "https://marketin.edaily.co.kr/News/Read?newsId=03732646638955176" },
        { label: "아마존 뷰티서바이벌 심사위원", href: "https://www.youtube.com/watch?v=LVaeuNDoASE" },
    ]

    useEffect(() => {
        if (!document.getElementById("ianf-fonts")) {
            const l = document.createElement("link"); l.id = "ianf-fonts"; l.rel = "stylesheet"
            l.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&display=swap"
            document.head.appendChild(l)
        }
        if (!document.getElementById("ianf-pretendard")) {
            const p = document.createElement("link"); p.id = "ianf-pretendard"; p.rel = "stylesheet"
            p.href = "https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
            document.head.appendChild(p)
        }
        if (!document.getElementById("ianf-css")) {
            const s = document.createElement("style"); s.id = "ianf-css"; s.textContent = CSS
            document.head.appendChild(s)
        }
        /* Viral Loops */
        if (!document.getElementById("viral-loops-loader")) {
            const vl = document.createElement("script")
            vl.id = "viral-loops-loader"
            vl.src = "https://app.viral-loops.com/widgetsV2/core/loader.js"
            vl.setAttribute("data-campaign-id", "6qp2fEILlxFgbATl7973e1QSSKM")
            document.head.appendChild(vl)
        }

        /* Inject styles into Viral Loops shadow DOM */
        const VL_CSS = `
            @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css');
            @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&display=swap');
            * { font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif !important; }
            h2, h3, p, label, span, div { font-family: 'Pretendard', -apple-system, sans-serif !important; }
            h1, h2 {
                font-family: 'Pretendard', -apple-system, sans-serif !important;
                font-weight: 300 !important;
                letter-spacing: -0.5px !important;
                background: linear-gradient(135deg, ${C.text} 0%, ${C.rose} 100%) !important;
                -webkit-background-clip: text !important;
                -webkit-text-fill-color: transparent !important;
                background-clip: text !important;
            }
            h3 { color: ${C.textSoft} !important; font-weight: 300 !important; font-size: 14px !important; letter-spacing: 0.2px !important; }
            p, span, div, label { color: ${C.textMuted} !important; }
            a { color: ${C.rose} !important; }
            button, [type="submit"] {
                background: linear-gradient(135deg, ${C.roseDeep} 0%, ${C.rose} 50%, ${C.gold} 100%) !important;
                border: none !important;
                border-radius: 48px !important;
                font-weight: 500 !important;
                letter-spacing: 0.3px !important;
                color: #FFFFFF !important;
                box-shadow: 0 4px 20px rgba(212,112,126,0.25) !important;
                transition: all 0.35s ease !important;
            }
            button:hover, [type="submit"]:hover {
                box-shadow: 0 8px 32px rgba(212,112,126,0.35) !important;
                transform: translateY(-2px) !important;
            }
            input {
                border-radius: 16px !important;
                border: 1px solid rgba(212,112,126,0.15) !important;
                font-weight: 300 !important;
                color: ${C.text} !important;
                transition: border-color 0.3s ease !important;
            }
            input::placeholder {
                color: ${C.textMuted} !important;
                font-weight: 300 !important;
            }
            input:focus {
                border-color: ${C.rose} !important;
                box-shadow: 0 0 0 3px rgba(212,112,126,0.08) !important;
                outline: none !important;
            }
        `
        const injectVLStyles = () => {
            const widget = document.querySelector("form-widget")
            if (widget?.shadowRoot && !widget.shadowRoot.getElementById("ianf-vl-css")) {
                const style = document.createElement("style")
                style.id = "ianf-vl-css"
                style.textContent = VL_CSS
                widget.shadowRoot.appendChild(style)
            }
        }
        const vlTimer = setInterval(injectVLStyles, 500)
        setTimeout(() => clearInterval(vlTimer), 10000)

    }, [])

    const label: React.CSSProperties = { fontFamily: F.sans, fontSize: 11, fontWeight: 400, letterSpacing: "3.5px", textTransform: "uppercase", color: C.rose, marginBottom: 20, opacity: 0.8 }
    const heading: React.CSSProperties = { fontFamily: F.serif, fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 300, lineHeight: 1.35, margin: 0, color: C.text }
    const ko: React.CSSProperties = { wordBreak: "keep-all", overflowWrap: "break-word" }

    return (
        <div style={{ width: "100%", background: C.bg, color: C.text, fontFamily: F.sans, fontWeight: 300, lineHeight: 1.7, overflowX: "hidden", position: "relative", wordBreak: "keep-all", overflowWrap: "break-word" }}>

            {/* ═══ FULL-PAGE GRADIENT MESH ═══ */}
            <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
                {/* warm base gradient */}
                <div style={{ position: "absolute", inset: 0, background: `linear-gradient(165deg, ${C.bg} 0%, ${C.bgWarm} 20%, rgba(245,208,214,0.15) 35%, ${C.bg} 50%, rgba(232,213,184,0.18) 65%, ${C.bgWarm} 80%, ${C.bg} 100%)` }} />
                {/* large rose glow - top left */}
                <div style={{ position: "absolute", top: "-15%", left: "-20%", width: "70vw", height: "70vw", borderRadius: "50%", background: `radial-gradient(circle, rgba(212,112,126,0.1) 0%, rgba(212,112,126,0.04) 40%, transparent 65%)`, filter: "blur(40px)", animation: "ianf-mesh-move 20s ease-in-out infinite" }} />
                {/* gold glow - center right */}
                <div style={{ position: "absolute", top: "25%", right: "-15%", width: "60vw", height: "60vw", borderRadius: "50%", background: `radial-gradient(circle, rgba(201,168,124,0.12) 0%, rgba(201,168,124,0.04) 45%, transparent 65%)`, filter: "blur(50px)", animation: "ianf-mesh-move 25s ease-in-out infinite 5s" }} />
                {/* rose mist - center */}
                <div style={{ position: "absolute", top: "40%", left: "20%", width: "55vw", height: "55vw", borderRadius: "50%", background: `radial-gradient(circle, rgba(245,208,214,0.1) 0%, transparent 55%)`, filter: "blur(60px)", animation: "ianf-mesh-move 22s ease-in-out infinite 3s" }} />
                {/* warm glow - bottom left */}
                <div style={{ position: "absolute", bottom: "0%", left: "-10%", width: "50vw", height: "50vw", borderRadius: "50%", background: `radial-gradient(circle, rgba(255,239,234,0.15) 0%, rgba(245,208,214,0.06) 40%, transparent 60%)`, filter: "blur(45px)", animation: "ianf-mesh-move 18s ease-in-out infinite 8s" }} />
                {/* gold accent - bottom right */}
                <div style={{ position: "absolute", bottom: "15%", right: "0%", width: "45vw", height: "45vw", borderRadius: "50%", background: `radial-gradient(circle, rgba(201,168,124,0.09) 0%, transparent 55%)`, filter: "blur(55px)", animation: "ianf-mesh-move 23s ease-in-out infinite 12s" }} />
                {/* subtle grain overlay */}
                <div style={{ position: "absolute", inset: 0, opacity: 0.03, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: "128px 128px" }} />
            </div>

            {/* content layer */}
            <div style={{ position: "relative", zIndex: 1 }}>

            {/* thin top line */}
            <div style={{ height: 2, background: `linear-gradient(90deg, transparent 5%, ${C.goldLight} 25%, ${C.roseLight} 50%, ${C.goldLight} 75%, transparent 95%)`, opacity: 0.8 }} />

            {/* ═══ HERO ═══ */}
            <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", position: "relative", padding: "80px 24px", perspective: "1200px" }}>

                {/* layered warm orbs for depth */}
                <div style={{ position: "absolute", top: "20%", left: "40%", width: "min(600px, 90vw)", height: "min(600px, 90vw)", borderRadius: "50%", background: `radial-gradient(circle, rgba(212,112,126,0.08) 0%, rgba(201,168,124,0.04) 40%, transparent 65%)`, animation: "ianf-drift 8s ease-in-out infinite", pointerEvents: "none" }} />
                <div style={{ position: "absolute", top: "35%", left: "60%", width: "min(400px, 65vw)", height: "min(400px, 65vw)", borderRadius: "50%", background: `radial-gradient(circle, ${C.bgTint} 0%, transparent 50%)`, animation: "ianf-drift 10s ease-in-out infinite 2s", pointerEvents: "none", opacity: 0.6 }} />
                <div style={{ position: "absolute", top: "55%", left: "30%", width: "min(300px, 50vw)", height: "min(300px, 50vw)", borderRadius: "50%", background: `radial-gradient(circle, rgba(201,168,124,0.06) 0%, transparent 55%)`, animation: "ianf-drift 12s ease-in-out infinite 4s", pointerEvents: "none", opacity: 0.4 }} />

                <Reveal><p style={{ ...label, marginBottom: 44, letterSpacing: "4.5px", color: C.gold }}>Private Date Matching</p></Reveal>

                <Reveal delay={0.12}>
                    <h1 style={{ fontFamily: F.serif, fontSize: "clamp(2.6rem, 6.5vw, 5rem)", fontWeight: 200, lineHeight: 1.15, margin: 0, background: `linear-gradient(135deg, ${C.text} 0%, ${C.roseDeep} 50%, ${C.gold} 100%)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", ...ko }}>
                        이안과 친구들
                    </h1>
                </Reveal>

                <Reveal delay={0.25}>
                    <p style={{ fontSize: "clamp(0.92rem, 1.3vw, 1.05rem)", fontWeight: 300, color: C.textSoft, maxWidth: 380, margin: "32px auto 0", lineHeight: 2, ...ko }}>
                        모두에게 공개되는 데이팅앱은 잊으세요.<br />
                        신뢰할 수 있는 사람이 소개하는, 프라이빗 만남.
                    </p>
                </Reveal>

                <Reveal delay={0.35}>
                    <div style={{ width: 1, height: 48, background: `linear-gradient(to bottom, ${C.roseLight}, transparent)`, margin: "48px auto 0", opacity: 0.5 }} />
                </Reveal>
            </section>

            {/* ═══ CTA + VIRAL LOOPS (TOP) ═══ */}
            <section id="waitlist" style={{ padding: "0 24px 40px", textAlign: "center", position: "relative", marginTop: -40 }}>
                <div style={{ position: "absolute", top: "30%", left: "50%", width: "min(500px, 85vw)", height: 220, borderRadius: "50%", background: `radial-gradient(ellipse, ${C.bgTint} 0%, transparent 65%)`, transform: "translate(-50%, -50%)", pointerEvents: "none", opacity: 0.6 }} />

                <Reveal>
                    <div style={{ position: "relative", maxWidth: 480, margin: "0 auto" }}>
                        <div
                            className="ianf-glass-3d"
                            style={{ padding: "36px 28px", borderRadius: 24, marginBottom: 20 }}
                            dangerouslySetInnerHTML={{
                                __html: '<form-widget ucid="6qp2fEILlxFgbATl7973e1QSSKM"></form-widget>'
                            }}
                        />
                    </div>
                </Reveal>

                <Reveal delay={0.1}><p style={{ fontSize: 11.5, color: C.textMuted, marginTop: 8, letterSpacing: "0.2px", position: "relative" }}>지금 가입하면 멤버십 무료 &nbsp;&middot;&nbsp; 모든 정보는 안전하게 보호됩니다</p></Reveal>
            </section>

            <Sep />

            {/* ═══ WHY ═══ */}
            <section style={{ padding: "0 24px 80px", maxWidth: 960, margin: "0 auto", textAlign: "center" }}>
                <Reveal><p style={label}>Why Us</p></Reveal>
                <Reveal delay={0.08}><h2 style={{ ...heading, marginBottom: 14, ...ko }}>왜 이안과 친구들인가</h2></Reveal>
                <Reveal delay={0.16}><p style={{ color: C.textSoft, fontSize: 14.5, maxWidth: 400, margin: "0 auto 52px", lineHeight: 1.9, ...ko }}>좋은 사람은 분명 있습니다.<br />다만 만날 방법이 없었을 뿐.</p></Reveal>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 20 }}>
                    {PILLARS.map((item, i) => (
                        <Reveal key={item.title} delay={0.08 * i}>
                            <div className="ianf-glass-card" style={{ padding: "44px 28px", textAlign: "center" }}>
                                <h3 style={{ fontFamily: F.serif, fontSize: 19, fontWeight: 400, margin: "0 0 12px", color: C.text, ...ko }}>{item.title}</h3>
                                <p style={{ fontSize: 13.5, color: C.textSoft, margin: 0, lineHeight: 1.85, ...ko }}>{item.desc}</p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </section>

            <Sep />

            {/* ═══ STORY ═══ */}
            <section style={{ padding: "0 24px 80px", maxWidth: 580, margin: "0 auto", textAlign: "center" }}>
                <Reveal><p style={{ ...label, color: C.gold }}>Our Story</p></Reveal>
                <Reveal delay={0.08}><h2 style={{ ...heading, marginBottom: 36, ...ko }}>이안의 이야기</h2></Reveal>
                <Reveal delay={0.16}>
                    <div className="ianf-glass-3d" style={{ padding: "48px 32px", borderRadius: 28, textAlign: "left" }}>
                        {/* photo */}
                        <div style={{ width: "100%", marginBottom: 28, borderRadius: 16, overflow: "hidden", boxShadow: `0 8px 32px rgba(212,112,126,0.1)` }}>
                            <img src="/ian-photo.jpg" alt="이안 (Ian Park)" style={{ width: "100%", height: "auto", display: "block", objectFit: "cover" }} />
                        </div>

                        {STORY_PARAGRAPHS.map((p, i) => (
                            <p key={i} style={{ fontSize: 14.5, color: C.textSoft, lineHeight: 2.1, margin: i < STORY_PARAGRAPHS.length - 1 ? "0 0 20px" : 0, fontWeight: 300, whiteSpace: "pre-line", ...ko }}>{p}</p>
                        ))}

                        <div style={{ width: 28, height: 1, background: `linear-gradient(90deg, ${C.roseLight}, ${C.goldLight})`, margin: "28px auto 22px", opacity: 0.6 }} />

                        <p style={{ fontSize: 12.5, color: C.text, lineHeight: 2.1, textAlign: "center", fontStyle: "italic", fontFamily: F.serif, fontWeight: 300, ...ko }}>
                            "누군가와 평생 친구이자 동맹이 되는<br />가장 확실한 길은,<br />그 사람에게 좋은 배우자를 소개해주는 것이다."
                        </p>
                    </div>
                </Reveal>
            </section>

            <Sep />

            {/* ═══ PROCESS ═══ */}
            <section style={{ padding: "0 24px 80px", maxWidth: 580, margin: "0 auto" }}>
                <div style={{ textAlign: "center", marginBottom: 48 }}>
                    <Reveal><p style={label}>Process</p></Reveal>
                    <Reveal delay={0.08}><h2 style={{ ...heading, ...ko }}>어떻게 진행되나요</h2></Reveal>
                </div>
                <Reveal delay={0.16}>
                    <div className="ianf-glass-3d" style={{ padding: "40px 32px", position: "relative" }}>
                        {STEPS.map((step, i) => (
                            <div key={step.num} style={{ display: "flex", gap: 20, marginBottom: i < STEPS.length - 1 ? 32 : 0, alignItems: "flex-start", position: "relative" }}>
                                <span style={{ fontFamily: F.display, fontSize: 13, color: C.rose, fontWeight: 300, fontStyle: "italic", letterSpacing: "1px", flexShrink: 0, width: 24, marginTop: 3, opacity: 0.7 }}>{step.num}</span>
                                <div style={{ flex: 1 }}>
                                    <h3 style={{ fontFamily: F.serif, fontSize: 17, fontWeight: 400, margin: "0 0 4px", color: C.text, ...ko }}>{step.title}</h3>
                                    <p style={{ fontSize: 13.5, color: C.textSoft, margin: 0, lineHeight: 1.8, ...ko }}>{step.desc}</p>
                                </div>
                                {i < STEPS.length - 1 && <div style={{ position: "absolute", bottom: -17, left: 10, width: 1, height: 10, background: C.roseLight, opacity: 0.4 }} />}
                            </div>
                        ))}
                    </div>
                </Reveal>
            </section>

            <Sep />

            {/* ═══ ABOUT IAN ═══ */}
            <section style={{ padding: "0 24px 80px", maxWidth: 560, margin: "0 auto", textAlign: "center" }}>
                <Reveal><p style={label}>About</p></Reveal>
                <Reveal delay={0.08}><h2 style={{ ...heading, marginBottom: 40, ...ko }}>이안에 대해</h2></Reveal>
                <Reveal delay={0.16}>
                    <div className="ianf-glass-3d" style={{ padding: "48px 32px", borderRadius: 28 }}>

                        {/* avatar */}
                        <div style={{ width: 80, height: 80, borderRadius: "50%", overflow: "hidden", margin: "0 auto 22px", border: `2px solid ${C.glassBorder}`, boxShadow: `0 4px 20px rgba(212,112,126,0.1)` }}>
                            <img src="/ian-profile.jpg" alt="이안" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 15%" }} />
                        </div>

                        <h3 style={{ fontFamily: F.serif, fontSize: 21, fontWeight: 400, margin: "0 0 6px" }}>이안 (Ian Park)</h3>
                        <p style={{ fontSize: 12.5, color: C.rose, letterSpacing: "0.4px", margin: "0 0 28px", opacity: 0.85, ...ko }}>
                            실리콘밸리 8년차 VC &nbsp;&middot;&nbsp; "주간실리콘밸리" 발행인
                        </p>

                        <div style={{ display: "flex", justifyContent: "center", gap: 36, marginBottom: 32, flexWrap: "wrap" }}>
                            <div>
                                <div style={{ fontFamily: F.display, fontSize: 30, fontWeight: 300, color: C.text, fontStyle: "italic", lineHeight: 1 }}>11,000<span style={{ fontSize: 16 }}>+</span></div>
                                <div style={{ fontSize: 11.5, color: C.textMuted, marginTop: 6 }}>뉴스레터 구독자</div>
                            </div>
                            <div style={{ width: 1, alignSelf: "stretch", background: C.roseLight, opacity: 0.5 }} />
                            <div>
                                <div style={{ fontFamily: F.display, fontSize: 30, fontWeight: 300, color: C.text, fontStyle: "italic", lineHeight: 1 }}>10,000<span style={{ fontSize: 16 }}>+</span></div>
                                <div style={{ fontSize: 11.5, color: C.textMuted, marginTop: 6 }}>링크드인 커넥션</div>
                            </div>
                        </div>

                        <div style={{ width: 28, height: 1, background: C.roseLight, margin: "0 auto 22px", opacity: 0.5 }} />
                        <p style={{ fontSize: 14.5, color: C.textSoft, lineHeight: 2, maxWidth: 380, margin: "0 auto", fontStyle: "italic", fontFamily: F.serif, fontWeight: 300, ...ko }}>
                            "좋은 사람을 좋은 사람에게 소개해주는 것.<br />제가 가장 잘하고, 가장 좋아하는 일입니다."
                        </p>

                        {/* links */}
                        <div style={{ marginTop: 28, paddingTop: 22, borderTop: `1px solid ${C.roseMist}`, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "7px 18px" }}>
                            {LINKS.map((link, i) => (
                                <span key={link.label} style={{ display: "flex", alignItems: "center", gap: 18 }}>
                                    <a href={link.href} className="ianf-link" target="_blank" rel="noopener noreferrer">{link.label}</a>
                                    {i < LINKS.length - 1 && <span style={{ color: C.roseLight, fontSize: 6 }}>&middot;</span>}
                                </span>
                            ))}
                        </div>
                    </div>
                </Reveal>
            </section>

            <Sep />

            {/* ═══ BOTTOM CTA ═══ */}
            <section style={{ padding: "0 24px 100px", textAlign: "center", position: "relative" }}>
                <div style={{ position: "absolute", top: "45%", left: "50%", width: "min(500px, 85vw)", height: 220, borderRadius: "50%", background: `radial-gradient(ellipse, ${C.bgTint} 0%, transparent 65%)`, transform: "translate(-50%, -50%)", pointerEvents: "none", opacity: 0.6 }} />
                <Reveal><h2 style={{ fontFamily: F.serif, fontSize: "clamp(1.7rem, 3.5vw, 2.4rem)", fontWeight: 200, margin: "0 0 12px", lineHeight: 1.35, position: "relative", ...ko }}>지금, 첫 번째 멤버가 되세요</h2></Reveal>
                <Reveal delay={0.08}><p style={{ color: C.textSoft, fontSize: 14, maxWidth: 360, margin: "0 auto 40px", lineHeight: 1.9, position: "relative", ...ko }}>초기 멤버에게는 멤버십이 무료로 제공됩니다.<br />자리가 한정되어 있습니다.</p></Reveal>
                <Reveal delay={0.16}><a href="#waitlist" style={{ textDecoration: "none", display: "inline-block", padding: "16px 48px", fontSize: 15, whiteSpace: "nowrap", position: "relative", background: `linear-gradient(135deg, ${C.roseDeep} 0%, ${C.rose} 50%, ${C.gold} 100%)`, color: "#FFFFFF", borderRadius: 48, fontFamily: F.sans, fontWeight: 500, letterSpacing: "0.3px", boxShadow: "0 4px 20px rgba(212,112,126,0.25)", border: "none", cursor: "pointer", transition: "all 0.35s ease" }} onClick={(e) => { e.preventDefault(); document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" }) }}>대기자 명단 등록하기</a></Reveal>
            </section>

            {/* ═══ FOOTER ═══ */}
            <footer style={{ borderTop: `1px solid ${C.roseMist}`, padding: "36px 24px", textAlign: "center" }}>
                <p style={{ fontFamily: F.serif, fontSize: 14, fontWeight: 300, color: C.textMuted, margin: 0 }}>
                    이안과 친구들 &nbsp;&middot;&nbsp; <span style={{ fontFamily: F.display, fontStyle: "italic" }}>Ian &amp; Friends</span>
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "5px 16px", marginTop: 12, marginBottom: 12 }}>
                    {LINKS.map((link, i) => (
                        <span key={link.label} style={{ display: "flex", alignItems: "center", gap: 16 }}>
                            <a href={link.href} className="ianf-link" target="_blank" rel="noopener noreferrer" style={{ fontSize: 11 }}>{link.label}</a>
                            {i < LINKS.length - 1 && <span style={{ color: C.roseLight, fontSize: 5 }}>&middot;</span>}
                        </span>
                    ))}
                </div>
                <p style={{ fontSize: 11.5, color: C.textMuted, marginTop: 10, marginBottom: 8, opacity: 0.6 }}>
                    문의하기: <a href="mailto:hello@ianandfriends.com" style={{ color: C.rose, textDecoration: "none", fontWeight: 300, letterSpacing: "0.3px", opacity: 0.75 }}>hello@ianandfriends.com</a>
                </p>
                <p style={{ fontSize: 10.5, color: C.textMuted, marginTop: 6, letterSpacing: "0.4px", opacity: 0.45 }}>&copy; 2026 All rights reserved.</p>
            </footer>

            </div>{/* end content layer */}
        </div>
    )
}
