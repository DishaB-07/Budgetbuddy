import { useState, useEffect, useCallback } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { Spinner } from "./components/ui";
import Navbar from "./components/layout/Navbar";
import TransactionModal from "./components/TransactionModal";
import BudgetModal from "./components/BudgetModal";
import Dashboard from "./pages/Dashboard";
import TransactionsPage from "./pages/TransactionsPage";
import BudgetsPage from "./pages/BudgetsPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import AuthPage from "./pages/AuthPage";
import api from "./utils/api";
import { today, thisMonth } from "./utils/helpers";

const AppInner = () => {
  const { user, loading } = useAuth();
  const [tab, setTab]                     = useState("dashboard");
  const [transactions, setTransactions]   = useState([]);
  const [budgets, setBudgets]             = useState([]);
  const [filterMonth, setFilterMonth]     = useState(thisMonth());
  const [filterType, setFilterType]       = useState("all");
  const [filterCat, setFilterCat]         = useState("all");
  const [dataLoading, setDataLoading]     = useState(false);
  const [showTxModal, setShowTxModal]         = useState(false);
  const [showBudgetModal, setShowBudgetModal] = useState(false);
  const [editTx, setEditTx]                   = useState(null);
  const blankTxForm     = { type:"expense", amount:"", category:"Food", note:"", date:today(), recurring:false, freq:"Monthly" };
  const blankBudgetForm = { category:"Food", limit:"", month:thisMonth() };
  const [txForm, setTxForm]         = useState(blankTxForm);
  const [budgetForm, setBudgetForm] = useState(blankBudgetForm);

  const fetchTransactions = useCallback(async () => {
    try { const res = await api.get("/transactions"); setTransactions(res.data); } catch(e){}
  }, []);
  const fetchBudgets = useCallback(async () => {
    try { const res = await api.get("/budgets?month="+filterMonth); setBudgets(res.data); } catch(e){}
  }, [filterMonth]);

  useEffect(() => {
    if (!user) return;
    const load = async () => { setDataLoading(true); await Promise.all([fetchTransactions(), fetchBudgets()]); setDataLoading(false); };
    load();
  }, [user, fetchTransactions, fetchBudgets]);
  useEffect(() => { if (user) fetchBudgets(); }, [filterMonth, fetchBudgets]);

  const openAddTx  = () => { setEditTx(null); setTxForm(blankTxForm); setShowTxModal(true); };
  const openEditTx = (tx) => { setEditTx(tx); setTxForm({...tx, amount:String(tx.amount)}); setShowTxModal(true); };
  const saveTx = async () => {
    if (!txForm.amount || !txForm.date) return;
    const payload = { ...txForm, amount: parseFloat(txForm.amount) };
    try {
      if (editTx) { const res = await api.put("/transactions/"+editTx._id, payload); setTransactions(ts=>ts.map(t=>t._id===editTx._id?res.data:t)); }
      else        { const res = await api.post("/transactions", payload); setTransactions(ts=>[res.data,...ts]); }
      setShowTxModal(false); setEditTx(null); setTxForm(blankTxForm);
    } catch { alert("Error saving. Is the server running?"); }
  };
  const deleteTx = async (id) => {
    if (!window.confirm("Delete?")) return;
    try { await api.delete("/transactions/"+id); setTransactions(ts=>ts.filter(t=>t._id!==id)); } catch {}
  };
  const openAddBudget = () => { setBudgetForm({...blankBudgetForm, month:filterMonth}); setShowBudgetModal(true); };
  const saveBudget = async () => {
    if (!budgetForm.limit) return;
    const payload = { ...budgetForm, limit: parseFloat(budgetForm.limit) };
    try {
      const res = await api.post("/budgets", payload);
      setBudgets(bs=>{ const idx=bs.findIndex(b=>b.category===payload.category&&b.month===payload.month); if(idx>=0) return bs.map((b,i)=>i===idx?res.data:b); return [...bs,res.data]; });
      setShowBudgetModal(false); setBudgetForm(blankBudgetForm);
    } catch { alert("Error saving budget."); }
  };
  const removeBudget = async (id) => {
    if (!window.confirm("Remove?")) return;
    try { await api.delete("/budgets/"+id); setBudgets(bs=>bs.filter(b=>b._id!==id)); } catch {}
  };

  if (loading) return (
    <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", background:"#0f0c29" }}>
      <Spinner size={40} color="#a78bfa"/>
    </div>
  );
  if (!user) return <AuthPage />;

  return (
    <div style={{ minHeight:"100vh", background:"#f0f4ff", fontFamily:"'Plus Jakarta Sans',system-ui,sans-serif", position:"relative" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@500;700&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        @keyframes bbSlideUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
        @keyframes bbSpin{to{transform:rotate(360deg)}}
        @keyframes bbFadeIn{from{opacity:0}to{opacity:1}}
        @keyframes bbPulse{0%,100%{opacity:1}50%{opacity:0.6}}
        ::-webkit-scrollbar{width:5px;height:5px}
        ::-webkit-scrollbar-track{background:#e8eaf6}
        ::-webkit-scrollbar-thumb{background:linear-gradient(#a78bfa,#818cf8);border-radius:99px}
        body{background:#f0f4ff}
      `}</style>
      <Navbar tab={tab} setTab={setTab} filterMonth={filterMonth} setFilterMonth={setFilterMonth}/>
      <main style={{ maxWidth:1180, margin:"0 auto", padding:"24px 20px", animation:"bbFadeIn 0.3s ease" }}>
        {dataLoading && <div style={{ display:"flex", justifyContent:"center", padding:"80px 0" }}><Spinner size={40} color="#a78bfa"/></div>}
        {!dataLoading && tab==="dashboard"    && <Dashboard transactions={transactions} budgets={budgets} filterMonth={filterMonth} setTab={setTab} onAddTx={openAddTx}/>}
        {!dataLoading && tab==="transactions" && <TransactionsPage transactions={transactions} filterMonth={filterMonth} filterType={filterType} setFilterType={setFilterType} filterCat={filterCat} setFilterCat={setFilterCat} onAdd={openAddTx} onEdit={openEditTx} onDelete={deleteTx}/>}
        {!dataLoading && tab==="budgets"      && <BudgetsPage budgets={budgets} transactions={transactions} filterMonth={filterMonth} onAdd={openAddBudget} onRemove={removeBudget}/>}
        {!dataLoading && tab==="analytics"    && <AnalyticsPage transactions={transactions} filterMonth={filterMonth}/>}
      </main>
      {showTxModal && <TransactionModal form={txForm} setForm={setTxForm} onSave={saveTx} onClose={()=>{setShowTxModal(false);setEditTx(null);}} isEdit={!!editTx}/>}
      {showBudgetModal && <BudgetModal form={budgetForm} setForm={setBudgetForm} onSave={saveBudget} onClose={()=>setShowBudgetModal(false)}/>}

      {/* Footer */}
      <footer style={{
        textAlign: "center",
        padding: "20px",
        marginTop: "40px",
        borderTop: "1.5px solid #e0e7ff",
        color: "#94a3b8",
        fontSize: "13px",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontWeight: 500,
      }}>
        © 2026 <strong style={{ color: "#6366f1" }}>Disha Borse</strong>. All rights reserved.
      </footer>
    </div>
  );
};
export default function App() { return <AuthProvider><AppInner/></AuthProvider>; }