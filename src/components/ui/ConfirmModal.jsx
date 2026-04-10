import Modal from "./Modal";

function ConfirmModal({ open, onClose, onConfirm, title, message, confirmLabel = "Delete", danger = true }) {
  return (
    <Modal open={open} onClose={onClose}>
      <div className="space-y-5">
        <div className="space-y-1.5">
          <h2 className="text-base font-semibold" style={{ color: "var(--text-primary)" }}>{title}</h2>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>{message}</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl text-sm font-medium transition-colors"
            style={{ background: "var(--bg-elevated)", color: "var(--text-secondary)", border: "1px solid var(--border)" }}
            onMouseEnter={e => e.currentTarget.style.borderColor = "var(--border-light)"}
            onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border)"}
          >
            Cancel
          </button>
          <button
            onClick={() => { onConfirm(); onClose(); }}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all"
            style={
              danger
                ? { background: "rgba(239,68,68,0.15)", color: "var(--red)", border: "1px solid rgba(239,68,68,0.3)" }
                : { background: "var(--purple-dim)", color: "var(--purple-light)", border: "1px solid var(--purple-dim-hover)" }
            }
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default ConfirmModal;