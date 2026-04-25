import { CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

interface ValidationMessageProps {
  type: 'success' | 'error' | 'warning';
  message: string;
}

export function ValidationMessage({ type, message }: ValidationMessageProps) {
  const configs = {
    success: {
      icon: CheckCircle2,
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      textColor: 'text-green-700',
      iconColor: 'text-green-500'
    },
    error: {
      icon: XCircle,
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      textColor: 'text-red-700',
      iconColor: 'text-red-500'
    },
    warning: {
      icon: AlertCircle,
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
      textColor: 'text-amber-700',
      iconColor: 'text-amber-500'
    }
  };

  const config = configs[type];
  const Icon = config.icon;

  return (
    <div className={`flex items-start gap-2 p-3 rounded-lg border ${config.bgColor} ${config.borderColor}`}>
      <Icon className={`w-4 h-4 mt-0.5 flex-shrink-0 ${config.iconColor}`} />
      <p className={`text-xs ${config.textColor}`}>{message}</p>
    </div>
  );
}
