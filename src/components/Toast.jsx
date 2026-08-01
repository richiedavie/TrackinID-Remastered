import { useApp } from '../context/AppContext';
import './Toast.css';

export default function Toast() {
  const { toasts, removeToast } = useApp();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map((t) => (
        <div key={t.id} className={`toast toast-${t.type}`}>
          <div className="toast-message">{t.message}</div>
          <button className="toast-close" onClick={() => removeToast(t.id)}>
            &times;
          </button>
        </div>
      ))}
    </div>
  );
}
