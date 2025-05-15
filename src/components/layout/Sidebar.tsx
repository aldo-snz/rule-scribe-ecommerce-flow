
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger
} from "@/components/ui/sidebar";

interface SidebarProps {
  children: React.ReactNode;
}

const Sidebar = ({ children }: SidebarProps) => {
  const location = useLocation();
  
  const menuItems = [
    { name: 'Dashboard', path: '/', icon: '📊' },
    { name: 'Reglas', path: '/rules', icon: '📋' },
    { name: 'Simulador', path: '/simulator', icon: '🧪' },
    { name: 'Conflictos', path: '/conflicts', icon: '🔁' },
    { name: 'Configuración', path: '/settings', icon: '⚙️' },
  ];
  
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <ShadcnSidebar>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>
                Attribute Manager
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.path}>
                      <SidebarMenuButton asChild active={location.pathname === item.path}>
                        <Link to={item.path} className="flex items-center">
                          <span className="mr-3 text-lg">{item.icon}</span>
                          <span>{item.name}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </ShadcnSidebar>
        
        <div className="flex-1 flex flex-col">
          <div className="p-4">
            <SidebarTrigger />
          </div>
          <main className="flex-1 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Sidebar;
