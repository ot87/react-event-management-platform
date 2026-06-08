import { createPortal } from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, children }: ModalProps) {
  const modalRoot = document.getElementById("modal-root");

  if (!isOpen || !modalRoot) {
    return null;
  }

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-lg bg-white p-6 shadow-xl dark:bg-gray-800 dark:text-gray-100"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="float-right text-xl text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
        >
          ×
        </button>
        {children}
      </div>
    </div>,
    modalRoot,
  );
}
