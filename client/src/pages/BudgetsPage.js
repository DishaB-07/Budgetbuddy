import { useMemo } from "react";
import { Card, Button, ProgressBar } from "../components/ui";
import { fmt, CAT_COLORS } from "../utils/helpers";

const BudgetsPage = ({ budgets, transactions, filterMonth, onAdd, onRemove }) => {
  const monthBudgets = useMemo(()=>budgets.filter(b=>b.month===filterMonth),[budgets,filterMonth]);
  const expByCat     = useMemo(()=>{ const m={}; transactions.filter(t=>t.date.startsWith(filterMonth)&&t.type==="expense").forEach(t=>{m[t.category]=(m[t.category]||0)+t.amount;}); return m; },[transactions,filterMonth]);
  const [yr,mo]      = filterMonth.split("-");
  const monthLabel   = new Date(+yr,+mo-1,1).toLocaleDateString("en-IN",{month:"long",year:"numeric"});
  const totalBudgeted= monthBudgets.reduce((a,b)=>a+b.limit,0);
  const totalSpent   = monthBudgets.reduce((a,b)=>a+(expByCat[b.category]||0),0);

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
      <style>{`
        .bb-bg{display:grid;grid-template-columns:repeat(auto-fill,minmax(290px,1fr));gap:16px}
        .bb-bs{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
        @media(max-width:600px){.bb-bs{grid-template-columns:1fr}.bb-bg{grid-template-columns:1fr}}
      `}</style>

      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap", gap:12 }}>
        <div>
          <h2 style={{ margin:0, fontSize:"clamp(22px,4vw,30px)", fontWeight:900, color:"#1e1b4b", letterSpacing:"-0.05em", fontFamily:"'Plus Jakarta Sans',sans-serif" }}>Budgets</h2>
          <p style={{ margin:"4px 0 0", fontSize:13, color:"#94a3b8", fontWeight:500 }}>{monthLabel} · {monthBudgets.length} set</p>
        </div>
        <Button onClick={onAdd}>＋ Set Budget</Button>
      </div>

      {/* Summary strip */}
      {monthBudgets.length>0 && (
        <div style={{ background:"linear-gradient(135deg,#4f46e5,#7c3aed,#a855f7)", borderRadius:20, padding:"22px 26px", boxShadow:"0 12px 40px rgba(99,102,241,0.35)" }}>
          <div className="bb-bs">
            {[
              { label:"Total Budgeted", val:totalBudgeted, color:"#ffffff" },
              { label:"Total Spent",    val:totalSpent,    color:totalSpent>totalBudgeted?"#fca5a5":"#ffffff" },
              { label:"Remaining",      val:totalBudgeted-totalSpent, color:totalBudgeted-totalSpent<0?"#fca5a5":"#ffffff" },
            ].map(s=>(
              <div key={s.label}>
                <div style={{ fontSize:10, fontWeight:700, color:"rgba(255,255,255,0.6)", letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:6, fontFamily:"'Plus Jakarta Sans',sans-serif" }}>{s.label}</div>
                <div style={{ fontSize:"clamp(16px,3vw,24px)", fontWeight:900, color:s.color, fontFamily:"'JetBrains Mono',monospace" }}>{fmt(Math.abs(s.val))}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {monthBudgets.length===0 && (
        <Card style={{ textAlign:"center", padding:"60px 32px", background:"linear-gradient(135deg,#f8f9ff,#f0f4ff)" }}>
          <div style={{ fontSize:52, marginBottom:14 }}>🎯</div>
          <div style={{ fontWeight:900, fontSize:20, color:"#1e1b4b", marginBottom:8, fontFamily:"'Plus Jakarta Sans',sans-serif" }}>No budgets for {monthLabel}</div>
          <div style={{ fontSize:14, color:"#94a3b8", marginBottom:24, fontWeight:500 }}>Set spending limits and get smart alerts.</div>
          <Button onClick={onAdd}>Set your first budget</Button>
        </Card>
      )}

      <div className="bb-bg">
        {monthBudgets.map(b=>{
          const spent=expByCat[b.category]||0, pct=(spent/b.limit)*100, over=spent>b.limit;
          const color=CAT_COLORS[b.category]||"#6366f1";
          return (
            <div key={b.category+b.month} style={{ borderRadius:22, padding:"20px 22px", background:"#fff", border:"1.5px solid #e0e7ff", boxShadow:`0 4px 20px rgba(0,0,0,0.05), 0 0 0 ${over?"2px":"0px"} ${over?"#fca5a5":"transparent"}`, position:"relative", overflow:"hidden", transition:"transform 0.2s, box-shadow 0.2s" }}
              onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.boxShadow=`0 12px 40px rgba(0,0,0,0.1), 0 0 0 ${over?"2px":"0px"} ${over?"#fca5a5":"transparent"}`}}
              onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow=`0 4px 20px rgba(0,0,0,0.05), 0 0 0 ${over?"2px":"0px"} ${over?"#fca5a5":"transparent"}`}}>
              {/* Colored top bar */}
              <div style={{ position:"absolute", top:0, left:0, right:0, height:4, background:`linear-gradient(90deg,${color},${color}88)`, borderRadius:"22px 22px 0 0" }}/>
              <div style={{ position:"absolute", top:-30, right:-30, width:110, height:110, borderRadius:"50%", background:color+"08", pointerEvents:"none" }}/>

              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:16, marginTop:6 }}>
                <div style={{ display:"flex", alignItems:"center", gap:11 }}>
                  <div style={{ width:44, height:44, borderRadius:14, background:color+"18", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, fontWeight:900, color, flexShrink:0, boxShadow:`0 4px 12px ${color}30` }}>
                    {b.category[0]}
                  </div>
                  <div>
                    <div style={{ fontWeight:800, fontSize:15, color:"#1e1b4b", fontFamily:"'Plus Jakarta Sans',sans-serif" }}>{b.category}</div>
                    <div style={{ fontSize:11, color:"#94a3b8", fontWeight:500 }}>{b.month}</div>
                  </div>
                </div>
                <button onClick={()=>onRemove(b._id||b.id)} style={{ background:"#fff0f0", border:"1.5px solid #fecaca", borderRadius:8, padding:"3px 11px", cursor:"pointer", fontSize:11, color:"#ef4444", fontWeight:700, flexShrink:0 }}>✕</button>
              </div>

              <div style={{ marginBottom:13 }}><ProgressBar pct={pct} color={color} height={10}/></div>
              <div style={{ display:"flex", justifyContent:"space-between", fontSize:13, marginBottom:10 }}>
                <span style={{ fontFamily:"'JetBrains Mono',monospace", fontWeight:900, fontSize:16, color:over?"#ef4444":"#1e1b4b" }}>{fmt(spent)}</span>
                <span style={{ color:"#94a3b8", fontWeight:500 }}>of {fmt(b.limit)}</span>
              </div>

              {over   && <div style={{ background:"linear-gradient(135deg,#fff0f0,#ffe4e6)", border:"1.5px solid #fecaca", borderRadius:11, padding:"8px 13px", fontSize:12, color:"#dc2626", fontWeight:700 }}>🚨 Over by {fmt(spent-b.limit)}</div>}
              {!over&&pct>=80 && <div style={{ background:"linear-gradient(135deg,#fffbeb,#fef3c7)", border:"1.5px solid #fcd34d", borderRadius:11, padding:"8px 13px", fontSize:12, color:"#92400e", fontWeight:700 }}>⚠️ {Math.round(pct)}% used</div>}
              {!over&&pct<80  && <div style={{ fontSize:12, color:"#10b981", fontWeight:700 }}>✅ {fmt(b.limit-spent)} remaining</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default BudgetsPage;