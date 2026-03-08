// import { useMemo } from "react";
// import { Card } from "../components/ui";
// import { HorizontalBar } from "../components/ui/Charts";
// import { fmt, CAT_COLORS } from "../utils/helpers";

// const AnalyticsPage = ({ transactions, filterMonth }) => {
//   const monthTx      = useMemo(()=>transactions.filter(t=>t.date.startsWith(filterMonth)),[transactions,filterMonth]);
//   const totalIncome  = monthTx.filter(t=>t.type==="income").reduce((a,t)=>a+t.amount,0);
//   const totalExpense = monthTx.filter(t=>t.type==="expense").reduce((a,t)=>a+t.amount,0);
//   const balance      = totalIncome-totalExpense;
//   const savingsRate  = totalIncome>0?Math.round((balance/totalIncome)*100):0;

//   const incByCat = useMemo(()=>{
//     const map={};
//     monthTx.filter(t=>t.type==="income").forEach(t=>{map[t.category]=(map[t.category]||0)+t.amount;});
//     return Object.entries(map).sort((a,b)=>b[1]-a[1]);
//   },[monthTx]);

//   const expByCat = useMemo(()=>{
//     const map={};
//     monthTx.filter(t=>t.type==="expense").forEach(t=>{map[t.category]=(map[t.category]||0)+t.amount;});
//     return Object.entries(map).sort((a,b)=>b[1]-a[1]);
//   },[monthTx]);

//   const last6 = useMemo(()=>{
//     const now=new Date();
//     return Array.from({length:6},(_,i)=>{
//       const d=new Date(now.getFullYear(),now.getMonth()-(5-i),1);
//       const key=`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}`;
//       const inc=transactions.filter(t=>t.date.startsWith(key)&&t.type==="income").reduce((a,t)=>a+t.amount,0);
//       const exp=transactions.filter(t=>t.date.startsWith(key)&&t.type==="expense").reduce((a,t)=>a+t.amount,0);
//       return { key, label:d.toLocaleDateString("en-IN",{month:"short"}), year:d.getFullYear(), inc, exp, net:inc-exp };
//     });
//   },[transactions]);

//   return (
//     <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
//       <style>{`
//         .bb-anal-grid { display:grid; grid-template-columns:1fr 1fr; gap:14px; }
//         @media(max-width:700px){ .bb-anal-grid { grid-template-columns:1fr; } }
//       `}</style>

//       <div>
//         <h2 style={{ margin:0, fontSize:"clamp(20px,4vw,26px)", fontWeight:800, color:"#0f172a", letterSpacing:"-0.05em", fontFamily:"'Plus Jakarta Sans',sans-serif" }}>Analytics</h2>
//         <p style={{ margin:"3px 0 0", fontSize:13, color:"#94a3b8", fontWeight:500 }}>Insights and spending patterns</p>
//       </div>

//       <div className="bb-anal-grid">
//         <Card>
//           <h3 style={{ margin:"0 0 14px", fontSize:14, fontWeight:800, color:"#0f172a", fontFamily:"'Plus Jakarta Sans',sans-serif" }}>Income Sources</h3>
//           {incByCat.length===0
//             ? <div style={{ textAlign:"center", padding:"20px 0", color:"#cbd5e1" }}><div style={{ fontSize:26, marginBottom:6 }}>💰</div><div style={{ fontSize:13, fontWeight:600, fontFamily:"'Plus Jakarta Sans',sans-serif" }}>No income this month</div></div>
//             : incByCat.map(([cat,val])=><HorizontalBar key={cat} label={cat} value={val} max={incByCat[0][1]} color={CAT_COLORS[cat]||"#10b981"} formatted={fmt(val)}/>)
//           }
//         </Card>
//         <Card>
//           <h3 style={{ margin:"0 0 14px", fontSize:14, fontWeight:800, color:"#0f172a", fontFamily:"'Plus Jakarta Sans',sans-serif" }}>Expense Breakdown</h3>
//           {expByCat.length===0
//             ? <div style={{ textAlign:"center", padding:"20px 0", color:"#cbd5e1" }}><div style={{ fontSize:26, marginBottom:6 }}>💸</div><div style={{ fontSize:13, fontWeight:600, fontFamily:"'Plus Jakarta Sans',sans-serif" }}>No expenses this month</div></div>
//             : expByCat.map(([cat,val])=><HorizontalBar key={cat} label={cat} value={val} max={expByCat[0][1]} color={CAT_COLORS[cat]||"#f87171"} formatted={fmt(val)}/>)
//           }
//         </Card>
//       </div>

