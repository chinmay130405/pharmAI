import { AlertCircle, CheckCircle, Info } from 'lucide-react';

export default function Alert({ type = 'info', title, message, onClose }) {
  const typeClasses = {
    info: 'bg-blue-50 border-blue-200 text-blue-900',
    success: 'bg-green-50 border-green-200 text-green-900',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-900',
    error: 'bg-red-50 border-red-200 text-red-900',
  };

  const iconClasses = {
    info: <Info className="text-blue-500" />,
    success: <CheckCircle className="text-green-500" />,
    warning: <AlertCircle className="text-yellow-500" />,
    error: <AlertCircle className="text-red-500" />,
  };

  return (
    <div className={`border-l-4 ${typeClasses[type]} p-4 mb-6 rounded flex items-start gap-3`}>
      <div className="flex-shrink-0 mt-0.5">{iconClasses[type]}</div>
      <div className="flex-1">
        {title && <h3 className="font-semibold">{title}</h3>}
        <p className="text-sm">{message}</p>
      </div>
      {onClose && (
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          ✕
        </button>
      )}
    </div>
  );
}
