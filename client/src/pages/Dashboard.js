import { useMemo } from "react";
import { Card, Button, ProgressBar } from "../components/ui";
import { DonutChart, MonthlyBarChart } from "../components/ui/Charts";
import { fmt, fmtDate, CAT_COLORS } from "../utils/helpers";

const KpiCard = ({ label, value, color, icon, from, to, sub }) => (
  <div style={{ borderRadius:22, padding:"22px 24px", background:`linear-gradient(135deg,${from},${to})`, boxShadow:`0 8px 32px ${from}55`, position:"relative", overflow:"hidden", color:"#fff" }}>
    <div style={{ position:"absolute", top:-20, right:-20, width:100, height:100, borderRadius:"50%", background:"rgba(255,255,255,0.1)" }}/>
    <div style={{ position:"absolute", bottom:-30, left:-10, width:120, height:120, borderRadius:"50%", background:"rgba(255,255,255,0.06)" }}/>
    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:14 }}>
      <div style={{ fontSize:11, fontWeight:700, color:"rgba(255,255,255,0.8)", letterSpacing:"0.08em", textTransform:"uppercase", fontFamily:"'Plus Jakarta Sans',sans-serif" }}>{label}</div>
      <div style={{ width:36, height:36, borderRadius:11, background:"rgba(255,255,255,0.2)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}>{icon}</div>
    </div>
    <div style={{ fontSize:"clamp(20px,3vw,28px)", fontWeight:900, color:"#fff", fontFamily:"'JetBrains Mono',monospace", letterSpacing:"-0.04em", marginBottom:5, textShadow:"0 2px 8px rgba(0,0,0,0.15)" }}>{fmt(value)}</div>
    {sub && <div style={{ fontSize:12, color:"rgba(255,255,255,0.75)", fontWeight:600 }}>{sub}</div>}
  </div>
);

const Dashboard = ({ transactions, budgets, filterMonth, setTab, onAddTx }) => {
  const monthTx      = useMemo(()=>transactions.filter(t=>t.date.startsWith(filterMonth)),[transactions,filterMonth]);
  const totalIncome  = useMemo(()=>monthTx.filter(t=>t.type==="income").reduce((a,t)=>a+t.amount,0),[monthTx]);
  const totalExpense = useMemo(()=>monthTx.filter(t=>t.type==="expense").reduce((a,t)=>a+t.amount,0),[monthTx]);
  const balance      = totalIncome-totalExpense;
  const savingsRate  = totalIncome>0?Math.round((balance/totalIncome)*100):0;
  const expByCat     = useMemo(()=>{ const m={}; monthTx.filter(t=>t.type==="expense").forEach(t=>{m[t.category]=(m[t.category]||0)+t.amount;}); return m; },[monthTx]);
  const donutSegs    = Object.entries(expByCat).map(([cat,val])=>({label:cat,value:val,color:CAT_COLORS[cat]||"#94a3b8"}));
  const last6        = useMemo(()=>{ const now=new Date(); return Array.from({length:6},(_,i)=>{ const d=new Date(now.getFullYear(),now.getMonth()-(5-i),1); const key=`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}`; return { label:d.toLocaleDateString("en-IN",{month:"short"}), inc:transactions.filter(t=>t.date.startsWith(key)&&t.type==="income").reduce((a,t)=>a+t.amount,0), exp:transactions.filter(t=>t.date.startsWith(key)&&t.type==="expense").reduce((a,t)=>a+t.amount,0) }; }); },[transactions]);
  const monthBudgets = useMemo(()=>budgets.filter(b=>b.month===filterMonth),[budgets,filterMonth]);
  const budgetAlerts = monthBudgets.map(b=>({...b,spent:expByCat[b.category]||0})).filter(b=>b.spent/b.limit>=0.8);

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
      <style>{`
        .bb-kpi{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
        .bb-ch{display:grid;grid-template-columns:1.4fr 1fr;gap:16px}
        .bb-bt{display:grid;grid-template-columns:1.2fr 1fr;gap:16px}
        @media(max-width:900px){.bb-ch,.bb-bt{grid-template-columns:1fr}}
        @media(max-width:600px){.bb-kpi{grid-template-columns:1fr}}
      `}</style>

      {/* Header */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:12 }}>
        <div>
          <h2 style={{ margin:0, fontSize:"clamp(22px,4vw,30px)", fontWeight:900, color:"#1e1b4b", letterSpacing:"-0.05em", fontFamily:"'Plus Jakarta Sans',sans-serif" }}>Good day 👋</h2>
          <p style={{ margin:"4px 0 0", fontSize:14, color:"#94a3b8", fontWeight:500 }}>Here's your financial overview for this month</p>
        </div>
        <Button onClick={onAddTx} size="md">＋ Add Transaction</Button>
      </div>

      {/* Alert banner */}
      {budgetAlerts.length>0 && (
        <div style={{ background:"linear-gradient(135deg,#fffbeb,#fef3c7)", border:"1.5px solid #fcd34d", borderRadius:16, padding:"13px 18px", display:"flex", flexWrap:"wrap", gap:10, alignItems:"center", boxShadow:"0 4px 20px rgba(251,191,36,0.2)" }}>
          <span style={{ fontSize:18 }}>⚠️</span>
          {budgetAlerts.map(b=>(
            <span key={b.category} style={{ fontSize:13, color:"#92400e", fontWeight:700, background:"rgba(251,191,36,0.2)", padding:"3px 10px", borderRadius:20 }}>
              {b.spent>b.limit?`🚨 ${b.category} over budget!`:`${b.category} at ${Math.round((b.spent/b.limit)*100)}%`}
            </span>
          ))}
        </div>
      )}

      {/* KPI cards — fully colored gradients */}
      <div className="bb-kpi">
        <KpiCard label="Total Income"   value={totalIncome}  from="#10b981" to="#059669" icon="↑" sub={`${monthTx.filter(t=>t.type==="income").length} transactions`}/>
        <KpiCard label="Total Expenses" value={totalExpense} from="#f97316" to="#ef4444" icon="↓" sub={`${monthTx.filter(t=>t.type==="expense").length} transactions`}/>
        <KpiCard label="Net Balance"    value={balance}      from={balance>=0?"#6366f1":"#dc2626"} to={balance>=0?"#8b5cf6":"#991b1b"} icon="≡" sub={totalIncome>0?`${savingsRate}% savings rate`:"—"}/>
      </div>

      {/* Charts */}
      <div className="bb-ch">
        <Card>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16, flexWrap:"wrap", gap:8 }}>
            <h3 style={{ margin:0, fontSize:15, fontWeight:800, color:"#1e1b4b", fontFamily:"'Plus Jakarta Sans',sans-serif" }}>6-Month Trend</h3>
            <div style={{ display:"flex", gap:14, fontSize:12 }}>
              <span style={{ color:"#10b981", fontWeight:700 }}>● Income</span>
              <span style={{ color:"#f87171", fontWeight:700 }}>● Expense</span>
            </div>
          </div>
          <MonthlyBarChart data={last6} height={140}/>
        </Card>
        <Card>
          <h3 style={{ margin:"0 0 16px", fontSize:15, fontWeight:800, color:"#1e1b4b", fontFamily:"'Plus Jakarta Sans',sans-serif" }}>Expense Breakdown</h3>
          {donutSegs.length===0 ? (
            <div style={{ textAlign:"center", padding:"28px 0", color:"#c7d2fe" }}><div style={{ fontSize:34, marginBottom:8 }}>🥧</div><div style={{ fontSize:13, fontWeight:600, fontFamily:"'Plus Jakarta Sans',sans-serif" }}>No expenses yet</div></div>
          ) : (
            <div style={{ display:"flex", alignItems:"center", gap:14 }}>
              <div style={{ position:"relative", flexShrink:0 }}>
                <DonutChart segments={donutSegs} size={118} thickness={24}/>
                <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column" }}>
                  <span style={{ fontSize:18, fontWeight:900, color:"#1e1b4b", fontFamily:"'JetBrains Mono',monospace" }}>{Object.keys(expByCat).length}</span>
                  <span style={{ fontSize:10, color:"#94a3b8", fontWeight:700 }}>cats</span>
                </div>
              </div>
              <div style={{ flex:1, minWidth:110 }}>
                {Object.entries(expByCat).sort((a,b)=>b[1]-a[1]).slice(0,5).map(([cat,val])=>(
                  <div key={cat} style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
                    <div style={{ width:10, height:10, borderRadius:3, background:CAT_COLORS[cat]||"#94a3b8", flexShrink:0, boxShadow:`0 0 6px ${CAT_COLORS[cat]||"#94a3b8"}88` }}/>
                    <span style={{ fontSize:12, color:"#374151", flex:1, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", fontWeight:600 }}>{cat}</span>
                    <span style={{ fontSize:11, fontWeight:700, color:"#1e1b4b", fontFamily:"'JetBrains Mono',monospace" }}>{fmt(val)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Card>
      </div>

      {/* Recent + Budget */}
      <div className="bb-bt">
        <Card>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16, flexWrap:"wrap", gap:8 }}>
            <h3 style={{ margin:0, fontSize:15, fontWeight:800, color:"#1e1b4b", fontFamily:"'Plus Jakarta Sans',sans-serif" }}>Recent Transactions</h3>
            <Button variant="ghost" size="sm" onClick={()=>setTab("transactions")}>View all →</Button>
          </div>
          {monthTx.length===0 ? (
            <div style={{ textAlign:"center", padding:"30px 0", color:"#c7d2fe" }}><div style={{ fontSize:32, marginBottom:8 }}>📭</div><div style={{ fontSize:13, fontWeight:600, fontFamily:"'Plus Jakarta Sans',sans-serif" }}>No transactions this month</div></div>
          ) : (
            <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
              {monthTx.slice(0,5).map(t=>(
                <div key={t._id} style={{ display:"flex", alignItems:"center", gap:11, padding:"10px 13px", borderRadius:14, background:"linear-gradient(135deg,#f8f9ff,#f0f4ff)", border:"1.5px solid #e0e7ff", transition:"all 0.15s" }}
                  onMouseEnter={e=>{e.currentTarget.style.background="linear-gradient(135deg,#f0f4ff,#e8eaf6)";e.currentTarget.style.transform="translateX(3px)"}}
                  onMouseLeave={e=>{e.currentTarget.style.background="linear-gradient(135deg,#f8f9ff,#f0f4ff)";e.currentTarget.style.transform="none"}}>
                  <div style={{ width:38, height:38, borderRadius:12, background:`${CAT_COLORS[t.category]||"#6366f1"}20`, color:CAT_COLORS[t.category]||"#6366f1", display:"flex", alignItems:"center", justifyContent:"center", fontSize:15, fontWeight:800, flexShrink:0, boxShadow:`0 2px 8px ${CAT_COLORS[t.category]||"#6366f1"}30` }}>
                    {t.category[0]}
                  </div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:13, fontWeight:700, color:"#1e1b4b", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{t.note||t.category}</div>
                    <div style={{ fontSize:11, color:"#94a3b8", fontWeight:500 }}>{fmtDate(t.date)}</div>
                  </div>
                  <span style={{ fontSize:13, fontWeight:800, fontFamily:"'JetBrains Mono',monospace", color:t.type==="income"?"#10b981":"#ef4444", flexShrink:0 }}>
                    {t.type==="income"?"+":"-"}{fmt(t.amount)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </Card>
        <Card>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16, flexWrap:"wrap", gap:8 }}>
            <h3 style={{ margin:0, fontSize:15, fontWeight:800, color:"#1e1b4b", fontFamily:"'Plus Jakarta Sans',sans-serif" }}>Budget Status</h3>
            <Button variant="ghost" size="sm" onClick={()=>setTab("budgets")}>Manage →</Button>
          </div>
          {monthBudgets.length===0 ? (
            <div style={{ textAlign:"center", padding:"30px 0", color:"#c7d2fe" }}><div style={{ fontSize:32, marginBottom:8 }}>🎯</div><div style={{ fontSize:13, fontWeight:600, fontFamily:"'Plus Jakarta Sans',sans-serif" }}>No budgets set</div></div>
          ) : (
            <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
              {monthBudgets.slice(0,5).map(b=>{ const spent=expByCat[b.category]||0; return (
                <div key={b.category}>
                  <div style={{ display:"flex", justifyContent:"space-between", fontSize:12, marginBottom:7 }}>
                    <span style={{ fontWeight:700, color:"#374151" }}>{b.category}</span>
                    <span style={{ color:"#6366f1", fontFamily:"'JetBrains Mono',monospace", fontWeight:700, fontSize:11 }}>{fmt(spent)}/{fmt(b.limit)}</span>
                  </div>
                  <ProgressBar pct={(spent/b.limit)*100} color={CAT_COLORS[b.category]||"#6366f1"}/>
                </div>
              );})}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};
export default Dashboard;