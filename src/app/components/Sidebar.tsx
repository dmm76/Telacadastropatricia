import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  FolderTree,
  Users,
  Warehouse,
  Megaphone,
  BarChart3,
  Ticket,
  Settings,
  HelpCircle
} from 'lucide-react';

interface SidebarProps {
  activeItem?: string;
}

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', key: 'dashboard' },
  { icon: ShoppingCart, label: 'Pedidos', key: 'orders' },
  { icon: Package, label: 'Produtos', key: 'products' },
  { icon: FolderTree, label: 'Categorias', key: 'categories' },
  { icon: Users, label: 'Clientes', key: 'customers' },
  { icon: Warehouse, label: 'Estoque', key: 'inventory' },
  { icon: Megaphone, label: 'Marketing', key: 'marketing' },
  { icon: BarChart3, label: 'Relatórios', key: 'reports' },
  { icon: Settings, label: 'Configurações', key: 'settings' }
];

export function Sidebar({ activeItem = 'products' }: SidebarProps) {
  return (
    <aside className="fixed left-0 top-0 h-screen w-56 border-r border-neutral-200 bg-neutral-50 flex flex-col z-40">
      <div className="p-6 border-b border-neutral-200">
        <div className="flex flex-col gap-1">
          <h1 className="text-xl tracking-tight text-neutral-900">MOBILI</h1>
          <p className="text-xs text-neutral-500 tracking-wide">ESTOFADOS</p>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-0.5 px-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.key === activeItem;

            return (
              <li key={item.key}>
                <button
                  className={`
                    w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors
                    ${isActive
                      ? 'bg-white text-neutral-900 shadow-sm'
                      : 'text-neutral-600 hover:bg-white/50 hover:text-neutral-900'
                    }
                  `}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span className="text-sm">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-neutral-200">
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-neutral-600 hover:bg-white/50 hover:text-neutral-900 transition-colors">
          <HelpCircle className="w-4 h-4 flex-shrink-0" />
          <span className="text-sm">Precisa de ajuda?</span>
        </button>
        <p className="mt-4 px-3 text-xs text-neutral-400">
          © 2026 Mobili Estofados<br />
          Todos os direitos reservados.
        </p>
      </div>
    </aside>
  );
}
