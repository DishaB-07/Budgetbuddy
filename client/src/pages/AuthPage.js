import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Spinner } from "../components/ui";

const AuthPage = () => {
  const { login, register } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm]       = useState({ name:"", email:"", password:"" });
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");

  const handleSubmit = async () => {
    setError("");
    if (!form.email||!form.password) return setError("Email and password required.");
    if (!isLogin&&!form.name)         return setError("Name is required.");
    setLoading(true);
    try {
      isLogin ? await login(form.email,form.password) : await register(form.name,form.email,form.password);
    } catch(err) { setError(err.response?.data?.message||"Something went wrong."); }
    finally { setLoading(false); }
  };

  return (
    <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", padding:16, position:"relative", overflow:"hidden",
      background:"linear-gradient(145deg,#0f0c29 0%,#302b63 40%,#24243e 70%,#0f3460 100%)" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@500;700&display=swap');
        @keyframes bbSlideUp{from{opacity:0;transform:translateY(32px)}to{opacity:1;transform:translateY(0)}}
        @keyframes bbSpin{to{transform:rotate(360deg)}}
        @keyframes float1{0%,100%{transform:translateY(0) scale(1)}50%{transform:translateY(-20px) scale(1.05)}}
        @keyframes float2{0%,100%{transform:translateY(0) scale(1)}50%{transform:translateY(15px) scale(0.97)}}
        *{box-sizing:border-box} input:focus{outline:none}
      `}</style>

      {/* Animated glowing orbs */}
      <div style={{ position:"absolute", top:"10%", left:"8%", width:320, height:320, borderRadius:"50%", background:"radial-gradient(circle,rgba(99,102,241,0.35),transparent 70%)", animation:"float1 7s ease-in-out infinite", pointerEvents:"none" }}/>
      <div style={{ position:"absolute", bottom:"10%", right:"8%", width:280, height:280, borderRadius:"50%", background:"radial-gradient(circle,rgba(139,92,246,0.3),transparent 70%)", animation:"float2 9s ease-in-out infinite", pointerEvents:"none" }}/>
      <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:500, height:500, borderRadius:"50%", background:"radial-gradient(circle,rgba(251,191,36,0.07),transparent 70%)", pointerEvents:"none" }}/>
      <div style={{ position:"absolute", top:"20%", right:"20%", width:180, height:180, borderRadius:"50%", background:"radial-gradient(circle,rgba(16,185,129,0.2),transparent 70%)", animation:"float1 11s ease-in-out infinite", pointerEvents:"none" }}/>

      {/* Card */}
      <div style={{ background:"rgba(255,255,255,0.06)", backdropFilter:"blur(30px)", borderRadius:28, padding:"clamp(28px,5vw,48px) clamp(24px,5vw,44px)", width:"100%", maxWidth:440, border:"1px solid rgba(255,255,255,0.15)", boxShadow:"0 40px 100px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)", animation:"bbSlideUp 0.4s cubic-bezier(.4,0,.2,1)" }}>

        {/* Logo */}
        <div style={{ textAlign:"center", marginBottom:32 }}>
          <div style={{ display:"inline-flex", alignItems:"center", justifyContent:"center", width:72, height:72, borderRadius:22, background:"linear-gradient(135deg,#16a34a,#15803d)", boxShadow:"0 12px 40px rgba(22,163,74,0.5), 0 0 0 4px rgba(22,163,74,0.15)", marginBottom:16 }}>
            <svg width="42" height="42" viewBox="0 0 100 100" fill="none">
              <rect x="24" y="10" width="16" height="20" rx="3" fill="#86efac" transform="rotate(-14 24 10)" stroke="#15803d" strokeWidth="1.2"/>
              <rect x="38" y="6"  width="16" height="20" rx="3" fill="#4ade80" transform="rotate(2 38 6)"   stroke="#15803d" strokeWidth="1.2"/>
              <rect x="54" y="9"  width="16" height="20" rx="3" fill="#86efac" transform="rotate(16 54 9)"  stroke="#15803d" strokeWidth="1.2"/>
              <circle cx="30" cy="26" r="9" fill="#fbbf24" stroke="#d97706" strokeWidth="1.8"/>
              <text x="30" y="31" textAnchor="middle" fontSize="9" fontWeight="900" fill="#92400e">₹</text>
              <rect x="12" y="24" width="66" height="58" rx="11" fill="url(#awg2)"/>
              <rect x="12" y="24" width="66" height="58" rx="11" fill="none" stroke="#15803d" strokeWidth="2.5"/>
              <rect x="72" y="36" width="9" height="26" rx="4.5" fill="#16a34a" stroke="#59da88" strokeWidth="1.8"/>
              <circle cx="37" cy="54" r="11" fill="white" stroke="#111" strokeWidth="2.2"/>
              <circle cx="39" cy="52" r="5.5" fill="#111"/>
              <circle cx="41" cy="50" r="2" fill="white"/>
              <circle cx="63" cy="54" r="11" fill="white" stroke="#111" strokeWidth="2.2"/>
              <circle cx="65" cy="52" r="5.5" fill="#111"/>
              <circle cx="67" cy="50" r="2" fill="white"/>
              <path d="M48 54 Q50 51 52 54" stroke="#111" strokeWidth="2" fill="none" strokeLinecap="round"/>
              <line x1="12" y1="50" x2="26" y2="54" stroke="#111" strokeWidth="2" strokeLinecap="round"/>
              <line x1="74" y1="54" x2="87" y2="50" stroke="#111" strokeWidth="2" strokeLinecap="round"/>
              <path d="M40 70 Q50 80 60 70" stroke="#111" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
              <ellipse cx="50" cy="73" rx="7" ry="4.5" fill="#f87171"/>
              <ellipse cx="50" cy="71" rx="6.5" ry="3" fill="#fb923c"/>
              <ellipse cx="28" cy="67" rx="5" ry="3" fill="#fca5a5" opacity="0.6"/>
              <ellipse cx="72" cy="67" rx="5" ry="3" fill="#fca5a5" opacity="0.6"/>
              <defs>
                <linearGradient id="awg2" x1="12" y1="24" x2="78" y2="82" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#4ade80"/><stop offset="100%" stopColor="#16a34a"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <h1 style={{ fontSize:"clamp(22px,5vw,28px)", fontWeight:900, margin:"0 0 6px", letterSpacing:"-0.05em", fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
            <span style={{ color:"#4ade80" }}>Budget</span><span style={{ color:"#fff" }}>Buddy</span>
          </h1>
          <p style={{ fontSize:14, color:"rgba(255,255,255,0.55)", margin:0, fontWeight:500 }}>
            {isLogin ? "Welcome back! Sign in to continue." : "Create your account to get started."}
          </p>
        </div>

        {/* Toggle */}
        <div style={{ display:"flex", background:"rgba(255,255,255,0.08)", borderRadius:14, padding:4, marginBottom:24, border:"1px solid rgba(255,255,255,0.1)" }}>
          {["Login","Register"].map(label=>(
            <button key={label} onClick={()=>{setIsLogin(label==="Login");setError("");}} style={{
              flex:1, padding:"9px", borderRadius:10, border:"none", cursor:"pointer",
              fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:700, fontSize:13,
              background:(isLogin?"Login":"Register")===label?"linear-gradient(135deg,#6366f1,#8b5cf6)":"transparent",
              color:(isLogin?"Login":"Register")===label?"#fff":"rgba(255,255,255,0.55)",
              boxShadow:(isLogin?"Login":"Register")===label?"0 4px 14px rgba(99,102,241,0.5)":"none",
              transition:"all 0.18s",
            }}>{label}</button>
          ))}
        </div>

        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          {!isLogin && (
            <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
              <label style={{ fontSize:11, fontWeight:700, color:"rgba(255,255,255,0.5)", letterSpacing:"0.08em", textTransform:"uppercase" }}>Full Name</label>
              <input type="text" placeholder="Your name" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} style={{ padding:"12px 14px", borderRadius:13, border:"1.5px solid rgba(255,255,255,0.15)", fontSize:14, fontFamily:"'Plus Jakarta Sans',sans-serif", background:"rgba(255,255,255,0.08)", color:"#fff", outline:"none", transition:"all 0.2s" }}
                onFocus={e=>{e.target.style.borderColor="rgba(99,102,241,0.8)";e.target.style.background="rgba(255,255,255,0.12)";}}
                onBlur={e=>{e.target.style.borderColor="rgba(255,255,255,0.15)";e.target.style.background="rgba(255,255,255,0.08)";}}
              />
            </div>
          )}
          {[{label:"Email",type:"email",key:"email",ph:"you@email.com"},{label:"Password",type:"password",key:"password",ph:"••••••••"}].map(f=>(
            <div key={f.key} style={{ display:"flex", flexDirection:"column", gap:6 }}>
              <label style={{ fontSize:11, fontWeight:700, color:"rgba(255,255,255,0.5)", letterSpacing:"0.08em", textTransform:"uppercase" }}>{f.label}</label>
              <input type={f.type} placeholder={f.ph} value={form[f.key]} onChange={e=>setForm(p=>({...p,[f.key]:e.target.value}))} style={{ padding:"12px 14px", borderRadius:13, border:"1.5px solid rgba(255,255,255,0.15)", fontSize:14, fontFamily:"'Plus Jakarta Sans',sans-serif", background:"rgba(255,255,255,0.08)", color:"#fff", outline:"none", transition:"all 0.2s" }}
                onFocus={e=>{e.target.style.borderColor="rgba(99,102,241,0.8)";e.target.style.background="rgba(255,255,255,0.12)";}}
                onBlur={e=>{e.target.style.borderColor="rgba(255,255,255,0.15)";e.target.style.background="rgba(255,255,255,0.08)";}}
                onKeyDown={e=>e.key==="Enter"&&handleSubmit()}
              />
            </div>
          ))}

          {error && (
            <div style={{ background:"rgba(239,68,68,0.15)", border:"1.5px solid rgba(239,68,68,0.4)", borderRadius:12, padding:"10px 14px", fontSize:13, color:"#fca5a5", fontWeight:600 }}>⚠️ {error}</div>
          )}

          <button onClick={handleSubmit} style={{ padding:"14px", borderRadius:14, border:"none", background:"linear-gradient(135deg,#6366f1,#8b5cf6,#a855f7)", color:"#fff", fontSize:15, fontWeight:800, fontFamily:"'Plus Jakarta Sans',sans-serif", cursor:"pointer", marginTop:4, boxShadow:"0 8px 28px rgba(99,102,241,0.5)", display:"flex", alignItems:"center", justifyContent:"center", gap:10, transition:"all 0.2s", letterSpacing:"-0.02em" }}
            onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow="0 14px 40px rgba(99,102,241,0.6)"}}
            onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="0 8px 28px rgba(99,102,241,0.5)"}}>
            {loading&&<Spinner size={18} color="#fff"/>}
            {isLogin?"Sign In →":"Create Account →"}
          </button>
        </div>

        <p style={{ textAlign:"center", marginTop:20, fontSize:12, color:"rgba(255,255,255,0.35)", fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
          {isLogin?"Don't have an account? ":"Already have an account? "}
          <span style={{ color:"#6ed2e4", fontWeight:700, cursor:"pointer" }} onClick={()=>{setIsLogin(!isLogin);setError("");}}>
            {isLogin?"Register →":"Sign In →"}
          </span>
        </p>
      </div>
    </div>
  );
};
export default AuthPage;