//       {/* 6-month table — scrollable on mobile */}
//       <Card style={{ padding:0, overflow:"hidden" }}>
//         <div style={{ padding:"18px 20px 10px", borderBottom:"1px solid #f1f5f9" }}>
//           <h3 style={{ margin:0, fontSize:14, fontWeight:800, color:"#0f172a", fontFamily:"'Plus Jakarta Sans',sans-serif" }}>Monthly Summary — Last 6 Months</h3>
//         </div>
//         <div style={{ overflowX:"auto" }}>
//           <table style={{ width:"100%", borderCollapse:"collapse", minWidth:420 }}>
//             <thead>
//               <tr style={{ background:"linear-gradient(135deg,#f0f7ff,#e0f2fe)", borderBottom:"1px solid #bfdbfe" }}>
//                 {["Month","Income","Expenses","Net","Savings"].map(h=>(
//                   <th key={h} style={{ padding:"10px 14px", textAlign:"left", fontSize:10, fontWeight:700, color:"#1e40af", letterSpacing:"0.07em", textTransform:"uppercase", fontFamily:"'Plus Jakarta Sans',sans-serif", whiteSpace:"nowrap" }}>{h}</th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {last6.map((m,i)=>{
//                 const sr=m.inc>0?Math.round((m.net/m.inc)*100):0;
//                 return (
//                   <tr key={m.key} style={{ borderBottom:"1px solid #f8fafc", background:i%2?"#fafcff":"#fff" }}>
//                     <td style={{ padding:"11px 14px", fontWeight:700, color:"#374151", fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:13, whiteSpace:"nowrap" }}>{m.label} {m.year}</td>
//                     <td style={{ padding:"11px 14px", fontFamily:"'JetBrains Mono',monospace", fontWeight:700, color:"#059669", fontSize:12, whiteSpace:"nowrap" }}>{fmt(m.inc)}</td>
//                     <td style={{ padding:"11px 14px", fontFamily:"'JetBrains Mono',monospace", fontWeight:700, color:"#dc2626", fontSize:12, whiteSpace:"nowrap" }}>{fmt(m.exp)}</td>
//                     <td style={{ padding:"11px 14px", fontFamily:"'JetBrains Mono',monospace", fontWeight:700, color:m.net>=0?"#1e40af":"#dc2626", fontSize:12, whiteSpace:"nowrap" }}>{fmt(m.net)}</td>
//                     <td style={{ padding:"11px 14px" }}>
//                       <span style={{ background:sr>=30?"#dcfce7":sr>=10?"#fef9c3":"#fee2e2", color:sr>=30?"#166534":sr>=10?"#854d0e":"#991b1b", padding:"2px 9px", borderRadius:20, fontSize:11, fontWeight:700, fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
//                         {m.inc>0?`${sr}%`:"—"}
//                       </span>
//                     </td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         </div>
//       </Card>

//       {/* Insight card */}
//       <div style={{ background:"linear-gradient(135deg,#1e3a8a,#0369a1)", borderRadius:18, padding:"22px 24px", display:"flex", alignItems:"flex-start", gap:16, boxShadow:"0 8px 32px rgba(30,58,138,0.3)", flexWrap:"wrap" }}>
//         <div style={{ fontSize:36, flexShrink:0 }}>💡</div>
//         <div style={{ flex:1, minWidth:200 }}>
//           <div style={{ fontWeight:800, fontSize:15, color:"#fff", marginBottom:5, fontFamily:"'Plus Jakarta Sans',sans-serif" }}>Savings Insight</div>
//           <div style={{ fontSize:13, color:"rgba(255,255,255,0.85)", lineHeight:1.6, fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:500 }}>
//             {balance>=0
//               ? `You saved ${fmt(balance)} this month — a ${savingsRate}% savings rate. ${savingsRate>=30?"Excellent work! 🎉":savingsRate>=15?"Good progress, keep it up!":"Try to push for 20%+ next month."}`
//               : `You overspent by ${fmt(Math.abs(balance))} this month. ${expByCat[0]?`Top expense was ${expByCat[0][0]} at ${fmt(expByCat[0][1])}.`:""}`}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AnalyticsPage;

