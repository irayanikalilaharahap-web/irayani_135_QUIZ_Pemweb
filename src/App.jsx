import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import TodoList from "./pages/TodoList";
import TodoDetail from "./pages/TodoDetail";
import Toast from "./components/Toast";
import { dummyTodos } from "./data/dummyTodos";

export default function App() {
  // State utama: semua perubahan data terjadi di sini
  const [todos, setTodos] = useState(dummyTodos);
  const [toast, setToast] = useState(null);

  // Toast hilang otomatis setelah 2,5 detik
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 2500);
    return () => clearTimeout(timer);
  }, [toast]);

  const addTodo = (data) => {
    // id unik: id terbesar + 1 (nanti digantikan id dari backend)
    const nextId = todos.reduce((max, t) => Math.max(max, t.id), 0) + 1;
    setTodos((prev) => [...prev, { id: nextId, ...data }]);
    setToast({ type: "success", message: "Tugas berhasil ditambahkan." });
  };

  const updateTodo = (id, data) => {
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, ...data } : t)));
    setToast({ type: "success", message: "Tugas berhasil diperbarui." });
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
    setToast({ type: "danger", message: "Tugas berhasil dihapus." });
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<TodoList todos={todos} onAdd={addTodo} onDelete={deleteTodo} />} />
        <Route path="/todo/:id" element={<TodoDetail todos={todos} onUpdate={updateTodo} />} />
      </Routes>
      <Toast toast={toast} />
    </>
  );
}
