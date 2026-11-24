import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "../components/Modal";
import TodoForm from "../components/TodoForm";

export default function TodoDetail({ todos, onUpdate }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showUpdate, setShowUpdate] = useState(false);

  const todo = todos.find((t) => String(t.id) === id);

  if (!todo) {
    return (
      <div className="detail-wrap">
        <div className="card">
          <p>Tugas tidak ditemukan.</p>
          <button className="btn btn-red" onClick={() => navigate("/")}>Kembali</button>
        </div>
      </div>
    );
  }

  const handleUpdate = (data) => {
    onUpdate(todo.id, data);
    setShowUpdate(false);
  };

  return (
    <div className="detail-wrap">
      <div className="card detail">
        <div className="detail-left">
          <h3>Judul</h3>
          <p>{todo.title}</p>
          <h3>Deskripsi</h3>
          <div className="desc-box">{todo.description || "-"}</div>
        </div>
        <div className="detail-right">
          <h3>Status</h3>
          <p>{todo.status}</p>
          <h3>Prioritas</h3>
          <p>{todo.priority}</p>
          <h3>Deadline</h3>
          <p>{todo.deadline}</p>
          <div className="row actions">
            <button className="btn btn-red" onClick={() => navigate("/")}>Kembali</button>
            <button className="btn btn-blue" onClick={() => setShowUpdate(true)}>Update</button>
          </div>
        </div>
      </div>

      {showUpdate && (
        <Modal title="Update Todo" onClose={() => setShowUpdate(false)}>
          <TodoForm
            initialData={{
              title: todo.title,
              description: todo.description,
              status: todo.status,
              priority: todo.priority,
              deadline: todo.deadline,
            }}
            submitLabel="Update"
            onSubmit={handleUpdate}
            onCancel={() => setShowUpdate(false)}
          />
        </Modal>
      )}
    </div>
  );
}
