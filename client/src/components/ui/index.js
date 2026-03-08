export const Card = ({ children, style={}, gradient=false }) => (
  <div style={{
    background: gradient ? gradient : "#fff",
    borderRadius: 22,
    boxShadow: "0 4px 6px rgba(0,0,0,0.04), 0 12px 40px rgba(99,102,241,0.08)",
    padding: "22px 24px",
    border: "1.5px solid rgba(255,255,255,0.9)",
    backdropFilter: "blur(10px)",
    transition: "transform 0.2s, box-shadow 0.2s",
    ...style,
  }}
  onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow="0 8px 8px rgba(0,0,0,0.04),0 20px 50px rgba(99,102,241,0.13)"}}
  onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="0 4px 6px rgba(0,0,0,0.04),0 12px 40px rgba(99,102,241,0.08)"}}>
    {children}
  </div>
);

export const Input = ({ label, error, ...props }) => (
  <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
    {label && <label style={{ fontSize:11, fontWeight:700, color:"#6366f1", letterSpacing:"0.08em", textTransform:"uppercase" }}>{label}</label>}
    <input {...props} style={{
      padding:"11px 14px", borderRadius:12,
      border:`1.5px solid ${error?"#f87171":"#e0e7ff"}`,
      fontSize:14, outline:"none",
      fontFamily:"'Plus Jakarta Sans',sans-serif",
      background:"#f8f9ff", color:"#1e1b4b",
      transition:"all 0.2s", width:"100%", boxSizing:"border-box",
      ...(props.style||{}),
    }}
    onFocus={e=>{ e.target.style.borderColor="#818cf8"; e.target.style.boxShadow="0 0 0 4px rgba(129,140,248,0.15)"; e.target.style.background="#fff"; }}
    onBlur={e=>{  e.target.style.borderColor=error?"#f87171":"#e0e7ff"; e.target.style.boxShadow="none"; e.target.style.background="#f8f9ff"; }}
    />
    {error && <span style={{ fontSize:12, color:"#ef4444", fontWeight:600 }}>{error}</span>}
  </div>
);

export const Select = ({ label, children, ...props }) => (
  <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
    {label && <label style={{ fontSize:11, fontWeight:700, color:"#6366f1", letterSpacing:"0.08em", textTransform:"uppercase" }}>{label}</label>}
    <select {...props} style={{
      padding:"11px 14px", borderRadius:12, border:"1.5px solid #e0e7ff",
      fontSize:14, fontFamily:"'Plus Jakarta Sans',sans-serif",
      background:"#f8f9ff", color:"#1e1b4b", outline:"none", cursor:"pointer",
      width:"100%", boxSizing:"border-box", ...(props.style||{}),
    }}>{children}</select>
  </div>
);

export const Button = ({ variant="primary", size="md", children, ...props }) => {
  const v = {
    primary: { background:"linear-gradient(135deg,#6366f1 0%,#8b5cf6 100%)", color:"#fff", border:"none", boxShadow:"0 4px 15px rgba(99,102,241,0.45)" },
    success: { background:"linear-gradient(135deg,#10b981,#059669)", color:"#fff", border:"none", boxShadow:"0 4px 15px rgba(16,185,129,0.4)" },
    danger:  { background:"#fff0f0", color:"#ef4444", border:"1.5px solid #fecaca", boxShadow:"none" },
    ghost:   { background:"rgba(99,102,241,0.08)", color:"#6366f1", border:"1.5px solid #c7d2fe", boxShadow:"none" },
    neutral: { background:"#f1f5f9", color:"#475569", border:"none", boxShadow:"none" },
  };
  const s = {
    sm: { padding:"6px 14px", fontSize:12, borderRadius:10 },
    md: { padding:"10px 24px", fontSize:14, borderRadius:13 },
    lg: { padding:"13px 32px", fontSize:15, borderRadius:14 },
  };
  return (
    <button {...props} style={{
      fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:700,
      cursor:"pointer", transition:"all 0.18s", whiteSpace:"nowrap",
      letterSpacing:"-0.01em", ...v[variant||"primary"], ...s[size||"md"], ...(props.style||{}),
    }}
    onMouseEnter={e=>{ e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.filter="brightness(1.08)"; }}
    onMouseLeave={e=>{ e.currentTarget.style.transform="none"; e.currentTarget.style.filter="none"; }}>
      {children}
    </button>
  );
};

