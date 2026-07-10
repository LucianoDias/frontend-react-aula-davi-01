
import type { React } from 'react';
type ButtonVariant = 'number' | 'operator' | 'action' | 'equals';
interface CalculatorButtonProps {
  label: string;
  onClick: () => void;
  variant?: ButtonVariant;
  wide?: boolean;
  tall?: boolean;
}

export default function CalculatorButton({
  label,
  onClick,
  variant = 'number',
  wide = false,
  tall = false,
}: CalculatorButtonProps) {
  const variantStyles: Record<ButtonVariant, string> = {
    number: 'bg-slate-700/50 hover:bg-slate-600/60 text-white',
    operator: 'bg-indigo-500/80 hover:bg-indigo-400 text-white',
    action: 'bg-rose-500/80 hover:bg-rose-400 text-white',
    equals: 'bg-emerald-500/80 hover:bg-emerald-400 text-white',
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        variantStyles[variant],
        wide ? 'col-span-2' : '',
        tall ? 'row-span-2' : '', 
        'flex items-center justify-center',
        'rounded-2xl',
        'text-2xl font-semibold',
        'py-4',
        'transition-all duration-150',
        'active:scale-95',
        'select-none',
        'shadow-lg shadow-black/20',
      ].join(' ')}
    >
      {label}
    </button>
  );
}