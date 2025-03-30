import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "../../lib/utils";
import { 
  Home, 
  BarChart2, 
  Users, 
  Settings, 
  HelpCircle,
  LogOut,
  LucideIcon,
  ShoppingBag,
  PackagePlus,
  ListChecks,
  Tags,
  Truck,
  DollarSign,
  ShoppingCart
} from "lucide-react";
import { useClerk } from "@clerk/nextjs";

interface SidebarProps {
  className?: string;
}

interface SidebarItemProps {
  href: string;
  icon: React.ReactElement;
  label: string;
}

function SidebarItem({ href, icon, label }: SidebarItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href;
  
  return (
    <Link 
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all",
        isActive 
          ? "bg-sidebar-accent text-sidebar-accent-foreground" 
          : "hover:bg-sidebar-accent/50 text-sidebar-foreground"
      )}
    >
      {/* Render icon directly with consistent styling */}
      <span className="h-4 w-4 flex-shrink-0" aria-hidden="true">
        {icon}
      </span>
      {label}
    </Link>
  );
}

export function Sidebar({ className }: SidebarProps) {
  const { signOut } = useClerk();

  const handleSignOut = () => {
    signOut();
  };

  return (
    <div className={cn(
      "w-64 border-r border-sidebar-border bg-sidebar flex flex-col h-screen overflow-y-auto", 
      className
    )}>
      <div className="p-4">
        <div className="flex items-center mb-8 h-12">
          <span className="text-xl font-bold">Panel de Control</span>
        </div>
        
        <nav className="space-y-1">
          <SidebarItem href="/" icon={<Home size={16} />} label="Inicio" />
          <SidebarItem href="/analytics" icon={<BarChart2 size={16} />} label="Análisis" />
          
          {/* E-commerce Section */}
          <div className="pt-4">
            <h3 className="px-3 text-xs font-medium text-sidebar-foreground/60 uppercase tracking-wider mb-2">
              Productos
            </h3>
            <SidebarItem href="/productos" icon={<ShoppingBag size={16} />} label="Ver Productos" />
            <SidebarItem href="/productos/nuevo" icon={<PackagePlus size={16} />} label="Crear Producto" />
            <SidebarItem href="/productos/inventario" icon={<ListChecks size={16} />} label="Inventario" />
            <SidebarItem href="/productos/precios" icon={<Tags size={16} />} label="Actualizar Precios" />
          </div>

          <div className="pt-4">
            <h3 className="px-3 text-xs font-medium text-sidebar-foreground/60 uppercase tracking-wider mb-2">
              Ventas
            </h3>
            <SidebarItem href="/pedidos" icon={<ShoppingCart size={16} />} label="Pedidos" />
            <SidebarItem href="/envios" icon={<Truck size={16} />} label="Envíos" />
            <SidebarItem href="/promociones" icon={<DollarSign size={16} />} label="Promociones" />
          </div>

          {/* Existing Items */}
          <div className="pt-4">
            <h3 className="px-3 text-xs font-medium text-sidebar-foreground/60 uppercase tracking-wider mb-2">
              Administración
            </h3>
            <SidebarItem href="/usuarios" icon={<Users size={16} />} label="Usuarios" />
            <SidebarItem href="/settings" icon={<Settings size={16} />} label="Configuración" />
            <SidebarItem href="/help" icon={<HelpCircle size={16} />} label="Ayuda y Soporte" />
          </div>
        </nav>
      </div>
      
      <div className="mt-auto p-4 border-t border-sidebar-border">
        <button 
          onClick={handleSignOut}
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all w-full hover:bg-sidebar-accent/50 text-sidebar-foreground"
        >
          <LogOut className="h-4 w-4" aria-hidden="true" />
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
}
