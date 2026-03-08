import { Modal, Input, Select, Button } from "./ui";
import { CATS, FREQ } from "../utils/helpers";

const TransactionModal = ({ form, setForm, onSave, onClose, isEdit }) => (
  <Modal title={isEdit ? "✏️ Edit Transaction" : "➕ Add Transaction"} onClose={onClose}>
    <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
      {/* Type toggle */}
      <div>
        <label style={{ fontSize:11, fontWeight:700, color:"#6366f1", letterSpacing:"0.08em", textTransform:"uppercase", display:"block", marginBottom:8 }}>Type</label>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
          {["income","expense"].map(t=>(
            <button key={t} onClick={()=>setForm(f=>({...f,type:t,category:t==="income"?"Salary":"Food"}))} style={{
              padding:"12px", borderRadius:13, cursor:"pointer", fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:800, fontSize:13, transition:"all 0.18s",
              background: form.type===t ? (t==="income"?"linear-gradient(135deg,#10b981,#059669)":"linear-gradient(135deg,#f97316,#ef4444)") : "#f8f9ff",
              color: form.type===t ? "#fff" : "#94a3b8",
              border: form.type===t ? "none" : "1.5px solid #e0e7ff",
              boxShadow: form.type===t ? (t==="income"?"0 6px 20px rgba(16,185,129,0.4)":"0 6px 20px rgba(239,68,68,0.35)") : "none",
              transform: form.type===t ? "translateY(-1px)" : "none",
            }}>{t==="income"?"💰 Income":"💸 Expense"}</button>
          ))}
        </div>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
        <Select label="Category" value={form.category} onChange={e=>setForm(f=>({...f,category:e.target.value}))}>
          {CATS[form.type].map(c=><option key={c}>{c}</option>)}
        </Select>
        <Input label="Amount (₹)" type="number" min="0" placeholder="0" value={form.amount} onChange={e=>setForm(f=>({...f,amount:e.target.value}))}/>
      </div>

      <Input label="Note" type="text" placeholder="What's this for?" value={form.note} onChange={e=>setForm(f=>({...f,note:e.target.value}))}/>
      <Input label="Date" type="date" value={form.date} onChange={e=>setForm(f=>({...f,date:e.target.value}))}/>

      <div style={{ display:"flex", alignItems:"center", gap:10, padding:"11px 14px", background:"linear-gradient(135deg,#f0f4ff,#e8eaf6)", borderRadius:12, border:"1.5px solid #e0e7ff" }}>
        <input id="recur" type="checkbox" checked={form.recurring} onChange={e=>setForm(f=>({...f,recurring:e.target.checked}))} style={{ width:17, height:17, cursor:"pointer", accentColor:"#6366f1" }}/>
        <label htmlFor="recur" style={{ fontSize:13, fontWeight:700, color:"#4f46e5", cursor:"pointer", fontFamily:"'Plus Jakarta Sans',sans-serif" }}>🔄 Recurring transaction</label>
      </div>

      {form.recurring && (
        <Select label="Frequency" value={form.freq} onChange={e=>setForm(f=>({...f,freq:e.target.value}))}>
          {FREQ.map(f=><option key={f}>{f}</option>)}
        </Select>
      )}

      <div style={{ display:"flex", gap:10, marginTop:4 }}>
        <Button variant="ghost" onClick={onClose} style={{ flex:1 }}>Cancel</Button>
        <Button onClick={onSave} style={{ flex:2 }}>{isEdit ? "Save Changes" : "Add Transaction"}</Button>
      </div>
    </div>
  </Modal>
);
export default TransactionModal;