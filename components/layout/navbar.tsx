import React from "react";
import { cn } from "../../lib/utils";
import { 
  Bell, 
  Search,
  Menu,
  User
} from "lucide-react";
import { Input } from "../ui/input";

interface NavbarProps {
  className?: string;
}

export function Navbar({ className }: NavbarProps) {
  return (
    <header className={cn(
      "h-16 border-b border-border bg-background flex items-center px-4", 
      className
    )}>
      <button className="md:hidden mr-2">
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle menu</span>
      </button>
      
      <div className="flex-1 flex">
        <div className="relative max-w-md w-full lg:max-w-sm hidden sm:block">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="pl-8 h-9 md:w-[200px] lg:w-[300px]"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <button className="relative inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 disabled:pointer-events-none h-9 w-9 hover:bg-accent hover:text-accent-foreground">
          <Bell className="h-4 w-4" />
          <span className="sr-only">Notifications</span>
          
          {/* Notification indicator */}
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-destructive" />
        </button>
        
        <button className="flex items-center gap-2 rounded-full bg-accent/50 p-1.5">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted">
            <User className="h-4 w-4" />
          </div>
          <span className="text-sm font-medium hidden md:inline-block mr-1">
            User Profile
          </span>
        </button>
      </div>
    </header>
  );
}
