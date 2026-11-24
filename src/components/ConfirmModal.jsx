import Modal from "./Modal";

export default function ConfirmModal({ message, confirmLabel = "Hapus", onConfirm, onCancel }) {
  return (
    <Modal title="Konfirmasi" onClose={onCancel}>
      <p className="confirm-text">{message}</p>
      <div className="row actions">
        <button className="btn btn-gray" onClick={onCancel}>Batal</button>
        <button className="btn btn-red" onClick={onConfirm}>{confirmLabel}</button>
      </div>
    </Modal>
  );
}
