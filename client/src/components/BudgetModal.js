import { Modal, Input, Select, Button } from "./ui";
import { CATS } from "../utils/helpers";

const BudgetModal = ({ form, setForm, onSave, onClose }) => {
  return (
    <Modal title="Set Monthly Budget" onClose={onClose}>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {/* Category */}
        <Select
          label="Category"
          value={form.category}
          onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
        >
          {CATS.expense.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </Select>

        {/* Limit */}
        <Input
          label="Monthly Limit (₹)"
          type="number"
          min="1"
          step="100"
          placeholder="5000"
          value={form.limit}
          onChange={(e) => setForm((f) => ({ ...f, limit: e.target.value }))}
        />

        {/* Month */}
        <Input
          label="Month"
          type="month"
          value={form.month}
          onChange={(e) => setForm((f) => ({ ...f, month: e.target.value }))}
        />

        {/* Actions */}
        <div style={{ display: "flex", gap: 10, marginTop: 6 }}>
          <Button variant="ghost" onClick={onClose} style={{ flex: 1 }}>
            Cancel
          </Button>
          <Button onClick={onSave} style={{ flex: 2 }}>
            Set Budget
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default BudgetModal;