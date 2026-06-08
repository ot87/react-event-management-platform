import { createPortal } from "react-dom";

interface ToastProps {
  message: string;
  onClose: () => void;
}

export function Toast({ message, onClose }: ToastProps) {
  const modalRoot = document.getElementById("modal-root");

  if (!modalRoot) {
    return null;
  }

  return createPortal(
    <div
      role="status"
      className="fixed bottom-4 right-4 z-50 flex items-center gap-3 rounded-lg bg-green-600 px-4 py-3 text-white shadow-lg"
    >
      <span>{message}</span>
      <button
        type="button"
        onClick={onClose}
        aria-label="Dismiss notification"
        className="text-lg text-white/80 hover:text-white"
      >
        ×
      </button>
    </div>,
    modalRoot,
  );
}
