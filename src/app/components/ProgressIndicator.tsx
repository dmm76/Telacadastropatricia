interface ProgressIndicatorProps {
  current: number;
  total: number;
}

export function ProgressIndicator({ current, total }: ProgressIndicatorProps) {
  const percentage = Math.round((current / total) * 100);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-neutral-600">Progresso do cadastro</span>
        <span className="text-xs text-neutral-900">{current}/{total} campos</span>
      </div>

      <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-[#B89B7C] transition-all duration-300 rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <p className="text-xs text-neutral-500 mt-2">
        {percentage < 100
          ? `${100 - percentage}% restante para salvar`
          : 'Todos os campos obrigatórios preenchidos'
        }
      </p>
    </div>
  );
}
