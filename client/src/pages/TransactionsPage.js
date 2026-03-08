import { useMemo } from "react";
import { Card, Button, Tag, Badge } from "../components/ui";
import { fmt, fmtDate, CATS, CAT_COLORS } from "../utils/helpers";

const TransactionsPage = ({ transactions, filterMonth, filterType, setFilterType, filterCat, setFilterCat, onAdd, onEdit, onDelete }) => {
  const filtered = useMemo(()=>transactions.filter(t=>t.date.startsWith(filterMonth)).filter(t=>filterType==="all"||t.type===filterType).filter(t=>filterCat==="all"||t.category===filterCat).sort((a,b)=>b.date.localeCompare(a.date)),[transactions,filterMonth,filterType,filterCat]);
  const totalIn  = filtered.filter(t=>t.type==="income").reduce((a,t)=>a+t.amount,0);
  const totalOut = filtered.filter(t=>t.type==="expense").reduce((a,t)=>a+t.amount,0);
  const exportCSV = () => { const rows=[["Date","Type","Category","Note","Amount"],...filtered.map(t=>[t.date,t.type,t.category,t.note,t.amount])]; const blob=new Blob([rows.map(r=>r.join(",")).join("\n")],{type:"text/csv"}); const a=document.createElement("a"); a.href=URL.createObjectURL(blob); a.download=`bb-${filterMonth}.csv`; a.click(); };

  const selStyle = { padding:"8px 13px", borderRadius:11, border:"1.5px solid #c7d2fe", fontSize:13, fontFamily:"'Plus Jakarta Sans',sans-serif", background:"#f0f4ff", color:"#4f46e5", fontWeight:700, cursor:"pointer", outline:"none" };

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:18 }}>
      <style>{`
        .bb-ts{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
        .bb-tbl{display:block} .bb-cds{display:none}
        @media(max-width:700px){.bb-tbl{display:none!important}.bb-cds{display:flex!important;flex-direction:column;gap:10px}}
        @media(max-width:500px){.bb-ts{grid-template-columns:1fr}}
      `}</style>

      {/* Header */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap", gap:12 }}>
        <div>
          <h2 style={{ margin:0, fontSize:"clamp(22px,4vw,30px)", fontWeight:900, color:"#1e1b4b", letterSpacing:"-0.05em", fontFamily:"'Plus Jakarta Sans',sans-serif" }}>Transactions</h2>
          <p style={{ margin:"4px 0 0", fontSize:13, color:"#94a3b8", fontWeight:500 }}>{filtered.length} records found</p>
        </div>
        <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
          <select value={filterType} onChange={e=>setFilterType(e.target.value)} style={selStyle}>
            <option value="all">All Types</option><option value="income">Income</option><option value="expense">Expense</option>
          </select>
          <select value={filterCat} onChange={e=>setFilterCat(e.target.value)} style={selStyle}>
            <option value="all">All Categories</option>
            {[...CATS.income,...CATS.expense].map(c=><option key={c}>{c}</option>)}
          </select>
          <Button variant="ghost" size="sm" onClick={exportCSV}>⬇ CSV</Button>
          <Button size="sm" onClick={onAdd}>＋ Add</Button>
        </div>
      </div>

      {/* Summary strips */}
      <div className="bb-ts">
        {[
          { label:"Income",  val:totalIn,         from:"#10b981", to:"#059669" },
          { label:"Expense", val:totalOut,         from:"#f97316", to:"#ef4444" },
          { label:"Net",     val:totalIn-totalOut, from:totalIn-totalOut>=0?"#6366f1":"#dc2626", to:totalIn-totalOut>=0?"#8b5cf6":"#991b1b" },
        ].map(s=>(
          <div key={s.label} style={{ background:`linear-gradient(135deg,${s.from},${s.to})`, borderRadius:16, padding:"16px 20px", boxShadow:`0 6px 20px ${s.from}44` }}>
            <div style={{ fontSize:10, fontWeight:700, color:"rgba(255,255,255,0.8)", letterSpacing:"0.08em", textTransform:"uppercase", fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:5 }}>{s.label}</div>
            <div style={{ fontSize:"clamp(15px,2.5vw,20px)", fontWeight:900, color:"#fff", fontFamily:"'JetBrains Mono',monospace" }}>{fmt(s.val)}</div>
          </div>
        ))}
      </div>

      {/* Desktop table */}
      <Card style={{ padding:0, overflow:"hidden" }} className="bb-tbl">
        <div style={{ overflowX:"auto" }}>
          <table style={{ width:"100%", borderCollapse:"collapse", minWidth:580 }}>
            <thead>
              <tr style={{ background:"linear-gradient(135deg,#f0f4ff,#e8eaf6)" }}>
                {["Date","Type","Category","Note","Amount","Actions"].map(h=>(
                  <th key={h} style={{ padding:"13px 16px", textAlign:"left", fontSize:10, fontWeight:800, color:"#6366f1", letterSpacing:"0.08em", textTransform:"uppercase", fontFamily:"'Plus Jakarta Sans',sans-serif", whiteSpace:"nowrap", borderBottom:"2px solid #e0e7ff" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length===0 && (
                <tr><td colSpan={6} style={{ textAlign:"center", padding:60, color:"#c7d2fe" }}>
                  <div style={{ fontSize:36, marginBottom:10 }}>📭</div>
                  <div style={{ fontSize:14, fontWeight:700, fontFamily:"'Plus Jakarta Sans',sans-serif" }}>No transactions found</div>
                </td></tr>
              )}
              {filtered.map((t,i)=>(
                <tr key={t._id} style={{ borderBottom:"1px solid #f0f4ff", background:i%2?"#fafaff":"#fff", transition:"all 0.15s" }}
                  onMouseEnter={e=>e.currentTarget.style.background="#f0f4ff"}
                  onMouseLeave={e=>e.currentTarget.style.background=i%2?"#fafaff":"#fff"}>
                  <td style={{ padding:"12px 16px", fontSize:12, color:"#374151", whiteSpace:"nowrap", fontWeight:600 }}>{fmtDate(t.date)}</td>
                  <td style={{ padding:"12px 16px" }}><Tag type={t.type}/></td>
                  <td style={{ padding:"12px 16px" }}><Badge color={CAT_COLORS[t.category]||"#6366f1"}>{t.category}</Badge></td>
                  <td style={{ padding:"12px 16px", fontSize:12, color:"#374151", maxWidth:170, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{t.note||"—"}</td>
                  <td style={{ padding:"12px 16px", fontSize:13, fontWeight:800, fontFamily:"'JetBrains Mono',monospace", color:t.type==="income"?"#10b981":"#ef4444", whiteSpace:"nowrap" }}>
                    {t.type==="income"?"+":"-"}{fmt(t.amount)}
                  </td>
                  <td style={{ padding:"12px 16px" }}>
                    <div style={{ display:"flex", gap:6 }}>
                      <button onClick={()=>onEdit(t)} style={{ background:"linear-gradient(135deg,#f0f4ff,#e8eaf6)", border:"1.5px solid #c7d2fe", borderRadius:8, padding:"5px 12px", cursor:"pointer", fontSize:11, color:"#6366f1", fontWeight:700, transition:"all 0.15s" }}>Edit</button>
                      <button onClick={()=>onDelete(t._id)} style={{ background:"#fff0f0", border:"1.5px solid #fecaca", borderRadius:8, padding:"5px 12px", cursor:"pointer", fontSize:11, color:"#ef4444", fontWeight:700, transition:"all 0.15s" }}>Del</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Mobile cards */}
      <div className="bb-cds">
        {filtered.map(t=>(
          <Card key={t._id} style={{ padding:"14px 16px" }}>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
              <div style={{ width:38, height:38, borderRadius:12, background:`${CAT_COLORS[t.category]||"#6366f1"}18`, color:CAT_COLORS[t.category]||"#6366f1", display:"flex", alignItems:"center", justifyContent:"center", fontSize:15, fontWeight:800, flexShrink:0 }}>{t.category[0]}</div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontSize:13, fontWeight:700, color:"#1e1b4b", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{t.note||t.category}</div>
                <div style={{ fontSize:11, color:"#94a3b8", fontWeight:500 }}>{fmtDate(t.date)}</div>
              </div>
              <span style={{ fontSize:14, fontWeight:800, fontFamily:"'JetBrains Mono',monospace", color:t.type==="income"?"#10b981":"#ef4444" }}>{t.type==="income"?"+":"-"}{fmt(t.amount)}</span>
            </div>
            <div style={{ display:"flex", gap:6, justifyContent:"flex-end" }}>
              <Tag type={t.type}/>
              <button onClick={()=>onEdit(t)} style={{ background:"#f0f4ff", border:"1.5px solid #c7d2fe", borderRadius:8, padding:"4px 12px", cursor:"pointer", fontSize:11, color:"#6366f1", fontWeight:700 }}>Edit</button>
              <button onClick={()=>onDelete(t._id)} style={{ background:"#fff0f0", border:"1.5px solid #fecaca", borderRadius:8, padding:"4px 12px", cursor:"pointer", fontSize:11, color:"#ef4444", fontWeight:700 }}>Delete</button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
export default TransactionsPage;