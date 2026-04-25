import { ReactNode } from 'react';

interface FormCardProps {
  icon?: ReactNode;
  title: string;
  children: ReactNode;
  className?: string;
}

export function FormCard({ icon, title, children, className = '' }: FormCardProps) {
  return (
    <section className={`bg-white rounded-lg shadow-sm border border-neutral-200 p-4 md:p-6 ${className}`}>
      <div className="flex items-center gap-2 mb-4">
        {icon && <div className="text-[#B89B7C]">{icon}</div>}
        <h2 className="text-sm md:text-base text-neutral-900 tracking-wide">{title}</h2>
      </div>
      {children}
    </section>
  );
}
