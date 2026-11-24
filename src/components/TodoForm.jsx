import { useState } from "react";
import { STATUS_OPTIONS, PRIORITY_OPTIONS } from "../data/dummyTodos";

const emptyForm = {
  title: "",
  description: "",
  status: "to-do",
  priority: "low",
  deadline: "",
};

export default function TodoForm({ initialData, submitLabel, onSubmit, onCancel }) {
  const [form, setForm] = useState(initialData ?? emptyForm);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) {
      setError("Judul wajib diisi.");
      return;
    }
    if (!form.deadline) {
      setError("Deadline wajib diisi.");
      return;
    }
    onSubmit({ ...form, title: form.title.trim(), description: form.description.trim() });
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <label className="label" htmlFor="title">Judul</label>
      <input id="title" name="title" className="input" value={form.title} onChange={handleChange} autoFocus />

      <label className="label" htmlFor="description">Deskripsi</label>
      <textarea id="description" name="description" className="input" rows={3} value={form.description} onChange={handleChange} />

      <div className="row">
        <div className="col">
          <label className="label" htmlFor="status">Status</label>
          <select id="status" name="status" className="input" value={form.status} onChange={handleChange}>
            {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div className="col">
          <label className="label" htmlFor="priority">Prioritas</label>
          <select id="priority" name="priority" className="input" value={form.priority} onChange={handleChange}>
            {PRIORITY_OPTIONS.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
      </div>

      <label className="label" htmlFor="deadline">Deadline</label>
      <input id="deadline" name="deadline" type="date" className="input" value={form.deadline} onChange={handleChange} />

      {error && <p className="error">{error}</p>}

      <div className="row actions">
        <button type="button" className="btn btn-red" onClick={onCancel}>Batal</button>
        <button type="submit" className="btn btn-blue">{submitLabel}</button>
      </div>
    </form>
  );
}