import { useMemo } from "react";
import { Card } from "../components/ui";
import { HorizontalBar } from "../components/ui/Charts";
import { fmt, CAT_COLORS } from "../utils/helpers";

const AnalyticsPage = ({ transactions, filterMonth }) => {
  const monthTx      = useMemo(()=>transactions.filter(t=>t.date.startsWith(filterMonth)),[transactions,filterMonth]);
  const totalIncome  = monthTx.filter(t=>t.type==="income").reduce((a,t)=>a+t.amount,0);
  const totalExpense = monthTx.filter(t=>t.type==="expense").reduce((a,t)=>a+t.amount,0);
  const balance      = totalIncome-totalExpense;
  const savingsRate  = totalIncome>0?Math.round((balance/totalIncome)*100):0;
  const incByCat     = useMemo(()=>{ const m={}; monthTx.filter(t=>t.type==="income").forEach(t=>{m[t.category]=(m[t.category]||0)+t.amount;}); return Object.entries(m).sort((a,b)=>b[1]-a[1]); },[monthTx]);
  const expByCat     = useMemo(()=>{ const m={}; monthTx.filter(t=>t.type==="expense").forEach(t=>{m[t.category]=(m[t.category]||0)+t.amount;}); return Object.entries(m).sort((a,b)=>b[1]-a[1]); },[monthTx]);

  const last6 = useMemo(()=>{
    const now=new Date();
    return Array.from({length:6},(_,i)=>{
      const d=new Date(now.getFullYear(),now.getMonth()-(5-i),1);
      const key=`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}`;
      const inc=transactions.filter(t=>t.date.startsWith(key)&&t.type==="income").reduce((a,t)=>a+t.amount,0);
      const exp=transactions.filter(t=>t.date.startsWith(key)&&t.type==="expense").reduce((a,t)=>a+t.amount,0);
      return { key, label:d.toLocaleDateString("en-IN",{month:"short"}), year:d.getFullYear(), inc, exp, net:inc-exp };
    });
  },[transactions]);

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
      <style>{`
        .bb-ag{display:grid;grid-template-columns:1fr 1fr;gap:16px}
        .bb-as{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
        @media(max-width:700px){.bb-ag{grid-template-columns:1fr}}
        @media(max-width:500px){.bb-as{grid-template-columns:1fr}}
      `}</style>

      {/* Page header */}
      <div>
        <h2 style={{ margin:0, fontSize:"clamp(22px,4vw,30px)", fontWeight:900, color:"#1e1b4b", letterSpacing:"-0.05em", fontFamily:"'Plus Jakarta Sans',sans-serif" }}>Analytics</h2>
        <p style={{ margin:"4px 0 0", fontSize:13, color:"#94a3b8", fontWeight:500 }}>Insights and spending patterns</p>
      </div>

      {/* Top stat strip */}
      <div className="bb-as">
        {[
          { label:"Income",       val:totalIncome,  from:"#10b981", to:"#059669", icon:"💰" },
          { label:"Expenses",     val:totalExpense, from:"#f97316", to:"#ef4444", icon:"💸" },
          { label:"Savings Rate", val:null,         from:"#6366f1", to:"#8b5cf6", icon:"🎯", text:`${savingsRate}%` },
        ].map(s=>(
          <div key={s.label} style={{ borderRadius:18, padding:"18px 20px", background:`linear-gradient(135deg,${s.from},${s.to})`, boxShadow:`0 8px 28px ${s.from}55`, color:"#fff", position:"relative", overflow:"hidden" }}>
            <div style={{ position:"absolute", top:-15, right:-15, width:80, height:80, borderRadius:"50%", background:"rgba(255,255,255,0.1)", pointerEvents:"none" }}/>
            <div style={{ fontSize:22, marginBottom:8 }}>{s.icon}</div>
            <div style={{ fontSize:11, fontWeight:700, color:"rgba(255,255,255,0.8)", letterSpacing:"0.08em", textTransform:"uppercase", fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:4 }}>{s.label}</div>
            <div style={{ fontSize:"clamp(16px,2.5vw,22px)", fontWeight:900, color:"#fff", fontFamily:"'JetBrains Mono',monospace" }}>
              {s.text || fmt(s.val)}
            </div>
          </div>
        ))}
      </div>

      {/* Income + Expense breakdown */}
      <div className="bb-ag">
        <Card style={{ background:"linear-gradient(160deg,#f0fdf4,#dcfce7)" }}>
          <h3 style={{ margin:"0 0 18px", fontSize:15, fontWeight:800, color:"#064e3b", fontFamily:"'Plus Jakarta Sans',sans-serif", display:"flex", alignItems:"center", gap:8 }}>
            <span style={{ background:"#10b981", color:"#fff", width:28, height:28, borderRadius:8, display:"inline-flex", alignItems:"center", justifyContent:"center", fontSize:14 }}>↑</span>
            Income Sources
          </h3>
          {incByCat.length===0
            ? <div style={{ textAlign:"center", padding:"28px 0", color:"#6ee7b7" }}><div style={{ fontSize:32, marginBottom:8 }}>💰</div><div style={{ fontSize:13, fontWeight:600 }}>No income this month</div></div>
            : incByCat.map(([cat,val])=><HorizontalBar key={cat} label={cat} value={val} max={incByCat[0][1]} color={CAT_COLORS[cat]||"#10b981"} formatted={fmt(val)}/>)
          }
        </Card>
        <Card style={{ background:"linear-gradient(160deg,#fff7ed,#ffedd5)" }}>
          <h3 style={{ margin:"0 0 18px", fontSize:15, fontWeight:800, color:"#7c2d12", fontFamily:"'Plus Jakarta Sans',sans-serif", display:"flex", alignItems:"center", gap:8 }}>
            <span style={{ background:"#ef4444", color:"#fff", width:28, height:28, borderRadius:8, display:"inline-flex", alignItems:"center", justifyContent:"center", fontSize:14 }}>↓</span>
            Expense Breakdown
          </h3>
          {expByCat.length===0
            ? <div style={{ textAlign:"center", padding:"28px 0", color:"#fdba74" }}><div style={{ fontSize:32, marginBottom:8 }}>💸</div><div style={{ fontSize:13, fontWeight:600 }}>No expenses this month</div></div>
            : expByCat.map(([cat,val])=><HorizontalBar key={cat} label={cat} value={val} max={expByCat[0][1]} color={CAT_COLORS[cat]||"#ef4444"} formatted={fmt(val)}/>)
          }
        </Card>
      </div>

      {/* 6-month table */}
      <Card style={{ padding:0, overflow:"hidden" }}>
        <div style={{ padding:"20px 24px 12px", background:"linear-gradient(135deg,#f0f4ff,#e8eaf6)", borderBottom:"2px solid #e0e7ff" }}>
          <h3 style={{ margin:0, fontSize:15, fontWeight:800, color:"#1e1b4b", fontFamily:"'Plus Jakarta Sans',sans-serif" }}>📊 Monthly Summary — Last 6 Months</h3>
        </div>
        <div style={{ overflowX:"auto" }}>
          <table style={{ width:"100%", borderCollapse:"collapse", minWidth:420 }}>
            <thead>
              <tr style={{ background:"#f8f9ff" }}>
                {["Month","Income","Expenses","Net","Savings %"].map(h=>(
                  <th key={h} style={{ padding:"11px 16px", textAlign:"left", fontSize:10, fontWeight:800, color:"#6366f1", letterSpacing:"0.08em", textTransform:"uppercase", fontFamily:"'Plus Jakarta Sans',sans-serif", whiteSpace:"nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {last6.map((m,i)=>{
                const sr=m.inc>0?Math.round((m.net/m.inc)*100):0;
                return (
                  <tr key={m.key} style={{ borderBottom:"1px solid #f0f4ff", background:i%2?"#fafaff":"#fff", transition:"background 0.15s" }}
                    onMouseEnter={e=>e.currentTarget.style.background="#f0f4ff"}
                    onMouseLeave={e=>e.currentTarget.style.background=i%2?"#fafaff":"#fff"}>
                    <td style={{ padding:"12px 16px", fontWeight:700, color:"#374151", fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:13, whiteSpace:"nowrap" }}>{m.label} {m.year}</td>
                    <td style={{ padding:"12px 16px", fontFamily:"'JetBrains Mono',monospace", fontWeight:700, color:"#10b981", fontSize:13, whiteSpace:"nowrap" }}>{fmt(m.inc)}</td>
                    <td style={{ padding:"12px 16px", fontFamily:"'JetBrains Mono',monospace", fontWeight:700, color:"#ef4444", fontSize:13, whiteSpace:"nowrap" }}>{fmt(m.exp)}</td>
                    <td style={{ padding:"12px 16px", fontFamily:"'JetBrains Mono',monospace", fontWeight:700, color:m.net>=0?"#6366f1":"#ef4444", fontSize:13, whiteSpace:"nowrap" }}>{fmt(m.net)}</td>
                    <td style={{ padding:"12px 16px" }}>
                      <span style={{ background:sr>=30?"linear-gradient(135deg,#d1fae5,#a7f3d0)":sr>=10?"linear-gradient(135deg,#fef9c3,#fde68a)":"linear-gradient(135deg,#fee2e2,#fecaca)", color:sr>=30?"#065f46":sr>=10?"#78350f":"#991b1b", padding:"3px 11px", borderRadius:20, fontSize:11, fontWeight:800, fontFamily:"'Plus Jakarta Sans',sans-serif", boxShadow:sr>=30?"0 2px 8px rgba(16,185,129,0.3)":sr>=10?"0 2px 8px rgba(251,191,36,0.3)":"0 2px 8px rgba(239,68,68,0.2)" }}>
                        {m.inc>0?`${sr}%`:"—"}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Insight card */}
      <div style={{ background:"linear-gradient(135deg,#4f46e5,#7c3aed,#a855f7)", borderRadius:22, padding:"26px 28px", display:"flex", alignItems:"flex-start", gap:18, boxShadow:"0 16px 50px rgba(99,102,241,0.4)", flexWrap:"wrap", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:-40, right:-40, width:180, height:180, borderRadius:"50%", background:"rgba(255,255,255,0.07)", pointerEvents:"none" }}/>
        <div style={{ fontSize:42, flexShrink:0 }}>💡</div>
        <div style={{ flex:1, minWidth:200 }}>
          <div style={{ fontWeight:900, fontSize:17, color:"#fff", marginBottom:7, fontFamily:"'Plus Jakarta Sans',sans-serif" }}>Monthly Insight</div>
          <div style={{ fontSize:14, color:"rgba(255,255,255,0.88)", lineHeight:1.65, fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:500 }}>
            {balance>=0
              ? `🎉 You saved ${fmt(balance)} this month — a ${savingsRate}% savings rate. ${savingsRate>=30?"Outstanding! You're crushing your goals 🚀":savingsRate>=15?"Great progress! Aim for 30% next month 💪":"Keep going! Small savings add up fast ⭐"}`
              : `📉 You overspent by ${fmt(Math.abs(balance))} this month. ${expByCat[0]?`Your biggest category was ${expByCat[0][0]} at ${fmt(expByCat[0][1])}. Try trimming it next month!`:""}`}
          </div>
        </div>
      </div>
    </div>
  );
};
export default AnalyticsPage;