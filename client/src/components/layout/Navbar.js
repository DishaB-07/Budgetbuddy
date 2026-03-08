import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

const NAV_ITEMS = [
  { id: "dashboard",    icon: "⬡", label: "Dashboard"    },
  { id: "transactions", icon: "⇆", label: "Transactions" },
  { id: "budgets",      icon: "₹ ", label: "Budgets"      },
  { id: "analytics",   icon: "↪", label: "Analytics"    },
];

// ── Cute wallet mascot logo ────────────────────────────────────────────────────
const BudgetBuddyLogo = ({ size = 38 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Money bills sticking out top */}
    <rect x="24" y="10" width="16" height="20" rx="3" fill="#86efac" transform="rotate(-14 24 10)" stroke="#15803d" strokeWidth="1.2"/>
    <rect x="38" y="6"  width="16" height="20" rx="3" fill="#4ade80" transform="rotate(2 38 6)"   stroke="#15803d" strokeWidth="1.2"/>
    <rect x="54" y="9"  width="16" height="20" rx="3" fill="#86efac" transform="rotate(16 54 9)"  stroke="#15803d" strokeWidth="1.2"/>
    {/* Gold coin */}
    <circle cx="30" cy="26" r="9" fill="#fbbf24" stroke="#d97706" strokeWidth="1.8"/>
    <text x="30" y="31" textAnchor="middle" fontSize="9" fontWeight="900" fill="#92400e">₹</text>
    {/* Wallet body */}
    <rect x="12" y="24" width="66" height="58" rx="11" fill="url(#wg)"/>
    <rect x="12" y="24" width="66" height="58" rx="11" fill="none" stroke="#15803d" strokeWidth="2.5"/>
    {/* Wallet side clasp */}
    <rect x="72" y="36" width="9" height="26" rx="4.5" fill="#16a34a" stroke="#15803d" strokeWidth="1.8"/>
    {/* Inner card line detail */}
    <rect x="20" y="32" width="50" height="6" rx="3" fill="rgba(255,255,255,0.25)"/>
    {/* LEFT EYE — glass circle */}
    <circle cx="37" cy="54" r="11" fill="white" stroke="#111" strokeWidth="2.2"/>
    <circle cx="39" cy="52" r="5.5" fill="#111"/>
    <circle cx="41" cy="50" r="2" fill="white"/>
    {/* RIGHT EYE — glass circle */}
    <circle cx="63" cy="54" r="11" fill="white" stroke="#111" strokeWidth="2.2"/>
    <circle cx="65" cy="52" r="5.5" fill="#111"/>
    <circle cx="67" cy="50" r="2" fill="white"/>
    {/* Glasses bridge */}
    <path d="M48 54 Q50 51 52 54" stroke="#111" strokeWidth="2" fill="none" strokeLinecap="round"/>
    {/* Glasses left arm */}
    <line x1="12" y1="50" x2="26" y2="54" stroke="#111" strokeWidth="2" strokeLinecap="round"/>
    {/* Glasses right arm */}
    <line x1="74" y1="54" x2="87" y2="50" stroke="#111" strokeWidth="2" strokeLinecap="round"/>
    {/* Smile */}
    <path d="M40 70 Q50 80 60 70" stroke="#111" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
    {/* Tongue */}
    <ellipse cx="50" cy="73" rx="7" ry="4.5" fill="#f87171"/>
    <ellipse cx="50" cy="71" rx="6.5" ry="3" fill="#fb923c"/>
    {/* Cheek blush left */}
    <ellipse cx="28" cy="67" rx="5" ry="3" fill="#fca5a5" opacity="0.6"/>
    {/* Cheek blush right */}
    <ellipse cx="72" cy="67" rx="5" ry="3" fill="#fca5a5" opacity="0.6"/>
    {/* Sparkle top-left */}
    <path d="M4 28 L5.5 22 L7 28 L13 29.5 L7 31 L5.5 37 L4 31 L-2 29.5 Z" fill="#fbbf24"/>
    {/* Sparkle top-right */}
    <path d="M92 18 L93 14 L94 18 L98 19 L94 20 L93 24 L92 20 L88 19 Z" fill="#34d399"/>
    {/* Sparkle right */}
    <path d="M96 60 L97 57 L98 60 L101 61 L98 62 L97 65 L96 62 L93 61 Z" fill="#fbbf24"/>
    <defs>
      <linearGradient id="wg" x1="12" y1="24" x2="78" y2="82" gradientUnits="userSpaceOnUse">
        <stop offset="0%"   stopColor="#4ade80"/>
        <stop offset="100%" stopColor="#16a34a"/>
      </linearGradient>
    </defs>
  </svg>
);

