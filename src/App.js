import { useState, useEffect } from "react";

const NAV_LINKS = ["Home", "About", "Prayer", "Contact", "Donation"];

const VERSES = [
  { text: "For God so loved the world that he gave his one and only Son.", ref: "John 3:16" },
  { text: "I can do all things through Christ who strengthens me.", ref: "Philippians 4:13" },
  { text: "The Lord is my shepherd; I shall not want.", ref: "Psalm 23:1" },
];

const SERVICES = [
  { day: "Sunday", time: "10:00 AM – 12:15 PM", label: "Main Worship Service" },
  { day: "Wednesday", time: "6:30 PM", label: "Midweek Bible Study" },
  { day: "Friday", time: "7:00 PM", label: "Youth & Prayer Night" },
];

const TEAM = [
  { name: "Pr. Rajkumar. L", role: "Senior Pastor", initials: "RL", image: "/images/pastor3.png", description: "Overseeing the regional body with a vision to see every church rooted in the Word and empowered by the Spirit — uniting pastors, families, and communities for the Kingdom." },
  { name: "Pr. Logeshwaran", role: "Associate Pastor", initials: "LG", image: "/images/pastor1.png", description: "Serving the church family with a heart for prayer, deliverance, and seeing every soul know Jesus Christ — leading with love and grounded in the grace of the Gospel." },
  { name: "Pr. David", role: "Youth Pastor", initials: "DV", image: "/images/pastor2.jpeg", description: "Serving the church family with a heart for prayer, deliverance, and seeing every soul know Jesus Christ — leading with love and grounded in the grace of the Gospel." },
  { name: "Pr. Emmanuel", role: "Worship Leader", initials: "EM", image: "/images/pastor4.jpg", description: "Walking alongside the congregation through discipleship, care, and worship — committed to nurturing every believer into a deeper walk with the Lord." },
];

