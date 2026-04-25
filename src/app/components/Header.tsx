import { ChevronRight, ExternalLink } from 'lucide-react';
import { MobileMenu } from './MobileMenu';

interface HeaderProps {
  onCancel?: () => void;
  onSave?: () => void;
  isSaveDisabled?: boolean;
}

export function Header({ onCancel, onSave, isSaveDisabled }: HeaderProps) {
  return (
    <header className="border-b border-neutral-200 bg-white sticky top-0 z-30">
      <div className="px-4 md:px-8 py-4 md:py-6">
        <div className="flex items-start justify-between mb-4 md:mb-6">
          <div className="flex items-center gap-3 flex-1">
            <MobileMenu activeItem="products" />

            <div>
              <div className="hidden md:flex items-center gap-2 text-sm text-neutral-500 mb-3">
                <span>PAINEL</span>
                <ChevronRight className="w-3 h-3" />
                <span>PRODUTOS</span>
              </div>
              <h1 className="text-xl md:text-2xl text-neutral-900 mb-1 md:mb-2">Novo produto</h1>
              <p className="text-xs md:text-sm text-neutral-500 hidden md:block">
                Preencha as informações para cadastrar um novo produto na Mobili Store.
              </p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <button className="flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900 transition-colors">
              <span>VER LOJA</span>
              <ExternalLink className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 px-3 py-2 bg-neutral-50 rounded-lg border border-neutral-200">
              <div className="w-8 h-8 rounded-full bg-neutral-300 flex items-center justify-center text-xs text-neutral-700">
                JA
              </div>
              <div className="text-left">
                <p className="text-xs text-neutral-900">Julia Almeida</p>
                <p className="text-xs text-neutral-500">Administrador</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 md:gap-3">
          <button
            onClick={onCancel}
            className="px-3 md:px-5 py-2 md:py-2.5 text-xs md:text-sm text-neutral-700 bg-white border border-neutral-300 rounded-lg hover:bg-neutral-50 hover:border-neutral-400 transition-all duration-200"
          >
            CANCELAR
          </button>
          <button
            onClick={onSave}
            disabled={isSaveDisabled}
            className={`
              px-3 md:px-5 py-2 md:py-2.5 text-xs md:text-sm text-white rounded-lg transition-all duration-200 whitespace-nowrap
              ${isSaveDisabled
                ? 'bg-neutral-300 cursor-not-allowed opacity-60'
                : 'bg-[#B89B7C] hover:bg-[#A68A6B] hover:shadow-md'
              }
            `}
            title={isSaveDisabled ? 'Preencha todos os campos obrigatórios antes de salvar' : ''}
          >
            <span className="hidden md:inline">{isSaveDisabled ? 'PREENCHA OS CAMPOS OBRIGATÓRIOS' : 'SALVAR PRODUTO'}</span>
            <span className="md:hidden">SALVAR</span>
          </button>
        </div>
      </div>
    </header>
  );
}