export const Modal = ({ title, onClose, children, width=500 }) => (
  <div style={{ position:"fixed", inset:0, background:"rgba(15,12,41,0.65)", zIndex:200, display:"flex", alignItems:"center", justifyContent:"center", padding:16, backdropFilter:"blur(12px)" }}
    onClick={e=>e.target===e.currentTarget&&onClose()}>
    <div style={{ background:"linear-gradient(160deg,#fff 0%,#f8f9ff 100%)", borderRadius:26, padding:"32px 30px 26px", width:"100%", maxWidth:width, boxShadow:"0 40px 100px rgba(99,102,241,0.25), 0 0 0 1px rgba(99,102,241,0.1)", animation:"bbSlideUp 0.25s cubic-bezier(.4,0,.2,1)" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:24 }}>
        <h3 style={{ margin:0, fontSize:20, fontWeight:800, color:"#1e1b4b", letterSpacing:"-0.04em", fontFamily:"'Plus Jakarta Sans',sans-serif" }}>{title}</h3>
        <button onClick={onClose} style={{ background:"#f0f4ff", border:"none", borderRadius:10, width:34, height:34, cursor:"pointer", fontSize:20, color:"#6366f1", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700 }}>×</button>
      </div>
      {children}
    </div>
  </div>
);

export const Spinner = ({ size=28, color="#6366f1" }) => (
  <div style={{ width:size, height:size, border:`3px solid ${color}22`, borderTop:`3px solid ${color}`, borderRadius:"50%", animation:"bbSpin 0.7s linear infinite" }}/>
);

export const Badge = ({ color="#6366f1", children }) => (
  <span style={{ background:color+"15", color, fontSize:11, fontWeight:700, padding:"4px 11px", borderRadius:20, border:`1.5px solid ${color}30`, whiteSpace:"nowrap", fontFamily:"'Plus Jakarta Sans',sans-serif" }}>{children}</span>
);

export const Tag = ({ type }) => (
  <span style={{
    fontSize:10, fontWeight:800, letterSpacing:"0.07em", padding:"4px 11px", borderRadius:20, textTransform:"uppercase", fontFamily:"'Plus Jakarta Sans',sans-serif",
    background: type==="income" ? "linear-gradient(135deg,#d1fae5,#a7f3d0)" : "linear-gradient(135deg,#fee2e2,#fecaca)",
    color:       type==="income" ? "#059669" : "#dc2626",
    border:      `1.5px solid ${type==="income"?"#6ee7b7":"#fca5a5"}`,
    boxShadow:   `0 2px 6px ${type==="income"?"rgba(16,185,129,0.2)":"rgba(239,68,68,0.2)"}`,
  }}>{type}</span>
);

export const ProgressBar = ({ pct, color="#6366f1", height=9 }) => (
  <div style={{ height, background:"#e0e7ff", borderRadius:99, overflow:"hidden", boxShadow:"inset 0 1px 3px rgba(0,0,0,0.06)" }}>
    <div style={{
      height:"100%", width:`${Math.min(pct,100)}%`,
      background: pct>100 ? "linear-gradient(90deg,#ef4444,#dc2626)" : pct>80 ? "linear-gradient(90deg,#f97316,#fb923c)" : `linear-gradient(90deg,${color},${color}99)`,
      borderRadius:99, transition:"width 0.7s cubic-bezier(.4,0,.2,1)",
      boxShadow: `0 0 10px ${pct>100?"rgba(239,68,68,0.6)":color+"88"}`,
    }}/>
  </div>
);