/* ── Card with hover shadow effect ── */
function Card({ style = {}, children }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#FFF",
        border: "1px solid #F5E6B8",
        borderRadius: 12,
        padding: "clamp(1rem,3vw,2rem)",
        transition: "box-shadow 0.35s ease, transform 0.35s ease",
        boxShadow: hovered
          ? "0 16px 48px rgba(201,168,76,0.22), 0 4px 16px rgba(0,0,0,0.08)"
          : "0 4px 24px rgba(201,168,76,0.08)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export default function ChurchWebsite() {
  const [active, setActive] = useState("Home");
  const [verseIdx, setVerseIdx] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== "undefined" ? window.innerWidth > 768 : true
  );
  const [prayerForm, setPrayerForm] = useState({ name: "", email: "", category: "", request: "" });
  const [contactForm, setContactForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState({ prayer: false, contact: false });
  const [donationAmt, setDonationAmt] = useState(200);
  const [customAmt, setCustomAmt] = useState("");
  const [donationType, setDonationType] = useState("tithe");
  const [carouselIdx, setCarouselIdx] = useState(0);

  const CAROUSEL_IMAGES = [
    "/images/church-event-1.jpg",
    "/images/church-event-2.jpg",
    "/images/church-event-3.jpg",
    // "/images/church-event-4.jpg",
    "/images/church-event-5.jpg",
  ];

  /* ── hide scrollbar globally ── */
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      html { scroll-behavior: smooth; }
      ::-webkit-scrollbar { display: none; }
      * { -ms-overflow-style: none; scrollbar-width: none; }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const desktop = window.innerWidth > 768;
      setIsDesktop(desktop);
      if (desktop) setMobileMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setVerseIdx(i => (i + 1) % VERSES.length), 5000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setCarouselIdx(i => (i + 1) % CAROUSEL_IMAGES.length), 4000);
    return () => clearInterval(t);
  }, []);

  const navigate = (page) => {
    setActive(page);
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  // Mail-to function for Prayer Form
  const handlePrayerSubmit = () => {
    const data = {
      name: prayerForm.name,
      email: prayerForm.email,
      category: prayerForm.category,
      request: prayerForm.request,
      type: "prayer"
    };

    fetch("https://script.google.com/macros/s/AKfycbxBchOSKMVeOZYgIcGSKpfVLzAwXRxXlQ7H_lPi2LZMZNHfJBfi_fbCBCsVNTJCSQCcbg/exec", {
      method: "POST",
      body: JSON.stringify(data)
    })
      .then(res => res.text())
      .then(response => {
        setSubmitted(p => ({ ...p, prayer: true }));
        setPrayerForm({ name: "", email: "", category: "", request: "" });
      })
      .catch(err => console.error(err));
  };

  // Mail-to function for Contact Form
  const handleContactSubmit = () => {
    const data = {
      name: contactForm.name,
      email: contactForm.email,
      subject: contactForm.subject,
      message: contactForm.message,
      type: "contact"
    };

    fetch("https://script.google.com/macros/s/AKfycbxBchOSKMVeOZYgIcGSKpfVLzAwXRxXlQ7H_lPi2LZMZNHfJBfi_fbCBCsVNTJCSQCcbg/exec", {
      method: "POST",
      body: JSON.stringify(data)
    })
      .then(res => res.text())
      .then(response => {
        setSubmitted(p => ({ ...p, contact: true }));
        setContactForm({ name: "", email: "", subject: "", message: "" });
      })
      .catch(err => console.error(err));
  };

  const gold = "#C9A84C";
  const goldLight = "#F5E6B8";
  const goldDark = "#8B6914";
  const cream = "#FFFDF5";
  const darkBg = "#1A1208";
  const textDark = "#2C1F00";

  const s = {
    app: {
      fontFamily: "'Cormorant Garamond','Georgia',serif",
      background: cream,
      minHeight: "100vh",
      color: textDark,
      maxWidth: "100%",
      overflowX: "hidden",
    },
    /* ── NAV ── */
    navWrapper: {
      background: darkBg,
      borderBottom: `1px solid ${goldDark}`,
      position: "sticky",
      top: 0,
      zIndex: 200,
    },
    navRow: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 clamp(1rem,3vw,2rem)",
      minHeight: 64,
    },
    logo: {
      color: gold,
      fontFamily: "'Playfair Display',Georgia,serif",
      fontSize: "clamp(16px,4.2vw,22px)",
      fontWeight: 700,
      letterSpacing: 1,
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: 10,
      whiteSpace: "nowrap",
    },
    desktopLinks: {
      display: "flex",
      gap: 4,
    },
    navLink: (isActive) => ({
      color: isActive ? gold : "#D4C5A0",
      background: isActive ? "rgba(201,168,76,0.12)" : "transparent",
      border: "none",
      cursor: "pointer",
      fontFamily: "inherit",
      fontSize: "clamp(14px,2.5vw,18px)",
      padding: "8px 12px",
      borderRadius: 6,
      transition: "all 0.2s",
      letterSpacing: 0.5,
      whiteSpace: "nowrap",
    }),
    menuBtn: {
      background: "none",
      border: "none",
      cursor: "pointer",
      color: gold,
      fontSize: 26,
      padding: "8px",
      minWidth: 44,
      minHeight: 44,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      lineHeight: 1,
    },
    /* animated mobile drawer */
    mobileDrawer: (open) => ({
      overflow: "hidden",
      maxHeight: open ? "400px" : "0px",
      transition: "max-height 0.35s cubic-bezier(0.4,0,0.2,1), opacity 0.3s ease",
      opacity: open ? 1 : 0,
    }),
    mobileInner: {
      display: "flex",
      flexDirection: "column",
      borderTop: `1px solid ${goldDark}`,
      padding: "0.5rem 0 0.75rem",
    },
    mobileNavLink: (isActive) => ({
      color: isActive ? gold : "#D4C5A0",
      background: isActive ? "rgba(201,168,76,0.12)" : "transparent",
      border: "none",
      cursor: "pointer",
      fontFamily: "inherit",
      fontSize: 18,
      padding: "13px 1.75rem",
      transition: "background 0.2s, color 0.2s",
      letterSpacing: 0.5,
      textAlign: "left",
      width: "100%",
    }),
    /* ── SECTION / HERO ── */
    section: { maxWidth: 1100, margin: "0 auto", padding: "clamp(2rem,6vw,4rem) clamp(1rem,3vw,2rem)" },
    heroSection: {
      background: `linear-gradient(160deg,${darkBg} 0%,#3D2B05 60%,#1A1208 100%)`,
      minHeight: "clamp(70vh,92vh,100vh)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      padding: "clamp(2rem,6vw,4rem) clamp(1rem,3vw,2rem)",
      position: "relative",
      overflow: "hidden",
    },
    heroTitle: {
      fontFamily: "'Playfair Display',Georgia,serif",
      fontSize: "clamp(28px,6vw,72px)",
      color: "#FFF8E7",
      fontWeight: 700,
      lineHeight: 1.1,
      marginBottom: 16,
      wordBreak: "break-word",
    },
    heroSub: {
      color: gold,
      fontSize: "clamp(12px,2.5vw,20px)",
      letterSpacing: "clamp(1px,2vw,4px)",
      textTransform: "uppercase",
      marginBottom: 24,
      fontFamily: "sans-serif",
      fontWeight: 300,
    },
    heroParagraph: { color: "#D4C5A0", fontSize: "clamp(14px,2vw,18px)", maxWidth: 560, lineHeight: 1.8, marginBottom: 40 },
    btn: {
      background: `linear-gradient(135deg,${gold},#E8C56A)`,
      color: darkBg,
      border: "none",
      padding: "clamp(10px,2vw,14px) clamp(24px,4vw,36px)",
      borderRadius: 4,
      fontSize: "clamp(13px,2vw,16px)",
      fontWeight: 700,
      cursor: "pointer",
      letterSpacing: 1,
      fontFamily: "sans-serif",
      transition: "all 0.2s",
      minHeight: 44,
    },
    btnOutline: {
      background: "transparent",
      color: gold,
      border: `1.5px solid ${gold}`,
      padding: "clamp(10px,2vw,13px) clamp(24px,4vw,36px)",
      borderRadius: 4,
      fontSize: "clamp(13px,2vw,16px)",
      cursor: "pointer",
      fontFamily: "sans-serif",
      letterSpacing: 1,
      transition: "all 0.2s",
      minHeight: 44,
    },
    sectionTitle: {
      fontFamily: "'Playfair Display',Georgia,serif",
      fontSize: "clamp(24px,5vw,52px)",
      color: textDark,
      marginBottom: 8,
      fontWeight: 700,
      wordBreak: "break-word",
    },
    goldDivider: {
      width: 60,
      height: 3,
      background: `linear-gradient(90deg,${gold},#E8C56A)`,
      margin: "12px auto 32px",
      borderRadius: 2,
    },
    verseBox: {
      background: `linear-gradient(135deg,${darkBg},#3D2B05)`,
      border: `1px solid ${goldDark}`,
      borderRadius: 16,
      padding: "clamp(1.5rem,4vw,3rem) clamp(1rem,3vw,2rem)",
      textAlign: "center",
      maxWidth: 700,
      margin: "0 auto",
    },
    input: {
      width: "100%",
      padding: "clamp(10px,1vw,12px) clamp(12px,2vw,16px)",
      border: `1px solid ${goldLight}`,
      borderRadius: 8,
      fontSize: "clamp(13px,2vw,15px)",
      fontFamily: "'Cormorant Garamond',Georgia,serif",
      background: "#FFFDF5",
      color: textDark,
      boxSizing: "border-box",
      outline: "none",
      minHeight: 44,
    },
    label: {
      fontSize: "clamp(11px,1.5vw,13px)",
      fontFamily: "sans-serif",
      color: "#7A5C1E",
      marginBottom: 6,
      display: "block",
      letterSpacing: 0.5,
      textTransform: "uppercase",
    },
    grid2: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "clamp(12px,2vw,24px)" },
    grid3: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: "clamp(12px,2vw,20px)" },
    amtBtn: (sel) => ({
      background: sel ? gold : "#FFF8E7",
      color: sel ? darkBg : goldDark,
      border: `1.5px solid ${sel ? gold : goldLight}`,
      padding: "clamp(8px,1.5vw,10px) clamp(16px,2vw,20px)",
      borderRadius: 8,
      cursor: "pointer",
      fontSize: "clamp(13px,2vw,16px)",
      fontFamily: "sans-serif",
      fontWeight: sel ? 700 : 400,
      transition: "all 0.2s",
    }),
    badge: {
      display: "inline-block",
      background: goldLight,
      color: goldDark,
      padding: "4px 14px",
      borderRadius: 20,
      fontSize: "clamp(11px,1.5vw,13px)",
      fontFamily: "sans-serif",
      letterSpacing: 0.5,
    },
    buttonGroup: { display: "flex", gap: "clamp(8px,2vw,16px)", flexWrap: "wrap", justifyContent: "center" },
  };

  /* ════════════════════ PAGES ════════════════════ */
  const pages = {

    /* ─────────── HOME ─────────── */
    Home: (
      <div>
        {/* Hero */}
        <div style={s.heroSection}>
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 30%,rgba(201,168,76,0.12) 0%,transparent 70%)", pointerEvents: "none" }} />
          <div style={{ fontSize: 64, marginBottom: 16, color: gold, opacity: 0.8 }}>✝</div>
          <div style={s.heroSub}>Welcome to</div>
          <h1 style={s.heroTitle}>Madagupatti Jesus<br />With Us Revival Church</h1>
          <p style={s.heroParagraph}>A place of worship, healing, prayer, and divine encounter. We believe in the transforming power of God's love for every soul.</p>
          <div style={s.buttonGroup}>
            <button style={s.btn} onClick={() => navigate("About")}>Discover Our Story</button>
            <button style={s.btnOutline} onClick={() => navigate("Prayer")}>Submit a Prayer</button>
          </div>
        </div>

        {/* Verse Ticker */}
        <div style={{ background: gold, padding: "14px 2rem", textAlign: "center" }}>
          <p style={{ color: darkBg, fontFamily: "'Playfair Display',serif", fontSize: 17, fontStyle: "italic", margin: 0 }}>
            "{VERSES[verseIdx].text}" — <strong>{VERSES[verseIdx].ref}</strong>
          </p>
        </div>

        {/* Services */}
        <div style={{ ...s.section, textAlign: "center" }}>
          <p style={s.heroSub}>Join Us</p>
          <h2 style={s.sectionTitle}>Service Times</h2>
          <div style={s.goldDivider} />
          <div style={s.grid3}>
            {SERVICES.map(sv => (
              <Card key={sv.day} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>🕊</div>
                <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 700, color: goldDark, marginBottom: 4 }}>{sv.day}</div>
                <div style={{ fontFamily: "sans-serif", color: gold, fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{sv.time}</div>
                <div style={s.badge}>{sv.label}</div>
              </Card>
            ))}
          </div>
        </div>

        {/* Verse Box */}
        <div style={{ background: "#F9F3E3", padding: "4rem 2rem" }}>
          <div style={s.verseBox}>
            <div style={{ color: gold, fontSize: 40, marginBottom: 12 }}>❝</div>
            <p style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(20px,4vw,30px)", color: "#FFF8E7", fontStyle: "italic", lineHeight: 1.6, marginBottom: 16 }}>
              {VERSES[verseIdx].text}
            </p>
            <p style={{ color: gold, fontFamily: "sans-serif", letterSpacing: 2, fontSize: 14, textTransform: "uppercase" }}>— {VERSES[verseIdx].ref}</p>
          </div>
        </div>

        {/* Latest Sermon */}
        <div style={{ ...s.section, background: "#F9F3E3", marginTop: "3rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "clamp(2rem,4vw,3rem)", alignItems: "center" }}>
            <div style={{ minWidth: 0 }}>
              <div style={{ ...s.heroSub, fontSize: 13 }}>Latest Message</div>
              <h2 style={{ ...s.sectionTitle, marginTop: 12 }}>The Power of <em style={{ fontStyle: "italic" }}>Unwavering Faith</em></h2>
              <p style={{ fontFamily: "sans-serif", color: "#5c4010", fontSize: "clamp(14px,2vw,16px)", lineHeight: 1.8, marginBottom: 24 }}>
                A powerful message unpacking what it truly means to walk in faith when circumstances seem impossible — rooted in Hebrews 11.
              </p>
              <button style={s.btn} onClick={() => window.open('https://www.youtube.com/@MadagupattichurchJWUR/videos', '_blank')}>🎬 Browse All Sermons</button>
            </div>
            <div style={{ display: "flex", justifyContent: "center", width: "100%", minWidth: 0 }}>
              <div style={{ display: "flex", justifyContent: "center", width: "100%", minWidth: 0 }}>
                <div
                  style={{
                    width: "100%",
                    maxWidth: 900,
                    paddingBottom: "56.25%",
                    position: "relative",
                    borderRadius: 16,
                    overflow: "hidden",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
                    background: "#000"
                  }}
                >

                  <iframe
                    width="100%"
                    height="315"
                    src="https://www.youtube.com/embed/FEeOVicwwmU?rel=0&modestbranding=1&vq=hd1080"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    loading="lazy"
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      border: "none",
                      borderRadius: 16
                    }}
                  />

                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mission */}
        <div style={s.section}>
          <div style={s.grid3}>
            {[
              { icon: "🙏", title: "Prayer", desc: "We believe in the power of united prayer and deliverance from sin and sickness through the name of Jesus." },
              { icon: "📖", title: "Word", desc: "Grounded in Scripture — each person must know Jesus Christ as Lord and Savior." },
              { icon: "🤝", title: "Community", desc: "A family that walks together, grows together, and serves together in Christ-centred love." },
            ].map(m => (
              <Card key={m.title} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 48, marginBottom: 12 }}>{m.icon}</div>
                <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 24, color: goldDark, marginBottom: 8 }}>{m.title}</div>
                <p style={{ color: "#6B5220", fontFamily: "sans-serif", fontSize: 15, lineHeight: 1.7, margin: 0 }}>{m.desc}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA with Carousel */}
        <div style={{ padding: "4rem 2rem" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "clamp(2rem,4vw,4rem)", alignItems: "center" }}>
            {/* Carousel */}
            <div style={{ position: "relative", width: "100%", paddingBottom: "100%", borderRadius: 12, overflow: "hidden", boxShadow: `0 16px 48px rgba(201,168,76,0.22)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <img
                src={CAROUSEL_IMAGES[carouselIdx]}
                alt="Church carousel"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center",
                  transition: "opacity 0.6s ease-in-out",
                  opacity: 1,
                }}
              />
              {/* Carousel controls */}
              <button
                onClick={() => setCarouselIdx(i => (i - 1 + CAROUSEL_IMAGES.length) % CAROUSEL_IMAGES.length)}
                style={{
                  position: "absolute",
                  left: "16px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "rgba(201,168,76,0.8)",
                  color: darkBg,
                  border: "none",
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  fontSize: 20,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 10,
                }}
                onMouseEnter={e => e.target.style.background = gold}
                onMouseLeave={e => e.target.style.background = "rgba(201,168,76,0.8)"}
              >
                ←
              </button>
              <button
                onClick={() => setCarouselIdx(i => (i + 1) % CAROUSEL_IMAGES.length)}
                style={{
                  position: "absolute",
                  right: "16px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "rgba(201,168,76,0.8)",
                  color: darkBg,
                  border: "none",
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  fontSize: 20,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 10,
                }}
                onMouseEnter={e => e.target.style.background = gold}
                onMouseLeave={e => e.target.style.background = "rgba(201,168,76,0.8)"}
              >
                →
              </button>
              {/* Carousel indicators */}
              <div style={{ position: "absolute", bottom: "16px", left: "50%", transform: "translateX(-50%)", display: "flex", gap: 8, alignItems: "center", justifyContent: "center", zIndex: 10 }}>
                {CAROUSEL_IMAGES.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCarouselIdx(idx)}
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: "50%",
                      border: "none",
                      cursor: "pointer",
                      background: idx === carouselIdx ? gold : "rgba(201,168,76,0.5)",
                      transition: "all 0.3s ease",
                      boxShadow: idx === carouselIdx ? `0 0 8px rgba(201,168,76,0.6)` : "none",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Text Content */}
            <div style={{ textAlign: "center" }}>
              <div style={{ color: gold, fontSize: 48, marginBottom: 12 }}>✝</div>
              <h2 style={{ fontFamily: "'Playfair Display',serif", color: "#5c4010", fontSize: "clamp(28px,5vw,48px)", marginBottom: 12 }}>You Are Welcome Here</h2>
              <p style={{ color: "#5c4010", fontFamily: "sans-serif", fontSize: 17, maxWidth: 480, margin: "0 auto 32px", lineHeight: 1.8 }}>
                No matter where you've been, you are loved. Come as you are.
              </p>
              <button style={s.btn} onClick={() => navigate("Contact")}>Plan Your Visit →</button>
            </div>
          </div>
        </div>
      </div>
    ),

    /* ─────────── ABOUT ─────────── */
    About: (
      <div>
        <div style={{
          backgroundImage: "linear-gradient(rgba(26,20,16,0.75),rgba(26,20,16,0.75)),url('https://images.unsplash.com/photo-1545987796-200677ee1011?w=1400&q=80')",
          backgroundSize: "cover", backgroundPosition: "center",
          padding: "6rem 2rem", color: "#FFF8E7", textAlign: "center",
        }}>
          <div style={{ maxWidth: 840, margin: "0 auto" }}>
            <div style={{ fontSize: 14, letterSpacing: 2, textTransform: "uppercase", color: goldLight, marginBottom: 12 }}>Our Story</div>
            <h1 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: "clamp(28px,5vw,56px)", margin: 0 }}>About Our Church</h1>
            <p style={{ fontFamily: "sans-serif", color: "#D4C5A0", fontSize: 18, lineHeight: 1.8, marginTop: 18 }}>
              Rooted in faith. Growing in grace. Reaching the world.
            </p>
          </div>
        </div>

        <div style={s.section}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "clamp(2rem,4vw,3rem)", alignItems: "center" }}>
            <img
              src="https://images.unsplash.com/photo-1514896856000-91cb6de818e0?w=800&q=80"
              alt="Church History"
              style={{
                width: "100%", height: "auto", minHeight: 300, objectFit: "cover", borderRadius: 20,
                boxShadow: "0 12px 40px rgba(201,168,76,0.18)", transition: "box-shadow 0.35s ease"
              }}
            />
            <div>
              <div style={{ fontSize: 13, textTransform: "uppercase", letterSpacing: 2, color: gold, marginBottom: 10 }}>Since 2019</div>
              <h2 style={{ ...s.sectionTitle, marginTop: 0 }}>Our History</h2>
              <p style={{ fontFamily: "sans-serif", color: "#5C4010", lineHeight: 1.8, marginBottom: 16, fontSize: "clamp(14px,2vw,16px)" }}>
                Madagupatti Jesus With Us Revival Church was founded in 2019 by Pr. Rajkumar. L and a small group of devoted believers with a burning vision — to see every person in Madagupatti and beyond come to know Jesus Christ as Lord and Saviour.
              </p>
              <p style={{ fontFamily: "sans-serif", color: "#5C4010", lineHeight: 1.8, marginBottom: 16, fontSize: "clamp(14px,2vw,16px)" }}>
                From humble beginnings, the church has grown into a Spirit-filled congregation committed to prayer, deliverance from sin and sickness, and raising disciples who impact their communities for Christ.
              </p>
              <p style={{ fontFamily: "sans-serif", color: "#8B6914", lineHeight: 1.8, fontSize: "clamp(14px,2vw,16px)" }}>
                Our story is not one of a great church, but of a great God working through ordinary people who dared to believe.
              </p>
            </div>
          </div>
        </div>

        {/* Mission & Vision */}
        <div style={{ ...s.section, background: cream }}>
          <div style={{ textAlign: "center", maxWidth: 760, margin: "0 auto 2rem" }}>
            <div style={{ ...s.heroSub, fontSize: 13 }}>Why We Exist</div>
            <h2 style={s.sectionTitle}>Mission & Vision</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 24 }}>
            <Card style={{ minHeight: 240 }}>
              <div style={{ fontSize: 34, marginBottom: 14 }}>🎯</div>
              <h3 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 24, marginBottom: 10, color: goldDark }}>Our Mission</h3>
              <p style={{ fontFamily: "sans-serif", color: "#5C4010", lineHeight: 1.8 }}>
                Prayer and deliverance from sin and sickness. Each person must know Jesus Christ — we exist to reach every soul with the saving power of the Gospel and to see lives transformed by His love.
              </p>
            </Card>
            <Card style={{ minHeight: 240 }}>
              <div style={{ fontSize: 34, marginBottom: 14 }}>👁️</div>
              <h3 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 24, marginBottom: 10, color: goldDark }}>Our Vision</h3>
              <p style={{ fontFamily: "sans-serif", color: "#5C4010", lineHeight: 1.8 }}>
                Christ-centred ministries — like Christ. We envision a church where every believer models the life of Jesus: serving sacrificially, praying fervently, and loving unconditionally.
              </p>
            </Card>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 16, marginTop: 24 }}>
            {[
              ["📖", "Scripture", "We believe the Bible is God's inspired Word, our ultimate authority in all matters of faith and life."],
              ["⛓️‍💥", "Deliverance", "We believe Jesus sets free — from sin, sickness, and every bondage. His power is the same yesterday, today, and forever."],
              ["🌍", "Mission", "Every believer is called. We equip and send disciples to reach every soul with the love and truth of Jesus Christ."],
            ].map(([emoji, title, desc]) => (
              <Card key={title} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 30, marginBottom: 12 }}>{emoji}</div>
                <h5 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 18, marginBottom: 10, color: goldDark }}>{title}</h5>
                <p style={{ fontFamily: "sans-serif", color: "#6B5220", fontSize: 14, lineHeight: 1.7, margin: 0 }}>{desc}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Pastors */}
        <div style={s.section}>
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <div style={{ ...s.heroSub, fontSize: 13 }}>Leadership</div>
            <h2 style={s.sectionTitle}>Meet Our Pastors</h2>
            <p style={{ fontFamily: "sans-serif", color: "#5C4010", lineHeight: 1.8, maxWidth: 720, margin: "0 auto" }}>
              Humble shepherds called to serve and equip the family of God.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24, maxWidth: 1200, margin: "0 auto 32px" }}>
            {TEAM.map(member => (
              <Card key={member.name} style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{
                  width: 150, height: 150, borderRadius: "8px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: 18, overflow: "hidden",
                }}>
                  <img src={member.image} alt={member.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 20, fontWeight: 700, color: goldDark, marginBottom: 6 }}>{member.name}</div>
                <div style={{ fontFamily: "sans-serif", color: gold, fontSize: 14, fontWeight: 700, marginBottom: 12 }}>{member.role}</div>
                <p style={{ fontFamily: "sans-serif", color: "#6B5220", fontSize: 14, lineHeight: 1.8, margin: 0 }}>
                  {member.description}
                </p>
              </Card>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24, maxWidth: 1200, margin: "0 auto" }}>
            <Card style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 24 }}>
              <div style={{
                width: 180, height: 180, borderRadius: "8px",
                display: "flex", alignItems: "center", justifyContent: "center",
                overflow: "hidden", flexShrink: 0,
              }}>
                <img src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=400&q=80" alt="Church Family" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div>
                <div style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 22, fontWeight: 700, color: goldDark, marginBottom: 12 }}>Our Church Family</div>
                <p style={{ fontFamily: "sans-serif", color: "#6B5220", fontSize: 14, lineHeight: 1.8, margin: 0 }}>
                  We are a family united in Christ, committed to prayer, deliverance, and reaching every soul with the Gospel. Together, we grow in grace and share the transforming love of Jesus with our community.
                </p>
              </div>
            </Card>
            <Card style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 24 }}>
              <div style={{
                width: 180, height: 180, borderRadius: "8px",
                display: "flex", alignItems: "center", justifyContent: "center",
                overflow: "hidden", flexShrink: 0,
              }}>
                <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&q=80" alt="Church Ministry" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div style={{ textAlign: "center", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <div style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 22, fontWeight: 700, color: goldDark, marginBottom: 12 }}>Our Ministry</div>
                <p style={{ fontFamily: "sans-serif", color: "#6B5220", fontSize: 14, lineHeight: 1.8, margin: 0 }}>
                  Through worship, prayer, and biblical teaching, we equip believers to live out their faith and impact their communities. Our commitment is to see lives transformed by the Gospel and God's kingdom advanced in Madagupatti.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    ),

    /* ─────────── PRAYER ─────────── */
    Prayer: (
      <div>
        <div style={{
          backgroundImage: "linear-gradient(rgba(26,20,16,0.8),rgba(26,20,16,0.8)),url('https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1400&q=80')",
          backgroundSize: "cover", backgroundPosition: "center",
          padding: "6rem 2rem", color: "#FFF8E7", textAlign: "center",
        }}>
          <div style={{ maxWidth: 840, margin: "0 auto" }}>
            <div style={{ fontSize: 14, letterSpacing: 2, textTransform: "uppercase", color: goldLight, marginBottom: 12 }}>We Pray Together</div>
            <h1 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: "clamp(38px,6vw,64px)", margin: "0 0 16px" }}>Prayer Requests</h1>
            <p style={{ fontFamily: "sans-serif", color: "#D4C5A0", fontSize: 18, lineHeight: 1.8, margin: 0 }}>
              Cast all your anxiety on Him, because He cares for you. — 1 Peter 5:7
            </p>
          </div>
        </div>

        <div style={s.section}>
          <div style={s.grid2}>
            <div>
              <div style={{ ...s.heroSub, fontSize: 13, marginBottom: 16 }}>Our Promise</div>
              <h2 style={{ ...s.sectionTitle, marginTop: 0, marginBottom: 16 }}>You Are Not Alone</h2>
              <p style={{ fontFamily: "sans-serif", color: "#5C4010", lineHeight: 1.8, marginBottom: 24, fontSize: "clamp(14px,2vw,16px)" }}>
                Our dedicated prayer team prays over every request submitted. We believe in the power of united prayer and stand with you in faith.
              </p>
              {[
                ["🛡️", "Confidential", "Your prayer request is treated with complete confidentiality by our trained prayer team."],
                ["⏱️", "Prayed Within 24 Hours", "Every request is prayed over by our team within one business day of submission."],
                ["💓", "Pastoral Follow-up", "For urgent needs, a pastor will reach out personally to offer support and prayer."],
              ].map(([icon, title, desc]) => (
                <div key={title} style={{ display: "flex", gap: 14, marginBottom: 20 }}>
                  <div style={{ fontSize: 24, minWidth: 32 }}>{icon}</div>
                  <div>
                    <h6 style={{ fontFamily: "sans-serif", fontWeight: 700, color: textDark, marginBottom: 4, marginTop: 0, fontSize: "clamp(13px,2vw,15px)" }}>{title}</h6>
                    <p style={{ fontFamily: "sans-serif", color: "#6B5220", fontSize: "clamp(12px,1.5vw,14px)", lineHeight: 1.6, margin: 0 }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {submitted.prayer ? (
              <Card style={{ textAlign: "center", padding: "4rem 2rem" }}>
                <div style={{ fontSize: 56, marginBottom: 16 }}>🙏</div>
                <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 28, color: goldDark, marginBottom: 12 }}>Prayer Received</h3>
                <p style={{ fontFamily: "sans-serif", color: "#5C4010", lineHeight: 1.8 }}>Your prayer request has been submitted. Our prayer team will intercede on your behalf.</p>
                <button style={{ ...s.btnOutline, marginTop: 24 }} onClick={() => setSubmitted(p => ({ ...p, prayer: false }))}>Submit Another</button>
              </Card>
            ) : (
              <Card>
                <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 28, color: textDark, marginBottom: 8 }}>Submit Your Request</h3>
                <p style={{ fontFamily: "sans-serif", color: "#6B5220", fontSize: 13, marginBottom: 24 }}>All fields marked * are required. Your privacy is respected.</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                  <div style={s.grid2}>
                    <div>
                      <label style={s.label}>Full Name *</label>
                      <input style={s.input} placeholder="Your name" value={prayerForm.name} onChange={e => setPrayerForm(f => ({ ...f, name: e.target.value }))} />
                    </div>
                    <div>
                      <label style={s.label}>Phone / Email</label>
                      <input style={s.input} placeholder="For pastoral follow-up" value={prayerForm.email} onChange={e => setPrayerForm(f => ({ ...f, email: e.target.value }))} />
                    </div>
                  </div>
                  <div>
                    <label style={s.label}>Prayer Category *</label>
                    <select style={{ ...s.input, fontFamily: "sans-serif", padding: "12px 16px" }} value={prayerForm.category} onChange={e => setPrayerForm(f => ({ ...f, category: e.target.value }))}>
                      <option value="">Select a category</option>
                      <option>Health & Healing</option>
                      <option>Deliverance</option>
                      <option>Family & Relationships</option>
                      <option>Finance & Work</option>
                      <option>Salvation for a Loved One</option>
                      <option>Spiritual Growth</option>
                      <option>Grief & Loss</option>
                      <option>Marriage</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label style={s.label}>Your Prayer Request *</label>
                    <textarea style={{ ...s.input, minHeight: 140, resize: "vertical", fontFamily: "sans-serif" }} placeholder="Share what's on your heart..." value={prayerForm.request} onChange={e => setPrayerForm(f => ({ ...f, request: e.target.value }))} />
                  </div>
                  <button style={{ ...s.btn, alignSelf: "flex-start" }} onClick={handlePrayerSubmit}>🙏 Submit Prayer Request</button>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    ),

    /* ─────────── CONTACT ─────────── */
    Contact: (
      <div>
        <div style={{
          backgroundImage: "linear-gradient(rgba(26,20,16,0.75),rgba(26,20,16,0.75)),url('https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1400&q=80')",
          backgroundSize: "cover", backgroundPosition: "center",
          padding: "6rem 2rem", color: "#FFF8E7", textAlign: "center",
        }}>
          <div style={{ maxWidth: 840, margin: "0 auto" }}>
            <div style={{ fontSize: 14, letterSpacing: 2, textTransform: "uppercase", color: goldLight, marginBottom: 12 }}>Get In Touch</div>
            <h1 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: "clamp(38px,6vw,64px)", margin: 0 }}>Contact Us</h1>
            <p style={{ fontFamily: "sans-serif", color: "#D4C5A0", fontSize: 18, lineHeight: 1.8, marginTop: 18 }}>
              We'd love to hear from you. Our team is here to help.
            </p>
          </div>
        </div>

        <div style={s.section}>
          <div style={s.grid2}>
            <div>
              <h3 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: "clamp(20px,4vw,28px)", color: textDark, marginBottom: 16 }}>Let's Connect</h3>
              <p style={{ fontFamily: "sans-serif", color: "#5C4010", fontSize: "clamp(14px,2vw,15px)", lineHeight: 1.8, marginBottom: 24 }}>
                Whether you have a question, need pastoral guidance, or just want to say hello — we're here for you.
              </p>
              {[
                ["📍", "Address", "1, Chokalinga Nagar, Madagupatti"],
                ["📞", "Phone", "8754758543"],
                ["📱", "Social Media", "MADAGUPATTI JESUS WITH US"],
                ["🕒", "Office Hours", "Mon – Fri: 9:00 AM – 5:00 PM\nSunday Service: 10:00 AM – 12:15 PM"],
              ].map(([icon, title, text]) => (
                <div key={title} style={{ marginBottom: 24 }}>
                  <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <div style={{ fontSize: 24, marginTop: 2 }}>{icon}</div>
                    <div>
                      <h6 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: "clamp(16px,2vw,18px)", color: goldDark, marginTop: 0, marginBottom: 6 }}>{title}</h6>
                      <p style={{ fontFamily: "sans-serif", color: "#6B5220", fontSize: "clamp(13px,1.5vw,14px)", lineHeight: 1.6, margin: 0, whiteSpace: "pre-line" }}>{text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {submitted.contact ? (
              <Card style={{ textAlign: "center", padding: "4rem 2rem" }}>
                <div style={{ fontSize: 56, marginBottom: 16 }}>✉️</div>
                <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 28, color: goldDark, marginBottom: 12 }}>Message Sent!</h3>
                <p style={{ fontFamily: "sans-serif", color: "#5C4010", lineHeight: 1.8 }}>We'll be in touch with you shortly. God bless you!</p>
                <button style={{ ...s.btnOutline, marginTop: 24 }} onClick={() => setSubmitted(p => ({ ...p, contact: false }))}>Send Another</button>
              </Card>
            ) : (
              <Card>
                <div style={{ ...s.heroSub, fontSize: 13, marginBottom: 8 }}>Send a Message</div>
                <h2 style={{ ...s.sectionTitle, marginTop: 0, marginBottom: 16 }}>How Can We Help?</h2>
                <p style={{ fontFamily: "sans-serif", color: "#6B5220", fontSize: 14, marginBottom: 24 }}>Our team will respond within 24–48 hours.</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                  <div style={s.grid2}>
                    <div>
                      <label style={s.label}>Full Name *</label>
                      <input style={s.input} placeholder="Your full name" value={contactForm.name} onChange={e => setContactForm(f => ({ ...f, name: e.target.value }))} />
                    </div>
                    <div>
                      <label style={s.label}>Phone / Email *</label>
                      <input style={s.input} placeholder="your@email.com or phone" value={contactForm.email} onChange={e => setContactForm(f => ({ ...f, email: e.target.value }))} />
                    </div>
                  </div>
                  <div>
                    <label style={s.label}>Subject *</label>
                    <input style={s.input} placeholder="What is this regarding?" value={contactForm.subject || ""} onChange={e => setContactForm(f => ({ ...f, subject: e.target.value }))} />
                  </div>
                  <div>
                    <label style={s.label}>Message *</label>
                    <textarea style={{ ...s.input, minHeight: 140, resize: "vertical", fontFamily: "sans-serif" }} placeholder="Tell us how we can help you..." value={contactForm.message} onChange={e => setContactForm(f => ({ ...f, message: e.target.value }))} />
                  </div>
                  <button style={s.btn} onClick={handleContactSubmit}>Send Message →</button>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    ),

    /* ─────────── DONATION ─────────── */
    Donation: (
      <div>
        {/* Hero — matches other pages */}
        <div style={{
          backgroundImage: "linear-gradient(rgba(26,18,8,0.82),rgba(26,18,8,0.82)),url('https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1400&q=80')",
          backgroundSize: "cover", backgroundPosition: "center",
          padding: "6rem 2rem", color: "#FFF8E7", textAlign: "center",
        }}>
          <div style={{ maxWidth: 840, margin: "0 auto" }}>
            <div style={{ fontSize: 14, letterSpacing: 2, textTransform: "uppercase", color: goldLight, marginBottom: 12, fontFamily: "sans-serif", fontWeight: 300 }}>
              Give Generously
            </div>
            <h1 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: "clamp(32px,5vw,56px)", margin: "0 0 16px", fontWeight: 700 }}>
              Support Our Ministry
            </h1>
            <p style={{ fontFamily: "sans-serif", color: "#D4C5A0", fontSize: 16, lineHeight: 1.8, margin: 0, fontStyle: "italic", maxWidth: 600, marginLeft: "auto", marginRight: "auto" }}>
              "Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver." — 2 Corinthians 9:7
            </p>
          </div>
        </div>

        <div style={{ ...s.section, maxWidth: 860 }}>
          {/* Section heading */}
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <p style={{ fontSize: 13, textTransform: "uppercase", letterSpacing: 2, color: gold, margin: "0 0 8px", fontFamily: "sans-serif", fontWeight: 300 }}>
              Donate
            </p>
            <h2 style={s.sectionTitle}>Ways to Give</h2>
            <div style={s.goldDivider} />
          </div>

          {/* Unified QR + Contact card */}
          <Card style={{ maxWidth: 460, margin: "0 auto 20px", textAlign: "center" }}>
            <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 700, color: goldDark, margin: "0 0 6px" }}>
              Scan to Give
            </h3>
            <p style={{ fontFamily: "sans-serif", fontSize: 14, color: "#7A5C1E", margin: "0 0 20px" }}>
              Use GPay or any UPI app to scan and donate
            </p>

            {/* QR code */}
            <div style={{ display: "inline-block", background: "#fff", padding: 14, border: `2px solid ${gold}`, borderRadius: 12 }}>
              <svg width="170" height="170" viewBox="0 0 180 180" xmlns="http://www.w3.org/2000/svg">
                <rect width={180} height={180} fill="white" />
                {/* Top-left finder */}
                <rect x={10} y={10} width={50} height={50} rx={4} fill={darkBg} />
                <rect x={18} y={18} width={34} height={34} rx={2} fill="white" />
                <rect x={24} y={24} width={22} height={22} rx={2} fill={darkBg} />
                {/* Top-right finder */}
                <rect x={120} y={10} width={50} height={50} rx={4} fill={darkBg} />
                <rect x={128} y={18} width={34} height={34} rx={2} fill="white" />
                <rect x={134} y={24} width={22} height={22} rx={2} fill={darkBg} />
                {/* Bottom-left finder */}
                <rect x={10} y={120} width={50} height={50} rx={4} fill={darkBg} />
                <rect x={18} y={128} width={34} height={34} rx={2} fill="white" />
                <rect x={24} y={134} width={22} height={22} rx={2} fill={darkBg} />
                {/* Data modules */}
                {[0, 1, 2, 3, 4, 5, 6, 7].map(row =>
                  [0, 1, 2, 3, 4, 5, 6, 7].map(col => {
                    const x = 72 + col * 8, y = 72 + row * 8;
                    const on = (row + col + row * col) % 3 !== 0;
                    return on ? <rect key={`${row}-${col}`} x={x} y={y} width={6} height={6} fill={darkBg} /> : null;
                  })
                )}
                {/* Border accents */}
                {[0, 1, 2, 3, 4].map(i => [
                  <rect key={`t${i}`} x={72 + i * 8} y={10} width={6} height={6} fill={i % 2 === 0 ? darkBg : gold} />,
                  <rect key={`b${i}`} x={72 + i * 8} y={164} width={6} height={6} fill={i % 2 === 0 ? darkBg : gold} />,
                  <rect key={`l${i}`} x={10} y={72 + i * 8} width={6} height={6} fill={i % 2 === 0 ? darkBg : gold} />,
                  <rect key={`r${i}`} x={164} y={72 + i * 8} width={6} height={6} fill={i % 2 === 0 ? darkBg : gold} />,
                ])}
                <circle cx={90} cy={90} r={13} fill="white" />
                <text x={90} y={96} textAnchor="middle" fontSize={17} fill={gold}>✝</text>
              </svg>
            </div>

            <p style={{ fontFamily: "sans-serif", fontSize: 12, color: "#8B6914", margin: "12px 0 0", letterSpacing: 0.5, textTransform: "uppercase", lineHeight: 1.6 }}>
              Madagupatti Jesus With Us Revival Church<br />
              UPI · GPay · PhonePe · Paytm
            </p>

            {/* Divider */}
            <div style={{ borderTop: `1px solid ${goldLight}`, margin: "20px 0" }} />

            {/* Contact & Location — inside same card */}
            <div style={{ textAlign: "left" }}>
              <p style={{ fontFamily: "'Playfair Display',serif", fontSize: 18, fontWeight: 700, color: goldDark, margin: "0 0 12px" }}>
                Contact &amp; Location
              </p>
              {[
                ["Phone", "87547 58543"],
                ["Address", "1, Chokalinga Nagar, Madagupatti"],
              ].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", borderBottom: `0.5px solid ${goldLight}66`, padding: "10px 0", gap: 12 }}>
                  <span style={{ fontFamily: "sans-serif", fontSize: 13, color: "#7A5C1E" }}>{k}</span>
                  <span style={{ fontFamily: "sans-serif", fontSize: 14, fontWeight: 700, color: goldDark, textAlign: "right" }}>{v}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Impact grid card */}
          <Card style={{ maxWidth: 460, margin: "0 auto" }}>
            <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 20, color: goldDark, margin: "0 0 16px", textAlign: "center", fontWeight: 700 }}>
              Your Giving Makes a Difference
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(90px, 1fr))", gap: 10 }}>
              {[
                ["₹100", "Feeds a family in need"],
                ["₹200", "Funds youth programs"],
                ["₹500", "Supports outreach mission"],
                ["₹2000", "Builds the Kingdom"],
              ].map(([amt, desc]) => (
                <div key={amt} style={{ background: goldLight, borderRadius: 10, padding: "14px 10px", textAlign: "center", border: `0.5px solid ${goldLight}44` }}>
                  <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 700, color: goldDark }}>{amt}</div>
                  <div style={{ fontFamily: "sans-serif", fontSize: 12, color: "#6B5220", marginTop: 4, lineHeight: 1.5 }}>{desc}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    ),
  };

  /* ════════════════════ RENDER ════════════════════ */
  return (
    <div style={s.app}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet" />

      {/* ── NAV ── */}
      <div style={s.navWrapper}>
        {/* top row: logo + hamburger / desktop links */}
        <div style={s.navRow}>
          <div style={s.logo} onClick={() => navigate("Home")}>
            <span style={{ fontSize: 28, color: gold }}>✝</span>
            <span>Madagupatti Jesus With Us</span>
          </div>

          {isDesktop ? (
            <div style={s.desktopLinks}>
              {NAV_LINKS.map(link => (
                <button key={link} style={s.navLink(active === link)} onClick={() => navigate(link)}>{link}</button>
              ))}
            </div>
          ) : (
            <button
              style={s.menuBtn}
              onClick={() => setMobileMenuOpen(o => !o)}
              aria-label="Toggle navigation"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? "✕" : "☰"}
            </button>
          )}
        </div>

        {/* animated mobile drawer — always rendered, height animated */}
        {!isDesktop && (
          <div style={s.mobileDrawer(mobileMenuOpen)} aria-hidden={!mobileMenuOpen}>
            <div style={s.mobileInner}>
              {NAV_LINKS.map(link => (
                <button
                  key={link}
                  style={s.mobileNavLink(active === link)}
                  onClick={() => navigate(link)}
                  tabIndex={mobileMenuOpen ? 0 : -1}
                >
                  {link}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <main>{pages[active]}</main>

      {/* ── FOOTER ── */}
      <footer style={{ background: darkBg, borderTop: `1px solid ${goldDark}`, padding: "clamp(2rem,4vw,3rem) clamp(1rem,3vw,2rem)", textAlign: "center" }}>
        <div style={{ color: gold, fontSize: "clamp(28px,6vw,36px)", marginBottom: 8 }}>✝</div>
        <div style={{ fontFamily: "'Playfair Display',serif", color: goldLight, fontSize: "clamp(16px,3vw,20px)", marginBottom: 4 }}>Madagupatti Jesus With Us Revival Church</div>
        <div style={{ fontFamily: "sans-serif", color: "#8B6914", fontSize: "clamp(12px,2vw,14px)", marginBottom: 4 }}>1, Chokalinga Nagar, Madagupatti</div>
        <div style={{ fontFamily: "sans-serif", color: "#8B6914", fontSize: "clamp(12px,2vw,14px)", marginBottom: 16 }}>📞 8754758543 · 📱 MADAGUPATTI JESUS WITH US</div>
        <div style={{ display: "flex", justifyContent: "center", gap: "clamp(8px,2vw,16px)", flexWrap: "wrap" }}>
          {NAV_LINKS.map(l => (
            <span key={l} style={{ color: "#B8A578", fontFamily: "sans-serif", fontSize: "clamp(11px,1.5vw,13px)", cursor: "pointer" }} onClick={() => navigate(l)}>{l}</span>
          ))}
        </div>
        <div style={{ borderTop: `0.5px solid ${goldDark}`, marginTop: 24, paddingTop: 16, color: "#5C4010", fontFamily: "sans-serif", fontSize: "clamp(10px,1.5vw,12px)", lineHeight: 1.6 }}>
          © 2025 Madagupatti Jesus With Us Revival Church. All rights reserved. Built with ❤️ to the glory of God.
        </div>
      </footer>
    </div>
  );
}