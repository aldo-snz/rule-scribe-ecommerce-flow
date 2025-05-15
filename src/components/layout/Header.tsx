
import React from 'react';
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center px-6 sticky top-0 z-10">
      <div className="flex-1 flex items-center">
        <div className="text-xl font-semibold text-am-purple mr-8">
          Attribute Manager
        </div>
        
        <div className="hidden md:flex items-center space-x-4">
          <span className="text-sm text-gray-600">
            Versión 1.0.0
          </span>
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <Button variant="outline" size="sm">
          <span className="mr-2">🔔</span>
          <span className="hidden sm:inline">Notificaciones</span>
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="flex items-center">
              <div className="w-6 h-6 rounded-full bg-am-purple flex items-center justify-center text-white mr-2">
                U
              </div>
              <span className="hidden sm:inline">Usuario</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Perfil</DropdownMenuItem>
            <DropdownMenuItem>Configuración</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Cerrar sesión</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