const Navbar = ({ tab, setTab, filterMonth, setFilterMonth }) => {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <style>{`
        .bb-nav-desktop { display: flex; }
        .bb-nav-mobile  { display: none; }
        @media (max-width: 768px) {
          .bb-nav-desktop { display: none !important; }
          .bb-nav-mobile  { display: flex !important; }
        }
      `}</style>

      <header style={{
        background: "rgba(255,255,255,0.93)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(219,234,254,0.8)",
        padding: "0 20px",
        height: 64,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        zIndex: 100,
        boxShadow: "0 1px 24px rgba(30,58,138,0.07)",
      }}>

        {/* Logo */}
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <BudgetBuddyLogo size={42} />
          <div style={{ display:"flex", flexDirection:"column", lineHeight:1.1 }}>
            <span style={{ display:"flex", alignItems:"baseline", gap:0 }}>
              <span style={{ fontWeight:900, fontSize:16, color:"#16a34a", letterSpacing:"-0.04em", fontFamily:"'Plus Jakarta Sans',sans-serif" }}>Budget</span>
              <span style={{ fontWeight:900, fontSize:16, color:"#0f172a", letterSpacing:"-0.04em", fontFamily:"'Plus Jakarta Sans',sans-serif" }}>Buddy</span>
            </span>
            <span style={{ fontSize:9, fontWeight:700, color:"#94a3b8", letterSpacing:"0.08em", textTransform:"uppercase", fontFamily:"'Plus Jakarta Sans',sans-serif" }}>Finance Manager</span>
          </div>
        </div>

        {/* Desktop nav */}
        <nav className="bb-nav-desktop" style={{ gap:2, background:"#f0fdf4", borderRadius:14, padding:4 }}>
          {NAV_ITEMS.map(n => (
            <button key={n.id} onClick={() => setTab(n.id)} style={{
              padding:"7px 16px", borderRadius:10, border:"none", cursor:"pointer",
              fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:600, fontSize:13,
              background: tab===n.id ? "#fff" : "transparent",
              color: tab===n.id ? "#16a34a" : "#64748b",
              boxShadow: tab===n.id ? "0 2px 8px rgba(22,163,74,0.15)" : "none",
              transition:"all 0.18s", display:"flex", alignItems:"center", gap:5,
            }}>{n.icon} {n.label}</button>
          ))}
        </nav>

        {/* Desktop right */}
        <div className="bb-nav-desktop" style={{ alignItems:"center", gap:10 }}>
          <input type="month" value={filterMonth} onChange={e=>setFilterMonth(e.target.value)} style={{
            padding:"6px 11px", borderRadius:10, border:"1.5px solid #bbf7d0",
            fontSize:13, fontFamily:"'Plus Jakarta Sans',sans-serif",
            background:"#f0fdf4", color:"#15803d", fontWeight:600, cursor:"pointer", outline:"none",
          }}/>
          <div style={{ width:32, height:32, borderRadius:"50%", background:"linear-gradient(135deg,#16a34a,#15803d)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, fontWeight:700, color:"#fff", boxShadow:"0 2px 8px rgba(22,163,74,0.3)", flexShrink:0 }}>
            {user?.name?.[0]?.toUpperCase()||"U"}
          </div>
          <button onClick={logout} style={{ background:"#f0fdf4", border:"1.5px solid #bbf7d0", borderRadius:9, padding:"5px 13px", fontSize:12, fontWeight:700, color:"#15803d", cursor:"pointer", fontFamily:"'Plus Jakarta Sans',sans-serif" }}>Logout</button>
        </div>

        {/* Mobile right */}
        <div className="bb-nav-mobile" style={{ alignItems:"center", gap:8 }}>
          <input type="month" value={filterMonth} onChange={e=>setFilterMonth(e.target.value)} style={{
            padding:"5px 8px", borderRadius:9, border:"1.5px solid #bbf7d0",
            fontSize:12, fontFamily:"'Plus Jakarta Sans',sans-serif",
            background:"#f0fdf4", color:"#15803d", fontWeight:600, cursor:"pointer", outline:"none", maxWidth:130,
          }}/>
          <button onClick={()=>setMenuOpen(o=>!o)} style={{ background:"#f0fdf4", border:"1.5px solid #bbf7d0", borderRadius:9, padding:"6px 10px", fontSize:18, cursor:"pointer", color:"#15803d", lineHeight:1 }}>
            {menuOpen?"✕":"☰"}
          </button>
        </div>
      </header>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div style={{
          position:"fixed", top:64, left:0, right:0, zIndex:99,
          background:"rgba(255,255,255,0.97)", backdropFilter:"blur(16px)",
          borderBottom:"1px solid #bbf7d0",
          boxShadow:"0 8px 32px rgba(22,163,74,0.1)",
          padding:"12px 16px 16px",
        }}>
          {NAV_ITEMS.map(n=>(
            <button key={n.id} onClick={()=>{setTab(n.id);setMenuOpen(false);}} style={{
              width:"100%", padding:"13px 16px", borderRadius:12, border:"none", cursor:"pointer",
              fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:700, fontSize:14,
              background: tab===n.id ? "#f0fdf4" : "transparent",
              color: tab===n.id ? "#16a34a" : "#374151",
              marginBottom:4, textAlign:"left", display:"flex", alignItems:"center", gap:10,
              borderLeft: tab===n.id ? "3px solid #16a34a" : "3px solid transparent",
            }}>{n.icon} {n.label}</button>
          ))}
          <div style={{ borderTop:"1px solid #e2e8f0", marginTop:8, paddingTop:12, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
            <span style={{ fontSize:13, fontWeight:600, color:"#374151", fontFamily:"'Plus Jakarta Sans',sans-serif" }}>{user?.name||"User"}</span>
            <button onClick={()=>{logout();setMenuOpen(false);}} style={{ background:"#fff1f2", border:"1.5px solid #fecdd3", borderRadius:9, padding:"6px 16px", fontSize:12, fontWeight:700, color:"#be123c", cursor:"pointer", fontFamily:"'Plus Jakarta Sans',sans-serif" }}>Logout</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
