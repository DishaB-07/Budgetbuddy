// ── DonutChart ─────────────────────────────────────────────────────────────────
export const DonutChart = ({ segments, size=140, thickness=26 }) => {
  const r = (size-thickness)/2, cx=size/2, cy=size/2;
  const circ = 2*Math.PI*r;
  const total = segments.reduce((a,s)=>a+s.value,0)||1;
  let offset = 0;
  return (
    <svg width={size} height={size} style={{ transform:"rotate(-90deg)" }}>
      {segments.length===0
        ? <circle cx={cx} cy={cy} r={r} fill="none" stroke="#f1f5f9" strokeWidth={thickness}/>
        : segments.map((s,i)=>{
            const dash=(s.value/total)*circ;
            const el=<circle key={i} cx={cx} cy={cy} r={r} fill="none" stroke={s.color} strokeWidth={thickness} strokeDasharray={`${dash} ${circ-dash}`} strokeDashoffset={-offset} style={{transition:"stroke-dasharray 0.5s"}}><title>{s.label}</title></circle>;
            offset+=dash; return el;
          })
      }
    </svg>
  );
};

// ── MonthlyBarChart ────────────────────────────────────────────────────────────
export const MonthlyBarChart = ({ data, height=130 }) => {
  const max = Math.max(...data.map(d=>Math.max(d.inc,d.exp)),1);
  return (
    <div style={{ display:"flex", gap:6, alignItems:"flex-end", height }}>
      {data.map((m,i) => (
        <div key={i} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:3 }}>
          <div style={{ width:"100%", display:"flex", gap:2, alignItems:"flex-end", height:height-20 }}>
            <div title={`Income: ${m.inc}`} style={{ flex:1, background:"linear-gradient(180deg,#34d399,#6ee7b7)", borderRadius:"5px 5px 0 0", height:`${(m.inc/max)*100}%`, minHeight:m.inc?3:0, transition:"height 0.5s cubic-bezier(.4,0,.2,1)" }}/>
            <div title={`Expense: ${m.exp}`} style={{ flex:1, background:"linear-gradient(180deg,#f87171,#fca5a5)", borderRadius:"5px 5px 0 0", height:`${(m.exp/max)*100}%`, minHeight:m.exp?3:0, transition:"height 0.5s cubic-bezier(.4,0,.2,1)" }}/>
          </div>
          <span style={{ fontSize:10, color:"#94a3b8", fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:600 }}>{m.label}</span>
        </div>
      ))}
    </div>
  );
};

// ── HorizontalBar ──────────────────────────────────────────────────────────────
export const HorizontalBar = ({ label, value, max, color, formatted }) => (
  <div style={{ marginBottom:13 }}>
    <div style={{ display:"flex", justifyContent:"space-between", fontSize:13, marginBottom:6 }}>
      <span style={{ fontWeight:700, color:"#374151", fontFamily:"'Plus Jakarta Sans',sans-serif" }}>{label}</span>
      <span style={{ fontFamily:"'JetBrains Mono',monospace", fontWeight:700, color, fontSize:13 }}>{formatted}</span>
    </div>
    <div style={{ height:8, background:"#f1f5f9", borderRadius:99, overflow:"hidden" }}>
      <div style={{ height:"100%", width:`${(value/max)*100}%`, background:`linear-gradient(90deg,${color},${color}bb)`, borderRadius:99, transition:"width 0.55s cubic-bezier(.4,0,.2,1)" }}/>
    </div>
  </div>
);